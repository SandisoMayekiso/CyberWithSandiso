/* =========================================================
   CWS ACADEMY
   SECURE PAYSTACK SUBSCRIPTION BACKEND
========================================================= */

/* global fetch */

const crypto = require("crypto");

const {
  onCall,
  onRequest,
  HttpsError,
} = require("firebase-functions/v2/https");

const {
  defineSecret,
} = require("firebase-functions/params");

const {
  initializeApp,
} = require("firebase-admin/app");

const {
  getFirestore,
  FieldValue,
  Timestamp,
} = require("firebase-admin/firestore");


initializeApp();

const db = getFirestore();


/* =========================================================
   CONFIGURATION
========================================================= */

const PAYSTACK_SECRET_KEY = defineSecret("PAYSTACK_SECRET_KEY");

const PAYSTACK_PRO_PLAN_CODE = "PLN_er9qqwb55i5l0e9";
const PAYSTACK_PRO_AMOUNT = 9900;
const PAYSTACK_CURRENCY = "ZAR";
const CHECKOUT_COOLDOWN_MS = 60 * 1000;
const DEFAULT_ACCESS_DAYS = 31;

const ALLOWED_WEB_ORIGINS = [
  "https://sandisomayekiso.github.io",
];

const CWS_CALLBACK_URL =
  "https://sandisomayekiso.github.io/CyberWithSandiso/" +
  "student/subscription.html?payment=processing";

const REFERENCE_PATTERN = /^[A-Za-z0-9._=-]{6,100}$/;
const CUSTOMER_CODE_PATTERN = /^CUS_[A-Za-z0-9]+$/;
const SUBSCRIPTION_CODE_PATTERN = /^SUB_[A-Za-z0-9]+$/;

const CALLABLE_OPTIONS = {
  secrets: [PAYSTACK_SECRET_KEY],
  cors: ALLOWED_WEB_ORIGINS,
};


/* =========================================================
   GENERAL HELPERS
========================================================= */

function getSecretKey() {
  return PAYSTACK_SECRET_KEY.value();
}


function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}


function normalizeMetadata(metadata) {
  if (!metadata) {
    return {};
  }

  if (typeof metadata === "object") {
    return metadata;
  }

  if (typeof metadata === "string") {
    try {
      return JSON.parse(metadata);
    } catch {
      console.warn("[CWS Paystack] Invalid transaction metadata.");
    }
  }

  return {};
}


function requireReference(value) {
  const reference = String(value || "").trim();

  if (!REFERENCE_PATTERN.test(reference)) {
    throw new HttpsError(
        "invalid-argument",
        "The payment reference is invalid.",
    );
  }

  return reference;
}


function getSafeCode(value, pattern) {
  const code = String(value || "").trim();
  return pattern.test(code) ? code : "";
}


function requireVerifiedAccount(request) {
  if (!request.auth?.uid) {
    throw new HttpsError(
        "unauthenticated",
        "You must be signed in to subscribe.",
    );
  }

  const email = normalizeEmail(request.auth.token?.email);

  if (!email) {
    throw new HttpsError(
        "failed-precondition",
        "Your account does not have an email address.",
    );
  }

  if (request.auth.token?.email_verified !== true) {
    throw new HttpsError(
        "failed-precondition",
        "Verify your email address before starting checkout.",
    );
  }

  return {
    uid: request.auth.uid,
    email,
  };
}


function isActivePro(entitlement) {
  if (
    entitlement?.plan !== "pro" ||
    !["active", "trialing"].includes(entitlement?.status)
  ) {
    return false;
  }

  const periodEnd = entitlement?.currentPeriodEnd;
  const periodEndMs = periodEnd?.toMillis?.() || 0;

  return !periodEnd || periodEndMs > Date.now();
}


function getFutureAccessDate(sourceDate) {
  const start = sourceDate ? new Date(sourceDate) : new Date();
  const safeStart = Number.isNaN(start.getTime()) ? new Date() : start;
  const end = new Date(safeStart);
  end.setUTCDate(end.getUTCDate() + DEFAULT_ACCESS_DAYS);
  return Timestamp.fromDate(end);
}


function toTimestamp(value, fallback = null) {
  if (!value) {
    return fallback;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? fallback : Timestamp.fromDate(date);
}


function isPaystackCheckoutUrl(value) {
  try {
    const url = new URL(String(value || ""));
    return url.protocol === "https:" &&
      url.hostname === "checkout.paystack.com";
  } catch {
    return false;
  }
}


function getRawRequestBody(request) {
  if (Buffer.isBuffer(request.rawBody)) {
    return request.rawBody;
  }

  if (request.rawBody instanceof Uint8Array) {
    return Buffer.from(request.rawBody);
  }

  return null;
}


function hasValidPaystackSignature(request) {
  const rawBody = getRawRequestBody(request);
  const supplied = String(
      request.get("x-paystack-signature") || "",
  ).trim();

  if (!rawBody || !/^[a-fA-F0-9]{128}$/.test(supplied)) {
    return false;
  }

  const expected = crypto
      .createHmac("sha512", getSecretKey())
      .update(rawBody)
      .digest();

  const actual = Buffer.from(supplied, "hex");

  return actual.length === expected.length &&
    crypto.timingSafeEqual(actual, expected);
}


async function readJsonResponse(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}


async function paystackRequest(path, options = {}) {
  const response = await fetch(`https://api.paystack.co${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${getSecretKey()}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const result = await readJsonResponse(response);

  if (!response.ok || result?.status !== true || !result?.data) {
    console.error("[CWS Paystack] Provider request failed.", {
      path,
      status: response.status,
    });

    throw new HttpsError(
        "unavailable",
        "The secure payment service is temporarily unavailable.",
    );
  }

  return result.data;
}


async function verifyTransaction(reference) {
  return paystackRequest(
      `/transaction/verify/${encodeURIComponent(reference)}`,
      {method: "GET"},
  );
}


async function enforceCheckoutCooldown(uid) {
  const limiterRef = db.collection("checkoutRateLimits").doc(uid);

  await db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(limiterRef);
    const previous = snapshot.data()?.lastAttemptAt;
    const previousMs = previous?.toMillis?.() || 0;
    const elapsed = Date.now() - previousMs;

    if (elapsed >= 0 && elapsed < CHECKOUT_COOLDOWN_MS) {
      throw new HttpsError(
          "resource-exhausted",
          "Please wait one minute before starting another checkout.",
      );
    }

    transaction.set(limiterRef, {
      lastAttemptAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    }, {merge: true});
  });
}


/* =========================================================
   PAYMENT VERIFICATION AND ATOMIC ACCESS GRANT
========================================================= */

function getVerificationChecks(reference, pending, verified) {
  const metadata = normalizeMetadata(verified?.metadata);
  const customerCode = getSafeCode(
      verified?.customer?.customer_code,
      CUSTOMER_CODE_PATTERN,
  );

  return {
    validReference:
      String(verified?.reference || "") === reference &&
      String(pending?.reference || "") === reference,
    validStatus: verified?.status === "success",
    validAmount:
      Number(verified?.amount) === PAYSTACK_PRO_AMOUNT &&
      Number(pending?.expectedAmount) === PAYSTACK_PRO_AMOUNT,
    validCurrency:
      String(verified?.currency || "").toUpperCase() ===
        PAYSTACK_CURRENCY &&
      String(pending?.currency || "").toUpperCase() ===
        PAYSTACK_CURRENCY,
    validUser: metadata.cwsUserId === pending?.uid,
    validPlan:
      metadata.cwsPlan === "pro" &&
      metadata.cwsPlanCode === PAYSTACK_PRO_PLAN_CODE &&
      pending?.plan === "pro" &&
      pending?.planCode === PAYSTACK_PRO_PLAN_CODE,
    validEmail:
      normalizeEmail(verified?.customer?.email) ===
      normalizeEmail(pending?.email),
    validProvider: pending?.provider === "paystack",
    validCustomer: Boolean(customerCode),
    customerCode,
  };
}


function allChecksPass(checks) {
  return Object.entries(checks)
      .filter(([key]) => key !== "customerCode")
      .every(([, value]) => value === true);
}


async function markVerificationFailure(paymentRef, checks) {
  const safeChecks = Object.fromEntries(
      Object.entries(checks)
          .filter(([key]) => key !== "customerCode"),
  );

  await paymentRef.set({
    status: "verification_failed",
    verificationChecks: safeChecks,
    verifiedAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  }, {merge: true});
}


async function grantInitialProAccess(reference, pending, verified) {
  const paymentRef = db.collection("paystackPayments").doc(reference);
  const checks = getVerificationChecks(reference, pending, verified);

  if (!allChecksPass(checks)) {
    await markVerificationFailure(paymentRef, checks);

    console.warn("[CWS Paystack] Payment verification mismatch.", {
      reference,
      checks: Object.fromEntries(
          Object.entries(checks)
              .filter(([key]) => key !== "customerCode"),
      ),
    });

    throw new HttpsError(
        "failed-precondition",
        "The payment could not be securely verified.",
    );
  }

  const entitlementRef = db.collection("entitlements").doc(pending.uid);
  const userRef = db.collection("users").doc(pending.uid);
  const customerRef = db
      .collection("paystackCustomers")
      .doc(checks.customerCode);
  const paidAt = verified.paid_at || verified.paidAt || null;
  const periodEnd = getFutureAccessDate(paidAt);
  const batch = db.batch();

  batch.set(paymentRef, {
    status: "verified",
    amount: Number(verified.amount),
    currency: String(verified.currency).toUpperCase(),
    channel: verified.channel || null,
    paystackTransactionId: String(verified.id || ""),
    paystackCustomerCode: checks.customerCode,
    paidAt,
    verifiedAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  }, {merge: true});

  batch.set(entitlementRef, {
    uid: pending.uid,
    email: pending.email,
    plan: "pro",
    status: "active",
    source: "paystack",
    planCode: PAYSTACK_PRO_PLAN_CODE,
    paystackCustomerCode: checks.customerCode,
    paystackTransactionId: String(verified.id || ""),
    lastPaymentReference: reference,
    lastPaymentAt: paidAt,
    currentPeriodEnd: periodEnd,
    activatedAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  }, {merge: true});

  batch.set(userRef, {
    plan: "pro",
    subscriptionTier: "pro",
    subscriptionStatus: "active",
    isPro: true,
    updatedAt: FieldValue.serverTimestamp(),
  }, {merge: true});

  batch.set(customerRef, {
    uid: pending.uid,
    email: pending.email,
    planCode: PAYSTACK_PRO_PLAN_CODE,
    customerCode: checks.customerCode,
    updatedAt: FieldValue.serverTimestamp(),
  }, {merge: true});

  await batch.commit();

  console.log("[CWS Paystack] Pro access granted.", {
    uid: pending.uid,
    reference,
  });

  return {
    status: "active",
    plan: "pro",
  };
}


async function verifyPendingPayment(reference, expectedUid = "") {
  const paymentRef = db.collection("paystackPayments").doc(reference);
  const paymentSnapshot = await paymentRef.get();

  if (!paymentSnapshot.exists) {
    throw new HttpsError(
        "not-found",
        "No matching CWS checkout was found.",
    );
  }

  const pending = paymentSnapshot.data();

  if (expectedUid && pending?.uid !== expectedUid) {
    throw new HttpsError(
        "permission-denied",
        "This checkout does not belong to your account.",
    );
  }

  if (pending?.status === "verified") {
    return {
      status: "active",
      plan: "pro",
    };
  }

  const verified = await verifyTransaction(reference);
  return grantInitialProAccess(reference, pending, verified);
}


/* =========================================================
   CHECKOUT CALLABLES
========================================================= */

exports.createPaystackCheckout = onCall(
    CALLABLE_OPTIONS,
    async (request) => {
      const {uid, email} = requireVerifiedAccount(request);

      if (request.data?.plan && request.data.plan !== "pro") {
        throw new HttpsError(
            "invalid-argument",
            "Only the CWS Academy Pro plan is available here.",
        );
      }

      const entitlementSnapshot = await db
          .collection("entitlements")
          .doc(uid)
          .get();

      if (isActivePro(entitlementSnapshot.data())) {
        throw new HttpsError(
            "already-exists",
            "Your account already has active Pro access.",
        );
      }

      await enforceCheckoutCooldown(uid);

      const metadata = {
        cwsUserId: uid,
        cwsPlan: "pro",
        cwsPlanCode: PAYSTACK_PRO_PLAN_CODE,
        source: "cws-academy",
      };

      const checkout = await paystackRequest(
          "/transaction/initialize",
          {
            method: "POST",
            body: JSON.stringify({
              email,
              amount: PAYSTACK_PRO_AMOUNT,
              plan: PAYSTACK_PRO_PLAN_CODE,
              currency: PAYSTACK_CURRENCY,
              callback_url: CWS_CALLBACK_URL,
              metadata: JSON.stringify(metadata),
            }),
          },
      );

      const reference = requireReference(checkout.reference);

      if (!isPaystackCheckoutUrl(checkout.authorization_url)) {
        console.error("[CWS Paystack] Unsafe checkout URL rejected.");
        throw new HttpsError(
            "internal",
            "The payment provider returned an invalid checkout link.",
        );
      }

      await db.collection("paystackPayments").doc(reference).set({
        uid,
        email,
        plan: "pro",
        planCode: PAYSTACK_PRO_PLAN_CODE,
        expectedAmount: PAYSTACK_PRO_AMOUNT,
        currency: PAYSTACK_CURRENCY,
        status: "pending",
        provider: "paystack",
        reference,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      });

      console.log("[CWS Paystack] Checkout initialized.", {
        uid,
        reference,
      });

      return {
        authorizationUrl: checkout.authorization_url,
        reference,
      };
    },
);


exports.confirmPaystackPayment = onCall(
    CALLABLE_OPTIONS,
    async (request) => {
      const {uid} = requireVerifiedAccount(request);
      const reference = requireReference(request.data?.reference);
      return verifyPendingPayment(reference, uid);
    },
);


/* =========================================================
   SUBSCRIPTION LIFECYCLE HELPERS
========================================================= */

async function findSubscriptionOwner(data) {
  const customerCode = getSafeCode(
      data?.customer?.customer_code,
      CUSTOMER_CODE_PATTERN,
  );

  if (!customerCode) {
    return null;
  }

  const mapping = await db
      .collection("paystackCustomers")
      .doc(customerCode)
      .get();

  if (!mapping.exists) {
    return null;
  }

  return {
    ...mapping.data(),
    customerCode,
  };
}


async function handleSubscriptionCreated(data) {
  const owner = await findSubscriptionOwner(data);

  if (!owner?.uid) {
    throw new Error("Subscription owner mapping is not ready.");
  }

  const subscriptionCode = getSafeCode(
      data?.subscription_code,
      SUBSCRIPTION_CODE_PATTERN,
  );
  const planCode = String(data?.plan?.plan_code || "");
  const amount = Number(data?.amount || data?.plan?.amount);
  const currency = String(data?.plan?.currency || "").toUpperCase();

  if (
    !subscriptionCode ||
    planCode !== PAYSTACK_PRO_PLAN_CODE ||
    amount !== PAYSTACK_PRO_AMOUNT ||
    currency !== PAYSTACK_CURRENCY
  ) {
    throw new Error("Subscription data failed validation.");
  }

  const periodEnd = toTimestamp(
      data?.next_payment_date,
      getFutureAccessDate(),
  );
  const subscriptionRef = db
      .collection("paystackSubscriptions")
      .doc(subscriptionCode);
  const entitlementRef = db.collection("entitlements").doc(owner.uid);
  const batch = db.batch();

  batch.set(subscriptionRef, {
    uid: owner.uid,
    email: owner.email,
    customerCode: owner.customerCode,
    subscriptionCode,
    planCode: PAYSTACK_PRO_PLAN_CODE,
    status: "active",
    currentPeriodEnd: periodEnd,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  }, {merge: true});

  batch.set(entitlementRef, {
    plan: "pro",
    status: "active",
    paystackSubscriptionCode: subscriptionCode,
    currentPeriodEnd: periodEnd,
    cancelAtPeriodEnd: false,
    updatedAt: FieldValue.serverTimestamp(),
  }, {merge: true});

  await batch.commit();
}


async function getSubscriptionMapping(data) {
  const subscriptionCode = getSafeCode(
      data?.subscription?.subscription_code || data?.subscription_code,
      SUBSCRIPTION_CODE_PATTERN,
  );

  if (!subscriptionCode) {
    return null;
  }

  const snapshot = await db
      .collection("paystackSubscriptions")
      .doc(subscriptionCode)
      .get();

  if (!snapshot.exists) {
    return null;
  }

  return {
    ...snapshot.data(),
    subscriptionCode,
  };
}


async function handleInvoiceUpdate(data) {
  const mapping = await getSubscriptionMapping(data);

  if (!mapping?.uid) {
    throw new Error("Invoice subscription mapping was not found.");
  }

  const reference = requireReference(data?.transaction?.reference);
  const paid = data?.paid === true || data?.paid === 1;
  const validEvent = paid &&
    data?.status === "success" &&
    Number(data?.amount) === PAYSTACK_PRO_AMOUNT &&
    Number(data?.transaction?.amount) === PAYSTACK_PRO_AMOUNT &&
    String(data?.transaction?.currency || "").toUpperCase() ===
      PAYSTACK_CURRENCY;

  if (!validEvent) {
    throw new Error("Invoice payment data failed validation.");
  }

  const verified = await verifyTransaction(reference);
  const validVerified = verified?.status === "success" &&
    Number(verified?.amount) === PAYSTACK_PRO_AMOUNT &&
    String(verified?.currency || "").toUpperCase() ===
      PAYSTACK_CURRENCY &&
    getSafeCode(
        verified?.customer?.customer_code,
        CUSTOMER_CODE_PATTERN,
    ) === mapping.customerCode;

  if (!validVerified) {
    throw new Error("Invoice transaction failed provider verification.");
  }

  const periodEnd = toTimestamp(
      data?.subscription?.next_payment_date,
      getFutureAccessDate(data?.paid_at),
  );
  const entitlementRef = db.collection("entitlements").doc(mapping.uid);
  const subscriptionRef = db
      .collection("paystackSubscriptions")
      .doc(mapping.subscriptionCode);
  const userRef = db.collection("users").doc(mapping.uid);
  const batch = db.batch();

  batch.set(entitlementRef, {
    plan: "pro",
    status: "active",
    currentPeriodEnd: periodEnd,
    lastPaymentReference: reference,
    lastPaymentAt: data?.paid_at || verified?.paid_at || null,
    cancelAtPeriodEnd: false,
    updatedAt: FieldValue.serverTimestamp(),
  }, {merge: true});

  batch.set(subscriptionRef, {
    status: "active",
    currentPeriodEnd: periodEnd,
    lastPaymentReference: reference,
    updatedAt: FieldValue.serverTimestamp(),
  }, {merge: true});

  batch.set(userRef, {
    plan: "pro",
    subscriptionTier: "pro",
    subscriptionStatus: "active",
    isPro: true,
    updatedAt: FieldValue.serverTimestamp(),
  }, {merge: true});

  await batch.commit();
}


async function updateSubscriptionState(data, status) {
  const mapping = await getSubscriptionMapping(data);

  if (!mapping?.uid) {
    throw new Error("Subscription mapping was not found.");
  }

  const entitlementRef = db.collection("entitlements").doc(mapping.uid);
  const subscriptionRef = db
      .collection("paystackSubscriptions")
      .doc(mapping.subscriptionCode);
  const userRef = db.collection("users").doc(mapping.uid);
  const batch = db.batch();
  const stillActive = status === "non-renewing";

  batch.set(entitlementRef, {
    plan: "pro",
    status: stillActive ? "active" : status,
    cancelAtPeriodEnd: stillActive,
    updatedAt: FieldValue.serverTimestamp(),
  }, {merge: true});

  batch.set(subscriptionRef, {
    status,
    updatedAt: FieldValue.serverTimestamp(),
  }, {merge: true});

  if (!stillActive) {
    batch.set(userRef, {
      plan: "free",
      subscriptionTier: "free",
      subscriptionStatus: status,
      isPro: false,
      updatedAt: FieldValue.serverTimestamp(),
    }, {merge: true});
  }

  await batch.commit();
}


/* =========================================================
   SIGNED PAYSTACK WEBHOOK
========================================================= */

exports.paystackWebhook = onRequest(
    {
      secrets: [PAYSTACK_SECRET_KEY],
      cors: false,
    },
    async (request, response) => {
      if (request.method !== "POST") {
        response.set("Allow", "POST").status(405).send("Method Not Allowed");
        return;
      }

      if (!hasValidPaystackSignature(request)) {
        console.warn("[CWS Paystack] Invalid webhook signature.");
        response.status(401).send("Unauthorized");
        return;
      }

      const eventName = String(request.body?.event || "");
      const data = request.body?.data || {};

      try {
        switch (eventName) {
          case "charge.success": {
            const reference = requireReference(data?.reference);
            const payment = await db
                .collection("paystackPayments")
                .doc(reference)
                .get();

            if (payment.exists) {
              await verifyPendingPayment(reference);
            }
            break;
          }

          case "subscription.create":
            await handleSubscriptionCreated(data);
            break;

          case "invoice.update":
            await handleInvoiceUpdate(data);
            break;

          case "invoice.payment_failed":
            await updateSubscriptionState(data, "past_due");
            break;

          case "subscription.not_renew":
            await updateSubscriptionState(data, "non-renewing");
            break;

          case "subscription.disable":
            await updateSubscriptionState(data, "canceled");
            break;

          default:
            break;
        }

        response.status(200).send("Event acknowledged");
      } catch (err) {
        const safeError = err instanceof HttpsError ? err.code : "internal";

        console.error("[CWS Paystack] Webhook processing failed.", {
          event: eventName,
          code: safeError,
        });

        response.status(500).send("Webhook processing failed");
      }
    },
);
