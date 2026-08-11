
/* =========================================================
   CWS ACADEMY
   Email / Password Authentication
   Firebase Authentication
========================================================= */

import {
    signInWithEmailAndPassword,
    sendEmailVerification
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

import {
    auth
} from "./firebase-config.js";


/* =========================================================
   DEBUG
========================================================= */

console.log("CWS Academy login.js loaded");


/* =========================================================
   ELEMENTS
========================================================= */

const loginForm =
    document.getElementById("loginForm");

const emailInput =
    document.getElementById("loginEmail");

const passwordInput =
    document.getElementById("loginPassword");

const loginButton =
    document.getElementById("loginBtn");

const loginMessage =
    document.getElementById("loginMessage");

const resendVerificationBtn =
    document.getElementById(
        "resendVerificationBtn"
    );


console.log(
    "Login form:",
    loginForm ? "FOUND" : "NOT FOUND"
);

console.log(
    "Email input:",
    emailInput ? "FOUND" : "NOT FOUND"
);

console.log(
    "Password input:",
    passwordInput ? "FOUND" : "NOT FOUND"
);

console.log(
    "Login button:",
    loginButton ? "FOUND" : "NOT FOUND"
);

console.log(
    "Login message:",
    loginMessage ? "FOUND" : "NOT FOUND"
);

console.log(
    "Resend verification button:",
    resendVerificationBtn ? "FOUND" : "NOT FOUND"
);

console.log(
    "Firebase auth:",
    auth ? "FOUND" : "NOT FOUND"
);


/* =========================================================
   CURRENT USER
========================================================= */

let unverifiedUser = null;


/* =========================================================
   SHOW MESSAGE
========================================================= */

function showMessage(
    message,
    type = "error"
) {

    if (!loginMessage) {

        console.warn(
            "CWS Academy:",
            message
        );

        return;
    }


    loginMessage.textContent =
        message;

    loginMessage.className =
        `auth-message ${type}`;

    loginMessage.hidden =
        false;
}


/* =========================================================
   HIDE MESSAGE
========================================================= */

function hideMessage() {

    if (!loginMessage) {
        return;
    }


    loginMessage.textContent =
        "";

    loginMessage.hidden =
        true;
}


/* =========================================================
   SHOW RESEND BUTTON
========================================================= */

function showResendVerificationButton() {

    if (!resendVerificationBtn) {
        return;
    }


    resendVerificationBtn.hidden =
        false;

    resendVerificationBtn.disabled =
        false;

    resendVerificationBtn.textContent =
        "Resend Verification Email";
}


/* =========================================================
   HIDE RESEND BUTTON
========================================================= */

function hideResendVerificationButton() {

    if (!resendVerificationBtn) {
        return;
    }


    resendVerificationBtn.hidden =
        true;

    resendVerificationBtn.disabled =
        false;

    resendVerificationBtn.textContent =
        "Resend Verification Email";
}


/* =========================================================
   LOGIN BUTTON
========================================================= */

function setLoginLoading() {

    if (!loginButton) {
        return;
    }


    loginButton.disabled =
        true;

    loginButton.textContent =
        "Signing In...";
}


function resetLoginButton() {

    if (!loginButton) {
        return;
    }


    loginButton.disabled =
        false;

    loginButton.textContent =
        "Sign In";
}


/* =========================================================
   REDIRECT AFTER LOGIN
========================================================= */

function redirectAfterLogin() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const redirect =
        params.get("redirect");


    console.log(
        "Requested redirect:",
        redirect || "dashboard"
    );


    /* =====================================================
       LABS
    ===================================================== */

    if (redirect === "labs") {

        window.location.replace(
            "../student/labs.html"
        );

        return;
    }


    /* =====================================================
       ASSESSMENTS
    ===================================================== */

    if (redirect === "assessments") {

        window.location.replace(
            "../student/assessments.html"
        );

        return;
    }


    /* =====================================================
       COURSE
    ===================================================== */

    if (
        redirect &&
        redirect.startsWith("course-")
    ) {

        window.location.replace(
            "../student/dashboard.html"
        );

        return;
    }


    /* =====================================================
       DEFAULT
    ===================================================== */

    window.location.replace(
        "../student/dashboard.html"
    );
}


/* =========================================================
   FIREBASE ERROR MESSAGE
========================================================= */

function getFirebaseErrorMessage(error) {

    console.error(
        "CWS Academy Firebase login error:",
        error
    );


    switch (error?.code) {

        case "auth/invalid-credential":

        case "auth/wrong-password":

        case "auth/user-not-found":

            return (
                "The email address or password is incorrect."
            );


        case "auth/invalid-email":

            return (
                "Please enter a valid email address."
            );


        case "auth/user-disabled":

            return (
                "This account has been disabled. Please contact CWS Academy support."
            );


        case "auth/too-many-requests":

            return (
                "Too many unsuccessful attempts. Please wait a while before trying again."
            );


        case "auth/network-request-failed":

            return (
                "A network error occurred. Please check your internet connection."
            );


        case "auth/operation-not-allowed":

            return (
                "Email/password authentication is not enabled in Firebase."
            );


        default:

            return (
                "Unable to sign in. Please check your details and try again."
            );
    }
}


/* =========================================================
   VERIFICATION EMAIL ERROR MESSAGE
========================================================= */

function getVerificationErrorMessage(error) {

    console.error(
        "CWS Academy verification email error:",
        error
    );


    switch (error?.code) {

        case "auth/too-many-requests":

            return (
                "Firebase has temporarily limited verification emails because too many were requested. Please wait before trying again."
            );


        case "auth/network-request-failed":

            return (
                "A network error occurred. Please check your internet connection."
            );


        case "auth/user-token-expired":

            return (
                "Your session has expired. Please sign in again."
            );


        default:

            return (
                "We could not send the verification email. Please try again later."
            );
    }
}


/* =========================================================
   LOGIN FORM
========================================================= */

if (!loginForm) {

    console.error(
        "CWS Academy: #loginForm was not found."
    );

} else {

    loginForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            console.log(
                "CWS Academy: Login form submitted."
            );


            hideMessage();

            hideResendVerificationButton();


            /* =================================================
               GET VALUES
            ================================================= */

            const email =
                emailInput?.value
                    ?.trim()
                    ?.toLowerCase() || "";


            const password =
                passwordInput?.value || "";


            /* =================================================
               VALIDATION
            ================================================= */

            if (!email) {

                showMessage(
                    "Please enter your email address."
                );

                emailInput?.focus();

                return;
            }


            if (!password) {

                showMessage(
                    "Please enter your password."
                );

                passwordInput?.focus();

                return;
            }


            /* =================================================
               LOGIN BUTTON
            ================================================= */

            setLoginLoading();


            /* =================================================
               FIREBASE LOGIN
            ================================================= */

            try {

                console.log(
                    "Attempting Firebase login..."
                );


                const userCredential =
                    await signInWithEmailAndPassword(
                        auth,
                        email,
                        password
                    );


                const user =
                    userCredential.user;


                console.log(
                    "Firebase login successful:",
                    user.uid
                );


                console.log(
                    "Logged in email:",
                    user.email
                );


                console.log(
                    "Email verified:",
                    user.emailVerified
                );


                /* =================================================
                   EMAIL NOT VERIFIED
                ================================================= */

                if (!user.emailVerified) {

                    console.warn(
                        "CWS Academy: Email is not verified."
                    );


                    /*
                       Store the authenticated user so the
                       resend button can use the current session.
                    */

                    unverifiedUser =
                        user;


                    showMessage(
                        "Your email address has not been verified. Please check your inbox and click the verification link.",
                        "error"
                    );


                    showResendVerificationButton();


                    resetLoginButton();


                    return;
                }


                /* =================================================
                   EMAIL VERIFIED
                ================================================= */

                console.log(
                    "CWS Academy: Email verified successfully."
                );


                unverifiedUser =
                    null;


                hideResendVerificationButton();


                showMessage(
                    "Login successful. Redirecting...",
                    "success"
                );


                /* =================================================
                   REDIRECT
                ================================================= */

                setTimeout(() => {

                    redirectAfterLogin();

                }, 500);


            } catch (error) {

                console.error(
                    "CWS Academy: Login failed:",
                    error
                );


                showMessage(
                    getFirebaseErrorMessage(error),
                    "error"
                );


                resetLoginButton();
            }
        }
    );
}


/* =========================================================
   RESEND VERIFICATION EMAIL
========================================================= */

if (resendVerificationBtn) {

    resendVerificationBtn.addEventListener(
        "click",
        async () => {

            console.log(
                "CWS Academy: Resend verification clicked."
            );


            /* =================================================
               CHECK USER
            ================================================= */

            if (!unverifiedUser) {

                showMessage(
                    "Please sign in first before requesting a verification email.",
                    "error"
                );

                return;
            }


            /* =================================================
               DISABLE BUTTON
            ================================================= */

            resendVerificationBtn.disabled =
                true;

            resendVerificationBtn.textContent =
                "Sending...";


            try {

                console.log(
                    "CWS Academy: Sending verification email..."
                );


                await sendEmailVerification(
                    unverifiedUser
                );


                console.log(
                    "CWS Academy: Verification email sent successfully."
                );


                showMessage(
                    "Verification email sent successfully. Please check your inbox, including your spam or junk folder.",
                    "success"
                );


                /*
                   Prevent accidental repeated requests.
                */

                let countdown =
                    60;


                const originalText =
                    "Resend Verification Email";


                const countdownTimer =
                    setInterval(() => {

                        countdown--;

                        resendVerificationBtn.textContent =
                            `Resend in ${countdown}s`;


                        if (countdown <= 0) {

                            clearInterval(
                                countdownTimer
                            );


                            resendVerificationBtn.disabled =
                                false;

                            resendVerificationBtn.textContent =
                                originalText;
                        }

                    }, 1000);


            } catch (error) {

                console.error(
                    "CWS Academy: Could not send verification email:",
                    error
                );


                showMessage(
                    getVerificationErrorMessage(error),
                    "error"
                );


                /*
                   Firebase may temporarily rate-limit
                   verification requests.
                */

                if (
                    error?.code ===
                    "auth/too-many-requests"
                ) {

                    resendVerificationBtn.disabled =
                        true;

                    resendVerificationBtn.textContent =
                        "Please wait before retrying";


                    setTimeout(() => {

                        resendVerificationBtn.disabled =
                            false;

                        resendVerificationBtn.textContent =
                            "Resend Verification Email";

                    }, 60000);

                } else {

                    resendVerificationBtn.disabled =
                        false;

                    resendVerificationBtn.textContent =
                        "Resend Verification Email";
                }
            }
        }
    );
}


/* =========================================================
   COMPLETE
========================================================= */

console.log(
    "CWS Academy login.js initialization complete."
);

