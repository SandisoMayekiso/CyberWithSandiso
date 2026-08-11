
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
   CLOUD FIRESTORE
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
   INITIALIZE FIREBASE
========================================================= */

const app =
    initializeApp(firebaseConfig);


/* =========================================================
   FIREBASE AUTH
========================================================= */

export const auth =
    getAuth(app);


/* =========================================================
   CLOUD FIRESTORE
========================================================= */

export const db =
    getFirestore(app);


/* =========================================================
   FIREBASE ANALYTICS
========================================================= */

let analytics = null;

try {

    analytics =
        getAnalytics(app);

} catch (error) {

    console.warn(
        "CWS Academy: Firebase Analytics could not be initialized.",
        error
    );

}

export {
    analytics
};


/* =========================================================
   INITIALIZATION STATUS
========================================================= */

console.log(
    "CWS Academy Firebase initialized successfully."
);

console.log(
    "Firebase project:",
    firebaseConfig.projectId
);

