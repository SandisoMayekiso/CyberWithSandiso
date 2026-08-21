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

    getCourseDisplayStatus,

    getCoursePathInfo,

    getRequiredPrerequisites,

    getCourseStageInfo

} from "../data/courses.js";


import {
    getCourseExperience
} from "../data/course-experience.js";


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


const dashboardDate =
    document.getElementById(
        "dashboardDate"
    );


const dashboardOverallRing =
    document.getElementById(
        "dashboardOverallRing"
    );


const dashboardOverallPercent =
    document.getElementById(
        "dashboardOverallPercent"
    );


const dashboardSnapshotTitle =
    document.getElementById(
        "dashboardSnapshotTitle"
    );


const dashboardSnapshotMeta =
    document.getElementById(
        "dashboardSnapshotMeta"
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


const dashboardRecentActivity =
    document.getElementById(
        "dashboardRecentActivity"
    );


const dashboardRecommendation =
    document.getElementById(
        "dashboardRecommendation"
    );


const dashboardSavedLearning =
    document.getElementById(
        "dashboardSavedLearning"
    );


const dashboardPracticeGrid =
    document.getElementById(
        "dashboardPracticeGrid"
    );


const dashboardPracticeEmpty =
    document.getElementById(
        "dashboardPracticeEmpty"
    );


const dashboardAchievementsGrid =
    document.getElementById(
        "dashboardAchievementsGrid"
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


    const experience =
        getCourseExperience(
            course
        );


    const cover =
        document.createElement(
            "div"
        );

    cover.className =
        "cws-course-card-cover";


    const coverImage =
        document.createElement(
            "img"
        );

    coverImage.src =
        experience?.cover?.src ||
        "../assets/images/cybersecurity.png";

    coverImage.alt =
        experience?.cover?.alt ||
        `${course.title} course cover`;

    coverImage.loading =
        "lazy";

    coverImage.decoding =
        "async";

    coverImage.width = 1280;
    coverImage.height = 720;

    coverImage.onerror = () => {
        coverImage.onerror = null;
        coverImage.src =
            experience?.cover?.fallback ||
            "../assets/images/cybersecurity.png";
    };

    cover.appendChild(
        coverImage
    );


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
        cover
    );


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
   DASHBOARD OVERVIEW DATA
========================================================= */

function getDashboardTotals() {

    const totals = {
        startedCourses: 0,
        completedCourses: 0,
        completedLessons: 0,
        completedActivities: 0,
        completedAssessments: 0,
        certificates: 0,
        averageProgress: 0
    };

    let progressTotal = 0;

    courseProgressMap.forEach(progress => {

        const course =
            getCourse(progress.courseId);

        if (!course) {
            return;
        }

        const hasStarted =
            progress.started ||
            progress.completed ||
            progress.completedLessons.length > 0 ||
            progress.completedLabs.length > 0 ||
            progress.completedAssessments.length > 0;

        if (hasStarted) {
            totals.startedCourses++;
            progressTotal +=
                calculateUnifiedProgress(
                    course,
                    progress
                );
        }

        if (progress.completed) {
            totals.completedCourses++;
        }

        totals.completedLessons +=
            progress.completedLessons.length;

        totals.completedActivities +=
            progress.completedLabs.length;

        totals.completedAssessments +=
            progress.completedAssessments.length;

        if (
            progress.completed ||
            progress.certificateEligible
        ) {
            totals.certificates++;
        }

    });

    totals.averageProgress =
        totals.startedCourses
            ? Math.round(
                progressTotal /
                totals.startedCourses
            )
            : 0;

    return totals;

}


/* =========================================================
   HERO SNAPSHOT
========================================================= */

function renderHeroSnapshot() {

    const totals =
        getDashboardTotals();

    const hour =
        new Date().getHours();

    const greeting =
        hour < 12
            ? "Good morning"
            : hour < 18
                ? "Good afternoon"
                : "Good evening";

    if (dashboardDate) {

        const formattedDate =
            new Intl.DateTimeFormat(
                "en-ZA",
                {
                    weekday: "long",
                    day: "numeric",
                    month: "long"
                }
            ).format(new Date());

        dashboardDate.textContent =
            `${greeting} â€¢ ${formattedDate}`;

    }

    if (dashboardOverallRing) {
        dashboardOverallRing.style.setProperty(
            "--dashboard-progress",
            String(totals.averageProgress)
        );
        dashboardOverallRing.setAttribute(
            "aria-valuenow",
            String(totals.averageProgress)
        );
    }

    if (dashboardOverallPercent) {
        dashboardOverallPercent.textContent =
            `${totals.averageProgress}%`;
    }

    if (dashboardSnapshotTitle) {
        dashboardSnapshotTitle.textContent =
            !totals.startedCourses
                ? "Ready to begin"
                : totals.averageProgress === 100
                    ? "Excellent work"
                    : totals.averageProgress >= 50
                        ? "Momentum is building"
                        : "Your foundation is growing";
    }

    if (dashboardSnapshotMeta) {
        dashboardSnapshotMeta.textContent =
            totals.startedCourses
                ? `${totals.completedCourses} of ${totals.startedCourses} started courses completed â€¢ ${totals.completedLessons} lessons finished.`
                : "Choose your first course to begin tracking real learning progress.";
    }

}


/* =========================================================
   RECENT ACTIVITY
========================================================= */

function formatRelativeTime(timestampValue) {

    if (!timestampValue) {
        return "Progress saved";
    }

    const elapsed =
        Math.max(
            0,
            Date.now() - timestampValue
        );

    const minutes =
        Math.floor(elapsed / 60000);

    if (minutes < 1) {
        return "Just now";
    }

    if (minutes < 60) {
        return `${minutes} min ago`;
    }

    const hours =
        Math.floor(minutes / 60);

    if (hours < 24) {
        return `${hours} hr${hours === 1 ? "" : "s"} ago`;
    }

    const days =
        Math.floor(hours / 24);

    if (days < 7) {
        return `${days} day${days === 1 ? "" : "s"} ago`;
    }

    return new Intl.DateTimeFormat(
        "en-ZA",
        {
            day: "numeric",
            month: "short"
        }
    ).format(new Date(timestampValue));

}


function getTargetSummary(target) {

    if (!target) {
        return "Open course";
    }

    if (target.type === "lesson") {
        return `Next lesson: ${target.item?.title || "Continue learning"}`;
    }

    if (target.type === "activity") {
        return `Next activity: ${target.item?.title || "Practical activity"}`;
    }

    if (target.type === "assessment") {
        return `Next: ${target.module?.title || "Module"} assessment`;
    }

    if (target.type === "final") {
        return "Next: Final assessment";
    }

    return "Course completed";

}


function renderRecentActivity() {

    if (!dashboardRecentActivity) {
        return;
    }

    const recentItems =
        [...courseProgressMap.values()]
            .filter(progress => {
                const course =
                    getCourse(progress.courseId);

                return Boolean(
                    course &&
                    (
                        progress.started ||
                        progress.completed ||
                        progress.completedLessons.length ||
                        progress.completedLabs.length ||
                        progress.completedAssessments.length
                    )
                );
            })
            .sort(
                (a, b) =>
                    getProgressDateValue(b) -
                    getProgressDateValue(a)
            )
            .slice(0, 3);

    if (!recentItems.length) {
        dashboardRecentActivity.innerHTML = `
            <div class="dashboard-small-empty">
                <i class="fa-regular fa-clock"></i>
                <p>Your latest course activity will appear here.</p>
                <a href="student-courses.html">Start a course</a>
            </div>
        `;
        return;
    }

    dashboardRecentActivity.innerHTML =
        recentItems.map(progress => {

            const course =
                getCourse(progress.courseId);

            const target =
                findNextLearningTarget(
                    course,
                    progress
                );

            const percentage =
                calculateUnifiedProgress(
                    course,
                    progress
                );

            return `
                <a
                    href="${target.url}"
                    class="dashboard-recent-item"
                >
                    <span class="dashboard-recent-icon">
                        <i class="${escapeHTML(course.icon || "fa-solid fa-book-open")}"></i>
                    </span>
                    <span class="dashboard-recent-copy">
                        <strong>${escapeHTML(course.title)}</strong>
                        <small>${escapeHTML(getTargetSummary(target))}</small>
                    </span>
                    <span class="dashboard-recent-meta">
                        <strong>${percentage}%</strong>
                        <small>${escapeHTML(formatRelativeTime(getProgressDateValue(progress)))}</small>
                    </span>
                </a>
            `;

        }).join("");

}


/* =========================================================
   COURSE RECOMMENDATION
========================================================= */

function prerequisitesAreComplete(courseId) {

    return getRequiredPrerequisites(courseId)
        .every(requiredCourseId => {

            const progress =
                getCourseProgress(requiredCourseId);

            const course =
                getCourse(requiredCourseId);

            return Boolean(
                progress &&
                (
                    progress.completed ||
                    progress.certificateEligible ||
                    (
                        course &&
                        calculateUnifiedProgress(
                            course,
                            progress
                        ) >= 100
                    )
                )
            );

        });

}


function getRecommendedNextCourse() {

    const candidates =
        getAllCourses()
            .filter(course =>
                course.status === "available" &&
                !isCourseLocked(course.id) &&
                !getCourseProgress(course.id)?.completed &&
                prerequisitesAreComplete(course.id)
            )
            .sort((courseA, courseB) => {

                const progressA =
                    getCourseProgress(courseA.id);

                const progressB =
                    getCourseProgress(courseB.id);

                const startedA =
                    progressA?.started ? 1 : 0;

                const startedB =
                    progressB?.started ? 1 : 0;

                if (startedA !== startedB) {
                    return startedA - startedB;
                }

                const pathA =
                    getCoursePathInfo(courseA.id);

                const pathB =
                    getCoursePathInfo(courseB.id);

                const stageOrder = {
                    foundation: 1,
                    pro: 2,
                    professional: 3
                };

                const stageDifference =
                    (stageOrder[pathA?.stage] || 99) -
                    (stageOrder[pathB?.stage] || 99);

                if (stageDifference) {
                    return stageDifference;
                }

                return (
                    Number(pathA?.order || 999) -
                    Number(pathB?.order || 999)
                );

            });

    return candidates[0] || null;

}


function renderRecommendation() {

    if (!dashboardRecommendation) {
        return;
    }

    const course =
        getRecommendedNextCourse();

    if (!course) {
        dashboardRecommendation.innerHTML = `
            <div class="dashboard-small-empty">
                <i class="fa-solid fa-route"></i>
                <p>No new unlocked course is waiting right now.</p>
                <a href="learning-paths.html">Review learning paths</a>
            </div>
        `;
        return;
    }

    const progress =
        getCourseProgress(course.id);

    const stage =
        getCourseStageInfo(course.id);

    const requiredCount =
        getRequiredPrerequisites(course.id).length;

    const reason =
        progress?.started
            ? "Continue this active course"
            : requiredCount
                ? "Your required prerequisites are complete"
                : "The best starting point for your path";

    dashboardRecommendation.innerHTML = `
        <span class="dashboard-recommendation-stage">
            <i class="fa-solid fa-layer-group"></i>
            ${escapeHTML(stage?.shortLabel || "Foundation")}
        </span>
        <h4>${escapeHTML(course.title)}</h4>
        <p>${escapeHTML(reason)}.</p>
        <a
            href="${buildCourseUrl(course.id)}"
            class="dashboard-card-action"
        >
            ${progress?.started ? "Continue course" : "View course"}
            <i class="fa-solid fa-arrow-right"></i>
        </a>
    `;

}


/* =========================================================
   SAVED LESSON WORK
========================================================= */

function getSavedLearningData() {

    const result = {
        bookmarks: 0,
        notes: 0,
        latest: null
    };

    if (!currentUser) {
        return result;
    }

    const prefix =
        `cwsLessonExperience:v1:${currentUser.uid}:`;

    try {

        for (
            let index = 0;
            index < localStorage.length;
            index++
        ) {

            const key =
                localStorage.key(index);

            if (!key?.startsWith(prefix)) {
                continue;
            }

            const value =
                JSON.parse(
                    localStorage.getItem(key) || "{}"
                );

            if (value.bookmarked === true) {
                result.bookmarks++;
            }

            if (
                typeof value.notes === "string" &&
                value.notes.trim()
            ) {
                result.notes++;
            }

            const updatedAt =
                Date.parse(value.updatedAt || "") || 0;

            if (
                updatedAt &&
                (
                    !result.latest ||
                    updatedAt > result.latest.updatedAt
                )
            ) {

                const [courseId, moduleId, lessonId] =
                    key
                        .slice(prefix.length)
                        .split(":");

                result.latest = {
                    courseId,
                    moduleId,
                    lessonId,
                    updatedAt
                };

            }

        }

    } catch (err) {
        warn(
            "Unable to read saved lesson data:",
            err
        );
    }

    return result;

}


function renderSavedLearning() {

    if (!dashboardSavedLearning) {
        return;
    }

    const saved =
        getSavedLearningData();

    let latestLink = "student-courses.html";
    let latestLabel = "Open a lesson to save notes and bookmarks";

    if (saved.latest) {

        const course =
            getCourse(saved.latest.courseId);

        const module =
            course?.modules?.find(
                item =>
                    item.id === saved.latest.moduleId
            );

        const lesson =
            module?.lessons?.find(
                item =>
                    item.id === saved.latest.lessonId
            );

        if (course && module && lesson) {
            latestLink =
                buildLessonUrl(
                    course.id,
                    module.id,
                    lesson.id
                );
            latestLabel =
                `Last saved: ${lesson.title}`;
        }

    }

    dashboardSavedLearning.innerHTML = `
        <div class="dashboard-saved-metrics">
            <div>
                <strong>${saved.bookmarks}</strong>
                <span>Bookmarks</span>
            </div>
            <div>
                <strong>${saved.notes}</strong>
                <span>Lesson notes</span>
            </div>
        </div>
        <a href="${latestLink}" class="dashboard-saved-link">
            <span>${escapeHTML(latestLabel)}</span>
            <i class="fa-solid fa-arrow-right"></i>
        </a>
        <small>Private to this browser and device.</small>
    `;

}


/* =========================================================
   PRACTICE QUEUE
========================================================= */

function getPracticeQueue() {

    const items = [];

    sortCoursesForDashboard(
        getAllCourses()
    )
        .filter(course => {

            const progress =
                getCourseProgress(course.id);

            return (
                course.status === "available" &&
                !isCourseLocked(course.id) &&
                prerequisitesAreComplete(course.id) &&
                Boolean(
                    progress?.started ||
                    progress?.completedLessons.length
                )
            );

        })
        .forEach(course => {

            const progress =
                getCourseProgress(course.id);

            course.modules?.forEach(module => {

                const moduleLessons =
                    Array.isArray(module.lessons)
                        ? module.lessons
                        : [];

                const moduleLessonsComplete =
                    moduleLessons.every(lesson =>
                        progress.completedLessons.includes(
                            `${module.id}:${lesson.id}`
                        )
                    );

                if (!moduleLessonsComplete) {
                    return;
                }

                getModuleActivities(module)
                    .forEach(activity => {

                        const key =
                            `${module.id}:${activity.id}`;

                        if (
                            progress.completedLabs.includes(key)
                        ) {
                            return;
                        }

                        items.push({
                            course,
                            module,
                            activity,
                            url: buildLabActivityUrl(
                                course.id,
                                module.id,
                                activity.id
                            ),
                            updatedAt:
                                getProgressDateValue(progress)
                        });

                    });

            });

        });

    return items
        .sort(
            (a, b) =>
                b.updatedAt - a.updatedAt
        )
        .slice(0, 4);

}


function renderPracticeQueue() {

    if (!dashboardPracticeGrid) {
        return;
    }

    const items =
        getPracticeQueue();

    dashboardPracticeGrid.innerHTML = "";

    if (!items.length) {
        dashboardPracticeGrid.hidden = true;
        if (dashboardPracticeEmpty) {
            dashboardPracticeEmpty.hidden = false;
        }
        return;
    }

    dashboardPracticeGrid.innerHTML =
        items.map(item => `
            <article class="dashboard-lab-card dashboard-practice-card">
                <div class="lab-icon">
                    <i class="${escapeHTML(item.course.icon || "fa-solid fa-terminal")}"></i>
                </div>
                <div>
                    <span class="lab-category">
                        ${escapeHTML(item.course.title)}
                    </span>
                    <h3>${escapeHTML(item.activity.title || "Practical Activity")}</h3>
                    <p>
                        ${escapeHTML(item.module.title || "Course module")}
                        ${
                            item.activity.duration
                                ? ` â€¢ ${escapeHTML(item.activity.duration)}`
                                : ""
                        }
                    </p>
                </div>
                <a href="${item.url}">
                    Start activity
                    <i class="fa-solid fa-arrow-right"></i>
                </a>
            </article>
        `).join("");

    dashboardPracticeGrid.hidden = false;

    if (dashboardPracticeEmpty) {
        dashboardPracticeEmpty.hidden = true;
    }

}


/* =========================================================
   ACHIEVEMENTS
========================================================= */

function renderAchievements() {

    if (!dashboardAchievementsGrid) {
        return;
    }

    const totals =
        getDashboardTotals();

    const achievements = [
        {
            title: "First Step",
            description: "Complete your first lesson.",
            icon: "fa-solid fa-shoe-prints",
            earned: totals.completedLessons >= 1,
            progress: `${Math.min(totals.completedLessons, 1)}/1 lesson`
        },
        {
            title: "Hands-On Learner",
            description: "Complete your first practical activity.",
            icon: "fa-solid fa-flask",
            earned: totals.completedActivities >= 1,
            progress: `${Math.min(totals.completedActivities, 1)}/1 activity`
        },
        {
            title: "Knowledge Checked",
            description: "Complete your first module assessment.",
            icon: "fa-solid fa-clipboard-check",
            earned: totals.completedAssessments >= 1,
            progress: `${Math.min(totals.completedAssessments, 1)}/1 assessment`
        },
        {
            title: "Path Explorer",
            description: "Begin three structured courses.",
            icon: "fa-solid fa-route",
            earned: totals.startedCourses >= 3,
            progress: `${Math.min(totals.startedCourses, 3)}/3 courses`
        },
        {
            title: "Course Finisher",
            description: "Complete an entire course.",
            icon: "fa-solid fa-flag-checkered",
            earned: totals.completedCourses >= 1,
            progress: `${Math.min(totals.completedCourses, 1)}/1 course`
        },
        {
            title: "Certified",
            description: "Earn your first CWS certificate.",
            icon: "fa-solid fa-certificate",
            earned: totals.certificates >= 1,
            progress: `${Math.min(totals.certificates, 1)}/1 certificate`
        }
    ];

    dashboardAchievementsGrid.innerHTML =
        achievements.map(achievement => `
            <article
                class="dashboard-achievement-card ${achievement.earned ? "earned" : "locked"}"
                aria-label="${escapeHTML(achievement.title)}: ${achievement.earned ? "unlocked" : "locked"}"
            >
                <span class="dashboard-achievement-icon">
                    <i class="${achievement.icon}"></i>
                </span>
                <div>
                    <span class="dashboard-achievement-status">
                        ${achievement.earned ? "Unlocked" : "Locked"}
                    </span>
                    <h3>${escapeHTML(achievement.title)}</h3>
                    <p>${escapeHTML(achievement.description)}</p>
                    <small>${escapeHTML(achievement.progress)}</small>
                </div>
            </article>
        `).join("");

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

                progress.completed ||

                progress.completedLessons
                    ?.length > 0 ||

                progress.completedLabs
                    ?.length > 0 ||

                progress.completedAssessments
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
                progress.completed ||
                progress.certificateEligible
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
       Render the personalized overview from the same
       in-memory progress map. No additional Firebase
       requests are required for these dashboard panels.
    */

    renderHeroSnapshot();

    renderRecentActivity();

    renderRecommendation();

    renderSavedLearning();

    renderPracticeQueue();

    renderAchievements();


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
