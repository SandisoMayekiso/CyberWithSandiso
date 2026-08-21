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

const pathsEmpty =
    document.getElementById(
        "pathsEmpty"
    );

const resetPathsFilter =
    document.getElementById(
        "resetPathsFilter"
    );

const pathSpotlight =
    document.getElementById(
        "pathSpotlight"
    );

const availablePathsCount =
    document.getElementById(
        "availablePathsCount"
    );

const activePathsCount =
    document.getElementById(
        "activePathsCount"
    );

const completedPathsCount =
    document.getElementById(
        "completedPathsCount"
    );

const heroRecommendedPath =
    document.getElementById(
        "heroRecommendedPath"
    );

const heroRecommendedStep =
    document.getElementById(
        "heroRecommendedStep"
    );

const pathFilterButtons =
    document.querySelectorAll(
        "[data-path-filter]"
    );

const studentName =
    document.getElementById(
        "studentName"
    );

const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );


let currentEntitlement = {
    plan: "free",
    status: "active"
};

let progressMap =
    new Map();

let capstoneProgressMap =
    new Map();

let renderedPathStates = [];

let activePathFilter = "all";


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


function escapeHTML(value) {

    return String(
        value ?? ""
    )
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

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
                `${module.id}:assessment`
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
                            activity:
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
                `${module.id}:assessment`;


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
   PREMIUM PATH STATE

   Keeps stage access, completion and certificate readiness
   separate so the interface never labels a completed or
   available stage as locked.
========================================================= */

function getPremiumPathState(path) {

    const pathPlanned =
        normalize(path?.status) === "planned";

    let priorRequirementsComplete =
        !pathPlanned;

    let currentStageFound =
        false;

    const stageStates =
        (path?.stages || [])
            .map((stage, index) => {

                const required =
                    stage.required !== false;

                const base = {
                    ...stage,
                    index,
                    required,
                    unlocked:
                        priorRequirementsComplete,
                    current: false,
                    ready: false,
                    completed: false,
                    progress: 0,
                    statusKey: "locked",
                    lockedReason: "Complete the previous required stage"
                };

                if (stage.type === "course") {

                    const course =
                        getCourse(stage.courseId);

                    const progress =
                        calculateCourseProgress(course);

                    const completed =
                        progress >= 100;

                    const pro =
                        normalize(course?.access) === "pro";

                    const courseAvailable =
                        normalize(course?.status) === "available";

                    let statusKey =
                        completed
                            ? "completed"
                            : pathPlanned || !courseAvailable
                                ? "planned"
                                : !priorRequirementsComplete
                                    ? "locked"
                                    : pro && !hasActivePro()
                                        ? "pro-locked"
                                        : progress > 0
                                            ? "in-progress"
                                            : "available";

                    const current =
                        !currentStageFound &&
                        required &&
                        !completed &&
                        !pathPlanned;

                    if (current) {
                        currentStageFound = true;
                    }

                    const state = {
                        ...base,
                        course,
                        pro,
                        progress,
                        completed,
                        current,
                        statusKey,
                        lockedReason:
                            pathPlanned || !courseAvailable
                                ? "This stage is planned"
                                : !priorRequirementsComplete
                                    ? "Complete the previous required stage"
                                    : pro && !hasActivePro()
                                        ? "CWS Pro is required"
                                        : ""
                    };

                    if (required && !completed) {
                        priorRequirementsComplete = false;
                    }

                    return state;

                }

                if (stage.type === "capstone") {

                    const capstoneProgress =
                        capstoneProgressMap.get(
                            stage.capstoneId || stage.id
                        ) || {};

                    const completed =
                        capstoneProgress.passed === true;

                    const capstonePlanned =
                        pathPlanned ||
                        normalize(stage.status) === "planned" ||
                        !stage.capstoneId;

                    const current =
                        !currentStageFound &&
                        required &&
                        !completed &&
                        !pathPlanned;

                    if (current) {
                        currentStageFound = true;
                    }

                    const state = {
                        ...base,
                        capstoneProgress,
                        progress:
                            completed
                                ? 100
                                : Math.min(
                                    99,
                                    Number(capstoneProgress.score || 0)
                                ),
                        completed,
                        current,
                        statusKey:
                            completed
                                ? "completed"
                                : capstonePlanned
                                    ? "planned"
                                    : !priorRequirementsComplete
                                        ? "locked"
                                        : capstoneProgress.submitted
                                            ? "in-progress"
                                            : "available",
                        lockedReason:
                            capstonePlanned
                                ? "This capstone is planned"
                                : !priorRequirementsComplete
                                    ? "Complete all required courses first"
                                    : ""
                    };

                    if (required && !completed) {
                        priorRequirementsComplete = false;
                    }

                    return state;

                }

                if (stage.type === "credential") {

                    const ready =
                        priorRequirementsComplete &&
                        !pathPlanned;

                    return {
                        ...base,
                        unlocked: ready,
                        ready,
                        completed: ready,
                        progress:
                            ready ? 100 : 0,
                        current:
                            ready &&
                            !currentStageFound,
                        statusKey:
                            ready
                                ? "ready"
                                : pathPlanned
                                    ? "planned"
                                    : "locked",
                        lockedReason:
                            ready
                                ? ""
                                : "Complete every required stage first"
                    };

                }

                return base;

            });

    const measurableStages =
        stageStates.filter(stage =>
            ["course", "capstone"].includes(stage.type) &&
            stage.required
        );

    const totalProgress =
        measurableStages.reduce(
            (total, stage) =>
                total + Number(stage.progress || 0),
            0
        );

    const progressPercent =
        measurableStages.length
            ? Math.min(
                100,
                Math.round(
                    totalProgress /
                    measurableStages.length
                )
            )
            : 0;

    const completedCourses =
        stageStates.filter(stage =>
            stage.type === "course" &&
            stage.required &&
            stage.completed
        ).length;

    const totalCourses =
        stageStates.filter(stage =>
            stage.type === "course" &&
            stage.required
        ).length;

    const pathCompleted =
        measurableStages.length > 0 &&
        measurableStages.every(stage =>
            stage.completed
        );

    const pathStarted =
        measurableStages.some(stage =>
            stage.progress > 0 ||
            stage.capstoneProgress?.submitted === true
        );

    const nextStage =
        pathPlanned
            ? null
            : stageStates.find(stage =>
                stage.required &&
                ["course", "capstone"].includes(stage.type) &&
                !stage.completed
            ) ||
            stageStates.find(stage =>
                stage.type === "credential" &&
                stage.ready
            ) ||
            null;

    let nextStep = null;

    if (pathPlanned) {

        nextStep = {
            type: "planned",
            label: "Path in Development",
            url: ""
        };

    }
    else if (nextStage?.type === "course") {

        const course =
            nextStage.course;

        if (
            normalize(course?.status) !== "available"
        ) {

            nextStep = {
                type: "planned",
                label: "Next Course Coming Soon",
                url: ""
            };

        }
        else if (
            nextStage.pro &&
            !hasActivePro()
        ) {

            const params =
                new URLSearchParams({
                    course: course.id,
                    from: "learning-paths"
                });

            nextStep = {
                type: "upgrade",
                label: "Unlock Next Stage with CWS Pro",
                url: `subscription.html?${params.toString()}`
            };

        }
        else if (nextStage.progress > 0) {

            nextStep =
                getNextCourseStep(course) || {
                    type: "course",
                    label: `Review ${course.title}`,
                    url: `course-details.html?course=${encodeURIComponent(course.id)}`
                };

        }
        else {

            nextStep = {
                type: "course",
                label: `Start ${course.title}`,
                url: `course-details.html?course=${encodeURIComponent(course.id)}`
            };

        }

    }
    else if (
        nextStage?.type === "capstone" &&
        nextStage.capstoneId
    ) {

        nextStep = {
            type: "capstone",
            label:
                nextStage.capstoneProgress?.submitted
                    ? "Continue Capstone"
                    : "Start Capstone Penetration Test",
            url: `capstone.html?capstone=${encodeURIComponent(nextStage.capstoneId)}`
        };

    }
    else if (
        nextStage?.type === "credential" &&
        nextStage.ready
    ) {

        nextStep = {
            type: "credential",
            label: "View Career Path Certificate",
            url: `career-path-certificate.html?path=${encodeURIComponent(path.id)}`
        };

    }

    const status =
        pathPlanned
            ? "planned"
            : pathCompleted
                ? "completed"
                : pathStarted
                    ? "in-progress"
                    : "available";

    return {
        path,
        stageStates,
        measurableStages,
        progressPercent,
        completedCourses,
        totalCourses,
        pathCompleted,
        pathStarted,
        pathPlanned,
        status,
        nextStage,
        nextStep
    };

}


/* =========================================================
   RENDER
========================================================= */

function renderStage(
    stage
) {

    const course =
        stage.course;

    const title =
        stage.title ||
        course?.title ||
        "Learning Stage";

    const description =
        stage.description ||
        (
            course
                ? `${course.level || "Course"} â€¢ ${course.category || "Cybersecurity"}`
                : ""
        );

    const number =
        String(
            stage.index + 1
        ).padStart(
            2,
            "0"
        );

    const statusMap = {
        completed: {
            label: "Completed",
            icon: "fa-solid fa-check"
        },
        ready: {
            label: "Certificate Ready",
            icon: "fa-solid fa-award"
        },
        "in-progress": {
            label: `${stage.progress}% Complete`,
            icon: "fa-solid fa-person-running"
        },
        available: {
            label: stage.current ? "Next Stage" : "Available",
            icon: "fa-solid fa-unlock"
        },
        "pro-locked": {
            label: "CWS Pro",
            icon: "fa-solid fa-crown"
        },
        planned: {
            label: "Planned",
            icon: "fa-regular fa-clock"
        },
        locked: {
            label: "Locked",
            icon: "fa-solid fa-lock"
        }
    };

    const status =
        statusMap[stage.statusKey] ||
        statusMap.locked;

    const typeIcon =
        stage.completed
            ? "fa-solid fa-check"
            : stage.type === "capstone"
                ? "fa-solid fa-flag-checkered"
                : stage.type === "credential"
                    ? "fa-solid fa-certificate"
                    : "";

    const className = [
        "path-stage",
        `status-${stage.statusKey}`,
        stage.type,
        stage.current ? "current" : "",
        stage.completed ? "completed" : "",
        stage.pro ? "pro" : "",
        stage.required ? "required" : "optional"
    ]
        .filter(Boolean)
        .join(" ");


    return `
        <article
            class="${className}"
            ${stage.current ? 'aria-current="step"' : ""}
        >

            <div class="path-stage-number">
                ${
                    typeIcon
                        ? `<i class="${typeIcon}"></i>`
                        : number
                }
            </div>

            <div class="path-stage-copy">
                <h4>
                    ${escapeHTML(title)}

                    ${
                        stage.required
                            ? ""
                            : '<span class="path-optional-badge">Optional</span>'
                    }
                </h4>

                <p>
                    ${escapeHTML(description)}
                </p>

                ${
                    stage.lockedReason
                        ? `
                            <small class="path-stage-reason">
                                <i class="fa-solid fa-circle-info"></i>
                                ${escapeHTML(stage.lockedReason)}
                            </small>
                          `
                        : ""
                }

                ${
                    stage.statusKey === "in-progress"
                        ? `
                            <div
                                class="path-stage-mini-track"
                                role="progressbar"
                                aria-label="${escapeHTML(title)} progress"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                aria-valuenow="${stage.progress}"
                            >
                                <span style="width:${stage.progress}%"></span>
                            </div>
                          `
                        : ""
                }
            </div>

            <span class="path-stage-status">
                <i class="${status.icon}"></i>
                ${escapeHTML(status.label)}
            </span>

        </article>
    `;

}


function renderPathCard(
    state,
    recommendedPathId
) {

    const path =
        state.path;


    const card =
        document.createElement(
            "article"
        );


    card.className = [
        "learning-path-card",
        `path-${state.status}`,
        path.id === recommendedPathId
            ? "recommended"
            : ""
    ]
        .filter(Boolean)
        .join(" ");

    card.dataset.pathId =
        path.id;

    card.dataset.pathStatus =
        state.status;

    card.dataset.pathOrder =
        String(
            path.displayOrder ||
            path.order ||
            ""
        ).padStart(2, "0");


    const stages =
        state.stageStates
            .map(
                stage =>
                    renderStage(stage)
            )
            .join(
                ""
            );


    const actionIcon = {
        upgrade: "fa-solid fa-crown",
        capstone: "fa-solid fa-flag-checkered",
        credential: "fa-solid fa-award",
        course: "fa-solid fa-arrow-right",
        lesson: "fa-solid fa-play",
        lab: "fa-solid fa-flask",
        assessment: "fa-solid fa-clipboard-check",
        "final-assessment": "fa-solid fa-bullseye"
    };

    const action =
        state.nextStep?.url
            ? `
                <a
                    href="${escapeHTML(state.nextStep.url)}"
                    class="path-action ${
                        state.nextStep.type === "upgrade"
                            ? "pro"
                            : "primary"
                    }"
                >
                    <i class="${actionIcon[state.nextStep.type] || "fa-solid fa-arrow-right"}"></i>
                    ${escapeHTML(state.nextStep.label)}
                </a>
              `
            : `
                <button
                    type="button"
                    class="path-action primary"
                    disabled
                >
                    <i class="fa-regular fa-clock"></i>
                    ${escapeHTML(state.nextStep?.label || "Path Not Yet Available")}
                </button>
              `;

    const completedStages =
        state.measurableStages.filter(
            stage => stage.completed
        ).length;

    const totalStages =
        state.measurableStages.length;

    const hasCapstone =
        state.stageStates.some(
            stage => stage.type === "capstone"
        );

    const hasCredential =
        state.stageStates.some(
            stage => stage.type === "credential"
        ) ||
        Boolean(path.credentialTitle);

    const statusLabels = {
        available: "Available",
        "in-progress": "In Progress",
        completed: "Completed",
        planned: "Planned"
    };

    const roadmapId =
        `path-roadmap-${path.id}`;

    const roadmapExpanded =
        !state.pathPlanned;


    card.innerHTML = `
        <div class="path-card-topline">

            <div class="path-card-kicker-row">
                <span class="path-card-kicker">
                    ${escapeHTML(String(path.category || "Career Path").toUpperCase())}
                </span>
                <span class="path-availability-badge ${state.status}">
                    ${
                        state.status === "completed"
                            ? '<i class="fa-solid fa-circle-check"></i>'
                            : state.status === "planned"
                                ? '<i class="fa-regular fa-clock"></i>'
                                : state.status === "in-progress"
                                    ? '<i class="fa-solid fa-person-running"></i>'
                                    : '<i class="fa-solid fa-unlock"></i>'
                    }
                    ${statusLabels[state.status]}
                </span>
                ${
                    path.id === recommendedPathId
                        ? `
                            <span class="path-recommended-badge">
                                <i class="fa-solid fa-star"></i>
                                Recommended
                            </span>
                          `
                        : ""
                }
            </div>

        </div>


        <div class="path-card-header">

            <div class="path-card-icon">
                <i class="${escapeHTML(path.icon || "fa-solid fa-route")}"></i>
            </div>

            <div class="path-card-title">

                <h3>
                    ${escapeHTML(path.title)} Path
                </h3>

                <p>
                    ${escapeHTML(path.description)}
                </p>

            </div>

            <div
                class="path-progress-ring"
                style="--path-progress:${state.progressPercent};"
                role="progressbar"
                aria-label="${escapeHTML(path.title)} path progress"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow="${state.progressPercent}"
            >
                <div>
                    <strong>${state.progressPercent}%</strong>
                    <small>COMPLETE</small>
                </div>
            </div>

        </div>


        <div class="path-card-meta">
            <span>
                <i class="fa-solid fa-signal"></i>
                ${escapeHTML(path.level || "All levels")}
            </span>
            <span>
                <i class="fa-regular fa-clock"></i>
                ${escapeHTML(path.estimatedTime || "Self-paced")}
            </span>
            <span>
                <i class="fa-solid fa-book-open"></i>
                ${state.totalCourses} required course${state.totalCourses === 1 ? "" : "s"}
            </span>
            ${
                hasCapstone
                    ? '<span><i class="fa-solid fa-flag-checkered"></i> Capstone</span>'
                    : ""
            }
            ${
                hasCredential
                    ? '<span><i class="fa-solid fa-certificate"></i> Certificate</span>'
                    : ""
            }
        </div>


        <div class="path-progress-track">

            <div
                class="path-progress-fill"
                style="width:${state.progressPercent}%"
            ></div>

        </div>

        <div class="path-progress-copy">
            <span>
                ${completedStages} of ${totalStages}
                required milestones completed
            </span>
            <strong>
                ${escapeHTML(
                    state.nextStep?.label ||
                    (state.pathCompleted ? "Path requirements complete" : "Path in development")
                )}
            </strong>
        </div>


        <button
            type="button"
            class="path-roadmap-toggle"
            aria-expanded="${roadmapExpanded}"
            aria-controls="${roadmapId}"
        >
            <span>
                <i class="fa-solid fa-list-check"></i>
                Path Roadmap
            </span>
            <span class="path-roadmap-toggle-copy">
                ${state.stageStates.length} stages
                <i class="fa-solid fa-chevron-down"></i>
            </span>
        </button>


        <div
            id="${roadmapId}"
            class="path-stage-list"
            ${roadmapExpanded ? "" : "hidden"}
        >
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


function getRecommendedPathState() {

    const statusPriority = {
        "in-progress": 1,
        available: 2,
        completed: 3,
        planned: 4
    };

    return [...renderedPathStates]
        .sort((stateA, stateB) => {

            const statusDifference =
                statusPriority[stateA.status] -
                statusPriority[stateB.status];

            if (statusDifference) {
                return statusDifference;
            }

            if (
                stateA.status === "in-progress" &&
                stateA.progressPercent !== stateB.progressPercent
            ) {
                return (
                    stateB.progressPercent -
                    stateA.progressPercent
                );
            }

            return (
                Number(
                    stateA.path.displayOrder ||
                    stateA.path.order ||
                    999
                ) -
                Number(
                    stateB.path.displayOrder ||
                    stateB.path.order ||
                    999
                )
            );

        })[0] || null;

}


function renderPathSummary() {

    const available =
        renderedPathStates.filter(state =>
            state.status !== "planned"
        ).length;

    const active =
        renderedPathStates.filter(state =>
            state.status === "in-progress"
        ).length;

    const completed =
        renderedPathStates.filter(state =>
            state.status === "completed"
        ).length;

    if (availablePathsCount) {
        availablePathsCount.textContent =
            String(available);
    }

    if (activePathsCount) {
        activePathsCount.textContent =
            String(active);
    }

    if (completedPathsCount) {
        completedPathsCount.textContent =
            String(completed);
    }

}


function renderPathSpotlight(
    state
) {

    if (!state) {
        return;
    }

    const path =
        state.path;

    const nextLabel =
        state.nextStep?.label ||
        (
            state.pathCompleted
                ? "Path requirements complete"
                : "Path in development"
        );

    if (heroRecommendedPath) {
        heroRecommendedPath.textContent =
            path.title;
    }

    if (heroRecommendedStep) {
        heroRecommendedStep.textContent =
            nextLabel;
    }

    if (!pathSpotlight) {
        return;
    }

    const action =
        state.nextStep?.url
            ? `
                <a
                    href="${escapeHTML(state.nextStep.url)}"
                    class="path-action ${state.nextStep.type === "upgrade" ? "pro" : "primary"}"
                >
                    ${
                        state.nextStep.type === "upgrade"
                            ? '<i class="fa-solid fa-crown"></i>'
                            : state.nextStep.type === "credential"
                                ? '<i class="fa-solid fa-award"></i>'
                                : '<i class="fa-solid fa-arrow-right"></i>'
                    }
                    ${escapeHTML(nextLabel)}
                </a>
              `
            : `
                <button type="button" class="path-action" disabled>
                    <i class="fa-regular fa-clock"></i>
                    ${escapeHTML(nextLabel)}
                </button>
              `;

    pathSpotlight.innerHTML = `
        <div class="path-spotlight-icon">
            <i class="${escapeHTML(path.icon || "fa-solid fa-route")}"></i>
        </div>

        <div class="path-spotlight-copy">
            <span class="paths-overview-label">
                ${state.status === "in-progress" ? "CONTINUE YOUR ACTIVE PATH" : "RECOMMENDED NEXT PATH"}
            </span>
            <h2>${escapeHTML(path.title)}</h2>
            <p>${escapeHTML(path.description)}</p>
            <div class="path-spotlight-progress">
                <div
                    role="progressbar"
                    aria-label="${escapeHTML(path.title)} progress"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow="${state.progressPercent}"
                >
                    <span style="width:${state.progressPercent}%"></span>
                </div>
                <strong>${state.progressPercent}%</strong>
            </div>
        </div>

        <div class="path-spotlight-action">
            <small>Next best action</small>
            <strong>${escapeHTML(nextLabel)}</strong>
            ${action}
        </div>
    `;

}


function pathMatchesFilter(
    state,
    filter
) {

    if (filter === "all") {
        return true;
    }

    return state.status === filter;

}


function applyPathFilter(
    filter = "all"
) {

    if (!learningPathsGrid) {
        return;
    }

    activePathFilter =
        [
            "all",
            "available",
            "in-progress",
            "completed",
            "planned"
        ].includes(filter)
            ? filter
            : "all";

    const recommended =
        getRecommendedPathState();

    const filteredStates =
        renderedPathStates.filter(state =>
            pathMatchesFilter(
                state,
                activePathFilter
            )
        );

    learningPathsGrid.innerHTML = "";

    filteredStates.forEach(state => {
        learningPathsGrid.appendChild(
            renderPathCard(
                state,
                recommended?.path.id || ""
            )
        );
    });

    learningPathsGrid.hidden =
        filteredStates.length === 0;

    if (pathsEmpty) {
        pathsEmpty.hidden =
            filteredStates.length > 0;
    }

    pathFilterButtons.forEach(button => {

        const active =
            button.dataset.pathFilter ===
            activePathFilter;

        button.classList.toggle(
            "active",
            active
        );

        button.setAttribute(
            "aria-pressed",
            String(active)
        );

    });

}


function renderPaths() {

    if (!learningPathsGrid) {
        return;
    }


    renderedPathStates =
        getLearningPaths()
            .map(path =>
                getPremiumPathState(path)
            );

    const recommended =
        getRecommendedPathState();

    renderPathSummary();

    renderPathSpotlight(
        recommended
    );

    applyPathFilter(
        activePathFilter
    );


    if (pathsLoading) {
        pathsLoading.hidden = true;
    }


    if (pathsContent) {
        pathsContent.hidden = false;
    }

}


pathFilterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {
            applyPathFilter(
                button.dataset.pathFilter
            );
        }
    );

});


resetPathsFilter?.addEventListener(
    "click",
    () => applyPathFilter("all")
);


learningPathsGrid?.addEventListener(
    "click",
    event => {

        const toggle =
            event.target.closest(
                ".path-roadmap-toggle"
            );

        if (!toggle) {
            return;
        }

        const roadmapId =
            toggle.getAttribute(
                "aria-controls"
            );

        const roadmap =
            roadmapId
                ? document.getElementById(roadmapId)
                : null;

        if (!roadmap) {
            return;
        }

        const expanded =
            toggle.getAttribute(
                "aria-expanded"
            ) === "true";

        toggle.setAttribute(
            "aria-expanded",
            String(!expanded)
        );

        roadmap.hidden =
            expanded;

    }
);


/* =========================================================
   FIRESTORE
========================================================= */

async function loadProgress(
    user
) {

    progressMap =
        new Map();

    capstoneProgressMap =
        new Map();


    if (
        !db ||
        !user
    ) {
        return;
    }


    /*
       Both independent progress collections are requested
       together. This keeps the path page responsive without
       increasing the number of Firebase reads.
    */

    const [
        progressResult,
        capstoneResult
    ] = await Promise.allSettled([

        getDocs(
            collection(
                db,
                "users",
                user.uid,
                "courseProgress"
            )
        ),

        getDocs(
            collection(
                db,
                "users",
                user.uid,
                "capstones"
            )
        )

    ]);


    if (
        progressResult.status ===
        "rejected"
    ) {
        throw progressResult.reason;
    }


    progressResult.value.forEach(
        documentSnapshot => {

            progressMap.set(
                documentSnapshot.id,
                documentSnapshot.data() || {}
            );

        }
    );


    /*
       Capstone progress is a newer collection than courseProgress.
       If the deployed Firestore rules have not yet been updated,
       do not allow that permission error to break the entire
       Learning Paths page. The path will still render using
       course progress, while capstone status remains unavailable
       until the rules are updated.
    */

    if (
        capstoneResult.status ===
        "fulfilled"
    ) {

        capstoneResult.value.forEach(
            documentSnapshot => {

                capstoneProgressMap.set(
                    documentSnapshot.id,
                    documentSnapshot.data() || {}
                );

            }
        );

    }
    else {

        console.warn(
            "[CWS Paths] Capstone progress unavailable:",
            capstoneResult.reason
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


            if (studentName) {

                studentName.textContent =
                    getUserName(
                        user
                    );

            }


            try {

                const [entitlement] =
                    await Promise.all([
                        getUserEntitlement(user),
                        loadProgress(user)
                    ]);


                currentEntitlement =
                    entitlement ||
                    {
                        plan:
                            "free",

                        status:
                            "active"
                    };


                renderPaths();

            }
            catch (err) {

                console.error(
                    "[CWS Paths] Unable to load learning paths:",
                    err
                );


                if (pathsLoading) {

                    pathsLoading.classList.add(
                        "paths-error"
                    );

                    pathsLoading.innerHTML =
                        '<i class="fa-solid fa-triangle-exclamation"></i> Learning paths could not be loaded.';

                }

            }

        }
    );

}
