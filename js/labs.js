/* =========================================================
   CWS ACADEMY
   Student Labs Controller
========================================================= */

console.log(
    "CWS Academy labs.js loaded"
);


/* =========================================================
   LAB CARDS
========================================================= */

const labCards =
    document.querySelectorAll(".lab-card");


console.log(
    `CWS Academy: ${labCards.length} lab cards loaded.`
);


/* =========================================================
   LAB BUTTONS
========================================================= */

const labButtons =
    document.querySelectorAll(".lab-start-btn");


labButtons.forEach((button) => {

    button.addEventListener("click", () => {

        console.log(
            "CWS Academy: Lab selected."
        );

    });

});
