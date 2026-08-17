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
   CALCULATE COURSE PROGRESS
========================================================= */

function calculateCourseProgress() {

    const total =
        getTotalLessons();


    if (!total) {

        return 0;

    }


    const completed =
        currentProgress
            ?.completedLessons
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

            `${completed} of ${total} lessons completed in ${currentCourse.title}.`;

    }

    else {

        courseProgressText.textContent =

            `${currentCourse.title} completed. Congratulations!`;

    }

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
            .progressPercent === 100;


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

        if (
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

        } else {

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

    currentProgress.started =
        true;


    currentProgress.currentModule =
        currentModule.id;


    currentProgress.currentLesson =
        currentLesson.id;


    saveProgress()
        .catch(
            err => {

                error(
                    "Background progress save failed:",
                    err
                );

            }
        );


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
    completeLessonBtn
) {

    completeLessonBtn.addEventListener(

        "click",

        completeLesson

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
