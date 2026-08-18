/* =========================================================
   CWS ACADEMY
   PUBLIC CREDENTIAL VERIFICATION
========================================================= */

"use strict";

import {
    doc,
    getDoc
} from
"https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

import {
    db
} from "./firebase-config.js";


const form =
    document.getElementById(
        "verificationForm"
    );

const credentialInput =
    document.getElementById(
        "credentialInput"
    );

const loading =
    document.getElementById(
        "verificationLoading"
    );

const notFound =
    document.getElementById(
        "verificationNotFound"
    );

const result =
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


function normalizeCredential(
    value
) {

    return String(
        value || ""
    )
        .trim()
        .toUpperCase();

}


function formatDate(
    value
) {

    if (!value) {
        return "Recorded";
    }

    let date;

    if (
        typeof value.toDate ===
            "function"
    ) {
        date = value.toDate();
    }
    else if (
        typeof value.seconds ===
            "number"
    ) {
        date = new Date(
            value.seconds * 1000
        );
    }
    else {
        date = new Date(value);
    }

    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return "Recorded";
    }

    return date.toLocaleDateString(
        undefined,
        {
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );

}


async function verifyCredential(
    credential
) {

    const normalized =
        normalizeCredential(
            credential
        );

    if (!normalized) {
        return;
    }

    credentialInput.value =
        normalized;

    loading.hidden =
        false;

    notFound.hidden =
        true;

    result.hidden =
        true;

    try {

        const ref =
            doc(
                db,
                "certificateVerifications",
                normalized
            );

        const snapshot =
            await getDoc(ref);

        loading.hidden =
            true;

        if (
            !snapshot.exists()
        ) {

            notFound.hidden =
                false;

            return;

        }

        const data =
            snapshot.data();

        if (
            data.status === "revoked"
        ) {

            notFound.hidden =
                false;

            return;

        }

        verifiedCourse.textContent =
            data.courseTitle ||
            "CWS Academy Certificate";

        verifiedStudent.textContent =
            data.studentName ||
            "Learner";

        verifiedCourseField.textContent =
            data.courseTitle ||
            "Course";

        verifiedDate.textContent =
            formatDate(
                data.issuedAt
            );

        verifiedCredential.textContent =
            normalized;

        const score =
            Number(
                data.finalScore || 0
            );

        verifiedScore.textContent =
            score > 0
                ? `${score}%`
                : "Passed";

        verifiedStatus.textContent =
            data.status === "active"
                ? "Verified"
                : (
                    data.status ||
                    "Verified"
                );

        result.hidden =
            false;

    }
    catch (error) {

        console.error(
            "[CWS Verify] Verification failed:",
            error
        );

        loading.hidden =
            true;

        notFound.hidden =
            false;

    }

}


form?.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        const credential =
            credentialInput.value;

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

        window.history.replaceState(
            {},
            "",
            url
        );

        verifyCredential(
            credential
        );

    }
);


const initialCredential =
    new URLSearchParams(
        window.location.search
    )
        .get(
            "credential"
        );


if (initialCredential) {

    verifyCredential(
        initialCredential
    );

}
