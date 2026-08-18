/* =========================================================
   CWS ACADEMY
   CERTIFICATE VIEW + PDF
========================================================= */

"use strict";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

import {
    auth,
    db
} from "./firebase-config.js";

import {
    getCourse
} from "../data/courses.js";


let currentUser = null;
let currentCourse = null;
let currentProgress = null;
let credentialId = "";
let verificationUrl = "";
let initialized = false;


const studentName =
    document.getElementById("studentName");

const logoutBtn =
    document.getElementById("logoutBtn");

const loading =
    document.getElementById("certificateLoading");

const errorBox =
    document.getElementById("certificateError");

const errorText =
    document.getElementById("certificateErrorText");

const content =
    document.getElementById("certificateContent");

const certificateStudent =
    document.getElementById("certificateStudent");

const certificateCourse =
    document.getElementById("certificateCourse");

const certificateDescription =
    document.getElementById("certificateDescription");

const certificateScore =
    document.getElementById("certificateScore");

const certificateDate =
    document.getElementById("certificateDate");

const certificateCredential =
    document.getElementById("certificateCredential");

const certificateVerifyUrl =
    document.getElementById("certificateVerifyUrl");

const certificateQr =
    document.getElementById("certificateQr");

const downloadPdfBtn =
    document.getElementById("downloadPdfBtn");

const copyVerificationBtn =
    document.getElementById("copyVerificationBtn");

const linkedinShareBtn =
    document.getElementById("linkedinShareBtn");

const openVerificationBtn =
    document.getElementById("openVerificationBtn");


function escapeFileName(value) {

    return String(value || "certificate")
        .trim()
        .replace(/[^a-z0-9_-]+/gi, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
        .toLowerCase();

}


function getCourseId() {

    return (
        new URLSearchParams(
            window.location.search
        )
            .get("course") ||
        ""
    )
        .trim()
        .toLowerCase();

}


function getUserName(user) {

    if (user?.displayName?.trim()) {
        return user.displayName.trim();
    }

    if (user?.email?.includes("@")) {

        return user.email
            .split("@")[0]
            .replace(/[._-]+/g, " ")
            .trim()
            .split(" ")
            .map(
                word =>
                    word.charAt(0).toUpperCase() +
                    word.slice(1)
            )
            .join(" ");

    }

    return "Student";

}


function showError(message) {

    loading.hidden = true;
    content.hidden = true;

    errorText.textContent = message;
    errorBox.hidden = false;

}


function formatDate(value) {

    if (!value) {
        return "Completion recorded";
    }

    let date = null;

    if (
        typeof value.toDate === "function"
    ) {
        date = value.toDate();
    }
    else if (
        typeof value.seconds === "number"
    ) {
        date = new Date(
            value.seconds * 1000
        );
    }
    else {
        date = new Date(value);
    }

    if (
        !date ||
        Number.isNaN(date.getTime())
    ) {
        return "Completion recorded";
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


function buildFallbackCredentialId(
    courseId,
    uid
) {

    const coursePart =
        courseId
            .replace(/[^a-z0-9]/gi, "")
            .slice(0, 8)
            .toUpperCase();

    const userPart =
        uid
            .replace(/[^a-z0-9]/gi, "")
            .slice(0, 8)
            .toUpperCase();

    return `CWS-${coursePart}-${userPart}`;

}


async function loadCertificate() {

    const courseId =
        getCourseId();

    if (!courseId) {
        showError(
            "The certificate URL is missing the course parameter."
        );
        return;
    }

    currentCourse =
        getCourse(courseId);

    if (!currentCourse) {
        showError(
            "The requested course does not exist."
        );
        return;
    }

    try {

        const ref =
            doc(
                db,
                "users",
                currentUser.uid,
                "courseProgress",
                courseId
            );

        const snapshot =
            await getDoc(ref);

        if (!snapshot.exists()) {
            showError(
                "No completion record exists for this course."
            );
            return;
        }

        currentProgress =
            snapshot.data();

        if (
            !currentProgress.completed &&
            !currentProgress.certificateEligible
        ) {
            showError(
                "This certificate has not been earned yet."
            );
            return;
        }

        credentialId =
            currentProgress
                ?.certificate
                ?.credentialId ||
            buildFallbackCredentialId(
                courseId,
                currentUser.uid
            );

        const verifyPath =
            `../pages/verify-certificate.html?credential=${encodeURIComponent(
                credentialId
            )}`;

        verificationUrl =
            new URL(
                verifyPath,
                window.location.href
            ).href;

        renderCertificate();

    }
    catch (error) {

        console.error(
            "[CWS Certificate] Load failed:",
            error
        );

        showError(
            "The certificate could not be loaded."
        );

    }

}


async function renderCertificate() {

    const name =
        getUserName(
            currentUser
        );

    studentName.textContent =
        name;

    certificateStudent.textContent =
        name;

    certificateCourse.textContent =
        currentCourse.title;

    certificateDescription.textContent =
        currentCourse.description ||
        "CWS Academy course completion.";

    const score =
        Number(
            currentProgress
                ?.finalAssessment
                ?.bestScore ??
            currentProgress
                ?.finalAssessment
                ?.score ??
            0
        );

    certificateScore.textContent =
        score > 0
            ? `${score}%`
            : "Passed";

    certificateDate.textContent =
        formatDate(
            currentProgress
                ?.certificate
                ?.issuedAt ||
            currentProgress
                ?.completedAt ||
            currentProgress
                ?.updatedAt
        );

    certificateCredential.textContent =
        credentialId;

    certificateVerifyUrl.textContent =
        verificationUrl;

    openVerificationBtn.href =
        verificationUrl;

    const shareText =
        `I completed ${currentCourse.title} with CWS Academy. Credential: ${credentialId}`;

    linkedinShareBtn.href =
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            verificationUrl
        )}`;

    if (
        window.QRCode &&
        certificateQr
    ) {

        await window.QRCode.toCanvas(
            certificateQr,
            verificationUrl,
            {
                width: 130,
                margin: 1,
                errorCorrectionLevel: "M"
            }
        );

    }

    loading.hidden = true;
    errorBox.hidden = true;
    content.hidden = false;

}


async function downloadCertificatePdf() {

    if (
        !window.jspdf?.jsPDF
    ) {

        alert(
            "The PDF library did not load. Please refresh and try again."
        );

        return;
    }

    downloadPdfBtn.disabled = true;

    try {

        const {
            jsPDF
        } =
            window.jspdf;

        const pdf =
            new jsPDF({
                orientation: "landscape",
                unit: "mm",
                format: "a4"
            });

        const width =
            pdf.internal.pageSize
                .getWidth();

        const height =
            pdf.internal.pageSize
                .getHeight();

        /*
         * Background
         */
        pdf.setFillColor(
            11,
            11,
            11
        );

        pdf.rect(
            0,
            0,
            width,
            height,
            "F"
        );

        /*
         * Borders
         */
        pdf.setDrawColor(
            155,
            20,
            20
        );

        pdf.setLineWidth(0.8);

        pdf.rect(
            7,
            7,
            width - 14,
            height - 14
        );

        pdf.setDrawColor(
            65,
            65,
            65
        );

        pdf.setLineWidth(0.25);

        pdf.rect(
            10,
            10,
            width - 20,
            height - 20
        );

        /*
         * Brand
         */
        pdf.setTextColor(
            220,
            48,
            48
        );

        pdf.setFont(
            "helvetica",
            "bold"
        );

        pdf.setFontSize(17);

        pdf.text(
            "CWS ACADEMY",
            20,
            24
        );

        pdf.setTextColor(
            155,
            155,
            155
        );

        pdf.setFontSize(8);

        pdf.text(
            "CyberWithSandiso",
            20,
            30
        );

        pdf.setTextColor(
            92,
            210,
            137
        );

        pdf.setFontSize(9);

        pdf.text(
            "VERIFIED ACHIEVEMENT",
            width - 20,
            24,
            {
                align: "right"
            }
        );

        /*
         * Main title
         */
        pdf.setTextColor(
            211,
            37,
            37
        );

        pdf.setFontSize(10);

        pdf.text(
            "CERTIFICATE OF COMPLETION",
            width / 2,
            49,
            {
                align: "center"
            }
        );

        pdf.setTextColor(
            184,
            184,
            184
        );

        pdf.setFont(
            "helvetica",
            "normal"
        );

        pdf.setFontSize(11);

        pdf.text(
            "This certificate is proudly awarded to",
            width / 2,
            62,
            {
                align: "center"
            }
        );

        pdf.setTextColor(
            248,
            248,
            248
        );

        pdf.setFont(
            "times",
            "normal"
        );

        pdf.setFontSize(29);

        pdf.text(
            getUserName(
                currentUser
            ),
            width / 2,
            79,
            {
                align: "center"
            }
        );

        pdf.setDrawColor(
            175,
            26,
            26
        );

        pdf.line(
            width / 2 - 48,
            85,
            width / 2 + 48,
            85
        );

        pdf.setTextColor(
            184,
            184,
            184
        );

        pdf.setFont(
            "helvetica",
            "normal"
        );

        pdf.setFontSize(11);

        pdf.text(
            "for successfully completing",
            width / 2,
            98,
            {
                align: "center"
            }
        );

        pdf.setTextColor(
            248,
            248,
            248
        );

        pdf.setFont(
            "helvetica",
            "bold"
        );

        pdf.setFontSize(22);

        const courseTitle =
            pdf.splitTextToSize(
                currentCourse.title
                    .toUpperCase(),
                180
            );

        pdf.text(
            courseTitle,
            width / 2,
            112,
            {
                align: "center"
            }
        );

        pdf.setTextColor(
            165,
            165,
            165
        );

        pdf.setFont(
            "helvetica",
            "normal"
        );

        pdf.setFontSize(9);

        const description =
            pdf.splitTextToSize(
                currentCourse.description ||
                "CWS Academy course completion.",
                170
            );

        pdf.text(
            description,
            width / 2,
            128,
            {
                align: "center"
            }
        );

        /*
         * Detail row
         */
        const finalScore =
            Number(
                currentProgress
                    ?.finalAssessment
                    ?.bestScore ??
                currentProgress
                    ?.finalAssessment
                    ?.score ??
                0
            );

        const issueDate =
            formatDate(
                currentProgress
                    ?.certificate
                    ?.issuedAt ||
                currentProgress
                    ?.completedAt ||
                currentProgress
                    ?.updatedAt
            );

        pdf.setDrawColor(
            55,
            55,
            55
        );

        pdf.line(
            25,
            151,
            width - 25,
            151
        );

        pdf.line(
            25,
            169,
            width - 25,
            169
        );

        const centers = [
            width * 0.25,
            width * 0.50,
            width * 0.75
        ];

        const labels = [
            "FINAL ASSESSMENT",
            "ISSUED",
            "CREDENTIAL ID"
        ];

        const values = [
            finalScore > 0
                ? `${finalScore}%`
                : "PASSED",
            issueDate,
            credentialId
        ];

        labels.forEach(
            (
                label,
                index
            ) => {

                pdf.setTextColor(
                    125,
                    125,
                    125
                );

                pdf.setFont(
                    "helvetica",
                    "bold"
                );

                pdf.setFontSize(6.5);

                pdf.text(
                    label,
                    centers[index],
                    158,
                    {
                        align: "center"
                    }
                );

                pdf.setTextColor(
                    235,
                    235,
                    235
                );

                pdf.setFontSize(8);

                pdf.text(
                    values[index],
                    centers[index],
                    164,
                    {
                        align: "center"
                    }
                );

            }
        );

        /*
         * QR Code
         */
        if (certificateQr) {

            const qrImage =
                certificateQr.toDataURL(
                    "image/png"
                );

            pdf.addImage(
                qrImage,
                "PNG",
                width / 2 - 13,
                174,
                26,
                26
            );

            pdf.setTextColor(
                130,
                130,
                130
            );

            pdf.setFontSize(6.5);

            pdf.text(
                "SCAN TO VERIFY",
                width / 2,
                204,
                {
                    align: "center"
                }
            );

        }

        /*
         * Signature + verification
         */
        pdf.setDrawColor(
            110,
            110,
            110
        );

        pdf.line(
            23,
            190,
            76,
            190
        );

        pdf.setTextColor(
            235,
            235,
            235
        );

        pdf.setFontSize(8);

        pdf.text(
            "CyberWithSandiso",
            49.5,
            195,
            {
                align: "center"
            }
        );

        pdf.setTextColor(
            125,
            125,
            125
        );

        pdf.setFontSize(6.5);

        pdf.text(
            "CWS Academy",
            49.5,
            199,
            {
                align: "center"
            }
        );

        pdf.setTextColor(
            216,
            40,
            40
        );

        pdf.setFont(
            "helvetica",
            "bold"
        );

        pdf.setFontSize(7);

        pdf.text(
            "CWS ACADEMY VERIFIED",
            width - 23,
            191,
            {
                align: "right"
            }
        );

        pdf.setTextColor(
            125,
            125,
            125
        );

        pdf.setFont(
            "helvetica",
            "normal"
        );

        pdf.setFontSize(5.8);

        const verifyLines =
            pdf.splitTextToSize(
                verificationUrl,
                70
            );

        pdf.text(
            verifyLines,
            width - 23,
            196,
            {
                align: "right"
            }
        );

        const fileName =
            `${escapeFileName(
                currentCourse.title
            )}-cws-certificate.pdf`;

        pdf.save(
            fileName
        );

    }
    catch (error) {

        console.error(
            "[CWS Certificate] PDF generation failed:",
            error
        );

        alert(
            "The PDF could not be generated. Please try again."
        );

    }
    finally {

        downloadPdfBtn.disabled =
            false;

    }

}


async function copyVerificationLink() {

    try {

        await navigator.clipboard.writeText(
            verificationUrl
        );

        const original =
            copyVerificationBtn.innerHTML;

        copyVerificationBtn.innerHTML =
            '<i class="fa-solid fa-check"></i> Copied';

        setTimeout(
            () => {
                copyVerificationBtn.innerHTML =
                    original;
            },
            1800
        );

    }
    catch {

        window.prompt(
            "Copy this verification link:",
            verificationUrl
        );

    }

}


async function logout() {

    await signOut(auth);

    window.location.replace(
        "../pages/login.html"
    );

}


downloadPdfBtn?.addEventListener(
    "click",
    downloadCertificatePdf
);

copyVerificationBtn?.addEventListener(
    "click",
    copyVerificationLink
);

logoutBtn?.addEventListener(
    "click",
    logout
);


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
                    "../pages/login.html?redirect=certificate"
                );

                return;

            }

            currentUser = user;

            if (initialized) {
                return;
            }

            initialized = true;

            await loadCertificate();

        }
    );

}
