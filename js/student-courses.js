/* =========================================================
   CWS ACADEMY
   STUDENT COURSES
   Firebase Authentication + Course Filters
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

        console.log(
            "[CWS Courses]",
            ...messages
        );

    }

}


function warn(...messages) {

    if (DEBUG) {

        console.warn(
            "[CWS Courses]",
            ...messages
        );

    }

}


function error(...messages) {

    console.error(
        "[CWS Courses]",
        ...messages
    );

}


/* =========================================================
   ELEMENTS
========================================================= */

const filterButtons =
    document.querySelectorAll(
        ".course-filter"
    );


const courseCards =
    document.querySelectorAll(
        ".student-course-card"
    );


const noCoursesMessage =
    document.getElementById(
        "noCoursesMessage"
    );


const studentName =
    document.getElementById(
        "studentName"
    );


const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );


/* =========================================================
   STATE
========================================================= */

let currentUser = null;

let coursesInitialized = false;


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
     * Email fallback.
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

            return emailName
                .replace(
                    /[._-]+/g,
                    " "
                )
                .replace(
                    /\s+/g,
                    " "
                )
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
   DISPLAY STUDENT
========================================================= */

function displayStudent(user) {

    const name =
        getUserName(user);


    if (studentName) {

        studentName.textContent =
            name;

    }


    log(
        "Student:",
        {
            uid: user.uid,
            email: user.email,
            name
        }
    );

}


/* =========================================================
   FILTER COURSES
========================================================= */

function filterCourses(
    selectedFilter
) {

    let visibleCourses = 0;


    courseCards.forEach(
        (card) => {

            const courseLevel =
                card.dataset.level;


            const shouldShow =
                selectedFilter === "all" ||
                courseLevel === selectedFilter;


            if (shouldShow) {

                card.hidden = false;

                visibleCourses++;

            } else {

                card.hidden = true;

            }

        }
    );


    /*
     * Empty state.
     */

    if (noCoursesMessage) {

        noCoursesMessage.hidden =
            visibleCourses > 0;

    }


    log(
        "Course filter:",
        selectedFilter,
        "Visible:",
        visibleCourses
    );

}


/* =========================================================
   SET ACTIVE FILTER
========================================================= */

function setActiveFilter(
    selectedFilter
) {

    filterButtons.forEach(
        (button) => {

            const isActive =
                button.dataset.filter ===
                selectedFilter;


            button.classList.toggle(
                "active",
                isActive
            );


            button.setAttribute(
                "aria-pressed",
                String(isActive)
            );

        }
    );

}


/* =========================================================
   FILTER BUTTON EVENTS
========================================================= */

filterButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                const selectedFilter =
                    button.dataset.filter ||
                    "all";


                setActiveFilter(
                    selectedFilter
                );


                filterCourses(
                    selectedFilter
                );

            }
        );

    }
);


/* =========================================================
   LOGOUT BUTTON STATE
========================================================= */

function setLogoutLoading(
    isLoading
) {

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


        setLogoutLoading(
            true
        );


        await signOut(auth);


        log(
            "Logout successful."
        );


        /*
         * Same destination used
         * by the dashboard.
         */

        window.location.replace(
            "../pages/login.html"
        );

    } catch (err) {

        error(
            "Logout failed:",
            err
        );


        setLogoutLoading(
            false
        );


        alert(
            "Unable to sign out. Please try again."
        );

    }

}


/* =========================================================
   LOGOUT EVENT
========================================================= */

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        logout
    );

}


/* =========================================================
   AUTHENTICATION
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
             * NOT AUTHENTICATED
             * ------------------------------------------------
             */

            if (!user) {

                currentUser = null;

                warn(
                    "No authenticated user. Redirecting."
                );


                window.location.replace(
                    "../pages/login.html?redirect=courses"
                );


                return;

            }


            /*
             * ------------------------------------------------
             * AUTHENTICATED
             * ------------------------------------------------
             */

            currentUser =
                user;


            /*
             * Refresh Firebase user.
             */

            try {

                await user.reload();

            } catch (err) {

                warn(
                    "Unable to refresh Firebase user:",
                    err
                );

            }


            /*
             * Use refreshed user object.
             */

            const refreshedUser =
                auth.currentUser ||
                user;


            displayStudent(
                refreshedUser
            );


            /*
             * Prevent duplicate
             * initialization.
             */

            if (coursesInitialized) {

                return;

            }


            coursesInitialized =
                true;


            /*
             * Initial filter.
             */

            setActiveFilter(
                "all"
            );


            filterCourses(
                "all"
            );


            log(
                "Student courses initialized successfully."
            );

        }
    );

}


/* =========================================================
   INITIAL LOAD
========================================================= */

log(
    "student-courses.js loaded."
);
