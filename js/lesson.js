/* =========================================================
   CWS ACADEMY
   LESSON SYSTEM
   ---------------------------------------------------------
   student/lesson.html
   student/lesson.js

   URL FORMATS

   Start module:
   lesson.html?course=cybersecurity-fundamentals&module=module-01

   Specific lesson:
   lesson.html?course=cybersecurity-fundamentals
              &module=module-01
              &lesson=lesson-02

   NAVIGATION

   Previous Lesson
   Next Lesson
   Module Lesson List
   Browser Back / Forward
   Course Details
   Module Start
   Course Start

   FIRESTORE

   users/{uid}/courseProgress/{courseId}

   Firestore is NEVER required before the lesson
   can render.
========================================================= */


/* =========================================================
   FIREBASE IMPORTS
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
   CONFIGURATION
========================================================= */

const DEBUG = true;

const FIRESTORE_TIMEOUT = 8000;

const LOGIN_PATH =
    "../pages/login.html";

const COURSE_DETAILS_PATH =
    "course-details.html";

const LESSON_PATH =
    "lesson.html";


/* =========================================================
   DEBUG HELPERS
========================================================= */

function log(...messages) {

    if (!DEBUG) {
        return;
    }

    console.log(
        "[CWS Lesson]",
        ...messages
    );

}


function warn(...messages) {

    if (!DEBUG) {
        return;
    }

    console.warn(
        "[CWS Lesson]",
        ...messages
    );

}


function error(...messages) {

    console.error(
        "[CWS Lesson]",
        ...messages
    );

}


/* =========================================================
   DOM ELEMENTS
========================================================= */

const lessonLoading =
    document.getElementById("lessonLoading");

const lessonNotFound =
    document.getElementById("lessonNotFound");

const lessonContent =
    document.getElementById("lessonContent");

const studentName =
    document.getElementById("studentName");

const logoutBtn =
    document.getElementById("logoutBtn");

const breadcrumbCourse =
    document.getElementById("breadcrumbCourse");

const breadcrumbModule =
    document.getElementById("breadcrumbModule");

const lessonModuleNumber =
    document.getElementById("lessonModuleNumber");

const lessonNumber =
    document.getElementById("lessonNumber");

const lessonTitle =
    document.getElementById("lessonTitle");

const lessonDescription =
    document.getElementById("lessonDescription");

const lessonObjectives =
    document.getElementById("lessonObjectives");

const lessonBody =
    document.getElementById("lessonBody");

const lessonProgressPercent =
    document.getElementById("lessonProgressPercent");

const lessonProgressFill =
    document.getElementById("lessonProgressFill");

const lessonProgressText =
    document.getElementById("lessonProgressText");

const markCompleteBtn =
    document.getElementById("markCompleteBtn");

const previousLessonBtn =
    document.getElementById("previousLessonBtn");

const nextLessonBtn =
    document.getElementById("nextLessonBtn");

const lessonModuleList =
    document.getElementById("lessonModuleList");


/* =========================================================
   STATE
========================================================= */

let currentUser = null;

let currentCourse = null;

let currentModule = null;

let currentLesson = null;

let currentProgress = null;

let authResolved = false;

let navigationToken = 0;

let progressLoadPromise = null;


/* =========================================================
   COURSE CONTENT
========================================================= */

const courses = {

    "cybersecurity-fundamentals": {

        id: "cybersecurity-fundamentals",

        title: "Cybersecurity Fundamentals",

        status: "available",

        modules: [

            /* =================================================
               MODULE 01
            ================================================== */

            {

                id: "module-01",

                number: 1,

                title:
                    "Introduction to Cybersecurity",

                description:
                    "Understand what cybersecurity is, why it matters and how security professionals protect digital systems.",

                lessons: [

                    {

                        id: "lesson-01",

                        number: 1,

                        title:
                            "What Is Cybersecurity?",

                        description:
                            "Learn what cybersecurity means and what security professionals are responsible for protecting.",

                        objectives: [

                            "Define cybersecurity.",

                            "Identify the systems and information cybersecurity protects.",

                            "Understand why cybersecurity is important.",

                            "Recognize the role of cybersecurity professionals."

                        ],

                        content: [

                            {

                                type: "heading",

                                text:
                                    "Understanding Cybersecurity"

                            },

                            {

                                type: "paragraph",

                                text:
                                    "Cybersecurity is the practice of protecting computers, networks, applications, devices and information from unauthorized access, misuse, disruption, modification or destruction."

                            },

                            {

                                type: "paragraph",

                                text:
                                    "Modern organizations depend heavily on digital systems. Businesses store customer information, financial records, employee information and operational data on computers and networked systems. Protecting these resources is therefore an important part of operating a modern organization."

                            },

                            {

                                type: "heading",

                                text:
                                    "What Does Cybersecurity Protect?"

                            },

                            {

                                type: "paragraph",

                                text:
                                    "Cybersecurity protects more than just computers. Security teams may be responsible for protecting networks, servers, cloud services, websites, applications, databases, mobile devices and the information stored on those systems."

                            },

                            {

                                type: "list",

                                items: [

                                    "Computer systems",

                                    "Networks",

                                    "Web applications",

                                    "Cloud infrastructure",

                                    "Databases",

                                    "User accounts",

                                    "Business information",

                                    "Personal information"

                                ]

                            },

                            {

                                type: "heading",

                                text:
                                    "Why Cybersecurity Matters"

                            },

                            {

                                type: "paragraph",

                                text:
                                    "A security incident can have serious consequences. Attackers may steal information, disrupt services, compromise accounts or damage systems. Cybersecurity helps organizations reduce these risks and respond when security incidents occur."

                            },

                            {

                                type: "callout",

                                title:
                                    "Key Idea",

                                text:
                                    "Cybersecurity is not simply about installing antivirus software or building firewalls. It is a broader discipline involving people, processes and technology."

                            }

                        ]

                    },


                    {

                        id: "lesson-02",

                        number: 2,

                        title:
                            "Why Cybersecurity Matters",

                        description:
                            "Explore the importance of cybersecurity and the consequences of security failures.",

                        objectives: [

                            "Understand the impact of cyber attacks.",

                            "Identify common security consequences.",

                            "Understand why organizations invest in security.",

                            "Recognize the importance of protecting information."

                        ],

                        content: [

                            {

                                type: "heading",

                                text:
                                    "The Importance of Security"

                            },

                            {

                                type: "paragraph",

                                text:
                                    "Cybersecurity is important because digital systems have become essential to everyday life. Organizations rely on technology to communicate, process payments, store information and provide services."

                            },

                            {

                                type: "heading",

                                text:
                                    "Consequences of Security Incidents"

                            },

                            {

                                type: "list",

                                items: [

                                    "Loss of sensitive information",

                                    "Financial losses",

                                    "Service disruption",

                                    "Reputational damage",

                                    "Legal and regulatory consequences",

                                    "Loss of customer trust"

                                ]

                            },

                            {

                                type: "callout",

                                title:
                                    "Security Principle",

                                text:
                                    "Good cybersecurity reduces the likelihood and impact of security incidents."

                            }

                        ]

                    },


                    {

                        id: "lesson-03",

                        number: 3,

                        title:
                            "The Cybersecurity Landscape",

                        description:
                            "Understand the people, technologies and threats that make up the modern cybersecurity environment.",

                        objectives: [

                            "Identify major areas of cybersecurity.",

                            "Understand the relationship between attackers and defenders.",

                            "Recognize the changing nature of cyber threats."

                        ],

                        content: [

                            {

                                type: "heading",

                                text:
                                    "A Changing Environment"

                            },

                            {

                                type: "paragraph",

                                text:
                                    "Cybersecurity is constantly changing. New technologies create new opportunities, but they can also introduce new security risks."

                            },

                            {

                                type: "paragraph",

                                text:
                                    "Security professionals therefore need to continuously learn about operating systems, networks, applications, cloud environments, vulnerabilities and emerging threats."

                            },

                            {

                                type: "heading",

                                text:
                                    "Attackers and Defenders"

                            },

                            {

                                type: "paragraph",

                                text:
                                    "Cybersecurity involves understanding how systems can be attacked and how those systems can be defended. Security professionals use this knowledge to identify weaknesses, reduce risk and improve defenses."

                            }

                        ]

                    },


                    {

                        id: "lesson-04",

                        number: 4,

                        title:
                            "The Security Mindset",

                        description:
                            "Develop the analytical and responsible mindset required for cybersecurity work.",

                        objectives: [

                            "Understand the importance of critical thinking.",

                            "Recognize the value of questioning assumptions.",

                            "Understand responsible security behavior.",

                            "Develop a defensive security mindset."

                        ],

                        content: [

                            {

                                type: "heading",

                                text:
                                    "Thinking Like a Security Professional"

                            },

                            {

                                type: "paragraph",

                                text:
                                    "Cybersecurity professionals need to think critically about how systems work and how those systems could fail. They ask questions about trust, access, configuration and potential weaknesses."

                            },

                            {

                                type: "list",

                                items: [

                                    "What could go wrong?",

                                    "Who has access?",

                                    "What happens if this control fails?",

                                    "What information needs protection?",

                                    "How could the system be abused?"

                                ]

                            },

                            {

                                type: "heading",

                                text:
                                    "Ethical Responsibility"

                            },

                            {

                                type: "paragraph",

                                text:
                                    "Security knowledge must be used responsibly. Testing systems without authorization can cause damage and may be illegal. Professional cybersecurity work requires permission, clearly defined scope and responsible handling of information."

                            },

                            {

                                type: "callout",

                                title:
                                    "Remember",

                                text:
                                    "Authorization comes before security testing."

                            }

                        ]

                    }

                ]

            },


            /* =================================================
               MODULE 02
               -------------------------------------------------
               Add lesson content here when ready.
            ================================================== */

            {

                id: "module-02",

                number: 2,

                title:
                    "The CIA Triad",

                description:
                    "Learn confidentiality, integrity and availability and how these principles influence security decisions.",

                lessons: []

            },


            /* =================================================
               MODULE 03
            ================================================== */

            {

                id: "module-03",

                number: 3,

                title:
                    "Threats and Attack Types",

                description:
                    "Explore common cyber threats including phishing, malware, social engineering and denial-of-service attacks.",

                lessons: []

            },


            /* =================================================
               MODULE 04
            ================================================== */

            {

                id: "module-04",

                number: 4,

                title:
                    "Vulnerabilities and Risk",

                description:
                    "Learn how vulnerabilities are identified, evaluated and connected to cybersecurity risk.",

                lessons: []

            },


            /* =================================================
               MODULE 05
            ================================================== */

            {

                id: "module-05",

                number: 5,

                title:
                    "Security Controls",

                description:
                    "Understand administrative, technical and physical security controls.",

                lessons: []

            },


            /* =================================================
               MODULE 06
            ================================================== */

            {

                id: "module-06",

                number: 6,

                title:
                    "Authentication and Access Control",

                description:
                    "Learn authentication factors, authorization, least privilege and access management.",

                lessons: []

            },


            /* =================================================
               MODULE 07
            ================================================== */

            {

                id: "module-07",

                number: 7,

                title:
                    "Network Security Fundamentals",

                description:
                    "Understand basic network security concepts and how network traffic can be protected.",

                lessons: []

            },


            /* =================================================
               MODULE 08
            ================================================== */

            {

                id: "module-08",

                number: 8,

                title:
                    "Endpoint and System Security",

                description:
                    "Explore operating-system security, patching, endpoint protection and system hardening.",

                lessons: []

            },


            /* =================================================
               MODULE 09
            ================================================== */

            {

                id: "module-09",

                number: 9,

                title:
                    "Security Policies and Ethics",

                description:
                    "Understand security policies, acceptable use, responsible disclosure and ethical security practice.",

                lessons: []

            },


            /* =================================================
               MODULE 10
            ================================================== */

            {

                id: "module-10",

                number: 10,

                title:
                    "Cybersecurity Foundations Review",

                description:
                    "Bring the concepts together through a comprehensive review and final assessment.",

                lessons: []

            }

        ]

    }

};


/* =========================================================
   URL HELPERS
========================================================= */

function getUrlParameters() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    return {

        courseId:
            normalizeId(
                params.get("course")
            ),

        moduleId:
            normalizeId(
                params.get("module")
            ),

        lessonId:
            normalizeId(
                params.get("lesson")
            )

    };

}


function normalizeId(value) {

    return (
        typeof value === "string"
            ? value
            : ""
    )
        .trim()
        .toLowerCase();

}


/* =========================================================
   URL BUILDERS
========================================================= */

function buildLessonUrl(
    courseId,
    moduleId,
    lessonId
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


    if (lessonId) {

        params.set(
            "lesson",
            lessonId
        );

    }


    return (
        `${LESSON_PATH}?${params.toString()}`
    );

}


function buildCourseDetailsUrl(
    courseId
) {

    const params =
        new URLSearchParams();


    params.set(
        "course",
        courseId
    );


    return (
        `${COURSE_DETAILS_PATH}?${params.toString()}`
    );

}


function buildLoginUrl(
    courseId,
    moduleId,
    lessonId
) {

    const params =
        new URLSearchParams();


    params.set(
        "redirect",
        "lesson"
    );


    if (courseId) {

        params.set(
            "course",
            courseId
        );

    }


    if (moduleId) {

        params.set(
            "module",
            moduleId
        );

    }


    if (lessonId) {

        params.set(
            "lesson",
            lessonId
        );

    }


    return (
        `${LOGIN_PATH}?${params.toString()}`
    );

}


/* =========================================================
   BROWSER URL
========================================================= */

function updateBrowserUrl(
    courseId,
    moduleId,
    lessonId,
    replace = true
) {

    const url =
        buildLessonUrl(
            courseId,
            moduleId,
            lessonId
        );


    if (replace) {

        window.history.replaceState(
            {
                courseId,
                moduleId,
                lessonId
            },
            "",
            url
        );

    } else {

        window.history.pushState(
            {
                courseId,
                moduleId,
                lessonId
            },
            "",
            url
        );

    }

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
                .replace(
                    /[._-]+/g,
                    " "
                )
                .replace(
                    /\s+/g,
                    " "
                )
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

    if (!studentName) {

        return;

    }


    studentName.textContent =
        getUserName(user);

}


/* =========================================================
   PAGE STATES
========================================================= */

function showLoading() {

    if (lessonLoading) {

        lessonLoading.hidden =
            false;

    }


    if (lessonNotFound) {

        lessonNotFound.hidden =
            true;

    }


    if (lessonContent) {

        lessonContent.hidden =
            true;

    }

}


function showLessonNotFound() {

    if (lessonLoading) {

        lessonLoading.hidden =
            true;

    }


    if (lessonContent) {

        lessonContent.hidden =
            true;

    }


    if (lessonNotFound) {

        lessonNotFound.hidden =
            false;

    }

}


function showLessonContent() {

    if (lessonLoading) {

        lessonLoading.hidden =
            true;

    }


    if (lessonNotFound) {

        lessonNotFound.hidden =
            true;

    }


    if (lessonContent) {

        lessonContent.hidden =
            false;

    }

}


/* =========================================================
   FIND COURSE
========================================================= */

function findCourse(
    courseId
) {

    return (
        courses[courseId] ||
        null
    );

}


/* =========================================================
   FIND MODULE
========================================================= */

function findModule(
    course,
    moduleId
) {

    if (!course) {

        return null;

    }


    return (
        course.modules.find(
            module =>
                module.id === moduleId
        ) ||
        null
    );

}


/* =========================================================
   FIND LESSON
========================================================= */

function findLesson(
    module,
    lessonId
) {

    if (
        !module ||
        !Array.isArray(module.lessons)
    ) {

        return null;

    }


    return (
        module.lessons.find(
            lesson =>
                lesson.id === lessonId
        ) ||
        null
    );

}


/* =========================================================
   TOTAL LESSONS
========================================================= */

function getTotalLessons(
    course
) {

    if (!course) {

        return 0;

    }


    return course.modules.reduce(
        (
            total,
            module
        ) => {

            return (
                total +
                (
                    Array.isArray(module.lessons)
                        ? module.lessons.length
                        : 0
                )
            );

        },
        0
    );

}


/* =========================================================
   FLATTEN COURSE LESSONS
   ---------------------------------------------------------
   This is the key navigation system.

   Example:

   Module 1 / Lesson 1
   Module 1 / Lesson 2
   Module 1 / Lesson 3
   Module 1 / Lesson 4
   Module 2 / Lesson 1
   Module 2 / Lesson 2
   ...
========================================================= */

function getAllLessons(
    course
) {

    if (!course) {

        return [];

    }


    const lessons = [];


    course.modules.forEach(
        module => {

            if (
                !Array.isArray(
                    module.lessons
                )
            ) {

                return;

            }


            module.lessons.forEach(
                lesson => {

                    lessons.push({

                        courseId:
                            course.id,

                        moduleId:
                            module.id,

                        moduleNumber:
                            module.number,

                        moduleTitle:
                            module.title,

                        lessonId:
                            lesson.id,

                        lessonNumber:
                            lesson.number,

                        lessonTitle:
                            lesson.title

                    });

                }
            );

        }
    );


    return lessons;

}


/* =========================================================
   GET CURRENT LESSON INDEX
========================================================= */

function getCurrentLessonIndex() {

    const lessons =
        getAllLessons(
            currentCourse
        );


    return lessons.findIndex(
        item =>
            item.moduleId ===
                currentModule?.id &&
            item.lessonId ===
                currentLesson?.id
    );

}


/* =========================================================
   GET PREVIOUS LESSON
========================================================= */

function getPreviousLesson() {

    const lessons =
        getAllLessons(
            currentCourse
        );


    const index =
        getCurrentLessonIndex();


    if (index <= 0) {

        return null;

    }


    return (
        lessons[index - 1] ||
        null
    );

}


/* =========================================================
   GET NEXT LESSON
========================================================= */

function getNextLesson() {

    const lessons =
        getAllLessons(
            currentCourse
        );


    const index =
        getCurrentLessonIndex();


    if (
        index < 0 ||
        index >= lessons.length - 1
    ) {

        return null;

    }


    return (
        lessons[index + 1] ||
        null
    );

}


/* =========================================================
   DEFAULT PROGRESS
========================================================= */

function getDefaultProgress() {

    return {

        courseId:
            currentCourse
                ? currentCourse.id
                : null,

        completedLessons:
            [],

        completedLabs:
            [],

        completedAssessments:
            [],

        currentModule:
            currentModule
                ? currentModule.id
                : null,

        currentLesson:
            currentLesson
                ? currentLesson.id
                : null,

        progressPercent:
            0,

        started:
            true,

        completed:
            false

    };

}


/* =========================================================
   NORMALIZE PROGRESS
========================================================= */

function normalizeProgress(
    progress
) {

    const normalized = {

        ...getDefaultProgress(),

        ...(progress || {})

    };


    if (
        !Array.isArray(
            normalized.completedLessons
        )
    ) {

        normalized.completedLessons =
            [];

    }


    if (
        !Array.isArray(
            normalized.completedLabs
        )
    ) {

        normalized.completedLabs =
            [];

    }


    if (
        !Array.isArray(
            normalized.completedAssessments
        )
    ) {

        normalized.completedAssessments =
            [];

    }


    return normalized;

}


/* =========================================================
   FIRESTORE REFERENCE
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
   TIMEOUT
========================================================= */

function withTimeout(
    promise,
    timeout = FIRESTORE_TIMEOUT
) {

    return Promise.race([

        promise,

        new Promise(
            (_, reject) => {

                const timer =
                    setTimeout(
                        () => {

                            reject(
                                new Error(
                                    "Firestore request timed out."
                                )
                            );

                        },
                        timeout
                    );


                /*
                   Prevent unhandled timer references
                   from becoming significant.
                */

                void timer;

            }
        )

    ]);

}


/* =========================================================
   LOAD PROGRESS
========================================================= */

async function loadProgress() {

    if (
        progressLoadPromise
    ) {

        return progressLoadPromise;

    }


    currentProgress =
        normalizeProgress(
            currentProgress
        );


    if (
        !db ||
        !currentUser ||
        !currentCourse
    ) {

        updateProgressUI();

        updateCompleteButton();

        renderModuleList();

        return;

    }


    const progressRef =
        getProgressRef();


    if (!progressRef) {

        return;

    }


    progressLoadPromise =
        (async () => {

            try {

                const snapshot =
                    await withTimeout(
                        getDoc(
                            progressRef
                        )
                    );


                if (snapshot.exists()) {

                    currentProgress =
                        normalizeProgress(
                            snapshot.data()
                        );

                }


                /*
                   Preserve the actual lesson the user
                   is currently viewing.
                */

                currentProgress.currentModule =
                    currentModule.id;

                currentProgress.currentLesson =
                    currentLesson.id;


                currentProgress.started =
                    true;


                currentProgress.progressPercent =
                    calculateProgress();


                updateProgressUI();

                updateCompleteButton();

                renderModuleList();


                log(
                    "Progress loaded."
                );

            } catch (err) {

                error(
                    "Progress load failed:",
                    err
                );


                currentProgress =
                    normalizeProgress(
                        currentProgress
                    );


                updateProgressUI();

                updateCompleteButton();

                renderModuleList();

            }

        })();


    try {

        await progressLoadPromise;

    } finally {

        progressLoadPromise =
            null;

    }

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

        warn(
            "Progress save skipped."
        );

        return false;

    }


    const progressRef =
        getProgressRef();


    if (!progressRef) {

        return false;

    }


    try {

        await withTimeout(

            setDoc(
                progressRef,
                {

                    ...currentProgress,

                    updatedAt:
                        serverTimestamp()

                },

                {
                    merge: true
                }

            )

        );


        log(
            "Progress saved."
        );


        return true;

    } catch (err) {

        error(
            "Progress save failed:",
            err
        );


        return false;

    }

}


/* =========================================================
   CALCULATE PROGRESS
========================================================= */

function calculateProgress() {

    if (!currentCourse) {

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
            currentProgress?.completedLessons
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

    const percent =
        calculateProgress();


    if (lessonProgressPercent) {

        lessonProgressPercent.textContent =
            `${percent}%`;

    }


    if (lessonProgressFill) {

        lessonProgressFill.style.width =
            `${percent}%`;

    }


    const progressBar =
        document.querySelector(
            ".lesson-progress-bar"
        );


    if (progressBar) {

        progressBar.setAttribute(
            "aria-valuenow",
            String(percent)
        );

    }


    if (lessonProgressText) {

        const completed =
            Array.isArray(
                currentProgress?.completedLessons
            )
                ? currentProgress.completedLessons.length
                : 0;


        const total =
            getTotalLessons(
                currentCourse
            );


        if (!total) {

            lessonProgressText.textContent =
                "No lessons available yet.";

        } else {

            lessonProgressText.textContent =
                `${completed} of ${total} lessons completed`;

        }

    }

}


/* =========================================================
   RENDER OBJECTIVES
========================================================= */

function renderObjectives(
    objectives = []
) {

    if (!lessonObjectives) {

        return;

    }


    lessonObjectives.innerHTML =
        "";


    if (
        !Array.isArray(
            objectives
        )
    ) {

        return;

    }


    objectives.forEach(
        objective => {

            const li =
                document.createElement(
                    "li"
                );


            const icon =
                document.createElement(
                    "i"
                );


            icon.className =
                "fa-solid fa-check";


            const span =
                document.createElement(
                    "span"
                );


            span.textContent =
                objective;


            li.appendChild(
                icon
            );


            li.appendChild(
                span
            );


            lessonObjectives.appendChild(
                li
            );

        }
    );

}


/* =========================================================
   RENDER LESSON BODY
========================================================= */

function renderLessonBody(
    content = []
) {

    if (!lessonBody) {

        return;

    }


    lessonBody.innerHTML =
        "";


    if (
        !Array.isArray(
            content
        )
    ) {

        return;

    }


    content.forEach(
        block => {

            if (!block) {

                return;

            }


            let element = null;


            switch (
                block.type
            ) {

                case "heading":

                    element =
                        document.createElement(
                            "h2"
                        );


                    element.textContent =
                        block.text ||
                        "";


                    break;


                case "paragraph":

                    element =
                        document.createElement(
                            "p"
                        );


                    element.textContent =
                        block.text ||
                        "";


                    break;


                case "list":

                    element =
                        document.createElement(
                            "ul"
                        );


                    if (
                        Array.isArray(
                            block.items
                        )
                    ) {

                        block.items.forEach(
                            item => {

                                const li =
                                    document.createElement(
                                        "li"
                                    );


                                li.textContent =
                                    item;


                                element.appendChild(
                                    li
                                );

                            }
                        );

                    }


                    break;


                case "callout": {

                    element =
                        document.createElement(
                            "aside"
                        );


                    element.className =
                        "lesson-callout";


                    const title =
                        document.createElement(
                            "strong"
                        );


                    title.textContent =
                        block.title ||
                        "Important";


                    const text =
                        document.createElement(
                            "p"
                        );


                    text.textContent =
                        block.text ||
                        "";


                    element.appendChild(
                        title
                    );


                    element.appendChild(
                        text
                    );


                    break;

                }


                default:

                    element =
                        document.createElement(
                            "p"
                        );


                    element.textContent =
                        block.text ||
                        "";

            }


            if (element) {

                lessonBody.appendChild(
                    element
                );

            }

        }
    );

}


/* =========================================================
   RENDER MODULE LIST
========================================================= */

function renderModuleList() {

    if (!lessonModuleList) {

        return;

    }


    lessonModuleList.innerHTML =
        "";


    if (!currentCourse) {

        return;

    }


    /*
       Display the lessons of the CURRENT MODULE.
    */

    if (
        !currentModule ||
        !Array.isArray(
            currentModule.lessons
        )
    ) {

        return;

    }


    currentModule.lessons.forEach(
        lesson => {

            const link =
                document.createElement(
                    "a"
                );


            link.className =
                "lesson-module-item";


            link.href =
                buildLessonUrl(
                    currentCourse.id,
                    currentModule.id,
                    lesson.id
                );


            if (
                currentLesson &&
                lesson.id ===
                    currentLesson.id
            ) {

                link.classList.add(
                    "active"
                );

            }


            const completed =
                Array.isArray(
                    currentProgress?.completedLessons
                ) &&
                currentProgress.completedLessons.includes(
                    lesson.id
                );


            if (completed) {

                link.classList.add(
                    "completed"
                );

            }


            const number =
                document.createElement(
                    "span"
                );


            number.className =
                "lesson-module-item-number";


            number.textContent =
                String(
                    lesson.number
                ).padStart(
                    2,
                    "0"
                );


            const title =
                document.createElement(
                    "span"
                );


            title.className =
                "lesson-module-item-title";


            title.textContent =
                lesson.title;


            link.appendChild(
                number
            );


            link.appendChild(
                title
            );


            if (completed) {

                const icon =
                    document.createElement(
                        "i"
                    );


                icon.className =
                    "fa-solid fa-check";


                link.appendChild(
                    icon
                );

            }


            lessonModuleList.appendChild(
                link
            );

        }
    );

}


/* =========================================================
   RENDER LESSON
========================================================= */

function renderLesson() {

    if (
        !currentCourse ||
        !currentModule ||
        !currentLesson
    ) {

        return;

    }


    if (breadcrumbCourse) {

        breadcrumbCourse.textContent =
            currentCourse.title;

    }


    if (breadcrumbModule) {

        breadcrumbModule.textContent =
            currentModule.title;

    }


    if (lessonModuleNumber) {

        lessonModuleNumber.textContent =
            `MODULE ${String(
                currentModule.number
            ).padStart(
                2,
                "0"
            )}`;

    }


    if (lessonNumber) {

        lessonNumber.textContent =
            `LESSON ${String(
                currentLesson.number
            ).padStart(
                2,
                "0"
            )}`;

    }


    if (lessonTitle) {

        lessonTitle.textContent =
            currentLesson.title;

    }


    if (lessonDescription) {

        lessonDescription.textContent =
            currentLesson.description;

    }


    renderObjectives(
        currentLesson.objectives
    );


    renderLessonBody(
        currentLesson.content
    );


    updateProgressUI();

    updateCompleteButton();

    renderModuleList();

    updateNavigation();

}


/* =========================================================
   UPDATE NAVIGATION
========================================================= */

function updateNavigation() {

    if (
        !currentCourse ||
        !currentModule ||
        !currentLesson
    ) {

        return;

    }


    const previous =
        getPreviousLesson();


    const next =
        getNextLesson();


    /* =====================================================
       PREVIOUS
    ====================================================== */

    if (previousLessonBtn) {

        if (previous) {

            previousLessonBtn.hidden =
                false;


            previousLessonBtn.href =
                buildLessonUrl(
                    currentCourse.id,
                    previous.moduleId,
                    previous.lessonId
                );


            previousLessonBtn.removeAttribute(
                "aria-disabled"
            );

        } else {

            previousLessonBtn.hidden =
                true;

        }

    }


    /* =====================================================
       NEXT
    ====================================================== */

    if (nextLessonBtn) {

        if (next) {

            nextLessonBtn.hidden =
                false;


            nextLessonBtn.href =
                buildLessonUrl(
                    currentCourse.id,
                    next.moduleId,
                    next.lessonId
                );


            nextLessonBtn.removeAttribute(
                "aria-disabled"
            );

        } else {

            /*
               No next lesson means this is currently
               the final available lesson.
            */

            nextLessonBtn.hidden =
                false;


            nextLessonBtn.href =
                buildCourseDetailsUrl(
                    currentCourse.id
                );


            nextLessonBtn.innerHTML = `
                Finish Course
                <i class="fa-solid fa-arrow-right"></i>
            `;


            nextLessonBtn.setAttribute(
                "aria-label",
                "Return to course details"
            );

        }

    }

}


/* =========================================================
   RESET NEXT BUTTON
========================================================= */

function resetNextButton() {

    if (!nextLessonBtn) {

        return;

    }


    nextLessonBtn.innerHTML = `
        Next Lesson
        <i class="fa-solid fa-arrow-right"></i>
    `;


    nextLessonBtn.removeAttribute(
        "aria-label"
    );

}


/* =========================================================
   UPDATE COMPLETE BUTTON
========================================================= */

function updateCompleteButton() {

    if (
        !markCompleteBtn ||
        !currentLesson
    ) {

        return;

    }


    const completed =
        Array.isArray(
            currentProgress?.completedLessons
        ) &&
        currentProgress.completedLessons.includes(
            currentLesson.id
        );


    if (completed) {

        markCompleteBtn.classList.add(
            "completed"
        );


        markCompleteBtn.innerHTML = `
            <i class="fa-solid fa-check"></i>
            Lesson Completed
        `;


        markCompleteBtn.setAttribute(
            "aria-label",
            "Lesson completed"
        );

    } else {

        markCompleteBtn.classList.remove(
            "completed"
        );


        markCompleteBtn.innerHTML = `
            <i class="fa-solid fa-check"></i>
            Mark Lesson Complete
        `;


        markCompleteBtn.setAttribute(
            "aria-label",
            "Mark lesson complete"
        );

    }

}


/* =========================================================
   MARK LESSON COMPLETE
========================================================= */

async function markLessonComplete() {

    if (
        !currentLesson ||
        !currentModule ||
        !currentCourse
    ) {

        return;

    }


    if (!currentProgress) {

        currentProgress =
            getDefaultProgress();

    }


    if (
        !Array.isArray(
            currentProgress.completedLessons
        )
    ) {

        currentProgress.completedLessons =
            [];

    }


    if (
        !currentProgress.completedLessons.includes(
            currentLesson.id
        )
    ) {

        currentProgress.completedLessons.push(
            currentLesson.id
        );

    }


    currentProgress.currentModule =
        currentModule.id;


    currentProgress.currentLesson =
        currentLesson.id;


    currentProgress.started =
        true;


    currentProgress.progressPercent =
        calculateProgress();


    currentProgress.completed =
        currentProgress.progressPercent >=
        100;


    updateProgressUI();

    updateCompleteButton();

    renderModuleList();


    /*
       Save AFTER UI update.
    */

    await saveProgress();

}


/* =========================================================
   REMEMBER CURRENT LESSON
========================================================= */

async function rememberCurrentLesson() {

    if (
        !currentCourse ||
        !currentModule ||
        !currentLesson
    ) {

        return;

    }


    if (!currentProgress) {

        currentProgress =
            getDefaultProgress();

    }


    currentProgress.currentModule =
        currentModule.id;


    currentProgress.currentLesson =
        currentLesson.id;


    currentProgress.started =
        true;


    currentProgress.progressPercent =
        calculateProgress();


    await saveProgress();

}


/* =========================================================
   LOGOUT STATE
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


        window.location.replace(
            LOGIN_PATH
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
            LOGIN_PATH
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
   COMPLETE EVENT
========================================================= */

if (markCompleteBtn) {

    markCompleteBtn.addEventListener(
        "click",
        markLessonComplete
    );

}


/* =========================================================
   INTERNAL NAVIGATION
   ---------------------------------------------------------
   This makes navigation instant and prevents the browser
   from unnecessarily reloading the entire page.
========================================================= */

function navigateToLesson(
    moduleId,
    lessonId
) {

    if (!currentCourse) {

        return;

    }


    const module =
        findModule(
            currentCourse,
            moduleId
        );


    if (!module) {

        warn(
            "Navigation module not found:",
            moduleId
        );


        return;

    }


    const lesson =
        findLesson(
            module,
            lessonId
        );


    if (!lesson) {

        warn(
            "Navigation lesson not found:",
            lessonId
        );


        return;

    }


    navigationToken++;


    currentModule =
        module;


    currentLesson =
        lesson;


    if (!currentProgress) {

        currentProgress =
            getDefaultProgress();

    }


    currentProgress.currentModule =
        module.id;


    currentProgress.currentLesson =
        lesson.id;


    currentProgress.started =
        true;


    resetNextButton();


    renderLesson();


    showLessonContent();


    updateBrowserUrl(
        currentCourse.id,
        module.id,
        lesson.id,
        false
    );


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    /*
       Save in background.
    */

    rememberCurrentLesson()
        .catch(
            err => {

                error(
                    "Navigation progress save failed:",
                    err
                );

            }
        );

}


/* =========================================================
   INTERCEPT LESSON LINKS
   ---------------------------------------------------------
   Allows module list links to navigate without a full reload.
========================================================= */

if (lessonModuleList) {

    lessonModuleList.addEventListener(
        "click",
        event => {

            const link =
                event.target.closest(
                    "a.lesson-module-item"
                );


            if (!link) {

                return;

            }


            const url =
                new URL(
                    link.href,
                    window.location.href
                );


            const courseId =
                normalizeId(
                    url.searchParams.get(
                        "course"
                    )
                );


            const moduleId =
                normalizeId(
                    url.searchParams.get(
                        "module"
                    )
                );


            const lessonId =
                normalizeId(
                    url.searchParams.get(
                        "lesson"
                    )
                );


            if (
                courseId !==
                currentCourse?.id
            ) {

                return;

            }


            if (
                !moduleId ||
                !lessonId
            ) {

                return;

            }


            event.preventDefault();


            navigateToLesson(
                moduleId,
                lessonId
            );

        }
    );

}


/* =========================================================
   PREVIOUS BUTTON
========================================================= */

if (previousLessonBtn) {

    previousLessonBtn.addEventListener(
        "click",
        event => {

            const previous =
                getPreviousLesson();


            if (!previous) {

                event.preventDefault();

                return;

            }


            event.preventDefault();


            navigateToLesson(
                previous.moduleId,
                previous.lessonId
            );

        }
    );

}


/* =========================================================
   NEXT BUTTON
========================================================= */

if (nextLessonBtn) {

    nextLessonBtn.addEventListener(
        "click",
        event => {

            const next =
                getNextLesson();


            if (!next) {

                /*
                   Final lesson -> course details.
                */

                return;

            }


            event.preventDefault();


            navigateToLesson(
                next.moduleId,
                next.lessonId
            );

        }
    );

}


/* =========================================================
   LOAD LESSON FROM URL
========================================================= */

async function loadLessonFromUrl(
    options = {}
) {

    const {
        pushHistory = false
    } = options;


    const {
        courseId,
        moduleId,
        lessonId
    } =
        getUrlParameters();


    log(
        "Loading URL:",
        {
            courseId,
            moduleId,
            lessonId
        }
    );


    /* =====================================================
       COURSE
    ====================================================== */

    if (!courseId) {

        warn(
            "Missing course ID."
        );


        showLessonNotFound();

        return;

    }


    const course =
        findCourse(
            courseId
        );


    if (!course) {

        warn(
            "Course not found:",
            courseId
        );


        showLessonNotFound();

        return;

    }


    if (
        course.status !==
        "available"
    ) {

        warn(
            "Course unavailable:",
            courseId
        );


        showLessonNotFound();

        return;

    }


    /* =====================================================
       MODULE
    ====================================================== */

    if (!moduleId) {

        warn(
            "Missing module ID."
        );


        /*
           If there is no module at all, return to
           course details instead of hanging.
        */

        window.location.replace(
            buildCourseDetailsUrl(
                course.id
            )
        );


        return;

    }


    const module =
        findModule(
            course,
            moduleId
        );


    if (!module) {

        warn(
            "Module not found:",
            moduleId
        );


        showLessonNotFound();

        return;

    }


    /* =====================================================
       MODULE MUST HAVE LESSONS
    ====================================================== */

    if (
        !Array.isArray(
            module.lessons
        ) ||
        module.lessons.length === 0
    ) {

        warn(
            "This module has no lessons yet:",
            module.id
        );


        showLessonNotFound();

        return;

    }


    /* =====================================================
       SELECT LESSON
    ====================================================== */

    let selectedLessonId =
        lessonId;


    /*
       No lesson parameter means:
       automatically open lesson 01.
    */

    if (!selectedLessonId) {

        selectedLessonId =
            module.lessons[0].id;

    }


    const lesson =
        findLesson(
            module,
            selectedLessonId
        );


    if (!lesson) {

        warn(
            "Lesson not found:",
            selectedLessonId
        );


        showLessonNotFound();

        return;

    }


    /* =====================================================
       SET STATE
    ====================================================== */

    currentCourse =
        course;

    currentModule =
        module;

    currentLesson =
        lesson;


    if (!currentProgress) {

        currentProgress =
            getDefaultProgress();

    }


    currentProgress.currentModule =
        module.id;


    currentProgress.currentLesson =
        lesson.id;


    currentProgress.started =
        true;


    /* =====================================================
       RENDER IMMEDIATELY
    ====================================================== */

    resetNextButton();

    renderLesson();

    showLessonContent();


    /* =====================================================
       NORMALIZE URL
    ====================================================== */

    if (!lessonId) {

        updateBrowserUrl(
            course.id,
            module.id,
            lesson.id,
            true
        );

    } else if (pushHistory) {

        updateBrowserUrl(
            course.id,
            module.id,
            lesson.id,
            false
        );

    }


    log(
        "Lesson rendered:",
        lesson.title
    );


    /* =====================================================
       BACKGROUND PROGRESS
    ====================================================== */

    loadProgress()
        .catch(
            err => {

                error(
                    "Background progress load failed:",
                    err
                );

            }
        );


    rememberCurrentLesson()
        .catch(
            err => {

                error(
                    "Background lesson save failed:",
                    err
                );

            }
        );

}


/* =========================================================
   BROWSER BACK / FORWARD
========================================================= */

window.addEventListener(
    "popstate",
    () => {

        log(
            "Browser Back/Forward detected."
        );


        loadLessonFromUrl();

    }
);


/* =========================================================
   AUTHENTICATION
========================================================= */

if (!auth) {

    error(
        "Firebase Auth was not initialized."
    );


    showLessonNotFound();


    window.location.replace(
        LOGIN_PATH
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


            authResolved =
                true;


            /* =================================================
               NOT AUTHENTICATED
            ================================================== */

            if (!user) {

                currentUser =
                    null;


                const {
                    courseId,
                    moduleId,
                    lessonId
                } =
                    getUrlParameters();


                window.location.replace(
                    buildLoginUrl(
                        courseId,
                        moduleId,
                        lessonId
                    )
                );


                return;

            }


            /* =================================================
               AUTHENTICATED
            ================================================== */

            currentUser =
                user;


            displayStudent(
                user
            );


            showLoading();


            await loadLessonFromUrl();

        }
    );

}


/* =========================================================
   AUTH SAFETY TIMEOUT
========================================================= */

setTimeout(
    () => {

        if (
            !authResolved &&
            lessonLoading &&
            !lessonLoading.hidden
        ) {

            error(
                "Firebase Authentication did not resolve."
            );


            showLessonNotFound();

        }

    },
    10000
);


/* =========================================================
   INITIAL LOG
========================================================= */

log(
    "lesson.js loaded successfully."
);
