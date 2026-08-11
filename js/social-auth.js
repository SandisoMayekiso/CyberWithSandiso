/* =========================================================
   CWS ACADEMY
   Social Authentication
   Google + GitHub
========================================================= */

import {
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup
} from
    "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

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
   GOOGLE LOGIN
========================================================= */

const googleLoginBtn =
    document.getElementById("googleLoginBtn");


if (googleLoginBtn) {

    googleLoginBtn.addEventListener("click", async () => {

        try {

            googleLoginBtn.disabled = true;

            googleLoginBtn.innerHTML =
                "Connecting to Google...";


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


            window.location.href =
                "../student/dashboard.html";


        } catch (error) {

            console.error(
                "Google authentication error:",
                error
            );


            googleLoginBtn.disabled = false;

            googleLoginBtn.innerHTML =
                '<span class="social-icon">G</span>' +
                '<span>Continue with Google</span>';


            alert(
                getAuthErrorMessage(error)
            );

        }

    });

}


/* =========================================================
   GITHUB LOGIN
========================================================= */

const githubLoginBtn =
    document.getElementById("githubLoginBtn");


if (githubLoginBtn) {

    githubLoginBtn.addEventListener("click", async () => {

        try {

            githubLoginBtn.disabled = true;

            githubLoginBtn.innerHTML =
                "Connecting to GitHub...";


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


            window.location.href =
                "../student/dashboard.html";


        } catch (error) {

            console.error(
                "GitHub authentication error:",
                error
            );


            githubLoginBtn.disabled = false;

            githubLoginBtn.innerHTML =
                '<span class="social-icon">' +
                '<i class="fab fa-github"></i>' +
                '</span>' +
                '<span>Continue with GitHub</span>';


            alert(
                getAuthErrorMessage(error)
            );

        }

    });

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

        case "auth/account-exists-with-different-credential":

            return "An account already exists using a different sign-in method.";

        case "auth/network-request-failed":

            return "A network error occurred. Please check your connection.";

        default:

            return "Unable to sign in. Please try again.";

    }

}