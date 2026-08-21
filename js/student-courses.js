/* =========================================================
   CWS ACADEMY
   STUDENT COURSES

   Dynamic Course Catalogue
   Firebase Authentication
   Firestore Course Progress
   Filtering + Search
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

    getDocs,

    doc,

    getDoc

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

    isProCourse,

    isCourseLocked,

    getCourseDisplayStatus,

    getCourseStage,

    getCourseStageInfo,

    getRequiredPrerequisites,

    getRecommendedPrerequisites

} from "../data/courses.js";


import {
    getCourseExperience
} from "../data/course-experience.js";


/* =========================================================
   DEBUG
========================================================= */

const DEBUG = true;


function log(...args) {

    if (DEBUG) {

        console.log(
            "[CWS Student Courses]",
            ...args
        );

    }

}


function warn(...args) {

    if (DEBUG) {

        console.warn(
            "[CWS Student Courses]",
            ...args
        );

    }

}


function error(...args) {

    console.error(
        "[CWS Student Courses]",
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


const studentCourseGrid =
    document.getElementById(
        "studentCourseGrid"
    );


const studentCoursesLoading =
    document.getElementById(
        "studentCoursesLoading"
    );


const noCoursesMessage =
    document.getElementById(
        "noCoursesMessage"
    );


const noCoursesText =
    document.getElementById(
        "noCoursesText"
    );


const courseCatalogEmpty =
    document.getElementById(
        "courseCatalogEmpty"
    );


const courseSearchInput =
    document.getElementById(
        "courseSearchInput"
    );


const availableCourseCount =
    document.getElementById(
        "availableCourseCount"
    );


const plannedCourseCount =
    document.getElementById(
        "plannedCourseCount"
    );


const courseFilterButtons =
    Array.from(
        document.querySelectorAll(
            ".course-filter"
        )
    );


/* =========================================================
   STATE
========================================================= */

let currentUser = null;

let currentFilter =
    "all";

let currentSearch =
    "";

let courseProgressMap =
    new Map();

let courseCatalog =
    [];

let pageInitialized =
    false;


/* =========================================================
   CWS PRO ACCESS

   Supported Firestore user fields include:
   plan: "pro"
   access: "pro"
   subscriptionTier: "pro"
   subscriptionStatus: "active"
   isPro: true

   This keeps the catalogue compatible while the final
   Paystack subscription workflow is being completed.
========================================================= */

let studentAccess = {
    isPro: false,
    plan: "free",
    status: "free"
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
   NORMALIZE ACCESS VALUE
========================================================= */

function normalizeAccessValue(value) {

    return String(value || "")
        .trim()
        .toLowerCase();

}


/* =========================================================
   LOAD STUDENT ACCESS
========================================================= */

async function loadStudentAccess(user) {

    studentAccess = {
        isPro: false,
        plan: "free",
        status: "free"
    };


    if (!db || !user) {

        warn(
            "Unable to check CWS Pro access."
        );

        return studentAccess;

    }


    try {

        /*
         * Source of truth:
         * entitlements/{uid}
         *
         * This document is written only by the trusted Paystack
         * backend after server-side transaction verification.
         */

        const entitlementRef =
            doc(
                db,
                "entitlements",
                user.uid
            );


        const entitlementSnapshot =
            await getDoc(
                entitlementRef
            );


        if (!entitlementSnapshot.exists()) {

            log(
                "No entitlement document found. Using Free access."
            );

            return studentAccess;

        }


        const data =
            entitlementSnapshot.data() || {};


        const plan =
            normalizeAccessValue(
                data.plan
            );


        const status =
            normalizeAccessValue(
                data.status
            );


        const proPlan =
            plan === "pro";


        const activeStatus =
            [
                "active",
                "trialing"
            ].includes(
                status
            );


        studentAccess = {

            isPro:
                proPlan &&
                activeStatus,

            plan:
                plan || "free",

            status:
                status || "inactive"

        };


        log(
            "Student entitlement loaded:",
            studentAccess
        );


    } catch (err) {

        error(
            "Unable to load student entitlement:",
            err
        );

    }


    return studentAccess;

}


/* =========================================================
   COURSE ACCESS
========================================================= */

function studentCanAccessCourse(course) {

    if (!course) {

        return false;

    }


    if (
        !isProCourse(
            course.id
        )
    ) {

        return true;

    }


    return studentAccess.isPro;

}


/* =========================================================
   PRO COURSE LOCK
========================================================= */

function isProCourseLockedForStudent(course) {

    return (
        Boolean(course) &&
        isProCourse(
            course.id
        ) &&
        !studentCanAccessCourse(
            course
        )
    );

}


/* =========================================================
   PRICING URL
========================================================= */

function buildProPricingUrl(
    courseId = ""
) {

    const params =
        new URLSearchParams();


    if (courseId) {

        params.set(
            "course",
            courseId
        );

    }


    params.set(
        "from",
        "student-courses"
    );


    /*
     * Logged-in students should remain inside the student area.
     * The public pricing page is for visitors who are not signed in.
     */

    return (
        `subscription.html?${params.toString()}`
    );

}


/* =========================================================
   GET COURSE LIST
========================================================= */

function getCourseList() {

    if (!courses) {

        return [];

    }


    return Object.values(
        courses
    );

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

            const lessonCount =

                Array.isArray(
                    module.lessons
                )
                    ? module.lessons.length
                    : 0;


            return (
                total +
                lessonCount
            );

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

            const labActivities =
                Array.isArray(
                    module?.labActivities
                )
                    ? module.labActivities.length
                    : 0;


            const practiceActivities =
                Array.isArray(
                    module?.practiceActivities
                )
                    ? module.practiceActivities.length
                    : 0;


            return (
                total +
                labActivities +
                practiceActivities
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


    const moduleAssessments =
        course.modules.filter(
            module =>
                module?.moduleAssessment &&
                Array.isArray(
                    module.moduleAssessment.questions
                ) &&
                module.moduleAssessment.questions.length
        ).length;


    return (
        moduleAssessments +
        (course.finalAssessment ? 1 : 0)
    );

}


/* =========================================================
   COURSE URL
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
            )

    };

}


/* =========================================================
   LOAD PROGRESS
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
            "Firestore unavailable."
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


                courseProgressMap.set(

                    courseId,

                    normalizeProgress(

                        courseId,

                        documentSnapshot.data()

                    )

                );

            }
        );


        log(
            "Progress loaded:",
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
   GET COURSE PROGRESS
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
   COURSE PROGRESS %
========================================================= */

function calculateCourseProgress(
    course,
    progress
) {

    if (
        !course ||
        !progress
    ) {

        return 0;

    }


    const total =
        getTotalLessons(
            course
        );


    if (!total) {

        return 0;

    }


    const completed =

        progress
            .completedLessons
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
   COURSE SORTING
========================================================= */

function sortCourses(
    courseList
) {

    return [...courseList]
        .sort(
            (
                courseA,
                courseB
            ) => {

                /*
                   Free available courses first,
                   locked Pro courses second,
                   other planned courses last.
                */

                const rankCourse =
                    course => {

                        if (
                            course.status ===
                                "available" &&
                            !isProCourseLockedForStudent(
                                course
                            ) &&
                            !isCourseLockedByPrerequisites(
                                course
                            )
                        ) {

                            return 0;

                        }


                        if (
                            isCourseLockedByPrerequisites(
                                course
                            )
                        ) {

                            return 1;

                        }


                        if (
                            isProCourseLockedForStudent(
                                course
                            )
                        ) {

                            return 2;

                        }


                        return 3;

                    };


                const statusA =
                    rankCourse(
                        courseA
                    );


                const statusB =
                    rankCourse(
                        courseB
                    );


                if (
                    statusA !==
                    statusB
                ) {

                    return (
                        statusA -
                        statusB
                    );

                }


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
                    orderA !==
                    orderB
                ) {

                    return (
                        orderA -
                        orderB
                    );

                }


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
   CATALOG SUMMARY
========================================================= */

function updateCourseCatalogSummary() {

    const available =
        courseCatalog.filter(
            course =>

                course.status ===
                    "available" &&

                !(
                    isProCourseLockedForStudent(
                        course
                    )
                )

        ).length;


    const planned =
        courseCatalog.filter(
            course =>

                course.status ===
                    "planned" ||

                (
                    isProCourseLockedForStudent(
                        course
                    )
                )

        ).length;


    if (
        availableCourseCount
    ) {

        availableCourseCount.textContent =
            `${available} Available`;

    }


    if (
        plannedCourseCount
    ) {

        plannedCourseCount.textContent =
            `${planned} Planned / Pro`;

    }

}


/* =========================================================
   META ITEM
========================================================= */

function createMetaItem(
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
   PREREQUISITE COMPLETION
========================================================= */

function isCourseCompleted(courseId) {

    const progress =
        getCourseProgress(
            courseId
        );


    return (
        progress?.completed ===
        true
    );

}


/* =========================================================
   REQUIRED PREREQUISITE STATUS
========================================================= */

function getMissingRequiredPrerequisites(course) {

    if (!course) {

        return [];

    }


    return getRequiredPrerequisites(
        course.id
    )
        .filter(
            prerequisiteId =>
                !isCourseCompleted(
                    prerequisiteId
                )
        );

}


/* =========================================================
   COURSE PREREQUISITE LOCK
========================================================= */

function isCourseLockedByPrerequisites(course) {

    return (
        getMissingRequiredPrerequisites(
            course
        ).length > 0
    );

}


/* =========================================================
   FIRST MISSING REQUIRED COURSE
========================================================= */

function getFirstMissingPrerequisite(course) {

    const missing =
        getMissingRequiredPrerequisites(
            course
        );


    if (!missing.length) {

        return null;

    }


    const prerequisiteId =
        missing[0];


    return (
        courses[
            prerequisiteId
        ] ||
        {
            id:
                prerequisiteId,

            title:
                prerequisiteId
        }
    );

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


    const isPro =
        isProCourse(
            course.id
        );


    const isLockedPro =
        isProCourseLockedForStudent(
            course
        );


    const isPrerequisiteLocked =
        isCourseLockedByPrerequisites(
            course
        );


    const firstMissingPrerequisite =
        getFirstMissingPrerequisite(
            course
        );


    const displayStatus =
        getCourseDisplayStatus(
            course.id
        );


    const card =
        document.createElement(
            "article"
        );


    card.className =
        "student-course-card";


    card.dataset.courseId =
        course.id;


    card.dataset.level =
        course.levelKey ||
        String(
            course.level || ""
        )
            .toLowerCase();


    card.dataset.status =
        course.status ||
        "planned";


    card.dataset.access =
        course.access ||
        "free";


    if (isLockedPro) {

        card.classList.add(
            "pro-locked"
        );


        card.setAttribute(
            "aria-disabled",
            "true"
        );

    }


    if (
        isPrerequisiteLocked
    ) {

        card.classList.add(
            "prerequisite-locked"
        );

        card.setAttribute(
            "data-prerequisite-locked",
            "true"
        );

    }


    if (
        !isLockedPro &&
        course.status !==
        "available"
    ) {

        card.classList.add(
            "planned"
        );

    }


    /* =====================================================
       16:9 COURSE COVER
    ====================================================== */

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


    coverImage.width =
        1280;


    coverImage.height =
        720;


    coverImage.onerror = () => {

        coverImage.onerror =
            null;


        coverImage.src =
            experience?.cover?.fallback ||
            "../assets/images/cybersecurity.png";

    };


    cover.appendChild(
        coverImage
    );


    /* =====================================================
       TOP
    ====================================================== */

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


        const crownIcon =
            document.createElement(
                "i"
            );


        crownIcon.className =
            "fa-solid fa-crown";


        status.appendChild(
            crownIcon
        );


        status.appendChild(
            document.createTextNode(
                " CWS PRO"
            )
        );

    }
    else {

        status.className =
            `course-status ${
                displayStatus.key ===
                    "available"
                    ? "available"
                    : "planned"
            }`;


        status.textContent =
            String(
                displayStatus.label ||
                "Planned"
            )
                .toUpperCase();

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


    /* =====================================================
       ICON
    ====================================================== */

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


    /* =====================================================
       TITLE
    ====================================================== */

    const title =
        document.createElement(
            "h3"
        );


    title.textContent =
        course.title ||
        "CWS Academy Course";


    /* =====================================================
       DESCRIPTION
    ====================================================== */

    const description =
        document.createElement(
            "p"
        );


    description.textContent =
        course.description ||
        "Course details coming soon.";


    /* =====================================================
       META
    ====================================================== */

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


    /*
       Pro courses remain visible as curriculum previews
       while Pro access is temporarily disabled.
    */

    if (
        course.status ===
            "available" ||
        isPro
    ) {

        meta.appendChild(

            createMetaItem(

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

                createMetaItem(

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


        if (
            assessments > 0
        ) {

            meta.appendChild(

                createMetaItem(

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

            createMetaItem(

                "fa-solid fa-clock",

                "Planned"

            )

        );

    }


    /* =====================================================
       PROGRESS
    ====================================================== */

    if (
        !isLockedPro &&
        course.status ===
            "available" &&
        progress &&
        (
            progress.started ||
            progress.completedLessons
                ?.length > 0
        )
    ) {

        const percentage =
            calculateCourseProgress(
                course,
                progress
            );


        const progressWrapper =
            document.createElement(
                "div"
            );


        progressWrapper.className =
            "student-course-progress";


        progressWrapper.innerHTML = `

            <div class="student-course-progress-header">

                <span>
                    ${
                        progress.completed
                            ? "Completed"
                            : "Your Progress"
                    }
                </span>

                <strong>
                    ${percentage}%
                </strong>

            </div>


            <div
                class="student-course-progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow="${percentage}"
            >

                <div
                    class="student-course-progress-fill"
                    style="width: ${percentage}%"
                ></div>

            </div>

        `;


        card._progressElement =
            progressWrapper;

    }


    /* =====================================================
       ACTION
    ====================================================== */

    let action;


    if (
        isPrerequisiteLocked
    ) {

        action =
            document.createElement(
                "a"
            );


        action.className =
            "course-action prerequisite-required-action";


        action.href =
            firstMissingPrerequisite?.id
                ? buildCourseUrl(
                    firstMissingPrerequisite.id
                )
                : "#";


        action.innerHTML = `

            <i class="fa-solid fa-lock"></i>

            Complete ${
                firstMissingPrerequisite?.title ||
                "Required Course"
            } First

        `;

    }

    else     if (isLockedPro) {

        action =
            document.createElement(
                "a"
            );


        action.className =
            "course-action pro-upgrade-action";


        action.href =
            buildProPricingUrl(
                course.id
            );


        action.title =
            "View CWS Pro access options";


        action.innerHTML = `

            <i class="fa-solid fa-crown"></i>

            Unlock with CWS Pro

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
            "course-action";


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
            progress
                ?.completedLessons
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
            "course-action disabled";


        action.disabled =
            true;


        action.textContent =
            "Coming Soon";

    }


    /* =====================================================
       ASSEMBLE
    ====================================================== */

    card.appendChild(
        cover
    );


    card.appendChild(
        top
    );


    card.appendChild(
        iconContainer
    );


    card.appendChild(
        title
    );


    card.appendChild(
        description
    );


    card.appendChild(
        meta
    );


    if (
        card._progressElement
    ) {

        card.appendChild(
            card._progressElement
        );


        delete card._progressElement;

    }


    card.appendChild(
        action
    );


    
    /* =====================================================
       LEARNING PATH / PREREQUISITES
    ====================================================== */

    const requiredPrerequisites =
        getRequiredPrerequisites(
            course.id
        );

    const recommendedPrerequisites =
        getRecommendedPrerequisites(
            course.id
        );

    if (
        requiredPrerequisites.length ||
        recommendedPrerequisites.length
    ) {

        const prerequisitePanel =
            document.createElement(
                "div"
            );

        prerequisitePanel.className =
            "course-prerequisite-status";


        const prerequisiteTitle =
            document.createElement(
                "span"
            );

        prerequisiteTitle.className =
            "course-prerequisite-title";

        prerequisiteTitle.innerHTML =
            '<i class="fa-solid fa-route"></i> Learning path';

        prerequisitePanel.appendChild(
            prerequisiteTitle
        );


        const addPrerequisite =
            (
                prerequisiteId,
                type
            ) => {

                const prerequisiteCourse =
                    courses[
                        prerequisiteId
                    ];

                const prerequisiteProgress =
                    getCourseProgress(
                        prerequisiteId
                    );

                const complete =
                    prerequisiteProgress?.completed ===
                    true;

                const item =
                    document.createElement(
                        "div"
                    );

                item.className =
                    `course-prerequisite-item ${type} ${
                        complete
                            ? "completed"
                            : "incomplete"
                    }`;

                const icon =
                    complete
                        ? "fa-circle-check"
                        : (
                            type === "required"
                                ? "fa-lock"
                                : "fa-circle-info"
                        );

                item.innerHTML =
                    `<i class="fa-solid ${icon}"></i>
                     <span>${prerequisiteCourse?.title || prerequisiteId}</span>
                     <strong>${complete ? "Completed" : (type === "required" ? "Required" : "Recommended")}</strong>`;

                prerequisitePanel.appendChild(
                    item
                );

            };


        requiredPrerequisites.forEach(
            prerequisiteId =>
                addPrerequisite(
                    prerequisiteId,
                    "required"
                )
        );


        recommendedPrerequisites.forEach(
            prerequisiteId =>
                addPrerequisite(
                    prerequisiteId,
                    "recommended"
                )
        );


        const action =
            card.querySelector(
                ".course-action, .course-pro-actions"
            );

        if (action) {

            card.insertBefore(
                prerequisitePanel,
                action
            );

        } else {

            card.appendChild(
                prerequisitePanel
            );

        }

    }



    if (
        isPrerequisiteLocked
    ) {

        const prerequisiteNotice =
            document.createElement(
                "div"
            );


        prerequisiteNotice.className =
            "course-prerequisite-lock-notice";


        const missingNames =
            getMissingRequiredPrerequisites(
                course
            )
                .map(
                    prerequisiteId =>
                        courses[
                            prerequisiteId
                        ]?.title ||
                        prerequisiteId
                );


        prerequisiteNotice.innerHTML = `
            <i class="fa-solid fa-lock"></i>
            <div>
                <strong>Required prerequisite incomplete</strong>
                <span>
                    Complete ${
                        missingNames.join(
                            ", "
                        )
                    } before starting this course.
                </span>
            </div>
        `;


        const actionNode =
            card.querySelector(
                ".course-action, .course-pro-actions"
            );


        if (actionNode) {

            card.insertBefore(
                prerequisiteNotice,
                actionNode
            );

        } else {

            card.appendChild(
                prerequisiteNotice
            );

        }

    }


return card;

}


/* =========================================================
   FILTER MATCH
========================================================= */

function matchesFilter(
    course
) {

    if (
        currentFilter ===
        "all"
    ) {

        return true;

    }


    const isLockedPro =
        isProCourseLockedForStudent(
            course
        );


    if (
        currentFilter ===
        "available"
    ) {

        return (
            course.status ===
                "available" &&
            !isLockedPro
        );

    }


    if (
        currentFilter ===
        "planned"
    ) {

        return (
            course.status ===
                "planned" ||
            isLockedPro
        );

    }


    const level =

        course.levelKey ||

        String(
            course.level || ""
        )
            .trim()
            .toLowerCase();


    return (
        level ===
        currentFilter
    );

}


/* =========================================================
   SEARCH MATCH
========================================================= */

function matchesSearch(
    course
) {

    if (!currentSearch) {

        return true;

    }


    const searchableText = [

        course.title,

        course.description,

        course.category,

        course.level,

        course.id

    ]
        .filter(Boolean)

        .join(" ")

        .toLowerCase();


    return searchableText.includes(
        currentSearch
    );

}


/* =========================================================
   FILTERED COURSES
========================================================= */

function getFilteredCourses() {

    return courseCatalog.filter(course => {

        const level =
            String(
                course.levelKey ||
                course.level ||
                ""
            )
                .trim()
                .toLowerCase();

        const stage =
            getCourseStage(
                course.id
            );

        const matchesFilter =
            currentFilter === "all" ||
            currentFilter === level ||
            currentFilter === stage;

        if (!matchesFilter) {
            return false;
        }

        if (!currentSearch) {
            return true;
        }

        const searchableText = [
            course.title,
            course.description,
            course.level,
            stage,
            getCourseStageInfo(course.id)?.label,
            ...(
                getCourseExperience(course)
                    ?.skills ||
                []
            ),
            ...(
                getCourseExperience(course)
                    ?.tools ||
                []
            )
        ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

        return searchableText.includes(
            currentSearch
        );

    });

}


/* =========================================================
   RENDER COURSE CATALOG
========================================================= */

function renderCourseCatalog() {

    if (!studentCourseGrid) {
        return;
    }

    studentCourseGrid.innerHTML = "";

    const filteredCourses =
        getFilteredCourses();

    if (!filteredCourses.length) {

        studentCourseGrid.hidden = true;

        if (noCoursesMessage) {
            noCoursesMessage.hidden = false;
        }

        if (noCoursesText) {
            noCoursesText.textContent =
                currentSearch
                    ? `No courses match "${currentSearch}".`
                    : "No courses match the selected filters.";
        }

        return;
    }

    if (noCoursesMessage) {
        noCoursesMessage.hidden = true;
    }


    const stageOrder = [
        "foundation",
        "pro",
        "professional"
    ];


    stageOrder.forEach(stageId => {

        const stageCourses =
            filteredCourses.filter(
                course =>
                    getCourseStage(
                        course.id
                    ) ===
                    stageId
            );

        if (!stageCourses.length) {
            return;
        }


        const stageInfo =
            getCourseStageInfo(
                stageCourses[0].id
            );


        const section =
            document.createElement(
                "section"
            );

        section.className =
            `course-stage-section course-stage-${stageId}`;

        section.dataset.stage =
            stageId;


        const heading =
            document.createElement(
                "div"
            );

        heading.className =
            "course-stage-heading";

        heading.innerHTML =
            `<div>
                <span class="course-stage-kicker">${stageInfo?.shortLabel || stageId}</span>
                <h3>${stageInfo?.label || stageId}</h3>
                <p>${stageInfo?.description || ""}</p>
             </div>
             <span class="course-stage-count">${stageCourses.length} Course${stageCourses.length === 1 ? "" : "s"}</span>`;


        const grid =
            document.createElement(
                "div"
            );

        grid.className =
            "course-stage-grid";


        stageCourses.forEach(course => {

            const card =
                createCourseCard(
                    course
                );

            card.dataset.stage =
                stageId;

            grid.appendChild(
                card
            );

        });


        section.appendChild(
            heading
        );

        section.appendChild(
            grid
        );

        studentCourseGrid.appendChild(
            section
        );

    });


    studentCourseGrid.hidden = false;

}


/* =========================================================
   FILTER BUTTONS
========================================================= */

function setActiveFilter(
    filterValue
) {

    currentFilter =
        filterValue;


    courseFilterButtons.forEach(
        button => {

            const isActive =

                button.dataset.filter ===
                filterValue;


            button.classList.toggle(
                "active",
                isActive
            );


            button.setAttribute(
                "aria-pressed",
                String(isActive)
            );

        }
    );


    renderCourseCatalog();

}


/* =========================================================
   FILTER EVENTS
========================================================= */

courseFilterButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const filter =

                    button.dataset.filter ||
                    "all";


                setActiveFilter(
                    filter
                );

            }
        );

    }
);


/* =========================================================
   SEARCH
========================================================= */

if (
    courseSearchInput
) {

    courseSearchInput.addEventListener(
        "input",
        event => {

            currentSearch =

                String(
                    event.target.value ||
                    ""
                )
                    .trim()
                    .toLowerCase();


            renderCourseCatalog();

        }
    );

}


/* =========================================================
   SHOW CATALOG
========================================================= */

function showCourseCatalog() {

    if (
        studentCoursesLoading
    ) {

        studentCoursesLoading.hidden =
            true;

    }


    if (
        courseCatalogEmpty
    ) {

        courseCatalogEmpty.hidden =
            true;

    }


    renderCourseCatalog();

}


/* =========================================================
   EMPTY CATALOG
========================================================= */

function showCatalogEmpty() {

    if (
        studentCoursesLoading
    ) {

        studentCoursesLoading.hidden =
            true;

    }


    if (
        studentCourseGrid
    ) {

        studentCourseGrid.hidden =
            true;

    }


    if (
        noCoursesMessage
    ) {

        noCoursesMessage.hidden =
            true;

    }


    if (
        courseCatalogEmpty
    ) {

        courseCatalogEmpty.hidden =
            false;

    }

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
            "Firebase Authentication unavailable."
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

if (
    logoutBtn
) {

    logoutBtn.addEventListener(
        "click",
        logout
    );

}


/* =========================================================
   INITIALIZE CATALOG
========================================================= */

async function initializeCoursesPage(
    user
) {

    displayStudent(
        user
    );


    /*
       Load course definitions.
    */

    courseCatalog =
        sortCourses(
            getCourseList()
        );


    if (
        !courseCatalog.length
    ) {

        warn(
            "Course registry is empty."
        );


        showCatalogEmpty();

        return;

    }


    /*
       Entitlement and progress are independent Firestore
       reads, so load them together to reduce waiting time.
    */

    await Promise.all(
        [
            loadStudentAccess(
                user
            ),

            loadCourseProgress(
                user
            )
        ]
    );


    updateCourseCatalogSummary();


    /*
       Render after progress is loaded
       so buttons/progress are correct.
    */

    showCourseCatalog();


    log(
        "Student courses page initialized."
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


            if (!user) {

                currentUser =
                    null;


                window.location.replace(

                    "../pages/login.html?redirect=student-courses"

                );


                return;

            }


            currentUser =
                user;


            if (
                pageInitialized
            ) {

                return;

            }


            pageInitialized =
                true;


            try {

                await initializeCoursesPage(
                    user
                );

            } catch (err) {

                error(
                    "Courses page initialization failed:",
                    err
                );


                showCatalogEmpty();

            }

        }

    );

}


/* =========================================================
   INITIAL LOG
========================================================= */

log(
    "student-courses.js loaded."
);
