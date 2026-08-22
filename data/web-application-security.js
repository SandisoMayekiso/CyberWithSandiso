/* =========================================================
   CWS ACADEMY
   WEB APPLICATION SECURITY
   PRO • BEGINNER TO INTERMEDIATE
========================================================= */


/* =========================================================
   LESSON BUILDER
========================================================= */

function buildLesson(
    id,
    title,
    data = {}
) {

    const what =
        data.what ||
        title;


    const why =
        data.why ||
        "This concept helps explain how web applications process trust, input, identity and data."


    const how =
        data.how ||
        "Study the request/response flow, identify assumptions, test those assumptions safely and document evidence.";


    return {

        id,
        title,

        duration:
            data.duration ||
            "50 minutes",

        access:
            "pro",

        type:
            "Lesson",

        icon:
            data.icon ||
            "fa-solid fa-code",

        subtitle:
            data.subtitle ||
            `Understand ${title} through practical web-security examples.`,

        objectives:
            data.objectives ||
            [
                `Explain ${title} in your own words.`,
                `Describe why ${title} matters in web security.`,
                `Recognize how ${title} appears in HTTP traffic.`,
                `Identify common mistakes and weak assumptions.`,
                `Apply the concept in an authorized training lab.`
            ],

        introduction: `
            <h2>${title}</h2>

            <p>
                <strong>What:</strong>
                ${what}.
            </p>

            <p>
                <strong>Why:</strong>
                ${why}.
            </p>
        `,

        body: `
            <h2>What Is ${title}?</h2>

            <p>
                ${what}.
            </p>


            <h2>Why Does It Matter?</h2>

            <p>
                ${why}.
            </p>


            <h2>How Does It Work?</h2>

            <p>
                ${how}.
            </p>


            <h2>Web-Security Reasoning</h2>

            <p>
                Start with the normal application behavior. Identify which
                user-controlled values influence server-side decisions, what
                trust boundary is crossed, and what security control should
                protect that boundary.
            </p>


            <h2>Worked Scenario</h2>

            <p>
                ${
                    data.example ||
                    "Use a deliberately vulnerable training application and compare the intended request with one controlled variation. Record the request, response and security conclusion."
                }
            </p>


            <h2>Common Mistakes</h2>

            <ul>
                <li>Testing without understanding the normal application flow.</li>
                <li>Changing many request values at once and losing causality.</li>
                <li>Assuming a scanner result is proof without manual confirmation.</li>
                <li>Confusing client-side controls with server-side authorization.</li>
                <li>Collecting more sensitive data than necessary for evidence.</li>
            </ul>


            <h2>Safe Validation</h2>

            <ol>
                <li>Confirm the exact authorized application and account.</li>
                <li>Capture the normal request and response.</li>
                <li>Change one relevant value at a time.</li>
                <li>Compare the application response.</li>
                <li>Use the minimum action needed to demonstrate impact.</li>
                <li>Save evidence and write the remediation implication.</li>
            </ol>


            <h2>Before Moving On</h2>

            <p>
                You should be able to explain the concept without notes,
                recognize it in HTTP traffic and describe what evidence would
                confirm or reject the suspected weakness.
            </p>
        `,

        keyConcepts:
            data.keyConcepts ||
            [
                {
                    title,
                    description:
                        what
                },
                {
                    title:
                        "Trust Boundary",
                    description:
                        "A point where data, identity or authority crosses from one security context to another."
                },
                {
                    title:
                        "Validation",
                    description:
                        "Confirming a weakness with controlled evidence rather than assumption."
                }
            ],

        commands:
            data.commands ||
            [],

        quiz:
            data.quiz ||
            [
                {
                    question:
                        `What is the strongest way to study ${title}?`,
                    options: [
                        "Understand the normal request flow, vary one assumption and validate evidence",
                        "Run every available scanner",
                        "Ignore the application workflow",
                        "Change many values at once"
                    ],
                    answer:
                        0
                },
                {
                    question:
                        "Which control must enforce authorization decisions?",
                    options: [
                        "The server-side application",
                        "Only JavaScript in the browser",
                        "Only CSS",
                        "The page title"
                    ],
                    answer:
                        0
                },
                {
                    question:
                        "What should happen when validation is uncertain?",
                    options: [
                        "Document uncertainty and gather more evidence safely",
                        "Report it as critical",
                        "Ignore the result",
                        "Increase impact"
                    ],
                    answer:
                        0
                }
            ]

    };

}


/* =========================================================
   LAB BUILDER
========================================================= */

function buildLab(
    id,
    title,
    moduleTitle,
    extra = {}
) {

    return {

        id,
        title,

        type:
            "Hands-On Lab",

        duration:
            extra.duration ||
            "75–120 minutes",

        objective:
            extra.objective ||
            `Apply ${moduleTitle} in an authorized web-security training application.`,

        scenario:
            extra.scenario ||
            "You are assessing a deliberately vulnerable CWS training web application under explicit lab scope.",

        prerequisites:
            extra.prerequisites ||
            [
                "Authorized training application",
                "Browser developer tools",
                "Burp Suite Community or another intercepting proxy",
                "Assessment notes"
            ],

        instructions:
            extra.instructions ||
            [
                "Confirm the exact lab application and account.",
                "Capture the normal application request and response.",
                `Apply the ${moduleTitle} workflow taught in this module.`,
                "Change only one relevant input or request property at a time.",
                "Record the result and compare it to expected secure behavior.",
                "Use the minimum action needed to prove impact.",
                "Capture screenshots or request/response evidence.",
                "Write one remediation recommendation."
            ],

        evidence:
            extra.evidence ||
            [
                "Relevant HTTP request",
                "Relevant HTTP response",
                "Screenshot where useful",
                "Short finding or observation"
            ],

        reflection:
            extra.reflection ||
            [
                "What security assumption failed?",
                "What server-side control would prevent the issue?",
                "What evidence was sufficient to support your conclusion?"
            ],

        safety:
            "Use only deliberately vulnerable training applications or another application you are explicitly authorized to assess."

    };

}


/* =========================================================
   ASSESSMENT BUILDER
========================================================= */

function buildAssessment(
    title,
    questions = []
) {

    const fallback = [
        {
            question:
                "What should begin every web-security test?",
            options: [
                "Understanding the normal application flow and scope",
                "Automated exploitation",
                "Credential guessing",
                "Changing every parameter"
            ],
            answer:
                0
        },
        {
            question:
                "What is the purpose of an intercepting proxy?",
            options: [
                "Inspect and modify authorized HTTP requests and responses",
                "Replace the web server",
                "Disable authentication",
                "Encrypt all local files"
            ],
            answer:
                0
        },
        {
            question:
                "Why is server-side validation important?",
            options: [
                "Client-side controls can be bypassed or modified",
                "CSS cannot load",
                "Browsers have no JavaScript",
                "HTTP has no headers"
            ],
            answer:
                0
        },
        {
            question:
                "What makes a finding useful?",
            options: [
                "Evidence, impact and actionable remediation",
                "Only a scanner name",
                "Only a screenshot",
                "Only a severity score"
            ],
            answer:
                0
        },
        {
            question:
                "What is the safest validation principle?",
            options: [
                "Use the minimum action necessary to prove the issue",
                "Maximize impact",
                "Collect all accessible data",
                "Ignore scope"
            ],
            answer:
                0
        }
    ];


    return {

        title,

        type:
            "Module Assessment",

        passingScore:
            75,

        allowRetry:
            true,

        showResults:
            true,

        questions:
            questions.length
                ? questions
                : fallback

    };

}


/* =========================================================
   PRO ASSESSMENT QUALITY HELPERS
========================================================= */

function balanceAnswerPositions(questions = [], offset = 0) {

    return questions.map((item, index) => {
        const options = Array.isArray(item.options)
            ? [...item.options]
            : [];
        if (!options.length) {
            return item;
        }
        const answer = Number.isInteger(item.answer)
            ? item.answer
            : 0;
        const shift = (index + offset) % options.length;
        return {
            ...item,
            options: [
                ...options.slice(shift),
                ...options.slice(0, shift)
            ],
            answer: (answer - shift + options.length) % options.length
        };
    });

}


function proQuestion(prompt, correct, ...distractors) {
    return {
        question: prompt,
        options: [correct, ...distractors],
        answer: 0
    };
}


const webSecurityBlueprints = {
    "module-01": {
        focus: "trace the complete HTTP request, response, state and trust-boundary flow before security testing",
        control: "establish canonical routing, TLS, header, cookie and server-side input expectations",
        evidence: "method, scheme, host, path, parameters, relevant headers, body, status, timing and session context",
        failure: "separate network, TLS, HTTP, application and authorization failures before drawing a conclusion",
        remediation: "make security decisions server-side and define explicit trust boundaries and safe defaults"
    },
    "module-02": {
        focus: "use an intercepting proxy to reproduce normal traffic and change one controlled variable at a time",
        control: "scope the proxy, protect test credentials, disable unsafe automation and preserve unmodified baselines",
        evidence: "paired baseline and modified requests with account context, timestamps, responses and analyst notes",
        failure: "restore the original request, reduce variables and verify proxy, session and application state",
        remediation: "translate observed behavior into the missing server-side control rather than a proxy-specific fix"
    },
    "module-03": {
        focus: "verify authentication and session lifecycle controls using approved test identities",
        control: "enforce secure credential handling, MFA or equivalent assurance, session rotation, timeout, revocation and cookie protection",
        evidence: "controlled account states, login and logout flows, session identifiers redacted, timestamps and post-revocation behavior",
        failure: "stop tests that risk lockout or real accounts and coordinate rate, recovery and monitoring behavior",
        remediation: "fix identity verification and session lifecycle at the server, then invalidate affected sessions and credentials"
    },
    "module-04": {
        focus: "test object, function and workflow authorization across controlled identities and roles",
        control: "perform server-side authorization on every request using the authenticated subject and requested action or object",
        evidence: "two-account or two-role baseline, modified identifier or action, response, affected object and access outcome",
        failure: "treat UI restrictions or a 200 status as inconclusive until the protected result and identity context are verified",
        remediation: "centralize deny-by-default authorization and test horizontal, vertical and contextual boundaries"
    },
    "module-05": {
        focus: "verify how server-side components validate, interpret and safely use untrusted input",
        control: "use allowlist validation, parameterized queries, safe APIs, output encoding and least-privilege service identities",
        evidence: "normal request, one controlled mutation, server behavior, error or timing evidence, context and minimum-impact proof",
        failure: "stop when behavior is ambiguous or unstable and distinguish parser, validation, database, command and business-logic effects",
        remediation: "remove unsafe interpreter boundaries and apply the correct contextual defense at the point of use"
    },
    "module-06": {
        focus: "determine whether attacker-controlled data reaches an executable browser context",
        control: "apply context-aware output encoding, safe DOM APIs, sanitization where appropriate and a defense-in-depth CSP",
        evidence: "source, sink, exact HTML or DOM context, encoded response, safe marker execution result and affected origin",
        failure: "do not label reflection as XSS until browser interpretation and executable context are verified",
        remediation: "fix the unsafe source-to-sink flow and add regression tests for each rendering context"
    },
    "module-07": {
        focus: "verify cross-origin and cross-site trust decisions for state-changing requests and data access",
        control: "use anti-CSRF tokens or same-site defenses, origin validation and narrow CORS allowlists with correct credential policy",
        evidence: "request origin, cookies, preflight where relevant, response headers, state change and controlled cross-origin result",
        failure: "distinguish browser-enforced read restrictions from whether a request or state change was actually sent",
        remediation: "bind sensitive actions to authenticated intent and configure origin sharing only for required trusted consumers"
    },
    "module-08": {
        focus: "test uploads, downloads and server-side path handling without exposing or altering real data",
        control: "generate server-side filenames, store outside executable paths, validate content and enforce canonical path containment",
        evidence: "controlled file, metadata, storage or retrieval behavior, path normalization result and minimum approved proof",
        failure: "stop on unexpected execution, overwrite or sensitive-file access and preserve the exact request without expanding impact",
        remediation: "separate user content from executable code, enforce storage and path boundaries and scan or transform content safely"
    },
    "module-09": {
        focus: "assess API authentication, authorization, schema, object exposure, rate and business-flow controls",
        control: "validate tokens, authorize every object and operation, constrain schemas, limit abuse and minimize response data",
        evidence: "endpoint, method, identity, object, request schema, response fields, rate context and reproducible comparison",
        failure: "treat undocumented behavior as a hypothesis and avoid bulk enumeration or real data collection",
        remediation: "apply deny-by-default object and function authorization plus strict input and output schemas"
    },
    "module-10": {
        focus: "execute a complete web assessment from mapping and threat hypotheses to verified findings and retesting",
        control: "maintain scope, test accounts, data-minimization rules, evidence provenance, stop conditions and artifact cleanup",
        evidence: "application map, role matrix, request library, test log, confirmed findings, false positives, report and retest plan",
        failure: "pause on scope, availability, account or sensitive-data risk and record incomplete coverage honestly",
        remediation: "prioritize root causes, assign ownership and define exact technical and business-logic retest criteria"
    }
};


function buildWebSecurityQuestionBank(moduleId, moduleTitle) {
    const item = webSecurityBlueprints[moduleId];
    return [
        proQuestion(`What is the professional objective for ${moduleTitle}?`, item.focus, "Run every scanner check", "Maximize request variation", "Obtain sensitive data"),
        proQuestion(`Which control best addresses ${moduleTitle}?`, item.control, "Client-side validation only", "A generic warning banner", "Security through hidden URLs"),
        proQuestion(`Which evidence best supports ${moduleTitle}?`, item.evidence, "A scanner label", "A screenshot without request context", "Only an HTTP status"),
        proQuestion(`What is the correct response to uncertainty in ${moduleTitle}?`, item.failure, "Report the most severe interpretation", "Change many variables together", "Collect more sensitive data"),
        proQuestion(`Which remediation is strongest for ${moduleTitle}?`, item.remediation, "Block the tester IP", "Hide the affected feature", "Add a client-side check only")
    ];
}


/* =========================================================
   COURSE
========================================================= */

export const webApplicationSecurity = {

    id:
        "web-application-security",

    title:
        "Web Application Security",

    overviewTitle:
        "Understand, Test and Report Modern Web Application Security",

    category:
        "CWS ACADEMY • APPLICATION SECURITY",

    level:
        "Beginner → Intermediate",

    levelKey:
        "intermediate",

    status:
        "available",

    access:
        "pro",

    icon:
        "fa-solid fa-code",

    description:
        "Learn web application security through HTTP analysis, authentication, sessions, access control, input handling, browser security, API testing, Burp Suite workflows and evidence-based reporting.",

    longDescription:
        "Web Application Security is a CWS Pro practical course focused on how modern web applications process identity, trust, input and data. Students learn HTTP deeply, use intercepting proxies, test authentication and authorization, analyze common server-side and browser-side vulnerability classes, inspect APIs and produce professional findings. All testing is performed in deliberately vulnerable applications or environments where explicit authorization exists.",

    duration:
        "80–100 Hours",

    estimatedLessons:
        30,

    certificateEligible:
        true,

    learningStandard:
        "OWASP-Aligned Testing • HTTP Evidence • Identity and Authorization • Server and Browser Trust • API Security • Retesting",

    prerequisites: [
        "Cybersecurity Fundamentals",
        "Networking Fundamentals",
        "Ethical Hacking"
    ],

    recommendedPrerequisites: [
        "Linux Fundamentals",
        "Python Fundamentals for Cybersecurity"
    ],

    skills: [
        "HTTP and application-state mapping",
        "Intercepting-proxy workflows",
        "Authentication and session lifecycle testing",
        "Object and function authorization testing",
        "Server-side input and interpreter-boundary analysis",
        "XSS source, sink and browser-context reasoning",
        "CSRF, CORS and cross-origin trust analysis",
        "Upload, download and path-security testing",
        "API object, function, schema and business-flow security",
        "Web findings, remediation and retesting"
    ],

    tools: [
        "Browser developer tools",
        "Burp Suite Community or equivalent intercepting proxy",
        "curl",
        "Deliberately vulnerable local web applications",
        "Two or more controlled test identities",
        "JSON formatter and diff tools",
        "CWS HTTP evidence worksheet",
        "OWASP WSTG stable references",
        "OWASP ASVS requirements"
    ],

    assessmentStandard:
        "Pro assessments require paired baseline and modified requests, exact identity and session context, minimum-impact proof, control-focused remediation, sensitive-data minimization and reproducible retest steps.",

    standardReferences: [
        {
            title: "Web Security Testing Guide — Stable",
            organization: "OWASP",
            url: "https://owasp.org/www-project-web-security-testing-guide/stable/"
        },
        {
            title: "Application Security Verification Standard",
            organization: "OWASP",
            url: "https://owasp.org/www-project-application-security-verification-standard/"
        },
        {
            title: "OWASP API Security Top 10",
            organization: "OWASP",
            url: "https://owasp.org/API-Security/"
        },
        {
            title: "HTTP Semantics — RFC 9110",
            organization: "IETF",
            url: "https://www.rfc-editor.org/rfc/rfc9110.html"
        }
    ],

    completionRules: {

        minimumLessonCompletion:
            100,

        minimumModuleAssessmentScore:
            85,

        finalAssessmentPassingScore:
            85,

        capstonePassingScore:
            85,

        requireAllModuleAssessments:
            true,

        requireRequiredLabs:
            true,

        requireFinalAssessment:
            true,

        requireCapstone:
            true

    },

    progression: {

        unlockMode:
            "sequential",

        allowLessonReview:
            true,

        allowAssessmentRetry:
            true,

        trackLessonCompletion:
            true,

        trackAssessmentScores:
            true,

        trackLabCompletion:
            true,

        resumeLastLesson:
            true

    },

    objectives: [
        "Explain HTTP requests, responses, cookies, headers and sessions.",
        "Use an intercepting proxy to inspect authorized web traffic.",
        "Analyze authentication and session-management weaknesses.",
        "Test server-side authorization and access-control boundaries.",
        "Understand input-validation weaknesses including SQL injection and command-injection concepts.",
        "Understand browser-side vulnerabilities including XSS and CSRF.",
        "Analyze file-upload and path-handling risks.",
        "Test APIs and JSON-based endpoints safely.",
        "Assess security headers and browser controls.",
        "Write reproducible web-application findings with remediation."
    ],

    modules: [

        /* =====================================================
           MODULE 01
        ====================================================== */

        {
            id:
                "module-01",

            number:
                1,

            title:
                "HTTP and Web Application Foundations",

            description:
                "Understand how browsers, servers, HTTP messages, state and trust interact.",

            access:
                "pro",

            labs:
                1,

            assessments:
                1,

            lessons: [

                buildLesson(
                    "lesson-01",
                    "How Web Applications Work",
                    {
                        what:
                            "the interaction between browsers, HTTP, application logic, databases and supporting services",

                        why:
                            "security testing depends on understanding where trust decisions and data processing occur",

                        how:
                            "a browser sends HTTP requests, the server routes them through application logic, the application may query data stores, and a response is returned",

                        example:
                            "Trace a login request from browser form submission to server response and identify where authentication is actually decided."
                    }
                ),

                buildLesson(
                    "lesson-02",
                    "HTTP Requests and Responses",
                    {
                        what:
                            "the structured messages exchanged between web clients and servers",

                        why:
                            "most web-security testing ultimately involves understanding and manipulating authorized HTTP messages",

                        how:
                            "requests contain a method, path, headers and optional body; responses contain a status code, headers and optional body",

                        commands: [
                            {
                                command:
                                    "curl -i http://training.cws.local/",
                                explanation:
                                    "Displays response headers and body from an authorized training application."
                            }
                        ]
                    }
                ),

                buildLesson(
                    "lesson-03",
                    "Cookies, Sessions and State",
                    {
                        what:
                            "mechanisms that allow a stateless protocol such as HTTP to maintain authenticated or application state",

                        why:
                            "weak session handling can turn a valid login into broader account compromise",

                        how:
                            "the server creates or accepts a session identifier, the browser stores it in a cookie, and later requests present that cookie",

                        example:
                            "Compare authenticated and unauthenticated requests to the same training page and observe the role of the session cookie."
                    }
                )

            ],

            labActivities: [
                buildLab(
                    "lab-01",
                    "Map an HTTP Login Flow",
                    "HTTP and Web Application Foundations"
                )
            ],

            moduleAssessment:
                buildAssessment(
                    "Module 1 Assessment — HTTP Foundations"
                )
        },


        /* =====================================================
           MODULE 02
        ====================================================== */

        {
            id:
                "module-02",

            number:
                2,

            title:
                "Burp Suite and Manual Web Testing",

            description:
                "Use an intercepting proxy to understand, repeat and safely modify web traffic.",

            access:
                "pro",

            labs:
                1,

            assessments:
                1,

            lessons: [

                buildLesson(
                    "lesson-01",
                    "Intercepting Proxies",
                    {
                        what:
                            "tools that sit between a browser and authorized application traffic so requests and responses can be inspected",

                        why:
                            "they make invisible HTTP details observable and testable",

                        how:
                            "the browser is configured to proxy traffic through the testing tool, which can intercept, forward and log HTTP messages"
                    }
                ),

                buildLesson(
                    "lesson-02",
                    "Burp Proxy and HTTP History",
                    {
                        what:
                            "Burp Suite features for capturing browser traffic and reviewing the request history",

                        why:
                            "understanding normal application behavior is essential before changing requests",

                        how:
                            "Proxy captures traffic while HTTP History provides a searchable record of observed messages"
                    }
                ),

                buildLesson(
                    "lesson-03",
                    "Repeater and Controlled Request Modification",
                    {
                        what:
                            "a workflow for sending the same authorized HTTP request repeatedly while changing selected values",

                        why:
                            "controlled changes reveal whether server-side assumptions can be bypassed",

                        how:
                            "send a captured request to Repeater, change one parameter or header, resend it and compare the response"
                    }
                )

            ],

            labActivities: [
                buildLab(
                    "lab-01",
                    "Capture and Repeat Authorized HTTP Traffic",
                    "Burp Suite and Manual Web Testing"
                )
            ],

            moduleAssessment:
                buildAssessment(
                    "Module 2 Assessment — Burp Suite"
                )
        },


        /* =====================================================
           MODULE 03
        ====================================================== */

        {
            id:
                "module-03",

            number:
                3,

            title:
                "Authentication and Session Security",

            description:
                "Analyze login workflows, account recovery, session cookies and common identity failures.",

            access:
                "pro",

            labs:
                1,

            assessments:
                1,

            lessons: [

                buildLesson(
                    "lesson-01",
                    "Authentication Workflow Testing",
                    {
                        what:
                            "evaluating how an application verifies user identity",

                        why:
                            "authentication weaknesses may allow account takeover or unauthorized access",

                        how:
                            "map login inputs, responses, redirects, error handling, account states and server-side controls"
                    }
                ),

                buildLesson(
                    "lesson-02",
                    "Session Management Weaknesses",
                    {
                        what:
                            "security failures involving session creation, rotation, expiration or protection",

                        why:
                            "a stolen or reusable session identifier can bypass the password entirely",

                        how:
                            "observe whether sessions rotate after login, expire appropriately and use secure cookie attributes"
                    }
                ),

                buildLesson(
                    "lesson-03",
                    "Password Reset and Account Recovery",
                    {
                        what:
                            "workflows used when users cannot authenticate normally",

                        why:
                            "recovery mechanisms can become weaker alternative authentication paths",

                        how:
                            "evaluate identity verification, token lifetime, token reuse, user enumeration and recovery-session handling"
                    }
                )

            ],

            labActivities: [
                buildLab(
                    "lab-01",
                    "Authentication and Session Review",
                    "Authentication and Session Security"
                )
            ],

            moduleAssessment:
                buildAssessment(
                    "Module 3 Assessment — Authentication and Sessions"
                )
        },


        /* =====================================================
           MODULE 04
        ====================================================== */

        {
            id:
                "module-04",

            number:
                4,

            title:
                "Access Control and Authorization",

            description:
                "Understand horizontal, vertical and object-level authorization failures.",

            access:
                "pro",

            labs:
                1,

            assessments:
                1,

            lessons: [

                buildLesson(
                    "lesson-01",
                    "Authentication vs Authorization",
                    {
                        what:
                            "the distinction between proving identity and deciding what that identity may access",

                        why:
                            "applications can authenticate users correctly while still exposing other users' or administrators' resources",

                        how:
                            "the server must enforce authorization on every protected action and object"
                    }
                ),

                buildLesson(
                    "lesson-02",
                    "IDOR and Object-Level Authorization",
                    {
                        what:
                            "a class of access-control weakness where changing an object identifier exposes another user's resource",

                        why:
                            "object identifiers are often user controlled but must never be treated as authorization",

                        how:
                            "the server should verify that the authenticated identity is permitted to access the requested object"
                    }
                ),

                buildLesson(
                    "lesson-03",
                    "Vertical and Horizontal Privilege Boundaries",
                    {
                        what:
                            "authorization boundaries between users at the same privilege level and users with different roles",

                        why:
                            "missing role checks can expose administrative or peer-user functionality",

                        how:
                            "compare requests between authorized training accounts and verify that the server enforces the intended role"
                    }
                )

            ],

            labActivities: [
                buildLab(
                    "lab-01",
                    "Authorization Boundary Testing",
                    "Access Control and Authorization"
                )
            ],

            moduleAssessment:
                buildAssessment(
                    "Module 4 Assessment — Access Control"
                )
        },


        /* =====================================================
           MODULE 05
        ====================================================== */

        {
            id:
                "module-05",

            number:
                5,

            title:
                "Server-Side Input Validation",

            description:
                "Learn how unsafe server-side input handling can create injection vulnerabilities.",

            access:
                "pro",

            labs:
                1,

            assessments:
                1,

            lessons: [

                buildLesson(
                    "lesson-01",
                    "Input Validation and Injection Concepts",
                    {
                        what:
                            "the security problem created when untrusted input changes the meaning of a server-side command or query",

                        why:
                            "applications frequently combine user-controlled data with interpreters such as SQL engines or operating-system commands",

                        how:
                            "secure applications separate data from executable syntax and validate input according to expected structure"
                    }
                ),

                buildLesson(
                    "lesson-02",
                    "SQL Injection Fundamentals",
                    {
                        what:
                            "a database-query injection vulnerability caused when untrusted input alters SQL structure",

                        why:
                            "successful SQL injection can expose or modify application data depending on context",

                        how:
                            "understand the vulnerable query model, compare normal and controlled lab inputs, and confirm server-side query separation",

                        example:
                            "In a purpose-built SQL injection lab, compare a normal search value with a deliberately malformed training input and observe the database error or changed response without accessing unrelated data."
                    }
                ),

                buildLesson(
                    "lesson-03",
                    "OS Command Injection Concepts",
                    {
                        what:
                            "a vulnerability where application input reaches an operating-system command interpreter unsafely",

                        why:
                            "command injection can turn a web input into server-side operating-system execution",

                        how:
                            "secure implementations avoid shell interpretation where possible, use safe APIs and validate expected input tightly"
                    }
                )

            ],

            labActivities: [
                buildLab(
                    "lab-01",
                    "Controlled Injection Validation",
                    "Server-Side Input Validation"
                )
            ],

            moduleAssessment:
                buildAssessment(
                    "Module 5 Assessment — Injection"
                )
        },


        /* =====================================================
           MODULE 06
        ====================================================== */

        {
            id:
                "module-06",

            number:
                6,

            title:
                "Cross-Site Scripting and Browser Trust",

            description:
                "Understand reflected, stored and DOM-based XSS and the browser security model.",

            access:
                "pro",

            labs:
                1,

            assessments:
                1,

            lessons: [

                buildLesson(
                    "lesson-01",
                    "How Browsers Process HTML and JavaScript",
                    {
                        what:
                            "the browser execution environment for markup, scripts, origins and DOM content",

                        why:
                            "XSS exists because user-controlled content can cross from data into executable browser context",

                        how:
                            "the browser parses HTML, builds the DOM and executes JavaScript according to origin and page context"
                    }
                ),

                buildLesson(
                    "lesson-02",
                    "Reflected and Stored XSS",
                    {
                        what:
                            "server-side XSS classes where untrusted content is returned immediately or stored and later rendered",

                        why:
                            "unsafe output encoding can allow attacker-controlled script execution in another user's browser",

                        how:
                            "secure applications encode output for the exact rendering context and avoid inserting untrusted HTML directly"
                    }
                ),

                buildLesson(
                    "lesson-03",
                    "DOM-Based XSS and Client-Side Sinks",
                    {
                        what:
                            "client-side script injection caused when browser JavaScript moves untrusted data into unsafe DOM APIs",

                        why:
                            "the server response can appear safe while vulnerable JavaScript creates the dangerous behavior in the browser",

                        how:
                            "trace untrusted sources such as URL values into DOM sinks and replace unsafe rendering APIs with safer alternatives"
                    }
                )

            ],

            labActivities: [
                buildLab(
                    "lab-01",
                    "XSS Context and Output Encoding Lab",
                    "Cross-Site Scripting and Browser Trust"
                )
            ],

            moduleAssessment:
                buildAssessment(
                    "Module 6 Assessment — XSS"
                )
        },


        /* =====================================================
           MODULE 07
        ====================================================== */

        {
            id:
                "module-07",

            number:
                7,

            title:
                "CSRF, CORS and Browser Security Controls",

            description:
                "Understand request-forgery risk, cross-origin policy and defensive browser controls.",

            access:
                "pro",

            labs:
                1,

            assessments:
                1,

            lessons: [

                buildLesson(
                    "lesson-01",
                    "Cross-Site Request Forgery",
                    {
                        what:
                            "a vulnerability where a user's authenticated browser is tricked into sending an unintended state-changing request",

                        why:
                            "browsers automatically attach some credentials such as cookies",

                        how:
                            "applications defend with anti-CSRF tokens, SameSite cookies and request-validation controls"
                    }
                ),

                buildLesson(
                    "lesson-02",
                    "Same-Origin Policy and CORS",
                    {
                        what:
                            "browser controls that govern whether one origin can read resources from another",

                        why:
                            "misconfigured CORS can expose authenticated API responses to unintended origins",

                        how:
                            "the browser evaluates origin headers and server CORS responses before exposing cross-origin content to scripts"
                    }
                ),

                buildLesson(
                    "lesson-03",
                    "Security Headers and CSP",
                    {
                        what:
                            "HTTP response headers that instruct browsers to apply additional security restrictions",

                        why:
                            "headers such as Content-Security-Policy, frame restrictions and MIME protections can reduce browser-side attack surface",

                        how:
                            "the server sends policy headers and the browser enforces them"
                    }
                )

            ],

            labActivities: [
                buildLab(
                    "lab-01",
                    "Browser Security Controls Review",
                    "CSRF, CORS and Browser Security Controls"
                )
            ],

            moduleAssessment:
                buildAssessment(
                    "Module 7 Assessment — Browser Controls"
                )
        },


        /* =====================================================
           MODULE 08
        ====================================================== */

        {
            id:
                "module-08",

            number:
                8,

            title:
                "File Handling and Path Security",

            description:
                "Assess uploads, downloads, path handling and server-side file-processing assumptions.",

            access:
                "pro",

            labs:
                1,

            assessments:
                1,

            lessons: [

                buildLesson(
                    "lesson-01",
                    "File Upload Security",
                    {
                        what:
                            "controls governing user-supplied files stored or processed by a web application",

                        why:
                            "unsafe uploads can introduce executable content, malicious documents or unexpected server-side processing",

                        how:
                            "secure applications validate content, extension, size and storage location and prevent execution from upload directories"
                    }
                ),

                buildLesson(
                    "lesson-02",
                    "Path Traversal Concepts",
                    {
                        what:
                            "a path-handling weakness where user input escapes the intended directory boundary",

                        why:
                            "unsafe path construction can expose server files outside the application's intended storage location",

                        how:
                            "applications should use safe path APIs, allowlisted identifiers and fixed storage roots"
                    }
                ),

                buildLesson(
                    "lesson-03",
                    "Download and Content-Disposition Security",
                    {
                        what:
                            "security controls around files returned to users",

                        why:
                            "download endpoints can expose unauthorized files or unsafe content types",

                        how:
                            "the server must authorize the requested file and return safe content metadata"
                    }
                )

            ],

            labActivities: [
                buildLab(
                    "lab-01",
                    "File Handling Security Review",
                    "File Handling and Path Security"
                )
            ],

            moduleAssessment:
                buildAssessment(
                    "Module 8 Assessment — File Security"
                )
        },


        /* =====================================================
           MODULE 09
        ====================================================== */

        {
            id:
                "module-09",

            number:
                9,

            title:
                "API Security",

            description:
                "Inspect JSON APIs, authorization, object access, input handling and rate-control assumptions.",

            access:
                "pro",

            labs:
                1,

            assessments:
                1,

            lessons: [

                buildLesson(
                    "lesson-01",
                    "REST and JSON API Foundations",
                    {
                        what:
                            "HTTP-based application interfaces that commonly exchange structured JSON data",

                        why:
                            "modern front ends and mobile applications often depend heavily on APIs",

                        how:
                            "clients send HTTP requests to resource endpoints and receive structured responses"
                    }
                ),

                buildLesson(
                    "lesson-02",
                    "API Authentication and Object Authorization",
                    {
                        what:
                            "identity and permission controls applied to API endpoints and individual resources",

                        why:
                            "an authenticated API user must still be prevented from accessing objects belonging to another identity",

                        how:
                            "the API should validate both the caller and authorization for each requested object"
                    }
                ),

                buildLesson(
                    "lesson-03",
                    "API Input, Rate and Error Handling",
                    {
                        what:
                            "controls governing API request shape, frequency and failure responses",

                        why:
                            "weak validation, unlimited sensitive operations and verbose errors can increase exposure",

                        how:
                            "validate schemas, constrain sensitive operations and return controlled error messages"
                    }
                )

            ],

            labActivities: [
                buildLab(
                    "lab-01",
                    "Authorized API Security Assessment",
                    "API Security"
                )
            ],

            moduleAssessment:
                buildAssessment(
                    "Module 9 Assessment — API Security"
                )
        },


        /* =====================================================
           MODULE 10
        ====================================================== */

        {
            id:
                "module-10",

            number:
                10,

            title:
                "Web Application Security Capstone",

            description:
                "Perform an end-to-end authorized assessment and write professional application-security findings.",

            access:
                "pro",

            labs:
                1,

            assessments:
                1,

            lessons: [

                buildLesson(
                    "lesson-01",
                    "Web Assessment Planning",
                    {
                        what:
                            "defining application scope, accounts, functionality and test objectives before active testing",

                        why:
                            "web applications can contain many workflows and roles, so a clear test plan prevents gaps and scope mistakes",

                        how:
                            "map application roles, functions, trust boundaries and high-value workflows before deeper testing"
                    }
                ),

                buildLesson(
                    "lesson-02",
                    "Execute the Web Assessment",
                    {
                        what:
                            "applying the full CWS web-testing methodology to an authorized training application",

                        why:
                            "the capstone measures integrated reasoning rather than isolated vulnerability recognition",

                        how:
                            "map → capture → analyze → test authorization → validate inputs → inspect browser controls → assess APIs → collect evidence"
                    }
                ),

                buildLesson(
                    "lesson-03",
                    "Reporting and Retest Planning",
                    {
                        what:
                            "turning web-security observations into reproducible findings and future remediation checks",

                        why:
                            "the goal of testing is actionable risk reduction",

                        how:
                            "write affected endpoint, role, request/response evidence, impact, reproduction, remediation and retest steps"
                    }
                )

            ],

            labActivities: [
                buildLab(
                    "lab-01",
                    "CWS Web Application Security Practical Capstone",
                    "Web Application Security Capstone",
                    {
                        duration:
                            "180 minutes",

                        instructions: [
                            "Confirm the application URL, accounts and scope.",
                            "Map major application functions and trust boundaries.",
                            "Capture representative requests in Burp Suite.",
                            "Test authentication and session controls.",
                            "Test at least one authorization boundary.",
                            "Review server-side input handling.",
                            "Review browser-side controls.",
                            "Inspect one API workflow if present.",
                            "Collect minimum necessary evidence.",
                            "Write at least two professional findings where supported by evidence.",
                            "Create a short executive summary and retest plan."
                        ]
                    }
                )
            ],

            moduleAssessment:
                buildAssessment(
                    "Module 10 Assessment — Web Security Capstone"
                )
        }

    ],


    /* =========================================================
       FINAL ASSESSMENT
    ========================================================= */

    finalAssessment: {

        title:
            "CWS Web Application Security Final Assessment",

        description:
            "Demonstrate practical understanding of HTTP, authentication, sessions, access control, input validation, browser security, APIs and professional reporting.",

        passingScore:
            80,

        allowRetry:
            true,

        required:
            true,

        questions: [

            {
                question:
                    "What should happen before modifying a web request?",
                options: [
                    "Understand the normal application flow and scope",
                    "Run exploitation immediately",
                    "Disable authentication",
                    "Change every parameter"
                ],
                answer:
                    0
            },

            {
                question:
                    "What does an HTTP request contain?",
                options: [
                    "Method, path, headers and optionally a body",
                    "Only HTML",
                    "Only a status code",
                    "Only cookies"
                ],
                answer:
                    0
            },

            {
                question:
                    "What is the role of a session cookie?",
                options: [
                    "Represent application state or an authenticated session",
                    "Replace DNS",
                    "Compile JavaScript",
                    "Encrypt the server disk"
                ],
                answer:
                    0
            },

            {
                question:
                    "What is the purpose of Burp Repeater?",
                options: [
                    "Resend and modify captured authorized HTTP requests",
                    "Host the production application",
                    "Replace the database",
                    "Create DNS records"
                ],
                answer:
                    0
            },

            {
                question:
                    "What is the difference between authentication and authorization?",
                options: [
                    "Authentication proves identity; authorization decides permitted actions",
                    "They are identical",
                    "Authorization only concerns passwords",
                    "Authentication only concerns files"
                ],
                answer:
                    0
            },

            {
                question:
                    "What causes an IDOR-style weakness?",
                options: [
                    "The server trusts an object identifier without enforcing object-level authorization",
                    "A missing CSS file",
                    "An expired TLS certificate",
                    "A slow DNS lookup"
                ],
                answer:
                    0
            },

            {
                question:
                    "What is the core problem in SQL injection?",
                options: [
                    "Untrusted input changes SQL query structure",
                    "Cookies expire",
                    "HTML is compressed",
                    "DNS returns multiple addresses"
                ],
                answer:
                    0
            },

            {
                question:
                    "What is the safest SQL-injection validation approach?",
                options: [
                    "Use a purpose-built lab and the minimum input necessary to demonstrate altered query behavior",
                    "Extract all available data",
                    "Modify production records",
                    "Ignore scope"
                ],
                answer:
                    0
            },

            {
                question:
                    "What is reflected XSS?",
                options: [
                    "Untrusted input is returned in a response and executed in browser context",
                    "A database backup",
                    "A firewall rule",
                    "A DNS record"
                ],
                answer:
                    0
            },

            {
                question:
                    "What is DOM-based XSS?",
                options: [
                    "Client-side JavaScript moves untrusted data into an unsafe DOM sink",
                    "A database-only vulnerability",
                    "A mail-server issue",
                    "An SSH weakness"
                ],
                answer:
                    0
            },

            {
                question:
                    "What does CSRF exploit?",
                options: [
                    "A browser's ability to send authenticated requests the user did not intend",
                    "Only password hashes",
                    "Only DNS",
                    "Only TLS certificates"
                ],
                answer:
                    0
            },

            {
                question:
                    "What does CORS control?",
                options: [
                    "Whether browser scripts can read cross-origin responses",
                    "Server file permissions",
                    "Linux users",
                    "Database indexes"
                ],
                answer:
                    0
            },

            {
                question:
                    "Why is file upload validation important?",
                options: [
                    "User-supplied files can introduce dangerous content or unexpected processing",
                    "Uploads never affect security",
                    "Only filenames matter",
                    "Browsers cannot upload files"
                ],
                answer:
                    0
            },

            {
                question:
                    "What is path traversal?",
                options: [
                    "Escaping an intended server-side directory boundary through unsafe path handling",
                    "Following a browser redirect",
                    "Changing a DNS record",
                    "Refreshing a session"
                ],
                answer:
                    0
            },

            {
                question:
                    "What is object-level API authorization?",
                options: [
                    "Checking whether the authenticated caller may access the requested resource",
                    "Checking only whether JSON is valid",
                    "Checking DNS",
                    "Checking CSS"
                ],
                answer:
                    0
            },

            {
                question:
                    "Why should API errors be controlled?",
                options: [
                    "Verbose errors can reveal unnecessary implementation details",
                    "Errors should always expose stack traces",
                    "Errors replace authentication",
                    "Errors are never logged"
                ],
                answer:
                    0
            },

            {
                question:
                    "What should determine severity of a web finding?",
                options: [
                    "Evidence, exploitability, exposure and business impact",
                    "Only scanner output",
                    "Only URL length",
                    "Only HTTP method"
                ],
                answer:
                    0
            },

            {
                question:
                    "What should a professional web finding include?",
                options: [
                    "Endpoint, evidence, reproduction, impact and remediation",
                    "Only a screenshot",
                    "Only severity",
                    "Only the tool name"
                ],
                answer:
                    0
            },

            {
                question:
                    "What is the purpose of a retest?",
                options: [
                    "Confirm that remediation resolved the original weakness",
                    "Expand scope",
                    "Delete old findings",
                    "Create a new account"
                ],
                answer:
                    0
            },

            {
                question:
                    "What best demonstrates web-security competence?",
                options: [
                    "Understanding application flow, testing assumptions safely, validating evidence and reporting clearly",
                    "Running the most scanners",
                    "Memorizing payloads only",
                    "Changing every request value"
                ],
                answer:
                    0
            }

        ]

    }

};


/* =========================================================
   CWS PRO COURSE STANDARDIZATION
========================================================= */

function applyWebApplicationSecurityProStandard(course) {

    course.modules.forEach(module => {

        module.learningOutcomes = [
            `Map the normal application and trust flow relevant to ${module.title}.`,
            "Form a testable hypothesis and change one controlled request element at a time.",
            "Distinguish browser behavior, server validation, authentication and authorization controls.",
            "Write a reproducible finding with root-cause remediation and exact retest criteria."
        ];

        module.labActivities = (module.labActivities || []).map(activity => ({
            ...activity,
            access: "pro",
            required: true,
            prerequisites: [
                "Completed lessons in this module",
                "Written lab scope and deliberately vulnerable application",
                "Approved test accounts and role matrix",
                "Intercepting proxy configured only for the lab",
                "Disposable browser profile and evidence workspace"
            ],
            evidence: [
                ...(activity.evidence || []),
                "Exact application, account, role and session context",
                "Normal baseline request and response",
                "Single controlled request variation and response",
                "Trust boundary and expected server-side control",
                "Minimum-impact validation and affected object or action",
                "Alternative explanation and limitation",
                "Root-cause remediation and reproducible retest"
            ],
            successCriteria:
                "The learner demonstrates the relevant server or browser trust behavior using paired, reproducible evidence, minimizes sensitive data and proposes control-focused remediation.",
            reflection: [
                ...(activity.reflection || []),
                "Which identity, object or trust boundary made the result security-relevant?",
                "What did the response prove, and what did it not prove?",
                "Which regression test should remain after remediation?"
            ],
            cleanup: [
                "Remove test uploads, sample records and temporary accounts where required.",
                "Invalidate lab sessions and temporary tokens.",
                "Clear proxy history that contains unnecessary secrets or personal data.",
                "Retain only redacted requests, responses and report artifacts."
            ],
            safety:
                "Test only deliberately vulnerable local applications or systems covered by explicit written authorization. Use controlled accounts and sample data, minimize impact and stop on availability or unexpected sensitive-data risk.",
            rubric: {
                applicationAndTrustMapping: 15,
                testDesignAndControl: 20,
                technicalValidation: 25,
                evidenceAndReproducibility: 20,
                remediationAndRetest: 15,
                dataHandlingAndProfessionalism: 5
            }
        }));

        module.labs = module.labActivities.length;
        module.assessments = 1;

        const moduleQuestions = buildWebSecurityQuestionBank(
            module.id,
            module.title
        );

        module.moduleAssessment = {
            title: `${module.title} — Pro Verified Assessment`,
            type: "Module Assessment",
            passingScore: 85,
            allowRetry: true,
            showResults: true,
            required: true,
            questionCount: moduleQuestions.length,
            questions: balanceAnswerPositions(moduleQuestions, module.number - 1)
        };

        module.lessons.forEach((item, lessonIndex) => {

            item.performanceObjectives = [
                `Explain ${item.title} in the application's normal HTTP, identity and data flow.`,
                "Identify the security assumption and the server or browser control that should enforce it.",
                "Design a one-variable, minimum-impact test using a controlled account and sample data.",
                "Interpret the paired responses and define remediation plus regression testing."
            ];

            item.evidenceStandard = [
                "Authorized application and controlled identity",
                "Baseline request and response",
                "One controlled variation and response",
                "Session, role, object and origin context where relevant",
                "Observed fact separated from inference",
                "Sensitive-field redaction and exact retest step"
            ];

            item.completionCriteria = [
                "The learner explains the trust boundary without relying on a scanner label.",
                "The learner distinguishes client-side behavior from server-side enforcement.",
                "The three-question lesson assessment is passed.",
                "Associated lab evidence meets the Pro rubric."
            ];

            item.quiz = balanceAnswerPositions([
                proQuestion(`What should begin a ${item.title} test?`, "Map normal behavior, identity, state, data flow and the expected security control", "Run an automated exploit", "Change every parameter", "Collect production data"),
                proQuestion(`What evidence best validates ${item.title}?`, "Paired baseline and single-variable requests with account context, responses and analyst interpretation", "Only a status code", "A scanner name", "A screenshot without the request"),
                proQuestion(`What makes ${item.title} remediation professionally useful?`, "It fixes the root control and defines a reproducible regression or retest case", "It blocks the tester IP", "It hides the route", "It adds a client-side warning")
            ], module.number + lessonIndex);

        });

    });


    const integrativeScenarios = [
        proQuestion("A request succeeds only when the original browser cookies are present. What should the tester document?", "The exact authenticated session context and whether the behavior crosses an authorization boundary", "Only the URL", "A network vulnerability", "That cookies are insecure"),
        proQuestion("A hidden form field contains a price, but the server recalculates the total. What is the correct conclusion?", "The client value is untrusted but the tested server-side integrity control prevented manipulation", "Confirmed price tampering", "SQL injection", "Broken authentication"),
        proQuestion("A second user changes an object identifier and receives the first user's record. What proves the issue?", "Controlled identities, ownership baseline, modified request, returned object and server authorization failure", "The identifier changed", "A 200 response only", "The object format"),
        proQuestion("Input is reflected inside a quoted JavaScript string with escaping. What must happen before reporting XSS?", "Analyze the exact JavaScript context and verify whether safe marker execution is possible", "Report reflection as XSS", "Use a destructive payload", "Disable the browser"),
        proQuestion("A cross-site form triggers an action even though the response cannot be read. Which property matters?", "Whether the authenticated state-changing request was accepted without verifying user intent", "Whether CORS allowed reading", "The page color", "The URL length"),
        proQuestion("CORS reflects any Origin and allows credentials. What evidence is needed for impact?", "A controlled origin that can make a credentialed request and read a sensitive authorized response", "Only the response header", "A failed preflight", "An unauthenticated public response"),
        proQuestion("An uploaded file is renamed and stored outside the web root but can still be downloaded. What should be assessed?", "Authorization, content handling, metadata, scanning, response headers and storage isolation", "Only the extension", "Only whether PHP executes", "Only the filename"),
        proQuestion("An API returns extra internal fields to every authorized user. What is the strongest finding focus?", "Excessive data exposure and output-schema minimization for the relevant role", "Broken TLS", "Missing CSRF only", "DNS misconfiguration"),
        proQuestion("A remediation blocks the original request but an alternate HTTP method still performs the action. What is the retest result?", "The server-side control remains incomplete and the bypass must be documented", "Remediation passed", "A separate informational note only", "The browser is vulnerable"),
        proQuestion("What makes the web capstone recruiter-ready?", "Application mapping, role-aware tests, reproducible HTTP evidence, minimum-impact findings, root-cause remediation and verified retests", "The most scanner findings", "Unredacted tokens", "Only screenshots")
    ];

    const finalQuestions = [
        ...course.finalAssessment.questions,
        ...integrativeScenarios
    ];

    course.finalAssessment = {
        ...course.finalAssessment,
        description:
            "A professional scenario-based assessment covering HTTP, proxy workflows, authentication, sessions, authorization, server and browser trust, file handling, APIs, reporting and retesting.",
        duration: "75–90 minutes",
        passingScore: 85,
        allowRetry: true,
        required: true,
        questionCount: finalQuestions.length,
        questions: balanceAnswerPositions(finalQuestions)
    };

    course.capstone = {
        title: "OWASP-Aligned Web Application Security Assessment",
        required: true,
        estimatedTime: "14–18 hours",
        scenario:
            "Assess a deliberately vulnerable CWS Academy web application with multiple roles, browser flows and JSON APIs. The goal is defensible control verification, not maximum exploitation or data collection.",
        deliverables: [
            "Scope, test accounts, data-handling rules and stop conditions",
            "Application, endpoint, role and trust-boundary map",
            "Authentication and session lifecycle test record",
            "Horizontal and vertical authorization matrix",
            "Server-side input and interpreter-boundary tests",
            "Browser source, sink and context analysis",
            "CSRF, CORS and origin-trust review",
            "Upload, download and canonical-path review",
            "API object, function, schema, rate and business-flow tests",
            "Request library with paired baseline and modified evidence",
            "False-positive and coverage-limit register",
            "Professional findings mapped to stable OWASP WSTG sections and relevant ASVS controls",
            "Executive summary and prioritized remediation roadmap",
            "Verified cleanup and session invalidation record",
            "Exact retest cases and sanitized portfolio report"
        ],
        rubric: {
            applicationAndThreatMapping: 15,
            methodologyAndCoverage: 20,
            technicalValidation: 25,
            evidenceAndReproducibility: 15,
            remediationAndRetesting: 15,
            reportingAndRiskCommunication: 5,
            dataHandlingAndProfessionalConduct: 5
        }
    };

    course.qualityVersion = "CWS-PRO-STANDARD-2026.2";

}


applyWebApplicationSecurityProStandard(webApplicationSecurity);
