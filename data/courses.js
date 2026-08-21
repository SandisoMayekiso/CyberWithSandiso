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
    windowsFundamentals
} from "./windows-fundamentals.js";


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

    [windowsFundamentals.id]:
        windowsFundamentals,

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
   COURSE STAGES
========================================================= */

export const courseStages = {

    foundation: {
        id: "foundation",
        label: "CWS Foundations",
        shortLabel: "Foundation",
        description: "Core cybersecurity, operating-system, networking and scripting foundations.",
        order: 1
    },

    pro: {
        id: "pro",
        label: "CWS Pro Specializations",
        shortLabel: "Pro",
        description: "Hands-on offensive-security and specialist training.",
        order: 2
    },

    professional: {
        id: "professional",
        label: "CWS Professional Capstone",
        shortLabel: "Professional",
        description: "Integrated multi-stage penetration-testing capstone work.",
        order: 3
    }

};


/* =========================================================
   COURSE PATH DEFINITIONS

   "required" prerequisites can be enforced by the student
   interface. "recommended" prerequisites should be shown as
   guidance but should not hard-lock experienced students.
========================================================= */

export const coursePath = {

    "cybersecurity-fundamentals": {
        stage: "foundation",
        order: 1,
        required: [],
        recommended: []
    },

    "networking-fundamentals": {
        stage: "foundation",
        order: 2,
        required: [
            "cybersecurity-fundamentals"
        ],
        recommended: []
    },

    "linux-fundamentals": {
        stage: "foundation",
        order: 3,
        required: [
            "cybersecurity-fundamentals"
        ],
        recommended: [
            "networking-fundamentals"
        ]
    },

    "windows-fundamentals": {
        stage: "foundation",
        order: 4,
        required: [
            "cybersecurity-fundamentals"
        ],
        recommended: [
            "networking-fundamentals"
        ]
    },

    "bash-linux-automation": {
        stage: "foundation",
        order: 5,
        required: [
            "linux-fundamentals"
        ],
        recommended: [
            "networking-fundamentals"
        ]
    },

    "python-cybersecurity-fundamentals": {
        stage: "foundation",
        order: 6,
        required: [
            "cybersecurity-fundamentals"
        ],
        recommended: [
            "networking-fundamentals"
        ]
    },

    "active-directory-fundamentals": {
        stage: "foundation",
        order: 7,
        required: [
            "windows-fundamentals",
            "networking-fundamentals"
        ],
        recommended: [
            "cybersecurity-fundamentals"
        ]
    },

    "ethical-hacking": {
        stage: "pro",
        order: 1,
        required: [
            "cybersecurity-fundamentals",
            "networking-fundamentals",
            "linux-fundamentals"
        ],
        recommended: [
            "windows-fundamentals",
            "bash-linux-automation",
            "python-cybersecurity-fundamentals",
            "active-directory-fundamentals"
        ]
    },

    "web-application-security": {
        stage: "pro",
        order: 2,
        required: [
            "ethical-hacking",
            "networking-fundamentals"
        ],
        recommended: [
            "linux-fundamentals",
            "python-cybersecurity-fundamentals"
        ]
    },

    "linux-privilege-escalation": {
        stage: "pro",
        order: 3,
        required: [
            "ethical-hacking",
            "linux-fundamentals"
        ],
        recommended: [
            "bash-linux-automation"
        ]
    },

    "active-directory-security-pentesting": {
        stage: "pro",
        order: 4,
        required: [
            "active-directory-fundamentals",
            "ethical-hacking",
            "networking-fundamentals"
        ],
        recommended: [
            "windows-fundamentals",
            "practical-penetration-testing",
            "python-cybersecurity-fundamentals"
        ]
    },

    "python-offensive-security": {
        stage: "pro",
        order: 5,
        required: [
            "python-cybersecurity-fundamentals",
            "ethical-hacking"
        ],
        recommended: [
            "bash-linux-automation",
            "web-application-security"
        ]
    },

    "practical-penetration-testing": {
        stage: "professional",
        order: 1,
        required: [
            "ethical-hacking",
            "web-application-security",
            "linux-privilege-escalation"
        ],
        recommended: [
            "active-directory-security-pentesting",
            "python-offensive-security",
            "bash-linux-automation"
        ]
    }

};


/* =========================================================
   GET COURSE PATH INFO
========================================================= */

export function getCoursePathInfo(courseId) {

    const normalizedCourseId =
        normalizeId(
            courseId
        );


    if (!normalizedCourseId) {

        return null;

    }


    const pathInfo =
        coursePath[
            normalizedCourseId
        ];


    if (!pathInfo) {

        return null;

    }


    const stage =
        courseStages[
            pathInfo.stage
        ] ||
        null;


    return {

        courseId:
            normalizedCourseId,

        stage:
            pathInfo.stage,

        stageInfo:
            stage,

        order:
            Number(
                pathInfo.order ||
                0
            ),

        required:
            Array.isArray(
                pathInfo.required
            )
                ? [
                    ...pathInfo.required
                ]
                : [],

        recommended:
            Array.isArray(
                pathInfo.recommended
            )
                ? [
                    ...pathInfo.recommended
                ]
                : []

    };

}


/* =========================================================
   GET COURSE STAGE
========================================================= */

export function getCourseStage(courseId) {

    return (
        getCoursePathInfo(
            courseId
        )?.stage ||
        "foundation"
    );

}


/* =========================================================
   GET COURSE STAGE INFO
========================================================= */

export function getCourseStageInfo(courseId) {

    const stage =
        getCourseStage(
            courseId
        );


    return (
        courseStages[
            stage
        ] ||
        null
    );

}


/* =========================================================
   GET REQUIRED PREREQUISITES
========================================================= */

export function getRequiredPrerequisites(courseId) {

    return (
        getCoursePathInfo(
            courseId
        )?.required ||
        []
    );

}


/* =========================================================
   GET RECOMMENDED PREREQUISITES
========================================================= */

export function getRecommendedPrerequisites(courseId) {

    return (
        getCoursePathInfo(
            courseId
        )?.recommended ||
        []
    );

}


/* =========================================================
   GET COURSES BY STAGE
========================================================= */

export function getCoursesByStage(stageId) {

    const normalizedStageId =
        normalizeValue(
            stageId
        );


    if (
        !courseStages[
            normalizedStageId
        ]
    ) {

        return [];

    }


    return getCourses()
        .filter(
            course =>
                getCourseStage(
                    course.id
                ) ===
                normalizedStageId
        )
        .sort(
            (a, b) => {

                const pathA =
                    getCoursePathInfo(
                        a.id
                    );

                const pathB =
                    getCoursePathInfo(
                        b.id
                    );


                return (
                    Number(
                        pathA?.order ||
                        999
                    ) -
                    Number(
                        pathB?.order ||
                        999
                    )
                );

            }
        );

}


/* =========================================================
   GET FOUNDATION COURSES
========================================================= */

export function getFoundationCourses() {

    return getCoursesByStage(
        "foundation"
    );

}


/* =========================================================
   GET PRO SPECIALIZATION COURSES
========================================================= */

export function getProSpecializationCourses() {

    return getCoursesByStage(
        "pro"
    );

}


/* =========================================================
   GET PROFESSIONAL CAPSTONE COURSES
========================================================= */

export function getProfessionalCourses() {

    return getCoursesByStage(
        "professional"
    );

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


            const activityCount =
                labActivities +
                practiceActivities;


            if (activityCount > 0) {

                return (
                    total +
                    activityCount
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


    const moduleAssessments =
        course.modules.reduce(
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


    return (
        moduleAssessments +
        (course.finalAssessment ? 1 : 0)
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
                true,

        stage:
            getCourseStage(
                course.id
            ),

        stageInfo:
            getCourseStageInfo(
                course.id
            ),

        requiredPrerequisites:
            getRequiredPrerequisites(
                course.id
            ),

        recommendedPrerequisites:
            getRecommendedPrerequisites(
                course.id
            )

    };

}
