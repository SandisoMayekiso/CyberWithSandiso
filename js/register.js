
/* =========================================================
   CWS ACADEMY
   Registration Controller
   ========================================================= */

import {
    createUserWithEmailAndPassword,
    updateProfile,
    sendEmailVerification
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

import {
    auth
} from "./firebase-config.js";


/* =========================================================
   ELEMENTS
   ========================================================= */

const registerForm =
    document.getElementById("registerForm");

const nameInput =
    document.getElementById("registerName");

const emailInput =
    document.getElementById("registerEmail");

const passwordInput =
    document.getElementById("registerPassword");

const confirmPasswordInput =
    document.getElementById("confirmPassword");

const termsCheckbox =
    document.getElementById("termsCheckbox");

const registerButton =
    document.getElementById("registerBtn");

const authMessage =
    document.getElementById("authMessage");


console.log("CWS Academy register.js loaded");


/* =========================================================
   MESSAGE
   ========================================================= */

function showMessage(message, type = "error") {

    if (!authMessage) {
        console.log(message);
        return;
    }

    authMessage.textContent = message;

    authMessage.className =
        `auth-message ${type}`;

    authMessage.hidden = false;
}


/* =========================================================
   RESET BUTTON
   ========================================================= */

function resetRegisterButton() {

    if (!registerButton) {
        return;
    }

    registerButton.disabled = false;

    registerButton.textContent =
        "Create Account";
}


/* =========================================================
   VALIDATE EMAIL
   ========================================================= */

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}


/* =========================================================
   REGISTRATION
   ========================================================= */

if (!registerForm) {

    console.error(
        "CWS Academy: registerForm was not found."
    );

} else {

    registerForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            /* -------------------------------------------------
               READ FORM VALUES
               ------------------------------------------------- */

            const name =
                nameInput?.value
                    .trim() || "";

            const email =
                emailInput?.value
                    .trim()
                    .toLowerCase() || "";

            const password =
                passwordInput?.value || "";

            const confirmPassword =
                confirmPasswordInput?.value || "";


            /* -------------------------------------------------
               VALIDATION
               ------------------------------------------------- */

            if (!name) {

                showMessage(
                    "Please enter your full name."
                );

                nameInput?.focus();

                return;

            }


            if (!email) {

                showMessage(
                    "Please enter your email address."
                );

                emailInput?.focus();

                return;

            }


            if (!isValidEmail(email)) {

                showMessage(
                    "Please enter a valid email address."
                );

                emailInput?.focus();

                return;

            }


            if (password.length < 8) {

                showMessage(
                    "Password must contain at least 8 characters."
                );

                passwordInput?.focus();

                return;

            }


            if (password !== confirmPassword) {

                showMessage(
                    "Passwords do not match."
                );

                confirmPasswordInput?.focus();

                return;

            }


            if (
                termsCheckbox &&
                !termsCheckbox.checked
            ) {

                showMessage(
                    "You must agree to the Terms of Use and Privacy Policy."
                );

                termsCheckbox.focus();

                return;

            }


            /* -------------------------------------------------
               DISABLE BUTTON
               ------------------------------------------------- */

            if (registerButton) {

                registerButton.disabled = true;

                registerButton.textContent =
                    "Creating Account...";

            }


            /* -------------------------------------------------
               FIREBASE REGISTRATION
               ------------------------------------------------- */

            try {

                console.log(
                    "Attempting Firebase registration..."
                );


                /*
                 * Create Firebase Authentication account
                 */

                const userCredential =
                    await createUserWithEmailAndPassword(
                        auth,
                        email,
                        password
                    );


                const user =
                    userCredential.user;


                console.log(
                    "Firebase account created:",
                    user.uid
                );


                /* -------------------------------------------------
                   SAVE USER DISPLAY NAME
                   ------------------------------------------------- */

                await updateProfile(
                    user,
                    {
                        displayName: name
                    }
                );


                console.log(
                    "Firebase profile updated."
                );


                /* -------------------------------------------------
                   SEND VERIFICATION EMAIL
                   ------------------------------------------------- */

                await sendEmailVerification(user);


                console.log(
                    "Verification email sent."
                );


                /* -------------------------------------------------
                   SUCCESS MESSAGE
                   ------------------------------------------------- */

                showMessage(
                    "Account created successfully! Please check your email to verify your account.",
                    "success"
                );


                /*
                 * Keep the user on this page briefly so they
                 * can see the success message.
                 */

                setTimeout(() => {

                    window.location.replace(
                        "login.html"
                    );

                }, 2500);


            } catch (error) {

                console.error(
                    "CWS Academy registration error:",
                    error
                );


                let message =
                    "Unable to create your account. Please try again.";


                /* -------------------------------------------------
                   FIREBASE ERROR HANDLING
                   ------------------------------------------------- */

                switch (error.code) {

                    case "auth/email-already-in-use":

                        message =
                            "An account with this email already exists. Please sign in.";

                        break;


                    case "auth/invalid-email":

                        message =
                            "Please enter a valid email address.";

                        break;


                    case "auth/weak-password":

                        message =
                            "Your password is too weak. Please choose a stronger password.";

                        break;


                    case "auth/operation-not-allowed":

                        message =
                            "Email/password registration is currently disabled.";

                        break;


                    case "auth/network-request-failed":

                        message =
                            "A network error occurred. Check your internet connection.";

                        break;


                    case "auth/too-many-requests":

                        message =
                            "Too many attempts. Please wait and try again later.";

                        break;

                }


                showMessage(
                    message,
                    "error"
                );


                resetRegisterButton();

            }

        }
    );

}
```
