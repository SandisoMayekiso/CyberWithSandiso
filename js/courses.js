/* =========================================================
   CWS ACADEMY
   PUBLIC COURSES PAGE
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

const DEBUG = false;


function log(...args) {

    if (DEBUG) {

        console.log(
            "[CWS Courses]",
            ...args
        );

    }

}


function warn(...args) {

    if (DEBUG) {

        console.warn(
            "[CWS Courses]",
            ...args
        );

    }

}


log("courses.js loaded");


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const filterButtons =
            Array.from(
                document.querySelectorAll(
                    ".course-filter"
                )
            );


        const courseCards =
            Array.from(
                document.querySelectorAll(
                    ".academy-course-card"
                )
            );


        const emptyState =
            document.querySelector(
                ".course-empty-state"
            );


        log(
            "Course filters:",
            filterButtons.length
        );


        log(
            "Course cards:",
            courseCards.length
        );


        /* =================================================
           NORMALIZE VALUE
        ================================================== */

        function normalizeValue(
            value
        ) {

            return String(
                value ||
                ""
            )
                .trim()
                .toLowerCase();

        }


        /* =================================================
           INITIAL FILTER FROM URL
        ================================================== */

        function getInitialFilter() {

            const params =
                new URLSearchParams(
                    window.location.search
                );


            const requested =
                normalizeValue(
                    params.get("filter")
                );


            const allowed = [
                "all",
                "free",
                "pro",
                "beginner",
                "intermediate",
                "advanced"
            ];


            return allowed.includes(
                requested
            )
                ? requested
                : "all";

        }


        function setActiveFilterButton(
            filter
        ) {

            filterButtons.forEach(
                button => {

                    const buttonFilter =
                        normalizeValue(
                            button.dataset.filter
                        );


                    const isActive =
                        buttonFilter ===
                        filter;


                    button.classList.toggle(
                        "active",
                        isActive
                    );


                    button.setAttribute(
                        "aria-pressed",
                        String(
                            isActive
                        )
                    );

                }
            );

        }


        /* =================================================
           COURSE MATCH
        ================================================== */

        function courseMatchesFilter(
            card,
            selectedFilter
        ) {

            const filter =
                normalizeValue(
                    selectedFilter
                );


            if (
                !filter ||
                filter === "all"
            ) {

                return true;

            }


            const courseLevel =
                normalizeValue(
                    card.dataset.level
                );


            const courseAccess =
                normalizeValue(
                    card.dataset.access ||
                    "free"
                );


            /*
             * Access filters.
             */

            if (
                filter === "free" ||
                filter === "pro"
            ) {

                return (
                    courseAccess ===
                    filter
                );

            }


            /*
             * Difficulty filters.
             */

            if (
                [
                    "beginner",
                    "intermediate",
                    "advanced"
                ].includes(
                    filter
                )
            ) {

                return (
                    courseLevel ===
                    filter
                );

            }


            return true;

        }


        /* =================================================
           FILTER COURSES
        ================================================== */

        function filterCourses(
            selectedFilter
        ) {

            const filter =
                normalizeValue(
                    selectedFilter ||
                    "all"
                );


            let visibleCourses =
                0;


            courseCards.forEach(
                card => {

                    const shouldShow =
                        courseMatchesFilter(
                            card,
                            filter
                        );


                    card.classList.toggle(
                        "hidden",
                        !shouldShow
                    );


                    if (shouldShow) {

                        visibleCourses++;

                    }

                }
            );


            /* =============================================
               EMPTY STATE
            ============================================== */

            if (emptyState) {

                emptyState.classList.toggle(
                    "visible",
                    visibleCourses ===
                    0
                );

            }


            log(
                "Course filter applied:",
                {
                    filter,
                    visibleCourses
                }
            );

        }


        /* =================================================
           FILTER BUTTON EVENTS
        ================================================== */

        filterButtons.forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const selectedFilter =
                            normalizeValue(
                                button.dataset.filter ||
                                "all"
                            );


                        filterButtons.forEach(
                            item => {

                                const isActive =
                                    item ===
                                    button;


                                item.classList.toggle(
                                    "active",
                                    isActive
                                );


                                item.setAttribute(
                                    "aria-pressed",
                                    String(
                                        isActive
                                    )
                                );

                            }
                        );


                        filterCourses(
                            selectedFilter
                        );


                        try {

                            const url =
                                new URL(
                                    window.location.href
                                );


                            if (
                                selectedFilter ===
                                "all"
                            ) {

                                url.searchParams.delete(
                                    "filter"
                                );

                            }
                            else {

                                url.searchParams.set(
                                    "filter",
                                    selectedFilter
                                );

                            }


                            window.history.replaceState(
                                {},
                                "",
                                url
                            );

                        }
                        catch (error) {

                            warn(
                                "Could not update course filter URL.",
                                error
                            );

                        }

                    }
                );

            }
        );


        /* =================================================
           INITIAL FILTER
        ================================================== */

        const initialFilter =
            getInitialFilter();


        setActiveFilterButton(
            initialFilter
        );


        filterCourses(
            initialFilter
        );


        /* =================================================
           DISABLED COURSE ACTIONS
        ================================================== */

        const disabledCourseButtons =
            Array.from(
                document.querySelectorAll(
                    ".course-start-btn.pro-disabled, " +
                    ".course-card-btn.disabled, " +
                    ".course-action.disabled, " +
                    ".course-action.pro-disabled"
                )
            );


        disabledCourseButtons.forEach(
            button => {

                button.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();

                    }
                );

            }
        );


        /* =================================================
           AUTHENTICATION
        ================================================== */

        if (!auth) {

            warn(
                "Firebase Authentication is unavailable."
            );


            prepareGuestCourses();

            return;

        }


        onAuthStateChanged(
            auth,
            user => {

                if (user) {

                    log(
                        "Courses page: authenticated user",
                        user.uid
                    );


                    enableAuthenticatedCourses(
                        user
                    );

                }
                else {

                    log(
                        "Courses page: visitor is not authenticated"
                    );


                    prepareGuestCourses();

                }

            }
        );


        /* =================================================
           AUTHENTICATED USER
        ================================================== */

        function enableAuthenticatedCourses(
            user
        ) {

            const protectedButtons =
                document.querySelectorAll(
                    "[data-auth-required]"
                );


            protectedButtons.forEach(
                button => {

                    button.removeAttribute(
                        "aria-disabled"
                    );

                }
            );


            /*
             * Pro courses remain disabled even for
             * authenticated users while Pro is paused.
             */

            document
                .querySelectorAll(
                    '.academy-course-card[data-access="pro"]'
                )
                .forEach(
                    card => {

                        card.classList.add(
                            "pro-locked"
                        );


                        card.setAttribute(
                            "aria-disabled",
                            "true"
                        );

                    }
                );


            log(
                "Authenticated course access prepared.",
                {
                    uid:
                        user?.uid || null
                }
            );

        }


        /* =================================================
           GUEST USER
        ================================================== */

        function prepareGuestCourses() {

            const protectedLinks =
                document.querySelectorAll(
                    "[data-auth-required]"
                );


            protectedLinks.forEach(
                link => {

                    /*
                     * Avoid duplicate listeners if Firebase
                     * emits more than one auth state event.
                     */

                    if (
                        link.dataset
                            .guestHandlerAttached ===
                        "true"
                    ) {

                        return;

                    }


                    link.dataset
                        .guestHandlerAttached =
                        "true";


                    link.addEventListener(
                        "click",
                        handleProtectedCourseAccess
                    );

                }
            );

        }


        /* =================================================
           PROTECTED COURSE ACCESS
        ================================================== */

        function handleProtectedCourseAccess(
            event
        ) {

            event.preventDefault();


            const destination =
                this.getAttribute(
                    "href"
                );


            if (!destination) {

                window.location.href =
                    "login.html";

                return;

            }


            const encodedDestination =
                encodeURIComponent(
                    destination
                );


            window.location.href =
                `login.html?redirect=${encodedDestination}`;

        }

    }
);
