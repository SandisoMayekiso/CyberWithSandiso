/* =========================================================
   CWS ACADEMY
   COURSE REGISTRY
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


/* =========================================================
   COURSES
========================================================= */

export const courses = {

    [cybersecurityFundamentals.id]:
        cybersecurityFundamentals,

    [networkingFundamentals.id]:
        networkingFundamentals,

    [linuxFundamentals.id]:
        linuxFundamentals

};


/* =========================================================
   GET COURSE
========================================================= */

export function getCourse(courseId) {

    if (!courseId) {
        return null;
    }

    return (
        courses[
            String(courseId)
                .trim()
                .toLowerCase()
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
        getCourse(courseId);

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
