/* =========================================================
   CWS ACADEMY
   STUDENT DASHBOARD

   Firebase Authentication
   Firestore Learning Progress
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

    collection,

    getDocs

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

    courses,

    getCourse,

    isProCourse,

    isCourseLocked,

    getCourseDisplayStatus

} from "../data/courses.js";


/* =========================================================
   DEBUG
========================================================= */

const DEBUG = true;


function log(...messages) {

    if (DEBUG) {

        console.log(
            "[CWS Dashboard]",
            ...messages
        );

    }

}


function warn(...messages) {

    if (DEBUG) {

        console.warn(
            "[CWS Dashboard]",
            ...messages
        );

    }

}


function error(...messages) {

    console.error(
        "[CWS Dashboard]",
        ...messages
    );

}


/* =========================================================
   ELEMENTS
========================================================= */

const studentName =
    document.getElementById(
        "studentName"
    );


const welcomeStudentName =
    document.getElementById(
        "welcomeStudentName"
    );


const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );


/* =========================================================
   CONTINUE LEARNING
========================================================= */

const continueLearningContainer =
    document.getElementById(
        "continueLearningContainer"
    );


/* =========================================================
   COURSE CATALOG
========================================================= */

const dashboardCoursesLoading =
    document.getElementById(
        "dashboardCoursesLoading"
    );


const dashboardCourseGrid =
    document.getElementById(
        "dashboardCourseGrid"
    );


const dashboardCoursesEmpty =
    document.getElementById(
        "dashboardCoursesEmpty"
    );


/* =========================================================
   STATISTICS
========================================================= */

const coursesStarted =
    document.getElementById(
        "coursesStarted"
    );


const labsCompleted =
    document.getElementById(
        "labsCompleted"
    );


const assessmentsCompleted =
    document.getElementById(
        "assessmentsCompleted"
    );


const certificatesEarned =
    document.getElementById(
        "certificatesEarned"
    );


/* =========================================================
   STATE
========================================================= */

let currentUser = null;

let dashboardInitialized =
    false;


/*
   Map keyed by course ID.

   Example:

   {
       "cybersecurity-fundamentals": {...},
       "networking-fundamentals": {...}
   }
*/

let courseProgressMap =
    new Map();


/* =========================================================
   USER DISPLAY NAME
========================================================= */

function getUserName(user) {

    if (!user) {

        return "Student";

    }


    /*
       Prefer Firebase displayName.
    */

    if (

        typeof user.displayName ===
            "string" &&

        user.displayName.trim()

    ) {

        return user.displayName.trim();

    }


    /*
       Fall back to email username.
    */

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

function displayUser(user) {

    const name =
        getUserName(user);


    if (studentName) {

        studentName.textContent =
            name;

    }


    if (welcomeStudentName) {

        welcomeStudentName.textContent =
            name;

    }


    log(
        "Authenticated user:",
        {
            uid:
                user.uid,

            email:
                user.email,

            name
        }
    );

}


/* =========================================================
   GET ALL COURSES
========================================================= */

function getAllCourses() {

    if (!courses) {

        return [];

    }


    return Object.values(
        courses
    );

}


/* =========================================================
   TOTAL COURSE LESSONS
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

            const moduleLessons =

                Array.isArray(
                    module.lessons
                )
                    ? module.lessons.length
                    : 0;


            return (
                total +
                moduleLessons
            );

        },

        0

    );

}


/* =========================================================
   TOTAL LABS
========================================================= */

function getTotalLabs(course) {

    if (!course || !Array.isArray(course.modules)) {
        return 0;
    }

    return course.modules.reduce(
        (total, module) =>
            total + getModuleActivities(module).length,
        0
    );

}


/* =========================================================
   TOTAL ASSESSMENTS
========================================================= */

function getTotalAssessments(course) {

    if (!course || !Array.isArray(course.modules)) {
        return 0;
    }

    const moduleAssessments =
        course.modules.filter(
            module =>
                module.moduleAssessment &&
                Array.isArray(module.moduleAssessment.questions) &&
                module.moduleAssessment.questions.length
        ).length;

    return (
        moduleAssessments +
        (course.finalAssessment ? 1 : 0)
    );

}



function getModuleActivities(module) {

    return [
        ...(
            Array.isArray(module?.labActivities)
                ? module.labActivities
                : []
        ),
        ...(
            Array.isArray(module?.practiceActivities)
                ? module.practiceActivities
                : []
        )
    ];

}


function getCourseRequirements(course) {

    const lessonKeys = [];
    const activityKeys = [];
    const assessmentKeys = [];

    const modules =
        Array.isArray(course?.modules)
            ? course.modules
            : [];

    modules.forEach(module => {

        const lessons =
            Array.isArray(module.lessons)
                ? module.lessons
                : [];

        lessons.forEach(lesson => {
            lessonKeys.push(
                `${module.id}:${lesson.id}`
            );
        });

        getModuleActivities(module)
            .forEach(activity => {
                activityKeys.push(
                    `${module.id}:${activity.id}`
                );
            });

        if (
            module.moduleAssessment &&
            Array.isArray(module.moduleAssessment.questions) &&
            module.moduleAssessment.questions.length
        ) {
            assessmentKeys.push(
                `${module.id}:assessment`
            );
        }

    });

    return {
        lessonKeys,
        activityKeys:
            course?.completionRules?.requireRequiredLabs
                ? activityKeys
                : [],
        assessmentKeys:
            course?.completionRules?.requireAllModuleAssessments === false
                ? []
                : assessmentKeys,
        finalRequired:
            Boolean(course?.finalAssessment)
    };

}


function calculateUnifiedProgress(course, progress) {

    if (!course || !progress) {
        return 0;
    }

    const requirements =
        getCourseRequirements(course);

    const total =
        requirements.lessonKeys.length +
        requirements.activityKeys.length +
        requirements.assessmentKeys.length +
        (requirements.finalRequired ? 1 : 0);

    if (!total) {
        return 0;
    }

    const completedLessons =
        requirements.lessonKeys.filter(
            key =>
                progress.completedLessons?.includes(key)
        ).length;

    const completedActivities =
        requirements.activityKeys.filter(
            key =>
                progress.completedLabs?.includes(key)
        ).length;

    const completedAssessments =
        requirements.assessmentKeys.filter(
            key =>
                progress.completedAssessments?.includes(key)
        ).length;

    const finalCompleted =
        requirements.finalRequired &&
        progress.finalAssessment?.passed
            ? 1
            : 0;

    return Math.min(
        100,
        Math.round(
            (
                completedLessons +
                completedActivities +
                completedAssessments +
                finalCompleted
            ) /
            total *
            100
        )
    );

}


/* =========================================================
   COURSE DETAILS URL
========================================================= */

function buildCourseUrl(
    courseId
) {

    const params =
        new URLSearchParams();


    params.set(
        "course",
        courseId
    );


    return (
        `course-details.html?${params.toString()}`
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



function buildLabActivityUrl(
    courseId,
    moduleId,
    activityId
) {

    const params =
        new URLSearchParams();

    params.set("course", courseId);
    params.set("module", moduleId);
    params.set("activity", activityId);

    return `lab-activity.html?${params.toString()}`;

}


function buildModuleAssessmentUrl(
    courseId,
    moduleId
) {

    const params =
        new URLSearchParams();

    params.set("course", courseId);
    params.set("module", moduleId);

    return `module-assessment.html?${params.toString()}`;

}


function buildFinalAssessmentUrl(
    courseId
) {

    const params =
        new URLSearchParams();

    params.set("course", courseId);

    return `final-assessment.html?${params.toString()}`;

}


function findNextLearningTarget(
    course,
    progress
) {

    const modules =
        Array.isArray(course?.modules)
            ? course.modules
            : [];

    const requireLabs =
        Boolean(
            course?.completionRules
                ?.requireRequiredLabs
        );

    const requireAssessments =
        course?.completionRules
            ?.requireAllModuleAssessments !== false;

    for (const module of modules) {

        const lessons =
            Array.isArray(module.lessons)
                ? module.lessons
                : [];

        for (const lesson of lessons) {

            const key =
                `${module.id}:${lesson.id}`;

            if (
                !progress.completedLessons
                    ?.includes(key)
            ) {
                return {
                    type: "lesson",
                    module,
                    item: lesson,
                    url: buildLessonUrl(
                        course.id,
                        module.id,
                        lesson.id
                    )
                };
            }

        }

        if (requireLabs) {

            const activities =
                getModuleActivities(module);

            for (const activity of activities) {

                const key =
                    `${module.id}:${activity.id}`;

                if (
                    !progress.completedLabs
                        ?.includes(key)
                ) {
                    return {
                        type: "activity",
                        module,
                        item: activity,
                        url: buildLabActivityUrl(
                            course.id,
                            module.id,
                            activity.id
                        )
                    };
                }

            }

        }

        const hasAssessment =
            module.moduleAssessment &&
            Array.isArray(module.moduleAssessment.questions) &&
            module.moduleAssessment.questions.length;

        if (
            requireAssessments &&
            hasAssessment &&
            !progress.completedAssessments
                ?.includes(
                    `${module.id}:assessment`
                )
        ) {
            return {
                type: "assessment",
                module,
                item: module.moduleAssessment,
                url: buildModuleAssessmentUrl(
                    course.id,
                    module.id
                )
            };
        }

    }

    if (
        course?.finalAssessment &&
        !progress.finalAssessment?.passed
    ) {
        return {
            type: "final",
            module:
                modules[modules.length - 1] || null,
            item:
                course.finalAssessment,
            url:
                buildFinalAssessmentUrl(
                    course.id
                )
        };
    }

    return {
        type: "complete",
        module:
            modules[modules.length - 1] || null,
        item: null,
        url:
            buildCourseUrl(
                course.id
            )
    };

}


/* =========================================================
   COURSE PROGRESS
========================================================= */

function getCourseProgress(
    courseId
) {

    return (
        courseProgressMap.get(
            courseId
        ) || null
    );

}


/* =========================================================
   NORMALIZE PROGRESS
========================================================= */

function normalizeProgress(
    courseId,
    data = {}
) {

    return {

        courseId,

        completedLessons:

            Array.isArray(
                data.completedLessons
            )
                ? data.completedLessons
                : [],

        completedLabs:

            Array.isArray(
                data.completedLabs
            )
                ? data.completedLabs
                : [],

        completedAssessments:

            Array.isArray(
                data.completedAssessments
            )
                ? data.completedAssessments
                : [],

        currentModule:

            typeof data.currentModule ===
                "string"
                ? data.currentModule
                : "",

        currentLesson:

            typeof data.currentLesson ===
                "string"
                ? data.currentLesson
                : "",

        progressPercent:

            Number(
                data.progressPercent || 0
            ),

        started:

            Boolean(
                data.started
            ),

        completed:

            Boolean(
                data.completed
            ),

        assessmentScores:
            data.assessmentScores &&
            typeof data.assessmentScores === "object"
                ? data.assessmentScores
                : {},

        finalAssessment:
            data.finalAssessment &&
            typeof data.finalAssessment === "object"
                ? data.finalAssessment
                : {
                    score: 0,
                    bestScore: 0,
                    passed: false
                },

        certificateEligible:
            Boolean(
                data.certificateEligible
            ),

        updatedAt:
            data.updatedAt || null

    };

}


/* =========================================================
   LOAD ALL COURSE PROGRESS
========================================================= */

async function loadCourseProgress(
    user
) {

    courseProgressMap =
        new Map();


    if (

        !db ||

        !user

    ) {

        warn(
            "Firestore unavailable. Dashboard will use local defaults."
        );

        return;

    }


    try {

        const progressCollection =

            collection(

                db,

                "users",

                user.uid,

                "courseProgress"

            );


        const snapshot =

            await getDocs(
                progressCollection
            );


        snapshot.forEach(
            documentSnapshot => {

                const courseId =
                    documentSnapshot.id;


                const data =
                    documentSnapshot.data();


                courseProgressMap.set(

                    courseId,

                    normalizeProgress(
                        courseId,
                        data
                    )

                );

            }
        );


        log(
            "Course progress loaded:",
            courseProgressMap
        );


    } catch (err) {

        error(
            "Unable to load course progress:",
            err
        );

    }

}


/* =========================================================
   COURSE CARD STATUS
========================================================= */

function getCourseStatusText(
    course
) {

    if (!course) {
        return "UNAVAILABLE";
    }

    if (isProCourse(course.id)) {
        return "PRO";
    }

    const displayStatus =
        getCourseDisplayStatus(course.id);

    if (displayStatus.key === "available") {
        return "AVAILABLE";
    }

    return "PLANNED";

}


function getCourseProState(
    course
) {

    if (!course) {
        return {
            isPro: false,
            isLocked: false
        };
    }

    const isPro =
        isProCourse(course.id);

    const isLocked =
        isPro &&
        isCourseLocked(course.id);

    return {
        isPro,
        isLocked
    };

}


/* =========================================================
   COURSE CARD META
========================================================= */

function createCourseMetaItem(
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


    const textNode =
        document.createTextNode(
            text
        );


    span.appendChild(
        icon
    );


    span.appendChild(
        textNode
    );


    return span;

}


/* =========================================================
   CREATE COURSE CARD
========================================================= */

function createCourseCard(
    course
) {

    const progress =
        getCourseProgress(
            course.id
        );

    const {
        isPro,
        isLocked
    } =
        getCourseProState(
            course
        );

    const article =
        document.createElement(
            "article"
        );

    article.className =
        "dashboard-course-card";

    article.dataset.courseId =
        course.id;

    article.dataset.level =
        course.levelKey ||
        String(
            course.level || ""
        )
            .toLowerCase();

    article.dataset.status =
        course.status ||
        "planned";

    article.dataset.access =
        course.access ||
        "free";

    if (isLocked) {

        article.classList.add(
            "pro-locked"
        );

        article.setAttribute(
            "aria-disabled",
            "true"
        );

    }
    else if (
        course.status !==
        "available"
    ) {

        article.classList.add(
            "planned"
        );

    }


    const top =
        document.createElement(
            "div"
        );

    top.className =
        "course-card-top";


    const status =
        document.createElement(
            "span"
        );

    if (isPro) {

        status.className =
            "course-status pro";

        const crown =
            document.createElement(
                "i"
            );

        crown.className =
            "fa-solid fa-crown";

        status.appendChild(
            crown
        );

        status.appendChild(
            document.createTextNode(
                " PRO"
            )
        );

    }
    else {

        status.className =
            `course-status ${
                course.status === "available"
                    ? "available"
                    : "planned"
            }`;

        status.textContent =
            getCourseStatusText(
                course
            );

    }


    const level =
        document.createElement(
            "span"
        );

    level.className =
        "course-level";

    level.textContent =
        String(
            course.level ||
            "Course"
        )
            .toUpperCase();

    top.appendChild(
        status
    );

    top.appendChild(
        level
    );


    const iconContainer =
        document.createElement(
            "div"
        );

    iconContainer.className =
        "course-icon";

    const icon =
        document.createElement(
            "i"
        );

    icon.className =
        course.icon ||
        "fa-solid fa-graduation-cap";

    iconContainer.appendChild(
        icon
    );


    const title =
        document.createElement(
            "h3"
        );

    title.textContent =
        course.title ||
        "CWS Academy Course";


    const description =
        document.createElement(
            "p"
        );

    description.textContent =
        course.description ||
        "Course information coming soon.";


    const meta =
        document.createElement(
            "div"
        );

    meta.className =
        "course-meta";

    const moduleCount =
        Array.isArray(
            course.modules
        )
            ? course.modules.length
            : 0;

    if (
        course.status === "available" ||
        isPro
    ) {

        meta.appendChild(
            createCourseMetaItem(
                "fa-solid fa-book",
                `${moduleCount} Module${
                    moduleCount === 1
                        ? ""
                        : "s"
                }`
            )
        );

        const labs =
            getTotalLabs(
                course
            );

        if (labs > 0) {

            meta.appendChild(
                createCourseMetaItem(
                    "fa-solid fa-flask",
                    `${labs} Activit${
                        labs === 1
                            ? "y"
                            : "ies"
                    }`
                )
            );

        }

        const assessments =
            getTotalAssessments(
                course
            );

        if (assessments > 0) {

            meta.appendChild(
                createCourseMetaItem(
                    "fa-solid fa-bullseye",
                    `${assessments} Assessment${
                        assessments === 1
                            ? ""
                            : "s"
                    }`
                )
            );

        }

    }
    else {

        meta.appendChild(
            createCourseMetaItem(
                "fa-solid fa-clock",
                "Planned"
            )
        );

    }


    let action;

    if (isLocked) {

        action =
            document.createElement(
                "button"
            );

        action.type =
            "button";

        action.className =
            "course-card-btn pro-disabled";

        action.disabled =
            true;

        action.setAttribute(
            "aria-disabled",
            "true"
        );

        action.title =
            "CWS Academy Pro is coming soon";

        action.innerHTML = `
            <i class="fa-solid fa-lock"></i>
            Pro Coming Soon
        `;

    }
    else if (
        course.status ===
        "available"
    ) {

        action =
            document.createElement(
                "a"
            );

        action.className =
            "course-card-btn";

        action.href =
            buildCourseUrl(
                course.id
            );

        if (
            progress?.completed
        ) {

            action.innerHTML = `
                Review Course
                <i class="fa-solid fa-rotate-right"></i>
            `;

        }
        else if (
            progress?.started ||
            progress?.completedLessons
                ?.length > 0
        ) {

            action.innerHTML = `
                Continue Course
                <i class="fa-solid fa-arrow-right"></i>
            `;

        }
        else {

            action.innerHTML = `
                View Course
                <i class="fa-solid fa-arrow-right"></i>
            `;

        }

    }
    else {

        action =
            document.createElement(
                "button"
            );

        action.type =
            "button";

        action.className =
            "course-card-btn disabled";

        action.disabled =
            true;

        action.textContent =
            "Coming Soon";

    }


    article.appendChild(
        top
    );

    article.appendChild(
        iconContainer
    );

    article.appendChild(
        title
    );

    article.appendChild(
        description
    );

    article.appendChild(
        meta
    );

    article.appendChild(
        action
    );

    return article;

}


/* =========================================================
   COURSE SORTING
========================================================= */

function sortCoursesForDashboard(
    courseList
) {

    return [...courseList]
        .sort(
            (
                courseA,
                courseB
            ) => {

                /*
                   Available courses first.
                */

                const statusA =
                    isCourseLocked(
                        courseA.id
                    )
                        ? 1
                        : courseA.status === "available"
                            ? 0
                            : 2;


                const statusB =
                    isCourseLocked(
                        courseB.id
                    )
                        ? 1
                        : courseB.status === "available"
                            ? 0
                            : 2;


                if (
                    statusA !== statusB
                ) {

                    return (
                        statusA -
                        statusB
                    );

                }


                /*
                   If optional order values exist,
                   respect them.
                */

                const orderA =
                    Number(
                        courseA.order ??
                        999
                    );


                const orderB =
                    Number(
                        courseB.order ??
                        999
                    );


                if (
                    orderA !== orderB
                ) {

                    return (
                        orderA -
                        orderB
                    );

                }


                /*
                   Fall back to title.
                */

                return String(
                    courseA.title || ""
                )
                    .localeCompare(
                        String(
                            courseB.title ||
                            ""
                        )
                    );

            }
        );

}


/* =========================================================
   RENDER DASHBOARD COURSES
========================================================= */

function renderDashboardCourses() {

    if (
        !dashboardCourseGrid
    ) {

        return;

    }


    const allCourses =
        sortCoursesForDashboard(
            getAllCourses()
        );


    dashboardCourseGrid.innerHTML =
        "";


    if (
        !allCourses.length
    ) {

        if (
            dashboardCoursesLoading
        ) {

            dashboardCoursesLoading.hidden =
                true;

        }


        dashboardCourseGrid.hidden =
            true;


        if (
            dashboardCoursesEmpty
        ) {

            dashboardCoursesEmpty.hidden =
                false;

        }


        return;

    }


    /*
       Dashboard preview can show the first
       six courses.

       student-courses.html will later show
       the full catalogue.
    */

    const previewCourses =
        allCourses.slice(
            0,
            6
        );


    previewCourses.forEach(
        course => {

            dashboardCourseGrid.appendChild(

                createCourseCard(
                    course
                )

            );

        }
    );


    if (
        dashboardCoursesLoading
    ) {

        dashboardCoursesLoading.hidden =
            true;

    }


    if (
        dashboardCoursesEmpty
    ) {

        dashboardCoursesEmpty.hidden =
            true;

    }


    dashboardCourseGrid.hidden =
        false;

}


/* =========================================================
   PROGRESS DATE
========================================================= */

function getProgressDateValue(
    progress
) {

    const timestamp =
        progress?.updatedAt;


    if (!timestamp) {

        return 0;

    }


    /*
       Firestore Timestamp.
    */

    if (
        typeof timestamp.toMillis ===
        "function"
    ) {

        return timestamp.toMillis();

    }


    /*
       Timestamp-like serialized object.
    */

    if (
        typeof timestamp.seconds ===
        "number"
    ) {

        return (
            timestamp.seconds *
            1000
        );

    }


    return 0;

}


/* =========================================================
   FIND MOST RECENT ACTIVE COURSE
========================================================= */

function findContinueCourse() {

    const activeProgress =

        [...courseProgressMap.values()]

            .filter(
                progress => {

                    if (
                        !progress.started &&
                        !progress.completedLessons
                            ?.length
                    ) {

                        return false;

                    }


                    const course =
                        getCourse(
                            progress.courseId
                        );


                    if (!course) {

                        return false;

                    }


                    return (
                        course.status === "available" &&
                        !isCourseLocked(
                            course.id
                        )
                    );

                }
            );


    if (
        !activeProgress.length
    ) {

        return null;

    }


    /*
       Prefer the most recently updated
       unfinished course.
    */

    const unfinished =
        activeProgress.filter(
            progress =>
                !progress.completed
        );


    const candidates =
        unfinished.length
            ? unfinished
            : activeProgress;


    candidates.sort(
        (
            progressA,
            progressB
        ) => {

            return (

                getProgressDateValue(
                    progressB
                ) -

                getProgressDateValue(
                    progressA
                )

            );

        }
    );


    return candidates[0] || null;

}


/* =========================================================
   RENDER DEFAULT CONTINUE STATE
========================================================= */

function renderEmptyContinueLearning() {

    if (
        !continueLearningContainer
    ) {

        return;

    }


    continueLearningContainer.innerHTML = `

        <div class="continue-icon">

            <i class="fa-solid fa-graduation-cap"></i>

        </div>


        <div class="continue-content">

            <h3>
                Start Your Learning Journey
            </h3>

            <p>
                You haven't started a course yet.
                Explore the available learning paths
                and begin developing your cybersecurity
                skills.
            </p>

            <a
                href="student-courses.html"
                class="text-link"
            >

                Explore Courses

                <i class="fa-solid fa-arrow-right"></i>

            </a>

        </div>

    `;

}


/* =========================================================
   CONTINUE LEARNING
========================================================= */

function setupContinueLearning() {

    if (!continueLearningContainer) {
        return;
    }

    const progress =
        findContinueCourse();

    if (!progress) {
        renderEmptyContinueLearning();
        return;
    }

    const course =
        getCourse(
            progress.courseId
        );

    if (!course) {
        renderEmptyContinueLearning();
        return;
    }

    const percentage =
        calculateUnifiedProgress(
            course,
            progress
        );

    const target =
        findNextLearningTarget(
            course,
            progress
        );

    const iconClass =
        course.icon ||
        "fa-solid fa-graduation-cap";

    const completed =
        target.type === "complete" ||
        progress.completed;

    const labels = {
        lesson: "NEXT LESSON",
        activity: "PRACTICAL ACTIVITY",
        assessment: "MODULE ASSESSMENT",
        final: "FINAL ASSESSMENT",
        complete: "COURSE COMPLETED"
    };

    const targetTitle =
        target.type === "lesson"
            ? target.item?.title
            : target.type === "activity"
                ? target.item?.title || "Practical Activity"
                : target.type === "assessment"
                    ? `${target.module?.title || "Module"} Assessment`
                    : target.type === "final"
                        ? "Final Assessment"
                        : "Course Complete";

    const buttonText =
        completed
            ? "Review Course"
            : target.type === "final"
                ? "Take Final Assessment"
                : target.type === "assessment"
                    ? "Take Assessment"
                    : target.type === "activity"
                        ? "Continue to Activity"
                        : "Continue Learning";

    continueLearningContainer.innerHTML = `

        <div class="continue-icon">
            <i class="${iconClass}"></i>
        </div>

        <div class="continue-content">

            <span class="dashboard-label">
                ${labels[target.type] || "IN PROGRESS"}
            </span>

            <h3>
                ${escapeHTML(course.title)}
            </h3>

            <p>
                ${
                    target.module
                        ? escapeHTML(target.module.title)
                        : "Course progress"
                }
                ${
                    targetTitle
                        ? ` â€¢ ${escapeHTML(targetTitle)}`
                        : ""
                }
            </p>

            <div class="dashboard-continue-progress">

                <div
                    class="dashboard-continue-progress-bar"
                    aria-label="Course progress"
                    role="progressbar"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow="${percentage}"
                >
                    <div
                        class="dashboard-continue-progress-fill"
                        style="width: ${percentage}%;"
                    ></div>
                </div>

                <span>
                    ${percentage}%
                </span>

            </div>

            <a
                href="${target.url}"
                class="text-link"
            >
                ${buttonText}
                <i class="fa-solid fa-arrow-right"></i>
            </a>

        </div>

    `;

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    return String(
        value ?? ""
    )
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
   DASHBOARD STATISTICS
========================================================= */

function calculateLearningStats() {

    let startedCourses =
        0;


    let completedLabsCount =
        0;


    let completedAssessmentsCount =
        0;


    let certificateCount =
        0;


    courseProgressMap.forEach(
        progress => {

            if (

                progress.started ||

                progress.completedLessons
                    ?.length > 0

            ) {

                startedCourses++;

            }


            completedLabsCount +=

                progress.completedLabs
                    ?.length || 0;


            completedAssessmentsCount +=

                progress.completedAssessments
                    ?.length || 0;


            /*
               For the current academy model,
               one completed course can contribute
               one certificate.

               Later this can be replaced with a
               dedicated certificate collection.
            */

            if (
                progress.completed
            ) {

                certificateCount++;

            }

        }
    );


    return {

        coursesStarted:
            startedCourses,

        labsCompleted:
            completedLabsCount,

        assessmentsCompleted:
            completedAssessmentsCount,

        certificatesEarned:
            certificateCount

    };

}


/* =========================================================
   UPDATE STATISTICS
========================================================= */

function updateLearningStats() {

    const stats =
        calculateLearningStats();


    if (coursesStarted) {

        coursesStarted.textContent =
            String(
                stats.coursesStarted
            );

    }


    if (labsCompleted) {

        labsCompleted.textContent =
            String(
                stats.labsCompleted
            );

    }


    if (
        assessmentsCompleted
    ) {

        assessmentsCompleted.textContent =
            String(
                stats.assessmentsCompleted
            );

    }


    if (
        certificatesEarned
    ) {

        certificatesEarned.textContent =
            String(
                stats.certificatesEarned
            );

    }


    log(
        "Learning statistics:",
        stats
    );

}


/* =========================================================
   LOGOUT STATE
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
            "Firebase Authentication is unavailable."
        );

        return;

    }


    try {

        log(
            "Signing out..."
        );


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
   DASHBOARD INITIALIZATION
========================================================= */

async function initializeDashboard(
    user
) {

    /*
       Display student immediately.
    */

    displayUser(
        user
    );


    /*
       Load all progress documents.
    */

    await loadCourseProgress(
        user
    );


    /*
       Build course catalogue from
       data/courses.js.
    */

    renderDashboardCourses();


    /*
       Build Continue Learning.
    */

    setupContinueLearning();


    /*
       Calculate dashboard statistics.
    */

    updateLearningStats();


    log(
        "Dashboard initialized successfully."
    );

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


                window.location.replace(

                    "../pages/login.html?redirect=dashboard"

                );


                return;

            }


            /* =============================================
               AUTHENTICATED
            ============================================== */

            currentUser =
                user;


            /*
               Prevent duplicate initialization caused by
               repeated Firebase auth state events.
            */

            if (
                dashboardInitialized
            ) {

                return;

            }


            dashboardInitialized =
                true;


            try {

                await initializeDashboard(
                    user
                );

            } catch (err) {

                error(
                    "Dashboard initialization failed:",
                    err
                );


                /*
                   Do not leave the course loader spinning
                   forever if something fails.
                */

                if (
                    dashboardCoursesLoading
                ) {

                    dashboardCoursesLoading.hidden =
                        true;

                }


                if (
                    dashboardCoursesEmpty
                ) {

                    dashboardCoursesEmpty.hidden =
                        false;

                }

            }

        }

    );

}


/* =========================================================
   INITIALIZATION LOG
========================================================= */

log(
    "dashboard.js loaded."
);
