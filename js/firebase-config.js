/* =========================================================
   CWS ACADEMY
   Firebase Configuration
   Firebase Authentication
   Cloud Firestore
   Firebase Analytics
========================================================= */

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

import {
    getAnalytics
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-analytics.js";


/* =========================================================
   FIREBASE CONFIGURATION
========================================================= */

const firebaseConfig = {

    apiKey:
        "AIzaSyDy_sbqkvZwM1UK8DmZzd3u5Na6NpMUCok",

    authDomain:
        "cyberwithsandiso2.firebaseapp.com",

    projectId:
        "cyberwithsandiso2",

    storageBucket:
        "cyberwithsandiso2.firebasestorage.app",

    messagingSenderId:
        "692743895911",

    appId:
        "1:692743895911:web:754104ab9ff851f8820dc2",

    measurementId:
        "G-EY5MM4K1Y9"

};


/* =========================================================
   INITIALIZE FIREBASE APP
========================================================= */

const app =
    initializeApp(firebaseConfig);


/* =========================================================
   FIREBASE SERVICES
========================================================= */

export const auth =
    getAuth(app);

export const db =
    getFirestore(app);


/* =========================================================
   FIREBASE ANALYTICS
========================================================= */

export const analytics =
    getAnalytics(app);


/* =========================================================
   DEBUG INFORMATION
========================================================= */

console.log(
    "CWS Academy Firebase initialized:",
    app.options.projectId
);
