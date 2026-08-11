
/* =========================================================
   CWS ACADEMY
   Login Controller
   Firebase Email / Google / GitHub Authentication
   ========================================================= */

import {
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider
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
   FIREBASE PROVIDERS
   ========================================================= */

const googleProvider =
    new GoogleAuthProvider();

const githubProvider =
    new GithubAuthProvider();


/*
 * Ask Google for basic profile information.
 */
googleProvider.addScope("profile");
googleProvider.addScope("email");


/*
 * Ask GitHub for email information.
 */
githubProvider.addScope("user:email");


/* =========================================================
   MESSAGE
   ========================================================= */

function showLoginMessage(
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

    loginMessage.hidden = false;
}


/* =========================================================
   RESET LOGIN BUTTON
   ========================================================= */

function resetLoginButton() {

    if (!loginButton) {
        return;
    }

    loginButton.disabled = false;

    loginButton.textContent =
        "Sign In";
}


/* =========================================================
   GET REDIRECT DESTINATION
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

    if (redirect === "assessments") {

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
   FIND SOCIAL LOGIN BUTTONS
   ========================================================= */

/*
 * These selectors support several common button IDs.
 *
 * If your HTML uses one of these:
 *
 *   id="googleLoginBtn"
 *   id="googleBtn"
 *   id="googleSignInBtn"
 *
 * it will work automatically.
 */

const googleButton =
    document.getElementById("googleLoginBtn") ||
    document.getElementById("googleBtn") ||
    document.getElementById("googleSignInBtn") ||
    document.querySelector(
        '[data-provider="google"]'
    );


const githubButton =
    document.getElementById("githubLoginBtn") ||
    document.getElementById("githubBtn") ||
    document.getElementById("githubSignInBtn") ||
    document.querySelector(
        '[data-provider="github"]'
    );


console.log(
    "Google button:",
    googleButton
        ? "found"
        : "not found"
);

console.log(
    "GitHub button:",
    githubButton
        ? "found"
        : "not found"
);


/* =========================================================
   DISABLE SOCIAL BUTTON
   ========================================================= */

function setSocialButtonLoading(
    button,
    loadingText
) {

    if (!button) {
        return;
    }

    button.disabled = true;

    button.dataset.originalText =
        button.textContent;

    button.textContent =
        loadingText;
}


/* =========================================================
   RESTORE SOCIAL BUTTON
   ========================================================= */

function resetSocialButton(button) {

    if (!button) {
        return;
    }

    button.disabled = false;

    if (button.dataset.originalText) {

        button.textContent =
            button.dataset.originalText;
    }
}


/* =========================================================
   FIREBASE ERROR MESSAGE
   ========================================================= */

function getFirebaseErrorMessage(error) {

    switch (error.code) {

        /* Email/password */

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


        /* OAuth */

        case "auth/popup-closed-by-user":

            return (
                "The sign-in window was closed before authentication completed."
            );


        case "auth/popup-blocked":

            return (
                "Your browser blocked the sign-in popup. Please allow popups for this site and try again."
            );


        case "auth/cancelled-popup-request":

            return (
                "Another sign-in popup is already open."
            );


        case "auth/operation-not-allowed":

            return (
                "This sign-in method is not enabled in Firebase Authentication."
            );


        case "auth/unauthorized-domain":

            return (
                "This website is not authorized in Firebase. Add your domain under Firebase Authentication → Settings → Authorized domains."
            );


        case "auth/account-exists-with-different-credential":

            return (
                "An account already exists with this email using a different sign-in method."
            );


        case "auth/credential-already-in-use":

            return (
                "This sign-in account is already linked to another account."
            );


        case "auth/provider-already-linked":

            return (
                "This sign-in provider is already linked to your account."
            );


        default:

            return (
                "Unable to sign in. Please try again."
            );
    }
}


/* =========================================================
   EMAIL / PASSWORD LOGIN
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
                    .toLowerCase() || "";


            const password =
                passwordInput?.value || "";


            /* -------------------------------------------------
               VALIDATION
               ------------------------------------------------- */

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


            /* -------------------------------------------------
               BUTTON
               ------------------------------------------------- */

            if (loginButton) {

                loginButton.disabled = true;

                loginButton.textContent =
                    "Signing In...";
            }


            try {

                console.log(
                    "Attempting Firebase email/password login..."
                );


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


                /* -------------------------------------------------
                   EMAIL VERIFICATION
                   ------------------------------------------------- */

                if (!user.emailVerified) {

                    showLoginMessage(
                        "Please verify your email address before signing in.",
                        "error"
                    );

                    resetLoginButton();

                    return;
                }


                /* -------------------------------------------------
                   SUCCESS
                   ------------------------------------------------- */

                showLoginMessage(
                    "Login successful. Redirecting...",
                    "success"
                );


                redirectAfterLogin();

            } catch (error) {

                console.error(
                    "CWS Academy email login error:",
                    error
                );


                showLoginMessage(
                    getFirebaseErrorMessage(error),
                    "error"
                );


                resetLoginButton();
            }
        }
    );
}


/* =========================================================
   GOOGLE LOGIN
   ========================================================= */

async function loginWithGoogle() {

    if (!googleButton) {

        console.error(
            "CWS Academy: Google login button was not found."
        );

        return;
    }


    setSocialButtonLoading(
        googleButton,
        "Signing in with Google..."
    );


    try {

        console.log(
            "Attempting Firebase Google login..."
        );


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


        /*
         * Google accounts are normally already verified.
         */

        showLoginMessage(
            "Google sign-in successful. Redirecting...",
            "success"
        );


        redirectAfterLogin();

    } catch (error) {

        console.error(
            "CWS Academy Google login error:",
            error
        );


        showLoginMessage(
            getFirebaseErrorMessage(error),
            "error"
        );


        resetSocialButton(
            googleButton
        );
    }
}


/* =========================================================
   GITHUB LOGIN
   ========================================================= */

async function loginWithGithub() {

    if (!githubButton) {

        console.error(
            "CWS Academy: GitHub login button was not found."
        );

        return;
    }


    setSocialButtonLoading(
        githubButton,
        "Signing in with GitHub..."
    );


    try {

        console.log(
            "Attempting Firebase GitHub login..."
        );


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


        showLoginMessage(
            "GitHub sign-in successful. Redirecting...",
            "success"
        );


        redirectAfterLogin();

    } catch (error) {

        console.error(
            "CWS Academy GitHub login error:",
            error
        );


        showLoginMessage(
            getFirebaseErrorMessage(error),
            "error"
        );


        resetSocialButton(
            githubButton
        );
    }
}


/* =========================================================
   GOOGLE BUTTON
   ========================================================= */

if (googleButton) {

    googleButton.addEventListener(
        "click",
        async (event) => {

            event.preventDefault();

            await loginWithGoogle();

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
        async (event) => {

            event.preventDefault();

            await loginWithGithub();

        }
    );

} else {

    console.warn(
        "CWS Academy: GitHub login button not found."
    );
}
