/* =========================================================
   CWS ACADEMY
   LABS CONTROLLER
   Dynamic Course Activities + Firestore Progress
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

const labsGrid =
    document.getElementById("labsGrid");

const labSearch =
    document.getElementById("labSearch");

const labFilters =
    document.querySelectorAll(".lab-filter");

const noLabsMessage =
    document.getElementById("noLabsMessage");

const labCount =
    document.getElementById("labCount");

const studentName =
    document.getElementById("studentName");

const logoutBtn =
    document.getElementById("logoutBtn");

const sidebarToggle =
    document.getElementById("sidebarToggle");

const studentSidebar =
    document.getElementById("studentSidebar");

const labModal =
    document.getElementById("labModal");

const closeLabModal =
    document.getElementById("closeLabModal");

const labModalTitle =
    document.getElementById("labModalTitle");

const labModalDescription =
    document.getElementById("labModalDescription");

const labModalLevel =
    document.getElementById("labModalLevel");

const labModalDuration =
    document.getElementById("labModalDuration");

const launchLabBtn =
    document.getElementById("launchLabBtn");


/* =========================================================
   STATE
========================================================= */

let currentUser = null;
let currentFilter = "all";
let progressMap = new Map();
let labItems = [];
let selectedLab = null;
let initialized = false;


/* =========================================================
   HELPERS
========================================================= */

function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


function getAllCourses() {

    return courses
        ? Object.values(courses)
        : [];

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


function getModuleActivities(module) {

    return [
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

}


function areModuleLessonsComplete(
    module,
    progress
) {

    const lessons =
        Array.isArray(module?.lessons)
            ? module.lessons
            : [];

    return lessons.every(
        lesson =>
            progress.completedLessons.includes(
                `${module.id}:${lesson.id}`
            )
    );

}


/* =========================================================
   LOAD FIRESTORE PROGRESS
========================================================= */

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
            "[CWS Labs] Failed to load progress:",
            error
        );

    }

}


/* =========================================================
   BUILD ACTIVITY CATALOGUE
========================================================= */

function buildLabItems() {

    labItems = [];

    getAllCourses()
        .filter(
            course =>
                course?.status === "available"
        )
        .forEach(
            course => {

                const progress =
                    progressMap.get(course.id) ||
                    normalizeProgress(course.id);

                const modules =
                    Array.isArray(course.modules)
                        ? course.modules
                        : [];

                modules.forEach(
                    (
                        module,
                        moduleIndex
                    ) => {

                        const activities =
                            getModuleActivities(module);

                        activities.forEach(
                            (
                                activity,
                                activityIndex
                            ) => {

                                const key =
                                    `${module.id}:${activity.id}`;

                                const completed =
                                    progress.completedLabs
                                        .includes(key);

                                const moduleLessonsComplete =
                                    areModuleLessonsComplete(
                                        module,
                                        progress
                                    );

                                const previousActivityKeys =
                                    activities
                                        .slice(
                                            0,
                                            activityIndex
                                        )
                                        .map(
                                            item =>
                                                `${module.id}:${item.id}`
                                        );

                                const previousActivitiesComplete =
                                    previousActivityKeys.every(
                                        itemKey =>
                                            progress.completedLabs
                                                .includes(itemKey)
                                    );

                                const unlocked =
                                    completed ||
                                    (
                                        moduleLessonsComplete &&
                                        previousActivitiesComplete
                                    );

                                const isLab =
                                    Array.isArray(
                                        module.labActivities
                                    ) &&
                                    module.labActivities
                                        .includes(activity);

                                const type =
                                    isLab
                                        ? "Lab"
                                        : "Practical Activity";

                                const level =
                                    String(
                                        activity.level ||
                                        course.level ||
                                        "Beginner"
                                    );

                                const category =
                                    activity.category ||
                                    module.title ||
                                    course.title;

                                const description =
                                    activity.description ||
                                    activity.objective ||
                                    (
                                        Array.isArray(
                                            activity.instructions
                                        ) &&
                                        activity.instructions.length
                                            ? activity.instructions[0]
                                            : `Complete this ${type.toLowerCase()} as part of ${module.title}.`
                                    );

                                const duration =
                                    activity.duration ||
                                    activity.estimatedTime ||
                                    "15–30 min";

                                labItems.push({

                                    key,

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

                                    moduleIndex,

                                    activityId:
                                        activity.id,

                                    title:
                                        activity.title ||
                                        `${module.title} ${type}`,

                                    description,

                                    duration,

                                    level,

                                    category,

                                    type,

                                    completed,

                                    unlocked,

                                    href:
                                        `lab-activity.html?course=${encodeURIComponent(
                                            course.id
                                        )}&module=${encodeURIComponent(
                                            module.id
                                        )}&activity=${encodeURIComponent(
                                            activity.id
                                        )}`

                                });

                            }
                        );

                    }
                );

            }
        );

}


/* =========================================================
   STARTED-COURSE FILTER
========================================================= */

function isCourseStarted(courseId) {

    const progress =
        progressMap.get(courseId);

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


/*
 * Show activities only for courses the student has started.
 * This prevents future-course activities from appearing as
 * unexplained locked cards before the student enters a course.
 */
function getVisibleCatalogue() {

    return labItems.filter(
        item =>
            isCourseStarted(
                item.courseId
            )
    );

}


/* =========================================================
   CARD HELPERS
========================================================= */

function getLevelClass(level) {

    const normalized =
        String(level)
            .toLowerCase();

    if (
        normalized.includes(
            "advanced"
        )
    ) {
        return "advanced";
    }

    if (
        normalized.includes(
            "intermediate"
        )
    ) {
        return "intermediate";
    }

    return "beginner";

}


function createLabCard(item) {

    const card =
        document.createElement(
            "article"
        );

    const levelClass =
        getLevelClass(
            item.level
        );

    card.className =
        "dashboard-lab-card lab-card";

    card.dataset.level =
        levelClass;

    card.dataset.search =
        [
            item.title,
            item.description,
            item.courseTitle,
            item.moduleTitle,
            item.category,
            item.type
        ]
            .join(" ")
            .toLowerCase();

    const status =
        item.completed
            ? "COMPLETED"
            : item.unlocked
                ? "AVAILABLE"
                : "LOCKED";

    const statusClass =
        item.completed
            ? "completed"
            : item.unlocked
                ? "available"
                : "planned";

    card.innerHTML = `

        <div class="lab-card-top">

            <span class="lab-level ${levelClass}">
                ${escapeHTML(
                    item.level.toUpperCase()
                )}
            </span>

            <span class="lab-status ${statusClass}">
                ${status}
            </span>

        </div>


        <div class="lab-icon">

            <i class="${escapeHTML(
                item.courseIcon ||
                "fa-solid fa-flask"
            )}"></i>

        </div>


        <span class="lab-category">
            ${escapeHTML(
                item.category
            )}
        </span>


        <h3>
            ${escapeHTML(
                item.title
            )}
        </h3>


        <p>
            ${escapeHTML(
                item.description
            )}
        </p>


        <div class="lab-meta">

            <span>
                <i class="fa-regular fa-clock"></i>
                ${escapeHTML(
                    item.duration
                )}
            </span>

            <span>
                <i class="fa-solid fa-book-open"></i>
                ${escapeHTML(
                    item.courseTitle
                )}
            </span>

        </div>


        <button
            type="button"
            class="lab-start-btn ${
                item.unlocked
                    ? ""
                    : "disabled"
            }"
            data-lab-key="${escapeHTML(
                item.key
            )}"
            ${
                item.unlocked
                    ? ""
                    : "disabled"
            }
        >

            ${
                item.completed
                    ? "Review Activity"
                    : item.unlocked
                        ? "Start Activity"
                        : "Locked"
            }

            <i class="fa-solid ${
                item.unlocked
                    ? "fa-arrow-right"
                    : "fa-lock"
            }"></i>

        </button>

    `;

    return card;

}


/* =========================================================
   RENDER
========================================================= */

function renderLabs() {

    if (!labsGrid) {
        return;
    }

    labsGrid.innerHTML = "";

    const catalogue =
        getVisibleCatalogue();

    catalogue.forEach(
        item => {

            labsGrid.appendChild(
                createLabCard(item)
            );

        }
    );

    filterLabs();

}


/* =========================================================
   FILTER + SEARCH
========================================================= */

function filterLabs() {

    if (!labsGrid) {
        return;
    }

    const cards =
        labsGrid.querySelectorAll(
            ".lab-card"
        );

    const searchTerm =
        (labSearch?.value || "")
            .trim()
            .toLowerCase();

    let visibleCount = 0;

    cards.forEach(
        card => {

            const level =
                card.dataset.level ||
                "";

            const searchableText =
                card.dataset.search ||
                "";

            const matchesFilter =
                currentFilter === "all" ||
                level === currentFilter;

            const matchesSearch =
                !searchTerm ||
                searchableText.includes(
                    searchTerm
                );

            const visible =
                matchesFilter &&
                matchesSearch;

            card.classList.toggle(
                "hidden",
                !visible
            );

            if (visible) {
                visibleCount++;
            }

        }
    );

    if (labCount) {

        labCount.textContent =
            `${visibleCount} ${
                visibleCount === 1
                    ? "Activity"
                    : "Activities"
            }`;

    }

    if (noLabsMessage) {

        noLabsMessage.hidden =
            visibleCount !== 0;

    }

}


labFilters.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                currentFilter =
                    button.dataset.filter ||
                    "all";

                labFilters.forEach(
                    item =>
                        item.classList.remove(
                            "active"
                        )
                );

                button.classList.add(
                    "active"
                );

                filterLabs();

            }
        );

    }
);


labSearch?.addEventListener(
    "input",
    filterLabs
);


/* =========================================================
   MODAL
========================================================= */

function openLabModal(key) {

    const item =
        labItems.find(
            lab =>
                lab.key === key
        );

    if (
        !item ||
        !item.unlocked
    ) {
        return;
    }

    selectedLab = item;

    if (labModalTitle) {
        labModalTitle.textContent =
            item.title;
    }

    if (labModalDescription) {
        labModalDescription.textContent =
            item.description;
    }

    if (labModalLevel) {
        labModalLevel.textContent =
            item.level;
    }

    if (labModalDuration) {
        labModalDuration.textContent =
            item.duration;
    }

    if (launchLabBtn) {

        launchLabBtn.innerHTML =
            item.completed
                ? 'Review Activity <i class="fa-solid fa-arrow-right"></i>'
                : 'Enter Activity <i class="fa-solid fa-arrow-right"></i>';

    }

    if (labModal) {

        labModal.hidden = false;

        labModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "modal-open"
        );

    }

}


function closeModal() {

    if (!labModal) {
        return;
    }

    labModal.hidden = true;

    labModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "modal-open"
    );

    selectedLab = null;

}


closeLabModal?.addEventListener(
    "click",
    closeModal
);


document
    .querySelectorAll(
        "[data-close-modal]"
    )
    .forEach(
        element => {

            element.addEventListener(
                "click",
                closeModal
            );

        }
    );


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            labModal &&
            !labModal.hidden
        ) {
            closeModal();
        }

    }
);


/* =========================================================
   DYNAMIC CARD ACTIONS
========================================================= */

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "[data-lab-key]"
            );

        if (
            !button ||
            button.disabled
        ) {
            return;
        }

        openLabModal(
            button.dataset.labKey
        );

    }
);


launchLabBtn?.addEventListener(
    "click",
    () => {

        if (!selectedLab) {
            return;
        }

        window.location.href =
            selectedLab.href;

    }
);


/* =========================================================
   LOGOUT
========================================================= */

async function logout() {

    try {

        if (logoutBtn) {
            logoutBtn.disabled = true;
        }

        await signOut(auth);

        window.location.replace(
            "../pages/login.html"
        );

    }
    catch (error) {

        console.error(
            "[CWS Labs] Logout failed:",
            error
        );

        if (logoutBtn) {
            logoutBtn.disabled = false;
        }

    }

}


logoutBtn?.addEventListener(
    "click",
    logout
);


/* =========================================================
   MOBILE SIDEBAR
========================================================= */

if (
    sidebarToggle &&
    studentSidebar
) {

    sidebarToggle.addEventListener(
        "click",
        () => {

            const open =
                studentSidebar.classList.toggle(
                    "open"
                );

            sidebarToggle.setAttribute(
                "aria-expanded",
                String(open)
            );

        }
    );

}


document
    .querySelectorAll(
        ".student-nav-link"
    )
    .forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    studentSidebar
                        ?.classList.remove(
                            "open"
                        );

                }
            );

        }
    );


/* =========================================================
   INITIALIZE
========================================================= */

async function initializeLabsPage() {

    await loadProgress();

    buildLabItems();

    renderLabs();

}


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
                    "../pages/login.html?redirect=labs"
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

            await initializeLabsPage();

        }
    );

}
