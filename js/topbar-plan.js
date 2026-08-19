/* =========================================================
   CWS ACADEMY
   SHARED TOP-BAR PLAN BADGE
========================================================= */

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";


import {
    auth
} from "./firebase-config.js";


import {
    getUserEntitlement
} from "./access-control.js";


const planBadge =
    document.getElementById(
        "studentPlanBadge"
    );


const profileChip =
    document.querySelector(
        ".student-profile-chip"
    );


function renderPlanBadge(
    entitlement = null
) {

    if (!planBadge) {
        return;
    }


    const plan =
        String(
            entitlement?.plan ||
            "free"
        )
            .trim()
            .toLowerCase();


    const status =
        String(
            entitlement?.status ||
            "active"
        )
            .trim()
            .toLowerCase();


    const proActive =
        plan === "pro" &&
        (
            status === "active" ||
            status === "trialing"
        );


    planBadge.textContent =
        proActive
            ? "PRO"
            : "FREE";


    planBadge.className =
        `student-plan-badge ${
            proActive
                ? "pro"
                : "free"
        }`;


    planBadge.title =
        proActive
            ? "CWS Academy Pro"
            : "CWS Academy Free";


    if (profileChip) {

        profileChip.classList.toggle(
            "is-pro",
            proActive
        );


        profileChip.classList.toggle(
            "is-free",
            !proActive
        );

    }

}


if (planBadge) {

    renderPlanBadge();


    if (auth) {

        onAuthStateChanged(
            auth,
            async user => {

                if (!user) {

                    renderPlanBadge();

                    return;

                }


                try {

                    const entitlement =
                        await getUserEntitlement(
                            user
                        );


                    renderPlanBadge(
                        entitlement
                    );


                } catch (err) {

                    console.error(
                        "[CWS Topbar] Unable to read entitlement:",
                        err
                    );


                    renderPlanBadge();

                }

            }
        );

    }

}
