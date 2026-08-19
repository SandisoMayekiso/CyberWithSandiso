/* =========================================================
   CWS ACADEMY
   PYTHON FOR OFFENSIVE SECURITY
   PRO • INTERMEDIATE
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
        "This concept helps automate repetitive security-assessment tasks safely and consistently.";

    const how =
        data.how ||
        "Define the input, validate scope, process data predictably, log output and preserve evidence.";

    return {

        id,
        title,

        duration:
            data.duration ||
            "55 minutes",

        access:
            "pro",

        type:
            "Lesson",

        icon:
            data.icon ||
            "fa-brands fa-python",

        subtitle:
            data.subtitle ||
            `Build practical Python skills for authorized security assessment.`,

        objectives:
            data.objectives ||
            [
                `Explain ${title} in your own words.`,
                `Describe why ${title} matters in offensive-security automation.`,
                `Implement a safe Python example.`,
                `Validate input and handle failure conditions.`,
                `Preserve useful output for evidence.`
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


            <h2>Security Automation Principles</h2>

            <ul>
                <li>Validate every target, file and argument before acting.</li>
                <li>Prefer read-only or low-impact operations by default.</li>
                <li>Log what the script did and what it observed.</li>
                <li>Handle errors explicitly instead of failing silently.</li>
                <li>Keep high-impact decisions under human control.</li>
            </ul>


            <h2>Worked Scenario</h2>

            <p>
                ${
                    data.example ||
                    "Use a small authorized lab dataset or target list, process it with Python, and write structured output that another tester can verify."
                }
            </p>


            <h2>Common Mistakes</h2>

            <ul>
                <li>Hard-coding targets or credentials into scripts.</li>
                <li>Skipping input validation.</li>
                <li>Using broad network ranges without scope checks.</li>
                <li>Ignoring timeouts and exceptions.</li>
                <li>Overwriting evidence files without clear naming.</li>
            </ul>


            <h2>Before Moving On</h2>

            <p>
                You should be able to explain the script logic,
                predict failure cases and justify why the automation is
                safe for the authorized task it performs.
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
                        "Input Validation",
                    description:
                        "Checking user-supplied values before the script uses them."
                },
                {
                    title:
                        "Scope Safety",
                    description:
                        "Preventing automation from operating outside explicitly authorized targets."
                },
                {
                    title:
                        "Evidence Output",
                    description:
                        "Structured results that can be reviewed and reproduced."
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
                        `What should drive automation of ${title}?`,
                    options: [
                        "A defined repetitive assessment task with validated inputs",
                        "Maximum scan speed",
                        "Random experimentation",
                        "Unbounded targets"
                    ],
                    answer:
                        0
                },
                {
                    question:
                        "What should scripts do with unexpected input?",
                    options: [
                        "Reject or handle it safely",
                        "Assume it is valid",
                        "Expand scope",
                        "Ignore errors"
                    ],
                    answer:
                        0
                },
                {
                    question:
                        "What makes security automation professional?",
                    options: [
                        "Predictable behavior, logging, validation and human oversight",
                        "Maximum aggressiveness",
                        "No documentation",
                        "Hard-coded secrets"
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
            "90–140 minutes",

        objective:
            extra.objective ||
            `Build a safe Python utility related to ${moduleTitle}.`,

        scenario:
            extra.scenario ||
            "You are automating a repetitive task for an explicitly authorized CWS security lab.",

        prerequisites:
            extra.prerequisites ||
            [
                "Python 3",
                "Isolated lab or sample data",
                "Authorized target list where networking is involved",
                "Text editor or IDE"
            ],

        instructions:
            extra.instructions ||
            [
                "Define the task and allowed input.",
                `Apply the ${moduleTitle} concepts taught in this module.`,
                "Validate arguments before processing.",
                "Add timeout and error handling where appropriate.",
                "Write structured output.",
                "Test both successful and failure conditions.",
                "Document how the script avoids unsafe behavior."
            ],

        evidence:
            extra.evidence ||
            [
                "Python source file",
                "Example input",
                "Example output",
                "Short design notes"
            ],

        reflection:
            extra.reflection ||
            [
                "Which input could create the most risk if not validated?",
                "What should remain a manual decision?",
                "How would you make the utility easier to audit?"
            ],

        safety:
            "Use only systems you own or are explicitly authorized to assess. Keep automation scoped, rate-conscious and non-destructive."

    };

}


/* =========================================================
   ASSESSMENT BUILDER
========================================================= */

function buildAssessment(
    title
) {

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

        questions: [
            {
                question:
                    "What should happen before a security script uses a target?",
                options: [
                    "Validate it against the authorized scope",
                    "Assume it is allowed",
                    "Expand the range",
                    "Disable logging"
                ],
                answer:
                    0
            },
            {
                question:
                    "Why are timeouts important in network scripts?",
                options: [
                    "They prevent indefinite blocking and improve predictable behavior",
                    "They increase privilege",
                    "They remove scope checks",
                    "They disable errors"
                ],
                answer:
                    0
            },
            {
                question:
                    "What is good evidence output?",
                options: [
                    "Structured, timestamped and reproducible results",
                    "Only console text with no context",
                    "Overwritten files",
                    "Unlabeled screenshots"
                ],
                answer:
                    0
            },
            {
                question:
                    "What is the preferred automation principle?",
                options: [
                    "Automate repetitive low-risk work and keep high-impact decisions manual",
                    "Automate every possible action",
                    "Ignore errors",
                    "Hard-code credentials"
                ],
                answer:
                    0
            },
            {
                question:
                    "What makes Python security tooling professional?",
                options: [
                    "Clear inputs, validation, logging, error handling and documentation",
                    "Only speed",
                    "Only complexity",
                    "Only obfuscation"
                ],
                answer:
                    0
            }
        ]

    };

}


/* =========================================================
   COURSE
========================================================= */

export const pythonOffensiveSecurity = {

    id:
        "python-offensive-security",

    title:
        "Python for Offensive Security",

    overviewTitle:
        "Build Safe, Reusable Python Utilities for Authorized Security Testing",

    category:
        "CWS ACADEMY • SECURITY AUTOMATION",

    level:
        "Intermediate",

    levelKey:
        "intermediate",

    status:
        "available",

    access:
        "pro",

    icon:
        "fa-brands fa-python",

    description:
        "Build practical Python utilities for authorized security testing, including networking, HTTP requests, parsing, evidence processing, scoped enumeration helpers, automation workflows and reporting support.",

    longDescription:
        "Python for Offensive Security is a CWS Pro automation course for students who already understand Python fundamentals and ethical hacking. The course focuses on building small, auditable tools that support reconnaissance, HTTP analysis, socket programming, scan-result parsing, evidence handling and workflow automation. The emphasis is on scope safety, input validation, error handling and reproducible results rather than uncontrolled exploitation.",

    duration:
        "55–70 Hours",

    estimatedLessons:
        30,

    certificateEligible:
        true,

    learningStandard:
        "Python Automation • Networking • HTTP • Parsing • Evidence • Safe Assessment Utilities",

    prerequisites: [
        "Python Fundamentals for Cybersecurity",
        "Networking Fundamentals",
        "Ethical Hacking"
    ],

    recommendedPrerequisites: [
        "Bash & Linux Automation",
        "Practical Penetration Testing",
        "Web Application Security"
    ],

    completionRules: {

        minimumLessonCompletion:
            100,

        minimumModuleAssessmentScore:
            75,

        finalAssessmentPassingScore:
            80,

        requireAllModuleAssessments:
            true,

        requireRequiredLabs:
            true,

        requireFinalAssessment:
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
            true

    },

    objectives: [
        "Build reusable command-line Python utilities.",
        "Validate targets, arguments and files safely.",
        "Use sockets for low-impact network inspection.",
        "Use Python HTTP libraries for authorized web analysis.",
        "Parse Nmap-style and text-based security results.",
        "Work with JSON and API responses.",
        "Automate evidence collection and normalization.",
        "Create scoped enumeration helpers.",
        "Add logging, timeouts and robust error handling.",
        "Build a final offensive-security automation toolkit."
    ],

    modules: [

        {
            id:
                "module-01",

            number:
                1,

            title:
                "Security Tooling Design",

            description:
                "Learn how to design small, safe and auditable security utilities.",

            access:
                "pro",

            labs:
                1,

            assessments:
                1,

            lessons: [

                buildLesson(
                    "lesson-01",
                    "What Makes a Good Security Utility",
                    {
                        what:
                            "a focused script that solves one defined assessment task predictably",

                        why:
                            "small tools are easier to review, test and trust",

                        how:
                            "define purpose, inputs, outputs, safety limits and failure behavior before coding"
                    }
                ),

                buildLesson(
                    "lesson-02",
                    "Arguments and Scope Validation",
                    {
                        what:
                            "checking command-line arguments and authorized targets before use",

                        why:
                            "automation can amplify mistakes if the wrong target is accepted",

                        how:
                            "parse arguments, normalize values and reject targets outside the allowed scope"
                    }
                ),

                buildLesson(
                    "lesson-03",
                    "Logging and Evidence Files",
                    {
                        what:
                            "recording what the script did and what it observed",

                        why:
                            "security automation should produce evidence another tester can review",

                        how:
                            "write timestamped structured logs and preserve original source data"
                    }
                )

            ],

            labActivities: [
                buildLab(
                    "lab-01",
                    "Build a Safe CLI Utility Skeleton",
                    "Security Tooling Design"
                )
            ],

            moduleAssessment:
                buildAssessment(
                    "Module 1 Assessment — Tooling Design"
                )
        },


        {
            id:
                "module-02",

            number:
                2,

            title:
                "Socket Programming for Security",

            description:
                "Use Python sockets to understand connections, banners and basic network communication.",

            access:
                "pro",

            labs:
                1,

            assessments:
                1,

            lessons: [

                buildLesson(
                    "lesson-01",
                    "TCP Sockets",
                    {
                        what:
                            "Python interfaces for creating TCP network connections",

                        why:
                            "sockets help students understand what higher-level network tools automate",

                        how:
                            "create a socket, set a timeout, connect to one authorized host and close cleanly"
                    }
                ),

                buildLesson(
                    "lesson-02",
                    "Banner Collection",
                    {
                        what:
                            "reading application data returned by a listening service",

                        why:
                            "service banners may provide useful identification evidence",

                        how:
                            "connect to a known authorized service, receive a small amount of data and save it"
                    }
                ),

                buildLesson(
                    "lesson-03",
                    "Timeouts and Connection Errors",
                    {
                        what:
                            "handling unreachable, filtered or slow services predictably",

                        why:
                            "network automation must not hang indefinitely",

                        how:
                            "set explicit timeouts and catch connection-related exceptions"
                    }
                )

            ],

            labActivities: [
                buildLab(
                    "lab-01",
                    "Build a Single-Host Banner Collector",
                    "Socket Programming for Security"
                )
            ],

            moduleAssessment:
                buildAssessment(
                    "Module 2 Assessment — Sockets"
                )
        },


        {
            id:
                "module-03",

            number:
                3,

            title:
                "Scoped Network Enumeration Helpers",

            description:
                "Build low-impact helpers for authorized hosts and small target lists.",

            access:
                "pro",

            labs:
                1,

            assessments:
                1,

            lessons: [

                buildLesson(
                    "lesson-01",
                    "Target Lists and Scope Files",
                    {
                        what:
                            "structured files containing only explicitly authorized systems",

                        why:
                            "scope files reduce the chance of scripts operating on unintended targets",

                        how:
                            "load, normalize, validate and deduplicate authorized target values"
                    }
                ),

                buildLesson(
                    "lesson-02",
                    "Small Port Checkers",
                    {
                        what:
                            "scripts that test a short approved list of service ports",

                        why:
                            "focused checks are easier to audit than uncontrolled broad scans",

                        how:
                            "iterate through explicitly provided ports with timeouts and structured results"
                    }
                ),

                buildLesson(
                    "lesson-03",
                    "Rate and Concurrency Awareness",
                    {
                        what:
                            "controlling how quickly automation creates network activity",

                        why:
                            "high concurrency can overload fragile lab or real systems",

                        how:
                            "keep defaults conservative and make concurrency an explicit controlled option"
                    }
                )

            ],

            labActivities: [
                buildLab(
                    "lab-01",
                    "Build a Scoped Service Checker",
                    "Scoped Network Enumeration Helpers"
                )
            ],

            moduleAssessment:
                buildAssessment(
                    "Module 3 Assessment — Scoped Enumeration"
                )
        },


        {
            id:
                "module-04",

            number:
                4,

            title:
                "HTTP Automation",

            description:
                "Use Python to inspect authorized web applications and APIs.",

            access:
                "pro",

            labs:
                1,

            assessments:
                1,

            lessons: [

                buildLesson(
                    "lesson-01",
                    "HTTP Requests with Python",
                    {
                        what:
                            "sending HTTP requests programmatically using a high-level client library",

                        why:
                            "Python can automate repeatable request collection and comparison",

                        how:
                            "send GET or HEAD requests to explicitly authorized URLs and record status, headers and response metadata"
                    }
                ),

                buildLesson(
                    "lesson-02",
                    "Headers, Cookies and Sessions",
                    {
                        what:
                            "programmatically inspecting web state and response metadata",

                        why:
                            "cookies and headers often contain security-relevant behavior",

                        how:
                            "use a session object, preserve cookies intentionally and log only necessary values"
                    }
                ),

                buildLesson(
                    "lesson-03",
                    "Safe Request Comparison",
                    {
                        what:
                            "comparing two authorized requests to identify changed behavior",

                        why:
                            "controlled comparisons help isolate one application assumption",

                        how:
                            "change one parameter or header at a time and compare status, length and selected content"
                    }
                )

            ],

            labActivities: [
                buildLab(
                    "lab-01",
                    "Build an HTTP Response Comparator",
                    "HTTP Automation"
                )
            ],

            moduleAssessment:
                buildAssessment(
                    "Module 4 Assessment — HTTP Automation"
                )
        },


        {
            id:
                "module-05",

            number:
                5,

            title:
                "JSON and API Processing",

            description:
                "Work with structured API data safely and efficiently.",

            access:
                "pro",

            labs:
                1,

            assessments:
                1,

            lessons: [

                buildLesson(
                    "lesson-01",
                    "Parsing JSON Responses",
                    {
                        what:
                            "converting JSON response data into Python objects",

                        why:
                            "modern applications often expose structured API responses",

                        how:
                            "validate response type, parse JSON safely and handle missing fields"
                    }
                ),

                buildLesson(
                    "lesson-02",
                    "API Pagination and Result Collection",
                    {
                        what:
                            "processing authorized multi-page API responses",

                        why:
                            "security-relevant inventory data may span many pages",

                        how:
                            "follow documented pagination while preserving request limits and scope"
                    }
                ),

                buildLesson(
                    "lesson-03",
                    "API Error Handling",
                    {
                        what:
                            "handling status codes, malformed responses and rate limits",

                        why:
                            "robust scripts should distinguish network failure from application denial or malformed data",

                        how:
                            "check status codes, catch parsing errors and back off appropriately"
                    }
                )

            ],

            labActivities: [
                buildLab(
                    "lab-01",
                    "Build an Authorized API Collector",
                    "JSON and API Processing"
                )
            ],

            moduleAssessment:
                buildAssessment(
                    "Module 5 Assessment — APIs"
                )
        },


        {
            id:
                "module-06",

            number:
                6,

            title:
                "Parsing Security Tool Output",

            description:
                "Turn raw scan and enumeration results into structured evidence.",

            access:
                "pro",

            labs:
                1,

            assessments:
                1,

            lessons: [

                buildLesson(
                    "lesson-01",
                    "Text Parsing Strategies",
                    {
                        what:
                            "extracting meaningful fields from line-oriented tool output",

                        why:
                            "raw output is often difficult to compare or summarize",

                        how:
                            "identify stable delimiters, normalize whitespace and preserve the source line"
                    }
                ),

                buildLesson(
                    "lesson-02",
                    "Nmap-Style Result Parsing",
                    {
                        what:
                            "extracting host, port and service information from saved scan results",

                        why:
                            "structured service inventories support later enumeration and reporting",

                        how:
                            "parse saved authorized scan output rather than launching scans from the parser"
                    }
                ),

                buildLesson(
                    "lesson-03",
                    "CSV and JSON Evidence Export",
                    {
                        what:
                            "writing normalized results into machine-readable formats",

                        why:
                            "structured output makes later analysis and reporting easier",

                        how:
                            "write consistent fields and retain timestamps and source references"
                    }
                )

            ],

            labActivities: [
                buildLab(
                    "lab-01",
                    "Build a Scan Result Normalizer",
                    "Parsing Security Tool Output"
                )
            ],

            moduleAssessment:
                buildAssessment(
                    "Module 6 Assessment — Parsing"
                )
        },


        {
            id:
                "module-07",

            number:
                7,

            title:
                "Evidence and Reporting Automation",

            description:
                "Generate structured evidence summaries without replacing tester judgment.",

            access:
                "pro",

            labs:
                1,

            assessments:
                1,

            lessons: [

                buildLesson(
                    "lesson-01",
                    "Evidence Naming and Metadata",
                    {
                        what:
                            "consistent naming and metadata for screenshots, logs and output files",

                        why:
                            "good evidence organization improves reproducibility",

                        how:
                            "include finding ID, target, timestamp and source type where appropriate"
                    }
                ),

                buildLesson(
                    "lesson-02",
                    "Generating Finding Drafts",
                    {
                        what:
                            "using structured evidence to pre-populate a finding template",

                        why:
                            "automation can reduce repetitive report formatting",

                        how:
                            "generate a draft containing observed facts while keeping impact and severity decisions manual"
                    }
                ),

                buildLesson(
                    "lesson-03",
                    "Audit Trails for Automation",
                    {
                        what:
                            "records showing exactly what the script processed and produced",

                        why:
                            "automated evidence should remain traceable to original sources",

                        how:
                            "log input filenames, hashes where appropriate, processing time and output location"
                    }
                )

            ],

            labActivities: [
                buildLab(
                    "lab-01",
                    "Build an Evidence Summary Generator",
                    "Evidence and Reporting Automation"
                )
            ],

            moduleAssessment:
                buildAssessment(
                    "Module 7 Assessment — Evidence Automation"
                )
        },


        {
            id:
                "module-08",

            number:
                8,

            title:
                "Defensive Data Enrichment",

            description:
                "Enrich collected evidence with safe contextual information.",

            access:
                "pro",

            labs:
                1,

            assessments:
                1,

            lessons: [

                buildLesson(
                    "lesson-01",
                    "Hostname and IP Normalization",
                    {
                        what:
                            "standardizing target identifiers for reliable correlation",

                        why:
                            "the same host may appear under multiple names in evidence",

                        how:
                            "normalize IPs, hostnames and case while preserving original values"
                    }
                ),

                buildLesson(
                    "lesson-02",
                    "Service Metadata Enrichment",
                    {
                        what:
                            "adding protocol, port and service context to findings",

                        why:
                            "structured metadata improves prioritization and reporting",

                        how:
                            "map known service information to observed ports without assuming vulnerability"
                    }
                ),

                buildLesson(
                    "lesson-03",
                    "Deduplication and Correlation",
                    {
                        what:
                            "combining repeated observations that refer to the same asset or service",

                        why:
                            "duplicate evidence can distort assessment summaries",

                        how:
                            "define stable keys and retain all supporting source references"
                    }
                )

            ],

            labActivities: [
                buildLab(
                    "lab-01",
                    "Build an Evidence Correlator",
                    "Defensive Data Enrichment"
                )
            ],

            moduleAssessment:
                buildAssessment(
                    "Module 8 Assessment — Data Enrichment"
                )
        },


        {
            id:
                "module-09",

            number:
                9,

            title:
                "Reliable Security Automation",

            description:
                "Improve maintainability, testing and safety of Python security utilities.",

            access:
                "pro",

            labs:
                1,

            assessments:
                1,

            lessons: [

                buildLesson(
                    "lesson-01",
                    "Configuration Files and Secrets",
                    {
                        what:
                            "separating runtime configuration from source code",

                        why:
                            "hard-coded secrets and targets are difficult to protect and audit",

                        how:
                            "use configuration files or environment variables and avoid committing sensitive values"
                    }
                ),

                buildLesson(
                    "lesson-02",
                    "Unit Testing Small Utilities",
                    {
                        what:
                            "testing functions independently with known input and output",

                        why:
                            "security scripts need predictable behavior before they touch live lab systems",

                        how:
                            "write tests for parsing, validation and failure conditions"
                    }
                ),

                buildLesson(
                    "lesson-03",
                    "Safe Defaults and Dry-Run Modes",
                    {
                        what:
                            "designing scripts so the default behavior is low risk",

                        why:
                            "users make mistakes, so safety should not depend only on memory",

                        how:
                            "make read-only behavior default and provide preview/dry-run output before optional actions"
                    }
                )

            ],

            labActivities: [
                buildLab(
                    "lab-01",
                    "Harden a Security Utility",
                    "Reliable Security Automation"
                )
            ],

            moduleAssessment:
                buildAssessment(
                    "Module 9 Assessment — Reliable Automation"
                )
        },


        {
            id:
                "module-10",

            number:
                10,

            title:
                "Python Offensive Security Capstone",

            description:
                "Build a small, auditable toolkit that supports an authorized assessment workflow.",

            access:
                "pro",

            labs:
                1,

            assessments:
                1,

            lessons: [

                buildLesson(
                    "lesson-01",
                    "Capstone Toolkit Design",
                    {
                        what:
                            "planning a set of small Python utilities with clear responsibilities",

                        why:
                            "modular tools are easier to audit and reuse",

                        how:
                            "define target validation, collection, parsing, evidence and reporting components"
                    }
                ),

                buildLesson(
                    "lesson-02",
                    "Build and Test the Toolkit",
                    {
                        what:
                            "implementing the selected utilities and testing them with authorized lab data",

                        why:
                            "the capstone measures practical automation quality rather than code size",

                        how:
                            "build incrementally, test failure cases and preserve structured evidence"
                    }
                ),

                buildLesson(
                    "lesson-03",
                    "Documentation and Professional Handoff",
                    {
                        what:
                            "writing usage, safety and maintenance documentation",

                        why:
                            "security tooling should be understandable by another tester",

                        how:
                            "document purpose, arguments, examples, limitations, output and safe operating assumptions"
                    }
                )

            ],

            labActivities: [
                buildLab(
                    "lab-01",
                    "CWS Python Security Automation Capstone",
                    "Python Offensive Security Capstone",
                    {
                        duration:
                            "180–240 minutes",

                        instructions: [
                            "Define the authorized assessment-support workflow.",
                            "Build a scope-file loader and validator.",
                            "Build one low-impact network or HTTP collection utility.",
                            "Build one parser for saved evidence.",
                            "Export structured JSON or CSV results.",
                            "Generate a simple evidence summary.",
                            "Add logging, timeouts and error handling.",
                            "Add a dry-run or preview mode where appropriate.",
                            "Test invalid input and failure conditions.",
                            "Write usage and safety documentation."
                        ],

                        evidence: [
                            "Python source files",
                            "README or usage documentation",
                            "Sample input",
                            "Sample structured output",
                            "Test results"
                        ]
                    }
                )
            ],

            moduleAssessment:
                buildAssessment(
                    "Module 10 Assessment — Python Security Automation Capstone"
                )
        }

    ],


    /* =========================================================
       FINAL ASSESSMENT
    ========================================================= */

    finalAssessment: {

        title:
            "CWS Python for Offensive Security Final Assessment",

        description:
            "Demonstrate safe Python automation for networking, HTTP, parsing, evidence and assessment-support workflows.",

        passingScore:
            80,

        allowRetry:
            true,

        required:
            true,

        questions: [

            {
                question:
                    "What should define a security utility before coding begins?",
                options: [
                    "Purpose, input, output, scope and failure behavior",
                    "Only the programming language",
                    "Only speed",
                    "Only the target"
                ],
                answer:
                    0
            },

            {
                question:
                    "Why validate targets?",
                options: [
                    "To prevent automation from operating outside authorized scope",
                    "To increase scan speed",
                    "To avoid logging",
                    "To expand ranges"
                ],
                answer:
                    0
            },

            {
                question:
                    "Why use timeouts?",
                options: [
                    "To prevent indefinite blocking",
                    "To gain privilege",
                    "To bypass authentication",
                    "To remove exceptions"
                ],
                answer:
                    0
            },

            {
                question:
                    "What is the purpose of a socket?",
                options: [
                    "Provide a programming interface for network communication",
                    "Store passwords",
                    "Compile Python",
                    "Resolve permissions"
                ],
                answer:
                    0
            },

            {
                question:
                    "What is a safe banner-collection approach?",
                options: [
                    "Connect to one authorized known service with a timeout and read limited data",
                    "Scan the public internet",
                    "Send unlimited requests",
                    "Ignore scope"
                ],
                answer:
                    0
            },

            {
                question:
                    "Why keep concurrency conservative?",
                options: [
                    "High concurrency can overload targets or create unnecessary noise",
                    "Python cannot use threads",
                    "Concurrency disables logging",
                    "Concurrency changes DNS"
                ],
                answer:
                    0
            },

            {
                question:
                    "What should an HTTP automation script record?",
                options: [
                    "Relevant status, headers, metadata and the tested URL",
                    "Only page color",
                    "Only cookies",
                    "Nothing"
                ],
                answer:
                    0
            },

            {
                question:
                    "Why change one HTTP value at a time?",
                options: [
                    "To isolate which input caused the behavior change",
                    "To increase impact",
                    "To bypass TLS",
                    "To avoid evidence"
                ],
                answer:
                    0
            },

            {
                question:
                    "What should happen when JSON parsing fails?",
                options: [
                    "Handle the error and preserve the original response context",
                    "Crash silently",
                    "Assume success",
                    "Delete the response"
                ],
                answer:
                    0
            },

            {
                question:
                    "Why parse saved scan results instead of automatically launching new scans?",
                options: [
                    "It separates evidence processing from active testing and reduces unintended activity",
                    "Scans cannot be automated",
                    "Parsing is always faster",
                    "Nmap has no output"
                ],
                answer:
                    0
            },

            {
                question:
                    "What is good structured evidence output?",
                options: [
                    "Consistent fields with timestamps and source references",
                    "Unlabeled console text",
                    "Overwritten files",
                    "Only screenshots"
                ],
                answer:
                    0
            },

            {
                question:
                    "Why preserve original evidence?",
                options: [
                    "Processed summaries should remain traceable to source data",
                    "Original evidence is never useful",
                    "Reports replace evidence",
                    "Parsing changes scope"
                ],
                answer:
                    0
            },

            {
                question:
                    "What should automation do with severity decisions?",
                options: [
                    "Support them with data but keep final judgment human-reviewed",
                    "Always set critical",
                    "Ignore impact",
                    "Use file size"
                ],
                answer:
                    0
            },

            {
                question:
                    "Why avoid hard-coded secrets?",
                options: [
                    "They are difficult to protect, rotate and audit",
                    "Python cannot read strings",
                    "Secrets only matter in production",
                    "Hard-coding improves security"
                ],
                answer:
                    0
            },

            {
                question:
                    "What is a dry-run mode?",
                options: [
                    "A preview of intended behavior without performing the action",
                    "A root shell",
                    "A network exploit",
                    "A password attack"
                ],
                answer:
                    0
            },

            {
                question:
                    "Why unit-test parsing and validation functions?",
                options: [
                    "To confirm predictable behavior before using real lab data",
                    "To remove exceptions",
                    "To bypass scope",
                    "To increase network traffic"
                ],
                answer:
                    0
            },

            {
                question:
                    "What should be automated first?",
                options: [
                    "Repeatable, low-risk tasks",
                    "High-impact exploitation",
                    "Privilege escalation",
                    "Anything without review"
                ],
                answer:
                    0
            },

            {
                question:
                    "What is the purpose of logging?",
                options: [
                    "Record what the utility did and observed",
                    "Hide actions",
                    "Store credentials",
                    "Replace evidence"
                ],
                answer:
                    0
            },

            {
                question:
                    "What should documentation include?",
                options: [
                    "Purpose, arguments, examples, limitations and safety assumptions",
                    "Only the author name",
                    "Only dependencies",
                    "Only output"
                ],
                answer:
                    0
            },

            {
                question:
                    "What best demonstrates Python offensive-security competence?",
                options: [
                    "Building safe, auditable utilities that support evidence-driven authorized testing",
                    "Writing the longest script",
                    "Automating maximum impact",
                    "Avoiding validation"
                ],
                answer:
                    0
            }

        ]

    }

};
