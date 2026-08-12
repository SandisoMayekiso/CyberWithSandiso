/* =========================================================
   CWS ACADEMY
   Student Courses
   Authentication + Search + Filtering + Enrollment
========================================================= */


/* =========================================================
   FIREBASE AUTH
========================================================= */

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";


/* =========================================================
   FIREBASE FIRESTORE
========================================================= */

import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    arrayUnion
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";


/* =========================================================
   FIREBASE CONFIG
========================================================= */

import {
    auth,
    db
} from "./firebase-config.js";


/* =========================================================
   DEBUG
========================================================= */

console.log(
    "CWS Academy student-courses.js loaded."
);


/* =========================================================
   DOM ELEMENTS
========================================================= */

const courseSearch =
    document.getElementById(
        "courseSearch"
    );


const filterButtons =
    document.querySelectorAll(
        ".course-filter"
    );


const courseGrid =
    document.getElementById(
        "studentCoursesGrid"
    );


const courseCount =
    document.getElementById(
        "courseCount"
    );


const noCoursesMessage =
    document.getElementById(
        "noCoursesMessage"
    );


const studentName =
    document.getElementById(
        "studentName"
    );


const courseCards =
    document.querySelectorAll(
        ".student-course-card"
    );


/* =========================================================
   STATE
========================================================= */

let currentUser = null;

let currentFilter =
    "all";

let searchTerm =
    "";


/* =========================================================
   COURSE DATA
========================================================= */

const courseCatalog = {

    "cybersecurity-fundamentals": {

        name:
            "Cybersecurity Fundamentals",

        level:
            "beginner"

    },


    "networking-fundamentals": {

        name:
            "Networking Fundamentals",

        level:
            "beginner"

    },


    "linux-fundamentals": {

        name:
            "Linux Fundamentals",

        level:
            "beginner"

    },


    "ethical-hacking-fundamentals": {

        name:
            "Ethical Hacking Fundamentals",

        level:
            "intermediate"

    },


    "web-application-security": {

        name:
            "Web Application Security",

        level:
            "intermediate"

    },


    "practical-penetration-testing": {

        name:
            "Practical Penetration Testing",

        level:
            "advanced"

    }

};


/* =========================================================
   GET COURSE ID
========================================================= */

function getCourseId(card) {

    /*
     * Prefer an explicit data-course-id
     * if you add one later.
     */

    if (card.dataset.courseId) {

        return card.dataset.courseId;

    }


    /*
     * Fall back to the current
     * data-course value.
     */

    const courseName =
        card.dataset.course || "";


    return normalizeCourseId(
        courseName
    );

}


/* =========================================================
   NORMALIZE COURSE ID
========================================================= */

function normalizeCourseId(value) {

    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

}


/* =========================================================
   GET COURSE NAME
========================================================= */

function getCourseName(card) {

    const heading =
        card.querySelector("h3");


    if (heading) {

        return heading.textContent.trim();

    }


    return "Course";

}


/* =========================================================
   GET USER DISPLAY NAME
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
   DISPLAY STUDENT NAME
========================================================= */

function displayStudentName(user) {

    if (!studentName) {

        return;

    }


    studentName.textContent =
        getUserName(user);

}


/* =========================================================
   UPDATE COURSE COUNT
========================================================= */

function updateCourseCount(visibleCount) {

    if (!courseCount) {

        return;

    }


    courseCount.textContent =
        visibleCount === 1
            ? "1 Course"
            : `${visibleCount} Courses`;

}


/* =========================================================
   SHOW / HIDE NO RESULTS
========================================================= */

function updateNoResultsState(visibleCount) {

    if (!noCoursesMessage) {

        return;

    }


    noCoursesMessage.hidden =
        visibleCount !== 0;

}


/* =========================================================
   FILTER COURSES
========================================================= */

function filterCourses() {

    const normalizedSearch =
        searchTerm
            .toLowerCase()
            .trim();


    let visibleCount =
        0;


    courseCards.forEach(card => {

        const courseName =
            getCourseName(card)
                .toLowerCase();


        const courseDescription =
            card.querySelector("p")
                ?.textContent
                .toLowerCase() || "";


        const cardCourse =
            card.dataset.course
                ?.toLowerCase() || "";


        const status =
            card.dataset.status
                ?.toLowerCase() || "";


        /*
         * SEARCH
         */

        const matchesSearch =
            !normalizedSearch ||
            courseName.includes(
                normalizedSearch
            ) ||
            courseDescription.includes(
                normalizedSearch
            ) ||
            cardCourse.includes(
                normalizedSearch
            );


        /*
         * FILTER
         */

        const matchesFilter =
            currentFilter === "all" ||
            status === currentFilter;


        /*
         * FINAL VISIBILITY
         */

        const shouldShow =
            matchesSearch &&
            matchesFilter;


        if (shouldShow) {

            card.hidden =
                false;

            card.classList.remove(
                "hidden"
            );

            visibleCount++;

        } else {

            card.hidden =
                true;

            card.classList.add(
                "hidden"
            );

        }

    });


    updateCourseCount(
        visibleCount
    );


    updateNoResultsState(
        visibleCount
    );

}


/* =========================================================
   FILTER BUTTONS
========================================================= */

function setupFilters() {

    if (!filterButtons.length) {

        return;

    }


    filterButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                currentFilter =
                    button.dataset.filter ||
                    "all";


                filterButtons.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                filterCourses();

            }
        );

    });

}


/* =========================================================
   SEARCH
========================================================= */

function setupSearch() {

    if (!courseSearch) {

        return;

    }


    courseSearch.addEventListener(
        "input",
        () => {

            searchTerm =
                courseSearch.value;

            filterCourses();

        }
    );

}


/* =========================================================
   GET STUDENT DOCUMENT
========================================================= */

async function getStudentDocument(user) {

    if (!user) {

        return null;

    }


    try {

        const studentRef =
            doc(
                db,
                "students",
                user.uid
            );


        const snapshot =
            await getDoc(
                studentRef
            );


        if (!snapshot.exists()) {

            return null;

        }


        return snapshot.data();

    } catch (error) {

        console.error(
            "Unable to load student data:",
            error
        );


        return null;

    }

}


/* =========================================================
   FIND ENROLLED COURSE
========================================================= */

function findEnrolledCourse(
    enrolledCourses,
    courseId
) {

    if (!Array.isArray(enrolledCourses)) {

        return null;

    }


    return enrolledCourses.find(
        course => {

            return (
                course?.id === courseId
            );

        }
    ) || null;

}


/* =========================================================
   APPLY STUDENT COURSE DATA
========================================================= */

function applyCourseData(
    card,
    enrollment
) {

    if (!enrollment) {

        return;

    }


    const progress =
        Number(
            enrollment.progress || 0
        );


    const status =
        enrollment.status ||
        (
            progress >= 100
                ? "completed"
                : "in-progress"
        );


    /*
     * Update card state
     */

    card.dataset.status =
        status;


    /*
     * Status label
     */

    const statusElement =
        card.querySelector(
            ".course-status"
        );


    if (statusElement) {

        statusElement.className =
            `course-status ${status}`;

        statusElement.textContent =
            status === "completed"
                ? "COMPLETED"
                : status === "in-progress"
                    ? "IN PROGRESS"
                    : "NOT STARTED";

    }


    /*
     * Progress percentage
     */

    const progressValue =
        card.querySelector(
            ".progress-header strong"
        );


    if (progressValue) {

        progressValue.textContent =
            `${progress}%`;

    }


    /*
     * Progress bar
     */

    const progressBar =
        card.querySelector(
            ".progress-bar"
        );


    if (progressBar) {

        progressBar.style.width =
            `${progress}%`;

    }


    /*
     * Action button
     */

    const action =
        card.querySelector(
            ".course-action"
        );


    if (!action) {

        return;

    }


    const courseId =
        getCourseId(card);


    action.href =
        `lessons.html?course=${encodeURIComponent(courseId)}`;


    if (status === "completed") {

        action.innerHTML =
            `
                Review Course
                <i class="fa-solid fa-arrow-right"></i>
            `;

    } else if (status === "in-progress") {

        action.innerHTML =
            `
                Continue Learning
                <i class="fa-solid fa-arrow-right"></i>
            `;

    } else {

        action.innerHTML =
            `
                Start Learning
                <i class="fa-solid fa-arrow-right"></i>
            `;

    }

}


/* =========================================================
   LOAD STUDENT COURSES
========================================================= */

async function loadStudentCourses(user) {

    console.log(
        "Loading courses for:",
        user.uid
    );


    const studentData =
        await getStudentDocument(
            user
        );


    if (!studentData) {

        console.log(
            "No student document found."
        );


        filterCourses();

        return;

    }


    const enrolledCourses =
        Array.isArray(
            studentData.enrolledCourses
        )
            ? studentData.enrolledCourses
            : [];


    courseCards.forEach(card => {

        const courseId =
            getCourseId(card);


        const enrollment =
            findEnrolledCourse(
                enrolledCourses,
                courseId
            );


        if (enrollment) {

            applyCourseData(
                card,
                enrollment
            );

        }

    });


    /*
     * Re-run filtering because
     * enrollment statuses may
     * have changed.
     */

    filterCourses();

}


/* =========================================================
   ENROLL STUDENT
========================================================= */

async function enrollStudent(
    user,
    courseId,
    courseName,
    button,
    card
) {

    if (!user) {

        return;

    }


    const originalHTML =
        button.innerHTML;


    try {

        /*
         * Disable button
         */

        button.disabled =
            true;


        button.classList.add(
            "enrolling"
        );


        button.innerHTML =
            `
                <i class="fa-solid fa-spinner fa-spin"></i>
                Enrolling...
            `;


        /*
         * Student document
         */

        const studentRef =
            doc(
                db,
                "students",
                user.uid
            );


        /*
         * Enrollment record
         */

        const enrollment = {

            id:
                courseId,

            name:
                courseName,

            progress:
                0,

            status:
                "in-progress",

            enrolledAt:
                new Date().toISOString(),

            currentLesson:
                0

        };


        /*
         * Save enrollment
         */

        await setDoc(
            studentRef,
            {

                uid:
                    user.uid,

                email:
                    user.email || "",

                enrolledCourses:
                    arrayUnion(
                        enrollment
                    )

            },
            {
                merge:
                    true
            }
        );


        /*
         * Update local card
         */

        applyCourseData(
            card,
            enrollment
        );


        /*
         * Success state
         */

        button.classList.remove(
            "enrolling"
        );


        button.classList.add(
            "enrolled"
        );


        button.innerHTML =
            `
                <i class="fa-solid fa-circle-check"></i>
                Enrolled
            `;


        console.log(
            "Successfully enrolled:",
            courseName
        );


        /*
         * Re-run filtering
         */

        filterCourses();


        /*
         * Go directly into
         * the course after enrollment.
         */

        setTimeout(() => {

            window.location.href =
                `lessons.html?course=${encodeURIComponent(courseId)}`;

        }, 600);


    } catch (error) {

        console.error(
            "Course enrollment error:",
            error
        );


        /*
         * Restore button
         */

        button.disabled =
            false;


        button.classList.remove(
            "enrolling",
            "enrolled"
        );


        button.innerHTML =
            originalHTML;


        alert(
            "We couldn't enroll you in this course. Please try again."
        );

    }

}


/* =========================================================
   COURSE ACTIONS
========================================================= */

function setupCourseActions() {

    courseCards.forEach(card => {

        const action =
            card.querySelector(
                ".course-action"
            );


        if (!action) {

            return;

        }


        const courseId =
            getCourseId(card);


        /*
         * Courses which are already
         * enrolled simply use their
         * existing lessons link.
         */

        action.href =
            `lessons.html?course=${encodeURIComponent(courseId)}`;


        /*
         * Existing status
         */

        const status =
            card.dataset.status;


        /*
         * Not-started courses:
         *
         * We treat the action as
         * enrollment + start.
         */

        if (
            status === "not-started"
        ) {

            action.addEventListener(
                "click",
                async event => {

                    event.preventDefault();


                    /*
                     * Wait for Firebase
                     * authentication.
                     */

                    if (!currentUser) {

                        window.location.href =
                            `../pages/login.html?redirect=course-${encodeURIComponent(courseId)}`;

                        return;

                    }


                    const courseName =
                        getCourseName(card);


                    await enrollStudent(
                        currentUser,
                        courseId,
                        courseName,
                        action,
                        card
                    );

                }
            );

        }

    });

}


/* =========================================================
   AUTH STATE
========================================================= */

onAuthStateChanged(
    auth,
    async user => {

        console.log(
            "CWS Academy course auth:",
            user
                ? "AUTHENTICATED"
                : "NOT AUTHENTICATED"
        );


        /*
         * This page is protected.
         */

        if (!user) {

            window.location.replace(
                "../pages/login.html?redirect=courses"
            );


            return;

        }


        /*
         * Save current user.
         */

        currentUser =
            user;


        /*
         * Display student name.
         */

        displayStudentName(
            user
        );


        /*
         * Load Firestore course data.
         */

        await loadStudentCourses(
            user
        );

    }
);


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        setupFilters();

        setupSearch();

        setupCourseActions();

        filterCourses();


        console.log(
            "CWS Academy courses page initialized."
        );

    }
);
