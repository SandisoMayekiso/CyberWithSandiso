/* =========================================================
   CWS ACADEMY
   CERTIFICATE VIEW CONTROLLER
   File: js/certificate-view.js
========================================================= */

"use strict";


/* =========================================================
   FIREBASE AUTH
========================================================= */

import {
    onAuthStateChanged,
    signOut
} from
"https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";


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
    auth,
    db
} from "./firebase-config.js";


/* =========================================================
   COURSE REGISTRY
========================================================= */

/*
 * Import the complete course-registry namespace instead of
 * assuming a specific named export.
 *
 * This prevents certificate.html from failing if courses.js
 * exports getCourse() but not a variable literally named
 * "courses".
 */

import * as CourseRegistry
from "../data/courses.js";


/* =========================================================
   DOM
========================================================= */

const studentName =
    document.getElementById(
        "studentName"
    );

const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );


const certificateLoading =
    document.getElementById(
        "certificateLoading"
    );

const certificateError =
    document.getElementById(
        "certificateError"
    );

const certificateErrorText =
    document.getElementById(
        "certificateErrorText"
    );

const certificateContent =
    document.getElementById(
        "certificateContent"
    );


const certificateStudent =
    document.getElementById(
        "certificateStudent"
    );

const certificateCourse =
    document.getElementById(
        "certificateCourse"
    );

const certificateDescription =
    document.getElementById(
        "certificateDescription"
    );

const certificateScore =
    document.getElementById(
        "certificateScore"
    );

const certificateDate =
    document.getElementById(
        "certificateDate"
    );

const certificateCredential =
    document.getElementById(
        "certificateCredential"
    );

const certificateVerifyUrl =
    document.getElementById(
        "certificateVerifyUrl"
    );

const certificateQr =
    document.getElementById(
        "certificateQr"
    );


const downloadPdfBtn =
    document.getElementById(
        "downloadPdfBtn"
    );


const printPdfBtn =
    document.getElementById(
        "printPdfBtn"
    );

const copyVerificationBtn =
    document.getElementById(
        "copyVerificationBtn"
    );

const linkedinShareBtn =
    document.getElementById(
        "linkedinShareBtn"
    );

const openVerificationBtn =
    document.getElementById(
        "openVerificationBtn"
    );


/* =========================================================
   STATE
========================================================= */

let currentUser =
    null;

let currentCourse =
    null;

let currentProgress =
    null;

let currentCredentialId =
    "";

let currentVerificationUrl =
    "";

let initialized =
    false;


/* =========================================================
   PAGE STATE
========================================================= */

function showLoading() {

    if (certificateLoading) {
        certificateLoading.hidden =
            false;
    }


    if (certificateError) {
        certificateError.hidden =
            true;
    }


    if (certificateContent) {
        certificateContent.hidden =
            true;
    }

}


function showError(message) {

    if (certificateLoading) {
        certificateLoading.hidden =
            true;
    }


    if (certificateContent) {
        certificateContent.hidden =
            true;
    }


    if (certificateErrorText) {
        certificateErrorText.textContent =
            message;
    }


    if (certificateError) {
        certificateError.hidden =
            false;
    }

}


function showContent() {

    if (certificateLoading) {
        certificateLoading.hidden =
            true;
    }


    if (certificateError) {
        certificateError.hidden =
            true;
    }


    if (certificateContent) {
        certificateContent.hidden =
            false;
    }


    /*
     * Always reset certificate action buttons when a valid
     * certificate has finished loading. This prevents a stale
     * disabled state from making PDF download appear unavailable.
     */

    if (downloadPdfBtn) {

        downloadPdfBtn.disabled =
            false;

        downloadPdfBtn.removeAttribute(
            "aria-disabled"
        );

        downloadPdfBtn.title =
            "Download certificate as PDF";

    }


    if (printPdfBtn) {

        printPdfBtn.disabled =
            false;

    }

}


/* =========================================================
   URL
========================================================= */

function getCourseIdFromUrl() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    return String(
        params.get("course") ||
        ""
    )
        .trim()
        .toLowerCase();

}


/* =========================================================
   USER NAME
========================================================= */

function getUserName(user) {

    if (
        typeof user?.displayName ===
            "string" &&
        user.displayName.trim()
    ) {

        return user.displayName.trim();

    }


    if (
        typeof user?.email ===
            "string" &&
        user.email.includes("@")
    ) {

        const raw =
            user.email
                .split("@")[0]
                .replace(
                    /[._-]+/g,
                    " "
                )
                .trim();


        if (raw) {

            return raw
                .split(" ")
                .map(
                    word =>
                        word
                            .charAt(0)
                            .toUpperCase() +
                        word.slice(1)
                )
                .join(" ");

        }

    }


    return "Student";

}


/* =========================================================
   COURSE LOOKUP
========================================================= */

function normalizeCourseCollection(value) {

    if (
        Array.isArray(value)
    ) {

        return value.filter(
            course =>
                course &&
                typeof course ===
                    "object"
        );

    }


    if (
        value &&
        typeof value ===
            "object"
    ) {

        return Object.values(value)
            .filter(
                course =>
                    course &&
                    typeof course ===
                        "object"
            );

    }


    return [];

}


function getCourseById(courseId) {

    if (!courseId) {
        return null;
    }


    /*
     * Preferred registry function.
     */

    if (
        typeof CourseRegistry
            .getCourse ===
        "function"
    ) {

        try {

            const course =
                CourseRegistry
                    .getCourse(
                        courseId
                    );


            if (course) {
                return course;
            }

        }
        catch (error) {

            console.warn(
                "[CWS Certificate] getCourse() failed:",
                error
            );

        }

    }


    /*
     * Known collection export names.
     */

    const candidates = [

        CourseRegistry.courses,

        CourseRegistry.COURSES,

        CourseRegistry.courseRegistry,

        CourseRegistry.COURSE_REGISTRY,

        CourseRegistry.allCourses

    ];


    for (
        const candidate of
        candidates
    ) {

        const courses =
            normalizeCourseCollection(
                candidate
            );


        const match =
            courses.find(
                course =>
                    String(
                        course?.id ||
                        ""
                    )
                        .trim()
                        .toLowerCase() ===
                    courseId
            );


        if (match) {
            return match;
        }

    }


    /*
     * Final fallback:
     * inspect all registry exports.
     */

    for (
        const value of
        Object.values(
            CourseRegistry
        )
    ) {

        const courses =
            normalizeCourseCollection(
                value
            );


        const match =
            courses.find(
                course =>
                    String(
                        course?.id ||
                        ""
                    )
                        .trim()
                        .toLowerCase() ===
                    courseId
            );


        if (match) {
            return match;
        }

    }


    return null;

}


/* =========================================================
   PROGRESS NORMALIZATION
========================================================= */

function normalizeProgress(
    data = {}
) {

    return {

        completedLessons:
            Array.isArray(
                data.completedLessons
            )
                ? data.completedLessons
                : [],

        completedLabs:
            Array.isArray(
                data.completedLabs
            )
                ? data.completedLabs
                : [],

        completedAssessments:
            Array.isArray(
                data.completedAssessments
            )
                ? data.completedAssessments
                : [],

        finalAssessment:
            (
                data.finalAssessment &&
                typeof data.finalAssessment ===
                    "object"
            )
                ? data.finalAssessment
                : {
                    score: 0,
                    bestScore: 0,
                    passed: false
                },

        completed:
            Boolean(
                data.completed
            ),

        certificateEligible:
            Boolean(
                data.certificateEligible
            ),

        certificate:
            (
                data.certificate &&
                typeof data.certificate ===
                    "object"
            )
                ? data.certificate
                : {},

        completedAt:
            data.completedAt ||
            null,

        updatedAt:
            data.updatedAt ||
            null

    };

}


/* =========================================================
   LOAD COURSE PROGRESS
========================================================= */

async function loadCourseProgress(
    courseId
) {

    if (
        !db ||
        !currentUser
    ) {

        return null;

    }


    const ref =
        doc(
            db,
            "users",
            currentUser.uid,
            "courseProgress",
            courseId
        );


    const snapshot =
        await getDoc(
            ref
        );


    if (
        !snapshot.exists()
    ) {

        return null;

    }


    return normalizeProgress(
        snapshot.data()
    );

}


/* =========================================================
   CERTIFICATE ELIGIBILITY
========================================================= */

function certificateWasEarned(
    progress
) {

    return Boolean(
        progress &&
        (
            progress.completed ||
            progress
                .certificateEligible
        )
    );

}


/* =========================================================
   CREDENTIAL ID
========================================================= */

function buildFallbackCredentialId(
    courseId,
    uid
) {

    const coursePart =
        String(
            courseId ||
            "COURSE"
        )
            .replace(
                /[^a-z0-9]/gi,
                ""
            )
            .slice(
                0,
                8
            )
            .toUpperCase();


    const userPart =
        String(
            uid ||
            "STUDENT"
        )
            .replace(
                /[^a-z0-9]/gi,
                ""
            )
            .slice(
                0,
                8
            )
            .toUpperCase();


    return (
        `CWS-${coursePart}-${userPart}`
    );

}


function getCredentialId() {

    const stored =
        currentProgress
            ?.certificate
            ?.credentialId;


    if (
        typeof stored ===
            "string" &&
        stored.trim()
    ) {

        return stored
            .trim()
            .toUpperCase();

    }


    /*
     * Older completion documents may pre-date automatic
     * certificate issuance. Give them a deterministic
     * display ID rather than breaking the page.
     */

    return buildFallbackCredentialId(
        currentCourse.id,
        currentUser.uid
    );

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


function getIssueDateValue() {

    return (
        currentProgress
            ?.certificate
            ?.issuedAt ||
        currentProgress
            ?.completedAt ||
        currentProgress
            ?.updatedAt ||
        null
    );

}


function formatDate(value) {

    const date =
        toDate(value);


    if (!date) {

        return "Completion recorded";

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
   FINAL SCORE
========================================================= */

function getFinalScore() {

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


    return Number.isFinite(score)
        ? score
        : 0;

}


/* =========================================================
   VERIFICATION URL
========================================================= */

function buildVerificationUrl(
    credentialId
) {

    const relative =
        `../pages/verify-certificate.html?credential=${encodeURIComponent(
            credentialId
        )}`;


    return new URL(
        relative,
        window.location.href
    )
        .href;

}


/* =========================================================
   QR CODE
========================================================= */

async function renderQrCode() {

    if (!certificateQr) {
        return;
    }


    /*
     * qrcode may not load if the CDN is blocked.
     * Do not allow that to break the certificate page.
     */

    if (
        !window.QRCode ||
        typeof window.QRCode
            .toCanvas !==
        "function"
    ) {

        console.warn(
            "[CWS Certificate] QR library unavailable."
        );


        const context =
            certificateQr
                .getContext(
                    "2d"
                );


        if (context) {

            context.fillStyle =
                "#ffffff";

            context.fillRect(
                0,
                0,
                certificateQr.width,
                certificateQr.height
            );


            context.fillStyle =
                "#111111";

            context.font =
                "12px sans-serif";

            context.textAlign =
                "center";


            context.fillText(
                "QR unavailable",
                certificateQr.width /
                    2,
                certificateQr.height /
                    2
            );

        }


        return;

    }


    try {

        await window.QRCode.toCanvas(
            certificateQr,
            currentVerificationUrl,
            {
                width:
                    130,

                margin:
                    1,

                errorCorrectionLevel:
                    "M"
            }
        );

    }
    catch (error) {

        console.warn(
            "[CWS Certificate] QR generation failed:",
            error
        );

    }

}


/* =========================================================
   CERTIFICATE THEME
========================================================= */

function isCurrentCoursePro() {

    return (
        String(
            currentCourse?.access ||
            ""
        )
            .trim()
            .toLowerCase() ===
            "pro" ||

        currentCourse?.proOnly ===
            true
    );

}


function applyCertificateTheme() {

    const isPro =
        isCurrentCoursePro();


    const documentElement =
        document.getElementById(
            "certificateDocument"
        );


    document.body.classList.toggle(
        "pro-certificate-page",
        isPro
    );


    if (documentElement) {

        documentElement.classList.toggle(
            "pro-certificate",
            isPro
        );

    }


    const eyebrow =
        document.querySelector(
            ".certificate-page-heading .certificate-eyebrow"
        );


    if (eyebrow) {

        eyebrow.textContent =
            isPro
                ? "CWS ACADEMY • PRO VERIFIED ACHIEVEMENT"
                : "CWS ACADEMY • VERIFIED ACHIEVEMENT";

    }


    const pageHeading =
        document.querySelector(
            ".certificate-page-heading h1"
        );


    if (pageHeading) {

        pageHeading.textContent =
            isPro
                ? "CWS Pro Certificate"
                : "Course Certificate";

    }


    const verifiedBadge =
        document.querySelector(
            ".certificate-verified-badge"
        );


    if (verifiedBadge) {

        verifiedBadge.innerHTML =
            isPro
                ? `
                    <i class="fa-solid fa-crown"></i>
                    CWS PRO VERIFIED
                  `
                : `
                    <i class="fa-solid fa-circle-check"></i>
                    VERIFIED
                  `;

    }


    const kicker =
        document.querySelector(
            ".certificate-kicker"
        );


    if (kicker) {

        kicker.textContent =
            isPro
                ? "CWS PRO • VERIFIED CERTIFICATE OF COMPLETION"
                : "CERTIFICATE OF COMPLETION";

    }


    const brand =
        document.querySelector(
            ".certificate-brand"
        );


    if (
        isPro &&
        brand &&
        !brand.querySelector(
            ".pro-certificate-ribbon"
        )
    ) {

        const ribbon =
            document.createElement(
                "span"
            );


        ribbon.className =
            "pro-certificate-ribbon";


        ribbon.innerHTML = `
            <i class="fa-solid fa-crown"></i>
            PREMIUM PRACTICAL TRAINING
        `;


        brand.appendChild(
            ribbon
        );

    }

}


/* =========================================================
   RENDER CERTIFICATE
========================================================= */

async function renderCertificate() {

    applyCertificateTheme();


    const name =
        getUserName(
            currentUser
        );


    currentCredentialId =
        getCredentialId();


    currentVerificationUrl =
        buildVerificationUrl(
            currentCredentialId
        );


    if (studentName) {

        studentName.textContent =
            name;

    }


    if (certificateStudent) {

        certificateStudent.textContent =
            name;

    }


    if (certificateCourse) {

        certificateCourse.textContent =
            currentCourse.title ||
            "CWS Academy Course";

    }


    if (certificateDescription) {

        certificateDescription.textContent =
            currentCourse.description ||
            "CWS Academy course completion.";

    }


    const score =
        getFinalScore();


    if (certificateScore) {

        certificateScore.textContent =
            score > 0
                ? `${score}%`
                : "Passed";

    }


    if (certificateDate) {

        certificateDate.textContent =
            formatDate(
                getIssueDateValue()
            );

    }


    if (certificateCredential) {

        certificateCredential.textContent =
            currentCredentialId;

    }


    if (certificateVerifyUrl) {

        certificateVerifyUrl.textContent =
            currentVerificationUrl;

    }


    if (openVerificationBtn) {

        openVerificationBtn.href =
            currentVerificationUrl;

    }


    if (linkedinShareBtn) {

        linkedinShareBtn.href =
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                currentVerificationUrl
            )}`;

    }


    await renderQrCode();


    document.title =
        `${currentCourse.title} Certificate | CWS Academy`;


    showContent();

}


/* =========================================================
   LOAD CERTIFICATE PAGE
========================================================= */

async function loadCertificatePage() {

    showLoading();


    const courseId =
        getCourseIdFromUrl();


    if (!courseId) {

        showError(
            "The certificate URL is missing the course parameter."
        );


        return;

    }


    currentCourse =
        getCourseById(
            courseId
        );


    if (!currentCourse) {

        showError(
            "The requested course could not be found in the CWS Academy course registry."
        );


        return;

    }


    try {

        currentProgress =
            await loadCourseProgress(
                courseId
            );

    }
    catch (error) {

        console.error(
            "[CWS Certificate] Firestore load failed:",
            error
        );


        showError(
            "CWS Academy could not read your course completion record."
        );


        return;

    }


    if (!currentProgress) {

        showError(
            "No course progress record exists for this certificate."
        );


        return;

    }


    if (
        !certificateWasEarned(
            currentProgress
        )
    ) {

        showError(
            "This certificate has not been earned yet. Complete the required course pathway first."
        );


        return;

    }


    try {

        await renderCertificate();

    }
    catch (error) {

        console.error(
            "[CWS Certificate] Rendering failed:",
            error
        );


        showError(
            "The certificate data was found, but the certificate could not be displayed."
        );

    }

}


/* =========================================================
   FILE NAME
========================================================= */

function safeFileName(value) {

    return String(
        value ||
        "certificate"
    )
        .trim()
        .replace(
            /[^a-z0-9_-]+/gi,
            "-"
        )
        .replace(
            /-+/g,
            "-"
        )
        .replace(
            /^-|-$/g,
            ""
        )
        .toLowerCase();

}


/* =========================================================
   DOWNLOAD PDF
========================================================= */

function getJsPdfConstructor() {

    const namespace =
        window.jspdf;


    if (
        namespace &&
        typeof namespace.jsPDF ===
            "function"
    ) {

        return namespace.jsPDF;

    }


    if (
        typeof window.jsPDF ===
            "function"
    ) {

        return window.jsPDF;

    }


    return null;

}


function printCertificateAsPdf() {

    if (
        !currentCourse ||
        !currentProgress
    ) {

        alert(
            "The certificate is not ready yet."
        );

        return;
    }


    document.body.classList.add(
        "certificate-print-mode"
    );


    window.setTimeout(
        () => {

            window.print();


            window.setTimeout(
                () => {

                    document.body.classList.remove(
                        "certificate-print-mode"
                    );

                },
                300
            );

        },
        80
    );

}


async function downloadCertificatePdf() {

    if (
        !currentCourse ||
        !currentProgress
    ) {

        alert(
            "The certificate is not ready yet. Please wait for it to finish loading."
        );

        return;
    }


    const JsPDF =
        getJsPdfConstructor();


    if (!JsPDF) {

        console.error(
            "[CWS Certificate] jsPDF is unavailable.",
            {
                jspdf:
                    window.jspdf,
                jsPDF:
                    window.jsPDF
            }
        );


        const usePrint =
            window.confirm(
                "The direct PDF generator is unavailable in this browser. Would you like to open the browser Print dialog so you can choose “Save as PDF” instead?"
            );


        if (usePrint) {

            printCertificateAsPdf();

        }


        return;
    }


    const originalButtonHtml =
        downloadPdfBtn
            ?.innerHTML;


    if (downloadPdfBtn) {

        downloadPdfBtn.disabled =
            true;


        downloadPdfBtn.innerHTML =
            '<i class="fa-solid fa-circle-notch fa-spin"></i> Preparing PDF...';

    }


    try {

        const pdf =
            new JsPDF({
                orientation:
                    "landscape",

                unit:
                    "mm",

                format:
                    "a4",

                compress:
                    true
            });


        const width =
            pdf.internal
                .pageSize
                .getWidth();


        const height =
            pdf.internal
                .pageSize
                .getHeight();


        const isProCertificate =
            isCurrentCoursePro();


        const accentColor =
            isProCertificate
                ? [246, 196, 83]
                : [220, 48, 48];


        const accentDarkColor =
            isProCertificate
                ? [183, 121, 31]
                : [160, 24, 24];


        /*
         * BACKGROUND
         */

        pdf.setFillColor(
            isProCertificate ? 11 : 10,
            isProCertificate ? 9 : 10,
            isProCertificate ? 5 : 10
        );


        pdf.rect(
            0,
            0,
            width,
            height,
            "F"
        );


        /*
         * BORDERS
         */

        pdf.setDrawColor(
            ...accentDarkColor
        );


        pdf.setLineWidth(
            0.8
        );


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


        pdf.setLineWidth(
            0.25
        );


        pdf.rect(
            10,
            10,
            width - 20,
            height - 20
        );


        /*
         * BRAND
         */

        pdf.setTextColor(
            ...accentColor
        );


        pdf.setFont(
            "helvetica",
            "bold"
        );


        pdf.setFontSize(
            17
        );


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


        pdf.setFontSize(
            8
        );


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


        pdf.setFontSize(
            9
        );


        pdf.text(
            isProCertificate
                ? "CWS PRO VERIFIED"
                : "VERIFIED ACHIEVEMENT",
            width - 20,
            24,
            {
                align:
                    "right"
            }
        );


        /*
         * CERTIFICATE HEADING
         */

        pdf.setTextColor(
            ...accentColor
        );


        pdf.setFontSize(
            10
        );


        pdf.text(
            isProCertificate
                ? "CWS PRO • CERTIFICATE OF COMPLETION"
                : "CERTIFICATE OF COMPLETION",
            width / 2,
            49,
            {
                align:
                    "center"
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


        pdf.setFontSize(
            11
        );


        pdf.text(
            "This certificate is proudly awarded to",
            width / 2,
            62,
            {
                align:
                    "center"
            }
        );


        /*
         * STUDENT NAME
         */

        const learnerName =
            getUserName(
                currentUser
            ) ||
            "Student";


        pdf.setTextColor(
            248,
            248,
            248
        );


        pdf.setFont(
            "times",
            "normal"
        );


        pdf.setFontSize(
            29
        );


        const learnerLines =
            pdf.splitTextToSize(
                String(
                    learnerName
                ),
                190
            );


        pdf.text(
            learnerLines,
            width / 2,
            79,
            {
                align:
                    "center"
            }
        );


        pdf.setDrawColor(
            ...accentDarkColor
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


        pdf.setFontSize(
            11
        );


        pdf.text(
            "for successfully completing",
            width / 2,
            98,
            {
                align:
                    "center"
            }
        );


        /*
         * COURSE TITLE
         */

        pdf.setTextColor(
            248,
            248,
            248
        );


        pdf.setFont(
            "helvetica",
            "bold"
        );


        pdf.setFontSize(
            22
        );


        const titleLines =
            pdf.splitTextToSize(
                String(
                    currentCourse.title ||
                    "CWS ACADEMY COURSE"
                )
                    .toUpperCase(),
                185
            );


        pdf.text(
            titleLines,
            width / 2,
            112,
            {
                align:
                    "center"
            }
        );


        /*
         * COURSE DESCRIPTION
         */

        pdf.setTextColor(
            160,
            160,
            160
        );


        pdf.setFont(
            "helvetica",
            "normal"
        );


        pdf.setFontSize(
            8.5
        );


        const descriptionLines =
            pdf.splitTextToSize(
                String(
                    currentCourse.description ||
                    "CWS Academy course completion."
                ),
                170
            );


        pdf.text(
            descriptionLines,
            width / 2,
            128,
            {
                align:
                    "center"
            }
        );


        /*
         * DETAIL ROW
         */

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


        const score =
            getFinalScore();


        const values = [
            score > 0
                ? `${score}%`
                : "PASSED",

            formatDate(
                getIssueDateValue()
            ),

            currentCredentialId ||
            "CWS-CREDENTIAL"
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


                pdf.setFontSize(
                    6.5
                );


                pdf.text(
                    label,
                    centers[index],
                    158,
                    {
                        align:
                            "center"
                    }
                );


                pdf.setTextColor(
                    235,
                    235,
                    235
                );


                pdf.setFontSize(
                    8
                );


                const valueLines =
                    pdf.splitTextToSize(
                        String(
                            values[index]
                        ),
                        66
                    );


                pdf.text(
                    valueLines,
                    centers[index],
                    164,
                    {
                        align:
                            "center"
                    }
                );

            }
        );


        /*
         * QR CODE
         */

        if (
            certificateQr &&
            currentVerificationUrl
        ) {

            try {

                const qrImage =
                    certificateQr
                        .toDataURL(
                            "image/png"
                        );


                if (
                    qrImage &&
                    qrImage.startsWith(
                        "data:image/png"
                    )
                ) {

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


                    pdf.setFontSize(
                        6.5
                    );


                    pdf.text(
                        "SCAN TO VERIFY",
                        width / 2,
                        204,
                        {
                            align:
                                "center"
                        }
                    );

                }

            }
            catch (error) {

                console.warn(
                    "[CWS Certificate] QR image could not be added to PDF:",
                    error
                );

            }

        }


        /*
         * SIGNATURE
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


        pdf.setFontSize(
            8
        );


        pdf.text(
            "CyberWithSandiso",
            49.5,
            195,
            {
                align:
                    "center"
            }
        );


        pdf.setTextColor(
            125,
            125,
            125
        );


        pdf.setFontSize(
            6.5
        );


        pdf.text(
            "CWS Academy",
            49.5,
            199,
            {
                align:
                    "center"
            }
        );


        /*
         * VERIFICATION
         */

        pdf.setTextColor(
            216,
            40,
            40
        );


        pdf.setFont(
            "helvetica",
            "bold"
        );


        pdf.setFontSize(
            7
        );


        pdf.text(
            "CWS ACADEMY VERIFIED",
            width - 23,
            191,
            {
                align:
                    "right"
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


        pdf.setFontSize(
            5.7
        );


        if (
            currentVerificationUrl
        ) {

            const verifyLines =
                pdf.splitTextToSize(
                    currentVerificationUrl,
                    72
                );


            pdf.text(
                verifyLines,
                width - 23,
                196,
                {
                    align:
                        "right"
                }
            );

        }


        /*
         * DOWNLOAD
         *
         * First try the standard jsPDF save method.
         * If the browser blocks or fails that method, create a
         * Blob URL and trigger a normal anchor download.
         */

        const fileName =
            `${safeFileName(
                currentCourse.title
            ) || "cws-course"}-cws-certificate.pdf`;


        let downloaded =
            false;


        try {

            pdf.save(
                fileName
            );


            downloaded =
                true;

        }
        catch (saveError) {

            console.warn(
                "[CWS Certificate] pdf.save() failed. Trying Blob download.",
                saveError
            );

        }


        if (!downloaded) {

            const blob =
                pdf.output(
                    "blob"
                );


            if (
                !(blob instanceof Blob) ||
                blob.size === 0
            ) {

                throw new Error(
                    "The generated PDF Blob is empty."
                );

            }


            const objectUrl =
                URL.createObjectURL(
                    blob
                );


            const link =
                document.createElement(
                    "a"
                );


            link.href =
                objectUrl;


            link.download =
                fileName;


            link.style.display =
                "none";


            document.body.appendChild(
                link
            );


            link.click();


            link.remove();


            window.setTimeout(
                () => {

                    URL.revokeObjectURL(
                        objectUrl
                    );

                },
                1500
            );

        }


        console.info(
            "[CWS Certificate] PDF download requested:",
            fileName
        );

    }
    catch (error) {

        console.error(
            "[CWS Certificate] PDF generation failed:",
            error
        );


        alert(
            "The certificate PDF could not be generated. Open the browser console for details, then try again."
        );

    }
    finally {

        if (downloadPdfBtn) {

            downloadPdfBtn.disabled =
                false;


            if (
                originalButtonHtml
            ) {

                downloadPdfBtn.innerHTML =
                    originalButtonHtml;

            }

        }

    }

}


/* =========================================================
   COPY VERIFICATION LINK
========================================================= */

async function copyVerificationLink() {

    if (
        !currentVerificationUrl
    ) {

        return;

    }


    try {

        await navigator.clipboard
            .writeText(
                currentVerificationUrl
            );


        if (
            copyVerificationBtn
        ) {

            const original =
                copyVerificationBtn
                    .innerHTML;


            copyVerificationBtn.innerHTML =
                '<i class="fa-solid fa-check"></i> Copied';


            window.setTimeout(
                () => {

                    copyVerificationBtn
                        .innerHTML =
                        original;

                },
                1600
            );

        }

    }
    catch (error) {

        console.warn(
            "[CWS Certificate] Clipboard unavailable:",
            error
        );


        window.prompt(
            "Copy this verification link:",
            currentVerificationUrl
        );

    }

}


/* =========================================================
   LOGOUT
========================================================= */

async function logout() {

    try {

        if (logoutBtn) {

            logoutBtn.disabled =
                true;

        }


        await signOut(
            auth
        );


        window.location.replace(
            "../pages/login.html"
        );

    }
    catch (error) {

        console.error(
            "[CWS Certificate] Logout failed:",
            error
        );


        if (logoutBtn) {

            logoutBtn.disabled =
                false;

        }

    }

}


/* =========================================================
   EVENTS
========================================================= */

downloadPdfBtn
    ?.addEventListener(
        "click",
        downloadCertificatePdf
    );


printPdfBtn
    ?.addEventListener(
        "click",
        printCertificateAsPdf
    );


copyVerificationBtn
    ?.addEventListener(
        "click",
        copyVerificationLink
    );


logoutBtn
    ?.addEventListener(
        "click",
        logout
    );


/* =========================================================
   AUTH
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

                const courseId =
                    getCourseIdFromUrl();


                window.location.replace(
                    "../pages/login.html" +
                    "?redirect=certificate" +
                    `&course=${encodeURIComponent(
                        courseId
                    )}`
                );


                return;

            }


            currentUser =
                user;


            if (studentName) {

                studentName.textContent =
                    getUserName(
                        user
                    );

            }


            if (initialized) {

                return;

            }


            initialized =
                true;


            try {

                await loadCertificatePage();

            }
            catch (error) {

                console.error(
                    "[CWS Certificate] Initialization failed:",
                    error
                );


                showError(
                    "An unexpected error occurred while loading the certificate."
                );

            }

        }
    );

}
