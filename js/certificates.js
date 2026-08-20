/* =========================================================
   CWS ACADEMY
   CERTIFICATES CONTROLLER
   Dynamic Course Registry + Firestore Progress
========================================================= */

"use strict";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

import {
    auth,
    db
} from "./firebase-config.js";

import {
    courses
} from "../data/courses.js";

import {
    getLearningPath
} from "../data/learning-paths.js";


let currentUser = null;
let progressMap = new Map();

let careerPathCredentials = [];

let certificates = [];

let certificatePaths = [];

let initialized = false;


const studentName =
    document.getElementById("studentName");

const logoutBtn =
    document.getElementById("logoutBtn");


function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


function clamp(value) {

    const number = Number(value);

    if (!Number.isFinite(number)) {
        return 0;
    }

    return Math.min(
        Math.max(
            Math.round(number),
            0
        ),
        100
    );

}


function getAllCourses() {

    return courses
        ? Object.values(courses)
        : [];

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


function normalizeProgress(
    courseId,
    data = {}
) {

    return {

        courseId,

        completedLessons:
            Array.isArray(data.completedLessons)
                ? data.completedLessons
                : [],

        completedLabs:
            Array.isArray(data.completedLabs)
                ? data.completedLabs
                : [],

        completedAssessments:
            Array.isArray(data.completedAssessments)
                ? data.completedAssessments
                : [],

        finalAssessment:
            (
                data.finalAssessment &&
                typeof data.finalAssessment === "object"
            )
                ? data.finalAssessment
                : {
                    score: 0,
                    bestScore: 0,
                    passed: false
                },

        progressPercent:
            Number(data.progressPercent || 0),

        started:
            Boolean(data.started),

        completed:
            Boolean(data.completed),

        certificateEligible:
            Boolean(data.certificateEligible),

        certificate:
            (
                data.certificate &&
                typeof data.certificate === "object"
            )
                ? data.certificate
                : {},

        completedAt:
            data.completedAt || null,

        updatedAt:
            data.updatedAt || null

    };

}


async function loadProgress() {

    progressMap = new Map();

    if (!db || !currentUser) {
        return;
    }

    try {

        const ref =
            collection(
                db,
                "users",
                currentUser.uid,
                "courseProgress"
            );

        const snapshot =
            await getDocs(ref);

        snapshot.forEach(
            item => {

                progressMap.set(
                    item.id,
                    normalizeProgress(
                        item.id,
                        item.data()
                    )
                );

            }
        );

    }
    catch (error) {

        console.error(
            "[CWS Certificates] Failed to load progress:",
            error
        );

    }

}


/* =========================================================
   CAREER PATH CREDENTIALS
========================================================= */

function normalizeCareerPathCredential(
    pathId,
    data = {}
) {

    const path =
        getLearningPath(
            pathId
        );


    return {

        pathId,

        pathTitle:
            data.pathTitle ||
            path?.title ||
            "CWS Career Path",

        shortTitle:
            path?.shortTitle ||
            data.pathTitle ||
            "Career Path",

        description:
            path?.description ||
            "Verified completion of a CWS Academy career learning path and practical capstone.",

        credentialTitle:
            data.credentialTitle ||
            path?.credentialTitle ||
            `CWS ${data.pathTitle || path?.title || "Career Path"} Certificate`,

        credentialId:
            data.credentialId ||
            "",

        issuedAt:
            data.issuedAt ||
            data.createdAt ||
            data.updatedAt ||
            null,

        capstoneScore:
            Number(
                data.capstoneScore ||
                0
            ),

        status:
            String(
                data.status ||
                "verified"
            )
                .trim()
                .toLowerCase()

    };

}


async function loadCareerPathCredentials() {

    careerPathCredentials =
        [];


    if (
        !db ||
        !currentUser
    ) {
        return;
    }


    try {

        const ref =
            collection(
                db,
                "users",
                currentUser.uid,
                "careerPathCertificates"
            );


        const snapshot =
            await getDocs(
                ref
            );


        snapshot.forEach(
            item => {

                const credential =
                    normalizeCareerPathCredential(
                        item.id,
                        item.data()
                    );


                if (
                    credential.status ===
                    "verified"
                ) {

                    careerPathCredentials.push(
                        credential
                    );

                }

            }
        );


        careerPathCredentials.sort(
            (
                a,
                b
            ) => {

                const dateA =
                    timestampToDate(
                        a.issuedAt
                    )?.getTime() ||
                    0;

                const dateB =
                    timestampToDate(
                        b.issuedAt
                    )?.getTime() ||
                    0;


                return (
                    dateB -
                    dateA
                );

            }
        );

    }
    catch (error) {

        console.error(
            "[CWS Certificates] Failed to load career-path credentials:",
            error
        );

    }

}


function getModuleActivities(module) {

    return [
        ...(
            Array.isArray(module?.labActivities)
                ? module.labActivities
                : []
        ),
        ...(
            Array.isArray(module?.practiceActivities)
                ? module.practiceActivities
                : []
        )
    ];

}


function getRequirements(course) {

    const lessonKeys = [];
    const labKeys = [];
    const assessmentKeys = [];

    const modules =
        Array.isArray(course?.modules)
            ? course.modules
            : [];

    modules.forEach(
        module => {

            (
                Array.isArray(module.lessons)
                    ? module.lessons
                    : []
            )
                .forEach(
                    lesson => {

                        lessonKeys.push(
                            `${module.id}:${lesson.id}`
                        );

                    }
                );

            if (
                course?.completionRules
                    ?.requireRequiredLabs
            ) {

                getModuleActivities(module)
                    .forEach(
                        activity => {

                            labKeys.push(
                                `${module.id}:${activity.id}`
                            );

                        }
                    );

            }

            const assessment =
                module.moduleAssessment;

            if (
                course?.completionRules
                    ?.requireAllModuleAssessments !== false &&
                assessment &&
                Array.isArray(
                    assessment.questions
                ) &&
                assessment.questions.length
            ) {

                assessmentKeys.push(
                    `${module.id}:assessment`
                );

            }

        }
    );

    return {
        lessonKeys,
        labKeys,
        assessmentKeys,
        finalRequired:
            Boolean(
                course?.finalAssessment
            )
    };

}


function calculateCourseProgress(
    course,
    progress
) {

    if (!progress) {
        return 0;
    }

    const requirements =
        getRequirements(course);

    const total =
        requirements.lessonKeys.length +
        requirements.labKeys.length +
        requirements.assessmentKeys.length +
        (
            requirements.finalRequired
                ? 1
                : 0
        );

    if (!total) {
        return clamp(
            progress.progressPercent
        );
    }

    const completedLessons =
        requirements.lessonKeys.filter(
            key =>
                progress.completedLessons
                    .includes(key)
        ).length;

    const completedLabs =
        requirements.labKeys.filter(
            key =>
                progress.completedLabs
                    .includes(key)
        ).length;

    const completedAssessments =
        requirements.assessmentKeys.filter(
            key =>
                progress.completedAssessments
                    .includes(key)
        ).length;

    const finalCompleted =
        requirements.finalRequired &&
        progress.finalAssessment?.passed
            ? 1
            : 0;

    return clamp(
        (
            completedLessons +
            completedLabs +
            completedAssessments +
            finalCompleted
        ) /
        total *
        100
    );

}


function isCertificateEarned(
    course,
    progress
) {

    if (!progress) {
        return false;
    }

    return Boolean(
        progress.certificateEligible ||
        progress.completed
    );

}


function timestampToDate(value) {

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
            value.seconds * 1000
        );
    }

    const date =
        new Date(value);

    return Number.isNaN(
        date.getTime()
    )
        ? null
        : date;

}


function formatCertificateDate(value) {

    const date =
        timestampToDate(value);

    if (!date) {
        return "Completion recorded";
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


function createCredentialId(
    course,
    progress
) {

    if (
        progress?.certificate
            ?.credentialId
    ) {
        return String(
            progress.certificate
                .credentialId
        );
    }

    const uidPart =
        currentUser?.uid
            ? currentUser.uid
                .slice(0, 8)
                .toUpperCase()
            : "STUDENT";

    const coursePart =
        String(course.id)
            .replace(/[^a-z0-9]/gi, "")
            .slice(0, 8)
            .toUpperCase();

    return `CWS-${coursePart}-${uidPart}`;

}


function buildCertificateData() {

    certificates = [];
    certificatePaths = [];

    getAllCourses()
        .forEach(
            course => {

                const progress =
                    progressMap.get(
                        course.id
                    ) || null;

                const percentage =
                    calculateCourseProgress(
                        course,
                        progress
                    );

                const earned =
                    isCertificateEarned(
                        course,
                        progress
                    );

                const path = {

                    id:
                        course.id,

                    title:
                        course.title,

                    description:
                        course.description ||
                        "CWS Academy learning pathway.",

                    icon:
                        course.icon ||
                        "fa-solid fa-certificate",

                    level:
                        String(
                            course.level ||
                            "Course"
                        ).toUpperCase(),

                    progress:
                        percentage,

                    status:
                        earned
                            ? "Earned"
                            : course.status ===
                                "available"
                                ? (
                                    progress?.started
                                        ? "In Progress"
                                        : "Available"
                                )
                                : "Planned",

                    earned,

                    started:
                        Boolean(
                            progress?.started
                        )

                };

                certificatePaths.push(
                    path
                );

                if (!earned) {
                    return;
                }

                certificates.push({

                    id:
                        course.id,

                    title:
                        course.title,

                    description:
                        course.description ||
                        "CWS Academy course completion certificate.",

                    level:
                        path.level,

                    issuedDate:
                        progress?.certificate
                            ?.issuedAt ||
                        progress?.completedAt ||
                        progress?.updatedAt,

                    credentialId:
                        createCredentialId(
                            course,
                            progress
                        ),

                    courseCompleted:
                        Boolean(
                            progress?.completed
                        ),

                    finalScore:
                        Number(
                            progress?.finalAssessment
                                ?.bestScore ??
                            progress?.finalAssessment
                                ?.score ??
                            0
                        )

                });

            }
        );

}


/* =========================================================
   CREDENTIAL JOURNEY
========================================================= */

function getEarnedCourseCertificates() {
    return certificates.filter(
        certificate =>
            certificate.earned === true
    );
}

function getEarnedProCertificates() {
    return getEarnedCourseCertificates()
        .filter(
            certificate => {
                const course =
                    courses[
                        certificate.courseId
                    ];

                return (
                    String(
                        course?.access ||
                        ""
                    )
                        .trim()
                        .toLowerCase() ===
                    "pro"
                );
            }
        );
}

function setCredentialTierState(
    element,
    earned,
    label = ""
) {
    if (!element) {
        return;
    }

    element.classList.toggle(
        "earned",
        earned
    );

    element.classList.toggle(
        "locked",
        !earned
    );

    const status =
        element.querySelector(
            ".credential-tier-status"
        );

    if (!status) {
        return;
    }

    status.innerHTML =
        earned
            ? `
                <i class="fa-solid fa-circle-check"></i>
                <span>${escapeHTML(label || "Earned")}</span>
              `
            : `
                <i class="fa-solid fa-lock"></i>
                <span>Locked</span>
              `;
}

function renderCredentialJourney() {
    const courseTier =
        document.getElementById(
            "credentialTierCourse"
        );

    const proTier =
        document.getElementById(
            "credentialTierPro"
        );

    const careerTier =
        document.getElementById(
            "credentialTierCareer"
        );

    const currentLevel =
        document.getElementById(
            "credentialCurrentLevel"
        );

    const nextMilestone =
        document.getElementById(
            "credentialNextMilestone"
        );

    const nextAction =
        document.getElementById(
            "credentialNextAction"
        );

    const earnedCourseCertificates =
        getEarnedCourseCertificates();

    const earnedProCertificates =
        getEarnedProCertificates();

    const hasCourseCredential =
        earnedCourseCertificates.length > 0;

    const hasProCredential =
        earnedProCertificates.length > 0;

    const hasCareerCredential =
        careerPathCredentials.length > 0;

    setCredentialTierState(
        courseTier,
        hasCourseCredential,
        hasCourseCredential
            ? `${earnedCourseCertificates.length} Earned`
            : ""
    );

    setCredentialTierState(
        proTier,
        hasProCredential,
        hasProCredential
            ? `${earnedProCertificates.length} Earned`
            : ""
    );

    setCredentialTierState(
        careerTier,
        hasCareerCredential,
        hasCareerCredential
            ? `${careerPathCredentials.length} Earned`
            : ""
    );

    let levelLabel =
        "Getting Started";

    let nextTitle =
        "Earn your first Course Certificate";

    let nextText =
        "Complete an eligible CWS Academy course to unlock your first verified credential.";

    let nextHref =
        "student-courses.html";

    let nextButton =
        "Browse Courses";

    let nextIcon =
        "fa-book-open";

    if (
        hasCourseCredential &&
        !hasProCredential
    ) {
        levelLabel =
            "Course Certificate";

        nextTitle =
            "Progress to a CWS Pro Certificate";

        nextText =
            "Complete an eligible CWS Pro course and its required assessments and practical work.";

        nextHref =
            "student-courses.html";

        nextButton =
            "Explore Pro Courses";

        nextIcon =
            "fa-crown";
    }

    if (
        hasProCredential &&
        !hasCareerCredential
    ) {
        levelLabel =
            "CWS Pro Certificate";

        nextTitle =
            "Complete a professional Career Path";

        nextText =
            "Finish the required learning path and pass its practical capstone to earn the highest CWS credential tier.";

        nextHref =
            "learning-paths.html";

        nextButton =
            "Continue Career Path";

        nextIcon =
            "fa-route";
    }

    if (hasCareerCredential) {
        levelLabel =
            "Career Path Certificate";

        const latest =
            careerPathCredentials[0];

        nextTitle =
            "Professional credential earned";

        nextText =
            latest
                ? `${latest.pathTitle} is now a verified CWS Career Path credential. Continue building additional specializations as new paths become available.`
                : "Your CWS professional career-path credential has been issued.";

        nextHref =
            latest?.pathId
                ? `career-path-certificate.html?path=${encodeURIComponent(
                    latest.pathId
                )}`
                : "learning-paths.html";

        nextButton =
            "View Professional Credential";

        nextIcon =
            "fa-award";
    }

    if (currentLevel) {
        currentLevel.innerHTML = `
            <span>CURRENT LEVEL</span>
            <strong>${escapeHTML(levelLabel)}</strong>
        `;

        currentLevel.classList.toggle(
            "professional",
            hasCareerCredential
        );

        currentLevel.classList.toggle(
            "pro",
            hasProCredential &&
            !hasCareerCredential
        );
    }

    if (nextMilestone) {
        const icon =
            nextMilestone.querySelector(
                ".credential-next-icon i"
            );

        const heading =
            nextMilestone.querySelector(
                "h3"
            );

        const copy =
            nextMilestone.querySelector(
                "p"
            );

        if (icon) {
            icon.className =
                `fa-solid ${nextIcon}`;
        }

        if (heading) {
            heading.textContent =
                nextTitle;
        }

        if (copy) {
            copy.textContent =
                nextText;
        }

        nextMilestone.classList.toggle(
            "professional-earned",
            hasCareerCredential
        );
    }

    if (nextAction) {
        nextAction.href =
            nextHref;

        nextAction.innerHTML = `
            ${escapeHTML(nextButton)}
            <i class="fa-solid fa-arrow-right"></i>
        `;

        nextAction.classList.toggle(
            "professional",
            hasCareerCredential
        );
    }
}


/* =========================================================
   CERTIFICATE STATISTICS
========================================================= */

function updateCertificateStatistics() {

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

    const completedCourses =
        certificatePaths.filter(
            path =>
                path.progress >= 100 ||
                path.earned
        ).length;

    const activePaths =
        certificatePaths.filter(
            path =>
                path.status !== "Planned"
        ).length;

    const totalEarnedCredentials =
        certificates.length +
        careerPathCredentials.length;


    if (earnedElement) {
        earnedElement.textContent =
            String(
                totalEarnedCredentials
            );
    }

    if (availableElement) {
        availableElement.textContent =
            String(
                activePaths
            );
    }

    if (coursesElement) {
        coursesElement.textContent =
            String(
                completedCourses
            );
    }

    if (achievementsElement) {
        achievementsElement.textContent =
            String(
                totalEarnedCredentials
            );
    }

}


/* =========================================================
   PROFESSIONAL CREDENTIAL CARDS
========================================================= */

function createProfessionalCredentialCard(
    credential
) {

    const card =
        document.createElement(
            "article"
        );


    card.className =
        "professional-credential-card";


    const issuedDate =
        formatCertificateDate(
            credential.issuedAt
        );


    card.innerHTML = `

        <div class="professional-credential-preview">

            <div class="professional-credential-seal">

                <i class="fa-solid fa-award"></i>

            </div>


            <div class="professional-credential-preview-copy">

                <span>
                    CWS ACADEMY • PROFESSIONAL PATH
                </span>

                <strong>
                    ${escapeHTML(
                        credential.pathTitle
                    )}
                </strong>

                <small>
                    Courses + Capstone Verified
                </small>

            </div>


            <span class="professional-verified-badge">

                <i class="fa-solid fa-circle-check"></i>

                VERIFIED

            </span>

        </div>


        <div class="professional-credential-content">

            <span class="professional-credential-label">

                <i class="fa-solid fa-route"></i>

                CAREER PATH CERTIFICATE

            </span>


            <h3>
                ${escapeHTML(
                    credential.credentialTitle
                )}
            </h3>


            <p>
                ${escapeHTML(
                    credential.description
                )}
            </p>


            <div class="professional-credential-meta">

                <span>
                    <i class="fa-solid fa-calendar-check"></i>
                    Issued ${escapeHTML(
                        issuedDate
                    )}
                </span>

                ${
                    credential.capstoneScore > 0
                        ? `
                            <span>
                                <i class="fa-solid fa-flag-checkered"></i>
                                Capstone ${credential.capstoneScore}%
                            </span>
                          `
                        : ""
                }

                <span>
                    <i class="fa-solid fa-shield-halved"></i>
                    ${escapeHTML(
                        credential.credentialId ||
                        "Verified credential"
                    )}
                </span>

            </div>


            <div class="professional-credential-actions">

                <a
                    href="career-path-certificate.html?path=${encodeURIComponent(
                        credential.pathId
                    )}"
                    class="professional-credential-view-btn"
                >
                    <i class="fa-solid fa-award"></i>
                    View Professional Credential
                </a>

                <a
                    href="learning-paths.html"
                    class="certificate-secondary-btn"
                >
                    <i class="fa-solid fa-route"></i>
                    View Path
                </a>

            </div>

        </div>

    `;


    return card;

}


function renderProfessionalCredentials() {

    const container =
        document.getElementById(
            "professionalCredentialsGrid"
        );


    const emptyState =
        document.getElementById(
            "noProfessionalCredentials"
        );


    const count =
        document.getElementById(
            "professionalCredentialCount"
        );


    if (!container) {
        return;
    }


    container.innerHTML =
        "";


    if (count) {

        count.textContent =
            `${careerPathCredentials.length} Earned`;

    }


    if (
        !careerPathCredentials.length
    ) {

        if (emptyState) {
            emptyState.hidden =
                false;
        }


        return;

    }


    if (emptyState) {
        emptyState.hidden =
            true;
    }


    careerPathCredentials.forEach(
        credential => {

            container.appendChild(
                createProfessionalCredentialCard(
                    credential
                )
            );

        }
    );

}


/* =========================================================
   COURSE CERTIFICATE CARDS
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
                ${escapeHTML(
                    certificate.title
                )}
            </strong>

        </div>


        <div class="certificate-card-content">

            <h3>
                ${escapeHTML(
                    certificate.title
                )}
            </h3>

            <p>
                ${escapeHTML(
                    certificate.description
                )}
            </p>


            <div class="certificate-meta">

                <span>
                    <i class="fa-solid fa-calendar"></i>
                    ${escapeHTML(date)}
                </span>

                <span>
                    <i class="fa-solid fa-shield-halved"></i>
                    Verified
                </span>

            </div>


            <div class="certificate-card-actions">

                <a
                    href="certificate-view.html?course=${encodeURIComponent(
                        certificate.courseId ||
                        certificate.id
                    )}"
                    class="certificate-view-btn"
                    data-course-id="${escapeHTML(
                        certificate.courseId ||
                        certificate.id
                    )}"
                >

                    <i class="fa-solid fa-eye"></i>
                    View Certificate

                </a>

            </div>

        </div>

    `;

    return card;

}


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
            `${certificates.length} Earned`;

    }

    if (!certificates.length) {

        if (emptyState) {
            emptyState.hidden =
                false;
        }

        return;
    }

    if (emptyState) {
        emptyState.hidden =
            true;
    }

    certificates.forEach(
        certificate => {

            container.appendChild(
                createCertificateCard(
                    certificate
                )
            );

        }
    );

}


function createUpcomingCertificateCard(
    path
) {

    const card =
        document.createElement(
            "article"
        );

    card.className =
        "upcoming-certificate-card";

    const statusClass =
        path.earned
            ? "completed"
            : path.status === "Planned"
                ? "planned"
                : "";

    card.innerHTML = `

        <div class="upcoming-icon">
            <i class="${escapeHTML(
                path.icon
            )}"></i>
        </div>


        <span class="course-level">
            ${escapeHTML(
                path.level
            )}
        </span>


        <h3>
            ${escapeHTML(
                path.title
            )}
        </h3>


        <p>
            ${escapeHTML(
                path.description
            )}
        </p>


        <div class="upcoming-progress-label">

            <span>
                ${escapeHTML(
                    path.status
                )}
            </span>

            <strong>
                ${path.progress}%
            </strong>

        </div>


        <div class="upcoming-progress-track">

            <div
                class="upcoming-progress-bar ${statusClass}"
                style="width:${path.progress}%"
            ></div>

        </div>


        ${
            path.earned
                ? `
                    <a
                        href="certificate-view.html?course=${encodeURIComponent(
                            path.id
                        )}"
                        class="certificate-view-btn"
                        data-course-id="${escapeHTML(
                            path.id
                        )}"
                    >
                        <i class="fa-solid fa-certificate"></i>
                        View Earned Certificate
                    </a>
                  `
                : path.status !== "Planned"
                    ? `
                        <a
                            href="course-details.html?course=${encodeURIComponent(
                                path.id
                            )}"
                            class="certificate-secondary-btn"
                            style="margin-top:16px;"
                        >
                            ${
                                path.started
                                    ? "Continue Course"
                                    : "Start Course"
                            }
                            <i class="fa-solid fa-arrow-right"></i>
                        </a>
                      `
                    : `
                        <span
                            class="certificate-path-status"
                            style="margin-top:16px;"
                        >
                            <i class="fa-solid fa-clock"></i>
                            Planned
                        </span>
                      `
        }

    `;

    return card;

}


function renderUpcomingCertificates() {

    const container =
        document.getElementById(
            "upcomingCertificatesGrid"
        );

    if (!container) {
        return;
    }

    container.innerHTML = "";

    certificatePaths.forEach(
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
   CERTIFICATE NAVIGATION
========================================================= */

/*
 * Course certificates use the dedicated certificate-view.html
 * page. Do not create or open a modal here.
 *
 * The explicit click handler is intentional: it gives us one
 * predictable navigation path even if older cached markup still
 * contains a button instead of an anchor.
 */
function setupCertificateNavigation() {

    document.addEventListener(
        "click",
        event => {

            const control =
                event.target.closest(
                    ".certificate-view-btn"
                );


            if (!control) {
                return;
            }


            const courseId =
                control.dataset.courseId ||
                control.dataset.certificateId ||
                "";


            if (!courseId) {

                /*
                 * A correctly-rendered anchor already has a valid
                 * href, so allow normal browser navigation.
                 */
                if (
                    control.tagName === "A" &&
                    control.getAttribute("href")
                ) {
                    return;
                }


                console.warn(
                    "[CWS Certificates] Certificate course ID missing."
                );


                return;
            }


            event.preventDefault();
            event.stopPropagation();


            const target =
                `certificate-view.html?course=${encodeURIComponent(
                    courseId
                )}`;


            window.location.assign(
                target
            );

        }
    );

}


function updateJourneySteps() {

    const steps =
        document.querySelectorAll(
            ".certificate-path-step"
        );

    if (!steps.length) {
        return;
    }

    const allProgress =
        [...progressMap.values()];

    const hasStarted =
        allProgress.some(
            progress =>
                progress.started ||
                progress.completedLessons.length
        );

    const hasLessons =
        allProgress.some(
            progress =>
                progress.completedLessons.length
        );

    const hasLabs =
        allProgress.some(
            progress =>
                progress.completedLabs.length
        );

    const hasAssessments =
        allProgress.some(
            progress =>
                progress.completedAssessments.length ||
                progress.finalAssessment?.passed
        );

    const hasCertificate =
        certificates.length > 0;

    const states = [
        hasStarted,
        hasLessons,
        hasLabs,
        hasAssessments,
        hasCertificate
    ];

    steps.forEach(
        (
            step,
            index
        ) => {

            step.classList.toggle(
                "active",
                Boolean(
                    states[index]
                )
            );

            step.classList.toggle(
                "completed",
                Boolean(
                    states[index]
                )
            );

        }
    );

}


async function logout() {

    try {

        if (logoutBtn) {
            logoutBtn.disabled = true;
        }

        await signOut(auth);

        window.location.replace(
            "../pages/login.html"
        );

    }
    catch (error) {

        console.error(
            "[CWS Certificates] Logout failed:",
            error
        );

        if (logoutBtn) {
            logoutBtn.disabled = false;
        }

    }

}


logoutBtn?.addEventListener(
    "click",
    logout
);


async function initialiseCertificatesPage() {

    setupCertificateNavigation();

    await Promise.all([
        loadProgress(),
        loadCareerPathCredentials()
    ]);

    buildCertificateData();

    updateCertificateStatistics();

    renderCredentialJourney();

    renderProfessionalCredentials();

    renderEarnedCertificates();

    renderUpcomingCertificates();

    updateJourneySteps();

}


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
                    "../pages/login.html?redirect=certificates"
                );

                return;

            }

            currentUser = user;

            if (studentName) {

                studentName.textContent =
                    getUserName(user);

            }

            if (initialized) {
                return;
            }

            initialized = true;

            await initialiseCertificatesPage();

        }
    );

}
