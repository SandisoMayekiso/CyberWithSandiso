/* =========================================================
   CWS ACADEMY
   Student Assessments Controller
========================================================= */

console.log(
    "CWS Academy assessments.js loaded"
);


/* =========================================================
   ASSESSMENT CARDS
========================================================= */

const assessmentCards =
    document.querySelectorAll(".assessment-card");


console.log(
    `CWS Academy: ${assessmentCards.length} assessment cards loaded.`
);


/* =========================================================
   ASSESSMENT BUTTONS
========================================================= */

const assessmentButtons =
    document.querySelectorAll(".assessment-btn");


assessmentButtons.forEach((button) => {

    button.addEventListener("click", () => {

        console.log(
            "CWS Academy: Assessment selected."
        );

    });

});
