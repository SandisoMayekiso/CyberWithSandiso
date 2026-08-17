/* =========================================================
   CWS ACADEMY
   ASSESSMENTS CONTROLLER
   Unified Firestore Assessment Model
========================================================= */

"use strict";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

import {
    auth,
    db
} from "./firebase-config.js";

import {
    courses
} from "../data/courses.js";


let currentUser = null;
let progressMap = new Map();
let assessmentItems = [];
let initialized = false;


const studentName =
    document.getElementById("studentName");

const logoutBtn =
    document.getElementById("logoutBtn");

const assessmentsGrid =
    document.getElementById("assessmentsGrid");

const noAssessments =
    document.getElementById("noAssessments");

const assessmentCount =
    document.getElementById("assessmentCount");

const resultsContainer =
    document.getElementById("resultsContainer");

const noResults =
    document.getElementById("noResults");

const availableAssessments =
    document.getElementById("availableAssessments");

const completedAssessments =
    document.getElementById("completedAssessments");

const averageScore =
    document.getElementById("averageScore");

const passedAssessments =
    document.getElementById("passedAssessments");


function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


function safeNumber(value) {

    const number = Number(value);

    return Number.isFinite(number)
        ? number
        : 0;

}


function getUserName(user) {

    if (user?.displayName?.trim()) {
        return user.displayName.trim();
    }

    if (user?.email?.includes("@")) {

        return user.email
            .split("@")[0]
            .replace(/[._-]+/g, " ")
            .trim()
            .split(" ")
            .map(
                word =>
                    word.charAt(0).toUpperCase() +
                    word.slice(1)
            )
            .join(" ");

    }

    return "Student";

}


function getAllCourses() {

    return courses
        ? Object.values(courses)
        : [];

}


function normalizeProgress(
    courseId,
    data = {}
) {

    return {

        courseId,

        completedLessons:
            Array.isArray(data.completedLessons)
                ? data.completedLessons
                : [],

        completedLabs:
            Array.isArray(data.completedLabs)
                ? data.completedLabs
                : [],

        completedAssessments:
            Array.isArray(data.completedAssessments)
                ? data.completedAssessments
                : [],

        assessmentScores:
            (
                data.assessmentScores &&
                typeof data.assessmentScores === "object"
            )
                ? data.assessmentScores
                : {},

        finalAssessment:
            (
                data.finalAssessment &&
                typeof data.finalAssessment === "object"
            )
                ? data.finalAssessment
                : {
                    score: 0,
                    bestScore: 0,
                    passed: false
                },

        started:
            Boolean(data.started),

        completed:
            Boolean(data.completed),

        updatedAt:
            data.updatedAt || null

    };

}


async function loadProgress() {

    progressMap = new Map();

    if (!db || !currentUser) {
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
            await getDocs(ref);

        snapshot.forEach(
            item => {

                progressMap.set(
                    item.id,
                    normalizeProgress(
                        item.id,
                        item.data()
                    )
                );

            }
        );

    }
    catch (error) {

        console.error(
            "[CWS Assessments] Progress load failed:",
            error
        );

    }

}


function getModuleLessonKeys(module) {

    return (
        Array.isArray(module?.lessons)
            ? module.lessons
            : []
    )
        .map(
            lesson =>
                `${module.id}:${lesson.id}`
        );

}


function getModuleActivityKeys(module) {

    const activities = [
        ...(
            Array.isArray(module?.labActivities)
                ? module.labActivities
                : []
        ),
        ...(
            Array.isArray(module?.practiceActivities)
                ? module.practiceActivities
                : []
        )
    ];

    return activities.map(
        activity =>
            `${module.id}:${activity.id}`
    );

}


function isModuleAssessmentUnlocked(
    course,
    module,
    progress
) {

    if (!progress) {
        return false;
    }

    const lessonsComplete =
        getModuleLessonKeys(module)
            .every(
                key =>
                    progress.completedLessons
                        .includes(key)
            );

    const requireLabs =
        Boolean(
            course?.completionRules
                ?.requireRequiredLabs
        );

    const activitiesComplete =
        !requireLabs ||
        getModuleActivityKeys(module)
            .every(
                key =>
                    progress.completedLabs
                        .includes(key)
            );

    return (
        lessonsComplete &&
        activitiesComplete
    );

}


function isFinalAssessmentUnlocked(
    course,
    progress
) {

    if (!progress) {
        return false;
    }

    const modules =
        Array.isArray(course?.modules)
            ? course.modules
            : [];

    for (const module of modules) {

        if (
            !getModuleLessonKeys(module)
                .every(
                    key =>
                        progress.completedLessons
                            .includes(key)
                )
        ) {
            return false;
        }

        if (
            course?.completionRules
                ?.requireRequiredLabs &&
            !getModuleActivityKeys(module)
                .every(
                    key =>
                        progress.completedLabs
                            .includes(key)
                )
        ) {
            return false;
        }

        const hasAssessment =
            module.moduleAssessment &&
            Array.isArray(
                module.moduleAssessment.questions
            ) &&
            module.moduleAssessment.questions.length;

        if (
            course?.completionRules
                ?.requireAllModuleAssessments !== false &&
            hasAssessment &&
            !progress.completedAssessments
                .includes(
                    `${module.id}:assessment`
                )
        ) {
            return false;
        }

    }

    return true;

}


function getModuleScore(
    progress,
    moduleId
) {

    const key =
        `${moduleId}:assessment`;

    const value =
        progress?.assessmentScores?.[key];

    if (
        value &&
        typeof value === "object"
    ) {

        return safeNumber(
            value.bestScore ??
            value.score ??
            0
        );

    }

    return safeNumber(value);

}


function buildAssessmentItems() {

    assessmentItems = [];

    getAllCourses()
        .forEach(
            course => {

                const progress =
                    progressMap.get(course.id) ||
                    normalizeProgress(
                        course.id
                    );

                const modules =
                    Array.isArray(course.modules)
                        ? course.modules
                        : [];

                modules.forEach(
                    (
                        module,
                        index
                    ) => {

                        const assessment =
                            module.moduleAssessment;

                        if (
                            !assessment ||
                            !Array.isArray(
                                assessment.questions
                            ) ||
                            !assessment.questions.length
                        ) {
                            return;
                        }

                        const key =
                            `${module.id}:assessment`;

                        const completed =
                            progress.completedAssessments
                                .includes(key);

                        const score =
                            getModuleScore(
                                progress,
                                module.id
                            );

                        const passMark =
                            safeNumber(
                                assessment.passingScore ??
                                assessment.passMark ??
                                70
                            );

                        assessmentItems.push({

                            id:
                                `${course.id}:${key}`,

                            type:
                                "module",

                            courseId:
                                course.id,

                            courseTitle:
                                course.title,

                            courseIcon:
                                course.icon,

                            moduleId:
                                module.id,

                            moduleTitle:
                                module.title,

                            moduleNumber:
                                index + 1,

                            title:
                                assessment.title ||
                                `${module.title} Assessment`,

                            description:
                                assessment.description ||
                                `Test your understanding of ${module.title}.`,

                            questions:
                                assessment.questions.length,

                            duration:
                                assessment.duration ||
                                "15–20 minutes",

                            passMark,

                            score,

                            completed,

                            passed:
                                completed ||
                                score >= passMark,

                            unlocked:
                                completed ||
                                isModuleAssessmentUnlocked(
                                    course,
                                    module,
                                    progress
                                ),

                            href:
                                `module-assessment.html?course=${encodeURIComponent(
                                    course.id
                                )}&module=${encodeURIComponent(
                                    module.id
                                )}`,

                            updatedAt:
                                progress.updatedAt

                        });

                    }
                );

                if (
                    course.finalAssessment &&
                    Array.isArray(
                        course.finalAssessment.questions
                    ) &&
                    course.finalAssessment.questions.length
                ) {

                    const final =
                        progress.finalAssessment ||
                        {};

                    const score =
                        safeNumber(
                            final.bestScore ??
                            final.score ??
                            0
                        );

                    const passMark =
                        safeNumber(
                            course.finalAssessment
                                .passingScore ??
                            75
                        );

                    assessmentItems.push({

                        id:
                            `${course.id}:final`,

                        type:
                            "final",

                        courseId:
                            course.id,

                        courseTitle:
                            course.title,

                        courseIcon:
                            course.icon,

                        moduleId:
                            "",

                        moduleTitle:
                            "Course Final",

                        moduleNumber:
                            null,

                        title:
                            course.finalAssessment.title ||
                            "Final Assessment",

                        description:
                            course.finalAssessment.description ||
                            `Complete the final assessment for ${course.title}.`,

                        questions:
                            course.finalAssessment
                                .questions.length,

                        duration:
                            course.finalAssessment.duration ||
                            "45–60 minutes",

                        passMark,

                        score,

                        completed:
                            Boolean(
                                final.passed
                            ),

                        passed:
                            Boolean(
                                final.passed
                            ),

                        unlocked:
                            Boolean(
                                final.passed ||
                                isFinalAssessmentUnlocked(
                                    course,
                                    progress
                                )
                            ),

                        href:
                            `final-assessment.html?course=${encodeURIComponent(
                                course.id
                            )}`,

                        updatedAt:
                            progress.updatedAt

                    });

                }

            }
        );

}


function getRelevantAssessments() {

    return assessmentItems.filter(
        item => {

            const progress =
                progressMap.get(
                    item.courseId
                );

            return Boolean(
                progress &&
                (
                    progress.started ||
                    progress.completedLessons.length ||
                    progress.completedLabs.length ||
                    progress.completedAssessments.length ||
                    progress.finalAssessment?.passed
                )
            );

        }
    );

}


function createAssessmentCard(
    assessment
) {

    const card =
        document.createElement(
            "article"
        );

    card.className =
        "assessment-card";

    const status =
        assessment.passed
            ? "Passed"
            : assessment.unlocked
                ? (
                    assessment.score > 0
                        ? "Retry"
                        : "Available"
                )
                : "Locked";

    const statusClass =
        assessment.passed
            ? "completed"
            : "";

    const buttonLabel =
        assessment.passed
            ? "Review / Retake"
            : assessment.unlocked
                ? (
                    assessment.score > 0
                        ? "Retry Assessment"
                        : "Start Assessment"
                )
                : "Locked";

    card.innerHTML = `

        <div class="assessment-card-header">

            <div class="assessment-card-icon">
                <i class="${escapeHTML(
                    assessment.courseIcon ||
                    "fa-solid fa-clipboard-check"
                )}"></i>
            </div>

            <span class="assessment-status ${statusClass}">
                ${status}
            </span>

        </div>


        <div class="assessment-card-content">

            <span class="assessments-eyebrow">
                ${
                    assessment.type === "final"
                        ? "COURSE FINAL"
                        : `MODULE ${String(
                            assessment.moduleNumber
                        ).padStart(2, "0")}`
                }
            </span>

            <h3>
                ${escapeHTML(
                    assessment.title
                )}
            </h3>

            <p>
                ${escapeHTML(
                    assessment.description
                )}
            </p>

            <div class="assessment-meta">

                <div class="assessment-meta-item">
                    <span>QUESTIONS</span>
                    <strong>
                        ${assessment.questions}
                    </strong>
                </div>

                <div class="assessment-meta-item">
                    <span>DURATION</span>
                    <strong>
                        ${escapeHTML(
                            assessment.duration
                        )}
                    </strong>
                </div>

                <div class="assessment-meta-item">
                    <span>PASS MARK</span>
                    <strong>
                        ${assessment.passMark}%
                    </strong>
                </div>

                <div class="assessment-meta-item">
                    <span>COURSE</span>
                    <strong>
                        ${escapeHTML(
                            assessment.courseTitle
                        )}
                    </strong>
                </div>

            </div>

        </div>


        <div class="assessment-card-footer">

            <span class="assessment-score">

                ${
                    assessment.score > 0 ||
                    assessment.passed
                        ? `
                            Best score:
                            <strong>
                                ${assessment.score}%
                            </strong>
                          `
                        : assessment.unlocked
                            ? "Ready when you are."
                            : "Complete the prerequisites first."
                }

            </span>

            <a
                href="${
                    assessment.unlocked
                        ? assessment.href
                        : "#"
                }"
                class="assessment-start-btn ${
                    assessment.unlocked
                        ? ""
                        : "disabled"
                }"
                ${
                    assessment.unlocked
                        ? ""
                        : 'aria-disabled="true" tabindex="-1"'
                }
            >
                ${buttonLabel}
                <i class="fa-solid ${
                    assessment.unlocked
                        ? "fa-arrow-right"
                        : "fa-lock"
                }"></i>
            </a>

        </div>

    `;

    return card;

}


function renderAssessments() {

    if (!assessmentsGrid) {
        return;
    }

    assessmentsGrid.innerHTML =
        "";

    const relevant =
        getRelevantAssessments();

    if (assessmentCount) {

        const unlocked =
            relevant.filter(
                item =>
                    item.unlocked
            ).length;

        assessmentCount.textContent =
            `${unlocked} Available`;

    }

    if (!relevant.length) {

        if (noAssessments) {
            noAssessments.hidden =
                false;
        }

        return;
    }

    if (noAssessments) {
        noAssessments.hidden =
            true;
    }

    relevant.forEach(
        assessment => {

            assessmentsGrid.appendChild(
                createAssessmentCard(
                    assessment
                )
            );

        }
    );

}


function getResultItems() {

    return getRelevantAssessments()
        .filter(
            item =>
                item.score > 0 ||
                item.passed
        )
        .sort(
            (
                first,
                second
            ) =>
                getTimestampValue(
                    second.updatedAt
                ) -
                getTimestampValue(
                    first.updatedAt
                )
        );

}


function createResultRow(
    result
) {

    const row =
        document.createElement(
            "article"
        );

    row.className =
        "assessment-result-row";

    row.innerHTML = `

        <div class="assessment-result-title">

            <div class="assessment-result-icon">
                <i class="fa-solid ${
                    result.type === "final"
                        ? "fa-trophy"
                        : "fa-clipboard-check"
                }"></i>
            </div>

            <div>

                <strong>
                    ${escapeHTML(
                        result.title
                    )}
                </strong>

                <small>
                    ${escapeHTML(
                        result.courseTitle
                    )}
                    • Pass mark:
                    ${result.passMark}%
                </small>

            </div>

        </div>


        <div class="assessment-result-score ${
            result.passed
                ? "pass"
                : "fail"
        }">
            ${result.score}%
        </div>


        <span class="assessment-result-status ${
            result.passed
                ? ""
                : "fail"
        }">

            ${
                result.passed
                    ? "PASSED"
                    : "RETRY"
            }

        </span>


        <span class="assessment-result-date">
            ${
                result.type === "final"
                    ? "Final Assessment"
                    : escapeHTML(
                        result.moduleTitle
                    )
            }
        </span>

    `;

    return row;

}


function renderResults() {

    if (!resultsContainer) {
        return;
    }

    resultsContainer.innerHTML =
        "";

    const results =
        getResultItems();

    if (!results.length) {

        if (noResults) {
            noResults.hidden =
                false;
        }

        return;
    }

    if (noResults) {
        noResults.hidden =
            true;
    }

    results.forEach(
        result => {

            resultsContainer.appendChild(
                createResultRow(
                    result
                )
            );

        }
    );

}


function updateStatistics() {

    const relevant =
        getRelevantAssessments();

    const unlocked =
        relevant.filter(
            item =>
                item.unlocked
        ).length;

    const completed =
        relevant.filter(
            item =>
                item.score > 0 ||
                item.passed
        ).length;

    const passed =
        relevant.filter(
            item =>
                item.passed
        ).length;

    const scored =
        relevant.filter(
            item =>
                item.score > 0
        );

    const average =
        scored.length
            ? Math.round(
                scored.reduce(
                    (
                        total,
                        item
                    ) =>
                        total +
                        item.score,
                    0
                ) /
                scored.length
            )
            : 0;

    if (availableAssessments) {
        availableAssessments.textContent =
            String(unlocked);
    }

    if (completedAssessments) {
        completedAssessments.textContent =
            String(completed);
    }

    if (averageScore) {
        averageScore.textContent =
            `${average}%`;
    }

    if (passedAssessments) {
        passedAssessments.textContent =
            String(passed);
    }

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
        return timestamp.seconds * 1000;
    }

    return 0;

}


async function initialiseAssessmentsPage() {

    await loadProgress();

    buildAssessmentItems();

    updateStatistics();

    renderAssessments();

    renderResults();

}


async function logout() {

    try {

        await signOut(auth);

        window.location.replace(
            "../pages/login.html"
        );

    }
    catch (error) {

        console.error(
            "[CWS Assessments] Logout failed:",
            error
        );

    }

}


logoutBtn?.addEventListener(
    "click",
    logout
);


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
                    "../pages/login.html?redirect=assessments"
                );

                return;

            }

            currentUser = user;

            if (studentName) {

                studentName.textContent =
                    getUserName(user);

            }

            if (initialized) {
                return;
            }

            initialized = true;

            await initialiseAssessmentsPage();

        }
    );

}
