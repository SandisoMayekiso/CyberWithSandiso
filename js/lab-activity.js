/* =========================================================
   CWS ACADEMY
   PRACTICAL ACTIVITY / LAB ENGINE
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
    getDoc,
    setDoc,
    serverTimestamp
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


/* =========================================================
   DOM
========================================================= */

const activityLoading =
    document.getElementById(
        "activityLoading"
    );

const activityNotFound =
    document.getElementById(
        "activityNotFound"
    );

const activityNotFoundMessage =
    document.getElementById(
        "activityNotFoundMessage"
    );

const activityContent =
    document.getElementById(
        "activityContent"
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

const activityBreadcrumb =
    document.getElementById(
        "activityBreadcrumb"
    );

const moduleBadge =
    document.getElementById(
        "moduleBadge"
    );

const activityTypeBadge =
    document.getElementById(
        "activityTypeBadge"
    );

const activityCategory =
    document.getElementById(
        "activityCategory"
    );

const activityTitle =
    document.getElementById(
        "activityTitle"
    );

const activityObjective =
    document.getElementById(
        "activityObjective"
    );

const activityDuration =
    document.getElementById(
        "activityDuration"
    );

const activityStatusMeta =
    document.getElementById(
        "activityStatusMeta"
    );

const activityObjectiveText =
    document.getElementById(
        "activityObjectiveText"
    );

const activityInstructions =
    document.getElementById(
        "activityInstructions"
    );

const reflectionSection =
    document.getElementById(
        "reflectionSection"
    );

const reflectionQuestions =
    document.getElementById(
        "reflectionQuestions"
    );

const activityCompletionTitle =
    document.getElementById(
        "activityCompletionTitle"
    );

const activityCompletionText =
    document.getElementById(
        "activityCompletionText"
    );

const completeActivityBtn =
    document.getElementById(
        "completeActivityBtn"
    );

const returnToModuleBtn =
    document.getElementById(
        "returnToModuleBtn"
    );

const continueBtn =
    document.getElementById(
        "continueBtn"
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

let currentActivity =
    null;

let currentProgress =
    null;

let currentEntitlement =
    null;

let activityInitialized =
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
                .toLowerCase(),

        moduleId:
            String(
                params.get("module") || ""
            )
                .trim()
                .toLowerCase(),

        activityId:
            String(
                params.get("activity") || ""
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
   PAGE STATES
========================================================= */

function showLoading() {

    activityLoading.hidden =
        false;

    activityNotFound.hidden =
        true;

    activityContent.hidden =
        true;

}


function showNotFound(message) {

    activityLoading.hidden =
        true;

    activityContent.hidden =
        true;

    activityNotFoundMessage.textContent =
        message;

    activityNotFound.hidden =
        false;

}


function showContent() {

    activityLoading.hidden =
        true;

    activityNotFound.hidden =
        true;

    activityContent.hidden =
        false;

}


/* =========================================================
   ACTIVITY RESOLUTION
========================================================= */

function getModuleActivities(
    module
) {

    return [
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

}


function getActivity(
    module,
    activityId
) {

    return getModuleActivities(
        module
    )
        .find(
            activity =>
                String(
                    activity?.id || ""
                )
                    .trim()
                    .toLowerCase() ===
                activityId
        ) || null;

}


/* =========================================================
   ACTIVITY KEY
========================================================= */

function buildActivityKey(
    moduleId,
    activityId
) {

    return (
        `${moduleId}:${activityId}`
    );

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
            "[CWS Activity] Progress load failed:",
            err
        );

    }

}


async function saveProgress() {

    const ref =
        getProgressRef();


    if (
        !ref ||
        !currentProgress
    ) {

        return;

    }


    try {

        await setDoc(
            ref,
            {
                ...currentProgress,
                updatedAt:
                    serverTimestamp()
            },
            {
                merge: true
            }
        );

    }
    catch (err) {

        console.error(
            "[CWS Activity] Progress save failed:",
            err
        );

    }

}


/* =========================================================
   COURSE PROGRESS
========================================================= */

function calculateCourseProgress() {

    const modules =
        Array.isArray(
            currentCourse?.modules
        )
            ? currentCourse.modules
            : [];


    let total =
        0;


    modules.forEach(
        module => {

            total +=
                Array.isArray(
                    module.lessons
                )
                    ? module.lessons.length
                    : 0;


            total +=
                getModuleActivities(
                    module
                ).length;


            if (
                module.moduleAssessment &&
                Array.isArray(
                    module.moduleAssessment.questions
                ) &&
                module.moduleAssessment.questions.length
            ) {

                total +=
                    1;

            }

        }
    );


    if (
        currentCourse?.finalAssessment
    ) {

        total +=
            1;

    }


    if (!total) {

        return 0;

    }


    const complete =
        (
            currentProgress
                ?.completedLessons
                ?.length || 0
        ) +
        (
            currentProgress
                ?.completedLabs
                ?.length || 0
        ) +
        (
            currentProgress
                ?.completedAssessments
                ?.length || 0
        ) +
        (
            currentProgress
                ?.finalAssessment
                ?.passed
                    ? 1
                    : 0
        );


    return Math.min(
        100,
        Math.round(
            (
                complete /
                total
            ) * 100
        )
    );

}


/* =========================================================
   COMPLETION
========================================================= */

function isActivityCompleted() {

    if (
        !currentProgress ||
        !currentActivity ||
        !currentModule
    ) {

        return false;

    }


    return currentProgress
        .completedLabs
        .includes(
            buildActivityKey(
                currentModule.id,
                currentActivity.id
            )
        );

}


async function completeActivity() {

    if (
        !currentProgress ||
        !currentActivity ||
        !currentModule
    ) {

        return;

    }


    const key =
        buildActivityKey(
            currentModule.id,
            currentActivity.id
        );


    if (
        !currentProgress
            .completedLabs
            .includes(key)
    ) {

        currentProgress
            .completedLabs
            .push(key);

    }


    currentProgress.started =
        true;


    currentProgress.currentModule =
        currentModule.id;


    currentProgress.progressPercent =
        calculateCourseProgress();


    await saveProgress();


    updateCompletionUI();

    renderNavigation();

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
            currentModule,
            currentEntitlement
        ) &&
        canAccessItem(
            currentActivity,
            currentEntitlement
        )
    );

}


function redirectToUpgrade() {

    const required = [
        currentCourse,
        currentModule,
        currentActivity
    ]
        .filter(Boolean)
        .map(
            item =>
                getRequiredAccess(item)
        );


    const plan =
        required.includes("pro")
            ? "pro"
            : "free";


    window.location.replace(
        getUpgradeUrl(
            plan
        )
    );

}


/* =========================================================
   URL HELPERS
========================================================= */

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


/* =========================================================
   RENDER
========================================================= */

function renderActivity() {

    document.title =
        `${currentActivity.title} | ${currentCourse.title} | CWS Academy`;


    studentName.textContent =
        getUserName(
            currentUser
        );


    headerCourseTitle.textContent =
        currentCourse.title;


    headerCourseCategory.textContent =
        currentCourse.category;


    courseBreadcrumbLink.textContent =
        currentCourse.title;


    courseBreadcrumbLink.href =
        `course-details.html?course=${encodeURIComponent(
            currentCourse.id
        )}`;


    moduleBreadcrumb.textContent =
        currentModule.title;


    activityBreadcrumb.textContent =
        currentActivity.title;


    moduleBadge.textContent =
        `MODULE ${String(
            currentModule.number
        ).padStart(
            2,
            "0"
        )}`;


    activityTypeBadge.textContent =
        String(
            currentActivity.type ||
            "Practical Activity"
        )
            .toUpperCase();


    activityCategory.textContent =
        currentCourse.category;


    activityTitle.textContent =
        currentActivity.title;


    activityObjective.textContent =
        currentActivity.objective || "";


    activityObjectiveText.textContent =
        currentActivity.objective || "";


    activityDuration.innerHTML = `

        <i class="fa-regular fa-clock"></i>

        ${escapeHTML(
            currentActivity.duration ||
            "Self-paced"
        )}

    `;


    renderInstructions();

    renderReflection();

    updateCompletionUI();

    renderNavigation();

}


/* =========================================================
   INSTRUCTIONS
========================================================= */

function renderInstructions() {

    activityInstructions.innerHTML =
        "";


    const instructions =
        Array.isArray(
            currentActivity?.instructions
        )
            ? currentActivity.instructions
            : [];


    instructions.forEach(
        instruction => {

            const li =
                document.createElement(
                    "li"
                );


            li.textContent =
                instruction;


            activityInstructions
                .appendChild(
                    li
                );

        }
    );

}


/* =========================================================
   REFLECTION
========================================================= */

function renderReflection() {

    reflectionQuestions.innerHTML =
        "";


    const questions =
        Array.isArray(
            currentActivity?.reflection
        )
            ? currentActivity.reflection
            : [];


    if (!questions.length) {

        reflectionSection.hidden =
            true;

        return;

    }


    reflectionSection.hidden =
        false;


    questions.forEach(
        (
            question,
            index
        ) => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "activity-reflection-item";


            const number =
                document.createElement(
                    "span"
                );


            number.textContent =
                String(
                    index + 1
                )
                    .padStart(
                        2,
                        "0"
                    );


            const text =
                document.createElement(
                    "p"
                );


            text.textContent =
                question;


            item.append(
                number,
                text
            );


            reflectionQuestions
                .appendChild(
                    item
                );

        }
    );

}


/* =========================================================
   COMPLETION UI
========================================================= */

function updateCompletionUI() {

    const completed =
        isActivityCompleted();


    if (completed) {

        activityStatusMeta.innerHTML = `

            <i class="fa-solid fa-circle-check"></i>
            Completed

        `;


        activityCompletionTitle.textContent =
            "Activity completed";


        activityCompletionText.textContent =
            "Your completion has been saved to your CWS Academy progress.";


        completeActivityBtn.innerHTML = `

            <i class="fa-solid fa-circle-check"></i>
            Activity Completed

        `;


        completeActivityBtn.disabled =
            true;


        return;

    }


    activityStatusMeta.innerHTML = `

        <i class="fa-regular fa-circle"></i>
        Not completed

    `;


    completeActivityBtn.innerHTML = `

        <i class="fa-solid fa-check"></i>
        Mark Activity Complete

    `;


    completeActivityBtn.disabled =
        false;

}


/* =========================================================
   NAVIGATION
========================================================= */

function renderNavigation() {

    const lessons =
        Array.isArray(
            currentModule?.lessons
        )
            ? currentModule.lessons
            : [];


    const lastLesson =
        lessons[
            lessons.length - 1
        ] || null;


    if (
        lastLesson &&
        returnToModuleBtn
    ) {

        returnToModuleBtn.href =
            buildLessonUrl(
                currentCourse.id,
                currentModule.id,
                lastLesson.id
            );

    }


    if (
        !continueBtn
    ) {

        return;

    }


    if (
        !isActivityCompleted()
    ) {

        continueBtn.hidden =
            true;

        return;

    }


    if (
        currentModule
            ?.moduleAssessment
    ) {

        continueBtn.hidden =
            false;


        continueBtn.href =
            buildAssessmentUrl(
                currentCourse.id,
                currentModule.id
            );


        return;

    }


    continueBtn.hidden =
        true;

}


/* =========================================================
   LOAD
========================================================= */

async function loadActivity() {

    showLoading();


    const {
        courseId,
        moduleId,
        activityId
    } =
        getUrlParameters();


    if (
        !courseId ||
        !moduleId ||
        !activityId
    ) {

        showNotFound(
            "The activity URL is missing the course, module or activity parameter."
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


    currentActivity =
        getActivity(
            currentModule,
            activityId
        );


    if (!currentActivity) {

        showNotFound(
            "The requested practical activity does not exist."
        );

        return;

    }


    if (
        !hasAccess()
    ) {

        redirectToUpgrade();

        return;

    }


    await loadProgress();


    renderActivity();


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
            "[CWS Activity] Logout failed:",
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

completeActivityBtn
    ?.addEventListener(
        "click",
        completeActivity
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
                    courseId,
                    moduleId,
                    activityId
                } =
                    getUrlParameters();


                window.location.replace(

                    `login.html?redirect=lab-activity` +

                    `&course=${encodeURIComponent(
                        courseId
                    )}` +

                    `&module=${encodeURIComponent(
                        moduleId
                    )}` +

                    `&activity=${encodeURIComponent(
                        activityId
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
                activityInitialized
            ) {

                return;

            }


            activityInitialized =
                true;


            await loadActivity();

        }
    );

}
