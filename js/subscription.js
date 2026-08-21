/* =========================================================
   CWS ACADEMY
   SECURE SUBSCRIPTION EXPERIENCE
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


const functions = getFunctions();
const createPaystackCheckout = httpsCallable(
    functions,
    "createPaystackCheckout"
);
const confirmPaystackPayment = httpsCallable(
    functions,
    "confirmPaystackPayment"
);

const REFERENCE_PATTERN = /^[A-Za-z0-9._=-]{6,100}$/;
const CHECKOUT_HOST = "checkout.paystack.com";
const PENDING_REFERENCE_KEY = "cwsPendingPaystackReference";


/* =========================================================
   ELEMENTS
========================================================= */

const elements = {
    loading: document.getElementById("subscriptionLoading"),
    content: document.getElementById("subscriptionContent"),
    message: document.getElementById("subscriptionMessage"),
    studentName: document.getElementById("studentName"),
    studentPlanBadge: document.getElementById("studentPlanBadge"),
    logoutBtn: document.getElementById("logoutBtn"),
    currentPlanIcon: document.getElementById("currentPlanIcon"),
    currentPlanBadge: document.getElementById("currentPlanBadge"),
    currentPlanName: document.getElementById("currentPlanName"),
    currentPlanDescription: document.getElementById(
        "currentPlanDescription"
    ),
    currentPlanStatus: document.getElementById("currentPlanStatus"),
    currentPlanExpiry: document.getElementById("currentPlanExpiry"),
    freePlanBtn: document.getElementById("freePlanBtn"),
    upgradeProBtn: document.getElementById("upgradeProBtn"),
    paymentStatusPanel: document.getElementById("paymentStatusPanel"),
    paymentStatusIcon: document.getElementById("paymentStatusIcon"),
    paymentStatusTitle: document.getElementById("paymentStatusTitle"),
    paymentStatusText: document.getElementById("paymentStatusText"),
    retryPaymentBtn: document.getElementById("retryPaymentBtn"),
    checkoutDialog: document.getElementById("checkoutDialog"),
    closeCheckoutBtn: document.getElementById("closeCheckoutBtn"),
    cancelCheckoutBtn: document.getElementById("cancelCheckoutBtn"),
    checkoutConsent: document.getElementById("checkoutConsent"),
    confirmCheckoutBtn: document.getElementById("confirmCheckoutBtn")
};


/* =========================================================
   STATE
========================================================= */

let currentUser = null;
let currentEntitlement = null;
let initialized = false;
let checkoutInFlight = false;
let verificationInFlight = false;
let lastPaymentReference = "";


/* =========================================================
   SAFE UI HELPERS
========================================================= */

function setButtonContent(button, iconClass, label) {
    if (!button) {
        return;
    }

    const icon = document.createElement("i");
    icon.className = iconClass;
    icon.setAttribute("aria-hidden", "true");

    button.replaceChildren(icon, document.createTextNode(` ${label}`));
}


function showMessage(type, message) {
    if (!elements.message) {
        return;
    }

    elements.message.className = `subscription-message ${type}`;
    elements.message.textContent = message;
    elements.message.hidden = false;
}


function clearMessage() {
    if (!elements.message) {
        return;
    }

    elements.message.hidden = true;
    elements.message.textContent = "";
}


function showContent() {
    if (elements.loading) {
        elements.loading.hidden = true;
    }

    if (elements.content) {
        elements.content.hidden = false;
    }
}


function showPaymentStatus(type, title, message, canRetry = false) {
    if (!elements.paymentStatusPanel) {
        return;
    }

    const iconClasses = {
        processing: "fa-solid fa-circle-notch fa-spin",
        success: "fa-solid fa-circle-check",
        error: "fa-solid fa-triangle-exclamation"
    };

    elements.paymentStatusPanel.className =
        `subscription-payment-status ${type}`;
    elements.paymentStatusPanel.hidden = false;

    if (elements.paymentStatusIcon) {
        elements.paymentStatusIcon.replaceChildren();
        const icon = document.createElement("i");
        icon.className = iconClasses[type] || iconClasses.processing;
        icon.setAttribute("aria-hidden", "true");
        elements.paymentStatusIcon.append(icon);
    }

    if (elements.paymentStatusTitle) {
        elements.paymentStatusTitle.textContent = title;
    }

    if (elements.paymentStatusText) {
        elements.paymentStatusText.textContent = message;
    }

    if (elements.retryPaymentBtn) {
        elements.retryPaymentBtn.hidden = !canRetry;
        elements.retryPaymentBtn.disabled = verificationInFlight;
    }
}


/* =========================================================
   DATA FORMATTING
========================================================= */

function getUserName(user) {
    const displayName = String(user?.displayName || "").trim();

    if (displayName) {
        return displayName;
    }

    const emailName = String(user?.email || "").split("@")[0];
    const normalized = emailName.replace(/[._-]+/g, " ").trim();

    if (!normalized) {
        return "Student";
    }

    return normalized
        .split(/\s+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}


function getDate(value) {
    if (!value) {
        return null;
    }

    const date = typeof value.toDate === "function"
        ? value.toDate()
        : new Date(value);

    return date instanceof Date && !Number.isNaN(date.getTime())
        ? date
        : null;
}


function formatDate(value) {
    const date = getDate(value);

    if (!date) {
        return "No expiry";
    }

    return new Intl.DateTimeFormat(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric"
    }).format(date);
}


function formatStatus(value) {
    const status = String(value || "active")
        .trim()
        .toLowerCase();

    const labels = {
        active: "Active",
        trialing: "Trial",
        past_due: "Payment issue",
        canceled: "Canceled",
        cancelled: "Canceled",
        expired: "Expired",
        inactive: "Inactive"
    };

    return labels[status] || "Inactive";
}


function isActivePro(entitlement) {
    return entitlement?.plan === "pro" &&
        ["active", "trialing"].includes(entitlement?.status);
}


function isSafeReference(value) {
    return REFERENCE_PATTERN.test(String(value || "").trim());
}


function getSafeCheckoutUrl(value) {
    try {
        const url = new URL(String(value || ""));

        if (url.protocol !== "https:" || url.hostname !== CHECKOUT_HOST) {
            return null;
        }

        return url.href;
    } catch (error) {
        return null;
    }
}


function getCallableErrorCode(error) {
    return String(error?.code || "")
        .split("/")
        .pop();
}


function getSafeErrorMessage(error, context) {
    const code = getCallableErrorCode(error);

    const messages = {
        unauthenticated: "Your session has expired. Sign in and try again.",
        "failed-precondition": context === "verify"
            ? "The payment is not confirmed yet. Wait a moment and retry."
            : "Verify your email address before starting checkout.",
        "resource-exhausted":
            "Please wait one minute before starting another checkout.",
        "already-exists": "Your account already has active Pro access.",
        "permission-denied":
            "That payment reference does not belong to your account.",
        "not-found":
            "CWS could not find this checkout. Contact support if you were charged.",
        unavailable:
            "The payment service is temporarily unavailable. Please try again.",
        internal:
            "CWS could not complete the secure payment check. Please try again."
    };

    return messages[code] ||
        "Something went wrong. Please try again or contact CWS support.";
}


/* =========================================================
   ENTITLEMENT RENDERING
========================================================= */

function renderEntitlement() {
    const entitlement = currentEntitlement || {
        plan: "free",
        status: "active",
        currentPeriodEnd: null
    };
    const plan = entitlement.plan === "pro" ? "pro" : "free";
    const activePro = isActivePro(entitlement);
    const label = getPlanLabel(plan);
    const statusLabel = formatStatus(entitlement.status);

    if (elements.currentPlanName) {
        elements.currentPlanName.textContent = label;
    }

    if (elements.currentPlanBadge) {
        elements.currentPlanBadge.textContent = plan.toUpperCase();
        elements.currentPlanBadge.className =
            `subscription-plan-badge ${plan}`;
    }

    if (elements.studentPlanBadge) {
        elements.studentPlanBadge.textContent = plan.toUpperCase();
        elements.studentPlanBadge.className =
            `student-plan-badge ${plan}`;
        elements.studentPlanBadge.title = label;
    }

    if (elements.currentPlanStatus) {
        elements.currentPlanStatus.textContent = statusLabel;
        elements.currentPlanStatus.dataset.status = String(
            entitlement.status || "active"
        );
    }

    if (elements.currentPlanExpiry) {
        const prefix = entitlement.cancelAtPeriodEnd
            ? "Access until "
            : "";
        elements.currentPlanExpiry.textContent =
            `${prefix}${formatDate(entitlement.currentPeriodEnd)}`;
    }

    if (elements.currentPlanIcon) {
        elements.currentPlanIcon.className = activePro
            ? "fa-solid fa-crown"
            : "fa-solid fa-user-shield";
    }

    if (elements.currentPlanDescription) {
        if (activePro && entitlement.cancelAtPeriodEnd) {
            elements.currentPlanDescription.textContent =
                "Your Pro plan will not renew, but remains active through the paid period.";
        } else if (activePro) {
            elements.currentPlanDescription.textContent =
                "Complete CWS Academy learning access is active on your account.";
        } else if (entitlement.status === "past_due") {
            elements.currentPlanDescription.textContent =
                "Your latest renewal needs attention. Free access remains available.";
        } else {
            elements.currentPlanDescription.textContent =
                "Foundation learning access with no expiry.";
        }
    }

    if (elements.freePlanBtn) {
        elements.freePlanBtn.textContent = activePro
            ? "Included with Pro"
            : "Current free access";
    }

    if (elements.upgradeProBtn) {
        elements.upgradeProBtn.disabled = activePro || checkoutInFlight;

        if (activePro) {
            setButtonContent(
                elements.upgradeProBtn,
                "fa-solid fa-circle-check",
                "Pro active"
            );
        } else if (!currentUser?.emailVerified) {
            setButtonContent(
                elements.upgradeProBtn,
                "fa-solid fa-envelope-circle-check",
                "Verify email first"
            );
        } else {
            setButtonContent(
                elements.upgradeProBtn,
                "fa-solid fa-crown",
                "Upgrade securely"
            );
        }
    }
}


async function refreshEntitlement() {
    currentEntitlement = await getUserEntitlement(currentUser);
    renderEntitlement();
}


/* =========================================================
   CHECKOUT DIALOG
========================================================= */

function openCheckoutDialog() {
    clearMessage();

    if (!currentUser?.emailVerified) {
        showMessage(
            "warning",
            "Verify your account email before upgrading. Then refresh this page."
        );
        return;
    }

    if (isActivePro(currentEntitlement) || checkoutInFlight) {
        return;
    }

    if (!elements.checkoutDialog) {
        startCheckout();
        return;
    }

    if (elements.checkoutConsent) {
        elements.checkoutConsent.checked = false;
    }

    if (elements.confirmCheckoutBtn) {
        elements.confirmCheckoutBtn.disabled = true;
    }

    if (typeof elements.checkoutDialog.showModal === "function") {
        elements.checkoutDialog.showModal();
    } else {
        elements.checkoutDialog.setAttribute("open", "");
    }
}


function closeCheckoutDialog() {
    if (!elements.checkoutDialog) {
        return;
    }

    if (typeof elements.checkoutDialog.close === "function") {
        elements.checkoutDialog.close();
    } else {
        elements.checkoutDialog.removeAttribute("open");
    }
}


/* =========================================================
   SECURE CHECKOUT
========================================================= */

async function startCheckout() {
    if (
        checkoutInFlight ||
        !currentUser?.emailVerified ||
        isActivePro(currentEntitlement)
    ) {
        return;
    }

    checkoutInFlight = true;
    clearMessage();
    closeCheckoutDialog();

    if (elements.upgradeProBtn) {
        elements.upgradeProBtn.disabled = true;
        setButtonContent(
            elements.upgradeProBtn,
            "fa-solid fa-circle-notch fa-spin",
            "Creating secure checkout..."
        );
    }

    try {
        const response = await createPaystackCheckout({plan: "pro"});
        const checkoutUrl = getSafeCheckoutUrl(
            response?.data?.authorizationUrl
        );
        const reference = String(response?.data?.reference || "").trim();

        if (!checkoutUrl || !isSafeReference(reference)) {
            throw new Error("Unsafe checkout response rejected.");
        }

        try {
            sessionStorage.setItem(PENDING_REFERENCE_KEY, reference);
        } catch (error) {
            // The Paystack callback also returns the reference.
        }

        window.location.assign(checkoutUrl);
    } catch (error) {
        checkoutInFlight = false;
        renderEntitlement();
        showMessage("error", getSafeErrorMessage(error, "checkout"));
    }
}


/* =========================================================
   PAYMENT RETURN VERIFICATION
========================================================= */

function getReturnedReference() {
    const params = new URLSearchParams(window.location.search);
    const returned = params.get("reference") || params.get("trxref") || "";

    if (isSafeReference(returned)) {
        return returned;
    }

    try {
        const stored = sessionStorage.getItem(PENDING_REFERENCE_KEY) || "";
        return isSafeReference(stored) ? stored : "";
    } catch (error) {
        return "";
    }
}


function hasPaymentReturn() {
    const params = new URLSearchParams(window.location.search);
    return params.has("payment") ||
        params.has("reference") ||
        params.has("trxref");
}


function cleanPaymentQuery() {
    const url = new URL(window.location.href);
    url.searchParams.delete("payment");
    url.searchParams.delete("reference");
    url.searchParams.delete("trxref");
    window.history.replaceState({}, document.title, url.href);
}


async function verifyReturnedPayment(reference = getReturnedReference()) {
    if (verificationInFlight) {
        return;
    }

    if (!isSafeReference(reference)) {
        showPaymentStatus(
            "error",
            "Payment reference missing",
            "CWS cannot verify this return safely. Contact support if your account was charged.",
            false
        );
        return;
    }

    lastPaymentReference = reference;
    verificationInFlight = true;
    showPaymentStatus(
        "processing",
        "Confirming your payment",
        "CWS is checking the transaction directly with Paystack."
    );

    try {
        const result = await confirmPaystackPayment({reference});

        if (result?.data?.status !== "active") {
            throw new Error("Payment is not active.");
        }

        try {
            sessionStorage.removeItem(PENDING_REFERENCE_KEY);
        } catch (error) {
            // No action is required when storage is unavailable.
        }

        await refreshEntitlement();
        cleanPaymentQuery();
        showPaymentStatus(
            "success",
            "CWS Academy Pro is active",
            "Payment verified. Your premium courses, labs and learning paths are now unlocked."
        );
    } catch (error) {
        showPaymentStatus(
            "error",
            "Verification needs attention",
            getSafeErrorMessage(error, "verify"),
            true
        );
    } finally {
        verificationInFlight = false;

        if (elements.retryPaymentBtn) {
            elements.retryPaymentBtn.disabled = false;
        }
    }
}


/* =========================================================
   LOGOUT
========================================================= */

async function logout() {
    if (!auth || !elements.logoutBtn) {
        return;
    }

    elements.logoutBtn.disabled = true;

    try {
        await signOut(auth);
        window.location.replace("../pages/login.html");
    } catch (error) {
        elements.logoutBtn.disabled = false;
        showMessage("error", "Logout failed. Please try again.");
    }
}


/* =========================================================
   EVENTS
========================================================= */

elements.upgradeProBtn?.addEventListener("click", openCheckoutDialog);
elements.logoutBtn?.addEventListener("click", logout);

elements.checkoutConsent?.addEventListener("change", event => {
    if (elements.confirmCheckoutBtn) {
        elements.confirmCheckoutBtn.disabled = !event.currentTarget.checked;
    }
});

elements.confirmCheckoutBtn?.addEventListener("click", startCheckout);
elements.retryPaymentBtn?.addEventListener("click", () => {
    verifyReturnedPayment(lastPaymentReference);
});

elements.checkoutDialog?.addEventListener("click", event => {
    if (event.target === elements.checkoutDialog) {
        closeCheckoutDialog();
    }
});


/* =========================================================
   AUTHENTICATION AND INITIALIZATION
========================================================= */

if (!auth) {
    window.location.replace("../pages/login.html");
} else {
    onAuthStateChanged(auth, async user => {
        if (!user) {
            currentUser = null;
            window.location.replace(
                "../pages/login.html?redirect=subscription"
            );
            return;
        }

        currentUser = user;

        if (elements.studentName) {
            elements.studentName.textContent = getUserName(user);
        }

        if (initialized) {
            return;
        }

        initialized = true;

        try {
            await refreshEntitlement();
        } catch (error) {
            currentEntitlement = {
                plan: "free",
                status: "active",
                currentPeriodEnd: null
            };
            renderEntitlement();
            showMessage(
                "warning",
                "CWS could not refresh your plan. Free access is shown temporarily."
            );
        }

        showContent();

        if (hasPaymentReturn()) {
            await verifyReturnedPayment();
        }
    });
}
