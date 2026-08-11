/* =========================================================
   CWS ACADEMY
   Contact Form
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const form =
        document.getElementById("contactForm");

    const status =
        document.getElementById("contactFormStatus");


    if (!form || !status) {
        return;
    }


    form.addEventListener("submit", (event) => {

        event.preventDefault();


        const name =
            document.getElementById("contactName").value.trim();

        const email =
            document.getElementById("contactEmail").value.trim();

        const subject =
            document.getElementById("contactSubject").value;

        const message =
            document.getElementById("contactMessage").value.trim();

        const consent =
            document.getElementById("contactConsent").checked;


        status.className =
            "contact-form-status";


        /* ================================================
           VALIDATION
        ================================================= */

        if (!name || !email || !subject || !message) {

            status.textContent =
                "Please complete all required fields.";

            status.classList.add("error");

            return;
        }


        if (!consent) {

            status.textContent =
                "Please accept the information-use notice.";

            status.classList.add("error");

            return;
        }


        /* ================================================
           EMAIL VALIDATION
        ================================================= */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email)) {

            status.textContent =
                "Please enter a valid email address.";

            status.classList.add("error");

            return;
        }


        /* ================================================
           TEMPORARY FRONTEND RESPONSE
        ================================================= */

        status.textContent =
            "Your message is ready to be submitted. Message delivery will be connected soon.";

        status.classList.add("success");


        /*
         * IMPORTANT:
         *
         * We intentionally do NOT say
         * "Message sent" because there is currently
         * no backend or email service connected.
         *
         * Later this form can be connected to:
         *
         * - Netlify Forms
         * - Firebase
         * - A secure serverless function
         * - Another email/contact service
         *
         */


        form.reset();

    });

});