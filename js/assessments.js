/* =========================================================
   CWS ACADEMY
   ASSESSMENTS PAGE
   Dynamic Course Registry + FREE / PRO Access
========================================================= */

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
    courses,
    getCourseStage
} from "../data/courses.js";

import {
    getUserEntitlement
} from "./access-control.js";


const assessmentsGrid =
    document.getElementById(
        "assessmentsGrid"
    );

const noAssessments =
    document.getElementById(
        "noAssessments"
    );

const assessmentCount =
    document.getElementById(
        "assessmentCount"
    );

const availableAssessments =
    document.getElementById(
        "availableAssessments"
    );

const completedAssessments =
    document.getElementById(
        "completedAssessments"
    );

const averageScore =
    document.getElementById(
        "averageScore"
    );

const passedAssessments =
    document.getElementById(
        "passedAssessments"
    );

const resultsContainer =
    document.getElementById(
        "resultsContainer"
    );

const noResults =
    document.getElementById(
        "noResults"
    );

const studentName =
    document.getElementById(
        "studentName"
    );

const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );


let currentUser = null;

let currentEntitlement = {
    plan: "free",
    status: "active"
};

let progressMap = new Map();

let assessmentCatalog = [];

let currentAccessFilter =
    "all";


/* =========================================================
   HELPERS
========================================================= */

function normalize(value) {
    return String(value || "")
        .trim()
        .toLowerCase();
}

function safeNumber(value) {
    const number = Number(value);

    return Number.isFinite(number)
        ? number
        : 0;
}

function getUserName(user) {
    if (!user) return "Student";

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
        return user.email
            .split("@")[0]
            .replace(/[._-]+/g, " ")
            .replace(/\b\w/g, char =>
                char.toUpperCase()
            );
    }

    return "Student";
}

function hasActivePro() {
    return (
        normalize(currentEntitlement?.plan) === "pro" &&
        ["active", "trialing"].includes(
            normalize(currentEntitlement?.status)
        )
    );
}

function buildUpgradeUrl(courseId) {
    const params = new URLSearchParams();

    if (courseId) {
        params.set(
            "course",
            courseId
        );
    }

    params.set(
        "from",
        "assessments"
    );

    return `subscription.html?${params.toString()}`;
}

function getProgress(courseId) {
    return progressMap.get(courseId) || {};
}

function moduleAssessmentUrl(item) {
    const params = new URLSearchParams({
        course: item.courseId,
        module: item.moduleId
    });

    return `module-assessment.html?${params.toString()}`;
}

function finalAssessmentUrl(item) {
    const params = new URLSearchParams({
        course: item.courseId
    });

    return `final-assessment.html?${params.toString()}`;
}

function getModuleAssessmentRecord(
    item
) {
    const progress =
        getProgress(
            item.courseId
        );

    const map =
        progress.moduleAssessments ||
        progress.assessments ||
        {};

    if (
        map &&
        typeof map === "object" &&
        !Array.isArray(map)
    ) {
        return (
            map[item.moduleId] ||
            map[
                `${item.moduleId}:${item.assessmentId}`
            ] ||
            null
        );
    }

    return null;
}

function isAssessmentCompleted(item) {
    const progress =
        getProgress(
            item.courseId
        );

    if (item.type === "final") {
        return Boolean(
            progress.finalAssessment?.passed ||
            progress.finalAssessment?.completed
        );
    }

    const completed =
        Array.isArray(
            progress.completedAssessments
        )
            ? progress.completedAssessments
            : [];

    const candidates = [
        item.assessmentId,
        item.moduleId,
        `${item.moduleId}:${item.assessmentId}`,
        `${item.courseId}:${item.moduleId}:${item.assessmentId}`
    ];

    if (
        candidates.some(key =>
            completed.includes(key)
        )
    ) {
        return true;
    }

    const record =
        getModuleAssessmentRecord(
            item
        );

    return Boolean(
        record?.passed ||
        record?.completed
    );
}

function getAssessmentScore(item) {
    const progress =
        getProgress(
            item.courseId
        );

    if (item.type === "final") {
        const value =
            progress.finalAssessment?.score;

        return Number.isFinite(
            Number(value)
        )
            ? Number(value)
            : null;
    }

    const record =
        getModuleAssessmentRecord(
            item
        );

    const value =
        record?.score ??
        record?.bestScore;

    return Number.isFinite(
        Number(value)
    )
        ? Number(value)
        : null;
}


/* =========================================================
   BUILD CATALOG
========================================================= */

function buildAssessmentCatalog() {
    const catalog = [];

    Object.values(courses || {}).forEach(course => {
        const access =
            normalize(course.access) === "pro"
                ? "pro"
                : "free";

        const stage =
            getCourseStage(
                course.id
            );

        if (Array.isArray(course.modules)) {
            course.modules.forEach(module => {
                const assessment =
                    module?.moduleAssessment;

                if (!assessment) {
                    return;
                }

                const assessmentId =
                    assessment.id ||
                    `${module.id}-assessment`;

                catalog.push({
                    key:
                        `${course.id}:${module.id}:${assessmentId}`,

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
                        module.title ||
                        "Course Module",

                    assessmentId,

                    title:
                        assessment.title ||
                        `${module.title} Assessment`,

                    description:
                        assessment.description ||
                        `Test your understanding of ${module.title}.`,

                    questions:
                        Array.isArray(
                            assessment.questions
                        )
                            ? assessment.questions.length
                            : safeNumber(
                                assessment.questions
                            ),

                    duration:
                        assessment.duration ||
                        "Self-paced",

                    passMark:
                        safeNumber(
                            assessment.passingScore ||
                            assessment.passMark ||
                            70
                        ),

                    access,
                    stage,

                    level:
                        course.level ||
                        "Course"
                });
            });
        }

        if (course.finalAssessment) {
            const assessment =
                course.finalAssessment;

            catalog.push({
                key:
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
                    "Final Assessment",

                assessmentId:
                    "final",

                title:
                    assessment.title ||
                    `${course.title} Final Assessment`,

                description:
                    assessment.description ||
                    `Complete the final assessment for ${course.title}.`,

                questions:
                    Array.isArray(
                        assessment.questions
                    )
                        ? assessment.questions.length
                        : safeNumber(
                            assessment.questions
                        ),

                duration:
                    assessment.duration ||
                    "Self-paced",

                passMark:
                    safeNumber(
                        assessment.passingScore ||
                        assessment.passMark ||
                        75
                    ),

                access,
                stage,

                level:
                    course.level ||
                    "Course"
            });
        }
    });

    return catalog;
}


/* =========================================================
   LOAD PROGRESS
========================================================= */

async function loadProgress(user) {
    progressMap = new Map();

    if (!db || !user) {
        return;
    }

    try {
        const snapshot =
            await getDocs(
                collection(
                    db,
                    "users",
                    user.uid,
                    "courseProgress"
                )
            );

        snapshot.forEach(docSnapshot => {
            progressMap.set(
                docSnapshot.id,
                docSnapshot.data() || {}
            );
        });
    }
    catch (err) {
        console.error(
            "[CWS Assessments] Unable to load progress:",
            err
        );
    }
}


/* =========================================================
   CARD
========================================================= */

function createAssessmentCard(item) {
    const completed =
        isAssessmentCompleted(
            item
        );

    const score =
        getAssessmentScore(
            item
        );

    const pro =
        item.access === "pro";

    const locked =
        pro &&
        !hasActivePro();

    const card =
        document.createElement(
            "article"
        );

    card.className =
        `assessment-card ${
            pro ? "pro-card" : "free-card"
        } ${
            locked ? "pro-locked" : ""
        }`;

    card.dataset.access =
        item.access;

    card.dataset.stage =
        item.stage;

    const accessBadge =
        pro
            ? `
                <span class="learning-access-badge pro">
                    <i class="fa-solid fa-crown"></i>
                    PRO
                </span>
              `
            : `
                <span class="learning-access-badge free">
                    <i class="fa-solid fa-unlock-keyhole"></i>
                    FREE
                </span>
              `;

    const status =
        completed
            ? "Completed"
            : "Available";

    const actionUrl =
        item.type === "final"
            ? finalAssessmentUrl(item)
            : moduleAssessmentUrl(item);

    const action =
        locked
            ? `
                <div class="learning-pro-lock-note">
                    <i class="fa-solid fa-lock"></i>

                    <span>
                        <strong>CWS Pro assessment</strong><br>
                        Upgrade to access this assessment.
                    </span>
                </div>

                <a
                    href="${buildUpgradeUrl(item.courseId)}"
                    class="learning-upgrade-btn"
                >
                    <span>
                        <i class="fa-solid fa-crown"></i>
                        Unlock with CWS Pro
                    </span>

                    <i class="fa-solid fa-arrow-right"></i>
                </a>
              `
            : `
                <a
                    href="${actionUrl}"
                    class="assessment-start-btn"
                >
                    <span>
                        ${
                            completed
                                ? "Review Assessment"
                                : "Start Assessment"
                        }
                    </span>

                    <i class="fa-solid fa-arrow-right"></i>
                </a>
              `;

    card.innerHTML = `
        <div class="assessment-card-header">

            <div class="assessment-card-icon">
                <i class="${
                    item.courseIcon ||
                    "fa-solid fa-clipboard-check"
                }"></i>
            </div>

            <div class="learning-card-badges">
                ${accessBadge}

                <span
                    class="assessment-status ${
                        completed
                            ? "completed"
                            : ""
                    }"
                >
                    ${status}
                </span>
            </div>

        </div>


        <div class="assessment-card-content">

            <span class="assessment-course-label">
                ${item.courseTitle}
            </span>

            <h3>
                ${item.title}
            </h3>

            <p>
                ${item.description}
            </p>


            <div class="assessment-meta">

                <div class="assessment-meta-item">
                    <span>QUESTIONS</span>
                    <strong>
                        ${item.questions}
                    </strong>
                </div>

                <div class="assessment-meta-item">
                    <span>DURATION</span>
                    <strong>
                        ${item.duration}
                    </strong>
                </div>

                <div class="assessment-meta-item">
                    <span>PASS MARK</span>
                    <strong>
                        ${item.passMark}%
                    </strong>
                </div>

                <div class="assessment-meta-item">
                    <span>TYPE</span>
                    <strong>
                        ${
                            item.type === "final"
                                ? "FINAL"
                                : "MODULE"
                        }
                    </strong>
                </div>

            </div>

        </div>


        <div class="assessment-card-footer">

            <span class="assessment-score">
                ${
                    score !== null
                        ? `Best score: <strong>${score}%</strong>`
                        : "Ready when you are."
                }
            </span>

        </div>

        ${action}
    `;

    return card;
}


/* =========================================================
   RENDER / FILTER
========================================================= */

function renderAssessments() {
    if (!assessmentsGrid) {
        return;
    }

    assessmentsGrid.innerHTML = "";

    const visible =
        assessmentCatalog.filter(
            item =>
                currentAccessFilter === "all" ||
                item.access === currentAccessFilter
        );

    visible.forEach(item => {
        assessmentsGrid.appendChild(
            createAssessmentCard(item)
        );
    });

    if (assessmentCount) {
        assessmentCount.textContent =
            `${visible.length} Available`;
    }

    if (noAssessments) {
        noAssessments.hidden =
            visible.length !== 0;
    }
}


/* =========================================================
   STATISTICS
========================================================= */

function renderStatistics() {
    const available =
        assessmentCatalog.length;

    const completedItems =
        assessmentCatalog.filter(
            isAssessmentCompleted
        );

    const scores =
        completedItems
            .map(getAssessmentScore)
            .filter(score =>
                score !== null
            );

    const average =
        scores.length
            ? Math.round(
                scores.reduce(
                    (sum, score) =>
                        sum + score,
                    0
                ) /
                scores.length
            )
            : 0;

    const passed =
        assessmentCatalog.filter(
            item => {
                const score =
                    getAssessmentScore(item);

                return (
                    score !== null &&
                    score >= item.passMark
                );
            }
        ).length;

    if (availableAssessments) {
        availableAssessments.textContent =
            String(available);
    }

    if (completedAssessments) {
        completedAssessments.textContent =
            String(
                completedItems.length
            );
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


/* =========================================================
   RESULTS
========================================================= */

function renderResults() {
    if (!resultsContainer) {
        return;
    }

    resultsContainer.innerHTML = "";

    const results =
        assessmentCatalog
            .map(item => ({
                item,
                score:
                    getAssessmentScore(
                        item
                    )
            }))
            .filter(entry =>
                entry.score !== null
            );

    if (noResults) {
        noResults.hidden =
            results.length !== 0;
    }

    results
        .sort(
            (a, b) =>
                b.score - a.score
        )
        .slice(0, 8)
        .forEach(({item, score}) => {
            const passed =
                score >= item.passMark;

            const row =
                document.createElement(
                    "article"
                );

            row.className =
                "assessment-result-row";

            row.innerHTML = `
                <div class="assessment-result-title">

                    <div class="assessment-result-icon">
                        <i class="fa-solid fa-clipboard-check"></i>
                    </div>

                    <div>
                        <strong>
                            ${item.title}
                        </strong>

                        <small>
                            ${item.courseTitle}
                        </small>
                    </div>

                </div>

                <div
                    class="assessment-result-score ${
                        passed
                            ? "pass"
                            : "fail"
                    }"
                >
                    ${score}%
                </div>

                <span
                    class="assessment-result-status ${
                        passed
                            ? ""
                            : "fail"
                    }"
                >
                    ${
                        passed
                            ? "PASSED"
                            : "REVIEW"
                    }
                </span>

                <span class="learning-access-badge ${item.access}">
                    ${
                        item.access === "pro"
                            ? '<i class="fa-solid fa-crown"></i> PRO'
                            : '<i class="fa-solid fa-unlock-keyhole"></i> FREE'
                    }
                </span>
            `;

            resultsContainer.appendChild(
                row
            );
        });
}


/* =========================================================
   FILTER EVENTS
========================================================= */

function bindAssessmentFilters() {
    document
        .querySelectorAll(
            ".assessment-access-filter"
        )
        .forEach(button => {
            button.addEventListener(
                "click",
                () => {
                    currentAccessFilter =
                        button.dataset.accessFilter ||
                        "all";

                    document
                        .querySelectorAll(
                            ".assessment-access-filter"
                        )
                        .forEach(item =>
                            item.classList.remove(
                                "active"
                            )
                        );

                    button.classList.add(
                        "active"
                    );

                    renderAssessments();
                }
            );
        });
}


/* =========================================================
   LOGOUT
========================================================= */

logoutBtn?.addEventListener(
    "click",
    async () => {
        try {
            await signOut(auth);

            window.location.replace(
                "../pages/login.html"
            );
        }
        catch (err) {
            console.error(
                "[CWS Assessments] Logout failed:",
                err
            );
        }
    }
);


/* =========================================================
   AUTH
========================================================= */

if (!auth) {
    window.location.replace(
        "../pages/login.html?redirect=assessments"
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

            try {
                currentEntitlement =
                    await getUserEntitlement(user) ||
                    {
                        plan: "free",
                        status: "active"
                    };
            }
            catch (err) {
                console.error(
                    "[CWS Assessments] Entitlement load failed:",
                    err
                );

                currentEntitlement = {
                    plan: "free",
                    status: "active"
                };
            }

            await loadProgress(user);

            assessmentCatalog =
                buildAssessmentCatalog();

            renderAssessments();
            renderStatistics();
            renderResults();
            bindAssessmentFilters();

            console.log(
                "[CWS Assessments] Loaded",
                {
                    assessments:
                        assessmentCatalog.length,
                    plan:
                        currentEntitlement.plan
                }
            );
        }
    );
}
