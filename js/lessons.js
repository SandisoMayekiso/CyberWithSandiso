/* =========================================================
   CWS ACADEMY
   Student Lessons
   Search + Filtering + Course Navigation + Authentication
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

console.log(
    "CWS Academy lessons.js loaded."
);


/* =========================================================
   ELEMENTS
========================================================= */

const studentName =
    document.getElementById("studentName");

const logoutBtn =
    document.getElementById("logoutBtn");

const lessonSearch =
    document.getElementById("lessonSearch");

const lessonFilters =
    document.querySelectorAll(".lesson-filter");

const courseFilters =
    document.querySelectorAll(
        ".lesson-course-filter"
    );

const lessonCards =
    document.querySelectorAll(".lesson-card");

const lessonCount =
    document.getElementById("lessonCount");

const lessonCourseCount =
    document.getElementById(
        "lessonCourseCount"
    );

const noLessonsMessage =
    document.getElementById(
        "noLessonsMessage"
    );

const resetLessonFilters =
    document.getElementById(
        "resetLessonFilters"
    );

const lessonsTitle =
    document.getElementById(
        "lessonsTitle"
    );

const lessonsDescription =
    document.getElementById(
        "lessonsDescription"
    );


/* =========================================================
   STATE
========================================================= */

let selectedStatus =
    "all";

let selectedCourse =
    "all";

let searchTerm =
    "";


/* =========================================================
   GET USER NAME
========================================================= */

function getUserName(user) {

    if (user?.displayName) {

        return user.displayName.trim();

    }


    if (user?.email) {

        const emailName =
            user.email
                .split("@")[0]
                .trim();

        if (emailName) {

            return emailName;

        }

    }


    return "Student";

}


/* =========================================================
   DISPLAY USER
========================================================= */

function displayUser(user) {

    const name =
        getUserName(user);


    if (studentName) {

        studentName.textContent =
            name;

    }


    console.log(
        "CWS Academy lessons user:",
        {
            uid: user.uid,
            email: user.email,
            name
        }
    );

}


/* =========================================================
   COURSE NAME
========================================================= */

function getCourseName(courseId) {

    const courses = {

        "cybersecurity-fundamentals":
            "Cybersecurity Fundamentals",

        "networking-fundamentals":
            "Networking Fundamentals",

        "linux-fundamentals":
            "Linux Fundamentals"

    };


    return courses[courseId] ||
        "Course Lessons";

}


/* =========================================================
   UPDATE COURSE HEADER
========================================================= */

function updateCourseHeader() {

    if (
        selectedCourse === "all"
    ) {

        if (lessonsTitle) {

            lessonsTitle.textContent =
                "Continue Your Learning";

        }


        if (lessonsDescription) {

            lessonsDescription.textContent =
                "Access your cybersecurity lessons, continue your courses and build your technical skills step by step.";

        }

        return;

    }


    const courseName =
        getCourseName(
            selectedCourse
        );


    if (lessonsTitle) {

        lessonsTitle.textContent =
            courseName;

    }


    if (lessonsDescription) {

        lessonsDescription.textContent =
            `Continue learning through the lessons in ${courseName}.`;

    }

}


/* =========================================================
   APPLY LESSON FILTERS
========================================================= */

function applyLessonFilters() {

    let visibleCount = 0;


    lessonCards.forEach(card => {

        const cardStatus =
            card.dataset.status ||
            "";

        const cardCourse =
            card.dataset.course ||
            "";

        const cardSearch =
            (
                card.dataset.search ||
                card.textContent
            ).toLowerCase();


        const matchesStatus =
            selectedStatus === "all" ||
            cardStatus === selectedStatus;


        const matchesCourse =
            selectedCourse === "all" ||
            cardCourse === selectedCourse;


        const matchesSearch =
            !searchTerm ||
            cardSearch.includes(
                searchTerm
            );


        const shouldShow =
            matchesStatus &&
            matchesCourse &&
            matchesSearch;


        if (shouldShow) {

            card.classList.remove(
                "hidden"
            );

            visibleCount++;

        } else {

            card.classList.add(
                "hidden"
            );

        }

    });


    if (lessonCount) {

        lessonCount.textContent =
            `${visibleCount} ${
                visibleCount === 1
                    ? "Lesson"
                    : "Lessons"
            }`;

    }


    if (noLessonsMessage) {

        noLessonsMessage.hidden =
            visibleCount !== 0;

    }


    updateCourseHeader();

}


/* =========================================================
   STATUS FILTERS
========================================================= */

lessonFilters.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            selectedStatus =
                button.dataset.filter ||
                "all";


            lessonFilters.forEach(
                item => {

                    item.classList.remove(
                        "active"
                    );

                }
            );


            button.classList.add(
                "active"
            );


            applyLessonFilters();

        }
    );

});


/* =========================================================
   COURSE FILTERS
========================================================= */

courseFilters.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            selectedCourse =
                button.dataset.course ||
                "all";


            courseFilters.forEach(
                item => {

                    item.classList.remove(
                        "active"
                    );

                }
            );


            button.classList.add(
                "active"
            );


            applyLessonFilters();

        }
    );

});


/* =========================================================
   SEARCH
========================================================= */

if (lessonSearch) {

    lessonSearch.addEventListener(
        "input",
        event => {

            searchTerm =
                event.target.value
                    .trim()
                    .toLowerCase();


            applyLessonFilters();

        }
    );

}


/* =========================================================
   RESET FILTERS
========================================================= */

if (resetLessonFilters) {

    resetLessonFilters.addEventListener(
        "click",
        () => {

            selectedStatus =
                "all";

            selectedCourse =
                "all";

            searchTerm =
                "";


            if (lessonSearch) {

                lessonSearch.value =
                    "";

            }


            lessonFilters.forEach(
                button => {

                    button.classList.remove(
                        "active"
                    );

                    if (
                        button.dataset.filter ===
                        "all"
                    ) {

                        button.classList.add(
                            "active"
                        );

                    }

                }
            );


            courseFilters.forEach(
                button => {

                    button.classList.remove(
                        "active"
                    );

                    if (
                        button.dataset.course ===
                        "all"
                    ) {

                        button.classList.add(
                            "active"
                        );

                    }

                }
            );


            applyLessonFilters();

        }
    );

}


/* =========================================================
   COURSE QUERY PARAMETER
========================================================= */

function readCourseFromURL() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const course =
        params.get("course");


    if (!course) {

        return;

    }


    const validCourse =
        [
            "cybersecurity-fundamentals",
            "networking-fundamentals",
            "linux-fundamentals"
        ].includes(course);


    if (!validCourse) {

        console.warn(
            "Unknown course parameter:",
            course
        );

        return;

    }


    selectedCourse =
        course;


    courseFilters.forEach(
        button => {

            button.classList.remove(
                "active"
            );


            if (
                button.dataset.course ===
                course
            ) {

                button.classList.add(
                    "active"
                );

            }

        }
    );


    applyLessonFilters();

}


/* =========================================================
   LOGOUT
========================================================= */

async function logout() {

    if (!auth) {

        console.error(
            "Firebase Auth is unavailable."
        );

        return;

    }


    try {

        if (logoutBtn) {

            logoutBtn.disabled =
                true;

            logoutBtn.style.opacity =
                "0.6";

            logoutBtn.style.cursor =
                "wait";

        }


        console.log(
            "CWS Academy: Signing out..."
        );


        await signOut(auth);


        console.log(
            "CWS Academy: Logout successful."
        );


        window.location.replace(
            "../pages/login.html"
        );


    } catch (error) {

        console.error(
            "CWS Academy lessons logout error:",
            error
        );


        if (logoutBtn) {

            logoutBtn.disabled =
                false;

            logoutBtn.style.opacity =
                "";

            logoutBtn.style.cursor =
                "";

        }


        alert(
            "Unable to sign out. Please try again."
        );

    }

}


/* =========================================================
   LOGOUT BUTTON
========================================================= */

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        logout
    );

}


/* =========================================================
   FIREBASE AUTH STATE
========================================================= */

onAuthStateChanged(
    auth,
    user => {

        console.log(
            "CWS Academy lessons auth state:",
            user
                ? "AUTHENTICATED"
                : "NOT AUTHENTICATED"
        );


        if (!user) {

            window.location.replace(
                "../pages/login.html?redirect=lessons"
            );


            return;

        }


        displayUser(user);

        readCourseFromURL();

        applyLessonFilters();

    }
);


/* =========================================================
   INITIALIZATION
========================================================= */

console.log(
    "CWS Academy lessons.js initialization complete."
);
