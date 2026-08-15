/* =========================================================
   CWS ACADEMY
   STUDENT PROFILE

   Firebase Authentication
   Firestore Entitlements
   Profile Management
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
   FIREBASE CONFIG
========================================================= */

import {
    auth
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
    true;


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


const certificatesEarned =
    document.getElementById(
        "certificatesEarned"
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


/* =========================================================
   STATE
========================================================= */

let currentUser =
    null;


let currentEntitlement =
    null;


let initialized =
    false;


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
   MESSAGE
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
    value
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
        "—";

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
            "—";

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
        else if (
            plan === "pro"
        ) {

            currentPlanDescription.textContent =
                "Your CWS Academy Pro subscription is currently inactive.";

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
                "Monthly subscription";

        }
        else {

            currentPeriodEnd.textContent =
                "No expiry";

        }

    }


    if (manageSubscriptionBtn) {

        const textNode =
            Array.from(
                manageSubscriptionBtn.childNodes
            )
                .find(
                    node =>
                        node.nodeType ===
                        Node.TEXT_NODE
                );


        if (textNode) {

            textNode.textContent =
                isPro
                    ? " Manage Subscription "
                    : " View Plans ";

        }

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
   LEARNING SUMMARY
========================================================= */

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

        certificatesEarned:
            0,

        ...stats

    };


    if (coursesStarted) {

        coursesStarted.textContent =
            String(
                data.coursesStarted
            );

    }


    if (coursesCompleted) {

        coursesCompleted.textContent =
            String(
                data.coursesCompleted
            );

    }


    if (lessonsCompleted) {

        lessonsCompleted.textContent =
            String(
                data.lessonsCompleted
            );

    }


    if (certificatesEarned) {

        certificatesEarned.textContent =
            String(
                data.certificatesEarned
            );

    }

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


        await currentUser.reload();


        currentUser =
            auth.currentUser;


        renderUser(
            currentUser
        );


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

                await loadEntitlement(
                    user
                );


                /*
                 * Learning statistics are still displayed safely
                 * at zero until the profile page is connected to
                 * the progress/certificate collections.
                 */

                renderLearningSummary();


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


                renderEntitlement();


                renderLearningSummary();


                showContent();

            }

        }
    );

}


log(
    "profile.js loaded."
);
