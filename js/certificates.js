/* =========================================================
   CWS ACADEMY
   CERTIFICATES CONTROLLER
========================================================= */


const CERTIFICATES = [

    /*
     * Earned certificates will eventually come
     * from Firebase.
     *
     * Example:
     *
     * {
     *     id: "cybersecurity-fundamentals",
     *     title: "Cybersecurity Fundamentals",
     *     description: "...",
     *     issuedDate: "...",
     *     credentialId: "...",
     *     earned: true
     * }
     */

];


const CERTIFICATE_PATHS = [

    {
        id: "cybersecurity-fundamentals",
        title: "Cybersecurity Fundamentals",
        description:
            "Build a strong foundation in cybersecurity concepts, threats, vulnerabilities and security practices.",
        icon: "fa-shield-halved",
        level: "BEGINNER",
        progress: 0,
        status: "Available"
    },

    {
        id: "networking-fundamentals",
        title: "Networking Fundamentals",
        description:
            "Understand networking concepts and protocols from a cybersecurity perspective.",
        icon: "fa-network-wired",
        level: "BEGINNER",
        progress: 0,
        status: "Available"
    },

    {
        id: "linux-fundamentals",
        title: "Linux Fundamentals",
        description:
            "Develop Linux command-line, filesystem, permissions and security fundamentals.",
        icon: "fa-terminal",
        level: "BEGINNER",
        progress: 0,
        status: "Available"
    },

    {
        id: "ethical-hacking-fundamentals",
        title: "Ethical Hacking Fundamentals",
        description:
            "Explore reconnaissance, enumeration, vulnerability identification and professional security testing.",
        icon: "fa-user-secret",
        level: "INTERMEDIATE",
        progress: 0,
        status: "Planned"
    },

    {
        id: "web-application-security",
        title: "Web Application Security",
        description:
            "Explore authentication, sessions, input validation and common web security weaknesses.",
        icon: "fa-globe",
        level: "INTERMEDIATE",
        progress: 0,
        status: "Planned"
    },

    {
        id: "penetration-testing",
        title: "Practical Penetration Testing",
        description:
            "Bring reconnaissance, enumeration, vulnerability analysis and reporting together.",
        icon: "fa-user-shield",
        level: "ADVANCED",
        progress: 0,
        status: "Planned"
    }

];



/* =========================================================
   SAFE NUMBER
========================================================= */

function safeNumber(value) {

    const number =
        Number(value);

    if (!Number.isFinite(number)) {
        return 0;
    }

    return Math.min(
        Math.max(number, 0),
        100
    );

}



/* =========================================================
   FORMAT DATE
========================================================= */

function formatCertificateDate(dateValue) {

    if (!dateValue) {
        return "Date unavailable";
    }

    const date =
        new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return "Date unavailable";
    }

    return date.toLocaleDateString(
        undefined,
        {
            year: "numeric",
            month: "short",
            day: "numeric"
        }
    );

}



/* =========================================================
   UPDATE STATISTICS
========================================================= */

function updateCertificateStatistics() {

    const earned =
        CERTIFICATES.length;

    const available =
        CERTIFICATE_PATHS.length;

    const completedCourses =
        CERTIFICATES.filter(
            certificate =>
                certificate.courseCompleted === true
        ).length;

    const achievements =
        earned;


    const earnedElement =
        document.getElementById(
            "certificatesEarned"
        );

    const availableElement =
        document.getElementById(
            "certificatesAvailable"
        );

    const coursesElement =
        document.getElementById(
            "coursesCompleted"
        );

    const achievementsElement =
        document.getElementById(
            "achievementCount"
        );


    if (earnedElement) {

        earnedElement.textContent =
            earned;
    }


    if (availableElement) {

        availableElement.textContent =
            available;
    }


    if (coursesElement) {

        coursesElement.textContent =
            completedCourses;
    }


    if (achievementsElement) {

        achievementsElement.textContent =
            achievements;
    }

}



/* =========================================================
   EARNED CERTIFICATE CARD
========================================================= */

function createCertificateCard(certificate) {

    const card =
        document.createElement("article");

    card.className =
        "certificate-card";


    const date =
        formatCertificateDate(
            certificate.issuedDate
        );


    card.innerHTML = `

        <div class="certificate-preview">

            <div class="certificate-preview-icon">

                <i class="fa-solid fa-certificate"></i>

            </div>

            <small>
                CWS ACADEMY
            </small>

            <strong>
                ${certificate.title}
            </strong>

        </div>


        <div class="certificate-card-content">

            <h3>
                ${certificate.title}
            </h3>

            <p>
                ${certificate.description || "CWS Academy achievement certificate."}
            </p>


            <div class="certificate-meta">

                <span>

                    <i class="fa-solid fa-calendar"></i>

                    ${date}

                </span>


                <span>

                    <i class="fa-solid fa-shield-halved"></i>

                    Verified

                </span>

            </div>


            <div class="certificate-card-actions">

                <button
                    type="button"
                    class="certificate-view-btn"
                    data-certificate-id="${certificate.id}"
                >

                    <i class="fa-solid fa-eye"></i>

                    View Certificate

                </button>

            </div>

        </div>

    `;


    return card;

}



/* =========================================================
   RENDER EARNED CERTIFICATES
========================================================= */

function renderEarnedCertificates() {

    const container =
        document.getElementById(
            "earnedCertificatesGrid"
        );

    const emptyState =
        document.getElementById(
            "noCertificates"
        );

    const count =
        document.getElementById(
            "earnedCertificateCount"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (count) {

        count.textContent =
            `${CERTIFICATES.length} Earned`;
    }


    if (!CERTIFICATES.length) {

        if (emptyState) {
            emptyState.hidden = false;
        }

        return;
    }


    if (emptyState) {
        emptyState.hidden = true;
    }


    CERTIFICATES.forEach(
        certificate => {

            container.appendChild(
                createCertificateCard(
                    certificate
                )
            );

        }
    );

}



/* =========================================================
   UPCOMING CERTIFICATE CARD
========================================================= */

function createUpcomingCertificateCard(path) {

    const card =
        document.createElement("article");

    card.className =
        "upcoming-certificate-card";


    const progress =
        safeNumber(path.progress);


    card.innerHTML = `

        <div class="upcoming-icon">

            <i class="fa-solid ${path.icon}"></i>

        </div>


        <span class="course-level">

            ${path.level}

        </span>


        <h3>
            ${path.title}
        </h3>


        <p>
            ${path.description}
        </p>


        <div class="upcoming-progress-label">

            <span>
                Progress
            </span>

            <strong>
                ${progress}%
            </strong>

        </div>


        <div class="upcoming-progress-track">

            <div
                class="upcoming-progress-bar"
                style="width:${progress}%"
            ></div>

        </div>

    `;


    return card;

}



/* =========================================================
   RENDER UPCOMING
========================================================= */

function renderUpcomingCertificates() {

    const container =
        document.getElementById(
            "upcomingCertificatesGrid"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    CERTIFICATE_PATHS.forEach(
        path => {

            container.appendChild(
                createUpcomingCertificateCard(
                    path
                )
            );

        }
    );

}



/* =========================================================
   MODAL
========================================================= */

function createCertificateModal() {

    if (
        document.getElementById(
            "certificateModal"
        )
    ) {

        return;
    }


    const modal =
        document.createElement("div");

    modal.id =
        "certificateModal";

    modal.className =
        "certificate-modal";

    modal.hidden = true;


    modal.innerHTML = `

        <div
            class="certificate-modal-content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="certificateModalTitle"
        >

            <button
                type="button"
                class="certificate-modal-close"
                id="certificateModalClose"
                aria-label="Close certificate"
            >

                <i class="fa-solid fa-xmark"></i>

            </button>


            <div
                id="certificateModalBody"
                class="certificate-modal-preview"
            >

            </div>

        </div>

    `;


    document.body.appendChild(
        modal
    );


    const closeButton =
        document.getElementById(
            "certificateModalClose"
        );


    closeButton?.addEventListener(
        "click",
        closeCertificateModal
    );


    modal.addEventListener(
        "click",
        event => {

            if (
                event.target === modal
            ) {

                closeCertificateModal();

            }

        }
    );

}



/* =========================================================
   OPEN MODAL
========================================================= */

function openCertificateModal(
    certificateId
) {

    const certificate =
        CERTIFICATES.find(
            item =>
                item.id === certificateId
        );


    if (!certificate) {
        return;
    }


    const modal =
        document.getElementById(
            "certificateModal"
        );

    const body =
        document.getElementById(
            "certificateModalBody"
        );


    if (!modal || !body) {
        return;
    }


    const date =
        formatCertificateDate(
            certificate.issuedDate
        );


    body.innerHTML = `

        <i class="fa-solid fa-certificate"></i>

        <h2 id="certificateModalTitle">
            ${certificate.title}
        </h2>

        <p>
            ${certificate.description || "CWS Academy achievement certificate."}
        </p>

        <p>
            Issued:
            <strong>
                ${date}
            </strong>
        </p>

        ${
            certificate.credentialId
                ? `
                    <p>
                        Credential ID:
                        <strong>
                            ${certificate.credentialId}
                        </strong>
                    </p>
                `
                : ""
        }

    `;


    modal.hidden =
        false;


    document.body.style.overflow =
        "hidden";

}



/* =========================================================
   CLOSE MODAL
========================================================= */

function closeCertificateModal() {

    const modal =
        document.getElementById(
            "certificateModal"
        );


    if (!modal) {
        return;
    }


    modal.hidden =
        true;


    document.body.style.overflow =
        "";

}



/* =========================================================
   CERTIFICATE CLICK HANDLER
========================================================= */

function setupCertificateActions() {

    document.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    "[data-certificate-id]"
                );


            if (!button) {
                return;
            }


            const certificateId =
                button.dataset.certificateId;


            openCertificateModal(
                certificateId
            );

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeCertificateModal();

            }

        }
    );

}



/* =========================================================
   INITIALISE
========================================================= */

function initialiseCertificatesPage() {

    createCertificateModal();

    updateCertificateStatistics();

    renderEarnedCertificates();

    renderUpcomingCertificates();

    setupCertificateActions();

}


document.addEventListener(
    "DOMContentLoaded",
    initialiseCertificatesPage
);
