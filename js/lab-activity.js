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

const activitySafetyText =
    document.getElementById(
        "activitySafetyText"
    );

const activityScenarioSection =
    document.getElementById(
        "activityScenarioSection"
    );

const activityScenario =
    document.getElementById(
        "activityScenario"
    );

const activityPrerequisitesSection =
    document.getElementById(
        "activityPrerequisitesSection"
    );

const activityPrerequisites =
    document.getElementById(
        "activityPrerequisites"
    );

const activityChecklistRing =
    document.getElementById(
        "activityChecklistRing"
    );

const activityChecklistPercent =
    document.getElementById(
        "activityChecklistPercent"
    );

const activityChecklistTitle =
    document.getElementById(
        "activityChecklistTitle"
    );

const activityChecklistMeta =
    document.getElementById(
        "activityChecklistMeta"
    );

const downloadActivityBtn =
    document.getElementById(
        "downloadActivityBtn"
    );

const resetActivityWorkspaceBtn =
    document.getElementById(
        "resetActivityWorkspaceBtn"
    );

const evidenceSection =
    document.getElementById(
        "evidenceSection"
    );

const activityEvidenceList =
    document.getElementById(
        "activityEvidenceList"
    );

const activityEvidenceNotes =
    document.getElementById(
        "activityEvidenceNotes"
    );

const activityNotesStatus =
    document.getElementById(
        "activityNotesStatus"
    );

const saveActivityNotesBtn =
    document.getElementById(
        "saveActivityNotesBtn"
    );

const activityConsoleOutput =
    document.getElementById(
        "activityConsoleOutput"
    );

const activityConsoleForm =
    document.getElementById(
        "activityConsoleForm"
    );

const activityConsoleInput =
    document.getElementById(
        "activityConsoleInput"
    );

const activityCompletionDialog =
    document.getElementById(
        "activityCompletionDialog"
    );

const activityDialogText =
    document.getElementById(
        "activityDialogText"
    );

const activityAuthorizationCheck =
    document.getElementById(
        "activityAuthorizationCheck"
    );

const cancelActivityCompletionBtn =
    document.getElementById(
        "cancelActivityCompletionBtn"
    );

const confirmActivityCompletionBtn =
    document.getElementById(
        "confirmActivityCompletionBtn"
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

let workspaceState = {
    checkedSteps: [],
    checkedPrerequisites: [],
    reflectionAnswers: {},
    evidenceNotes: ""
};

let workspaceStorageKey = "";

let notesSaveTimer = null;


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
   CURRENT ACTIVITY INDEX
========================================================= */

function getCurrentActivityIndex() {

    if (
        !currentModule ||
        !currentActivity
    ) {

        return -1;

    }


    const activities =
        getModuleActivities(
            currentModule
        );


    return activities.findIndex(
        activity =>
            activity.id ===
            currentActivity.id
    );

}


/* =========================================================
   NEXT ACTIVITY
========================================================= */

function getNextActivity() {

    if (
        !currentModule ||
        !currentActivity
    ) {

        return null;

    }


    const activities =
        getModuleActivities(
            currentModule
        );


    const index =
        getCurrentActivityIndex();


    if (
        index < 0 ||
        index >=
            activities.length - 1
    ) {

        return null;

    }


    return activities[
        index + 1
    ] || null;

}


/* =========================================================
   PREVIOUS ACTIVITY
========================================================= */

function getPreviousActivity() {

    if (
        !currentModule ||
        !currentActivity
    ) {

        return null;

    }


    const activities =
        getModuleActivities(
            currentModule
        );


    const index =
        getCurrentActivityIndex();


    if (
        index <= 0
    ) {

        return null;

    }


    return activities[
        index - 1
    ] || null;

}


/* =========================================================
   BUILD ACTIVITY URL
========================================================= */

function buildActivityUrl(
    courseId,
    moduleId,
    activityId
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
        "activity",
        activityId
    );


    return (
        `lab-activity.html?${params.toString()}`
    );

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
   LOCAL LAB WORKSPACE

   Checklists, reflection answers and evidence notes remain
   private to this browser. Only final activity completion is
   written to Firestore.
========================================================= */

function getDefaultWorkspaceState() {

    return {
        checkedSteps: [],
        checkedPrerequisites: [],
        reflectionAnswers: {},
        evidenceNotes: ""
    };

}


function initializeWorkspaceState() {

    workspaceStorageKey = [
        "cwsLabWorkspace:v1",
        currentUser?.uid || "student",
        currentCourse?.id || "course",
        currentModule?.id || "module",
        currentActivity?.id || "activity"
    ].join(":");

    workspaceState =
        getDefaultWorkspaceState();

    try {

        const saved =
            JSON.parse(
                localStorage.getItem(
                    workspaceStorageKey
                ) || "{}"
            );

        workspaceState = {
            ...workspaceState,
            ...saved,
            checkedSteps:
                Array.isArray(saved.checkedSteps)
                    ? saved.checkedSteps
                    : [],
            checkedPrerequisites:
                Array.isArray(saved.checkedPrerequisites)
                    ? saved.checkedPrerequisites
                    : [],
            reflectionAnswers:
                saved.reflectionAnswers &&
                typeof saved.reflectionAnswers === "object"
                    ? saved.reflectionAnswers
                    : {},
            evidenceNotes:
                typeof saved.evidenceNotes === "string"
                    ? saved.evidenceNotes
                    : ""
        };

    }
    catch (err) {

        console.warn(
            "[CWS Activity] Local workspace unavailable:",
            err
        );

    }

}


function saveWorkspaceState() {

    if (!workspaceStorageKey) {
        return;
    }

    try {

        localStorage.setItem(
            workspaceStorageKey,
            JSON.stringify({
                ...workspaceState,
                updatedAt:
                    new Date().toISOString()
            })
        );

        if (activityNotesStatus) {
            activityNotesStatus.textContent =
                `Saved locally at ${new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                })}.`;
        }

    }
    catch (err) {

        console.warn(
            "[CWS Activity] Unable to save local workspace:",
            err
        );

        if (activityNotesStatus) {
            activityNotesStatus.textContent =
                "Local saving is unavailable in this browser.";
        }

    }

}


function getInstructionCount() {

    return Array.isArray(
        currentActivity?.instructions
    )
        ? currentActivity.instructions.length
        : 0;

}


function getCheckedStepCount() {

    const total =
        getInstructionCount();

    return workspaceState.checkedSteps
        .filter(index =>
            Number.isInteger(index) &&
            index >= 0 &&
            index < total
        )
        .length;

}


function allInstructionsChecked() {

    const total =
        getInstructionCount();

    return (
        total === 0 ||
        getCheckedStepCount() === total
    );

}


function updateWorkspaceProgress() {

    const total =
        getInstructionCount();

    const checked =
        getCheckedStepCount();

    const percentage =
        total
            ? Math.round(
                checked / total * 100
            )
            : 100;

    if (activityChecklistRing) {
        activityChecklistRing.style.setProperty(
            "--activity-progress",
            String(percentage)
        );
        activityChecklistRing.setAttribute(
            "aria-valuenow",
            String(percentage)
        );
    }

    if (activityChecklistPercent) {
        activityChecklistPercent.textContent =
            `${percentage}%`;
    }

    if (activityChecklistTitle) {
        activityChecklistTitle.textContent =
            percentage === 100
                ? "Checklist complete"
                : checked
                    ? "Lab work in progress"
                    : "Ready to begin";
    }

    if (activityChecklistMeta) {
        activityChecklistMeta.textContent =
            `${checked} of ${total} instruction${total === 1 ? "" : "s"} checked.`;
    }

    if (activityDialogText) {
        activityDialogText.textContent =
            allInstructionsChecked()
                ? "Your instruction checklist is complete. Confirm that your work was authorized before saving completion."
                : `Complete the remaining ${total - checked} instruction${total - checked === 1 ? "" : "s"} before marking this activity complete.`;
    }

    updateCompletionConfirmationState();

}


function renderWorkspaceOverview() {

    const scenario =
        String(
            currentActivity?.scenario || ""
        ).trim();

    if (activityScenarioSection) {
        activityScenarioSection.hidden =
            !scenario;
    }

    if (activityScenario) {
        activityScenario.textContent =
            scenario;
    }

    const prerequisites =
        Array.isArray(
            currentActivity?.prerequisites
        )
            ? currentActivity.prerequisites
            : [];

    if (activityPrerequisitesSection) {
        activityPrerequisitesSection.hidden =
            prerequisites.length === 0;
    }

    if (activityPrerequisites) {

        activityPrerequisites.innerHTML = "";

        prerequisites.forEach((item, index) => {

            const label =
                document.createElement("label");

            label.className =
                "activity-prerequisite-item";

            label.innerHTML = `
                <input
                    type="checkbox"
                    data-prerequisite-index="${index}"
                    ${workspaceState.checkedPrerequisites.includes(index) ? "checked" : ""}
                >
                <span>${escapeHTML(item)}</span>
            `;

            activityPrerequisites.appendChild(
                label
            );

        });

    }

    if (activitySafetyText) {
        activitySafetyText.textContent =
            currentActivity?.safety ||
            "CWS Academy practical exercises are for learning, testing and authorized security practice. Do not test third-party systems without explicit permission.";
    }

}


function renderEvidence() {

    const evidence =
        Array.isArray(
            currentActivity?.evidence
        )
            ? currentActivity.evidence
            : Array.isArray(
                currentActivity?.deliverables
            )
                ? currentActivity.deliverables
                : [];

    if (evidenceSection) {
        evidenceSection.hidden =
            false;
    }

    if (activityEvidenceList) {

        activityEvidenceList.innerHTML =
            evidence.length
                ? evidence.map(item => `
                    <div class="activity-evidence-item">
                        <i class="fa-solid fa-camera-retro"></i>
                        <span>${escapeHTML(item)}</span>
                    </div>
                `)
                    .join("")
                : `
                    <div class="activity-evidence-item">
                        <i class="fa-solid fa-note-sticky"></i>
                        <span>Record the key observations and results that demonstrate your work.</span>
                    </div>
                `;

    }

    if (activityEvidenceNotes) {
        activityEvidenceNotes.value =
            workspaceState.evidenceNotes;
    }

}


function buildActivityDownload() {

    const instructions =
        Array.isArray(currentActivity?.instructions)
            ? currentActivity.instructions
            : [];

    const reflections =
        Array.isArray(currentActivity?.reflection)
            ? currentActivity.reflection
            : [];

    const evidence =
        Array.isArray(currentActivity?.evidence)
            ? currentActivity.evidence
            : Array.isArray(currentActivity?.deliverables)
                ? currentActivity.deliverables
                : [];

    return [
        "CWS ACADEMY PRACTICAL ACTIVITY",
        "================================",
        `Course: ${currentCourse?.title || ""}`,
        `Module: ${currentModule?.title || ""}`,
        `Activity: ${currentActivity?.title || ""}`,
        `Objective: ${currentActivity?.objective || ""}`,
        "",
        "SCENARIO",
        currentActivity?.scenario || "Not provided.",
        "",
        "INSTRUCTION CHECKLIST",
        ...instructions.map((item, index) =>
            `${workspaceState.checkedSteps.includes(index) ? "[x]" : "[ ]"} ${index + 1}. ${item}`
        ),
        "",
        "EXPECTED EVIDENCE",
        ...evidence.map(item => `- ${item}`),
        "",
        "REFLECTION ANSWERS",
        ...reflections.flatMap((question, index) => [
            `${index + 1}. ${question}`,
            workspaceState.reflectionAnswers[index] || "No answer saved.",
            ""
        ]),
        "EVIDENCE NOTES",
        workspaceState.evidenceNotes || "No notes saved.",
        "",
        "Authorized educational use only."
    ].join("\n");

}


function downloadActivityWorkspace() {

    const blob =
        new Blob(
            [buildActivityDownload()],
            {
                type: "text/plain;charset=utf-8"
            }
        );

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    const filename =
        String(currentActivity?.title || "cws-lab")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");

    link.href = url;
    link.download =
        `${filename || "cws-lab"}-workspace.txt`;

    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

}


function resetActivityWorkspace() {

    const confirmed =
        window.confirm(
            "Reset the local checklist, reflection answers and evidence notes for this activity? Your saved course completion will not be removed."
        );

    if (!confirmed) {
        return;
    }

    workspaceState =
        getDefaultWorkspaceState();

    saveWorkspaceState();
    renderWorkspaceOverview();
    renderInstructions();
    renderReflection();
    renderEvidence();
    updateWorkspaceProgress();

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

        return false;

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


        return true;

    }
    catch (err) {

        console.error(
            "[CWS Activity] Progress save failed:",
            err
        );


        return false;

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


    const requiredLessonKeys =
        [];

    const requiredActivityKeys =
        [];

    const requiredAssessmentKeys =
        [];


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

                    requiredLessonKeys.push(
                        `${module.id}:${lesson.id}`
                    );

                }
            );


            getModuleActivities(
                module
            )
                .forEach(
                    activity => {

                        requiredActivityKeys.push(
                            `${module.id}:${activity.id}`
                        );

                    }
                );


            if (
                module.moduleAssessment &&
                Array.isArray(
                    module.moduleAssessment.questions
                ) &&
                module.moduleAssessment.questions.length
            ) {

                requiredAssessmentKeys.push(
                    `${module.id}:assessment`
                );

            }

        }
    );


    const requireLabs =
        Boolean(
            currentCourse
                ?.completionRules
                ?.requireRequiredLabs
        );


    const requireAssessments =
        currentCourse
            ?.completionRules
            ?.requireAllModuleAssessments !==
        false;


    const activities =
        requireLabs
            ? requiredActivityKeys
            : [];


    const assessments =
        requireAssessments
            ? requiredAssessmentKeys
            : [];


    const finalRequired =
        Boolean(
            currentCourse?.finalAssessment
        );


    const total =
        requiredLessonKeys.length +
        activities.length +
        assessments.length +
        (
            finalRequired
                ? 1
                : 0
        );


    if (!total) {

        return 0;

    }


    const completedLessons =
        requiredLessonKeys
            .filter(
                key =>
                    currentProgress
                        ?.completedLessons
                        ?.includes(key)
            )
            .length;


    const completedActivities =
        activities
            .filter(
                key =>
                    currentProgress
                        ?.completedLabs
                        ?.includes(key)
            )
            .length;


    const completedAssessments =
        assessments
            .filter(
                key =>
                    currentProgress
                        ?.completedAssessments
                        ?.includes(key)
            )
            .length;


    const finalComplete =
        (
            finalRequired &&
            currentProgress
                ?.finalAssessment
                ?.passed
        )
            ? 1
            : 0;


    return Math.round(
        (
            completedLessons +
            completedActivities +
            completedAssessments +
            finalComplete
        ) /
        total *
        100
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


    const saved =
        await saveProgress();


    if (!saved) {

        currentProgress.completedLabs =
            currentProgress.completedLabs
                .filter(item => item !== key);


        currentProgress.progressPercent =
            calculateCourseProgress();


        activityCompletionText.textContent =
            "We could not save completion. Check your connection and try again.";


        return false;

    }


    closeActivityCompletionDialog();


    updateCompletionUI();

    renderNavigation();


    return true;

}


/* =========================================================
   COMPLETION CONFIRMATION
========================================================= */

function updateCompletionConfirmationState() {

    if (!confirmActivityCompletionBtn) {
        return;
    }

    confirmActivityCompletionBtn.disabled =
        !allInstructionsChecked() ||
        !activityAuthorizationCheck?.checked ||
        isActivityCompleted();

}


function openActivityCompletionDialog() {

    if (
        !activityCompletionDialog ||
        isActivityCompleted()
    ) {
        return;
    }

    activityAuthorizationCheck.checked =
        false;

    updateWorkspaceProgress();

    activityCompletionDialog.hidden =
        false;

    document.body.classList.add(
        "activity-dialog-open"
    );

    window.requestAnimationFrame(() => {
        cancelActivityCompletionBtn?.focus();
    });

}


function closeActivityCompletionDialog() {

    if (!activityCompletionDialog) {
        return;
    }

    activityCompletionDialog.hidden =
        true;

    document.body.classList.remove(
        "activity-dialog-open"
    );

    completeActivityBtn?.focus();

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


    renderWorkspaceOverview();


    renderInstructions();

    renderReflection();

    renderEvidence();

    updateWorkspaceProgress();

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
        (instruction, index) => {

            const li =
                document.createElement(
                    "li"
                );


            const checked =
                workspaceState.checkedSteps
                    .includes(index);


            li.classList.toggle(
                "is-complete",
                checked
            );


            li.innerHTML = `

                <label class="activity-step-check">

                    <input
                        type="checkbox"
                        data-step-index="${index}"
                        ${checked ? "checked" : ""}
                    >

                    <span class="activity-step-control" aria-hidden="true">
                        <i class="fa-solid fa-check"></i>
                    </span>

                    <span class="activity-step-text">
                        ${escapeHTML(instruction)}
                    </span>

                </label>

            `;


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


            const response =
                document.createElement(
                    "div"
                );


            response.className =
                "activity-reflection-response";


            const text =
                document.createElement("p");


            text.textContent = question;


            const textarea =
                document.createElement("textarea");


            textarea.rows = 4;


            textarea.dataset.reflectionIndex =
                String(index);


            textarea.placeholder =
                "Record your observation or conclusion...";


            textarea.value =
                workspaceState
                    .reflectionAnswers[index] || "";


            response.append(
                text,
                textarea
            );


            item.append(
                number,
                response
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


    const previousActivity =
        getPreviousActivity();


    const nextActivity =
        getNextActivity();


    /*
     * LEFT / RETURN BUTTON
     *
     * First activity:
     * return to the module's final lesson.
     *
     * Later activities:
     * return to the previous activity.
     */

    if (
        returnToModuleBtn
    ) {

        if (
            previousActivity
        ) {

            returnToModuleBtn.href =
                buildActivityUrl(
                    currentCourse.id,
                    currentModule.id,
                    previousActivity.id
                );


            const span =
                returnToModuleBtn
                    .querySelector(
                        "span"
                    );


            if (span) {

                span.innerHTML = `

                    <small>
                        Previous
                    </small>

                    ${escapeHTML(
                        previousActivity.title ||
                        "Previous Activity"
                    )}

                `;

            }

        }
        else {

            const lastLesson =
                lessons[
                    lessons.length - 1
                ] || null;


            if (
                lastLesson
            ) {

                returnToModuleBtn.href =
                    buildLessonUrl(
                        currentCourse.id,
                        currentModule.id,
                        lastLesson.id
                    );


                const span =
                    returnToModuleBtn
                        .querySelector(
                            "span"
                        );


                if (span) {

                    span.innerHTML = `

                        <small>
                            Return
                        </small>

                        Module Lessons

                    `;

                }

            }

        }

    }


    /*
     * RIGHT / CONTINUE BUTTON
     *
     * The student must complete the current activity
     * before progression becomes available.
     */

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


    /*
     * If another activity exists in this module,
     * route there first.
     */

    if (
        nextActivity
    ) {

        continueBtn.hidden =
            false;


        continueBtn.href =
            buildActivityUrl(
                currentCourse.id,
                currentModule.id,
                nextActivity.id
            );


        const span =
            continueBtn
                .querySelector(
                    "span"
                );


        if (span) {

            span.innerHTML = `

                <small>
                    Continue
                </small>

                ${escapeHTML(
                    nextActivity.title ||
                    "Next Activity"
                )}

            `;

        }


        return;

    }


    /*
     * No more activities remain.
     * Continue to the module assessment.
     */

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


        const span =
            continueBtn
                .querySelector(
                    "span"
                );


        if (span) {

            span.innerHTML = `

                <small>
                    Continue
                </small>

                Module Assessment

            `;

        }


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


    initializeWorkspaceState();


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
            "../pages/login.html"
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
   SAFE BROWSER CONSOLE

   This is intentionally a simulation. It never executes an
   operating-system command and never makes a network request.
========================================================= */

function appendConsoleLine(
    value,
    className = ""
) {

    if (!activityConsoleOutput) {
        return;
    }

    const line =
        document.createElement("div");

    line.className =
        `activity-console-line ${className}`.trim();

    line.textContent = value;

    activityConsoleOutput.appendChild(line);

    activityConsoleOutput.scrollTop =
        activityConsoleOutput.scrollHeight;

}


function runActivityConsoleCommand(rawCommand) {

    const input =
        String(rawCommand || "").trim();

    if (!input) {
        return;
    }

    appendConsoleLine(
        `student@cws-lab:~$ ${input}`,
        "command"
    );

    const [command, ...args] =
        input.split(/\s+/);

    const normalized =
        command.toLowerCase();

    const responses = {
        help: [
            "Safe commands: help, whoami, pwd, ls, dir, ip addr, ipconfig, date, echo <text>, clear.",
            "This learning console is simulated and cannot reach your device or any external system."
        ],
        whoami: ["cws-student"],
        pwd: ["/home/cws-student/lab"],
        ls: ["evidence/  notes/  README.txt  scope.txt"],
        dir: ["Directory of C:\\CWS-Lab", "evidence  notes  README.txt  scope.txt"],
        date: [new Date().toString()],
        ipconfig: [
            "Ethernet adapter CWS-LAB:",
            "  IPv4 Address . . . . . . . : 192.0.2.25",
            "  Default Gateway . . . . . . : 192.0.2.1",
            "Reserved documentation network â€” simulated output."
        ]
    };

    let output = [];

    if (normalized === "clear") {
        activityConsoleOutput.textContent = "";
        return;
    }

    if (
        normalized === "ip" &&
        normalizeConsoleArgument(args[0]) === "addr"
    ) {
        output = [
            "2: cws0: <UP,LOWER_UP> mtu 1500",
            "    inet 192.0.2.25/24 scope global cws0",
            "Reserved documentation network â€” simulated output."
        ];
    }
    else if (normalized === "echo") {
        output = [args.join(" ")];
    }
    else if (responses[normalized]) {
        output = responses[normalized];
    }
    else {
        output = [
            `Command '${command}' is not available in this safe simulation. Type 'help'.`
        ];
    }

    output.forEach(line =>
        appendConsoleLine(line)
    );

}


function normalizeConsoleArgument(value) {

    return String(value || "")
        .trim()
        .toLowerCase();

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
        openActivityCompletionDialog
    );


activityInstructions
    ?.addEventListener(
        "change",
        event => {

            const checkbox =
                event.target.closest(
                    "[data-step-index]"
                );

            if (!checkbox) {
                return;
            }

            const index =
                Number(
                    checkbox.dataset.stepIndex
                );

            const checked =
                new Set(
                    workspaceState.checkedSteps
                );

            if (checkbox.checked) {
                checked.add(index);
            }
            else {
                checked.delete(index);
            }

            workspaceState.checkedSteps =
                [...checked]
                    .filter(Number.isInteger)
                    .sort((a, b) => a - b);

            checkbox.closest("li")
                ?.classList.toggle(
                    "is-complete",
                    checkbox.checked
                );

            saveWorkspaceState();
            updateWorkspaceProgress();

        }
    );


activityPrerequisites
    ?.addEventListener(
        "change",
        event => {

            const checkbox =
                event.target.closest(
                    "[data-prerequisite-index]"
                );

            if (!checkbox) {
                return;
            }

            const index =
                Number(
                    checkbox.dataset.prerequisiteIndex
                );

            const checked =
                new Set(
                    workspaceState.checkedPrerequisites
                );

            checkbox.checked
                ? checked.add(index)
                : checked.delete(index);

            workspaceState.checkedPrerequisites =
                [...checked]
                    .filter(Number.isInteger)
                    .sort((a, b) => a - b);

            saveWorkspaceState();

        }
    );


reflectionQuestions
    ?.addEventListener(
        "input",
        event => {

            const textarea =
                event.target.closest(
                    "[data-reflection-index]"
                );

            if (!textarea) {
                return;
            }

            workspaceState.reflectionAnswers[
                textarea.dataset.reflectionIndex
            ] = textarea.value;

            window.clearTimeout(
                notesSaveTimer
            );

            notesSaveTimer =
                window.setTimeout(
                    saveWorkspaceState,
                    450
                );

        }
    );


activityEvidenceNotes
    ?.addEventListener(
        "input",
        () => {

            workspaceState.evidenceNotes =
                activityEvidenceNotes.value;

            if (activityNotesStatus) {
                activityNotesStatus.textContent =
                    "Saving locally...";
            }

            window.clearTimeout(
                notesSaveTimer
            );

            notesSaveTimer =
                window.setTimeout(
                    saveWorkspaceState,
                    450
                );

        }
    );


saveActivityNotesBtn
    ?.addEventListener(
        "click",
        () => {
            workspaceState.evidenceNotes =
                activityEvidenceNotes?.value || "";
            saveWorkspaceState();
        }
    );


downloadActivityBtn
    ?.addEventListener(
        "click",
        downloadActivityWorkspace
    );


resetActivityWorkspaceBtn
    ?.addEventListener(
        "click",
        resetActivityWorkspace
    );


activityConsoleForm
    ?.addEventListener(
        "submit",
        event => {
            event.preventDefault();
            runActivityConsoleCommand(
                activityConsoleInput?.value
            );
            if (activityConsoleInput) {
                activityConsoleInput.value = "";
                activityConsoleInput.focus();
            }
        }
    );


activityAuthorizationCheck
    ?.addEventListener(
        "change",
        updateCompletionConfirmationState
    );


cancelActivityCompletionBtn
    ?.addEventListener(
        "click",
        closeActivityCompletionDialog
    );


confirmActivityCompletionBtn
    ?.addEventListener(
        "click",
        async () => {
            updateCompletionConfirmationState();
            if (
                confirmActivityCompletionBtn.disabled
            ) {
                return;
            }
            confirmActivityCompletionBtn.disabled = true;
            confirmActivityCompletionBtn.innerHTML = `
                <i class="fa-solid fa-spinner fa-spin"></i>
                Saving...
            `;
            await completeActivity();
            confirmActivityCompletionBtn.innerHTML = `
                <i class="fa-solid fa-check"></i>
                Confirm Completion
            `;
        }
    );


activityCompletionDialog
    ?.addEventListener(
        "click",
        event => {
            if (event.target === activityCompletionDialog) {
                closeActivityCompletionDialog();
            }
        }
    );


document.addEventListener(
    "keydown",
    event => {
        if (
            event.key === "Escape" &&
            activityCompletionDialog &&
            !activityCompletionDialog.hidden
        ) {
            closeActivityCompletionDialog();
        }
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
                    moduleId,
                    activityId
                } =
                    getUrlParameters();


                window.location.replace(

                    `../pages/login.html?redirect=lab-activity` +

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
