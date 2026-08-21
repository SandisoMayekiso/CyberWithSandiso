/* =========================================================
   CWS ACADEMY
   PREMIUM LESSON TOOLS

   Browser-safe enhancements for GitHub Pages:
   - lesson search
   - bookmarks and private device notes
   - downloadable summaries/resources
   - copyable code and command blocks
   - expandable learning hints
   - completion confirmation
   - safe simulated terminal
   - exact reading-position resume
========================================================= */


let activeContext = null;
let storageKey = "";
let scrollSaveTimer = null;
let searchMarks = [];
let commandHistory = [];
let commandHistoryIndex = 0;


function byId(id) {
    return document.getElementById(id);
}


function escapeHTML(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function safeFileName(value) {
    return String(value || "lesson")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "lesson";
}


function readLocalState() {
    if (!storageKey) {
        return {};
    }

    try {
        return JSON.parse(localStorage.getItem(storageKey) || "{}") || {};
    } catch {
        return {};
    }
}


function writeLocalState(update) {
    if (!storageKey) {
        return;
    }

    const next = {
        ...readLocalState(),
        ...update,
        updatedAt: new Date().toISOString()
    };

    try {
        localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
        // The lesson remains usable when private browsing blocks storage.
    }
}


function showToast(message, type = "success") {
    const toast = byId("lessonToolToast");

    if (!toast) {
        return;
    }

    toast.textContent = message;
    toast.className = `cws-tool-toast ${type}`;
    toast.hidden = false;

    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => {
        toast.hidden = true;
    }, 2600);
}


function downloadText(filename, content) {
    const blob = new Blob([content], {
        type: "text/plain;charset=utf-8"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
}


function buildLessonSummary() {
    const { course, module, lesson } = activeContext;
    const objectives = Array.isArray(lesson.objectives)
        ? lesson.objectives
        : [];
    const concepts = Array.isArray(lesson.keyConcepts)
        ? lesson.keyConcepts
        : [];

    return [
        "CWS ACADEMY LESSON SUMMARY",
        "==========================",
        `Course: ${course.title}`,
        `Module: ${module.title}`,
        `Lesson: ${lesson.title}`,
        `Duration: ${lesson.duration || "Self-paced"}`,
        "",
        lesson.subtitle || "",
        "",
        "LEARNING OBJECTIVES",
        ...objectives.map((item, index) => `${index + 1}. ${item}`),
        "",
        "KEY CONCEPTS",
        ...concepts.map(item => `- ${item.title}: ${item.description}`),
        "",
        "PERSONAL NOTES",
        readLocalState().notes || "No notes saved for this lesson.",
        "",
        "Use all cybersecurity techniques only in systems you own or are explicitly authorized to assess."
    ].join("\n");
}


function updateBookmarkUI() {
    const button = byId("lessonBookmarkBtn");

    if (!button) {
        return;
    }

    const bookmarked = readLocalState().bookmarked === true;
    button.classList.toggle("active", bookmarked);
    button.setAttribute("aria-pressed", String(bookmarked));
    button.innerHTML = bookmarked
        ? '<i class="fa-solid fa-bookmark"></i><span>Bookmarked</span>'
        : '<i class="fa-regular fa-bookmark"></i><span>Bookmark</span>';
}


function toggleBookmark() {
    const bookmarked = readLocalState().bookmarked === true;
    writeLocalState({ bookmarked: !bookmarked });
    updateBookmarkUI();
    showToast(bookmarked ? "Bookmark removed." : "Lesson bookmarked.");
}


function setupNotes() {
    const toggle = byId("lessonNotesToggle");
    const panel = byId("lessonNotesPanel");
    const textarea = byId("lessonNotesInput");
    const saveButton = byId("saveLessonNotesBtn");

    if (!toggle || !panel || !textarea || !saveButton) {
        return;
    }

    textarea.value = readLocalState().notes || "";

    toggle.addEventListener("click", () => {
        panel.hidden = !panel.hidden;
        toggle.setAttribute("aria-expanded", String(!panel.hidden));

        if (!panel.hidden) {
            textarea.focus();
        }
    });

    saveButton.addEventListener("click", () => {
        writeLocalState({ notes: textarea.value.trim() });
        showToast("Lesson notes saved on this device.");
    });
}


function unwrapSearchMarks() {
    searchMarks.forEach(mark => {
        if (!mark.isConnected) {
            return;
        }

        mark.replaceWith(document.createTextNode(mark.textContent || ""));
    });

    searchMarks = [];
    activeContext?.contentRoot?.normalize();
}


function getSearchableTextNodes(root) {
    const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode(node) {
                const parent = node.parentElement;
                const text = node.nodeValue?.trim();

                if (!parent || !text) {
                    return NodeFilter.FILTER_REJECT;
                }

                if (parent.closest("script, style, input, textarea, button, .cws-lesson-toolbar, .cws-terminal-card, .cws-tool-toast")) {
                    return NodeFilter.FILTER_REJECT;
                }

                return NodeFilter.FILTER_ACCEPT;
            }
        }
    );
    const nodes = [];

    while (walker.nextNode() && nodes.length < 1200) {
        nodes.push(walker.currentNode);
    }

    return nodes;
}


function searchLesson(query) {
    const status = byId("lessonSearchStatus");
    const normalized = String(query || "").trim();

    unwrapSearchMarks();

    if (normalized.length < 2) {
        if (status) {
            status.textContent = normalized
                ? "Enter at least two characters."
                : "";
        }
        return;
    }

    const lowerQuery = normalized.toLowerCase();
    const nodes = getSearchableTextNodes(activeContext.contentRoot);
    let count = 0;

    nodes.forEach(node => {
        if (count >= 100) {
            return;
        }

        const text = node.nodeValue || "";
        const lowerText = text.toLowerCase();
        let cursor = 0;
        let index = lowerText.indexOf(lowerQuery, cursor);

        if (index === -1) {
            return;
        }

        const fragment = document.createDocumentFragment();

        while (index !== -1 && count < 100) {
            fragment.appendChild(document.createTextNode(text.slice(cursor, index)));

            const mark = document.createElement("mark");
            mark.className = "cws-search-hit";
            mark.textContent = text.slice(index, index + normalized.length);
            fragment.appendChild(mark);
            searchMarks.push(mark);
            count += 1;

            cursor = index + normalized.length;
            index = lowerText.indexOf(lowerQuery, cursor);
        }

        fragment.appendChild(document.createTextNode(text.slice(cursor)));
        node.replaceWith(fragment);
    });

    if (status) {
        status.textContent = count
            ? `${count} match${count === 1 ? "" : "es"} found.`
            : "No matches found.";
    }

    searchMarks[0]?.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}


function setupSearch() {
    const input = byId("lessonSearchInput");
    const button = byId("lessonSearchBtn");
    const clear = byId("lessonSearchClearBtn");

    if (!input || !button || !clear) {
        return;
    }

    const run = () => searchLesson(input.value);

    button.addEventListener("click", run);
    input.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            event.preventDefault();
            run();
        }
    });
    clear.addEventListener("click", () => {
        input.value = "";
        unwrapSearchMarks();
        byId("lessonSearchStatus").textContent = "";
        input.focus();
    });
}


async function copyText(text, button) {
    try {
        await navigator.clipboard.writeText(text);
    } catch {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
    }

    const original = button.innerHTML;
    button.innerHTML = '<i class="fa-solid fa-check"></i> Copied';
    button.classList.add("copied");

    window.setTimeout(() => {
        button.innerHTML = original;
        button.classList.remove("copied");
    }, 1600);
}


function enhanceCodeBlocks() {
    const blocks = activeContext.contentRoot.querySelectorAll("pre");

    blocks.forEach(pre => {
        if (pre.closest(".cws-code-block, .cws-terminal-card")) {
            return;
        }

        const wrapper = document.createElement("div");
        const header = document.createElement("div");
        const label = document.createElement("span");
        const button = document.createElement("button");
        const code = pre.querySelector("code");
        const language = code?.className?.match(/language-([\w-]+)/)?.[1];

        wrapper.className = "cws-code-block";
        header.className = "cws-code-header";
        label.textContent = language ? language.toUpperCase() : "COMMAND / CODE";
        button.type = "button";
        button.className = "cws-copy-btn";
        button.innerHTML = '<i class="fa-regular fa-copy"></i> Copy';
        button.setAttribute("aria-label", "Copy code block");
        button.addEventListener("click", () => copyText(pre.innerText, button));

        header.append(label, button);
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.append(header, pre);
    });

    activeContext.contentRoot
        .querySelectorAll(":not(pre) > code")
        .forEach(code => {
            if (code.closest(".cws-code-block, .cws-terminal-card, button")) {
                return;
            }

            code.classList.add("cws-inline-code");
            code.title = "Click to copy";
            code.tabIndex = 0;
            const copy = () => copyText(code.textContent || "", code);
            code.addEventListener("click", copy);
            code.addEventListener("keydown", event => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    copy();
                }
            });
        });
}


function renderHints() {
    const mount = byId("lessonHintsMount");

    if (!mount) {
        return;
    }

    const lessonHints = Array.isArray(activeContext.lesson.hints)
        ? activeContext.lesson.hints
        : [];
    const hints = lessonHints.length
        ? lessonHints
        : [
            {
                title: "How should I study this lesson?",
                content: "Read each section, connect the concept to a realistic system, then explain it in your own words before attempting the knowledge check."
            },
            {
                title: "What should I do if I get stuck?",
                content: "Review the learning objectives and worked examples, use lesson search to find the unfamiliar term, and write the remaining question in your private notes."
            }
        ];

    mount.innerHTML = hints.map((hint, index) => `
        <details class="cws-hint-card" ${index === 0 ? "open" : ""}>
            <summary>
                <span><i class="fa-regular fa-lightbulb"></i>${escapeHTML(hint.title || `Hint ${index + 1}`)}</span>
                <i class="fa-solid fa-chevron-down"></i>
            </summary>
            <p>${escapeHTML(hint.content || "Review the relevant lesson section and try the activity again.")}</p>
        </details>
    `).join("");
}


function renderResources() {
    const section = byId("lessonResourcesSection");
    const mount = byId("lessonResources");

    if (!section || !mount) {
        return;
    }

    const resources = Array.isArray(activeContext.lesson.resources)
        ? activeContext.lesson.resources
        : [];

    mount.innerHTML = "";

    const summaryButton = document.createElement("button");
    summaryButton.type = "button";
    summaryButton.className = "cws-resource-card";
    summaryButton.innerHTML = `
        <i class="fa-solid fa-file-arrow-down"></i>
        <span><strong>Lesson summary</strong><small>TXT â€¢ Generated from this lesson</small></span>
        <i class="fa-solid fa-download"></i>
    `;
    summaryButton.addEventListener("click", () => {
        downloadText(`${safeFileName(activeContext.lesson.title)}-summary.txt`, buildLessonSummary());
    });
    mount.appendChild(summaryButton);

    resources.forEach(resource => {
        const link = document.createElement("a");
        link.className = "cws-resource-card";
        link.href = resource.url || "#";
        link.target = resource.external ? "_blank" : "_self";
        link.rel = resource.external ? "noopener noreferrer" : "";
        if (resource.download) {
            link.download = resource.download === true ? "" : resource.download;
        }
        link.innerHTML = `
            <i class="${escapeHTML(resource.icon || "fa-solid fa-paperclip")}"></i>
            <span><strong>${escapeHTML(resource.title || "Lesson resource")}</strong><small>${escapeHTML(resource.description || "Supporting material")}</small></span>
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
        `;
        mount.appendChild(link);
    });

    section.hidden = false;
}


function terminalResult(command) {
    const value = command.trim();
    const normalized = value.toLowerCase();

    if (!value) return "";
    if (normalized === "help") return "Available commands: help, clear, whoami, pwd, ls, cat README.txt, uname -a, ip addr, history, echo <text>, nmap -sn 192.168.56.0/24";
    if (normalized === "whoami") return "cws-student";
    if (normalized === "pwd") return "/home/cws-student/academy-lab";
    if (normalized === "ls" || normalized === "ls -la") return "README.txt  evidence/  notes/  targets.txt";
    if (normalized === "cat readme.txt") return "CWS Academy browser lab. All output is simulated. Use real security tools only in authorized environments.";
    if (normalized === "uname -a") return "Linux cws-browser-lab 6.8.0-cws #1 SMP x86_64 GNU/Linux (simulated)";
    if (normalized === "ip addr" || normalized === "ip a") return "1: lo    inet 127.0.0.1/8\n2: eth0  inet 192.168.56.100/24 (simulated lab adapter)";
    if (normalized === "history") return commandHistory.map((item, index) => `${index + 1}  ${item}`).join("\n");
    if (normalized.startsWith("echo ")) return value.slice(5);
    if (normalized === "nmap -sn 192.168.56.0/24") return "Starting Nmap (simulated)\nHost 192.168.56.10 appears up\nHost 192.168.56.100 appears up\nScan complete: 2 simulated hosts.";
    return `cws-lab: command not available in this safe simulation: ${value}\nType 'help' to view supported commands.`;
}


function appendTerminalOutput(command, result) {
    const output = byId("cwsTerminalOutput");

    if (!output) {
        return;
    }

    const entry = document.createElement("div");
    entry.className = "cws-terminal-entry";
    entry.innerHTML = `<div><span class="cws-terminal-prompt">cws-student@academy:~$</span> ${escapeHTML(command)}</div>`;

    if (result) {
        const pre = document.createElement("pre");
        pre.textContent = result;
        entry.appendChild(pre);
    }

    output.appendChild(entry);
    output.scrollTop = output.scrollHeight;
}


function setupTerminal() {
    const section = byId("cwsTerminalSection");
    const form = byId("cwsTerminalForm");
    const input = byId("cwsTerminalInput");
    const output = byId("cwsTerminalOutput");

    if (!section || !form || !input || !output) {
        return;
    }

    section.hidden = false;
    output.innerHTML = "";
    appendTerminalOutput("cat README.txt", terminalResult("cat README.txt"));

    form.addEventListener("submit", event => {
        event.preventDefault();
        const command = input.value.trim();

        if (!command) {
            return;
        }

        commandHistory.push(command);
        commandHistoryIndex = commandHistory.length;

        if (command.toLowerCase() === "clear") {
            output.innerHTML = "";
        } else {
            appendTerminalOutput(command, terminalResult(command));
        }

        input.value = "";
    });

    input.addEventListener("keydown", event => {
        if (event.key === "ArrowUp" && commandHistory.length) {
            event.preventDefault();
            commandHistoryIndex = Math.max(0, commandHistoryIndex - 1);
            input.value = commandHistory[commandHistoryIndex] || "";
        }

        if (event.key === "ArrowDown" && commandHistory.length) {
            event.preventDefault();
            commandHistoryIndex = Math.min(commandHistory.length, commandHistoryIndex + 1);
            input.value = commandHistory[commandHistoryIndex] || "";
        }
    });
}


function setupCompletionConfirmation(onConfirmComplete) {
    const button = byId("completeLessonBtn");
    const dialog = byId("lessonCompletionDialog");
    const confirmButton = byId("confirmLessonCompletionBtn");
    const cancelButton = byId("cancelLessonCompletionBtn");

    if (!button || !dialog || !confirmButton || !cancelButton) {
        return;
    }

    button.addEventListener("click", () => {
        if (button.disabled) {
            return;
        }

        if (typeof dialog.showModal === "function") {
            dialog.showModal();
        } else {
            dialog.setAttribute("open", "");
        }
    });

    cancelButton.addEventListener("click", () => dialog.close());
    confirmButton.addEventListener("click", async () => {
        confirmButton.disabled = true;

        try {
            await onConfirmComplete();
            dialog.close();
            showToast("Lesson completion saved.");
        } finally {
            confirmButton.disabled = false;
        }
    });

    dialog.addEventListener("click", event => {
        if (event.target === dialog) {
            dialog.close();
        }
    });
}


function setupReadingPosition() {
    const state = readLocalState();
    const previousY = Number(state.scrollY || 0);

    if (previousY > 200 && !window.location.hash) {
        window.requestAnimationFrame(() => {
            window.scrollTo({ top: previousY, behavior: "auto" });
            showToast("Resumed your previous reading position.", "info");
        });
    }

    window.addEventListener("scroll", () => {
        window.clearTimeout(scrollSaveTimer);
        scrollSaveTimer = window.setTimeout(() => {
            writeLocalState({ scrollY: Math.round(window.scrollY) });
        }, 350);
    }, { passive: true });
}


export function initializeLessonTools({
    userId,
    course,
    module,
    lesson,
    contentRoot,
    onConfirmComplete
}) {
    if (!course || !module || !lesson || !contentRoot || typeof onConfirmComplete !== "function") {
        return;
    }

    activeContext = {
        userId: userId || "guest",
        course,
        module,
        lesson,
        contentRoot
    };
    storageKey = [
        "cwsLessonExperience:v1",
        userId || "guest",
        course.id,
        module.id,
        lesson.id
    ].join(":");

    byId("downloadLessonSummaryBtn")?.addEventListener("click", () => {
        downloadText(`${safeFileName(lesson.title)}-summary.txt`, buildLessonSummary());
    });
    byId("lessonBookmarkBtn")?.addEventListener("click", toggleBookmark);

    updateBookmarkUI();
    setupNotes();
    setupSearch();
    enhanceCodeBlocks();
    renderHints();
    renderResources();
    setupTerminal();
    setupCompletionConfirmation(onConfirmComplete);
    setupReadingPosition();
}
