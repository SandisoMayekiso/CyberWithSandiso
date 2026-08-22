/* =========================================================
   CWS ACADEMY
   PREMIUM STUDENT PROGRESS
   Server-verified Firestore learning analytics
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


/* =========================================================
   DOM
========================================================= */

const byId = (id) => document.getElementById(id);

const elements = {
    studentName: byId("studentName"),
    logoutBtn: byId("logoutBtn"),
    progressSyncStatus: byId("progressSyncStatus"),
    heroProgressPercent: byId("heroProgressPercent"),
    overallProgressPercent: byId("overallProgressPercent"),
    overallProgressBar: byId("overallProgressBar"),
    overallProgressText: byId("overallProgressText"),
    coursesStarted: byId("coursesStarted"),
    lessonsCompleted: byId("lessonsCompleted"),
    labsCompleted: byId("labsCompleted"),
    assessmentsCompleted: byId("assessmentsCompleted"),
    certificatesEarned: byId("certificatesEarned"),
    assessmentAverage: byId("assessmentAverage"),
    assessmentBest: byId("assessmentBest"),
    assessmentsPassed: byId("assessmentsPassed"),
    assessmentScoreBar: byId("assessmentScoreBar"),
    assessmentInsightText: byId("assessmentInsightText"),
    recommendedNextTitle: byId("recommendedNextTitle"),
    recommendedNextText: byId("recommendedNextText"),
    recommendedNextMeta: byId("recommendedNextMeta"),
    recommendedNextLink: byId("recommendedNextLink"),
    progressSearchInput: byId("progressSearchInput"),
    progressStatusFilter: byId("progressStatusFilter"),
    progressSortSelect: byId("progressSortSelect"),
    courseProgressSummary: byId("courseProgressSummary"),
    progressLoading: byId("progressLoading"),
    courseProgressList: byId("courseProgressList"),
    noCourseProgress: byId("noCourseProgress"),
    noCourseMatches: byId("noCourseMatches"),
    clearProgressFilters: byId("clearProgressFilters"),
    recentActivity: byId("recentActivity"),
    noRecentActivity: byId("noRecentActivity"),
    nextStepTitle: byId("nextStepTitle"),
    nextStepText: byId("nextStepText"),
    nextStepPrimaryLink: byId("nextStepPrimaryLink"),
    progressError: byId("progressError"),
    progressErrorText: byId("progressErrorText"),
    retryProgressBtn: byId("retryProgressBtn")
};


/* =========================================================
   STATE
========================================================= */

let currentUser = null;
let progressMap = new Map();
let initialized = false;

const filters = {
    search: "",
    status: "all",
    sort: "recent"
};


/* =========================================================
   GENERAL HELPERS
========================================================= */

function clamp(value, minimum = 0, maximum = 100) {
    return Math.min(
        Math.max(Number(value) || 0, minimum),
        maximum
    );
}

function escapeHTML(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function getUserName(user) {
    const displayName = String(user?.displayName || "").trim();

    if (displayName) {
        return displayName;
    }

    const emailName = String(user?.email || "").split("@")[0];

    if (emailName) {
        return emailName
            .replace(/[._-]+/g, " ")
            .replace(/\b\w/g, (character) => character.toUpperCase());
    }

    return "Student";
}

function getAllCourses() {
    return courses && typeof courses === "object"
        ? Object.values(courses)
        : [];
}

function timestampValue(timestamp) {
    if (!timestamp) {
        return 0;
    }

    if (typeof timestamp.toMillis === "function") {
        return timestamp.toMillis();
    }

    if (typeof timestamp.seconds === "number") {
        return timestamp.seconds * 1000;
    }

    const parsed = Date.parse(timestamp);
    return Number.isFinite(parsed) ? parsed : 0;
}

function relativeTime(timestamp) {
    const milliseconds = timestampValue(timestamp);

    if (!milliseconds) {
        return "Recently updated";
    }

    const elapsedSeconds = Math.max(
        0,
        Math.floor((Date.now() - milliseconds) / 1000)
    );

    if (elapsedSeconds < 60) {
        return "Updated just now";
    }

    const units = [
        [31536000, "year"],
        [2592000, "month"],
        [604800, "week"],
        [86400, "day"],
        [3600, "hour"],
        [60, "minute"]
    ];

    const formatter = new Intl.RelativeTimeFormat("en", {
        numeric: "auto"
    });

    const match = units.find(([seconds]) => elapsedSeconds >= seconds);

    if (!match) {
        return "Updated recently";
    }

    const [seconds, label] = match;
    return formatter.format(-Math.floor(elapsedSeconds / seconds), label);
}


/* =========================================================
   COURSE REQUIREMENTS
========================================================= */

function moduleActivities(module) {
    return [
        ...(Array.isArray(module?.labActivities)
            ? module.labActivities
            : []),
        ...(Array.isArray(module?.practiceActivities)
            ? module.practiceActivities
            : [])
    ];
}

function hasModuleAssessment(module) {
    const assessment = module?.moduleAssessment;

    return Boolean(
        assessment &&
        (
            Number(assessment.questionCount) > 0 ||
            (
                Array.isArray(assessment.questions) &&
                assessment.questions.length > 0
            ) ||
            Number(module?.assessments) > 0
        )
    );
}

function courseRequirements(course) {
    const lessonKeys = [];
    const allActivityKeys = [];
    const assessmentKeys = [];

    const modules = Array.isArray(course?.modules)
        ? course.modules
        : [];

    modules.forEach((module) => {
        const lessons = Array.isArray(module.lessons)
            ? module.lessons
            : [];

        lessons.forEach((lesson) => {
            lessonKeys.push(`${module.id}:${lesson.id}`);
        });

        moduleActivities(module).forEach((activity) => {
            allActivityKeys.push(`${module.id}:${activity.id}`);
        });

        if (hasModuleAssessment(module)) {
            assessmentKeys.push(`${module.id}:assessment`);
        }
    });

    return {
        lessonKeys,
        activityKeys:
            course?.completionRules?.requireRequiredLabs === true
                ? allActivityKeys
                : [],
        allActivityKeys,
        assessmentKeys:
            course?.completionRules?.requireAllModuleAssessments === false
                ? []
                : assessmentKeys,
        finalRequired: Boolean(course?.finalAssessment)
    };
}


/* =========================================================
   PROGRESS NORMALIZATION
========================================================= */

function normalizeProgress(courseId, source = {}) {
    const objectValue = (value) =>
        value && typeof value === "object" ? value : {};

    return {
        courseId,
        completedLessons: Array.isArray(source.completedLessons)
            ? [...new Set(source.completedLessons)]
            : [],
        completedLabs: Array.isArray(source.completedLabs)
            ? [...new Set(source.completedLabs)]
            : [],
        completedAssessments: Array.isArray(source.completedAssessments)
            ? [...new Set(source.completedAssessments)]
            : [],
        passedLessonQuizzes: objectValue(source.passedLessonQuizzes),
        assessmentScores: objectValue(source.assessmentScores),
        finalAssessment: {
            score: 0,
            bestScore: 0,
            passed: false,
            ...objectValue(source.finalAssessment)
        },
        currentModule: String(source.currentModule || ""),
        currentLesson: String(source.currentLesson || ""),
        progressPercent: Number(source.progressPercent),
        started: source.started === true,
        completed: source.completed === true,
        certificateEligible: source.certificateEligible === true,
        certificate: objectValue(source.certificate),
        startedAt: source.startedAt || null,
        completedAt: source.completedAt || null,
        updatedAt: source.updatedAt || null
    };
}

function isStarted(progress) {
    return Boolean(
        progress &&
        (
            progress.started ||
            progress.completed ||
            progress.completedLessons.length ||
            progress.completedLabs.length ||
            progress.completedAssessments.length ||
            Object.keys(progress.assessmentScores).length ||
            progress.finalAssessment.passed
        )
    );
}

function calculateCourseProgress(course, progress) {
    if (!course || !progress) {
        return 0;
    }

    if (Number.isFinite(progress.progressPercent)) {
        return Math.round(clamp(progress.progressPercent));
    }

    const requirements = courseRequirements(course);
    const completedLessons = new Set(progress.completedLessons);
    const completedLabs = new Set(progress.completedLabs);
    const completedAssessments = new Set(progress.completedAssessments);

    const completeUnits =
        requirements.lessonKeys.filter((key) => completedLessons.has(key)).length +
        requirements.activityKeys.filter((key) => completedLabs.has(key)).length +
        requirements.assessmentKeys.filter((key) => completedAssessments.has(key)).length +
        (requirements.finalRequired && progress.finalAssessment.passed ? 1 : 0);

    const totalUnits =
        requirements.lessonKeys.length +
        requirements.activityKeys.length +
        requirements.assessmentKeys.length +
        (requirements.finalRequired ? 1 : 0);

    return totalUnits
        ? Math.round(clamp((completeUnits / totalUnits) * 100))
        : 0;
}

function getStartedEntries() {
    return getAllCourses()
        .map((course) => ({
            course,
            progress: progressMap.get(course.id) || null
        }))
        .filter(({progress}) => isStarted(progress))
        .map((entry) => ({
            ...entry,
            percentage: calculateCourseProgress(entry.course, entry.progress),
            updatedAt: timestampValue(entry.progress.updatedAt)
        }));
}


/* =========================================================
   URLS AND RESUME LOCATION
========================================================= */

function buildCourseUrl(courseId) {
    return `course-details.html?course=${encodeURIComponent(courseId)}`;
}

function buildLessonUrl(courseId, moduleId, lessonId) {
    const parameters = new URLSearchParams({
        course: courseId,
        module: moduleId,
        lesson: lessonId
    });

    return `lesson.html?${parameters.toString()}`;
}

function findResumeLocation(course, progress) {
    const modules = Array.isArray(course?.modules) ? course.modules : [];

    if (progress?.currentModule && progress?.currentLesson) {
        const module = modules.find((item) => item.id === progress.currentModule);
        const lesson = module?.lessons?.find(
            (item) => item.id === progress.currentLesson
        );

        if (module && lesson) {
            return {
                module,
                lesson,
                href: buildLessonUrl(course.id, module.id, lesson.id)
            };
        }
    }

    const completed = new Set(progress?.completedLessons || []);

    for (const module of modules) {
        const lesson = (module.lessons || []).find(
            (item) => !completed.has(`${module.id}:${item.id}`)
        );

        if (lesson) {
            return {
                module,
                lesson,
                href: buildLessonUrl(course.id, module.id, lesson.id)
            };
        }
    }

    return null;
}


/* =========================================================
   FIRESTORE
========================================================= */

async function loadProgress() {
    if (!db || !currentUser) {
        throw new Error("Firebase is not ready. Please refresh the page.");
    }

    const reference = collection(
        db,
        "users",
        currentUser.uid,
        "courseProgress"
    );

    const snapshot = await getDocs(reference);
    const nextMap = new Map();

    snapshot.forEach((documentSnapshot) => {
        nextMap.set(
            documentSnapshot.id,
            normalizeProgress(documentSnapshot.id, documentSnapshot.data())
        );
    });

    progressMap = nextMap;
}


/* =========================================================
   COURSE CARDS
========================================================= */

function filterAndSortEntries(entries) {
    const search = filters.search.toLowerCase();

    return entries
        .filter(({course, progress}) => {
            const matchesSearch = !search ||
                `${course.title} ${course.description} ${course.level}`
                    .toLowerCase()
                    .includes(search);

            const completed = progress.completed ||
                progress.certificateEligible ||
                calculateCourseProgress(course, progress) >= 100;

            const matchesStatus = filters.status === "all" ||
                (filters.status === "completed" && completed) ||
                (filters.status === "in-progress" && !completed);

            return matchesSearch && matchesStatus;
        })
        .sort((first, second) => {
            if (filters.sort === "progress-desc") {
                return second.percentage - first.percentage;
            }

            if (filters.sort === "progress-asc") {
                return first.percentage - second.percentage;
            }

            if (filters.sort === "title") {
                return first.course.title.localeCompare(second.course.title);
            }

            return second.updatedAt - first.updatedAt;
        });
}

function courseCard(entry) {
    const {course, progress, percentage} = entry;
    const requirements = courseRequirements(course);
    const completedLessons = new Set(progress.completedLessons);
    const completedLabs = new Set(progress.completedLabs);
    const completedAssessments = new Set(progress.completedAssessments);
    const lessonCount = requirements.lessonKeys
        .filter((key) => completedLessons.has(key)).length;
    const activityCount = requirements.activityKeys
        .filter((key) => completedLabs.has(key)).length;
    const assessmentCount = requirements.assessmentKeys
        .filter((key) => completedAssessments.has(key)).length;
    const complete = progress.completed || progress.certificateEligible || percentage >= 100;
    const resume = findResumeLocation(course, progress);
    const actionUrl = complete
        ? buildCourseUrl(course.id)
        : resume?.href || buildCourseUrl(course.id);
    const actionLabel = complete
        ? "Review Course"
        : resume
            ? "Resume Lesson"
            : "Continue Course";

    const status = complete ? "Completed" : "In progress";
    const icon = course.icon || "fa-solid fa-graduation-cap";

    return `
        <article class="course-progress-card${complete ? " completed" : ""}">
            <div class="course-progress-card-top">
                <div class="course-progress-icon" aria-hidden="true">
                    <i class="${escapeHTML(icon)}"></i>
                </div>
                <div class="course-card-badges">
                    <span class="course-level">${escapeHTML(
                        String(course.level || "Course").toUpperCase()
                    )}</span>
                    <span class="course-status-badge ${complete ? "completed" : "active"}">
                        <i class="fa-solid ${complete ? "fa-circle-check" : "fa-chart-line"}"></i>
                        ${status}
                    </span>
                </div>
            </div>

            <h3>${escapeHTML(course.title)}</h3>
            <p>${escapeHTML(course.description || "")}</p>

            <div class="course-progress-value">
                <span>Verified completion</span>
                <strong>${percentage}%</strong>
            </div>

            <div
                class="course-progress-track"
                role="progressbar"
                aria-label="${escapeHTML(course.title)} completion"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow="${percentage}"
            >
                <span class="course-progress-bar" style="width:${percentage}%"></span>
            </div>

            <div class="course-progress-meta">
                <span>
                    <i class="fa-solid fa-graduation-cap"></i>
                    ${lessonCount}/${requirements.lessonKeys.length} Lessons
                </span>
                ${requirements.activityKeys.length ? `
                    <span>
                        <i class="fa-solid fa-flask"></i>
                        ${activityCount}/${requirements.activityKeys.length} Activities
                    </span>
                ` : ""}
                ${requirements.assessmentKeys.length ? `
                    <span>
                        <i class="fa-solid fa-clipboard-check"></i>
                        ${assessmentCount}/${requirements.assessmentKeys.length} Assessments
                    </span>
                ` : ""}
                ${requirements.finalRequired ? `
                    <span>
                        <i class="fa-solid fa-trophy"></i>
                        ${progress.finalAssessment.passed ? "Final passed" : "Final pending"}
                    </span>
                ` : ""}
            </div>

            ${resume && !complete ? `
                <div class="course-resume-location">
                    <i class="fa-solid fa-location-arrow"></i>
                    <span>
                        Resume: ${escapeHTML(resume.module.title)}
                        <strong>${escapeHTML(resume.lesson.title)}</strong>
                    </span>
                </div>
            ` : ""}

            <span class="course-progress-updated">
                <i class="fa-regular fa-clock"></i>
                ${escapeHTML(relativeTime(progress.updatedAt))}
            </span>

            <div class="course-progress-actions">
                <a href="${actionUrl}" class="progress-primary-btn">
                    ${actionLabel}
                    <i class="fa-solid fa-arrow-right"></i>
                </a>
                ${progress.certificateEligible ? `
                    <a
                        href="certificate.html?course=${encodeURIComponent(course.id)}"
                        class="progress-icon-btn"
                        title="View certificate"
                        aria-label="View ${escapeHTML(course.title)} certificate"
                    >
                        <i class="fa-solid fa-certificate"></i>
                    </a>
                ` : ""}
            </div>
        </article>
    `;
}

function renderCourses() {
    if (!elements.courseProgressList) {
        return;
    }

    const allEntries = getStartedEntries();
    const visibleEntries = filterAndSortEntries(allEntries);

    elements.courseProgressList.innerHTML = visibleEntries
        .map(courseCard)
        .join("");

    if (elements.noCourseProgress) {
        elements.noCourseProgress.hidden = allEntries.length > 0;
    }

    if (elements.noCourseMatches) {
        elements.noCourseMatches.hidden = !allEntries.length || visibleEntries.length > 0;
    }

    if (elements.courseProgressSummary) {
        const label = visibleEntries.length === 1 ? "course" : "courses";
        elements.courseProgressSummary.textContent =
            `${visibleEntries.length} ${label} shown`;
    }
}


/* =========================================================
   SUMMARY ANALYTICS
========================================================= */

function overallPercentage(entries) {
    if (!entries.length) {
        return 0;
    }

    const total = entries.reduce(
        (sum, entry) => sum + entry.percentage,
        0
    );

    return Math.round(total / entries.length);
}

function updateOverall(entries) {
    const percentage = overallPercentage(entries);

    if (elements.heroProgressPercent) {
        elements.heroProgressPercent.textContent = `${percentage}%`;
    }

    if (elements.overallProgressPercent) {
        elements.overallProgressPercent.textContent = `${percentage}%`;
    }

    if (elements.overallProgressBar) {
        elements.overallProgressBar.style.width = `${percentage}%`;
    }

    document.querySelector(".progress-ring")
        ?.style.setProperty("--progress-degrees", `${percentage * 3.6}deg`);

    if (!elements.overallProgressText) {
        return;
    }

    if (!entries.length) {
        elements.overallProgressText.textContent =
            "Start a course to begin building your verified learning record.";
    } else if (percentage >= 100) {
        elements.overallProgressText.textContent =
            "Excellent work. Every active course requirement is complete.";
    } else if (percentage >= 75) {
        elements.overallProgressText.textContent =
            "You are close to completion. Finish the remaining verified requirements.";
    } else {
        elements.overallProgressText.textContent =
            "Your progress is securely synced. Continue from your exact saved lesson.";
    }
}

function setText(element, value) {
    if (element) {
        element.textContent = String(value);
    }
}

function updateStatistics(entries) {
    const totals = entries.reduce((summary, {progress}) => {
        summary.lessons += progress.completedLessons.length;
        summary.labs += progress.completedLabs.length;
        summary.assessments += progress.completedAssessments.length;

        if (progress.finalAssessment.passed) {
            summary.assessments += 1;
        }

        if (progress.certificateEligible) {
            summary.certificates += 1;
        }

        return summary;
    }, {
        lessons: 0,
        labs: 0,
        assessments: 0,
        certificates: 0
    });

    setText(elements.coursesStarted, entries.length);
    setText(elements.lessonsCompleted, totals.lessons);
    setText(elements.labsCompleted, totals.labs);
    setText(elements.assessmentsCompleted, totals.assessments);
    setText(elements.certificatesEarned, totals.certificates);
}

function assessmentResults(entries) {
    const scores = [];
    let passed = 0;

    entries.forEach(({progress}) => {
        Object.values(progress.assessmentScores).forEach((score) => {
            const number = Number(score);

            if (Number.isFinite(number)) {
                scores.push(clamp(number));
            }
        });

        passed += progress.completedAssessments.length;

        const finalScore = Number(
            progress.finalAssessment.bestScore ||
            progress.finalAssessment.score
        );

        if (Number.isFinite(finalScore) && finalScore > 0) {
            scores.push(clamp(finalScore));
        }

        if (progress.finalAssessment.passed) {
            passed += 1;
        }
    });

    const average = scores.length
        ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
        : null;
    const best = scores.length ? Math.max(...scores) : null;

    return {scores, average, best, passed};
}

function updateAssessmentInsights(entries) {
    const result = assessmentResults(entries);

    setText(elements.assessmentAverage, result.average === null ? "—" : `${result.average}%`);
    setText(elements.assessmentBest, result.best === null ? "—" : `${result.best}%`);
    setText(elements.assessmentsPassed, result.passed);

    if (elements.assessmentScoreBar) {
        elements.assessmentScoreBar.style.width = `${result.average || 0}%`;
    }

    if (!elements.assessmentInsightText) {
        return;
    }

    if (!result.scores.length) {
        elements.assessmentInsightText.textContent =
            "Complete a module or final assessment to build your performance profile.";
    } else if (result.average >= 85) {
        elements.assessmentInsightText.textContent =
            "Excellent performance. Your verified assessment average is above 85%.";
    } else if (result.average >= 70) {
        elements.assessmentInsightText.textContent =
            "Solid progress. Review weaker topics before your next assessment.";
    } else {
        elements.assessmentInsightText.textContent =
            "Revisit lesson notes and practice activities before your next attempt.";
    }
}


/* =========================================================
   RECOMMENDATIONS
========================================================= */

function recommendation(entries) {
    if (!entries.length) {
        return {
            title: "Choose your first course",
            text: "Start a structured CWS Academy course and your next step will appear here.",
            meta: "Personalised from your verified progress",
            label: "Explore Courses",
            href: "student-courses.html"
        };
    }

    const active = [...entries]
        .filter(({progress, percentage}) =>
            !progress.completed && !progress.certificateEligible && percentage < 100
        )
        .sort((first, second) => second.updatedAt - first.updatedAt)[0];

    if (active) {
        const resume = findResumeLocation(active.course, active.progress);

        return {
            title: `Continue ${active.course.title}`,
            text: resume
                ? `Resume ${resume.lesson.title} in ${resume.module.title}.`
                : "Continue the next incomplete course requirement.",
            meta: `${active.percentage}% complete • ${relativeTime(active.progress.updatedAt)}`,
            label: resume ? "Resume Exact Lesson" : "Continue Course",
            href: resume?.href || buildCourseUrl(active.course.id)
        };
    }

    const certificate = entries.find(({progress}) => progress.certificateEligible);

    if (certificate) {
        return {
            title: "Your certificate is ready",
            text: `Open and share your verified ${certificate.course.title} credential.`,
            meta: "Course requirements verified by CWS Academy",
            label: "View Certificate",
            href: `certificate.html?course=${encodeURIComponent(certificate.course.id)}`
        };
    }

    return {
        title: "Start your next course",
        text: "Build on your completed work with another cybersecurity pathway.",
        meta: "Keep expanding your practical skill set",
        label: "Browse Courses",
        href: "student-courses.html"
    };
}

function updateRecommendation(entries) {
    const next = recommendation(entries);

    setText(elements.recommendedNextTitle, next.title);
    setText(elements.recommendedNextText, next.text);
    setText(elements.recommendedNextMeta, next.meta);
    setText(elements.nextStepTitle, next.title);
    setText(elements.nextStepText, next.text);

    [elements.recommendedNextLink, elements.nextStepPrimaryLink]
        .filter(Boolean)
        .forEach((link) => {
            link.href = next.href;
            link.innerHTML = `
                ${escapeHTML(next.label)}
                <i class="fa-solid fa-arrow-right"></i>
            `;
        });
}


/* =========================================================
   RECENT ACTIVITY AND MILESTONES
========================================================= */

function activityStatus(progress) {
    if (progress.completed) {
        return "Course completed";
    }

    if (progress.finalAssessment.passed) {
        return "Final assessment passed";
    }

    if (progress.completedAssessments.length) {
        return "Module assessment progress verified";
    }

    if (progress.completedLabs.length) {
        return "Practical activity completed";
    }

    return "Lesson progress updated";
}

function updateRecentActivity(entries) {
    if (!elements.recentActivity) {
        return;
    }

    elements.recentActivity
        .querySelectorAll(".progress-activity-item")
        .forEach((item) => item.remove());

    const recent = [...entries]
        .sort((first, second) => second.updatedAt - first.updatedAt)
        .slice(0, 5);

    if (elements.noRecentActivity) {
        elements.noRecentActivity.hidden = recent.length > 0;
    }

    recent.forEach(({course, progress, percentage}) => {
        const article = document.createElement("article");
        const resume = findResumeLocation(course, progress);
        article.className = "progress-activity-item";
        article.innerHTML = `
            <div class="activity-empty-icon" aria-hidden="true">
                <i class="${escapeHTML(course.icon || "fa-solid fa-book-open")}"></i>
            </div>
            <div class="progress-activity-copy">
                <h3>${escapeHTML(course.title)}</h3>
                <p>${escapeHTML(activityStatus(progress))} • ${percentage}% complete</p>
                <span>${escapeHTML(relativeTime(progress.updatedAt))}</span>
            </div>
            <a
                href="${resume?.href || buildCourseUrl(course.id)}"
                aria-label="Continue ${escapeHTML(course.title)}"
            >
                <i class="fa-solid fa-arrow-right"></i>
            </a>
        `;
        elements.recentActivity.appendChild(article);
    });
}

function updateMilestones(entries) {
    const totals = entries.reduce((summary, {progress}) => {
        summary.labs += progress.completedLabs.length;
        summary.assessments += progress.completedAssessments.length;
        summary.assessments += progress.finalAssessment.passed ? 1 : 0;
        summary.certificates += progress.certificateEligible ? 1 : 0;
        return summary;
    }, {
        labs: 0,
        assessments: 0,
        certificates: 0
    });

    const achieved = {
        started: entries.length > 0,
        lab: totals.labs > 0,
        assessment: totals.assessments > 0,
        certificate: totals.certificates > 0
    };

    document.querySelectorAll("[data-milestone]").forEach((card) => {
        const complete = achieved[card.dataset.milestone] === true;
        const status = card.querySelector(".milestone-status");
        card.classList.toggle("completed", complete);

        if (status) {
            status.innerHTML = complete
                ? "<i class=\"fa-solid fa-circle-check\"></i> Achieved"
                : `<i class="fa-solid fa-circle"></i> ${
                    card.dataset.milestone === "started" ? "Not Started" : "Locked"
                }`;
        }
    });
}


/* =========================================================
   PAGE STATE
========================================================= */

function setLoading(loading) {
    if (elements.progressLoading) {
        elements.progressLoading.hidden = !loading;
    }

    if (elements.courseProgressList) {
        elements.courseProgressList.setAttribute("aria-busy", String(loading));
    }
}

function setSyncState(state) {
    if (!elements.progressSyncStatus) {
        return;
    }

    const states = {
        loading: ["fa-arrows-rotate fa-spin", "Syncing learning record"],
        ready: ["fa-circle-check", "Verified progress synced"],
        error: ["fa-triangle-exclamation", "Sync needs attention"]
    };
    const [icon, label] = states[state] || states.loading;

    elements.progressSyncStatus.className = `progress-sync-${state}`;
    elements.progressSyncStatus.innerHTML = `
        <i class="fa-solid ${icon}" aria-hidden="true"></i>
        ${label}
    `;
}

function showError(error) {
    console.error("[CWS Progress] Loading failed:", error);
    setSyncState("error");

    if (elements.progressErrorText) {
        elements.progressErrorText.textContent =
            error?.message || "Please check your connection and try again.";
    }

    if (elements.progressError) {
        elements.progressError.hidden = false;
    }
}

function clearError() {
    if (elements.progressError) {
        elements.progressError.hidden = true;
    }
}

function renderAll() {
    const entries = getStartedEntries();
    renderCourses();
    updateOverall(entries);
    updateStatistics(entries);
    updateAssessmentInsights(entries);
    updateRecommendation(entries);
    updateRecentActivity(entries);
    updateMilestones(entries);
}

async function initializeProgressPage() {
    setLoading(true);
    setSyncState("loading");
    clearError();

    try {
        await loadProgress();
        renderAll();
        setSyncState("ready");
    } catch (error) {
        showError(error);
    } finally {
        setLoading(false);
    }
}


/* =========================================================
   EVENTS
========================================================= */

elements.progressSearchInput?.addEventListener("input", (event) => {
    filters.search = event.target.value.trim();
    renderCourses();
});

elements.progressStatusFilter?.addEventListener("change", (event) => {
    filters.status = event.target.value;
    renderCourses();
});

elements.progressSortSelect?.addEventListener("change", (event) => {
    filters.sort = event.target.value;
    renderCourses();
});

elements.clearProgressFilters?.addEventListener("click", () => {
    filters.search = "";
    filters.status = "all";

    if (elements.progressSearchInput) {
        elements.progressSearchInput.value = "";
    }

    if (elements.progressStatusFilter) {
        elements.progressStatusFilter.value = "all";
    }

    renderCourses();
    elements.progressSearchInput?.focus();
});

elements.retryProgressBtn?.addEventListener("click", initializeProgressPage);

elements.logoutBtn?.addEventListener("click", async () => {
    try {
        await signOut(auth);
        window.location.replace("../pages/login.html");
    } catch (error) {
        console.error("[CWS Progress] Logout failed:", error);
        showError(new Error("Logout could not be completed. Please try again."));
    }
});


/* =========================================================
   AUTH
========================================================= */

if (!auth) {
    window.location.replace("../pages/login.html");
} else {
    onAuthStateChanged(auth, async (user) => {
        if (!user) {
            window.location.replace("../pages/login.html?redirect=progress");
            return;
        }

        currentUser = user;
        setText(elements.studentName, getUserName(user));

        if (initialized) {
            return;
        }

        initialized = true;
        await initializeProgressPage();
    });
}
