
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

const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("loginEmail");
const passwordInput = document.getElementById("loginPassword");
const loginButton = document.getElementById("loginBtn");
const loginMessage = document.getElementById("loginMessage");


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
    "Firebase auth:",
    auth ? "FOUND" : "NOT FOUND"
);


/* =========================================================
   SHOW MESSAGE
========================================================= */

function showMessage(message, type = "error") {

    if (!loginMessage) {
        console.warn("CWS Academy:", message);
        return;
    }

    loginMessage.textContent = message;
    loginMessage.className = `auth-message ${type}`;
    loginMessage.hidden = false;
}


/* =========================================================
   HIDE MESSAGE
========================================================= */

function hideMessage() {

    if (!loginMessage) {
        return;
    }

    loginMessage.textContent = "";
    loginMessage.hidden = true;
}


/* =========================================================
   LOGIN BUTTON
========================================================= */

function setLoginLoading() {

    if (!loginButton) {
        return;
    }

    loginButton.disabled = true;
    loginButton.textContent = "Signing In...";
}


function resetLoginButton() {

    if (!loginButton) {
        return;
    }

    loginButton.disabled = false;
    loginButton.textContent = "Sign In";
}


/* =========================================================
   REDIRECT AFTER LOGIN
========================================================= */

function redirectAfterLogin() {

    const params = new URLSearchParams(
        window.location.search
    );

    const redirect = params.get("redirect");

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
                "Too many unsuccessful login attempts. Please try again later."
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
               BUTTON
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
                   EMAIL VERIFICATION
                ================================================= */

                if (!user.emailVerified) {

                    console.warn(
                        "CWS Academy: Email is not verified."
                    );


                    /*
                       Automatically send another
                       verification email.
                    */

                    try {

                        await sendEmailVerification(user);

                        console.log(
                            "CWS Academy: Verification email sent."
                        );


                        showMessage(
                            "Your email address has not been verified. A new verification email has been sent. Please check your inbox and verify your email before signing in again.",
                            "error"
                        );

                    } catch (verificationError) {

                        console.error(
                            "CWS Academy: Could not send verification email:",
                            verificationError
                        );


                        showMessage(
                            "Your email address has not been verified. Please check your inbox for the verification email.",
                            "error"
                        );
                    }


                    resetLoginButton();

                    return;
                }


                /* =================================================
                   SUCCESS
                ================================================= */

                console.log(
                    "CWS Academy: Email verified successfully."
                );


                showMessage(
                    "Login successful. Redirecting...",
                    "success"
                );


                /*
                   Small delay allows the success
                   message to be displayed before
                   redirecting.
                */

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
   COMPLETE
========================================================= */

console.log(
    "CWS Academy login.js initialization complete."
);

