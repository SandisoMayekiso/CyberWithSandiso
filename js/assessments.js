/* =========================================================
   CWS ACADEMY
   STUDENT ASSESSMENTS
   Firebase Authentication + Statistics
========================================================= */

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

import {
    auth,
    db
} from "./firebase-config.js";


/* =========================================================
   DEBUG
========================================================= */

console.log(
    "CWS Academy student-assessments.js loaded."
);


/* =========================================================
   ELEMENTS
========================================================= */

const studentName =
    document.getElementById("studentName");

const logoutBtn =
    document.getElementById("logoutBtn");

const assessmentsCompleted =
    document.getElementById(
        "assessmentsCompleted"
    );

const quizzesCompleted =
    document.getElementById(
        "quizzesCompleted"
    );

const averageScore =
    document.getElementById(
        "averageScore"
    );

const highestScore =
    document.getElementById(
        "highestScore"
    );

const recentAssessments =
    document.getElementById(
        "recentAssessments"
    );

const noRecentAssessments =
    document.getElementById(
        "noRecentAssessments"
    );


/* =========================================================
   USER NAME
========================================================= */

function getUserName(user) {

    if (user?.displayName) {

        return user.displayName.trim();

    }


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


    if (studentName) {

        studentName.textContent =
            name;

    }


    console.log(
        "Assessment page user:",
        {
            uid: user.uid,
            email: user.email,
            name
        }
    );

}


/* =========================================================
   DEFAULT STATISTICS
========================================================= */

function setDefaultStats() {

    if (assessmentsCompleted) {

        assessmentsCompleted.textContent =
            "0";

    }


    if (quizzesCompleted) {

        quizzesCompleted.textContent =
            "0";

    }


    if (averageScore) {

        averageScore.textContent =
            "—";

    }


    if (highestScore) {

        highestScore.textContent =
            "—";

    }

}


/* =========================================================
   LOAD ASSESSMENT DATA
========================================================= */

async function loadAssessmentData(user) {

    setDefaultStats();


    console.log(
        "Loading assessment data for:",
        user.uid
    );


    /*
     * This is ready for Firestore integration.
     *
     * Example future structure:
     *
     * students/{uid}
     *
     * {
     *     assessmentStats: {
     *         completed: 5,
     *         quizzesCompleted: 4,
     *         averageScore: 82,
     *         highestScore: 95
     *     }
     * }
     */


    try {

        if (!db) {

            console.warn(
                "Firestore database is unavailable."
            );

            return;

        }


        const studentRef =
            doc(
                db,
                "students",
                user.uid
            );


        const studentSnapshot =
            await getDoc(studentRef);


        if (!studentSnapshot.exists()) {

            console.log(
                "No student assessment data found yet."
            );

            return;

        }


        const studentData =
            studentSnapshot.data();


        const stats =
            studentData.assessmentStats;


        if (!stats) {

            return;

        }


        if (assessmentsCompleted) {

            assessmentsCompleted.textContent =
                stats.completed ?? 0;

        }


        if (quizzesCompleted) {

            quizzesCompleted.textContent =
                stats.quizzesCompleted ?? 0;

        }


        if (averageScore) {

            averageScore.textContent =
                stats.averageScore != null
                    ? `${stats.averageScore}%`
                    : "—";

        }


        if (highestScore) {

            highestScore.textContent =
                stats.highestScore != null
                    ? `${stats.highestScore}%`
                    : "—";

        }

    } catch (error) {

        console.error(
            "Unable to load assessment data:",
            error
        );

    }

}


/* =========================================================
   RECENT ASSESSMENTS
========================================================= */

function setupRecentAssessments() {

    /*
     * Until Firestore assessment history
     * is implemented, keep the empty state.
     */

    if (!recentAssessments) {

        return;

    }


    if (noRecentAssessments) {

        noRecentAssessments.hidden =
            false;

    }


    console.log(
        "Recent assessments initialized."
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
            "CWS Academy logout successful."
        );


        window.location.replace(
            "../pages/login.html"
        );

    } catch (error) {

        console.error(
            "Logout error:",
            error
        );


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
    async user => {

        console.log(
            "CWS Academy assessment auth state:",
            user
                ? "AUTHENTICATED"
                : "NOT AUTHENTICATED"
        );


        if (!user) {

            window.location.replace(
                "../pages/login.html?redirect=assessments"
            );

            return;

        }


        displayUser(user);

        await loadAssessmentData(user);

        setupRecentAssessments();

    }
);


/* =========================================================
   INITIALIZATION
========================================================= */

console.log(
    "CWS Academy assessments initialization complete."
);
