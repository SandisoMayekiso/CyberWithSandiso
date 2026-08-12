/* =========================================================
   CWS ACADEMY
   Student Authentication Guard
========================================================= */

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

import {
    auth
} from "./firebase-config.js";


/* =========================================================
   CURRENT PAGE
========================================================= */

const currentPage =
    window.location.pathname.split("/").pop();


/* =========================================================
   AUTHENTICATION CHECK
========================================================= */

onAuthStateChanged(auth, (user) => {

    if (user) {

        console.log(
            "CWS Academy: Student authenticated:",
            user.uid
        );

        return;
    }


    /* =====================================================
       NOT AUTHENTICATED
    ===================================================== */

    console.log(
        "CWS Academy: Authentication required."
    );


    /*
     * Determine which student page the user
     * originally attempted to access.
     */

    let redirect = currentPage
        .replace(".html", "");


    /*
     * Send the user to the login page.
     *
     * Example:
     *
     * student/labs.html
     *
     * becomes:
     *
     * pages/login.html?redirect=labs
     */

    window.location.replace(
        `../pages/login.html?redirect=${encodeURIComponent(redirect)}`
    );

});
