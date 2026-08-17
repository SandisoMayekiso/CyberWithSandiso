/* =========================================================
   CWS ACADEMY
   STUDENT PROGRESS CONTROLLER
   Unified Firestore Progress Model
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
    collection,
    getDocs
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
    courses,
    getCourse
} from "../data/courses.js";


/* =========================================================
   DOM
========================================================= */

const studentName =
    document.getElementById(
        "studentName"
    );

const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );

const courseProgressList =
    document.getElementById(
        "courseProgressList"
    );

const noCourseProgress =
    document.getElementById(
        "noCourseProgress"
    );

const overallProgressPercent =
    document.getElementById(
        "overallProgressPercent"
    );

const heroProgressPercent =
    document.getElementById(
        "heroProgressPercent"
    );

const overallProgressBar =
    document.getElementById(
        "overallProgressBar"
    );

const overallProgressText =
    document.getElementById(
        "overallProgressText"
    );

const coursesStarted =
    document.getElementById(
        "coursesStarted"
    );

const lessonsCompleted =
    document.getElementById(
        "lessonsCompleted"
    );

const labsCompleted =
    document.getElementById(
        "labsCompleted"
    );

const assessmentsCompleted =
    document.getElementById(
        "assessmentsCompleted"
    );


/* =========================================================
   STATE
========================================================= */

let currentUser =
    null;

let progressMap =
    new Map();

let initialized =
    false;


/* =========================================================
   HELPERS
========================================================= */

function clamp(
    value,
    min = 0,
    max = 100
) {

    return Math.min(
        Math.max(
            Number(value) || 0,
            min
        ),
        max
    );

}


function escapeHTML(value) {

    return String(
        value ?? ""
    )
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


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
        typeof user.email ===
            "string" &&
        user.email.includes("@")
    ) {

        const raw =
            user.email
                .split("@")[0]
                .replace(/[._-]+/g, " ")
                .trim();

        if (raw) {
            return raw
                .split(" ")
                .map(
                    word =>
                        word.charAt(0)
                            .toUpperCase() +
                        word.slice(1)
                )
                .join(" ");
        }

    }

    return "Student";

}


function getAllCourses() {

    return courses
        ? Object.values(courses)
        : [];

}


/* =========================================================
   REQUIREMENTS
========================================================= */

function getModuleActivities(module) {

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


function getCourseRequirements(course) {

    const lessonKeys = [];
    const activityKeys = [];
    const assessmentKeys = [];

    const modules =
        Array.isArray(
            course?.modules
        )
            ? course.modules
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

                    lessonKeys.push(
                        `${module.id}:${lesson.id}`
                    );

                }
            );

            getModuleActivities(
                module
            )
                .forEach(
                    activity => {

                        activityKeys.push(
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

                assessmentKeys.push(
                    `${module.id}:assessment`
                );

            }

        }
    );


    return {

        lessonKeys,

        activityKeys:
            course?.completionRules
                ?.requireRequiredLabs
                ? activityKeys
                : [],

        assessmentKeys:
            course?.completionRules
                ?.requireAllModuleAssessments ===
                false
                ? []
                : assessmentKeys,

        finalRequired:
            Boolean(
                course?.finalAssessment
            )

    };

}


/* =========================================================
   NORMALIZE PROGRESS
========================================================= */

function normalizeProgress(
    courseId,
    data = {}
) {

    return {

        courseId,

        completedLessons:
            Array.isArray(
                data.completedLessons
            )
                ? data.completedLessons
                : [],

        passedLessonQuizzes:
            (
                data.passedLessonQuizzes &&
                typeof data.passedLessonQuizzes ===
                    "object"
            )
                ? data.passedLessonQuizzes
                : {},

        completedLabs:
            Array.isArray(
                data.completedLabs
            )
                ? data.completedLabs
                : [],

        completedAssessments:
            Array.isArray(
                data.completedAssessments
            )
                ? data.completedAssessments
                : [],

        assessmentScores:
            (
                data.assessmentScores &&
                typeof data.assessmentScores ===
                    "object"
            )
                ? data.assessmentScores
                : {},

        finalAssessment:
            (
                data.finalAssessment &&
                typeof data.finalAssessment ===
                    "object"
            )
                ? data.finalAssessment
                : {
                    score: 0,
                    bestScore: 0,
                    passed: false
                },

        currentModule:
            typeof data.currentModule ===
                "string"
                ? data.currentModule
                : "",

        currentLesson:
            typeof data.currentLesson ===
                "string"
                ? data.currentLesson
                : "",

        progressPercent:
            Number(
                data.progressPercent || 0
            ),

        started:
            Boolean(
                data.started
            ),

        completed:
            Boolean(
                data.completed
            ),

        certificateEligible:
            Boolean(
                data.certificateEligible
            ),

        updatedAt:
            data.updatedAt || null

    };

}


/* =========================================================
   LOAD FIRESTORE PROGRESS
========================================================= */

async function loadProgress() {

    progressMap =
        new Map();


    if (
        !db ||
        !currentUser
    ) {

        return;

    }


    try {

        const ref =
            collection(
                db,
                "users",
                currentUser.uid,
                "courseProgress"
            );


        const snapshot =
            await getDocs(
                ref
            );


        snapshot.forEach(
            documentSnapshot => {

                progressMap.set(
                    documentSnapshot.id,
                    normalizeProgress(
                        documentSnapshot.id,
                        documentSnapshot.data()
                    )
                );

            }
        );

    }
    catch (error) {

        console.error(
            "[CWS Progress] Failed to load Firestore progress:",
            error
        );

    }

}


/* =========================================================
   UNIFIED COURSE PROGRESS
========================================================= */

function calculateCourseProgress(
    course,
    progress
) {

    if (
        !course ||
        !progress
    ) {

        return 0;

    }


    const requirements =
        getCourseRequirements(
            course
        );


    const total =
        requirements.lessonKeys.length +
        requirements.activityKeys.length +
        requirements.assessmentKeys.length +
        (
            requirements.finalRequired
                ? 1
                : 0
        );


    if (!total) {

        return 0;

    }


    const lessons =
        requirements.lessonKeys
            .filter(
                key =>
                    progress
                        .completedLessons
                        .includes(key)
            )
            .length;


    const labs =
        requirements.activityKeys
            .filter(
                key =>
                    progress
                        .completedLabs
                        .includes(key)
            )
            .length;


    const assessments =
        requirements.assessmentKeys
            .filter(
                key =>
                    progress
                        .completedAssessments
                        .includes(key)
            )
            .length;


    const final =
        requirements.finalRequired &&
        progress.finalAssessment
            ?.passed
                ? 1
                : 0;


    return clamp(
        Math.round(
            (
                lessons +
                labs +
                assessments +
                final
            ) /
            total *
            100
        )
    );

}


/* =========================================================
   COURSE URL
========================================================= */

function buildCourseUrl(
    courseId
) {

    const params =
        new URLSearchParams();


    params.set(
        "course",
        courseId
    );


    return (
        `course-details.html?${params.toString()}`
    );

}


/* =========================================================
   STARTED COURSES
========================================================= */

function getStartedCourseEntries() {

    return getAllCourses()
        .map(
            course => {

                const progress =
                    progressMap.get(
                        course.id
                    ) || null;


                return {
                    course,
                    progress
                };

            }
        )
        .filter(
            entry =>
                entry.progress &&
                (
                    entry.progress.started ||
                    entry.progress
                        .completedLessons
                        .length ||
                    entry.progress
                        .completedLabs
                        .length ||
                    entry.progress
                        .completedAssessments
                        .length ||
                    entry.progress
                        .finalAssessment
                        ?.passed
                )
        );

}


/* =========================================================
   RENDER COURSE CARDS
========================================================= */

function renderCourses() {

    if (!courseProgressList) {

        return;

    }


    const entries =
        getStartedCourseEntries();


    courseProgressList.innerHTML =
        "";


    if (!entries.length) {

        if (noCourseProgress) {

            noCourseProgress.hidden =
                false;

        }


        return;

    }


    if (noCourseProgress) {

        noCourseProgress.hidden =
            true;

    }


    entries.forEach(
        ({
            course,
            progress
        }) => {

            const requirements =
                getCourseRequirements(
                    course
                );


            const percentage =
                calculateCourseProgress(
                    course,
                    progress
                );


            const completedLessonsCount =
                requirements.lessonKeys
                    .filter(
                        key =>
                            progress
                                .completedLessons
                                .includes(key)
                    )
                    .length;


            const completedLabsCount =
                requirements.activityKeys
                    .filter(
                        key =>
                            progress
                                .completedLabs
                                .includes(key)
                    )
                    .length;


            const completedAssessmentCount =
                requirements.assessmentKeys
                    .filter(
                        key =>
                            progress
                                .completedAssessments
                                .includes(key)
                    )
                    .length;


            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "course-progress-card";


            card.innerHTML = `

                <div class="course-progress-card-top">

                    <div class="course-progress-icon">
                        <i class="${escapeHTML(
                            course.icon ||
                            "fa-solid fa-graduation-cap"
                        )}"></i>
                    </div>

                    <span class="course-level">
                        ${escapeHTML(
                            String(
                                course.level ||
                                "Course"
                            )
                                .toUpperCase()
                        )}
                    </span>

                </div>


                <h3>
                    ${escapeHTML(
                        course.title
                    )}
                </h3>


                <p>
                    ${escapeHTML(
                        course.description ||
                        ""
                    )}
                </p>


                <div class="course-progress-value">

                    <span>
                        Course Completion
                    </span>

                    <strong>
                        ${percentage}%
                    </strong>

                </div>


                <div class="course-progress-track">

                    <div
                        class="course-progress-bar"
                        style="width: ${percentage}%"
                    ></div>

                </div>


                <div class="course-progress-meta">

                    <span>
                        <i class="fa-solid fa-graduation-cap"></i>
                        ${completedLessonsCount}/${requirements.lessonKeys.length}
                        Lessons
                    </span>

                    ${
                        requirements.activityKeys.length
                            ? `
                                <span>
                                    <i class="fa-solid fa-flask"></i>
                                    ${completedLabsCount}/${requirements.activityKeys.length}
                                    Activities
                                </span>
                              `
                            : ""
                    }

                    ${
                        requirements.assessmentKeys.length
                            ? `
                                <span>
                                    <i class="fa-solid fa-clipboard-check"></i>
                                    ${completedAssessmentCount}/${requirements.assessmentKeys.length}
                                    Assessments
                                </span>
                              `
                            : ""
                    }

                    ${
                        requirements.finalRequired
                            ? `
                                <span>
                                    <i class="fa-solid fa-trophy"></i>
                                    ${
                                        progress.finalAssessment?.passed
                                            ? "Final Passed"
                                            : "Final Pending"
                                    }
                                </span>
                              `
                            : ""
                    }

                </div>


                <a
                    href="${buildCourseUrl(
                        course.id
                    )}"
                    class="progress-primary-btn"
                    style="width:100%; margin-top:20px;"
                >
                    ${
                        progress.completed
                            ? "Review Course"
                            : "Continue"
                    }

                    <i class="fa-solid fa-arrow-right"></i>
                </a>

            `;


            courseProgressList
                .appendChild(
                    card
                );

        }
    );

}


/* =========================================================
   OVERALL PROGRESS
========================================================= */

function calculateOverallProgress() {

    const entries =
        getStartedCourseEntries();


    if (!entries.length) {

        return 0;

    }


    const total =
        entries.reduce(
            (
                sum,
                entry
            ) => {

                return (
                    sum +
                    calculateCourseProgress(
                        entry.course,
                        entry.progress
                    )
                );

            },
            0
        );


    return Math.round(
        total /
        entries.length
    );

}


function updateOverallProgress() {

    const progress =
        calculateOverallProgress();


    if (overallProgressPercent) {

        overallProgressPercent.textContent =
            `${progress}%`;

    }


    if (heroProgressPercent) {

        heroProgressPercent.textContent =
            `${progress}%`;

    }


    if (overallProgressBar) {

        overallProgressBar.style.width =
            `${progress}%`;

    }


    const heroRing =
        document.querySelector(
            ".progress-ring"
        );


    if (heroRing) {

        const degrees =
            Math.round(
                progress *
                3.6
            );


        heroRing.style.background =
            `conic-gradient(
                #00ffaa ${degrees}deg,
                rgba(255,255,255,.06) ${degrees}deg
            )`;

    }


    if (overallProgressText) {

        if (progress === 0) {

            overallProgressText.textContent =
                "Start a course to begin building your progress.";

        }
        else if (progress >= 100) {

            overallProgressText.textContent =
                "Excellent work. Your active learning pathways are complete.";

        }
        else {

            overallProgressText.textContent =
                "Keep going. Your cybersecurity learning progress is growing.";

        }

    }

}


/* =========================================================
   STATISTICS
========================================================= */

function updateStatistics() {

    const entries =
        getStartedCourseEntries();


    const started =
        entries.length;


    const lessons =
        entries.reduce(
            (
                total,
                entry
            ) =>
                total +
                entry.progress
                    .completedLessons
                    .length,
            0
        );


    const labs =
        entries.reduce(
            (
                total,
                entry
            ) =>
                total +
                entry.progress
                    .completedLabs
                    .length,
            0
        );


    const assessments =
        entries.reduce(
            (
                total,
                entry
            ) =>
                total +
                entry.progress
                    .completedAssessments
                    .length +
                (
                    entry.progress
                        .finalAssessment
                        ?.passed
                            ? 1
                            : 0
                ),
            0
        );


    if (coursesStarted) {

        coursesStarted.textContent =
            String(
                started
            );

    }


    if (lessonsCompleted) {

        lessonsCompleted.textContent =
            String(
                lessons
            );

    }


    if (labsCompleted) {

        labsCompleted.textContent =
            String(
                labs
            );

    }


    if (assessmentsCompleted) {

        assessmentsCompleted.textContent =
            String(
                assessments
            );

    }

}


/* =========================================================
   MILESTONES
========================================================= */

function updateMilestones() {

    const cards =
        document.querySelectorAll(
            ".milestone-card"
        );


    if (!cards.length) {

        return;

    }


    const entries =
        getStartedCourseEntries();


    const totalLabs =
        entries.reduce(
            (
                sum,
                entry
            ) =>
                sum +
                entry.progress
                    .completedLabs
                    .length,
            0
        );


    const totalAssessments =
        entries.reduce(
            (
                sum,
                entry
            ) =>
                sum +
                entry.progress
                    .completedAssessments
                    .length,
            0
        );


    const certificates =
        entries.filter(
            entry =>
                entry.progress
                    .certificateEligible
        )
            .length;


    const states = [
        entries.length > 0,
        totalLabs > 0,
        totalAssessments > 0,
        certificates > 0
    ];


    cards.forEach(
        (
            card,
            index
        ) => {

            const status =
                card.querySelector(
                    ".milestone-status"
                );


            if (!status) {

                return;

            }


            const achieved =
                Boolean(
                    states[index]
                );


            status.innerHTML =
                achieved
                    ? `
                        <i class="fa-solid fa-circle-check"></i>
                        Achieved
                      `
                    : `
                        <i class="fa-solid fa-circle"></i>
                        ${
                            index === 0
                                ? "Not Started"
                                : "Locked"
                        }
                      `;


            card.classList.toggle(
                "completed",
                achieved
            );

        }
    );

}


/* =========================================================
   RECENT ACTIVITY
========================================================= */

function updateRecentActivity() {

    const container =
        document.getElementById(
            "recentActivity"
        );


    const empty =
        document.getElementById(
            "noRecentActivity"
        );


    if (!container) {

        return;

    }


    const entries =
        getStartedCourseEntries()
            .sort(
                (
                    a,
                    b
                ) => {

                    const aTime =
                        getTimestampValue(
                            a.progress.updatedAt
                        );


                    const bTime =
                        getTimestampValue(
                            b.progress.updatedAt
                        );


                    return (
                        bTime -
                        aTime
                    );

                }
            )
            .slice(
                0,
                5
            );


    if (!entries.length) {

        if (empty) {

            empty.hidden =
                false;

        }


        return;

    }


    if (empty) {

        empty.hidden =
            true;

    }


    container
        .querySelectorAll(
            ".progress-activity-item"
        )
        .forEach(
            item =>
                item.remove()
        );


    entries.forEach(
        entry => {

            const article =
                document.createElement(
                    "article"
                );


            article.className =
                "progress-activity-item";


            article.innerHTML = `

                <div class="activity-empty-icon">
                    <i class="${escapeHTML(
                        entry.course.icon ||
                        "fa-solid fa-book-open"
                    )}"></i>
                </div>

                <div>

                    <h3>
                        ${escapeHTML(
                            entry.course.title
                        )}
                    </h3>

                    <p>
                        ${calculateCourseProgress(
                            entry.course,
                            entry.progress
                        )}% complete
                        •
                        ${escapeHTML(
                            getRecentStatusText(
                                entry
                            )
                        )}
                    </p>

                </div>

            `;


            container.appendChild(
                article
            );

        }
    );

}


function getRecentStatusText(entry) {

    if (
        entry.progress
            .completed
    ) {

        return "Course completed";

    }


    if (
        entry.progress
            .finalAssessment
            ?.passed
    ) {

        return "Final assessment passed";

    }


    if (
        entry.progress
            .completedAssessments
            .length
    ) {

        return "Module assessment progress recorded";

    }


    if (
        entry.progress
            .completedLabs
            .length
    ) {

        return "Practical activity completed";

    }


    return "Lesson progress updated";

}


function getTimestampValue(
    timestamp
) {

    if (!timestamp) {

        return 0;

    }


    if (
        typeof timestamp.toMillis ===
            "function"
    ) {

        return timestamp.toMillis();

    }


    if (
        typeof timestamp.seconds ===
            "number"
    ) {

        return (
            timestamp.seconds *
            1000
        );

    }


    return 0;

}


/* =========================================================
   INITIALIZE
========================================================= */

async function initialiseProgressPage() {

    await loadProgress();

    renderCourses();

    updateOverallProgress();

    updateStatistics();

    updateMilestones();

    updateRecentActivity();

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
    catch (error) {

        console.error(
            "[CWS Progress] Logout failed:",
            error
        );

    }

}


/* =========================================================
   EVENTS
========================================================= */

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

                window.location.replace(
                    "../pages/login.html?redirect=progress"
                );


                return;

            }


            currentUser =
                user;


            if (studentName) {

                studentName.textContent =
                    getUserName(
                        user
                    );

            }


            if (initialized) {

                return;

            }


            initialized =
                true;


            await initialiseProgressPage();

        }
    );

}
