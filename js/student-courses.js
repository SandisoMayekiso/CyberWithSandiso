/* =========================================================
   CWS ACADEMY
   Student Courses Controller
========================================================= */

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

import {
    auth
} from "./firebase-config.js";


console.log(
    "CWS Academy student-courses.js loaded."
);


/* =========================================================
   ELEMENTS
========================================================= */

const filterButtons =
    document.querySelectorAll(".course-filter");

const courseCards =
    document.querySelectorAll(".student-course-card");

const noCoursesMessage =
    document.getElementById("noCoursesMessage");

const studentNavName =
    document.getElementById("studentNavName");

const logoutNavBtn =
    document.getElementById("logoutNavBtn");


/* =========================================================
   AUTHENTICATION GUARD
========================================================= */

onAuthStateChanged(
    auth,
    async (user) => {

        if (!user) {

            console.warn(
                "CWS Academy: Student courses requires authentication."
            );

            window.location.replace(
                "../pages/login.html?redirect=courses"
            );

            return;

        }


        /*
         * Refresh Firebase user data.
         */

        try {

            await user.reload();

        } catch (error) {

            console.error(
                "Unable to refresh Firebase user:",
                error
            );

        }


        /*
         * Password accounts must have verified email.
         */

        const usesPassword =
            user.providerData.some(
                provider =>
                    provider.providerId === "password"
            );


        if (
            usesPassword &&
            !user.emailVerified
        ) {

            console.warn(
                "CWS Academy: Email verification required."
            );

            window.location.replace(
                "../pages/login.html?redirect=courses"
            );

            return;

        }


        /*
         * Display student identity.
         */

        if (studentNavName) {

            studentNavName.textContent =
                user.displayName ||
                user.email ||
                "Student";

        }


        console.log(
            "CWS Academy: Student courses authenticated:",
            user.uid
        );

    }
);


/* =========================================================
   COURSE FILTER
========================================================= */

function filterCourses(
    selectedFilter
) {

    let visibleCourses = 0;


    courseCards.forEach((card) => {

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

    });


    /*
     * Empty state.
     */

    if (noCoursesMessage) {

        noCoursesMessage.hidden =
            visibleCourses !== 0;

    }

}


/* =========================================================
   FILTER BUTTON EVENTS
========================================================= */

filterButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            const selectedFilter =
                button.dataset.filter;


            filterButtons.forEach(
                (item) => {

                    item.classList.remove(
                        "active"
                    );

                }
            );


            button.classList.add(
                "active"
            );


            filterCourses(
                selectedFilter
            );

        }
    );

});


/* =========================================================
   LOGOUT
========================================================= */

if (logoutNavBtn) {

    logoutNavBtn.addEventListener(
        "click",
        async () => {

            try {

                logoutNavBtn.disabled =
                    true;

                logoutNavBtn.textContent =
                    "Logging out...";


                await signOut(auth);


                window.location.replace(
                    "../index.html"
                );


            } catch (error) {

                console.error(
                    "CWS Academy logout error:",
                    error
                );


                logoutNavBtn.disabled =
                    false;

                logoutNavBtn.textContent =
                    "Logout";

            }

        }
    );

}


/* =========================================================
   INITIAL FILTER
========================================================= */

filterCourses("all");


/* =========================================================
   DEBUG
========================================================= */

console.log(
    "CWS Academy student courses initialized."
);
