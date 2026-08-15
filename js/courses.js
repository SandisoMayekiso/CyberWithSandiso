/* =========================================================
   CWS ACADEMY
   Student Courses
   courses.js
========================================================= */

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

import {
    auth
} from "./firebase-config.js";


/* =========================================================
   DEBUG
========================================================= */

console.log("CWS Academy courses.js loaded");


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const filterButtons =
        document.querySelectorAll(".course-filter");

    const courseCards =
        document.querySelectorAll(".academy-course-card");

    const emptyState =
        document.querySelector(".course-empty-state");


    console.log(
        "Course filters:",
        filterButtons.length
    );

    console.log(
        "Course cards:",
        courseCards.length
    );


    /* =====================================================
       FILTER COURSES
    ===================================================== */

    function filterCourses(selectedFilter) {

        let visibleCourses = 0;


        courseCards.forEach(card => {

            const courseLevel =
                card.dataset.level;


            const shouldShow =
                selectedFilter === "all" ||
                courseLevel === selectedFilter;


            if (shouldShow) {

                card.classList.remove("hidden");

                visibleCourses++;

            } else {

                card.classList.add("hidden");

            }

        });


        /* ================================================
           EMPTY STATE
        ================================================= */

        if (emptyState) {

            if (visibleCourses === 0) {

                emptyState.classList.add("visible");

            } else {

                emptyState.classList.remove("visible");

            }

        }

    }


    /* =====================================================
       FILTER BUTTON EVENTS
    ===================================================== */

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const selectedFilter =
                button.dataset.filter || "all";


            /* Remove active state */

            filterButtons.forEach(item => {

                item.classList.remove("active");

            });


            /* Activate selected filter */

            button.classList.add("active");


            /* Filter */

            filterCourses(selectedFilter);


            console.log(
                "Course filter:",
                selectedFilter
            );

        });

    });


    /* =====================================================
       INITIAL FILTER
    ===================================================== */

    filterCourses("all");


    /* =====================================================
       COURSE ACTION BUTTONS
    ===================================================== */

    const courseButtons =
        document.querySelectorAll(
            ".course-card-btn"
        );


    courseButtons.forEach(button => {

        button.addEventListener("click", event => {

            /*
             * If the button is disabled,
             * do nothing.
             */

            if (
                button.disabled ||
                button.classList.contains("disabled")
            ) {

                event.preventDefault();

                return;

            }


            /*
             * If it is a normal link,
             * allow the browser to navigate.
             */

        });

    });


    /* =====================================================
       AUTHENTICATION
    ===================================================== */

    onAuthStateChanged(
        auth,
        user => {

            if (user) {

                console.log(
                    "Courses page: authenticated user",
                    user.uid
                );

                enableAuthenticatedCourses();

            } else {

                console.log(
                    "Courses page: visitor is not authenticated"
                );

                prepareGuestCourses();

            }

        }
    );


    /* =====================================================
       AUTHENTICATED USER
    ===================================================== */

    function enableAuthenticatedCourses() {

        const protectedButtons =
            document.querySelectorAll(
                "[data-auth-required]"
            );


        protectedButtons.forEach(button => {

            button.removeAttribute("aria-disabled");

        });

    }


    /* =====================================================
       GUEST USER
    ===================================================== */

    function prepareGuestCourses() {

        const protectedLinks =
            document.querySelectorAll(
                "[data-auth-required]"
            );


        protectedLinks.forEach(link => {

            /*
             * Don't completely hide the course.
             *
             * The course catalogue remains public.
             * Only the actual learning area requires
             * authentication.
             */

            link.addEventListener(
                "click",
                handleProtectedCourseAccess
            );

        });

    }


    /* =====================================================
       PROTECTED COURSE ACCESS
    ===================================================== */

    function handleProtectedCourseAccess(event) {

        event.preventDefault();


        const destination =
            this.getAttribute("href");


        /*
         * Preserve the destination so login.js
         * can return the user to the correct page.
         */

        if (!destination) {

            window.location.href =
                "login.html";

            return;

        }


        const encodedDestination =
            encodeURIComponent(destination);


        window.location.href =
            `login.html?redirect=${encodedDestination}`;

    }

});
