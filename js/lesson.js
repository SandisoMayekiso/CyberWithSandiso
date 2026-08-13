 /* =========================================================
    CWS ACADEMY
    LESSON PLAYER
    Cybersecurity Fundamentals
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
   LESSON DATA
========================================================= */

const lessons = {

    "csf-m01-l01": {

        id: "csf-m01-l01",

        courseId:
            "cybersecurity-fundamentals",

        courseTitle:
            "Cybersecurity Fundamentals",

        moduleId:
            "csf-module-01",

        moduleNumber:
            1,

        moduleTitle:
            "Introduction to Cybersecurity",

        title:
            "What Is Cybersecurity?",

        duration:
            "20 min",

        level:
            "Beginner",


        objectives: [

            "Define cybersecurity in practical terms.",

            "Explain what cybersecurity is designed to protect.",

            "Identify the relationship between people, processes and technology in security.",

            "Explain why cybersecurity is a shared responsibility.",

            "Recognize the difference between protecting information and simply protecting computers."

        ],


        sections: [

            {
                type: "intro",

                title:
                    "Understanding Cybersecurity",

                paragraphs: [

                    "Cybersecurity is the practice of protecting digital systems, networks, applications, devices and information from unauthorized access, misuse, disruption, alteration or destruction.",

                    "Although cybersecurity is often associated with computers and technical tools, effective security is much broader. A secure organization depends on technology, people and processes working together.",

                    "Every time an organization stores customer information, operates an online service, connects employees to a network or communicates electronically, it has cybersecurity responsibilities."

                ]

            },


            {
                type: "heading",

                title:
                    "What Does Cybersecurity Protect?"

            },


            {
                type: "paragraph",

                paragraphs: [

                    "Cybersecurity can protect many different types of assets. These include personal information, financial records, business documents, credentials, software, databases, cloud resources, network infrastructure and operational systems.",

                    "The value of an asset is not limited to its financial price. Information can also have legal, operational, personal or strategic value. For example, a healthcare organization may need to protect patient records because unauthorized disclosure could harm individuals and violate regulatory requirements."

                ]

            },


            {
                type: "callout",

                variant: "important",

                title:
                    "Security Is About More Than Computers",

                text:
                    "A laptop can have strong security software installed and still be compromised because a user shares a password, an organization misconfigures a system or a process fails to protect sensitive information."

            },


            {
                type: "heading",

                title:
                    "The Three Parts of Effective Security"

            },


            {
                type: "cards",

                cards: [

                    {
                        icon:
                            "fa-users",

                        title:
                            "People",

                        text:
                            "Employees, administrators, security professionals and users make decisions that affect security every day."
                    },


                    {
                        icon:
                            "fa-list-check",

                        title:
                            "Processes",

                        text:
                            "Policies, procedures, incident-response plans and access-control processes establish how security should operate."
                    },


                    {
                        icon:
                            "fa-microchip",

                        title:
                            "Technology",

                        text:
                            "Firewalls, authentication systems, encryption, endpoint protection and monitoring tools provide technical security capabilities."
                    }

                ]

            },


            {
                type: "heading",

                title:
                    "Why Cybersecurity Matters"

            },


            {
                type: "paragraph",

                paragraphs: [

                    "Modern organizations depend heavily on digital systems. If those systems become unavailable, information is exposed or data is altered without authorization, the consequences can be significant.",

                    "Cybersecurity therefore supports more than technical protection. It helps organizations maintain trust, protect customers, continue operations, meet legal and regulatory obligations and reduce the likelihood and impact of security incidents."

                ]

            },


            {
                type: "scenario",

                title:
                    "Security Scenario",

                scenario:
                    "Imagine an online retailer that stores customer names, addresses and payment-related information. An employee receives an email that appears to come from the company's IT department and enters their credentials into a fake login page.",

                question:
                    "Was this purely a technology problem?",

                answer:
                    "No. Technology is involved, but the incident also involves human decision-making and organizational processes. Security awareness training, strong authentication and appropriate access controls could all reduce the risk."

            },


            {
                type: "heading",

                title:
                    "Cybersecurity Is a Shared Responsibility"

            },


            {
                type: "paragraph",

                paragraphs: [

                    "Security is not only the responsibility of the cybersecurity team. Developers, system administrators, managers, employees, contractors and ordinary users can all affect an organization's security posture.",

                    "A security team may deploy strong controls, but those controls are only effective when they are correctly configured, maintained and used. This is why security awareness and organizational processes are important parts of cybersecurity."

                ]

            },


            {
                type: "callout",

                variant: "tip",

                title:
                    "A Useful Mental Model",

                text:
                    "Think of cybersecurity as risk management for digital systems and information. The goal is not to make every attack impossible. The goal is to identify important risks and reduce their likelihood and impact to an acceptable level."

            },


            {
                type: "heading",

                title:
                    "Cybersecurity and the Security Mindset"

            },


            {
                type: "paragraph",

                paragraphs: [

                    "A cybersecurity mindset begins with asking questions. What are we protecting? Who should have access? What could go wrong? How would we detect a problem? What would happen if a system became unavailable? How could we reduce the risk?",

                    "These questions help security professionals move beyond simply reacting to incidents. Good cybersecurity involves identifying risks before they become incidents and continuously improving defensive measures."

                ]

            }

        ],


        takeaways: [

            "Cybersecurity protects digital systems, networks, applications, devices and information.",

            "Effective security depends on people, processes and technology.",

            "Cybersecurity is broader than installing security software on computers.",

            "Security is a shared responsibility across an organization.",

            "The goal of cybersecurity is to manage and reduce risk.",

            "A strong security mindset focuses on identifying what needs protection and what could go wrong."

        ],


        knowledgeCheck: [

            {
                id: "q1",

                question:
                    "Which statement best describes cybersecurity?",

                options: [

                    "The process of installing antivirus software on computers.",

                    "The practice of protecting digital systems, networks, applications, devices and information.",

                    "A method used only by governments to protect classified information.",

                    "The process of preventing employees from accessing the internet."

                ],

                answer: 1,

                explanation:
                    "Cybersecurity is the broader practice of protecting digital systems, networks, applications, devices and information from security threats and unauthorized activity."

            },


            {
                id: "q2",

                question:
                    "Which three elements are commonly considered essential to effective organizational security?",

                options: [

                    "People, processes and technology.",

                    "Passwords, firewalls and antivirus.",

                    "Servers, routers and laptops.",

                    "Users, websites and email."

                ],

                answer: 0,

                explanation:
                    "People, processes and technology work together to create an effective security program."

            },


            {
                id: "q3",

                question:
                    "Why is cybersecurity considered a shared responsibility?",

                options: [

                    "Only security professionals are allowed to make security decisions.",

                    "Security software automatically protects every organization.",

                    "Actions taken by users, administrators, developers and other stakeholders can affect security.",

                    "Cybersecurity only matters when an incident has already occurred."

                ],

                answer: 2,

                explanation:
                    "Different people and teams make decisions that can increase or reduce security risk, so security cannot be isolated to one department."

            },


            {
                id: "q4",

                question:
                    "What is the primary goal of cybersecurity?",

                options: [

                    "To make every cyberattack technically impossible.",

                    "To eliminate the need for security policies.",

                    "To manage and reduce cybersecurity risk.",

                    "To prevent users from accessing digital systems."

                ],

                answer: 2,

                explanation:
                    "Cybersecurity focuses on identifying, managing and reducing risks rather than assuming that every possible attack can be prevented."

            }

        ]

    }

};


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

const backToCourse =
    document.getElementById(
        "backToCourse"
    );

const sidebarCourseTitle =
    document.getElementById(
        "sidebarCourseTitle"
    );

const sidebarModuleNumber =
    document.getElementById(
        "sidebarModuleNumber"
    );

const sidebarModuleTitle =
    document.getElementById(
        "sidebarModuleTitle"
    );

const lessonNavigation =
    document.getElementById(
        "lessonNavigation"
    );

const lessonCourseBreadcrumb =
    document.getElementById(
        "lessonCourseBreadcrumb"
    );

const lessonModuleBreadcrumb =
    document.getElementById(
        "lessonModuleBreadcrumb"
    );

const lessonTitle =
    document.getElementById(
        "lessonTitle"
    );

const lessonDuration =
    document.getElementById(
        "lessonDuration"
    );

const lessonObjectives =
    document.getElementById(
        "lessonObjectives"
    );

const lessonBody =
    document.getElementById(
        "lessonBody"
    );

const lessonTakeaways =
    document.getElementById(
        "lessonTakeaways"
    );

const knowledgeQuestions =
    document.getElementById(
        "knowledgeQuestions"
    );

const submitKnowledgeCheck =
    document.getElementById(
        "submitKnowledgeCheck"
    );

const knowledgeResult =
    document.getElementById(
        "knowledgeResult"
    );

const knowledgeCheckStatus =
    document.getElementById(
        "knowledgeCheckStatus"
    );

const completeLessonBtn =
    document.getElementById(
        "completeLessonBtn"
    );

const completionMessage =
    document.getElementById(
        "completionMessage"
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

let currentLesson = null;

let knowledgeCheckPassed = false;


/* =========================================================
   GET LESSON ID
========================================================= */

function getLessonId() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    return (
        params.get("lesson") ||
        ""
    ).trim();

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

        return user.email
            .split("@")[0]
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
   ESCAPE HTML
========================================================= */

function escapeHtml(value) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   RENDER LESSON SECTIONS
========================================================= */

function renderLessonSections(
    sections
) {

    lessonBody.innerHTML = "";


    sections.forEach(
        section => {

            let element = null;


            /*
             * INTRO
             */

            if (
                section.type === "intro"
            ) {

                element =
                    document.createElement(
                        "section"
                    );

                element.className =
                    "lesson-content-section intro-section";


                element.innerHTML =
                    `
                        <h2>
                            ${escapeHtml(
                                section.title
                            )}
                        </h2>

                        ${section.paragraphs
                            .map(
                                paragraph =>
                                    `<p>${escapeHtml(
                                        paragraph
                                    )}</p>`
                            )
                            .join("")
                        }
                    `;

            }


            /*
             * HEADING
             */

            else if (
                section.type === "heading"
            ) {

                element =
                    document.createElement(
                        "section"
                    );

                element.className =
                    "lesson-content-section";


                element.innerHTML =
                    `
                        <h2>
                            ${escapeHtml(
                                section.title
                            )}
                        </h2>
                    `;

            }


            /*
             * PARAGRAPHS
             */

            else if (
                section.type === "paragraph"
            ) {

                element =
                    document.createElement(
                        "section"
                    );

                element.className =
                    "lesson-content-section";


                element.innerHTML =
                    section.paragraphs
                        .map(
                            paragraph =>
                                `<p>${escapeHtml(
                                    paragraph
                                )}</p>`
                        )
                        .join("");

            }


            /*
             * CALLOUT
             */

            else if (
                section.type === "callout"
            ) {

                element =
                    document.createElement(
                        "aside"
                    );

                element.className =
                    `lesson-callout ${section.variant || ""}`;


                const icon =
                    section.variant === "tip"
                        ? "fa-lightbulb"
                        : "fa-circle-exclamation";


                element.innerHTML =
                    `
                        <div class="callout-icon">

                            <i class="fa-solid ${icon}"></i>

                        </div>

                        <div>

                            <h3>
                                ${escapeHtml(
                                    section.title
                                )}
                            </h3>

                            <p>
                                ${escapeHtml(
                                    section.text
                                )}
                            </p>

                        </div>
                    `;

            }


            /*
             * CARDS
             */

            else if (
                section.type === "cards"
            ) {

                element =
                    document.createElement(
                        "section"
                    );

                element.className =
                    "lesson-card-grid";


                section.cards.forEach(
                    card => {

                        const cardElement =
                            document.createElement(
                                "article"
                            );

                        cardElement.className =
                            "lesson-concept-card";


                        cardElement.innerHTML =
                            `
                                <div class="concept-card-icon">

                                    <i class="fa-solid ${card.icon}"></i>

                                </div>

                                <h3>
                                    ${escapeHtml(
                                        card.title
                                    )}
                                </h3>

                                <p>
                                    ${escapeHtml(
                                        card.text
                                    )}
                                </p>
                            `;


                        element.appendChild(
                            cardElement
                        );

                    }
                );

            }


            /*
             * SCENARIO
             */

            else if (
                section.type === "scenario"
            ) {

                element =
                    document.createElement(
                        "section"
                    );

                element.className =
                    "lesson-scenario";


                element.innerHTML =
                    `
                        <div class="scenario-header">

                            <i class="fa-solid fa-shield-halved"></i>

                            <div>

                                <span>
                                    SECURITY SCENARIO
                                </span>

                                <h3>
                                    ${escapeHtml(
                                        section.title
                                    )}
                                </h3>

                            </div>

                        </div>


                        <div class="scenario-body">

                            <p>
                                ${escapeHtml(
                                    section.scenario
                                )}
                            </p>


                            <div class="scenario-question">

                                <strong>
                                    ${escapeHtml(
                                        section.question
                                    )}
                                </strong>

                                <p>
                                    ${escapeHtml(
                                        section.answer
                                    )}
                                </p>

                            </div>

                        </div>
                    `;

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
   RENDER OBJECTIVES
========================================================= */

function renderObjectives(
    objectives
) {

    lessonObjectives.innerHTML = "";


    objectives.forEach(
        objective => {

            const li =
                document.createElement(
                    "li"
                );


            li.innerHTML =
                `
                    <i class="fa-solid fa-circle-check"></i>

                    <span>
                        ${escapeHtml(
                            objective
                        )}
                    </span>
                `;


            lessonObjectives.appendChild(
                li
            );

        }
    );

}


/* =========================================================
   RENDER TAKEAWAYS
========================================================= */

function renderTakeaways(
    takeaways
) {

    lessonTakeaways.innerHTML = "";


    takeaways.forEach(
        takeaway => {

            const li =
                document.createElement(
                    "li"
                );


            li.innerHTML =
                `
                    <i class="fa-solid fa-check"></i>

                    <span>
                        ${escapeHtml(
                            takeaway
                        )}
                    </span>
                `;


            lessonTakeaways.appendChild(
                li
            );

        }
    );

}


/* =========================================================
   RENDER KNOWLEDGE CHECK
========================================================= */

function renderKnowledgeCheck(
    questions
) {

    knowledgeQuestions.innerHTML = "";


    questions.forEach(
        (question, questionIndex) => {

            const wrapper =
                document.createElement(
                    "fieldset"
                );


            wrapper.className =
                "knowledge-question";


            const legend =
                document.createElement(
                    "legend"
                );


            legend.innerHTML =
                `
                    <span class="question-number">
                        ${questionIndex + 1}
                    </span>

                    ${escapeHtml(
                        question.question
                    )}
                `;


            wrapper.appendChild(
                legend
            );


            question.options.forEach(
                (option, optionIndex) => {

                    const label =
                        document.createElement(
                            "label"
                        );


                    label.className =
                        "knowledge-option";


                    label.innerHTML =
                        `
                            <input
                                type="radio"
                                name="${question.id}"
                                value="${optionIndex}"
                            >

                            <span>
                                ${escapeHtml(
                                    option
                                )}
                            </span>
                        `;


                    wrapper.appendChild(
                        label
                    );

                }
            );


            knowledgeQuestions.appendChild(
                wrapper
            );

        }
    );

}


/* =========================================================
   KNOWLEDGE CHECK
========================================================= */

function checkKnowledge() {

    const questions =
        currentLesson.knowledgeCheck;


    let score = 0;

    let answered = 0;


    questions.forEach(
        question => {

            const selected =
                document.querySelector(
                    `input[name="${question.id}"]:checked`
                );


            if (!selected) {

                return;

            }


            answered++;


            const selectedAnswer =
                Number(
                    selected.value
                );


            if (
                selectedAnswer ===
                question.answer
            ) {

                score++;

            }

        }
    );


    /*
     * Require every question
     * to be answered.
     */

    if (
        answered !== questions.length
    ) {

        knowledgeResult.hidden =
            false;


        knowledgeResult.className =
            "knowledge-result warning";


        knowledgeResult.innerHTML =
            `
                <i class="fa-solid fa-circle-exclamation"></i>

                <div>

                    <strong>
                        Complete the knowledge check
                    </strong>

                    <p>
                        Please answer every question
                        before submitting.
                    </p>

                </div>
            `;


        return;

    }


    const percentage =
        Math.round(
            (score / questions.length) *
            100
        );


    const passed =
        percentage >= 75;


    knowledgeCheckPassed =
        passed;


    knowledgeResult.hidden =
        false;


    knowledgeResult.className =
        `knowledge-result ${
            passed
                ? "success"
                : "failure"
        }`;


    knowledgeResult.innerHTML =
        `
            <i class="fa-solid ${
                passed
                    ? "fa-circle-check"
                    : "fa-circle-xmark"
            }"></i>

            <div>

                <strong>
                    ${
                        passed
                            ? "Knowledge check passed"
                            : "Knowledge check not passed"
                    }
                </strong>

                <p>
                    You scored
                    <strong>
                        ${score}/${questions.length}
                    </strong>
                    (${percentage}%).
                    ${
                        passed
                            ? "You can now mark this lesson complete."
                            : "Review the lesson and try again."
                    }
                </p>

            </div>
        `;


    knowledgeCheckStatus.textContent =
        passed
            ? "Passed"
            : "Try Again";


    knowledgeCheckStatus.className =
        `knowledge-check-status ${
            passed
                ? "passed"
                : "failed"
        }`;


    completeLessonBtn.disabled =
        !passed;


    completionMessage.textContent =
        passed
            ? "You passed the knowledge check. Mark the lesson complete to continue."
            : "Review the lesson material and try the knowledge check again.";

}


/* =========================================================
   LESSON NAVIGATION
========================================================= */

function renderNavigation() {

    /*
     * This is the first lesson.
     *
     * We'll replace this with
     * dynamic course navigation
     * once more lessons are added.
     */

    previousLessonBtn.classList.add(
        "disabled"
    );

    previousLessonBtn.removeAttribute(
        "href"
    );


    nextLessonBtn.href =
        "lesson.html?lesson=csf-m01-l02";


    nextLessonBtn.querySelector(
        "strong"
    ).textContent =
        "Why Cybersecurity Matters";


    lessonNavigation.innerHTML =
        `
            <a
                href="lesson.html?lesson=csf-m01-l01"
                class="lesson-nav-item active"
            >

                <span class="lesson-nav-icon">

                    <i class="fa-solid fa-book-open"></i>

                </span>


                <span>

                    <small>
                        LESSON 01
                    </small>

                    <strong>
                        What Is Cybersecurity?
                    </strong>

                </span>

            </a>


            <div class="lesson-nav-item locked">

                <span class="lesson-nav-icon">

                    <i class="fa-solid fa-lock"></i>

                </span>


                <span>

                    <small>
                        LESSON 02
                    </small>

                    <strong>
                        Why Cybersecurity Matters
                    </strong>

                </span>

            </div>


            <div class="lesson-nav-item locked">

                <span class="lesson-nav-icon">

                    <i class="fa-solid fa-lock"></i>

                </span>


                <span>

                    <small>
                        LESSON 03
                    </small>

                    <strong>
                        The Cybersecurity Landscape
                    </strong>

                </span>

            </div>


            <div class="lesson-nav-item locked">

                <span class="lesson-nav-icon">

                    <i class="fa-solid fa-lock"></i>

                </span>


                <span>

                    <small>
                        LESSON 04
                    </small>

                    <strong>
                        Threats, Vulnerabilities and Risk
                    </strong>

                </span>

            </div>


            <div class="lesson-nav-item locked">

                <span class="lesson-nav-icon">

                    <i class="fa-solid fa-lock"></i>

                </span>


                <span>

                    <small>
                        LESSON 05
                    </small>

                    <strong>
                        Security Controls
                    </strong>

                </span>

            </div>
        `;

}


/* =========================================================
   RENDER LESSON
========================================================= */

function renderLesson(
    lesson
) {

    lessonCourseBreadcrumb.textContent =
        lesson.courseTitle;


    lessonModuleBreadcrumb.textContent =
        `Module ${lesson.moduleNumber}`;


    sidebarCourseTitle.textContent =
        lesson.courseTitle;


    sidebarModuleNumber.textContent =
        `MODULE ${String(
            lesson.moduleNumber
        ).padStart(2, "0")}`;


    sidebarModuleTitle.textContent =
        lesson.moduleTitle;


    lessonTitle.textContent =
        lesson.title;


    lessonDuration.textContent =
        lesson.duration;


    backToCourse.href =
        `course-details.html?course=${encodeURIComponent(
            lesson.courseId
        )}`;


    renderObjectives(
        lesson.objectives
    );


    renderLessonSections(
        lesson.sections
    );


    renderTakeaways(
        lesson.takeaways
    );


    renderKnowledgeCheck(
        lesson.knowledgeCheck
    );


    renderNavigation();

}


/* =========================================================
   MARK COMPLETE
========================================================= */

function completeLesson() {

    if (!knowledgeCheckPassed) {

        return;

    }


    /*
     * Temporary local progress.
     *
     * Firebase/Firestore persistence
     * will replace this later.
     */

    const progressKey =
        `cws-progress-${currentUser.uid}`;


    const progress =
        JSON.parse(
            localStorage.getItem(
                progressKey
            ) || "{}"
        );


    progress[currentLesson.id] = {
        completed: true,
        completedAt:
            new Date().toISOString()
    };


    localStorage.setItem(
        progressKey,
        JSON.stringify(
            progress
        )
    );


    completeLessonBtn.innerHTML =
        `
            <i class="fa-solid fa-circle-check"></i>

            Lesson Completed
        `;


    completeLessonBtn.classList.add(
        "completed"
    );


    completeLessonBtn.disabled =
        true;


    completionMessage.textContent =
        "Lesson completed. Continue to the next lesson.";

}


/* =========================================================
   LOGOUT
========================================================= */

async function logout() {

    try {

        logoutBtn.disabled =
            true;


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


        logoutBtn.disabled =
            false;


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


if (submitKnowledgeCheck) {

    submitKnowledgeCheck.addEventListener(
        "click",
        checkKnowledge
    );

}


if (completeLessonBtn) {

    completeLessonBtn.addEventListener(
        "click",
        completeLesson
    );

}


/* =========================================================
   LOAD LESSON
========================================================= */

function loadLesson() {

    const lessonId =
        getLessonId();


    const lesson =
        lessons[lessonId];


    if (!lesson) {

        warn(
            "Lesson not found:",
            lessonId
        );


        lessonLoading.hidden =
            true;

        lessonNotFound.hidden =
            false;

        return;

    }


    currentLesson =
        lesson;


    renderLesson(
        lesson
    );


    lessonLoading.hidden =
        true;


    lessonNotFound.hidden =
        true;


    lessonContent.hidden =
        false;


    log(
        "Lesson loaded:",
        lesson.title
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

            if (!user) {

                currentUser =
                    null;


                window.location.replace(
                    "../pages/login.html?redirect=lesson"
                );


                return;

            }


            currentUser =
                user;


            try {

                await user.reload();

            } catch (err) {

                warn(
                    "Unable to refresh user:",
                    err
                );

            }


            displayStudent(
                auth.currentUser ||
                user
            );


            loadLesson();

        }
    );

}


/* =========================================================
   INITIAL LOAD
========================================================= */

log(
    "lesson.js loaded."
);
