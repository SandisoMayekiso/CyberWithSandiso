/* =========================================================
   CWS ACADEMY
   PROTECTED LEARNING, ASSESSMENTS AND CREDENTIALS
========================================================= */

/* eslint-disable max-len */

const crypto = require("crypto");

const {
  onCall,
  HttpsError,
} = require("firebase-functions/v2/https");

const {
  getFirestore,
  FieldValue,
  Timestamp,
} = require("firebase-admin/firestore");

const db = getFirestore();

const ALLOWED_WEB_ORIGINS = [
  "https://sandisomayekiso.github.io",
];

const CALLABLE_OPTIONS = {
  cors: ALLOWED_WEB_ORIGINS,
  // Gen 2 callable endpoints must accept the browser's unauthenticated CORS
  // preflight at the Cloud Run transport layer. The callable request itself
  // remains protected by Firebase Auth and requireStudent().
  invoker: "public",
  timeoutSeconds: 60,
  memory: "256MiB",
};

const ID_PATTERN = /^[a-z0-9][a-z0-9-]{0,99}$/;
const ATTEMPT_COOLDOWN_MS = 5 * 1000;
const MAX_ANSWERS = 100;
const MAX_FINDINGS = 12;


/* =========================================================
   VALIDATION AND ACCESS
========================================================= */

function requireStudent(request) {
  if (!request.auth?.uid) {
    throw new HttpsError("unauthenticated", "Sign in to continue.");
  }

  if (request.auth.token?.email_verified !== true) {
    throw new HttpsError(
        "failed-precondition",
        "Verify your email address before accessing course material.",
    );
  }

  return {
    uid: request.auth.uid,
    name: getStudentName(request.auth.token),
  };
}

function getStudentName(token = {}) {
  const displayName = String(token.name || "").trim();
  if (displayName) return displayName.slice(0, 100);

  const localPart = String(token.email || "Student").split("@")[0];
  return localPart
      .replace(/[._-]+/g, " ")
      .replace(/\b\w/g, (character) => character.toUpperCase())
      .slice(0, 100) || "Student";
}

function requireId(value, label) {
  const id = String(value || "").trim().toLowerCase();
  if (!ID_PATTERN.test(id)) {
    throw new HttpsError("invalid-argument", `${label} is invalid.`);
  }
  return id;
}

function requireAnswers(value) {
  if (!Array.isArray(value) || value.length > MAX_ANSWERS) {
    throw new HttpsError("invalid-argument", "The submitted answers are invalid.");
  }

  return value.map((answer) => {
    if (answer === null || answer === undefined || answer === "") return null;
    const parsed = Number(answer);
    return Number.isInteger(parsed) && parsed >= 0 && parsed < 20 ? parsed : null;
  });
}

function normalize(value) {
  return String(value || "").trim().toLowerCase();
}

function forClient(value) {
  if (value?.toDate instanceof Function) {
    return value.toDate().toISOString();
  }
  if (Array.isArray(value)) return value.map(forClient);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, forClient(item)]),
  );
}

function hasActivePro(entitlement) {
  if (normalize(entitlement?.plan) !== "pro" ||
      !["active", "trialing"].includes(normalize(entitlement?.status))) {
    return false;
  }

  const periodEndMs = entitlement?.currentPeriodEnd?.toMillis?.() || 0;
  return !periodEndMs || periodEndMs > Date.now();
}

function requiresPro(...items) {
  return items.some((item) =>
    item?.proOnly === true || normalize(item?.access) === "pro",
  );
}

async function getCourseAccess(uid, courseId, childRefs = []) {
  const courseRef = db.collection("protectedCourses").doc(courseId);
  const [courseSnapshot, entitlementSnapshot, ...childSnapshots] =
    await Promise.all([
      courseRef.get(),
      db.collection("entitlements").doc(uid).get(),
      ...childRefs.map((path) => db.doc(`${courseRef.path}/${path}`).get()),
    ]);

  if (!courseSnapshot.exists) {
    throw new HttpsError("not-found", "The requested course was not found.");
  }

  const course = courseSnapshot.data() || {};
  if (normalize(course.status || "available") !== "available") {
    throw new HttpsError("failed-precondition", "This course is not available.");
  }

  const children = childSnapshots.map((snapshot) => {
    if (!snapshot.exists) {
      throw new HttpsError("not-found", "The requested course item was not found.");
    }
    return snapshot.data() || {};
  });

  if (requiresPro(course, ...children) &&
      !hasActivePro(entitlementSnapshot.data() || {})) {
    throw new HttpsError("permission-denied", "An active CWS Pro plan is required.");
  }

  return {course, children, courseRef};
}

async function requireCoursePrerequisites(uid, course) {
  const required = Array.isArray(course.requiredPrerequisites) ?
    course.requiredPrerequisites : [];

  if (!required.length) return;

  const snapshots = await Promise.all(required.map((courseId) =>
    db.doc(`users/${uid}/courseProgress/${courseId}`).get(),
  ));

  const missing = required.filter((courseId, index) => {
    const progress = snapshots[index].data() || {};
    return progress.completed !== true || progress.certificateEligible !== true;
  });

  if (missing.length) {
    throw new HttpsError(
        "failed-precondition",
        `Complete the required course${missing.length === 1 ? "" : "s"}: ` +
        missing.join(", "),
    );
  }
}


/* =========================================================
   CONTENT SANITIZATION
========================================================= */

function withoutAnswers(assessment = {}) {
  const safeAssessment = {...assessment};
  const questions = Array.isArray(assessment.questions) ? assessment.questions : [];
  delete safeAssessment.questions;
  delete safeAssessment.answerKey;
  delete safeAssessment.answers;

  return {
    ...safeAssessment,
    questions: questions.map((question = {}) => {
      const safeQuestion = {...question};
      [
        "answer",
        "correctAnswer",
        "correctIndex",
        "correctOption",
        "explanation",
      ].forEach((key) => delete safeQuestion[key]);
      return safeQuestion;
    }),
  };
}

function withoutLessonAnswers(lesson = {}) {
  return {
    ...lesson,
    quiz: withoutAnswers({questions: lesson.quiz || []}).questions,
  };
}

function scoreAssessment(assessment, submittedAnswers) {
  const questions = Array.isArray(assessment?.questions) ? assessment.questions : [];
  if (!questions.length) {
    throw new HttpsError("failed-precondition", "This assessment has no questions.");
  }

  const correct = questions.reduce((score, question, index) =>
    score + (Number(submittedAnswers[index]) === Number(question.answer) ? 1 : 0),
  0);
  const percentage = Math.round((correct / questions.length) * 100);
  const passingScore = Number(assessment.passingScore) || 70;

  return {
    score: correct,
    total: questions.length,
    percentage,
    passingScore,
    passed: percentage >= passingScore,
  };
}


/* =========================================================
   TRUSTED PROGRESS
========================================================= */

function defaultProgress(courseId) {
  return {
    courseId,
    completedLessons: [],
    completedLabs: [],
    completedAssessments: [],
    passedLessonQuizzes: {},
    assessmentScores: {},
    assessmentAttempts: {},
    finalAssessment: {score: 0, bestScore: 0, passed: false},
    started: false,
    completed: false,
    certificateEligible: false,
    progressPercent: 0,
  };
}

function progressData(courseId, source = {}) {
  const defaults = defaultProgress(courseId);
  return {
    ...defaults,
    ...source,
    courseId,
    completedLessons: Array.isArray(source.completedLessons) ?
      [...new Set(source.completedLessons)] : [],
    completedLabs: Array.isArray(source.completedLabs) ?
      [...new Set(source.completedLabs)] : [],
    completedAssessments: Array.isArray(source.completedAssessments) ?
      [...new Set(source.completedAssessments)] : [],
    passedLessonQuizzes: source.passedLessonQuizzes &&
      typeof source.passedLessonQuizzes === "object" ?
      source.passedLessonQuizzes : {},
    assessmentScores: source.assessmentScores &&
      typeof source.assessmentScores === "object" ? source.assessmentScores : {},
    assessmentAttempts: source.assessmentAttempts &&
      typeof source.assessmentAttempts === "object" ? source.assessmentAttempts : {},
    finalAssessment: {
      ...defaults.finalAssessment,
      ...(source.finalAssessment || {}),
    },
  };
}

function requirements(course) {
  const configured = course.requirements || {};
  const rules = course.completionRules || {};
  return {
    lessons: configured.lessonKeys || [],
    activities: rules.requireRequiredLabs === true ?
      (configured.activityKeys || []) : [],
    assessments: rules.requireAllModuleAssessments === false ? [] :
      (configured.assessmentKeys || []),
    finalRequired: configured.finalAssessmentRequired === true,
  };
}

function updateCalculatedProgress(course, progress) {
  const required = requirements(course);
  const completedLessons = new Set(progress.completedLessons);
  const completedLabs = new Set(progress.completedLabs);
  const completedAssessments = new Set(progress.completedAssessments);

  const completedUnits =
    required.lessons.filter((key) => completedLessons.has(key)).length +
    required.activities.filter((key) => completedLabs.has(key)).length +
    required.assessments.filter((key) => completedAssessments.has(key)).length +
    (required.finalRequired && progress.finalAssessment?.passed ? 1 : 0);
  const totalUnits = required.lessons.length + required.activities.length +
    required.assessments.length + (required.finalRequired ? 1 : 0);

  const allLessons = required.lessons.every((key) => completedLessons.has(key));
  const allActivities = required.activities.every((key) => completedLabs.has(key));
  const allAssessments = required.assessments.every((key) =>
    completedAssessments.has(key),
  );
  const finalPassed = !required.finalRequired || progress.finalAssessment?.passed === true;

  progress.progressPercent = totalUnits ?
    Math.round((completedUnits / totalUnits) * 100) : 0;
  progress.completed = allLessons && allActivities && allAssessments && finalPassed;
  progress.certificateEligible = course.certificateEligible === true &&
    progress.completed;
  return progress;
}

function assertAttemptCooldown(progress, attemptKey) {
  const previous = progress.assessmentAttempts?.[attemptKey];
  const previousMs = previous?.lastAttemptAt?.toMillis?.() ||
    Date.parse(previous?.lastAttemptAt || "") || 0;

  if (previousMs && Date.now() - previousMs < ATTEMPT_COOLDOWN_MS) {
    throw new HttpsError("resource-exhausted", "Wait a few seconds before retrying.");
  }
}

function recordAttempt(progress, attemptKey, result) {
  const previous = progress.assessmentAttempts[attemptKey] || {};
  progress.assessmentAttempts[attemptKey] = {
    count: Number(previous.count || 0) + 1,
    lastAttemptAt: Timestamp.now(),
    lastScore: result.percentage,
    bestScore: Math.max(Number(previous.bestScore || 0), result.percentage),
  };
}

function certificateId(prefix) {
  return `CWS-${prefix}-${crypto.randomBytes(9).toString("hex").toUpperCase()}`;
}

function verificationRecord(student, course, progress, credentialId) {
  const access = requiresPro(course) ? "pro" : "course";
  return {
    credentialId,
    credentialType: "course",
    tier: access,
    status: "active",
    studentName: student.name,
    courseId: course.id,
    courseTitle: course.title || course.id,
    credentialTitle: access === "pro" ?
      `CWS Pro Certificate â€” ${course.title}` :
      `CWS Course Certificate â€” ${course.title}`,
    description: course.description || "CWS Academy course completion credential.",
    finalScore: Number(progress.finalAssessment?.bestScore || 0),
    issuedAt: Timestamp.now(),
    issuer: "CWS Academy",
    ecosystem: "CyberWithSandiso",
    verificationVersion: 2,
  };
}

function maybeIssueCourseCertificate(transaction, student, course, progress) {
  if (!progress.certificateEligible) return "";

  const existing = String(progress.certificate?.credentialId || "").trim();
  if (existing) return existing;

  const credentialId = certificateId("COURSE");
  const record = verificationRecord(student, course, progress, credentialId);
  progress.certificate = {
    credentialId,
    issued: true,
    issuedAt: record.issuedAt,
  };
  progress.completedAt = progress.completedAt || record.issuedAt;
  transaction.create(
      db.collection("certificateVerifications").doc(credentialId),
      record,
  );
  return credentialId;
}


/* =========================================================
   PROTECTED CONTENT DELIVERY
========================================================= */

exports.getProtectedLesson = onCall(CALLABLE_OPTIONS, async (request) => {
  const student = requireStudent(request);
  const courseId = requireId(request.data?.courseId, "Course ID");
  const moduleId = requireId(request.data?.moduleId, "Module ID");
  const lessonId = requireId(request.data?.lessonId, "Lesson ID");
  const modulePath = `modules/${moduleId}`;
  const lessonPath = `modules/${moduleId}/lessons/${lessonId}`;
  const {course, children} = await getCourseAccess(
      student.uid, courseId, [modulePath, lessonPath],
  );
  await requireCoursePrerequisites(student.uid, course);
  return {lesson: withoutLessonAnswers(children[1])};
});

exports.getProtectedActivity = onCall(CALLABLE_OPTIONS, async (request) => {
  const student = requireStudent(request);
  const courseId = requireId(request.data?.courseId, "Course ID");
  const moduleId = requireId(request.data?.moduleId, "Module ID");
  const activityId = requireId(request.data?.activityId, "Activity ID");
  const {course, children} = await getCourseAccess(student.uid, courseId, [
    `modules/${moduleId}`,
    `modules/${moduleId}/activities/${activityId}`,
  ]);
  await requireCoursePrerequisites(student.uid, course);
  return {activity: children[1]};
});

exports.getProtectedAssessment = onCall(CALLABLE_OPTIONS, async (request) => {
  const student = requireStudent(request);
  const courseId = requireId(request.data?.courseId, "Course ID");
  const type = normalize(request.data?.type);
  if (!["module", "final"].includes(type)) {
    throw new HttpsError("invalid-argument", "Assessment type is invalid.");
  }
  const moduleId = type === "module" ?
    requireId(request.data?.moduleId, "Module ID") : "";
  const paths = type === "final" ? ["assessments/final"] : [
    `modules/${moduleId}`,
    `modules/${moduleId}/assessments/module`,
  ];
  const {course, children} = await getCourseAccess(student.uid, courseId, paths);
  await requireCoursePrerequisites(student.uid, course);
  const progressSnapshot = await db.doc(
      `users/${student.uid}/courseProgress/${courseId}`,
  ).get();
  const progress = progressData(courseId, progressSnapshot.data() || {});

  if (type === "module") {
    const module = children[0];
    const ready = (module.lessonKeys || []).every((key) =>
      progress.completedLessons.includes(key),
    ) && (module.activityKeys || []).every((key) =>
      progress.completedLabs.includes(key),
    );
    if (!ready) {
      throw new HttpsError(
          "failed-precondition",
          "Complete the module lessons and activities before opening the assessment.",
      );
    }
    return {assessment: withoutAnswers(children[1])};
  }

  const required = requirements(course);
  const ready = required.lessons.every((key) =>
    progress.completedLessons.includes(key),
  ) && required.activities.every((key) =>
    progress.completedLabs.includes(key),
  ) && required.assessments.every((key) =>
    progress.completedAssessments.includes(key),
  );
  if (!ready) {
    throw new HttpsError(
        "failed-precondition",
        "Complete all course requirements before opening the final assessment.",
    );
  }
  return {assessment: withoutAnswers(children[0])};
});

exports.getProtectedCapstone = onCall(CALLABLE_OPTIONS, async (request) => {
  const student = requireStudent(request);
  const capstoneId = requireId(request.data?.capstoneId, "Capstone ID");
  const [snapshot, entitlement] = await Promise.all([
    db.collection("protectedCapstones").doc(capstoneId).get(),
    db.collection("entitlements").doc(student.uid).get(),
  ]);
  if (!snapshot.exists) throw new HttpsError("not-found", "Capstone not found.");
  const capstone = snapshot.data() || {};
  if (requiresPro(capstone) && !hasActivePro(entitlement.data() || {})) {
    throw new HttpsError("permission-denied", "An active CWS Pro plan is required.");
  }
  await requirePathCourses(student.uid, capstone.pathId);
  return {capstone: forClient(capstone)};
});


/* =========================================================
   LOCATION, LESSONS AND ACTIVITIES
========================================================= */

exports.startCourse = onCall(CALLABLE_OPTIONS, async (request) => {
  const student = requireStudent(request);
  const courseId = requireId(request.data?.courseId, "Course ID");
  const moduleId = requireId(request.data?.moduleId, "Module ID");
  const lessonId = requireId(request.data?.lessonId, "Lesson ID");
  const {course} = await getCourseAccess(student.uid, courseId, [
    `modules/${moduleId}`,
    `modules/${moduleId}/lessons/${lessonId}`,
  ]);
  await requireCoursePrerequisites(student.uid, course);
  const progressRef = db.doc(`users/${student.uid}/courseProgress/${courseId}`);

  await progressRef.set({
    courseId,
    started: true,
    currentModule: moduleId,
    currentLesson: lessonId,
    startedAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  }, {merge: true});

  return {ok: true};
});

exports.submitLessonQuiz = onCall(CALLABLE_OPTIONS, async (request) => {
  const student = requireStudent(request);
  const courseId = requireId(request.data?.courseId, "Course ID");
  const moduleId = requireId(request.data?.moduleId, "Module ID");
  const lessonId = requireId(request.data?.lessonId, "Lesson ID");
  const answers = requireAnswers(request.data?.answers);
  const {course, children} = await getCourseAccess(student.uid, courseId, [
    `modules/${moduleId}`,
    `modules/${moduleId}/lessons/${lessonId}`,
  ]);
  await requireCoursePrerequisites(student.uid, course);
  const lesson = children[1];
  const assessment = {questions: lesson.quiz || [], passingScore: 70};
  const result = scoreAssessment(assessment, answers);
  const progressRef = db.doc(`users/${student.uid}/courseProgress/${courseId}`);
  const lessonKey = `${moduleId}:${lessonId}`;

  const progress = await db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(progressRef);
    const state = progressData(courseId, snapshot.data() || {});
    const attemptKey = `lesson:${lessonKey}`;
    assertAttemptCooldown(state, attemptKey);
    recordAttempt(state, attemptKey, result);
    const previous = state.passedLessonQuizzes[lessonKey] || {};
    state.passedLessonQuizzes[lessonKey] = {
      bestScore: Math.max(Number(previous.bestScore || 0), result.percentage),
      passed: previous.passed === true || result.passed,
    };
    state.started = true;
    state.currentModule = moduleId;
    state.currentLesson = lessonId;
    state.updatedAt = Timestamp.now();
    transaction.set(progressRef, state, {merge: true});
    return state;
  });

  return {...result, bestScore: progress.passedLessonQuizzes[lessonKey].bestScore};
});

exports.completeLesson = onCall(CALLABLE_OPTIONS, async (request) => {
  const student = requireStudent(request);
  const courseId = requireId(request.data?.courseId, "Course ID");
  const moduleId = requireId(request.data?.moduleId, "Module ID");
  const lessonId = requireId(request.data?.lessonId, "Lesson ID");
  const nextModuleId = request.data?.nextModuleId ?
    requireId(request.data.nextModuleId, "Next module ID") : moduleId;
  const nextLessonId = request.data?.nextLessonId ?
    requireId(request.data.nextLessonId, "Next lesson ID") : lessonId;
  const {course, children} = await getCourseAccess(student.uid, courseId, [
    `modules/${moduleId}`,
    `modules/${moduleId}/lessons/${lessonId}`,
    `modules/${nextModuleId}/lessons/${nextLessonId}`,
  ]);
  await requireCoursePrerequisites(student.uid, course);
  const lesson = children[1];
  const progressRef = db.doc(`users/${student.uid}/courseProgress/${courseId}`);
  const lessonKey = `${moduleId}:${lessonId}`;

  const result = await db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(progressRef);
    const state = progressData(courseId, snapshot.data() || {});
    if (Array.isArray(lesson.quiz) && lesson.quiz.length &&
        state.passedLessonQuizzes[lessonKey]?.passed !== true) {
      throw new HttpsError("failed-precondition", "Pass the knowledge check first.");
    }
    if (!state.completedLessons.includes(lessonKey)) {
      state.completedLessons.push(lessonKey);
    }
    state.started = true;
    state.currentModule = nextModuleId;
    state.currentLesson = nextLessonId;
    updateCalculatedProgress(course, state);
    state.updatedAt = Timestamp.now();
    const credentialId = maybeIssueCourseCertificate(
        transaction, student, course, state,
    );
    transaction.set(progressRef, state, {merge: true});
    return {progress: state, credentialId};
  });
  return {
    ...result,
    progress: forClient(result.progress),
  };
});

exports.completeActivity = onCall(CALLABLE_OPTIONS, async (request) => {
  const student = requireStudent(request);
  const courseId = requireId(request.data?.courseId, "Course ID");
  const moduleId = requireId(request.data?.moduleId, "Module ID");
  const activityId = requireId(request.data?.activityId, "Activity ID");
  const {course} = await getCourseAccess(student.uid, courseId, [
    `modules/${moduleId}/activities/${activityId}`,
  ]);
  await requireCoursePrerequisites(student.uid, course);
  const progressRef = db.doc(`users/${student.uid}/courseProgress/${courseId}`);
  const activityKey = `${moduleId}:${activityId}`;

  const progress = await db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(progressRef);
    const state = progressData(courseId, snapshot.data() || {});
    if (!state.completedLabs.includes(activityKey)) state.completedLabs.push(activityKey);
    state.started = true;
    state.currentModule = moduleId;
    updateCalculatedProgress(course, state);
    state.updatedAt = Timestamp.now();
    maybeIssueCourseCertificate(transaction, student, course, state);
    transaction.set(progressRef, state, {merge: true});
    return state;
  });
  return {progress: forClient(progress)};
});


/* =========================================================
   SERVER-VERIFIED ASSESSMENTS
========================================================= */

exports.submitModuleAssessment = onCall(CALLABLE_OPTIONS, async (request) => {
  const student = requireStudent(request);
  const courseId = requireId(request.data?.courseId, "Course ID");
  const moduleId = requireId(request.data?.moduleId, "Module ID");
  const answers = requireAnswers(request.data?.answers);
  const {course, children} = await getCourseAccess(student.uid, courseId, [
    `modules/${moduleId}`,
    `modules/${moduleId}/assessments/module`,
  ]);
  await requireCoursePrerequisites(student.uid, course);
  const module = children[0];
  const assessment = children[1];
  const result = scoreAssessment(assessment, answers);
  const progressRef = db.doc(`users/${student.uid}/courseProgress/${courseId}`);
  const assessmentKey = `${moduleId}:assessment`;

  const progress = await db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(progressRef);
    const state = progressData(courseId, snapshot.data() || {});
    const lessonReady = (module.lessonKeys || []).every((key) =>
      state.completedLessons.includes(key),
    );
    const activityReady = (module.activityKeys || []).every((key) =>
      state.completedLabs.includes(key),
    );
    if (!lessonReady || !activityReady) {
      throw new HttpsError(
          "failed-precondition",
          "Complete the module lessons and required activities first.",
      );
    }
    assertAttemptCooldown(state, `module:${moduleId}`);
    recordAttempt(state, `module:${moduleId}`, result);
    state.assessmentScores[moduleId] = Math.max(
        Number(state.assessmentScores[moduleId] || 0), result.percentage,
    );
    if (result.passed && !state.completedAssessments.includes(assessmentKey)) {
      state.completedAssessments.push(assessmentKey);
    }
    state.started = true;
    state.currentModule = moduleId;
    updateCalculatedProgress(course, state);
    state.updatedAt = Timestamp.now();
    maybeIssueCourseCertificate(transaction, student, course, state);
    transaction.set(progressRef, state, {merge: true});
    return state;
  });
  return {
    ...result,
    bestScore: progress.assessmentScores[moduleId],
    progress: forClient(progress),
  };
});

exports.submitFinalAssessment = onCall(CALLABLE_OPTIONS, async (request) => {
  const student = requireStudent(request);
  const courseId = requireId(request.data?.courseId, "Course ID");
  const answers = requireAnswers(request.data?.answers);
  const {course, children} = await getCourseAccess(
      student.uid, courseId, ["assessments/final"],
  );
  await requireCoursePrerequisites(student.uid, course);
  const result = scoreAssessment(children[0], answers);
  const progressRef = db.doc(`users/${student.uid}/courseProgress/${courseId}`);

  const outcome = await db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(progressRef);
    const state = progressData(courseId, snapshot.data() || {});
    const required = requirements(course);
    const eligible = required.lessons.every((key) => state.completedLessons.includes(key)) &&
      required.activities.every((key) => state.completedLabs.includes(key)) &&
      required.assessments.every((key) => state.completedAssessments.includes(key));
    if (!eligible) {
      throw new HttpsError(
          "failed-precondition",
          "Complete all lessons, activities and module assessments first.",
      );
    }
    assertAttemptCooldown(state, "final");
    recordAttempt(state, "final", result);
    const previousBest = Number(state.finalAssessment?.bestScore || 0);
    state.finalAssessment = {
      score: result.percentage,
      bestScore: Math.max(previousBest, result.percentage),
      passed: state.finalAssessment?.passed === true || result.passed,
    };
    state.started = true;
    updateCalculatedProgress(course, state);
    state.updatedAt = Timestamp.now();
    const credentialId = maybeIssueCourseCertificate(
        transaction, student, course, state,
    );
    transaction.set(progressRef, state, {merge: true});
    return {progress: state, credentialId};
  });
  return {
    ...result,
    ...outcome,
    progress: forClient(outcome.progress),
  };
});

exports.ensureCourseCertificate = onCall(CALLABLE_OPTIONS, async (request) => {
  const student = requireStudent(request);
  const courseId = requireId(request.data?.courseId, "Course ID");
  const {course} = await getCourseAccess(student.uid, courseId);
  const progressRef = db.doc(`users/${student.uid}/courseProgress/${courseId}`);

  return db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(progressRef);
    if (!snapshot.exists) {
      throw new HttpsError("failed-precondition", "No course progress was found.");
    }
    const state = updateCalculatedProgress(
        course, progressData(courseId, snapshot.data()),
    );
    if (!state.certificateEligible) {
      throw new HttpsError("failed-precondition", "Course completion is not verified.");
    }
    const credentialId = maybeIssueCourseCertificate(
        transaction, student, course, state,
    );
    state.updatedAt = Timestamp.now();
    transaction.set(progressRef, state, {merge: true});
    return {credentialId, progress: forClient(state)};
  });
});


/* =========================================================
   CAPSTONE REVIEW
========================================================= */

function clip(value, maximum) {
  return String(value || "").trim().slice(0, maximum);
}

function capstoneSubmission(data = {}, capstone) {
  const validTaskIds = new Set((capstone.tasks || []).map((task) => task.id));
  const completedTasks = Array.isArray(data.completedTasks) ?
    [...new Set(data.completedTasks.map(normalize).filter((id) => validTaskIds.has(id)))] : [];
  const findings = Array.isArray(data.findings) ? data.findings.slice(0, MAX_FINDINGS)
      .map((finding = {}, index) => ({
        id: clip(finding.id || `finding-${index + 1}`, 80),
        title: clip(finding.title, 200),
        asset: clip(finding.asset, 300),
        severity: ["Informational", "Low", "Medium", "High", "Critical"]
            .includes(finding.severity) ? finding.severity : "Medium",
        evidence: clip(finding.evidence, 6000),
        impact: clip(finding.impact, 4000),
        remediation: clip(finding.remediation, 4000),
        retest: clip(finding.retest, 3000),
      })) : [];

  return {
    completedTasks,
    methodologySummary: clip(data.methodologySummary, 8000),
    executiveSummary: clip(data.executiveSummary, 8000),
    attackSurfaceSummary: clip(data.attackSurfaceSummary, 8000),
    findings,
    integrityDeclaration: data.integrityDeclaration === true,
  };
}

function wordCount(value) {
  return String(value || "").trim().split(/\s+/).filter(Boolean).length;
}

function capstoneReadiness(submission, capstone) {
  const gates = capstone.gradingRubric?.mandatoryGates || {};
  const requiredTasks = (capstone.tasks || []).filter((task) => task.required !== false);
  const completeFindings = submission.findings.filter((finding) =>
    wordCount(finding.title) >= 2 && wordCount(finding.asset) >= 1 &&
    wordCount(finding.evidence) >= 8 && wordCount(finding.impact) >= 12 &&
    wordCount(finding.remediation) >= 12 && wordCount(finding.retest) >= 8,
  );
  const minimumFindings = Number(gates.minimumFindings || 1);
  const missingTasks = requiredTasks.filter((task) =>
    !submission.completedTasks.includes(task.id),
  );
  const blockers = [];
  if (gates.requireAllTasks && missingTasks.length) blockers.push("required tasks");
  if (completeFindings.length < minimumFindings) blockers.push("complete findings");
  if (wordCount(submission.executiveSummary) <
      Number(gates.minimumExecutiveSummaryWords || 0)) blockers.push("executive summary");
  if (gates.requireAcademicIntegrityDeclaration &&
      !submission.integrityDeclaration) blockers.push("integrity declaration");
  return {ready: blockers.length === 0, blockers};
}

async function requirePathCourses(uid, pathId) {
  const pathSnapshot = await db.collection("protectedLearningPaths").doc(pathId).get();
  if (!pathSnapshot.exists) throw new HttpsError("not-found", "Learning path not found.");
  const path = pathSnapshot.data() || {};
  const courseIds = (path.stages || [])
      .filter((stage) => stage.type === "course" && stage.required !== false)
      .map((stage) => stage.courseId);
  const progressSnapshots = await Promise.all(courseIds.map((courseId) =>
    db.doc(`users/${uid}/courseProgress/${courseId}`).get(),
  ));
  const missing = courseIds.filter((courseId, index) =>
    progressSnapshots[index].data()?.completed !== true,
  );
  if (missing.length) {
    throw new HttpsError(
        "failed-precondition",
        `Complete the required courses first: ${missing.join(", ")}.`,
    );
  }
  return path;
}

async function loadCapstoneForStudent(student, capstoneId) {
  const [snapshot, entitlement] = await Promise.all([
    db.collection("protectedCapstones").doc(capstoneId).get(),
    db.collection("entitlements").doc(student.uid).get(),
  ]);
  if (!snapshot.exists) throw new HttpsError("not-found", "Capstone not found.");
  const capstone = snapshot.data() || {};
  if (requiresPro(capstone) && !hasActivePro(entitlement.data() || {})) {
    throw new HttpsError("permission-denied", "An active CWS Pro plan is required.");
  }
  await requirePathCourses(student.uid, capstone.pathId);
  return capstone;
}

exports.saveCapstoneDraft = onCall(CALLABLE_OPTIONS, async (request) => {
  const student = requireStudent(request);
  const capstoneId = requireId(request.data?.capstoneId, "Capstone ID");
  const capstone = await loadCapstoneForStudent(student, capstoneId);
  const submission = capstoneSubmission(request.data?.submission, capstone);
  const ref = db.doc(`users/${student.uid}/capstones/${capstoneId}`);
  const existing = await ref.get();
  if (["pending_review", "approved"].includes(existing.data()?.reviewStatus)) {
    throw new HttpsError("failed-precondition", "This submission can no longer be edited.");
  }
  await ref.set({
    ...submission,
    capstoneId,
    pathId: capstone.pathId,
    submitted: false,
    passed: false,
    reviewStatus: "draft",
    updatedAt: FieldValue.serverTimestamp(),
  }, {merge: true});
  return {saved: true, reviewStatus: "draft"};
});

exports.submitCapstone = onCall(CALLABLE_OPTIONS, async (request) => {
  const student = requireStudent(request);
  const capstoneId = requireId(request.data?.capstoneId, "Capstone ID");
  const capstone = await loadCapstoneForStudent(student, capstoneId);
  const submission = capstoneSubmission(request.data?.submission, capstone);
  const readiness = capstoneReadiness(submission, capstone);
  if (!readiness.ready) {
    throw new HttpsError(
        "failed-precondition",
        `Complete the following before submission: ${readiness.blockers.join(", ")}.`,
    );
  }
  await db.doc(`users/${student.uid}/capstones/${capstoneId}`).set({
    ...submission,
    capstoneId,
    pathId: capstone.pathId,
    submitted: true,
    submittedAt: FieldValue.serverTimestamp(),
    passed: false,
    score: null,
    reviewStatus: "pending_review",
    updatedAt: FieldValue.serverTimestamp(),
  }, {merge: true});
  return {submitted: true, reviewStatus: "pending_review"};
});

exports.reviewCapstone = onCall(CALLABLE_OPTIONS, async (request) => {
  requireStudent(request);
  if (request.auth.token?.admin !== true && request.auth.token?.instructor !== true) {
    throw new HttpsError("permission-denied", "Instructor access is required.");
  }
  const uid = String(request.data?.uid || "").trim();
  if (!/^[A-Za-z0-9_-]{20,128}$/.test(uid)) {
    throw new HttpsError("invalid-argument", "Student UID is invalid.");
  }
  const capstoneId = requireId(request.data?.capstoneId, "Capstone ID");
  const decision = normalize(request.data?.decision);
  if (!["approved", "rejected"].includes(decision)) {
    throw new HttpsError("invalid-argument", "Decision must be approved or rejected.");
  }
  const score = Math.max(0, Math.min(100, Number(request.data?.score) || 0));
  const feedback = clip(request.data?.feedback, 8000);
  const ref = db.doc(`users/${uid}/capstones/${capstoneId}`);
  const snapshot = await ref.get();
  if (!snapshot.exists || snapshot.data()?.reviewStatus !== "pending_review") {
    throw new HttpsError("failed-precondition", "No pending submission was found.");
  }
  await ref.set({
    reviewStatus: decision,
    passed: decision === "approved",
    score,
    reviewerFeedback: feedback,
    reviewedBy: request.auth.uid,
    reviewedAt: FieldValue.serverTimestamp(),
    passedAt: decision === "approved" ? FieldValue.serverTimestamp() : null,
    updatedAt: FieldValue.serverTimestamp(),
  }, {merge: true});
  return {reviewStatus: decision, passed: decision === "approved", score};
});


/* =========================================================
   SERVER-ISSUED CAREER PATH CREDENTIALS
========================================================= */

exports.issueCareerPathCertificate = onCall(CALLABLE_OPTIONS, async (request) => {
  const student = requireStudent(request);
  const pathId = requireId(request.data?.pathId, "Learning path ID");
  const path = await requirePathCourses(student.uid, pathId);
  const capstoneStages = (path.stages || []).filter((stage) =>
    stage.type === "capstone" && stage.required !== false,
  );
  let capstoneScore = 0;
  for (const stage of capstoneStages) {
    const snapshot = await db.doc(
        `users/${student.uid}/capstones/${stage.capstoneId}`,
    ).get();
    const submission = snapshot.data() || {};
    if (submission.passed !== true || submission.reviewStatus !== "approved") {
      throw new HttpsError(
          "failed-precondition",
          "The required capstone must be approved by an instructor first.",
      );
    }
    capstoneScore = Math.max(capstoneScore, Number(submission.score || 0));
  }

  const privateRef = db.doc(
      `users/${student.uid}/careerPathCertificates/${pathId}`,
  );
  return db.runTransaction(async (transaction) => {
    const existing = await transaction.get(privateRef);
    if (existing.exists) return {credential: forClient(existing.data())};

    const credentialId = certificateId("PATH");
    const issuedAt = Timestamp.now();
    const credential = {
      pathId,
      pathTitle: path.title,
      credentialTitle: path.credentialTitle ||
        `CWS ${path.title} Path Certificate`,
      credentialId,
      issuedAt,
      capstoneScore,
      status: "verified",
    };
    const publicRecord = {
      ...credential,
      credentialType: "career-path",
      tier: "professional",
      status: "active",
      studentName: student.name,
      description: path.description || "CWS Academy professional path credential.",
      capstonePassed: true,
      issuer: "CWS Academy",
      ecosystem: "CyberWithSandiso",
      verificationVersion: 2,
    };
    transaction.create(privateRef, {
      ...credential,
      createdAt: issuedAt,
      updatedAt: issuedAt,
    });
    transaction.create(
        db.collection("certificateVerifications").doc(credentialId),
        publicRecord,
    );
    return {credential: forClient(credential)};
  });
});
