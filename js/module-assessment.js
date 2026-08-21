/* =========================================================
   CWS ACADEMY
   MODULE ASSESSMENT SYSTEM
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
    getCourse,
    getModule
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
    submitSecureModuleAssessment
} from "./secure-learning-api.js";


/* =========================================================
   DEBUG
========================================================= */

const DEBUG = true;


function log(...args) {

    if (DEBUG) {

        console.log(
            "[CWS Assessment]",
            ...args
        );

    }

}


function warn(...args) {

    if (DEBUG) {

        console.warn(
            "[CWS Assessment]",
            ...args
        );

    }

}


function error(...args) {

    console.error(
        "[CWS Assessment]",
        ...args
    );

}


/* =========================================================
   DOM
========================================================= */

const assessmentLoading =
    document.getElementById(
        "assessmentLoading"
    );

const assessmentNotFound =
    document.getElementById(
        "assessmentNotFound"
    );

const assessmentNotFoundMessage =
    document.getElementById(
        "assessmentNotFoundMessage"
    );

const assessmentContent =
    document.getElementById(
        "assessmentContent"
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

const moduleBreadcrumb =
    document.getElementById(
        "moduleBreadcrumb"
    );

const moduleBadge =
    document.getElementById(
        "moduleBadge"
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

const moduleAssessmentForm =
    document.getElementById(
        "moduleAssessmentForm"
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

const returnToModuleBtn =
    document.getElementById(
        "returnToModuleBtn"
    );

const continueBtn =
    document.getElementById(
        "continueBtn"
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

let currentModule =
    null;

let currentAssessment =
    null;

let currentProgress =
    null;

let currentEntitlement =
    null;

let assessmentInitialized =
    false;


/* =========================================================
   URL PARAMETERS
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
                .toLowerCase(),

        moduleId:
            String(
                params.get("module") || ""
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
        typeof user.displayName === "string" &&
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

    if (assessmentLoading) {

        assessmentLoading.hidden =
            false;

    }


    if (assessmentNotFound) {

        assessmentNotFound.hidden =
            true;

    }


    if (assessmentContent) {

        assessmentContent.hidden =
            true;

    }

}


function showNotFound(message) {

    if (assessmentLoading) {

        assessmentLoading.hidden =
            true;

    }


    if (assessmentContent) {

        assessmentContent.hidden =
            true;

    }


    if (assessmentNotFoundMessage) {

        assessmentNotFoundMessage.textContent =
            message;

    }


    if (assessmentNotFound) {

        assessmentNotFound.hidden =
            false;

    }

}


function showContent() {

    if (assessmentLoading) {

        assessmentLoading.hidden =
            true;

    }


    if (assessmentNotFound) {

        assessmentNotFound.hidden =
            true;

    }


    if (assessmentContent) {

        assessmentContent.hidden =
            false;

    }

}


/* =========================================================
   PROGRESS HELPERS
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
                score: 0,
                passed: false
            },

        currentModule:
            currentModule?.id || "",

        currentLesson:
            "",

        progressPercent:
            0,

        started:
            true,

        completed:
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

        updateAssessmentStatusUI();

        return;

    }


    try {

        const progressRef =
            getProgressRef();


        if (!progressRef) {

            return;

        }


        const snapshot =
            await getDoc(
                progressRef
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

        error(
            "Progress load failed:",
            err
        );


        currentProgress =
            getDefaultProgress();

    }

}


/* =========================================================
   COURSE PROGRESS CALCULATION
========================================================= */

function getCourseProgressRequirements() {

    let totalLessons =
        0;

    let totalLabs =
        0;

    let totalAssessments =
        0;


    const modules =
        Array.isArray(
            currentCourse?.modules
        )
            ? currentCourse.modules
            : [];


    modules.forEach(
        module => {

            totalLessons +=
                Array.isArray(
                    module.lessons
                )
                    ? module.lessons.length
                    : 0;


            const labItems = [
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


            totalLabs +=
                labItems.length;


            if (
                module.moduleAssessment &&
                Array.isArray(
                    module.moduleAssessment.questions
                ) &&
                module.moduleAssessment.questions.length
            ) {

                totalAssessments +=
                    1;

            }

        }
    );


    const finalRequired =
        currentCourse?.finalAssessment
            ? 1
            : 0;


    return {

        totalLessons,
        totalLabs,
        totalAssessments,
        finalRequired,
        totalItems:
            totalLessons +
            totalLabs +
            totalAssessments +
            finalRequired

    };

}


function calculateCourseProgress() {

    const totals =
        getCourseProgressRequirements();


    if (!totals.totalItems) {

        return 0;

    }


    const completedLessons =
        currentProgress
            ?.completedLessons
            ?.length || 0;


    const completedLabs =
        currentProgress
            ?.completedLabs
            ?.length || 0;


    const completedAssessments =
        currentProgress
            ?.completedAssessments
            ?.length || 0;


    const finalCompleted =
        currentProgress
            ?.finalAssessment
            ?.passed
                ? 1
                : 0;


    const completedItems =
        Math.min(
            totals.totalItems,
            completedLessons +
            completedLabs +
            completedAssessments +
            finalCompleted
        );


    return Math.round(
        (
            completedItems /
            totals.totalItems
        ) * 100
    );

}


/* =========================================================
   MODULE COMPLETION HELPERS
========================================================= */

function getModuleAssessmentKey(
    moduleId
) {

    return `${moduleId}:assessment`;

}


function isAssessmentPassed() {

    if (
        !currentProgress ||
        !currentModule
    ) {

        return false;

    }


    return currentProgress
        .completedAssessments
        .includes(
            getModuleAssessmentKey(
                currentModule.id
            )
        );

}


function getRecordedScore() {

    if (
        !currentProgress ||
        !currentModule
    ) {

        return null;

    }


    const value =
        currentProgress
            .assessmentScores[
                currentModule.id
            ];


    return Number.isFinite(
        Number(value)
    )
        ? Number(value)
        : null;

}


/* =========================================================
   MODULE REQUIREMENTS
========================================================= */

function getModuleLessonKeys(
    module
) {

    const lessons =
        Array.isArray(
            module?.lessons
        )
            ? module.lessons
            : [];


    return lessons.map(
        lesson =>
            `${module.id}:${lesson.id}`
    );

}


function areModuleLessonsComplete() {

    const required =
        getModuleLessonKeys(
            currentModule
        );


    if (!required.length) {

        return true;

    }


    return required.every(
        key =>
            currentProgress
                ?.completedLessons
                ?.includes(key)
    );

}


/* =========================================================
   MODULE ACTIVITY KEYS
========================================================= */

function getModuleActivityKeys(
    module
) {

    const activities = [
        ...(
            Array.isArray(
                module?.labActivities
            )
                ? module.labActivities
                : []
        ),
        ...(
            Array.isArray(
                module?.practiceActivities
            )
                ? module.practiceActivities
                : []
        )
    ];


    return activities.map(
        activity =>
            `${module.id}:${activity.id}`
    );

}


/* =========================================================
   MODULE ACTIVITIES COMPLETE
========================================================= */

function areModuleActivitiesComplete() {

    const requireLabs =
        Boolean(
            currentCourse
                ?.completionRules
                ?.requireRequiredLabs
        );


    if (!requireLabs) {

        return true;

    }


    const required =
        getModuleActivityKeys(
            currentModule
        );


    if (!required.length) {

        return true;

    }


    return required.every(
        key =>
            currentProgress
                ?.completedLabs
                ?.includes(key)
    );

}


/*
 * For now, labs/practice activities are tracked separately.
 * Once lab.html is connected, this can become a strict gate
 * when completionRules.requireRequiredLabs is true.
 */

function canTakeCurrentAssessment() {

    return (
        areModuleLessonsComplete() &&
        areModuleActivitiesComplete()
    );

}


/* =========================================================
   NAVIGATION HELPERS
========================================================= */

function getFirstLesson(
    module
) {

    return (
        Array.isArray(
            module?.lessons
        )
            ? module.lessons[0] || null
            : null
    );

}


function buildLessonUrl(
    courseId,
    moduleId,
    lessonId
) {

    const params =
        new URLSearchParams();


    params.set(
        "course",
        courseId
    );


    params.set(
        "module",
        moduleId
    );


    params.set(
        "lesson",
        lessonId
    );


    return (
        `lesson.html?${params.toString()}`
    );

}


function buildAssessmentUrl(
    courseId,
    moduleId
) {

    const params =
        new URLSearchParams();


    params.set(
        "course",
        courseId
    );


    params.set(
        "module",
        moduleId
    );


    return (
        `module-assessment.html?${params.toString()}`
    );

}


function buildFinalAssessmentUrl(
    courseId
) {

    const params =
        new URLSearchParams();


    params.set(
        "course",
        courseId
    );


    return (
        `final-assessment.html?${params.toString()}`
    );

}


function getNextModule() {

    const modules =
        Array.isArray(
            currentCourse?.modules
        )
            ? currentCourse.modules
            : [];


    const index =
        modules.findIndex(
            module =>
                module.id ===
                currentModule?.id
        );


    if (
        index < 0 ||
        index >=
            modules.length - 1
    ) {

        return null;

    }


    return modules[
        index + 1
    ] || null;

}


/* =========================================================
   ACCESS CONTROL
========================================================= */

function hasAssessmentAccess() {

    if (
        !currentCourse ||
        !currentModule
    ) {

        return false;

    }


    if (
        !canAccessItem(
            currentCourse,
            currentEntitlement
        )
    ) {

        return false;

    }


    if (
        !canAccessItem(
            currentModule,
            currentEntitlement
        )
    ) {

        return false;

    }


    if (
        !canAccessItem(
            currentAssessment,
            currentEntitlement
        )
    ) {

        return false;

    }


    return true;

}


function redirectToUpgrade() {

    const requiredLevels = [
        currentCourse,
        currentModule,
        currentAssessment
    ]
        .filter(Boolean)
        .map(
            item =>
                getRequiredAccess(item)
        );


    const requiredPlan =
        requiredLevels.includes("pro")
            ? "pro"
            : "free";


    window.location.replace(
        getUpgradeUrl(
            requiredPlan
        )
    );

}


/* =========================================================
   RENDER ASSESSMENT
========================================================= */

function renderAssessment() {

    document.title =
        `${currentAssessment.title} | ${currentCourse.title} | CWS Academy`;


    headerCourseTitle.textContent =
        currentCourse.title;


    headerCourseCategory.textContent =
        currentCourse.category;


    studentName.textContent =
        getUserName(
            currentUser
        );


    courseBreadcrumbLink.textContent =
        currentCourse.title;


    const courseParams =
        new URLSearchParams();


    courseParams.set(
        "course",
        currentCourse.id
    );


    courseBreadcrumbLink.href =
        `course-details.html?${courseParams.toString()}`;


    moduleBreadcrumb.textContent =
        currentModule.title;


    moduleBadge.textContent =
        `MODULE ${String(
            currentModule.number
        ).padStart(
            2,
            "0"
        )}`;


    assessmentCategory.textContent =
        currentCourse.category;


    assessmentTitle.textContent =
        currentAssessment.title ||
        `${currentModule.title} Assessment`;


    assessmentDescription.textContent =
        currentAssessment.description ||
        `Complete this assessment to demonstrate your understanding of ${currentModule.title}.`;


    const passingScore =
        Number(
            currentAssessment.passingScore
        ) || 70;


    passingScoreMeta.textContent =
        `${passingScore}%`;


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


    renderQuestions();

    renderNavigation();

    updateAssessmentStatusUI();

}


/* =========================================================
   RENDER QUESTIONS
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

            const box =
                document.createElement(
                    "section"
                );


            box.className =
                "assessment-question-card";

            box.id =
                `assessment-question-card-${index}`;


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
                question.question ||
                `Question ${index + 1}`;


            const options =
                document.createElement(
                    "div"
                );


            options.className =
                "assessment-options";


            const questionOptions =
                Array.isArray(
                    question.options
                )
                    ? question.options
                    : [];


            questionOptions.forEach(
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
                        `assessment-question-${index}`;


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


            box.append(
                number,
                heading,
                options
            );


            assessmentQuestions
                .appendChild(
                    box
                );

        }
    );


    restoreDraftAnswers();
    renderQuestionNavigation();
    updateAttemptProgress();

}


/* =========================================================
   ATTEMPT DRAFT + QUESTION NAVIGATION
   Drafts contain only the learner's selected option indexes.
   Scores and completion remain server verified.
========================================================= */

function getDraftKey() {
    if (
        !currentUser ||
        !currentCourse ||
        !currentModule
    ) {
        return "";
    }

    return [
        "cws",
        "assessment-draft",
        currentUser.uid,
        currentCourse.id,
        currentModule.id
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
                `input[name="assessment-question-${index}"]:checked`
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
        warn("Unable to save assessment draft", storageError);

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
                    `input[name="assessment-question-${index}"][value="${answer}"]`
                );

            if (input) input.checked = true;
        });

        if (assessmentDraftStatus) {
            assessmentDraftStatus.textContent =
                "Your in-session answers were restored.";
        }
    }
    catch (storageError) {
        warn("Unable to restore assessment draft", storageError);
    }
}

function clearDraftAnswers() {
    const key = getDraftKey();

    if (!key) return;

    try {
        sessionStorage.removeItem(key);
    }
    catch (storageError) {
        warn("Unable to clear assessment draft", storageError);
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
                    `assessment-question-card-${index}`
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
            `assessment-question-card-${index}`
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
   SUBMIT ASSESSMENT
========================================================= */

async function submitAssessment(
    event
) {

    event.preventDefault();


    if (
        !currentAssessment ||
        !currentModule ||
        !currentProgress
    ) {

        return;

    }


    if (
        !canTakeCurrentAssessment()
    ) {

        assessmentResult.hidden =
            false;


        assessmentResult.className =
            "assessment-result failed";


        assessmentResult.innerHTML = `

            <strong>
                Complete the module lessons first.
            </strong>

            <p>
                Complete all required lessons and practical activities in ${escapeHTML(
                    currentModule.title
                )} before this assessment can be submitted.
            </p>

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
                <p>Answer the highlighted question before submitting your assessment.</p>
            </div>
        `;
        focusFirstUnanswered(answers);
        return;
    }


    let secureResult;


    submitAssessmentBtn.disabled = true;
    submitAssessmentBtn.setAttribute("aria-busy", "true");
    submitAssessmentBtn.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Verifying answers...';


    try {

        secureResult =
            await submitSecureModuleAssessment({
                courseId:
                    currentCourse.id,
                moduleId:
                    currentModule.id,
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

        submitAssessmentBtn.disabled = false;
        submitAssessmentBtn.removeAttribute("aria-busy");
        submitAssessmentBtn.innerHTML =
            '<i class="fa-solid fa-paper-plane"></i> Submit Assessment';


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
            70
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

    submitAssessmentBtn.disabled = false;
    submitAssessmentBtn.removeAttribute("aria-busy");
    submitAssessmentBtn.innerHTML =
        '<i class="fa-solid fa-paper-plane"></i> Submit Assessment';


    showAssessmentResult(
        {
            score,
            total:
                questions.length,
            percentage,
            passingScore,
            passed
        }
    );


    updateAssessmentStatusUI();

    renderNavigation();

}


/* =========================================================
   RESULT
========================================================= */

function showAssessmentResult({
    score,
    total,
    percentage,
    passingScore,
    passed
}) {

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
                    <i class="fa-solid fa-circle-check"></i>
                </div>

                <div>

                    <strong>
                        Assessment passed
                    </strong>

                    <p>
                        You scored
                        ${score}/${total}
                        (${percentage}%).
                        The required score is
                        ${passingScore}%.
                    </p>

                </div>

            `
            : `

                <div class="assessment-result-icon">
                    <i class="fa-solid fa-rotate"></i>
                </div>

                <div>

                    <strong>
                        Keep learning
                    </strong>

                    <p>
                        You scored
                        ${score}/${total}
                        (${percentage}%).
                        Review the module and retry when ready.
                        You need ${passingScore}% to pass.
                    </p>

                </div>

            `;


    assessmentResult.scrollIntoView({
        behavior:
            "smooth",
        block:
            "nearest"
    });

}


/* =========================================================
   STATUS UI
========================================================= */

function updateAssessmentStatusUI() {

    if (
        !currentProgress ||
        !currentCourse ||
        !currentModule
    ) {

        return;

    }


    const recorded =
        getRecordedScore();


    bestScore.textContent =
        recorded === null
            ? "â€”"
            : `${recorded}%`;


    const passed =
        isAssessmentPassed();


    assessmentStatus.textContent =
        passed
            ? "Passed"
            : recorded === null
                ? "Not attempted"
                : "Retry required";


    assessmentStatus.classList.toggle(
        "passed",
        passed
    );


    assessmentStatusText.textContent =
        passed
            ? "This module assessment is complete."
            : (
                areModuleLessonsComplete()
                    ? "Submit a passing attempt to complete this module."
                    : "Complete all lessons in this module before taking the assessment."
            );


    const percent =
        calculateCourseProgress();


    currentProgress.progressPercent =
        percent;


    courseProgressPercent.textContent =
        `${percent}%`;


    const totals =
        getCourseProgressRequirements();


    courseProgressText.textContent =
        `${currentProgress.completedLessons.length}/${totals.totalLessons} lessons, ` +
        `${currentProgress.completedLabs.length}/${totals.totalLabs} activities, ` +
        `${currentProgress.completedAssessments.length}/${totals.totalAssessments} module assessments completed.`;

}


/* =========================================================
   NAVIGATION
========================================================= */

function renderNavigation() {

    if (
        !currentCourse ||
        !currentModule
    ) {

        return;

    }


    const firstLesson =
        getFirstLesson(
            currentModule
        );


    if (
        firstLesson &&
        returnToModuleBtn
    ) {

        returnToModuleBtn.href =
            buildLessonUrl(
                currentCourse.id,
                currentModule.id,
                firstLesson.id
            );

    }


    if (!continueBtn) {

        return;

    }


    if (
        !isAssessmentPassed()
    ) {

        continueBtn.hidden =
            true;

        return;

    }


    const nextModule =
        getNextModule();


    if (
        nextModule
    ) {

        const nextLesson =
            getFirstLesson(
                nextModule
            );


        if (
            nextLesson
        ) {

            continueBtn.hidden =
                false;


            continueBtn.href =
                buildLessonUrl(
                    currentCourse.id,
                    nextModule.id,
                    nextLesson.id
                );


            const span =
                continueBtn.querySelector(
                    "span"
                );


            if (span) {

                span.innerHTML = `

                    <small>
                        Continue
                    </small>

                    ${escapeHTML(
                        nextModule.title
                    )}

                `;

            }


            return;

        }

    }


    if (
        currentCourse.finalAssessment
    ) {

        continueBtn.hidden =
            false;


        continueBtn.href =
            buildFinalAssessmentUrl(
                currentCourse.id
            );


        const span =
            continueBtn.querySelector(
                "span"
            );


        if (span) {

            span.innerHTML = `

                <small>
                    Continue
                </small>

                Final Assessment

            `;

        }


        return;

    }


    continueBtn.hidden =
        true;

}


/* =========================================================
   LOAD ASSESSMENT
========================================================= */

async function loadAssessment() {

    showLoading();


    const {
        courseId,
        moduleId
    } =
        getUrlParameters();


    if (
        !courseId ||
        !moduleId
    ) {

        showNotFound(
            "The assessment URL is missing the course or module parameter."
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


    if (
        currentCourse.status !==
        "available"
    ) {

        showNotFound(
            `${currentCourse.title} is not currently available.`
        );

        return;

    }


    currentModule =
        getModule(
            courseId,
            moduleId
        );


    if (!currentModule) {

        showNotFound(
            "The requested module does not exist."
        );

        return;

    }


    currentAssessment =
        currentModule
            .moduleAssessment ||
        null;


    if (
        !currentAssessment
    ) {

        showNotFound(
            "This module does not currently have an assessment."
        );

        return;

    }


    if (
        !hasAssessmentAccess()
    ) {

        redirectToUpgrade();

        return;

    }


    try {

        const protectedResult =
            await getProtectedAssessment(
                currentCourse.id,
                "module",
                currentModule.id
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
            "This module does not currently have an assessment."
        );


        return;

    }


    await loadProgress();


    renderAssessment();


    showContent();


    log(
        "Assessment loaded:",
        {
            course:
                currentCourse.id,
            module:
                currentModule.id,
            questions:
                currentAssessment.questions.length
        }
    );

}


/* =========================================================
   LOGOUT
========================================================= */

async function logout() {

    if (!auth) {

        return;

    }


    try {

        if (logoutBtn) {

            logoutBtn.disabled =
                true;

        }


        await signOut(
            auth
        );


        window.location.replace(
            "../pages/login.html"
        );

    }
    catch (err) {

        error(
            "Logout failed:",
            err
        );


        if (logoutBtn) {

            logoutBtn.disabled =
                false;

        }

    }

}


/* =========================================================
   ESCAPE HTML
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

moduleAssessmentForm
    ?.addEventListener(
        "submit",
        submitAssessment
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
   AUTHENTICATION
========================================================= */

if (!auth) {

    error(
        "Firebase Auth unavailable."
    );


    window.location.replace(
        "../pages/login.html"
    );

}
else {

    onAuthStateChanged(
        auth,
        async user => {

            if (!user) {

                const {
                    courseId,
                    moduleId
                } =
                    getUrlParameters();


                window.location.replace(

                    `../pages/login.html?redirect=module-assessment` +

                    `&course=${encodeURIComponent(
                        courseId
                    )}` +

                    `&module=${encodeURIComponent(
                        moduleId
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
                assessmentInitialized
            ) {

                return;

            }


            assessmentInitialized =
                true;


            try {

                await loadAssessment();

            }
            catch (err) {

                error(
                    "Assessment initialization failed:",
                    err
                );


                showNotFound(
                    "The module assessment could not be loaded."
                );

            }

        }
    );

}


log(
    "module-assessment.js loaded."
);
