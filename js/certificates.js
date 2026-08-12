/* =========================================================
   CWS ACADEMY
   STUDENT CERTIFICATES
   Firebase Authentication + Firestore
========================================================= */

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

import {
    collection,
    getDocs,
    query,
    where,
    orderBy
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

import {
    auth,
    db
} from "./firebase-config.js";


/* =========================================================
   DEBUG
========================================================= */

console.log(
    "CWS Academy certificates.js loaded."
);


/* =========================================================
   ELEMENTS
========================================================= */

const studentName =
    document.getElementById("studentName");

const logoutBtn =
    document.getElementById("logoutBtn");

const certificatesGrid =
    document.getElementById("certificatesGrid");

const certificateCount =
    document.getElementById("certificateCount");

const noCertificatesMessage =
    document.getElementById("noCertificatesMessage");

const certificatesLoading =
    document.getElementById("certificatesLoading");


/* =========================================================
   GET USER NAME
========================================================= */

function getUserName(user) {

    if (user?.displayName) {

        return user.displayName.trim();

    }


    if (user?.email) {

        const emailName =
            user.email
                .split("@")[0]
                .trim();

        if (emailName) {

            return emailName;

        }

    }


    return "Student";

}


/* =========================================================
   DISPLAY USER
========================================================= */

function displayUser(user) {

    const name =
        getUserName(user);


    if (studentName) {

        studentName.textContent =
            name;

    }


    console.log(
        "Authenticated certificate user:",
        {
            uid: user.uid,
            email: user.email,
            name
        }
    );

}


/* =========================================================
   LOADING STATE
========================================================= */

function showLoading() {

    if (certificatesLoading) {

        certificatesLoading.hidden =
            false;

    }


    if (certificatesGrid) {

        certificatesGrid.innerHTML =
            "";

    }


    if (noCertificatesMessage) {

        noCertificatesMessage.hidden =
            true;

    }

}


/* =========================================================
   HIDE LOADING
========================================================= */

function hideLoading() {

    if (certificatesLoading) {

        certificatesLoading.hidden =
            true;

    }

}


/* =========================================================
   UPDATE COUNT
========================================================= */

function updateCertificateCount(count) {

    if (!certificateCount) {

        return;

    }


    certificateCount.textContent =
        `${count} ${
            count === 1
                ? "Certificate"
                : "Certificates"
        }`;

}


/* =========================================================
   EMPTY STATE
========================================================= */

function showEmptyState() {

    hideLoading();


    if (certificatesGrid) {

        certificatesGrid.innerHTML =
            "";

    }


    if (noCertificatesMessage) {

        noCertificatesMessage.hidden =
            false;

    }


    updateCertificateCount(0);

}


/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(value) {

    if (!value) {

        return "Date unavailable";

    }


    let date;


    /*
     * Firestore Timestamp
     */

    if (
        typeof value === "object" &&
        typeof value.toDate === "function"
    ) {

        date =
            value.toDate();

    }


    /*
     * JavaScript Date
     */

    else if (
        value instanceof Date
    ) {

        date =
            value;

    }


    /*
     * String / timestamp
     */

    else {

        date =
            new Date(value);

    }


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "Date unavailable";

    }


    return new Intl.DateTimeFormat(
        "en-US",
        {
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    ).format(date);

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   CREATE CERTIFICATE CARD
========================================================= */

function createCertificateCard(
    certificate
) {

    const card =
        document.createElement(
            "article"
        );


    card.className =
        "certificate-card";


    const certificateId =
        escapeHTML(
            certificate.certificateId ||
            certificate.id ||
            "CWS-CERTIFICATE"
        );


    const courseName =
        escapeHTML(
            certificate.courseName ||
            certificate.course ||
            "CWS Academy Course"
        );


    const issuedDate =
        formatDate(
            certificate.issuedAt ||
            certificate.completedAt ||
            certificate.createdAt
        );


    const verificationUrl =
        certificate.verificationUrl ||
        "";


    card.innerHTML = `

        <div class="certificate-card-header">

            <span class="certificate-status">

                <i class="fa-solid fa-circle-check"></i>

                EARNED

            </span>

        </div>


        <div class="certificate-icon">

            <i class="fa-solid fa-certificate"></i>

        </div>


        <div class="certificate-card-content">

            <span class="certificate-label">
                CWS ACADEMY CERTIFICATE
            </span>


            <h3>
                ${courseName}
            </h3>


            <div class="certificate-details">


                <div>

                    <span>
                        Certificate ID
                    </span>

                    <strong>
                        ${certificateId}
                    </strong>

                </div>


                <div>

                    <span>
                        Issued
                    </span>

                    <strong>
                        ${issuedDate}
                    </strong>

                </div>

            </div>


            <div class="certificate-actions">

                ${
                    verificationUrl
                        ? `
                            <a
                                href="${escapeHTML(
                                    verificationUrl
                                )}"
                                class="certificate-action"
                                target="_blank"
                                rel="noopener noreferrer"
                            >

                                Verify Certificate

                                <i class="fa-solid fa-arrow-up-right-from-square"></i>

                            </a>
                        `
                        : ""
                }


                <button
                    type="button"
                    class="certificate-action certificate-print-btn"
                >

                    <i class="fa-solid fa-print"></i>

                    Print / Save

                </button>

            </div>

        </div>

    `;


    /*
     * Print / Save
     */

    const printButton =
        card.querySelector(
            ".certificate-print-btn"
        );


    if (printButton) {

        printButton.addEventListener(
            "click",
            () => {

                window.print();

            }
        );

    }


    return card;

}


/* =========================================================
   RENDER CERTIFICATES
========================================================= */

function renderCertificates(
    certificates
) {

    hideLoading();


    if (!certificates.length) {

        showEmptyState();

        return;

    }


    if (!certificatesGrid) {

        return;

    }


    if (noCertificatesMessage) {

        noCertificatesMessage.hidden =
            true;

    }


    certificatesGrid.innerHTML =
        "";


    certificates.forEach(
        certificate => {

            const card =
                createCertificateCard(
                    certificate
                );


            certificatesGrid.appendChild(
                card
            );

        }
    );


    updateCertificateCount(
        certificates.length
    );


    console.log(
        "Certificates rendered:",
        certificates.length
    );

}


/* =========================================================
   LOAD CERTIFICATES
========================================================= */

async function loadCertificates(user) {

    if (!db) {

        console.error(
            "Firestore is unavailable."
        );


        showEmptyState();

        return;

    }


    showLoading();


    try {

        const certificatesRef =
            collection(
                db,
                "certificates"
            );


        const certificatesQuery =
            query(
                certificatesRef,
                where(
                    "studentUid",
                    "==",
                    user.uid
                ),
                orderBy(
                    "issuedAt",
                    "desc"
                )
            );


        const snapshot =
            await getDocs(
                certificatesQuery
            );


        const certificates =
            snapshot.docs.map(
                certificateDoc => ({

                    id:
                        certificateDoc.id,

                    ...certificateDoc.data()

                })
            );


        renderCertificates(
            certificates
        );


    } catch (error) {

        console.error(
            "Certificate query error:",
            error
        );


        /*
         * Fallback query.
         *
         * This is useful if Firestore
         * requires a composite index.
         */

        try {

            const certificatesRef =
                collection(
                    db,
                    "certificates"
                );


            const fallbackQuery =
                query(
                    certificatesRef,
                    where(
                        "studentUid",
                        "==",
                        user.uid
                    )
                );


            const snapshot =
                await getDocs(
                    fallbackQuery
                );


            const certificates =
                snapshot.docs.map(
                    certificateDoc => ({

                        id:
                            certificateDoc.id,

                        ...certificateDoc.data()

                    })
                );


            certificates.sort(
                (a, b) => {

                    const dateA =
                        getTimestamp(
                            a.issuedAt
                        );


                    const dateB =
                        getTimestamp(
                            b.issuedAt
                        );


                    return dateB - dateA;

                }
            );


            renderCertificates(
                certificates
            );


        } catch (fallbackError) {

            console.error(
                "Certificate fallback error:",
                fallbackError
            );


            showEmptyState();

        }

    }

}


/* =========================================================
   DATE TIMESTAMP HELPER
========================================================= */

function getTimestamp(value) {

    if (!value) {

        return 0;

    }


    if (
        typeof value === "object" &&
        typeof value.toDate === "function"
    ) {

        return value.toDate().getTime();

    }


    const timestamp =
        new Date(value).getTime();


    return Number.isNaN(timestamp)
        ? 0
        : timestamp;

}


/* =========================================================
   LOGOUT
========================================================= */

async function logout() {

    if (!auth) {

        console.error(
            "Firebase Auth is unavailable."
        );

        return;

    }


    try {

        if (logoutBtn) {

            logoutBtn.disabled =
                true;

            logoutBtn.style.opacity =
                "0.6";

            logoutBtn.style.cursor =
                "wait";

        }


        console.log(
            "CWS Academy: Signing out..."
        );


        await signOut(auth);


        console.log(
            "CWS Academy: Logout successful."
        );


        window.location.replace(
            "../pages/login.html"
        );


    } catch (error) {

        console.error(
            "CWS Academy logout error:",
            error
        );


        if (logoutBtn) {

            logoutBtn.disabled =
                false;

            logoutBtn.style.opacity =
                "";

            logoutBtn.style.cursor =
                "";

        }


        alert(
            "Unable to sign out. Please try again."
        );

    }

}


/* =========================================================
   LOGOUT BUTTON
========================================================= */

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        logout
    );

}


/* =========================================================
   FIREBASE AUTH STATE
========================================================= */

onAuthStateChanged(
    auth,
    user => {

        console.log(
            "CWS Academy certificates auth state:",
            user
                ? "AUTHENTICATED"
                : "NOT AUTHENTICATED"
        );


        /*
         * Protect page.
         */

        if (!user) {

            console.warn(
                "No authenticated user."
            );


            window.location.replace(
                "../pages/login.html?redirect=certificates"
            );


            return;

        }


        /*
         * Authenticated student.
         */

        displayUser(user);

        loadCertificates(user);

    }
);


/* =========================================================
   INITIALIZATION
========================================================= */

console.log(
    "CWS Academy certificates.js initialization complete."
);
