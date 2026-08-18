/* =========================================================
   CWS ACADEMY
   SITE ASSISTANT V3
   Firestore-powered personalized student guidance
   File: js/cws-assistant.js
========================================================= */

"use strict";

import {
    CWS_ASSISTANT_KNOWLEDGE,
    CWS_ASSISTANT_QUICK_ACTIONS
} from "./cws-assistant-knowledge.js";


import {
    getPersonalizedNextStep
} from "./cws-assistant-progress.js";


const STORAGE_KEY =
    "cwsAssistantOpen";

const HISTORY_KEY =
    "cwsAssistantHistory";

const MAX_HISTORY =
    18;


/* =========================================================
   CONTEXT
========================================================= */

function getPath() {

    return window.location.pathname
        .toLowerCase();

}


function getParams() {

    return new URLSearchParams(
        window.location.search
    );

}


function isStudentPage() {

    return getPath()
        .includes("/student/");

}


function isNestedPublicPage() {

    return getPath()
        .includes("/pages/");

}


function getSiteContext() {

    if (isStudentPage()) {
        return "student";
    }

    if (isNestedPublicPage()) {
        return "nested-public";
    }

    return "root-public";

}


function detectPageType() {

    const path =
        getPath();


    if (path.endsWith("/dashboard.html")) {
        return "dashboard";
    }

    if (path.endsWith("/student-courses.html")) {
        return "student-courses";
    }

    if (path.endsWith("/course-details.html")) {
        return "course-details";
    }

    if (path.endsWith("/lesson.html")) {
        return "lesson";
    }

    if (path.endsWith("/labs.html")) {
        return "labs";
    }

    if (path.endsWith("/lab-activity.html")) {
        return "lab-activity";
    }

    if (path.endsWith("/assessments.html")) {
        return "assessments";
    }

    if (path.endsWith("/module-assessment.html")) {
        return "module-assessment";
    }

    if (path.endsWith("/final-assessment.html")) {
        return "final-assessment";
    }

    if (path.endsWith("/progress.html")) {
        return "progress";
    }

    if (path.endsWith("/certificates.html")) {
        return "certificates";
    }

    if (path.endsWith("/certificate.html")) {
        return "certificate";
    }

    if (path.endsWith("/profile.html")) {
        return "profile";
    }

    if (path.endsWith("/pricing.html")) {
        return "pricing";
    }

    if (path.endsWith("/courses.html")) {
        return "public-courses";
    }

    if (path.endsWith("/login.html")) {
        return "login";
    }

    if (path.endsWith("/register.html")) {
        return "register";
    }

    if (path.endsWith("/verify-certificate.html")) {
        return "verify-certificate";
    }


    return "general";

}


function getLearningContext() {

    const params =
        getParams();


    return {

        page:
            detectPageType(),

        course:
            params.get("course") ||
            "",

        module:
            params.get("module") ||
            "",

        lesson:
            params.get("lesson") ||
            "",

        activity:
            params.get("activity") ||
            "",

        assessment:
            params.get("assessment") ||
            ""

    };

}


/* =========================================================
   PATH RESOLUTION
========================================================= */

function resolveActionPath(action) {

    const context =
        getSiteContext();


    if (context === "student") {

        return action.studentPath ||
            action.nestedPublicPath ||
            action.publicPath ||
            "#";

    }


    if (context === "nested-public") {

        return action.nestedPublicPath ||
            action.publicPath ||
            action.studentPath ||
            "#";

    }


    return action.publicPath ||
        action.nestedPublicPath ||
        action.studentPath ||
        "#";

}


/* =========================================================
   TEXT MATCHING
========================================================= */

function normalizeText(value) {

    return String(value || "")
        .trim()
        .toLowerCase()
        .replace(/[^\w\s'-]/g, " ")
        .replace(/\s+/g, " ");

}


function tokenize(value) {

    return normalizeText(value)
        .split(" ")
        .filter(Boolean);

}


function scoreKnowledgeItem(
    query,
    item
) {

    const normalizedQuery =
        normalizeText(query);

    const queryTokens =
        new Set(
            tokenize(query)
        );

    let score = 0;


    item.keywords.forEach(
        keyword => {

            const normalizedKeyword =
                normalizeText(
                    keyword
                );


            if (
                normalizedQuery ===
                normalizedKeyword
            ) {

                score += 20;

            }
            else if (
                normalizedQuery.includes(
                    normalizedKeyword
                )
            ) {

                score += 12;

            }
            else {

                tokenize(keyword)
                    .forEach(
                        token => {

                            if (
                                queryTokens.has(
                                    token
                                )
                            ) {

                                score += 2;

                            }

                        }
                    );

            }

        }
    );


    return score;

}


function findBestAnswer(query) {

    let best =
        null;

    let bestScore =
        0;


    CWS_ASSISTANT_KNOWLEDGE
        .forEach(
            item => {

                const score =
                    scoreKnowledgeItem(
                        query,
                        item
                    );


                if (
                    score >
                    bestScore
                ) {

                    best =
                        item;

                    bestScore =
                        score;

                }

            }
        );


    return bestScore >= 3
        ? best
        : null;

}


/* =========================================================
   CONTEXT-AWARE GUIDANCE
========================================================= */

function isNextStepQuestion(query) {

    const text =
        normalizeText(query);


    return [
        "next",
        "what should i do",
        "what do i do",
        "where do i go",
        "continue",
        "stuck",
        "help me",
        "what now"
    ]
        .some(
            phrase =>
                text.includes(
                    phrase
                )
        );

}


function getContextGuidance() {

    const context =
        getLearningContext();


    switch (
        context.page
    ) {

        case "dashboard":

            return {
                answer:
                    "A good next step is to continue your most recent course. If you have not started yet, open Courses and begin with a foundation course.",
                action: {
                    label: "Open My Courses",
                    studentPath: "student-courses.html"
                }
            };


        case "student-courses":

            return {
                answer:
                    "Choose an available course and open its course details. If you are new to CWS Academy, start with one of the foundation courses before moving into advanced or Pro content.",
                action: {
                    label: "View Courses",
                    studentPath: "student-courses.html"
                }
            };


        case "course-details":

            return {
                answer:
                    "Your next step is to start or continue the next available lesson in this course. Work through the modules in order, then complete the required labs and assessments as they unlock.",
                action: {
                    label: "View Course Progress",
                    studentPath: "progress.html"
                }
            };


        case "lesson":

            return {
                answer:
                    "Finish reading the lesson, complete the knowledge check, then use “Mark Lesson Complete”. After that, continue to the next lesson or activity shown by the course navigation.",
                action: {
                    label: "View Progress",
                    studentPath: "progress.html"
                }
            };


        case "labs":

            return {
                answer:
                    "Choose an available lab that matches your current course. If a lab is locked, return to the course and complete the prerequisite lessons or assessments first.",
                action: {
                    label: "Open My Courses",
                    studentPath: "student-courses.html"
                }
            };


        case "lab-activity":

            return {
                answer:
                    "Work through the activity instructions in order, complete the reflection section, and only then mark the activity complete. Keep all testing inside the authorized training environment.",
                action: {
                    label: "View Course Progress",
                    studentPath: "progress.html"
                }
            };


        case "assessments":

            return {
                answer:
                    "Choose an available assessment for a course you have already studied. If none are available, continue the required lessons and practical activities first.",
                action: {
                    label: "Continue Learning",
                    studentPath: "student-courses.html"
                }
            };


        case "module-assessment":

            return {
                answer:
                    "Answer every question and submit the assessment. If you do not reach the required pass mark, review the related module lessons and retry when you are ready.",
                action: {
                    label: "View Assessments",
                    studentPath: "assessments.html"
                }
            };


        case "final-assessment":

            return {
                answer:
                    "Before submitting the final assessment, make sure all required lessons, activities and module assessments are complete. If access is locked, return to the course and finish the missing requirements.",
                action: {
                    label: "View Course Progress",
                    studentPath: "progress.html"
                }
            };


        case "progress":

            return {
                answer:
                    "Use the Course Progress section to identify the course with unfinished work. Continue the next incomplete lesson, lab or assessment from there.",
                action: {
                    label: "Open My Courses",
                    studentPath: "student-courses.html"
                }
            };


        case "certificates":

            return {
                answer:
                    "If you have not earned a certificate yet, continue the course pathway until all required lessons, practical work, module assessments and the final assessment are complete.",
                action: {
                    label: "View Progress",
                    studentPath: "progress.html"
                }
            };


        case "certificate":

            return {
                answer:
                    "Your certificate is complete. You can download the PDF, copy the verification link, share it, or open the public credential verification page.",
                action: {
                    label: "Back to Certificates",
                    studentPath: "certificates.html"
                }
            };


        case "profile":

            return {
                answer:
                    "From your Profile page you can update your display name, learning preferences, account security and review your learning summary.",
                action: {
                    label: "View Progress",
                    studentPath: "progress.html"
                }
            };


        case "login":

            return {
                answer:
                    "Enter your account email and password, or use Google or GitHub sign-in. If you cannot remember your password, use the Forgot Password option.",
                action: {
                    label: "Reset Password",
                    nestedPublicPath: "forgot-password.html"
                }
            };


        case "register":

            return {
                answer:
                    "Complete your account details, accept the Terms and Privacy Policy, then create your account. After registration, sign in and choose your first course.",
                action: {
                    label: "Browse Courses",
                    nestedPublicPath: "courses.html"
                }
            };


        case "verify-certificate":

            return {
                answer:
                    "Enter the credential ID exactly as shown on the certificate, or open this page using the certificate QR code. An active matching record will display as verified.",
                action: null
            };


        default:

            return {
                answer:
                    "I can help you decide what to do next. If you are a student, open your Dashboard or Courses area and continue the next incomplete part of your learning path.",
                action: {
                    label: "Browse Courses",
                    publicPath: "pages/courses.html",
                    nestedPublicPath: "courses.html",
                    studentPath: "student-courses.html"
                }
            };

    }

}


/* =========================================================
   PAGE HINT
========================================================= */

function getCurrentPageHint() {

    const context =
        getLearningContext();


    const labelMap = {
        "dashboard":
            "You are on your Dashboard.",
        "student-courses":
            "You are viewing your Courses.",
        "course-details":
            "You are viewing a course.",
        "lesson":
            "You are inside a lesson.",
        "labs":
            "You are in the Labs area.",
        "lab-activity":
            "You are inside a practical activity.",
        "assessments":
            "You are in the Assessments area.",
        "module-assessment":
            "You are inside a module assessment.",
        "final-assessment":
            "You are inside the final assessment.",
        "progress":
            "You are viewing your learning progress.",
        "certificates":
            "You are in the Certificates area.",
        "certificate":
            "You are viewing a certificate.",
        "profile":
            "You are viewing your Profile."
    };


    let hint =
        labelMap[
            context.page
        ] ||
        "";


    if (
        context.course
    ) {

        hint +=
            ` Current course: ${context.course}.`;

    }


    if (
        context.module
    ) {

        hint +=
            ` Module: ${context.module}.`;

    }


    return hint.trim();

}


/* =========================================================
   FALLBACK
========================================================= */

function getFallbackAnswer() {

    const context =
        getContextGuidance();


    return {
        answer:
            `I’m mainly here to help with CWS Academy navigation and learning steps. ${context.answer}`,
        action:
            context.action
    };

}


/* =========================================================
   UI
========================================================= */

function createAssistantMarkup() {

    const wrapper =
        document.createElement(
            "div"
        );


    wrapper.id =
        "cwsAssistant";

    wrapper.className =
        "cws-assistant";


    wrapper.innerHTML = `

        <button
            type="button"
            id="cwsAssistantLauncher"
            class="cws-assistant-launcher"
            aria-label="Open CWS Assistant"
            aria-expanded="false"
        >

            <span class="cws-assistant-launcher-glow"></span>

            <i class="fa-solid fa-robot"></i>

            <span class="cws-assistant-launcher-label">
                Ask CWS
            </span>

        </button>


        <section
            id="cwsAssistantPanel"
            class="cws-assistant-panel"
            aria-label="CWS Academy Assistant"
            hidden
        >

            <header class="cws-assistant-header">

                <div class="cws-assistant-title">

                    <div class="cws-assistant-avatar">
                        <i class="fa-solid fa-robot"></i>
                    </div>

                    <div>

                        <strong>
                            CWS Assistant
                        </strong>

                        <span>
                            Academy help & next-step guidance
                        </span>

                    </div>

                </div>


                <button
                    type="button"
                    id="cwsAssistantClose"
                    class="cws-assistant-close"
                    aria-label="Close CWS Assistant"
                >
                    <i class="fa-solid fa-xmark"></i>
                </button>

            </header>


            <div
                id="cwsAssistantMessages"
                class="cws-assistant-messages"
                aria-live="polite"
            ></div>


            <div
                id="cwsAssistantQuickActions"
                class="cws-assistant-quick-actions"
            ></div>


            <form
                id="cwsAssistantForm"
                class="cws-assistant-form"
            >

                <label
                    for="cwsAssistantInput"
                    class="sr-only"
                >
                    Ask CWS Assistant
                </label>


                <textarea
                    id="cwsAssistantInput"
                    rows="1"
                    maxlength="300"
                    placeholder="Ask what to do next..."
                    required
                ></textarea>


                <button
                    type="submit"
                    aria-label="Send question"
                >
                    <i class="fa-solid fa-paper-plane"></i>
                </button>

            </form>


            <footer class="cws-assistant-footer">

                <i class="fa-solid fa-shield-halved"></i>

                <span>
                    CWS Academy guidance • Authorized learning only
                </span>

            </footer>

        </section>

    `;


    document.body.appendChild(
        wrapper
    );

}


function getElements() {

    return {

        launcher:
            document.getElementById(
                "cwsAssistantLauncher"
            ),

        panel:
            document.getElementById(
                "cwsAssistantPanel"
            ),

        close:
            document.getElementById(
                "cwsAssistantClose"
            ),

        messages:
            document.getElementById(
                "cwsAssistantMessages"
            ),

        quickActions:
            document.getElementById(
                "cwsAssistantQuickActions"
            ),

        form:
            document.getElementById(
                "cwsAssistantForm"
            ),

        input:
            document.getElementById(
                "cwsAssistantInput"
            )

    };

}


function setPanelOpen(
    elements,
    open
) {

    elements.panel.hidden =
        !open;


    elements.launcher
        .setAttribute(
            "aria-expanded",
            String(open)
        );


    localStorage.setItem(
        STORAGE_KEY,
        open
            ? "true"
            : "false"
    );


    if (open) {

        window.setTimeout(
            () => {

                elements.input
                    ?.focus();

            },
            80
        );

    }

}


/* =========================================================
   HISTORY
========================================================= */

function saveHistory(history) {

    try {

        localStorage.setItem(
            HISTORY_KEY,
            JSON.stringify(
                history.slice(
                    -MAX_HISTORY
                )
            )
        );

    }
    catch {

        // Storage unavailable.

    }

}


function loadHistory() {

    try {

        const parsed =
            JSON.parse(
                localStorage.getItem(
                    HISTORY_KEY
                ) ||
                "[]"
            );


        return Array.isArray(
            parsed
        )
            ? parsed.slice(
                -MAX_HISTORY
            )
            : [];

    }
    catch {

        return [];

    }

}


/* =========================================================
   MESSAGES
========================================================= */

function createMessage(
    elements,
    role,
    text,
    action = null,
    save = true
) {

    const message =
        document.createElement(
            "article"
        );


    message.className =
        `cws-assistant-message ${role}`;


    const bubble =
        document.createElement(
            "div"
        );


    bubble.className =
        "cws-assistant-bubble";


    const paragraph =
        document.createElement(
            "p"
        );


    paragraph.textContent =
        text;


    bubble.appendChild(
        paragraph
    );


    if (
        action &&
        action.label
    ) {

        const link =
            document.createElement(
                "a"
            );


        link.className =
            "cws-assistant-action";


        link.href =
            resolveActionPath(
                action
            );


        link.innerHTML =
            `${action.label} <i class="fa-solid fa-arrow-right"></i>`;


        bubble.appendChild(
            link
        );

    }


    message.appendChild(
        bubble
    );


    elements.messages
        .appendChild(
            message
        );


    elements.messages
        .scrollTop =
        elements.messages
            .scrollHeight;


    if (save) {

        const history =
            loadHistory();


        history.push({
            role,
            text,
            action
        });


        saveHistory(
            history
        );

    }

}


/* =========================================================
   WELCOME
========================================================= */

function restoreHistory(
    elements
) {

    const history =
        loadHistory();


    if (
        history.length
    ) {

        history.forEach(
            item => {

                createMessage(
                    elements,
                    item.role,
                    item.text,
                    item.action ||
                    null,
                    false
                );

            }
        );


        return;

    }


    const pageHint =
        getCurrentPageHint();


    const welcome =
        pageHint
            ? `Hi! I’m the CWS Assistant. ${pageHint} Ask me what to do next, why something is locked, or where to continue.`
            : "Hi! I’m the CWS Assistant. I can help you navigate CWS Academy, understand your next step, and find courses, labs, assessments, progress or certificates.";


    createMessage(
        elements,
        "assistant",
        welcome,
        null,
        true
    );

}


/* =========================================================
   QUICK ACTIONS
========================================================= */

function renderQuickActions(
    elements
) {

    elements.quickActions
        .innerHTML =
        "";


    CWS_ASSISTANT_QUICK_ACTIONS
        .forEach(
            item => {

                const button =
                    document.createElement(
                        "button"
                    );


                button.type =
                    "button";


                button.textContent =
                    item.label;


                button.addEventListener(
                    "click",
                    () => {

                        handleQuestion(
                            elements,
                            item.query
                        );

                    }
                );


                elements.quickActions
                    .appendChild(
                        button
                    );

            }
        );

}


/* =========================================================
   QUESTION HANDLING
========================================================= */

async function handleQuestion(
    elements,
    question
) {

    const trimmed =
        String(
            question ||
            ""
        )
            .trim();


    if (!trimmed) {
        return;
    }


    createMessage(
        elements,
        "user",
        trimmed
    );


    elements.input.value =
        "";


    let response;


    if (
        isNextStepQuestion(
            trimmed
        )
    ) {

        if (
            isStudentPage()
        ) {

            if (
                elements.input
            ) {

                elements.input.disabled =
                    true;

            }


            try {

                response =
                    await getPersonalizedNextStep();

            }
            catch (error) {

                console.warn(
                    "[CWS Assistant] Personalized guidance unavailable:",
                    error
                );

            }
            finally {

                if (
                    elements.input
                ) {

                    elements.input.disabled =
                        false;

                }

            }

        }


        response =
            response ||
            getContextGuidance();

    }
    else {

        response =
            findBestAnswer(
                trimmed
            ) ||
            getFallbackAnswer();

    }


    createMessage(
        elements,
        "assistant",
        response.answer,
        response.action ||
        null
    );

}


/* =========================================================
   INPUT
========================================================= */

function autoGrowInput(input) {

    input.style.height =
        "auto";


    input.style.height =
        `${Math.min(
            input.scrollHeight,
            110
        )}px`;

}


/* =========================================================
   INITIALIZE
========================================================= */

function initializeAssistant() {

    if (
        document.getElementById(
            "cwsAssistant"
        )
    ) {

        return;

    }


    createAssistantMarkup();


    const elements =
        getElements();


    restoreHistory(
        elements
    );


    renderQuickActions(
        elements
    );


    elements.launcher
        ?.addEventListener(
            "click",
            () => {

                setPanelOpen(
                    elements,
                    elements.panel.hidden
                );

            }
        );


    elements.close
        ?.addEventListener(
            "click",
            () => {

                setPanelOpen(
                    elements,
                    false
                );

            }
        );


    elements.form
        ?.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                handleQuestion(
                    elements,
                    elements.input
                        ?.value
                );

            }
        );


    elements.input
        ?.addEventListener(
            "input",
            () => {

                autoGrowInput(
                    elements.input
                );

            }
        );


    elements.input
        ?.addEventListener(
            "keydown",
            event => {

                if (
                    event.key ===
                        "Enter" &&
                    !event.shiftKey
                ) {

                    event.preventDefault();


                    elements.form
                        ?.requestSubmit();

                }

            }
        );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                    "Escape" &&
                !elements.panel.hidden
            ) {

                setPanelOpen(
                    elements,
                    false
                );

            }

        }
    );


    setPanelOpen(
        elements,
        localStorage.getItem(
            STORAGE_KEY
        ) ===
        "true"
    );

}


if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeAssistant
    );

}
else {

    initializeAssistant();

}
