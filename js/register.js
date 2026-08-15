/* =========================================================
   CWS ACADEMY
   REGISTRATION CONTROLLER

   Firebase Authentication
   Cloud Firestore
   Email Verification
========================================================= */


/* =========================================================
   FIREBASE AUTH
========================================================= */

import {

    createUserWithEmailAndPassword,
    sendEmailVerification,
    signOut

} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";


/* =========================================================
   FIRESTORE
========================================================= */

import {

    doc,
    setDoc,
    serverTimestamp

} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";


/* =========================================================
   FIREBASE CONFIG
========================================================= */

import {

    auth,
    db

} from "./firebase-config.js";



/* =========================================================
   DEBUG
========================================================= */

const DEBUG =
    true;


function log(
    ...args
) {

    if (DEBUG) {

        console.log(
            "[CWS Register]",
            ...args
        );

    }

}


function error(
    ...args
) {

    console.error(
        "[CWS Register]",
        ...args
    );

}


log(
    "register.js loaded."
);



/* =========================================================
   ELEMENTS
========================================================= */

const registerForm =
    document.getElementById(
        "registerForm"
    );


const registerName =
    document.getElementById(
        "registerName"
    );


const registerEmail =
    document.getElementById(
        "registerEmail"
    );


const registerPassword =
    document.getElementById(
        "registerPassword"
    );


const confirmPassword =
    document.getElementById(
        "confirmPassword"
    );


const termsCheckbox =
    document.getElementById(
        "termsCheckbox"
    );


const registerBtn =
    document.getElementById(
        "registerBtn"
    );


const authMessage =
    document.getElementById(
        "authMessage"
    );



/* =========================================================
   MESSAGE
========================================================= */

function showMessage(
    message,
    type = "error"
) {

    if (!authMessage) {

        console.log(
            message
        );

        return;

    }


    authMessage.textContent =
        message;


    authMessage.className =
        `auth-message ${type}`;


    authMessage.hidden =
        false;

}


function clearMessage() {

    if (!authMessage) {
        return;
    }


    authMessage.textContent =
        "";


    authMessage.className =
        "auth-message";


    authMessage.hidden =
        true;

}



/* =========================================================
   EMAIL VALIDATION
========================================================= */

function isValidEmail(
    email
) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    return emailPattern.test(
        email
    );

}



/* =========================================================
   REGISTER BUTTON
========================================================= */

function setRegisterLoading(
    loading
) {

    if (!registerBtn) {
        return;
    }


    registerBtn.disabled =
        loading;


    registerBtn.innerHTML =
        loading
            ? `
                <i class="fa-solid fa-circle-notch fa-spin"></i>
                Creating Account...
              `
            : "Create Account";

}



/* =========================================================
   FIREBASE ERROR MESSAGE
========================================================= */

function getRegistrationErrorMessage(
    registrationError
) {

    switch (
        registrationError?.code
    ) {


        case "auth/email-already-in-use":

            return (
                "An account with this email already exists. Please sign in instead."
            );


        case "auth/invalid-email":

            return (
                "Please enter a valid email address."
            );


        case "auth/weak-password":

            return (
                "Your password is too weak. Please choose a stronger password."
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
                "A network error occurred. Please check your internet connection and try again."
            );


        case "auth/too-many-requests":

            return (
                "Too many requests were made. Please wait a while and try again."
            );


        default:

            error(
                "Unhandled registration error:",
                registrationError
            );


            return (
                "Unable to create your account. Please try again."
            );

    }

}



/* =========================================================
   GET FORM VALUES
========================================================= */

function getRegistrationValues() {

    const name =
        String(
            registerName?.value ||
            ""
        )
            .trim();


    const email =
        String(
            registerEmail?.value ||
            ""
        )
            .trim()
            .toLowerCase();


    const password =
        String(
            registerPassword?.value ||
            ""
        );


    const confirmPasswordValue =
        String(
            confirmPassword?.value ||
            ""
        );


    return {

        name,
        email,
        password,
        confirmPasswordValue

    };

}



/* =========================================================
   VALIDATE FORM
========================================================= */

function validateRegistration(
    values
) {

    const {

        name,
        email,
        password,
        confirmPasswordValue

    } =
        values;


    if (!name) {

        showMessage(
            "Please enter your full name."
        );


        registerName?.focus();


        return false;

    }


    if (!email) {

        showMessage(
            "Please enter your email address."
        );


        registerEmail?.focus();


        return false;

    }


    if (
        !isValidEmail(
            email
        )
    ) {

        showMessage(
            "Please enter a valid email address."
        );


        registerEmail?.focus();


        return false;

    }


    if (
        password.length < 8
    ) {

        showMessage(
            "Password must contain at least 8 characters."
        );


        registerPassword?.focus();


        return false;

    }


    if (
        password !==
        confirmPasswordValue
    ) {

        showMessage(
            "Passwords do not match."
        );


        confirmPassword?.focus();


        return false;

    }


    if (
        !termsCheckbox?.checked
    ) {

        showMessage(
            "You must agree to the Terms of Use and Privacy Policy."
        );


        termsCheckbox?.focus();


        return false;

    }


    return true;

}



/* =========================================================
   REDIRECT TO LOGIN
========================================================= */

function redirectToLoginAfterRegistration() {

    const params =
        new URLSearchParams();


    params.set(
        "registered",
        "true"
    );


    params.set(
        "verify",
        "true"
    );


    window.location.replace(
        `login.html?${params.toString()}`
    );

}



/* =========================================================
   REGISTRATION
========================================================= */

async function registerUser(
    event
) {

    event.preventDefault();


    clearMessage();



    /* =====================================================
       FIREBASE CHECK
    ===================================================== */

    if (
        !auth ||
        !db
    ) {

        error(
            "Firebase Auth or Firestore is unavailable."
        );


        showMessage(
            "Registration is temporarily unavailable. Please try again later."
        );


        return;

    }



    /* =====================================================
       GET FORM DATA
    ===================================================== */

    const values =
        getRegistrationValues();



    /* =====================================================
       VALIDATION
    ===================================================== */

    if (
        !validateRegistration(
            values
        )
    ) {

        return;

    }


    const {

        name,
        email,
        password

    } =
        values;



    /* =====================================================
       LOADING
    ===================================================== */

    setRegisterLoading(
        true
    );



    try {


        /* =================================================
           CREATE FIREBASE ACCOUNT
        ================================================= */

        log(
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


        log(
            "Firebase account created:",
            user.uid
        );



        /* =================================================
           SEND VERIFICATION EMAIL
        ================================================= */

        log(
            "Sending verification email..."
        );


        await sendEmailVerification(
            user
        );


        log(
            "Verification email sent:",
            user.email
        );



        /* =================================================
           CREATE FIRESTORE PROFILE
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

                displayName:
                    name,

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


        log(
            "Firestore user profile created:",
            user.uid
        );



        /* =================================================
           SIGN OUT

           The student must verify their email before
           normal CWS Academy access is granted.
        ================================================= */

        await signOut(
            auth
        );


        log(
            "New account signed out pending verification."
        );



        /* =================================================
           SUCCESS MESSAGE
        ================================================= */

        showMessage(

            "Account created successfully! We sent a verification link to your email address. Please check your inbox and verify your email before signing in.",

            "success"

        );



        /* =================================================
           CLEAR PASSWORD FIELDS
        ================================================= */

        if (registerPassword) {

            registerPassword.value =
                "";

        }


        if (confirmPassword) {

            confirmPassword.value =
                "";

        }



        /* =================================================
           REDIRECT

           Give the student a moment to read the success
           message, then move them to the login page.

           login.js will detect:
           ?registered=true&verify=true
        ================================================= */

        window.setTimeout(

            () => {

                redirectToLoginAfterRegistration();

            },

            2500

        );


    }
    catch (registrationError) {


        error(
            "Registration failed:",
            registrationError
        );


        showMessage(

            getRegistrationErrorMessage(
                registrationError
            ),

            "error"

        );


        setRegisterLoading(
            false
        );

    }

}



/* =========================================================
   EVENT
========================================================= */

if (!registerForm) {

    error(
        "#registerForm was not found."
    );

}
else {

    registerForm.addEventListener(
        "submit",
        registerUser
    );


    log(
        "Registration form ready."
    );

}
