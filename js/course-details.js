/* =========================================================
   CWS ACADEMY
   COURSE DETAILS

   Generic Course Renderer
   Firebase Authentication
   Firestore Progress
   Dynamic Course Registry
========================================================= */


/* =========================================================
   FIREBASE AUTH
========================================================= */

import {

    onAuthStateChanged,

    signOut

} from
"https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";


/* =========================================================
   FIRESTORE
========================================================= */

import {

    doc,

    getDoc,

    setDoc,

    serverTimestamp

} from
"https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";


/* =========================================================
   FIREBASE CONFIG
========================================================= */

import {

    auth,

    db

} from "./firebase-config.js";


/* =========================================================
   COURSE REGISTRY
========================================================= */

import {

    getCourse

} from "../data/courses.js";


/* =========================================================
   DEBUG
========================================================= */

const DEBUG = true;


function log(...args) {

    if (DEBUG) {

        console.log(
            "[CWS Course Details]",
            ...args
        );

    }

}


function warn(...args) {

    if (DEBUG) {

        console.warn(
            "[CWS Course Details]",
            ...args
        );

    }

}


function error(...args) {

    console.error(
        "[CWS Course Details]",
        ...args
    );

}


/* =========================================================
   ELEMENTS
========================================================= */

const pageDescription =
    document.getElementById(
        "pageDescription"
    );


const courseLoading =
    document.getElementById(
        "courseLoading"
    );


const courseNotFound =
    document.getElementById(
        "courseNotFound"
    );


const courseNotFoundMessage =
    document.getElementById(
        "courseNotFoundMessage"
    );


const courseContent =
    document.getElementById(
        "courseContent"
    );


const studentName =
    document.getElementById(
        "studentName"
    );


const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );


const breadcrumbCourse =
    document.getElementById(
        "breadcrumbCourse"
    );


const courseStatus =
    document.getElementById(
        "courseStatus"
    );


const courseLevel =
    document.getElementById(
        "courseLevel"
    );


const courseCategory =
    document.getElementById(
        "courseCategory"
    );


const courseTitle =
    document.getElementById(
        "courseTitle"
    );


const courseDescription =
    document.getElementById(
        "courseDescription"
    );


const courseOverviewTitle =
    document.getElementById(
        "courseOverviewTitle"
    );


const courseLongDescription =
    document.getElementById(
        "courseLongDescription"
    );


const courseObjectives =
    document.getElementById(
        "courseObjectives"
    );


const courseHeroIcon =
    document.getElementById(
        "courseHeroIcon"
    );


const startCourseBtn =
    document.getElementById(
        "startCourseBtn"
    );


const courseInfoLevel =
    document.getElementById(
        "courseInfoLevel"
    );


const courseInfoModules =
    document.getElementById(
        "courseInfoModules"
    );


const courseInfoLessons =
    document.getElementById(
        "courseInfoLessons"
    );


const courseInfoDuration =
    document.getElementById(
        "courseInfoDuration"
    );


const courseInfoLabs =
    document.getElementById(
        "courseInfoLabs"
    );


const courseInfoAssessments =
    document.getElementById(
        "courseInfoAssessments"
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


const courseModules =
    document.getElementById(
        "courseModules"
    );


const courseCompletionSection =
    document.getElementById(
        "courseCompletionSection"
    );


const courseCompletionText =
    document.getElementById(
        "courseCompletionText"
    );


/* =========================================================
   STATE
========================================================= */

let currentUser = null;

let currentCourse = null;

let currentProgress = null;

let courseInitialized = false;


/* =========================================================
   URL
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

        typeof user.email ===
            "string" &&

        user.email.includes("@")

    ) {

        const rawName =

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
   TEXT HELPER
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
   PAGE STATES
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


function showCourseNotFound(
    message =
        "The course you're looking for does not exist, is unavailable, or has not yet been released."
) {

    if (courseLoading) {

        courseLoading.hidden =
            true;

    }


    if (courseContent) {

        courseContent.hidden =
            true;

    }


    if (courseNotFoundMessage) {

        courseNotFoundMessage.textContent =
            message;

    }


    if (courseNotFound) {

        courseNotFound.hidden =
            false;

    }

}


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
   TOTAL LESSONS
========================================================= */

function getTotalLessons(course) {

    if (

        !course ||

        !Array.isArray(
            course.modules
        )

    ) {

        return 0;

    }


    return course.modules.reduce(

        (
            total,
            module
        ) => {

            const count =

                Array.isArray(
                    module.lessons
                )
                    ? module.lessons.length
                    : 0;


            return total + count;

        },

        0

    );

}


/* =========================================================
   TOTAL LABS
========================================================= */

function getTotalLabs(course) {

    if (

        !course ||

        !Array.isArray(
            course.modules
        )

    ) {

        return 0;

    }


    return course.modules.reduce(

        (
            total,
            module
        ) => {

            return (

                total +

                Number(
                    module.labs || 0
                )

            );

        },

        0

    );

}


/* =========================================================
   TOTAL ASSESSMENTS
========================================================= */

function getTotalAssessments(
    course
) {

    if (

        !course ||

        !Array.isArray(
            course.modules
        )

    ) {

        return 0;

    }


    return course.modules.reduce(

        (
            total,
            module
        ) => {

            return (

                total +

                Number(
                    module.assessments || 0
                )

            );

        },

        0

    );

}


/* =========================================================
   FIRST MODULE
========================================================= */

function getFirstModule() {

    return (
        currentCourse
            ?.modules
            ?.[0] ||
        null
    );

}


/* =========================================================
   FIRST LESSON
========================================================= */

function getFirstLesson(
    module
) {

    if (

        !module ||

        !Array.isArray(
            module.lessons
        )

    ) {

        return null;

    }


    return (
        module.lessons[0] ||
        null
    );

}


/* =========================================================
   DEFAULT PROGRESS
========================================================= */

function getDefaultProgress() {

    const firstModule =
        getFirstModule();


    const firstLesson =
        getFirstLesson(
            firstModule
        );


    return {

        courseId:
            currentCourse?.id || "",

        completedLessons:
            [],

        completedLabs:
            [],

        completedAssessments:
            [],

        currentModule:
            firstModule?.id || "",

        currentLesson:
            firstLesson?.id || "",

        progressPercent:
            0,

        started:
            false,

        completed:
            false

    };

}


/* =========================================================
   NORMALIZE PROGRESS
========================================================= */

function normalizeProgress(
    progress = {}
) {

    const defaults =
        getDefaultProgress();


    return {

        ...defaults,

        ...progress,

        completedLessons:

            Array.isArray(
                progress.completedLessons
            )
                ? progress.completedLessons
                : [],

        completedLabs:

            Array.isArray(
                progress.completedLabs
            )
                ? progress.completedLabs
                : [],

        completedAssessments:

            Array.isArray(
                progress.completedAssessments
            )
                ? progress.completedAssessments
                : []

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


        updateProgressUI();

        return;

    }


    try {

        const progressRef =
            getProgressRef();


        if (!progressRef) {

            updateProgressUI();

            return;

        }


        const snapshot =
            await getDoc(
                progressRef
            );


        if (snapshot.exists()) {

            currentProgress =
                normalizeProgress(
                    snapshot.data()
                );

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

        !currentCourse ||

        !currentProgress

    ) {

        return;

    }


    try {

        const progressRef =
            getProgressRef();


        if (!progressRef) {

            return;

        }


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
   CALCULATE PROGRESS
========================================================= */

function calculateProgress() {

    if (

        !currentCourse ||

        !currentProgress

    ) {

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

        currentProgress
            .completedLessons
            .length;


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
   START BUTTON
========================================================= */

function updateStartCourseButton() {

    if (

        !startCourseBtn ||

        !currentProgress ||

        !currentCourse

    ) {

        return;

    }


    if (
        currentProgress.completed
    ) {

        startCourseBtn.innerHTML = `

            <i class="fa-solid fa-rotate-right"></i>

            Review Course

        `;

        return;

    }


    if (

        currentProgress.started ||

        currentProgress
            .completedLessons
            .length > 0

    ) {

        startCourseBtn.innerHTML = `

            <i class="fa-solid fa-play"></i>

            Continue Course

        `;

        return;

    }


    startCourseBtn.innerHTML = `

        <i class="fa-solid fa-play"></i>

        Start Course

    `;

}


/* =========================================================
   UPDATE PROGRESS UI
========================================================= */

function updateProgressUI() {

    if (

        !currentProgress ||

        !currentCourse

    ) {

        return;

    }


    const percent =
        calculateProgress();


    currentProgress.progressPercent =
        percent;


    currentProgress.completed =
        percent === 100;


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


    const completed =
        currentProgress
            .completedLessons
            .length;


    const total =
        getTotalLessons(
            currentCourse
        );


    if (courseProgressText) {

        if (percent === 0) {

            courseProgressText.textContent =

                `Start your first lesson to begin making progress through ${currentCourse.title}.`;

        }

        else if (percent < 100) {

            courseProgressText.textContent =

                `${completed} of ${total} lessons completed in ${currentCourse.title}. Keep going.`;

        }

        else {

            courseProgressText.textContent =

                `${currentCourse.title} completed. Congratulations!`;

        }

    }


    if (courseCompletionSection) {

        courseCompletionSection.hidden =
            percent !== 100;

    }


    updateStartCourseButton();

}


/* =========================================================
   OBJECTIVES
========================================================= */

function renderObjectives(
    objectives = []
) {

    if (!courseObjectives) {

        return;

    }


    courseObjectives.innerHTML =
        "";


    objectives.forEach(
        objective => {

            const li =
                document.createElement(
                    "li"
                );


            li.textContent =
                objective;


            courseObjectives.appendChild(
                li
            );

        }
    );

}


/* =========================================================
   LESSON URL
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


    return (
        `lesson.html?${params.toString()}`
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
   LESSON COMPLETION
========================================================= */

function isLessonCompleted(
    moduleId,
    lessonId
) {

    if (!currentProgress) {

        return false;

    }


    return currentProgress
        .completedLessons
        .includes(

            buildLessonKey(
                moduleId,
                lessonId
            )

        );

}


/* =========================================================
   MODULE COMPLETION
========================================================= */

function isModuleCompleted(
    module
) {

    if (

        !module ||

        !Array.isArray(
            module.lessons
        ) ||

        !module.lessons.length ||

        !currentProgress

    ) {

        return false;

    }


    return module.lessons.every(
        lesson =>

            isLessonCompleted(
                module.id,
                lesson.id
            )
    );

}


/* =========================================================
   RENDER MODULES
========================================================= */

function renderModules(
    modules = []
) {

    if (!courseModules) {

        return;

    }


    courseModules.innerHTML =
        "";


    modules.forEach(
        module => {


            /* =============================================
               MODULE
            ============================================== */

            const article =
                document.createElement(
                    "article"
                );


            article.className =
                "course-module";


            article.dataset.moduleId =
                module.id;


            if (
                isModuleCompleted(
                    module
                )
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
                    "button"
                );


            header.type =
                "button";


            header.className =
                "course-module-header";


            header.setAttribute(
                "aria-expanded",
                "false"
            );


            /* =============================================
               NUMBER
            ============================================== */

            const number =
                document.createElement(
                    "span"
                );


            number.className =
                "course-module-number";


            if (
                isModuleCompleted(
                    module
                )
            ) {

                number.innerHTML = `

                    <i class="fa-solid fa-check"></i>

                `;

            } else {

                number.textContent =
                    String(
                        module.number
                    )
                        .padStart(
                            2,
                            "0"
                        );

            }


            /* =============================================
               TITLE
            ============================================== */

            const titleContainer =
                document.createElement(
                    "div"
                );


            titleContainer.className =
                "course-module-title";


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
                module.description ||
                "";


            titleContainer.appendChild(
                title
            );


            titleContainer.appendChild(
                description
            );


            /* =============================================
               META
            ============================================== */

            const meta =
                document.createElement(
                    "div"
                );


            meta.className =
                "course-module-meta";


            if (
                isModuleCompleted(
                    module
                )
            ) {

                const completeBadge =
                    document.createElement(
                        "span"
                    );


                completeBadge.className =
                    "course-module-complete-badge";


                completeBadge.innerHTML = `

                    <i class="fa-solid fa-circle-check"></i>

                    Completed

                `;


                meta.appendChild(
                    completeBadge
                );

            } else {

                const lessonCount =
                    document.createElement(
                        "span"
                    );


                lessonCount.className =
                    "course-module-count";


                const count =
                    Array.isArray(
                        module.lessons
                    )
                        ? module.lessons.length
                        : 0;


                lessonCount.textContent =

                    `${count} Lesson${
                        count === 1
                            ? ""
                            : "s"
                    }`;


                meta.appendChild(
                    lessonCount
                );

            }


            const chevron =
                document.createElement(
                    "i"
                );


            chevron.className =
                "fa-solid fa-chevron-down course-module-chevron";


            meta.appendChild(
                chevron
            );


            header.appendChild(
                number
            );


            header.appendChild(
                titleContainer
            );


            header.appendChild(
                meta
            );


            /* =============================================
               MODULE CONTENT
            ============================================== */

            const content =
                document.createElement(
                    "div"
                );


            content.className =
                "course-module-content";


            /* =============================================
               LESSON LIST
            ============================================== */

            const lessonList =
                document.createElement(
                    "ul"
                );


            lessonList.className =
                "course-lesson-list";


            const lessons =
                Array.isArray(
                    module.lessons
                )
                    ? module.lessons
                    : [];


            lessons.forEach(
                (
                    lesson,
                    index
                ) => {


                    const lessonItem =
                        document.createElement(
                            "li"
                        );


                    lessonItem.className =
                        "course-lesson";


                    const completed =
                        isLessonCompleted(
                            module.id,
                            lesson.id
                        );


                    if (completed) {

                        lessonItem.classList.add(
                            "completed"
                        );

                    }


                    /* ICON */

                    const icon =
                        document.createElement(
                            "span"
                        );


                    icon.className =
                        "course-lesson-icon";


                    icon.innerHTML =
                        completed

                            ? `<i class="fa-solid fa-check"></i>`

                            : `<i class="fa-solid fa-book-open"></i>`;


                    /* INFO */

                    const info =
                        document.createElement(
                            "div"
                        );


                    info.className =
                        "course-lesson-info";


                    const lessonTitle =
                        document.createElement(
                            "h4"
                        );


                    lessonTitle.textContent =

                        `${index + 1}. ${lesson.title}`;


                    const lessonMeta =
                        document.createElement(
                            "span"
                        );


                    lessonMeta.textContent =

                        completed
                            ? "Completed"
                            : (
                                lesson.duration ||
                                "Lesson"
                            );


                    info.appendChild(
                        lessonTitle
                    );


                    info.appendChild(
                        lessonMeta
                    );


                    /* ACTION */

                    const action =
                        document.createElement(
                            "a"
                        );


                    action.className =
                        "course-lesson-action";


                    action.href =
                        buildLessonUrl(

                            currentCourse.id,

                            module.id,

                            lesson.id

                        );


                    action.innerHTML =

                        completed

                            ? `

                                Review

                                <i class="fa-solid fa-rotate-right"></i>

                              `

                            : `

                                Start

                                <i class="fa-solid fa-arrow-right"></i>

                              `;


                    lessonItem.appendChild(
                        icon
                    );


                    lessonItem.appendChild(
                        info
                    );


                    lessonItem.appendChild(
                        action
                    );


                    lessonList.appendChild(
                        lessonItem
                    );

                }
            );


            content.appendChild(
                lessonList
            );


            /* =============================================
               LABS + ASSESSMENTS
            ============================================== */

            const extras =
                document.createElement(
                    "div"
                );


            extras.className =
                "course-module-extras";


            const labCount =
                Number(
                    module.labs || 0
                );


            if (labCount > 0) {

                const lab =
                    document.createElement(
                        "a"
                    );


                const params =
                    new URLSearchParams();


                params.set(
                    "course",
                    currentCourse.id
                );


                params.set(
                    "module",
                    module.id
                );


                lab.href =
                    `labs.html?${params.toString()}`;


                lab.className =
                    "course-module-extra lab";


                lab.innerHTML = `

                    <span class="course-module-extra-icon">

                        <i class="fa-solid fa-flask"></i>

                    </span>


                    <span class="course-module-extra-content">

                        <strong>

                            ${
                                labCount === 1
                                    ? "Practical Lab"
                                    : `${labCount} Practical Labs`
                            }

                        </strong>

                        <span>
                            Apply this module practically
                        </span>

                    </span>

                `;


                extras.appendChild(
                    lab
                );

            }


            const assessmentCount =
                Number(
                    module.assessments ||
                    0
                );


            if (
                assessmentCount > 0
            ) {

                const assessment =
                    document.createElement(
                        "a"
                    );


                const params =
                    new URLSearchParams();


                params.set(
                    "course",
                    currentCourse.id
                );


                params.set(
                    "module",
                    module.id
                );


                assessment.href =
                    `assessments.html?${params.toString()}`;


                assessment.className =
                    "course-module-extra assessment";


                assessment.innerHTML = `

                    <span class="course-module-extra-icon">

                        <i class="fa-solid fa-clipboard-check"></i>

                    </span>


                    <span class="course-module-extra-content">

                        <strong>

                            ${
                                assessmentCount === 1
                                    ? "Module Assessment"
                                    : `${assessmentCount} Assessments`
                            }

                        </strong>

                        <span>
                            Test your knowledge
                        </span>

                    </span>

                `;


                extras.appendChild(
                    assessment
                );

            }


            if (
                extras.children.length
            ) {

                content.appendChild(
                    extras
                );

            }


            /* =============================================
               EXPAND / COLLAPSE
            ============================================== */

            header.addEventListener(
                "click",
                () => {


                    const isOpen =
                        article.classList.toggle(
                            "is-open"
                        );


                    header.setAttribute(
                        "aria-expanded",
                        String(isOpen)
                    );

                }
            );


            article.appendChild(
                header
            );


            article.appendChild(
                content
            );


            courseModules.appendChild(
                article
            );

        }
    );

}


/* =========================================================
   RENDER COURSE
========================================================= */

function renderCourse(course) {

    /* =============================================
       DOCUMENT
    ============================================== */

    document.title =
        `${course.title} | CWS Academy`;


    if (pageDescription) {

        pageDescription.setAttribute(

            "content",

            course.description ||
            `${course.title} on CWS Academy.`

        );

    }


    /* =============================================
       BREADCRUMB
    ============================================== */

    setText(
        breadcrumbCourse,
        course.title
    );


    /* =============================================
       STATUS
    ============================================== */

    const statusValue =
        course.status ||
        "planned";


    setText(

        courseStatus,

        statusValue === "available"
            ? "AVAILABLE"
            : "PLANNED"

    );


    if (courseStatus) {

        courseStatus.className =
            `course-status ${
                statusValue === "available"
                    ? "available"
                    : "planned"
            }`;

    }


    /* =============================================
       LEVEL
    ============================================== */

    setText(

        courseLevel,

        String(
            course.level ||
            "Course"
        )
            .toUpperCase()

    );


    /* =============================================
       HERO
    ============================================== */

    setText(
        courseCategory,
        course.category ||
        "CWS ACADEMY"
    );


    setText(
        courseTitle,
        course.title
    );


    setText(
        courseDescription,
        course.description
    );


    /* =============================================
       OVERVIEW
    ============================================== */

    setText(

        courseOverviewTitle,

        course.overviewTitle ||
        `${course.title} Overview`

    );


    setText(

        courseLongDescription,

        course.longDescription ||
        course.description

    );


    /* =============================================
       INFORMATION
    ============================================== */

    setText(
        courseInfoLevel,
        course.level ||
        "—"
    );


    const moduleCount =

        Array.isArray(
            course.modules
        )
            ? course.modules.length
            : 0;


    setText(

        courseInfoModules,

        `${moduleCount} Module${
            moduleCount === 1
                ? ""
                : "s"
        }`

    );


    const lessons =
        getTotalLessons(
            course
        );


    setText(

        courseInfoLessons,

        `${lessons} Lesson${
            lessons === 1
                ? ""
                : "s"
        }`

    );


    setText(

        courseInfoDuration,

        course.duration ||
        "Self-paced"

    );


    const labs =
        getTotalLabs(
            course
        );


    setText(

        courseInfoLabs,

        `${labs} Lab${
            labs === 1
                ? ""
                : "s"
        }`

    );


    const assessments =
        getTotalAssessments(
            course
        );


    setText(

        courseInfoAssessments,

        `${assessments} Assessment${
            assessments === 1
                ? ""
                : "s"
        }`

    );


    /* =============================================
       ICON
    ============================================== */

    if (courseHeroIcon) {

        courseHeroIcon.innerHTML =
            "";


        const icon =
            document.createElement(
                "i"
            );


        icon.className =

            course.icon ||
            "fa-solid fa-graduation-cap";


        courseHeroIcon.appendChild(
            icon
        );

    }


    /* =============================================
       OBJECTIVES
    ============================================== */

    renderObjectives(
        course.objectives ||
        []
    );


    /* =============================================
       MODULES
    ============================================== */

    renderModules(
        course.modules ||
        []
    );


    /* =============================================
       COMPLETION MESSAGE
    ============================================== */

    if (
        courseCompletionText
    ) {

        courseCompletionText.textContent =

            `You have completed ${course.title}. ` +
            `Your course completion and assessment results ` +
            `can now contribute toward your CWS Academy certificate.`;

    }

}


/* =========================================================
   START / CONTINUE COURSE
========================================================= */

async function startCourse(
    event
) {

    if (event) {

        event.preventDefault();

    }


    if (!currentCourse) {

        error(
            "Cannot start course: currentCourse is null."
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


    /* =============================================
       MODULE
    ============================================== */

    let module =
        currentCourse.modules.find(
            item =>
                item.id ===
                currentProgress.currentModule
        );


    if (!module) {

        module =
            getFirstModule();

    }


    if (!module) {

        error(
            "Course has no modules."
        );

        return;

    }


    /* =============================================
       LESSON
    ============================================== */

    let lesson =
        module.lessons?.find(
            item =>
                item.id ===
                currentProgress.currentLesson
        );


    if (!lesson) {

        lesson =
            getFirstLesson(
                module
            );

    }


    if (!lesson) {

        error(
            "Module has no lessons."
        );

        return;

    }


    /* =============================================
       UPDATE PROGRESS
    ============================================== */

    currentProgress.started =
        true;


    currentProgress.currentModule =
        module.id;


    currentProgress.currentLesson =
        lesson.id;


    const lessonUrl =

        buildLessonUrl(

            currentCourse.id,

            module.id,

            lesson.id

        );


    /*
       Save progress without blocking
       navigation.
    */

    saveProgress()
        .catch(
            err => {

                error(
                    "Background progress save failed:",
                    err
                );

            }
        );


    window.location.href =
        lessonUrl;

}


/* =========================================================
   START BUTTON LISTENER
========================================================= */

function attachStartButton() {

    if (!startCourseBtn) {

        error(
            "#startCourseBtn not found."
        );

        return;

    }


    startCourseBtn.onclick =
        startCourse;

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

        showCourseNotFound(

            "No course was specified in the URL."

        );

        return;

    }


    /* =============================================
       IMPORTANT NEW LOOKUP
    ============================================== */

    const course =
        getCourse(
            courseId
        );


    if (!course) {

        error(
            "Course does not exist:",
            courseId
        );


        showCourseNotFound(

            "The requested course does not exist in the CWS Academy course registry."

        );


        return;

    }


    if (
        course.status !==
        "available"
    ) {

        warn(
            "Course is not currently available:",
            courseId
        );


        showCourseNotFound(

            `${course.title} is planned but has not yet been released.`

        );


        return;

    }


    currentCourse =
        course;


    /* =============================================
       RENDER IMMEDIATELY
    ============================================== */

    renderCourse(
        currentCourse
    );


    attachStartButton();


    showCourseContent();


    /* =============================================
       LOAD FIRESTORE PROGRESS
    ============================================== */

    await loadProgress();


    /*
       Re-render because completed lesson
       states depend on Firestore.
    */

    renderModules(
        currentCourse.modules ||
        []
    );


    updateProgressUI();


    attachStartButton();


    log(
        "Course loaded successfully:",
        currentCourse.id
    );

}


/* =========================================================
   LOGOUT LOADING
========================================================= */

function setLogoutLoading(
    loading
) {

    if (!logoutBtn) {

        return;

    }


    logoutBtn.disabled =
        loading;


    logoutBtn.classList.toggle(
        "is-loading",
        loading
    );


    if (loading) {

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
        "Firebase Authentication was not initialized."
    );


    window.location.replace(
        "../pages/login.html"
    );

}

else {

    onAuthStateChanged(

        auth,

        async user => {


            log(

                "Authentication state:",

                user
                    ? "AUTHENTICATED"
                    : "NOT AUTHENTICATED"

            );


            /* =============================================
               NOT AUTHENTICATED
            ============================================== */

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


            /* =============================================
               AUTHENTICATED
            ============================================== */

            currentUser =
                user;


            displayStudent(
                user
            );


            if (
                courseInitialized
            ) {

                return;

            }


            courseInitialized =
                true;


            await loadCourse();

        }

    );

}


/* =========================================================
   INITIAL LOG
========================================================= */

log(
    "course-details.js loaded."
);
