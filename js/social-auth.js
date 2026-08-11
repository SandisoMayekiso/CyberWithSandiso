/* =========================================================
   CWS ACADEMY
   Social Authentication
   Google + GitHub
========================================================= */

import {
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

import {
    auth
} from "./firebase-config.js";


/* =========================================================
   PROVIDERS
========================================================= */

const googleProvider =
    new GoogleAuthProvider();

const githubProvider =
    new GithubAuthProvider();


/* =========================================================
   REDIRECT
========================================================= */

function redirectAfterSocialLogin() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const redirect =
        params.get("redirect");


    /* =====================================================
       LABS
    ===================================================== */

    if (redirect === "labs") {

        window.location.replace(
            "../student/labs.html"
        );

        return;

    }


    /* =====================================================
       ASSESSMENTS
    ===================================================== */

    if (redirect === "assessments") {

        window.location.replace(
            "../student/assessments.html"
        );

        return;

    }


    /* =====================================================
       COURSE
    ===================================================== */

    if (
        redirect &&
        redirect.startsWith("course-")
    ) {

        window.location.replace(
            "../student/dashboard.html"
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
   AUTH ERROR HANDLING
========================================================= */

function getAuthErrorMessage(error) {

    switch (error.code) {

        case "auth/popup-closed-by-user":

            return "The sign-in window was closed.";

        case "auth/popup-blocked":

            return "Your browser blocked the sign-in popup. Please allow popups for CWS Academy.";

        case "auth/cancelled-popup-request":

            return "Another sign-in window is already open.";

        case "auth/account-exists-with-different-credential":

            return "An account already exists using a different sign-in method.";

        case "auth/network-request-failed":

            return "A network error occurred. Please check your connection.";

        case "auth/operation-not-allowed":

            return "This sign-in provider is not enabled in Firebase.";

        case "auth/unauthorized-domain":

            return "This website domain is not authorized in Firebase Authentication.";

        case "auth/user-disabled":

            return "This account has been disabled.";

        default:

            return (
                error.message ||
                "Unable to sign in. Please try again."
            );

    }

}


/* =========================================================
   GOOGLE LOGIN
========================================================= */

const googleLoginBtn =
    document.getElementById(
        "googleLoginBtn"
    );


if (googleLoginBtn) {

    googleLoginBtn.addEventListener(
        "click",
        async () => {

            try {

                googleLoginBtn.disabled =
                    true;

                googleLoginBtn.innerHTML =
                    "Connecting to Google...";


                /* =============================================
                   GOOGLE AUTHENTICATION
                ============================================= */

                const result =
                    await signInWithPopup(
                        auth,
                        googleProvider
                    );


                const user =
                    result.user;


                console.log(
                    "Google login successful:",
                    user.uid
                );

                console.log(
                    "Google email:",
                    user.email
                );

                console.log(
                    "Google email verified:",
                    user.emailVerified
                );


                /* =============================================
                   SUCCESS
                ============================================= */

                redirectAfterSocialLogin();


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


                alert(
                    getAuthErrorMessage(error)
                );

            }

        }
    );

}


/* =========================================================
   GITHUB LOGIN
========================================================= */

const githubLoginBtn =
    document.getElementById(
        "githubLoginBtn"
    );


if (githubLoginBtn) {

    githubLoginBtn.addEventListener(
        "click",
        async () => {

            try {

                githubLoginBtn.disabled =
                    true;

                githubLoginBtn.innerHTML =
                    "Connecting to GitHub...";


                /* =============================================
                   GITHUB AUTHENTICATION
                ============================================= */

                const result =
                    await signInWithPopup(
                        auth,
                        githubProvider
                    );


                const user =
                    result.user;


                console.log(
                    "GitHub login successful:",
                    user.uid
                );

                console.log(
                    "GitHub email:",
                    user.email
                );

                console.log(
                    "GitHub email verified:",
                    user.emailVerified
                );


                /* =============================================
                   SUCCESS
                ============================================= */

                redirectAfterSocialLogin();


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


                alert(
                    getAuthErrorMessage(error)
                );

            }

        }
    );

}
