/* =========================================================
   CWS ACADEMY
   CENTRAL COURSE REGISTRY
   File: data/courses.js
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
    bashLinuxAutomation
} from "./bash-linux-automation.js";


import {
    pythonCybersecurityFundamentals
} from "./python-cybersecurity-fundamentals.js";


import {
    activeDirectoryFundamentals
} from "./active-directory-fundamentals.js";


import {
    ethicalHacking
} from "./ethical-hacking.js";


import {
    webApplicationSecurity
} from "./web-application-security.js";


import {
    pythonOffensiveSecurity
} from "./python-offensive-security.js";


import {
    activeDirectorySecurityPentesting
} from "./active-directory-security-pentesting.js";


import {
    linuxPrivilegeEscalation
} from "./linux-privilege-escalation.js";


import {
    practicalPenetrationTesting
} from "./practical-penetration-testing.js";


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

    [bashLinuxAutomation.id]:
        bashLinuxAutomation,

    [pythonCybersecurityFundamentals.id]:
        pythonCybersecurityFundamentals,

    [activeDirectoryFundamentals.id]:
        activeDirectoryFundamentals,

    [ethicalHacking.id]:
        ethicalHacking,

    [webApplicationSecurity.id]:
        webApplicationSecurity,

    [pythonOffensiveSecurity.id]:
        pythonOffensiveSecurity,

    [activeDirectorySecurityPentesting.id]:
        activeDirectorySecurityPentesting,

    [linuxPrivilegeEscalation.id]:
        linuxPrivilegeEscalation,

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
   NORMALIZE VALUE
========================================================= */

function normalizeValue(value) {

    return String(
        value || ""
    )
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

export function getCourse(courseId) {

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
        ] ||
        null
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

export function getFirstModule(courseId) {

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

export function courseExists(courseId) {

    return Boolean(
        getCourse(
            courseId
        )
    );

}


/* =========================================================
   COURSE AVAILABLE
========================================================= */

export function isCourseAvailable(courseId) {

    const course =
        getCourse(
            courseId
        );


    if (!course) {

        return false;

    }


    return (
        normalizeValue(
            course.status
        ) ===
        "available"
    );

}


/* =========================================================
   COURSE ACCESS LEVEL
========================================================= */

export function getCourseAccess(courseId) {

    const course =
        getCourse(
            courseId
        );


    if (!course) {

        return "free";

    }


    return (
        normalizeValue(
            course.access ||
            "free"
        ) ||
        "free"
    );

}


/* =========================================================
   PRO COURSE
========================================================= */

export function isProCourse(courseId) {

    const course =
        getCourse(
            courseId
        );


    if (!course) {

        return false;

    }


    return (
        course.proOnly === true ||
        normalizeValue(
            course.access
        ) ===
        "pro"
    );

}


/* =========================================================
   COURSE LOCKED
========================================================= */

export function isCourseLocked(courseId) {

    const course =
        getCourse(
            courseId
        );


    if (!course) {

        return true;

    }


    return (
        course.locked === true ||
        normalizeValue(
            course.availability
        ) ===
        "pro-coming-soon"
    );

}


/* =========================================================
   COURSE DISPLAY STATUS
========================================================= */

export function getCourseDisplayStatus(courseId) {

    const course =
        getCourse(
            courseId
        );


    if (!course) {

        return {
            key:
                "unknown",

            label:
                "Unavailable"
        };

    }


    if (
        isProCourse(
            courseId
        ) &&
        isCourseLocked(
            courseId
        )
    ) {

        return {
            key:
                "pro-coming-soon",

            label:
                course.availabilityLabel ||
                "Pro Coming Soon"
        };

    }


    if (
        isCourseAvailable(
            courseId
        )
    ) {

        return {
            key:
                "available",

            label:
                "Available"
        };

    }


    return {
        key:
            "planned",

        label:
            "Planned"
    };

}


/* =========================================================
   GET COURSES BY LEVEL
========================================================= */

export function getCoursesByLevel(level) {

    const normalizedLevel =
        normalizeValue(
            level
        );


    if (!normalizedLevel) {

        return getCourses();

    }


    return getCourses()
        .filter(
            course =>
                normalizeValue(
                    course?.levelKey ||
                    course?.level
                ) ===
                normalizedLevel
        );

}


/* =========================================================
   GET FREE COURSES
========================================================= */

export function getFreeCourses() {

    return getCourses()
        .filter(
            course =>
                normalizeValue(
                    course?.access
                ) !==
                "pro"
        );

}


/* =========================================================
   GET PRO COURSES
========================================================= */

export function getProCourses() {

    return getCourses()
        .filter(
            course =>
                course?.proOnly === true ||
                normalizeValue(
                    course?.access
                ) ===
                "pro"
        );

}


/* =========================================================
   GET AVAILABLE COURSES
========================================================= */

export function getAvailableCourses() {

    return getCourses()
        .filter(
            course =>
                normalizeValue(
                    course?.status
                ) ===
                "available"
        );

}


/* =========================================================
   GET PLANNED COURSES
========================================================= */

export function getPlannedCourses() {

    return getCourses()
        .filter(
            course =>
                normalizeValue(
                    course?.status
                ) !==
                "available"
        );

}


/* =========================================================
   GET COURSE MODULE COUNT
========================================================= */

export function getCourseModuleCount(courseId) {

    const course =
        getCourse(
            courseId
        );


    if (
        !course ||
        !Array.isArray(
            course.modules
        )
    ) {

        return 0;

    }


    return course.modules.length;

}


/* =========================================================
   GET COURSE LESSON COUNT
========================================================= */

export function getCourseLessonCount(courseId) {

    const course =
        getCourse(
            courseId
        );


    if (
        !course ||
        !Array.isArray(
            course.modules
        )
    ) {

        return 0;

    }


    return course.modules.reduce(
        (total, module) => {

            if (
                !Array.isArray(
                    module?.lessons
                )
            ) {

                return total;

            }


            return (
                total +
                module.lessons.length
            );

        },
        0
    );

}


/* =========================================================
   GET COURSE LAB COUNT
========================================================= */

export function getCourseLabCount(courseId) {

    const course =
        getCourse(
            courseId
        );


    if (
        !course ||
        !Array.isArray(
            course.modules
        )
    ) {

        return 0;

    }


    return course.modules.reduce(
        (total, module) => {

            if (
                Array.isArray(
                    module?.labActivities
                )
            ) {

                return (
                    total +
                    module.labActivities.length
                );

            }


            return (
                total +
                Number(
                    module?.labs ||
                    0
                )
            );

        },
        0
    );

}


/* =========================================================
   GET COURSE ASSESSMENT COUNT
========================================================= */

export function getCourseAssessmentCount(courseId) {

    const course =
        getCourse(
            courseId
        );


    if (
        !course ||
        !Array.isArray(
            course.modules
        )
    ) {

        return 0;

    }


    return course.modules.reduce(
        (total, module) => {

            if (
                module?.moduleAssessment
            ) {

                return total + 1;

            }


            return (
                total +
                Number(
                    module?.assessments ||
                    0
                )
            );

        },
        0
    );

}


/* =========================================================
   GET COURSE SUMMARY
========================================================= */

export function getCourseSummary(courseId) {

    const course =
        getCourse(
            courseId
        );


    if (!course) {

        return null;

    }


    return {

        id:
            course.id,

        title:
            course.title,

        description:
            course.description ||
            "",

        level:
            course.level ||
            "",

        levelKey:
            course.levelKey ||
            "",

        status:
            course.status ||
            "planned",

        access:
            getCourseAccess(
                course.id
            ),

        isPro:
            isProCourse(
                course.id
            ),

        isLocked:
            isCourseLocked(
                course.id
            ),

        modules:
            getCourseModuleCount(
                course.id
            ),

        lessons:
            getCourseLessonCount(
                course.id
            ),

        labs:
            getCourseLabCount(
                course.id
            ),

        assessments:
            getCourseAssessmentCount(
                course.id
            ),

        certificateEligible:
            course.certificateEligible ===
                true

    };

}
