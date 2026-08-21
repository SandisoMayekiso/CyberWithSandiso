/* =========================================================
   CWS ACADEMY
   LESSON SYSTEM

   Generic Lesson Renderer
   Firebase Authentication
   Firestore Progress
   Dynamic Course Registry

   URL FORMAT

   lesson.html
       ?course=networking-fundamentals
       &module=module-01
       &lesson=lesson-01
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
    doc,
    getDoc,
    setDoc,
    serverTimestamp
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
    getCourse,
    getModule,
    getLesson
} from "../data/courses.js";


/* =========================================================
   VIDEO LESSON REGISTRY
========================================================= */

import {
    getVideoLesson
} from "../data/video-lessons.js";


/* =========================================================
   PREMIUM LESSON TOOLS
========================================================= */

import {
    initializeLessonTools
} from "./lesson-tools.js";


/* =========================================================
   ACCESS CONTROL
========================================================= */

import {
    getUserEntitlement,
    canAccessItem,
    getRequiredAccess,
    getAccessMessage,
    getUpgradeUrl
} from "./access-control.js";


/* =========================================================
   DEBUG
========================================================= */

const DEBUG = true;


function log(...args) {

    if (DEBUG) {

        console.log(
            "[CWS Lesson]",
            ...args
        );

    }

}


function warn(...args) {

    if (DEBUG) {

        console.warn(
            "[CWS Lesson]",
            ...args
        );

    }

}


function error(...args) {

    console.error(
        "[CWS Lesson]",
        ...args
    );

}


/* =========================================================
   ELEMENTS
========================================================= */

const lessonLoading =
    document.getElementById(
        "lessonLoading"
    );


const lessonNotFound =
    document.getElementById(
        "lessonNotFound"
    );


const lessonNotFoundMessage =
    document.getElementById(
        "lessonNotFoundMessage"
    );


const lessonContent =
    document.getElementById(
        "lessonContent"
    );


const studentName =
    document.getElementById(
        "studentName"
    );


const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );


const headerCourseTitle =
    document.getElementById(
        "headerCourseTitle"
    );


const lessonBrandLink =
    document.getElementById(
        "lessonBrandLink"
    );


const headerCourseCategory =
    document.getElementById(
        "headerCourseCategory"
    );


const courseBreadcrumbLink =
    document.getElementById(
        "courseBreadcrumbLink"
    );


const moduleBreadcrumb =
    document.getElementById(
        "moduleBreadcrumb"
    );


const lessonBreadcrumb =
    document.getElementById(
        "lessonBreadcrumb"
    );


const lessonModuleBadge =
    document.getElementById(
        "lessonModuleBadge"
    );


const lessonTypeBadge =
    document.getElementById(
        "lessonTypeBadge"
    );


const lessonCategory =
    document.getElementById(
        "lessonCategory"
    );


const lessonTitle =
    document.getElementById(
        "lessonTitle"
    );


const lessonSubtitle =
    document.getElementById(
        "lessonSubtitle"
    );


const lessonDuration =
    document.getElementById(
        "lessonDuration"
    );


const lessonDifficulty =
    document.getElementById(
        "lessonDifficulty"
    );


const lessonProgressMeta =
    document.getElementById(
        "lessonProgressMeta"
    );


const lessonHeroIcon =
    document.getElementById(
        "lessonHeroIcon"
    );


const courseProgressTitle =
    document.getElementById(
        "courseProgressTitle"
    );


const courseProgressPercent =
    document.getElementById(
        "courseProgressPercent"
    );


const courseProgressFill =
    document.getElementById(
        "courseProgressFill"
    );


const courseProgressText =
    document.getElementById(
        "courseProgressText"
    );


const sidebarModuleTitle =
    document.getElementById(
        "sidebarModuleTitle"
    );


const lessonSidebarList =
    document.getElementById(
        "lessonSidebarList"
    );


const lessonIntroduction =
    document.getElementById(
        "lessonIntroduction"
    );


const lessonObjectives =
    document.getElementById(
        "lessonObjectives"
    );


const lessonBody =
    document.getElementById(
        "lessonBody"
    );


const lessonKeyConcepts =
    document.getElementById(
        "lessonKeyConcepts"
    );


const lessonKeyConceptsSection =
    document.getElementById(
        "lessonKeyConceptsSection"
    );


const knowledgeCheck =
    document.getElementById(
        "knowledgeCheck"
    );


const knowledgeCheckForm =
    document.getElementById(
        "knowledgeCheckForm"
    );


const quizQuestions =
    document.getElementById(
        "quizQuestions"
    );


const quizResult =
    document.getElementById(
        "quizResult"
    );


const completeLessonBtn =
    document.getElementById(
        "completeLessonBtn"
    );


const lessonCompletion =
    document.getElementById(
        "lessonCompletion"
    );


const previousLessonBtn =
    document.getElementById(
        "previousLessonBtn"
    );


const nextLessonBtn =
    document.getElementById(
        "nextLessonBtn"
    );


const cwsVideoLesson =
    document.getElementById(
        "cwsVideoLesson"
    );


/* =========================================================
   STATE
========================================================= */

let currentUser = null;

let currentCourse = null;

let currentModule = null;

let currentLesson = null;

let currentProgress = null;

let currentEntitlement = null;

let lessonInitialized = false;


/* =========================================================
   URL PARAMETERS
========================================================= */

function getUrlParameters() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    return {

        courseId:
            String(
                params.get("course") || ""
            )
                .trim()
                .toLowerCase(),

        moduleId:
            String(
                params.get("module") || ""
            )
                .trim()
                .toLowerCase(),

        lessonId:
            String(
                params.get("lesson") || ""
            )
                .trim()
                .toLowerCase()

    };

}


/* =========================================================
   USER NAME
========================================================= */

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
   TEXT HELPER
========================================================= */

function setText(
    element,
    value
) {

    if (!element) {

        return;

    }


    element.textContent =
        value ?? "";

}


/* =========================================================
   PAGE STATES
========================================================= */

function showLoading() {

    if (lessonLoading) {

        lessonLoading.hidden =
            false;

    }


    if (lessonNotFound) {

        lessonNotFound.hidden =
            true;

    }


    if (lessonContent) {

        lessonContent.hidden =
            true;

    }

}


function showNotFound(message) {

    if (lessonLoading) {

        lessonLoading.hidden =
            true;

    }


    if (lessonContent) {

        lessonContent.hidden =
            true;

    }


    if (lessonNotFoundMessage) {

        lessonNotFoundMessage.textContent =
            message;

    }


    if (lessonNotFound) {

        lessonNotFound.hidden =
            false;

    }

}


function showContent() {

    if (lessonLoading) {

        lessonLoading.hidden =
            true;

    }


    if (lessonNotFound) {

        lessonNotFound.hidden =
            true;

    }


    if (lessonContent) {

        lessonContent.hidden =
            false;

    }

}


/* =========================================================
   LESSON KEY
========================================================= */

function buildLessonKey(
    moduleId,
    lessonId
) {

    return (
        `${moduleId}:${lessonId}`
    );

}


/* =========================================================
   GET ALL LESSONS
========================================================= */

function getAllLessons() {

    if (
        !currentCourse ||
        !Array.isArray(
            currentCourse.modules
        )
    ) {

        return [];

    }


    const lessons = [];


    currentCourse.modules.forEach(
        module => {

            if (
                !Array.isArray(
                    module.lessons
                )
            ) {

                return;

            }


            module.lessons.forEach(
                lesson => {

                    lessons.push({

                        moduleId:
                            module.id,

                        moduleNumber:
                            module.number,

                        moduleTitle:
                            module.title,

                        lessonId:
                            lesson.id,

                        lesson

                    });

                }
            );

        }
    );


    return lessons;

}


/* =========================================================
   TOTAL LESSONS
========================================================= */

function getTotalLessons() {

    return getAllLessons().length;

}


/* =========================================================
   CURRENT GLOBAL LESSON INDEX
========================================================= */

function getCurrentLessonIndex() {

    const lessons =
        getAllLessons();


    return lessons.findIndex(
        item =>
            item.moduleId ===
                currentModule?.id &&
            item.lessonId ===
                currentLesson?.id
    );

}


/* =========================================================
   PREVIOUS LESSON
========================================================= */

function getPreviousLesson() {

    const lessons =
        getAllLessons();


    const index =
        getCurrentLessonIndex();


    if (index <= 0) {

        return null;

    }


    return lessons[
        index - 1
    ] || null;

}


/* =========================================================
   NEXT LESSON
========================================================= */

function getNextLesson() {

    const lessons =
        getAllLessons();


    const index =
        getCurrentLessonIndex();


    if (
        index < 0 ||
        index >=
            lessons.length - 1
    ) {

        return null;

    }


    return lessons[
        index + 1
    ] || null;

}


/* =========================================================
   DEFAULT PROGRESS
========================================================= */

function getDefaultProgress() {

    return {

        courseId:
            currentCourse?.id || "",

        completedLessons:
            [],

        passedLessonQuizzes:
            {},

        completedLabs:
            [],

        completedAssessments:
            [],

        currentModule:
            currentModule?.id || "",

        currentLesson:
            currentLesson?.id || "",

        progressPercent:
            0,

        started:
            true,

        completed:
            false

    };

}


/* =========================================================
   NORMALIZE PROGRESS
========================================================= */

function normalizeProgress(
    progress = {}
) {

    const defaults =
        getDefaultProgress();


    return {

        ...defaults,

        ...progress,

        completedLessons:
            Array.isArray(
                progress.completedLessons
            )
                ? progress.completedLessons
                : [],

        passedLessonQuizzes:
            (
                progress.passedLessonQuizzes &&
                typeof progress.passedLessonQuizzes ===
                    "object"
            )
                ? progress.passedLessonQuizzes
                : {},

        completedLabs:
            Array.isArray(
                progress.completedLabs
            )
                ? progress.completedLabs
                : [],

        completedAssessments:
            Array.isArray(
                progress.completedAssessments
            )
                ? progress.completedAssessments
                : []

    };

}


/* =========================================================
   PROGRESS REFERENCE
========================================================= */

function getProgressRef() {

    if (
        !db ||
        !currentUser ||
        !currentCourse
    ) {

        return null;

    }


    return doc(

        db,

        "users",

        currentUser.uid,

        "courseProgress",

        currentCourse.id

    );

}


/* =========================================================
   LOAD PROGRESS
========================================================= */

async function loadProgress() {

    currentProgress =
        getDefaultProgress();


    if (!db) {

        warn(
            "Firestore unavailable."
        );


        updateCourseProgressUI();

        return;

    }


    try {

        const progressRef =
            getProgressRef();


        if (!progressRef) {

            updateCourseProgressUI();

            return;

        }


        const snapshot =
            await getDoc(
                progressRef
            );


        if (
            snapshot.exists()
        ) {

            currentProgress =
                normalizeProgress(
                    snapshot.data()
                );

        }


        /*
           We opened this lesson, so this becomes
           the current location in the course.
        */

        currentProgress.started =
            true;


        currentProgress.currentModule =
            currentModule.id;


        currentProgress.currentLesson =
            currentLesson.id;


        log(
            "Progress loaded:",
            currentProgress
        );


    } catch (err) {

        error(
            "Progress load failed:",
            err
        );


        currentProgress =
            getDefaultProgress();

    }


    updateCourseProgressUI();


    initializeLessonTools({
        userId:
            currentUser?.uid ||
            "guest",
        course:
            currentCourse,
        module:
            currentModule,
        lesson:
            currentLesson,
        contentRoot:
            lessonContent,
        onConfirmComplete:
            completeLesson
    });

}


/* =========================================================
   SAVE PROGRESS
========================================================= */

async function saveProgress() {

    if (
        !db ||
        !currentUser ||
        !currentCourse ||
        !currentProgress
    ) {

        return;

    }


    try {

        const progressRef =
            getProgressRef();


        if (!progressRef) {

            return;

        }


        await setDoc(

            progressRef,

            {

                ...currentProgress,

                updatedAt:
                    serverTimestamp()

            },

            {
                merge: true
            }

        );


        log(
            "Progress saved."
        );


    } catch (err) {

        error(
            "Progress save failed:",
            err
        );

    }

}


/* =========================================================
   COURSE PROGRESS REQUIREMENTS
========================================================= */

function getCourseProgressRequirements() {

    const requiredLessonKeys =
        [];

    const requiredActivityKeys =
        [];

    const requiredAssessmentKeys =
        [];


    const modules =
        Array.isArray(
            currentCourse?.modules
        )
            ? currentCourse.modules
            : [];


    modules.forEach(
        module => {

            const lessons =
                Array.isArray(
                    module.lessons
                )
                    ? module.lessons
                    : [];


            lessons.forEach(
                lesson => {

                    requiredLessonKeys.push(
                        `${module.id}:${lesson.id}`
                    );

                }
            );


            const activities = [
                ...(
                    Array.isArray(
                        module.labActivities
                    )
                        ? module.labActivities
                        : []
                ),
                ...(
                    Array.isArray(
                        module.practiceActivities
                    )
                        ? module.practiceActivities
                        : []
                )
            ];


            activities.forEach(
                activity => {

                    requiredActivityKeys.push(
                        `${module.id}:${activity.id}`
                    );

                }
            );


            if (
                module.moduleAssessment &&
                Array.isArray(
                    module.moduleAssessment.questions
                ) &&
                module.moduleAssessment.questions.length
            ) {

                requiredAssessmentKeys.push(
                    `${module.id}:assessment`
                );

            }

        }
    );


    return {

        requiredLessonKeys,

        requiredActivityKeys,

        requiredAssessmentKeys,

        finalRequired:
            Boolean(
                currentCourse?.finalAssessment
            )

    };

}


/* =========================================================
   CALCULATE COURSE PROGRESS
========================================================= */

function calculateCourseProgress() {

    const requirements =
        getCourseProgressRequirements();


    const requireLabs =
        Boolean(
            currentCourse
                ?.completionRules
                ?.requireRequiredLabs
        );


    const requireAssessments =
        currentCourse
            ?.completionRules
            ?.requireAllModuleAssessments !==
        false;


    const requiredActivities =
        requireLabs
            ? requirements.requiredActivityKeys
            : [];


    const requiredAssessments =
        requireAssessments
            ? requirements.requiredAssessmentKeys
            : [];


    const total =
        requirements.requiredLessonKeys.length +
        requiredActivities.length +
        requiredAssessments.length +
        (
            requirements.finalRequired
                ? 1
                : 0
        );


    if (!total) {

        return 0;

    }


    const completedLessonCount =
        requirements.requiredLessonKeys
            .filter(
                key =>
                    currentProgress
                        ?.completedLessons
                        ?.includes(key)
            )
            .length;


    const completedActivityCount =
        requiredActivities
            .filter(
                key =>
                    currentProgress
                        ?.completedLabs
                        ?.includes(key)
            )
            .length;


    const completedAssessmentCount =
        requiredAssessments
            .filter(
                key =>
                    currentProgress
                        ?.completedAssessments
                        ?.includes(key)
            )
            .length;


    const finalCount =
        (
            requirements.finalRequired &&
            currentProgress
                ?.finalAssessment
                ?.passed
        )
            ? 1
            : 0;


    return Math.round(
        (
            completedLessonCount +
            completedActivityCount +
            completedAssessmentCount +
            finalCount
        ) /
        total *
        100
    );

}


/* =========================================================
   UPDATE COURSE PROGRESS
========================================================= */

function updateCourseProgressUI() {

    if (
        !currentProgress ||
        !currentCourse
    ) {

        return;

    }


    const percent =
        calculateCourseProgress();


    currentProgress.progressPercent =
        percent;


    currentProgress.completed =
        percent === 100;


    setText(
        courseProgressPercent,
        `${percent}%`
    );


    if (courseProgressFill) {

        courseProgressFill.style.width =
            `${percent}%`;

    }


    const progressBar =
        document.querySelector(
            ".lesson-progress-bar"
        );


    if (progressBar) {

        progressBar.setAttribute(
            "aria-valuenow",
            String(percent)
        );

    }


    const completed =
        currentProgress
            .completedLessons
            .length;


    const total =
        getTotalLessons();


    if (
        !courseProgressText
    ) {

        return;

    }


    if (
        percent === 0
    ) {

        courseProgressText.textContent =

            `Start your first lesson to begin making progress through ${currentCourse.title}.`;

    }

    else if (
        percent < 100
    ) {

        courseProgressText.textContent =

            `${completed} of ${total} lessons completed. Course progress also includes required activities and assessments.`;

    }

    else {

        courseProgressText.textContent =

            currentProgress.completed
                ? `${currentCourse.title} completed. Congratulations!`
                : `All lessons are complete. Finish the remaining required activities and assessments to complete ${currentCourse.title}.`;

    }

}


/* =========================================================
   VIDEO LESSON SYSTEM
========================================================= */

let currentVideoPlayer = null;
let lastVideoSavedSecond = 0;


function normalizeAccessValue(value) {

    return String(
        value || ""
    )
        .trim()
        .toLowerCase();

}


function userHasActivePro() {

    return (
        normalizeAccessValue(
            currentEntitlement?.plan
        ) === "pro" &&
        [
            "active",
            "trialing"
        ].includes(
            normalizeAccessValue(
                currentEntitlement?.status
            )
        )
    );

}


function getCurrentVideoConfig() {

    if (
        !currentCourse ||
        !currentModule ||
        !currentLesson
    ) {

        return null;

    }


    return getVideoLesson(
        currentCourse.id,
        currentModule.id,
        currentLesson.id
    );

}


function getVideoProgressRef(videoConfig) {

    if (
        !db ||
        !currentUser ||
        !videoConfig
    ) {

        return null;

    }


    return doc(
        db,
        "users",
        currentUser.uid,
        "videoProgress",
        videoConfig.id
    );

}


async function loadVideoProgress(videoConfig) {

    const ref =
        getVideoProgressRef(
            videoConfig
        );


    if (!ref) {

        return null;

    }


    try {

        const snapshot =
            await getDoc(
                ref
            );


        return snapshot.exists()
            ? snapshot.data()
            : null;

    }
    catch (err) {

        warn(
            "Video progress load failed:",
            err
        );


        return null;

    }

}


async function saveVideoProgress(
    videoConfig,
    forceComplete = false
) {

    if (
        !currentVideoPlayer ||
        !videoConfig
    ) {

        return;

    }


    const ref =
        getVideoProgressRef(
            videoConfig
        );


    if (!ref) {

        return;

    }


    const duration =
        Number(
            currentVideoPlayer.duration ||
            0
        );


    const currentTime =
        Number(
            currentVideoPlayer.currentTime ||
            0
        );


    const percentage =
        duration > 0
            ? Math.min(
                100,
                Math.round(
                    currentTime /
                    duration *
                    100
                )
            )
            : 0;


    const completed =
        forceComplete ||
        percentage >= 90;


    try {

        await setDoc(
            ref,
            {
                videoId:
                    videoConfig.id,

                courseId:
                    currentCourse.id,

                moduleId:
                    currentModule.id,

                lessonId:
                    currentLesson.id,

                currentTime,

                duration,

                percentage,

                completed,

                updatedAt:
                    serverTimestamp(),

                ...(completed
                    ? {
                        completedAt:
                            serverTimestamp()
                    }
                    : {})
            },
            {
                merge:
                    true
            }
        );

    }
    catch (err) {

        warn(
            "Video progress save failed:",
            err
        );

    }

}


function renderVideoLocked(videoConfig) {

    if (!cwsVideoLesson) {

        return;

    }


    cwsVideoLesson.hidden =
        false;


    cwsVideoLesson.innerHTML = `

        <section class="cws-video-card locked">

            <div class="cws-video-lock-icon">
                <i class="fa-solid fa-crown"></i>
            </div>

            <div class="cws-video-lock-copy">

                <span>
                    CWS PRO VIDEO LESSON
                </span>

                <h2>
                    ${escapeHTML(
                        videoConfig.title ||
                        currentLesson.title
                    )}
                </h2>

                <p>
                    This guided video lesson is available
                    to active CWS Pro students.
                </p>

            </div>

            <a
                class="cws-video-upgrade-btn"
                href="subscription.html?course=${encodeURIComponent(
                    currentCourse.id
                )}&from=lesson"
            >
                <i class="fa-solid fa-crown"></i>
                Unlock with CWS Pro
            </a>

        </section>

    `;

}


function formatVideoChapterTime(seconds) {

    const safeSeconds =
        Math.max(
            0,
            Number(seconds) || 0
        );


    const minutes =
        Math.floor(
            safeSeconds / 60
        );


    const remainder =
        Math.floor(
            safeSeconds % 60
        );


    return (
        `${minutes}:${String(
            remainder
        ).padStart(
            2,
            "0"
        )}`
    );

}


async function renderVideoLesson() {

    if (!cwsVideoLesson) {

        return;

    }


    currentVideoPlayer =
        null;


    lastVideoSavedSecond =
        0;


    const videoConfig =
        getCurrentVideoConfig();


    if (!videoConfig) {

        cwsVideoLesson.hidden =
            true;


        cwsVideoLesson.innerHTML =
            "";


        return;

    }


    const requiresPro =
        normalizeAccessValue(
            videoConfig.access
        ) === "pro";


    if (
        requiresPro &&
        !userHasActivePro()
    ) {

        renderVideoLocked(
            videoConfig
        );


        return;

    }


    const videoUrl =
        String(
            videoConfig.videoUrl ||
            ""
        ).trim();


    const chapters =
        Array.isArray(
            videoConfig.chapters
        )
            ? videoConfig.chapters
            : [];


    cwsVideoLesson.hidden =
        false;


    cwsVideoLesson.innerHTML = `

        <section class="cws-video-card">

            <div class="cws-video-heading">

                <div>

                    <span class="cws-video-eyebrow">

                        ${
                            requiresPro
                                ? '<i class="fa-solid fa-crown"></i> CWS PRO VIDEO'
                                : '<i class="fa-solid fa-circle-play"></i> VIDEO LESSON'
                        }

                    </span>

                    <h2>
                        ${escapeHTML(
                            videoConfig.title ||
                            currentLesson.title
                        )}
                    </h2>

                    <p>
                        ${escapeHTML(
                            videoConfig.description ||
                            ""
                        )}
                    </p>

                </div>

                <span class="cws-video-duration">
                    <i class="fa-regular fa-clock"></i>
                    ${escapeHTML(
                        videoConfig.duration ||
                        "Video"
                    )}
                </span>

            </div>


            ${
                videoUrl
                    ? `
                        <div class="cws-video-player-shell">

                            <video
                                id="cwsLessonVideo"
                                class="cws-video-player"
                                controls
                                preload="metadata"
                                playsinline
                                ${
                                    videoConfig.poster
                                        ? `poster="${escapeHTML(
                                            videoConfig.poster
                                        )}"`
                                        : ""
                                }
                            >
                                <source
                                    src="${escapeHTML(
                                        videoUrl
                                    )}"
                                >

                                Your browser does not support HTML5 video.

                            </video>

                        </div>
                    `
                    : `
                        <div class="cws-video-coming-soon">

                            <i class="fa-solid fa-video"></i>

                            <h3>
                                Video lesson coming soon
                            </h3>

                            <p>
                                The written lesson remains available.
                                Add the final video URL in
                                <code>data/video-lessons.js</code>
                                when your CWS recording is ready.
                            </p>

                        </div>
                    `
            }


            ${
                chapters.length
                    ? `
                        <div class="cws-video-chapters">

                            <span>
                                VIDEO CHAPTERS
                            </span>

                            <div>

                                ${chapters
                                    .map(
                                        chapter => `
                                            <button
                                                type="button"
                                                class="cws-video-chapter"
                                                data-time="${Number(
                                                    chapter.time ||
                                                    0
                                                )}"
                                            >
                                                <span>
                                                    ${formatVideoChapterTime(
                                                        chapter.time
                                                    )}
                                                </span>

                                                <strong>
                                                    ${escapeHTML(
                                                        chapter.label ||
                                                        "Chapter"
                                                    )}
                                                </strong>
                                            </button>
                                        `
                                    )
                                    .join("")}

                            </div>

                        </div>
                    `
                    : ""
            }


            ${
                videoConfig.transcript
                    ? `
                        <details class="cws-video-transcript">

                            <summary>
                                <i class="fa-solid fa-align-left"></i>
                                Video Transcript
                            </summary>

                            <div>
                                ${videoConfig.transcript}
                            </div>

                        </details>
                    `
                    : ""
            }

        </section>

    `;


    if (!videoUrl) {

        return;

    }


    currentVideoPlayer =
        document.getElementById(
            "cwsLessonVideo"
        );


    if (!currentVideoPlayer) {

        return;

    }


    const savedProgress =
        await loadVideoProgress(
            videoConfig
        );


    if (
        savedProgress &&
        Number(
            savedProgress.currentTime ||
            0
        ) > 0
    ) {

        currentVideoPlayer.addEventListener(
            "loadedmetadata",
            () => {

                const resumeTime =
                    Math.min(
                        Number(
                            savedProgress.currentTime
                        ),
                        Math.max(
                            0,
                            currentVideoPlayer.duration -
                            3
                        )
                    );


                if (
                    Number.isFinite(
                        resumeTime
                    )
                ) {

                    currentVideoPlayer.currentTime =
                        resumeTime;

                }

            },
            {
                once:
                    true
            }
        );

    }


    currentVideoPlayer.addEventListener(
        "timeupdate",
        () => {

            const second =
                Math.floor(
                    currentVideoPlayer.currentTime
                );


            if (
                second -
                lastVideoSavedSecond >= 15
            ) {

                lastVideoSavedSecond =
                    second;


                saveVideoProgress(
                    videoConfig
                );

            }

        }
    );


    currentVideoPlayer.addEventListener(
        "pause",
        () =>
            saveVideoProgress(
                videoConfig
            )
    );


    currentVideoPlayer.addEventListener(
        "ended",
        () =>
            saveVideoProgress(
                videoConfig,
                true
            )
    );


    cwsVideoLesson
        .querySelectorAll(
            ".cws-video-chapter"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        if (!currentVideoPlayer) {

                            return;

                        }


                        currentVideoPlayer.currentTime =
                            Number(
                                button.dataset.time ||
                                0
                            );


                        currentVideoPlayer
                            .play()
                            .catch(
                                () => {}
                            );

                    }
                );

            }
        );

}


/* =========================================================
   RENDER LESSON
========================================================= */

function renderLesson() {

    if (
        !currentCourse ||
        !currentModule ||
        !currentLesson
    ) {

        return;

    }


    document.title =
        `${currentLesson.title} | ${currentCourse.title} | CWS Academy`;


    /* =====================================================
       HEADER
    ====================================================== */

    setText(
        headerCourseTitle,
        currentCourse.title
    );


    setText(
        headerCourseCategory,
        currentCourse.category
    );


    if (lessonBrandLink) {

        const params =
            new URLSearchParams();


        params.set(
            "course",
            currentCourse.id
        );


        lessonBrandLink.href =
            `course-details.html?${params.toString()}`;

    }


    setText(
        studentName,
        getUserName(
            currentUser
        )
    );


    /* =====================================================
       COURSE PROGRESS TITLE
    ====================================================== */

    setText(
        courseProgressTitle,
        currentCourse.title
    );


    /* =====================================================
       BREADCRUMB
    ====================================================== */

    setText(
        moduleBreadcrumb,
        currentModule.title
    );


    setText(
        lessonBreadcrumb,
        currentLesson.title
    );


    if (
        courseBreadcrumbLink
    ) {

        const params =
            new URLSearchParams();


        params.set(
            "course",
            currentCourse.id
        );


        courseBreadcrumbLink.href =
            `course-details.html?${params.toString()}`;


        courseBreadcrumbLink.textContent =
            currentCourse.title;

    }


    /* =====================================================
       BADGES
    ====================================================== */

    setText(

        lessonModuleBadge,

        `MODULE ${String(
            currentModule.number
        ).padStart(
            2,
            "0"
        )}`

    );


    setText(

        lessonTypeBadge,

        String(
            currentLesson.type ||
            "Lesson"
        )
            .toUpperCase()

    );


    /* =====================================================
       LESSON HERO
    ====================================================== */

    setText(
        lessonCategory,
        currentCourse.category
    );


    setText(
        lessonTitle,
        currentLesson.title
    );


    setText(
        lessonSubtitle,
        currentLesson.subtitle ||
        ""
    );


    if (
        lessonDuration
    ) {

        lessonDuration.innerHTML = `

            <i class="fa-regular fa-clock"></i>

            ${escapeHTML(
                currentLesson.duration ||
                "Self-paced"
            )}

        `;

    }


    if (
        lessonDifficulty
    ) {

        lessonDifficulty.innerHTML = `

            <i class="fa-solid fa-signal"></i>

            ${escapeHTML(
                currentCourse.level ||
                "Course"
            )}

        `;

    }


    if (
        lessonHeroIcon
    ) {

        lessonHeroIcon.className =
            currentLesson.icon ||
            currentCourse.icon ||
            "fa-solid fa-graduation-cap";

    }


    /* =====================================================
       SIDEBAR MODULE TITLE
    ====================================================== */

    setText(

        sidebarModuleTitle,

        `Module ${String(
            currentModule.number
        ).padStart(
            2,
            "0"
        )}: ${currentModule.title}`

    );


    renderIntroduction();

    renderVideoLesson();

    renderObjectives();

    renderBody();

    renderKeyConcepts();

    renderQuiz();

    renderSidebar();

    renderNavigation();

    updateCompletionUI();

    updateCourseProgressUI();

}


/* =========================================================
   INTRODUCTION
========================================================= */

function renderIntroduction() {

    if (
        !lessonIntroduction
    ) {

        return;

    }


    lessonIntroduction.innerHTML =
        currentLesson
            ?.introduction ||
        "";

}


/* =========================================================
   OBJECTIVES
========================================================= */

function renderObjectives() {

    if (
        !lessonObjectives
    ) {

        return;

    }


    lessonObjectives.innerHTML =
        "";


    const objectives =
        Array.isArray(
            currentLesson
                ?.objectives
        )
            ? currentLesson.objectives
            : [];


    objectives.forEach(
        objective => {

            const li =
                document.createElement(
                    "li"
                );


            li.textContent =
                objective;


            lessonObjectives.appendChild(
                li
            );

        }
    );

}


/* =========================================================
   BODY
========================================================= */

function renderBody() {

    if (
        !lessonBody
    ) {

        return;

    }


    lessonBody.innerHTML =
        currentLesson
            ?.body ||
        "";

}


/* =========================================================
   KEY CONCEPTS
========================================================= */

function renderKeyConcepts() {

    if (
        !lessonKeyConcepts ||
        !lessonKeyConceptsSection
    ) {

        return;

    }


    const concepts =
        Array.isArray(
            currentLesson
                ?.keyConcepts
        )
            ? currentLesson.keyConcepts
            : [];


    lessonKeyConcepts.innerHTML =
        "";


    if (
        !concepts.length
    ) {

        lessonKeyConceptsSection.hidden =
            true;

        return;

    }


    lessonKeyConceptsSection.hidden =
        false;


    concepts.forEach(
        concept => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "lesson-concept-card";


            const title =
                document.createElement(
                    "strong"
                );


            title.textContent =
                concept.title ||
                "Key Concept";


            const description =
                document.createElement(
                    "p"
                );


            description.textContent =
                concept.description ||
                "";


            card.appendChild(
                title
            );


            card.appendChild(
                description
            );


            lessonKeyConcepts.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   QUIZ
========================================================= */

function renderQuiz() {

    if (
        !quizQuestions ||
        !knowledgeCheck
    ) {

        return;

    }


    const quiz =
        Array.isArray(
            currentLesson?.quiz
        )
            ? currentLesson.quiz
            : [];


    quizQuestions.innerHTML =
        "";


    if (
        quizResult
    ) {

        quizResult.hidden =
            true;


        quizResult.className =
            "quiz-result";


        quizResult.innerHTML =
            "";

    }


    if (
        !quiz.length
    ) {

        knowledgeCheck.hidden =
            true;

        return;

    }


    knowledgeCheck.hidden =
        false;


    quiz.forEach(
        (
            question,
            index
        ) => {

            const questionBox =
                document.createElement(
                    "div"
                );


            questionBox.className =
                "quiz-question";


            const title =
                document.createElement(
                    "h3"
                );


            title.className =
                "quiz-question-title";


            title.textContent =

                `${index + 1}. ${question.question}`;


            const options =
                document.createElement(
                    "div"
                );


            options.className =
                "quiz-options";


            const questionOptions =
                Array.isArray(
                    question.options
                )
                    ? question.options
                    : [];


            questionOptions.forEach(
                (
                    option,
                    optionIndex
                ) => {

                    const label =
                        document.createElement(
                            "label"
                        );


                    label.className =
                        "quiz-option";


                    const input =
                        document.createElement(
                            "input"
                        );


                    input.type =
                        "radio";


                    input.name =
                        `question-${index}`;


                    input.value =
                        String(
                            optionIndex
                        );


                    input.required =
                        true;


                    const span =
                        document.createElement(
                            "span"
                        );


                    span.textContent =
                        option;


                    label.appendChild(
                        input
                    );


                    label.appendChild(
                        span
                    );


                    options.appendChild(
                        label
                    );

                }
            );


            questionBox.appendChild(
                title
            );


            questionBox.appendChild(
                options
            );


            quizQuestions.appendChild(
                questionBox
            );

        }
    );

}


/* =========================================================
   QUIZ SUBMIT
========================================================= */

async function handleQuizSubmit(
    event
) {

    event.preventDefault();


    const quiz =
        Array.isArray(
            currentLesson?.quiz
        )
            ? currentLesson.quiz
            : [];


    if (
        !quiz.length
    ) {

        return;

    }


    let score = 0;


    quiz.forEach(
        (
            question,
            index
        ) => {

            const selected =
                document.querySelector(

                    `input[name="question-${index}"]:checked`

                );


            if (
                selected &&
                Number(
                    selected.value
                ) ===
                Number(
                    question.answer
                )
            ) {

                score++;

            }

        }
    );


    const percentage =
        Math.round(

            (
                score /
                quiz.length
            ) * 100

        );


    await saveLessonQuizResult(
        percentage
    );


    if (
        !quizResult
    ) {

        updateCompletionUI();

        return;

    }


    quizResult.hidden =
        false;


    quizResult.className =
        "quiz-result";


    if (
        percentage >= 70
    ) {

        quizResult.classList.add(
            "success"
        );


        quizResult.innerHTML = `

            <strong>
                Knowledge check passed!
            </strong>

            <p>
                You scored ${score}/${quiz.length}
                (${percentage}%).
                You can now mark this lesson complete.
            </p>

        `;

    } else {

        quizResult.classList.add(
            "failed"
        );


        quizResult.innerHTML = `

            <strong>
                Keep studying.
            </strong>

            <p>
                You scored ${score}/${quiz.length}
                (${percentage}%).
                You need at least 70% before this lesson
                can be marked complete.
            </p>

        `;

    }


    updateCompletionUI();

}


/* =========================================================
   SIDEBAR
========================================================= */

function renderSidebar() {

    if (
        !lessonSidebarList ||
        !currentModule
    ) {

        return;

    }


    lessonSidebarList.innerHTML =
        "";


    const lessons =
        Array.isArray(
            currentModule.lessons
        )
            ? currentModule.lessons
            : [];


    lessons.forEach(
        (
            lesson,
            index
        ) => {

            const link =
                document.createElement(
                    "a"
                );


            link.className =
                "lesson-sidebar-item";


            const completed =
                currentProgress
                    ?.completedLessons
                    ?.includes(

                        buildLessonKey(
                            currentModule.id,
                            lesson.id
                        )

                    );


            if (
                completed
            ) {

                link.classList.add(
                    "completed"
                );

            }


            if (
                lesson.id ===
                currentLesson.id
            ) {

                link.classList.add(
                    "active"
                );


                link.setAttribute(
                    "aria-current",
                    "page"
                );

            }


            link.href =
                buildLessonUrl(

                    currentCourse.id,

                    currentModule.id,

                    lesson.id

                );


            const number =
                document.createElement(
                    "span"
                );


            number.className =
                "lesson-sidebar-number";


            if (
                completed
            ) {

                number.innerHTML =
                    `<i class="fa-solid fa-check"></i>`;

            } else {

                number.textContent =
                    String(
                        index + 1
                    )
                        .padStart(
                            2,
                            "0"
                        );

            }


            const title =
                document.createElement(
                    "span"
                );


            title.className =
                "lesson-sidebar-title";


            title.textContent =
                lesson.title;


            link.appendChild(
                number
            );


            link.appendChild(
                title
            );


            lessonSidebarList.appendChild(
                link
            );

        }
    );

}


/* =========================================================
   IS LESSON COMPLETED
========================================================= */

function isLessonCompleted() {

    if (
        !currentProgress ||
        !currentModule ||
        !currentLesson
    ) {

        return false;

    }


    return currentProgress
        .completedLessons
        .includes(

            buildLessonKey(
                currentModule.id,
                currentLesson.id
            )

        );

}


/* =========================================================
   LESSON QUIZ KEY
========================================================= */

function getCurrentLessonQuizKey() {

    if (
        !currentModule ||
        !currentLesson
    ) {

        return "";

    }


    return buildLessonKey(
        currentModule.id,
        currentLesson.id
    );

}


/* =========================================================
   LESSON HAS QUIZ
========================================================= */

function currentLessonHasQuiz() {

    return Boolean(
        Array.isArray(
            currentLesson?.quiz
        ) &&
        currentLesson.quiz.length
    );

}


/* =========================================================
   LESSON QUIZ PASSED
========================================================= */

function hasPassedCurrentLessonQuiz() {

    /*
     * Lessons without a quiz should not be blocked.
     */

    if (
        !currentLessonHasQuiz()
    ) {

        return true;

    }


    if (
        !currentProgress
    ) {

        return false;

    }


    const quizKey =
        getCurrentLessonQuizKey();


    if (!quizKey) {

        return false;

    }


    return Boolean(
        currentProgress
            .passedLessonQuizzes
            ?.[quizKey]
            ?.passed
    );

}


/* =========================================================
   SAVE LESSON QUIZ RESULT
========================================================= */

async function saveLessonQuizResult(
    percentage
) {

    if (
        !currentProgress ||
        !currentModule ||
        !currentLesson
    ) {

        return;

    }


    const quizKey =
        getCurrentLessonQuizKey();


    if (!quizKey) {

        return;

    }


    const previous =
        currentProgress
            .passedLessonQuizzes
            ?.[quizKey] || {};


    const previousBest =
        Number(
            previous.bestScore
        ) || 0;


    const passed =
        percentage >= 70;


    currentProgress
        .passedLessonQuizzes[
            quizKey
        ] = {

            bestScore:
                Math.max(
                    previousBest,
                    percentage
                ),

            passed:
                Boolean(
                    previous.passed ||
                    passed
                )

        };


    await saveProgress();

}


/* =========================================================
   COMPLETION UI
========================================================= */

function updateCompletionUI() {

    if (
        !completeLessonBtn ||
        !lessonCompletion
    ) {

        return;

    }


    if (
        isLessonCompleted()
    ) {

        lessonCompletion.classList.add(
            "completed"
        );


        completeLessonBtn.innerHTML = `

            <i class="fa-solid fa-circle-check"></i>

            Lesson Completed

        `;


        completeLessonBtn.disabled =
            true;


        return;

    }


    lessonCompletion.classList.remove(
        "completed"
    );


    const quizRequired =
        currentLessonHasQuiz();


    const quizPassed =
        hasPassedCurrentLessonQuiz();


    if (
        quizRequired &&
        !quizPassed
    ) {

        completeLessonBtn.innerHTML = `

            <i class="fa-solid fa-lock"></i>

            Pass Knowledge Check First

        `;


        completeLessonBtn.disabled =
            true;


        return;

    }


    completeLessonBtn.innerHTML = `

        <i class="fa-solid fa-check"></i>

        Mark Lesson Complete

    `;


    completeLessonBtn.disabled =
        false;

}


/* =========================================================
   COMPLETE LESSON
========================================================= */

async function completeLesson() {

    if (
        !currentCourse ||
        !currentModule ||
        !currentLesson
    ) {

        return;

    }


    if (
        !currentProgress
    ) {

        currentProgress =
            getDefaultProgress();

    }


    /*
     * Hard gate: a lesson with a knowledge check
     * cannot be completed until the quiz has been passed.
     */

    if (
        currentLessonHasQuiz() &&
        !hasPassedCurrentLessonQuiz()
    ) {

        if (
            quizResult
        ) {

            quizResult.hidden =
                false;


            quizResult.className =
                "quiz-result failed";


            quizResult.innerHTML = `

                <strong>
                    Knowledge check required.
                </strong>

                <p>
                    Score at least 70% on the knowledge check
                    before marking this lesson complete.
                </p>

            `;


            quizResult.scrollIntoView({
                behavior:
                    "smooth",
                block:
                    "nearest"
            });

        }


        return;

    }


    const lessonKey =
        buildLessonKey(
            currentModule.id,
            currentLesson.id
        );


    if (
        !currentProgress
            .completedLessons
            .includes(
                lessonKey
            )
    ) {

        currentProgress
            .completedLessons
            .push(
                lessonKey
            );

    }


    currentProgress.started =
        true;


    /*
       If another lesson exists, save it as
       the resume destination.

       Otherwise keep the current final lesson.
    */

    const next =
        getNextLesson();


    if (
        next
    ) {

        currentProgress.currentModule =
            next.moduleId;


        currentProgress.currentLesson =
            next.lessonId;

    } else {

        currentProgress.currentModule =
            currentModule.id;


        currentProgress.currentLesson =
            currentLesson.id;

    }


    currentProgress.progressPercent =
        calculateCourseProgress();


    currentProgress.completed =
        currentProgress
            .progressPercent === 100 &&
        (
            !currentCourse?.finalAssessment ||
            Boolean(
                currentProgress
                    ?.finalAssessment
                    ?.passed
            )
        );


    updateCourseProgressUI();

    updateCompletionUI();

    renderSidebar();


    await saveProgress();


    log(
        "Lesson completed:",
        {
            lessonKey,

            next:
                next
                    ? `${next.moduleId}:${next.lessonId}`
                    : null,

            progress:
                currentProgress.progressPercent
        }
    );

}


/* =========================================================
   NAVIGATION
========================================================= */

function renderNavigation() {

    const lessons =
        getAllLessons();


    const index =
        getCurrentLessonIndex();


    const previous =
        getPreviousLesson();


    const next =
        getNextLesson();


    /* =====================================================
       PREVIOUS
    ====================================================== */

    if (
        previousLessonBtn
    ) {

        if (
            previous
        ) {

            previousLessonBtn.hidden =
                false;


            previousLessonBtn.href =
                buildLessonUrl(

                    currentCourse.id,

                    previous.moduleId,

                    previous.lessonId

                );


            const span =
                previousLessonBtn
                    .querySelector(
                        "span"
                    );


            if (
                span
            ) {

                span.innerHTML = `

                    <small>
                        Previous
                    </small>

                    ${escapeHTML(
                        previous.lesson.title
                    )}

                `;

            }

        } else {

            previousLessonBtn.hidden =
                true;

        }

    }


    /* =====================================================
       NEXT
    ====================================================== */

    if (
        nextLessonBtn
    ) {

        /*
         * The last lesson in a module routes to that
         * module's assessment before the student can
         * continue into the next module.
         */

        if (
            isLastLessonInCurrentModule() &&
            currentModuleHasActivity()
        ) {

            const activity =
                getFirstCurrentModuleActivity();


            nextLessonBtn.hidden =
                false;


            nextLessonBtn.href =
                buildLabActivityUrl(

                    currentCourse.id,

                    currentModule.id,

                    activity.id

                );


            const span =
                nextLessonBtn
                    .querySelector(
                        "span"
                    );


            if (
                span
            ) {

                span.innerHTML = `

                    <small>
                        Next
                    </small>

                    ${escapeHTML(
                        activity.title ||
                        "Practical Activity"
                    )}

                `;

            }

        }

        else if (
            isLastLessonInCurrentModule() &&
            currentModuleHasAssessment()
        ) {

            nextLessonBtn.hidden =
                false;


            nextLessonBtn.href =
                buildModuleAssessmentUrl(

                    currentCourse.id,

                    currentModule.id

                );


            const span =
                nextLessonBtn
                    .querySelector(
                        "span"
                    );


            if (
                span
            ) {

                span.innerHTML = `

                    <small>
                        Next
                    </small>

                    Module Assessment

                `;

            }

        }

        else if (
            next
        ) {

            nextLessonBtn.hidden =
                false;


            nextLessonBtn.href =
                buildLessonUrl(

                    currentCourse.id,

                    next.moduleId,

                    next.lessonId

                );


            const span =
                nextLessonBtn
                    .querySelector(
                        "span"
                    );


            if (
                span
            ) {

                span.innerHTML = `

                    <small>
                        Next
                    </small>

                    ${escapeHTML(
                        next.lesson.title
                    )}

                `;

            }

        }

        else {

            nextLessonBtn.hidden =
                true;

        }

    }


    /* =====================================================
       LESSON POSITION
    ====================================================== */

    if (
        index >= 0
    ) {

        setText(

            lessonProgressMeta,

            `Lesson ${index + 1} of ${lessons.length}`

        );

    } else {

        setText(
            lessonProgressMeta,
            ""
        );

    }

}


/* =========================================================
   BUILD LESSON URL
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


/* =========================================================
   BUILD MODULE ASSESSMENT URL
========================================================= */

function buildModuleAssessmentUrl(
    courseId,
    moduleId
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


    return (
        `module-assessment.html?${params.toString()}`
    );

}


/* =========================================================
   BUILD LAB / PRACTICAL ACTIVITY URL
========================================================= */

function buildLabActivityUrl(
    courseId,
    moduleId,
    activityId
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
        "activity",
        activityId
    );


    return (
        `lab-activity.html?${params.toString()}`
    );

}


/* =========================================================
   GET CURRENT MODULE ACTIVITIES
========================================================= */

function getCurrentModuleActivities() {

    if (!currentModule) {

        return [];

    }


    return [
        ...(
            Array.isArray(
                currentModule.labActivities
            )
                ? currentModule.labActivities
                : []
        ),

        ...(
            Array.isArray(
                currentModule.practiceActivities
            )
                ? currentModule.practiceActivities
                : []
        )
    ];

}


/* =========================================================
   GET FIRST CURRENT MODULE ACTIVITY
========================================================= */

function getFirstCurrentModuleActivity() {

    return (
        getCurrentModuleActivities()[0] ||
        null
    );

}


/* =========================================================
   CURRENT MODULE HAS ACTIVITY
========================================================= */

function currentModuleHasActivity() {

    return Boolean(
        getFirstCurrentModuleActivity()
    );

}


/* =========================================================
   IS LAST LESSON IN CURRENT MODULE
========================================================= */

function isLastLessonInCurrentModule() {

    if (
        !currentModule ||
        !currentLesson ||
        !Array.isArray(
            currentModule.lessons
        ) ||
        !currentModule.lessons.length
    ) {

        return false;

    }


    const lastLesson =
        currentModule.lessons[
            currentModule.lessons.length - 1
        ];


    return (
        lastLesson?.id ===
        currentLesson.id
    );

}


/* =========================================================
   CURRENT MODULE HAS ASSESSMENT
========================================================= */

function currentModuleHasAssessment() {

    return Boolean(
        currentModule
            ?.moduleAssessment &&
        Array.isArray(
            currentModule
                .moduleAssessment
                .questions
        ) &&
        currentModule
            .moduleAssessment
            .questions
            .length
    );

}


/* =========================================================
   HTML ESCAPE
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
   LESSON ACCESS
========================================================= */

function hasCurrentLessonAccess() {

    if (!currentCourse) {
        return false;
    }

    /*
     * Course access is the minimum gate.
     * If you later add access: "pro" directly to modules
     * or lessons, these checks will enforce those too.
     */

    if (
        !canAccessItem(
            currentCourse,
            currentEntitlement
        )
    ) {
        return false;
    }


    if (
        currentModule &&
        !canAccessItem(
            currentModule,
            currentEntitlement
        )
    ) {
        return false;
    }


    if (
        currentLesson &&
        !canAccessItem(
            currentLesson,
            currentEntitlement
        )
    ) {
        return false;
    }


    return true;
}


function getCurrentRequiredAccess() {

    const levels = [
        currentCourse,
        currentModule,
        currentLesson
    ]
        .filter(Boolean)
        .map(item =>
            getRequiredAccess(item)
        );


    /*
     * Current CWS plans are free/pro.
     * If any part requires pro, the lesson requires pro.
     */

    return levels.includes("pro")
        ? "pro"
        : "free";
}


function redirectToUpgrade() {

    const requiredPlan =
        getCurrentRequiredAccess();


    warn(
        "Lesson access denied:",
        {
            course:
                currentCourse?.id || null,

            module:
                currentModule?.id || null,

            lesson:
                currentLesson?.id || null,

            requiredPlan,

            userPlan:
                currentEntitlement?.plan ||
                "free"
        }
    );


    const message =
        getAccessMessage(
            requiredPlan
        );


    if (message) {
        log(
            "Access message:",
            message
        );
    }


    window.location.replace(
        getUpgradeUrl(
            requiredPlan
        )
    );
}


/* =========================================================
   LOAD LESSON
========================================================= */

async function loadLesson() {

    showLoading();


    const {
        courseId,
        moduleId,
        lessonId
    } =
        getUrlParameters();


    log(
        "URL parameters:",
        {
            courseId,
            moduleId,
            lessonId
        }
    );


    /* =====================================================
       VALIDATE PARAMETERS
    ====================================================== */

    if (
        !courseId ||
        !moduleId ||
        !lessonId
    ) {

        showNotFound(

            "The lesson URL is missing the course, module or lesson parameter."

        );


        return;

    }


    /* =====================================================
       COURSE
    ====================================================== */

    currentCourse =
        getCourse(
            courseId
        );


    if (
        !currentCourse
    ) {

        error(
            "Course not found:",
            courseId
        );


        showNotFound(
            "The requested course does not exist."
        );


        return;

    }


    if (
        currentCourse.status !==
        "available"
    ) {

        showNotFound(

            `${currentCourse.title} is not currently available.`

        );


        return;

    }


    /* =====================================================
       MODULE
    ====================================================== */

    currentModule =
        getModule(
            courseId,
            moduleId
        );


    if (
        !currentModule
    ) {

        error(
            "Module not found:",
            {
                courseId,
                moduleId
            }
        );


        showNotFound(
            "The requested module does not exist."
        );


        return;

    }


    /* =====================================================
       LESSON
    ====================================================== */

    currentLesson =
        getLesson(
            courseId,
            moduleId,
            lessonId
        );


    if (
        !currentLesson
    ) {

        error(
            "Lesson not found:",
            {
                courseId,
                moduleId,
                lessonId
            }
        );


        showNotFound(
            "The requested lesson does not exist."
        );


        return;

    }


    log(
        "Resolved lesson:",
        {
            course:
                currentCourse.title,

            module:
                currentModule.title,

            lesson:
                currentLesson.title
        }
    );


    /* =====================================================
       ACCESS CHECK
    ====================================================== */

    if (
        !hasCurrentLessonAccess()
    ) {

        redirectToUpgrade();

        return;

    }


    log(
        "Lesson access granted:",
        {
            course:
                currentCourse.id,

            module:
                currentModule.id,

            lesson:
                currentLesson.id,

            requiredPlan:
                getCurrentRequiredAccess(),

            userPlan:
                currentEntitlement?.plan ||
                "free"
        }
    );


    /* =====================================================
       FIRESTORE
    ====================================================== */

    await loadProgress();


    /* =====================================================
       RENDER
    ====================================================== */

    renderLesson();


    showContent();


    /*
       Store this lesson as the current location.

       This runs after rendering so a Firestore
       failure never prevents the lesson page
       from loading.
    */

    const locationChanged =
        currentProgress.started !== true ||
        currentProgress.currentModule !==
            currentModule.id ||
        currentProgress.currentLesson !==
            currentLesson.id;


    currentProgress.started =
        true;


    currentProgress.currentModule =
        currentModule.id;


    currentProgress.currentLesson =
        currentLesson.id;


    if (locationChanged) {

        saveProgress()
            .catch(
                err => {

                    error(
                        "Background progress save failed:",
                        err
                    );

                }
            );

    }


    log(
        "Lesson loaded successfully:",
        {
            course:
                currentCourse.id,

            module:
                currentModule.id,

            lesson:
                currentLesson.id
        }
    );

}


/* =========================================================
   LOGOUT LOADING
========================================================= */

function setLogoutLoading(
    loading
) {

    if (
        !logoutBtn
    ) {

        return;

    }


    logoutBtn.disabled =
        loading;


    logoutBtn.classList.toggle(
        "is-loading",
        loading
    );


    if (
        loading
    ) {

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

    if (
        !auth
    ) {

        error(
            "Firebase Auth unavailable."
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
   EVENTS
========================================================= */

if (
    knowledgeCheckForm
) {

    knowledgeCheckForm.addEventListener(

        "submit",

        handleQuizSubmit

    );

}


if (
    logoutBtn
) {

    logoutBtn.addEventListener(

        "click",

        logout

    );

}


/* =========================================================
   AUTHENTICATION
========================================================= */

if (
    !auth
) {

    error(
        "Firebase Auth unavailable."
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

                "Authentication:",

                user
                    ? "AUTHENTICATED"
                    : "NOT AUTHENTICATED"

            );


            /* =============================================
               NOT AUTHENTICATED
            ============================================== */

            if (
                !user
            ) {

                currentUser =
                    null;


                const {
                    courseId,
                    moduleId,
                    lessonId
                } =
                    getUrlParameters();


                window.location.replace(

                    `../pages/login.html?redirect=lesson` +

                    `&course=${encodeURIComponent(
                        courseId
                    )}` +

                    `&module=${encodeURIComponent(
                        moduleId
                    )}` +

                    `&lesson=${encodeURIComponent(
                        lessonId
                    )}`

                );


                return;

            }


            /* =============================================
               AUTHENTICATED
            ============================================== */

            currentUser =
                user;


            /* =============================================
               LOAD USER ENTITLEMENT
            ============================================== */

            currentEntitlement =
                await getUserEntitlement(
                    user
                );


            log(
                "User entitlement:",
                {
                    plan:
                        currentEntitlement?.plan ||
                        "free",

                    status:
                        currentEntitlement?.status ||
                        "inactive"
                }
            );


            if (
                lessonInitialized
            ) {

                return;

            }


            lessonInitialized =
                true;


            try {

                await loadLesson();

            } catch (err) {

                error(
                    "Lesson initialization failed:",
                    err
                );


                showNotFound(

                    "The lesson could not be loaded. Please return to the course and try again."

                );

            }

        }

    );

}


/* =========================================================
   INITIAL LOG
========================================================= */

log(
    "lesson.js loaded."
);
