/* =========================================================
   CWS ACADEMY
   LABS PAGE
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


const labsGrid = document.getElementById("labsGrid");
const labSearch = document.getElementById("labSearch");
const noLabsMessage = document.getElementById("noLabsMessage");
const studentName = document.getElementById("studentName");
const logoutBtn = document.getElementById("logoutBtn");

const labModal = document.getElementById("labModal");
const closeLabModal = document.getElementById("closeLabModal");
const labModalTitle = document.getElementById("labModalTitle");
const labModalDescription = document.getElementById("labModalDescription");
const labModalLevel = document.getElementById("labModalLevel");
const labModalDuration = document.getElementById("labModalDuration");
const launchLabBtn = document.getElementById("launchLabBtn");

let currentUser = null;
let currentEntitlement = {
    plan: "free",
    status: "active"
};
let progressMap = new Map();
let labCatalog = [];
let currentFilter = "all";
let selectedLab = null;


/* =========================================================
   HELPERS
========================================================= */

function normalize(value) {
    return String(value || "")
        .trim()
        .toLowerCase();
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

function buildUpgradeUrl(courseId) {
    const params = new URLSearchParams();

    if (courseId) {
        params.set("course", courseId);
    }

    params.set("from", "labs");

    return `subscription.html?${params.toString()}`;
}

function buildLabUrl(item) {
    const params = new URLSearchParams({
        course: item.courseId,
        module: item.moduleId,
        lab: item.labId
    });

    return `lab-activity.html?${params.toString()}`;
}

function getCourseProgress(courseId) {
    return progressMap.get(courseId) || {};
}

function isLabCompleted(item) {
    const progress = getCourseProgress(item.courseId);

    const completed =
        Array.isArray(progress.completedLabs)
            ? progress.completedLabs
            : [];

    const candidates = [
        item.labId,
        `${item.moduleId}:${item.labId}`,
        `${item.moduleId}/${item.labId}`,
        `${item.courseId}:${item.moduleId}:${item.labId}`
    ];

    return candidates.some(key =>
        completed.includes(key)
    );
}

function labIcon(item) {
    if (item.icon) return item.icon;

    const category = normalize(item.courseCategory);

    if (category.includes("network")) {
        return "fa-solid fa-network-wired";
    }

    if (category.includes("web")) {
        return "fa-solid fa-globe";
    }

    if (category.includes("linux")) {
        return "fa-brands fa-linux";
    }

    if (category.includes("directory")) {
        return "fa-solid fa-building-shield";
    }

    if (category.includes("python")) {
        return "fa-brands fa-python";
    }

    return "fa-solid fa-flask";
}


/* =========================================================
   BUILD CATALOG FROM COURSES
========================================================= */

function buildLabCatalog() {
    const catalog = [];

    Object.values(courses || {}).forEach(course => {
        if (!Array.isArray(course?.modules)) {
            return;
        }

        const access =
            normalize(course.access) === "pro"
                ? "pro"
                : "free";

        const stage = getCourseStage(course.id);

        course.modules.forEach(module => {
            const activities = [
                ...(Array.isArray(module?.labActivities)
                    ? module.labActivities
                    : []),
                ...(Array.isArray(module?.practiceActivities)
                    ? module.practiceActivities
                    : [])
            ];

            activities.forEach((activity, index) => {
                if (!activity) return;

                const labId =
                    activity.id ||
                    `lab-${index + 1}`;

                catalog.push({
                    key:
                        `${course.id}:${module.id}:${labId}`,

                    courseId:
                        course.id,

                    courseTitle:
                        course.title,

                    courseCategory:
                        course.category ||
                        "CWS ACADEMY",

                    moduleId:
                        module.id,

                    moduleTitle:
                        module.title ||
                        "Course Module",

                    labId,

                    title:
                        activity.title ||
                        "Practical Lab",

                    description:
                        activity.objective ||
                        activity.description ||
                        activity.scenario ||
                        `Practical activity for ${module.title}.`,

                    duration:
                        activity.duration ||
                        "Self-paced",

                    level:
                        course.level ||
                        "Course",

                    levelKey:
                        normalize(
                            course.levelKey ||
                            course.level
                        ),

                    access,

                    stage,

                    icon:
                        activity.icon ||
                        course.icon ||
                        "fa-solid fa-flask",

                    activity
                });
            });
        });
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
        const snapshot = await getDocs(
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
            "[CWS Labs] Unable to load progress:",
            err
        );
    }
}


/* =========================================================
   CARD
========================================================= */

function createLabCard(item) {
    const completed = isLabCompleted(item);
    const pro = item.access === "pro";
    const locked = pro && !hasActivePro();

    const card = document.createElement("article");

    card.className =
        `dashboard-lab-card lab-card ${
            pro ? "pro-card" : "free-card"
        } ${
            locked ? "pro-locked" : ""
        }`;

    card.dataset.level = item.levelKey;
    card.dataset.access = item.access;
    card.dataset.stage = item.stage;
    card.dataset.search = [
        item.title,
        item.description,
        item.courseTitle,
        item.moduleTitle,
        item.level,
        item.access
    ]
        .join(" ")
        .toLowerCase();

    const accessBadge =
        pro
            ? `<span class="learning-access-badge pro">
                   <i class="fa-solid fa-crown"></i>
                   PRO
               </span>`
            : `<span class="learning-access-badge free">
                   <i class="fa-solid fa-unlock-keyhole"></i>
                   FREE
               </span>`;

    const stateBadge =
        completed
            ? `<span class="lab-status available">
                   <i class="fa-solid fa-circle-check"></i>
                   COMPLETED
               </span>`
            : `<span class="lab-status available">
                   AVAILABLE
               </span>`;

    const action =
        locked
            ? `
                <div class="learning-pro-lock-note">
                    <i class="fa-solid fa-lock"></i>
                    <span>
                        <strong>CWS Pro lab</strong><br>
                        Upgrade to access this hands-on activity.
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
                    href="${buildLabUrl(item)}"
                    class="lab-start-btn"
                    data-lab-key="${item.key}"
                >
                    <span>
                        ${completed ? "Review Lab" : "Start Lab"}
                    </span>
                    <i class="fa-solid fa-arrow-right"></i>
                </a>
              `;

    card.innerHTML = `
        <div class="lab-card-top">
            <span class="lab-level ${item.levelKey}">
                ${String(item.level).toUpperCase()}
            </span>

            <div class="learning-card-badges">
                ${accessBadge}
                ${stateBadge}
            </div>
        </div>

        <div class="lab-icon">
            <i class="${labIcon(item)}"></i>
        </div>

        <span class="lab-category">
            ${item.courseTitle}
        </span>

        <h3>${item.title}</h3>

        <p>${item.description}</p>

        <div class="lab-meta">
            <span>
                <i class="fa-regular fa-clock"></i>
                ${item.duration}
            </span>

            <span>
                <i class="fa-solid fa-layer-group"></i>
                ${item.moduleTitle}
            </span>
        </div>

        ${action}
    `;

    return card;
}


/* =========================================================
   FILTER
========================================================= */

function filterLabs() {
    const term =
        normalize(
            labSearch?.value
        );

    let visible = 0;

    document
        .querySelectorAll("#labsGrid .lab-card")
        .forEach(card => {
            const matchesSearch =
                !term ||
                normalize(
                    card.dataset.search
                ).includes(term);

            const matchesFilter =
                currentFilter === "all" ||
                card.dataset.level === currentFilter ||
                card.dataset.access === currentFilter;

            const show =
                matchesSearch &&
                matchesFilter;

            card.classList.toggle(
                "hidden",
                !show
            );

            if (show) visible++;
        });

    if (noLabsMessage) {
        noLabsMessage.hidden =
            visible !== 0;
    }
}

function bindFilters() {
    document
        .querySelectorAll(".lab-filter")
        .forEach(button => {
            button.addEventListener(
                "click",
                () => {
                    currentFilter =
                        button.dataset.filter ||
                        "all";

                    document
                        .querySelectorAll(".lab-filter")
                        .forEach(item =>
                            item.classList.remove("active")
                        );

                    button.classList.add("active");

                    filterLabs();
                }
            );
        });

    labSearch?.addEventListener(
        "input",
        filterLabs
    );
}


/* =========================================================
   RENDER
========================================================= */

function renderLabs() {
    if (!labsGrid) {
        return;
    }

    labsGrid.innerHTML = "";

    labCatalog.forEach(item => {
        labsGrid.appendChild(
            createLabCard(item)
        );
    });

    filterLabs();
}


/* =========================================================
   OPTIONAL EXISTING MODAL SUPPORT
========================================================= */

function closeModal() {
    if (!labModal) return;

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
    .querySelectorAll("[data-close-modal]")
    .forEach(element =>
        element.addEventListener(
            "click",
            closeModal
        )
    );

launchLabBtn?.addEventListener(
    "click",
    () => {
        if (!selectedLab) return;

        window.location.href =
            buildLabUrl(selectedLab);
    }
);


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
                "[CWS Labs] Logout failed:",
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
        "../pages/login.html?redirect=labs"
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
                    "[CWS Labs] Entitlement load failed:",
                    err
                );

                currentEntitlement = {
                    plan: "free",
                    status: "active"
                };
            }

            await loadProgress(user);

            labCatalog =
                buildLabCatalog();

            renderLabs();
            bindFilters();

            console.log(
                "[CWS Labs] Loaded",
                {
                    labs:
                        labCatalog.length,
                    plan:
                        currentEntitlement.plan
                }
            );
        }
    );
}
