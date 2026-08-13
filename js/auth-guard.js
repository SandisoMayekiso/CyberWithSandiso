/* =========================================================
   CWS ACADEMY
   AUTH GUARD
   Authentication + Logout Controller
========================================================= */

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

import {
    auth
} from "./firebase-config.js";


/* =========================================================
   STARTUP
========================================================= */

console.log("=================================");
console.log("CWS Academy auth-guard.js STARTED");
console.log("Current page:", window.location.href);
console.log("=================================");


/* =========================================================
   LOGIN REDIRECT
========================================================= */

const LOGIN_PAGE = "../auth/login.html";


/* =========================================================
   LOGOUT BUTTON
========================================================= */

const logoutBtn =
    document.getElementById("logoutBtn");


console.log(
    "Logout button:",
    logoutBtn ? "FOUND" : "NOT FOUND"
);


/* =========================================================
   LOGOUT
========================================================= */

async function handleLogout() {

    console.log(
        "CWS Academy: Logout button clicked."
    );


    if (!auth) {

        console.error(
            "CWS Academy: Firebase auth is unavailable."
        );

        return;

    }


    if (logoutBtn) {

        logoutBtn.disabled = true;

        const originalHTML =
            logoutBtn.innerHTML;

        logoutBtn.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            <span>Logging out...</span>
        `;


        try {

            await signOut(auth);


            console.log(
                "CWS Academy: Firebase sign-out successful."
            );


            /*
             * Clear any temporary client-side
             * authentication state.
             */

            sessionStorage.clear();


            /*
             * IMPORTANT:
             *
             * Do NOT clear localStorage here.
             *
             * Your visitor analytics uses localStorage
             * for visitorId.
             */


            window.location.replace(
                LOGIN_PAGE
            );


        } catch (error) {

            console.error(
                "CWS Academy: Logout failed.",
                error
            );


            console.error(
                "Firebase error code:",
                error?.code
            );


            console.error(
                "Firebase error message:",
                error?.message
            );


            logoutBtn.disabled = false;

            logoutBtn.innerHTML =
                originalHTML;


            alert(
                "Unable to log out. Please try again."
            );

        }

    }

}


/* =========================================================
   ATTACH LOGOUT EVENT
========================================================= */

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        handleLogout
    );


    console.log(
        "CWS Academy: Logout listener attached."
    );

} else {

    console.warn(
        "CWS Academy: #logoutBtn was not found on this page."
    );

}



/* =========================================================
   AUTH STATE
========================================================= */

onAuthStateChanged(
    auth,
    (user) => {

        console.log(
            "CWS Academy auth state:",
            user
                ? `Authenticated: ${user.email}`
                : "Not authenticated"
        );


        /*
         * If there is no authenticated user,
         * prevent access to student pages.
         */

        if (!user) {

            /*
             * Don't immediately redirect the login page
             * itself if auth-guard is ever reused there.
             */

            const currentPath =
                window.location.pathname;


            const isLoginPage =
                currentPath.includes(
                    "/auth/login.html"
                );


            if (!isLoginPage) {

                console.log(
                    "No authenticated user. Redirecting to login."
                );


                window.location.replace(
                    LOGIN_PAGE
                );

            }


            return;

        }


        /*
         * Update student name if the element exists.
         */

        const studentName =
            document.getElementById(
                "studentName"
            );


        if (
            studentName &&
            user.email
        ) {

            studentName.textContent =
                user.displayName ||
                user.email.split("@")[0];

        }

    },

    (error) => {

        console.error(
            "CWS Academy auth state error:",
            error
        );

    }
);
