/* =========================================================
   CWS ACADEMY
   PUBLIC SAMPLE LESSON

   This page intentionally contains only a public preview.
   Full lesson content remains inside the authenticated
   student experience.
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const container =
        document.getElementById(
            "lessonsContainer"
        );


    if (!container) {
        return;
    }


    container.innerHTML = `
        <article class="academy-course-card cws-card">
            <div class="academy-course-image">
                <img
                    src="../assets/images/covers/cybersecurity-fundamentals.webp"
                    alt="Cybersecurity Fundamentals sample lesson"
                    width="1280"
                    height="720"
                    decoding="async"
                >
                <span class="course-status free">FREE PREVIEW</span>
            </div>
            <div class="academy-course-content">
                <span class="course-level beginner">BEGINNER â€¢ 10 MINUTES</span>
                <h3>Sample: What Is Cybersecurity?</h3>
                <p>
                    Preview the CWS lesson format: clear explanation,
                    learning outcomes, a practical example and a short
                    knowledge check.
                </p>
                <button
                    id="openSampleLessonBtn"
                    type="button"
                    class="course-start-btn"
                >
                    Open Sample Lesson <span>â†’</span>
                </button>
            </div>
        </article>

        <article class="academy-course-card cws-card">
            <div class="academy-course-content">
                <span class="course-level">STUDENT ACCESS</span>
                <h3>Continue Your Courses</h3>
                <p>
                    Sign in to access complete lessons, videos, browser labs,
                    private notes, assessments, progress and certificates.
                </p>
                <a href="login.html?redirect=courses" class="course-start-btn">
                    Login to Continue <span>â†’</span>
                </a>
            </div>
        </article>
    `;


    const dialog =
        document.createElement(
            "dialog"
        );


    dialog.className =
        "cws-completion-dialog cws-sample-lesson-dialog";


    dialog.innerHTML = `
        <article class="cws-dialog-content">
            <span class="cws-badge">
                <i class="fa-solid fa-shield-halved"></i>
                PUBLIC SAMPLE LESSON
            </span>
            <h2>What Is Cybersecurity?</h2>
            <p>
                Cybersecurity is the practice of protecting systems,
                networks, applications, identities and information from
                unauthorized access, disruption, manipulation and loss.
            </p>

            <h3>What you will learn</h3>
            <ul>
                <li>Recognize common digital assets and security risks.</li>
                <li>Explain the relationship between threats, vulnerabilities and controls.</li>
                <li>Understand why authorization and professional ethics matter.</li>
            </ul>

            <div class="cws-alert warning">
                <i class="fa-solid fa-scale-balanced"></i>
                <div>
                    <strong>Authorized practice only</strong>
                    <p>
                        Use cybersecurity techniques only on systems you own
                        or have explicit permission to assess.
                    </p>
                </div>
            </div>

            <h3>Example command</h3>
            <div class="cws-code-block">
                <div class="cws-code-header">
                    <span>SAFE LAB EXAMPLE</span>
                    <button id="copySampleCommandBtn" type="button" class="cws-copy-btn">
                        <i class="fa-regular fa-copy"></i> Copy
                    </button>
                </div>
                <pre><code>nmap -sn 192.168.56.0/24</code></pre>
            </div>
            <p>
                In an isolated, authorized home lab, this command performs
                host discovery without running a port scan. The full lesson
                explains scope, expected output and evidence handling.
            </p>

            <details class="cws-hint-card" open>
                <summary>
                    <span><i class="fa-regular fa-lightbulb"></i> Why does this matter?</span>
                    <i class="fa-solid fa-chevron-down"></i>
                </summary>
                <p>
                    Security decisions become useful when technical findings
                    are connected to assets, business impact and appropriate controls.
                </p>
            </details>

            <div class="cws-dialog-actions">
                <button id="closeSampleLessonBtn" type="button" class="cws-btn cws-btn-secondary">
                    Close Preview
                </button>
                <a href="register.html" class="cws-btn cws-btn-primary">
                    Create Free Account
                </a>
            </div>
        </article>
    `;


    document.body.appendChild(
        dialog
    );


    document
        .getElementById(
            "openSampleLessonBtn"
        )
        ?.addEventListener(
            "click",
            () => dialog.showModal()
        );


    document
        .getElementById(
            "closeSampleLessonBtn"
        )
        ?.addEventListener(
            "click",
            () => dialog.close()
        );


    document
        .getElementById(
            "copySampleCommandBtn"
        )
        ?.addEventListener(
            "click",
            async event => {
                const button =
                    event.currentTarget;

                try {
                    await navigator.clipboard.writeText(
                        "nmap -sn 192.168.56.0/24"
                    );
                    button.innerHTML =
                        '<i class="fa-solid fa-check"></i> Copied';
                } catch {
                    button.textContent =
                        "Copy unavailable";
                }
            }
        );
});
