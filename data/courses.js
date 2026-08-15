/* =========================================================
   CWS ACADEMY
   CENTRAL COURSE REGISTRY
========================================================= */


/* =========================================================
   COURSE IMPORTS
========================================================= */

import {
    cybersecurityFundamentals
} from "./cybersecurity-fundamentals.js";


import {
    networkingFundamentals
} from "./networking-fundamentals.js";


import {
    linuxFundamentals
} from "./linux-fundamentals.js";


import {
    practicalPenetrationTesting
} from "./practical-penetration-testing.js";


/*
   Future courses:

   import {
       ethicalHackingFundamentals
   } from "./ethical-hacking-fundamentals.js";

   import {
       webApplicationSecurity
   } from "./web-application-security.js";
*/


/* =========================================================
   COURSE REGISTRY
========================================================= */

export const courses = {

    [cybersecurityFundamentals.id]:
        cybersecurityFundamentals,

    [networkingFundamentals.id]:
        networkingFundamentals,

    [linuxFundamentals.id]:
        linuxFundamentals,

    [practicalPenetrationTesting.id]:
        practicalPenetrationTesting

};


/* =========================================================
   NORMALIZE ID
========================================================= */

function normalizeId(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)
        .trim()
        .toLowerCase();

}


/* =========================================================
   GET ALL COURSES
========================================================= */

export function getCourses() {

    return Object.values(
        courses
    );

}


/* =========================================================
   GET COURSE
========================================================= */

export function getCourse(
    courseId
) {

    const normalizedCourseId =
        normalizeId(
            courseId
        );


    if (!normalizedCourseId) {

        return null;

    }


    return (
        courses[
            normalizedCourseId
        ] || null
    );

}


/* =========================================================
   GET MODULE
========================================================= */

export function getModule(
    courseId,
    moduleId
) {

    const course =
        getCourse(
            courseId
        );


    const normalizedModuleId =
        normalizeId(
            moduleId
        );


    if (
        !course ||
        !normalizedModuleId ||
        !Array.isArray(
            course.modules
        )
    ) {

        return null;

    }


    return (

        course.modules.find(
            module =>

                normalizeId(
                    module?.id
                ) ===
                normalizedModuleId
        ) ||

        null

    );

}


/* =========================================================
   GET LESSON
========================================================= */

export function getLesson(
    courseId,
    moduleId,
    lessonId
) {

    const module =
        getModule(
            courseId,
            moduleId
        );


    const normalizedLessonId =
        normalizeId(
            lessonId
        );


    if (
        !module ||
        !normalizedLessonId ||
        !Array.isArray(
            module.lessons
        )
    ) {

        return null;

    }


    return (

        module.lessons.find(
            lesson =>

                normalizeId(
                    lesson?.id
                ) ===
                normalizedLessonId
        ) ||

        null

    );

}


/* =========================================================
   GET FIRST MODULE
========================================================= */

export function getFirstModule(
    courseId
) {

    const course =
        getCourse(
            courseId
        );


    if (
        !course ||
        !Array.isArray(
            course.modules
        ) ||
        !course.modules.length
    ) {

        return null;

    }


    return (
        course.modules[0] ||
        null
    );

}


/* =========================================================
   GET FIRST LESSON
========================================================= */

export function getFirstLesson(
    courseId,
    moduleId
) {

    const module =
        getModule(
            courseId,
            moduleId
        );


    if (
        !module ||
        !Array.isArray(
            module.lessons
        ) ||
        !module.lessons.length
    ) {

        return null;

    }


    return (
        module.lessons[0] ||
        null
    );

}


/* =========================================================
   COURSE EXISTS
========================================================= */

export function courseExists(
    courseId
) {

    return Boolean(
        getCourse(
            courseId
        )
    );

}


/* =========================================================
   COURSE AVAILABLE
========================================================= */

export function isCourseAvailable(
    courseId
) {

    const course =
        getCourse(
            courseId
        );


    return (
        course?.status ===
        "available"
    );

}
