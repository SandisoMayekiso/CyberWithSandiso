import { onAuthStateChanged, signOut }
from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

import { doc, getDoc, setDoc, serverTimestamp }
from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

import { auth, db } from "./firebase-config.js";
import { getLearningPath } from "../data/learning-paths.js";
import { getCourse } from "../data/courses.js";


const query =
    new URLSearchParams(
        window.location.search
    );

const pathId =
    query.get("path") ||
    "junior-penetration-tester";


const $ =
    id =>
        document.getElementById(id);


const loading =
    $("certificateLoading");

const locked =
    $("certificateLocked");

const lockedText =
    $("certificateLockedText");

const content =
    $("certificateContent");

const studentName =
    $("studentName");

const logoutBtn =
    $("logoutBtn");

const certificateStudent =
    $("certificateStudent");

const certificatePath =
    $("certificatePath");

const certificateDescription =
    $("certificateDescription");

const certificateScore =
    $("certificateScore");

const certificateDate =
    $("certificateDate");

const certificateCredential =
    $("certificateCredential");

const certificatePathBadge =
    $("certificatePathBadge");

const certificatePageEyebrow =
    $("certificatePageEyebrow");

const certificatePageIntro =
    $("certificatePageIntro");

const certificateKicker =
    $("certificateKicker");

const certificateScoreLabel =
    $("certificateScoreLabel");

const certificateRequirements =
    $("certificateRequirements");

const certificateVerificationIntro =
    $("certificateVerificationIntro");

const printBtn =
    $("printCertificateBtn");

const copyBtn =
    $("copyCredentialBtn");

const copyVerificationBtn =
    $("copyVerificationBtn");

const openVerificationBtn =
    $("openCareerVerificationBtn");

const verifyUrlText =
    $("careerVerifyUrl");

const qrCanvas =
    $("careerCertificateQr");


let currentUser =
    null;

let currentPath =
    null;

let currentCredential =
    null;

let verificationUrl =
    "";


/* =========================================================
   HELPERS
========================================================= */

function getUserName(
    user
) {

    if (
        user?.displayName?.trim()
    ) {
        return user.displayName.trim();
    }


    if (
        user?.email?.includes("@")
    ) {

        return user.email
            .split("@")[0]
            .replace(/[._-]+/g," ")
            .replace(
                /\b\w/g,
                character =>
                    character.toUpperCase()
            );

    }


    return "Student";

}


function formatDate(
    value
) {

    return new Date(
        value
    )
        .toLocaleDateString(
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


function createCredentialId(
    path
) {

    const prefix =
        path.id
            .split("-")
            .map(
                part =>
                    part[0]?.toUpperCase() ||
                    ""
            )
            .join("")
            .slice(0,5);


    const date =
        new Date();


    const datePart =
        `${date.getFullYear()}${String(
            date.getMonth()+1
        ).padStart(2,"0")}${String(
            date.getDate()
        ).padStart(2,"0")}`;


    const random =
        Math.random()
            .toString(36)
            .slice(2,8)
            .toUpperCase();


    return (
        `CWS-${prefix}-${datePart}-${random}`
    );

}


function buildVerificationUrl(
    credentialId
) {

    const url =
        new URL(
            "../pages/verify-certificate.html",
            window.location.href
        );


    url.searchParams.set(
        "credential",
        credentialId
    );


    return url.href;

}


/* =========================================================
   ELIGIBILITY
========================================================= */

async function courseComplete(
    courseId
) {

    const snapshot =
        await getDoc(
            doc(
                db,
                "users",
                currentUser.uid,
                "courseProgress",
                courseId
            )
        );


    if (!snapshot.exists()) {
        return false;
    }


    const data =
        snapshot.data() ||
        {};


    return (
        data.completed === true ||
        data.certificateEligible === true ||
        Number(
            data.progressPercent ||
            0
        ) >= 100
    );

}


async function verifyPathCompletion() {

    const requiredCourses =
        currentPath.stages.filter(
            stage =>
                stage.type === "course" &&
                stage.required !== false
        );


    const courseChecks =
        await Promise.all(
            requiredCourses.map(
                async stage => ({
                    courseId:
                        stage.courseId,

                    complete:
                        await courseComplete(
                            stage.courseId
                        )
                })
            )
        );


    const missing =
        courseChecks
            .filter(
                item =>
                    !item.complete
            )
            .map(
                item =>
                    getCourse(
                        item.courseId
                    )?.title ||
                    item.courseId
            );


    const capstoneStage =
        currentPath.stages.find(
            stage =>
                stage.type === "capstone"
        );


    let capstone =
        null;


    if (
        capstoneStage?.capstoneId
    ) {

        const snapshot =
            await getDoc(
                doc(
                    db,
                    "users",
                    currentUser.uid,
                    "capstones",
                    capstoneStage.capstoneId
                )
            );


        if (
            snapshot.exists()
        ) {

            capstone =
                snapshot.data() ||
                null;

        }

    }


    return {
        allowed:
            missing.length === 0 &&
            (
                !capstoneStage ||
                capstone?.passed ===
                    true
            ),

        missing,

        capstone
    };

}


/* =========================================================
   PRIVATE CREDENTIAL
========================================================= */

async function getOrCreateCredential(
    eligibility
) {

    const credentialRef =
        doc(
            db,
            "users",
            currentUser.uid,
            "careerPathCertificates",
            currentPath.id
        );


    const snapshot =
        await getDoc(
            credentialRef
        );


    if (
        snapshot.exists()
    ) {

        return snapshot.data();

    }


    const issuedAt =
        new Date()
            .toISOString();


    const credential = {

        pathId:
            currentPath.id,

        pathTitle:
            currentPath.title,

        credentialTitle:
            currentPath.credentialTitle ||
            `CWS ${currentPath.title} Path Certificate`,

        credentialId:
            createCredentialId(
                currentPath
            ),

        issuedAt,

        capstoneScore:
            Number(
                eligibility
                    .capstone
                    ?.score ||
                0
            ),

        status:
            "verified"
    };


    await setDoc(
        credentialRef,
        {
            ...credential,

            createdAt:
                serverTimestamp(),

            updatedAt:
                serverTimestamp()
        },
        {
            merge:
                true
        }
    );


    return credential;

}


/* =========================================================
   PUBLIC VERIFICATION RECORD
========================================================= */

async function publishPublicVerification(
    credential
) {

    /*
       Public verification contains ONLY fields deliberately
       intended for recruiters/employers. No email, UID,
       private courseProgress or capstone evidence is exposed.
    */

    const publicRecord = {

        credentialId:
            credential.credentialId,

        credentialType:
            "career-path",

        tier:
            "professional",

        status:
            "active",

        studentName:
            getUserName(
                currentUser
            ),

        pathId:
            currentPath.id,

        pathTitle:
            currentPath.title,

        credentialTitle:
            credential.credentialTitle,

        description:
            currentPath.description,

        capstonePassed:
            true,

        capstoneScore:
            Number(
                credential.capstoneScore ||
                0
            ),

        issuedAt:
            credential.issuedAt,

        issuer:
            "CWS Academy",

        ecosystem:
            "CyberWithSandiso",

        verificationVersion:
            1
    };


    await setDoc(
        doc(
            db,
            "certificateVerifications",
            credential.credentialId
        ),
        {
            ...publicRecord,

            createdAt:
                serverTimestamp(),

            updatedAt:
                serverTimestamp()
        },
        {
            merge:
                true
        }
    );

}


/* =========================================================
   QR
========================================================= */

async function renderQr() {

    if (
        !qrCanvas ||
        !verificationUrl
    ) {
        return;
    }


    if (
        typeof QRCode ===
        "undefined"
    ) {

        console.warn(
            "[CWS Career Certificate] QR library unavailable."
        );

        return;

    }


    try {

        await QRCode.toCanvas(
            qrCanvas,
            verificationUrl,
            {
                width:
                    116,

                margin:
                    1
            }
        );

    }
    catch (error) {

        console.error(
            "[CWS Career Certificate] QR generation failed:",
            error
        );

    }

}


/* =========================================================
   RENDER
========================================================= */

async function renderCredential(
    credential
) {

    const name =
        getUserName(
            currentUser
        );


    if (studentName) {
        studentName.textContent =
            name;
    }


    certificateStudent.textContent =
        name;


    certificatePath.textContent =
        `${currentPath.title} Path`;


    certificateDescription.textContent =
        currentPath.description;


    const requiredCourses =
        currentPath.stages.filter(
            stage =>
                stage.type === "course" &&
                stage.required !== false
        );


    const hasCapstone =
        currentPath.stages.some(
            stage =>
                stage.type === "capstone" &&
                Boolean(stage.capstoneId)
        );


    if (certificatePageEyebrow) {
        certificatePageEyebrow.textContent =
            hasCapstone
                ? "CWS ACADEMY â€¢ PROFESSIONAL PATH CREDENTIAL"
                : "CWS ACADEMY â€¢ VERIFIED PATH CREDENTIAL";
    }


    if (certificatePageIntro) {
        certificatePageIntro.textContent =
            hasCapstone
                ? "Verified completion of a complete CWS Academy career learning pathway and practical capstone."
                : "Verified completion of every required course in a complete CWS Academy learning pathway.";
    }


    if (certificateKicker) {
        certificateKicker.textContent =
            hasCapstone
                ? "CERTIFICATE OF PROFESSIONAL PATH COMPLETION"
                : "CERTIFICATE OF CAREER PATH COMPLETION";
    }


    if (certificateScoreLabel) {
        certificateScoreLabel.textContent =
            hasCapstone
                ? "CAPSTONE SCORE"
                : "COURSES COMPLETED";
    }


    certificateScore.textContent =
        hasCapstone
            ? credential.capstoneScore
                ? `${credential.capstoneScore}%`
                : "Passed"
            : `${requiredCourses.length}/${requiredCourses.length}`;


    certificateDate.textContent =
        formatDate(
            credential.issuedAt
        );


    certificateCredential.textContent =
        credential.credentialId;


    certificatePathBadge.textContent =
        (
            currentPath.shortTitle ||
            currentPath.title
        )
            .toUpperCase();


    if (certificateRequirements) {
        certificateRequirements.textContent =
            hasCapstone
                ? "Courses + Capstone Completed"
                : `${requiredCourses.length} Required Courses Completed`;
    }


    if (certificateVerificationIntro) {
        certificateVerificationIntro.textContent =
            hasCapstone
                ? "Employers and recruiters can verify this professional CWS credential without signing in to CWS Academy."
                : "Employers and recruiters can verify this CWS career-path credential without signing in to CWS Academy.";
    }


    currentCredential =
        credential;


    verificationUrl =
        buildVerificationUrl(
            credential.credentialId
        );


    if (verifyUrlText) {
        verifyUrlText.textContent =
            verificationUrl;
    }


    if (openVerificationBtn) {
        openVerificationBtn.href =
            verificationUrl;
    }


    await renderQr();


    loading.hidden =
        true;


    content.hidden =
        false;

}


/* =========================================================
   ACTIONS
========================================================= */

printBtn?.addEventListener(
    "click",
    () =>
        window.print()
);


copyBtn?.addEventListener(
    "click",
    async () => {

        if (
            !currentCredential?.credentialId
        ) {
            return;
        }


        try {

            await navigator.clipboard.writeText(
                currentCredential.credentialId
            );

            copyBtn.innerHTML =
                '<i class="fa-solid fa-circle-check"></i> Copied';

            setTimeout(
                () => {
                    copyBtn.innerHTML =
                        '<i class="fa-solid fa-copy"></i> Copy Credential ID';
                },
                1600
            );

        }
        catch {

            window.prompt(
                "Copy credential ID:",
                currentCredential.credentialId
            );

        }

    }
);


copyVerificationBtn?.addEventListener(
    "click",
    async () => {

        if (!verificationUrl) {
            return;
        }


        try {

            await navigator.clipboard.writeText(
                verificationUrl
            );

            copyVerificationBtn.innerHTML =
                '<i class="fa-solid fa-circle-check"></i> Link Copied';

            setTimeout(
                () => {
                    copyVerificationBtn.innerHTML =
                        '<i class="fa-solid fa-link"></i> Copy Verification Link';
                },
                1600
            );

        }
        catch {

            window.prompt(
                "Copy verification link:",
                verificationUrl
            );

        }

    }
);


logoutBtn?.addEventListener(
    "click",
    async () => {

        await signOut(
            auth
        );

        window.location.replace(
            "../pages/login.html"
        );

    }
);


/* =========================================================
   INIT
========================================================= */

if (!auth) {

    window.location.replace(
        "../pages/login.html"
    );

}
else {

    onAuthStateChanged(
        auth,
        async user => {

            if (!user) {

                window.location.replace(
                    "../pages/login.html"
                );

                return;

            }


            currentUser =
                user;


            currentPath =
                getLearningPath(
                    pathId
                );


            if (!currentPath) {

                loading.hidden =
                    true;

                locked.hidden =
                    false;

                lockedText.textContent =
                    "This CWS learning path could not be found.";

                return;

            }


            try {

                const eligibility =
                    await verifyPathCompletion();


                if (
                    !eligibility.allowed
                ) {

                    loading.hidden =
                        true;

                    locked.hidden =
                        false;


                    lockedText.textContent =
                        eligibility.missing.length
                            ? `Complete these required courses first: ${eligibility.missing.join(", ")}.`
                            : "Pass the required career-path capstone before this certificate can be issued.";


                    return;

                }


                const credential =
                    await getOrCreateCredential(
                        eligibility
                    );


                await publishPublicVerification(
                    credential
                );


                await renderCredential(
                    credential
                );

            }
            catch (error) {

                console.error(
                    "[CWS Career Certificate] Verification setup failed:",
                    error
                );


                loading.hidden =
                    true;

                locked.hidden =
                    false;

                lockedText.textContent =
                    "The career-path credential could not be prepared for verification.";

            }

        }
    );

}
