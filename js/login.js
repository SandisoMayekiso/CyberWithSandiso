
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
   STARTUP
   ========================================================= */

console.log("=================================");
console.log("CWS Academy login.js STARTED");
console.log("Current page:", window.location.href);
console.log("=================================");


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
    "loginForm:",
    loginForm ? "FOUND" : "NOT FOUND"
);

console.log(
    "loginEmail:",
    emailInput ? "FOUND" : "NOT FOUND"
);

console.log(
    "loginPassword:",
    passwordInput ? "FOUND" : "NOT FOUND"
);

console.log(
    "loginBtn:",
    loginButton ? "FOUND" : "NOT FOUND"
);

console.log(
    "loginMessage:",
    loginMessage ? "FOUND" : "NOT FOUND"
);

console.log(
    "Firebase auth:",
    auth ? "FOUND" : "NOT FOUND"
);


/* =========================================================
   MESSAGE
   ========================================================= */

function showLoginMessage(
    message,
    type = "error"
) {

    console.log(
        "AUTH MESSAGE:",
        message
    );


    if (!loginMessage) {

        console.error(
            "loginMessage element was not found."
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
   REDIRECT
   ========================================================= */

function redirectAfterLogin() {

    console.log(
        "Redirecting after successful login..."
    );


    const params =
        new URLSearchParams(
            window.location.search
        );


    const redirect =
        params.get("redirect");


    console.log(
        "Requested redirect:",
        redirect
    );


    if (redirect === "labs") {

        window.location.replace(
            "../student/labs.html"
        );

        return;
    }


    if (redirect === "assessments") {

        window.location.replace(
            "../student/assessments.html"
        );

        return;
    }


    if (
        redirect &&
        redirect.startsWith("course-")
    ) {

        window.location.replace(
            "../student/dashboard.html"
        );

        return;
    }


    window.location.replace(
        "../student/dashboard.html"
    );
}


/* =========================================================
   FIREBASE ERROR
   ========================================================= */

function getFirebaseErrorMessage(error) {

    console.error(
        "Firebase error code:",
        error?.code
    );

    console.error(
        "Firebase error message:",
        error?.message
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
                "Email/password authentication is not enabled in Firebase Authentication."
            );


        default:

            return (
                error?.message ||
                "Unable to sign in. Please try again."
            );
    }
}


/* =========================================================
   CHECK FORM
   ========================================================= */

if (!loginForm) {

    console.error(
        "CWS Academy ERROR: #loginForm was NOT FOUND."
    );

} else {

    console.log(
        "CWS Academy: login form found."
    );


    /* =====================================================
       SUBMIT EVENT
       ===================================================== */

    loginForm.addEventListener(
        "submit",
        async (event) => {

            console.log(
                "================================="
            );

            console.log(
                "LOGIN FORM SUBMITTED"
            );

            console.log(
                "================================="
            );


            event.preventDefault();


            /* ---------------------------------------------
               READ VALUES
               --------------------------------------------- */

            const email =
                emailInput?.value
                    ?.trim()
                    ?.toLowerCase() || "";


            const password =
                passwordInput?.value || "";


            console.log(
                "Email entered:",
                email
                    ? "[YES]"
                    : "[EMPTY]"
            );


            console.log(
                "Password entered:",
                password
                    ? "[YES]"
                    : "[EMPTY]"
            );


            /* ---------------------------------------------
               VALIDATION
               --------------------------------------------- */

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


            /* ---------------------------------------------
               BUTTON
               --------------------------------------------- */

            if (loginButton) {

                loginButton.disabled =
                    true;

                loginButton.textContent =
                    "Signing In...";
            }


            /* ---------------------------------------------
               FIREBASE
               --------------------------------------------- */

            try {

                console.log(
                    "Calling Firebase signInWithEmailAndPassword..."
                );


                const userCredential =
                    await signInWithEmailAndPassword(
                        auth,
                        email,
                        password
                    );


                console.log(
                    "Firebase authentication completed."
                );


                const user =
                    userCredential.user;


                console.log(
                    "Authenticated UID:",
                    user.uid
                );


                console.log(
                    "Email:",
                    user.email
                );


                console.log(
                    "Email verified:",
                    user.emailVerified
                );


                /* -----------------------------------------
                   EMAIL VERIFICATION
                   ----------------------------------------- */

                if (!user.emailVerified) {

                    showLoginMessage(
                        "Please verify your email address before signing in.",
                        "error"
                    );

                    resetLoginButton();

                    return;
                }


                /* -----------------------------------------
                   SUCCESS
                   ----------------------------------------- */

                showLoginMessage(
                    "Login successful. Redirecting...",
                    "success"
                );


                redirectAfterLogin();

            } catch (error) {

                console.error(
                    "================================="
                );

                console.error(
                    "FIREBASE LOGIN FAILED"
                );

                console.error(
                    error
                );

                console.error(
                    "================================="
                );


                showLoginMessage(
                    getFirebaseErrorMessage(error),
                    "error"
                );


                resetLoginButton();
            }

        }
    );


    console.log(
        "CWS Academy: submit listener attached successfully."
    );
}


/* =========================================================
   BUTTON CLICK DIAGNOSTIC
   ========================================================= */

if (loginButton) {

    loginButton.addEventListener(
        "click",
        () => {

            console.log(
                "SIGN IN BUTTON CLICK DETECTED"
            );

        }
    );

} else {

    console.error(
        "CWS Academy ERROR: #loginBtn was NOT FOUND."
    );
}


console.log(
    "CWS Academy login.js initialization complete."
);

