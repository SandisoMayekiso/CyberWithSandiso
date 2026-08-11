
/* =========================================================
   CWS ACADEMY
   Social Authentication
   Google + GitHub
   Firebase Redirect Authentication
   ========================================================= */

import {
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithRedirect,
    getRedirectResult
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

import {
    auth
} from "./firebase-config.js";


/* =========================================================
   DEBUG
   ========================================================= */

console.log(
    "CWS Academy social-auth.js loaded"
);


/* =========================================================
   ELEMENTS
   ========================================================= */

const googleButton =
    document.getElementById("googleLoginBtn");

const githubButton =
    document.getElementById("githubLoginBtn");

const loginMessage =
    document.getElementById("loginMessage");


console.log(
    "Google button:",
    googleButton
        ? "found"
        : "NOT FOUND"
);

console.log(
    "GitHub button:",
    githubButton
        ? "found"
        : "NOT FOUND"
);


/* =========================================================
   PROVIDERS
   ========================================================= */

const googleProvider =
    new GoogleAuthProvider();

googleProvider.addScope("profile");
googleProvider.addScope("email");


const githubProvider =
    new GithubAuthProvider();

githubProvider.addScope(
    "user:email"
);


/* =========================================================
   MESSAGE
   ========================================================= */

function showMessage(
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
   REDIRECT
   ========================================================= */

function redirectAfterLogin() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const redirect =
        params.get("redirect");


    /* Labs */

    if (redirect === "labs") {

        window.location.replace(
            "../student/labs.html"
        );

        return;
    }


    /* Assessments */

    if (redirect === "assessments") {

        window.location.replace(
            "../student/assessments.html"
        );

        return;
    }


    /* Course */

    if (
        redirect &&
        redirect.startsWith("course-")
    ) {

        window.location.replace(
            "../student/dashboard.html"
        );

        return;
    }


    /* Default */

    window.location.replace(
        "../student/dashboard.html"
    );
}


/* =========================================================
   ERROR HANDLING
   ========================================================= */

function getSocialAuthErrorMessage(error) {

    console.error(
        "Firebase social authentication error:",
        error
    );


    switch (error.code) {

        case "auth/unauthorized-domain":

            return (
                "This website is not authorized for Firebase authentication. Add your GitHub Pages domain to Firebase Authentication → Settings → Authorized domains."
            );


        case "auth/operation-not-allowed":

            return (
                "This social sign-in provider is not enabled in Firebase Authentication."
            );


        case "auth/account-exists-with-different-credential":

            return (
                "An account already exists with this email using a different sign-in method."
            );


        case "auth/network-request-failed":

            return (
                "A network error occurred. Please check your internet connection."
            );


        case "auth/popup-blocked":

            return (
                "The browser blocked the sign-in window."
            );


        case "auth/cancelled-popup-request":

            return (
                "Another authentication request is already running."
            );


        case "auth/invalid-credential":

            return (
                "The authentication credentials were rejected. Please try again."
            );


        default:

            return (
                error.message ||
                "Unable to sign in with this provider. Please try again."
            );
    }
}


/* =========================================================
   GOOGLE LOGIN
   ========================================================= */

async function loginWithGoogle() {

    if (!googleButton) {

        console.error(
            "CWS Academy: Google button was not found."
        );

        return;
    }


    googleButton.disabled =
        true;

    googleButton.dataset.originalText =
        googleButton.innerHTML;

    googleButton.innerHTML =
        "Connecting to Google...";


    try {

        console.log(
            "Starting Google redirect authentication..."
        );


        await signInWithRedirect(
            auth,
            googleProvider
        );


    } catch (error) {

        console.error(
            "Google redirect error:",
            error
        );


        googleButton.disabled =
            false;

        googleButton.innerHTML =
            googleButton.dataset.originalText;


        showMessage(
            getSocialAuthErrorMessage(error),
            "error"
        );
    }
}


/* =========================================================
   GITHUB LOGIN
   ========================================================= */

async function loginWithGithub() {

    if (!githubButton) {

        console.error(
            "CWS Academy: GitHub button was not found."
        );

        return;
    }


    githubButton.disabled =
        true;

    githubButton.dataset.originalText =
        githubButton.innerHTML;

    githubButton.innerHTML =
        "Connecting to GitHub...";


    try {

        console.log(
            "Starting GitHub redirect authentication..."
        );


        await signInWithRedirect(
            auth,
            githubProvider
        );


    } catch (error) {

        console.error(
            "GitHub redirect error:",
            error
        );


        githubButton.disabled =
            false;

        githubButton.innerHTML =
            githubButton.dataset.originalText;


        showMessage(
            getSocialAuthErrorMessage(error),
            "error"
        );
    }
}


/* =========================================================
   GOOGLE BUTTON
   ========================================================= */

if (googleButton) {

    googleButton.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            loginWithGoogle();

        }
    );

} else {

    console.warn(
        "CWS Academy: Google login button not found."
    );
}


/* =========================================================
   GITHUB BUTTON
   ========================================================= */

if (githubButton) {

    githubButton.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            loginWithGithub();

        }
    );

} else {

    console.warn(
        "CWS Academy: GitHub login button not found."
    );
}


/* =========================================================
   HANDLE REDIRECT RESULT
   ========================================================= */

async function handleRedirectResult() {

    try {

        console.log(
            "Checking Firebase social redirect result..."
        );


        const result =
            await getRedirectResult(auth);


        /*
         * No redirect authentication was performed.
         */

        if (!result) {

            console.log(
                "No social redirect result."
            );

            return;
        }


        const user =
            result.user;


        console.log(
            "Social authentication successful:",
            user.uid
        );


        showMessage(
            "Sign-in successful. Redirecting...",
            "success"
        );


        redirectAfterLogin();


    } catch (error) {

        console.error(
            "Social redirect authentication failed:",
            error
        );


        showMessage(
            getSocialAuthErrorMessage(error),
            "error"
        );
    }
}


/* =========================================================
   START REDIRECT CHECK
   ========================================================= */

handleRedirectResult();

