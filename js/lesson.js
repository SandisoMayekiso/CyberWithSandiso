/* =========================================================
   CWS ACADEMY
   LESSON SYSTEM

   URL:

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
        console.log(
            "[CWS Lesson]",
            ...args
        );
    }

}


function warn(...args) {

    if (DEBUG) {
        console.warn(
            "[CWS Lesson]",
            ...args
        );
    }

}


function error(...args) {

    console.error(
        "[CWS Lesson]",
        ...args
    );

}


/* =========================================================
   ELEMENTS
========================================================= */

const lessonLoading =
    document.getElementById(
        "lessonLoading"
    );


const lessonNotFound =
    document.getElementById(
        "lessonNotFound"
    );


const lessonNotFoundMessage =
    document.getElementById(
        "lessonNotFoundMessage"
    );


const lessonContent =
    document.getElementById(
        "lessonContent"
    );


const studentName =
    document.getElementById(
        "studentName"
    );


const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );


const headerCourseTitle =
    document.getElementById(
        "headerCourseTitle"
    );


const headerCourseCategory =
    document.getElementById(
        "headerCourseCategory"
    );


const courseBreadcrumbLink =
    document.getElementById(
        "courseBreadcrumbLink"
    );


const moduleBreadcrumb =
    document.getElementById(
        "moduleBreadcrumb"
    );


const lessonBreadcrumb =
    document.getElementById(
        "lessonBreadcrumb"
    );


const lessonModuleBadge =
    document.getElementById(
        "lessonModuleBadge"
    );


const lessonTypeBadge =
    document.getElementById(
        "lessonTypeBadge"
    );


const lessonCategory =
    document.getElementById(
        "lessonCategory"
    );


const lessonTitle =
    document.getElementById(
        "lessonTitle"
    );


const lessonSubtitle =
    document.getElementById(
        "lessonSubtitle"
    );


const lessonDuration =
    document.getElementById(
        "lessonDuration"
    );


const lessonDifficulty =
    document.getElementById(
        "lessonDifficulty"
    );


const lessonProgressMeta =
    document.getElementById(
        "lessonProgressMeta"
    );


const lessonHeroIcon =
    document.getElementById(
        "lessonHeroIcon"
    );


const courseProgressTitle =
    document.getElementById(
        "courseProgressTitle"
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


const sidebarModuleTitle =
    document.getElementById(
        "sidebarModuleTitle"
    );


const lessonSidebarList =
    document.getElementById(
        "lessonSidebarList"
    );


const lessonIntroduction =
    document.getElementById(
        "lessonIntroduction"
    );


const lessonObjectives =
    document.getElementById(
        "lessonObjectives"
    );


const lessonBody =
    document.getElementById(
        "lessonBody"
    );


const lessonKeyConcepts =
    document.getElementById(
        "lessonKeyConcepts"
    );


const lessonKeyConceptsSection =
    document.getElementById(
        "lessonKeyConceptsSection"
    );


const knowledgeCheck =
    document.getElementById(
        "knowledgeCheck"
    );


const knowledgeCheckForm =
    document.getElementById(
        "knowledgeCheckForm"
    );


const quizQuestions =
    document.getElementById(
        "quizQuestions"
    );


const quizResult =
    document.getElementById(
        "quizResult"
    );


const completeLessonBtn =
    document.getElementById(
        "completeLessonBtn"
    );


const lessonCompletion =
    document.getElementById(
        "lessonCompletion"
    );


const previousLessonBtn =
    document.getElementById(
        "previousLessonBtn"
    );


const nextLessonBtn =
    document.getElementById(
        "nextLessonBtn"
    );


/* =========================================================
   STATE
========================================================= */

let currentUser = null;

let currentCourse = null;

let currentModule = null;

let currentLesson = null;

let currentProgress = null;


/* =========================================================
   COURSE DATA
========================================================= */

const courses = {

    "cybersecurity-fundamentals": {

        id:
            "cybersecurity-fundamentals",

        title:
            "Cybersecurity Fundamentals",

        category:
            "CWS ACADEMY • CYBERSECURITY",

        level:
            "Beginner",

        icon:
            "fa-solid fa-shield-halved",

        modules: [

            {
                id: "module-01",

                number: 1,

                title:
                    "Prerequisites & IT Foundations",

                lessons: [

                    {
                        id: "lesson-01",

                        title:
                            "Computer Networking Foundations",

                        subtitle:
                            "Understand the networking concepts every cybersecurity professional needs.",

                        duration:
                            "25 minutes",

                        type:
                            "Lesson",

                        icon:
                            "fa-solid fa-network-wired",

                        introduction:
                            `
                            <h2>Why Networking Matters in Cybersecurity</h2>

                            <p>
                                Cybersecurity professionals need to understand how
                                computers communicate before they can effectively
                                protect or test those systems.
                            </p>

                            <p>
                                Networks allow devices, applications and services
                                to communicate with one another. Security controls
                                such as firewalls, IDS/IPS systems and network
                                monitoring tools all depend on an understanding of
                                network traffic.
                            </p>

                            <div class="lesson-callout">

                                <div class="lesson-callout-icon">
                                    <i class="fa-solid fa-lightbulb"></i>
                                </div>

                                <div>
                                    <strong>CWS Academy Tip</strong>

                                    <p>
                                        A strong networking foundation will make
                                        later topics such as penetration testing,
                                        SOC analysis and network defense much easier.
                                    </p>
                                </div>

                            </div>
                            `,

                        objectives: [

                            "Understand the purpose of computer networks.",

                            "Explain the OSI and TCP/IP models.",

                            "Understand basic routing and switching concepts.",

                            "Explain DNS and DHCP.",

                            "Understand common network ports and services."

                        ],

                        body:
                            `
                            <h2>Computer Networks</h2>

                            <p>
                                A computer network is a collection of connected
                                devices that communicate and exchange information.
                                These devices can include computers, servers,
                                smartphones, routers, switches and security
                                appliances.
                            </p>

                            <h3>The OSI Model</h3>

                            <p>
                                The Open Systems Interconnection model divides
                                network communication into seven conceptual layers.
                            </p>

                            <ol>

                                <li>Physical</li>

                                <li>Data Link</li>

                                <li>Network</li>

                                <li>Transport</li>

                                <li>Session</li>

                                <li>Presentation</li>

                                <li>Application</li>

                            </ol>


                            <h3>The TCP/IP Model</h3>

                            <p>
                                The TCP/IP model provides a practical framework for
                                understanding how devices communicate across modern
                                networks.
                            </p>


                            <h3>Routing</h3>

                            <p>
                                Routing determines how packets move from one network
                                to another. Routers use routing information to
                                determine where traffic should be forwarded.
                            </p>


                            <h3>Switching</h3>

                            <p>
                                Switches primarily connect devices within a local
                                network and forward frames to the appropriate
                                destination.
                            </p>


                            <h3>DNS</h3>

                            <p>
                                The Domain Name System translates human-readable
                                domain names into IP addresses.
                            </p>


                            <h3>DHCP</h3>

                            <p>
                                Dynamic Host Configuration Protocol allows devices
                                to automatically obtain network configuration such
                                as IP addresses.
                            </p>


                            <h3>Ports</h3>

                            <p>
                                Network ports help identify services running on
                                systems. Examples include HTTP, HTTPS, SSH and DNS.
                            </p>


                            <pre class="lesson-code-block">
nmap 192.168.1.1
                            </pre>

                            <p>
                                Tools such as Nmap can later be used in controlled
                                environments to discover hosts and services.
                            </p>
                            `,

                        keyConcepts: [

                            {
                                title:
                                    "OSI Model",

                                description:
                                    "Seven-layer conceptual model used to understand network communication."
                            },

                            {
                                title:
                                    "TCP/IP",

                                description:
                                    "Practical networking model used by modern Internet communications."
                            },

                            {
                                title:
                                    "DNS",

                                description:
                                    "Translates domain names into IP addresses."
                            },

                            {
                                title:
                                    "DHCP",

                                description:
                                    "Automatically provides network configuration to devices."
                            }

                        ],

                        quiz: [

                            {
                                question:
                                    "Which protocol translates domain names into IP addresses?",

                                options: [
                                    "DHCP",
                                    "DNS",
                                    "SSH",
                                    "FTP"
                                ],

                                answer:
                                    1
                            },

                            {
                                question:
                                    "Which device primarily forwards traffic between different networks?",

                                options: [
                                    "Switch",
                                    "Keyboard",
                                    "Router",
                                    "Monitor"
                                ],

                                answer:
                                    2
                            }

                        ]

                    },


                    {
                        id: "lesson-02",

                        title:
                            "System Administration Foundations",

                        subtitle:
                            "Learn the Windows, Linux and command-line concepts used by security professionals.",

                        duration:
                            "25 minutes",

                        type:
                            "Lesson",

                        icon:
                            "fa-solid fa-server",

                        introduction:
                            `
                            <h2>Security Starts With System Knowledge</h2>

                            <p>
                                Security professionals interact with operating
                                systems every day. Understanding how systems are
                                configured, administered and monitored is therefore
                                an important foundation.
                            </p>
                            `,

                        objectives: [

                            "Understand basic Windows administration.",

                            "Understand basic Linux administration.",

                            "Use command-line interfaces.",

                            "Understand file permissions.",

                            "Understand basic Bash scripting."

                        ],

                        body:
                            `
                            <h2>Windows Administration</h2>

                            <p>
                                Windows environments commonly involve users,
                                groups, services, processes, permissions and
                                centralized administration.
                            </p>


                            <h2>Linux Administration</h2>

                            <p>
                                Linux is widely used in servers, cloud environments
                                and cybersecurity laboratories.
                            </p>


                            <h3>Command Line</h3>

                            <pre class="lesson-code-block">
whoami
pwd
ls
cd /var/log
                            </pre>


                            <h3>File Permissions</h3>

                            <p>
                                Linux permissions determine who can read, write or
                                execute a file.
                            </p>


                            <h3>Bash</h3>

                            <p>
                                Bash can automate repetitive administration and
                                security tasks.
                            </p>
                            `,

                        keyConcepts: [

                            {
                                title:
                                    "CLI",

                                description:
                                    "Command-line interface used to interact with operating systems."
                            },

                            {
                                title:
                                    "Linux",

                                description:
                                    "Widely used operating system in servers and security environments."
                            },

                            {
                                title:
                                    "Permissions",

                                description:
                                    "Controls who can access or modify system resources."
                            }

                        ],

                        quiz: [

                            {
                                question:
                                    "Which command displays the current Linux user?",

                                options: [
                                    "whoami",
                                    "mkdir",
                                    "clear",
                                    "touch"
                                ],

                                answer:
                                    0
                            }

                        ]

                    },


                    {
                        id: "lesson-03",

                        title:
                            "Programming for Security",

                        subtitle:
                            "Learn how basic programming and automation can support cybersecurity work.",

                        duration:
                            "30 minutes",

                        type:
                            "Lesson",

                        icon:
                            "fa-solid fa-code",

                        introduction:
                            `
                            <h2>Programming and Cybersecurity</h2>

                            <p>
                                Security professionals often automate repetitive
                                tasks using programming and scripting languages.
                            </p>

                            <p>
                                Python is particularly useful because it provides
                                a large ecosystem of libraries for networking,
                                automation, data processing and security research.
                            </p>
                            `,

                        objectives: [

                            "Understand why programming is useful in cybersecurity.",

                            "Recognize common security scripting languages.",

                            "Understand basic Python syntax.",

                            "Understand basic automation concepts."

                        ],

                        body:
                            `
                            <h2>Python for Security</h2>

                            <p>
                                Python can be used to automate repetitive tasks,
                                process security data and interact with systems
                                and APIs.
                            </p>

                            <pre class="lesson-code-block">
target = "192.168.1.10"

print("Checking target:", target)
                            </pre>

                            <p>
                                The goal at this stage is not to become a
                                professional programmer. The objective is to
                                develop enough programming knowledge to automate
                                security-related tasks.
                            </p>

                            <h3>Automation</h3>

                            <p>
                                Automation can reduce repetitive manual work and
                                allow security teams to respond more efficiently.
                            </p>
                            `,

                        keyConcepts: [

                            {
                                title:
                                    "Python",

                                description:
                                    "A popular programming language for automation and security tooling."
                            },

                            {
                                title:
                                    "Automation",

                                description:
                                    "Using scripts or software to perform repetitive tasks."
                            }

                        ],

                        quiz: [

                            {
                                question:
                                    "Which language is widely used for cybersecurity automation?",

                                options: [
                                    "Python",
                                    "HTML",
                                    "CSS",
                                    "SQL only"
                                ],

                                answer:
                                    0
                            }

                        ]

                    }

                ]

            },


            {
                id: "module-02",

                number: 2,

                title:
                    "Core Cybersecurity Fundamentals",

                lessons: [

                    {
                        id: "lesson-01",

                        title:
                            "The CIA Triad",

                        subtitle:
                            "Understand confidentiality, integrity and availability.",

                        duration:
                            "20 minutes",

                        type:
                            "Lesson",

                        icon:
                            "fa-solid fa-lock",

                        introduction:
                            `
                            <h2>The CIA Triad</h2>

                            <p>
                                The CIA Triad is one of the fundamental models
                                used to understand information security.
                            </p>
                            `,

                        objectives: [

                            "Explain confidentiality.",

                            "Explain integrity.",

                            "Explain availability.",

                            "Apply the CIA Triad to security scenarios."

                        ],

                        body:
                            `
                            <h2>Confidentiality</h2>

                            <p>
                                Confidentiality ensures that information is only
                                accessible to authorized individuals or systems.
                            </p>


                            <h2>Integrity</h2>

                            <p>
                                Integrity ensures that information remains accurate
                                and has not been improperly altered.
                            </p>


                            <h2>Availability</h2>

                            <p>
                                Availability ensures that authorized users can
                                access systems and information when needed.
                            </p>


                            <div class="lesson-callout">

                                <div class="lesson-callout-icon">
                                    <i class="fa-solid fa-shield-halved"></i>
                                </div>

                                <div>
                                    <strong>Think Like a Security Professional</strong>

                                    <p>
                                        When analyzing a security incident, ask:
                                        Was confidentiality, integrity,
                                        availability, or a combination of them
                                        affected?
                                    </p>
                                </div>

                            </div>
                            `,

                        keyConcepts: [

                            {
                                title:
                                    "Confidentiality",

                                description:
                                    "Preventing unauthorized disclosure of information."
                            },

                            {
                                title:
                                    "Integrity",

                                description:
                                    "Protecting information from unauthorized modification."
                            },

                            {
                                title:
                                    "Availability",

                                description:
                                    "Ensuring systems and information remain accessible."
                            }

                        ],

                        quiz: [

                            {
                                question:
                                    "Which CIA principle protects information from unauthorized disclosure?",

                                options: [
                                    "Availability",
                                    "Integrity",
                                    "Confidentiality",
                                    "Accounting"
                                ],

                                answer:
                                    2
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
                params.get("course") || ""
            )
                .trim()
                .toLowerCase(),

        moduleId:
            (
                params.get("module") || ""
            )
                .trim()
                .toLowerCase(),

        lessonId:
            (
                params.get("lesson") || ""
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
   TEXT
========================================================= */

function setText(element, value) {

    if (!element) {
        return;
    }

    element.textContent =
        value ?? "";

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


function showNotFound(message) {

    if (lessonLoading) {
        lessonLoading.hidden = true;
    }

    if (lessonContent) {
        lessonContent.hidden = true;
    }

    if (lessonNotFoundMessage) {

        lessonNotFoundMessage.textContent =
            message;

    }

    if (lessonNotFound) {
        lessonNotFound.hidden = false;
    }

}


function showContent() {

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

function findModule(course, moduleId) {

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

function findLesson(module, lessonId) {

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
   PROGRESS DEFAULT
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
            currentModule.id,

        currentLesson:
            currentLesson.id,

        progressPercent:
            0,

        started:
            true,

        completed:
            false

    };

}


/* =========================================================
   PROGRESS REF
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

        updateCourseProgressUI();

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
                currentProgress.completedLessons
            )
        ) {

            currentProgress.completedLessons =
                [];

        }


        updateCourseProgressUI();


    } catch (err) {

        error(
            "Progress load failed:",
            err
        );


        currentProgress =
            getDefaultProgress();


        updateCourseProgressUI();

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
            "Progress save failed:",
            err
        );

    }

}


/* =========================================================
   TOTAL LESSONS
========================================================= */

function getTotalLessons() {

    let total = 0;


    currentCourse.modules.forEach(
        module => {

            total +=
                module.lessons.length;

        }
    );


    return total;

}


/* =========================================================
   COURSE PROGRESS
========================================================= */

function calculateCourseProgress() {

    const total =
        getTotalLessons();


    const completed =
        currentProgress?.completedLessons
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
   UPDATE COURSE PROGRESS
========================================================= */

function updateCourseProgressUI() {

    if (!currentProgress) {
        return;
    }


    const percent =
        calculateCourseProgress();


    currentProgress.progressPercent =
        percent;


    setText(

        courseProgressPercent,

        `${percent}%`

    );


    if (courseProgressFill) {

        courseProgressFill.style.width =
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


    const completed =
        currentProgress.completedLessons
            ?.length || 0;


    const total =
        getTotalLessons();


    if (percent === 0) {

        setText(

            courseProgressText,

            "Start your first lesson to begin making progress."

        );

    } else if (percent < 100) {

        setText(

            courseProgressText,

            `${completed} of ${total} lessons completed.`

        );

    } else {

        setText(

            courseProgressText,

            "Course completed. Congratulations!"

        );

    }

}


/* =========================================================
   RENDER LESSON
========================================================= */

function renderLesson() {

    setText(
        headerCourseTitle,
        currentCourse.title
    );


    setText(
        headerCourseCategory,
        currentCourse.category
    );


    setText(
        studentName,
        getUserName(currentUser)
    );


    setText(
        courseProgressTitle,
        currentCourse.title
    );


    setText(
        moduleBreadcrumb,
        currentModule.title
    );


    setText(
        lessonBreadcrumb,
        currentLesson.title
    );


    setText(
        lessonModuleBadge,

        `MODULE ${String(
            currentModule.number
        ).padStart(2, "0")}`

    );


    setText(
        lessonTypeBadge,

        currentLesson.type ||
        "LESSON"

    );


    setText(
        lessonCategory,
        currentCourse.category
    );


    setText(
        lessonTitle,
        currentLesson.title
    );


    setText(
        lessonSubtitle,
        currentLesson.subtitle
    );


    if (lessonDuration) {

        lessonDuration.innerHTML = `

            <i class="fa-regular fa-clock"></i>

            ${currentLesson.duration}

        `;

    }


    if (lessonDifficulty) {

        lessonDifficulty.innerHTML = `

            <i class="fa-solid fa-signal"></i>

            ${currentCourse.level}

        `;

    }


    if (lessonHeroIcon) {

        lessonHeroIcon.className =
            currentLesson.icon ||
            currentCourse.icon;

    }


    if (courseBreadcrumbLink) {

        courseBreadcrumbLink.href =
            `course-details.html?course=${encodeURIComponent(
                currentCourse.id
            )}`;

    }


    setText(
        sidebarModuleTitle,
        `Module ${String(
            currentModule.number
        ).padStart(2, "0")}: ${currentModule.title}`
    );


    renderIntroduction();


    renderObjectives();


    renderBody();


    renderKeyConcepts();


    renderQuiz();


    renderSidebar();


    renderNavigation();


    updateCompletionUI();

}


/* =========================================================
   INTRODUCTION
========================================================= */

function renderIntroduction() {

    if (!lessonIntroduction) {
        return;
    }


    lessonIntroduction.innerHTML =
        currentLesson.introduction ||
        "";

}


/* =========================================================
   OBJECTIVES
========================================================= */

function renderObjectives() {

    if (!lessonObjectives) {
        return;
    }


    lessonObjectives.innerHTML =
        "";


    const objectives =
        currentLesson.objectives || [];


    objectives.forEach(
        objective => {

            const li =
                document.createElement(
                    "li"
                );


            li.textContent =
                objective;


            lessonObjectives.appendChild(
                li
            );

        }
    );

}


/* =========================================================
   BODY
========================================================= */

function renderBody() {

    if (!lessonBody) {
        return;
    }


    lessonBody.innerHTML =
        currentLesson.body ||
        "";

}


/* =========================================================
   KEY CONCEPTS
========================================================= */

function renderKeyConcepts() {

    if (
        !lessonKeyConcepts ||
        !lessonKeyConceptsSection
    ) {

        return;

    }


    const concepts =
        currentLesson.keyConcepts || [];


    lessonKeyConcepts.innerHTML =
        "";


    if (!concepts.length) {

        lessonKeyConceptsSection.hidden =
            true;

        return;

    }


    lessonKeyConceptsSection.hidden =
        false;


    concepts.forEach(
        concept => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "lesson-concept-card";


            const title =
                document.createElement(
                    "strong"
                );


            title.textContent =
                concept.title;


            const description =
                document.createElement(
                    "p"
                );


            description.textContent =
                concept.description;


            card.appendChild(title);

            card.appendChild(
                description
            );


            lessonKeyConcepts.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   QUIZ
========================================================= */

function renderQuiz() {

    if (
        !quizQuestions ||
        !knowledgeCheck
    ) {

        return;

    }


    const quiz =
        currentLesson.quiz || [];


    quizQuestions.innerHTML =
        "";


    if (!quiz.length) {

        knowledgeCheck.hidden =
            true;

        return;

    }


    knowledgeCheck.hidden =
        false;


    quiz.forEach(
        (question, index) => {

            const questionBox =
                document.createElement(
                    "div"
                );


            questionBox.className =
                "quiz-question";


            const title =
                document.createElement(
                    "h3"
                );


            title.className =
                "quiz-question-title";


            title.textContent =
                `${index + 1}. ${question.question}`;


            const options =
                document.createElement(
                    "div"
                );


            options.className =
                "quiz-options";


            question.options.forEach(
                (option, optionIndex) => {

                    const label =
                        document.createElement(
                            "label"
                        );


                    label.className =
                        "quiz-option";


                    const input =
                        document.createElement(
                            "input"
                        );


                    input.type =
                        "radio";


                    input.name =
                        `question-${index}`;


                    input.value =
                        String(
                            optionIndex
                        );


                    input.required =
                        true;


                    const span =
                        document.createElement(
                            "span"
                        );


                    span.textContent =
                        option;


                    label.appendChild(
                        input
                    );


                    label.appendChild(
                        span
                    );


                    options.appendChild(
                        label
                    );

                }
            );


            questionBox.appendChild(
                title
            );


            questionBox.appendChild(
                options
            );


            quizQuestions.appendChild(
                questionBox
            );

        }
    );

}


/* =========================================================
   QUIZ SUBMIT
========================================================= */

function handleQuizSubmit(event) {

    event.preventDefault();


    const quiz =
        currentLesson.quiz || [];


    let score = 0;


    quiz.forEach(
        (question, index) => {

            const selected =
                document.querySelector(
                    `input[name="question-${index}"]:checked`
                );


            if (
                selected &&
                Number(selected.value) ===
                    question.answer
            ) {

                score++;

            }

        }
    );


    const percentage =
        Math.round(
            (
                score /
                quiz.length
            ) * 100
        );


    if (!quizResult) {
        return;
    }


    quizResult.hidden =
        false;


    quizResult.className =
        "quiz-result";


    if (percentage >= 70) {

        quizResult.classList.add(
            "success"
        );


        quizResult.innerHTML = `

            <strong>
                Excellent work!
            </strong>

            <p>
                You scored ${score}/${quiz.length}
                (${percentage}%).
            </p>

        `;

    } else {

        quizResult.classList.add(
            "failed"
        );


        quizResult.innerHTML = `

            <strong>
                Keep studying.
            </strong>

            <p>
                You scored ${score}/${quiz.length}
                (${percentage}%).
                Review the lesson and try again.
            </p>

        `;

    }

}


/* =========================================================
   SIDEBAR
========================================================= */

function renderSidebar() {

    if (!lessonSidebarList) {
        return;
    }


    lessonSidebarList.innerHTML =
        "";


    currentModule.lessons.forEach(
        (lesson, index) => {

            const link =
                document.createElement(
                    "a"
                );


            link.className =
                "lesson-sidebar-item";


            const completed =
                currentProgress?.completedLessons
                    ?.includes(
                        buildLessonKey(
                            currentModule.id,
                            lesson.id
                        )
                    );


            if (completed) {

                link.classList.add(
                    "completed"
                );

            }


            if (
                lesson.id ===
                currentLesson.id
            ) {

                link.classList.add(
                    "active"
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
                "lesson-sidebar-number";


            number.textContent =
                String(index + 1)
                    .padStart(2, "0");


            const title =
                document.createElement(
                    "span"
                );


            title.className =
                "lesson-sidebar-title";


            title.textContent =
                lesson.title;


            link.appendChild(
                number
            );


            link.appendChild(
                title
            );


            lessonSidebarList.appendChild(
                link
            );

        }
    );

}


/* =========================================================
   LESSON KEY
========================================================= */

function buildLessonKey(
    moduleId,
    lessonId
) {

    return `${moduleId}:${lessonId}`;

}


/* =========================================================
   COMPLETION
========================================================= */

function isLessonCompleted() {

    if (!currentProgress) {
        return false;
    }


    return (
        currentProgress.completedLessons
            ?.includes(
                buildLessonKey(
                    currentModule.id,
                    currentLesson.id
                )
            ) || false
    );

}


/* =========================================================
   UPDATE COMPLETION UI
========================================================= */

function updateCompletionUI() {

    if (
        !completeLessonBtn ||
        !lessonCompletion
    ) {

        return;

    }


    if (isLessonCompleted()) {

        lessonCompletion.classList.add(
            "completed"
        );


        completeLessonBtn.innerHTML = `

            <i class="fa-solid fa-circle-check"></i>

            Lesson Completed

        `;


        completeLessonBtn.disabled =
            true;

    } else {

        lessonCompletion.classList.remove(
            "completed"
        );


        completeLessonBtn.innerHTML = `

            <i class="fa-solid fa-check"></i>

            Mark Lesson Complete

        `;


        completeLessonBtn.disabled =
            false;

    }

}


/* =========================================================
   COMPLETE LESSON
========================================================= */

async function completeLesson() {

    if (!currentProgress) {

        currentProgress =
            getDefaultProgress();

    }


    const lessonKey =
        buildLessonKey(
            currentModule.id,
            currentLesson.id
        );


    if (
        !currentProgress.completedLessons
            .includes(
                lessonKey
            )
    ) {

        currentProgress.completedLessons.push(
            lessonKey
        );

    }


    currentProgress.started =
        true;


    currentProgress.currentModule =
        currentModule.id;


    currentProgress.currentLesson =
        currentLesson.id;


    currentProgress.progressPercent =
        calculateCourseProgress();


    updateCourseProgressUI();


    updateCompletionUI();


    renderSidebar();


    await saveProgress();


    log(
        "Lesson completed:",
        lessonKey
    );

}


/* =========================================================
   NAVIGATION
========================================================= */

function getAllLessons() {

    const lessons = [];


    currentCourse.modules.forEach(
        module => {

            module.lessons.forEach(
                lesson => {

                    lessons.push({

                        moduleId:
                            module.id,

                        moduleNumber:
                            module.number,

                        lessonId:
                            lesson.id,

                        lesson:
                            lesson

                    });

                }
            );

        }
    );


    return lessons;

}


function renderNavigation() {

    const lessons =
        getAllLessons();


    const index =
        lessons.findIndex(
            item =>
                item.moduleId ===
                    currentModule.id &&
                item.lessonId ===
                    currentLesson.id
        );


    const previous =
        index > 0
            ? lessons[index - 1]
            : null;


    const next =
        index <
            lessons.length - 1
            ? lessons[index + 1]
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


            previousLessonBtn.querySelector(
                "span"
            ).innerHTML = `

                <small>Previous</small>

                ${previous.lesson.title}

            `;

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


            nextLessonBtn.querySelector(
                "span"
            ).innerHTML = `

                <small>Next</small>

                ${next.lesson.title}

            `;

        } else {

            nextLessonBtn.hidden =
                true;

        }

    }


    setText(

        lessonProgressMeta,

        `Lesson ${index + 1} of ${lessons.length}`

    );

}


/* =========================================================
   BUILD URL
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


    params.set(
        "lesson",
        lessonId
    );


    return `lesson.html?${params.toString()}`;

}


/* =========================================================
   LOAD LESSON
========================================================= */

async function loadLesson() {

    showLoading();


    const {
        courseId,
        moduleId,
        lessonId
    } =
        getUrlParameters();


    log(
        "URL parameters:",
        {
            courseId,
            moduleId,
            lessonId
        }
    );


    if (
        !courseId ||
        !moduleId ||
        !lessonId
    ) {

        showNotFound(
            "The lesson URL is missing the course, module or lesson parameter."
        );

        return;

    }


    currentCourse =
        findCourse(
            courseId
        );


    if (!currentCourse) {

        showNotFound(
            "The requested course does not exist."
        );

        return;

    }


    currentModule =
        findModule(
            currentCourse,
            moduleId
        );


    if (!currentModule) {

        showNotFound(
            "The requested module does not exist."
        );

        return;

    }


    currentLesson =
        findLesson(
            currentModule,
            lessonId
        );


    if (!currentLesson) {

        showNotFound(
            "The requested lesson does not exist."
        );

        return;

    }


    await loadProgress();


    renderLesson();


    showContent();


    log(
        "Lesson loaded:",
        currentLesson.title
    );

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
            logoutBtn.disabled = true;
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
            logoutBtn.disabled = false;
        }


        alert(
            "Unable to sign out. Please try again."
        );

    }

}


/* =========================================================
   EVENTS
========================================================= */

if (knowledgeCheckForm) {

    knowledgeCheckForm.addEventListener(
        "submit",
        handleQuizSubmit
    );

}


if (completeLessonBtn) {

    completeLessonBtn.addEventListener(
        "click",
        completeLesson
    );

}


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
        "Firebase Auth unavailable."
    );


    window.location.replace(
        "../pages/login.html"
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


            if (!user) {

                const {
                    courseId,
                    moduleId,
                    lessonId
                } =
                    getUrlParameters();


                window.location.replace(

                    `../pages/login.html?redirect=lesson` +
                    `&course=${encodeURIComponent(courseId)}` +
                    `&module=${encodeURIComponent(moduleId)}` +
                    `&lesson=${encodeURIComponent(lessonId)}`

                );


                return;

            }


            currentUser =
                user;


            await loadLesson();

        }
    );

}


/* =========================================================
   INITIAL LOG
========================================================= */

log(
    "lesson.js loaded."
);
