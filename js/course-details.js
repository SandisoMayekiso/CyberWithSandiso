/* =========================================================
   CWS ACADEMY
   COURSE DETAILS
   Firebase Authentication + Firestore Progress

   Page:
   student/course-details.html

   Lessons:
   student/lesson.html
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


function log(...messages) {

    if (DEBUG) {

        console.log(
            "[CWS Course Details]",
            ...messages
        );

    }

}


function warn(...messages) {

    if (DEBUG) {

        console.warn(
            "[CWS Course Details]",
            ...messages
        );

    }

}


function error(...messages) {

    console.error(
        "[CWS Course Details]",
        ...messages
    );

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

    },


    "networking-fundamentals": {

        id: "networking-fundamentals",

        title: "Networking Fundamentals",

        category: "CWS ACADEMY • NETWORK SECURITY",

        level: "Beginner",

        levelKey: "beginner",

        status: "available",

        icon: "fa-solid fa-network-wired",

        description:
            "Learn IP addressing, CIDR, ARP, TCP, UDP, ICMP, routing, DNS, HTTP and HTTPS from a cybersecurity perspective.",

        longDescription:
            "Networking Fundamentals teaches the networking concepts required for cybersecurity. Students learn how devices communicate, how addresses and protocols work and how network traffic can be observed and protected.",

        duration: "20–25 hours",

        labs: 6,

        assessments: 10,

        objectives: [

            "Understand basic computer networking.",

            "Explain IPv4 addressing and subnetting.",

            "Understand CIDR notation.",

            "Explain TCP and UDP.",

            "Understand common network protocols.",

            "Understand DNS and HTTP/HTTPS.",

            "Explain ARP and ICMP.",

            "Understand basic routing concepts.",

            "Identify common network security risks.",

            "Use basic network troubleshooting tools."

        ],

        modules: [

            {
                id: "module-01",
                number: 1,
                title: "Introduction to Networking",
                description:
                    "Learn how computers and devices communicate across networks.",
                lessons: 4,
                labs: 0,
                assessments: 1
            },

            {
                id: "module-02",
                number: 2,
                title: "IP Addressing",
                description:
                    "Understand IPv4 addresses, private addresses and network identification.",
                lessons: 5,
                labs: 1,
                assessments: 1
            },

            {
                id: "module-03",
                number: 3,
                title: "CIDR and Subnetting",
                description:
                    "Learn subnet masks, CIDR notation and basic subnet calculations.",
                lessons: 5,
                labs: 1,
                assessments: 1
            },

            {
                id: "module-04",
                number: 4,
                title: "TCP and UDP",
                description:
                    "Understand transport-layer communication and port-based services.",
                lessons: 4,
                labs: 1,
                assessments: 1
            },

            {
                id: "module-05",
                number: 5,
                title: "ARP and ICMP",
                description:
                    "Explore local network discovery and diagnostic protocols.",
                lessons: 4,
                labs: 1,
                assessments: 1
            },

            {
                id: "module-06",
                number: 6,
                title: "DNS",
                description:
                    "Understand domain-name resolution and its security implications.",
                lessons: 4,
                labs: 1,
                assessments: 1
            },

            {
                id: "module-07",
                number: 7,
                title: "HTTP and HTTPS",
                description:
                    "Learn how browsers and web servers communicate.",
                lessons: 4,
                labs: 1,
                assessments: 1
            },

            {
                id: "module-08",
                number: 8,
                title: "Routing",
                description:
                    "Understand how packets move between networks.",
                lessons: 4,
                labs: 0,
                assessments: 1
            },

            {
                id: "module-09",
                number: 9,
                title: "Network Security",
                description:
                    "Explore firewalls, segmentation and basic defensive networking.",
                lessons: 4,
                labs: 1,
                assessments: 1
            },

            {
                id: "module-10",
                number: 10,
                title: "Networking Review",
                description:
                    "Review the networking concepts required for further cybersecurity study.",
                lessons: 5,
                labs: 0,
                assessments: 1
            }

        ]

    },


    "linux-fundamentals": {

        id: "linux-fundamentals",

        title: "Linux Fundamentals",

        category: "CWS ACADEMY • LINUX SECURITY",

        level: "Beginner",

        levelKey: "beginner",

        status: "available",

        icon: "fa-brands fa-linux",

        description:
            "Learn the Linux command line, filesystem, permissions, processes, networking utilities and security fundamentals.",

        longDescription:
            "Linux Fundamentals introduces students to the Linux operating system and command line. The course focuses on practical skills used by cybersecurity professionals when investigating, administering and securing systems.",

        duration: "20–25 hours",

        labs: 6,

        assessments: 10,

        objectives: [

            "Navigate the Linux filesystem.",

            "Use essential Linux command-line tools.",

            "Create, modify and manage files.",

            "Understand Linux users and groups.",

            "Understand file and directory permissions.",

            "Manage running processes.",

            "Use basic networking commands.",

            "Understand Linux services.",

            "Apply basic system-hardening concepts.",

            "Develop practical Linux administration skills."

        ],

        modules: [

            {
                id: "module-01",
                number: 1,
                title: "Introduction to Linux",
                description:
                    "Understand Linux distributions, the shell and the role of Linux in cybersecurity.",
                lessons: 4,
                labs: 0,
                assessments: 1
            },

            {
                id: "module-02",
                number: 2,
                title: "Linux Filesystem",
                description:
                    "Learn the Linux directory structure and filesystem navigation.",
                lessons: 5,
                labs: 1,
                assessments: 1
            },

            {
                id: "module-03",
                number: 3,
                title: "Essential Commands",
                description:
                    "Practice common command-line utilities used in everyday Linux administration.",
                lessons: 5,
                labs: 1,
                assessments: 1
            },

            {
                id: "module-04",
                number: 4,
                title: "Users and Groups",
                description:
                    "Understand Linux accounts, groups and identity management.",
                lessons: 4,
                labs: 1,
                assessments: 1
            },

            {
                id: "module-05",
                number: 5,
                title: "File Permissions",
                description:
                    "Learn ownership, permissions and access control.",
                lessons: 5,
                labs: 1,
                assessments: 1
            },

            {
                id: "module-06",
                number: 6,
                title: "Processes",
                description:
                    "Understand processes, process monitoring and basic management.",
                lessons: 4,
                labs: 1,
                assessments: 1
            },

            {
                id: "module-07",
                number: 7,
                title: "Linux Networking",
                description:
                    "Use basic Linux networking tools and understand network configuration.",
                lessons: 4,
                labs: 1,
                assessments: 1
            },

            {
                id: "module-08",
                number: 8,
                title: "Services and Logs",
                description:
                    "Understand services, logs and basic system investigation.",
                lessons: 4,
                labs: 0,
                assessments: 1
            },

            {
                id: "module-09",
                number: 9,
                title: "Linux Security",
                description:
                    "Explore system hardening and basic Linux security practices.",
                lessons: 4,
                labs: 1,
                assessments: 1
            },

            {
                id: "module-10",
                number: 10,
                title: "Linux Foundations Review",
                description:
                    "Review the core Linux skills needed for cybersecurity.",
                lessons: 5,
                labs: 0,
                assessments: 1
            }

        ]

    }

};


/* =========================================================
   URL COURSE ID
========================================================= */

function getCourseIdFromUrl() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    return (
        params.get("course") ||
        ""
    )
        .trim()
        .toLowerCase();

}


/* =========================================================
   GET USER NAME
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

        const emailName =
            user.email
                .split("@")[0]
                .trim();


        if (emailName) {

            return emailName
                .replace(
                    /[._-]+/g,
                    " "
                )
                .replace(
                    /\s+/g,
                    " "
                )
                .trim()
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

    if (!studentName) {

        return;

    }

    studentName.textContent =
        getUserName(user);

}


/* =========================================================
   SHOW LOADING
========================================================= */

function showLoading() {

    if (courseLoading) {

        courseLoading.hidden =
            false;

    }

    if (courseNotFound) {

        courseNotFound.hidden =
            true;

    }

    if (courseContent) {

        courseContent.hidden =
            true;

    }

}


/* =========================================================
   SHOW NOT FOUND
========================================================= */

function showCourseNotFound() {

    if (courseLoading) {

        courseLoading.hidden =
            true;

    }

    if (courseContent) {

        courseContent.hidden =
            true;

    }

    if (courseNotFound) {

        courseNotFound.hidden =
            false;

    }

}


/* =========================================================
   SHOW COURSE
========================================================= */

function showCourseContent() {

    if (courseLoading) {

        courseLoading.hidden =
            true;

    }

    if (courseNotFound) {

        courseNotFound.hidden =
            true;

    }

    if (courseContent) {

        courseContent.hidden =
            false;

    }

}


/* =========================================================
   SET TEXT
========================================================= */

function setText(
    element,
    value
) {

    if (!element) {

        return;

    }

    element.textContent =
        value ?? "";

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
   RENDER OBJECTIVES
========================================================= */

function renderObjectives(
    objectives
) {

    if (!courseObjectives) {

        return;

    }

    courseObjectives.innerHTML =
        "";


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


            li.appendChild(
                icon
            );

            li.appendChild(
                text
            );


            courseObjectives.appendChild(
                li
            );

        }
    );

}


/* =========================================================
   RENDER MODULES
========================================================= */

function renderModules(
    modules
) {

    if (!courseModules) {

        return;

    }

    courseModules.innerHTML =
        "";


    modules.forEach(
        module => {

            const article =
                document.createElement("article");


            article.className =
                "course-module-card";


            article.dataset.moduleId =
                module.id;


            /* ---------------------------------------------
               MODULE HEADER
            --------------------------------------------- */

            const header =
                document.createElement("div");


            header.className =
                "course-module-header";


            /* MODULE NUMBER */

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


            /* MODULE CONTENT */

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


            /* MODULE META */

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
                    `${module.assessments} Assessment${module.assessments === 1 ? "" : "s"}`
                )
            );


            content.appendChild(
                title
            );

            content.appendChild(
                description
            );

            content.appendChild(
                meta
            );


            /* ---------------------------------------------
               MODULE BUTTON

               IMPORTANT:
               lesson.html lives in the SAME student folder
               as course-details.html.
            --------------------------------------------- */

            const action =
                document.createElement("a");


            action.className =
                "course-module-action";


            action.href =
                buildLessonUrl(
                    currentCourse.id,
                    module.id
                );


            action.innerHTML = `
                Start Module
                <i class="fa-solid fa-arrow-right"></i>
            `;


            header.appendChild(
                number
            );

            header.appendChild(
                content
            );

            header.appendChild(
                action
            );


            article.appendChild(
                header
            );


            courseModules.appendChild(
                article
            );

        }
    );

}


/* =========================================================
   BUILD LESSON URL
========================================================= */

/*
 * course-details.html and lesson.html are both inside
 * the student directory.
 *
 * Therefore we DO NOT use ../pages/lesson.html.
 *
 * Example:
 *
 * lesson.html?course=cybersecurity-fundamentals&module=module-01
 */

function buildLessonUrl(
    courseId,
    moduleId
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


    return `lesson.html?${params.toString()}`;

}


/* =========================================================
   CREATE META ITEM
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


    item.appendChild(
        icon
    );


    item.appendChild(
        document.createTextNode(
            ` ${text}`
        )
    );


    return item;

}


/* =========================================================
   TOTAL LESSONS
========================================================= */

function getTotalLessons(course) {

    return course.modules.reduce(
        (
            total,
            module
        ) => {

            return total +
                module.lessons;

        },
        0
    );

}


/* =========================================================
   FIRESTORE PROGRESS REFERENCE
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
            null,

        progressPercent:
            0,

        started:
            false,

        completed:
            false

    };

}


/* =========================================================
   LOAD PROGRESS
========================================================= */

async function loadProgress() {

    if (
        !currentUser ||
        !currentCourse
    ) {

        return;

    }


    if (!db) {

        warn(
            "Firestore unavailable. Using default progress."
        );


        currentProgress =
            getDefaultProgress();


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


            log(
                "Existing progress loaded.",
                currentProgress
            );

        } else {

            currentProgress =
                getDefaultProgress();


            log(
                "No existing progress."
            );

        }


        updateProgressUI();

    } catch (err) {

        error(
            "Unable to load progress:",
            err
        );


        currentProgress =
            getDefaultProgress();


        updateProgressUI();

    }

}


/* =========================================================
   SAVE PROGRESS
========================================================= */

async function saveProgress() {

    if (
        !currentUser ||
        !currentCourse ||
        !currentProgress
    ) {

        return;

    }


    if (!db) {

        warn(
            "Firestore unavailable. Progress not persisted."
        );

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

        error(
            "Unable to save progress:",
            err
        );

    }

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


    const totalLessons =
        getTotalLessons(
            currentCourse
        );


    if (!totalLessons) {

        return 0;

    }


    const completedLessons =
        Array.isArray(
            currentProgress.completedLessons
        )
            ? currentProgress.completedLessons.length
            : 0;


    return Math.min(
        100,
        Math.round(
            (
                completedLessons /
                totalLessons
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


    if (percent === 0) {

        courseProgressText.textContent =
            "Start your first lesson to begin making progress.";

        return;

    }


    if (percent < 100) {

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


        courseProgressText.textContent =
            `${completed} of ${total} lessons completed. Keep going.`;

        return;

    }


    courseProgressText.textContent =
        "Course completed. Congratulations!";

}


/* =========================================================
   START COURSE
========================================================= */

async function startCourse() {

    log(
        "Start Course clicked."
    );


    if (!currentCourse) {

        warn(
            "No current course."
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


    if (!currentProgress) {

        currentProgress =
            getDefaultProgress();

    }


    /* ---------------------------------------------
       Mark course as started
    --------------------------------------------- */

    currentProgress.started =
        true;


    /* ---------------------------------------------
       Determine module
    --------------------------------------------- */

    let moduleId =
        currentProgress.currentModule;


    /*
     * Make sure the stored module actually
     * exists in the current course.
     */

    const validModule =
        currentCourse.modules.find(
            module =>
                module.id === moduleId
        );


    if (!validModule) {

        moduleId =
            currentCourse.modules[0].id;


        currentProgress.currentModule =
            moduleId;

    }


    await saveProgress();


    /* ---------------------------------------------
       Redirect to actual lessons
    --------------------------------------------- */

    const lessonUrl =
        buildLessonUrl(
            currentCourse.id,
            moduleId
        );


    log(
        "Redirecting to lesson:",
        lessonUrl
    );


    window.location.assign(
        lessonUrl
    );

}


/* =========================================================
   START BUTTON
========================================================= */

if (startCourseBtn) {

    startCourseBtn.addEventListener(
        "click",
        startCourse
    );


    log(
        "Start Course button listener attached."
    );

} else {

    warn(
        "Start Course button not found."
    );

}


/* =========================================================
   LOAD COURSE
========================================================= */

async function loadCourse() {

    showLoading();


    const courseId =
        getCourseIdFromUrl();


    log(
        "Requested course:",
        courseId
    );


    if (!courseId) {

        warn(
            "No course ID supplied."
        );


        showCourseNotFound();

        return;

    }


    const course =
        courses[courseId];


    if (!course) {

        warn(
            "Course not found:",
            courseId
        );


        showCourseNotFound();

        return;

    }


    if (
        course.status !==
        "available"
    ) {

        warn(
            "Course is not available:",
            courseId
        );


        showCourseNotFound();

        return;

    }


    currentCourse =
        course;


    renderCourse(
        currentCourse
    );


    await loadProgress();


    showCourseContent();


    log(
        "Course loaded:",
        currentCourse.title
    );

}


/* =========================================================
   LOGOUT LOADING STATE
========================================================= */

function setLogoutLoading(
    isLoading
) {

    if (!logoutBtn) {

        return;

    }


    logoutBtn.disabled =
        isLoading;


    logoutBtn.classList.toggle(
        "is-loading",
        isLoading
    );


    if (isLoading) {

        logoutBtn.setAttribute(
            "aria-busy",
            "true"
        );

    } else {

        logoutBtn.removeAttribute(
            "aria-busy"
        );

    }

}


/* =========================================================
   LOGOUT
========================================================= */

async function logout() {

    if (!auth) {

        error(
            "Firebase Auth unavailable."
        );

        return;

    }


    try {

        setLogoutLoading(
            true
        );


        await signOut(
            auth
        );


        window.location.replace(
            "../pages/login.html"
        );

    } catch (err) {

        error(
            "Logout failed:",
            err
        );


        setLogoutLoading(
            false
        );


        alert(
            "Unable to sign out. Please try again."
        );

    }

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
                "Authentication state:",
                user
                    ? "AUTHENTICATED"
                    : "NOT AUTHENTICATED"
            );


            /* NOT AUTHENTICATED */

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


            /* AUTHENTICATED */

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
   INITIAL LOAD
========================================================= */

log(
    "course-details.js loaded."
);
