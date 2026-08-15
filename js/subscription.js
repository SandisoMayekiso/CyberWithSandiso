/* =========================================================
   CWS ACADEMY
   SUBSCRIPTION PAGE

   Firebase Authentication
   Read-Only Entitlement Display
   Paystack Checkout via Firebase Cloud Functions
========================================================= */

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

import {
    getFunctions,
    httpsCallable
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-functions.js";

import {
    auth
} from "./firebase-config.js";

import {
    getUserEntitlement,
    getPlanLabel
} from "./access-control.js";


const functions =
    getFunctions();


const DEBUG =
    true;


function log(...args) {

    if (DEBUG) {
        console.log(
            "[CWS Subscription]",
            ...args
        );
    }

}


function error(...args) {

    console.error(
        "[CWS Subscription]",
        ...args
    );

}


const subscriptionLoading =
    document.getElementById(
        "subscriptionLoading"
    );

const subscriptionContent =
    document.getElementById(
        "subscriptionContent"
    );

const studentName =
    document.getElementById(
        "studentName"
    );

const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );

const currentPlanIcon =
    document.getElementById(
        "currentPlanIcon"
    );

const currentPlanBadge =
    document.getElementById(
        "currentPlanBadge"
    );

const currentPlanName =
    document.getElementById(
        "currentPlanName"
    );

const currentPlanDescription =
    document.getElementById(
        "currentPlanDescription"
    );

const currentPlanStatus =
    document.getElementById(
        "currentPlanStatus"
    );

const currentPlanExpiry =
    document.getElementById(
        "currentPlanExpiry"
    );

const freePlanBtn =
    document.getElementById(
        "freePlanBtn"
    );

const upgradeProBtn =
    document.getElementById(
        "upgradeProBtn"
    );


let currentUser =
    null;

let currentEntitlement =
    null;

let initialized =
    false;


function getUserName(user) {

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

        const rawName =
            user.email
                .split("@")[0]
                .replace(/[._-]+/g, " ")
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


function formatDate(value) {

    if (!value) {
        return "No expiry";
    }

    let date =
        null;

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

        return "No expiry";

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


function showContent() {

    if (subscriptionLoading) {
        subscriptionLoading.hidden = true;
    }

    if (subscriptionContent) {
        subscriptionContent.hidden = false;
    }

}


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

    const label =
        getPlanLabel(
            plan
        );

    if (currentPlanName) {
        currentPlanName.textContent =
            label;
    }

    if (currentPlanBadge) {

        currentPlanBadge.textContent =
            String(label)
                .toUpperCase();

        currentPlanBadge.className =
            `subscription-plan-badge ${plan}`;

    }

    if (currentPlanStatus) {
        currentPlanStatus.textContent =
            status;
    }

    if (currentPlanExpiry) {

        currentPlanExpiry.textContent =
            formatDate(
                entitlement.currentPeriodEnd
            );

    }

    if (currentPlanIcon) {

        currentPlanIcon.className =
            plan === "pro"
                ? "fa-solid fa-crown"
                : "fa-solid fa-user";

    }

    if (currentPlanDescription) {

        currentPlanDescription.textContent =
            plan === "pro"
                ? "Your account currently has CWS Academy Pro access."
                : "Access to free CWS Academy learning content.";

    }

    if (freePlanBtn) {

        freePlanBtn.textContent =
            plan === "free"
                ? "Current Plan"
                : "Free Plan";

    }

    if (
        upgradeProBtn &&
        plan === "pro" &&
        (
            status === "active" ||
            status === "trialing"
        )
    ) {

        upgradeProBtn.disabled =
            true;

        upgradeProBtn.innerHTML = `
            <i class="fa-solid fa-circle-check"></i>
            Pro Active
        `;

    }

    log(
        "Entitlement rendered:",
        {
            plan,
            status
        }
    );

}


async function handleProUpgrade() {

    if (
        currentEntitlement?.plan ===
        "pro"
    ) {

        log(
            "User already has Pro access."
        );

        return;

    }

    if (
        !auth?.currentUser
    ) {

        window.location.replace(
            "../pages/login.html?redirect=subscription"
        );

        return;

    }

    try {

        if (upgradeProBtn) {

            upgradeProBtn.disabled =
                true;

            upgradeProBtn.innerHTML = `
                <i class="fa-solid fa-spinner fa-spin"></i>
                Opening Paystack...
            `;

        }

        const createPaystackCheckout =
            httpsCallable(
                functions,
                "createPaystackCheckout"
            );

        const result =
            await createPaystackCheckout();

        const authorizationUrl =
            result?.data?.authorizationUrl;

        if (!authorizationUrl) {

            throw new Error(
                "No Paystack checkout URL was returned."
            );

        }

        window.location.assign(
            authorizationUrl
        );

    }
    catch (err) {

        error(
            "Unable to start Paystack checkout:",
            err
        );

        if (upgradeProBtn) {

            upgradeProBtn.disabled =
                false;

            upgradeProBtn.innerHTML = `
                <i class="fa-solid fa-arrow-up-right-dots"></i>
                Upgrade to Pro
            `;

        }

        alert(
            "CWS Academy could not start the Paystack checkout. Please try again."
        );

    }

}


function checkPaymentReturn() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    if (
        params.get("payment") ===
        "processing"
    ) {

        log(
            "Returned from Paystack. Waiting for verified webhook processing."
        );

    }

}


async function logout() {

    if (!auth) {
        return;
    }

    try {

        if (logoutBtn) {
            logoutBtn.disabled = true;
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

    }

}


if (upgradeProBtn) {

    upgradeProBtn.addEventListener(
        "click",
        handleProUpgrade
    );

}

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        logout
    );

}


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
                    "../pages/login.html?redirect=subscription"
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

                currentEntitlement =
                    await getUserEntitlement(
                        user
                    );

                renderEntitlement();

                checkPaymentReturn();

                showContent();

                log(
                    "Subscription page loaded."
                );

            }
            catch (err) {

                error(
                    "Subscription initialization failed:",
                    err
                );

                currentEntitlement = {
                    plan:
                        "free",

                    status:
                        "active",

                    currentPeriodEnd:
                        null
                };

                renderEntitlement();

                checkPaymentReturn();

                showContent();

            }

        }
    );

}


log(
    "subscription.js loaded."
);
