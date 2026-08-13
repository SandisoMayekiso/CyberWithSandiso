/* =========================================================
   CWS ACADEMY
   COURSE DETAILS
   Firebase Authentication + Course Curriculum
========================================================= */

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

import {
    auth
} from "./firebase-config.js";


/* =========================================================
   DEBUG
========================================================= */

const DEBUG = true;


function log(...messages) {

    if (DEBUG) {

        console.log(
            "[CWS Course]",
            ...messages
        );

    }

}


function warn(...messages) {

    if (DEBUG) {

        console.warn(
            "[CWS Course]",
            ...messages
        );

    }

}


function error(...messages) {

    console.error(
        "[CWS Course]",
        ...messages
    );

}


/* =========================================================
   COURSE DATA
========================================================= */

const courses = {

    "cybersecurity-fundamentals": {

        id: "cybersecurity-fundamentals",

        title: "Cybersecurity Fundamentals",

        shortDescription:
            "Build a strong foundation in cybersecurity concepts, threats, vulnerabilities, security controls and ethical security practices.",

        longDescription:
            "Cybersecurity Fundamentals introduces the principles, terminology and practices that form the foundation of modern cybersecurity. You will learn how organizations identify threats, understand vulnerabilities, manage risk and apply security controls to protect systems, networks, applications and data.",

        category:
            "CWS ACADEMY • CYBERSECURITY",

        level:
            "Beginner",

        status:
            "available",

        icon:
            "fa-shield-halved",

        duration:
            "40–50 hours",

        objectives: [

            "Explain the purpose and importance of cybersecurity.",

            "Describe common cybersecurity threats and attack types.",

            "Distinguish between threats, vulnerabilities, risks and security controls.",

            "Explain the confidentiality, integrity and availability principles.",

            "Describe fundamental authentication and access-control concepts.",

            "Identify common network, endpoint, application and data security controls.",

            "Explain basic security monitoring and incident-response concepts.",

            "Apply cybersecurity concepts to realistic security scenarios.",

            "Understand the importance of ethical and responsible security practices."

        ],


        modules: [

            {
                id: "csf-module-01",
                number: 1,
                title: "Introduction to Cybersecurity",
                description:
                    "Understand what cybersecurity is, why it matters and how organizations approach security.",
                status: "available",
                lessons: [
                    {
                        id: "csf-m01-l01",
                        title: "What Is Cybersecurity?",
                        type: "lesson",
                        duration: "20 min",
                        status: "available"
                    },
                    {
                        id: "csf-m01-l02",
                        title: "Why Cybersecurity Matters",
                        type: "lesson",
                        duration: "20 min",
                        status: "available"
                    },
                    {
                        id: "csf-m01-l03",
                        title: "The Cybersecurity Landscape",
                        type: "lesson",
                        duration: "25 min",
                        status: "available"
                    },
                    {
                        id: "csf-m01-l04",
                        title: "Threats, Vulnerabilities and Risk",
                        type: "lesson",
                        duration: "25 min",
                        status: "available"
                    },
                    {
                        id: "csf-m01-l05",
                        title: "Security Controls",
                        type: "lesson",
                        duration: "25 min",
                        status: "available"
                    }
                ],
                assessment: {
                    id: "csf-m01-assessment",
                    title: "Module 1 Knowledge Check",
                    type: "assessment",
                    status: "available"
                }
            },


            {
                id: "csf-module-02",
                number: 2,
                title: "The CIA Triad",
                description:
                    "Explore confidentiality, integrity and availability and how they guide security decisions.",
                status: "locked",
                lessons: [
                    {
                        id: "csf-m02-l01",
                        title: "Confidentiality",
                        type: "lesson"
                    },
                    {
                        id: "csf-m02-l02",
                        title: "Integrity",
                        type: "lesson"
                    },
                    {
                        id: "csf-m02-l03",
                        title: "Availability",
                        type: "lesson"
                    },
                    {
                        id: "csf-m02-l04",
                        title: "Applying the CIA Triad",
                        type: "lesson"
                    },
                    {
                        id: "csf-m02-l05",
                        title: "Real-World Security Scenarios",
                        type: "lesson"
                    }
                ],
                assessment: {
                    id: "csf-m02-assessment",
                    title: "CIA Triad Assessment",
                    type: "assessment"
                }
            },


            {
                id: "csf-module-03",
                number: 3,
                title: "Threats and Attack Types",
                description:
                    "Learn how common cyber threats affect people, systems, networks and organizations.",
                status: "locked",
                lessons: [
                    {
                        id: "csf-m03-l01",
                        title: "Malware",
                        type: "lesson"
                    },
                    {
                        id: "csf-m03-l02",
                        title: "Phishing and Social Engineering",
                        type: "lesson"
                    },
                    {
                        id: "csf-m03-l03",
                        title: "Password Attacks",
                        type: "lesson"
                    },
                    {
                        id: "csf-m03-l04",
                        title: "Network-Based Attacks",
                        type: "lesson"
                    },
                    {
                        id: "csf-m03-l05",
                        title: "Insider Threats",
                        type: "lesson"
                    }
                ],
                assessment: {
                    id: "csf-m03-assessment",
                    title: "Threats and Attack Types Assessment",
                    type: "assessment"
                }
            },


            {
                id: "csf-module-04",
                number: 4,
                title: "Vulnerabilities and Risk",
                description:
                    "Understand vulnerabilities, risk assessment and how organizations prioritize security issues.",
                status: "locked",
                lessons: [
                    {
                        id: "csf-m04-l01",
                        title: "What Is a Vulnerability?",
                        type: "lesson"
                    },
                    {
                        id: "csf-m04-l02",
                        title: "Vulnerability vs Threat vs Risk",
                        type: "lesson"
                    },
                    {
                        id: "csf-m04-l03",
                        title: "Common Vulnerability Categories",
                        type: "lesson"
                    },
                    {
                        id: "csf-m04-l04",
                        title: "Risk Assessment",
                        type: "lesson"
                    },
                    {
                        id: "csf-m04-l05",
                        title: "Security Prioritization",
                        type: "lesson"
                    },
                    {
                        id: "csf-m04-lab",
                        title: "Security Risk Analysis Lab",
                        type: "lab"
                    }
                ],
                assessment: {
                    id: "csf-m04-assessment",
                    title: "Vulnerabilities and Risk Assessment",
                    type: "assessment"
                }
            },


            {
                id: "csf-module-05",
                number: 5,
                title: "Authentication and Access Control",
                description:
                    "Learn how organizations verify identities and control access to resources.",
                status: "locked",
                lessons: [
                    {
                        id: "csf-m05-l01",
                        title: "Authentication",
                        type: "lesson"
                    },
                    {
                        id: "csf-m05-l02",
                        title: "Authorization",
                        type: "lesson"
                    },
                    {
                        id: "csf-m05-l03",
                        title: "Password Security",
                        type: "lesson"
                    },
                    {
                        id: "csf-m05-l04",
                        title: "Multi-Factor Authentication",
                        type: "lesson"
                    },
                    {
                        id: "csf-m05-l05",
                        title: "Access Control Models",
                        type: "lesson"
                    },
                    {
                        id: "csf-m05-lab",
                        title: "Access Control Lab",
                        type: "lab"
                    }
                ],
                assessment: {
                    id: "csf-m05-assessment",
                    title: "Authentication and Access Control Assessment",
                    type: "assessment"
                }
            },


            {
                id: "csf-module-06",
                number: 6,
                title: "Network Security",
                description:
                    "Understand fundamental network security technologies and defensive architecture.",
                status: "locked",
                lessons: [
                    {
                        id: "csf-m06-l01",
                        title: "Network Security Fundamentals",
                        type: "lesson"
                    },
                    {
                        id: "csf-m06-l02",
                        title: "Firewalls",
                        type: "lesson"
                    },
                    {
                        id: "csf-m06-l03",
                        title: "IDS and IPS",
                        type: "lesson"
                    },
                    {
                        id: "csf-m06-l04",
                        title: "Network Segmentation",
                        type: "lesson"
                    },
                    {
                        id: "csf-m06-l05",
                        title: "Secure Network Architecture",
                        type: "lesson"
                    },
                    {
                        id: "csf-m06-lab",
                        title: "Network Security Lab",
                        type: "lab"
                    }
                ],
                assessment: {
                    id: "csf-m06-assessment",
                    title: "Network Security Assessment",
                    type: "assessment"
                }
            },


            {
                id: "csf-module-07",
                number: 7,
                title: "Endpoint and System Security",
                description:
                    "Learn how endpoints and operating systems are protected against security threats.",
                status: "locked",
                lessons: [
                    {
                        id: "csf-m07-l01",
                        title: "Endpoint Security",
                        type: "lesson"
                    },
                    {
                        id: "csf-m07-l02",
                        title: "Operating System Hardening",
                        type: "lesson"
                    },
                    {
                        id: "csf-m07-l03",
                        title: "Patch Management",
                        type: "lesson"
                    },
                    {
                        id: "csf-m07-l04",
                        title: "Antivirus and EDR",
                        type: "lesson"
                    },
                    {
                        id: "csf-m07-l05",
                        title: "Secure Configuration",
                        type: "lesson"
                    },
                    {
                        id: "csf-m07-lab",
                        title: "Linux Security Lab",
                        type: "lab"
                    }
                ],
                assessment: {
                    id: "csf-m07-assessment",
                    title: "Endpoint Security Assessment",
                    type: "assessment"
                }
            },


            {
                id: "csf-module-08",
                number: 8,
                title: "Application and Data Security",
                description:
                    "Explore the fundamentals of protecting applications and sensitive data.",
                status: "locked",
                lessons: [
                    {
                        id: "csf-m08-l01",
                        title: "Application Security",
                        type: "lesson"
                    },
                    {
                        id: "csf-m08-l02",
                        title: "Data Protection",
                        type: "lesson"
                    },
                    {
                        id: "csf-m08-l03",
                        title: "Encryption",
                        type: "lesson"
                    },
                    {
                        id: "csf-m08-l04",
                        title: "Secure Development",
                        type: "lesson"
                    },
                    {
                        id: "csf-m08-l05",
                        title: "Input Validation",
                        type: "lesson"
                    }
                ],
                assessment: {
                    id: "csf-m08-assessment",
                    title: "Application and Data Security Assessment",
                    type: "assessment"
                }
            },


            {
                id: "csf-module-09",
                number: 9,
                title: "Security Operations",
                description:
                    "Learn how security teams monitor systems, detect threats and respond to incidents.",
                status: "locked",
                lessons: [
                    {
                        id: "csf-m09-l01",
                        title: "Security Monitoring",
                        type: "lesson"
                    },
                    {
                        id: "csf-m09-l02",
                        title: "Logging",
                        type: "lesson"
                    },
                    {
                        id: "csf-m09-l03",
                        title: "Incident Detection",
                        type: "lesson"
                    },
                    {
                        id: "csf-m09-l04",
                        title: "Incident Response",
                        type: "lesson"
                    },
                    {
                        id: "csf-m09-l05",
                        title: "Security Operations Centres",
                        type: "lesson"
                    },
                    {
                        id: "csf-m09-lab",
                        title: "Incident Response Lab",
                        type: "lab"
                    }
                ],
                assessment: {
                    id: "csf-m09-assessment",
                    title: "Security Operations Assessment",
                    type: "assessment"
                }
            },


            {
                id: "csf-module-10",
                number: 10,
                title: "Cybersecurity in Practice",
                description:
                    "Bring the concepts together through security policies, ethics, incident response and realistic scenarios.",
                status: "locked",
                lessons: [
                    {
                        id: "csf-m10-l01",
                        title: "Security Policies",
                        type: "lesson"
                    },
                    {
                        id: "csf-m10-l02",
                        title: "Security Awareness",
                        type: "lesson"
                    },
                    {
                        id: "csf-m10-l03",
                        title: "Incident Response",
                        type: "lesson"
                    },
                    {
                        id: "csf-m10-l04",
                        title: "Ethics and Legal Responsibilities",
                        type: "lesson"
                    },
                    {
                        id: "csf-m10-l05",
                        title: "Putting It All Together",
                        type: "lesson"
                    }
                ],
                assessment: {
                    id: "csf-final-assessment",
                    title: "Cybersecurity Fundamentals Final Assessment",
                    type: "assessment"
                }
            }

        ]

    }

};


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

const courseModules =
    document.getElementById("courseModules");

const courseProgressPercent =
    document.getElementById("courseProgressPercent");

const courseProgressFill =
    document.getElementById("courseProgressFill");

const courseProgressText =
    document.getElementById("courseProgressText");

const startCourseBtn =
    document.getElementById("startCourseBtn");

const courseHeroIcon =
    document.getElementById("courseHeroIcon");


/* =========================================================
   STATE
========================================================= */

let currentUser = null;

let currentCourse = null;


/* =========================================================
   GET COURSE ID
========================================================= */

function getCourseId() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    return (
        params.get("course") ||
        ""
    ).trim();

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

    const name =
        getUserName(user);


    if (studentName) {

        studentName.textContent =
            name;

    }

}


/* =========================================================
   COUNT COURSE CONTENT
========================================================= */

function getCourseStats(course) {

    let lessons = 0;

    let labs = 0;

    let assessments = 0;


    course.modules.forEach(
        module => {

            module.lessons.forEach(
                item => {

                    if (
                        item.type === "lesson"
                    ) {

                        lessons++;

                    }


                    if (
                        item.type === "lab"
                    ) {

                        labs++;

                    }

                }
            );


            if (module.assessment) {

                assessments++;

            }

        }
    );


    return {
        modules: course.modules.length,
        lessons,
        labs,
        assessments
    };

}


/* =========================================================
   RENDER COURSE HEADER
========================================================= */

function renderCourseHeader(course) {

    breadcrumbCourse.textContent =
        course.title;


    courseStatus.textContent =
        course.status === "available"
            ? "AVAILABLE"
            : "PLANNED";


    courseStatus.className =
        `course-status ${course.status}`;


    courseLevel.textContent =
        course.level.toUpperCase();


    courseCategory.textContent =
        course.category;


    courseTitle.textContent =
        course.title;


    courseDescription.textContent =
        course.shortDescription;


    courseLongDescription.textContent =
        course.longDescription;


    courseInfoLevel.textContent =
        course.level;


    courseInfoDuration.textContent =
        course.duration;


    courseHeroIcon.innerHTML =
        `<i class="fa-solid ${course.icon}"></i>`;


    /*
     * Learning objectives
     */

    courseObjectives.innerHTML = "";


    course.objectives.forEach(
        objective => {

            const li =
                document.createElement("li");


            li.innerHTML =
                `
                    <i class="fa-solid fa-circle-check"></i>
                    <span>${objective}</span>
                `;


            courseObjectives.appendChild(
                li
            );

        }
    );


    /*
     * Course statistics
     */

    const stats =
        getCourseStats(course);


    courseInfoModules.textContent =
        `${stats.modules} Modules`;


    courseInfoLabs.textContent =
        `${stats.labs} Labs`;


    courseInfoAssessments.textContent =
        `${stats.assessments} Assessments`;

}


/* =========================================================
   CREATE CONTENT ITEM
========================================================= */

function createContentItem(
    item,
    moduleLocked
) {

    const element =
        document.createElement("div");


    const isLocked =
        moduleLocked ||
        item.status === "locked";


    element.className =
        "module-content-item";


    if (isLocked) {

        element.classList.add(
            "locked"
        );

    }


    let icon =
        "fa-book-open";


    let typeLabel =
        "LESSON";


    if (
        item.type === "lab"
    ) {

        icon =
            "fa-flask";

        typeLabel =
            "LAB";

    }


    if (
        item.type === "assessment"
    ) {

        icon =
            "fa-clipboard-check";

        typeLabel =
            "ASSESSMENT";

    }


    const action =
        isLocked
            ? `<span class="content-locked">
                   <i class="fa-solid fa-lock"></i>
                   Locked
               </span>`
            : `<a
                   href="lesson.html?lesson=${encodeURIComponent(item.id)}"
                   class="module-content-action"
               >
                   Start
                   <i class="fa-solid fa-arrow-right"></i>
               </a>`;


    element.innerHTML =
        `
            <div class="module-content-icon">

                <i class="fa-solid ${icon}"></i>

            </div>


            <div class="module-content-info">

                <span class="module-content-type">
                    ${typeLabel}
                </span>


                <h4>
                    ${item.title}
                </h4>


                ${
                    item.duration
                        ? `
                            <span class="module-content-duration">
                                <i class="fa-regular fa-clock"></i>
                                ${item.duration}
                            </span>
                        `
                        : ""
                }

            </div>


            <div class="module-content-right">

                ${action}

            </div>
        `;


    return element;

}


/* =========================================================
   RENDER MODULES
========================================================= */

function renderModules(course) {

    courseModules.innerHTML = "";


    course.modules.forEach(
        (module, index) => {

            const locked =
                module.status === "locked";


            const moduleElement =
                document.createElement("article");


            moduleElement.className =
                "course-module";


            if (locked) {

                moduleElement.classList.add(
                    "locked"
                );

            }


            /*
             * Module header
             */

            const moduleHeader =
                document.createElement("div");


            moduleHeader.className =
                "course-module-header";


            moduleHeader.innerHTML =
                `
                    <div class="module-number">

                        ${
                            locked
                                ? `<i class="fa-solid fa-lock"></i>`
                                : module.number
                        }

                    </div>


                    <div class="module-heading">

                        <span>
                            MODULE ${String(
                                module.number
                            ).padStart(2, "0")}
                        </span>


                        <h3>
                            ${module.title}
                        </h3>


                        <p>
                            ${module.description}
                        </p>

                    </div>


                    <div class="module-status">

                        ${
                            locked
                                ? `
                                    <span class="module-locked-label">
                                        <i class="fa-solid fa-lock"></i>
                                        Locked
                                    </span>
                                `
                                : `
                                    <span class="module-available-label">
                                        <i class="fa-solid fa-circle-check"></i>
                                        Available
                                    </span>
                                `
                        }

                    </div>
                `;


            moduleElement.appendChild(
                moduleHeader
            );


            /*
             * Module content
             */

            const content =
                document.createElement("div");


            content.className =
                "module-content";


            module.lessons.forEach(
                item => {

                    content.appendChild(
                        createContentItem(
                            item,
                            locked
                        )
                    );

                }
            );


            /*
             * Assessment
             */

            if (module.assessment) {

                content.appendChild(
                    createContentItem(
                        module.assessment,
                        locked
                    )
                );

            }


            moduleElement.appendChild(
                content
            );


            /*
             * Module click behavior
             */

            if (!locked) {

                moduleHeader.addEventListener(
                    "click",
                    () => {

                        moduleElement.classList.toggle(
                            "expanded"
                        );

                    }
                );

                /*
                 * Open the first available
                 * module automatically.
                 */

                if (index === 0) {

                    moduleElement.classList.add(
                        "expanded"
                    );

                }

            }


            courseModules.appendChild(
                moduleElement
            );

        }
    );

}


/* =========================================================
   START COURSE
========================================================= */

function startCourse() {

    if (!currentCourse) {

        return;

    }


    const firstModule =
        currentCourse.modules.find(
            module =>
                module.status === "available"
        );


    if (!firstModule) {

        return;

    }


    const firstLesson =
        firstModule.lessons.find(
            item =>
                item.type === "lesson" &&
                item.status === "available"
        );


    if (!firstLesson) {

        return;

    }


    window.location.href =
        `lesson.html?lesson=${encodeURIComponent(
            firstLesson.id
        )}`;

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


}


/* =========================================================
   LOGOUT
========================================================= */

async function logout() {

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


if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        logout
    );

}


if (startCourseBtn) {

    startCourseBtn.addEventListener(
        "click",
        startCourse
    );

}


/* =========================================================
   LOAD COURSE
========================================================= */

function loadCourse() {

    const courseId =
        getCourseId();


    if (!courseId) {

        warn(
            "No course ID supplied."
        );


        courseLoading.hidden =
            true;

        courseNotFound.hidden =
            false;

        return;

    }


    const course =
        courses[courseId];


    if (!course) {

        warn(
            "Unknown course:",
            courseId
        );


        courseLoading.hidden =
            true;

        courseNotFound.hidden =
            false;

        return;

    }


    currentCourse =
        course;


    renderCourseHeader(
        course
    );


    renderModules(
        course
    );


    courseLoading.hidden =
        true;

    courseNotFound.hidden =
        true;

    courseContent.hidden =
        false;


    log(
        "Course loaded:",
        course.title
    );

}


/* =========================================================
   AUTHENTICATION
========================================================= */

if (!auth) {

    error(
        "Firebase Auth unavailable."
    );


    window.location.replace(
        "../pages/login.html"
    );

} else {

    onAuthStateChanged(
        auth,
        async (user) => {

            if (!user) {

                currentUser =
                    null;


                window.location.replace(
                    "../pages/login.html?redirect=course-details"
                );


                return;

            }


            currentUser =
                user;


            try {

                await user.reload();

            } catch (err) {

                warn(
                    "Unable to refresh Firebase user:",
                    err
                );

            }


            displayStudent(
                auth.currentUser ||
                user
            );


            loadCourse();

        }
    );

}


/* =========================================================
   INITIAL LOAD
========================================================= */

log(
    "course-details.js loaded."
);
