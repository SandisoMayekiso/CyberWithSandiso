/* =========================================================
   CWS ACADEMY
   PREMIUM LAB CATALOGUE
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

import { auth, db } from "./firebase-config.js";
import { courses, getCourseStage } from "../data/courses.js";
import { getUserEntitlement } from "./access-control.js";


/* =========================================================
   DOM
========================================================= */

const labsGrid = document.getElementById("labsGrid");
const labSearch = document.getElementById("labSearch");
const labCount = document.getElementById("labCount");
const noLabsMessage = document.getElementById("noLabsMessage");
const resetLabFilters = document.getElementById("resetLabFilters");
const studentName = document.getElementById("studentName");
const studentPlanBadge = document.getElementById("studentPlanBadge");
const logoutBtn = document.getElementById("logoutBtn");

const totalLabsCount = document.getElementById("totalLabsCount");
const freeLabsCount = document.getElementById("freeLabsCount");
const proLabsCount = document.getElementById("proLabsCount");
const completedLabsCount = document.getElementById("completedLabsCount");

const labsContinuePanel = document.getElementById("labsContinuePanel");
const labsContinueTitle = document.getElementById("labsContinueTitle");
const labsContinueMeta = document.getElementById("labsContinueMeta");
const labsContinueBtn = document.getElementById("labsContinueBtn");

const labModal = document.getElementById("labModal");
const closeLabModal = document.getElementById("closeLabModal");
const labModalCourse = document.getElementById("labModalCourse");
const labModalTitle = document.getElementById("labModalTitle");
const labModalDescription = document.getElementById("labModalDescription");
const labModalLevel = document.getElementById("labModalLevel");
const labModalDuration = document.getElementById("labModalDuration");
const labModalScenarioWrap = document.getElementById("labModalScenarioWrap");
const labModalScenario = document.getElementById("labModalScenario");
const labModalPrerequisitesWrap = document.getElementById("labModalPrerequisitesWrap");
const labModalPrerequisites = document.getElementById("labModalPrerequisites");
const launchLabBtn = document.getElementById("launchLabBtn");


/* =========================================================
   STATE
========================================================= */

let currentUser = null;
let currentEntitlement = { plan: "free", status: "active" };
let progressMap = new Map();
let labCatalog = [];
let currentFilter = "all";
let selectedLab = null;
let modalTrigger = null;
let filtersBound = false;


/* =========================================================
   HELPERS
========================================================= */

function normalize(value) {
    return String(value || "").trim().toLowerCase();
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
            .replace(/\b\w/g, char => char.toUpperCase());
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


function renderPlanBadge() {
    if (!studentPlanBadge) return;

    const pro = hasActivePro();
    studentPlanBadge.textContent = pro ? "PRO" : "FREE";
    studentPlanBadge.className = `student-plan-badge ${pro ? "pro" : "free"}`;
    studentPlanBadge.title = pro ? "CWS Academy Pro" : "CWS Academy Free";
}


function buildUpgradeUrl(courseId) {
    const params = new URLSearchParams();
    if (courseId) params.set("course", courseId);
    params.set("from", "labs");
    return `subscription.html?${params.toString()}`;
}


function buildLabUrl(item) {
    const params = new URLSearchParams({
        course: item.courseId,
        module: item.moduleId,
        activity: item.labId
    });

    return `lab-activity.html?${params.toString()}`;
}


function getCourseProgress(courseId) {
    return progressMap.get(courseId) || {};
}


function isLabCompleted(item) {
    const progress = getCourseProgress(item.courseId);
    const completed = Array.isArray(progress.completedLabs)
        ? progress.completedLabs
        : [];

    const candidates = [
        item.labId,
        `${item.moduleId}:${item.labId}`,
        `${item.moduleId}/${item.labId}`,
        `${item.courseId}:${item.moduleId}:${item.labId}`
    ];

    return candidates.some(key => completed.includes(key));
}


function isLabLocked(item) {
    return item.access === "pro" && !hasActivePro();
}


function labIcon(item) {
    if (item.icon) return item.icon;

    const category = normalize(item.courseCategory);
    if (category.includes("network")) return "fa-solid fa-network-wired";
    if (category.includes("web")) return "fa-solid fa-globe";
    if (category.includes("linux")) return "fa-brands fa-linux";
    if (category.includes("directory")) return "fa-solid fa-building-shield";
    if (category.includes("python")) return "fa-brands fa-python";
    if (category.includes("windows")) return "fa-brands fa-windows";
    return "fa-solid fa-flask";
}


/* =========================================================
   BUILD CATALOGUE FROM CENTRAL COURSE DATA
========================================================= */

function buildLabCatalog() {
    const catalog = [];

    Object.values(courses || {}).forEach(course => {
        if (!Array.isArray(course?.modules)) return;

        const courseAccess = normalize(course.access) === "pro" ? "pro" : "free";
        const stage = getCourseStage(course.id);

        course.modules.forEach(module => {
            const activities = [
                ...(Array.isArray(module?.labActivities) ? module.labActivities : []),
                ...(Array.isArray(module?.practiceActivities) ? module.practiceActivities : [])
            ];

            activities.forEach((activity, index) => {
                if (!activity) return;

                const labId = activity.id || `activity-${index + 1}`;
                const access = [
                    courseAccess,
                    module.access,
                    activity.access
                ].some(value => normalize(value) === "pro")
                    ? "pro"
                    : "free";

                catalog.push({
                    key: `${course.id}:${module.id}:${labId}`,
                    courseId: course.id,
                    courseTitle: course.title || "CWS Academy Course",
                    courseCategory: course.category || "Cybersecurity",
                    moduleId: module.id,
                    moduleTitle: module.title || "Course Module",
                    labId,
                    title: activity.title || "Practical Activity",
                    description:
                        activity.objective ||
                        activity.description ||
                        activity.scenario ||
                        `Practical activity for ${module.title || "this module"}.`,
                    duration: activity.duration || "Self-paced",
                    level: course.level || "Course",
                    levelKey: normalize(course.levelKey || course.level),
                    access,
                    stage,
                    icon: activity.icon || course.icon || "fa-solid fa-flask",
                    activity
                });
            });
        });
    });

    return catalog;
}


/* =========================================================
   FIRESTORE PROGRESS â€” ONE COLLECTION READ
========================================================= */

async function loadProgress(user) {
    progressMap = new Map();
    if (!db || !user) return;

    try {
        const snapshot = await getDocs(
            collection(db, "users", user.uid, "courseProgress")
        );

        snapshot.forEach(docSnapshot => {
            progressMap.set(docSnapshot.id, docSnapshot.data() || {});
        });
    }
    catch (err) {
        console.error("[CWS Labs] Unable to load progress:", err);
    }
}


/* =========================================================
   SUMMARY AND RESUME
========================================================= */

function renderSummary() {
    const completed = labCatalog.filter(isLabCompleted).length;
    const free = labCatalog.filter(item => item.access === "free").length;
    const pro = labCatalog.length - free;

    if (totalLabsCount) totalLabsCount.textContent = String(labCatalog.length);
    if (freeLabsCount) freeLabsCount.textContent = String(free);
    if (proLabsCount) proLabsCount.textContent = String(pro);
    if (completedLabsCount) completedLabsCount.textContent = String(completed);

    ["beginner", "intermediate", "advanced"].forEach(level => {
        const button = document.querySelector(
            `.lab-filter[data-filter="${level}"]`
        );
        if (button) {
            button.hidden = !labCatalog.some(item => item.levelKey === level);
        }
    });
}


function getLocalWorkspaceTimestamp(item) {
    if (!currentUser) return 0;

    const key = [
        "cwsLabWorkspace:v1",
        currentUser.uid,
        item.courseId,
        item.moduleId,
        item.labId
    ].join(":");

    try {
        const data = JSON.parse(localStorage.getItem(key) || "{}");
        const timestamp = Date.parse(data.updatedAt || "");
        return Number.isFinite(timestamp) ? timestamp : 0;
    }
    catch (err) {
        return 0;
    }
}


function renderContinuePanel() {
    if (!labsContinuePanel || !labsContinueBtn) return;

    const available = labCatalog.filter(item => !isLabLocked(item));
    const incomplete = available.filter(item => !isLabCompleted(item));
    const localResume = [...incomplete]
        .map(item => ({ item, timestamp: getLocalWorkspaceTimestamp(item) }))
        .filter(entry => entry.timestamp > 0)
        .sort((a, b) => b.timestamp - a.timestamp)[0]?.item;
    const nextLab = localResume || incomplete[0] || available[0] || null;

    if (!nextLab) {
        labsContinueTitle.textContent = "No available activities yet";
        labsContinueMeta.textContent = "Check your course catalogue or plan access.";
        labsContinueBtn.href = "student-courses.html";
        labsContinueBtn.querySelector("span").textContent = "Browse Courses";
        return;
    }

    const completed = isLabCompleted(nextLab);
    const resuming = Boolean(localResume);

    labsContinueTitle.textContent = nextLab.title;
    labsContinueMeta.textContent =
        `${nextLab.courseTitle} â€¢ ${nextLab.duration} â€¢ ${nextLab.level}`;
    labsContinueBtn.href = buildLabUrl(nextLab);
    labsContinueBtn.querySelector("span").textContent =
        completed ? "Review Lab" : resuming ? "Resume Workspace" : "Start Next Lab";
}


/* =========================================================
   CARD
========================================================= */

function createLabCard(item) {
    const completed = isLabCompleted(item);
    const locked = isLabLocked(item);
    const pro = item.access === "pro";
    const card = document.createElement("article");

    card.className = [
        "dashboard-lab-card",
        "lab-card",
        pro ? "pro-card" : "free-card",
        locked ? "pro-locked" : "",
        completed ? "is-completed" : ""
    ].filter(Boolean).join(" ");

    card.dataset.level = item.levelKey;
    card.dataset.access = item.access;
    card.dataset.stage = item.stage;
    card.dataset.completion = completed ? "completed" : "incomplete";
    card.dataset.search = [
        item.title,
        item.description,
        item.courseTitle,
        item.moduleTitle,
        item.level,
        item.access
    ].join(" ").toLowerCase();

    const accessBadge = pro
        ? `<span class="learning-access-badge pro"><i class="fa-solid fa-crown"></i> PRO</span>`
        : `<span class="learning-access-badge free"><i class="fa-solid fa-unlock-keyhole"></i> FREE</span>`;

    const statusBadge = completed
        ? `<span class="lab-status completed"><i class="fa-solid fa-circle-check"></i> COMPLETED</span>`
        : locked
            ? `<span class="lab-status locked"><i class="fa-solid fa-lock"></i> LOCKED</span>`
            : `<span class="lab-status available"><i class="fa-regular fa-circle-play"></i> AVAILABLE</span>`;

    const primaryAction = locked
        ? `<a href="${escapeHTML(buildUpgradeUrl(item.courseId))}" class="learning-upgrade-btn">
                <span><i class="fa-solid fa-crown"></i> Unlock with CWS Pro</span>
                <i class="fa-solid fa-arrow-right"></i>
           </a>`
        : `<a href="${escapeHTML(buildLabUrl(item))}" class="lab-start-btn">
                <span>${completed ? "Review Lab" : "Start Lab"}</span>
                <i class="fa-solid fa-arrow-right"></i>
           </a>`;

    card.innerHTML = `
        <div class="lab-card-top">
            <span class="lab-level ${escapeHTML(item.levelKey)}">
                ${escapeHTML(String(item.level).toUpperCase())}
            </span>
            <div class="learning-card-badges">${accessBadge}${statusBadge}</div>
        </div>
        <div class="lab-icon"><i class="${escapeHTML(labIcon(item))}"></i></div>
        <span class="lab-category">${escapeHTML(item.courseTitle)}</span>
        <h3>${escapeHTML(item.title)}</h3>
        <p>${escapeHTML(item.description)}</p>
        <div class="lab-meta">
            <span><i class="fa-regular fa-clock"></i> ${escapeHTML(item.duration)}</span>
            <span><i class="fa-solid fa-layer-group"></i> ${escapeHTML(item.moduleTitle)}</span>
        </div>
        <div class="lab-card-actions">
            <button type="button" class="lab-preview-btn" data-preview-lab="${escapeHTML(item.key)}">
                <i class="fa-regular fa-eye"></i> Preview
            </button>
            ${primaryAction}
        </div>
    `;

    return card;
}


/* =========================================================
   FILTERING
========================================================= */

function filterLabs() {
    const term = normalize(labSearch?.value);
    let visible = 0;

    document.querySelectorAll("#labsGrid .lab-card:not(.lab-skeleton)")
        .forEach(card => {
            const matchesSearch =
                !term || normalize(card.dataset.search).includes(term);
            const matchesFilter =
                currentFilter === "all" ||
                card.dataset.level === currentFilter ||
                card.dataset.access === currentFilter ||
                card.dataset.completion === currentFilter;
            const show = matchesSearch && matchesFilter;

            card.classList.toggle("hidden", !show);
            if (show) visible += 1;
        });

    if (noLabsMessage) noLabsMessage.hidden = visible !== 0;
    if (labCount) {
        labCount.textContent =
            `${visible} of ${labCatalog.length} ${labCatalog.length === 1 ? "activity" : "activities"}`;
    }
}


function setFilter(filter) {
    currentFilter = filter || "all";

    document.querySelectorAll(".lab-filter").forEach(button => {
        const active = button.dataset.filter === currentFilter;
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", String(active));
    });

    filterLabs();
}


function resetFilters() {
    if (labSearch) labSearch.value = "";
    setFilter("all");
    labSearch?.focus();
}


function bindFilters() {
    if (filtersBound) return;
    filtersBound = true;

    document.querySelectorAll(".lab-filter").forEach(button => {
        button.addEventListener("click", () => {
            setFilter(button.dataset.filter || "all");
        });
    });

    labSearch?.addEventListener("input", filterLabs);
    resetLabFilters?.addEventListener("click", resetFilters);
}


/* =========================================================
   RENDER
========================================================= */

function renderLabs() {
    if (!labsGrid) return;

    const fragment = document.createDocumentFragment();
    labCatalog.forEach(item => fragment.appendChild(createLabCard(item)));
    labsGrid.replaceChildren(fragment);

    renderSummary();
    renderContinuePanel();
    filterLabs();
}


/* =========================================================
   PREVIEW MODAL
========================================================= */

function openModal(item, trigger) {
    if (!labModal || !item) return;

    selectedLab = item;
    modalTrigger = trigger || null;

    const scenario = String(item.activity?.scenario || "").trim();
    const prerequisites = Array.isArray(item.activity?.prerequisites)
        ? item.activity.prerequisites
        : [];
    const locked = isLabLocked(item);

    labModalCourse.textContent = `${item.courseTitle} â€¢ ${item.moduleTitle}`;
    labModalTitle.textContent = item.title;
    labModalDescription.textContent = item.description;
    labModalLevel.textContent = item.level;
    labModalDuration.textContent = item.duration;

    labModalScenarioWrap.hidden = !scenario;
    labModalScenario.textContent = scenario;
    labModalPrerequisitesWrap.hidden = prerequisites.length === 0;
    labModalPrerequisites.innerHTML = prerequisites
        .map(value => `<li>${escapeHTML(value)}</li>`)
        .join("");

    launchLabBtn.innerHTML = locked
        ? `Unlock with CWS Pro <i class="fa-solid fa-crown"></i>`
        : `${isLabCompleted(item) ? "Review Laboratory" : "Enter Laboratory"} <i class="fa-solid fa-arrow-right"></i>`;

    labModal.hidden = false;
    labModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    window.requestAnimationFrame(() => closeLabModal?.focus());
}


function closeModal() {
    if (!labModal || labModal.hidden) return;

    labModal.hidden = true;
    labModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    selectedLab = null;
    modalTrigger?.focus();
    modalTrigger = null;
}


labsGrid?.addEventListener("click", event => {
    const trigger = event.target.closest("[data-preview-lab]");
    if (!trigger) return;

    const item = labCatalog.find(lab => lab.key === trigger.dataset.previewLab);
    openModal(item, trigger);
});

closeLabModal?.addEventListener("click", closeModal);
document.querySelectorAll("[data-close-modal]").forEach(element => {
    element.addEventListener("click", closeModal);
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape" && labModal && !labModal.hidden) {
        closeModal();
    }
});

launchLabBtn?.addEventListener("click", () => {
    if (!selectedLab) return;
    window.location.href = isLabLocked(selectedLab)
        ? buildUpgradeUrl(selectedLab.courseId)
        : buildLabUrl(selectedLab);
});


/* =========================================================
   LOGOUT
========================================================= */

logoutBtn?.addEventListener("click", async () => {
    try {
        await signOut(auth);
        window.location.replace("../pages/login.html");
    }
    catch (err) {
        console.error("[CWS Labs] Logout failed:", err);
    }
});


/* =========================================================
   AUTH AND INITIALIZATION
========================================================= */

if (!auth) {
    window.location.replace("../pages/login.html?redirect=labs");
}
else {
    onAuthStateChanged(auth, async user => {
        if (!user) {
            window.location.replace("../pages/login.html?redirect=labs");
            return;
        }

        currentUser = user;
        if (studentName) studentName.textContent = getUserName(user);

        const entitlementPromise = getUserEntitlement(user)
            .catch(err => {
                console.error("[CWS Labs] Entitlement load failed:", err);
                return { plan: "free", status: "active" };
            });

        await Promise.all([
            entitlementPromise.then(value => {
                currentEntitlement = value || { plan: "free", status: "active" };
            }),
            loadProgress(user)
        ]);

        renderPlanBadge();
        labCatalog = buildLabCatalog();
        bindFilters();
        renderLabs();

        console.log("[CWS Labs] Catalogue ready", {
            activities: labCatalog.length,
            plan: currentEntitlement.plan
        });
    });
}
