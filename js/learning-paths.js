/* =========================================================
   CWS ACADEMY
   LEARNING PATHS
   File: js/learning-paths.js
========================================================= */

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

import {
    auth,
    db
} from "./firebase-config.js";

import {
    getCourse
} from "../data/courses.js";

import {
    getLearningPaths
} from "../data/learning-paths.js";

import {
    getUserEntitlement
} from "./access-control.js";


const pathsLoading =
    document.getElementById(
        "pathsLoading"
    );

const pathsContent =
    document.getElementById(
        "pathsContent"
    );

const learningPathsGrid =
    document.getElementById(
        "learningPathsGrid"
    );

const studentName =
    document.getElementById(
        "studentName"
    );

const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );


let currentUser = null;

let currentEntitlement = {
    plan: "free",
    status: "active"
};

let progressMap =
    new Map();

let capstoneProgressMap =
    new Map();


/* =========================================================
   HELPERS
========================================================= */

function normalize(value) {

    return String(
        value || ""
    )
        .trim()
        .toLowerCase();

}


function getUserName(user) {

    if (!user) {
        return "Student";
    }


    if (
        typeof user.displayName === "string" &&
        user.displayName.trim()
    ) {

        return user.displayName.trim();

    }


    if (
        typeof user.email === "string" &&
        user.email.includes("@")
    ) {

        return user.email
            .split("@")[0]
            .replace(/[._-]+/g, " ")
            .replace(
                /\b\w/g,
                character =>
                    character.toUpperCase()
            );

    }


    return "Student";

}


function hasActivePro() {

    return (
        normalize(
            currentEntitlement?.plan
        ) === "pro" &&
        [
            "active",
            "trialing"
        ].includes(
            normalize(
                currentEntitlement?.status
            )
        )
    );

}


function getProgress(courseId) {

    return (
        progressMap.get(
            courseId
        ) ||
        {}
    );

}


function getCourseRequirements(course) {

    const lessonKeys = [];
    const labKeys = [];
    const assessmentKeys = [];


    (
        course?.modules ||
        []
    ).forEach(module => {

        (
            module?.lessons ||
            []
        ).forEach(lesson => {

            lessonKeys.push(
                `${module.id}:${lesson.id}`
            );

        });


        if (
            course?.completionRules
                ?.requireRequiredLabs
        ) {

            [
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
            ].forEach(activity => {

                if (activity?.id) {

                    labKeys.push(
                        `${module.id}:${activity.id}`
                    );

                }

            });

        }


        if (
            course?.completionRules
                ?.requireAllModuleAssessments !== false &&
            module?.moduleAssessment
        ) {

            assessmentKeys.push(
                `${module.id}:${module.moduleAssessment.id}`
            );

        }

    });


    return {
        lessonKeys,
        labKeys,
        assessmentKeys,
        finalRequired:
            Boolean(
                course?.finalAssessment
            )
    };

}


function includesCompletion(
    completed,
    key
) {

    if (
        !Array.isArray(
            completed
        )
    ) {
        return false;
    }


    if (
        completed.includes(
            key
        )
    ) {
        return true;
    }


    const shortId =
        String(key)
            .split(":")
            .pop();


    return completed.includes(
        shortId
    );

}


function calculateCourseProgress(
    course
) {

    if (!course) {
        return 0;
    }


    const progress =
        getProgress(
            course.id
        );


    if (
        progress.completed === true ||
        progress.certificateEligible === true
    ) {
        return 100;
    }


    const requirements =
        getCourseRequirements(
            course
        );


    const total =
        requirements.lessonKeys.length +
        requirements.labKeys.length +
        requirements.assessmentKeys.length +
        (
            requirements.finalRequired
                ? 1
                : 0
        );


    if (!total) {

        return Math.min(
            100,
            Math.max(
                0,
                Number(
                    progress.progressPercent ||
                    0
                )
            )
        );

    }


    const lessons =
        requirements.lessonKeys.filter(
            key =>
                includesCompletion(
                    progress.completedLessons,
                    key
                )
        ).length;


    const labs =
        requirements.labKeys.filter(
            key =>
                includesCompletion(
                    progress.completedLabs,
                    key
                )
        ).length;


    const assessments =
        requirements.assessmentKeys.filter(
            key =>
                includesCompletion(
                    progress.completedAssessments,
                    key
                )
        ).length;


    const final =
        (
            requirements.finalRequired &&
            progress.finalAssessment?.passed
        )
            ? 1
            : 0;


    return Math.min(
        100,
        Math.round(
            (
                lessons +
                labs +
                assessments +
                final
            ) /
            total *
            100
        )
    );

}


/* =========================================================
   PRECISE NEXT COURSE STEP
========================================================= */

function getNextCourseStep(
    course
) {

    if (!course) {
        return null;
    }


    const progress =
        getProgress(
            course.id
        );


    for (
        const module of
        course.modules || []
    ) {

        for (
            const lesson of
            module.lessons || []
        ) {

            const key =
                `${module.id}:${lesson.id}`;


            if (
                !includesCompletion(
                    progress.completedLessons,
                    key
                )
            ) {

                const params =
                    new URLSearchParams({
                        course:
                            course.id,
                        module:
                            module.id,
                        lesson:
                            lesson.id
                    });


                return {
                    type:
                        "lesson",

                    label:
                        `Continue: ${lesson.title}`,

                    url:
                        `lesson.html?${params.toString()}`
                };

            }

        }


        if (
            course?.completionRules
                ?.requireRequiredLabs
        ) {

            const activities = [
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


            for (
                const activity of
                activities
            ) {

                if (!activity?.id) {
                    continue;
                }


                const key =
                    `${module.id}:${activity.id}`;


                if (
                    !includesCompletion(
                        progress.completedLabs,
                        key
                    )
                ) {

                    const params =
                        new URLSearchParams({
                            course:
                                course.id,
                            module:
                                module.id,
                            lab:
                                activity.id
                        });


                    return {
                        type:
                            "lab",

                        label:
                            `Continue Lab: ${activity.title || "Practical Activity"}`,

                        url:
                            `lab-activity.html?${params.toString()}`
                    };

                }

            }

        }


        if (
            course?.completionRules
                ?.requireAllModuleAssessments !== false &&
            module?.moduleAssessment
        ) {

            const assessment =
                module.moduleAssessment;


            const key =
                `${module.id}:${assessment.id}`;


            if (
                !includesCompletion(
                    progress.completedAssessments,
                    key
                )
            ) {

                const params =
                    new URLSearchParams({
                        course:
                            course.id,
                        module:
                            module.id
                    });


                return {
                    type:
                        "assessment",

                    label:
                        `Take: ${assessment.title || "Module Assessment"}`,

                    url:
                        `module-assessment.html?${params.toString()}`
                };

            }

        }

    }


    if (
        course.finalAssessment &&
        !progress.finalAssessment?.passed
    ) {

        const params =
            new URLSearchParams({
                course:
                    course.id
            });


        return {
            type:
                "final-assessment",

            label:
                "Take Final Assessment",

            url:
                `final-assessment.html?${params.toString()}`
        };

    }


    return null;

}


/* =========================================================
   PATH STATE
========================================================= */

function getPathState(
    path
) {

    const courseStages =
        path.stages.filter(
            stage =>
                stage.type === "course"
        );


    const stageStates =
        path.stages.map(
            (
                stage,
                index
            ) => {

                if (
                    stage.type === "course"
                ) {

                    const course =
                        getCourse(
                            stage.courseId
                        );


                    const progress =
                        calculateCourseProgress(
                            course
                        );


                    return {
                        ...stage,
                        index,
                        course,
                        progress,
                        completed:
                            progress >= 100
                    };

                }


                if (
                    stage.type === "capstone"
                ) {

                    const capstoneProgress =
                        capstoneProgressMap.get(
                            stage.capstoneId ||
                            stage.id
                        ) ||
                        {};

                    return {
                        ...stage,
                        index,
                        progress:
                            Number(
                                capstoneProgress.score ||
                                0
                            ),
                        completed:
                            capstoneProgress.passed ===
                            true,
                        capstoneProgress
                    };

                }


                if (
                    stage.type === "credential"
                ) {

                    return {
                        ...stage,
                        index,
                        progress:
                            0,
                        completed:
                            false
                    };

                }


                return {
                    ...stage,
                    index,
                    progress:
                        0,
                    completed:
                        false
                };

            }
        );


    const courseProgressTotal =
        courseStages.reduce(
            (
                total,
                stage
            ) => {

                return (
                    total +
                    calculateCourseProgress(
                        getCourse(
                            stage.courseId
                        )
                    )
                );

            },
            0
        );


    const capstoneStages =
        stageStates.filter(
            stage =>
                stage.type === "capstone"
        );


    const capstoneProgressTotal =
        capstoneStages.reduce(
            (
                total,
                stage
            ) =>
                total +
                (
                    stage.completed
                        ? 100
                        : Math.min(
                            99,
                            Number(
                                stage.progress ||
                                0
                            )
                        )
                ),
            0
        );


    const measurableStages =
        courseStages.length +
        capstoneStages.length;


    const progressPercent =
        measurableStages
            ? Math.round(
                (
                    courseProgressTotal +
                    capstoneProgressTotal
                ) /
                measurableStages
            )
            : 0;


    const completedCourses =
        stageStates.filter(
            stage =>
                stage.type === "course" &&
                stage.completed
        ).length;


    const nextCourseStage =
        stageStates.find(
            stage =>
                stage.type === "course" &&
                !stage.completed
        ) ||
        null;


    let nextStep =
        null;


    if (
        nextCourseStage?.course
    ) {

        const proCourse =
            normalize(
                nextCourseStage.course.access
            ) === "pro";


        if (
            proCourse &&
            !hasActivePro()
        ) {

            const params =
                new URLSearchParams({
                    course:
                        nextCourseStage.course.id,
                    from:
                        "learning-paths"
                });


            nextStep = {
                type:
                    "upgrade",

                label:
                    "Unlock Next Stage with CWS Pro",

                url:
                    `subscription.html?${params.toString()}`
            };

        }
        else {

            nextStep =
                getNextCourseStep(
                    nextCourseStage.course
                ) ||
                {
                    type:
                        "course",

                    label:
                        `Open ${nextCourseStage.course.title}`,

                    url:
                        `course-details.html?course=${encodeURIComponent(
                            nextCourseStage.course.id
                        )}`
                };

        }

    }
    else {

        const capstoneStage =
            stageStates.find(
                stage =>
                    stage.type === "capstone"
            );


        if (
            capstoneStage?.capstoneId &&
            !capstoneStage.completed
        ) {

            nextStep = {
                type:
                    "capstone",

                label:
                    capstoneStage.capstoneProgress?.submitted
                        ? "Continue Capstone"
                        : "Start Capstone Penetration Test",

                url:
                    `capstone.html?capstone=${encodeURIComponent(
                        capstoneStage.capstoneId
                    )}`
            };

        }
        else if (
            capstoneStage?.completed
        ) {

            nextStep = {
                type:
                    "credential",

                label:
                    "Career Path Certificate Ready",

                url:
                    "certificates.html"
            };

        }

    }


    return {
        stageStates,
        progressPercent,
        completedCourses,
        totalCourses:
            courseStages.length,
        nextCourseStage,
        nextStep
    };

}


/* =========================================================
   RENDER
========================================================= */

function renderStage(
    stage,
    currentStage
) {

    const isCurrent =
        currentStage &&
        stage.index ===
        currentStage.index;


    const course =
        stage.course;


    const pro =
        stage.type === "course" &&
        normalize(
            course?.access
        ) === "pro";


    let className =
        "path-stage";


    if (stage.completed) {
        className += " completed";
    }


    if (isCurrent) {
        className += " current";
    }


    if (pro) {
        className += " pro";
    }


    if (
        stage.type === "capstone"
    ) {
        className += " capstone locked";
    }


    if (
        stage.type === "credential"
    ) {
        className += " credential locked";
    }


    let title =
        stage.title ||
        course?.title ||
        "Learning Stage";


    let description =
        stage.description ||
        (
            course
                ? `${course.level || "Course"} • ${course.category || "Cybersecurity"}`
                : ""
        );


    let status =
        "Locked";


    if (stage.completed) {

        status =
            "Completed";

    }
    else if (isCurrent) {

        status =
            pro &&
            !hasActivePro()
                ? "Pro Required"
                : `${stage.progress}% Complete`;

    }
    else if (
        stage.type === "capstone"
    ) {

        status =
            "Coming Soon";

    }
    else if (
        stage.type === "credential"
    ) {

        status =
            "Final Credential";

    }
    else if (
        pro
    ) {

        status =
            "CWS Pro";

    }


    const number =
        String(
            stage.index + 1
        ).padStart(
            2,
            "0"
        );


    return `
        <article class="${className}">

            <div class="path-stage-number">
                ${
                    stage.completed
                        ? '<i class="fa-solid fa-check"></i>'
                        : number
                }
            </div>

            <div>
                <h4>
                    ${title}
                </h4>

                <p>
                    ${description}
                </p>
            </div>

            <span class="path-stage-status">
                ${
                    pro
                        ? '<i class="fa-solid fa-crown"></i> '
                        : ""
                }
                ${status}
            </span>

        </article>
    `;

}


function renderPathCard(
    path
) {

    const state =
        getPathState(
            path
        );


    const card =
        document.createElement(
            "article"
        );


    card.className =
        "learning-path-card";


    const stages =
        state.stageStates
            .map(
                stage =>
                    renderStage(
                        stage,
                        state.nextCourseStage
                    )
            )
            .join(
                ""
            );


    const action =
        state.nextStep
            ? `
                <a
                    href="${state.nextStep.url}"
                    class="path-action ${
                        state.nextStep.type === "upgrade"
                            ? "pro"
                            : "primary"
                    }"
                >
                    ${
                        state.nextStep.type === "upgrade"
                            ? '<i class="fa-solid fa-crown"></i>'
                            : '<i class="fa-solid fa-arrow-right"></i>'
                    }

                    ${state.nextStep.label}
                </a>
              `
            : `
                <button
                    type="button"
                    class="path-action primary"
                    disabled
                >
                    <i class="fa-solid fa-flag-checkered"></i>
                    Capstone Coming Soon
                </button>
              `;


    card.innerHTML = `
        <div class="path-card-header">

            <div class="path-card-icon">
                <i class="${path.icon}"></i>
            </div>

            <div class="path-card-title">

                <span class="path-card-kicker">
                    ${path.category.toUpperCase()}
                </span>

                <h3>
                    ${path.title} Path
                </h3>

                <p>
                    ${path.description}
                </p>

            </div>

            <div class="path-progress-number">
                ${state.progressPercent}%

                <small>
                    PATH COMPLETE
                </small>
            </div>

        </div>


        <div class="path-progress-track">

            <div
                class="path-progress-fill"
                style="width:${state.progressPercent}%"
            ></div>

        </div>

        <div class="path-progress-copy">
            ${state.completedCourses} of ${state.totalCourses}
            course stages completed • Capstone follows the course pathway
        </div>


        <div class="path-stage-list">
            ${stages}
        </div>


        <div class="path-card-actions">

            ${action}

            <a
                href="progress.html"
                class="path-action"
            >
                <i class="fa-solid fa-chart-line"></i>
                View Progress
            </a>

        </div>
    `;


    return card;

}


function renderPaths() {

    if (!learningPathsGrid) {
        return;
    }


    learningPathsGrid.innerHTML =
        "";


    getLearningPaths()
        .forEach(
            path => {

                learningPathsGrid.appendChild(
                    renderPathCard(
                        path
                    )
                );

            }
        );


    if (pathsLoading) {
        pathsLoading.hidden = true;
    }


    if (pathsContent) {
        pathsContent.hidden = false;
    }

}


/* =========================================================
   FIRESTORE
========================================================= */

async function loadProgress(
    user
) {

    progressMap =
        new Map();


    if (
        !db ||
        !user
    ) {
        return;
    }


    const snapshot =
        await getDocs(
            collection(
                db,
                "users",
                user.uid,
                "courseProgress"
            )
        );


    snapshot.forEach(
        documentSnapshot => {

            progressMap.set(
                documentSnapshot.id,
                documentSnapshot.data() || {}
            );

        }
    );


    capstoneProgressMap =
        new Map();


    /*
       Capstone progress is a newer collection than courseProgress.
       If the deployed Firestore rules have not yet been updated,
       do not allow that permission error to break the entire
       Learning Paths page. The path will still render using
       course progress, while capstone status remains unavailable
       until the rules are updated.
    */

    try {

        const capstoneSnapshot =
            await getDocs(
                collection(
                    db,
                    "users",
                    user.uid,
                    "capstones"
                )
            );


        capstoneSnapshot.forEach(
            documentSnapshot => {

                capstoneProgressMap.set(
                    documentSnapshot.id,
                    documentSnapshot.data() || {}
                );

            }
        );

    }
    catch (err) {

        console.warn(
            "[CWS Paths] Capstone progress unavailable:",
            err
        );

    }

}


/* =========================================================
   LOGOUT
========================================================= */

logoutBtn?.addEventListener(
    "click",
    async () => {

        try {

            await signOut(
                auth
            );


            window.location.replace(
                "../pages/login.html"
            );

        }
        catch (err) {

            console.error(
                "[CWS Paths] Logout failed:",
                err
            );

        }

    }
);


/* =========================================================
   AUTH
========================================================= */

if (!auth) {

    window.location.replace(
        "../pages/login.html?redirect=learning-paths"
    );

}
else {

    onAuthStateChanged(
        auth,
        async user => {

            if (!user) {

                window.location.replace(
                    "../pages/login.html?redirect=learning-paths"
                );

                return;

            }


            currentUser =
                user;


            if (studentName) {

                studentName.textContent =
                    getUserName(
                        user
                    );

            }


            try {

                currentEntitlement =
                    await getUserEntitlement(
                        user
                    ) ||
                    {
                        plan:
                            "free",

                        status:
                            "active"
                    };


                await loadProgress(
                    user
                );


                renderPaths();

            }
            catch (err) {

                console.error(
                    "[CWS Paths] Unable to load learning paths:",
                    err
                );


                if (pathsLoading) {

                    pathsLoading.innerHTML =
                        '<i class="fa-solid fa-triangle-exclamation"></i> Learning paths could not be loaded.';

                }

            }

        }
    );

}
