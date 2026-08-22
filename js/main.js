/* =========================================================
   CWS ACADEMY
   Main JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       CWS ECOSYSTEM LINKS
       Adds CWS CodeLab to the main navigation
    ===================================================== */

    const CWS_CODELAB_URL =
        "https://sandisomayekiso.github.io/CWS-CodeLab/";

    const navLinks =
        document.querySelector(".nav-links");


    if (navLinks) {

        /*
         * Prevent duplicate CodeLab links if one
         * has already been added manually.
         */
        const existingCodeLabLink =
            navLinks.querySelector(
                'a[href="https://sandisomayekiso.github.io/CWS-CodeLab/"]'
            );


        if (!existingCodeLabLink) {

            const codeLabItem =
                document.createElement("li");

            codeLabItem.classList.add(
                "cws-codelab-nav-item"
            );


            const codeLabLink =
                document.createElement("a");


            codeLabLink.href =
                CWS_CODELAB_URL;

            codeLabLink.classList.add(
                "cws-codelab-nav-link"
            );


            /*
             * Opens CodeLab in the same tab so the two
             * platforms feel like one CWS ecosystem.
             */
            codeLabLink.innerHTML = `
                <i class="fa-solid fa-code"></i>
                CWS CodeLab
            `;


            codeLabLink.setAttribute(
                "aria-label",
                "Visit CWS CodeLab"
            );


            codeLabItem.appendChild(
                codeLabLink
            );


            /*
             * Insert CodeLab before the About link.
             *
             * Current order becomes approximately:
             *
             * Home
             * Courses
             * Free vs Pro
             * Verify Credential
             * Labs
             * Assessments
             * CWS CodeLab
             * About
             * Contact
             */

            const aboutLink =
                Array.from(
                    navLinks.querySelectorAll("a")
                ).find(link => {

                    const href =
                        link.getAttribute("href") || "";

                    return href.endsWith(
                        "about.html"
                    );

                });


            if (
                aboutLink &&
                aboutLink.parentElement
            ) {

                navLinks.insertBefore(
                    codeLabItem,
                    aboutLink.parentElement
                );

            } else {

                /*
                 * Fallback:
                 * If an About link is not present,
                 * simply place CodeLab at the end.
                 */

                navLinks.appendChild(
                    codeLabItem
                );

            }

        }

    }


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuToggle =
        document.getElementById(
            "menuToggle"
        );


    if (
        menuToggle &&
        navLinks
    ) {

        menuToggle.addEventListener(
            "click",
            () => {

                navLinks.classList.toggle(
                    "active"
                );


                const isOpen =
                    navLinks.classList.contains(
                        "active"
                    );


                menuToggle.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );


                menuToggle.setAttribute(
                    "aria-label",
                    isOpen
                        ? "Close navigation menu"
                        : "Open navigation menu"
                );

            }
        );

    }


    /* =====================================================
       CLOSE MOBILE MENU WHEN LINK IS CLICKED
    ===================================================== */

    if (navLinks) {

        const links =
            navLinks.querySelectorAll(
                "a"
            );


        links.forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    navLinks.classList.remove(
                        "active"
                    );


                    if (menuToggle) {

                        menuToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );


                        menuToggle.setAttribute(
                            "aria-label",
                            "Open navigation menu"
                        );

                    }

                }
            );

        });

    }


    /* =====================================================
       CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener(
        "click",
        event => {

            if (
                navLinks &&
                menuToggle &&
                navLinks.classList.contains(
                    "active"
                ) &&
                !navLinks.contains(
                    event.target
                ) &&
                !menuToggle.contains(
                    event.target
                )
            ) {

                navLinks.classList.remove(
                    "active"
                );


                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );


                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            }

        }
    );


    /* =====================================================
       CLOSE MOBILE MENU WITH ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                navLinks &&
                menuToggle &&
                navLinks.classList.contains(
                    "active"
                )
            ) {

                navLinks.classList.remove(
                    "active"
                );


                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );


                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );


                menuToggle.focus();

            }

        }
    );


    /* =====================================================
       CURRENT PAGE NAVIGATION
    ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
        || "index.html";


    const navItems =
        document.querySelectorAll(
            ".nav-links a"
        );


    navItems.forEach(link => {

        /*
         * Do not mark links to external CWS
         * platforms as current-page links.
         */

        try {

            const linkURL =
                new URL(
                    link.href,
                    window.location.href
                );


            if (
                linkURL.origin !==
                window.location.origin
            ) {

                return;

            }

        } catch (error) {

            /*
             * Invalid URL:
             * safely skip current-page matching.
             */

            return;

        }


        const linkPage =
            link.getAttribute("href")
                ?.split("#")[0]
                ?.split("?")[0]
                ?.split("/")
                .pop();


        if (
            linkPage === currentPage
        ) {

            link.classList.add(
                "active"
            );


            link.setAttribute(
                "aria-current",
                "page"
            );

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

        link.addEventListener(
            "click",
            event => {

                const targetID =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !targetID ||
                    targetID === "#"
                ) {

                    return;

                }


                /*
                 * CSS.escape protects against unusual
                 * characters in element IDs.
                 */

                let target = null;


                try {

                    target =
                        document.querySelector(
                            targetID
                        );

                } catch (error) {

                    return;

                }


                if (target) {

                    event.preventDefault();


                    target.scrollIntoView({

                        behavior:
                            "smooth",

                        block:
                            "start"

                    });

                }

            }
        );

    });


    /* =====================================================
       YEAR
       Automatically updates footer year
    ===================================================== */

    const yearElements =
        document.querySelectorAll(
            "[data-year]"
        );


    const currentYear =
        new Date()
            .getFullYear();


    yearElements.forEach(
        element => {

            element.textContent =
                currentYear;

        }
    );


    /* =====================================================
       HERO BUTTON / CTA FEEDBACK
    ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".btn-primary"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                button.classList.add(
                    "clicked"
                );


                setTimeout(
                    () => {

                        button.classList.remove(
                            "clicked"
                        );

                    },
                    300
                );

            }
        );

    });


    /* =====================================================
       EXTERNAL CWS PLATFORM LINK SAFETY
    ===================================================== */

    const cwsPlatformLinks =
        document.querySelectorAll(
            ".cws-codelab-nav-link"
        );


    cwsPlatformLinks.forEach(link => {

        /*
         * Keep the destination explicit.
         * No sensitive data, authentication tokens,
         * Firebase credentials, or query information
         * should ever be added to this URL.
         */

        link.setAttribute(
            "referrerpolicy",
            "strict-origin-when-cross-origin"
        );

    });


    /* =====================================================
       CWS ACADEMY INITIALIZATION
    ===================================================== */

    console.log(
        "CWS Academy initialized successfully."
    );


    console.log(
        "CWS ecosystem link: CWS CodeLab enabled."
    );

});
