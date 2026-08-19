/* =========================================================
   CWS ACADEMY
   PRACTICAL PENETRATION TESTING
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
        "This concept supports structured, evidence-driven penetration testing.";


    const how =
        data.how ||
        "Apply a repeatable workflow, validate observations manually and document evidence.";


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
            "fa-solid fa-bullseye",

        subtitle:
            data.subtitle ||
            `Apply ${title} in realistic authorized penetration-testing scenarios.`,

        objectives:
            data.objectives ||
            [
                `Explain ${title} in your own words.`,
                `Describe where ${title} fits in a penetration test.`,
                `Apply ${title} in an isolated authorized lab.`,
                `Interpret the resulting evidence.`,
                `Document the result professionally.`
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


            <h2>Penetration-Testing Workflow</h2>

            <pre><code>${
                data.workflow ||
                "Scope → Reconnaissance → Discovery → Enumeration → Validation → Evidence → Reporting"
            }</code></pre>


            <h2>Worked Scenario</h2>

            <p>
                ${
                    data.example ||
                    "Apply the concept to an intentionally vulnerable CWS lab system. Record what you observed, what you inferred and what still requires validation."
                }
            </p>


            <h2>Common Mistakes</h2>

            <ul>
                <li>Using tools before defining the question the tool should answer.</li>
                <li>Running broad automation without validating scope.</li>
                <li>Confusing service exposure with confirmed vulnerability.</li>
                <li>Failing to preserve command output and timestamps.</li>
                <li>Escalating impact beyond what is needed to prove the finding.</li>
            </ul>


            <h2>Professional Validation</h2>

            <ol>
                <li>Confirm target identity and scope.</li>
                <li>Establish the expected secure behavior.</li>
                <li>Collect a baseline observation.</li>
                <li>Perform one controlled test.</li>
                <li>Compare the result with the baseline.</li>
                <li>Capture evidence and write the security implication.</li>
            </ol>


            <h2>Before Moving On</h2>

            <p>
                You should be able to perform the workflow without blindly
                copying commands, explain why each step is necessary and
                justify the next assessment action based on evidence.
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
                        "Evidence",
                    description:
                        "Observable information supporting a penetration-test conclusion."
                },
                {
                    title:
                        "Validation",
                    description:
                        "Confirming a weakness using the minimum necessary impact."
                },
                {
                    title:
                        "Assessment Chain",
                    description:
                        "A sequence of observations and weaknesses that combine into meaningful risk."
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
                        `What should drive the use of ${title}?`,
                    options: [
                        "A defined assessment objective and observed evidence",
                        "Tool popularity",
                        "Maximum impact",
                        "Random testing"
                    ],
                    answer:
                        0
                },
                {
                    question:
                        "What is the best next step after an uncertain observation?",
                    options: [
                        "Gather additional evidence safely",
                        "Report it as critical",
                        "Exploit unrelated systems",
                        "Ignore scope"
                    ],
                    answer:
                        0
                },
                {
                    question:
                        "What makes penetration testing professional?",
                    options: [
                        "Authorization, methodology, evidence, interpretation and reporting",
                        "Using many tools",
                        "Always obtaining administrator access",
                        "Avoiding documentation"
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
            "Practical Lab",

        duration:
            extra.duration ||
            "90–150 minutes",

        objective:
            extra.objective ||
            `Apply ${moduleTitle} in a multi-stage authorized CWS penetration-testing lab.`,

        scenario:
            extra.scenario ||
            "You are conducting an authorized penetration test against isolated CWS training systems with defined scope and rules of engagement.",

        prerequisites:
            extra.prerequisites ||
            [
                "Written lab scope",
                "Kali Linux or equivalent testing VM",
                "Authorized vulnerable training targets",
                "Assessment workspace",
                "VM snapshots where appropriate"
            ],

        instructions:
            extra.instructions ||
            [
                "Confirm scope before active work.",
                `Apply the ${moduleTitle} methodology taught in this module.`,
                "Record each meaningful action and result.",
                "Separate observations from conclusions.",
                "Validate suspected weaknesses using the minimum necessary impact.",
                "Save relevant evidence.",
                "Document defensive remediation.",
                "Clean up approved testing artifacts."
            ],

        evidence:
            extra.evidence ||
            [
                "Assessment timeline",
                "Tool output",
                "Screenshots where useful",
                "Finding notes",
                "Remediation recommendation"
            ],

        reflection:
            extra.reflection ||
            [
                "Which observation changed your testing path?",
                "What evidence was sufficient to support the finding?",
                "How could the target environment prevent or detect this issue?"
            ],

        safety:
            "Use only isolated lab systems or environments where you have explicit authorization."

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
                "What should determine the next penetration-testing action?",
            options: [
                "Evidence and the defined assessment objective",
                "The longest command available",
                "Maximum impact",
                "Tool popularity"
            ],
            answer:
                0
        },
        {
            question:
                "Why should findings be manually validated?",
            options: [
                "Automated results may be incomplete or false",
                "Scanners never work",
                "Evidence is optional",
                "Only exploitation matters"
            ],
            answer:
                0
        },
        {
            question:
                "What is the correct approach to scope?",
            options: [
                "Verify target identity continuously during testing",
                "Assume nearby systems are included",
                "Expand scope automatically",
                "Ignore subnet boundaries"
            ],
            answer:
                0
        },
        {
            question:
                "What is the preferred exploitation principle?",
            options: [
                "Use the minimum necessary action to demonstrate impact",
                "Maximize disruption",
                "Collect all accessible data",
                "Modify unrelated accounts"
            ],
            answer:
                0
        },
        {
            question:
                "What makes a finding actionable?",
            options: [
                "Evidence, impact and clear remediation",
                "Only a tool name",
                "Only a severity number",
                "Only a screenshot"
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
   COURSE
========================================================= */

export const practicalPenetrationTesting = {

    id:
        "practical-penetration-testing",

    title:
        "Practical Penetration Testing",

    overviewTitle:
        "Run Multi-Stage Authorized Penetration Tests from Scope to Final Report",

    category:
        "CWS ACADEMY • OFFENSIVE SECURITY",

    level:
        "Intermediate",

    levelKey:
        "intermediate",

    status:
        "available",

    access:
        "pro",

    icon:
        "fa-solid fa-bullseye",

    description:
        "Apply networking, Linux, reconnaissance, enumeration, vulnerability validation, web testing, privilege analysis, automation, evidence handling and reporting in multi-stage penetration-testing labs.",

    longDescription:
        "Practical Penetration Testing is the CWS Pro capstone course for students who have completed the core foundations and offensive-security courses. Instead of studying techniques in isolation, students perform structured multi-stage assessments against intentionally vulnerable training environments. The course emphasizes methodology, evidence-driven decisions, attack-chain reasoning, controlled exploitation, privilege analysis, web testing, automation, reporting and retesting.",

    duration:
        "70–90 Hours",

    estimatedLessons:
        30,

    certificateEligible:
        true,

    learningStandard:
        "Multi-Stage Labs • Evidence-Driven Testing • Attack Chains • Reporting • Practical Capstone",

    prerequisites: [
        "Cybersecurity Fundamentals",
        "Networking Fundamentals",
        "Linux Fundamentals",
        "Ethical Hacking",
        "Web Application Security"
    ],

    recommendedPrerequisites: [
        "Bash & Linux Automation",
        "Python Fundamentals for Cybersecurity",
        "Active Directory Fundamentals"
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
        "Plan and execute authorized penetration-testing engagements.",
        "Build attack-surface inventories from reconnaissance and scanning.",
        "Perform targeted network and service enumeration.",
        "Validate vulnerability candidates manually.",
        "Combine multiple weaknesses into realistic attack chains.",
        "Perform controlled exploitation in purpose-built labs.",
        "Analyze Linux, Windows and web application privilege boundaries.",
        "Use Bash and Python safely to automate repetitive assessment tasks.",
        "Maintain professional evidence and assessment timelines.",
        "Write technical findings, executive summaries and remediation plans.",
        "Retest remediated findings.",
        "Complete a full multi-system penetration-testing capstone."
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
                "Engagement Planning and Attack Surface",

            description:
                "Turn scope into a practical test plan and define the attack surface before active testing.",

            access:
                "pro",

            labs:
                1,

            assessments:
                1,

            lessons: [

                buildLesson(
                    "lesson-01",
                    "From Scope to Test Plan",
                    {
                        what:
                            "translating authorized scope and rules of engagement into a structured penetration-testing plan",

                        why:
                            "multi-stage tests become chaotic without defined objectives, boundaries and evidence requirements",

                        how:
                            "identify assets, accounts, test windows, prohibited actions, objectives and required deliverables"
                    }
                ),

                buildLesson(
                    "lesson-02",
                    "Attack Surface Mapping",
                    {
                        what:
                            "building an inventory of reachable systems, services, applications and trust relationships",

                        why:
                            "the attack surface determines where deeper enumeration is most valuable",

                        how:
                            "combine scope information, reconnaissance, discovery and service mapping into a prioritized inventory"
                    }
                ),

                buildLesson(
                    "lesson-03",
                    "Testing Hypotheses and Decision Trees",
                    {
                        what:
                            "using observations to create testable hypotheses rather than running tools randomly",

                        why:
                            "evidence-driven testing reduces noise and makes complex engagements more efficient",

                        how:
                            "for each observation, write what it might mean, what evidence would confirm it and which safe test should happen next"
                    }
                )

            ],

            labActivities: [
                buildLab(
                    "lab-01",
                    "Build a Penetration-Test Plan",
                    "Engagement Planning and Attack Surface"
                )
            ],

            moduleAssessment:
                buildAssessment(
                    "Module 1 Assessment — Planning and Attack Surface"
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
                "Network Discovery and Service Mapping",

            description:
                "Perform scoped host discovery, port scanning and service identification across multiple authorized lab systems.",

            access:
                "pro",

            labs:
                1,

            assessments:
                1,

            lessons: [

                buildLesson(
                    "lesson-01",
                    "Multi-Host Discovery Strategy",
                    {
                        what:
                            "discovering authorized hosts while accounting for filtering, subnet scope and incomplete responses",

                        why:
                            "multi-system assessments require a reliable inventory before deeper work begins",

                        how:
                            "use low-impact discovery first, then confirm target identity before service scanning",

                        commands: [
                            {
                                command:
                                    "nmap -sn 192.168.56.0/24",
                                explanation:
                                    "Discovers hosts only on an explicitly authorized isolated lab subnet."
                            }
                        ]
                    }
                ),

                buildLesson(
                    "lesson-02",
                    "TCP and UDP Service Mapping",
                    {
                        what:
                            "identifying exposed TCP and selected UDP services across authorized hosts",

                        why:
                            "different protocols expose different attack surfaces and require different enumeration",

                        how:
                            "start with focused TCP discovery and use targeted UDP checks only where relevant and permitted"
                    }
                ),

                buildLesson(
                    "lesson-03",
                    "Prioritizing Services for Enumeration",
                    {
                        what:
                            "ranking exposed services by relevance, exposure and assessment value",

                        why:
                            "not every open service deserves equal testing time",

                        how:
                            "consider authentication points, administrative services, web applications, file-sharing services and unusual exposures"
                    }
                )

            ],

            labActivities: [
                buildLab(
                    "lab-01",
                    "Build a Multi-Host Service Inventory",
                    "Network Discovery and Service Mapping"
                )
            ],

            moduleAssessment:
                buildAssessment(
                    "Module 2 Assessment — Service Mapping"
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
                "Targeted Enumeration and Evidence Collection",

            description:
                "Perform service-specific enumeration across Linux, Windows and web-facing services.",

            access:
                "pro",

            labs:
                1,

            assessments:
                1,

            lessons: [

                buildLesson(
                    "lesson-01",
                    "Enumeration by Protocol",
                    {
                        what:
                            "selecting service-specific enumeration techniques based on observed protocols",

                        why:
                            "generic scanning rarely provides enough information for vulnerability validation",

                        how:
                            "define service-specific questions before running enumeration tools"
                    }
                ),

                buildLesson(
                    "lesson-02",
                    "Linux and Remote-Service Enumeration",
                    {
                        what:
                            "enumerating SSH, web, file and Linux-oriented services",

                        why:
                            "remote-service configuration often reveals authentication, version and access-control information",

                        how:
                            "inspect banners, protocol behavior, exposed resources and authentication requirements without uncontrolled guessing"
                    }
                ),

                buildLesson(
                    "lesson-03",
                    "Windows and SMB Enumeration",
                    {
                        what:
                            "reviewing SMB exposure, shares, Windows services and domain-related clues",

                        why:
                            "Windows environments often expose meaningful trust and identity information through service configuration",

                        how:
                            "identify shares, protocol versions, access requirements and surrounding environment clues within scope"
                    }
                )

            ],

            labActivities: [
                buildLab(
                    "lab-01",
                    "Cross-Platform Enumeration Matrix",
                    "Targeted Enumeration and Evidence Collection"
                )
            ],

            moduleAssessment:
                buildAssessment(
                    "Module 3 Assessment — Enumeration"
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
                "Vulnerability Analysis and Attack Chains",

            description:
                "Move from isolated observations to evidence-backed findings and combined attack paths.",

            access:
                "pro",

            labs:
                1,

            assessments:
                1,

            lessons: [

                buildLesson(
                    "lesson-01",
                    "Vulnerability Candidate Triage",
                    {
                        what:
                            "ranking vulnerability candidates based on evidence, exposure, prerequisites and likely impact",

                        why:
                            "complex labs may produce many observations but only a subset deserve deeper validation",

                        how:
                            "compare version/configuration evidence, affected conditions, reachable attack path and business relevance"
                    }
                ),

                buildLesson(
                    "lesson-02",
                    "Manual Validation Strategy",
                    {
                        what:
                            "confirming vulnerability candidates with controlled tests",

                        why:
                            "automated results can overstate or misunderstand target conditions",

                        how:
                            "identify the minimum proof required and stop once sufficient evidence exists"
                    }
                ),

                buildLesson(
                    "lesson-03",
                    "Building Attack Chains",
                    {
                        what:
                            "combining multiple weaknesses that individually appear limited but together create significant impact",

                        why:
                            "real penetration tests often reveal risk through chains rather than one isolated critical flaw",

                        how:
                            "map initial exposure, required access, trust transitions, privilege changes and final impact"
                    }
                )

            ],

            labActivities: [
                buildLab(
                    "lab-01",
                    "Create an Evidence-Backed Attack Chain",
                    "Vulnerability Analysis and Attack Chains"
                )
            ],

            moduleAssessment:
                buildAssessment(
                    "Module 4 Assessment — Vulnerability Analysis"
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
                "Controlled Exploitation and Initial Access",

            description:
                "Use controlled exploitation in purpose-built systems to validate meaningful impact.",

            access:
                "pro",

            labs:
                1,

            assessments:
                1,

            lessons: [

                buildLesson(
                    "lesson-01",
                    "Exploit Selection and Preconditions",
                    {
                        what:
                            "matching a validated vulnerability to an appropriate lab exploit or validation method",

                        why:
                            "the wrong exploit or wrong target conditions can produce misleading or unsafe results",

                        how:
                            "verify version, architecture, configuration, privileges and expected behavior before execution"
                    }
                ),

                buildLesson(
                    "lesson-02",
                    "Controlled Initial Access",
                    {
                        what:
                            "obtaining limited authorized access to demonstrate exploitation impact",

                        why:
                            "initial access can prove that a vulnerability crosses an important security boundary",

                        how:
                            "perform the minimum necessary validation and capture harmless identity or host evidence"
                    }
                ),

                buildLesson(
                    "lesson-03",
                    "Session Handling and Cleanup",
                    {
                        what:
                            "managing lab access sessions, evidence and artifacts after controlled exploitation",

                        why:
                            "sessions and artifacts can affect the environment if not handled deliberately",

                        how:
                            "record session creation, avoid unnecessary changes, terminate cleanly and restore the lab when required"
                    }
                )

            ],

            labActivities: [
                buildLab(
                    "lab-01",
                    "Controlled Initial Access Lab",
                    "Controlled Exploitation and Initial Access",
                    {
                        duration:
                            "120–160 minutes"
                    }
                )
            ],

            moduleAssessment:
                buildAssessment(
                    "Module 5 Assessment — Controlled Exploitation"
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
                "Privilege Escalation and Local Enumeration",

            description:
                "Analyze privilege boundaries on Linux and Windows training systems after authorized initial access.",

            access:
                "pro",

            labs:
                1,

            assessments:
                1,

            lessons: [

                buildLesson(
                    "lesson-01",
                    "Local Enumeration Methodology",
                    {
                        what:
                            "systematically inspecting the local host after authorized initial access",

                        why:
                            "local configuration, credentials and services determine whether access can be escalated",

                        how:
                            "enumerate identity, groups, privileges, services, writable paths, scheduled execution and exposed secrets"
                    }
                ),

                buildLesson(
                    "lesson-02",
                    "Linux Escalation Paths",
                    {
                        what:
                            "Linux configuration weaknesses that can allow privilege escalation",

                        why:
                            "unsafe sudo permissions, writable scripts, credentials and service configuration can cross privilege boundaries",

                        how:
                            "identify one training misconfiguration, explain why it is unsafe and validate minimally where the lab permits it",

                        commands: [
                            {
                                command:
                                    "id",
                                explanation:
                                    "Shows the current Linux identity and group memberships."
                            },
                            {
                                command:
                                    "sudo -l",
                                explanation:
                                    "Lists permitted sudo commands for the current training account."
                            }
                        ]
                    }
                ),

                buildLesson(
                    "lesson-03",
                    "Windows Escalation Paths",
                    {
                        what:
                            "Windows privilege-boundary weaknesses involving services, privileges, configuration or exposed credentials",

                        why:
                            "local administrative boundaries can fail when high-privilege components trust writable or user-controlled resources",

                        how:
                            "enumerate the local access token, services, tasks and relevant system configuration before validating one lab condition",

                        commands: [
                            {
                                command:
                                    "whoami /groups",
                                explanation:
                                    "Displays Windows group memberships."
                            },
                            {
                                command:
                                    "whoami /priv",
                                explanation:
                                    "Displays privileges associated with the current access token."
                            }
                        ]
                    }
                )

            ],

            labActivities: [
                buildLab(
                    "lab-01",
                    "Privilege Escalation Decision Lab",
                    "Privilege Escalation and Local Enumeration"
                )
            ],

            moduleAssessment:
                buildAssessment(
                    "Module 6 Assessment — Privilege Escalation"
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
                "Web Application Testing in a Full Engagement",

            description:
                "Integrate web application testing into a broader network penetration test.",

            access:
                "pro",

            labs:
                1,

            assessments:
                1,

            lessons: [

                buildLesson(
                    "lesson-01",
                    "Web Attack Surface from Network Recon",
                    {
                        what:
                            "transitioning from discovered HTTP services into structured application mapping",

                        why:
                            "web services found during network testing may expose authentication, APIs and sensitive workflows",

                        how:
                            "identify hostnames, ports, TLS usage, application functions, roles and authentication points"
                    }
                ),

                buildLesson(
                    "lesson-02",
                    "Authorization and Input Testing",
                    {
                        what:
                            "testing server-side authorization and input assumptions in discovered web applications",

                        why:
                            "web weaknesses can provide initial access, sensitive data exposure or privilege transitions",

                        how:
                            "capture normal traffic, vary one authorization or input assumption at a time and validate evidence safely"
                    }
                ),

                buildLesson(
                    "lesson-03",
                    "Connecting Web Findings to Host Impact",
                    {
                        what:
                            "reasoning about how a web application weakness affects underlying systems or broader assessment scope",

                        why:
                            "a web issue may form one step in a larger attack chain",

                        how:
                            "map the vulnerable application, server role, accessible data, credentials and downstream trust relationships"
                    }
                )

            ],

            labActivities: [
                buildLab(
                    "lab-01",
                    "Web-to-Host Attack Chain Lab",
                    "Web Application Testing in a Full Engagement"
                )
            ],

            moduleAssessment:
                buildAssessment(
                    "Module 7 Assessment — Integrated Web Testing"
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
                "Assessment Automation with Bash and Python",

            description:
                "Automate repetitive evidence and parsing tasks without replacing manual reasoning.",

            access:
                "pro",

            labs:
                1,

            assessments:
                1,

            lessons: [

                buildLesson(
                    "lesson-01",
                    "What to Automate",
                    {
                        what:
                            "choosing repetitive assessment tasks that benefit from scripting",

                        why:
                            "automation can reduce repetitive work but poor automation can amplify scope mistakes",

                        how:
                            "automate data collection, parsing and reporting support while keeping high-impact decisions manual"
                    }
                ),

                buildLesson(
                    "lesson-02",
                    "Bash for Assessment Workflows",
                    {
                        what:
                            "using Bash to organize files, run scoped read-only checks and parse tool output",

                        why:
                            "shell automation is effective for repeatable Linux assessment tasks",

                        how:
                            "validate arguments, quote variables, save outputs predictably and avoid destructive defaults"
                    }
                ),

                buildLesson(
                    "lesson-03",
                    "Python for Evidence Processing",
                    {
                        what:
                            "using Python to parse structured results and generate assessment summaries",

                        why:
                            "Python is useful when data processing exceeds simple shell pipelines",

                        how:
                            "read saved results, validate data, transform it into structured summaries and preserve source evidence"
                    }
                )

            ],

            labActivities: [
                buildLab(
                    "lab-01",
                    "Build a Safe Assessment Helper",
                    "Assessment Automation with Bash and Python",
                    {
                        objective:
                            "Create a small read-only script that processes authorized lab evidence without performing exploitation."
                    }
                )
            ],

            moduleAssessment:
                buildAssessment(
                    "Module 8 Assessment — Assessment Automation"
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
                "Reporting, Risk and Retesting",

            description:
                "Turn complex multi-stage testing into useful findings, attack narratives and remediation priorities.",

            access:
                "pro",

            labs:
                1,

            assessments:
                1,

            lessons: [

                buildLesson(
                    "lesson-01",
                    "Writing Multi-Stage Findings",
                    {
                        what:
                            "documenting findings that involve multiple systems, weaknesses or trust transitions",

                        why:
                            "attack chains can be difficult to understand if each observation is reported without context",

                        how:
                            "describe the initial condition, each transition, final impact, evidence and remediation at each layer"
                    }
                ),

                buildLesson(
                    "lesson-02",
                    "Risk Prioritization",
                    {
                        what:
                            "ranking findings using technical severity, exposure, exploitability and business impact",

                        why:
                            "remediation teams need to know what should be addressed first",

                        how:
                            "combine technical evidence with asset criticality and realistic attack path"
                    }
                ),

                buildLesson(
                    "lesson-03",
                    "Retest Methodology",
                    {
                        what:
                            "repeating the original validation method after remediation",

                        why:
                            "a configuration change does not prove the vulnerability is resolved",

                        how:
                            "compare original evidence with the post-fix behavior and classify the issue as fixed, partially fixed or still present"
                    }
                )

            ],

            labActivities: [
                buildLab(
                    "lab-01",
                    "Write and Retest a Multi-Stage Finding",
                    "Reporting, Risk and Retesting"
                )
            ],

            moduleAssessment:
                buildAssessment(
                    "Module 9 Assessment — Reporting and Retest"
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
                "Practical Penetration Testing Capstone",

            description:
                "Perform a complete multi-system authorized penetration test and submit a professional final report.",

            access:
                "pro",

            labs:
                1,

            assessments:
                1,

            lessons: [

                buildLesson(
                    "lesson-01",
                    "Capstone Engagement Setup",
                    {
                        what:
                            "preparing scope, workspace, accounts, evidence requirements and testing objectives for the final engagement",

                        why:
                            "the capstone should simulate a professional assessment rather than a collection of disconnected challenges",

                        how:
                            "review scope, build the target inventory template, prepare the timeline and define required deliverables"
                    }
                ),

                buildLesson(
                    "lesson-02",
                    "Execute the Multi-System Assessment",
                    {
                        what:
                            "performing reconnaissance, service mapping, enumeration, validation, exploitation and privilege analysis across multiple training systems",

                        why:
                            "the capstone tests whether students can choose the next action based on evidence",

                        how:
                            "follow the complete methodology and document every major decision"
                    }
                ),

                buildLesson(
                    "lesson-03",
                    "Final Report and Professional Review",
                    {
                        what:
                            "producing the final technical report, executive summary, attack narrative and retest plan",

                        why:
                            "the final value of penetration testing is the organization's ability to understand and reduce risk",

                        how:
                            "review evidence quality, remove unsupported claims, prioritize remediation and create reproducible retest steps"
                    }
                )

            ],

            labActivities: [
                buildLab(
                    "lab-01",
                    "CWS Practical Penetration Testing Capstone",
                    "Practical Penetration Testing Capstone",
                    {
                        duration:
                            "240–360 minutes",

                        instructions: [
                            "Confirm scope and rules of engagement.",
                            "Prepare the assessment workspace and timeline.",
                            "Discover and map all authorized training targets.",
                            "Enumerate relevant services.",
                            "Identify and prioritize vulnerability candidates.",
                            "Validate confirmed weaknesses.",
                            "Perform controlled exploitation where explicitly permitted.",
                            "Analyze privilege boundaries after authorized access.",
                            "Assess discovered web applications where relevant.",
                            "Build at least one evidence-backed attack chain if the environment supports it.",
                            "Collect the minimum necessary evidence.",
                            "Clean up approved testing artifacts.",
                            "Write professional findings.",
                            "Write an executive summary.",
                            "Create a remediation-priority table.",
                            "Create a retest plan."
                        ],

                        evidence: [
                            "Scope document",
                            "Assessment timeline",
                            "Host and service inventory",
                            "Enumeration evidence",
                            "Validation evidence",
                            "Attack-chain diagram or narrative",
                            "Professional findings",
                            "Executive summary",
                            "Retest plan"
                        ]
                    }
                )
            ],

            moduleAssessment:
                buildAssessment(
                    "Module 10 Assessment — Practical Capstone"
                )
        }

    ],


    /* =========================================================
       FINAL ASSESSMENT
    ========================================================= */

    finalAssessment: {

        title:
            "CWS Practical Penetration Testing Final Assessment",

        description:
            "Demonstrate evidence-driven penetration-testing methodology across network, host and web application assessment scenarios.",

        passingScore:
            80,

        allowRetry:
            true,

        required:
            true,

        questions: [

            {
                question:
                    "What should begin a penetration test?",
                options: [
                    "Authorization, scope and objectives",
                    "Exploitation",
                    "Privilege escalation",
                    "Automated scanning"
                ],
                answer:
                    0
            },

            {
                question:
                    "What is an attack surface?",
                options: [
                    "The systems, services and interfaces exposed to potential interaction",
                    "Only open web ports",
                    "Only vulnerabilities",
                    "Only user accounts"
                ],
                answer:
                    0
            },

            {
                question:
                    "What should determine the next test?",
                options: [
                    "Observed evidence and the assessment hypothesis",
                    "Random tool choice",
                    "The most aggressive technique",
                    "The fastest exploit"
                ],
                answer:
                    0
            },

            {
                question:
                    "What does an open port prove?",
                options: [
                    "A service is accepting connections",
                    "A vulnerability definitely exists",
                    "The target is compromised",
                    "Credentials are weak"
                ],
                answer:
                    0
            },

            {
                question:
                    "Why is enumeration service-specific?",
                options: [
                    "Different protocols expose different information and security assumptions",
                    "All services behave the same",
                    "Enumeration only works on web servers",
                    "Scanning already provides everything"
                ],
                answer:
                    0
            },

            {
                question:
                    "What is vulnerability triage?",
                options: [
                    "Prioritizing candidates based on evidence, prerequisites and impact",
                    "Reporting every scanner result",
                    "Ignoring low-severity issues",
                    "Running every exploit"
                ],
                answer:
                    0
            },

            {
                question:
                    "What is an attack chain?",
                options: [
                    "Multiple weaknesses or trust transitions combined into meaningful impact",
                    "A list of ports",
                    "A single CVE",
                    "A password policy"
                ],
                answer:
                    0
            },

            {
                question:
                    "What should controlled exploitation demonstrate?",
                options: [
                    "Relevant security impact with minimum necessary action",
                    "Maximum damage",
                    "Unrelated access",
                    "Service disruption"
                ],
                answer:
                    0
            },

            {
                question:
                    "Why perform local enumeration after initial access?",
                options: [
                    "To understand privileges, services and escalation opportunities",
                    "To replace reporting",
                    "To discover DNS records only",
                    "To disable logging"
                ],
                answer:
                    0
            },

            {
                question:
                    "What does sudo -l help identify?",
                options: [
                    "Commands the current Linux user may run through sudo",
                    "DNS servers",
                    "HTTP headers",
                    "Windows groups"
                ],
                answer:
                    0
            },

            {
                question:
                    "What does whoami /priv show?",
                options: [
                    "Windows token privileges",
                    "Web cookies",
                    "Linux groups",
                    "DNS records"
                ],
                answer:
                    0
            },

            {
                question:
                    "Why include web testing in a broader penetration test?",
                options: [
                    "Web applications can expose authentication, authorization and server-side attack paths",
                    "Web apps are unrelated to hosts",
                    "Only browsers matter",
                    "Network scanning cannot find web ports"
                ],
                answer:
                    0
            },

            {
                question:
                    "What should automation be used for?",
                options: [
                    "Repeatable low-risk data collection and processing",
                    "Replacing all manual reasoning",
                    "Expanding scope automatically",
                    "Running destructive actions faster"
                ],
                answer:
                    0
            },

            {
                question:
                    "Why validate script inputs?",
                options: [
                    "Automation can amplify mistakes if targets or parameters are wrong",
                    "Inputs never affect security",
                    "Bash does not accept arguments",
                    "Python cannot read files"
                ],
                answer:
                    0
            },

            {
                question:
                    "What should a multi-stage finding explain?",
                options: [
                    "Each step from initial condition to final impact",
                    "Only the last exploit",
                    "Only CVSS",
                    "Only screenshots"
                ],
                answer:
                    0
            },

            {
                question:
                    "What makes risk prioritization useful?",
                options: [
                    "It combines technical severity with exposure and business impact",
                    "Every issue becomes critical",
                    "It removes evidence requirements",
                    "It replaces remediation"
                ],
                answer:
                    0
            },

            {
                question:
                    "What is the purpose of retesting?",
                options: [
                    "Confirm whether remediation resolved the original weakness",
                    "Discover new out-of-scope systems",
                    "Delete old evidence",
                    "Change the original finding"
                ],
                answer:
                    0
            },

            {
                question:
                    "What is the preferred evidence principle?",
                options: [
                    "Collect sufficient proof while minimizing unnecessary sensitive data",
                    "Collect everything accessible",
                    "Avoid timestamps",
                    "Rely on memory"
                ],
                answer:
                    0
            },

            {
                question:
                    "What should an executive summary focus on?",
                options: [
                    "Overall risk, major findings and remediation priorities",
                    "Every command used",
                    "Only screenshots",
                    "Tool installation"
                ],
                answer:
                    0
            },

            {
                question:
                    "What best demonstrates practical penetration-testing competence?",
                options: [
                    "Choosing justified actions from evidence, validating safely and reporting clearly",
                    "Running the most tools",
                    "Memorizing exploit names",
                    "Always obtaining administrator access"
                ],
                answer:
                    0
            }

        ]

    }

};
