/* =========================================================
   CWS ACADEMY
   LABORATORY PAGE
   Authentication + Filtering + Search + Modal
========================================================= */

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

import {
    auth
} from "./firebase-config.js";


/* =========================================================
   DEBUG
========================================================= */

console.log("CWS Academy labs.js loaded");


/* =========================================================
   ELEMENTS
========================================================= */

const labsGrid =
    document.getElementById("labsGrid");

const labSearch =
    document.getElementById("labSearch");

const labFilters =
    document.querySelectorAll(".lab-filter");

const labCards =
    document.querySelectorAll(".lab-card");

const noLabsMessage =
    document.getElementById("noLabsMessage");

const studentName =
    document.getElementById("studentName");

const logoutBtn =
    document.getElementById("logoutBtn");

const sidebarToggle =
    document.getElementById("sidebarToggle");

const studentSidebar =
    document.getElementById("studentSidebar");


/* Modal */

const labModal =
    document.getElementById("labModal");

const closeLabModal =
    document.getElementById("closeLabModal");

const labModalTitle =
    document.getElementById("labModalTitle");

const labModalDescription =
    document.getElementById("labModalDescription");

const labModalLevel =
    document.getElementById("labModalLevel");

const labModalDuration =
    document.getElementById("labModalDuration");

const launchLabBtn =
    document.getElementById("launchLabBtn");


/* =========================================================
   CURRENT FILTER
========================================================= */

let currentFilter = "all";

let selectedLab = null;


/* =========================================================
   LAB INFORMATION
========================================================= */

const labs = {

    "network-recon": {

        title: "Network Reconnaissance",

        description:
            "Learn the fundamentals of network discovery and host identification in a controlled laboratory environment.",

        level: "Beginner",

        duration: "30 min"

    },


    "linux-security": {

        title: "Linux Security Fundamentals",

        description:
            "Practice Linux command-line fundamentals, permissions, filesystems and basic security operations.",

        level: "Beginner",

        duration: "35 min"

    },


    "web-security": {

        title: "Web Security Fundamentals",

        description:
            "Explore HTTP communication, authentication, sessions and common web security concepts in a controlled environment.",

        level: "Intermediate",

        duration: "45 min"

    },


    "service-enumeration": {

        title: "Service Enumeration",

        description:
            "Learn how security professionals identify services and understand the information exposed by a target system.",

        level: "Intermediate",

        duration: "45 min"

    }

};


/* =========================================================
   AUTHENTICATION GUARD
========================================================= */

onAuthStateChanged(auth, (user) => {

    console.log(
        "Labs authentication state:",
        user
            ? `Authenticated (${user.uid})`
            : "Not authenticated"
    );


    if (!user) {

        /*
         * The user attempted to access a protected page
         * without being authenticated.
         */

        window.location.replace(
            "../pages/login.html?redirect=labs"
        );

        return;
    }


    /*
     * User is authenticated.
     * Populate their display name.
     */

    if (studentName) {

        const displayName =
            user.displayName ||
            user.email ||
            "Student";

        studentName.textContent =
            displayName;

    }

});


/* =========================================================
   FILTER LABS
========================================================= */

function filterLabs() {

    const searchTerm =
        (labSearch?.value || "")
            .trim()
            .toLowerCase();


    let visibleCount = 0;


    labCards.forEach(card => {

        const level =
            card.dataset.level || "";

        const searchableText =
            card.dataset.search || "";


        const matchesFilter =
            currentFilter === "all" ||
            level === currentFilter;


        const matchesSearch =
            !searchTerm ||
            searchableText
                .toLowerCase()
                .includes(searchTerm);


        const shouldShow =
            matchesFilter &&
            matchesSearch;


        if (shouldShow) {

            card.classList.remove("hidden");

            visibleCount++;

        } else {

            card.classList.add("hidden");

        }

    });


    if (noLabsMessage) {

        noLabsMessage.hidden =
            visibleCount !== 0;

    }

}


/* =========================================================
   FILTER BUTTONS
========================================================= */

labFilters.forEach(button => {

    button.addEventListener("click", () => {

        currentFilter =
            button.dataset.filter || "all";


        labFilters.forEach(item => {

            item.classList.remove("active");

        });


        button.classList.add("active");


        filterLabs();

    });

});


/* =========================================================
   SEARCH
========================================================= */

if (labSearch) {

    labSearch.addEventListener(
        "input",
        filterLabs
    );

}


/* =========================================================
   OPEN LAB MODAL
========================================================= */

function openLabModal(labId) {

    const lab =
        labs[labId];


    if (!lab) {

        console.warn(
            "Unknown lab:",
            labId
        );

        return;
    }


    selectedLab =
        labId;


    if (labModalTitle) {

        labModalTitle.textContent =
            lab.title;

    }


    if (labModalDescription) {

        labModalDescription.textContent =
            lab.description;

    }


    if (labModalLevel) {

        labModalLevel.textContent =
            lab.level;

    }


    if (labModalDuration) {

        labModalDuration.textContent =
            lab.duration;

    }


    if (labModal) {

        labModal.hidden = false;

        labModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "modal-open"
        );

    }

}


/* =========================================================
   CLOSE LAB MODAL
========================================================= */

function closeModal() {

    if (!labModal) {
        return;
    }


    labModal.hidden = true;

    labModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "modal-open"
    );


    selectedLab = null;

}


/* =========================================================
   LAB BUTTONS
========================================================= */

document
    .querySelectorAll(".lab-start-btn:not(.disabled)")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const labId =
                    button.dataset.lab;


                openLabModal(labId);

            }
        );

    });


/* =========================================================
   CLOSE BUTTON
========================================================= */

if (closeLabModal) {

    closeLabModal.addEventListener(
        "click",
        closeModal
    );

}


/* =========================================================
   CLOSE BY CLICKING OVERLAY
========================================================= */

document
    .querySelectorAll("[data-close-modal]")
    .forEach(element => {

        element.addEventListener(
            "click",
            closeModal
        );

    });


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            labModal &&
            !labModal.hidden
        ) {

            closeModal();

        }

    }
);


/* =========================================================
   ENTER LAB
========================================================= */

if (launchLabBtn) {

    launchLabBtn.addEventListener(
        "click",
        () => {

            if (!selectedLab) {
                return;
            }


            /*
             * For now the lab interface isn't built yet.
             *
             * We deliberately do NOT redirect to a nonexistent
             * page. This can later become:
             *
             * student/lab.html?lab=network-recon
             */

            alert(
                "This laboratory is being prepared. The practical lab environment will be connected here next."
            );

        }
    );

}


/* =========================================================
   LOGOUT
========================================================= */

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        async () => {

            try {

                logoutBtn.disabled =
                    true;

                logoutBtn.textContent =
                    "Signing out...";


                await signOut(auth);


                /*
                 * Auth state listener will also
                 * protect the page.
                 */

                window.location.replace(
                    "../pages/login.html"
                );


            } catch (error) {

                console.error(
                    "CWS Academy logout error:",
                    error
                );


                logoutBtn.disabled =
                    false;

                logoutBtn.innerHTML =
                    '<i class="fa-solid fa-right-from-bracket"></i>' +
                    '<span>Sign Out</span>';

            }

        }
    );

}


/* =========================================================
   MOBILE SIDEBAR
========================================================= */

if (
    sidebarToggle &&
    studentSidebar
) {

    sidebarToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                studentSidebar.classList.toggle(
                    "open"
                );


            sidebarToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        }
    );

}


/* =========================================================
   CLOSE MOBILE SIDEBAR AFTER NAVIGATION
========================================================= */

document
    .querySelectorAll(".student-nav-link")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                if (studentSidebar) {

                    studentSidebar.classList.remove(
                        "open"
                    );

                }

            }
        );

    });


/* =========================================================
   INITIAL FILTER
========================================================= */

filterLabs();


/* =========================================================
   COMPLETE
========================================================= */

console.log(
    "CWS Academy labs.js initialization complete."
);
