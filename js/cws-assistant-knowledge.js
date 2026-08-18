/* =========================================================
   CWS ACADEMY
   ASSISTANT KNOWLEDGE BASE V2
   File: js/cws-assistant-knowledge.js
========================================================= */

"use strict";


export const CWS_ASSISTANT_KNOWLEDGE = [

    {
        id: "free-courses",
        keywords: [
            "free",
            "free courses",
            "which courses are free",
            "free learning"
        ],
        answer:
            "CWS Academy offers free learning paths focused on cybersecurity foundations. Use the Free filter on the Courses page to see them.",
        action: {
            label: "View Free Courses",
            publicPath: "pages/courses.html?filter=free",
            nestedPublicPath: "courses.html?filter=free",
            studentPath: "student-courses.html"
        }
    },

    {
        id: "pro",
        keywords: [
            "pro",
            "cws pro",
            "paid",
            "paid courses",
            "premium",
            "upgrade"
        ],
        answer:
            "CWS Pro is designed for deeper practical training, including advanced lessons, full hands-on labs, realistic scenarios, graded assessments, portfolio-ready projects and verified credentials.",
        action: {
            label: "Compare Free & Pro",
            publicPath: "pages/pricing.html",
            nestedPublicPath: "pricing.html",
            studentPath: "../pages/pricing.html"
        }
    },

    {
        id: "pricing",
        keywords: [
            "price",
            "pricing",
            "cost",
            "how much",
            "subscription"
        ],
        answer:
            "The Free plan costs nothing. CWS Pro pricing is not active yet and is currently shown as Coming Soon.",
        action: {
            label: "View Free vs Pro",
            publicPath: "pages/pricing.html",
            nestedPublicPath: "pricing.html",
            studentPath: "../pages/pricing.html"
        }
    },

    {
        id: "courses",
        keywords: [
            "courses",
            "course list",
            "what courses",
            "available courses"
        ],
        answer:
            "You can browse all CWS Academy learning paths from the Courses area. Free and Pro courses are separated by access level.",
        action: {
            label: "Browse Courses",
            publicPath: "pages/courses.html",
            nestedPublicPath: "courses.html",
            studentPath: "student-courses.html"
        }
    },

    {
        id: "labs",
        keywords: [
            "labs",
            "lab",
            "practical",
            "practical activity",
            "hands on"
        ],
        answer:
            "Labs and practical activities are available inside the student area. Some activities unlock only after prerequisite lessons are complete.",
        action: {
            label: "Open Labs",
            publicPath: "pages/login.html?redirect=labs",
            nestedPublicPath: "login.html?redirect=labs",
            studentPath: "labs.html"
        }
    },

    {
        id: "assessments",
        keywords: [
            "assessment",
            "assessments",
            "quiz",
            "module assessment",
            "final assessment",
            "exam"
        ],
        answer:
            "CWS Academy uses lesson knowledge checks, module assessments and final assessments to measure understanding and course progress.",
        action: {
            label: "Open Assessments",
            publicPath: "pages/login.html?redirect=assessments",
            nestedPublicPath: "login.html?redirect=assessments",
            studentPath: "assessments.html"
        }
    },

    {
        id: "progress",
        keywords: [
            "progress",
            "course progress",
            "completion",
            "completed lessons",
            "track progress"
        ],
        answer:
            "Signed-in students can track completed lessons, labs, assessments and overall course progress from the Progress page.",
        action: {
            label: "View Progress",
            publicPath: "pages/login.html?redirect=progress",
            nestedPublicPath: "login.html?redirect=progress",
            studentPath: "progress.html"
        }
    },

    {
        id: "certificates",
        keywords: [
            "certificate",
            "certificates",
            "credential",
            "credentials",
            "pdf certificate"
        ],
        answer:
            "Earned course certificates appear in the student Certificates area after the required course pathway and final assessment are completed.",
        action: {
            label: "Open Certificates",
            publicPath: "pages/login.html?redirect=certificates",
            nestedPublicPath: "login.html?redirect=certificates",
            studentPath: "certificates.html"
        }
    },

    {
        id: "verify-certificate",
        keywords: [
            "verify certificate",
            "verify credential",
            "credential id",
            "qr code",
            "certificate verification"
        ],
        answer:
            "CWS Academy credentials can be checked using the public verification page by entering the credential ID or scanning the certificate QR code.",
        action: {
            label: "Verify Credential",
            publicPath: "pages/verify-certificate.html",
            nestedPublicPath: "verify-certificate.html",
            studentPath: "../pages/verify-certificate.html"
        }
    },

    {
        id: "login",
        keywords: [
            "login",
            "sign in",
            "log in",
            "account login"
        ],
        answer:
            "Use the Login page to access your CWS Academy student account.",
        action: {
            label: "Login",
            publicPath: "pages/login.html",
            nestedPublicPath: "login.html",
            studentPath: "../pages/login.html"
        }
    },

    {
        id: "register",
        keywords: [
            "register",
            "registration",
            "create account",
            "sign up"
        ],
        answer:
            "Registration is free. Create a CWS Academy account to access student learning features.",
        action: {
            label: "Create Account",
            publicPath: "pages/register.html",
            nestedPublicPath: "register.html",
            studentPath: "../pages/register.html"
        }
    },

    {
        id: "forgot-password",
        keywords: [
            "forgot password",
            "reset password",
            "password reset",
            "can't login",
            "cannot login"
        ],
        answer:
            "Use the Forgot Password page to request a password reset link for your account.",
        action: {
            label: "Reset Password",
            publicPath: "pages/forgot-password.html",
            nestedPublicPath: "forgot-password.html",
            studentPath: "../pages/forgot-password.html"
        }
    },

    {
        id: "course-locked",
        keywords: [
            "locked course",
            "course locked",
            "why locked",
            "locked",
            "can't open course",
            "cannot open course"
        ],
        answer:
            "A course or activity may be locked because it requires earlier lessons, labs or assessments, or because it belongs to CWS Pro.",
        action: {
            label: "View Courses",
            publicPath: "pages/courses.html",
            nestedPublicPath: "courses.html",
            studentPath: "student-courses.html"
        }
    },

    {
        id: "contact",
        keywords: [
            "contact",
            "support",
            "help email",
            "contact cws"
        ],
        answer:
            "If the assistant cannot resolve your issue, use the Contact page to reach CWS Academy.",
        action: {
            label: "Contact CWS",
            publicPath: "pages/contact.html",
            nestedPublicPath: "contact.html",
            studentPath: "../pages/contact.html"
        }
    }

];


export const CWS_ASSISTANT_QUICK_ACTIONS = [
    {
        label: "Next Step",
        query: "What should I do next?"
    },
    {
        label: "I'm Stuck",
        query: "I'm stuck. What should I do?"
    },
    {
        label: "Progress",
        query: "Where can I see my progress?"
    },
    {
        label: "Free vs Pro",
        query: "What is the difference between Free and Pro?"
    }
];
