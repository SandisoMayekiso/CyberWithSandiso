/* =========================================================
   CWS ACADEMY
   NETWORKING FUNDAMENTALS

   Firebase Authentication
   Firestore Progress
   10 Module Networking Curriculum
========================================================= */


import {

    onAuthStateChanged,

    signOut

} from
"https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";


import {

    doc,

    getDoc,

    setDoc,

    serverTimestamp

} from
"https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";


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

        console.log(
            "[CWS Networking]",
            ...args
        );

    }

}


function warn(...args) {

    if (DEBUG) {

        console.warn(
            "[CWS Networking]",
            ...args
        );

    }

}


function error(...args) {

    console.error(
        "[CWS Networking]",
        ...args
    );

}


/* =========================================================
   ELEMENTS
========================================================= */

const studentName =
    document.getElementById(
        "studentName"
    );


const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );


const courseLoading =
    document.getElementById(
        "courseLoading"
    );


const courseError =
    document.getElementById(
        "courseError"
    );


const courseContent =
    document.getElementById(
        "courseContent"
    );


const startCourseBtn =
    document.getElementById(
        "startCourseBtn"
    );


const courseModules =
    document.getElementById(
        "courseModules"
    );


const lessonCount =
    document.getElementById(
        "lessonCount"
    );


const courseProgressPercent =
    document.getElementById(
        "courseProgressPercent"
    );


const courseProgressFill =
    document.getElementById(
        "courseProgressFill"
    );


const courseProgressText =
    document.getElementById(
        "courseProgressText"
    );


/* =========================================================
   STATE
========================================================= */

let currentUser = null;

let currentProgress = null;


/* =========================================================
   COURSE
========================================================= */

const course = {

    id:
        "networking-fundamentals",

    title:
        "Networking Fundamentals",

    level:
        "Beginner",

    totalLabs:
        8,

    totalAssessments:
        10,

    modules: [


        /* =================================================
           MODULE 01
        ================================================= */

        {

            id:
                "module-01",

            number:
                1,

            title:
                "Networking Foundations",

            description:
                "Understand how networks work, network types, devices, communication models and the cybersecurity importance of network visibility.",

            lessons: [

                {
                    id: "lesson-01",
                    title: "What Is a Computer Network?"
                },

                {
                    id: "lesson-02",
                    title: "LAN, WAN and Network Types"
                },

                {
                    id: "lesson-03",
                    title: "Network Devices"
                },

                {
                    id: "lesson-04",
                    title: "OSI and TCP/IP Models"
                }

            ],

            labs: 0,

            assessments: 1

        },


        /* =================================================
           MODULE 02
        ================================================= */

        {

            id:
                "module-02",

            number:
                2,

            title:
                "IP Addressing",

            description:
                "Learn how IPv4 addresses identify hosts and networks, including public, private, loopback and special-purpose addresses.",

            lessons: [

                {
                    id: "lesson-01",
                    title: "Understanding IPv4"
                },

                {
                    id: "lesson-02",
                    title: "Network and Host Portions"
                },

                {
                    id: "lesson-03",
                    title: "Public and Private IP Addresses"
                },

                {
                    id: "lesson-04",
                    title: "IPv4 from a Security Perspective"
                }

            ],

            labs: 1,

            assessments: 1

        },


        /* =================================================
           MODULE 03
        ================================================= */

        {

            id:
                "module-03",

            number:
                3,

            title:
                "Subnetting and CIDR",

            description:
                "Understand subnet masks, CIDR notation, network ranges and how segmentation improves network design and security.",

            lessons: [

                {
                    id: "lesson-01",
                    title: "Understanding Subnet Masks"
                },

                {
                    id: "lesson-02",
                    title: "CIDR Notation"
                },

                {
                    id: "lesson-03",
                    title: "Network and Broadcast Addresses"
                },

                {
                    id: "lesson-04",
                    title: "Subnetting for Network Security"
                }

            ],

            labs: 1,

            assessments: 1

        },


        /* =================================================
           MODULE 04
        ================================================= */

        {

            id:
                "module-04",

            number:
                4,

            title:
                "Ethernet, MAC Addresses and ARP",

            description:
                "Learn how devices communicate on local networks using Ethernet frames, MAC addresses and the Address Resolution Protocol.",

            lessons: [

                {
                    id: "lesson-01",
                    title: "Ethernet Fundamentals"
                },

                {
                    id: "lesson-02",
                    title: "MAC Addresses"
                },

                {
                    id: "lesson-03",
                    title: "Understanding ARP"
                },

                {
                    id: "lesson-04",
                    title: "ARP Security Risks"
                }

            ],

            labs: 1,

            assessments: 1

        },


        /* =================================================
           MODULE 05
        ================================================= */

        {

            id:
                "module-05",

            number:
                5,

            title:
                "TCP and UDP",

            description:
                "Understand transport-layer communication, TCP connections, UDP datagrams, ports and the cybersecurity relevance of exposed services.",

            lessons: [

                {
                    id: "lesson-01",
                    title: "Transport Layer Fundamentals"
                },

                {
                    id: "lesson-02",
                    title: "TCP and the Three-Way Handshake"
                },

                {
                    id: "lesson-03",
                    title: "Understanding UDP"
                },

                {
                    id: "lesson-04",
                    title: "Ports and Services"
                },

                {
                    id: "lesson-05",
                    title: "TCP and UDP in Cybersecurity"
                }

            ],

            labs: 1,

            assessments: 1

        },


        /* =================================================
           MODULE 06
        ================================================= */

        {

            id:
                "module-06",

            number:
                6,

            title:
                "ICMP and Network Diagnostics",

            description:
                "Understand ICMP, ping, traceroute and how diagnostic network protocols are used by administrators, defenders and security testers.",

            lessons: [

                {
                    id: "lesson-01",
                    title: "Understanding ICMP"
                },

                {
                    id: "lesson-02",
                    title: "Ping"
                },

                {
                    id: "lesson-03",
                    title: "Traceroute"
                },

                {
                    id: "lesson-04",
                    title: "ICMP Security Considerations"
                }

            ],

            labs: 1,

            assessments: 1

        },


        /* =================================================
           MODULE 07
        ================================================= */

        {

            id:
                "module-07",

            number:
                7,

            title:
                "Routing and Network Communication",

            description:
                "Learn how routers, gateways and routing tables move packets between networks and why routing is important to network security.",

            lessons: [

                {
                    id: "lesson-01",
                    title: "What Is Routing?"
                },

                {
                    id: "lesson-02",
                    title: "Default Gateways"
                },

                {
                    id: "lesson-03",
                    title: "Routing Tables"
                },

                {
                    id: "lesson-04",
                    title: "Static and Dynamic Routing"
                },

                {
                    id: "lesson-05",
                    title: "Routing from a Security Perspective"
                }

            ],

            labs: 1,

            assessments: 1

        },


        /* =================================================
           MODULE 08
        ================================================= */

        {

            id:
                "module-08",

            number:
                8,

            title:
                "DNS and DHCP",

            description:
                "Understand automatic network configuration and domain-name resolution, including the security risks associated with DNS and DHCP.",

            lessons: [

                {
                    id: "lesson-01",
                    title: "Introduction to DNS"
                },

                {
                    id: "lesson-02",
                    title: "DNS Records"
                },

                {
                    id: "lesson-03",
                    title: "How DNS Resolution Works"
                },

                {
                    id: "lesson-04",
                    title: "Understanding DHCP"
                },

                {
                    id: "lesson-05",
                    title: "DNS and DHCP Security"
                }

            ],

            labs: 1,

            assessments: 1

        },


        /* =================================================
           MODULE 09
        ================================================= */

        {

            id:
                "module-09",

            number:
                9,

            title:
                "HTTP, HTTPS and Web Traffic",

            description:
                "Understand how browsers and servers communicate, HTTP requests and responses, TLS encryption and common web traffic security considerations.",

            lessons: [

                {
                    id: "lesson-01",
                    title: "Introduction to HTTP"
                },

                {
                    id: "lesson-02",
                    title: "HTTP Requests and Responses"
                },

                {
                    id: "lesson-03",
                    title: "HTTP Methods and Status Codes"
                },

                {
                    id: "lesson-04",
                    title: "HTTPS and TLS"
                },

                {
                    id: "lesson-05",
                    title: "Web Traffic from a Security Perspective"
                }

            ],

            labs: 1,

            assessments: 1

        },


        /* =================================================
           MODULE 10
        ================================================= */

        {

            id:
                "module-10",

            number:
                10,

            title:
                "Network Security and Final Review",

            description:
                "Bring networking concepts together and examine firewalls, segmentation, network monitoring, packet analysis and secure network architecture.",

            lessons: [

                {
                    id: "lesson-01",
                    title: "Network Segmentation"
                },

                {
                    id: "lesson-02",
                    title: "Firewalls"
                },

                {
                    id: "lesson-03",
                    title: "IDS and IPS"
                },

                {
                    id: "lesson-04",
                    title: "Packet Analysis"
                },

                {
                    id: "lesson-05",
                    title: "Networking Fundamentals Review"
                }

            ],

            labs: 1,

            assessments: 1

        }

    ]

};


/* =========================================================
   USER NAME
========================================================= */

function getUserName(user) {

    if (!user) {

        return "Student";

    }


    if (
        typeof user.displayName ===
            "string" &&
        user.displayName.trim()
    ) {

        return user.displayName.trim();

    }


    if (
        typeof user.email === "string" &&
        user.email.includes("@")
    ) {

        const rawName =

            user.email

                .split("@")[0]

                .replace(
                    /[._-]+/g,
                    " "
                )

                .trim();


        if (rawName) {

            return rawName

                .split(" ")

                .map(
                    word =>

                        word.charAt(0)
                            .toUpperCase() +

                        word.slice(1)
                )

                .join(" ");

        }

    }


    return "Student";

}


/* =========================================================
   PAGE STATE
========================================================= */

function showLoading() {

    if (courseLoading) {

        courseLoading.hidden =
            false;

    }


    if (courseError) {

        courseError.hidden =
            true;

    }


    if (courseContent) {

        courseContent.hidden =
            true;

    }

}


function showError() {

    if (courseLoading) {

        courseLoading.hidden =
            true;

    }


    if (courseContent) {

        courseContent.hidden =
            true;

    }


    if (courseError) {

        courseError.hidden =
            false;

    }

}


function showContent() {

    if (courseLoading) {

        courseLoading.hidden =
            true;

    }


    if (courseError) {

        courseError.hidden =
            true;

    }


    if (courseContent) {

        courseContent.hidden =
            false;

    }

}


/* =========================================================
   TOTAL LESSONS
========================================================= */

function getTotalLessons() {

    return course.modules.reduce(

        (
            total,
            module
        ) =>

            total +
            module.lessons.length,

        0

    );

}


/* =========================================================
   LESSON KEY
========================================================= */

function buildLessonKey(
    moduleId,
    lessonId
) {

    return (
        `${moduleId}:${lessonId}`
    );

}


/* =========================================================
   LESSON URL
========================================================= */

function buildLessonUrl(
    moduleId,
    lessonId
) {

    const params =
        new URLSearchParams();


    params.set(
        "course",
        course.id
    );


    params.set(
        "module",
        moduleId
    );


    params.set(
        "lesson",
        lessonId
    );


    return (
        `lesson.html?${params.toString()}`
    );

}


/* =========================================================
   DEFAULT PROGRESS
========================================================= */

function getDefaultProgress() {

    return {

        courseId:
            course.id,

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
   FIRESTORE REF
========================================================= */

function getProgressRef() {

    if (
        !db ||
        !currentUser
    ) {

        return null;

    }


    return doc(

        db,

        "users",

        currentUser.uid,

        "courseProgress",

        course.id

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


        if (
            !Array.isArray(
                currentProgress
                    .completedLessons
            )
        ) {

            currentProgress
                .completedLessons =
                    [];

        }


        log(
            "Progress loaded:",
            currentProgress
        );


    } catch (err) {

        error(
            "Progress load failed:",
            err
        );


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
        !currentProgress
    ) {

        return;

    }


    try {

        await setDoc(

            getProgressRef(),

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
            "Progress save failed:",
            err
        );

    }

}


/* =========================================================
   CALCULATE PROGRESS
========================================================= */

function calculateProgress() {

    const total =
        getTotalLessons();


    if (!total) {

        return 0;

    }


    const completed =
        currentProgress
            ?.completedLessons
            ?.length || 0;


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
   UPDATE PROGRESS
========================================================= */

function updateProgressUI() {

    if (!currentProgress) {

        return;

    }


    const percentage =
        calculateProgress();


    currentProgress
        .progressPercent =
            percentage;


    if (courseProgressPercent) {

        courseProgressPercent
            .textContent =
                `${percentage}%`;

    }


    if (courseProgressFill) {

        courseProgressFill
            .style.width =
                `${percentage}%`;

    }


    const progressBar =

        document.querySelector(
            ".network-progress-bar"
        );


    if (progressBar) {

        progressBar.setAttribute(

            "aria-valuenow",

            String(percentage)

        );

    }


    if (!courseProgressText) {

        return;

    }


    const completed =

        currentProgress
            .completedLessons
            .length;


    const total =
        getTotalLessons();


    if (percentage === 0) {

        courseProgressText
            .textContent =

                "Start Module 1 to begin your networking journey.";

    }

    else if (percentage < 100) {

        courseProgressText
            .textContent =

                `${completed} of ${total} lessons completed. Keep building your networking skills.`;

    }

    else {

        courseProgressText
            .textContent =

                "Networking Fundamentals completed. Excellent work!";

    }

}


/* =========================================================
   META ITEM
========================================================= */

function createMeta(
    iconClass,
    text
) {

    const span =
        document.createElement(
            "span"
        );


    const icon =
        document.createElement(
            "i"
        );


    icon.className =
        iconClass;


    span.appendChild(
        icon
    );


    span.appendChild(

        document.createTextNode(
            text
        )

    );


    return span;

}


/* =========================================================
   MODULE COMPLETION
========================================================= */

function isModuleCompleted(
    module
) {

    if (!currentProgress) {

        return false;

    }


    return module.lessons.every(

        lesson =>

            currentProgress
                .completedLessons
                .includes(

                    buildLessonKey(
                        module.id,
                        lesson.id
                    )

                )

    );

}


/* =========================================================
   RENDER MODULES
========================================================= */

function renderModules() {

    if (!courseModules) {

        return;

    }


    courseModules.innerHTML =
        "";


    course.modules.forEach(
        module => {


            const article =
                document.createElement(
                    "article"
                );


            article.className =
                "network-module";


            if (
                isModuleCompleted(module)
            ) {

                article.classList.add(
                    "completed"
                );

            }


            /* =============================================
               HEADER
            ============================================== */

            const header =
                document.createElement(
                    "div"
                );


            header.className =
                "network-module-header";


            /* NUMBER */

            const number =
                document.createElement(
                    "div"
                );


            number.className =
                "network-module-number";


            number.textContent =

                String(module.number)
                    .padStart(
                        2,
                        "0"
                    );


            /* CONTENT */

            const content =
                document.createElement(
                    "div"
                );


            content.className =
                "network-module-content";


            const title =
                document.createElement(
                    "h3"
                );


            title.textContent =
                module.title;


            const description =
                document.createElement(
                    "p"
                );


            description.textContent =
                module.description;


            const meta =
                document.createElement(
                    "div"
                );


            meta.className =
                "network-module-meta";


            meta.appendChild(

                createMeta(

                    "fa-solid fa-book-open",

                    `${module.lessons.length} Lessons`

                )

            );


            meta.appendChild(

                createMeta(

                    "fa-solid fa-flask",

                    `${module.labs} Lab${module.labs === 1 ? "" : "s"}`

                )

            );


            meta.appendChild(

                createMeta(

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


            /* ACTION */

            const action =
                document.createElement(
                    "a"
                );


            action.className =
                "network-module-action";


            action.href =
                buildLessonUrl(

                    module.id,

                    module.lessons[0]
                        .id

                );


            const completed =
                isModuleCompleted(
                    module
                );


            if (completed) {

                action.innerHTML = `

                    Review Module

                    <i class="fa-solid fa-rotate-right"></i>

                `;

            }

            else {

                action.innerHTML = `

                    Start Module

                    <i class="fa-solid fa-arrow-right"></i>

                `;

            }


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
   START / CONTINUE COURSE
========================================================= */

async function startCourse() {

    if (!currentProgress) {

        currentProgress =
            getDefaultProgress();

    }


    currentProgress.started =
        true;


    let moduleId =

        currentProgress
            .currentModule ||

        "module-01";


    let lessonId =

        currentProgress
            .currentLesson ||

        "lesson-01";


    const targetModule =

        course.modules.find(

            module =>
                module.id ===
                moduleId

        );


    if (!targetModule) {

        moduleId =
            "module-01";

        lessonId =
            "lesson-01";

    }


    const verifiedModule =

        course.modules.find(

            module =>
                module.id ===
                moduleId

        );


    const lessonExists =

        verifiedModule?.lessons.some(

            lesson =>
                lesson.id ===
                lessonId

        );


    if (!lessonExists) {

        lessonId =
            verifiedModule
                ?.lessons[0]
                ?.id ||
            "lesson-01";

    }


    currentProgress.currentModule =
        moduleId;


    currentProgress.currentLesson =
        lessonId;


    const lessonUrl =
        buildLessonUrl(
            moduleId,
            lessonId
        );


    /*
       Save, but navigation should not
       depend on Firestore succeeding.
    */

    saveProgress()
        .catch(
            err =>
                error(
                    "Background save failed:",
                    err
                )
        );


    window.location.href =
        lessonUrl;

}


/* =========================================================
   LOAD COURSE
========================================================= */

async function loadCourse() {

    try {

        showLoading();


        if (lessonCount) {

            lessonCount.textContent =

                `${getTotalLessons()} Lessons`;

        }


        await loadProgress();


        renderModules();


        showContent();


        log(
            "Networking Fundamentals loaded."
        );


    } catch (err) {

        error(
            "Course load failed:",
            err
        );


        showError();

    }

}


/* =========================================================
   LOGOUT
========================================================= */

async function logout() {

    if (!auth) {

        return;

    }


    try {

        if (logoutBtn) {

            logoutBtn.disabled =
                true;

        }


        await signOut(auth);


        window.location.replace(
            "../pages/login.html"
        );


    } catch (err) {

        error(
            "Logout failed:",
            err
        );


        if (logoutBtn) {

            logoutBtn.disabled =
                false;

        }


        alert(
            "Unable to sign out. Please try again."
        );

    }

}


/* =========================================================
   EVENTS
========================================================= */

if (startCourseBtn) {

    startCourseBtn.addEventListener(

        "click",

        startCourse

    );

}


if (logoutBtn) {

    logoutBtn.addEventListener(

        "click",

        logout

    );

}


/* =========================================================
   AUTH
========================================================= */

if (!auth) {

    error(
        "Firebase Authentication is unavailable."
    );


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

                    "../pages/login.html?redirect=networking-fundamentals"

                );


                return;

            }


            currentUser =
                user;


            if (studentName) {

                studentName.textContent =
                    getUserName(
                        user
                    );

            }


            await loadCourse();

        }

    );

}


/* =========================================================
   INITIALIZATION
========================================================= */

log(
    "networking-fundamentals.js loaded."
);
