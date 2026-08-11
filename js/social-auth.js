
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


console.log(
    "CWS Academy social-auth.js loaded"
);


/* =========================================================
   PROVIDERS
   ========================================================= */

const googleProvider =
    new GoogleAuthProvider();

const githubProvider =
    new GithubAuthProvider();


/*
 * Request the user's email/profile information.
 */

googleProvider.addScope(
    "profile"
);

googleProvider.addScope(
    "email"
);

githubProvider.addScope(
    "user:email"
);


/* =========================================================
   BUTTONS
   ========================================================= */

const googleLoginBtn =
    document.getElementById(
        "googleLoginBtn"
    );

const githubLoginBtn =
    document.getElementById(
        "githubLoginBtn"
    );


console.log(
    "Google button:",
    googleLoginBtn
        ? "found"
        : "not found"
);

console.log(
    "GitHub button:",
    githubLoginBtn
        ? "found"
        : "not found"
);


/* =========================================================
   REDIRECT DESTINATION
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

    if (
        redirect === "assessments"
    ) {

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
   GOOGLE LOGIN
   ========================================================= */

if (googleLoginBtn) {

    googleLoginBtn.addEventListener(
        "click",
        async () => {

            try {

                googleLoginBtn.disabled =
                    true;

                googleLoginBtn.innerHTML =
                    "Connecting to Google...";


                console.log(
                    "Starting Google authentication..."
                );


                /*
                 * Firebase redirects the browser to Google.
                 *
                 * The browser will leave this page.
                 * After authentication, Firebase returns
                 * to the application and getRedirectResult()
                 * handles the result.
                 */

                await signInWithRedirect(
                    auth,
                    googleProvider
                );


            } catch (error) {

                console.error(
                    "Google authentication error:",
                    error
                );


                googleLoginBtn.disabled =
                    false;

                googleLoginBtn.innerHTML =
                    '<span class="social-icon">G</span>' +
                    '<span>Continue with Google</span>';


                showAuthError(
                    error
                );

            }

        }
    );

}


/* =========================================================
   GITHUB LOGIN
   ========================================================= */

if (githubLoginBtn) {

    githubLoginBtn.addEventListener(
        "click",
        async () => {

            try {

                githubLoginBtn.disabled =
                    true;

                githubLoginBtn.innerHTML =
                    "Connecting to GitHub...";


                console.log(
                    "Starting GitHub authentication..."
                );


                /*
                 * Firebase redirects the browser to GitHub.
                 */

                await signInWithRedirect(
                    auth,
                    githubProvider
                );


            } catch (error) {

                console.error(
                    "GitHub authentication error:",
                    error
                );


                githubLoginBtn.disabled =
                    false;

                githubLoginBtn.innerHTML =
                    '<span class="social-icon">' +
                    '<i class="fab fa-github"></i>' +
                    '</span>' +
                    '<span>Continue with GitHub</span>';


                showAuthError(
                    error
                );

            }

        }
    );

}


/* =========================================================
   HANDLE REDIRECT RESULT
   ========================================================= */

async function handleRedirectResult() {

    try {

        console.log(
            "Checking Firebase OAuth redirect..."
        );


        const result =
            await getRedirectResult(
                auth
            );


        /*
         * No OAuth redirect happened.
         */

        if (!result) {

            console.log(
                "No OAuth redirect result."
            );

            return;
        }


        /* -------------------------------------------------
           USER
           ------------------------------------------------- */

        const user =
            result.user;


        console.log(
            "Social login successful:",
            user.uid
        );


        console.log(
            "Signed in as:",
            user.email
        );


        /* -------------------------------------------------
           SUCCESS
           ------------------------------------------------- */

        redirectAfterLogin();


    } catch (error) {

        console.error(
            "Firebase OAuth redirect error:",
            error
        );


        showAuthError(
            error
        );

    }

}


/* =========================================================
   START REDIRECT HANDLER
   ========================================================= */

handleRedirectResult();


/* =========================================================
   ERROR HANDLING
   ========================================================= */

function showAuthError(error) {

    console.error(
        "Authentication error code:",
        error.code
    );


    let message =
        "Unable to sign in. Please try again.";


    switch (error.code) {


        /* -------------------------------------------------
           USER CLOSED POPUP
           ------------------------------------------------- */

        case "auth/popup-closed-by-user":

            message =
                "The sign-in window was closed.";

            break;


        /* -------------------------------------------------
           POPUP BLOCKED
           ------------------------------------------------- */

        case "auth/popup-blocked":

            message =
                "Your browser blocked the sign-in popup.";

            break;


        /* -------------------------------------------------
           UNAUTHORIZED DOMAIN
           ------------------------------------------------- */

        case "auth/unauthorized-domain":

            message =
                "This domain is not authorized in Firebase Authentication. Add sandisomayekiso.github.io to Firebase Authorized Domains.";

            break;


        /* -------------------------------------------------
           PROVIDER DISABLED
           ------------------------------------------------- */

        case "auth/operation-not-allowed":

            message =
                "This sign-in provider is not enabled in Firebase Authentication.";

            break;


        /* -------------------------------------------------
           ACCOUNT EXISTS
           ------------------------------------------------- */

        case "auth/account-exists-with-different-credential":

            message =
                "An account already exists using a different sign-in method.";

            break;


        /* -------------------------------------------------
           NETWORK
           ------------------------------------------------- */

        case "auth/network-request-failed":

            message =
                "A network error occurred. Please check your internet connection.";

            break;


        /* -------------------------------------------------
           CREDENTIAL
           ------------------------------------------------- */

        case "auth/credential-already-in-use":

            message =
                "This account is already linked to another user.";

            break;


        /* -------------------------------------------------
           CANCELLED
           ------------------------------------------------- */

        case "auth/cancelled-popup-request":

            message =
                "Another authentication request is already in progress.";

            break;

    }


    /*
     * Use your existing login message if it exists.
     */

    const loginMessage =
        document.getElementById(
            "loginMessage"
        );


    if (loginMessage) {

        loginMessage.textContent =
            message;

        loginMessage.className =
            "auth-message error";

        loginMessage.hidden =
            false;

        return;
    }


    /*
     * Fallback.
     */

    alert(message);
}
