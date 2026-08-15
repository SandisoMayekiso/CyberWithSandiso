/* =========================================================
   CWS ACADEMY
   PROFILE PAGE

   Firebase Authentication
   Firestore Profile + Learning Summary
   Read-Only Subscription Entitlement
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
    getDoc,
    getDocs,
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

const DEBUG = true;


function log(...args) {

    if (DEBUG) {

        console.log(
            "[CWS Profile]",
            ...args
        );

    }

}


function error(...args) {

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

const certificatesEarned =
    document.getElementById(
        "certificatesEarned"
    );

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


/* =========================================================
   STATE
========================================================= */

let currentUser = null;

let currentEntitlement = null;

let profileInitialized = false;


/* =========================================================
   PAGE STATE
========================================================= */

function showLoading() {

    if (profileLoading) {
        profileLoading.hidden = false;
    }

    if (profileContent) {
        profileContent.hidden = true;
    }

}


function showContent() {

    if (profileLoading) {
        profileLoading.hidden = true;
    }

    if (profileContent) {
        profileContent.hidden = false;
    }

}


/* =========================================================
   USER NAME
========================================================= */

function getUserName(user) {

    if (!user) {
        return "Student";
    }


    if (
        typeof user.displayName === "string" &&
        user.displayName.trim()
    ) {

        return user.displayName.trim();

    }


    if (
        typeof user.email === "string" &&
        user.email.includes("@")
    ) {

        const rawName =
            user.email
                .split("@")[0]
                .replace(/[._-]+/g, " ")
                .replace(/\s+/g, " ")
                .trim();


        if (rawName) {

            return rawName
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
   INITIALS
========================================================= */

function getInitials(name) {

    const words =
        String(name || "Student")
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
    ).toUpperCase();

}


/* =========================================================
   MESSAGE
========================================================= */

function showMessage(
    message,
    type = "success"
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


function hideMessage() {

    if (!profileMessage) {
        return;
    }


    profileMessage.hidden =
        true;

}


/* =========================================================
   DATE HELPERS
========================================================= */

function formatDate(value) {

    if (!value) {
        return "—";
    }


    let date = null;


    if (
        typeof value.toDate ===
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

        return "—";

    }


    return new Intl.DateTimeFormat(
        undefined,
        {
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
   USER PROFILE DOCUMENT
========================================================= */

function getUserProfileRef() {

    if (
        !db ||
        !currentUser
    ) {

        return null;

    }


    return doc(
        db,
        "users",
        currentUser.uid
    );

}


/* =========================================================
   LOAD PROFILE DOCUMENT
========================================================= */

async function loadUserProfileDocument() {

    const fallback = {

        displayName:
            getUserName(
                currentUser
            ),

        createdAt:
            null

    };


    if (!db) {
        return fallback;
    }


    try {

        const profileRef =
            getUserProfileRef();


        if (!profileRef) {
            return fallback;
        }


        const snapshot =
            await getDoc(
                profileRef
            );


        if (!snapshot.exists()) {

            return fallback;

        }


        return {

            ...fallback,

            ...snapshot.data()

        };

    }
    catch (err) {

        error(
            "Profile document load failed:",
            err
        );


        return fallback;

    }

}


/* =========================================================
   SAVE PROFILE
========================================================= */

async function saveProfile(
    event
) {

    event.preventDefault();

    hideMessage();


    if (
        !currentUser ||
        !displayNameInput
    ) {

        return;

    }


    const newDisplayName =
        displayNameInput
            .value
            .trim();


    if (!newDisplayName) {

        showMessage(
            "Please enter a display name.",
            "error"
        );

        return;

    }


    try {

        if (saveProfileBtn) {

            saveProfileBtn.disabled =
                true;

            saveProfileBtn.innerHTML = `
                <i class="fa-solid fa-circle-notch fa-spin"></i>
                Saving...
            `;

        }


        /*
         * Update Firebase Authentication.
         */
        await updateProfile(
            currentUser,
            {
                displayName:
                    newDisplayName
            }
        );


        /*
         * Mirror basic profile data in Firestore.
         */
        if (db) {

            const profileRef =
                getUserProfileRef();


            if (profileRef) {

                await setDoc(
                    profileRef,
                    {
                        displayName:
                            newDisplayName,

                        email:
                            currentUser.email ||
                            "",

                        updatedAt:
                            serverTimestamp()
                    },
                    {
                        merge:
                            true
                    }
                );

            }

        }


        renderIdentity();


        showMessage(
            "Profile updated successfully.",
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
            "Unable to update your profile. Please try again.",
            "error"
        );

    }
    finally {

        if (saveProfileBtn) {

            saveProfileBtn.disabled =
                false;

            saveProfileBtn.innerHTML = `
                <i class="fa-solid fa-floppy-disk"></i>
                Save Changes
            `;

        }

    }

}


/* =========================================================
   RENDER IDENTITY
========================================================= */

function renderIdentity() {

    if (!currentUser) {
        return;
    }


    const name =
        getUserName(
            currentUser
        );


    if (studentName) {
        studentName.textContent = name;
    }


    if (profileDisplayName) {
        profileDisplayName.textContent = name;
    }


    if (profileEmail) {

        profileEmail.textContent =
            currentUser.email ||
            "No email address";

    }


    if (profileAvatar) {

        profileAvatar.textContent =
            getInitials(
                name
            );

    }


    if (displayNameInput) {

        displayNameInput.value =
            name;

    }


    if (emailInput) {

        emailInput.value =
            currentUser.email ||
            "";

    }


    if (uidDisplay) {

        uidDisplay.textContent =
            currentUser.uid;

        uidDisplay.title =
            currentUser.uid;

    }


    const verified =
        Boolean(
            currentUser.emailVerified
        );


    if (profileEmailStatus) {

        profileEmailStatus.textContent =
            verified
                ? "EMAIL VERIFIED"
                : "EMAIL NOT VERIFIED";

    }


    if (securityEmailStatus) {

        securityEmailStatus.textContent =
            verified
                ? "Your email address is verified."
                : "Your email address has not been verified.";

    }


    if (verificationBadge) {

        verificationBadge
            .classList
            .toggle(
                "verified",
                verified
            );

        verificationBadge.title =
            verified
                ? "Email verified"
                : "Email not verified";

    }


    if (verifyEmailBtn) {

        verifyEmailBtn.hidden =
            verified;

    }

}


/* =========================================================
   MEMBER SINCE
========================================================= */

function renderMemberSince(
    profileDocument
) {

    if (!memberSince) {
        return;
    }


    let value =
        profileDocument?.createdAt ||
        null;


    /*
     * Firebase Auth account metadata is a useful fallback.
     */
    if (
        !value &&
        currentUser?.metadata?.creationTime
    ) {

        value =
            currentUser
                .metadata
                .creationTime;

    }


    memberSince.textContent =
        formatDate(
            value
        );

}


/* =========================================================
   SUBSCRIPTION
========================================================= */

function renderEntitlement() {

    const entitlement =
        currentEntitlement || {
            plan:
                "free",

            status:
                "active",

            currentPeriodEnd:
                null
        };


    const plan =
        entitlement.plan ||
        "free";


    const status =
        entitlement.status ||
        "inactive";


    const planLabel =
        getPlanLabel(
            plan
        );


    if (profilePlanBadge) {

        profilePlanBadge.textContent =
            String(
                planLabel
            ).toUpperCase();

        profilePlanBadge.className =
            `profile-plan-badge ${plan}`;

    }


    if (currentPlanName) {

        currentPlanName.textContent =
            planLabel;

    }


    if (currentPlanStatus) {

        currentPlanStatus.textContent =
            status;

        currentPlanStatus.className =
            `profile-plan-status ${
                status === "active" ||
                status === "trialing"
                    ? "active"
                    : "inactive"
            }`;

    }


    if (currentPlanDescription) {

        if (plan === "pro") {

            currentPlanDescription.textContent =
                "Your account has CWS Academy Pro access.";

        }
        else if (
            plan === "academy"
        ) {

            currentPlanDescription.textContent =
                "Your account has CWS Academy subscription access.";

        }
        else {

            currentPlanDescription.textContent =
                "Access to CWS Academy free learning content.";

        }

    }


    if (currentPeriodEnd) {

        currentPeriodEnd.textContent =
            entitlement.currentPeriodEnd
                ? formatDate(
                    entitlement.currentPeriodEnd
                )
                : "No expiry";

    }

}


/* =========================================================
   LEARNING SUMMARY
========================================================= */

async function loadLearningSummary() {

    const summary = {

        started:
            0,

        completed:
            0,

        lessons:
            0,

        certificates:
            0

    };


    if (
        !db ||
        !currentUser
    ) {

        renderLearningSummary(
            summary
        );

        return;

    }


    try {

        const progressCollection =
            collection(
                db,
                "users",
                currentUser.uid,
                "courseProgress"
            );


        const snapshot =
            await getDocs(
                progressCollection
            );


        snapshot.forEach(
            progressDoc => {

                const data =
                    progressDoc.data() ||
                    {};


                if (
                    data.started ||
                    Number(
                        data.progressPercent ||
                        0
                    ) > 0
                ) {

                    summary.started++;

                }


                if (
                    data.completed === true ||
                    Number(
                        data.progressPercent ||
                        0
                    ) >= 100
                ) {

                    summary.completed++;

                }


                if (
                    Array.isArray(
                        data.completedLessons
                    )
                ) {

                    summary.lessons +=
                        data.completedLessons.length;

                }

            }
        );


        /*
         * Optional future collection:
         * users/{uid}/certificates/{certificateId}
         *
         * If it does not exist, Firestore simply returns
         * an empty query result.
         */
        const certificatesCollection =
            collection(
                db,
                "users",
                currentUser.uid,
                "certificates"
            );


        const certificateSnapshot =
            await getDocs(
                certificatesCollection
            );


        summary.certificates =
            certificateSnapshot.size;


    }
    catch (err) {

        error(
            "Learning summary load failed:",
            err
        );

    }


    renderLearningSummary(
        summary
    );

}


/* =========================================================
   RENDER LEARNING SUMMARY
========================================================= */

function renderLearningSummary(
    summary
) {

    if (coursesStarted) {

        coursesStarted.textContent =
            String(
                summary.started ||
                0
            );

    }


    if (coursesCompleted) {

        coursesCompleted.textContent =
            String(
                summary.completed ||
                0
            );

    }


    if (lessonsCompleted) {

        lessonsCompleted.textContent =
            String(
                summary.lessons ||
                0
            );

    }


    if (certificatesEarned) {

        certificatesEarned.textContent =
            String(
                summary.certificates ||
                0
            );

    }

}


/* =========================================================
   VERIFY EMAIL
========================================================= */

async function sendVerification() {

    if (
        !currentUser ||
        currentUser.emailVerified
    ) {

        return;

    }


    try {

        if (verifyEmailBtn) {

            verifyEmailBtn.disabled =
                true;

        }


        await sendEmailVerification(
            currentUser
        );


        showMessage(
            "Verification email sent. Check your inbox.",
            "success"
        );


    }
    catch (err) {

        error(
            "Verification email failed:",
            err
        );


        showMessage(
            "Unable to send the verification email right now.",
            "error"
        );

    }
    finally {

        if (verifyEmailBtn) {

            verifyEmailBtn.disabled =
                false;

        }

    }

}


/* =========================================================
   PASSWORD RESET
========================================================= */

async function resetPassword() {

    if (
        !auth ||
        !currentUser?.email
    ) {

        return;

    }


    try {

        if (resetPasswordBtn) {

            resetPasswordBtn.disabled =
                true;

        }


        await sendPasswordResetEmail(
            auth,
            currentUser.email
        );


        showMessage(
            "Password reset email sent.",
            "success"
        );


    }
    catch (err) {

        error(
            "Password reset email failed:",
            err
        );


        showMessage(
            "Unable to send a password reset email right now.",
            "error"
        );

    }
    finally {

        if (resetPasswordBtn) {

            resetPasswordBtn.disabled =
                false;

        }

    }

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
            logoutBtn.disabled = true;
        }

        if (profileLogoutBtn) {
            profileLogoutBtn.disabled = true;
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
            logoutBtn.disabled = false;
        }

        if (profileLogoutBtn) {
            profileLogoutBtn.disabled = false;
        }

    }

}


/* =========================================================
   INITIALIZE PROFILE
========================================================= */

async function initializeProfile(
    user
) {

    showLoading();


    const [
        profileDocument,
        entitlement
    ] =
        await Promise.all([

            loadUserProfileDocument(),

            getUserEntitlement(
                user
            )

        ]);


    currentEntitlement =
        entitlement;


    renderIdentity();

    renderMemberSince(
        profileDocument
    );

    renderEntitlement();


    await loadLearningSummary();


    showContent();


    log(
        "Profile loaded:",
        {
            uid:
                user.uid,

            plan:
                currentEntitlement?.plan ||
                "free"
        }
    );

}


/* =========================================================
   EVENTS
========================================================= */

if (profileForm) {

    profileForm.addEventListener(
        "submit",
        saveProfile
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


/* =========================================================
   AUTHENTICATION
========================================================= */

if (!auth) {

    error(
        "Firebase Auth unavailable."
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


                window.location.replace(
                    "../pages/login.html?redirect=profile"
                );


                return;

            }


            currentUser =
                user;


            if (
                profileInitialized
            ) {

                return;

            }


            profileInitialized =
                true;


            try {

                await initializeProfile(
                    user
                );

            }
            catch (err) {

                error(
                    "Profile initialization failed:",
                    err
                );


                if (profileLoading) {

                    profileLoading.innerHTML = `
                        <i class="fa-solid fa-triangle-exclamation"></i>

                        <p>
                            Your profile could not be loaded.
                            Please refresh the page and try again.
                        </p>
                    `;

                }

            }

        }
    );

}


log(
    "profile.js loaded."
);
