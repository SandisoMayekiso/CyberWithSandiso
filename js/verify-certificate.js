import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

import {
    db
} from "./firebase-config.js";


const params =
    new URLSearchParams(
        window.location.search
    );

const credentialId =
    params.get(
        "credential"
    );


const $ =
    id =>
        document.getElementById(id);


const loading =
    $("verificationLoading");

const errorState =
    $("verificationError");

const errorText =
    $("verificationErrorText");

const content =
    $("verificationContent");

const card =
    $("verificationCard");

const tierLabel =
    $("verificationTierLabel");

const credentialTitle =
    $("verificationCredentialTitle");

const student =
    $("verificationStudent");

const professionalDetails =
    $("verificationProfessionalDetails");

const path =
    $("verificationPath");

const capstone =
    $("verificationCapstone");

const score =
    $("verificationScore");

const issued =
    $("verificationIssued");

const credentialIdEl =
    $("verificationCredentialId");

const issuer =
    $("verificationIssuer");

const description =
    $("verificationDescription");


function formatDate(
    value
) {

    if (!value) {
        return "—";
    }


    const date =
        new Date(
            value
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return "—";
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


function showError(
    message
) {

    loading.hidden =
        true;

    errorState.hidden =
        false;

    errorText.textContent =
        message;

}


async function verifyCredential() {

    if (!credentialId) {

        showError(
            "No credential ID was supplied."
        );

        return;

    }


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

            showError(
                "No active CWS credential could be found for this ID."
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

            showError(
                "This credential is not currently active."
            );

            return;

        }


        const professional =
            data.credentialType ===
                "career-path" ||
            data.tier ===
                "professional";


        card.classList.toggle(
            "professional",
            professional
        );


        tierLabel.textContent =
            professional
                ? "VERIFIED PROFESSIONAL CREDENTIAL"
                : (
                    data.tier === "pro"
                        ? "VERIFIED CWS PRO CERTIFICATE"
                        : "VERIFIED COURSE CERTIFICATE"
                );


        credentialTitle.textContent =
            data.credentialTitle ||
            data.courseTitle ||
            "CWS Academy Credential";


        student.textContent =
            data.studentName ||
            "CWS Academy Student";


        issued.textContent =
            formatDate(
                data.issuedAt
            );


        credentialIdEl.textContent =
            data.credentialId ||
            credentialId;


        issuer.textContent =
            data.issuer ||
            "CWS Academy";


        description.textContent =
            data.description ||
            "This credential has an active CWS Academy public verification record.";


        if (professional) {

            professionalDetails.hidden =
                false;


            path.textContent =
                data.pathTitle ||
                "Professional Career Path";


            capstone.textContent =
                data.capstonePassed
                    ? "PASSED"
                    : "—";


            score.textContent =
                Number(
                    data.capstoneScore ||
                    0
                ) > 0
                    ? `${Number(
                        data.capstoneScore
                    )}%`
                    : "Passed";

        }


        loading.hidden =
            true;

        content.hidden =
            false;

    }
    catch (error) {

        console.error(
            "[CWS Verification] Verification failed:",
            error
        );


        showError(
            "Credential verification is temporarily unavailable."
        );

    }

}


verifyCredential();
