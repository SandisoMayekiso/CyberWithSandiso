/* =========================================================
   CWS ACADEMY
   LESSON SYSTEM
   ---------------------------------------------------------
   Firebase Authentication + Firestore Progress

   SUPPORTED URL FORMATS:

   1. Start module:
      lesson.html
      ?course=cybersecurity-fundamentals
      &module=module-01

      Automatically opens lesson-01.

   2. Specific lesson:
      lesson.html
      ?course=cybersecurity-fundamentals
      &module=module-01
      &lesson=lesson-02

   IMPORTANT:
   The lesson itself does NOT depend on Firestore.
   Firestore progress is loaded/saved in the background.
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
   DEBUG
========================================================= */

const DEBUG = true;

const FIRESTORE_TIMEOUT = 8000;

const LOGIN_PATH = "../pages/login.html";


function log(...messages) {

    if (DEBUG) {

        console.log(
            "[CWS Lesson]",
            ...messages
        );

    }

}


function warn(...messages) {

    if (DEBUG) {

        console.warn(
            "[CWS Lesson]",
            ...messages
        );

    }

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

let lessonInitialized = false;


/* =========================================================
   COURSE CONTENT
========================================================= */

const courses = {

    "cybersecurity-fundamentals": {

        id: "cybersecurity-fundamentals",

        title: "Cybersecurity Fundamentals",

        status: "available",

        modules: [

            {
                id: "module-01",

                number: 1,

                title: "Introduction to Cybersecurity",

                description:
                    "Understand what cybersecurity is, why it matters and how security professionals protect digital systems.",

                lessons: [

                    {
                        id: "lesson-01",

                        number: 1,

                        title: "What Is Cybersecurity?",

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

                                text: "Understanding Cybersecurity"
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

                                text: "What Does Cybersecurity Protect?"
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

                                text: "Why Cybersecurity Matters"
                            },

                            {
                                type: "paragraph",

                                text:
                                    "A security incident can have serious consequences. Attackers may steal information, disrupt services, compromise accounts or damage systems. Cybersecurity helps organizations reduce these risks and respond when security incidents occur."
                            },

                            {
                                type: "callout",

                                title: "Key Idea",

                                text:
                                    "Cybersecurity is not simply about installing antivirus software or building firewalls. It is a broader discipline involving people, processes and technology."
                            }

                        ]

                    },


                    {
                        id: "lesson-02",

                        number: 2,

                        title: "Why Cybersecurity Matters",

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

                                text: "The Importance of Security"
                            },

                            {
                                type: "paragraph",

                                text:
                                    "Cybersecurity is important because digital systems have become essential to everyday life. Organizations rely on technology to communicate, process payments, store information and provide services."
                            },

                            {
                                type: "heading",

                                text: "Consequences of Security Incidents"
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

                                title: "Security Principle",

                                text:
                                    "Good cybersecurity reduces the likelihood and impact of security incidents."
                            }

                        ]

                    },


                    {
                        id: "lesson-03",

                        number: 3,

                        title: "The Cybersecurity Landscape",

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

                                text: "A Changing Environment"
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

                                text: "Attackers and Defenders"
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

                        title: "The Security Mindset",

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

                                text: "Thinking Like a Security Professional"
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

                                text: "Ethical Responsibility"
                            },

                            {
                                type: "paragraph",

                                text:
                                    "Security knowledge must be used responsibly. Testing systems without authorization can cause damage and may be illegal. Professional cybersecurity work requires permission, clearly defined scope and responsible handling of information."
                            },

                            {
                                type: "callout",

                                title: "Remember",

                                text:
                                    "Authorization comes before security testing."
                            }

                        ]

                    }

                ]

            }

        ]

    }

};


/* =========================================================
   URL PARAMETERS
========================================================= */

function getUrlParameters() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    return {

        courseId:
            (
                params.get("course") ||
                ""
            )
                .trim()
                .toLowerCase(),

        moduleId:
            (
                params.get("module") ||
                ""
            )
                .trim()
                .toLowerCase(),

        lessonId:
            (
                params.get("lesson") ||
                ""
            )
                .trim()
                .toLowerCase()

    };

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

        lessonLoading.hidden = false;

    }

    if (lessonNotFound) {

        lessonNotFound.hidden = true;

    }

    if (lessonContent) {

        lessonContent.hidden = true;

    }

}


function showLessonNotFound() {

    if (lessonLoading) {

        lessonLoading.hidden = true;

    }

    if (lessonContent) {

        lessonContent.hidden = true;

    }

    if (lessonNotFound) {

        lessonNotFound.hidden = false;

    }

}


function showLessonContent() {

    if (lessonLoading) {

        lessonLoading.hidden = true;

    }

    if (lessonNotFound) {

        lessonNotFound.hidden = true;

    }

    if (lessonContent) {

        lessonContent.hidden = false;

    }

}


/* =========================================================
   FIND COURSE
========================================================= */

function findCourse(courseId) {

    return courses[courseId] || null;

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
        ) || null
    );

}


/* =========================================================
   FIND LESSON
========================================================= */

function findLesson(
    module,
    lessonId
) {

    if (!module) {

        return null;

    }

    return (
        module.lessons.find(
            lesson =>
                lesson.id === lessonId
        ) || null
    );

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
   ALL LESSONS
========================================================= */

function getAllLessons(course) {

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

        started:
            true,

        completed:
            false,

        progressPercent:
            0

    };

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
   TIMEOUT WRAPPER
========================================================= */

function withTimeout(
    promise,
    timeout = FIRESTORE_TIMEOUT
) {

    return Promise.race([

        promise,

        new Promise(
            (_, reject) => {

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

            }
        )

    ]);

}


/* =========================================================
   LOAD PROGRESS
   ---------------------------------------------------------
   IMPORTANT:
   Failure here MUST NOT prevent the lesson from rendering.
========================================================= */

async function loadProgress() {

    currentProgress =
        getDefaultProgress();


    if (!db) {

        warn(
            "Firestore unavailable. Using default progress."
        );

        return;

    }


    if (!currentUser) {

        warn(
            "No authenticated user. Using default progress."
        );

        return;

    }


    const progressRef =
        getProgressRef();


    if (!progressRef) {

        warn(
            "Progress reference unavailable."
        );

        return;

    }


    try {

        const snapshot =
            await withTimeout(
                getDoc(
                    progressRef
                )
            );


        if (snapshot.exists()) {

            currentProgress = {

                ...getDefaultProgress(),

                ...snapshot.data()

            };

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
            !Array.isArray(
                currentProgress.completedLabs
            )
        ) {

            currentProgress.completedLabs =
                [];

        }


        if (
            !Array.isArray(
                currentProgress.completedAssessments
            )
        ) {

            currentProgress.completedAssessments =
                [];

        }


        log(
            "Progress loaded successfully."
        );


        updateProgressUI();

        updateCompleteButton();

        renderModuleList();


    } catch (err) {

        error(
            "Progress could not be loaded:",
            err
        );


        /*
           CRITICAL:
           Keep the lesson functional.
        */

        currentProgress =
            getDefaultProgress();


        updateProgressUI();

        updateCompleteButton();

        renderModuleList();

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
            "Progress saved successfully."
        );


        return true;

    } catch (err) {

        error(
            "Unable to save progress:",
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

    const completed =
        currentProgress
            ?.completedLessons
            ?.length || 0;


    if (!total) {

        return 0;

    }

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


    if (lessonProgressText) {

        const completed =
            currentProgress
                ?.completedLessons
                ?.length || 0;

        const total =
            getTotalLessons(
                currentCourse
            );


        lessonProgressText.textContent =
            `${completed} of ${total} lessons completed`;

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


    content.forEach(
        block => {

            let element = null;


            switch (block.type) {

                case "heading":

                    element =
                        document.createElement(
                            "h2"
                        );

                    element.textContent =
                        block.text;

                    break;


                case "paragraph":

                    element =
                        document.createElement(
                            "p"
                        );

                    element.textContent =
                        block.text;

                    break;


                case "list":

                    element =
                        document.createElement(
                            "ul"
                        );


                    (
                        block.items ||
                        []
                    ).forEach(
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

                    break;


                case "callout":

                    element =
                        document.createElement(
                            "aside"
                        );


                    element.className =
                        "lesson-callout";


                    const calloutTitle =
                        document.createElement(
                            "strong"
                        );


                    calloutTitle.textContent =
                        block.title ||
                        "Important";


                    const calloutText =
                        document.createElement(
                            "p"
                        );


                    calloutText.textContent =
                        block.text;


                    element.appendChild(
                        calloutTitle
                    );


                    element.appendChild(
                        calloutText
                    );

                    break;


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
   BUILD LESSON URL
========================================================= */

function buildLessonUrl(
    courseId,
    moduleId,
    lessonId
) {

    return (
        `lesson.html?course=${encodeURIComponent(
            courseId
        )}` +
        `&module=${encodeURIComponent(
            moduleId
        )}` +
        `&lesson=${encodeURIComponent(
            lessonId
        )}`
    );

}


/* =========================================================
   UPDATE BROWSER URL
========================================================= */

function updateBrowserUrl(
    courseId,
    moduleId,
    lessonId
) {

    const newUrl =
        buildLessonUrl(
            courseId,
            moduleId,
            lessonId
        );


    if (
        window.location.pathname.endsWith(
            "lesson.html"
        )
    ) {

        window.history.replaceState(
            {},
            "",
            newUrl
        );

    }

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


    if (
        !currentModule ||
        !Array.isArray(
            currentModule.lessons
        ) ||
        !currentLesson
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


            if (
                lesson.id ===
                currentLesson.id
            ) {

                link.classList.add(
                    "active"
                );

            }


            const completed =
                currentProgress
                    ?.completedLessons
                    ?.includes(
                        lesson.id
                    );


            if (completed) {

                link.classList.add(
                    "completed"
                );

            }


            link.href =
                buildLessonUrl(
                    currentCourse.id,
                    currentModule.id,
                    lesson.id
                );


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

    renderModuleList();

    updateNavigation();

    updateCompleteButton();

}


/* =========================================================
   NAVIGATION
========================================================= */

function updateNavigation() {

    if (!currentCourse || !currentModule || !currentLesson) {

        return;

    }


    const lessons =
        getAllLessons(
            currentCourse
        );


    const currentIndex =
        lessons.findIndex(
            lesson =>
                lesson.moduleId ===
                    currentModule.id &&
                lesson.lessonId ===
                    currentLesson.id
        );


    const previous =
        currentIndex > 0
            ? lessons[
                currentIndex - 1
            ]
            : null;


    const next =
        currentIndex >= 0 &&
        currentIndex <
            lessons.length - 1
            ? lessons[
                currentIndex + 1
            ]
            : null;


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

        } else {

            previousLessonBtn.hidden =
                true;

        }

    }


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

        } else {

            nextLessonBtn.hidden =
                true;

        }

    }

}


/* =========================================================
   UPDATE COMPLETE BUTTON
========================================================= */

function updateCompleteButton() {

    if (!markCompleteBtn || !currentLesson) {

        return;

    }


    const completed =
        currentProgress
            ?.completedLessons
            ?.includes(
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
        !currentProgress
    ) {

        return;

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


    if (
        currentProgress.progressPercent >=
        100
    ) {

        currentProgress.completed =
            true;

    }


    updateProgressUI();

    updateCompleteButton();

    renderModuleList();


    /*
       Save in background.
       The UI is already updated.
    */

    const saveResult =
        await saveProgress();


    if (saveResult) {

        log(
            "Lesson completed and progress saved:",
            currentLesson.id
        );

    } else {

        warn(
            "Lesson marked complete locally, but Firestore save failed."
        );

    }

}


/* =========================================================
   REMEMBER CURRENT LESSON
========================================================= */

async function rememberCurrentLesson() {

    if (
        !currentProgress ||
        !currentModule ||
        !currentLesson
    ) {

        return;

    }


    currentProgress.currentModule =
        currentModule.id;


    currentProgress.currentLesson =
        currentLesson.id;


    currentProgress.started =
        true;


    /*
       IMPORTANT:
       This runs after the lesson is displayed.
    */

    await saveProgress();

}


/* =========================================================
   LOGOUT BUTTON STATE
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
   LOAD LESSON
========================================================= */

async function loadLesson() {

    if (lessonInitialized) {

        log(
            "Lesson already initialized. Skipping duplicate load."
        );

        return;

    }


    showLoading();


    const {
        courseId,
        moduleId,
        lessonId
    } =
        getUrlParameters();


    log(
        "Requested URL parameters:",
        {
            courseId,
            moduleId,
            lessonId
        }
    );


    /* =====================================================
       VALIDATE COURSE
    ====================================================== */

    if (!courseId) {

        warn(
            "No course ID supplied."
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


    /* =====================================================
       VALIDATE MODULE
    ====================================================== */

    if (!moduleId) {

        warn(
            "No module ID supplied."
        );


        showLessonNotFound();

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
       SELECT LESSON
    ====================================================== */

    let selectedLessonId =
        lessonId;


    if (!selectedLessonId) {

        if (
            Array.isArray(
                module.lessons
            ) &&
            module.lessons.length > 0
        ) {

            selectedLessonId =
                module.lessons[0].id;


            log(
                "No lesson supplied.",
                "Automatically starting:",
                selectedLessonId
            );

        } else {

            warn(
                "Module contains no lessons:",
                module.id
            );


            showLessonNotFound();

            return;

        }

    }


    /* =====================================================
       FIND LESSON
    ====================================================== */

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
       SET CURRENT STATE
    ====================================================== */

    currentCourse =
        course;

    currentModule =
        module;

    currentLesson =
        lesson;


    currentProgress =
        getDefaultProgress();


    log(
        "Current lesson:",
        {
            course:
                currentCourse.id,

            module:
                currentModule.id,

            lesson:
                currentLesson.id
        }
    );


    /* =====================================================
       RENDER IMMEDIATELY
       -----------------------------------------------------
       THIS IS THE CRITICAL FIX.
       
       The student sees the lesson before Firestore
       operations occur.
    ====================================================== */

    renderLesson();

    showLessonContent();


    lessonInitialized =
        true;


    /* =====================================================
       NORMALIZE URL
    ====================================================== */

    if (!lessonId) {

        updateBrowserUrl(
            currentCourse.id,
            currentModule.id,
            currentLesson.id
        );

    }


    log(
        "Lesson displayed successfully:",
        currentLesson.title
    );


    /* =====================================================
       FIRESTORE IN BACKGROUND
       -----------------------------------------------------
       Neither operation can block the lesson UI.
    ====================================================== */

    loadProgress()
        .then(
            () => {

                /*
                   Progress loaded after lesson display.
                   Refresh only progress-related UI.
                */

                updateProgressUI();

                updateCompleteButton();

                renderModuleList();

            }
        )
        .catch(
            err => {

                error(
                    "Background progress loading failed:",
                    err
                );

            }
        );


    /*
       Remember the lesson in the background.
    */

    rememberCurrentLesson()
        .catch(
            err => {

                error(
                    "Background lesson tracking failed:",
                    err
                );

            }
        );

}


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
                "Authentication:",
                user
                    ? "AUTHENTICATED"
                    : "NOT AUTHENTICATED"
            );


            authResolved =
                true;


            /* =================================================
               USER NOT AUTHENTICATED
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


                const redirectUrl =
                    `${LOGIN_PATH}?redirect=lesson` +
                    `&course=${encodeURIComponent(
                        courseId
                    )}` +
                    `&module=${encodeURIComponent(
                        moduleId
                    )}` +
                    `&lesson=${encodeURIComponent(
                        lessonId
                    )}`;


                window.location.replace(
                    redirectUrl
                );


                return;

            }


            /* =================================================
               USER AUTHENTICATED
            ================================================== */

            currentUser =
                user;


            displayStudent(
                user
            );


            await loadLesson();

        }
    );

}


/* =========================================================
   AUTH SAFETY TIMEOUT
   ---------------------------------------------------------
   Prevents a blank endless loading screen if Firebase Auth
   fails to resolve for some unexpected reason.
========================================================= */

setTimeout(
    () => {

        if (
            !authResolved &&
            lessonLoading &&
            !lessonLoading.hidden
        ) {

            error(
                "Firebase Authentication did not resolve within the expected time."
            );


            /*
               Don't leave the student staring at a spinner.
            */

            showLessonNotFound();

        }

    },
    10000
);


/* =========================================================
   BROWSER BACK/FORWARD
========================================================= */

window.addEventListener(
    "popstate",
    () => {

        log(
            "Browser navigation detected."
        );


        lessonInitialized =
            false;


        loadLesson();

    }
);


/* =========================================================
   INITIAL LOAD
========================================================= */

log(
    "lesson.js loaded successfully."
);
