/* =========================================================
   CWS ACADEMY
   PUBLIC CREDENTIAL VERIFICATION
   File: js/verify-certificate.js

   Supports:
   - Manual Credential ID search
   - ?credential=CWS-... direct links
   - Course, Pro and Career Path credential records
========================================================= */

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

import {
    db
} from "./firebase-config.js";


const $ =
    id =>
        document.getElementById(id);


const verificationForm =
    $("verificationForm");

const credentialInput =
    $("credentialInput");

const verificationFormMessage =
    $("verificationFormMessage");

const verificationLoading =
    $("verificationLoading");

const verificationNotFound =
    $("verificationNotFound");

const verificationNotFoundText =
    $("verificationNotFoundText");

const verificationResult =
    $("verificationResult");

const verifiedCourse =
    $("verifiedCourse");

const verifiedStudent =
    $("verifiedStudent");

const verifiedCourseField =
    $("verifiedCourseField");

const verifiedDate =
    $("verifiedDate");

const verifiedCredential =
    $("verifiedCredential");

const verifiedScore =
    $("verifiedScore");

const verifiedStatus =
    $("verifiedStatus");

const verifiedIssuer =
    $("verifiedIssuer");

const verifiedType =
    $("verifiedType");

const verifyCredentialBtn =
    $("verifyCredentialBtn");

const tryAnotherCredentialBtn =
    $("tryAnotherCredentialBtn");

const copyVerifiedCredentialBtn =
    $("copyVerifiedCredentialBtn");

const copyVerificationPageBtn =
    $("copyVerificationPageBtn");

const verificationActionStatus =
    $("verificationActionStatus");


const CREDENTIAL_PATTERN =
    /^CWS-[A-Z0-9][A-Z0-9-]{5,74}$/;


function normalizeCredentialId(
    value
) {

    return String(
        value ||
        ""
    )
        .trim()
        .toUpperCase();

}


function isValidCredentialId(value) {
    return CREDENTIAL_PATTERN.test(
        normalizeCredentialId(value)
    );
}


function setVerificationBusy(busy) {
    if (!verifyCredentialBtn) return;

    verifyCredentialBtn.disabled = busy;
    verifyCredentialBtn.setAttribute(
        "aria-busy",
        String(busy)
    );
    verifyCredentialBtn.innerHTML = busy
        ? '<i class="fa-solid fa-spinner fa-spin"></i> Checking...'
        : '<i class="fa-solid fa-magnifying-glass"></i> Verify';
}


function timestampToDate(
    value
) {

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
        new Date(
            value
        );


    return Number.isNaN(
        date.getTime()
    )
        ? null
        : date;

}


function formatDate(
    value
) {

    const date =
        timestampToDate(
            value
        );


    if (!date) {
        return "â€”";
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


function resetStates() {

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


    if (verificationActionStatus) {
        verificationActionStatus.textContent =
            "";
    }

}


function showLoading() {

    resetStates();


    if (verificationLoading) {
        verificationLoading.hidden =
            false;
    }


    setVerificationBusy(true);

}


function showNotFound(
    message
) {

    resetStates();


    if (verificationNotFoundText) {
        verificationNotFoundText.textContent =
            message;
    }


    if (verificationNotFound) {
        verificationNotFound.hidden =
            false;
    }


    setVerificationBusy(false);

}


function showFormMessage(
    message
) {

    if (!verificationFormMessage) {
        return;
    }


    verificationFormMessage.textContent =
        message;

    verificationFormMessage.hidden =
        false;

}


function renderVerifiedCredential(
    data,
    credentialId
) {

    resetStates();


    const professional =
        data.credentialType ===
            "career-path" ||
        data.tier ===
            "professional";


    const pro =
        data.tier ===
            "pro";


    const displayTitle =
        data.credentialTitle ||
        data.pathTitle ||
        data.courseTitle ||
        "CWS Academy Credential";


    const displayArea =
        professional
            ? (
                data.pathTitle ||
                "Professional Career Path"
            )
            : (
                data.courseTitle ||
                "CWS Academy Course"
            );


    const score =
        professional
            ? Number(
                data.capstoneScore ||
                0
            )
            : Number(
                data.finalScore ??
                data.score ??
                0
            );


    if (verifiedCourse) {
        verifiedCourse.textContent =
            displayTitle;
    }


    if (verifiedStudent) {
        verifiedStudent.textContent =
            data.studentName ||
            "CWS Academy Student";
    }


    if (verifiedCourseField) {
        verifiedCourseField.textContent =
            displayArea;
    }


    if (verifiedDate) {
        verifiedDate.textContent =
            formatDate(
                data.issuedAt ||
                data.createdAt
            );
    }


    if (verifiedCredential) {
        verifiedCredential.textContent =
            data.credentialId ||
            credentialId;
    }


    if (verifiedScore) {

        if (
            score > 0
        ) {

            verifiedScore.textContent =
                `${score}%`;

        }
        else if (
            professional &&
            data.capstonePassed
        ) {

            verifiedScore.textContent =
                "Capstone Passed";

        }
        else {

            verifiedScore.textContent =
                "Passed";

        }

    }


    if (verifiedStatus) {

        verifiedStatus.textContent =
            pro
                ? "Verified CWS Pro"
                : (
                    professional
                        ? "Verified Professional"
                        : "Verified"
                );

    }


    if (verifiedIssuer) {
        verifiedIssuer.textContent =
            data.issuer ||
            "CWS Academy";
    }


    if (verifiedType) {
        verifiedType.textContent =
            professional
                ? "Career Path Certificate"
                : pro
                    ? "CWS Pro Certificate"
                    : "Course Certificate";
    }


    if (verificationResult) {

        verificationResult.classList.toggle(
            "professional",
            professional
        );


        verificationResult.classList.toggle(
            "pro",
            pro
        );


        verificationResult.hidden =
            false;

    }


    setVerificationBusy(false);

}


async function verifyCredential(
    rawCredentialId,
    updateUrl = true
) {

    const credentialId =
        normalizeCredentialId(
            rawCredentialId
        );


    if (!credentialId) {

        resetStates();

        showFormMessage(
            "Enter the Credential ID shown on the CWS Academy certificate."
        );


        credentialInput?.focus();


        return;

    }


    if (!isValidCredentialId(credentialId)) {
        resetStates();
        showFormMessage(
            "Enter a valid CWS credential ID beginning with CWS-."
        );
        credentialInput?.focus();
        return;
    }


    if (credentialInput) {
        credentialInput.value =
            credentialId;
    }


    showLoading();


    try {

        const snapshot =
            await getDoc(
                doc(
                    db,
                    "certificateVerifications",
                    credentialId
                )
            );


        if (
            !snapshot.exists()
        ) {

            showNotFound(
                `No active CWS Academy verification record was found for ${credentialId}.`
            );


            return;

        }


        const data =
            snapshot.data() ||
            {};


        if (
            String(
                data.status ||
                ""
            )
                .trim()
                .toLowerCase() !==
            "active"
        ) {

            showNotFound(
                "A credential record exists, but it is not currently active."
            );


            return;

        }


        renderVerifiedCredential(
            data,
            credentialId
        );


        if (updateUrl) {

            const url =
                new URL(
                    window.location.href
                );


            url.searchParams.set(
                "credential",
                credentialId
            );


            window.history.replaceState(
                {},
                "",
                url
            );

        }

    }
    catch (error) {

        console.error(
            "[CWS Verification] Firestore verification failed:",
            error
        );


        showNotFound(
            "Credential verification is temporarily unavailable. Please check the ID and try again shortly."
        );

    }

}


verificationForm?.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        verifyCredential(
            credentialInput?.value ||
            ""
        );

    }
);


credentialInput?.addEventListener(
    "input",
    () => {
        const position =
            credentialInput.selectionStart;

        credentialInput.value =
            normalizeCredentialId(
                credentialInput.value
            );

        if (position !== null) {
            credentialInput.setSelectionRange(
                position,
                position
            );
        }
    }
);


tryAnotherCredentialBtn?.addEventListener(
    "click",
    () => {
        resetStates();
        setVerificationBusy(false);
        credentialInput?.focus();
        credentialInput?.select();
    }
);


async function copyText(value, successMessage) {
    if (!value) return;

    try {
        await navigator.clipboard.writeText(value);

        if (verificationActionStatus) {
            verificationActionStatus.textContent =
                successMessage;
        }
    }
    catch {
        window.prompt("Copy:", value);
    }
}


copyVerifiedCredentialBtn?.addEventListener(
    "click",
    () => copyText(
        verifiedCredential?.textContent?.trim() || "",
        "Credential ID copied."
    )
);


copyVerificationPageBtn?.addEventListener(
    "click",
    () => copyText(
        window.location.href,
        "Verification link copied."
    )
);


const params =
    new URLSearchParams(
        window.location.search
    );


const credentialFromUrl =
    normalizeCredentialId(
        params.get(
            "credential"
        )
    );


resetStates();


if (credentialFromUrl) {

    verifyCredential(
        credentialFromUrl,
        false
    );

}
