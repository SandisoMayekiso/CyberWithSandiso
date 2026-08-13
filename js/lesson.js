/* =========================================================
   CWS ACADEMY
   LESSON SYSTEM
   Firebase Authentication + Lesson Progress
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


const completeLessonBtn =
    document.getElementById(
        "completeLessonBtn"
    );


const nextLessonBtn =
    document.getElementById(
        "nextLessonBtn"
    );


const lessonProgressFill =
    document.getElementById(
        "lessonProgressFill"
    );


const lessonProgressPercent =
    document.getElementById(
        "lessonProgressPercent"
    );


const lessonProgressText =
    document.getElementById(
        "lessonProgressText"
    );


/* =========================================================
   STATE
========================================================= */

let currentUser = null;

let currentCourse = null;

let currentModule = null;

let currentLesson = null;


/* =========================================================
   COURSE DATA
========================================================= */

const courses = {

    "cybersecurity-fundamentals": {

        id: "cybersecurity-fundamentals",

        title: "Cybersecurity Fundamentals",

        totalLessons: 50,

        modules: {

            1: {

                title:
                    "Introduction to Cybersecurity",

                lessons: {

                    1: {

                        title:
                            "What Is Cybersecurity?",

                        subtitle:
                            "Understanding the purpose of cybersecurity and why it matters.",

                        duration:
                            "15 minutes"

                    },

                    2: {

                        title:
                            "The CIA Triad",

                        subtitle:
                            "Understanding confidentiality, integrity and availability.",

                        duration:
                            "20 minutes"

                    },

                    3: {

                        title:
                            "Assets, Threats and Vulnerabilities",

                        subtitle:
                            "Learn the fundamental building blocks of cybersecurity risk.",

                        duration:
                            "20 minutes"

                    },

                    4: {

                        title:
                            "Security Controls",

                        subtitle:
                            "Explore the different controls used to reduce security risk.",

                        duration:
                            "20 minutes"

                    },

                    5: {

                        title:
                            "Cybersecurity Roles and Responsibilities",

                        subtitle:
                            "Understand the people and responsibilities involved in security.",

                        duration:
                            "20 minutes"

                    },

                    6: {

                        title:
                            "Module 1 Knowledge Check",

                        subtitle:
                            "Test your understanding of the concepts introduced in Module 1.",

                        duration:
                            "15 minutes",

                        type:
                            "assessment"

                    }

                }

            }

        }

    }

};


/* =========================================================
   GET URL PARAMETERS
========================================================= */

function getLessonParameters() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    return {

        course:
            params.get("course"),

        module:
            Number(
                params.get("module")
            ),

        lesson:
            Number(
                params.get("lesson")
            )

    };

}


/* =========================================================
   FIND LESSON
========================================================= */

function loadLesson() {

    const {
        course,
        module,
        lesson
    } = getLessonParameters();


    if (
        !course ||
        !module ||
        !lesson
    ) {

        warn(
            "Missing lesson parameters."
        );

        return false;

    }


    const courseData =
        courses[course];


    if (!courseData) {

        warn(
            "Course not found:",
            course
        );

        return false;

    }


    const moduleData =
        courseData.modules[module];


    if (!moduleData) {

        warn(
            "Module not found:",
            module
        );

        return false;

    }


    const lessonData =
        moduleData.lessons[lesson];


    if (!lessonData) {

        warn(
            "Lesson not found:",
            lesson
        );

        return false;

    }


    currentCourse = {
        ...courseData,
        id: course
    };


    currentModule = {
        ...moduleData,
        id: module
    };


    currentLesson = {
        ...lessonData,
        id: lesson
    };


    return true;

}


/* =========================================================
   DISPLAY STUDENT
========================================================= */

function displayStudent(user) {

    if (!studentName) {

        return;

    }


    let name = "Student";


    if (
        user.displayName &&
        user.displayName.trim()
    ) {

        name =
            user.displayName.trim();

    } else if (
        user.email &&
        user.email.includes("@")
    ) {

        name =
            user.email
                .split("@")[0]
                .replace(/[._-]+/g, " ")
                .replace(/\s+/g, " ")
                .trim()
                .split(" ")
                .map(
                    word =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1)
                )
                .join(" ");

    }


    studentName.textContent =
        name;

}


/* =========================================================
   DISPLAY LESSON
========================================================= */

function displayLesson() {

    document.title =
        `${currentLesson.title} | CWS Academy`;


    const title =
        document.getElementById(
            "lessonTitle"
        );


    const subtitle =
        document.getElementById(
            "lessonSubtitle"
        );


    const duration =
        document.getElementById(
            "lessonDuration"
        );


    const lessonNumber =
        document.getElementById(
            "lessonNumber"
        );


    const moduleBadge =
        document.getElementById(
            "lessonModuleBadge"
        );


    const breadcrumbTitle =
        document.getElementById(
            "lessonBreadcrumbTitle"
        );


    if (title) {

        title.textContent =
            currentLesson.title;

    }


    if (subtitle) {

        subtitle.textContent =
            currentLesson.subtitle;

    }


    if (duration) {

        duration.textContent =
            currentLesson.duration;

    }


    if (lessonNumber) {

        lessonNumber.textContent =
            currentLesson.id;

    }


    if (moduleBadge) {

        moduleBadge.textContent =
            `MODULE ${currentModule.id}`;

    }


    if (breadcrumbTitle) {

        breadcrumbTitle.textContent =
            currentLesson.title;

    }


    const courseLink =
        document.getElementById(
            "lessonCourseLink"
        );


    if (courseLink) {

        courseLink.textContent =
            currentCourse.title;

        courseLink.href =
            `course-details.html?course=${currentCourse.id}`;

    }


    updateProgress();


    lessonLoading.hidden =
        true;


    lessonContent.hidden =
        false;

}


/* =========================================================
   PROGRESS
========================================================= */

function getCompletedLessons() {

    if (!currentUser) {

        return [];

    }


    const key =
        `cws_progress_${currentUser.uid}_${currentCourse.id}`;


    try {

        return JSON.parse(
            localStorage.getItem(key)
        ) || [];

    } catch {

        return [];

    }

}


function saveCompletedLessons(
    lessons
) {

    if (!currentUser) {

        return;

    }


    const key =
        `cws_progress_${currentUser.uid}_${currentCourse.id}`;


    localStorage.setItem(
        key,
        JSON.stringify(lessons)
    );

}


function getLessonKey() {

    return `${currentModule.id}-${currentLesson.id}`;

}


function isLessonComplete() {

    const completedLessons =
        getCompletedLessons();


    return completedLessons.includes(
        getLessonKey()
    );

}


function updateProgress() {

    const completedLessons =
        getCompletedLessons();


    const totalLessons =
        currentCourse.totalLessons;


    const completedCount =
        completedLessons.length;


    const percentage =
        Math.round(
            (completedCount / totalLessons) * 100
        );


    if (lessonProgressFill) {

        lessonProgressFill.style.width =
            `${percentage}%`;

    }


    if (lessonProgressPercent) {

        lessonProgressPercent.textContent =
            `${percentage}%`;

    }


    if (lessonProgressText) {

        lessonProgressText.textContent =
            `${completedCount} of ${totalLessons} lessons completed`;

    }


    updateCompletionButton();

}


/* =========================================================
   COMPLETION BUTTON
========================================================= */

function updateCompletionButton() {

    if (!completeLessonBtn) {

        return;

    }


    if (isLessonComplete()) {

        completeLessonBtn.classList.add(
            "completed"
        );


        completeLessonBtn.innerHTML =
            `
                <i class="fa-solid fa-check-double"></i>
                Lesson Completed
            `;


        completeLessonBtn.disabled =
            true;

    }

}


/* =========================================================
   COMPLETE LESSON
========================================================= */

function completeLesson() {

    if (!currentUser) {

        return;

    }


    const completedLessons =
        getCompletedLessons();


    const lessonKey =
        getLessonKey();


    if (
        !completedLessons.includes(
            lessonKey
        )
    ) {

        completedLessons.push(
            lessonKey
        );

    }


    saveCompletedLessons(
        completedLessons
    );


    updateProgress();


    log(
        "Lesson completed:",
        lessonKey
    );

}


/* =========================================================
   NEXT LESSON
========================================================= */

function goToNextLesson() {

    const nextLesson =
        currentLesson.id + 1;


    const nextModule =
        currentModule.id;


    const moduleLessons =
        currentCourse.modules[
            nextModule
        ]?.lessons;


    if (
        moduleLessons &&
        moduleLessons[nextLesson]
    ) {

        window.location.href =
            `lesson.html?course=${currentCourse.id}&module=${nextModule}&lesson=${nextLesson}`;

        return;

    }


    /*
     * No more lessons in the
     * current module.
     */

    alert(
        "You have reached the end of this module."
    );

}


/* =========================================================
   LOGOUT
========================================================= */

async function logout() {

    try {

        await signOut(
            auth
        );


        window.location.replace(
            "../pages/login.html"
        );

    } catch (error) {

        console.error(
            "[CWS Lesson] Logout failed:",
            error
        );


        alert(
            "Unable to sign out. Please try again."
        );

    }

}


/* =========================================================
   EVENTS
========================================================= */

if (completeLessonBtn) {

    completeLessonBtn.addEventListener(
        "click",
        completeLesson
    );

}


if (nextLessonBtn) {

    nextLessonBtn.addEventListener(
        "click",
        goToNextLesson
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

    window.location.replace(
        "../pages/login.html"
    );

} else {

    onAuthStateChanged(
        auth,
        async (user) => {

            if (!user) {

                window.location.replace(
                    "../pages/login.html?redirect=lesson"
                );

                return;

            }


            currentUser =
                user;


            try {

                await user.reload();

            } catch (error) {

                warn(
                    "Unable to refresh user:",
                    error
                );

            }


            displayStudent(
                auth.currentUser || user
            );


            /*
             * Load lesson from URL.
             */

            const loaded =
                loadLesson();


            if (!loaded) {

                lessonLoading.hidden =
                    true;

                lessonNotFound.hidden =
                    false;

                return;

            }


            displayLesson();


            log(
                "Lesson initialized successfully.",
                {
                    course:
                        currentCourse.id,

                    module:
                        currentModule.id,

                    lesson:
                        currentLesson.id
                }
            );

        }
    );

}


/* =========================================================
   INITIAL LOAD
========================================================= */

log(
    "lesson.js loaded."
);
