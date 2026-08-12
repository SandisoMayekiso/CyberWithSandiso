/* =========================================================
   CWS ACADEMY
   Navigation Authentication Controller
========================================================= */

import {
    onAuthStateChanged,
    signOut
} from
    "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

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
   LOGIN URL
========================================================= */

function getLoginUrl(redirect = "") {

    const currentPath =
        window.location.pathname;

    /*
     * Pages directly under /pages/
     */

    if (
        currentPath.includes("/pages/")
    ) {

        return redirect
            ? `login.html?redirect=${encodeURIComponent(redirect)}`
            : "login.html";

    }


    /*
     * Root index.html
     */

    return redirect
        ? `pages/login.html?redirect=${encodeURIComponent(redirect)}`
        : "pages/login.html";

}


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

        exploreLabsBtn.style.display =
            "none";

    }


    /* Show Sign In */

    if (loginNavBtn) {

        loginNavBtn.hidden = false;

    }


    /* Show Register */

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

        exploreLabsBtn.style.display =
            "";

    }


    /* Hide Sign In */

    if (loginNavBtn) {

        loginNavBtn.hidden = true;

    }


    /* Hide Register */

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

onAuthStateChanged(
    auth,
    async (user) => {

        /*
         * No Firebase user
         */

        if (!user) {

            console.log(
                "CWS Academy: User is not authenticated."
            );

            showLoggedOutState();

            return;

        }


        /*
         * Refresh user information.
         *
         * This ensures emailVerified is current if
         * the user verified their email in another tab.
         */

        try {

            await user.reload();

        } catch (error) {

            console.error(
                "CWS Academy: Unable to refresh user:",
                error
            );

        }


        /*
         * Email/password users must verify their email.
         *
         * Google/GitHub users can continue normally.
         */

        if (!user.emailVerified) {

            console.log(
                "CWS Academy: User email is not verified."
            );

            showLoggedOutState();

            return;

        }


        /*
         * Fully authenticated Academy user.
         */

        console.log(
            "CWS Academy: User authenticated:",
            user.uid
        );

        showLoggedInState(user);

    }
);


/* =========================================================
   EXPLORE LABS CLICK GUARD
========================================================= */

if (exploreLabsBtn) {

    exploreLabsBtn.addEventListener(
        "click",
        (event) => {

            const user =
                auth.currentUser;


            /*
             * No authenticated user
             */

            if (!user) {

                event.preventDefault();

                window.location.href =
                    getLoginUrl("labs");

                return;

            }


            /*
             * Email/password account has not
             * verified its email.
             */

            if (!user.emailVerified) {

                event.preventDefault();

                window.location.href =
                    getLoginUrl("labs");

                return;

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
                 * Firebase automatically triggers
                 * onAuthStateChanged().
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
