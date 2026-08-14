/* =========================================================
   CWS ACADEMY
   CYBERSECURITY FUNDAMENTALS
   LESSON PAGE JAVASCRIPT
   Matched to lesson.html + lesson.css
========================================================= */

"use strict";

/* =========================================================
   CONFIGURATION
========================================================= */

const COURSE_ID = "cybersecurity-fundamentals";
const COURSE_TITLE = "Cybersecurity Fundamentals";
const TOTAL_LESSONS = 24;

const STORAGE_KEYS = {
    student: "cws_student",
    completed: "cws_completed_lessons"
};


/* =========================================================
   LESSON DATA
   Replace / expand the content below with your real lessons.
========================================================= */

const lessons = [
    {
        id: 1,
        module: 1,
        moduleTitle: "Cybersecurity Foundations",
        title: "Introduction to Cybersecurity",
        description:
            "Learn what cybersecurity is, why it matters, and how security professionals protect digital systems and information.",
        objectives: [
            "Define cybersecurity and information security.",
            "Explain why cybersecurity is important.",
            "Identify common cybersecurity responsibilities.",
            "Understand the cybersecurity threat landscape."
        ],
        content: `
            <h2>What Is Cybersecurity?</h2>

            <p>
                Cybersecurity is the practice of protecting computers, networks,
                applications, systems, and data from unauthorized access,
                disruption, alteration, destruction, or theft.
            </p>

            <p>
                Modern organizations depend heavily on technology. This makes
                cybersecurity an essential part of almost every business,
                government organization, and individual digital experience.
            </p>

            <div class="lesson-callout">
                <strong>Key Concept</strong>
                <p>
                    Cybersecurity is not only about preventing hackers from
                    accessing systems. It is about protecting the confidentiality,
                    integrity, and availability of information.
                </p>
            </div>

            <h2>The CIA Triad</h2>

            <p>
                The three fundamental objectives of information security are
                commonly represented by the CIA triad.
            </p>

            <div class="lesson-info-grid">

                <div class="lesson-info-card">
                    <h3>Confidentiality</h3>
                    <p>
                        Ensuring that information is accessible only to
                        authorized individuals and systems.
                    </p>
                </div>

                <div class="lesson-info-card">
                    <h3>Integrity</h3>
                    <p>
                        Ensuring that information remains accurate,
                        complete, and protected from unauthorized modification.
                    </p>
                </div>

                <div class="lesson-info-card">
                    <h3>Availability</h3>
                    <p>
                        Ensuring that systems and information remain available
                        when authorized users need them.
                    </p>
                </div>

            </div>

            <h2>Why Cybersecurity Matters</h2>

            <p>
                A successful cyberattack can result in financial losses,
                operational disruption, reputational damage, privacy violations,
                and the exposure of sensitive information.
            </p>

            <ul>
                <li>Protect sensitive information.</li>
                <li>Prevent unauthorized access.</li>
                <li>Maintain reliable business operations.</li>
                <li>Reduce the impact of cyber threats.</li>
                <li>Support regulatory and security requirements.</li>
            </ul>

            <h3>Think Like a Security Professional</h3>

            <p>
                Good cybersecurity begins with understanding what needs to be
                protected, identifying possible threats, evaluating weaknesses,
                and implementing appropriate security controls.
            </p>
        `
    },

    {
        id: 2,
        module: 1,
        moduleTitle: "Cybersecurity Foundations",
        title: "Threats, Vulnerabilities and Risks",
        description:
            "Understand the relationship between threats, vulnerabilities, risks, and security controls.",
        objectives: [
            "Define threat, vulnerability, and risk.",
            "Explain how vulnerabilities can be exploited.",
            "Identify common sources of cyber risk.",
            "Understand the purpose of security controls."
        ],
        content: `
            <h2>Threats</h2>

            <p>
                A threat is anything capable of causing harm to an information
                system, organization, or user.
            </p>

            <h2>Vulnerabilities</h2>

            <p>
                A vulnerability is a weakness that could potentially be
                exploited by a threat.
            </p>

            <h2>Risk</h2>

            <p>
                Cybersecurity risk exists when a threat can exploit a
                vulnerability and cause an undesirable impact.
            </p>

            <div class="lesson-callout">
                <strong>Remember</strong>
                <p>
                    A vulnerability does not automatically mean that an attack
                    will happen. Risk depends on factors such as likelihood
                    and potential impact.
                </p>
            </div>

            <h2>Security Controls</h2>

            <p>
                Security controls are safeguards designed to reduce security
                risks. Examples include access controls, firewalls, encryption,
                backups, monitoring, and security awareness training.
            </p>
        `
    },

    {
        id: 3,
        module: 1,
        moduleTitle: "Cybersecurity Foundations",
        title: "Authentication and Access Control",
        description:
            "Learn how organizations verify identities and control access to resources.",
        objectives: [
            "Explain authentication.",
            "Explain authorization.",
            "Understand multi-factor authentication.",
            "Identify common access-control principles."
        ],
        content: `
            <h2>Authentication</h2>

            <p>
                Authentication is the process of verifying who a user,
                device, or service claims to be.
            </p>

            <h2>Authorization</h2>

            <p>
                Authorization determines what an authenticated identity is
                allowed to access or perform.
            </p>

            <h2>Multi-Factor Authentication</h2>

            <p>
                Multi-factor authentication uses two or more different
                authentication factors to strengthen account security.
            </p>

            <ul>
                <li>Something you know.</li>
                <li>Something you have.</li>
                <li>Something you are.</li>
            </ul>
        `
    }
];


/* =========================================================
   AUTOMATICALLY GENERATE REMAINING LESSONS
   This keeps the course at 24 lessons while allowing you
   to replace them with your real lesson content later.
========================================================= */

const moduleDefinitions = [
    {
        module: 1,
        title: "Cybersecurity Foundations"
    },
    {
        module: 2,
        title: "Networking Fundamentals"
    },
    {
        module: 3,
        title: "Operating Systems"
    },
    {
        module: 4,
        title: "Security Operations"
    },
    {
        module: 5,
        title: "Web and Application Security"
    },
    {
        module: 6,
        title: "Incident Response"
    }
];

const defaultLessonTitles = [
    "Security Principles",
    "Threats, Vulnerabilities and Risks",
    "Authentication and Access Control",
    "Security Policies and Procedures",
    "Networking Fundamentals",
    "IP Addresses and Networking",
    "Ports and Protocols",
    "Firewalls and Network Security",
    "Operating System Security",
    "Linux Security Fundamentals",
    "Windows Security Fundamentals",
    "File Permissions and Access",
    "Malware and Malicious Software",
    "Phishing and Social Engineering",
    "Endpoint Security",
    "Logging and Monitoring",
    "Web Security Fundamentals",
    "Application Security",
    "Data Protection and Encryption",
    "Incident Response",
    "Digital Forensics Fundamentals",
    "Security Testing",
    "Security Awareness",
    "Cybersecurity Career Fundamentals"
];

const existingLessonIds = new Set(
    lessons.map((lesson) => lesson.id)
);

for (let id = 1; id <= TOTAL_LESSONS; id++) {

    if (existingLessonIds.has(id)) {
        continue;
    }

    const moduleIndex = Math.min(
        Math.floor((id - 1) / 4),
        moduleDefinitions.length - 1
    );

    const moduleData = moduleDefinitions[moduleIndex];

    lessons.push({
        id,
        module: moduleData.module,
        moduleTitle: moduleData.title,
        title: defaultLessonTitles[id - 1] || `Lesson ${id}`,
        description:
            `Learn the fundamental concepts, terminology, and security practices covered in ${defaultLessonTitles[id - 1] || `Lesson ${id}`}.`,
        objectives: [
            `Understand the fundamentals of ${defaultLessonTitles[id - 1] || `Lesson ${id}`}.`,
            "Identify important cybersecurity concepts.",
            "Explain why the topic matters to security professionals.",
            "Apply the concepts to practical security situations."
        ],
        content: `
            <h2>${defaultLessonTitles[id - 1] || `Lesson ${id}`}</h2>

            <p>
                This lesson introduces the core concepts associated with
                <strong>${defaultLessonTitles[id - 1] || `Lesson ${id}`}</strong>.
            </p>

            <div class="lesson-callout">
                <strong>Lesson Note</strong>
                <p>
                    Replace this section with the full lesson material for
                    this module.
                </p>
            </div>

            <h2>Key Concepts</h2>

            <ul>
                <li>Understand the terminology used in this area.</li>
                <li>Identify common security considerations.</li>
                <li>Understand how the topic relates to cybersecurity.</li>
                <li>Apply the knowledge to practical scenarios.</li>
            </ul>

            <h3>Security Perspective</h3>

            <p>
                Security professionals should understand both the technical
                and operational implications of this topic.
            </p>
        `
    });
}

lessons.sort((a, b) => a.id - b.id);


/* =========================================================
   DOM ELEMENTS
========================================================= */

const elements = {
    studentName: document.getElementById("studentName"),

    logoutBtn: document.getElementById("logoutBtn"),

    moduleList: document.getElementById("lessonModuleList"),

    progressPercent:
        document.getElementById("lessonProgressPercent"),

    progressFill:
        document.getElementById("lessonProgressFill"),

    progressText:
        document.getElementById("lessonProgressText"),

    loading:
        document.getElementById("lessonLoading"),

    notFound:
        document.getElementById("lessonNotFound"),

    content:
        document.getElementById("lessonContent"),

    breadcrumbCourse:
        document.getElementById("breadcrumbCourse"),

    breadcrumbModule:
        document.getElementById("breadcrumbModule"),

    moduleNumber:
        document.getElementById("lessonModuleNumber"),

    lessonNumber:
        document.getElementById("lessonNumber"),

    title:
        document.getElementById("lessonTitle"),

    description:
        document.getElementById("lessonDescription"),

    objectives:
        document.getElementById("lessonObjectives"),

    body:
        document.getElementById("lessonBody"),

    completeBtn:
        document.getElementById("markCompleteBtn"),

    previousBtn:
        document.getElementById("previousLessonBtn"),

    nextBtn:
        document.getElementById("nextLessonBtn")
};


/* =========================================================
   CURRENT LESSON
========================================================= */

let currentLesson = null;


/* =========================================================
   STORAGE HELPERS
========================================================= */

function getCompletedLessons() {

    try {

        const stored = localStorage.getItem(
            STORAGE_KEYS.completed
        );

        if (!stored) {
            return [];
        }

        const parsed = JSON.parse(stored);

        return Array.isArray(parsed)
            ? parsed.map(Number).filter(Boolean)
            : [];

    } catch (error) {

        console.error(
            "Unable to read completed lessons:",
            error
        );

        return [];
    }
}


function saveCompletedLessons(completed) {

    try {

        localStorage.setItem(
            STORAGE_KEYS.completed,
            JSON.stringify(
                [...new Set(completed)]
            )
        );

    } catch (error) {

        console.error(
            "Unable to save lesson progress:",
            error
        );
    }
}


/* =========================================================
   STUDENT
========================================================= */

function getStudentName() {

    try {

        const stored =
            localStorage.getItem(
                STORAGE_KEYS.student
            );

        if (!stored) {
            return "Student";
        }

        /*
         * Supports:
         * "Sandiso"
         * {"name":"Sandiso"}
         * {"fullName":"Sandiso"}
         */

        try {

            const parsed = JSON.parse(stored);

            if (typeof parsed === "string") {
                return parsed;
            }

            if (parsed?.name) {
                return parsed.name;
            }

            if (parsed?.fullName) {
                return parsed.fullName;
            }

            if (parsed?.firstName) {
                return parsed.firstName;
            }

        } catch {
            return stored;
        }

        return "Student";

    } catch {

        return "Student";
    }
}


function renderStudentName() {

    if (elements.studentName) {
        elements.studentName.textContent =
            getStudentName();
    }
}


/* =========================================================
   URL / LESSON ID
========================================================= */

function getLessonIdFromURL() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    /*
     * Supports:
     * lesson=1
     * id=1
     * lessonId=1
     */

    const value =
        params.get("lesson") ||
        params.get("lessonId") ||
        params.get("id");

    const id = Number(value);

    if (
        Number.isInteger(id) &&
        id > 0
    ) {
        return id;
    }

    return 1;
}


/* =========================================================
   MODULE GROUPING
========================================================= */

function groupLessonsByModule() {

    const groups = new Map();

    lessons.forEach((lesson) => {

        if (!groups.has(lesson.module)) {

            groups.set(
                lesson.module,
                {
                    module: lesson.module,
                    title: lesson.moduleTitle,
                    lessons: []
                }
            );

        }

        groups
            .get(lesson.module)
            .lessons
            .push(lesson);
    });

    return [...groups.values()];
}


/* =========================================================
   SIDEBAR
========================================================= */

function renderModuleList() {

    if (!elements.moduleList) {
        return;
    }

    const completed =
        new Set(getCompletedLessons());

    const groups =
        groupLessonsByModule();

    elements.moduleList.innerHTML = "";

    groups.forEach((group) => {

        const section =
            document.createElement("div");

        section.className =
            "module-section";

        const heading =
            document.createElement("div");

        heading.className =
            "module-section-title";

        heading.textContent =
            `Module ${String(group.module).padStart(2, "0")} — ${group.title}`;

        section.appendChild(heading);

        group.lessons.forEach((lesson) => {

            const link =
                document.createElement("a");

            link.href =
                `./lesson.html?lesson=${lesson.id}`;

            link.className =
                "lesson-module-item";

            if (
                currentLesson &&
                lesson.id === currentLesson.id
            ) {
                link.classList.add("active");
            }

            if (completed.has(lesson.id)) {
                link.classList.add("completed");
            }

            const number =
                document.createElement("span");

            number.className =
                "lesson-module-item-number";

            number.textContent =
                String(lesson.id).padStart(2, "0");


            const title =
                document.createElement("span");

            title.className =
                "lesson-module-item-title";

            title.textContent =
                lesson.title;


            const icon =
                document.createElement("i");

            icon.className =
                completed.has(lesson.id)
                    ? "fa-solid fa-check"
                    : "fa-solid fa-chevron-right";

            link.append(
                number,
                title,
                icon
            );

            section.appendChild(link);
        });

        elements.moduleList.appendChild(section);
    });
}


/* =========================================================
   PROGRESS
========================================================= */

function renderProgress() {

    const completed =
        getCompletedLessons();

    const validCompleted =
        completed.filter((id) =>
            lessons.some(
                (lesson) => lesson.id === id
            )
        );

    const count =
        validCompleted.length;

    const percentage =
        Math.round(
            (count / TOTAL_LESSONS) * 100
        );

    if (elements.progressPercent) {

        elements.progressPercent.textContent =
            `${percentage}%`;
    }

    if (elements.progressFill) {

        elements.progressFill.style.width =
            `${percentage}%`;
    }

    if (elements.progressText) {

        elements.progressText.textContent =
            `${count} of ${TOTAL_LESSONS} lessons completed`;
    }

    const progressBar =
        document.querySelector(
            ".lesson-progress-bar"
        );

    if (progressBar) {

        progressBar.setAttribute(
            "aria-valuenow",
            String(percentage)
        );
    }
}


/* =========================================================
   OBJECTIVES
========================================================= */

function renderObjectives(objectives) {

    if (!elements.objectives) {
        return;
    }

    elements.objectives.innerHTML = "";

    (objectives || []).forEach((objective) => {

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

        li.append(
            icon,
            text
        );

        elements.objectives.appendChild(li);
    });
}


/* =========================================================
   LESSON HEADER
========================================================= */

function renderLessonHeader() {

    if (!currentLesson) {
        return;
    }

    if (elements.breadcrumbCourse) {

        elements.breadcrumbCourse.textContent =
            COURSE_TITLE;
    }

    if (elements.breadcrumbModule) {

        elements.breadcrumbModule.textContent =
            `Module ${String(currentLesson.module).padStart(2, "0")} — ${currentLesson.moduleTitle}`;
    }

    if (elements.moduleNumber) {

        elements.moduleNumber.textContent =
            `MODULE ${String(currentLesson.module).padStart(2, "0")}`;
    }

    if (elements.lessonNumber) {

        elements.lessonNumber.textContent =
            `LESSON ${String(currentLesson.id).padStart(2, "0")}`;
    }

    if (elements.title) {

        elements.title.textContent =
            currentLesson.title;
    }

    if (elements.description) {

        elements.description.textContent =
            currentLesson.description;
    }

    document.title =
        `CWS Academy | ${currentLesson.title}`;
}


/* =========================================================
   LESSON BODY
========================================================= */

function renderLessonBody() {

    if (!elements.body || !currentLesson) {
        return;
    }

    elements.body.innerHTML =
        currentLesson.content || "";
}


/* =========================================================
   COMPLETION
========================================================= */

function isLessonCompleted() {

    if (!currentLesson) {
        return false;
    }

    return getCompletedLessons()
        .includes(currentLesson.id);
}


function renderCompletionState() {

    if (!elements.completeBtn) {
        return;
    }

    const completed =
        isLessonCompleted();

    elements.completeBtn.classList.toggle(
        "completed",
        completed
    );

    const icon =
        elements.completeBtn.querySelector("i");

    const text =
        elements.completeBtn.querySelector("span");

    if (icon) {

        icon.className =
            completed
                ? "fa-solid fa-check-double"
                : "fa-solid fa-check";
    }

    if (text) {

        text.textContent =
            completed
                ? "Lesson Completed"
                : "Mark Lesson Complete";
    }

    elements.completeBtn.setAttribute(
        "aria-pressed",
        String(completed)
    );
}


function toggleLessonCompletion() {

    if (!currentLesson) {
        return;
    }

    let completed =
        getCompletedLessons();

    const index =
        completed.indexOf(
            currentLesson.id
        );

    if (index === -1) {

        completed.push(
            currentLesson.id
        );

    } else {

        completed.splice(index, 1);
    }

    saveCompletedLessons(completed);

    renderCompletionState();
    renderProgress();
    renderModuleList();
}


/* =========================================================
   LESSON NAVIGATION
========================================================= */

function createNavigationButton(
    button,
    lesson,
    label
) {

    if (!button || !lesson) {
        return;
    }

    button.hidden = false;

    button.href =
        `./lesson.html?lesson=${lesson.id}`;

    const small =
        button.querySelector("small");

    const strong =
        button.querySelector("strong");

    if (small) {
        small.textContent = label;
    }

    if (strong) {
        strong.textContent = lesson.title;
    }
}


function renderNavigation() {

    if (!currentLesson) {
        return;
    }

    const index =
        lessons.findIndex(
            (lesson) =>
                lesson.id === currentLesson.id
        );

    const previous =
        index > 0
            ? lessons[index - 1]
            : null;

    const next =
        index < lessons.length - 1
            ? lessons[index + 1]
            : null;


    if (elements.previousBtn) {

        elements.previousBtn.hidden =
            !previous;

        if (previous) {

            createNavigationButton(
                elements.previousBtn,
                previous,
                "Previous"
            );
        }
    }


    if (elements.nextBtn) {

        elements.nextBtn.hidden =
            !next;

        if (next) {

            createNavigationButton(
                elements.nextBtn,
                next,
                "Next"
            );
        }
    }
}


/* =========================================================
   NOT FOUND
========================================================= */

function showNotFound() {

    if (elements.loading) {
        elements.loading.hidden = true;
    }

    if (elements.content) {
        elements.content.hidden = true;
    }

    if (elements.notFound) {
        elements.notFound.hidden = false;
    }
}


function showLesson() {

    if (elements.loading) {
        elements.loading.hidden = true;
    }

    if (elements.notFound) {
        elements.notFound.hidden = true;
    }

    if (elements.content) {
        elements.content.hidden = false;
    }
}


/* =========================================================
   LOGOUT
========================================================= */

function handleLogout() {

    if (!elements.logoutBtn) {
        return;
    }

    elements.logoutBtn.classList.add(
        "is-loading"
    );

    const icon =
        elements.logoutBtn.querySelector("i");

    const text =
        elements.logoutBtn.querySelector("span");

    if (icon) {
        icon.className =
            "fa-solid fa-spinner fa-spin";
    }

    if (text) {
        text.textContent =
            "Logging out...";
    }

    /*
     * Remove only the CWS session/student data.
     * Course progress is intentionally kept.
     */

    try {
        localStorage.removeItem(
            STORAGE_KEYS.student
        );

        localStorage.removeItem(
            "cws_user"
        );

        localStorage.removeItem(
            "cws_session"
        );
    } catch (error) {
        console.error(
            "Logout storage cleanup failed:",
            error
        );
    }

    setTimeout(() => {

        window.location.href =
            "./index.html";

    }, 350);
}


/* =========================================================
   EVENT LISTENERS
========================================================= */

function bindEvents() {

    if (elements.completeBtn) {

        elements.completeBtn.addEventListener(
            "click",
            toggleLessonCompletion
        );
    }

    if (elements.logoutBtn) {

        elements.logoutBtn.addEventListener(
            "click",
            handleLogout
        );
    }


    /*
     * Keyboard shortcuts
     *
     * ArrowLeft  = previous lesson
     * ArrowRight = next lesson
     * C          = mark complete
     */

    document.addEventListener(
        "keydown",
        (event) => {

            const tag =
                document.activeElement?.tagName;

            if (
                tag === "INPUT" ||
                tag === "TEXTAREA" ||
                tag === "SELECT"
            ) {
                return;
            }


            if (
                event.key === "ArrowLeft" &&
                elements.previousBtn &&
                !elements.previousBtn.hidden
            ) {

                window.location.href =
                    elements.previousBtn.href;

                return;
            }


            if (
                event.key === "ArrowRight" &&
                elements.nextBtn &&
                !elements.nextBtn.hidden
            ) {

                window.location.href =
                    elements.nextBtn.href;

                return;
            }


            if (
                event.key.toLowerCase() === "c"
            ) {

                toggleLessonCompletion();
            }
        }
    );
}


/* =========================================================
   LOAD LESSON
========================================================= */

function loadLesson() {

    const lessonId =
        getLessonIdFromURL();

    currentLesson =
        lessons.find(
            (lesson) =>
                lesson.id === lessonId
        );


    if (!currentLesson) {

        showNotFound();

        renderProgress();
        renderModuleList();

        return;
    }


    renderLessonHeader();

    renderObjectives(
        currentLesson.objectives
    );

    renderLessonBody();

    renderCompletionState();

    renderNavigation();

    renderProgress();

    renderModuleList();

    showLesson();
}


/* =========================================================
   INITIALIZE
========================================================= */

function init() {

    renderStudentName();

    bindEvents();

    loadLesson();
}


/* =========================================================
   START
========================================================= */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        init
    );

} else {

    init();
}
