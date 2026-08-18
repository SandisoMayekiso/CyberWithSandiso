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
            "[CWS Final] Progress save failed:",
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
        "45–60 minutes";


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
            : "—";


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
   CERTIFICATE CREDENTIAL ID
========================================================= */

function generateCredentialId(
    courseId,
    uid
) {

    const coursePart =
        String(courseId)
            .replace(/[^a-z0-9]/gi, "")
            .slice(0, 8)
            .toUpperCase();


    const userPart =
        String(uid)
            .replace(/[^a-z0-9]/gi, "")
            .slice(0, 6)
            .toUpperCase();


    const randomPart =
        crypto.getRandomValues(
            new Uint32Array(1)
        )[0]
            .toString(16)
            .slice(0, 6)
            .toUpperCase();


    return (
        `CWS-${coursePart}-${userPart}-${randomPart}`
    );

}


/* =========================================================
   ISSUE CERTIFICATE RECORD
========================================================= */

async function issueCertificateRecord(
    finalScore
) {

    if (
        !db ||
        !currentUser ||
        !currentCourse
    ) {

        return;

    }


    if (
        !currentProgress.completed ||
        !currentProgress.certificateEligible
    ) {

        return;

    }


    let credentialId =
        currentProgress
            ?.certificate
            ?.credentialId ||
        "";


    if (!credentialId) {

        credentialId =
            generateCredentialId(
                currentCourse.id,
                currentUser.uid
            );

    }


    const issuedAt =
        serverTimestamp();


    currentProgress.certificate = {

        credentialId,

        issued:
            true,

        issuedAt

    };


    currentProgress.completedAt =
        currentProgress.completedAt ||
        issuedAt;


    /*
     * Save certificate metadata back into the user's
     * private courseProgress document.
     */

    await saveProgress();


    /*
     * Public verification record.
     *
     * IMPORTANT:
     * This client-side write works for the current GitHub Pages
     * architecture, but production-grade credentials should be
     * issued by a trusted Firebase Cloud Function/Admin SDK.
     */

    await setDoc(
        doc(
            db,
            "certificateVerifications",
            credentialId
        ),
        {
            credentialId,

            userId:
                currentUser.uid,

            studentName:
                getUserName(
                    currentUser
                ),

            courseId:
                currentCourse.id,

            courseTitle:
                currentCourse.title,

            finalScore:
                Number(
                    finalScore || 0
                ),

            issuedAt,

            status:
                "active"
        },
        {
            merge: true
        }
    );


    return credentialId;

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


    let score =
        0;


    questions.forEach(
        (
            question,
            index
        ) => {

            const selected =
                document.querySelector(

                    `input[name="final-question-${index}"]:checked`

                );


            if (
                selected &&
                Number(
                    selected.value
                ) ===
                Number(
                    question.answer
                )
            ) {

                score++;

            }

        }
    );


    const percentage =
        questions.length
            ? Math.round(
                score /
                questions.length *
                100
            )
            : 0;


    const passingScore =
        Number(
            currentAssessment.passingScore
        ) || 75;


    const passed =
        percentage >=
        passingScore;


    const previousBest =
        Number(
            currentProgress
                ?.finalAssessment
                ?.bestScore ??
            currentProgress
                ?.finalAssessment
                ?.score ??
            0
        );


    currentProgress.finalAssessment = {

        bestScore:
            Math.max(
                previousBest,
                percentage
            ),

        score:
            percentage,

        passed:
            Boolean(
                currentProgress
                    ?.finalAssessment
                    ?.passed ||
                passed
            )

    };


    currentProgress.completed =
        currentProgress
            .finalAssessment
            .passed;


    currentProgress
        .certificateEligible =
        Boolean(
            currentCourse
                .certificateEligible &&
            currentProgress.completed
        );


    currentProgress.progressPercent =
        calculateCourseProgress();


    await saveProgress();


    if (
        currentProgress
            .finalAssessment
            .passed
    ) {

        try {

            await issueCertificateRecord(
                currentProgress
                    .finalAssessment
                    .bestScore
            );

        }
        catch (certificateError) {

            console.error(
                "[CWS Final] Certificate issuance failed:",
                certificateError
            );

        }

    }


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


    if (
        !hasAccess()
    ) {

        redirectToUpgrade();

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
