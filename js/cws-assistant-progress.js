/* =========================================================
   CWS ACADEMY
   ASSISTANT PROGRESS ENGINE
   File: js/cws-assistant-progress.js

   Reads the student's existing Firestore courseProgress
   records and determines the next incomplete course item.
========================================================= */

"use strict";


import {
    onAuthStateChanged
} from
"https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";


import {
    collection,
    getDocs
} from
"https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";


import {
    auth,
    db
} from "./firebase-config.js";


import {
    getCourses,
    getCourse
} from "../data/courses.js";


/* =========================================================
   HELPERS
========================================================= */

function normalizeArray(
    value
) {

    return Array.isArray(
        value
    )
        ? value
        : [];

}


function normalizeProgress(
    courseId,
    data = {}
) {

    return {

        courseId,

        completedLessons:
            normalizeArray(
                data.completedLessons
            ),

        completedLabs:
            normalizeArray(
                data.completedLabs
            ),

        completedAssessments:
            normalizeArray(
                data.completedAssessments
            ),

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
                data.progressPercent ||
                0
            ),

        started:
            Boolean(
                data.started
            ),

        completed:
            Boolean(
                data.completed
            ),

        certificateEligible:
            Boolean(
                data.certificateEligible
            ),

        finalAssessment:
            data.finalAssessment &&
            typeof data.finalAssessment ===
                "object"
                ? data.finalAssessment
                : {},

        updatedAt:
            data.updatedAt ||
            null

    };

}


function getTimestampMillis(
    value
) {

    if (!value) {
        return 0;
    }


    if (
        typeof value.toMillis ===
            "function"
    ) {

        return value.toMillis();

    }


    if (
        typeof value.seconds ===
            "number"
    ) {

        return (
            value.seconds *
            1000
        );

    }


    const date =
        new Date(
            value
        );


    return Number.isNaN(
        date.getTime()
    )
        ? 0
        : date.getTime();

}


function getModuleActivities(
    module
) {

    return [
        ...(
            Array.isArray(
                module?.labActivities
            )
                ? module.labActivities
                : []
        ),

        ...(
            Array.isArray(
                module?.practiceActivities
            )
                ? module.practiceActivities
                : []
        )
    ];

}


function getCourseIdFromPage() {

    return new URLSearchParams(
        window.location.search
    )
        .get(
            "course"
        ) ||
        "";

}


function courseIsAvailable(
    course
) {

    return (
        course &&
        String(
            course.status ||
            ""
        )
            .toLowerCase() ===
            "available" &&
        course.locked !==
            true
    );

}


function courseIsComplete(
    progress
) {

    return Boolean(
        progress?.completed ||
        progress?.certificateEligible
    );

}


/* =========================================================
   USER
========================================================= */

function waitForAuthenticatedUser() {

    if (
        auth?.currentUser
    ) {

        return Promise.resolve(
            auth.currentUser
        );

    }


    if (!auth) {

        return Promise.resolve(
            null
        );

    }


    return new Promise(
        resolve => {

            let settled =
                false;


            const finish =
                user => {

                    if (settled) {
                        return;
                    }


                    settled =
                        true;


                    resolve(
                        user ||
                        null
                    );

                };


            const unsubscribe =
                onAuthStateChanged(
                    auth,
                    user => {

                        unsubscribe();

                        finish(
                            user
                        );

                    }
                );


            window.setTimeout(
                () => {

                    try {
                        unsubscribe();
                    }
                    catch {
                        // No action required.
                    }


                    finish(
                        auth.currentUser
                    );

                },
                2500
            );

        }
    );

}


/* =========================================================
   FIRESTORE
========================================================= */

async function loadProgressMap(
    user
) {

    const map =
        new Map();


    if (
        !db ||
        !user
    ) {

        return map;

    }


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

            map.set(
                documentSnapshot.id,
                normalizeProgress(
                    documentSnapshot.id,
                    documentSnapshot.data()
                )
            );

        }
    );


    return map;

}


/* =========================================================
   COURSE SELECTION
========================================================= */

function chooseCourse(
    progressMap
) {

    const pageCourseId =
        getCourseIdFromPage();


    if (pageCourseId) {

        const pageCourse =
            getCourse(
                pageCourseId
            );


        const pageProgress =
            progressMap.get(
                pageCourseId
            ) ||
            null;


        if (
            courseIsAvailable(
                pageCourse
            ) &&
            !courseIsComplete(
                pageProgress
            )
        ) {

            return {
                course:
                    pageCourse,

                progress:
                    pageProgress
            };

        }

    }


    const started =
        [];


    progressMap.forEach(
        (
            progress,
            courseId
        ) => {

            const course =
                getCourse(
                    courseId
                );


            if (
                !courseIsAvailable(
                    course
                ) ||
                courseIsComplete(
                    progress
                )
            ) {

                return;

            }


            if (
                progress.started ||
                progress.progressPercent >
                    0 ||
                progress.completedLessons
                    .length ||
                progress.completedLabs
                    .length ||
                progress.completedAssessments
                    .length
            ) {

                started.push({
                    course,
                    progress
                });

            }

        }
    );


    started.sort(
        (
            a,
            b
        ) =>
            getTimestampMillis(
                b.progress.updatedAt
            ) -
            getTimestampMillis(
                a.progress.updatedAt
            )
    );


    if (
        started.length
    ) {

        return started[0];

    }


    const firstAvailable =
        getCourses()
            .find(
                course =>
                    courseIsAvailable(
                        course
                    ) &&
                    String(
                        course.access ||
                        "free"
                    )
                        .toLowerCase() !==
                        "pro"
            );


    if (!firstAvailable) {

        return {
            course:
                null,

            progress:
                null
        };

    }


    return {
        course:
            firstAvailable,

        progress:
            progressMap.get(
                firstAvailable.id
            ) ||
            normalizeProgress(
                firstAvailable.id
            )
    };

}


/* =========================================================
   NEXT INCOMPLETE REQUIREMENT
========================================================= */

function findNextRequirement(
    course,
    progress
) {

    if (
        !course ||
        !Array.isArray(
            course.modules
        )
    ) {

        return null;

    }


    const completedLessons =
        new Set(
            normalizeArray(
                progress
                    ?.completedLessons
            )
        );


    const completedLabs =
        new Set(
            normalizeArray(
                progress
                    ?.completedLabs
            )
        );


    const completedAssessments =
        new Set(
            normalizeArray(
                progress
                    ?.completedAssessments
            )
        );


    for (
        const module of
        course.modules
    ) {

        const lessons =
            Array.isArray(
                module.lessons
            )
                ? module.lessons
                : [];


        for (
            const lesson of
            lessons
        ) {

            const key =
                `${module.id}:${lesson.id}`;


            if (
                !completedLessons.has(
                    key
                )
            ) {

                return {
                    type:
                        "lesson",

                    course,

                    module,

                    lesson,

                    title:
                        lesson.title ||
                        "Next Lesson",

                    href:
                        `lesson.html?course=${encodeURIComponent(
                            course.id
                        )}&module=${encodeURIComponent(
                            module.id
                        )}&lesson=${encodeURIComponent(
                            lesson.id
                        )}`
                };

            }

        }


        if (
            course
                ?.completionRules
                ?.requireRequiredLabs
        ) {

            const activities =
                getModuleActivities(
                    module
                );


            for (
                const activity of
                activities
            ) {

                const key =
                    `${module.id}:${activity.id}`;


                if (
                    !completedLabs.has(
                        key
                    )
                ) {

                    return {
                        type:
                            "lab",

                        course,

                        module,

                        activity,

                        title:
                            activity.title ||
                            "Practical Activity",

                        href:
                            `lab-activity.html?course=${encodeURIComponent(
                                course.id
                            )}&module=${encodeURIComponent(
                                module.id
                            )}&activity=${encodeURIComponent(
                                activity.id
                            )}`
                    };

                }

            }

        }


        const moduleAssessment =
            module.moduleAssessment;


        if (
            course
                ?.completionRules
                ?.requireAllModuleAssessments !==
                false &&
            moduleAssessment &&
            Array.isArray(
                moduleAssessment.questions
            ) &&
            moduleAssessment.questions
                .length
        ) {

            const key =
                `${module.id}:assessment`;


            if (
                !completedAssessments.has(
                    key
                )
            ) {

                return {
                    type:
                        "module-assessment",

                    course,

                    module,

                    assessment:
                        moduleAssessment,

                    title:
                        moduleAssessment.title ||
                        `${module.title} Assessment`,

                    href:
                        `module-assessment.html?course=${encodeURIComponent(
                            course.id
                        )}&module=${encodeURIComponent(
                            module.id
                        )}`
                };

            }

        }

    }


    if (
        course.finalAssessment &&
        !progress
            ?.finalAssessment
            ?.passed
    ) {

        return {
            type:
                "final-assessment",

            course,

            assessment:
                course.finalAssessment,

            title:
                course.finalAssessment
                    .title ||
                "Final Assessment",

            href:
                `final-assessment.html?course=${encodeURIComponent(
                    course.id
                )}`
        };

    }


    if (
        progress?.certificateEligible ||
        progress?.completed
    ) {

        return {
            type:
                "certificate",

            course,

            title:
                `${course.title} Certificate`,

            href:
                `certificate.html?course=${encodeURIComponent(
                    course.id
                )}`
        };

    }


    return {
        type:
            "course",

        course,

        title:
            course.title,

        href:
            `course-details.html?course=${encodeURIComponent(
                course.id
            )}`
    };

}


/* =========================================================
   RESPONSE
========================================================= */

function describeRequirement(
    requirement,
    progress
) {

    const courseTitle =
        requirement.course
            ?.title ||
        "your course";


    const progressPercent =
        Math.max(
            0,
            Math.min(
                100,
                Math.round(
                    Number(
                        progress
                            ?.progressPercent ||
                        0
                    )
                )
            )
        );


    switch (
        requirement.type
    ) {

        case "lesson":

            return {
                answer:
                    `Your next saved step is “${requirement.title}” in ${courseTitle}${requirement.module?.title ? ` — ${requirement.module.title}` : ""}. Your recorded course progress is ${progressPercent}%. Complete this lesson before moving to the next required item.`,

                action: {
                    label:
                        "Continue Lesson",

                    studentPath:
                        requirement.href
                }
            };


        case "lab":

            return {
                answer:
                    `Your next required step in ${courseTitle} is the practical activity “${requirement.title}”${requirement.module?.title ? ` in ${requirement.module.title}` : ""}. Complete the authorized activity and mark it complete before continuing.`,

                action: {
                    label:
                        "Open Activity",

                    studentPath:
                        requirement.href
                }
            };


        case "module-assessment":

            return {
                answer:
                    `You have reached the next module assessment in ${courseTitle}: “${requirement.title}”. Complete it and meet the required pass mark before continuing to later course requirements.`,

                action: {
                    label:
                        "Start Assessment",

                    studentPath:
                        requirement.href
                }
            };


        case "final-assessment":

            return {
                answer:
                    `Your lessons, required practical work and module assessments are complete enough for the next step: the final assessment for ${courseTitle}. Pass it to complete the course pathway.`,

                action: {
                    label:
                        "Open Final Assessment",

                    studentPath:
                        requirement.href
                }
            };


        case "certificate":

            return {
                answer:
                    `You have completed ${courseTitle}. Your next step is to view your earned certificate, where you can verify it and download the PDF.`,

                action: {
                    label:
                        "View Certificate",

                    studentPath:
                        requirement.href
                }
            };


        default:

            return {
                answer:
                    `Continue ${courseTitle} from its course page.`,

                action: {
                    label:
                        "Open Course",

                    studentPath:
                        requirement.href
                }
            };

    }

}


/* =========================================================
   PUBLIC API
========================================================= */

export async function getPersonalizedNextStep() {

    if (
        !window.location.pathname
            .toLowerCase()
            .includes(
                "/student/"
            )
    ) {

        return null;

    }


    try {

        const user =
            await waitForAuthenticatedUser();


        if (!user) {

            return {
                answer:
                    "Sign in to CWS Academy so I can read your saved course progress and identify your exact next step.",

                action: {
                    label:
                        "Sign In",

                    studentPath:
                        "../pages/login.html"
                }
            };

        }


        const progressMap =
            await loadProgressMap(
                user
            );


        const {
            course,
            progress
        } =
            chooseCourse(
                progressMap
            );


        if (!course) {

            return {
                answer:
                    "I could not find an available course to continue. Open My Courses to choose a learning path.",

                action: {
                    label:
                        "Open My Courses",

                    studentPath:
                        "student-courses.html"
                }
            };

        }


        const requirement =
            findNextRequirement(
                course,
                progress
            );


        if (!requirement) {

            return {
                answer:
                    `I found ${course.title}, but I could not determine the next course requirement from its current registry data.`,

                action: {
                    label:
                        "Open Course",

                    studentPath:
                        `course-details.html?course=${encodeURIComponent(
                            course.id
                        )}`
                }
            };

        }


        return describeRequirement(
            requirement,
            progress
        );

    }
    catch (error) {

        console.error(
            "[CWS Assistant] Could not read saved progress:",
            error
        );


        return null;

    }

}
