/* =========================================================
   CWS ACADEMY
   PUBLIC CREDENTIAL VERIFICATION
   File: js/verify-certificate.js
========================================================= */

"use strict";


/* =========================================================
   FIRESTORE
========================================================= */

import {
    doc,
    getDoc
} from
"https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";


/* =========================================================
   FIREBASE CONFIG
========================================================= */

import {
    db
} from "./firebase-config.js";


/* =========================================================
   DOM
========================================================= */

const verificationForm =
    document.getElementById(
        "verificationForm"
    );

const credentialInput =
    document.getElementById(
        "credentialInput"
    );

const verifyCredentialBtn =
    document.getElementById(
        "verifyCredentialBtn"
    );

const verificationFormMessage =
    document.getElementById(
        "verificationFormMessage"
    );

const verificationLoading =
    document.getElementById(
        "verificationLoading"
    );

const verificationNotFound =
    document.getElementById(
        "verificationNotFound"
    );

const verificationNotFoundText =
    document.getElementById(
        "verificationNotFoundText"
    );

const verificationResult =
    document.getElementById(
        "verificationResult"
    );

const verifiedCourse =
    document.getElementById(
        "verifiedCourse"
    );

const verifiedStudent =
    document.getElementById(
        "verifiedStudent"
    );

const verifiedCourseField =
    document.getElementById(
        "verifiedCourseField"
    );

const verifiedDate =
    document.getElementById(
        "verifiedDate"
    );

const verifiedCredential =
    document.getElementById(
        "verifiedCredential"
    );

const verifiedScore =
    document.getElementById(
        "verifiedScore"
    );

const verifiedStatus =
    document.getElementById(
        "verifiedStatus"
    );


/* =========================================================
   CREDENTIAL NORMALIZATION
========================================================= */

function normalizeCredential(value) {

    return String(
        value || ""
    )
        .trim()
        .replace(
            /\s+/g,
            ""
        )
        .toUpperCase();

}


/* =========================================================
   VALIDATE CREDENTIAL FORMAT
========================================================= */

function isReasonableCredential(value) {

    const credential =
        normalizeCredential(
            value
        );


    if (
        credential.length <
        8
    ) {

        return false;

    }


    return /^[A-Z0-9-]+$/
        .test(
            credential
        );

}


/* =========================================================
   PAGE STATES
========================================================= */

function resetResults() {

    if (verificationLoading) {

        verificationLoading.hidden =
            true;

    }


    if (verificationNotFound) {

        verificationNotFound.hidden =
            true;

    }


    if (verificationResult) {

        verificationResult.hidden =
            true;

    }


    if (verificationFormMessage) {

        verificationFormMessage.hidden =
            true;

        verificationFormMessage.textContent =
            "";

    }

}


function setLoading(isLoading) {

    if (verificationLoading) {

        verificationLoading.hidden =
            !isLoading;

    }


    if (verifyCredentialBtn) {

        verifyCredentialBtn.disabled =
            isLoading;


        verifyCredentialBtn.innerHTML =
            isLoading
                ? `
                    <i class="fa-solid fa-spinner fa-spin"></i>
                    Checking
                  `
                : `
                    <i class="fa-solid fa-magnifying-glass"></i>
                    Verify
                  `;

    }

}


function showFormMessage(message) {

    if (!verificationFormMessage) {

        return;

    }


    verificationFormMessage.textContent =
        message;


    verificationFormMessage.hidden =
        false;

}


/* =========================================================
   DATE
========================================================= */

function toDate(value) {

    if (!value) {

        return null;

    }


    if (
        typeof value.toDate ===
            "function"
    ) {

        return value.toDate();

    }


    if (
        typeof value.seconds ===
            "number"
    ) {

        return new Date(
            value.seconds *
            1000
        );

    }


    const date =
        new Date(value);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return null;

    }


    return date;

}


function formatDate(value) {

    const date =
        toDate(value);


    if (!date) {

        return "Recorded";

    }


    return date.toLocaleDateString(
        undefined,
        {
            year:
                "numeric",

            month:
                "long",

            day:
                "numeric"
        }
    );

}


/* =========================================================
   SHOW INVALID
========================================================= */

function showNotFound(
    message =
        "No active CWS Academy verification record was found for this credential ID."
) {

    if (
        verificationNotFoundText
    ) {

        verificationNotFoundText
            .textContent =
            message;

    }


    if (verificationNotFound) {

        verificationNotFound.hidden =
            false;

    }

}


/* =========================================================
   SHOW VERIFIED
========================================================= */

function showVerified(
    credential,
    data
) {

    const courseTitle =
        String(
            data.courseTitle ||
            "CWS Academy Certificate"
        );


    const learner =
        String(
            data.studentName ||
            "Learner"
        );


    const score =
        Number(
            data.finalScore ||
            0
        );


    const status =
        String(
            data.status ||
            "active"
        );


    if (verifiedCourse) {

        verifiedCourse.textContent =
            courseTitle;

    }


    if (verifiedStudent) {

        verifiedStudent.textContent =
            learner;

    }


    if (verifiedCourseField) {

        verifiedCourseField.textContent =
            courseTitle;

    }


    if (verifiedDate) {

        verifiedDate.textContent =
            formatDate(
                data.issuedAt
            );

    }


    if (verifiedCredential) {

        verifiedCredential.textContent =
            credential;

    }


    if (verifiedScore) {

        verifiedScore.textContent =
            score > 0
                ? `${score}%`
                : "Passed";

    }


    if (verifiedStatus) {

        verifiedStatus.textContent =
            status === "active"
                ? "Verified"
                : status;

    }


    if (verificationResult) {

        verificationResult.hidden =
            false;

    }

}


/* =========================================================
   VERIFY
========================================================= */

async function verifyCredential(
    rawCredential
) {

    resetResults();


    const credential =
        normalizeCredential(
            rawCredential
        );


    if (credentialInput) {

        credentialInput.value =
            credential;

    }


    if (
        !isReasonableCredential(
            credential
        )
    ) {

        showFormMessage(
            "Enter a valid CWS Academy credential ID."
        );


        return;

    }


    if (!db) {

        showNotFound(
            "The verification service is currently unavailable."
        );


        return;

    }


    setLoading(
        true
    );


    try {

        const ref =
            doc(
                db,
                "certificateVerifications",
                credential
            );


        const snapshot =
            await getDoc(
                ref
            );


        setLoading(
            false
        );


        if (
            !snapshot.exists()
        ) {

            showNotFound();


            return;

        }


        const data =
            snapshot.data() ||
            {};


        /*
         * Only explicitly active credentials are treated as
         * successfully verified.
         */

        if (
            String(
                data.status ||
                ""
            )
                .toLowerCase() !==
            "active"
        ) {

            showNotFound(
                "This credential exists but is not currently active."
            );


            return;

        }


        /*
         * Defensive consistency check.
         */

        if (
            data.credentialId &&
            normalizeCredential(
                data.credentialId
            ) !==
            credential
        ) {

            console.warn(
                "[CWS Verify] Credential document mismatch."
            );


            showNotFound(
                "The credential record could not be validated."
            );


            return;

        }


        showVerified(
            credential,
            data
        );

    }
    catch (error) {

        console.error(
            "[CWS Verify] Verification failed:",
            error
        );


        setLoading(
            false
        );


        /*
         * Do not claim a credential is invalid merely because
         * Firestore failed or security rules blocked the read.
         */

        showNotFound(
            "The verification service could not complete this request. Please try again."
        );

    }

}


/* =========================================================
   UPDATE URL
========================================================= */

function updateCredentialUrl(
    credential
) {

    try {

        const url =
            new URL(
                window.location.href
            );


        url.searchParams.set(
            "credential",
            normalizeCredential(
                credential
            )
        );


        window.history
            .replaceState(
                {},
                "",
                url
            );

    }
    catch (error) {

        console.warn(
            "[CWS Verify] URL update failed:",
            error
        );

    }

}


/* =========================================================
   FORM
========================================================= */

verificationForm
    ?.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const credential =
                credentialInput
                    ?.value ||
                "";


            updateCredentialUrl(
                credential
            );


            verifyCredential(
                credential
            );

        }
    );


/* =========================================================
   INITIAL URL CREDENTIAL
========================================================= */

const initialCredential =
    new URLSearchParams(
        window.location.search
    )
        .get(
            "credential"
        );


if (
    initialCredential
) {

    verifyCredential(
        initialCredential
    );

}
