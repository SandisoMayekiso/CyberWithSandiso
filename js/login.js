/* =========================================================
   CWS ACADEMY
   Login Controller
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


console.log("CWS Academy login.js loaded");


/* =========================================================
   MESSAGE
========================================================= */

function showLoginMessage(message, type = "error") {

    if (!loginMessage) {

        console.log(message);

        return;

    }

    loginMessage.textContent = message;

    loginMessage.className =
        `auth-message ${type}`;

    loginMessage.hidden = false;

}


/* =========================================================
   BUTTON
========================================================= */

function resetLoginButton() {

    if (!loginButton) return;

    loginButton.disabled = false;
    loginButton.textContent = "Sign In";

}


/* =========================================================
   LOGIN
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


            const email =
                emailInput?.value
                    .trim()
                    .toLowerCase();

            const password =
                passwordInput?.value || "";


            /* =================================================
               VALIDATION
            ================================================= */

            if (!email) {

                showLoginMessage(
                    "Please enter your email address."
                );

                return;

            }


            if (!password) {

                showLoginMessage(
                    "Please enter your password."
                );

                return;

            }


            /* =================================================
               BUTTON
            ================================================= */

            if (loginButton) {

                loginButton.disabled = true;

                loginButton.textContent =
                    "Signing In...";

            }


            try {

                console.log(
                    "Attempting Firebase login..."
                );


                /* =================================================
                   FIREBASE AUTHENTICATION
                ================================================= */

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


                /* =================================================
                   REFRESH FIREBASE USER

                   This is important if the user verified
                   their email in another tab/window.
                ================================================= */

                await user.reload();


                console.log(
                    "Email:",
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

                    showLoginMessage(
                        "Please verify your email address before signing in.",
                        "error"
                    );

                    resetLoginButton();

                    return;

                }


                /* =================================================
                   SUCCESS
                ================================================= */

                showLoginMessage(
                    "Login successful. Redirecting...",
                    "success"
                );


                /* =================================================
                   READ REDIRECT
                ================================================= */

                const params =
                    new URLSearchParams(
                        window.location.search
                    );


                const redirect =
                    params.get("redirect");


                /* =================================================
                   LABS
                ================================================= */

                if (redirect === "labs") {

                    window.location.replace(
                        "../student/labs.html"
                    );

                    return;

                }


                /* =================================================
                   ASSESSMENTS
                ================================================= */

                if (
                    redirect === "assessments"
                ) {

                    window.location.replace(
                        "../student/assessments.html"
                    );

                    return;

                }


                /* =================================================
                   COURSE
                ================================================= */

                if (
                    redirect &&
                    redirect.startsWith("course-")
                ) {

                    window.location.replace(
                        "../student/dashboard.html"
                    );

                    return;

                }


                /* =================================================
                   DEFAULT
                ================================================= */

                window.location.replace(
                    "../student/dashboard.html"
                );


            } catch (error) {

                console.error(
                    "CWS Academy login error:",
                    error
                );


                let message =
                    "Unable to sign in. Please try again.";


                switch (error.code) {

                    case "auth/invalid-credential":

                    case "auth/wrong-password":

                    case "auth/user-not-found":

                        message =
                            "The email address or password is incorrect.";

                        break;


                    case "auth/invalid-email":

                        message =
                            "Please enter a valid email address.";

                        break;


                    case "auth/user-disabled":

                        message =
                            "This account has been disabled.";

                        break;


                    case "auth/too-many-requests":

                        message =
                            "Too many unsuccessful attempts. Please try again later.";

                        break;


                    case "auth/network-request-failed":

                        message =
                            "A network error occurred. Check your internet connection.";

                        break;

                }


                showLoginMessage(
                    message,
                    "error"
                );


                resetLoginButton();

            }

        }
    );

}
