/* =========================================================
   CWS ACADEMY
   STUDENT PROFILE

   Firebase Authentication
   Firestore Profile Data
   Firestore Entitlements
   Learning Preferences
========================================================= */


/* =========================================================
   FIREBASE AUTH
========================================================= */

import {
    onAuthStateChanged,
    signOut,
    updateProfile,
    sendEmailVerification,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";


/* =========================================================
   FIRESTORE
========================================================= */

import {
    collection,
    doc,
    getDocs,
    getDoc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";


/* =========================================================
   FIREBASE CONFIG
========================================================= */

import {
    auth,
    db
} from "./firebase-config.js";


/* =========================================================
   ACCESS CONTROL
========================================================= */

import {
    getUserEntitlement,
    getPlanLabel
} from "./access-control.js";


/* =========================================================
   DEBUG
========================================================= */

const DEBUG =
    false;


function log(
    ...args
) {

    if (DEBUG) {

        console.log(
            "[CWS Profile]",
            ...args
        );

    }

}


function warn(
    ...args
) {

    if (DEBUG) {

        console.warn(
            "[CWS Profile]",
            ...args
        );

    }

}


function error(
    ...args
) {

    console.error(
        "[CWS Profile]",
        ...args
    );

}


/* =========================================================
   ELEMENTS
========================================================= */

const profileLoading =
    document.getElementById(
        "profileLoading"
    );


const profileContent =
    document.getElementById(
        "profileContent"
    );


const studentName =
    document.getElementById(
        "studentName"
    );


const studentPlanBadge =
    document.getElementById(
        "studentPlanBadge"
    );


const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );


const profileLogoutBtn =
    document.getElementById(
        "profileLogoutBtn"
    );


const profileAvatar =
    document.getElementById(
        "profileAvatar"
    );


const verificationBadge =
    document.getElementById(
        "verificationBadge"
    );


const profileDisplayName =
    document.getElementById(
        "profileDisplayName"
    );


const profileEmail =
    document.getElementById(
        "profileEmail"
    );


const profilePlanBadge =
    document.getElementById(
        "profilePlanBadge"
    );


const profileEmailStatus =
    document.getElementById(
        "profileEmailStatus"
    );


const profileForm =
    document.getElementById(
        "profileForm"
    );


const displayNameInput =
    document.getElementById(
        "displayNameInput"
    );


const emailInput =
    document.getElementById(
        "emailInput"
    );


const uidDisplay =
    document.getElementById(
        "uidDisplay"
    );


const memberSince =
    document.getElementById(
        "memberSince"
    );


const profileMessage =
    document.getElementById(
        "profileMessage"
    );


const saveProfileBtn =
    document.getElementById(
        "saveProfileBtn"
    );


const careerHeadlineInput =
    document.getElementById(
        "careerHeadlineInput"
    );


const locationInput =
    document.getElementById(
        "locationInput"
    );


const profileBioInput =
    document.getElementById(
        "profileBioInput"
    );


const profileBioCount =
    document.getElementById(
        "profileBioCount"
    );


const linkedInInput =
    document.getElementById(
        "linkedInInput"
    );


const githubInput =
    document.getElementById(
        "githubInput"
    );


const portfolioInput =
    document.getElementById(
        "portfolioInput"
    );


const copyUidBtn =
    document.getElementById(
        "copyUidBtn"
    );


const profileCompletionRing =
    document.getElementById(
        "profileCompletionRing"
    );


const profileCompletionPercent =
    document.getElementById(
        "profileCompletionPercent"
    );


const profileCompletionTitle =
    document.getElementById(
        "profileCompletionTitle"
    );


const profileCompletionText =
    document.getElementById(
        "profileCompletionText"
    );


/* =========================================================
   SUBSCRIPTION ELEMENTS
========================================================= */

const currentPlanName =
    document.getElementById(
        "currentPlanName"
    );


const currentPlanStatus =
    document.getElementById(
        "currentPlanStatus"
    );


const currentPlanDescription =
    document.getElementById(
        "currentPlanDescription"
    );


const currentPeriodEnd =
    document.getElementById(
        "currentPeriodEnd"
    );


const manageSubscriptionBtn =
    document.getElementById(
        "manageSubscriptionBtn"
    );


/* =========================================================
   LEARNING SUMMARY
========================================================= */

const coursesStarted =
    document.getElementById(
        "coursesStarted"
    );


const coursesCompleted =
    document.getElementById(
        "coursesCompleted"
    );


const lessonsCompleted =
    document.getElementById(
        "lessonsCompleted"
    );


const labsCompleted =
    document.getElementById(
        "labsCompleted"
    );


const assessmentsCompleted =
    document.getElementById(
        "assessmentsCompleted"
    );


const certificatesEarned =
    document.getElementById(
        "certificatesEarned"
    );


const profileStatsStatus =
    document.getElementById(
        "profileStatsStatus"
    );


/* =========================================================
   LEARNING PREFERENCES
========================================================= */

const learningPreferencesForm =
    document.getElementById(
        "learningPreferencesForm"
    );


const learningGoalInput =
    document.getElementById(
        "learningGoalInput"
    );


const experienceLevelInput =
    document.getElementById(
        "experienceLevelInput"
    );


const learningPreferencesMessage =
    document.getElementById(
        "learningPreferencesMessage"
    );


const saveLearningPreferencesBtn =
    document.getElementById(
        "saveLearningPreferencesBtn"
    );


/* =========================================================
   SECURITY ELEMENTS
========================================================= */

const securityEmailStatus =
    document.getElementById(
        "securityEmailStatus"
    );


const verifyEmailBtn =
    document.getElementById(
        "verifyEmailBtn"
    );


const resetPasswordBtn =
    document.getElementById(
        "resetPasswordBtn"
    );


const signInMethod =
    document.getElementById(
        "signInMethod"
    );


const lastSignInAt =
    document.getElementById(
        "lastSignInAt"
    );


const downloadProfileBtn =
    document.getElementById(
        "downloadProfileBtn"
    );


/* =========================================================
   STATE
========================================================= */

let currentUser =
    null;


let currentEntitlement =
    null;


let currentUserDocument =
    {};


let initialized =
    false;


let currentLearningStats = {
    coursesStarted: 0,
    coursesCompleted: 0,
    lessonsCompleted: 0,
    labsCompleted: 0,
    assessmentsCompleted: 0,
    certificatesEarned: 0
};


/* =========================================================
   DEFAULT ENTITLEMENT
========================================================= */

const FREE_ENTITLEMENT = {

    plan:
        "free",

    status:
        "active",

    currentPeriodEnd:
        null

};


/* =========================================================
   PAGE STATE
========================================================= */

function showContent() {

    if (profileLoading) {

        profileLoading.hidden =
            true;

    }


    if (profileContent) {

        profileContent.hidden =
            false;

    }

}


/* =========================================================
   MESSAGE HELPERS
========================================================= */

function showMessage(
    message,
    type = "info"
) {

    if (!profileMessage) {

        return;

    }


    profileMessage.textContent =
        message;


    profileMessage.className =
        `profile-message ${type}`;


    profileMessage.hidden =
        false;

}


function clearMessage() {

    if (!profileMessage) {

        return;

    }


    profileMessage.textContent =
        "";


    profileMessage.className =
        "profile-message";


    profileMessage.hidden =
        true;

}


function showPreferencesMessage(
    message,
    type = "info"
) {

    if (!learningPreferencesMessage) {

        return;

    }


    learningPreferencesMessage.textContent =
        message;


    learningPreferencesMessage.className =
        `profile-message ${type}`;


    learningPreferencesMessage.hidden =
        false;

}


function clearPreferencesMessage() {

    if (!learningPreferencesMessage) {

        return;

    }


    learningPreferencesMessage.textContent =
        "";


    learningPreferencesMessage.className =
        "profile-message";


    learningPreferencesMessage.hidden =
        true;

}


/* =========================================================
   USER NAME
========================================================= */

function getUserName(
    user
) {

    if (!user) {

        return "Student";

    }


    if (
        typeof user.displayName ===
            "string" &&
        user.displayName.trim()
    ) {

        return user.displayName.trim();

    }


    if (
        typeof user.email ===
            "string" &&
        user.email.includes("@")
    ) {

        const emailName =
            user.email
                .split("@")[0]
                .replace(/[._-]+/g, " ")
                .replace(/\s+/g, " ")
                .trim();


        if (emailName) {

            return emailName
                .split(" ")
                .map(
                    word =>
                        word.charAt(0)
                            .toUpperCase() +
                        word.slice(1)
                )
                .join(" ");

        }

    }


    return "Student";

}


/* =========================================================
   AVATAR
========================================================= */

function getInitials(
    name
) {

    const words =
        String(name || "")
            .trim()
            .split(/\s+/)
            .filter(Boolean);


    if (!words.length) {

        return "S";

    }


    if (words.length === 1) {

        return words[0]
            .charAt(0)
            .toUpperCase();

    }


    return (
        words[0].charAt(0) +
        words[words.length - 1].charAt(0)
    )
        .toUpperCase();

}


/* =========================================================
   DATE
========================================================= */

function formatDate(
    value,
    options = {}
) {

    if (!value) {

        return null;

    }


    let date =
        null;


    if (
        typeof value?.toDate ===
        "function"
    ) {

        date =
            value.toDate();

    }
    else {

        date =
            new Date(
                value
            );

    }


    if (
        !(date instanceof Date) ||
        Number.isNaN(
            date.getTime()
        )
    ) {

        return null;

    }


    const includeTime =
        Boolean(
            options.includeTime
        );


    return new Intl.DateTimeFormat(
        undefined,
        includeTime
            ? {
                year:
                    "numeric",

                month:
                    "short",

                day:
                    "numeric",

                hour:
                    "2-digit",

                minute:
                    "2-digit"
            }
            : {
                year:
                    "numeric",

                month:
                    "short",

                day:
                    "numeric"
            }
    ).format(
        date
    );

}


/* =========================================================
   MEMBER SINCE
========================================================= */

function getMemberSince(
    user
) {

    const creationTime =
        user?.metadata?.creationTime;


    const formatted =
        formatDate(
            creationTime
        );


    return formatted ||
        "â€”";

}


/* =========================================================
   SIGN-IN METHOD
========================================================= */

function getSignInMethodLabel(
    user
) {

    const providers =
        Array.isArray(
            user?.providerData
        )
            ? user.providerData
            : [];


    const providerIds =
        providers
            .map(
                provider =>
                    String(
                        provider?.providerId ||
                        ""
                    )
            )
            .filter(Boolean);


    if (
        providerIds.includes(
            "google.com"
        )
    ) {

        return "Google";

    }


    if (
        providerIds.includes(
            "password"
        )
    ) {

        return "Email / Password";

    }


    if (providerIds.length) {

        return providerIds
            .join(", ");

    }


    return "Email / Password";

}


/* =========================================================
   RENDER AUTH PROFILE
========================================================= */

function renderUser(
    user
) {

    const name =
        getUserName(
            user
        );


    if (studentName) {

        studentName.textContent =
            name;

    }


    if (profileDisplayName) {

        profileDisplayName.textContent =
            name;

    }


    if (profileEmail) {

        profileEmail.textContent =
            user?.email ||
            "No email address";

    }


    if (displayNameInput) {

        displayNameInput.value =
            name;

    }


    if (emailInput) {

        emailInput.value =
            user?.email ||
            "";

    }


    if (uidDisplay) {

        uidDisplay.textContent =
            user?.uid ||
            "â€”";

    }


    if (memberSince) {

        memberSince.textContent =
            getMemberSince(
                user
            );

    }


    if (profileAvatar) {

        profileAvatar.textContent =
            getInitials(
                name
            );

    }


    if (signInMethod) {

        signInMethod.textContent =
            getSignInMethodLabel(
                user
            );

    }


    if (lastSignInAt) {

        lastSignInAt.textContent =
            formatDate(
                user?.metadata?.lastSignInTime,
                {
                    includeTime:
                        true
                }
            ) ||
            "â€”";

    }


    renderEmailVerification(
        user
    );


    log(
        "User rendered:",
        {
            uid:
                user?.uid,

            email:
                user?.email,

            name
        }
    );

}


/* =========================================================
   EMAIL VERIFICATION
========================================================= */

function renderEmailVerification(
    user
) {

    const verified =
        Boolean(
            user?.emailVerified
        );


    if (profileEmailStatus) {

        profileEmailStatus.textContent =
            verified
                ? "EMAIL VERIFIED"
                : "EMAIL NOT VERIFIED";


        profileEmailStatus.className =
            verified
                ? "profile-status-badge verified"
                : "profile-status-badge";

    }


    if (securityEmailStatus) {

        securityEmailStatus.textContent =
            verified
                ? "Your email address is verified."
                : "Your email address has not been verified.";

    }


    if (verificationBadge) {

        verificationBadge.title =
            verified
                ? "Email verified"
                : "Email not verified";


        verificationBadge.classList.toggle(
            "verified",
            verified
        );

    }


    if (verifyEmailBtn) {

        verifyEmailBtn.disabled =
            verified;


        verifyEmailBtn.textContent =
            verified
                ? "Email Verified"
                : "Send Verification Email";

    }

}


/* =========================================================
   NORMALIZE ENTITLEMENT
========================================================= */

function normalizeEntitlement(
    entitlement
) {

    if (
        !entitlement ||
        typeof entitlement !==
            "object"
    ) {

        return {
            ...FREE_ENTITLEMENT
        };

    }


    const plan =
        String(
            entitlement.plan ||
            "free"
        )
            .trim()
            .toLowerCase();


    const status =
        String(
            entitlement.status ||
            (
                plan === "free"
                    ? "active"
                    : "inactive"
            )
        )
            .trim()
            .toLowerCase();


    return {

        ...entitlement,

        plan,

        status

    };

}


/* =========================================================
   RENDER SUBSCRIPTION
========================================================= */

function renderEntitlement() {

    const entitlement =
        normalizeEntitlement(
            currentEntitlement
        );


    const plan =
        entitlement.plan;


    const status =
        entitlement.status;


    const isPro =
        plan === "pro" &&
        (
            status === "active" ||
            status === "trialing"
        );


    const label =
        getPlanLabel(
            plan
        );


    if (profilePlanBadge) {

        profilePlanBadge.textContent =
            String(label)
                .toUpperCase();


        profilePlanBadge.className =
            `profile-plan-badge ${plan}`;

    }


    if (studentPlanBadge) {

        studentPlanBadge.textContent =
            isPro
                ? "PRO"
                : "FREE";


        studentPlanBadge.className =
            `student-plan-badge ${
                isPro
                    ? "pro"
                    : "free"
            }`;


        studentPlanBadge.title =
            isPro
                ? "CWS Academy Pro"
                : "CWS Academy Free";

    }


    if (currentPlanName) {

        currentPlanName.textContent =
            label;

    }


    if (currentPlanStatus) {

        currentPlanStatus.textContent =
            status.charAt(0)
                .toUpperCase() +
            status.slice(1);


        currentPlanStatus.className =
            `profile-plan-status ${status}`;

    }


    if (currentPlanDescription) {

        if (isPro) {

            currentPlanDescription.textContent =
                "Your account currently has CWS Academy Pro access.";

        }
        else {

            currentPlanDescription.textContent =
                "Access to CWS Academy free learning content.";

        }

    }


    if (currentPeriodEnd) {

        const expiry =
            formatDate(
                entitlement.currentPeriodEnd
            );


        if (expiry) {

            currentPeriodEnd.textContent =
                expiry;

        }
        else if (isPro) {

            currentPeriodEnd.textContent =
                "Subscription period";

        }
        else {

            currentPeriodEnd.textContent =
                "No expiry";

        }

    }


    if (manageSubscriptionBtn) {

        manageSubscriptionBtn.href =
            "subscription.html?from=profile";


        manageSubscriptionBtn.removeAttribute(
            "aria-disabled"
        );


        manageSubscriptionBtn.classList.remove(
            "profile-pro-disabled"
        );


        manageSubscriptionBtn.innerHTML = `
            <i class="fa-solid ${isPro ? "fa-sliders" : "fa-crown"}"></i>
            ${isPro ? "Manage Plan" : "Upgrade to Pro"}
        `;

    }


    log(
        "Entitlement rendered:",
        {
            plan,
            status,
            isPro
        }
    );

}


/* =========================================================
   LOAD ENTITLEMENT
========================================================= */

async function loadEntitlement(
    user
) {

    try {

        currentEntitlement =
            normalizeEntitlement(
                await getUserEntitlement(
                    user
                )
            );


        log(
            "Entitlement loaded:",
            currentEntitlement
        );

    }
    catch (err) {

        error(
            "Unable to load entitlement:",
            err
        );


        currentEntitlement = {
            ...FREE_ENTITLEMENT
        };

    }


    renderEntitlement();

}


/* =========================================================
   USER DOCUMENT
========================================================= */

async function loadUserDocument(
    user
) {

    currentUserDocument =
        {};


    if (
        !db ||
        !user?.uid
    ) {

        warn(
            "Firestore or user UID unavailable. Profile preferences will use defaults."
        );

        return currentUserDocument;

    }


    try {

        const userRef =
            doc(
                db,
                "users",
                user.uid
            );


        const snapshot =
            await getDoc(
                userRef
            );


        if (
            snapshot.exists()
        ) {

            currentUserDocument =
                snapshot.data() ||
                {};

        }


        log(
            "User profile document loaded.",
            currentUserDocument
        );

    }
    catch (err) {

        error(
            "Unable to load user profile document:",
            err
        );


        currentUserDocument =
            {};

    }


    return currentUserDocument;

}


/* =========================================================
   CAREER PROFILE
========================================================= */

function getCareerProfile(
    profileData = currentUserDocument
) {

    const saved =
        profileData?.careerProfile;


    if (
        !saved ||
        typeof saved !== "object"
    ) {

        return {
            headline: "",
            location: "",
            bio: "",
            links: {
                linkedin: "",
                github: "",
                portfolio: ""
            }
        };

    }


    return {
        headline:
            String(saved.headline || ""),
        location:
            String(saved.location || ""),
        bio:
            String(saved.bio || ""),
        links: {
            linkedin:
                String(saved.links?.linkedin || ""),
            github:
                String(saved.links?.github || ""),
            portfolio:
                String(saved.links?.portfolio || "")
        }
    };

}


function updateBioCounter() {

    if (!profileBioCount) {
        return;
    }


    profileBioCount.textContent =
        String(
            profileBioInput?.value.length ||
            0
        );

}


function renderCareerProfile(
    profileData = currentUserDocument
) {

    const career =
        getCareerProfile(profileData);


    if (careerHeadlineInput) {
        careerHeadlineInput.value =
            career.headline;
    }


    if (locationInput) {
        locationInput.value =
            career.location;
    }


    if (profileBioInput) {
        profileBioInput.value =
            career.bio;
    }


    if (linkedInInput) {
        linkedInInput.value =
            career.links.linkedin;
    }


    if (githubInput) {
        githubInput.value =
            career.links.github;
    }


    if (portfolioInput) {
        portfolioInput.value =
            career.links.portfolio;
    }


    updateBioCounter();

}


function isValidOptionalUrl(value) {

    const input =
        String(value || "").trim();


    if (!input) {
        return true;
    }


    try {

        const url =
            new URL(input);


        return [
            "http:",
            "https:"
        ].includes(url.protocol);

    }
    catch (err) {

        return false;

    }

}


function getProfileCompletionData() {

    const interests =
        Array.from(
            document.querySelectorAll(
                'input[name="interests"]:checked'
            )
        );


    const checks = [
        Boolean(displayNameInput?.value.trim()),
        Boolean(currentUser?.emailVerified),
        Boolean(careerHeadlineInput?.value.trim()),
        Boolean(locationInput?.value.trim()),
        Boolean(profileBioInput?.value.trim()),
        Boolean(
            linkedInInput?.value.trim() ||
            githubInput?.value.trim() ||
            portfolioInput?.value.trim()
        ),
        Boolean(
            learningGoalInput?.value
        ),
        Boolean(
            experienceLevelInput?.value
        ),
        Boolean(
            interests.length
        )
    ];


    const completed =
        checks.filter(Boolean).length;


    return {
        completed,
        total:
            checks.length,
        percentage:
            Math.round(
                completed /
                checks.length *
                100
            )
    };

}


function renderProfileCompletion() {

    const data =
        getProfileCompletionData();


    if (profileCompletionRing) {
        profileCompletionRing.style.setProperty(
            "--profile-completion",
            String(data.percentage)
        );
        profileCompletionRing.setAttribute(
            "aria-valuenow",
            String(data.percentage)
        );
    }


    if (profileCompletionPercent) {
        profileCompletionPercent.textContent =
            `${data.percentage}%`;
    }


    if (profileCompletionTitle) {
        profileCompletionTitle.textContent =
            data.percentage === 100
                ? "Profile complete"
                : data.percentage >= 70
                    ? "Your profile is looking strong"
                    : "Build your learner profile";
    }


    if (profileCompletionText) {
        const remaining =
            data.total -
            data.completed;


        profileCompletionText.textContent =
            remaining === 0
                ? "Your account, career details and learning preferences are complete."
                : `${remaining} profile item${remaining === 1 ? "" : "s"} remaining.`;
    }

}


/* =========================================================
   CURRENT LEARNING PROGRESS
========================================================= */

async function loadLearningSummary(
    user
) {

    const stats = {
        coursesStarted: 0,
        coursesCompleted: 0,
        lessonsCompleted: 0,
        labsCompleted: 0,
        assessmentsCompleted: 0,
        certificatesEarned: 0
    };


    if (
        !db ||
        !user?.uid
    ) {

        if (profileStatsStatus) {
            profileStatsStatus.textContent =
                "Live progress is temporarily unavailable.";
        }


        return stats;

    }


    try {

        const snapshot =
            await getDocs(
                collection(
                    db,
                    "users",
                    user.uid,
                    "courseProgress"
                )
            );


        snapshot.forEach(item => {

            const progress =
                item.data() ||
                {};


            const lessons =
                new Set(
                    Array.isArray(progress.completedLessons)
                        ? progress.completedLessons
                        : []
                );


            const labs =
                new Set(
                    Array.isArray(progress.completedLabs)
                        ? progress.completedLabs
                        : []
                );


            const assessments =
                new Set(
                    Array.isArray(progress.completedAssessments)
                        ? progress.completedAssessments
                        : []
                );


            const started =
                Boolean(
                    progress.started ||
                    progress.completed ||
                    lessons.size ||
                    labs.size ||
                    assessments.size
                );


            if (started) {
                stats.coursesStarted += 1;
            }


            if (progress.completed) {
                stats.coursesCompleted += 1;
            }


            stats.lessonsCompleted +=
                lessons.size;


            stats.labsCompleted +=
                labs.size;


            stats.assessmentsCompleted +=
                assessments.size;


            if (
                progress.completed ||
                progress.certificateEligible
            ) {
                stats.certificatesEarned += 1;
            }

        });


        if (profileStatsStatus) {
            profileStatsStatus.textContent =
                "Synced with your current course progress.";
        }


        return stats;

    }
    catch (err) {

        error(
            "Unable to load learning progress:",
            err
        );


        if (profileStatsStatus) {
            profileStatsStatus.textContent =
                "Live progress is temporarily unavailable.";
        }


        return {
            ...stats,
            ...(
                currentUserDocument?.learningStats ||
                {}
            )
        };

    }

}


/* =========================================================
   LEARNING SUMMARY
========================================================= */

function toSafeCount(
    value
) {

    const number =
        Number(
            value
        );


    if (
        !Number.isFinite(
            number
        ) ||
        number < 0
    ) {

        return 0;

    }


    return Math.floor(
        number
    );

}


function renderLearningSummary(
    stats = {}
) {

    const data = {

        coursesStarted:
            0,

        coursesCompleted:
            0,

        lessonsCompleted:
            0,

        labsCompleted:
            0,

        assessmentsCompleted:
            0,

        certificatesEarned:
            0,

        ...stats

    };


    currentLearningStats = {
        coursesStarted:
            toSafeCount(data.coursesStarted),
        coursesCompleted:
            toSafeCount(data.coursesCompleted),
        lessonsCompleted:
            toSafeCount(data.lessonsCompleted),
        labsCompleted:
            toSafeCount(data.labsCompleted),
        assessmentsCompleted:
            toSafeCount(data.assessmentsCompleted),
        certificatesEarned:
            toSafeCount(data.certificatesEarned)
    };


    if (coursesStarted) {

        coursesStarted.textContent =
            String(
                toSafeCount(
                    data.coursesStarted
                )
            );

    }


    if (coursesCompleted) {

        coursesCompleted.textContent =
            String(
                toSafeCount(
                    data.coursesCompleted
                )
            );

    }


    if (lessonsCompleted) {

        lessonsCompleted.textContent =
            String(
                toSafeCount(
                    data.lessonsCompleted
                )
            );

    }


    if (labsCompleted) {

        labsCompleted.textContent =
            String(
                toSafeCount(
                    data.labsCompleted
                )
            );

    }


    if (assessmentsCompleted) {

        assessmentsCompleted.textContent =
            String(
                toSafeCount(
                    data.assessmentsCompleted
                )
            );

    }


    if (certificatesEarned) {

        certificatesEarned.textContent =
            String(
                toSafeCount(
                    data.certificatesEarned
                )
            );

    }

}


/* =========================================================
   RENDER SAVED LEARNING PREFERENCES
========================================================= */

function renderLearningPreferences(
    profileData = {}
) {

    const preferences =
        (
            profileData?.learningPreferences &&
            typeof profileData.learningPreferences ===
                "object"
        )
            ? profileData.learningPreferences
            : {};


    if (learningGoalInput) {

        learningGoalInput.value =
            String(
                preferences.learningGoal ||
                ""
            );

    }


    if (experienceLevelInput) {

        experienceLevelInput.value =
            String(
                preferences.experienceLevel ||
                ""
            );

    }


    const selectedInterests =
        Array.isArray(
            preferences.interests
        )
            ? preferences.interests
                .map(
                    value =>
                        String(
                            value
                        )
                )
            : [];


    document
        .querySelectorAll(
            'input[name="interests"]'
        )
        .forEach(
            input => {

                input.checked =
                    selectedInterests.includes(
                        input.value
                    );

            }
        );


    renderProfileCompletion();

}


/* =========================================================
   SAVE PROFILE BUTTON STATE
========================================================= */

function setSaveLoading(
    loading
) {

    if (!saveProfileBtn) {

        return;

    }


    saveProfileBtn.disabled =
        loading;


    saveProfileBtn.innerHTML =
        loading
            ? `
                <i class="fa-solid fa-circle-notch fa-spin"></i>
                Saving...
              `
            : `
                <i class="fa-solid fa-floppy-disk"></i>
                Save Changes
              `;

}


/* =========================================================
   SAVE PREFERENCES BUTTON STATE
========================================================= */

function setPreferencesSaveLoading(
    loading
) {

    if (!saveLearningPreferencesBtn) {

        return;

    }


    saveLearningPreferencesBtn.disabled =
        loading;


    saveLearningPreferencesBtn.innerHTML =
        loading
            ? `
                <i class="fa-solid fa-circle-notch fa-spin"></i>
                Saving...
              `
            : `
                <i class="fa-solid fa-floppy-disk"></i>
                Save Preferences
              `;

}


/* =========================================================
   SAVE PROFILE
========================================================= */

async function saveProfile(
    event
) {

    event.preventDefault();


    clearMessage();


    if (!currentUser) {

        showMessage(
            "Your session is no longer available. Please sign in again.",
            "error"
        );

        return;

    }


    const displayName =
        displayNameInput?.value
            ?.trim() ||
        "";


    if (!displayName) {

        showMessage(
            "Please enter a display name.",
            "error"
        );

        displayNameInput?.focus();

        return;

    }


    if (
        displayName.length >
        80
    ) {

        showMessage(
            "Display name must be 80 characters or fewer.",
            "error"
        );

        return;

    }


    const careerProfile = {
        headline:
            String(
                careerHeadlineInput?.value ||
                ""
            ).trim(),
        location:
            String(
                locationInput?.value ||
                ""
            ).trim(),
        bio:
            String(
                profileBioInput?.value ||
                ""
            ).trim(),
        links: {
            linkedin:
                String(
                    linkedInInput?.value ||
                    ""
                ).trim(),
            github:
                String(
                    githubInput?.value ||
                    ""
                ).trim(),
            portfolio:
                String(
                    portfolioInput?.value ||
                    ""
                ).trim()
        }
    };


    const invalidLink =
        Object.entries(
            careerProfile.links
        )
            .find(([, value]) =>
                !isValidOptionalUrl(value)
            );


    if (invalidLink) {

        showMessage(
            `Please enter a complete http:// or https:// URL for ${invalidLink[0]}.`,
            "error"
        );


        const fields = {
            linkedin:
                linkedInInput,
            github:
                githubInput,
            portfolio:
                portfolioInput
        };


        fields[
            invalidLink[0]
        ]?.focus();


        return;

    }


    try {

        setSaveLoading(
            true
        );


        await updateProfile(
            currentUser,
            {
                displayName
            }
        );


        /*
         * Keep the Firestore user profile in sync when
         * Firestore is available.
         */

        if (
            db &&
            currentUser.uid
        ) {

            await setDoc(
                doc(
                    db,
                    "users",
                    currentUser.uid
                ),
                {
                    displayName,
                    careerProfile,
                    email:
                        currentUser.email ||
                        null,
                    updatedAt:
                        serverTimestamp()
                },
                {
                    merge:
                        true
                }
            );

        }


        currentUser =
            auth.currentUser;


        currentUserDocument = {
            ...currentUserDocument,
            displayName,
            careerProfile
        };


        renderUser(
            currentUser
        );


        renderCareerProfile(
            currentUserDocument
        );


        renderProfileCompletion();


        showMessage(
            "Your profile has been updated.",
            "success"
        );


        log(
            "Profile updated."
        );

    }
    catch (err) {

        error(
            "Profile update failed:",
            err
        );


        showMessage(
            "CWS Academy could not update your profile. Please try again.",
            "error"
        );

    }
    finally {

        setSaveLoading(
            false
        );

    }

}


/* =========================================================
   SAVE LEARNING PREFERENCES
========================================================= */

async function saveLearningPreferences(
    event
) {

    event.preventDefault();


    clearPreferencesMessage();


    if (
        !currentUser?.uid
    ) {

        showPreferencesMessage(
            "Your session is no longer available. Please sign in again.",
            "error"
        );

        return;

    }


    if (!db) {

        showPreferencesMessage(
            "Learning preferences are temporarily unavailable.",
            "error"
        );

        return;

    }


    const learningGoal =
        String(
            learningGoalInput?.value ||
            ""
        )
            .trim();


    const experienceLevel =
        String(
            experienceLevelInput?.value ||
            ""
        )
            .trim();


    const interests =
        Array.from(
            document.querySelectorAll(
                'input[name="interests"]:checked'
            )
        )
            .map(
                input =>
                    input.value
            );


    try {

        setPreferencesSaveLoading(
            true
        );


        const preferences = {

            learningGoal,

            experienceLevel,

            interests,

            updatedAt:
                serverTimestamp()

        };


        await setDoc(
            doc(
                db,
                "users",
                currentUser.uid
            ),
            {
                learningPreferences:
                    preferences,

                updatedAt:
                    serverTimestamp()
            },
            {
                merge:
                    true
            }
        );


        currentUserDocument = {

            ...currentUserDocument,

            learningPreferences: {

                learningGoal,

                experienceLevel,

                interests

            }

        };


        showPreferencesMessage(
            "Your learning preferences have been saved.",
            "success"
        );


        renderProfileCompletion();


        log(
            "Learning preferences saved:",
            {
                learningGoal,
                experienceLevel,
                interests
            }
        );

    }
    catch (err) {

        error(
            "Learning preferences save failed:",
            err
        );


        showPreferencesMessage(
            "CWS Academy could not save your learning preferences. Please try again.",
            "error"
        );

    }
    finally {

        setPreferencesSaveLoading(
            false
        );

    }

}


/* =========================================================
   SEND VERIFICATION EMAIL
========================================================= */

async function sendVerification() {

    if (
        !currentUser ||
        currentUser.emailVerified
    ) {

        return;

    }


    try {

        verifyEmailBtn.disabled =
            true;


        verifyEmailBtn.textContent =
            "Sending...";


        await sendEmailVerification(
            currentUser
        );


        showMessage(
            "Verification email sent. Check your inbox and spam folder.",
            "success"
        );


        verifyEmailBtn.textContent =
            "Verification Email Sent";

    }
    catch (err) {

        error(
            "Verification email failed:",
            err
        );


        showMessage(
            "Unable to send the verification email right now. Please try again.",
            "error"
        );


        verifyEmailBtn.disabled =
            false;


        verifyEmailBtn.textContent =
            "Send Verification Email";

    }

}


/* =========================================================
   PASSWORD RESET
========================================================= */

async function resetPassword() {

    const email =
        currentUser?.email;


    if (!email) {

        showMessage(
            "No email address is available for this account.",
            "error"
        );

        return;

    }


    try {

        resetPasswordBtn.disabled =
            true;


        resetPasswordBtn.textContent =
            "Sending...";


        await sendPasswordResetEmail(
            auth,
            email
        );


        showMessage(
            "Password reset email sent. Check your inbox and spam folder.",
            "success"
        );

    }
    catch (err) {

        error(
            "Password reset failed:",
            err
        );


        showMessage(
            "Unable to send the password reset email right now. Please try again.",
            "error"
        );

    }
    finally {

        resetPasswordBtn.disabled =
            false;


        resetPasswordBtn.textContent =
            "Reset Password";

    }

}


/* =========================================================
   ACCOUNT UTILITIES
========================================================= */

async function copyAccountId() {

    const uid =
        currentUser?.uid ||
        "";


    if (!uid) {
        return;
    }


    try {

        await navigator.clipboard.writeText(
            uid
        );


        copyUidBtn.innerHTML =
            '<i class="fa-solid fa-check"></i>';


        copyUidBtn.title =
            "Account ID copied";


        window.setTimeout(() => {
            copyUidBtn.innerHTML =
                '<i class="fa-regular fa-copy"></i>';
            copyUidBtn.title =
                "Copy account ID";
        }, 1600);

    }
    catch (err) {

        showMessage(
            "Your browser could not copy the account ID automatically.",
            "error"
        );

    }

}


function downloadProfileData() {

    if (!currentUser) {
        return;
    }


    const exportData = {
        exportedAt:
            new Date().toISOString(),
        account: {
            uid:
                currentUser.uid,
            displayName:
                getUserName(currentUser),
            email:
                currentUser.email || null,
            emailVerified:
                Boolean(currentUser.emailVerified),
            memberSince:
                currentUser.metadata?.creationTime || null,
            lastSignIn:
                currentUser.metadata?.lastSignInTime || null,
            signInMethod:
                getSignInMethodLabel(currentUser)
        },
        plan:
            normalizeEntitlement(
                currentEntitlement
            ),
        careerProfile:
            getCareerProfile(),
        learningPreferences:
            currentUserDocument
                ?.learningPreferences ||
            {},
        learningStats:
            currentLearningStats
    };


    const blob =
        new Blob(
            [
                JSON.stringify(
                    exportData,
                    null,
                    2
                )
            ],
            {
                type:
                    "application/json;charset=utf-8"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;
    link.download =
        `cws-profile-${new Date().toISOString().slice(0, 10)}.json`;


    document.body.appendChild(link);
    link.click();
    link.remove();


    window.setTimeout(
        () => URL.revokeObjectURL(url),
        0
    );

}


/* =========================================================
   LOGOUT
========================================================= */

async function logout() {

    if (!auth) {

        return;

    }


    try {

        if (logoutBtn) {

            logoutBtn.disabled =
                true;

        }


        if (profileLogoutBtn) {

            profileLogoutBtn.disabled =
                true;

        }


        await signOut(
            auth
        );


        window.location.replace(
            "../pages/login.html"
        );

    }
    catch (err) {

        error(
            "Logout failed:",
            err
        );


        if (logoutBtn) {

            logoutBtn.disabled =
                false;

        }


        if (profileLogoutBtn) {

            profileLogoutBtn.disabled =
                false;

        }


        showMessage(
            "Unable to sign out. Please try again.",
            "error"
        );

    }

}


/* =========================================================
   EVENTS
========================================================= */

if (profileForm) {

    profileForm.addEventListener(
        "submit",
        saveProfile
    );


    profileForm.addEventListener(
        "input",
        () => {
            updateBioCounter();
            renderProfileCompletion();
        }
    );

}


if (learningPreferencesForm) {

    learningPreferencesForm.addEventListener(
        "submit",
        saveLearningPreferences
    );


    learningPreferencesForm.addEventListener(
        "change",
        renderProfileCompletion
    );

}


if (verifyEmailBtn) {

    verifyEmailBtn.addEventListener(
        "click",
        sendVerification
    );

}


if (resetPasswordBtn) {

    resetPasswordBtn.addEventListener(
        "click",
        resetPassword
    );

}


if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        logout
    );

}


if (profileLogoutBtn) {

    profileLogoutBtn.addEventListener(
        "click",
        logout
    );

}


copyUidBtn
    ?.addEventListener(
        "click",
        copyAccountId
    );


downloadProfileBtn
    ?.addEventListener(
        "click",
        downloadProfileData
    );


/* =========================================================
   AUTHENTICATION
========================================================= */

if (!auth) {

    error(
        "Firebase Authentication is unavailable."
    );


    window.location.replace(
        "../pages/login.html"
    );

}
else {

    onAuthStateChanged(
        auth,
        async user => {

            if (!user) {

                currentUser =
                    null;


                currentEntitlement =
                    null;


                currentUserDocument =
                    {};


                window.location.replace(
                    "../pages/login.html?redirect=profile"
                );


                return;

            }


            currentUser =
                user;


            /*
             * Firebase may fire this callback more than once.
             * Render authentication data every time, but only
             * run the initial profile load once.
             */

            renderUser(
                user
            );


            if (initialized) {

                return;

            }


            initialized =
                true;


            try {

                const [
                    ,
                    profileData,
                    liveStats
                ] = await Promise.all([
                    loadEntitlement(
                        user
                    ),
                    loadUserDocument(
                        user
                    ),
                    loadLearningSummary(
                        user
                    )
                ]);


                renderCareerProfile(
                    profileData
                );


                renderLearningPreferences(
                    profileData
                );


                liveStats.certificatesEarned =
                    Math.max(
                        toSafeCount(
                            liveStats.certificatesEarned
                        ),
                        toSafeCount(
                            profileData
                                ?.learningStats
                                ?.certificatesEarned
                        )
                    );


                renderLearningSummary(
                    liveStats
                );


                renderProfileCompletion();


                showContent();


                log(
                    "Profile page loaded."
                );

            }
            catch (err) {

                error(
                    "Profile initialization failed:",
                    err
                );


                currentEntitlement = {
                    ...FREE_ENTITLEMENT
                };


                currentUserDocument =
                    {};


                renderEntitlement();


                renderLearningPreferences();


                renderCareerProfile();


                renderLearningSummary();


                renderProfileCompletion();


                showContent();

            }

        }
    );

}


log(
    "profile.js loaded."
);
