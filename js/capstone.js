/* =========================================================
   CWS ACADEMY
   CAPSTONE PAGE
   File: js/capstone.js
========================================================= */

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

import {
    doc,
    getDoc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

import {
    auth,
    db
} from "./firebase-config.js";

import {
    getCapstone
} from "../data/capstones.js";

import {
    getLearningPath
} from "../data/learning-paths.js";

import {
    getCourse
} from "../data/courses.js";

import {
    getUserEntitlement
} from "./access-control.js";


const params =
    new URLSearchParams(
        window.location.search
    );

const capstoneId =
    params.get(
        "capstone"
    ) ||
    "junior-pentest-capstone";


const loading =
    document.getElementById(
        "capstoneLoading"
    );

const locked =
    document.getElementById(
        "capstoneLocked"
    );

const lockedText =
    document.getElementById(
        "capstoneLockedText"
    );

const content =
    document.getElementById(
        "capstoneContent"
    );

const studentName =
    document.getElementById(
        "studentName"
    );

const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );

const titleEl =
    document.getElementById(
        "capstoneTitle"
    );

const descriptionEl =
    document.getElementById(
        "capstoneDescription"
    );

const clientEl =
    document.getElementById(
        "capstoneClient"
    );

const typeEl =
    document.getElementById(
        "capstoneType"
    );

const durationEl =
    document.getElementById(
        "capstoneDuration"
    );

const scenarioEl =
    document.getElementById(
        "capstoneScenario"
    );

const rulesEl =
    document.getElementById(
        "capstoneRules"
    );

const inScopeEl =
    document.getElementById(
        "inScopeList"
    );

const outScopeEl =
    document.getElementById(
        "outScopeList"
    );

const objectivesEl =
    document.getElementById(
        "capstoneObjectives"
    );

const tasksEl =
    document.getElementById(
        "capstoneTasks"
    );

const progressEl =
    document.getElementById(
        "capstoneProgress"
    );

const executiveSummary =
    document.getElementById(
        "executiveSummary"
    );

const findingsSummary =
    document.getElementById(
        "findingsSummary"
    );

const reportRequirements =
    document.getElementById(
        "reportRequirements"
    );

const saveBtn =
    document.getElementById(
        "saveCapstoneBtn"
    );

const submitBtn =
    document.getElementById(
        "submitCapstoneBtn"
    );

const messageEl =
    document.getElementById(
        "capstoneMessage"
    );


let currentUser = null;

let currentCapstone = null;

let currentProgress = {
    completedTasks: [],
    executiveSummary: "",
    findingsSummary: "",
    submitted: false,
    passed: false
};


/* =========================================================
   HELPERS
========================================================= */

function normalize(value) {
    return String(value || "")
        .trim()
        .toLowerCase();
}

function userName(user) {
    if (user?.displayName?.trim()) {
        return user.displayName.trim();
    }

    if (user?.email?.includes("@")) {
        return user.email
            .split("@")[0]
            .replace(/[._-]+/g," ")
            .replace(/\b\w/g, c => c.toUpperCase());
    }

    return "Student";
}

function progressRef() {
    return doc(
        db,
        "users",
        currentUser.uid,
        "capstones",
        currentCapstone.id
    );
}

function showMessage(
    text,
    type = ""
) {
    if (!messageEl) return;

    messageEl.hidden = false;
    messageEl.textContent = text;
    messageEl.className =
        `capstone-form-message ${type}`.trim();
}

function listHtml(items = []) {
    return items
        .map(item =>
            `<li>${item}</li>`
        )
        .join("");
}


/* =========================================================
   PATH ELIGIBILITY
========================================================= */

async function isCourseComplete(
    courseId
) {
    const snapshot =
        await getDoc(
            doc(
                db,
                "users",
                currentUser.uid,
                "courseProgress",
                courseId
            )
        );

    if (!snapshot.exists()) {
        return false;
    }

    const data =
        snapshot.data() || {};

    return (
        data.completed === true ||
        data.certificateEligible === true ||
        Number(data.progressPercent || 0) >= 100
    );
}


async function checkPathEligibility() {
    const path =
        getLearningPath(
            currentCapstone.pathId
        );

    if (!path) {
        return {
            allowed: false,
            missing: ["Required learning path"]
        };
    }

    const requiredCourses =
        path.stages.filter(
            stage =>
                stage.type === "course" &&
                stage.required !== false
        );

    const checks =
        await Promise.all(
            requiredCourses.map(
                async stage => ({
                    courseId: stage.courseId,
                    complete:
                        await isCourseComplete(
                            stage.courseId
                        )
                })
            )
        );

    const missing =
        checks
            .filter(item =>
                !item.complete
            )
            .map(item =>
                getCourse(
                    item.courseId
                )?.title ||
                item.courseId
            );

    return {
        allowed:
            missing.length === 0,
        missing
    };
}


/* =========================================================
   LOAD / SAVE
========================================================= */

async function loadSavedProgress() {
    const snapshot =
        await getDoc(
            progressRef()
        );

    if (!snapshot.exists()) {
        return;
    }

    currentProgress = {
        ...currentProgress,
        ...snapshot.data()
    };
}


async function saveProgress(
    extra = {}
) {
    const completedTasks =
        Array.from(
            document.querySelectorAll(
                ".capstone-task-checkbox:checked"
            )
        )
            .map(input =>
                input.dataset.taskId
            );

    currentProgress = {
        ...currentProgress,
        completedTasks,
        executiveSummary:
            executiveSummary?.value?.trim() || "",
        findingsSummary:
            findingsSummary?.value?.trim() || "",
        ...extra
    };

    await setDoc(
        progressRef(),
        {
            ...currentProgress,
            updatedAt:
                serverTimestamp()
        },
        {
            merge: true
        }
    );

    updateProgress();
}


/* =========================================================
   PROGRESS
========================================================= */

function updateProgress() {
    const total =
        currentCapstone.tasks.length;

    const completed =
        document.querySelectorAll(
            ".capstone-task-checkbox:checked"
        ).length;

    const percent =
        total
            ? Math.round(
                completed /
                total *
                100
            )
            : 0;

    if (progressEl) {
        progressEl.textContent =
            `${percent}%`;
    }

    document
        .querySelectorAll(
            ".capstone-task"
        )
        .forEach(row => {
            const checkbox =
                row.querySelector(
                    ".capstone-task-checkbox"
                );

            row.classList.toggle(
                "completed",
                checkbox?.checked === true
            );
        });
}


/* =========================================================
   RENDER
========================================================= */

function renderCapstone() {
    titleEl.textContent =
        currentCapstone.title;

    descriptionEl.textContent =
        currentCapstone.description;

    clientEl.textContent =
        currentCapstone.client;

    typeEl.textContent =
        currentCapstone.engagementType;

    durationEl.textContent =
        currentCapstone.duration;

    scenarioEl.textContent =
        currentCapstone.scenario;

    rulesEl.innerHTML =
        listHtml(
            currentCapstone.rulesOfEngagement
        );

    inScopeEl.innerHTML =
        listHtml(
            currentCapstone.scope.inScope
        );

    outScopeEl.innerHTML =
        listHtml(
            currentCapstone.scope.outOfScope
        );

    objectivesEl.innerHTML =
        currentCapstone.objectives
            .map(
                (
                    objective,
                    index
                ) => `
                    <article class="objective-card">

                        <span class="objective-number">
                            OBJECTIVE ${String(index + 1).padStart(2,"0")}
                        </span>

                        <h3>
                            ${objective.title}
                        </h3>

                        <p>
                            ${objective.description}
                        </p>

                    </article>
                `
            )
            .join("");

    tasksEl.innerHTML =
        currentCapstone.tasks
            .map(task => {
                const checked =
                    currentProgress.completedTasks?.includes(
                        task.id
                    )
                        ? "checked"
                        : "";

                return `
                    <label class="capstone-task">

                        <input
                            type="checkbox"
                            class="capstone-task-checkbox"
                            data-task-id="${task.id}"
                            ${checked}
                        >

                        <div>
                            <h3>${task.title}</h3>
                            <span>${task.category}</span>
                        </div>

                        <span class="evidence-badge ${
                            task.evidenceRequired
                                ? "required"
                                : ""
                        }">
                            ${
                                task.evidenceRequired
                                    ? "Evidence Required"
                                    : "Required"
                            }
                        </span>

                    </label>
                `;
            })
            .join("");

    reportRequirements.innerHTML =
        listHtml(
            currentCapstone.reportRequirements
        );

    executiveSummary.value =
        currentProgress.executiveSummary ||
        "";

    findingsSummary.value =
        currentProgress.findingsSummary ||
        "";

    document
        .querySelectorAll(
            ".capstone-task-checkbox"
        )
        .forEach(input => {
            input.addEventListener(
                "change",
                updateProgress
            );
        });

    updateProgress();
}


/* =========================================================
   SUBMIT
========================================================= */

async function submitCapstone() {
    const requiredTasks =
        currentCapstone.tasks.filter(
            task =>
                task.required !== false
        );

    const completedIds =
        Array.from(
            document.querySelectorAll(
                ".capstone-task-checkbox:checked"
            )
        )
            .map(input =>
                input.dataset.taskId
            );

    const missingTasks =
        requiredTasks.filter(
            task =>
                !completedIds.includes(
                    task.id
                )
        );

    if (missingTasks.length) {
        showMessage(
            `Complete all required capstone tasks before submission. ${missingTasks.length} task(s) remain.`,
            "error"
        );

        return;
    }

    if (
        !executiveSummary.value.trim() ||
        !findingsSummary.value.trim()
    ) {
        showMessage(
            "Add both the executive summary and findings summary before submission.",
            "error"
        );

        return;
    }

    /*
       v1 records submission but does not automatically award a
       pass. The future assessment/review engine can grade the
       report and set passed=true.
    */

    await saveProgress({
        submitted:
            true,
        submittedAt:
            new Date().toISOString(),
        passed:
            false
    });

    showMessage(
        "Capstone submitted successfully. It is now ready for review.",
        "success"
    );
}


/* =========================================================
   EVENTS
========================================================= */

saveBtn?.addEventListener(
    "click",
    async () => {
        try {
            await saveProgress();

            showMessage(
                "Capstone progress saved.",
                "success"
            );
        }
        catch (err) {
            console.error(err);

            showMessage(
                "Unable to save capstone progress.",
                "error"
            );
        }
    }
);

submitBtn?.addEventListener(
    "click",
    async () => {
        try {
            await submitCapstone();
        }
        catch (err) {
            console.error(err);

            showMessage(
                "Unable to submit the capstone.",
                "error"
            );
        }
    }
);

logoutBtn?.addEventListener(
    "click",
    async () => {
        await signOut(auth);

        window.location.replace(
            "../pages/login.html"
        );
    }
);


/* =========================================================
   AUTH / INIT
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
                    "../pages/login.html"
                );

                return;
            }

            currentUser =
                user;

            if (studentName) {
                studentName.textContent =
                    userName(user);
            }

            currentCapstone =
                getCapstone(
                    capstoneId
                );

            if (!currentCapstone) {
                loading.textContent =
                    "Capstone not found.";

                return;
            }

            const entitlement =
                await getUserEntitlement(
                    user
                );

            const pro =
                normalize(
                    entitlement?.plan
                ) === "pro" &&
                [
                    "active",
                    "trialing"
                ].includes(
                    normalize(
                        entitlement?.status
                    )
                );

            if (
                currentCapstone.access === "pro" &&
                !pro
            ) {
                loading.hidden = true;
                locked.hidden = false;
                lockedText.textContent =
                    "This capstone is part of CWS Pro. Upgrade your account before starting the professional path capstone.";

                return;
            }

            const eligibility =
                await checkPathEligibility();

            if (!eligibility.allowed) {
                loading.hidden = true;
                locked.hidden = false;
                lockedText.textContent =
                    `Complete these required courses first: ${eligibility.missing.join(", ")}.`;

                return;
            }

            await loadSavedProgress();

            renderCapstone();

            loading.hidden = true;
            content.hidden = false;
        }
    );
}
