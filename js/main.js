/* =========================================================
   CWS ACADEMY
   Main JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            navLinks.classList.toggle("active");

            const isOpen =
                navLinks.classList.contains("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

        });

    }


    /* =====================================================
       CLOSE MOBILE MENU WHEN LINK IS CLICKED
    ===================================================== */

    if (navLinks) {

        const links =
            navLinks.querySelectorAll("a");

        links.forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");

                if (menuToggle) {
                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }

            });

        });

    }


    /* =====================================================
       CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener("click", event => {

        if (
            navLinks &&
            menuToggle &&
            navLinks.classList.contains("active") &&
            !navLinks.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            navLinks.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });


    /* =====================================================
       CURRENT PAGE NAVIGATION
    ===================================================== */

    const currentPage =
        window.location.pathname.split("/").pop()
        || "index.html";

    const navItems =
        document.querySelectorAll(".nav-links a");

    navItems.forEach(link => {

        const linkPage =
            link.getAttribute("href")
                ?.split("/")
                .pop();

        if (linkPage === currentPage) {

            link.classList.add("active");

        }

    });


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    internalLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetID =
                link.getAttribute("href");

            if (
                !targetID ||
                targetID === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetID);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =====================================================
       YEAR
       Automatically updates footer year
    ===================================================== */

    const yearElements =
        document.querySelectorAll("[data-year]");

    const currentYear =
        new Date().getFullYear();

    yearElements.forEach(element => {

        element.textContent =
            currentYear;

    });


    /* =====================================================
       HERO BUTTON / CTA FEEDBACK
    ===================================================== */

    const buttons =
        document.querySelectorAll(".btn-primary");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            button.classList.add("clicked");

            setTimeout(() => {

                button.classList.remove("clicked");

            }, 300);

        });

    });


    /* =====================================================
       ACADEMY INITIALIZATION
    ===================================================== */

    console.log(
        "CWS Academy initialized successfully."
    );

});