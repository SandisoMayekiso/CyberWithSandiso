
/* =========================================================
   CWS ACADEMY
   Firebase Configuration
   Firebase Authentication
   Cloud Firestore
   Firebase Analytics
========================================================= */


/* =========================================================
   FIREBASE APP
========================================================= */

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";


/* =========================================================
   FIREBASE AUTHENTICATION
========================================================= */

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";


/* =========================================================
   FIRESTORE DATABASE
========================================================= */

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";


/* =========================================================
   FIREBASE ANALYTICS
========================================================= */

import {
    getAnalytics
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-analytics.js";


/* =========================================================
   FIREBASE CONFIGURATION
========================================================= */

const firebaseConfig = {

    apiKey:
        "AIzaSyDy_s bqkvZwM1UK8DmZzd3u5Na6NpMUCok",

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
   INITIALIZE FIREBASE
========================================================= */

const app =
    initializeApp(firebaseConfig);


/* =========================================================
   INITIALIZE FIREBASE SERVICES
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

