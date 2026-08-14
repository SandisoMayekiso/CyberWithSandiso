/* =========================================================
   CWS ACADEMY
   COURSE DETAILS
   Firebase Authentication + Firestore Progress

   IMPORTANT URL FORMAT

   course-details.html
       ?course=cybersecurity-fundamentals

   lesson.html
       ?course=cybersecurity-fundamentals
       &module=module-01
       &lesson=lesson-01
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


/* =========================================================
   DEBUG
========================================================= */

const DEBUG = true;

function log(...args) {
    if (DEBUG) {
        console.log("[CWS Course Details]", ...args);
    }
}

function warn(...args) {
    if (DEBUG) {
        console.warn("[CWS Course Details]", ...args);
    }
}

function error(...args) {
    console.error("[CWS Course Details]", ...args);
}


/* =========================================================
   ELEMENTS
========================================================= */

const courseLoading =
    document.getElementById("courseLoading");

const courseNotFound =
    document.getElementById("courseNotFound");

const courseContent =
    document.getElementById("courseContent");

const studentName =
    document.getElementById("studentName");

const logoutBtn =
    document.getElementById("logoutBtn");

const breadcrumbCourse =
    document.getElementById("breadcrumbCourse");

const courseStatus =
    document.getElementById("courseStatus");

const courseLevel =
    document.getElementById("courseLevel");

const courseCategory =
    document.getElementById("courseCategory");

const courseTitle =
    document.getElementById("courseTitle");

const courseDescription =
    document.getElementById("courseDescription");

const courseLongDescription =
    document.getElementById("courseLongDescription");

const courseObjectives =
    document.getElementById("courseObjectives");

const courseHeroIcon =
    document.getElementById("courseHeroIcon");

const startCourseBtn =
    document.getElementById("startCourseBtn");

const courseInfoLevel =
    document.getElementById("courseInfoLevel");

const courseInfoModules =
    document.getElementById("courseInfoModules");

const courseInfoDuration =
    document.getElementById("courseInfoDuration");

const courseInfoLabs =
    document.getElementById("courseInfoLabs");

const courseInfoAssessments =
    document.getElementById("courseInfoAssessments");

const courseProgressPercent =
    document.getElementById("courseProgressPercent");

const courseProgressFill =
    document.getElementById("courseProgressFill");

const courseProgressText =
    document.getElementById("courseProgressText");

const courseModules =
    document.getElementById("courseModules");


/* =========================================================
   STATE
========================================================= */

let currentUser = null;
let currentCourse = null;
let currentProgress = null;


/* =========================================================
   COURSE DATA
========================================================= */

/*
   KEEP YOUR EXISTING `courses` OBJECT HERE.

   It should contain:

   cybersecurity-fundamentals
   networking-fundamentals
   linux-fundamentals

   Do not change the course IDs.
*/


/*
   IMPORTANT:
   Paste your existing courses object here.
*/

const courses = {

    "cybersecurity-fundamentals": {

        id: "cybersecurity-fundamentals",

        title: "Cybersecurity Fundamentals",

        category: "CWS ACADEMY • CYBERSECURITY",

        level: "Beginner",

        levelKey: "beginner",

        status: "available",

        icon: "fa-solid fa-shield-halved",

        description:
            "Build a strong foundation in cybersecurity concepts, threats, vulnerabilities, security controls and ethical security practices.",

        longDescription:
            "Cybersecurity Fundamentals introduces the core concepts students need before moving into networking, Linux, ethical hacking and practical penetration testing. You will learn how modern systems are protected, how attacks occur, how vulnerabilities are understood and how security professionals approach risk.",

        duration: "20–25 hours",

        labs: 5,

        assessments: 10,

        objectives: [
            "Understand the core principles of cybersecurity.",
            "Explain confidentiality, integrity and availability.",
            "Identify common cybersecurity threats and attack types.",
            "Understand vulnerabilities, exploits and security risk.",
            "Recognize common security controls and defensive measures.",
            "Understand authentication, authorization and access control.",
            "Explain basic network and system security concepts.",
            "Understand the role of security policies and procedures.",
            "Apply basic cybersecurity concepts to practical scenarios.",
            "Develop an ethical and responsible security mindset."
        ],

        modules: [

            {
                id: "module-01",
                number: 1,
                title: "Introduction to Cybersecurity",
                description:
                    "Understand what cybersecurity is, why it matters and how security professionals protect digital systems.",
                lessons: 4,
                labs: 0,
                assessments: 1
            },

            {
                id: "module-02",
                number: 2,
                title: "The CIA Triad",
                description:
                    "Learn confidentiality, integrity and availability and how these principles influence security decisions.",
                lessons: 4,
                labs: 0,
                assessments: 1
            },

            {
                id: "module-03",
                number: 3,
                title: "Threats and Attack Types",
                description:
                    "Explore common cyber threats including phishing, malware, social engineering and denial-of-service attacks.",
                lessons: 5,
                labs: 1,
                assessments: 1
            },

            {
                id: "module-04",
                number: 4,
                title: "Vulnerabilities and Risk",
                description:
                    "Learn how vulnerabilities are identified, evaluated and connected to cybersecurity risk.",
                lessons: 4,
                labs: 1,
                assessments: 1
            },

            {
                id: "module-05",
                number: 5,
                title: "Security Controls",
                description:
                    "Understand administrative, technical and physical security controls.",
                lessons: 4,
                labs: 1,
                assessments: 1
            },

            {
                id: "module-06",
                number: 6,
                title: "Authentication and Access Control",
                description:
                    "Learn authentication factors, authorization, least privilege and access management.",
                lessons: 5,
                labs: 1,
                assessments: 1
            },

            {
                id: "module-07",
                number: 7,
                title: "Network Security Fundamentals",
                description:
                    "Understand basic network security concepts and how network traffic can be protected.",
                lessons: 5,
                labs: 1,
                assessments: 1
            },

            {
                id: "module-08",
                number: 8,
                title: "Endpoint and System Security",
                description:
                    "Explore operating-system security, patching, endpoint protection and system hardening.",
                lessons: 4,
                labs: 0,
                assessments: 1
            },

            {
                id: "module-09",
                number: 9,
                title: "Security Policies and Ethics",
                description:
                    "Understand security policies, acceptable use, responsible disclosure and ethical security practice.",
                lessons: 4,
                labs: 0,
                assessments: 1
            },

            {
                id: "module-10",
                number: 10,
                title: "Cybersecurity Foundations Review",
                description:
                    "Bring the concepts together through a comprehensive review and final assessment.",
                lessons: 5,
                labs: 0,
                assessments: 1
            }

        ]

    }

};


/* =========================================================
   URL
========================================================= */

function getCourseIdFromUrl() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    return (
        params.get("course") || ""
    )
        .trim()
        .toLowerCase();

}


/* =========================================================
   USER NAME
========================================================= */

function getUserName(user) {

    if (!user) {
        return "Student";
    }

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

        const name =
            user.email
                .split("@")[0]
                .replace(/[._-]+/g, " ")
                .trim();

        if (name) {

            return name
                .split(" ")
                .map(
                    word =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1)
                )
                .join(" ");

        }

    }

    return "Student";

}


/* =========================================================
   DISPLAY STUDENT
========================================================= */

function displayStudent(user) {

    if (studentName) {
        studentName.textContent =
            getUserName(user);
    }

}


/* =========================================================
   PAGE STATES
========================================================= */

function showLoading() {

    if (courseLoading) {
        courseLoading.hidden = false;
    }

    if (courseNotFound) {
        courseNotFound.hidden = true;
    }

    if (courseContent) {
        courseContent.hidden = true;
    }

}


function showCourseNotFound() {

    if (courseLoading) {
        courseLoading.hidden = true;
    }

    if (courseContent) {
        courseContent.hidden = true;
    }

    if (courseNotFound) {
        courseNotFound.hidden = false;
    }

}


function showCourseContent() {

    if (courseLoading) {
        courseLoading.hidden = true;
    }

    if (courseNotFound) {
        courseNotFound.hidden = true;
    }

    if (courseContent) {
        courseContent.hidden = false;
    }

}


/* =========================================================
   TEXT HELPER
========================================================= */

function setText(element, value) {

    if (!element) {
        return;
    }

    element.textContent =
        value ?? "";

}


/* =========================================================
   DEFAULT PROGRESS
========================================================= */

function getDefaultProgress() {

    return {

        courseId:
            currentCourse.id,

        completedLessons:
            [],

        completedLabs:
            [],

        completedAssessments:
            [],

        currentModule:
            "module-01",

        currentLesson:
            "lesson-01",

        progressPercent:
            0,

        started:
            false,

        completed:
            false

    };

}


/* =========================================================
   PROGRESS REFERENCE
========================================================= */

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


/* =========================================================
   LOAD PROGRESS
========================================================= */

async function loadProgress() {

    currentProgress =
        getDefaultProgress();

    if (!db) {

        warn(
            "Firestore unavailable."
        );

        updateProgressUI();

        return;

    }

    try {

        const progressRef =
            getProgressRef();

        const snapshot =
            await getDoc(
                progressRef
            );

        if (snapshot.exists()) {

            currentProgress = {

                ...getDefaultProgress(),

                ...snapshot.data()

            };

        }

        /*
         * Safety checks.
         */

        if (
            !Array.isArray(
                currentProgress.completedLessons
            )
        ) {
            currentProgress.completedLessons = [];
        }

        if (
            !currentProgress.currentModule
        ) {
            currentProgress.currentModule =
                "module-01";
        }

        if (
            !currentProgress.currentLesson
        ) {
            currentProgress.currentLesson =
                "lesson-01";
        }

        log(
            "Progress:",
            currentProgress
        );

    } catch (err) {

        error(
            "Progress load failed:",
            err
        );

        /*
         * Do NOT break the course page
         * because Firestore failed.
         */

        currentProgress =
            getDefaultProgress();

    }

    updateProgressUI();

}


/* =========================================================
   SAVE PROGRESS
========================================================= */

async function saveProgress() {

    if (
        !db ||
        !currentUser ||
        !currentCourse ||
        !currentProgress
    ) {

        return;

    }

    try {

        const progressRef =
            getProgressRef();

        await setDoc(
            progressRef,
            {
                ...currentProgress,

                updatedAt:
                    serverTimestamp()
            },
            {
                merge: true
            }
        );

        log(
            "Progress saved."
        );

    } catch (err) {

        /*
         * Saving progress must NEVER
         * prevent navigation.
         */

        error(
            "Progress save failed:",
            err
        );

    }

}


/* =========================================================
   TOTAL LESSONS
========================================================= */

function getTotalLessons(course) {

    if (!course) {
        return 0;
    }

    return course.modules.reduce(
        (
            total,
            module
        ) => {

            return total +
                Number(
                    module.lessons || 0
                );

        },
        0
    );

}


/* =========================================================
   CALCULATE PROGRESS
========================================================= */

function calculateProgress() {

    if (
        !currentCourse ||
        !currentProgress
    ) {
        return 0;
    }

    const total =
        getTotalLessons(
            currentCourse
        );

    if (!total) {
        return 0;
    }

    const completed =
        Array.isArray(
            currentProgress.completedLessons
        )
            ? currentProgress.completedLessons.length
            : 0;

    return Math.min(
        100,
        Math.round(
            (
                completed /
                total
            ) * 100
        )
    );

}


/* =========================================================
   UPDATE PROGRESS UI
========================================================= */

function updateProgressUI() {

    if (!currentProgress) {
        return;
    }

    const percent =
        calculateProgress();

    currentProgress.progressPercent =
        percent;

    if (courseProgressPercent) {

        courseProgressPercent.textContent =
            `${percent}%`;

    }

    if (courseProgressFill) {

        courseProgressFill.style.width =
            `${percent}%`;

    }

    const progressBar =
        document.querySelector(
            ".course-progress-bar"
        );

    if (progressBar) {

        progressBar.setAttribute(
            "aria-valuenow",
            String(percent)
        );

    }

    if (!courseProgressText) {
        return;
    }

    const completed =
        Array.isArray(
            currentProgress.completedLessons
        )
            ? currentProgress.completedLessons.length
            : 0;

    const total =
        getTotalLessons(
            currentCourse
        );

    if (percent === 0) {

        courseProgressText.textContent =
            "Start your first lesson to begin making progress.";

    } else if (percent < 100) {

        courseProgressText.textContent =
            `${completed} of ${total} lessons completed. Keep going.`;

    } else {

        courseProgressText.textContent =
            "Course completed. Congratulations!";

    }

}


/* =========================================================
   OBJECTIVES
========================================================= */

function renderObjectives(
    objectives = []
) {

    if (!courseObjectives) {
        return;
    }

    courseObjectives.innerHTML = "";

    objectives.forEach(
        objective => {

            const li =
                document.createElement("li");

            const icon =
                document.createElement("i");

            icon.className =
                "fa-solid fa-check";

            const text =
                document.createElement("span");

            text.textContent =
                objective;

            li.appendChild(icon);
            li.appendChild(text);

            courseObjectives.appendChild(li);

        }
    );

}


/* =========================================================
   META ITEM
========================================================= */

function createMetaItem(
    iconClass,
    text
) {

    const item =
        document.createElement("span");

    const icon =
        document.createElement("i");

    icon.className =
        iconClass;

    item.appendChild(icon);

    item.appendChild(
        document.createTextNode(
            ` ${text}`
        )
    );

    return item;

}


/* =========================================================
   BUILD LESSON URL
========================================================= */

/*
   THIS IS THE IMPORTANT FIX.

   lesson.js requires:

   course
   module
   lesson

   Therefore this function ALWAYS
   includes all three.
*/

function buildLessonUrl(
    courseId,
    moduleId,
    lessonId = "lesson-01"
) {

    const params =
        new URLSearchParams();

    params.set(
        "course",
        courseId
    );

    params.set(
        "module",
        moduleId
    );

    params.set(
        "lesson",
        lessonId
    );

    const url =
        `lesson.html?${params.toString()}`;

    log(
        "Built lesson URL:",
        url
    );

    return url;

}


/* =========================================================
   RENDER MODULES
========================================================= */

function renderModules(
    modules = []
) {

    if (!courseModules) {
        return;
    }

    courseModules.innerHTML = "";

    modules.forEach(
        module => {

            const article =
                document.createElement("article");

            article.className =
                "course-module-card";

            article.dataset.moduleId =
                module.id;


            /* HEADER */

            const header =
                document.createElement("div");

            header.className =
                "course-module-header";


            /* NUMBER */

            const number =
                document.createElement("div");

            number.className =
                "course-module-number";

            number.textContent =
                String(
                    module.number
                ).padStart(
                    2,
                    "0"
                );


            /* CONTENT */

            const content =
                document.createElement("div");

            content.className =
                "course-module-content";


            const title =
                document.createElement("h3");

            title.textContent =
                module.title;


            const description =
                document.createElement("p");

            description.textContent =
                module.description;


            const meta =
                document.createElement("div");

            meta.className =
                "course-module-meta";


            meta.appendChild(
                createMetaItem(
                    "fa-solid fa-book-open",
                    `${module.lessons} Lessons`
                )
            );

            meta.appendChild(
                createMetaItem(
                    "fa-solid fa-flask",
                    `${module.labs} Labs`
                )
            );

            meta.appendChild(
                createMetaItem(
                    "fa-solid fa-clipboard-check",
                    `${module.assessments} Assessment${
                        module.assessments === 1
                            ? ""
                            : "s"
                    }`
                )
            );


            content.appendChild(title);
            content.appendChild(description);
            content.appendChild(meta);


            /* MODULE BUTTON */

            const action =
                document.createElement("a");

            action.className =
                "course-module-action";


            /*
             * Every module starts at lesson-01.
             *
             * Later we can make this smarter
             * using the actual lesson data.
             */

            action.href =
                buildLessonUrl(
                    currentCourse.id,
                    module.id,
                    "lesson-01"
                );


            action.innerHTML = `
                Start Module
                <i class="fa-solid fa-arrow-right"></i>
            `;


            header.appendChild(number);
            header.appendChild(content);
            header.appendChild(action);

            article.appendChild(header);

            courseModules.appendChild(article);

        }
    );

}


/* =========================================================
   RENDER COURSE
========================================================= */

function renderCourse(course) {

    setText(
        breadcrumbCourse,
        course.title
    );

    setText(
        courseStatus,
        course.status === "available"
            ? "AVAILABLE"
            : "PLANNED"
    );

    setText(
        courseLevel,
        course.level.toUpperCase()
    );

    setText(
        courseCategory,
        course.category
    );

    setText(
        courseTitle,
        course.title
    );

    setText(
        courseDescription,
        course.description
    );

    setText(
        courseLongDescription,
        course.longDescription
    );

    setText(
        courseInfoLevel,
        course.level
    );

    setText(
        courseInfoModules,
        `${course.modules.length} Modules`
    );

    setText(
        courseInfoDuration,
        course.duration
    );

    setText(
        courseInfoLabs,
        `${course.labs} Labs`
    );

    setText(
        courseInfoAssessments,
        `${course.assessments} Assessments`
    );


    /* HERO ICON */

    if (courseHeroIcon) {

        courseHeroIcon.innerHTML = "";

        const icon =
            document.createElement("i");

        icon.className =
            course.icon;

        courseHeroIcon.appendChild(
            icon
        );

    }


    renderObjectives(
        course.objectives
    );

    renderModules(
        course.modules
    );

}


/* =========================================================
   START COURSE
========================================================= */

async function startCourse(event) {

    /*
     * Prevent default form/button behavior.
     */

    if (event) {
        event.preventDefault();
    }

    log(
        "START COURSE CLICKED"
    );


    /* ---------------------------------------------
       CHECK COURSE
    --------------------------------------------- */

    if (!currentCourse) {

        error(
            "Cannot start course: currentCourse is null."
        );

        return;

    }


    if (
        currentCourse.status !==
        "available"
    ) {

        warn(
            "Course is not available."
        );

        return;

    }


    /* ---------------------------------------------
       DETERMINE MODULE
    --------------------------------------------- */

    let moduleId =
        currentProgress?.currentModule ||
        "module-01";


    const moduleExists =
        currentCourse.modules.some(
            module =>
                module.id === moduleId
        );


    if (!moduleExists) {

        moduleId =
            currentCourse.modules[0]?.id ||
            "module-01";

    }


    /* ---------------------------------------------
       DETERMINE LESSON
    --------------------------------------------- */

    /*
     * THIS IS THE OTHER IMPORTANT FIX.
     *
     * Your lesson.js requires a lesson ID.
     */

    let lessonId =
        currentProgress?.currentLesson ||
        "lesson-01";


    /*
     * At the moment your lesson.js
     * has lesson-01 through lesson-04
     * for module-01.
     *
     * Make sure the stored lesson is valid.
     */

    if (
        typeof lessonId !== "string" ||
        !lessonId.startsWith("lesson-")
    ) {

        lessonId =
            "lesson-01";

    }


    /* ---------------------------------------------
       UPDATE LOCAL PROGRESS
    --------------------------------------------- */

    if (!currentProgress) {

        currentProgress =
            getDefaultProgress();

    }


    currentProgress.started =
        true;

    currentProgress.currentModule =
        moduleId;

    currentProgress.currentLesson =
        lessonId;


    /* ---------------------------------------------
       BUILD URL FIRST
    --------------------------------------------- */

    const lessonUrl =
        buildLessonUrl(
            currentCourse.id,
            moduleId,
            lessonId
        );


    log(
        "FINAL LESSON URL:",
        lessonUrl
    );


    /* ---------------------------------------------
       SAVE IN BACKGROUND
       DO NOT WAIT FOR FIRESTORE
    --------------------------------------------- */

    saveProgress()
        .catch(
            err => {

                error(
                    "Background progress save failed:",
                    err
                );

            }
        );


    /* ---------------------------------------------
       REDIRECT IMMEDIATELY
    --------------------------------------------- */

    window.location.href =
        lessonUrl;

}


/* =========================================================
   START BUTTON
========================================================= */

function attachStartButton() {

    if (!startCourseBtn) {

        error(
            "CRITICAL: #startCourseBtn was NOT found."
        );

        return;

    }


    /*
     * Prevent duplicate listeners.
     */

    startCourseBtn.onclick =
        startCourse;


    startCourseBtn.disabled =
        false;


    log(
        "Start Course button ready."
    );

}


/* =========================================================
   LOGOUT
========================================================= */

function setLogoutLoading(
    loading
) {

    if (!logoutBtn) {
        return;
    }

    logoutBtn.disabled =
        loading;

    logoutBtn.classList.toggle(
        "is-loading",
        loading
    );

}


async function logout() {

    if (!auth) {

        error(
            "Firebase Auth unavailable."
        );

        return;

    }

    try {

        setLogoutLoading(true);

        await signOut(auth);

        window.location.replace(
            "../pages/login.html"
        );

    } catch (err) {

        error(
            "Logout failed:",
            err
        );

        setLogoutLoading(false);

        alert(
            "Unable to sign out. Please try again."
        );

    }

}


/* =========================================================
   LOAD COURSE
========================================================= */

async function loadCourse() {

    showLoading();


    const courseId =
        getCourseIdFromUrl();


    log(
        "Course ID:",
        courseId
    );


    if (!courseId) {

        error(
            "No course ID in URL."
        );

        showCourseNotFound();

        return;

    }


    const course =
        courses[courseId];


    if (!course) {

        error(
            "Course does not exist:",
            courseId
        );

        showCourseNotFound();

        return;

    }


    if (
        course.status !==
        "available"
    ) {

        error(
            "Course is unavailable:",
            courseId
        );

        showCourseNotFound();

        return;

    }


    currentCourse =
        course;


    log(
        "Current course set:",
        currentCourse.id
    );


    /*
     * Render immediately.
     *
     * Do not make the user wait for
     * Firestore before seeing the page.
     */

    renderCourse(
        currentCourse
    );

    attachStartButton();

    showCourseContent();


    /*
     * Load progress afterwards.
     */

    await loadProgress();


    /*
     * Re-render the button after progress
     * is loaded in case the student has
     * previously started the course.
     */

    attachStartButton();


    log(
        "Course loaded successfully."
    );

}


/* =========================================================
   AUTHENTICATION
========================================================= */

if (!auth) {

    error(
        "Firebase Auth was not initialized."
    );

    window.location.replace(
        "../pages/login.html"
    );

} else {

    onAuthStateChanged(
        auth,
        async user => {

            log(
                "Auth state:",
                user
                    ? "AUTHENTICATED"
                    : "NOT AUTHENTICATED"
            );


            if (!user) {

                currentUser =
                    null;

                const courseId =
                    getCourseIdFromUrl();


                window.location.replace(
                    `../pages/login.html?redirect=course-details&course=${encodeURIComponent(
                        courseId
                    )}`
                );

                return;

            }


            currentUser =
                user;


            displayStudent(
                user
            );


            await loadCourse();

        }
    );

}


/* =========================================================
   LOGOUT EVENT
========================================================= */

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        logout
    );

}


/* =========================================================
   INITIAL LOG
========================================================= */

log(
    "course-details.js loaded."
);
