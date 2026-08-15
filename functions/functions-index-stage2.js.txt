/* =========================================================
   CWS ACADEMY
   PAYSTACK BACKEND
   STAGE 2
========================================================= */

const crypto = require("crypto");

const {
    onCall,
    onRequest,
    HttpsError
} = require("firebase-functions/v2/https");

const {
    defineSecret
} = require("firebase-functions/params");

const {
    initializeApp
} = require("firebase-admin/app");

const {
    getFirestore,
    FieldValue
} = require("firebase-admin/firestore");


/* =========================================================
   FIREBASE ADMIN
========================================================= */

initializeApp();

const db =
    getFirestore();


/* =========================================================
   PAYSTACK CONFIG
========================================================= */

const PAYSTACK_SECRET_KEY =
    defineSecret(
        "PAYSTACK_SECRET_KEY"
    );

const PAYSTACK_PRO_PLAN_CODE =
    "PLN_er9qqwb55i5l0e9";

const PAYSTACK_PRO_AMOUNT =
    9900;

const PAYSTACK_CURRENCY =
    "ZAR";

const CWS_CALLBACK_URL =
    "https://sandisomayekiso.github.io/CyberWithSandiso/student/subscription.html?payment=processing";


/* =========================================================
   HELPERS
========================================================= */

function getSecretKey() {

    return PAYSTACK_SECRET_KEY.value();

}


function normalizeMetadata(
    metadata
) {

    if (!metadata) {
        return {};
    }

    if (
        typeof metadata ===
        "object"
    ) {

        return metadata;

    }

    if (
        typeof metadata ===
        "string"
    ) {

        try {

            return JSON.parse(
                metadata
            );

        }
        catch {

            return {};

        }

    }

    return {};

}


async function verifyTransaction(
    reference
) {

    const response =
        await fetch(
            `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
            {
                method:
                    "GET",

                headers: {
                    Authorization:
                        `Bearer ${getSecretKey()}`
                }
            }
        );

    const result =
        await response.json();

    if (
        !response.ok ||
        !result?.status ||
        !result?.data
    ) {

        console.error(
            "[CWS Paystack] Verify API failed:",
            result
        );

        throw new Error(
            "Paystack transaction verification failed."
        );

    }

    return result.data;

}


/* =========================================================
   CREATE PAYSTACK CHECKOUT
========================================================= */

exports.createPaystackCheckout =
    onCall(
        {
            secrets: [
                PAYSTACK_SECRET_KEY
            ]
        },

        async request => {

            if (!request.auth) {

                throw new HttpsError(
                    "unauthenticated",
                    "You must be signed in to subscribe."
                );

            }

            const uid =
                request.auth.uid;

            const email =
                request.auth.token.email;

            if (!email) {

                throw new HttpsError(
                    "failed-precondition",
                    "Your Firebase account does not have an email address."
                );

            }


            const entitlementSnapshot =
                await db
                    .collection(
                        "entitlements"
                    )
                    .doc(
                        uid
                    )
                    .get();

            if (
                entitlementSnapshot.exists
            ) {

                const entitlement =
                    entitlementSnapshot.data();

                if (
                    entitlement?.plan === "pro" &&
                    (
                        entitlement?.status === "active" ||
                        entitlement?.status === "trialing"
                    )
                ) {

                    throw new HttpsError(
                        "already-exists",
                        "Your account already has active Pro access."
                    );

                }

            }


            const metadata = {

                cwsUserId:
                    uid,

                cwsPlan:
                    "pro",

                cwsPlanCode:
                    PAYSTACK_PRO_PLAN_CODE,

                source:
                    "cws-academy"

            };


            const response =
                await fetch(
                    "https://api.paystack.co/transaction/initialize",
                    {
                        method:
                            "POST",

                        headers: {

                            Authorization:
                                `Bearer ${getSecretKey()}`,

                            "Content-Type":
                                "application/json"

                        },

                        body:
                            JSON.stringify(
                                {
                                    email,

                                    plan:
                                        PAYSTACK_PRO_PLAN_CODE,

                                    currency:
                                        PAYSTACK_CURRENCY,

                                    callback_url:
                                        CWS_CALLBACK_URL,

                                    metadata:
                                        JSON.stringify(
                                            metadata
                                        )
                                }
                            )
                    }
                );

            const result =
                await response.json();

            if (
                !response.ok ||
                !result?.status ||
                !result?.data?.authorization_url ||
                !result?.data?.reference
            ) {

                console.error(
                    "[CWS Paystack] Checkout initialization failed:",
                    result
                );

                throw new HttpsError(
                    "internal",
                    "Unable to start Paystack checkout."
                );

            }


            await db
                .collection(
                    "paystackPayments"
                )
                .doc(
                    result.data.reference
                )
                .set(
                    {
                        uid,

                        email,

                        plan:
                            "pro",

                        planCode:
                            PAYSTACK_PRO_PLAN_CODE,

                        expectedAmount:
                            PAYSTACK_PRO_AMOUNT,

                        currency:
                            PAYSTACK_CURRENCY,

                        status:
                            "pending",

                        provider:
                            "paystack",

                        reference:
                            result.data.reference,

                        createdAt:
                            FieldValue.serverTimestamp(),

                        updatedAt:
                            FieldValue.serverTimestamp()
                    }
                );


            console.log(
                "[CWS Paystack] Checkout initialized:",
                {
                    uid,
                    reference:
                        result.data.reference
                }
            );


            return {

                authorizationUrl:
                    result.data.authorization_url,

                reference:
                    result.data.reference

            };

        }
    );


/* =========================================================
   PAYSTACK WEBHOOK
========================================================= */

exports.paystackWebhook =
    onRequest(
        {
            secrets: [
                PAYSTACK_SECRET_KEY
            ],

            cors:
                false
        },

        async (
            request,
            response
        ) => {

            if (
                request.method !==
                "POST"
            ) {

                response
                    .status(405)
                    .send(
                        "Method Not Allowed"
                    );

                return;

            }


            const signature =
                request.get(
                    "x-paystack-signature"
                );

            if (!signature) {

                console.warn(
                    "[CWS Paystack] Missing webhook signature."
                );

                response
                    .status(401)
                    .send(
                        "Unauthorized"
                    );

                return;

            }


            const expectedSignature =
                crypto
                    .createHmac(
                        "sha512",
                        getSecretKey()
                    )
                    .update(
                        JSON.stringify(
                            request.body
                        )
                    )
                    .digest(
                        "hex"
                    );

            const signatureBuffer =
                Buffer.from(
                    String(signature),
                    "utf8"
                );

            const expectedBuffer =
                Buffer.from(
                    expectedSignature,
                    "utf8"
                );

            if (
                signatureBuffer.length !==
                expectedBuffer.length ||
                !crypto.timingSafeEqual(
                    signatureBuffer,
                    expectedBuffer
                )
            ) {

                console.warn(
                    "[CWS Paystack] Invalid webhook signature."
                );

                response
                    .status(401)
                    .send(
                        "Unauthorized"
                    );

                return;

            }


            const event =
                request.body;

            if (
                event?.event !==
                "charge.success"
            ) {

                response
                    .status(200)
                    .send(
                        "Event acknowledged"
                    );

                return;

            }


            const reference =
                event?.data?.reference;

            if (!reference) {

                console.error(
                    "[CWS Paystack] Successful charge has no reference."
                );

                response
                    .status(400)
                    .send(
                        "Missing reference"
                    );

                return;

            }


            try {

                const paymentRef =
                    db
                        .collection(
                            "paystackPayments"
                        )
                        .doc(
                            reference
                        );

                const pendingSnapshot =
                    await paymentRef.get();

                if (
                    !pendingSnapshot.exists
                ) {

                    console.warn(
                        "[CWS Paystack] No matching CWS checkout:",
                        reference
                    );

                    response
                        .status(200)
                        .send(
                            "Unknown checkout ignored"
                        );

                    return;

                }


                const pending =
                    pendingSnapshot.data();

                if (
                    pending?.status ===
                    "verified"
                ) {

                    response
                        .status(200)
                        .send(
                            "Already verified"
                        );

                    return;

                }


                const verified =
                    await verifyTransaction(
                        reference
                    );

                const metadata =
                    normalizeMetadata(
                        verified.metadata
                    );


                const validStatus =
                    verified.status ===
                    "success";

                const validAmount =
                    Number(
                        verified.amount
                    ) ===
                    PAYSTACK_PRO_AMOUNT;

                const validCurrency =
                    verified.currency ===
                    PAYSTACK_CURRENCY;

                const validUser =
                    metadata.cwsUserId ===
                    pending.uid;

                const validPlan =
                    metadata.cwsPlan ===
                        "pro" &&
                    metadata.cwsPlanCode ===
                        PAYSTACK_PRO_PLAN_CODE &&
                    pending.planCode ===
                        PAYSTACK_PRO_PLAN_CODE;

                const validEmail =
                    String(
                        verified?.customer?.email ||
                        ""
                    )
                        .trim()
                        .toLowerCase() ===
                    String(
                        pending.email ||
                        ""
                    )
                        .trim()
                        .toLowerCase();


                if (
                    !validStatus ||
                    !validAmount ||
                    !validCurrency ||
                    !validUser ||
                    !validPlan ||
                    !validEmail
                ) {

                    console.error(
                        "[CWS Paystack] Verification mismatch:",
                        {
                            reference,
                            validStatus,
                            validAmount,
                            validCurrency,
                            validUser,
                            validPlan,
                            validEmail
                        }
                    );

                    await paymentRef.set(
                        {
                            status:
                                "verification_failed",

                            verifiedAt:
                                FieldValue.serverTimestamp(),

                            updatedAt:
                                FieldValue.serverTimestamp()
                        },
                        {
                            merge:
                                true
                        }
                    );

                    response
                        .status(200)
                        .send(
                            "Verification mismatch"
                        );

                    return;

                }


                await paymentRef.set(
                    {
                        status:
                            "verified",

                        amount:
                            Number(
                                verified.amount
                            ),

                        currency:
                            verified.currency,

                        channel:
                            verified.channel ||
                            null,

                        paystackTransactionId:
                            String(
                                verified.id ||
                                ""
                            ),

                        paystackCustomerCode:
                            verified?.customer
                                ?.customer_code ||
                            null,

                        paidAt:
                            verified.paid_at ||
                            verified.paidAt ||
                            null,

                        verifiedAt:
                            FieldValue.serverTimestamp(),

                        updatedAt:
                            FieldValue.serverTimestamp()
                    },
                    {
                        merge:
                            true
                    }
                );


                console.log(
                    "[CWS Paystack] Payment VERIFIED:",
                    {
                        uid:
                            pending.uid,

                        reference,

                        amount:
                            verified.amount,

                        currency:
                            verified.currency
                    }
                );


                response
                    .status(200)
                    .send(
                        "Payment verified"
                    );

            }
            catch (err) {

                console.error(
                    "[CWS Paystack] Webhook processing error:",
                    err
                );

                response
                    .status(500)
                    .send(
                        "Webhook processing failed"
                    );

            }

        }
    );
