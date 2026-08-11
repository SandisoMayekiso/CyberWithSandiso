/* =========================================================
   CWS ACADEMY
   Student Dashboard Controller
========================================================= */

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

import {
    doc,
    getDoc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

import {
    auth,
    db
} from "./firebase-config.js";


/* =========================================================
   ELEMENTS
========================================================= */

const dashboardUserName =
    document.getElementById("dashboardUserName");

const dashboardUserEmail =
    document.getElementById("dashboardUserEmail");

const welcomeStudentName =
    document.getElementById("welcomeStudentName");

const profileName =
    document.getElementById("profileName");

const profileEmail =
    document.getElementById("profileEmail");

const profileProvider =
    document.getElementById("profileProvider");

const enrolledCourses =
    document.getElementById("enrolledCourses");

const completedLabs =
    document.getElementById("completedLabs");

const completedAssessments =
    document.getElementById("completedAssessments");

const achievementCount =
    document.getElementById("achievementCount");

const dashboardLogoutBtn =
    document.getElementById("dashboardLogoutBtn");

const dashboardMenuBtn =
    document.getElementById("dashboardMenuBtn");

const dashboardSidebar =
    document.getElementById("dashboardSidebar");


/* =========================================================
   PROVIDER
========================================================= */

function getProviderName(user) {

    if (!user || !user.providerData) {
        return "Unknown";
    }

    const providers =
        user.providerData.map(
            provider => provider.providerId
        );

    if (providers.includes("google.com")) {
        return "Google";
    }

    if (providers.includes("github.com")) {
        return "GitHub";
    }

    if (providers.includes("password")) {
        return "Email / Password";
    }

    return providers[0] || "Unknown";
}


/* =========================================================
   STUDENT NAME
========================================================= */

function getStudentName(user) {

    if (user.displayName) {
        return user.displayName;
    }

    if (user.email) {

        return user.email
            .split("@")[0]
            .replace(/[._-]/g, " ");

    }

    return "Student";
}


/* =========================================================
   CREATE / LOAD FIRESTORE PROFILE
========================================================= */

async function loadStudentProfile(user) {

    const studentRef =
        doc(
            db,
            "students",
            user.uid
        );

    try {

        const studentSnapshot =
            await getDoc(studentRef);


        if (!studentSnapshot.exists()) {

            const studentName =
                getStudentName(user);

            const provider =
                getProviderName(user);


            const newStudentProfile = {

                uid: user.uid,

                name: studentName,

                email: user.email || "",

                provider: provider,

                enrolledCourses: [],

                completedLabs: [],

                completedAssessments: [],

                achievements: [],

                createdAt: serverTimestamp(),

                updatedAt: serverTimestamp()

            };


            await setDoc(
                studentRef,
                newStudentProfile
            );


            console.log(
                "CWS Academy student profile created."
            );


            updateDashboard(
                newStudentProfile
            );


            return;

        }


        const studentData =
            studentSnapshot.data();


        updateDashboard(
            studentData
        );


    } catch (error) {

        console.error(
            "Unable to load student profile:",
            error
        );

    }

}


/* =========================================================
   UPDATE DASHBOARD
========================================================= */

function updateDashboard(data) {

    const name =
        data.name || "Student";

    const email =
        data.email || "No email available";

    const provider =
        data.provider || "Unknown";

    const courses =
        Array.isArray(data.enrolledCourses)
            ? data.enrolledCourses
            : [];

    const labs =
        Array.isArray(data.completedLabs)
            ? data.completedLabs
            : [];

    const assessments =
        Array.isArray(data.completedAssessments)
            ? data.completedAssessments
            : [];

    const achievements =
        Array.isArray(data.achievements)
            ? data.achievements
            : [];


    /* Header */

    if (dashboardUserName) {

        dashboardUserName.textContent =
            name;

    }


    if (dashboardUserEmail) {

        dashboardUserEmail.textContent =
            email;

    }


    /* Welcome */

    if (welcomeStudentName) {

        welcomeStudentName.textContent =
            name;

    }


    /* Profile */

    if (profileName) {

        profileName.textContent =
            name;

    }


    if (profileEmail) {

        profileEmail.textContent =
            email;

    }


    if (profileProvider) {

        profileProvider.textContent =
            provider;

    }


    /* Statistics */

    if (enrolledCourses) {

        enrolledCourses.textContent =
            courses.length;

    }


    if (completedLabs) {

        completedLabs.textContent =
            labs.length;

    }


    if (completedAssessments) {

        completedAssessments.textContent =
            assessments.length;

    }


    if (achievementCount) {

        achievementCount.textContent =
            achievements.length;

    }

}


/* =========================================================
   AUTHENTICATION
========================================================= */

onAuthStateChanged(
    auth,
    async (user) => {

        if (!user) {

            console.log(
                "No authenticated student."
            );


            window.location.replace(
                "../pages/login.html?redirect=dashboard"
            );


            return;

        }


        console.log(
            "Authenticated student:",
            user.email
        );


        await loadStudentProfile(user);

    }
);


/* =========================================================
   LOGOUT
========================================================= */

if (dashboardLogoutBtn) {

    dashboardLogoutBtn.addEventListener(
        "click",
        async () => {

            try {

                dashboardLogoutBtn.disabled =
                    true;


                dashboardLogoutBtn.innerHTML =
                    '<i class="fa-solid fa-spinner fa-spin"></i>' +
                    '<span>Signing out...</span>';


                await signOut(auth);


                window.location.replace(
                    "../index.html"
                );


            } catch (error) {

                console.error(
                    "Logout failed:",
                    error
                );


                dashboardLogoutBtn.disabled =
                    false;


                dashboardLogoutBtn.innerHTML =
                    '<i class="fa-solid fa-right-from-bracket"></i>' +
                    '<span>Logout</span>';


                alert(
                    "Unable to sign out. Please try again."
                );

            }

        }
    );

}


/* =========================================================
   MOBILE SIDEBAR
========================================================= */

if (
    dashboardMenuBtn &&
    dashboardSidebar
) {

    dashboardMenuBtn.addEventListener(
        "click",
        () => {

            dashboardSidebar.classList.toggle(
                "sidebar-open"
            );

        }
    );

}


/* =========================================================
   CLOSE SIDEBAR AFTER NAVIGATION
========================================================= */

if (dashboardSidebar) {

    const sidebarLinks =
        dashboardSidebar.querySelectorAll(
            ".dashboard-nav-link"
        );


    sidebarLinks.forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                dashboardSidebar.classList.remove(
                    "sidebar-open"
                );

            }
        );

    });

}