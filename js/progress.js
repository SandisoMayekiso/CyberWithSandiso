/* =========================================================
   CWS ACADEMY
   STUDENT PROGRESS
   Firebase Authentication + Firestore
========================================================= */

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

import {
    auth,
    db
} from "./firebase-config.js";


/* =========================================================
   DEBUG
========================================================= */

console.log(
    "CWS Academy progress.js loaded."
);


/* =========================================================
   DOM ELEMENTS
========================================================= */

const studentName =
    document.getElementById("studentName");

const progressCourses =
    document.getElementById("progressCourses");

const progressEmpty =
    document.getElementById("progressEmpty");

const progressLoading =
    document.getElementById("progressLoading");

const progressError =
    document.getElementById("progressError");


/* =========================================================
   STAT ELEMENTS
========================================================= */

const coursesStarted =
    document.getElementById("coursesStarted");

const labsCompleted =
    document.getElementById("labsCompleted");

const assessmentsCompleted =
    document.getElementById("assessmentsCompleted");

const certificatesEarned =
    document.getElementById("certificatesEarned");


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

}


/* =========================================================
   DEFAULT STATISTICS
========================================================= */

function setDefaultStats() {

    if (coursesStarted) {

        coursesStarted.textContent =
            "0";

    }


    if (labsCompleted) {

        labsCompleted.textContent =
            "0";

    }


    if (assessmentsCompleted) {

        assessmentsCompleted.textContent =
            "0";

    }


    if (certificatesEarned) {

        certificatesEarned.textContent =
            "0";

    }

}


/* =========================================================
   SHOW / HIDE STATES
========================================================= */

function showLoading() {

    if (progressLoading) {

        progressLoading.hidden =
            false;

    }


    if (progressEmpty) {

        progressEmpty.hidden =
            true;

    }


    if (progressError) {

        progressError.hidden =
            true;

    }

}


function hideLoading() {

    if (progressLoading) {

        progressLoading.hidden =
            true;

    }

}


function showEmptyState() {

    hideLoading();


    if (progressEmpty) {

        progressEmpty.hidden =
            false;

    }

}


function showError() {

    hideLoading();


    if (progressError) {

        progressError.hidden =
            false;

    }

}


/* =========================================================
   NORMALIZE PROGRESS
========================================================= */

function getCourseProgress(
    course,
    userProgress
) {

    let progress = 0;


    /*
     * Course-level progress.
     *
     * Example:
     *
     * progress: {
     *     "cybersecurity-fundamentals": 35
     * }
     */

    if (
        userProgress &&
        typeof userProgress === "object"
    ) {

        const storedProgress =
            userProgress[course.id];


        if (
            typeof storedProgress === "number"
        ) {

            progress =
                storedProgress;

        }

    }


    /*
     * Keep progress between
     * 0 and 100.
     */

    progress =
        Math.max(
            0,
            Math.min(
                100,
                Number(progress) || 0
            )
        );


    return Math.round(progress);

}


/* =========================================================
   COURSE ICON
========================================================= */

function getCourseIcon(courseId) {

    const icons = {

        "cybersecurity-fundamentals":
            "fa-shield-halved",

        "networking-fundamentals":
            "fa-network-wired",

        "linux-fundamentals":
            "fa-terminal"

    };


    return (
        icons[courseId] ||
        "fa-book-open"
    );

}


/* =========================================================
   COURSE STATUS
========================================================= */

function getCourseStatus(progress) {

    if (progress >= 100) {

        return "Completed";

    }


    if (progress > 0) {

        return "In Progress";

    }


    return "Not Started";

}


/* =========================================================
   CREATE COURSE ITEM
========================================================= */

function createCourseItem(
    course,
    progress
) {

    const item =
        document.createElement("article");


    item.className =
        "progress-course-item";


    const status =
        getCourseStatus(progress);


    const icon =
        getCourseIcon(course.id);


    item.innerHTML = `

        <div class="progress-course-header">

            <div class="progress-course-title">

                <div class="progress-course-icon">

                    <i class="fa-solid ${icon}"></i>

                </div>

                <div>

                    <h3>
                        ${escapeHTML(
                            course.name || "Course"
                        )}
                    </h3>

                    <span>
                        ${status}
                    </span>

                </div>

            </div>


            <strong class="progress-percentage">
                ${progress}%
            </strong>

        </div>


        <div class="progress-bar-wrapper">

            <div class="progress-bar-track">

                <div
                    class="progress-bar-fill"
                    style="width: ${progress}%"
                ></div>

            </div>

        </div>


        <div class="progress-course-footer">

            <span>
                ${
                    progress >= 100
                        ? "Course completed"
                        : progress > 0
                            ? "Keep learning"
                            : "Ready to begin"
                }
            </span>


            <a
                href="lessons.html?course=${encodeURIComponent(
                    course.id || ""
                )}"
                class="progress-course-action"
            >

                ${
                    progress >= 100
                        ? "Review Course"
                        : progress > 0
                            ? "Continue Learning"
                            : "Start Course"
                }

                <i class="fa-solid fa-arrow-right"></i>

            </a>

        </div>

    `;


    return item;

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   RENDER COURSES
========================================================= */

function renderCourses(
    enrolledCourses,
    userProgress
) {

    if (!progressCourses) {

        return;

    }


    progressCourses.innerHTML =
        "";


    if (
        !Array.isArray(enrolledCourses) ||
        !enrolledCourses.length
    ) {

        showEmptyState();

        return;

    }


    hideLoading();


    if (progressEmpty) {

        progressEmpty.hidden =
            true;

    }


    enrolledCourses.forEach(course => {

        const progress =
            getCourseProgress(
                course,
                userProgress
            );


        const courseItem =
            createCourseItem(
                course,
                progress
            );


        progressCourses.appendChild(
            courseItem
        );

    });

}


/* =========================================================
   CALCULATE COURSE STATISTICS
========================================================= */

function calculateCourseStats(
    courses,
    userProgress
) {

    if (!Array.isArray(courses)) {

        return {

            started: 0,

            completed: 0

        };

    }


    let started =
        0;

    let completed =
        0;


    courses.forEach(course => {

        const progress =
            getCourseProgress(
                course,
                userProgress
            );


        if (progress > 0) {

            started++;

        }


        if (progress >= 100) {

            completed++;

        }

    });


    return {

        started,

        completed

    };

}


/* =========================================================
   LOAD STUDENT PROGRESS
========================================================= */

async function loadStudentProgress(user) {

    showLoading();


    try {

        const studentRef =
            doc(
                db,
                "students",
                user.uid
            );


        const studentSnapshot =
            await getDoc(
                studentRef
            );


        if (!studentSnapshot.exists()) {

            console.log(
                "No student profile found."
            );


            setDefaultStats();

            showEmptyState();

            return;

        }


        const studentData =
            studentSnapshot.data();


        const enrolledCourses =
            Array.isArray(
                studentData.enrolledCourses
            )
                ? studentData.enrolledCourses
                : [];


        /*
         * Future Firestore structure:
         *
         * progress: {
         *     "cybersecurity-fundamentals": 25,
         *     "networking-fundamentals": 50
         * }
         */

        const userProgress =
            studentData.progress || {};


        const courseStats =
            calculateCourseStats(
                enrolledCourses,
                userProgress
            );


        /*
         * Courses
         */

        if (coursesStarted) {

            coursesStarted.textContent =
                courseStats.started;

        }


        /*
         * These remain zero until
         * labs / assessments / certificates
         * are connected to Firestore.
         */

        if (labsCompleted) {

            labsCompleted.textContent =
                studentData.labsCompleted || 0;

        }


        if (assessmentsCompleted) {

            assessmentsCompleted.textContent =
                studentData.assessmentsCompleted || 0;

        }


        if (certificatesEarned) {

            certificatesEarned.textContent =
                studentData.certificatesEarned || 0;

        }


        renderCourses(
            enrolledCourses,
            userProgress
        );


        console.log(
            "CWS Academy progress loaded:",
            {
                courses:
                    enrolledCourses.length,

                started:
                    courseStats.started,

                completed:
                    courseStats.completed
            }
        );


    } catch (error) {

        console.error(
            "Unable to load student progress:",
            error
        );


        showError();

    }

}


/* =========================================================
   FIREBASE AUTH STATE
========================================================= */

onAuthStateChanged(
    auth,
    user => {

        console.log(
            "CWS Academy progress auth state:",
            user
                ? "AUTHENTICATED"
                : "NOT AUTHENTICATED"
        );


        /*
         * Protect progress page.
         */

        if (!user) {

            console.warn(
                "No authenticated user."
            );


            window.location.replace(
                "../pages/login.html?redirect=progress"
            );


            return;

        }


        /*
         * Authenticated user.
         */

        displayUser(user);

        loadStudentProgress(user);

    }
);


/* =========================================================
   INITIALIZATION
========================================================= */

setDefaultStats();


console.log(
    "CWS Academy progress.js initialization complete."
);
