/* =========================================================
   CWS ACADEMY
   Navigation Authentication Controller
========================================================= */

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

import {
    auth
} from "./firebase-config.js";


/* =========================================================
   ELEMENTS
========================================================= */

const authOnlyNav =
    document.querySelectorAll(".auth-only-nav");

const loginNavBtn =
    document.getElementById("loginNavBtn");

const registerNavBtn =
    document.getElementById("registerNavBtn");

const studentNavName =
    document.getElementById("studentNavName");

const logoutNavBtn =
    document.getElementById("logoutNavBtn");

const exploreLabsBtn =
    document.getElementById("exploreLabsBtn");


/* =========================================================
   LOGGED-OUT STATE
========================================================= */

function showLoggedOutState() {

    /* Hide authenticated navigation */

    authOnlyNav.forEach((item) => {
        item.hidden = true;
    });


    /* Hide Explore Labs */

    if (exploreLabsBtn) {
        exploreLabsBtn.hidden = true;
        exploreLabsBtn.style.display = "none";
    }


    /* Show Sign In */

    if (loginNavBtn) {
        loginNavBtn.hidden = false;
    }


    /* Show Sign Up */

    if (registerNavBtn) {
        registerNavBtn.hidden = false;
    }


    /* Hide student name */

    if (studentNavName) {
        studentNavName.hidden = true;
    }


    /* Hide Logout */

    if (logoutNavBtn) {
        logoutNavBtn.hidden = true;
    }

}


/* =========================================================
   LOGGED-IN STATE
========================================================= */

function showLoggedInState(user) {

    /* Show authenticated navigation */

    authOnlyNav.forEach((item) => {
        item.hidden = false;
    });


    /* Show Explore Labs */

    if (exploreLabsBtn) {
        exploreLabsBtn.hidden = false;
        exploreLabsBtn.style.display = "";
    }


    /* Hide Sign In */

    if (loginNavBtn) {
        loginNavBtn.hidden = true;
    }


    /* Hide Sign Up */

    if (registerNavBtn) {
        registerNavBtn.hidden = true;
    }


    /* Show student name */

    if (studentNavName) {

        studentNavName.hidden = false;

        studentNavName.textContent =
            user.displayName ||
            user.email ||
            "Student";
    }


    /* Show Logout */

    if (logoutNavBtn) {
        logoutNavBtn.hidden = false;
    }

}


/* =========================================================
   DEFAULT STATE
========================================================= */

showLoggedOutState();


/* =========================================================
   FIREBASE AUTH STATE
========================================================= */

onAuthStateChanged(auth, (user) => {

    if (user) {

        console.log(
            "CWS Academy: User authenticated."
        );

        showLoggedInState(user);

    } else {

        console.log(
            "CWS Academy: User is not authenticated."
        );

        showLoggedOutState();

    }

});


/* =========================================================
   EXPLORE LABS CLICK GUARD
========================================================= */

if (exploreLabsBtn) {

    exploreLabsBtn.addEventListener(
        "click",
        (event) => {

            /*
             * Firebase's current user is the final check.
             */

            if (!auth.currentUser) {

                event.preventDefault();

                window.location.href =
                    "pages/login.html?redirect=labs";

            }

        }
    );

}


/* =========================================================
   LOGOUT
========================================================= */

if (logoutNavBtn) {

    logoutNavBtn.addEventListener(
        "click",
        async () => {

            try {

                await signOut(auth);

                console.log(
                    "CWS Academy: User signed out."
                );

                /*
                 * onAuthStateChanged() will automatically
                 * hide authenticated elements.
                 */

            } catch (error) {

                console.error(
                    "CWS Academy logout failed:",
                    error
                );

            }

        }
    );

}