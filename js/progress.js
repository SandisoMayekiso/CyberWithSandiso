/* =========================================================
   CWS ACADEMY
   STUDENT PROGRESS CONTROLLER
========================================================= */

const COURSES = [
    {
        id: "cybersecurity-fundamentals",
        title: "Cybersecurity Fundamentals",
        level: "BEGINNER",
        icon: "fa-shield-halved",
        description:
            "Build a strong foundation in cybersecurity concepts, threats, vulnerabilities and security practices.",
        modules: 10,
        completed: 0,
        labs: 0,
        assessments: 0,
        href: "lessons.html?course=cybersecurity-fundamentals"
    },

    {
        id: "networking-fundamentals",
        title: "Networking Fundamentals",
        level: "BEGINNER",
        icon: "fa-network-wired",
        description:
            "Learn networking concepts from an information security perspective.",
        modules: 10,
        completed: 0,
        labs: 0,
        assessments: 0,
        href: "lessons.html?course=networking-fundamentals"
    },

    {
        id: "linux-fundamentals",
        title: "Linux Fundamentals",
        level: "BEGINNER",
        icon: "fa-terminal",
        description:
            "Learn Linux commands, filesystems, permissions, processes and security fundamentals.",
        modules: 10,
        completed: 0,
        labs: 0,
        assessments: 0,
        href: "lessons.html?course=linux-fundamentals"
    }
];


function clamp(value, min = 0, max = 100) {
    return Math.min(Math.max(Number(value) || 0, min), max);
}


function calculateCourseProgress(course) {

    if (!course.modules) {
        return 0;
    }

    return clamp(
        Math.round(
            (course.completed / course.modules) * 100
        )
    );
}


function renderCourses() {

    const container =
        document.getElementById("courseProgressList");

    const emptyState =
        document.getElementById("noCourseProgress");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    if (!COURSES.length) {

        if (emptyState) {
            emptyState.hidden = false;
        }

        return;
    }

    if (emptyState) {
        emptyState.hidden = true;
    }

    COURSES.forEach(course => {

        const progress =
            calculateCourseProgress(course);

        const card =
            document.createElement("article");

        card.className =
            "course-progress-card";

        card.innerHTML = `
            <div class="course-progress-card-top">

                <div class="course-progress-icon">
                    <i class="fa-solid ${course.icon}"></i>
                </div>

                <span class="course-level">
                    ${course.level}
                </span>

            </div>

            <h3>
                ${course.title}
            </h3>

            <p>
                ${course.description}
            </p>

            <div class="course-progress-value">

                <span>
                    Course Completion
                </span>

                <strong>
                    ${progress}%
                </strong>

            </div>

            <div class="course-progress-track">

                <div
                    class="course-progress-bar"
                    style="width: ${progress}%"
                ></div>

            </div>

            <div class="course-progress-meta">

                <span>
                    <i class="fa-solid fa-book"></i>
                    ${course.completed}/${course.modules} Modules
                </span>

                <span>
                    <i class="fa-solid fa-flask"></i>
                    ${course.labs} Labs
                </span>

                <span>
                    <i class="fa-solid fa-check"></i>
                    ${course.assessments}
                </span>

            </div>

            <a
                href="${course.href}"
                class="progress-primary-btn"
                style="width:100%; margin-top:20px;"
            >
                Continue
                <i class="fa-solid fa-arrow-right"></i>
            </a>
        `;

        container.appendChild(card);

    });
}


function calculateOverallProgress() {

    if (!COURSES.length) {
        return 0;
    }

    const total =
        COURSES.reduce(
            (sum, course) =>
                sum + calculateCourseProgress(course),
            0
        );

    return Math.round(
        total / COURSES.length
    );
}


function updateOverallProgress() {

    const progress =
        calculateOverallProgress();

    const percentage =
        document.getElementById(
            "overallProgressPercent"
        );

    const heroPercentage =
        document.getElementById(
            "heroProgressPercent"
        );

    const heroRing =
        document.querySelector(
            ".progress-ring"
        );

    const progressBar =
        document.getElementById(
            "overallProgressBar"
        );

    const progressText =
        document.getElementById(
            "overallProgressText"
        );

    if (percentage) {
        percentage.textContent =
            `${progress}%`;
    }

    if (heroPercentage) {
        heroPercentage.textContent =
            `${progress}%`;
    }

    if (progressBar) {
        progressBar.style.width =
            `${progress}%`;
    }

    if (heroRing) {

        const degrees =
            Math.round(
                progress * 3.6
            );

        heroRing.style.background =
            `conic-gradient(
                #00ffaa ${degrees}deg,
                rgba(255,255,255,.06) ${degrees}deg
            )`;
    }

    if (progressText) {

        if (progress === 0) {

            progressText.textContent =
                "Start a course to begin building your progress.";

        } else if (progress >= 100) {

            progressText.textContent =
                "Excellent work. Your learning pathway is complete.";

        } else {

            progressText.textContent =
                "Keep going. Your cybersecurity skills are growing.";
        }
    }
}


function updateStatistics() {

    const courses =
        document.getElementById(
            "coursesStarted"
        );

    const lessons =
        document.getElementById(
            "lessonsCompleted"
        );

    const labs =
        document.getElementById(
            "labsCompleted"
        );

    const assessments =
        document.getElementById(
            "assessmentsCompleted"
        );

    const started =
        COURSES.filter(
            course => course.completed > 0
        ).length;

    const completedLessons =
        COURSES.reduce(
            (sum, course) =>
                sum + course.completed,
            0
        );

    const completedLabs =
        COURSES.reduce(
            (sum, course) =>
                sum + course.labs,
            0
        );

    const completedAssessments =
        COURSES.reduce(
            (sum, course) =>
                sum + course.assessments,
            0
        );

    if (courses) {
        courses.textContent = started;
    }

    if (lessons) {
        lessons.textContent = completedLessons;
    }

    if (labs) {
        labs.textContent = completedLabs;
    }

    if (assessments) {
        assessments.textContent =
            completedAssessments;
    }
}


function initialiseProgressPage() {

    renderCourses();

    updateOverallProgress();

    updateStatistics();

}


document.addEventListener(
    "DOMContentLoaded",
    initialiseProgressPage
);
