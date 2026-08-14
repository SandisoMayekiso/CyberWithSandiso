/* =========================================================
   CWS ACADEMY
   CENTRAL COURSE REGISTRY
========================================================= */

import {
    cybersecurityFundamentals
} from "./cybersecurity-fundamentals.js";

import {
    networkingFundamentals
} from "./networking-fundamentals.js";


/* =========================================================
   COURSE REGISTRY
========================================================= */

export const courses = {

    [cybersecurityFundamentals.id]:
        cybersecurityFundamentals,

    [networkingFundamentals.id]:
        networkingFundamentals

};


/* =========================================================
   GET COURSE
========================================================= */

export function getCourse(courseId) {

    if (!courseId) {
        return null;
    }

    const normalizedId =
        String(courseId)
            .trim()
            .toLowerCase();

    return courses[normalizedId] || null;

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

    if (!course || !moduleId) {
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

    if (
        !module ||
        !Array.isArray(module.lessons)
    ) {
        return null;
    }

    return (
        module.lessons.find(
            lesson =>
                lesson.id === lessonId
        ) || null
    );

}
