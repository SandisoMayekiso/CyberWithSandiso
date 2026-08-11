/* =========================================================
   CWS ACADEMY
   Registration Controller
   Firebase Authentication + Cloud Firestore
========================================================= */

import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signOut
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

import {
    doc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

import {
    auth,
    db
} from "./firebase-config.js";


console.log("CWS Academy register.js loaded");


/* =========================================================
   ELEMENTS
========================================================= */

const registerForm =
    document.getElementById("registerForm");

const registerName =
    document.getElementById("registerName");

const registerEmail =
    document.getElementById("registerEmail");

const registerPassword =
    document.getElementById("registerPassword");

const confirmPassword =
    document.getElementById("confirmPassword");

const termsCheckbox =
    document.getElementById("termsCheckbox");

const registerBtn =
    document.getElementById("registerBtn");

const authMessage =
    document.getElementById("authMessage");


/* =========================================================
   MESSAGE
========================================================= */

function showMessage(
    message,
    type = "error"
) {

    if (!authMessage) {

        console.log(message);

        return;

    }

    authMessage.textContent =
        message;

    authMessage.className =
        `auth-message ${type}`;

    authMessage.hidden = false;

}


/* =========================================================
   EMAIL VALIDATION
========================================================= */

function isValidEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);

}


/* =========================================================
   RESET BUTTON
========================================================= */

function resetRegisterButton() {

    if (!registerBtn) return;

    registerBtn.disabled = false;

    registerBtn.textContent =
        "Create Account";

}


/* =========================================================
   FIREBASE ERROR MESSAGE
========================================================= */

function getRegistrationErrorMessage(error) {

    switch (error.code) {

        case "auth/email-already-in-use":

            return (
                "An account with this email already exists. " +
                "Please sign in instead."
            );


        case "auth/invalid-email":

            return (
                "Please enter a valid email address."
            );


        case "auth/weak-password":

            return (
                "Your password is too weak. " +
                "Please choose a stronger password."
            );


        case "auth/password-does-not-meet-requirements":

            return (
                "Your password does not meet the required password rules."
            );


        case "auth/operation-not-allowed":

            return (
                "Email/password registration is not enabled in Firebase Authentication."
            );


        case "auth/network-request-failed":

            return (
                "A network error occurred. " +
                "Please check your internet connection and try again."
            );


        case "auth/too-many-requests":

            return (
                "Too many requests were made. " +
                "Please wait a while and try again."
            );


        default:

            console.error(
                "Unhandled registration error:",
                error
            );

            return (
                "Unable to create your account. " +
                "Please try again."
            );

    }

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


            /* =================================================
               CLEAR MESSAGE
            ================================================= */

            if (authMessage) {

                authMessage.textContent = "";

                authMessage.className =
                    "auth-message";

                authMessage.hidden = true;

            }


            /* =================================================
               GET VALUES
            ================================================= */

            const name =
                registerName?.value
                    .trim() || "";

            const email =
                registerEmail?.value
                    .trim()
                    .toLowerCase() || "";

            const password =
                registerPassword?.value || "";

            const confirmPasswordValue =
                confirmPassword?.value || "";


            /* =================================================
               VALIDATION
            ================================================= */

            if (!name) {

                showMessage(
                    "Please enter your full name."
                );

                registerName?.focus();

                return;

            }


            if (!email) {

                showMessage(
                    "Please enter your email address."
                );

                registerEmail?.focus();

                return;

            }


            if (!isValidEmail(email)) {

                showMessage(
                    "Please enter a valid email address."
                );

                registerEmail?.focus();

                return;

            }


            if (password.length < 8) {

                showMessage(
                    "Password must contain at least 8 characters."
                );

                registerPassword?.focus();

                return;

            }


            if (password !== confirmPasswordValue) {

                showMessage(
                    "Passwords do not match."
                );

                confirmPassword?.focus();

                return;

            }


            if (!termsCheckbox?.checked) {

                showMessage(
                    "You must agree to the Terms of Use and Privacy Policy."
                );

                termsCheckbox?.focus();

                return;

            }


            /* =================================================
               DISABLE BUTTON
            ================================================= */

            if (registerBtn) {

                registerBtn.disabled = true;

                registerBtn.textContent =
                    "Creating Account...";

            }


            try {

                /* =================================================
                   CREATE FIREBASE AUTH ACCOUNT
                ================================================= */

                console.log(
                    "Creating Firebase account..."
                );


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


                /* =================================================
                   SEND EMAIL VERIFICATION
                ================================================= */

                console.log(
                    "Sending verification email..."
                );


                await sendEmailVerification(
                    user
                );


                console.log(
                    "Verification email sent:",
                    user.email
                );


                /* =================================================
                   CREATE FIRESTORE USER PROFILE
                ================================================= */

                await setDoc(
                    doc(
                        db,
                        "users",
                        user.uid
                    ),
                    {

                        uid:
                            user.uid,

                        name:
                            name,

                        email:
                            user.email,

                        emailVerified:
                            false,

                        authProvider:
                            "password",

                        role:
                            "student",

                        createdAt:
                            serverTimestamp(),

                        updatedAt:
                            serverTimestamp()

                    }
                );


                console.log(
                    "Firestore user profile created:",
                    user.uid
                );


                /* =================================================
                   SIGN OUT

                   The account has been created, but the email
                   must be verified before normal login.
                ================================================= */

                await signOut(auth);


                /* =================================================
                   SUCCESS MESSAGE
                ================================================= */

                showMessage(
                    "Account created! A verification email has been sent to your inbox. Please verify your email before signing in.",
                    "success"
                );


                /* =================================================
                   CLEAR FORM
                ================================================= */

                if (registerPassword) {

                    registerPassword.value = "";

                }

                if (confirmPassword) {

                    confirmPassword.value = "";

                }


                /* =================================================
                   REDIRECT TO LOGIN
                ================================================= */

                setTimeout(
                    () => {

                        window.location.href =
                            "login.html";

                    },
                    2500
                );


            } catch (error) {

                console.error(
                    "CWS Academy registration error:",
                    error
                );


                /* =================================================
                   FIREBASE REGISTRATION ERROR
                ================================================= */

                showMessage(
                    getRegistrationErrorMessage(
                        error
                    ),
                    "error"
                );


                resetRegisterButton();

            }

        }
    );

}
