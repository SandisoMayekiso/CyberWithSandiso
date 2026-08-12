/* =========================================================
   CWS ACADEMY
   Student Courses
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const searchInput =
        document.getElementById("courseSearch");

    const filterButtons =
        document.querySelectorAll(".course-filter");

    const courseCards =
        document.querySelectorAll(".student-course-card");

    const courseCount =
        document.getElementById("courseCount");

    const noCoursesMessage =
        document.getElementById("noCoursesMessage");


    let currentFilter = "all";


    console.log(
        "CWS Academy student courses loaded."
    );


    /* =====================================================
       FILTER COURSES
    ====================================================== */

    function filterCourses() {

        const searchTerm =
            searchInput?.value
                ?.trim()
                ?.toLowerCase() || "";


        let visibleCourses = 0;


        courseCards.forEach(card => {

            const courseName =
                card.dataset.course
                    ?.toLowerCase() || "";


            const courseStatus =
                card.dataset.status || "";


            const matchesSearch =
                courseName.includes(searchTerm);


            const matchesFilter =
                currentFilter === "all" ||
                courseStatus === currentFilter;


            if (
                matchesSearch &&
                matchesFilter
            ) {

                card.classList.remove(
                    "hidden"
                );

                visibleCourses++;

            } else {

                card.classList.add(
                    "hidden"
                );

            }

        });


        /* =================================================
           COURSE COUNT
        ================================================== */

        if (courseCount) {

            courseCount.textContent =
                `${visibleCourses} ${
                    visibleCourses === 1
                        ? "Course"
                        : "Courses"
                }`;

        }


        /* =================================================
           NO RESULTS
        ================================================== */

        if (noCoursesMessage) {

            noCoursesMessage.hidden =
                visibleCourses !== 0;

        }

    }


    /* =====================================================
       SEARCH
    ====================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterCourses
        );

    }


    /* =====================================================
       FILTER BUTTONS
    ====================================================== */

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


    /* =====================================================
       INITIAL DISPLAY
    ====================================================== */

    filterCourses();

});
