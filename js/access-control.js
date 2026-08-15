/* =========================================================
   CWS ACADEMY
   ACCESS CONTROL / SUBSCRIPTIONS
========================================================= */

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

import {
    db
} from "./firebase-config.js";


const DEBUG = true;

function log(...args) {
    if (DEBUG) {
        console.log("[CWS Access]", ...args);
    }
}

function warn(...args) {
    if (DEBUG) {
        console.warn("[CWS Access]", ...args);
    }
}


export const PLAN_LEVELS = {
    free: 0,
    academy: 1,
    pro: 2
};

export const PLAN_LABELS = {
    free: "Free",
    academy: "CWS Academy",
    pro: "CWS Academy Pro"
};


export function getDefaultEntitlement() {
    return {
        plan: "free",
        status: "active",
        currentPeriodEnd: null
    };
}


export function normalizePlan(value) {
    const normalized = String(value || "").trim().toLowerCase();

    if (Object.prototype.hasOwnProperty.call(PLAN_LEVELS, normalized)) {
        return normalized;
    }

    return "free";
}


function normalizeStatus(value) {
    const normalized = String(value || "").trim().toLowerCase();

    if ([
        "active",
        "trialing",
        "past_due",
        "cancelled",
        "canceled",
        "expired",
        "inactive"
    ].includes(normalized)) {
        return normalized;
    }

    return "inactive";
}


function getDateFromValue(value) {
    if (!value) {
        return null;
    }

    if (typeof value.toDate === "function") {
        return value.toDate();
    }

    if (value instanceof Date) {
        return value;
    }

    const parsed = new Date(value);

    if (Number.isNaN(parsed.getTime())) {
        return null;
    }

    return parsed;
}


export function isEntitlementActive(entitlement) {
    if (!entitlement) {
        return false;
    }

    const status = normalizeStatus(entitlement.status);

    if (status !== "active" && status !== "trialing") {
        return false;
    }

    const periodEnd = getDateFromValue(entitlement.currentPeriodEnd);

    if (!periodEnd) {
        return true;
    }

    return periodEnd.getTime() > Date.now();
}


export async function getUserEntitlement(user) {
    const fallback = getDefaultEntitlement();

    if (!user || !user.uid) {
        return fallback;
    }

    if (!db) {
        warn("Firestore unavailable. Falling back to Free plan.");
        return fallback;
    }

    try {
        const entitlementRef = doc(db, "entitlements", user.uid);
        const snapshot = await getDoc(entitlementRef);

        if (!snapshot.exists()) {
            log("No entitlement document. Using Free plan.");
            return fallback;
        }

        const data = snapshot.data() || {};

        const entitlement = {
            ...fallback,
            ...data,
            plan: normalizePlan(data.plan),
            status: normalizeStatus(data.status)
        };

        if (!isEntitlementActive(entitlement)) {
            log("Entitlement inactive. Falling back to Free access.");

            return {
                ...entitlement,
                plan: "free"
            };
        }

        log("Entitlement loaded:", {
            plan: entitlement.plan,
            status: entitlement.status
        });

        return entitlement;

    } catch (err) {
        console.error("[CWS Access] Entitlement load failed:", err);
        return fallback;
    }
}


export function getRequiredAccess(item) {
    if (!item) {
        return "free";
    }

    return normalizePlan(
        item.access ||
        item.requiredPlan ||
        "free"
    );
}


export function canAccess(requiredPlan, entitlement) {
    const required = normalizePlan(requiredPlan);
    const userPlan = normalizePlan(entitlement?.plan);

    return PLAN_LEVELS[userPlan] >= PLAN_LEVELS[required];
}


export function canAccessItem(item, entitlement) {
    return canAccess(
        getRequiredAccess(item),
        entitlement
    );
}


export function getPlanLabel(plan) {
    const normalized = normalizePlan(plan);
    return PLAN_LABELS[normalized] || PLAN_LABELS.free;
}


export function getAccessMessage(requiredPlan) {
    const plan = normalizePlan(requiredPlan);

    if (plan === "academy") {
        return "This content requires a CWS Academy subscription.";
    }

    if (plan === "pro") {
        return "This content requires CWS Academy Pro.";
    }

    return "";
}


export function getUpgradeUrl(requiredPlan = "academy") {
    const params = new URLSearchParams();
    params.set("plan", normalizePlan(requiredPlan));

    return `subscription.html?${params.toString()}`;
}


export function requireAccess(requiredPlan, entitlement, options = {}) {
    if (canAccess(requiredPlan, entitlement)) {
        return true;
    }

    if (options.redirect !== false) {
        const upgradeUrl = options.upgradeUrl || getUpgradeUrl(requiredPlan);
        window.location.replace(upgradeUrl);
    }

    return false;
}


log("access-control.js loaded.");
