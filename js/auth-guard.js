/* =========================================================
   CWS ACADEMY
   AUTH GUARD
   Authentication + Logout Controller

   Student pages:
   /student/dashboard.html
   /student/student-courses.html
   /student/labs.html
   /student/assessments.html
   /student/progress.html
   /student/certificates.html

   Login page:
   /pages/login.html
========================================================= */


/* =========================================================
   FIREBASE AUTH
========================================================= */

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";


import {
    auth
} from "./firebase-config.js";



/* =========================================================
   CONFIGURATION
========================================================= */

/*
 * All student pages are inside /student/
 *
 * Therefore:
 *
 * ../pages/login.html
 *
 * resolves to:
 *
 * /CyberWithSandiso/pages/login.html
 */

const LOGIN_PAGE = "../pages/login.html";


/* =========================================================
   DEBUG
========================================================= */

console.log(
    "========================================"
);

console.log(
    "CWS Academy Auth Guard Loaded"
);

console.log(
    "Current page:",
    window.location.pathname
);

console.log(
    "Login page:",
    LOGIN_PAGE
);

console.log(
    "========================================"
);



/* =========================================================
   DOM ELEMENTS
========================================================= */

const logoutBtn =
    document.getElementById("logoutBtn");

const studentName =
    document.getElementById("studentName");


/* =========================================================
   CHECK LOGOUT BUTTON
========================================================= */

if (logoutBtn) {

    console.log(
        "CWS Academy: Logout button FOUND."
    );

} else {

    console.warn(
        "CWS Academy: Logout button NOT FOUND."
    );

}



/* =========================================================
   DISPLAY STUDENT NAME
========================================================= */

function updateStudentName(user) {

    if (!studentName) {

        return;

    }


    if (!user) {

        studentName.textContent =
            "Student";

        return;

    }


    /*
     * Priority:
     *
     * 1. Firebase displayName
     * 2. Email username
     * 3. Student
     */

    let name =
        user.displayName;


    if (
        !name &&
        user.email
    ) {

        name =
            user.email.split("@")[0];

    }


    if (!name) {

        name =
            "Student";

    }


    studentName.textContent =
        name;

}



/* =========================================================
   LOGOUT
========================================================= */

async function handleLogout(event) {

    /*
     * Prevent the button from submitting
     * a form if it happens to be inside one.
     */

    if (event) {

        event.preventDefault();

    }


    /*
     * Prevent multiple clicks.
     */

    if (
        logoutBtn &&
        logoutBtn.disabled
    ) {

        return;

    }


    console.log(
        "CWS Academy: Logout requested."
    );


    /*
     * Disable button while Firebase
     * processes the sign-out.
     */

    if (logoutBtn) {

        logoutBtn.disabled =
            true;


        logoutBtn.dataset.originalContent =
            logoutBtn.innerHTML;


        logoutBtn.innerHTML = `

            <i class="fa-solid fa-spinner fa-spin"></i>

            <span>
                Logging out...
            </span>

        `;

    }


    try {

        /*
         * Firebase logout
         */

        await signOut(auth);


        console.log(
            "CWS Academy: Firebase sign-out successful."
        );


        /*
         * Clear temporary session data.
         *
         * DO NOT use localStorage.clear()
         * because other CWS functionality may
         * use localStorage.
         */

        try {

            sessionStorage.clear();

        } catch (storageError) {

            console.warn(
                "Session storage could not be cleared:",
                storageError
            );

        }


        /*
         * Redirect to the actual login page.
         *
         * Because all student pages are inside
         * /student/, this resolves correctly.
         */

        window.location.replace(
            LOGIN_PAGE
        );


    } catch (error) {

        console.error(
            "CWS Academy: Firebase logout failed.",
            error
        );


        console.error(
            "Error code:",
            error?.code
        );


        console.error(
            "Error message:",
            error?.message
        );


        /*
         * Restore button.
         */

        if (logoutBtn) {

            logoutBtn.disabled =
                false;


            logoutBtn.innerHTML =
                logoutBtn.dataset.originalContent ||
                `
                    <i class="fa-solid fa-right-from-bracket"></i>
                    <span>Logout</span>
                `;

        }


        /*
         * Inform the student.
         */

        alert(
            "Logout failed. Please try again."
        );

    }

}



/* =========================================================
   ATTACH LOGOUT LISTENER
========================================================= */

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        handleLogout
    );

}



/* =========================================================
   AUTHENTICATION STATE
========================================================= */

onAuthStateChanged(
    auth,

    (user) => {

        console.log(
            "CWS Academy Auth State:",
            user
                ? `SIGNED IN — ${user.email}`
                : "SIGNED OUT"
        );


        /*
         * -------------------------------------------------
         * USER IS NOT AUTHENTICATED
         * -------------------------------------------------
         */

        if (!user) {

            updateStudentName(null);


            /*
             * Check whether we're already
             * on the login page.
             */

            const currentPath =
                window.location.pathname;


            const isLoginPage =
                currentPath.includes(
                    "/pages/login.html"
                );


            /*
             * Only redirect if we're NOT
             * already on login.html.
             */

            if (!isLoginPage) {

                console.log(
                    "CWS Academy: No authenticated user."
                );


                console.log(
                    "Redirecting to:",
                    LOGIN_PAGE
                );


                window.location.replace(
                    LOGIN_PAGE
                );

            }


            return;

        }



        /*
         * -------------------------------------------------
         * USER IS AUTHENTICATED
         * -------------------------------------------------
         */

        console.log(
            "CWS Academy: Student authenticated."
        );


        updateStudentName(user);

    },

    (error) => {

        console.error(
            "CWS Academy: Authentication state error.",
            error
        );

    }

);
