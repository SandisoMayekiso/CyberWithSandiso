/* =========================================================
   CWS ACADEMY
   FINAL ASSESSMENT SYSTEM
========================================================= */

"use strict";


/* =========================================================
   FIREBASE AUTH
========================================================= */

import {
    onAuthStateChanged,
    signOut
} from
"https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";


/* =========================================================
   FIRESTORE
========================================================= */

import {
    doc,
    getDoc
} from
"https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";


/* =========================================================
   FIREBASE CONFIG
========================================================= */

import {
    auth,
    db
} from "./firebase-config.js";


/* =========================================================
   COURSE REGISTRY
========================================================= */

import {
    getCourse
} from "../data/courses.js";


/* =========================================================
   ACCESS CONTROL
========================================================= */

import {
    getUserEntitlement,
    canAccessItem,
    getRequiredAccess,
    getUpgradeUrl
} from "./access-control.js";


import {
    getProtectedAssessment,
    submitSecureFinalAssessment
} from "./secure-learning-api.js";


/* =========================================================
   DOM
========================================================= */

const finalLoading =
    document.getElementById(
        "finalLoading"
    );

const finalNotFound =
    document.getElementById(
        "finalNotFound"
    );

const finalNotFoundMessage =
    document.getElementById(
        "finalNotFoundMessage"
    );

const finalContent =
    document.getElementById(
        "finalContent"
    );

const studentName =
    document.getElementById(
        "studentName"
    );

const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );

const headerCourseTitle =
    document.getElementById(
        "headerCourseTitle"
    );

const headerCourseCategory =
    document.getElementById(
        "headerCourseCategory"
    );

const courseBreadcrumbLink =
    document.getElementById(
        "courseBreadcrumbLink"
    );

const assessmentCategory =
    document.getElementById(
        "assessmentCategory"
    );

const assessmentTitle =
    document.getElementById(
        "assessmentTitle"
    );

const assessmentDescription =
    document.getElementById(
        "assessmentDescription"
    );

const passingScoreMeta =
    document.getElementById(
        "passingScoreMeta"
    );

const questionCountMeta =
    document.getElementById(
        "questionCountMeta"
    );

const assessmentDurationMeta =
    document.getElementById(
        "assessmentDurationMeta"
    );

const bestScore =
    document.getElementById(
        "bestScore"
    );

const assessmentStatus =
    document.getElementById(
        "assessmentStatus"
    );

const assessmentStatusText =
    document.getElementById(
        "assessmentStatusText"
    );

const courseProgressPercent =
    document.getElementById(
        "courseProgressPercent"
    );

const courseProgressText =
    document.getElementById(
        "courseProgressText"
    );

const eligibilityCard =
    document.getElementById(
        "eligibilityCard"
    );

const eligibilityTitle =
    document.getElementById(
        "eligibilityTitle"
    );

const eligibilityText =
    document.getElementById(
        "eligibilityText"
    );

const finalAssessmentForm =
    document.getElementById(
        "finalAssessmentForm"
    );

const assessmentQuestions =
    document.getElementById(
        "assessmentQuestions"
    );

const submitAssessmentBtn =
    document.getElementById(
        "submitAssessmentBtn"
    );

const assessmentResult =
    document.getElementById(
        "assessmentResult"
    );

const courseCompleteCard =
    document.getElementById(
        "courseCompleteCard"
    );

const courseCompleteTitle =
    document.getElementById(
        "courseCompleteTitle"
    );

const courseCompleteText =
    document.getElementById(
        "courseCompleteText"
    );

const returnToCourseBtn =
    document.getElementById(
        "returnToCourseBtn"
    );

const finishBtn =
    document.getElementById(
        "finishBtn"
    );

const answeredQuestions =
    document.getElementById(
        "answeredQuestions"
    );

const totalQuestions =
    document.getElementById(
        "totalQuestions"
    );

const assessmentDraftStatus =
    document.getElementById(
        "assessmentDraftStatus"
    );

const assessmentProgressFill =
    document.getElementById(
        "assessmentProgressFill"
    );

const assessmentQuestionNav =
    document.getElementById(
        "assessmentQuestionNav"
    );


/* =========================================================
   STATE
========================================================= */

let currentUser =
    null;

let currentCourse =
    null;

let currentAssessment =
    null;

let currentProgress =
    null;

let currentEntitlement =
    null;

let finalInitialized =
    false;


/* =========================================================
   URL
========================================================= */

function getUrlParameters() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    return {

        courseId:
            String(
                params.get("course") || ""
            )
                .trim()
                .toLowerCase()

    };

}


/* =========================================================
   USER NAME
========================================================= */

function getUserName(user) {

    if (!user) {

        return "Student";

    }


    if (
        typeof user.displayName ===
            "string" &&
        user.displayName.trim()
    ) {

        return user.displayName.trim();

    }


    if (
        typeof user.email === "string" &&
        user.email.includes("@")
    ) {

        const raw =
            user.email
                .split("@")[0]
                .replace(
                    /[._-]+/g,
                    " "
                )
                .trim();


        if (raw) {

            return raw
                .split(" ")
                .map(
                    part =>
                        part.charAt(0)
                            .toUpperCase() +
                        part.slice(1)
                )
                .join(" ");

        }

    }


    return "Student";

}


/* =========================================================
   PAGE STATE
========================================================= */

function showLoading() {

    finalLoading.hidden =
        false;

    finalNotFound.hidden =
        true;

    finalContent.hidden =
        true;

}


function showNotFound(message) {

    finalLoading.hidden =
        true;

    finalContent.hidden =
        true;

    finalNotFoundMessage.textContent =
        message;

    finalNotFound.hidden =
        false;

}


function showContent() {

    finalLoading.hidden =
        true;

    finalNotFound.hidden =
        true;

    finalContent.hidden =
        false;

}


/* =========================================================
   PROGRESS
========================================================= */

function getDefaultProgress() {

    return {

        courseId:
            currentCourse?.id || "",

        completedLessons:
            [],

        passedLessonQuizzes:
            {},

        completedLabs:
            [],

        completedAssessments:
            [],

        assessmentScores:
            {},

        finalAssessment:
            {
                bestScore: 0,
                score: 0,
                passed: false
            },

        currentModule:
            "",

        currentLesson:
            "",

        progressPercent:
            0,

        started:
            true,

        completed:
            false,

        certificateEligible:
            false

    };

}


function normalizeProgress(
    progress = {}
) {

    const defaults =
        getDefaultProgress();


    return {

        ...defaults,
        ...progress,

        completedLessons:
            Array.isArray(
                progress.completedLessons
            )
                ? progress.completedLessons
                : [],

        completedLabs:
            Array.isArray(
                progress.completedLabs
            )
                ? progress.completedLabs
                : [],

        completedAssessments:
            Array.isArray(
                progress.completedAssessments
            )
                ? progress.completedAssessments
                : [],

        passedLessonQuizzes:
            (
                progress.passedLessonQuizzes &&
                typeof progress.passedLessonQuizzes ===
                    "object"
            )
                ? progress.passedLessonQuizzes
                : {},

        assessmentScores:
            (
                progress.assessmentScores &&
                typeof progress.assessmentScores ===
                    "object"
            )
                ? progress.assessmentScores
                : {},

        finalAssessment:
            (
                progress.finalAssessment &&
                typeof progress.finalAssessment ===
                    "object"
            )
                ? {
                    ...defaults.finalAssessment,
                    ...progress.finalAssessment
                }
                : defaults.finalAssessment

    };

}


function getProgressRef() {

    if (
        !db ||
        !currentUser ||
        !currentCourse
    ) {

        return null;

    }


    return doc(
        db,
        "users",
        currentUser.uid,
        "courseProgress",
        currentCourse.id
    );

}


async function loadProgress() {

    currentProgress =
        getDefaultProgress();


    if (!db) {

        return;

    }


    try {

        const ref =
            getProgressRef();


        if (!ref) {

            return;

        }


        const snapshot =
            await getDoc(
                ref
            );


        if (
            snapshot.exists()
        ) {

            currentProgress =
                normalizeProgress(
                    snapshot.data()
                );

        }

    }
    catch (err) {

        console.error(
            "[CWS Final] Progress load failed:",
            err
        );

    }

}


/* =========================================================
   COURSE REQUIREMENTS
========================================================= */

function getAllRequiredLessonKeys() {

    const keys =
        [];


    const modules =
        Array.isArray(
            currentCourse?.modules
        )
            ? currentCourse.modules
            : [];


    modules.forEach(
        module => {

            const lessons =
                Array.isArray(
                    module.lessons
                )
                    ? module.lessons
                    : [];


            lessons.forEach(
                lesson => {

                    keys.push(
                        `${module.id}:${lesson.id}`
                    );

                }
            );

        }
    );


    return keys;

}


function getAllRequiredActivityKeys() {

    const keys =
        [];


    const modules =
        Array.isArray(
            currentCourse?.modules
        )
            ? currentCourse.modules
            : [];


    modules.forEach(
        module => {

            const activities = [
                ...(
                    Array.isArray(
                        module.labActivities
                    )
                        ? module.labActivities
                        : []
                ),
                ...(
                    Array.isArray(
                        module.practiceActivities
                    )
                        ? module.practiceActivities
                        : []
                )
            ];


            activities.forEach(
                activity => {

                    keys.push(
                        `${module.id}:${activity.id}`
                    );

                }
            );

        }
    );


    return keys;

}


function getAllRequiredAssessmentKeys() {

    const keys =
        [];


    const modules =
        Array.isArray(
            currentCourse?.modules
        )
            ? currentCourse.modules
            : [];


    modules.forEach(
        module => {

            if (
                module.moduleAssessment &&
                Array.isArray(
                    module.moduleAssessment.questions
                ) &&
                module.moduleAssessment.questions.length
            ) {

                keys.push(
                    `${module.id}:assessment`
                );

            }

        }
    );


    return keys;

}


function includesAll(
    completed,
    required
) {

    return required.every(
        key =>
            completed.includes(
                key
            )
    );

}


function getEligibility() {

    const requiredLessons =
        getAllRequiredLessonKeys();


    const requiredActivities =
        getAllRequiredActivityKeys();


    const requiredAssessments =
        getAllRequiredAssessmentKeys();


    const lessonsComplete =
        includesAll(
            currentProgress
                ?.completedLessons || [],
            requiredLessons
        );


    const activitiesRequired =
        Boolean(
            currentCourse
                ?.completionRules
                ?.requireRequiredLabs
        );


    const activitiesComplete =
        !activitiesRequired ||
        includesAll(
            currentProgress
                ?.completedLabs || [],
            requiredActivities
        );


    const assessmentsRequired =
        currentCourse
            ?.completionRules
            ?.requireAllModuleAssessments !==
        false;


    const assessmentsComplete =
        !assessmentsRequired ||
        includesAll(
            currentProgress
                ?.completedAssessments || [],
            requiredAssessments
        );


    return {

        lessonsComplete,
        activitiesComplete,
        assessmentsComplete,

        eligible:
            lessonsComplete &&
            activitiesComplete &&
            assessmentsComplete,

        requiredLessons:
            requiredLessons.length,

        requiredActivities:
            activitiesRequired
                ? requiredActivities.length
                : 0,

        requiredAssessments:
            assessmentsRequired
                ? requiredAssessments.length
                : 0

    };

}


/* =========================================================
   PROGRESS CALCULATION
========================================================= */

function calculateCourseProgress() {

    const eligibility =
        getEligibility();


    const total =
        eligibility.requiredLessons +
        eligibility.requiredActivities +
        eligibility.requiredAssessments +
        1;


    if (!total) {

        return 0;

    }


    const completedLessons =
        Math.min(
            currentProgress
                ?.completedLessons
                ?.length || 0,
            eligibility.requiredLessons
        );


    const completedLabs =
        Math.min(
            currentProgress
                ?.completedLabs
                ?.length || 0,
            eligibility.requiredActivities
        );


    const completedAssessments =
        Math.min(
            currentProgress
                ?.completedAssessments
                ?.length || 0,
            eligibility.requiredAssessments
        );


    const finalComplete =
        currentProgress
            ?.finalAssessment
            ?.passed
                ? 1
                : 0;


    return Math.round(
        (
            completedLessons +
            completedLabs +
            completedAssessments +
            finalComplete
        ) /
        total *
        100
    );

}


/* =========================================================
   ACCESS
========================================================= */

function hasAccess() {

    return (
        canAccessItem(
            currentCourse,
            currentEntitlement
        ) &&
        canAccessItem(
            currentAssessment,
            currentEntitlement
        )
    );

}


function redirectToUpgrade() {

    const levels = [
        currentCourse,
        currentAssessment
    ]
        .filter(Boolean)
        .map(
            item =>
                getRequiredAccess(item)
        );


    const plan =
        levels.includes("pro")
            ? "pro"
            : "free";


    window.location.replace(
        getUpgradeUrl(
            plan
        )
    );

}


/* =========================================================
   RENDER
========================================================= */

function renderFinalAssessment() {

    document.title =
        `${currentAssessment.title} | ${currentCourse.title} | CWS Academy`;


    studentName.textContent =
        getUserName(
            currentUser
        );


    headerCourseTitle.textContent =
        currentCourse.title;


    headerCourseCategory.textContent =
        currentCourse.category;


    assessmentCategory.textContent =
        currentCourse.category;


    assessmentTitle.textContent =
        currentAssessment.title;


    assessmentDescription.textContent =
        currentAssessment.description ||
        "Complete the final assessment to finish the course.";


    passingScoreMeta.textContent =
        `${Number(
            currentAssessment.passingScore
        ) || 75}%`;


    const questions =
        Array.isArray(
            currentAssessment.questions
        )
            ? currentAssessment.questions
            : [];


    questionCountMeta.textContent =
        String(
            questions.length
        );


    assessmentDurationMeta.textContent =
        currentAssessment.duration ||
        "45â€“60 minutes";


    courseBreadcrumbLink.textContent =
        currentCourse.title;


    courseBreadcrumbLink.href =
        `course-details.html?course=${encodeURIComponent(
            currentCourse.id
        )}`;


    returnToCourseBtn.href =
        courseBreadcrumbLink.href;


    renderQuestions();

    updateUI();

}


/* =========================================================
   QUESTIONS
========================================================= */

function renderQuestions() {

    assessmentQuestions.innerHTML =
        "";


    const questions =
        Array.isArray(
            currentAssessment?.questions
        )
            ? currentAssessment.questions
            : [];


    questions.forEach(
        (
            question,
            index
        ) => {

            const card =
                document.createElement(
                    "section"
                );


            card.className =
                "assessment-question-card";

            card.id =
                `final-question-card-${index}`;


            const number =
                document.createElement(
                    "span"
                );


            number.className =
                "assessment-question-number";


            number.textContent =
                `QUESTION ${String(
                    index + 1
                ).padStart(
                    2,
                    "0"
                )}`;


            const heading =
                document.createElement(
                    "h3"
                );


            heading.textContent =
                question.question;


            const options =
                document.createElement(
                    "div"
                );


            options.className =
                "assessment-options";


            (
                Array.isArray(
                    question.options
                )
                    ? question.options
                    : []
            )
                .forEach(
                    (
                        option,
                        optionIndex
                    ) => {

                        const label =
                            document.createElement(
                                "label"
                            );


                        label.className =
                            "assessment-option";


                        const input =
                            document.createElement(
                                "input"
                            );


                        input.type =
                            "radio";


                        input.name =
                            `final-question-${index}`;


                        input.value =
                            String(
                                optionIndex
                            );


                        input.required =
                            true;


                        const marker =
                            document.createElement(
                                "span"
                            );


                        marker.className =
                            "assessment-option-marker";


                        marker.textContent =
                            String.fromCharCode(
                                65 +
                                optionIndex
                            );


                        const text =
                            document.createElement(
                                "span"
                            );


                        text.className =
                            "assessment-option-text";


                        text.textContent =
                            option;


                        label.append(
                            input,
                            marker,
                            text
                        );


                        options.appendChild(
                            label
                        );

                    }
                );


            card.append(
                number,
                heading,
                options
            );


            assessmentQuestions
                .appendChild(
                    card
                );

        }
    );


    restoreDraftAnswers();
    renderQuestionNavigation();
    updateAttemptProgress();

}


/* =========================================================
   ATTEMPT DRAFT + QUESTION NAVIGATION
   Drafts contain only selected option indexes. The backend
   remains the authority for scores, progress and completion.
========================================================= */

function getDraftKey() {
    if (
        !currentUser ||
        !currentCourse
    ) {
        return "";
    }

    return [
        "cws",
        "final-assessment-draft",
        currentUser.uid,
        currentCourse.id
    ].join(":");
}

function collectAnswers() {
    const questions =
        Array.isArray(currentAssessment?.questions)
            ? currentAssessment.questions
            : [];

    return questions.map((question, index) => {
        const selected =
            document.querySelector(
                `input[name="final-question-${index}"]:checked`
            );

        return selected
            ? Number(selected.value)
            : null;
    });
}

function saveDraftAnswers() {
    const key = getDraftKey();

    if (!key) return;

    try {
        sessionStorage.setItem(
            key,
            JSON.stringify({
                answers: collectAnswers(),
                savedAt: Date.now()
            })
        );

        if (assessmentDraftStatus) {
            assessmentDraftStatus.textContent =
                "Saved for this browser session.";
        }
    }
    catch (storageError) {
        warn("Unable to save final assessment draft", storageError);

        if (assessmentDraftStatus) {
            assessmentDraftStatus.textContent =
                "Draft saving is unavailable; keep this page open.";
        }
    }
}

function restoreDraftAnswers() {
    const key = getDraftKey();

    if (!key) return;

    try {
        const draft =
            JSON.parse(
                sessionStorage.getItem(key) || "null"
            );

        if (!Array.isArray(draft?.answers)) {
            return;
        }

        draft.answers.forEach((answer, index) => {
            if (!Number.isInteger(answer)) return;

            const input =
                document.querySelector(
                    `input[name="final-question-${index}"][value="${answer}"]`
                );

            if (input) input.checked = true;
        });

        if (assessmentDraftStatus) {
            assessmentDraftStatus.textContent =
                "Your in-session answers were restored.";
        }
    }
    catch (storageError) {
        warn("Unable to restore final assessment draft", storageError);
    }
}

function clearDraftAnswers() {
    const key = getDraftKey();

    if (!key) return;

    try {
        sessionStorage.removeItem(key);
    }
    catch (storageError) {
        warn("Unable to clear final assessment draft", storageError);
    }
}

function renderQuestionNavigation() {
    if (!assessmentQuestionNav) return;

    assessmentQuestionNav.innerHTML = "";

    const questions =
        Array.isArray(currentAssessment?.questions)
            ? currentAssessment.questions
            : [];

    questions.forEach((question, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = String(index + 1);
        button.dataset.questionIndex = String(index);
        button.setAttribute(
            "aria-label",
            `Go to question ${index + 1}`
        );
        button.addEventListener("click", () => {
            document
                .getElementById(
                    `final-question-card-${index}`
                )
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
        });
        assessmentQuestionNav.appendChild(button);
    });
}

function updateAttemptProgress() {
    const answers = collectAnswers();
    const answered =
        answers.filter(answer => answer !== null).length;
    const total = answers.length;
    const percent =
        total > 0
            ? Math.round((answered / total) * 100)
            : 0;

    if (answeredQuestions) {
        answeredQuestions.textContent = String(answered);
    }

    if (totalQuestions) {
        totalQuestions.textContent = String(total);
    }

    if (assessmentProgressFill) {
        assessmentProgressFill.style.width = `${percent}%`;
    }

    assessmentQuestions
        ?.querySelectorAll(".assessment-question-card")
        .forEach((card, index) => {
            card.classList.toggle(
                "answered",
                answers[index] !== null
            );
        });

    assessmentQuestionNav
        ?.querySelectorAll("button")
        .forEach((button, index) => {
            button.classList.toggle(
                "answered",
                answers[index] !== null
            );
        });
}

function focusFirstUnanswered(answers) {
    const index =
        answers.findIndex(answer => answer === null);

    if (index < 0) return;

    const card =
        document.getElementById(
            `final-question-card-${index}`
        );

    card?.classList.add("needs-answer");
    card?.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    window.setTimeout(
        () => card?.classList.remove("needs-answer"),
        1800
    );
}


/* =========================================================
   UI
========================================================= */

function updateUI() {

    const eligibility =
        getEligibility();


    const passed =
        Boolean(
            currentProgress
                ?.finalAssessment
                ?.passed
        );


    const recordedScore =
        Number(
            currentProgress
                ?.finalAssessment
                ?.bestScore ??
            currentProgress
                ?.finalAssessment
                ?.score ??
            0
        );


    bestScore.textContent =
        recordedScore > 0
            ? `${recordedScore}%`
            : "â€”";


    assessmentStatus.textContent =
        passed
            ? "Passed"
            : (
                recordedScore > 0
                    ? "Retry required"
                    : "Not attempted"
            );


    assessmentStatus.classList.toggle(
        "passed",
        passed
    );


    if (passed) {

        assessmentStatusText.textContent =
            "Final assessment passed. Course complete.";

    }
    else if (
        eligibility.eligible
    ) {

        assessmentStatusText.textContent =
            "You are eligible to take the final assessment.";

    }
    else {

        assessmentStatusText.textContent =
            "Complete all required course work before submitting the final assessment.";

    }


    const percent =
        calculateCourseProgress();


    currentProgress.progressPercent =
        percent;


    courseProgressPercent.textContent =
        `${percent}%`;


    courseProgressText.textContent =
        `${currentProgress.completedLessons.length}/${eligibility.requiredLessons} lessons, ` +
        `${Math.min(currentProgress.completedLabs.length, eligibility.requiredActivities)}/${eligibility.requiredActivities} activities, ` +
        `${Math.min(currentProgress.completedAssessments.length, eligibility.requiredAssessments)}/${eligibility.requiredAssessments} module assessments completed.`;


    eligibilityCard.classList.toggle(
        "eligible",
        eligibility.eligible
    );


    eligibilityCard.querySelector(
        "i"
    ).className =
        eligibility.eligible
            ? "fa-solid fa-lock-open"
            : "fa-solid fa-lock";


    eligibilityTitle.textContent =
        eligibility.eligible
            ? "Final assessment unlocked"
            : "Complete the course requirements first";


    eligibilityText.textContent =
        eligibility.eligible
            ? "You have completed the required lessons, activities and module assessments."
            : "Lessons, required activities and module assessments must be complete before the final assessment can be submitted.";


    submitAssessmentBtn.disabled =
        !eligibility.eligible;


    if (passed) {

        courseCompleteCard.hidden =
            false;


        finishBtn.hidden =
            false;


        courseCompleteTitle.textContent =
            `${currentCourse.title} completed!`;


        courseCompleteText.textContent =
            currentCourse.certificateEligible
                ? "You passed the final assessment and are now eligible for course-completion recognition."
                : "You passed the final assessment and successfully completed the course.";

    }
    else {

        courseCompleteCard.hidden =
            true;


        finishBtn.hidden =
            true;

    }

}



/* =========================================================
   SUBMIT
========================================================= */

async function submitFinalAssessment(
    event
) {

    event.preventDefault();


    const eligibility =
        getEligibility();


    if (
        !eligibility.eligible
    ) {

        assessmentResult.hidden =
            false;


        assessmentResult.className =
            "assessment-result failed";


        assessmentResult.innerHTML = `

            <div class="assessment-result-icon">
                <i class="fa-solid fa-lock"></i>
            </div>

            <div>

                <strong>
                    Final assessment locked
                </strong>

                <p>
                    Complete all required lessons, activities
                    and module assessments before continuing.
                </p>

            </div>

        `;


        return;

    }


    const questions =
        Array.isArray(
            currentAssessment.questions
        )
            ? currentAssessment.questions
            : [];


    const answers =
        collectAnswers();


    if (answers.some(answer => answer === null)) {
        assessmentResult.hidden = false;
        assessmentResult.className =
            "assessment-result failed";
        assessmentResult.innerHTML = `
            <div class="assessment-result-icon">
                <i class="fa-solid fa-circle-exclamation"></i>
            </div>
            <div>
                <strong>Complete every question</strong>
                <p>Answer the highlighted question before submitting your final assessment.</p>
            </div>
        `;
        focusFirstUnanswered(answers);
        return;
    }


    let secureResult;


    submitAssessmentBtn.disabled = true;
    submitAssessmentBtn.setAttribute("aria-busy", "true");
    submitAssessmentBtn.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Verifying final result...';


    try {

        secureResult =
            await submitSecureFinalAssessment({
                courseId:
                    currentCourse.id,
                answers
            });

    }
    catch (secureError) {

        assessmentResult.hidden =
            false;


        assessmentResult.className =
            "assessment-result failed";


        assessmentResult.textContent =
            secureError.message;

        submitAssessmentBtn.removeAttribute("aria-busy");
        submitAssessmentBtn.innerHTML =
            '<i class="fa-solid fa-paper-plane"></i> Submit Final Assessment';

        updateUI();


        return;

    }


    const score =
        Number(
            secureResult.score ||
            0
        );


    const percentage =
        Number(
            secureResult.percentage ||
            0
        );


    const passingScore =
        Number(
            secureResult.passingScore ||
            currentAssessment.passingScore ||
            75
        );


    const passed =
        secureResult.passed ===
            true;


    currentProgress =
        normalizeProgress(
            secureResult.progress ||
            {}
        );


    clearDraftAnswers();

    submitAssessmentBtn.removeAttribute("aria-busy");
    submitAssessmentBtn.innerHTML =
        '<i class="fa-solid fa-paper-plane"></i> Submit Final Assessment';


    assessmentResult.hidden =
        false;


    assessmentResult.className =
        passed
            ? "assessment-result success"
            : "assessment-result failed";


    assessmentResult.innerHTML =
        passed
            ? `

                <div class="assessment-result-icon">
                    <i class="fa-solid fa-trophy"></i>
                </div>

                <div>

                    <strong>
                        Final assessment passed!
                    </strong>

                    <p>
                        You scored
                        ${score}/${questions.length}
                        (${percentage}%).
                        You have completed ${escapeHTML(
                            currentCourse.title
                        )}.
                    </p>

                </div>

            `
            : `

                <div class="assessment-result-icon">
                    <i class="fa-solid fa-rotate"></i>
                </div>

                <div>

                    <strong>
                        Final assessment not yet passed
                    </strong>

                    <p>
                        You scored
                        ${score}/${questions.length}
                        (${percentage}%).
                        You need ${passingScore}% to pass.
                        Review the course and try again.
                    </p>

                </div>

            `;


    updateUI();


    assessmentResult.scrollIntoView({
        behavior:
            "smooth",
        block:
            "nearest"
    });

}


/* =========================================================
   LOAD
========================================================= */

async function loadFinalAssessment() {

    showLoading();


    const {
        courseId
    } =
        getUrlParameters();


    if (!courseId) {

        showNotFound(
            "The final assessment URL is missing the course parameter."
        );

        return;

    }


    currentCourse =
        getCourse(
            courseId
        );


    if (!currentCourse) {

        showNotFound(
            "The requested course does not exist."
        );

        return;

    }


    currentAssessment =
        currentCourse
            .finalAssessment ||
        null;


    if (
        !currentAssessment
    ) {

        showNotFound(
            "This course does not currently have a final assessment."
        );

        return;

    }


    if (
        !hasAccess()
    ) {

        redirectToUpgrade();

        return;

    }


    try {

        const protectedResult =
            await getProtectedAssessment(
                currentCourse.id,
                "final"
            );


        currentAssessment =
            protectedResult.assessment ||
            null;

    }
    catch (secureError) {

        showNotFound(
            secureError.message
        );


        return;

    }


    if (
        !currentAssessment ||
        !Array.isArray(
            currentAssessment.questions
        ) ||
        !currentAssessment.questions.length
    ) {

        showNotFound(
            "This course does not currently have a final assessment."
        );


        return;

    }


    await loadProgress();


    renderFinalAssessment();


    showContent();

}


/* =========================================================
   LOGOUT
========================================================= */

async function logout() {

    try {

        await signOut(
            auth
        );


        window.location.replace(
            "login.html"
        );

    }
    catch (err) {

        console.error(
            "[CWS Final] Logout failed:",
            err
        );

    }

}


/* =========================================================
   ESCAPE
========================================================= */

function escapeHTML(value) {

    return String(
        value ?? ""
    )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   EVENTS
========================================================= */

finalAssessmentForm
    ?.addEventListener(
        "submit",
        submitFinalAssessment
    );

assessmentQuestions
    ?.addEventListener(
        "change",
        event => {
            if (!event.target.matches('input[type="radio"]')) {
                return;
            }

            saveDraftAnswers();
            updateAttemptProgress();
        }
    );


logoutBtn
    ?.addEventListener(
        "click",
        logout
    );


/* =========================================================
   AUTH
========================================================= */

if (!auth) {

    window.location.replace(
        "login.html"
    );

}
else {

    onAuthStateChanged(
        auth,
        async user => {

            if (!user) {

                const {
                    courseId
                } =
                    getUrlParameters();


                window.location.replace(

                    `login.html?redirect=final-assessment` +

                    `&course=${encodeURIComponent(
                        courseId
                    )}`

                );


                return;

            }


            currentUser =
                user;


            currentEntitlement =
                await getUserEntitlement(
                    user
                );


            if (
                finalInitialized
            ) {

                return;

            }


            finalInitialized =
                true;


            await loadFinalAssessment();

        }
    );

}
