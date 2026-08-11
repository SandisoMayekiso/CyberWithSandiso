
/* =========================================================
   CWS ACADEMY
   Login Controller
   Firebase Email Authentication
   ========================================================= */

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

import {
    auth
} from "./firebase-config.js";


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


console.log(
    "CWS Academy login.js loaded"
);


/* =========================================================
   MESSAGE
   ========================================================= */

function showLoginMessage(
    message,
    type = "error"
) {

    if (!loginMessage) {

        console.log(message);

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
   RESET BUTTON
   ========================================================= */

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


    /* -----------------------------------------------------
       Labs
       ----------------------------------------------------- */

    if (redirect === "labs") {

        window.location.replace(
            "../student/labs.html"
        );

        return;
    }


    /* -----------------------------------------------------
       Assessments
       ----------------------------------------------------- */

    if (redirect === "assessments") {

        window.location.replace(
            "../student/assessments.html"
        );

        return;
    }


    /* -----------------------------------------------------
       Course
       ----------------------------------------------------- */

    if (
        redirect &&
        redirect.startsWith("course-")
    ) {

        window.location.replace(
            "../student/dashboard.html"
        );

        return;
    }


    /* -----------------------------------------------------
       Default
       ----------------------------------------------------- */

    window.location.replace(
        "../student/dashboard.html"
    );
}


/* =========================================================
   FIREBASE ERROR MESSAGE
   ========================================================= */

function getFirebaseErrorMessage(error) {

    switch (error.code) {

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
                "This account has been disabled."
            );


        case "auth/too-many-requests":

            return (
                "Too many unsuccessful attempts. Please try again later."
            );


        case "auth/network-request-failed":

            return (
                "A network error occurred. Check your internet connection."
            );


        case "auth/operation-not-allowed":

            return (
                "Email/password authentication is not enabled in Firebase."
            );


        default:

            return (
                "Unable to sign in. Please try again."
            );
    }
}


/* =========================================================
   EMAIL / PASSWORD LOGIN
   ========================================================= */

if (!loginForm) {

    console.error(
        "CWS Academy: loginForm was not found."
    );

} else {

    loginForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            /* -------------------------------------------------
               VALUES
               ------------------------------------------------- */

            const email =
                emailInput?.value
                    .trim()
                    .toLowerCase() || "";


            const password =
                passwordInput?.value || "";


            /* -------------------------------------------------
               VALIDATION
               ------------------------------------------------- */

            if (!email) {

                showLoginMessage(
                    "Please enter your email address."
                );

                emailInput?.focus();

                return;
            }


            if (!password) {

                showLoginMessage(
                    "Please enter your password."
                );

                passwordInput?.focus();

                return;
            }


            /* -------------------------------------------------
               DISABLE BUTTON
               ------------------------------------------------- */

            if (loginButton) {

                loginButton.disabled =
                    true;

                loginButton.textContent =
                    "Signing In...";
            }


            /* -------------------------------------------------
               FIREBASE LOGIN
               ------------------------------------------------- */

            try {

                console.log(
                    "Attempting Firebase email/password login..."
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
                    "Firebase email login successful:",
                    user.uid
                );


                /* -------------------------------------------------
                   EMAIL VERIFICATION
                   ------------------------------------------------- */

                if (!user.emailVerified) {

                    showLoginMessage(
                        "Please verify your email address before signing in.",
                        "error"
                    );

                    resetLoginButton();

                    return;
                }


                /* -------------------------------------------------
                   SUCCESS
                   ------------------------------------------------- */

                showLoginMessage(
                    "Login successful. Redirecting...",
                    "success"
                );


                redirectAfterLogin();


            } catch (error) {

                console.error(
                    "CWS Academy email login error:",
                    error
                );


                showLoginMessage(
                    getFirebaseErrorMessage(error),
                    "error"
                );


                resetLoginButton();
            }

        }
    );
}

