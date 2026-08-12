/* =========================================================
   CWS ACADEMY
   Navigation Authentication Controller

   Handles:
   - Logged-out navigation
   - Logged-in navigation
   - Student Courses link
   - Labs link
   - Assessments link
   - Dashboard link
   - Login/Register visibility
   - Logout
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
   AUTHENTICATED PAGE PATHS
========================================================= */

const STUDENT_DASHBOARD =
    "../student/dashboard.html";

const STUDENT_COURSES =
    "../student/student-courses.html";

const STUDENT_LABS =
    "../student/labs.html";

const STUDENT_ASSESSMENTS =
    "../student/assessments.html";


/* =========================================================
   LOGIN URL
========================================================= */

function getLoginUrl(redirect = "") {

    const currentPath =
        window.location.pathname;


    /*
     * Pages inside /pages/
     */

    if (
        currentPath.includes("/pages/")
    ) {

        return redirect
            ? `login.html?redirect=${encodeURIComponent(redirect)}`
            : "login.html";

    }


    /*
     * Pages inside /student/
     */

    if (
        currentPath.includes("/student/")
    ) {

        return redirect
            ? `../pages/login.html?redirect=${encodeURIComponent(redirect)}`
            : "../pages/login.html";

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

    /*
     * Hide authenticated navigation
     */

    authOnlyNav.forEach((item) => {

        item.hidden = true;

    });


    /*
     * Hide Explore Labs
     */

    if (exploreLabsBtn) {

        exploreLabsBtn.hidden = true;

        exploreLabsBtn.style.display =
            "none";

    }


    /*
     * Show Sign In
     */

    if (loginNavBtn) {

        loginNavBtn.hidden = false;

    }


    /*
     * Show Register
     */

    if (registerNavBtn) {

        registerNavBtn.hidden = false;

    }


    /*
     * Hide student name
     */

    if (studentNavName) {

        studentNavName.hidden = true;

    }


    /*
     * Hide Logout
     */

    if (logoutNavBtn) {

        logoutNavBtn.hidden = true;

    }

}


/* =========================================================
   LOGGED-IN STATE
========================================================= */

function showLoggedInState(user) {

    /*
     * Show authenticated navigation
     */

    authOnlyNav.forEach((item) => {

        item.hidden = false;

    });


    /*
     * Show Explore Labs
     */

    if (exploreLabsBtn) {

        exploreLabsBtn.hidden = false;

        exploreLabsBtn.style.display =
            "";

    }


    /*
     * Hide Sign In
     */

    if (loginNavBtn) {

        loginNavBtn.hidden = true;

    }


    /*
     * Hide Register
     */

    if (registerNavBtn) {

        registerNavBtn.hidden = true;

    }


    /*
     * Show student name
     */

    if (studentNavName) {

        studentNavName.hidden = false;

        studentNavName.textContent =
            user.displayName ||
            user.email ||
            "Student";

    }


    /*
     * Show Logout
     */

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
         * No authenticated user
         */

        if (!user) {

            console.log(
                "CWS Academy: User is not authenticated."
            );

            showLoggedOutState();

            return;

        }


        /*
         * Refresh Firebase user information
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
         * Email/password users must verify
         * their email address.
         *
         * Social-login users are normally
         * already considered verified.
         */

        if (
            user.providerData.some(
                provider =>
                    provider.providerId ===
                    "password"
            ) &&
            !user.emailVerified
        ) {

            console.log(
                "CWS Academy: Email is not verified."
            );

            showLoggedOutState();

            return;

        }


        /*
         * Fully authenticated Academy user
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
             * Not logged in
             */

            if (!user) {

                event.preventDefault();

                window.location.href =
                    getLoginUrl("labs");

                return;

            }


            /*
             * Password account has not
             * verified email
             */

            if (
                user.providerData.some(
                    provider =>
                        provider.providerId ===
                        "password"
                ) &&
                !user.emailVerified
            ) {

                event.preventDefault();

                window.location.href =
                    getLoginUrl("labs");

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


/* =========================================================
   DEBUG: VERIFY STUDENT PAGE PATHS
========================================================= */

console.log(
    "CWS Academy student paths:",
    {
        dashboard: STUDENT_DASHBOARD,
        courses: STUDENT_COURSES,
        labs: STUDENT_LABS,
        assessments: STUDENT_ASSESSMENTS
    }
);
