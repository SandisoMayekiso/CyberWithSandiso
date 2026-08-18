/* =========================================================
   CWS ACADEMY
   ASSISTANT KNOWLEDGE BASE
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
            "CWS Academy offers free learning paths focused on cybersecurity foundations. You can browse all free courses from the Courses page using the Free filter.",
        action: {
            label: "View Free Courses",
            publicPath: "pages/courses.html?filter=free",
            nestedPublicPath: "courses.html?filter=free",
            studentPath: "../pages/courses.html?filter=free"
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
            "The Free plan costs nothing. CWS Pro pricing is not active yet and is currently shown as Coming Soon on the Free vs Pro page.",
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
            "You can browse all public CWS Academy courses from the Courses page. Free and Pro courses can be filtered separately.",
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
            "Labs and practical activities are available inside the student area. Activities unlock based on course progress and prerequisites.",
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
            "CWS Academy uses lesson quizzes, module assessments and final assessments to measure progress. Some assessments only unlock after required lessons and practical activities are completed.",
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
            "Signed-in students can track completed lessons, labs, assessments and overall course completion from the Progress page.",
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
            "Earned course certificates are available from the student Certificates page. Verified CWS credentials may include an issue date, credential ID, QR verification and downloadable PDF.",
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
            "certificate verification",
            "employer verify"
        ],
        answer:
            "CWS Academy credentials can be checked using the public verification page. Enter the credential ID from the certificate or scan its QR code.",
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
            "sign up",
            "new account"
        ],
        answer:
            "Registration is free. Create a CWS Academy account to access student learning features such as lessons, labs, assessments and progress tracking.",
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
            "If you forgot your password, use the Forgot Password page to request a reset link for your account.",
        action: {
            label: "Reset Password",
            publicPath: "pages/forgot-password.html",
            nestedPublicPath: "forgot-password.html",
            studentPath: "../pages/forgot-password.html"
        }
    },

    {
        id: "dashboard",
        keywords: [
            "dashboard",
            "student dashboard",
            "home dashboard"
        ],
        answer:
            "The student Dashboard is your main learning hub for courses, progress, assessments, labs and certificates.",
        action: {
            label: "Open Dashboard",
            publicPath: "pages/login.html?redirect=dashboard",
            nestedPublicPath: "login.html?redirect=dashboard",
            studentPath: "dashboard.html"
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
            "A course or activity can be locked because it is a CWS Pro course that is not yet available, or because required lessons, labs or assessments must be completed first.",
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
            "contact cws",
            "contact support"
        ],
        answer:
            "For questions that the assistant cannot resolve, you can use the public Contact page to reach CWS Academy.",
        action: {
            label: "Contact CWS",
            publicPath: "pages/contact.html",
            nestedPublicPath: "contact.html",
            studentPath: "../pages/contact.html"
        }
    },

    {
        id: "about",
        keywords: [
            "about",
            "what is cws",
            "what is cws academy",
            "cyberwithsandiso"
        ],
        answer:
            "CWS Academy is part of the CyberWithSandiso ecosystem and focuses on practical cybersecurity education, structured learning and hands-on security training.",
        action: {
            label: "About CWS Academy",
            publicPath: "pages/about.html",
            nestedPublicPath: "about.html",
            studentPath: "../pages/about.html"
        }
    }

];


export const CWS_ASSISTANT_QUICK_ACTIONS = [
    {
        label: "Courses",
        query: "What courses are available?"
    },
    {
        label: "Free vs Pro",
        query: "What is the difference between Free and Pro?"
    },
    {
        label: "Labs",
        query: "How do labs work?"
    },
    {
        label: "Certificates",
        query: "How do certificates work?"
    }
];
