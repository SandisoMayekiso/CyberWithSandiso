/* =========================================================
   CWS ACADEMY
   STUDENT DASHBOARD
   Firebase Authentication
========================================================= */

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

import {
    auth
} from "./firebase-config.js";


/* =========================================================
   DEBUG
========================================================= */

console.log(
    "CWS Academy dashboard.js loaded."
);


/* =========================================================
   ELEMENTS
========================================================= */

const studentName =
    document.getElementById("studentName");

const welcomeStudentName =
    document.getElementById("welcomeStudentName");

const logoutBtn =
    document.getElementById("logoutBtn");

const continueLearningContainer =
    document.getElementById(
        "continueLearningContainer"
    );


/* =========================================================
   LEARNING STAT ELEMENTS
========================================================= */

const coursesStarted =
    document.getElementById("coursesStarted");

const labsCompleted =
    document.getElementById("labsCompleted");

const assessmentsCompleted =
    document.getElementById(
        "assessmentsCompleted"
    );

const certificatesEarned =
    document.getElementById(
        "certificatesEarned"
    );


/* =========================================================
   GET USER DISPLAY NAME
========================================================= */

function getUserName(user) {

    /*
     * Firebase displayName
     */

    if (user?.displayName) {

        return user.displayName.trim();

    }


    /*
     * Fall back to the first
     * part of the email address.
     */

    if (user?.email) {

        const emailName =
            user.email
                .split("@")[0]
                .trim();

        if (emailName) {

            return emailName;

        }

    }


    return "Student";
}


/* =========================================================
   DISPLAY USER
========================================================= */

function displayUser(user) {

    const name =
        getUserName(user);


    /*
     * Navigation name
     */

    if (studentName) {

        studentName.textContent =
            name;

    }


    /*
     * Welcome hero name
     */

    if (welcomeStudentName) {

        welcomeStudentName.textContent =
            name;

    }


    console.log(
        "CWS Academy authenticated user:",
        {
            uid: user.uid,
            email: user.email,
            name
        }
    );

}


/* =========================================================
   DEFAULT LEARNING STATISTICS
========================================================= */

function setDefaultStats() {

    if (coursesStarted) {

        coursesStarted.textContent =
            "0";

    }


    if (labsCompleted) {

        labsCompleted.textContent =
            "0";

    }


    if (assessmentsCompleted) {

        assessmentsCompleted.textContent =
            "0";

    }


    if (certificatesEarned) {

        certificatesEarned.textContent =
            "0";

    }

}


/* =========================================================
   LOAD LEARNING STATISTICS
========================================================= */

function loadLearningStats(user) {

    /*
     * For now these values are initialized
     * to zero.
     *
     * Later you can replace this function
     * with Firestore data.
     */

    console.log(
        "Loading learning statistics for:",
        user.uid
    );


    setDefaultStats();

}


/* =========================================================
   CONTINUE LEARNING
========================================================= */

function setupContinueLearning() {

    if (!continueLearningContainer) {

        return;

    }


    /*
     * The HTML already contains the
     * "Start Your Learning Journey"
     * state.
     *
     * This function is intentionally
     * kept ready for Firebase/Firestore
     * course-progress integration.
     */

    console.log(
        "Continue learning section initialized."
    );

}


/* =========================================================
   LOGOUT
========================================================= */

async function logout() {

    if (!auth) {

        console.error(
            "Firebase Auth is unavailable."
        );

        return;

    }


    try {

        console.log(
            "CWS Academy: Signing out..."
        );


        /*
         * Disable button while signing out
         * to prevent multiple clicks.
         */

        if (logoutBtn) {

            logoutBtn.disabled =
                true;

            logoutBtn.style.opacity =
                "0.6";

            logoutBtn.style.cursor =
                "wait";

        }


        await signOut(auth);


        console.log(
            "CWS Academy: Logout successful."
        );


        /*
         * Return to login page.
         */

        window.location.replace(
            "../pages/login.html"
        );


    } catch (error) {

        console.error(
            "CWS Academy logout error:",
            error
        );


        /*
         * Restore logout button
         * if something went wrong.
         */

        if (logoutBtn) {

            logoutBtn.disabled =
                false;

            logoutBtn.style.opacity =
                "";

            logoutBtn.style.cursor =
                "";

        }


        alert(
            "Unable to sign out. Please try again."
        );

    }

}


/* =========================================================
   LOGOUT BUTTON
========================================================= */

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        logout
    );

}


/* =========================================================
   FIREBASE AUTH STATE
========================================================= */

onAuthStateChanged(
    auth,
    (user) => {

        console.log(
            "CWS Academy auth state:",
            user
                ? "AUTHENTICATED"
                : "NOT AUTHENTICATED"
        );


        /*
         * No authenticated user.
         *
         * Protect the dashboard by
         * sending the visitor to login.
         */

        if (!user) {

            console.warn(
                "No authenticated user."
            );


            window.location.replace(
                "../pages/login.html?redirect=dashboard"
            );


            return;

        }


        /*
         * Authenticated user.
         */

        displayUser(user);

        loadLearningStats(user);

        setupContinueLearning();

    }
);


/* =========================================================
   INITIALIZATION
========================================================= */

console.log(
    "CWS Academy dashboard.js initialization complete."
);
