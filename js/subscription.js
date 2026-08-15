/* =========================================================
   CWS ACADEMY
   SUBSCRIPTION PAGE

   Firebase Authentication
   Read-Only Entitlement Display
========================================================= */


/* =========================================================
   FIREBASE AUTH
========================================================= */

import {

    onAuthStateChanged,
    signOut

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
            "[CWS Subscription]",
            ...args
        );

    }

}


function error(
    ...args
) {

    console.error(
        "[CWS Subscription]",
        ...args
    );

}



/* =========================================================
   ELEMENTS
========================================================= */

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



/* =========================================================
   DATE
========================================================= */

function formatDate(
    value
) {

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



/* =========================================================
   PAGE STATE
========================================================= */

function showContent() {

    if (subscriptionLoading) {
        subscriptionLoading.hidden = true;
    }


    if (subscriptionContent) {
        subscriptionContent.hidden = false;
    }

}



/* =========================================================
   RENDER ENTITLEMENT
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


    if (upgradeProBtn) {

        if (
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

    }


    log(
        "Entitlement rendered:",
        {
            plan,
            status
        }
    );

}



/* =========================================================
   PAYSTACK TEST CHECKOUT
========================================================= */

const PAYSTACK_TEST_CHECKOUT_URL =
    "https://paystack.shop/pay/-lczow8-dd";


/* =========================================================
   UPGRADE
========================================================= */

function handleProUpgrade() {

    /*
     * IMPORTANT:
     *
     * This redirects the student to the Paystack
     * TEST subscription checkout only.
     *
     * It does NOT grant Pro access.
     *
     * Pro access will only be granted later after
     * Paystack payment verification is implemented.
     */

    if (
        currentEntitlement?.plan ===
        "pro"
    ) {

        log(
            "User already has Pro access."
        );

        return;

    }


    if (upgradeProBtn) {

        upgradeProBtn.disabled =
            true;


        upgradeProBtn.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            Opening Paystack...
        `;

    }


    log(
        "Redirecting to Paystack test checkout."
    );


    window.location.href =
        PAYSTACK_TEST_CHECKOUT_URL;

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

    }

}



/* =========================================================
   EVENTS
========================================================= */

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

                showContent();

            }

        }
    );

}


log(
    "subscription.js loaded."
);
