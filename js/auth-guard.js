/* =========================================================
   CWS ACADEMY
   Firebase Authentication Guard

   Protects pages that require a logged-in user.
========================================================= */

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

import {
    auth
} from "./firebase-config.js";


/* =========================================================
   CONFIGURATION
========================================================= */

const LOGIN_PAGE = "../pages/login.html";


/* =========================================================
   AUTHENTICATION GUARD
========================================================= */

onAuthStateChanged(auth, (user) => {

    /* =====================================================
       USER IS AUTHENTICATED
    ===================================================== */

    if (user) {

        console.log(
            "CWS Academy Auth Guard: User authenticated.",
            user.uid
        );

        /*
         * User is authenticated.
         *
         * Do nothing.
         *
         * The protected page is allowed to continue loading.
         */

        return;

    }


    /* =====================================================
       USER IS NOT AUTHENTICATED
    ===================================================== */

    console.log(
        "CWS Academy Auth Guard: User is not authenticated."
    );


    /* =====================================================
       SAVE CURRENT PAGE
    ===================================================== */

    const currentPath =
        window.location.pathname;

    const currentQuery =
        window.location.search;


    const returnUrl =
        currentPath +
        currentQuery;


    /* =====================================================
       BUILD LOGIN URL
    ===================================================== */

    const loginUrl =
        `${LOGIN_PAGE}?redirect=${encodeURIComponent(returnUrl)}`;


    /* =====================================================
       REDIRECT TO LOGIN
    ===================================================== */

    window.location.replace(loginUrl);

});
