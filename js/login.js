/* =========================================================
   CWS ACADEMY
   LOGIN CONTROLLER

   Email / Password Authentication
   Remember Me
   Email Verification Guard
========================================================= */


import {

    signInWithEmailAndPassword,
    signOut,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence

} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";


import {

    auth

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
            "[CWS Login]",
            ...args
        );

    }

}


function error(
    ...args
) {

    console.error(
        "[CWS Login]",
        ...args
    );

}



/* =========================================================
   ELEMENTS
========================================================= */

const loginForm =
    document.getElementById(
        "loginForm"
    );


const emailInput =
    document.getElementById(
        "loginEmail"
    );


const passwordInput =
    document.getElementById(
        "loginPassword"
    );


const rememberMe =
    document.getElementById(
        "rememberMe"
    );


const loginButton =
    document.getElementById(
        "loginBtn"
    );


const loginMessage =
    document.getElementById(
        "loginMessage"
    );



/* =========================================================
   MESSAGE
========================================================= */

function showLoginMessage(
    message,
    type = "error"
) {

    if (!loginMessage) {

        console.log(
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


function clearLoginMessage() {

    if (!loginMessage) {
        return;
    }


    loginMessage.textContent =
        "";


    loginMessage.hidden =
        true;

}



/* =========================================================
   BUTTON STATE
========================================================= */

function setLoginLoading(
    loading
) {

    if (!loginButton) {
        return;
    }


    loginButton.disabled =
        loading;


    loginButton.innerHTML =
        loading
            ? `
                <i class="fa-solid fa-circle-notch fa-spin"></i>
                Signing In...
              `
            : "Sign In";

}



/* =========================================================
   REDIRECT
========================================================= */

function redirectAfterLogin() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const redirect =
        params.get(
            "redirect"
        );


    const courseId =
        params.get(
            "course"
        );


    const moduleId =
        params.get(
            "module"
        );


    const lessonId =
        params.get(
            "lesson"
        );


    /* =====================================================
       PROFILE
    ===================================================== */

    if (
        redirect ===
        "profile"
    ) {

        window.location.replace(
            "../student/profile.html"
        );

        return;

    }


    /* =====================================================
       LABS
    ===================================================== */

    if (
        redirect ===
        "labs"
    ) {

        window.location.replace(
            "../student/labs.html"
        );

        return;

    }


    /* =====================================================
       ASSESSMENTS
    ===================================================== */

    if (
        redirect ===
        "assessments"
    ) {

        window.location.replace(
            "../student/assessments.html"
        );

        return;

    }


    /* =====================================================
       COURSE DETAILS
    ===================================================== */

    if (
        courseId &&
        (
            redirect ===
                "course-details" ||
            redirect ===
                "course"
        )
    ) {

        const query =
            new URLSearchParams();


        query.set(
            "course",
            courseId
        );


        window.location.replace(
            `../student/course-details.html?${query.toString()}`
        );

        return;

    }


    /* =====================================================
       LESSON
    ===================================================== */

    if (
        courseId &&
        moduleId &&
        lessonId &&
        redirect ===
        "lesson"
    ) {

        const query =
            new URLSearchParams();


        query.set(
            "course",
            courseId
        );


        query.set(
            "module",
            moduleId
        );


        query.set(
            "lesson",
            lessonId
        );


        window.location.replace(
            `../student/lesson.html?${query.toString()}`
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
   VALIDATION
========================================================= */

function getCredentials() {

    const email =
        String(
            emailInput?.value ||
            ""
        )
            .trim()
            .toLowerCase();


    const password =
        String(
            passwordInput?.value ||
            ""
        );


    return {

        email,
        password

    };

}



/* =========================================================
   AUTH ERROR MESSAGE
========================================================= */

function getAuthErrorMessage(
    authError
) {

    switch (
        authError?.code
    ) {


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
                "Email/password sign-in is not enabled in Firebase Authentication."
            );


        case "auth/missing-password":

            return (
                "Please enter your password."
            );


        default:

            return (
                "Unable to sign in. Please try again."
            );

    }

}



/* =========================================================
   LOGIN
========================================================= */

async function login(
    event
) {

    event.preventDefault();


    clearLoginMessage();


    /* =====================================================
       FIREBASE CHECK
    ===================================================== */

    if (!auth) {

        error(
            "Firebase Auth is unavailable."
        );


        showLoginMessage(
            "Authentication is temporarily unavailable."
        );


        return;

    }


    /* =====================================================
       FORM VALUES
    ===================================================== */

    const {

        email,
        password

    } =
        getCredentials();



    /* =====================================================
       VALIDATION
    ===================================================== */

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



    /* =====================================================
       LOADING
    ===================================================== */

    setLoginLoading(
        true
    );


    try {


        /* =================================================
           AUTH PERSISTENCE

           Remember Me checked:
               stays signed in after browser restart.

           Not checked:
               session only.
        ================================================= */

        const persistence =
            rememberMe?.checked
                ? browserLocalPersistence
                : browserSessionPersistence;


        await setPersistence(
            auth,
            persistence
        );


        log(
            "Authentication persistence:",
            rememberMe?.checked
                ? "LOCAL"
                : "SESSION"
        );



        /* =================================================
           EMAIL / PASSWORD LOGIN
        ================================================= */

        log(
            "Attempting email/password login..."
        );


        const userCredential =
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );


        const user =
            userCredential.user;


        log(
            "Firebase login successful:",
            user.uid
        );



        /* =================================================
           REFRESH USER DATA
        ================================================= */

        await user.reload();


        log(
            "User:",
            {
                email:
                    user.email,

                emailVerified:
                    user.emailVerified
            }
        );



        /* =================================================
           EMAIL VERIFICATION
        ================================================= */

        if (
            !user.emailVerified
        ) {

            /*
             * Important:
             * The credentials were correct, but this user
             * should not remain authenticated if CWS requires
             * verified-email access.
             */

            await signOut(
                auth
            );


            showLoginMessage(
                "Your email address has not been verified yet. Please verify it before signing in.",
                "error"
            );


            setLoginLoading(
                false
            );


            return;

        }



        /* =================================================
           SUCCESS
        ================================================= */

        showLoginMessage(
            "Login successful. Redirecting...",
            "success"
        );


        redirectAfterLogin();


    }
    catch (authError) {


        error(
            "Login failed:",
            authError
        );


        showLoginMessage(

            getAuthErrorMessage(
                authError
            ),

            "error"

        );


        setLoginLoading(
            false
        );

    }

}



/* =========================================================
   EVENT
========================================================= */

if (!loginForm) {

    error(
        "#loginForm was not found."
    );

}
else {

    loginForm.addEventListener(
        "submit",
        login
    );


    log(
        "Login form ready."
    );

}



log(
    "login.js loaded."
);
