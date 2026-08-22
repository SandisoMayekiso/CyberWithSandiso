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
   PRO ASSESSMENT QUALITY HELPERS
========================================================= */

function balanceAnswerPositions(
    questions = [],
    offset = 0
) {

    return questions.map(
        (item, index) => {

            const options =
                Array.isArray(item.options)
                    ? [...item.options]
                    : [];

            if (!options.length) {
                return item;
            }

            const answer =
                Number.isInteger(item.answer)
                    ? item.answer
                    : 0;

            const shift =
                (index + offset) % options.length;

            return {
                ...item,
                options: [
                    ...options.slice(shift),
                    ...options.slice(0, shift)
                ],
                answer:
                    (answer - shift + options.length) % options.length
            };

        }
    );

}


function proQuestion(prompt, correct, ...distractors) {

    return {
        question:
            prompt,
        options: [
            correct,
            ...distractors
        ],
        answer:
            0
    };

}


const penetrationTestingQuestionBanks = {

    "module-01": [
        proQuestion("A hostname resolves to an address outside the signed scope. What should the tester do?", "Stop active testing against that address and follow the escalation or scope-clarification process", "Test it because the hostname is in scope", "Run only low-rate scans", "Add it silently to the target list"),
        proQuestion("Which rules-of-engagement detail most directly limits service disruption?", "Permitted techniques, prohibited actions, windows, stop conditions and emergency contacts", "The report font", "The vulnerability scanner version", "The tester's preferred shell"),
        proQuestion("Why should target identity be revalidated during an engagement?", "DNS, cloud assets and load-balanced infrastructure can change after the initial scope import", "Scope automatically expands over time", "IP addresses prove ownership", "Only web applications can move"),
        proQuestion("What belongs in a professional attack-surface inventory?", "Asset identity, owner or scope source, addresses, services, interfaces, trust context and validation status", "Only open port numbers", "Only CVEs", "Only screenshots"),
        proQuestion("A test action may affect a fragile production dependency. What is the correct response?", "Pause, assess impact and obtain the required approval or safer test method", "Proceed because testing is authorized", "Increase concurrency", "Disable monitoring")
    ],

    "module-02": [
        proQuestion("A SYN scan reports a port as filtered. What conclusion is justified?", "The probe did not produce a definitive open or closed response and filtering or loss may be involved", "The service is vulnerable", "The host is offline", "The port is open"),
        proQuestion("Why combine discovery results with service-version and protocol evidence?", "A port number alone does not establish the actual service or its security state", "Version detection replaces scope", "Every banner is trustworthy", "Protocols have no default ports"),
        proQuestion("A scan produces unexpectedly few hosts. What should be checked first?", "Interface, route, target range, discovery assumptions, firewall behavior and packet evidence", "Exploit selection", "Password policy", "Report severity"),
        proQuestion("What makes a discovery scan professionally controlled?", "Validated target set, documented rate, approved probes, timestamps and preserved output", "Maximum parallelism", "All ports on nearby networks", "No logging"),
        proQuestion("Two tools disagree about a service. What is the strongest next step?", "Perform a narrow protocol-aware manual check and compare timing and evidence", "Choose the tool with more output", "Report both as confirmed", "Run an unrelated exploit")
    ],

    "module-03": [
        proQuestion("Why must enumeration be protocol-specific?", "Each protocol exposes different identities, metadata, operations and trust assumptions", "Every service uses HTTP", "Scanning already proves every weakness", "Enumeration requires exploitation"),
        proQuestion("A banner suggests an old version but a manual request shows a reverse proxy. How should the finding be handled?", "Record the ambiguity and validate the origin technology before assigning a version-based vulnerability", "Report the banner as confirmed", "Ignore the proxy", "Exploit the backend blindly"),
        proQuestion("What is the minimum evidence for a suspected anonymous-access issue?", "A scoped request, response, accessible resource, effective permissions and security impact", "A tool label only", "The service port", "A search-engine result"),
        proQuestion("How should discovered usernames be handled?", "Minimize collection, protect the evidence and use them only as permitted by the engagement", "Publish them in the report appendix", "Attempt every password", "Create new accounts"),
        proQuestion("What differentiates an observation from a finding?", "A finding connects verified behavior to a security requirement, impact and reproducible evidence", "An observation always has critical severity", "A finding needs no validation", "Only scanner output can be a finding")
    ],

    "module-04": [
        proQuestion("A scanner maps a service to a high-severity CVE. What must happen before confirmation?", "Validate product, version, configuration, exposure, prerequisites and safe proof", "Copy the CVSS score", "Exploit every target", "Report the plugin output alone"),
        proQuestion("What makes an attack chain more important than its individual low-severity steps?", "The combined trust transitions create a realistic impact not visible from each step alone", "Chains require malware", "Every chain ends in denial of service", "Severity scores are added arithmetically"),
        proQuestion("How should compensating controls affect vulnerability analysis?", "Test and document whether they reduce exploitability or impact without assuming the underlying weakness is removed", "Ignore the weakness", "Set severity to zero", "Disable the control"),
        proQuestion("A candidate requires credentials the tester does not possess. What is the correct status?", "Unverified or conditional, with the missing prerequisite documented", "Confirmed", "False positive", "Out of scope automatically"),
        proQuestion("Which remediation advice is most actionable?", "Address the root cause, affected scope, priority, owner, verification method and relevant compensating controls", "Patch everything", "Block the tester", "Remove logs")
    ],

    "module-05": [
        proQuestion("What is the purpose of controlled exploitation?", "Demonstrate the agreed security impact with the minimum necessary action", "Obtain maximum persistence", "Collect all accessible data", "Prove tool execution"),
        proQuestion("An exploit may restart a service. What should precede execution?", "Confirm authorization, impact tolerance, rollback, monitoring coordination and stop conditions", "Disable backups", "Increase payload privileges", "Run it outside the test window"),
        proQuestion("What evidence is sufficient for command-execution impact in a lab?", "A benign identity or marker command tied to the target and timestamp", "Deleting a system file", "Creating persistence", "Downloading confidential data"),
        proQuestion("A payload succeeds but egress filtering blocks the callback. What should be reported?", "The verified execution path and the control's observed effect, with limits stated", "Complete compromise", "No vulnerability", "A network outage"),
        proQuestion("Why is artifact tracking required during exploitation?", "Every created file, process, account or change must be removed or handed over with status", "Artifacts improve severity", "Cleanup is optional in labs", "Only screenshots matter")
    ],

    "module-06": [
        proQuestion("What should local enumeration establish before an escalation test?", "Current identity, groups, privileges, services, software, configuration, credentials exposure and trust boundaries", "Only kernel version", "Only hostname", "Only open ports"),
        proQuestion("A writable service binary appears exploitable. What is the minimum-impact validation?", "Prove the relevant identity can modify the exact execution path and document the privileged service relationship without disrupting it", "Replace it immediately", "Restart production", "Create persistence"),
        proQuestion("Why is sudo -l output not sufficient by itself?", "The permitted command, arguments, environment and executable behavior must be analyzed in context", "sudo never escalates privilege", "The output is encrypted", "Only root can read it"),
        proQuestion("A credential is discovered in a configuration file. What is the professional response?", "Minimize access, protect and redact evidence, validate only as permitted and recommend rotation", "Reuse it everywhere", "Add it to automation", "Publish the file"),
        proQuestion("What proves a privilege transition?", "Before-and-after identity evidence tied to the exact controlled path and timestamp", "A tool success message", "A CVE reference", "A shell prompt color")
    ],

    "module-07": [
        proQuestion("A user can read another user's record by changing an identifier. What must the finding prove?", "The authorization boundary, two controlled identities or equivalent evidence, affected object and impact", "Only the changed URL", "Only a 200 response", "The database technology"),
        proQuestion("Why should web testing preserve complete request and response evidence?", "Headers, parameters, session context and response behavior are needed for reproducibility and impact analysis", "Screenshots always include hidden fields", "Status codes prove authorization", "Only payloads matter"),
        proQuestion("A reflected value appears HTML-encoded. What is the correct next step?", "Determine the exact output context and whether executable interpretation remains possible using a safe marker", "Report XSS immediately", "Use a destructive payload", "Disable browser protections"),
        proQuestion("How should authentication testing respect account safety?", "Use approved test accounts, rate limits, lockout coordination and explicit credential-testing scope", "Test employee accounts", "Disable logging", "Try public breach lists"),
        proQuestion("What connects a web weakness to broader engagement impact?", "Verified trust transitions such as session, data, service or host access within scope", "The number of parameters", "The framework name", "The length of the URL")
    ],

    "module-08": [
        proQuestion("What is the first control in a penetration-testing automation script?", "Strict validation of the approved target set and permitted action", "Maximum concurrency", "Administrator execution", "Automatic scope expansion"),
        proQuestion("Why should automation produce structured output?", "It supports repeatable parsing, correlation, evidence review and error handling", "It guarantees accuracy", "It removes manual validation", "It hides failed commands"),
        proQuestion("A batch command partially fails. What should the script do?", "Record per-target status, preserve errors, continue or stop according to policy and return a meaningful exit code", "Report complete success", "Delete the output", "Retry forever"),
        proQuestion("What makes a retry mechanism safe?", "Bounded attempts, backoff, idempotent action where possible and clear failure reporting", "No timeout", "Recursive self-execution", "Higher privileges"),
        proQuestion("Which data should never be written to a shared assessment log?", "Raw passwords, reusable tokens and unnecessary sensitive content", "Timestamps", "Target identifiers", "Exit statuses")
    ],

    "module-09": [
        proQuestion("What makes a penetration-test finding reproducible?", "Affected asset, prerequisite, steps, request or command, observed evidence, impact and cleanup state", "A severity label", "A scanner name", "An exploit screenshot"),
        proQuestion("How should technical severity and business risk be related?", "Explain exploitability and technical impact, then adjust priority using exposure, asset value and business context", "Use CVSS alone", "Make every exploited issue critical", "Ignore compensating controls"),
        proQuestion("What should a retest verify beyond a failed original payload?", "The root cause is removed, the intended control works and no bypass or regression is evident within scope", "Only that the URL changed", "Only that logs exist", "A new unrelated weakness"),
        proQuestion("What belongs in an executive summary?", "Engagement objective, overall posture, business-relevant themes, major risk and prioritized next actions", "Every terminal command", "All raw output", "Exploit source code"),
        proQuestion("A finding contains a reusable token in a screenshot. What should happen?", "Redact and invalidate the token, replace the evidence safely and record the handling action", "Leave it for authenticity", "Share it in email", "Use it for retesting without approval")
    ],

    "module-10": [
        proQuestion("What should determine the capstone testing sequence?", "Scope, dependency mapping, hypotheses, evidence and risk-aware decision points", "Tool order from a cheat sheet", "Maximum impact", "Random target selection"),
        proQuestion("What makes an attack-chain diagram defensible?", "Each node is supported by evidence and each transition states its prerequisite and resulting access or impact", "It contains many icons", "It ends with administrator access", "It lists every scan"),
        proQuestion("A capstone path reaches sensitive sample data. What is sufficient proof?", "The minimum approved metadata or controlled marker proving access without collecting the dataset", "Download everything", "Publish a screenshot", "Modify the data"),
        proQuestion("What belongs in the capstone cleanup register?", "Every artifact or change, owner, location, creation time, removal or handover status and verification", "Only payload filenames", "Only shell history", "Only screenshots"),
        proQuestion("What makes the final portfolio commercially credible?", "Repeatable methodology, sanitized evidence, accurate risk, prioritized remediation, verified cleanup, retest plan and honest limitations", "The largest tool output", "The highest severity count", "Unredacted credentials")
    ]

};


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
        "85–110 Hours",

    estimatedLessons:
        30,

    certificateEligible:
        true,

    learningStandard:
        "Professional Engagement Simulation • Evidence-Driven Testing • Attack Chains • Minimum-Impact Validation • Reporting • Retesting",

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

    skills: [
        "Rules of engagement and scope control",
        "Attack-surface inventory and service mapping",
        "Protocol-aware enumeration",
        "Vulnerability triage and manual validation",
        "Attack-chain and trust-boundary analysis",
        "Controlled exploitation and artifact management",
        "Linux and Windows privilege analysis",
        "Web application assessment",
        "Safe Bash and Python assessment automation",
        "Evidence handling, risk communication and retesting"
    ],

    tools: [
        "Nmap",
        "curl",
        "Burp Suite Community or equivalent intercepting proxy",
        "Wireshark or tcpdump",
        "Netcat or approved protocol clients",
        "Linux and Windows native enumeration commands",
        "Bash",
        "Python 3",
        "CWS attack-chain and evidence workbooks",
        "Isolated intentionally vulnerable lab targets"
    ],

    assessmentStandard:
        "Pro assessments require explicit scope, hypothesis-driven testing, minimum-impact validation, reproducible evidence, artifact cleanup, business-aware risk and retest-ready remediation. Tool output alone never confirms a finding.",

    standardReferences: [
        {
            title:
                "Technical Guide to Information Security Testing and Assessment",
            organization:
                "NIST",
            url:
                "https://csrc.nist.gov/pubs/sp/800/115/final"
        },
        {
            title:
                "Web Security Testing Guide",
            organization:
                "OWASP",
            url:
                "https://owasp.org/www-project-web-security-testing-guide/stable/"
        },
        {
            title:
                "Enterprise ATT&CK Matrix",
            organization:
                "MITRE",
            url:
                "https://attack.mitre.org/matrices/enterprise/"
        },
        {
            title:
                "Penetration Testing Execution Standard",
            organization:
                "PTES",
            url:
                "https://www.pentest-standard.org/index.php/Main_Page"
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


/* =========================================================
   CWS PRO COURSE STANDARDIZATION
========================================================= */

function applyPracticalPenetrationTestingProStandard(course) {

    course.modules.forEach(
        module => {

            module.learningOutcomes = [
                `Plan and execute the ${module.title} phase inside documented authorization and rules of engagement.`,
                "Form a testable hypothesis, select the lowest-risk action and interpret the resulting evidence.",
                "Distinguish exposure, candidate weakness, confirmed finding and chained business impact.",
                "Produce sanitized, reproducible evidence with remediation, cleanup and retest guidance."
            ];

            module.labActivities =
                (module.labActivities || []).map(
                    activity => ({
                        ...activity,
                        access:
                            "pro",
                        required:
                            true,
                        scenario:
                            activity.scenario ||
                            "Conduct the assigned phase against isolated CWS Academy targets under a written scope, rules of engagement and approved test window.",
                        prerequisites: [
                            "Completed lessons and knowledge checks in this module",
                            "Written scope, rules of engagement and emergency contacts",
                            "Isolated intentionally vulnerable lab environment",
                            "Snapshots or recovery procedure",
                            "Encrypted evidence workspace and artifact register"
                        ],
                        evidence: [
                            ...(activity.evidence || []),
                            "Scope source, target identity and timestamp",
                            "Assessment hypothesis and expected secure behavior",
                            "Exact command, request or procedure plus relevant output",
                            "Manual validation separating fact from inference",
                            "Impact, limitation and alternative explanation",
                            "Artifact creation and cleanup or handover status",
                            "Root-cause remediation and exact retest step"
                        ],
                        successCriteria:
                            "The learner completes the phase within scope, justifies each material action, validates findings with minimum impact, preserves reproducible evidence and verifies cleanup.",
                        reflection: [
                            ...(activity.reflection || []),
                            "Which stop condition or risk decision affected the testing path?",
                            "What evidence would a second tester need to reproduce the conclusion?",
                            "Which control would prevent, detect or contain the verified behavior?"
                        ],
                        cleanup: [
                            "Remove every created file, process, account, task, session or configuration change that the rules of engagement require you to remove.",
                            "Stop listeners, proxies, captures and temporary services.",
                            "Verify target state independently and update the artifact register.",
                            "Retain only sanitized evidence; invalidate any test token or credential that must not persist."
                        ],
                        safety:
                            "Use only isolated CWS Academy targets or environments covered by explicit written authorization. Follow test windows, rate limits, prohibited-action rules, stop conditions and data-minimization requirements. Never test third-party or production systems for this course.",
                        rubric: {
                            methodologyAndScope:
                                20,
                            technicalValidation:
                                25,
                            evidenceAndReproducibility:
                                20,
                            attackChainAndRisk:
                                15,
                            remediationAndRetest:
                                10,
                            cleanupAndProfessionalism:
                                10
                        }
                    })
                );

            module.labs =
                module.labActivities.length;
            module.assessments =
                1;

            module.moduleAssessment = {
                title:
                    `${module.title} — Pro Verified Assessment`,
                type:
                    "Module Assessment",
                passingScore:
                    85,
                allowRetry:
                    true,
                showResults:
                    true,
                required:
                    true,
                questionCount:
                    penetrationTestingQuestionBanks[module.id].length,
                questions:
                    balanceAnswerPositions(
                        penetrationTestingQuestionBanks[module.id],
                        module.number - 1
                    )
            };

            module.lessons.forEach(
                (item, lessonIndex) => {

                    item.performanceObjectives = [
                        `Explain where ${item.title} fits in a complete authorized engagement.`,
                        "Define a testable hypothesis and the minimum evidence needed to resolve it.",
                        "Choose a scoped action, predict its effect and apply the relevant stop condition.",
                        "Translate the result into risk, remediation, cleanup and retest guidance."
                    ];

                    item.evidenceStandard = [
                        "Written authorization and exact target identity",
                        "Timestamped command, request or manual procedure",
                        "Baseline and controlled-test evidence",
                        "Observed fact separated from analyst inference",
                        "Minimum-impact proof with sensitive fields redacted",
                        "Artifact and cleanup status",
                        "Root-cause remediation and reproducible retest step"
                    ];

                    item.completionCriteria = [
                        "The learner can justify the action from scope, hypothesis and current evidence.",
                        "The learner recognizes false-positive and alternative explanations.",
                        "The three-question lesson assessment is passed.",
                        "Any associated practical evidence meets the Pro rubric and safety requirements."
                    ];

                    item.quiz =
                        balanceAnswerPositions(
                            [
                                proQuestion(
                                    `What should drive a ${item.title} decision?`,
                                    "A scoped objective, testable hypothesis, observed evidence and the lowest-risk action that can resolve uncertainty",
                                    "Tool popularity",
                                    "Maximum possible impact",
                                    "The shortest command"
                                ),
                                proQuestion(
                                    `Which evidence makes a ${item.title} conclusion professionally defensible?`,
                                    "Timestamped reproducible evidence tied to the exact target, method, result, limitation and analyst interpretation",
                                    "A tool success label",
                                    "A screenshot without context",
                                    "A vulnerability title alone"
                                ),
                                proQuestion(
                                    `What must follow any state-changing ${item.title} test?`,
                                    "Artifact recording, approved cleanup or handover, independent verification and a retest-ready note",
                                    "Immediate scope expansion",
                                    "Credential reuse",
                                    "Deletion of the assessment timeline"
                                )
                            ],
                            module.number + lessonIndex
                        );

                }
            );

        }
    );


    const integrativeScenarios = [
        proQuestion("A scoped hostname now resolves to a cloud address shared with other tenants. What should happen before active testing?", "Validate asset ownership and the provider constraints, then obtain scope clarification if needed", "Scan the full cloud range", "Assume DNS proves authorization", "Test only high ports"),
        proQuestion("Discovery shows TCP 443 open, but the TLS certificate and HTTP host do not match the expected asset. What is the best next step?", "Revalidate target identity, SNI or Host context and scope before further testing", "Exploit the service", "Report certificate failure as critical", "Ignore the mismatch"),
        proQuestion("A scanner reports SQL injection but the manual request is consistently rejected by server-side validation. What is the correct status?", "Unconfirmed or false positive with the manual evidence preserved", "Confirmed critical", "Out of scope", "Successful exploitation"),
        proQuestion("A low-privilege web account can upload a file, but no execution is observed. What should the finding state?", "The verified upload behavior, storage and access controls, limitations and any separately validated impact", "Remote code execution", "Administrator compromise", "No security relevance"),
        proQuestion("A controlled exploit creates a temporary account and the removal command succeeds. What completes cleanup verification?", "An independent check that the account, sessions, files and related changes no longer exist", "The command exit message alone", "Deleting the screenshot", "Closing the terminal"),
        proQuestion("A privilege-escalation path depends on a writable script executed by a privileged scheduled task. What is minimum-impact proof?", "Verify write permission and execution relationship, then use an approved benign marker or documented non-invasive proof", "Replace the script permanently", "Add a privileged user", "Disable the task"),
        proQuestion("A web authorization flaw exposes sample data, and the same token reaches an internal API. How should it be reported?", "As an evidence-backed chain with each boundary, prerequisite, affected asset, final impact and remediation owner", "As two unrelated screenshots", "Only as missing headers", "Only as network exposure"),
        proQuestion("Automation processes 200 targets but 12 return errors. What should the evidence report?", "Per-target success and failure, exact errors, retries, coverage limits and any excluded conclusions", "Complete success", "Only the first result", "A single average"),
        proQuestion("A remediation blocks the original request but an equivalent alternate object path remains accessible. What is the retest conclusion?", "The root cause is not fully resolved and the bypass evidence must be reported", "Remediation passed", "Create a new unrelated finding only", "Delete the original finding"),
        proQuestion("What distinguishes a commercially credible penetration-testing capstone?", "Controlled end-to-end methodology, defensible evidence, proportionate risk, artifact cleanup, prioritized remediation, retesting and clear limitations", "Obtaining root on every host", "Running the most tools", "Producing the longest report")
    ];

    const finalQuestions = [
        ...course.finalAssessment.questions,
        ...integrativeScenarios
    ];

    course.finalAssessment = {
        ...course.finalAssessment,
        description:
            "A professional scenario-based assessment covering scope, discovery, enumeration, vulnerability analysis, controlled exploitation, privilege analysis, web testing, automation, evidence, reporting and retesting.",
        duration:
            "75–90 minutes",
        passingScore:
            85,
        allowRetry:
            true,
        required:
            true,
        questionCount:
            finalQuestions.length,
        questions:
            balanceAnswerPositions(finalQuestions)
    };

    course.capstone = {
        title:
            "End-to-End Authorized Penetration Test",
        required:
            true,
        estimatedTime:
            "16–22 hours",
        scenario:
            "Conduct a complete engagement against an isolated multi-system CWS Academy range containing network services, Linux or Windows hosts and a deliberately vulnerable web application. The objective is professional decision-making and verified risk—not maximum compromise.",
        deliverables: [
            "Signed-scope interpretation, rules-of-engagement checklist and communication plan",
            "Validated asset and attack-surface inventory",
            "Timestamped assessment timeline and decision log",
            "Network discovery, service mapping and protocol-enumeration evidence",
            "Vulnerability candidate register with false-positive analysis",
            "Minimum-impact validation for confirmed findings",
            "At least one evidence-backed attack-chain diagram where supported by the lab",
            "Privilege-boundary analysis for an authorized host",
            "Web application testing record mapped to stable OWASP WSTG references",
            "Safe automation script with target validation, error handling and structured output",
            "Artifact, credential and cleanup register with verification",
            "Technical report containing reproducible findings and root-cause remediation",
            "Executive summary and prioritized remediation roadmap",
            "Retest plan with exact success criteria",
            "Sanitized portfolio version with assumptions and limitations"
        ],
        rubric: {
            scopeAndEngagementControl:
                15,
            methodologyAndDecisionQuality:
                20,
            technicalValidation:
                20,
            evidenceAndAttackChains:
                15,
            riskAndRemediation:
                15,
            reportingAndRetestReadiness:
                10,
            cleanupAndProfessionalConduct:
                5
        }
    };

    course.qualityVersion =
        "CWS-PRO-STANDARD-2026.2";

}


applyPracticalPenetrationTestingProStandard(
    practicalPenetrationTesting
);
