javascript
/* =========================================================
   CWS ACADEMY
   Courses Page
   Course Filtering + Authentication + Enrollment
========================================================= */


/* =========================================================
   FIREBASE
========================================================= */

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

import {
    doc,
    setDoc,
    arrayUnion
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

import {
    auth,
    db
} from "./firebase-config.js";


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       COURSE FILTERS
    ====================================================== */

    const filterButtons =
        document.querySelectorAll(".course-filter");

    const courseCards =
        document.querySelectorAll(".academy-course-card");


    if (filterButtons.length && courseCards.length) {

        filterButtons.forEach(button => {

            button.addEventListener("click", () => {

                const selectedFilter =
                    button.dataset.filter;


                /* Remove active state */

                filterButtons.forEach(item => {

                    item.classList.remove("active");

                });


                /* Activate selected filter */

                button.classList.add("active");


                /* Filter courses */

                courseCards.forEach(card => {

                    const courseLevel =
                        card.dataset.level;


                    if (
                        selectedFilter === "all" ||
                        courseLevel === selectedFilter
                    ) {

                        card.classList.remove("hidden");

                    } else {

                        card.classList.add("hidden");

                    }

                });

            });

        });

    }


    /* =====================================================
       COURSE ENROLLMENT BUTTONS
    ====================================================== */

    const courseStartButtons =
        document.querySelectorAll(".course-start-btn");


    if (!courseStartButtons.length) {
        return;
    }


    /* =====================================================
       WAIT FOR FIREBASE AUTH STATE
    ====================================================== */

    let currentUser = null;

    let authReady = false;


    const authReadyPromise =
        new Promise(resolve => {

            onAuthStateChanged(
                auth,
                user => {

                    currentUser = user;

                    authReady = true;

                    resolve(user);

                }
            );

        });


    /* =====================================================
       COURSE BUTTON HANDLERS
    ====================================================== */

    courseStartButtons.forEach(button => {

        button.addEventListener(
            "click",
            async event => {

                event.preventDefault();


                /* Wait until Firebase finishes
                   determining authentication state */

                await authReadyPromise;


                /* =========================================
                   NOT LOGGED IN
                ========================================== */

                if (!currentUser) {

                    const courseId =
                        button.dataset.courseId || "";


                    const loginUrl =
                        `login.html?redirect=course-${encodeURIComponent(courseId)}`;


                    window.location.href =
                        loginUrl;


                    return;

                }


                /* =========================================
                   LOGGED IN
                ========================================== */

                const courseId =
                    button.dataset.courseId;


                const courseName =
                    button.dataset.courseName;


                if (!courseId || !courseName) {

                    console.error(
                        "Course button is missing data-course-id or data-course-name."
                    );


                    alert(
                        "This course is not configured correctly yet."
                    );


                    return;

                }


                await enrollStudent(
                    currentUser,
                    courseId,
                    courseName,
                    button
                );

            }
        );

    });

});


/* =========================================================
   ENROLL STUDENT
========================================================= */

async function enrollStudent(
    user,
    courseId,
    courseName,
    button
) {

    const originalButtonHTML =
        button.innerHTML;


    try {

        /* ================================================
           BUTTON STATE
        ================================================= */

        button.disabled = true;

        button.classList.add(
            "enrolling"
        );

        button.innerHTML =
            '<i class="fa-solid fa-spinner fa-spin"></i>' +
            ' Enrolling...';


        /* ================================================
           STUDENT DOCUMENT
        ================================================= */

        const studentRef =
            doc(
                db,
                "students",
                user.uid
            );


        /* ================================================
           COURSE DATA
        ================================================= */

        const courseData = {

            id: courseId,

            name: courseName,

            enrolledAt: new Date().toISOString()

        };


        /* ================================================
           SAVE ENROLLMENT
        ================================================= */

        await setDoc(
            studentRef,
            {

                uid: user.uid,

                email: user.email || "",

                enrolledCourses:
                    arrayUnion(courseData)

            },
            {
                merge: true
            }
        );


        console.log(
            "Student enrolled successfully:",
            courseName
        );


        /* ================================================
           SUCCESS STATE
        ================================================= */

        button.innerHTML =
            '<i class="fa-solid fa-circle-check"></i>' +
            ' Enrolled';


        button.classList.remove(
            "enrolling"
        );

        button.classList.add(
            "enrolled"
        );


        /* ================================================
           DASHBOARD REDIRECT
        ================================================= */

        setTimeout(() => {

            window.location.href =
                "../student/dashboard.html";

        }, 700);


    } catch (error) {

        console.error(
            "Course enrollment error:",
            error
        );


        /* Restore button */

        button.disabled = false;

        button.classList.remove(
            "enrolling"
        );


        button.innerHTML =
            originalButtonHTML;


        alert(
            "We couldn't enroll you in this course. Please try again."
        );

    }

}

