/* =========================================================
   CWS ACADEMY
   STUDENT DASHBOARD
   Firebase Authentication + Dashboard State
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

const DEBUG = true;

function log(...messages) {

    if (DEBUG) {
        console.log("[CWS Dashboard]", ...messages);
    }

}

function warn(...messages) {

    if (DEBUG) {
        console.warn("[CWS Dashboard]", ...messages);
    }

}

function error(...messages) {

    console.error("[CWS Dashboard]", ...messages);

}


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
   DASHBOARD STATE
========================================================= */

let currentUser = null;

let dashboardInitialized = false;


/* =========================================================
   DEFAULT DASHBOARD DATA
========================================================= */

const defaultLearningStats = {

    coursesStarted: 0,

    labsCompleted: 0,

    assessmentsCompleted: 0,

    certificatesEarned: 0

};


/* =========================================================
   GET USER DISPLAY NAME
========================================================= */

function getUserName(user) {

    if (!user) {

        return "Student";

    }


    /*
     * Firebase displayName
     */

    if (
        typeof user.displayName === "string" &&
        user.displayName.trim()
    ) {

        return user.displayName.trim();

    }


    /*
     * Fall back to email username.
     */

    if (
        typeof user.email === "string" &&
        user.email.includes("@")
    ) {

        const emailName =
            user.email
                .split("@")[0]
                .trim();

        if (emailName) {

            /*
             * Convert common formats such as:
             *
             * john.doe
             * john_doe
             * john-doe
             *
             * into:
             *
             * John Doe
             */

            return emailName
                .replace(/[._-]+/g, " ")
                .replace(/\s+/g, " ")
                .trim()
                .split(" ")
                .map(
                    word =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1)
                )
                .join(" ");

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


    log(
        "Authenticated user:",
        {
            uid: user.uid,
            email: user.email,
            name
        }
    );

}


/* =========================================================
   UPDATE LEARNING STATISTICS
========================================================= */

function updateLearningStats(stats) {

    const data = {
        ...defaultLearningStats,
        ...stats
    };


    if (coursesStarted) {

        coursesStarted.textContent =
            String(data.coursesStarted);

    }


    if (labsCompleted) {

        labsCompleted.textContent =
            String(data.labsCompleted);

    }


    if (assessmentsCompleted) {

        assessmentsCompleted.textContent =
            String(data.assessmentsCompleted);

    }


    if (certificatesEarned) {

        certificatesEarned.textContent =
            String(data.certificatesEarned);

    }

}


/* =========================================================
   LOAD LEARNING STATISTICS
========================================================= */

async function loadLearningStats(user) {

    if (!user) {

        updateLearningStats(
            defaultLearningStats
        );

        return;

    }


    log(
        "Loading learning statistics for:",
        user.uid
    );


    /*
     * -------------------------------------------------------
     * CURRENT VERSION
     * -------------------------------------------------------
     *
     * Firebase Authentication is working,
     * but learning statistics have not yet
     * been connected to Firestore.
     *
     * Therefore the dashboard starts at zero.
     *
     * Later this function can become:
     *
     * async function loadLearningStats(user) {
     *
     *     const snapshot = await getDoc(
     *         doc(db, "students", user.uid)
     *     );
     *
     *     ...
     *
     * }
     */

    updateLearningStats(
        defaultLearningStats
    );

}


/* =========================================================
   CONTINUE LEARNING
========================================================= */

function setupContinueLearning(user) {

    if (!continueLearningContainer) {

        return;

    }


    /*
     * -------------------------------------------------------
     * CURRENT STATE
     * -------------------------------------------------------
     *
     * The HTML displays:
     *
     * "Start Your Learning Journey"
     *
     * until actual course progress exists.
     *
     * This keeps the dashboard ready for
     * Firestore integration later.
     */

    continueLearningContainer.dataset.userId =
        user?.uid || "";


    log(
        "Continue learning initialized."
    );

}


/* =========================================================
   LOGOUT BUTTON STATE
========================================================= */

function setLogoutLoading(isLoading) {

    if (!logoutBtn) {

        return;

    }


    logoutBtn.disabled =
        isLoading;


    logoutBtn.classList.toggle(
        "is-loading",
        isLoading
    );


    if (isLoading) {

        logoutBtn.setAttribute(
            "aria-busy",
            "true"
        );

    } else {

        logoutBtn.removeAttribute(
            "aria-busy"
        );

    }

}


/* =========================================================
   LOGOUT
========================================================= */

async function logout() {

    if (!auth) {

        error(
            "Firebase Auth is unavailable."
        );

        return;

    }


    try {

        log(
            "Signing out..."
        );


        setLogoutLoading(true);


        await signOut(auth);


        log(
            "Logout successful."
        );


        /*
         * Firebase onAuthStateChanged()
         * will also detect the signed-out state.
         *
         * We redirect here immediately.
         */

        window.location.replace(
            "../pages/login.html"
        );


    } catch (err) {

        error(
            "Logout failed:",
            err
        );


        setLogoutLoading(false);


        alert(
            "Unable to sign out. Please try again."
        );

    }

}


/* =========================================================
   LOGOUT BUTTON EVENT
========================================================= */

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        logout
    );

}


/* =========================================================
   AUTHENTICATION STATE
========================================================= */

if (!auth) {

    error(
        "Firebase Auth was not initialized."
    );


    window.location.replace(
        "../pages/login.html"
    );

} else {

    onAuthStateChanged(
        auth,
        async (user) => {

            log(
                "Authentication state:",
                user
                    ? "AUTHENTICATED"
                    : "NOT AUTHENTICATED"
            );


            /*
             * ------------------------------------------------
             * USER NOT AUTHENTICATED
             * ------------------------------------------------
             */

            if (!user) {

                currentUser = null;

                warn(
                    "No authenticated user. Redirecting to login."
                );


                window.location.replace(
                    "../pages/login.html?redirect=dashboard"
                );


                return;

            }


            /*
             * ------------------------------------------------
             * USER AUTHENTICATED
             * ------------------------------------------------
             */

            currentUser =
                user;


            /*
             * Prevent unnecessary duplicate
             * initialization.
             */

            if (dashboardInitialized) {

                return;

            }


            dashboardInitialized =
                true;


            /*
             * Display authenticated student.
             */

            displayUser(user);


            /*
             * Load dashboard statistics.
             */

            await loadLearningStats(
                user
            );


            /*
             * Initialize continue-learning section.
             */

            setupContinueLearning(
                user
            );


            log(
                "Dashboard initialized successfully."
            );

        }
    );

}


/* =========================================================
   INITIALIZATION
========================================================= */

log(
    "dashboard.js loaded."
);
