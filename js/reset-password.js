/* =========================================================
   CWS ACADEMY
   Password Reset Controller
========================================================= */

import {
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

import {
    auth
} from "./firebase-config.js";


/* =========================================================
   ELEMENTS
========================================================= */

const resetForm =
    document.getElementById("resetForm");

const resetEmail =
    document.getElementById("resetEmail");

const resetBtn =
    document.getElementById("resetBtn");

const resetMessage =
    document.getElementById("resetMessage");


console.log(
    "CWS Academy reset-password.js loaded"
);


/* =========================================================
   MESSAGE
========================================================= */

function showResetMessage(
    message,
    type = "error"
) {

    if (!resetMessage) {

        console.log(message);

        return;

    }

    resetMessage.textContent =
        message;

    resetMessage.className =
        `auth-message ${type}`;

    resetMessage.hidden = false;

}


/* =========================================================
   RESET BUTTON
========================================================= */

function resetButton() {

    if (!resetBtn) return;

    resetBtn.disabled = false;

    resetBtn.textContent =
        "Send Reset Link";

}


/* =========================================================
   ERROR HANDLING
========================================================= */

function getResetErrorMessage(error) {

    switch (error.code) {

        case "auth/invalid-email":

            return (
                "Please enter a valid email address."
            );


        case "auth/user-not-found":

            return (
                "No CWS Academy account was found with that email address."
            );


        case "auth/too-many-requests":

            return (
                "Too many password reset requests. Please try again later."
            );


        case "auth/network-request-failed":

            return (
                "A network error occurred. Please check your internet connection."
            );


        case "auth/invalid-continue-uri":

            return (
                "The password reset configuration is invalid."
            );


        case "auth/unauthorized-continue-uri":

            return (
                "This website is not authorized for password reset."
            );


        default:

            console.error(
                "Password reset error:",
                error
            );

            return (
                "Unable to send the password reset email. Please try again."
            );

    }

}


/* =========================================================
   FORM
========================================================= */

if (!resetForm) {

    console.error(
        "CWS Academy: resetForm was not found."
    );

} else {

    resetForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            /* =================================================
               GET EMAIL
            ================================================= */

            const email =
                resetEmail?.value
                    .trim()
                    .toLowerCase() || "";


            /* =================================================
               VALIDATION
            ================================================= */

            if (!email) {

                showResetMessage(
                    "Please enter your email address."
                );

                resetEmail?.focus();

                return;

            }


            /* =================================================
               BUTTON
            ================================================= */

            if (resetBtn) {

                resetBtn.disabled = true;

                resetBtn.textContent =
                    "Sending...";

            }


            try {

                console.log(
                    "Sending password reset email..."
                );


                /* =================================================
                   FIREBASE PASSWORD RESET
                ================================================= */

                await sendPasswordResetEmail(
                    auth,
                    email
                );


                console.log(
                    "Password reset email sent."
                );


                /* =================================================
                   SUCCESS
                ================================================= */

                showResetMessage(
                    "Password reset instructions have been sent to your email address. Please check your inbox.",
                    "success"
                );


                /* =================================================
                   CLEAR EMAIL
                ================================================= */

                if (resetEmail) {

                    resetEmail.value = "";

                }


                /* =================================================
                   RESET BUTTON
                ================================================= */

                resetButton();


            } catch (error) {

                console.error(
                    "CWS Academy password reset error:",
                    error
                );


                showResetMessage(
                    getResetErrorMessage(error),
                    "error"
                );


                resetButton();

            }

        }
    );

}
