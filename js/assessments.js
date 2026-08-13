/* =========================================================
   CWS ACADEMY
   ASSESSMENTS CONTROLLER
========================================================= */


/* =========================================================
   ASSESSMENT DATA
========================================================= */

const ASSESSMENTS = [

    /*
     * These are intentionally empty.
     *
     * Firebase will eventually populate this array.
     *
     * Example:
     *
     * {
     *     id: "cybersecurity-101-final",
     *     title: "Cybersecurity Fundamentals Assessment",
     *     description: "...",
     *     course: "Cybersecurity Fundamentals",
     *     questions: 25,
     *     duration: 30,
     *     passMark: 70,
     *     available: true
     * }
     */

];


/* =========================================================
   RESULTS DATA
========================================================= */

const ASSESSMENT_RESULTS = [

    /*
     * Firebase will eventually populate this.
     *
     * Example:
     *
     * {
     *     id: "result-001",
     *     assessmentId: "cybersecurity-101-final",
     *     title: "Cybersecurity Fundamentals Assessment",
     *     score: 86,
     *     passMark: 70,
     *     completedAt: "2026-08-10T10:30:00Z"
     * }
     */

];



/* =========================================================
   SAFE NUMBER
========================================================= */

function safeNumber(value) {

    const number =
        Number(value);


    if (!Number.isFinite(number)) {

        return 0;

    }


    return number;

}



/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(dateValue) {

    if (!dateValue) {

        return "Date unavailable";

    }


    const date =
        new Date(dateValue);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "Date unavailable";

    }


    return date.toLocaleDateString(
        undefined,
        {
            year: "numeric",
            month: "short",
            day: "numeric"
        }
    );

}



/* =========================================================
   CALCULATE AVERAGE
========================================================= */

function calculateAverageScore() {

    if (!ASSESSMENT_RESULTS.length) {

        return 0;

    }


    const total =
        ASSESSMENT_RESULTS.reduce(
            (
                sum,
                result
            ) => {

                return sum +
                    safeNumber(
                        result.score
                    );

            },
            0
        );


    return Math.round(
        total /
        ASSESSMENT_RESULTS.length
    );

}



/* =========================================================
   CALCULATE PASSED
========================================================= */

function calculatePassedAssessments() {

    return ASSESSMENT_RESULTS.filter(
        result => {

            const score =
                safeNumber(
                    result.score
                );


            const passMark =
                safeNumber(
                    result.passMark || 70
                );


            return score >= passMark;

        }
    ).length;

}



/* =========================================================
   UPDATE STATISTICS
========================================================= */

function updateAssessmentStatistics() {

    const available =
        ASSESSMENTS.filter(
            assessment =>
                assessment.available !== false
        ).length;


    const completed =
        ASSESSMENT_RESULTS.length;


    const average =
        calculateAverageScore();


    const passed =
        calculatePassedAssessments();


    const availableElement =
        document.getElementById(
            "availableAssessments"
        );


    const completedElement =
        document.getElementById(
            "completedAssessments"
        );


    const averageElement =
        document.getElementById(
            "averageScore"
        );


    const passedElement =
        document.getElementById(
            "passedAssessments"
        );


    if (availableElement) {

        availableElement.textContent =
            available;

    }


    if (completedElement) {

        completedElement.textContent =
            completed;

    }


    if (averageElement) {

        averageElement.textContent =
            `${average}%`;

    }


    if (passedElement) {

        passedElement.textContent =
            passed;

    }

}



/* =========================================================
   CREATE ASSESSMENT CARD
========================================================= */

function createAssessmentCard(
    assessment
) {

    const card =
        document.createElement("article");


    card.className =
        "assessment-card";


    const isCompleted =
        ASSESSMENT_RESULTS.some(
            result =>
                result.assessmentId ===
                assessment.id
        );


    const result =
        ASSESSMENT_RESULTS.find(
            item =>
                item.assessmentId ===
                assessment.id
        );


    const score =
        result
            ? safeNumber(result.score)
            : null;


    card.innerHTML = `

        <div class="assessment-card-header">

            <div class="assessment-card-icon">

                <i class="fa-solid ${
                    assessment.icon ||
                    "fa-clipboard-check"
                }"></i>

            </div>


            <span
                class="assessment-status ${
                    isCompleted
                        ? "completed"
                        : ""
                }"
            >

                ${
                    isCompleted
                        ? "Completed"
                        : "Available"
                }

            </span>

        </div>


        <div class="assessment-card-content">

            <h3>
                ${assessment.title}
            </h3>


            <p>
                ${assessment.description}
            </p>


            <div class="assessment-meta">

                <div class="assessment-meta-item">

                    <span>
                        QUESTIONS
                    </span>

                    <strong>
                        ${
                            assessment.questions ||
                            0
                        }
                    </strong>

                </div>


                <div class="assessment-meta-item">

                    <span>
                        DURATION
                    </span>

                    <strong>
                        ${
                            assessment.duration ||
                            0
                        } min
                    </strong>

                </div>


                <div class="assessment-meta-item">

                    <span>
                        PASS MARK
                    </span>

                    <strong>
                        ${
                            assessment.passMark ||
                            70
                        }%
                    </strong>

                </div>


                <div class="assessment-meta-item">

                    <span>
                        COURSE
                    </span>

                    <strong>
                        ${
                            assessment.course ||
                            "CWS Academy"
                        }
                    </strong>

                </div>

            </div>

        </div>


        <div class="assessment-card-footer">

            ${
                result
                    ? `
                        <span class="assessment-score">

                            Score:

                            <strong>
                                ${score}%
                            </strong>

                        </span>
                    `
                    : `
                        <span class="assessment-score">

                            Ready when you are.

                        </span>
                    `
            }


            <button
                type="button"
                class="assessment-start-btn ${
                    assessment.available === false
                        ? "disabled"
                        : ""
                }"
                data-assessment-id="${assessment.id}"
                ${
                    assessment.available === false
                        ? "disabled"
                        : ""
                }
            >

                ${
                    isCompleted
                        ? "Retake"
                        : "Start Assessment"
                }

                <i class="fa-solid fa-arrow-right"></i>

            </button>

        </div>

    `;


    return card;

}



/* =========================================================
   RENDER ASSESSMENTS
========================================================= */

function renderAssessments() {

    const container =
        document.getElementById(
            "assessmentsGrid"
        );


    const emptyState =
        document.getElementById(
            "noAssessments"
        );


    const count =
        document.getElementById(
            "assessmentCount"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    const available =
        ASSESSMENTS.filter(
            assessment =>
                assessment.available !== false
        );


    if (count) {

        count.textContent =
            `${available.length} Available`;

    }


    if (!available.length) {

        if (emptyState) {

            emptyState.hidden =
                false;

        }

        return;

    }


    if (emptyState) {

        emptyState.hidden =
            true;

    }


    available.forEach(
        assessment => {

            container.appendChild(
                createAssessmentCard(
                    assessment
                )
            );

        }
    );

}



/* =========================================================
   CREATE RESULT ROW
========================================================= */

function createResultRow(result) {

    const row =
        document.createElement("article");


    row.className =
        "assessment-result-row";


    const score =
        safeNumber(
            result.score
        );


    const passMark =
        safeNumber(
            result.passMark || 70
        );


    const passed =
        score >= passMark;


    row.innerHTML = `

        <div class="assessment-result-title">

            <div class="assessment-result-icon">

                <i class="fa-solid fa-clipboard-check"></i>

            </div>


            <div>

                <strong>
                    ${
                        result.title ||
                        "Assessment"
                    }
                </strong>

                <small>
                    Pass mark:
                    ${passMark}%
                </small>

            </div>

        </div>


        <div
            class="assessment-result-score ${
                passed
                    ? "pass"
                    : "fail"
            }"
        >

            ${score}%

        </div>


        <span
            class="assessment-result-status ${
                passed
                    ? ""
                    : "fail"
            }"
        >

            ${
                passed
                    ? "PASSED"
                    : "REVIEW"
            }

        </span>


        <span class="assessment-result-date">

            ${
                formatDate(
                    result.completedAt
                )
            }

        </span>

    `;


    return row;

}



/* =========================================================
   RENDER RESULTS
========================================================= */

function renderResults() {

    const container =
        document.getElementById(
            "resultsContainer"
        );


    const emptyState =
        document.getElementById(
            "noResults"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    if (!ASSESSMENT_RESULTS.length) {

        if (emptyState) {

            emptyState.hidden =
                false;

        }

        return;

    }


    if (emptyState) {

        emptyState.hidden =
            true;

    }


    const sortedResults =
        [...ASSESSMENT_RESULTS].sort(
            (
                first,
                second
            ) => {

                return (
                    new Date(
                        second.completedAt
                    ) -
                    new Date(
                        first.completedAt
                    )
                );

            }
        );


    sortedResults.forEach(
        result => {

            container.appendChild(
                createResultRow(
                    result
                )
            );

        }
    );

}



/* =========================================================
   ASSESSMENT ACTION
========================================================= */

function startAssessment(
    assessmentId
) {

    const assessment =
        ASSESSMENTS.find(
            item =>
                item.id ===
                assessmentId
        );


    if (!assessment) {

        return;

    }


    /*
     * IMPORTANT:
     *
     * We are not automatically sending
     * the student anywhere yet.
     *
     * Once the actual assessment engine
     * is ready, this function can become:
     *
     * window.location.href =
     *     `assessment.html?id=${assessmentId}`;
     */


    console.log(
        "Starting assessment:",
        assessment
    );

}



/* =========================================================
   CLICK HANDLER
========================================================= */

function setupAssessmentActions() {

    document.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    "[data-assessment-id]"
                );


            if (!button) {

                return;

            }


            if (
                button.disabled
            ) {

                return;

            }


            const assessmentId =
                button.dataset.assessmentId;


            startAssessment(
                assessmentId
            );

        }
    );

}



/* =========================================================
   INITIALISE
========================================================= */

function initialiseAssessmentsPage() {

    updateAssessmentStatistics();

    renderAssessments();

    renderResults();

    setupAssessmentActions();

}


document.addEventListener(
    "DOMContentLoaded",
    initialiseAssessmentsPage
);
