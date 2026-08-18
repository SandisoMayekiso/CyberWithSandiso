/* =========================================================
   CWS ACADEMY
   SITE ASSISTANT
   File: js/cws-assistant.js
========================================================= */

"use strict";

import {
    CWS_ASSISTANT_KNOWLEDGE,
    CWS_ASSISTANT_QUICK_ACTIONS
} from "./cws-assistant-knowledge.js";


const STORAGE_KEY =
    "cwsAssistantOpen";

const HISTORY_KEY =
    "cwsAssistantHistory";

const MAX_HISTORY =
    14;


function isStudentPage() {

    return window.location.pathname
        .toLowerCase()
        .includes("/student/");

}


function isNestedPublicPage() {

    return window.location.pathname
        .toLowerCase()
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


function resolveActionPath(action) {

    const context =
        getSiteContext();


    if (
        context ===
        "student"
    ) {

        return action.studentPath ||
            action.nestedPublicPath ||
            action.publicPath ||
            "#";

    }


    if (
        context ===
        "nested-public"
    ) {

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

                const keywordTokens =
                    tokenize(
                        keyword
                    );


                keywordTokens.forEach(
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


function getFallbackAnswer() {

    return {
        answer:
            "I can help with CWS Academy courses, Free vs Pro, labs, assessments, progress, certificates, account access and site navigation. Try asking something like “How do labs work?” or “What is CWS Pro?”",
        action: {
            label: "Browse Courses",
            publicPath: "pages/courses.html",
            nestedPublicPath: "courses.html",
            studentPath: "student-courses.html"
        }
    };

}


function getCurrentPageHint() {

    const path =
        window.location.pathname
            .toLowerCase();


    if (
        path.includes(
            "certificates"
        )
    ) {

        return "You are currently in the Certificates area.";

    }


    if (
        path.includes(
            "assessment"
        )
    ) {

        return "You are currently in the Assessments area.";

    }


    if (
        path.includes(
            "lab"
        )
    ) {

        return "You are currently in the Labs area.";

    }


    if (
        path.includes(
            "course"
        )
    ) {

        return "You are currently viewing CWS Academy course content.";

    }


    if (
        path.includes(
            "progress"
        )
    ) {

        return "You are currently in the Progress area.";

    }


    return "";

}


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
                            Academy help & navigation
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
                    placeholder="Ask about CWS Academy..."
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
                    CWS site assistant • Not a general hacking assistant
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


    document.body
        .classList
        .toggle(
            "cws-assistant-open",
            open
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

        // Local storage may be disabled.

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
            ? `Hi! I’m the CWS Assistant. ${pageHint} Ask me about courses, labs, assessments, progress, certificates or Free vs Pro.`
            : "Hi! I’m the CWS Assistant. I can help you navigate CWS Academy and answer questions about courses, labs, assessments, certificates and Free vs Pro.";


    createMessage(
        elements,
        "assistant",
        welcome,
        null,
        true
    );

}


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


function handleQuestion(
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


    const match =
        findBestAnswer(
            trimmed
        );


    const response =
        match ||
        getFallbackAnswer();


    window.setTimeout(
        () => {

            createMessage(
                elements,
                "assistant",
                response.answer,
                response.action ||
                null
            );

        },
        180
    );

}


function autoGrowInput(input) {

    input.style.height =
        "auto";


    input.style.height =
        `${Math.min(
            input.scrollHeight,
            110
        )}px`;

}


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

                const open =
                    elements.panel
                        .hidden;


                setPanelOpen(
                    elements,
                    open
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


    document
        .addEventListener(
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


    const shouldOpen =
        localStorage.getItem(
            STORAGE_KEY
        ) ===
        "true";


    setPanelOpen(
        elements,
        shouldOpen
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
