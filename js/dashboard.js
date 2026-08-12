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

const studentNavName =
    document.getElementById("studentNavName");

const studentEmail =
    document.getElementById("studentEmail");

const dashboardMessage =
    document.getElementById("dashboardMessage");

const logoutBtn =
    document.getElementById("logoutBtn");

const logoutDashboardBtn =
    document.getElementById("logoutDashboardBtn");


/* =========================================================
   SHOW MESSAGE
========================================================= */

function showMessage(message) {

    if (!dashboardMessage) {
        console.log(message);
        return;
    }

    dashboardMessage.textContent =
        message;

    dashboardMessage.hidden =
        false;
}


/* =========================================================
   HIDE MESSAGE
========================================================= */

function hideMessage() {

    if (!dashboardMessage) {
        return;
    }

    dashboardMessage.hidden =
        true;
}


/* =========================================================
   GET USER DISPLAY NAME
========================================================= */

function getUserName(user) {

    if (user.displayName) {

        return user.displayName;

    }


    if (user.email) {

        return user.email.split("@")[0];

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


    if (studentNavName) {

        studentNavName.textContent =
            name;

    }


    if (studentEmail) {

        studentEmail.textContent =
            user.email ||
            "No email address available.";

    }


    hideMessage();


    console.log(
        "CWS Academy authenticated user:",
        user.uid
    );

}


/* =========================================================
   LOGOUT
========================================================= */

async function logout() {

    try {

        console.log(
            "CWS Academy: Signing out..."
        );


        await signOut(auth);


        /*
         * Always return the user to the
         * public login page after logout.
         */

        window.location.replace(
            "../pages/login.html"
        );


    } catch (error) {

        console.error(
            "CWS Academy logout error:",
            error
        );


        showMessage(
            "Unable to sign out. Please try again."
        );

    }

}


/* =========================================================
   LOGOUT BUTTONS
========================================================= */

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        logout
    );

}


if (logoutDashboardBtn) {

    logoutDashboardBtn.addEventListener(
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
         * No Firebase user:
         * protect dashboard.
         */

        if (!user) {

            console.warn(
                "No authenticated user. Redirecting to login."
            );


            window.location.replace(
                "../pages/login.html?redirect=dashboard"
            );


            return;

        }


        /*
         * User is authenticated.
         */

        displayUser(user);

    }
);


/* =========================================================
   INITIALIZATION
========================================================= */

console.log(
    "CWS Academy dashboard.js initialization complete."
);
