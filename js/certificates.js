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

import * as CourseRegistry
from "../data/courses.js";


const studentName = document.getElementById("studentName");
const logoutBtn = document.getElementById("logoutBtn");
const pageMessage = document.getElementById("certificatePageMessage");
const pageMessageTitle = document.getElementById("certificatePageMessageTitle");
const pageMessageText = document.getElementById("certificatePageMessageText");
const earnedGrid = document.getElementById("earnedCertificatesGrid");
const upcomingGrid = document.getElementById("upcomingCertificatesGrid");
const noCertificates = document.getElementById("noCertificates");
const earnedCertificateCount = document.getElementById("earnedCertificateCount");
const certificatesEarned = document.getElementById("certificatesEarned");
const certificatesAvailable = document.getElementById("certificatesAvailable");
const coursesCompleted = document.getElementById("coursesCompleted");
const achievementCount = document.getElementById("achievementCount");

let currentUser = null;
let progressMap = new Map();
let certificateRecords = [];
let certificatePaths = [];
let initialized = false;


function escapeHTML(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function clamp(value) {
    const number = Number(value);
    if (!Number.isFinite(number)) return 0;
    return Math.min(Math.max(Math.round(number), 0), 100);
}


function showPageMessage(title, text) {
    if (!pageMessage) return;
    if (pageMessageTitle) pageMessageTitle.textContent = title;
    if (pageMessageText) pageMessageText.textContent = text;
    pageMessage.hidden = false;
}


function hidePageMessage() {
    if (pageMessage) pageMessage.hidden = true;
}


function getUserName(user) {
    if (typeof user?.displayName === "string" && user.displayName.trim()) {
        return user.displayName.trim();
    }

    if (typeof user?.email === "string" && user.email.includes("@")) {
        const raw = user.email
            .split("@")[0]
            .replace(/[._-]+/g, " ")
            .trim();

        if (raw) {
            return raw.split(" ")
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
        }
    }

    return "Student";
}


function normalizeCourseCollection(value) {
    if (Array.isArray(value)) {
        return value.filter(
            course => course && typeof course === "object"
        );
    }

    if (value && typeof value === "object") {
        return Object.values(value).filter(
            course =>
                course &&
                typeof course === "object" &&
                (course.id || course.title)
        );
    }

    return [];
}


function getAllCourses() {
    const candidates = [
        CourseRegistry.courses,
        CourseRegistry.COURSES,
        CourseRegistry.courseRegistry,
        CourseRegistry.COURSE_REGISTRY,
        CourseRegistry.allCourses
    ];

    for (const candidate of candidates) {
        const normalized = normalizeCourseCollection(candidate);
        if (normalized.length) return normalized;
    }

    if (typeof CourseRegistry.getAllCourses === "function") {
        try {
            const normalized = normalizeCourseCollection(
                CourseRegistry.getAllCourses()
            );
            if (normalized.length) return normalized;
        } catch (error) {
            console.warn("[CWS Certificates] getAllCourses() failed:", error);
        }
    }

    for (const value of Object.values(CourseRegistry)) {
        const normalized = normalizeCourseCollection(value);
        if (
            normalized.length &&
            normalized.some(course => Array.isArray(course.modules))
        ) {
            return normalized;
        }
    }

    return [];
}


function normalizeProgress(courseId, data = {}) {
    return {
        courseId,
        completedLessons: Array.isArray(data.completedLessons) ? data.completedLessons : [],
        completedLabs: Array.isArray(data.completedLabs) ? data.completedLabs : [],
        completedAssessments: Array.isArray(data.completedAssessments) ? data.completedAssessments : [],
        finalAssessment:
            data.finalAssessment && typeof data.finalAssessment === "object"
                ? data.finalAssessment
                : { score: 0, bestScore: 0, passed: false },
        progressPercent: Number(data.progressPercent || 0),
        started: Boolean(data.started),
        completed: Boolean(data.completed),
        certificateEligible: Boolean(data.certificateEligible),
        certificate:
            data.certificate && typeof data.certificate === "object"
                ? data.certificate
                : {},
        completedAt: data.completedAt || null,
        updatedAt: data.updatedAt || null
    };
}


async function loadProgress() {
    progressMap = new Map();

    if (!db || !currentUser) return;

    try {
        const ref = collection(
            db,
            "users",
            currentUser.uid,
            "courseProgress"
        );

        const snapshot = await getDocs(ref);

        snapshot.forEach(item => {
            progressMap.set(
                item.id,
                normalizeProgress(item.id, item.data())
            );
        });
    } catch (error) {
        console.error("[CWS Certificates] Firestore progress load failed:", error);
        showPageMessage(
            "Progress unavailable",
            "The page loaded, but CWS Academy could not read your Firestore course progress."
        );
    }
}


function getModuleActivities(module) {
    return [
        ...(Array.isArray(module?.labActivities) ? module.labActivities : []),
        ...(Array.isArray(module?.practiceActivities) ? module.practiceActivities : [])
    ];
}


function getCourseRequirements(course) {
    const lessonKeys = [];
    const activityKeys = [];
    const assessmentKeys = [];

    const modules = Array.isArray(course?.modules)
        ? course.modules
        : [];

    modules.forEach(module => {
        const lessons = Array.isArray(module.lessons)
            ? module.lessons
            : [];

        lessons.forEach(lesson => {
            lessonKeys.push(`${module.id}:${lesson.id}`);
        });

        if (course?.completionRules?.requireRequiredLabs) {
            getModuleActivities(module).forEach(activity => {
                activityKeys.push(`${module.id}:${activity.id}`);
            });
        }

        const assessment = module.moduleAssessment;

        if (
            course?.completionRules?.requireAllModuleAssessments !== false &&
            assessment &&
            Array.isArray(assessment.questions) &&
            assessment.questions.length
        ) {
            assessmentKeys.push(`${module.id}:assessment`);
        }
    });

    return {
        lessonKeys,
        activityKeys,
        assessmentKeys,
        finalRequired: Boolean(course?.finalAssessment)
    };
}


function calculateCourseProgress(course, progress) {
    if (!progress) return 0;

    const requirements = getCourseRequirements(course);

    const total =
        requirements.lessonKeys.length +
        requirements.activityKeys.length +
        requirements.assessmentKeys.length +
        (requirements.finalRequired ? 1 : 0);

    if (!total) {
        return clamp(progress.progressPercent);
    }

    const lessons = requirements.lessonKeys.filter(
        key => progress.completedLessons.includes(key)
    ).length;

    const activities = requirements.activityKeys.filter(
        key => progress.completedLabs.includes(key)
    ).length;

    const assessments = requirements.assessmentKeys.filter(
        key => progress.completedAssessments.includes(key)
    ).length;

    const final = requirements.finalRequired && progress.finalAssessment?.passed
        ? 1
        : 0;

    return clamp(
        (lessons + activities + assessments + final) /
        total *
        100
    );
}


function toDate(value) {
    if (!value) return null;

    if (typeof value.toDate === "function") {
        return value.toDate();
    }

    if (typeof value.seconds === "number") {
        return new Date(value.seconds * 1000);
    }

    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
}


function formatDate(value) {
    const date = toDate(value);

    if (!date) return "Completion recorded";

    return date.toLocaleDateString(
        undefined,
        {
            year: "numeric",
            month: "short",
            day: "numeric"
        }
    );
}


function isCertificateEarned(progress) {
    return Boolean(
        progress &&
        (progress.completed || progress.certificateEligible)
    );
}


function buildCertificateData() {
    certificateRecords = [];
    certificatePaths = [];

    const allCourses = getAllCourses();

    if (!allCourses.length) {
        showPageMessage(
            "Course catalogue unavailable",
            "The Certificates page is working, but no course collection could be found in data/courses.js."
        );
        return;
    }

    allCourses.forEach(course => {
        if (!course?.id) return;

        const progress = progressMap.get(course.id) || null;
        const percent = calculateCourseProgress(course, progress);
        const earned = isCertificateEarned(progress);

        const available =
            course.status !== "planned" &&
            course.status !== "coming-soon";

        certificatePaths.push({
            id: course.id,
            title: course.title || course.id,
            description: course.description || "CWS Academy learning pathway.",
            icon: course.icon || "fa-solid fa-certificate",
            level: String(course.level || "Course").toUpperCase(),
            progress: percent,
            status: earned
                ? "Earned"
                : available
                    ? (progress?.started ? "In Progress" : "Available")
                    : "Planned",
            earned,
            started: Boolean(progress?.started),
            available
        });

        if (!earned) return;

        certificateRecords.push({
            id: course.id,
            title: course.title || course.id,
            description: course.description || "CWS Academy course completion certificate.",
            issueDate:
                progress?.certificate?.issuedAt ||
                progress?.completedAt ||
                progress?.updatedAt
        });
    });

    hidePageMessage();
}


function updateStatistics() {
    const available = certificatePaths.filter(path => path.available).length;
    const completed = certificateRecords.length;

    if (certificatesEarned) certificatesEarned.textContent = String(completed);
    if (certificatesAvailable) certificatesAvailable.textContent = String(available);
    if (coursesCompleted) coursesCompleted.textContent = String(completed);
    if (achievementCount) achievementCount.textContent = String(completed);
}


function createCertificateCard(certificate) {
    const card = document.createElement("article");
    card.className = "certificate-card";

    card.innerHTML = `
        <div class="certificate-preview">
            <div class="certificate-preview-icon">
                <i class="fa-solid fa-certificate"></i>
            </div>
            <small>CWS ACADEMY</small>
            <strong>${escapeHTML(certificate.title)}</strong>
        </div>

        <div class="certificate-card-content">
            <h3>${escapeHTML(certificate.title)}</h3>
            <p>${escapeHTML(certificate.description)}</p>

            <div class="certificate-meta">
                <span>
                    <i class="fa-solid fa-calendar"></i>
                    ${escapeHTML(formatDate(certificate.issueDate))}
                </span>

                <span>
                    <i class="fa-solid fa-shield-halved"></i>
                    Verified
                </span>
            </div>

            <div class="certificate-card-actions">
                <a
                    href="certificate.html?course=${encodeURIComponent(certificate.id)}"
                    class="certificate-view-btn"
                >
                    <i class="fa-solid fa-eye"></i>
                    View Certificate
                </a>
            </div>
        </div>
    `;

    return card;
}


function renderEarnedCertificates() {
    if (!earnedGrid) return;

    earnedGrid.innerHTML = "";

    if (earnedCertificateCount) {
        earnedCertificateCount.textContent =
            `${certificateRecords.length} Earned`;
    }

    if (!certificateRecords.length) {
        if (noCertificates) noCertificates.hidden = false;
        return;
    }

    if (noCertificates) noCertificates.hidden = true;

    certificateRecords.forEach(certificate => {
        earnedGrid.appendChild(
            createCertificateCard(certificate)
        );
    });
}


function createUpcomingCard(path) {
    const card = document.createElement("article");
    card.className = "upcoming-certificate-card";

    card.innerHTML = `
        <div class="upcoming-icon">
            <i class="${escapeHTML(path.icon)}"></i>
        </div>

        <span class="course-level">
            ${escapeHTML(path.level)}
        </span>

        <h3>${escapeHTML(path.title)}</h3>

        <p>${escapeHTML(path.description)}</p>

        <div class="upcoming-progress-label">
            <span>${escapeHTML(path.status)}</span>
            <strong>${path.progress}%</strong>
        </div>

        <div class="upcoming-progress-track">
            <div
                class="upcoming-progress-bar"
                style="width:${path.progress}%"
            ></div>
        </div>

        ${
            path.earned
                ? `
                    <a
                        href="certificate.html?course=${encodeURIComponent(path.id)}"
                        class="certificate-view-btn"
                        style="margin-top:16px;"
                    >
                        <i class="fa-solid fa-certificate"></i>
                        View Earned Certificate
                    </a>
                  `
                : path.available
                    ? `
                        <a
                            href="course-details.html?course=${encodeURIComponent(path.id)}"
                            class="certificate-secondary-btn"
                            style="margin-top:16px;"
                        >
                            ${path.started ? "Continue Course" : "View Course"}
                            <i class="fa-solid fa-arrow-right"></i>
                        </a>
                      `
                    : `
                        <span
                            class="certificate-path-status"
                            style="margin-top:16px;"
                        >
                            <i class="fa-solid fa-clock"></i>
                            Planned
                        </span>
                      `
        }
    `;

    return card;
}


function renderUpcoming() {
    if (!upcomingGrid) return;

    upcomingGrid.innerHTML = "";

    certificatePaths.forEach(path => {
        upcomingGrid.appendChild(
            createUpcomingCard(path)
        );
    });
}


function updateJourneySteps() {
    const steps = document.querySelectorAll(
        ".certificate-path-step"
    );

    if (!steps.length) return;

    const allProgress = [...progressMap.values()];

    const states = [
        allProgress.some(progress =>
            progress.started ||
            progress.completedLessons.length
        ),
        allProgress.some(progress =>
            progress.completedLessons.length
        ),
        allProgress.some(progress =>
            progress.completedLabs.length
        ),
        allProgress.some(progress =>
            progress.completedAssessments.length ||
            progress.finalAssessment?.passed
        ),
        certificateRecords.length > 0
    ];

    steps.forEach((step, index) => {
        const done = Boolean(states[index]);

        step.classList.toggle("active", done);
        step.classList.toggle("completed", done);
    });
}


async function initializeCertificatesPage() {
    showPageMessage(
        "Loading certificates",
        "Reading your CWS Academy course progress."
    );

    await loadProgress();

    buildCertificateData();
    updateStatistics();
    renderEarnedCertificates();
    renderUpcoming();
    updateJourneySteps();
}


async function logout() {
    try {
        if (logoutBtn) logoutBtn.disabled = true;

        await signOut(auth);

        window.location.replace(
            "../pages/login.html"
        );
    } catch (error) {
        console.error(
            "[CWS Certificates] Logout failed:",
            error
        );

        if (logoutBtn) logoutBtn.disabled = false;
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
} else {
    onAuthStateChanged(
        auth,
        async user => {
            if (!user) {
                window.location.replace(
                    "../pages/login.html?redirect=certificates"
                );
                return;
            }

            currentUser = user;

            if (studentName) {
                studentName.textContent =
                    getUserName(user);
            }

            if (initialized) return;

            initialized = true;

            try {
                await initializeCertificatesPage();
            } catch (error) {
                console.error(
                    "[CWS Certificates] Initialization failed:",
                    error
                );

                showPageMessage(
                    "Certificates could not be loaded",
                    "The page itself is working, but course data failed to load. Check the browser console for the exact error."
                );
            }
        }
    );
}
