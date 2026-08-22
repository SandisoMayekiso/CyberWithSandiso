/* =========================================================
   CWS ACADEMY
   ETHICAL HACKING
   PRO • BEGINNER TO INTERMEDIATE
========================================================= */

function escapeHtml(value = "") {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function buildLesson(id, title, data = {}) {
    const what = data.what || title;
    const why = data.why || "This topic supports evidence-driven authorized security testing.";
    const how = data.how || "Follow a repeatable workflow, validate observations and document evidence.";
    return {
        id,
        title,
        duration: data.duration || "50 minutes",
        access: "pro",
        type: "Lesson",
        icon: data.icon || "fa-solid fa-user-secret",
        subtitle: data.subtitle || `Learn ${title} through practical authorized security-testing examples.`,
        objectives: data.objectives || [
            `Explain ${title} in your own words.`,
            `Describe why ${title} matters during an authorized assessment.`,
            `Apply ${title} inside an isolated CWS lab.`,
            `Interpret evidence and distinguish observations from conclusions.`,
            `Document the result professionally.`
        ],
        introduction: `
            <h2>${title}</h2>
            <p><strong>What:</strong> ${what}.</p>
            <p><strong>Why:</strong> ${why}.</p>
        `,
        body: `
            <h2>What Is ${title}?</h2>
            <p>${what}.</p>

            <h2>Why Does It Matter?</h2>
            <p>${why}.</p>

            <h2>How Does It Work?</h2>
            <p>${how}.</p>

            <h2>Professional Workflow</h2>
            <pre><code>${escapeHtml(data.workflow || "Confirm scope → gather evidence → interpret → validate safely → document → recommend remediation")}</code></pre>

            <h2>Worked Scenario</h2>
            <p>${data.example || "Apply the concept to an intentionally vulnerable training target, record what you observed and state what still needs validation."}</p>

            <h2>Security and Safety</h2>
            <p>Perform this work only against systems you own or are explicitly authorized to assess. Use the minimum action needed to prove impact and avoid destructive behavior.</p>

            <h2>Common Mistakes</h2>
            <ul>
                <li>Running tools before confirming target scope.</li>
                <li>Treating automated output as proof without manual validation.</li>
                <li>Collecting more sensitive data than the finding requires.</li>
                <li>Failing to preserve evidence and timestamps.</li>
                <li>Confusing technical severity with business risk.</li>
            </ul>

            <h2>Before Moving On</h2>
            <p>Explain the concept without notes, reproduce the safe lab workflow and state what evidence would be sufficient to support a finding.</p>
        `,
        keyConcepts: [
            { title, description: what },
            { title: "Assessment Value", description: why },
            { title: "Evidence", description: "Observable information used to support a security conclusion." },
            { title: "Scope", description: "The systems and activities explicitly authorized for testing." }
        ],
        commands: data.commands || [],
        quiz: balanceAnswerPositions(data.quiz || [
            proQuestion(
                `What is the strongest reason to use ${title} during an ethical-hacking assessment?`,
                "Support a defined assessment objective with proportionate evidence",
                "Run as many tools as possible",
                "Expand scope automatically",
                "Avoid documentation"
            ),
            proQuestion(
                "What should happen before any active testing?",
                "Confirm authorization, scope, permitted techniques and stop conditions",
                "Disable monitoring",
                "Attempt exploitation",
                "Collect credentials"
            ),
            proQuestion(
                "What should a tester do with an uncertain result?",
                "Record the uncertainty and gather appropriate additional evidence",
                "Report it as confirmed",
                "Delete it",
                "Assume the highest severity"
            )
        ])
    };
}

function buildLab(id, title, moduleTitle) {
    return {
        id,
        title,
        type: "Hands-On Lab",
        duration: "75–120 minutes",
        objective: `Apply ${moduleTitle} in an isolated authorized CWS training environment.`,
        scenario: "You are assessing an intentionally vulnerable CWS lab target under a written training scope.",
        prerequisites: [
            "Confirmed isolated lab network",
            "Authorized target list",
            "Assessment workspace and notes",
            "VM snapshot where appropriate"
        ],
        instructions: [
            "Confirm the exact authorized target before active work.",
            `Apply the ${moduleTitle} workflow taught in this module.`,
            "Record commands or actions, timestamps and output.",
            "Separate confirmed facts from hypotheses.",
            "Validate only with the minimum impact needed.",
            "Save relevant evidence in the assessment workspace.",
            "Write one remediation or defensive recommendation.",
            "Clean up any approved testing artifacts."
        ],
        evidence: [
            "Timeline entries",
            "Relevant command or tool output",
            "Screenshots where useful",
            "Short findings or observations document"
        ],
        reflection: [
            "Which evidence most strongly supported your conclusion?",
            "What could have caused a false positive?",
            "How could a defender prevent or detect the issue?"
        ],
        safety: "Use only isolated lab systems or another environment where you have explicit authorization."
    };
}

function buildAssessment(title) {
    return {
        title,
        type: "Module Assessment",
        passingScore: 75,
        allowRetry: true,
        showResults: true,
        questions: [
            {
                question: "What should define every action during an ethical-hacking assessment?",
                options: ["Authorization, scope and assessment objective","Tool availability","Maximum impact","Internet reachability"],
                answer: 0
            },
            {
                question: "Why is manual validation important?",
                options: ["Automated results may be incomplete or false","Tools never work","Reports need no evidence","Only exploitation matters"],
                answer: 0
            },
            {
                question: "What is the best evidence practice?",
                options: ["Collect the minimum necessary proof and preserve context","Copy all available data","Remove timestamps","Rely on memory"],
                answer: 0
            },
            {
                question: "What should happen when a result is uncertain?",
                options: ["Document uncertainty and gather more evidence safely","Report it as critical","Ignore scope","Increase disruption"],
                answer: 0
            },
            {
                question: "What makes a security finding useful?",
                options: ["Evidence, impact and actionable remediation","Only a tool name","Only a CVSS score","Only a screenshot"],
                answer: 0
            }
        ]
    };
}


function balanceAnswerPositions(questions = [], offset = 0) {
    return questions.map((item, index) => {
        const options = Array.isArray(item.options) ? [...item.options] : [];
        if (!options.length) return item;

        const answer = Number.isInteger(item.answer) ? item.answer : 0;
        const shift = (index + offset) % options.length;

        return {
            ...item,
            options: [...options.slice(shift), ...options.slice(0, shift)],
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


const ethicalHackingQuestionBanks = {
    "module-01": [
        proQuestion("What gives an ethical-hacking engagement its authority?", "Written authorization tied to an agreed scope and rules of engagement", "Public Internet exposure", "The tester's certification", "A vulnerability scanner result"),
        proQuestion("Which rules-of-engagement item is essential before testing?", "Permitted techniques, prohibited actions, contacts, timing and stop conditions", "A list of every available exploit", "A promise that no finding will be high risk", "Permission to test related third parties"),
        proQuestion("What is the strongest assessment-note entry?", "Timestamp, target, action, result, interpretation, evidence reference and next step", "Tool name and target only", "A screenshot without context", "A conclusion written from memory"),
        proQuestion("An apparently related cloud host is outside scope. What should the tester do?", "Stop testing it, preserve the observation and request a formal scope decision", "Test it quietly", "Attempt authentication only", "Add it to scope in the notes"),
        proQuestion("Why define emergency contacts and stop conditions?", "To control safety and escalation when testing creates unexpected risk", "To bypass change control", "To conceal testing from defenders", "To guarantee exploitation success")
    ],
    "module-02": [
        proQuestion("What distinguishes active reconnaissance from passive reconnaissance?", "Active reconnaissance sends traffic or requests to the authorized target", "Active reconnaissance uses only public sources", "Passive reconnaissance always requires credentials", "Passive reconnaissance changes target configuration"),
        proQuestion("What should a target profile separate?", "Confirmed observations, sources, hypotheses and confidence levels", "Open ports from hostnames", "Technical facts from timestamps", "Assets from owners"),
        proQuestion("A DNS record names a service. What does that prove?", "The record exists; the service and its exposure still require validation", "The host is vulnerable", "The service is currently reachable", "The target permits exploitation"),
        proQuestion("What is the professional use of passive findings?", "Develop scoped hypotheses that guide proportionate active validation", "Report every mention as a vulnerability", "Collect personal data unrelated to scope", "Expand the target list automatically"),
        proQuestion("Which reconnaissance evidence is strongest?", "A timestamped source, exact query, returned data and a stated confidence level", "A copied claim with no source", "An old screenshot", "An unverified technology guess")
    ],
    "module-03": [
        proQuestion("What does an open TCP port establish?", "A service endpoint accepted the tested connection at that time", "The service is exploitable", "The host is fully enumerated", "Authentication can be bypassed"),
        proQuestion("Why record scan timing and options?", "They materially affect coverage, impact and reproducibility", "They reveal passwords", "They replace scope", "They guarantee identical networks"),
        proQuestion("A host does not answer discovery probes but is expected in scope. What is the best next step?", "Use an approved alternative discovery or direct host scan and document the limitation", "Declare it offline", "Scan neighboring public networks", "Disable the target firewall"),
        proQuestion("Why must version-detection output be validated?", "Banners may be hidden, altered or affected by backporting", "Nmap never detects services", "All version strings prove a CVE", "Validation is only required for UDP"),
        proQuestion("How should an authorized subnet scan be controlled?", "Use the approved range, rate and technique and monitor for unexpected impact", "Maximize speed without limits", "Include adjacent networks", "Ignore fragile systems")
    ],
    "module-04": [
        proQuestion("What is the goal of service enumeration?", "Answer service-specific questions about configuration, features, identities and exposure", "Run every available script", "Prove exploitation", "Replace manual validation"),
        proQuestion("What should guide the next enumeration action?", "Observed service evidence and the assessment objective", "The newest tool release", "A generic checklist alone", "The desire for maximum output"),
        proQuestion("Which web-enumeration starting point is proportionate?", "Review normal application behavior, headers, routes and authentication flows", "Start with destructive payloads", "Download all data", "Ignore response differences"),
        proQuestion("What is unsafe SMB enumeration practice?", "Uncontrolled credential guessing without explicit authorization and rate limits", "Recording protocol versions", "Reviewing authorized shares", "Documenting access requirements"),
        proQuestion("What makes enumeration evidence reproducible?", "Exact target, request or command, time, output and analyst interpretation", "A service name only", "A cropped screenshot", "A finding title without steps")
    ],
    "module-05": [
        proQuestion("What turns a scanner alert into a defensible vulnerability finding?", "Manual validation of the affected condition, prerequisites, exposure and impact", "A critical severity label", "A large output file", "A matching product name"),
        proQuestion("How should CVSS be used?", "As technical severity input alongside asset, exposure, exploitability and business context", "As the complete business-risk decision", "As proof of compromise", "As authorization to exploit"),
        proQuestion("A package version appears old, but the vendor backported a fix. What is required?", "Validate the vendor advisory, build information and actual vulnerable behavior", "Report it as exploitable", "Ignore vendor evidence", "Increase the CVSS score"),
        proQuestion("What is a false positive?", "A reported condition that does not exist or is not applicable as claimed", "A low-severity confirmed weakness", "An out-of-scope host", "A finding without remediation"),
        proQuestion("What should vulnerability research preserve?", "Authoritative references, affected conditions, publication context and applicability notes", "Only exploit code", "Only a CVE identifier", "Unverified forum comments")
    ],
    "module-06": [
        proQuestion("When is controlled exploitation justified?", "When authorized and necessary to validate a defined risk with minimum impact", "Whenever exploit code is public", "Before enumeration", "Against any Internet-facing service"),
        proQuestion("What must be reviewed before executing exploit code?", "Source, behavior, prerequisites, target match, payload, side effects and recovery plan", "Only the exploit name", "Only the CVSS score", "Only antivirus status"),
        proQuestion("What is the safest proof after obtaining an authorized lab shell?", "A minimum command such as identity and hostname that proves the scoped outcome", "Deleting a system file", "Dumping unrelated customer data", "Disabling security services"),
        proQuestion("An exploit may crash a fragile service. What should happen?", "Pause and obtain an explicit risk decision with safeguards or choose a safer validation method", "Run it repeatedly", "Conceal the risk", "Change the target"),
        proQuestion("What should a Metasploit session record include?", "Module, options, target, payload, validation result, evidence and cleanup", "Only the session number", "Only the exploit rank", "Only a screenshot")
    ],
    "module-07": [
        proQuestion("What is privilege escalation analysis trying to determine?", "Whether the current identity can cross an unintended privilege boundary", "Whether the host has open ports", "Whether DNS resolves", "Whether a report exists"),
        proQuestion("Why begin with read-only enumeration?", "It builds a scoped evidence baseline before any higher-impact validation", "It guarantees administrator access", "It disables logging", "It replaces authorization"),
        proQuestion("What does sudo -l help establish?", "Commands the current Linux identity may run through sudo", "Every SUID file", "Kernel exploitability", "Network segmentation"),
        proQuestion("A writable service path may be exploitable. What is the next professional step?", "Validate ownership, service context, prerequisites and permitted proof before modification", "Replace the file immediately", "Restart production services", "Copy credentials"),
        proQuestion("How should privilege-escalation impact be reported?", "State the starting identity, crossed boundary, resulting capability, evidence and remediation", "State only that root was obtained", "List automated-tool output", "Omit prerequisites")
    ],
    "module-08": [
        proQuestion("What should govern post-exploitation actions?", "The approved objective and minimum evidence needed to demonstrate impact", "Maximum accessible data", "Curiosity", "The session timeout"),
        proQuestion("How should sensitive evidence be handled?", "Minimize collection, encrypt storage, restrict access, redact reporting and follow retention rules", "Place it in public notes", "Copy everything for completeness", "Remove timestamps"),
        proQuestion("Why maintain an artifact register?", "To record created or changed items so cleanup and verification are reliable", "To hide activity", "To expand scope", "To replace evidence"),
        proQuestion("What makes a retest credible?", "Repeat the original validation method against the remediated condition and document the result", "Run a different unrelated scanner", "Accept a verbal assurance", "Delete the original finding"),
        proQuestion("A cleanup step fails. What should the tester do?", "Stop, preserve evidence, notify the agreed contact and track the residual artifact", "Ignore it", "Delete additional files", "Close the engagement silently")
    ],
    "module-09": [
        proQuestion("What makes a finding reproducible?", "Clear prerequisites, affected asset, steps, evidence and expected-versus-observed behavior", "A high severity label", "A tool screenshot", "An exploit name"),
        proQuestion("What should remediation address?", "The root cause plus practical compensating controls and verification steps", "Only the scanner signature", "Only user awareness", "Only the symptom"),
        proQuestion("How should business impact be written?", "Connect demonstrated technical capability to realistic consequences for the affected process or data", "Repeat the CVSS score", "Assume total compromise", "Use unsupported financial figures"),
        proQuestion("What belongs in an executive summary?", "Scope, overall risk, major themes, key limitations and prioritized actions", "Every command", "Raw packet captures", "Every low-level banner"),
        proQuestion("How should uncertainty appear in a report?", "Explicitly state the evidence, confidence, limitations and required follow-up", "Hide it", "Increase severity", "Remove the finding")
    ],
    "module-10": [
        proQuestion("What is the correct capstone sequence?", "Scope, reconnaissance, discovery, enumeration, validation, minimum-impact proof, cleanup, reporting and retest plan", "Exploit first and define scope later", "Scan, delete evidence and summarize", "Collect credentials without analysis"),
        proQuestion("What proves capstone methodology rather than tool familiarity?", "Each action follows evidence, scope and a documented objective", "The largest tool list", "One successful exploit", "Maximum scan speed"),
        proQuestion("What belongs in the capstone evidence pack?", "Timeline, target map, commands, outputs, validated findings, artifact register and sanitized proof", "Passwords", "Only screenshots", "Only the final report"),
        proQuestion("What is the strongest remediation plan?", "Prioritized root-cause fixes, owners, interim controls and specific retest criteria", "Patch everything immediately", "Buy a new scanner", "Accept every risk"),
        proQuestion("What makes the final submission professionally defensible?", "Reproducible evidence, proportionate conclusions, honest limitations, cleanup confirmation and actionable reporting", "Claims of complete security", "Unverified automated output", "Testing beyond scope")
    ]
};


/* =========================================================
   CWS PRO COURSE STANDARDIZATION
========================================================= */

function applyEthicalHackingProStandard(course) {
    course.modules.forEach(module => {
        module.learningOutcomes = [
            `Apply ${module.title} within a written authorization and defined assessment objective.`,
            "Choose a proportionate technique based on evidence rather than tool availability.",
            "Separate observations, hypotheses, validated facts and business-impact conclusions.",
            "Produce sanitized, reproducible evidence and an actionable defensive recommendation."
        ];

        module.professionalCompetencies = [
            "Scope and authorization control",
            "Evidence-driven technical analysis",
            "Risk-aware decision making",
            "Professional documentation and communication"
        ];

        module.moduleAssessment = {
            title: `${module.title} — Pro Verified Assessment`,
            type: "Module Assessment",
            access: "pro",
            passingScore: 80,
            allowRetry: true,
            showResults: true,
            required: true,
            questionCount: ethicalHackingQuestionBanks[module.id].length,
            questions: balanceAnswerPositions(
                ethicalHackingQuestionBanks[module.id],
                module.number - 1
            )
        };

        module.labActivities = (module.labActivities || []).map(activity => ({
            ...activity,
            access: "pro",
            required: true,
            minimumScore: 80,
            successCriteria: "The learner remains within scope, follows the taught methodology, validates the conclusion with minimum-impact evidence, records artifacts and provides practical remediation.",
            evidence: [
                "Signed or fictional rules-of-engagement reference and exact target scope",
                "Timestamped testing timeline with commands or actions",
                "Raw output plus the learner's interpretation",
                "Expected-versus-observed behavior",
                "Minimum proof supporting each conclusion",
                "Finding with impact, evidence, remediation and retest method",
                "Artifact register and cleanup confirmation"
            ],
            cleanup: [
                "Remove every approved account, payload, file, listener or configuration artifact created during testing.",
                "Stop test services and sessions and restore the intended lab state.",
                "Verify cleanup against the artifact register.",
                "Retain only encrypted or sanitized evidence required for the submission."
            ],
            safety: "Use only purpose-built lab systems or targets covered by explicit written authorization. Respect prohibited techniques, rate limits, maintenance windows, data-handling rules and stop conditions.",
            rubric: {
                methodologyAndScope: 20,
                technicalAccuracy: 20,
                validationAndEvidence: 25,
                riskAndRemediation: 15,
                safetyAndCleanup: 10,
                reportingQuality: 10
            }
        }));

        module.lessons.forEach((item, lessonIndex) => {
            item.performanceObjectives = [
                `Explain ${item.title} accurately and identify where it belongs in the assessment lifecycle.`,
                "Select a justified, authorized technique and predict its expected evidence.",
                "Perform or analyze the minimum-impact workflow in the isolated CWS lab.",
                "Convert the result into a defensible conclusion, limitation and remediation action."
            ];
            item.evidenceStandard = [
                "Link every action to the authorized target and assessment objective.",
                "Record exact commands, options, timestamps and relevant environment details.",
                "Preserve raw output separately from analyst interpretation.",
                "State confidence, alternative explanations and required follow-up.",
                "Redact secrets, tokens, personal information and unnecessary sensitive data."
            ];
            item.completionCriteria = [
                "The concept and safety boundary can be explained without notes.",
                "The knowledge check is passed.",
                "The learner can justify the chosen technique over a higher-impact alternative.",
                "Associated evidence meets the Pro evidence standard."
            ];
            item.quiz = balanceAnswerPositions(item.quiz, module.number + lessonIndex);
        });
    });

    const integrativeScenarios = [
        proQuestion("During reconnaissance, a third-party SaaS hostname appears related to the client but is not listed in scope. What is the correct action?", "Record the observation, do not test it and request a formal scope decision", "Scan it because DNS is public", "Attempt one login", "Add it silently to the target list"),
        proQuestion("A scan reports a critical service version, but vendor evidence indicates a backported fix. What should the finding say?", "Document the conflicting evidence and validate the affected condition before deciding applicability", "Report critical because the banner matches", "Remove the evidence", "Exploit immediately"),
        proQuestion("A permitted exploit may interrupt a business-critical lab simulation. What is the best decision?", "Use the agreed risk process, safeguards and recovery plan or select a safer validation method", "Run it at maximum speed", "Disable monitoring", "Avoid telling the engagement contact"),
        proQuestion("A shell is obtained on an authorized target. What is the strongest next action?", "Capture minimum identity and host proof, reassess the objective and avoid unrelated data access", "Search every user directory", "Create persistence", "Disable defensive tools"),
        proQuestion("Two tools disagree about a service. How should the tester proceed?", "Preserve both results, compare methods and manually validate the actual protocol behavior", "Choose the more severe result", "Run uncontrolled exploitation", "Report both as confirmed"),
        proQuestion("A privilege path depends on changing a service file. What must precede validation?", "Confirm permission, service impact, recovery, minimum proof and cleanup steps", "Modify the file immediately", "Restart all services", "Delete logs"),
        proQuestion("Sensitive data appears unexpectedly during testing. What should happen?", "Stop unnecessary access, preserve minimal evidence and follow the agreed notification and handling process", "Copy the full dataset", "Include it unredacted in the report", "Ignore the event"),
        proQuestion("A remediation closes the exposed port but leaves the vulnerable service reachable internally. What should the retest conclude?", "The original exposure changed, but residual risk and internal reachability must be documented against the agreed remediation objective", "Fully remediated", "Not testable", "Critical compromise"),
        proQuestion("A technical finding has high CVSS but affects an isolated disposable training asset. How should priority be handled?", "Present technical severity separately from contextual business risk and explain both", "Always rate business risk critical", "Remove the finding", "Ignore technical severity"),
        proQuestion("What is the strongest final Pro-course submission?", "A scoped, reproducible assessment with sanitized evidence, defensible findings, prioritized remediation, cleanup confirmation and a retest plan", "A folder of raw tool output", "One exploit screenshot", "A list of discovered passwords")
    ];

    const finalQuestions = [
        ...Object.values(ethicalHackingQuestionBanks).flatMap(bank => bank.slice(0, 2)),
        ...integrativeScenarios
    ];

    course.finalAssessment = {
        id: "final-assessment",
        title: "CWS Ethical Hacking Pro Final Assessment",
        description: "A server-verified, scenario-based assessment of authorization, methodology, reconnaissance, discovery, enumeration, validation, controlled exploitation, privilege analysis, evidence handling, reporting and retesting.",
        type: "Final Assessment",
        access: "pro",
        duration: "75–90 minutes",
        passingScore: 85,
        allowRetry: true,
        required: true,
        questionCount: finalQuestions.length,
        questions: balanceAnswerPositions(finalQuestions)
    };

    course.capstone = {
        title: "End-to-End Authorized Penetration Test",
        access: "pro",
        required: true,
        minimumScore: 85,
        estimatedTime: "12–16 hours",
        scenario: "Conduct a complete assessment of a purpose-built CWS organization across an isolated network, two hosts and a web service under formal fictional rules of engagement.",
        deliverables: [
            "Signed fictional scope and rules of engagement",
            "Target profile and attack-surface map",
            "Timestamped testing timeline and sanitized evidence index",
            "Discovery and service-enumeration results",
            "Manual validation of at least three candidate weaknesses",
            "Minimum-impact proof for one explicitly permitted exploit path",
            "Privilege-boundary analysis without unnecessary data access",
            "Artifact register and verified cleanup checklist",
            "Professional report with executive summary and technical findings",
            "Prioritized remediation roadmap and exact retest plan"
        ],
        rubric: {
            authorizationAndMethodology: 15,
            technicalDepthAndAccuracy: 25,
            validationAndEvidence: 20,
            riskAndRemediation: 15,
            safetyAndCleanup: 10,
            professionalReporting: 15
        }
    };

    course.qualityVersion = "CWS-PRO-STANDARD-2026.2";
}


export const ethicalHacking = {
    id: "ethical-hacking",
    title: "Ethical Hacking",
    overviewTitle: "Learn Authorized Security Testing from Methodology to Reporting",
    category: "CWS ACADEMY • OFFENSIVE SECURITY",
    level: "Beginner → Intermediate",
    levelKey: "intermediate",
    status: "available",
    access: "pro",
    icon: "fa-solid fa-user-secret",
    description: "Learn ethical hacking through structured methodology, authorized reconnaissance, discovery, enumeration, vulnerability validation, controlled exploitation concepts, privilege-escalation analysis and professional reporting.",
    longDescription: "Ethical Hacking is the first CWS Pro offensive-security course. Students learn how an authorized assessment is planned, executed, evidenced and reported. The course emphasizes scope, repeatable methodology, safe tool usage, manual validation, evidence collection, remediation and professional reporting.",
    duration: "70–90 Hours",
    estimatedLessons: 30,
    certificateEligible: true,
    learningStandard: "Professional Methodology • Controlled Validation • Hands-On Labs • Evidence • Reporting • Server-Verified Assessment",
    prerequisites: ["Cybersecurity Fundamentals","Networking Fundamentals","Linux Fundamentals"],
    recommendedPrerequisites: ["Python Fundamentals for Cybersecurity","Bash & Linux Automation"],
    skills: [
        "Rules of engagement and scope control",
        "Passive and active reconnaissance",
        "Host discovery and port scanning",
        "Service-specific enumeration",
        "Vulnerability validation",
        "Controlled exploitation",
        "Linux and Windows privilege-boundary analysis",
        "Evidence and artifact handling",
        "Risk-based findings",
        "Professional technical and executive reporting"
    ],
    tools: [
        "Nmap",
        "dig",
        "nslookup",
        "curl",
        "Metasploit Framework",
        "Linux identity and process tools",
        "Windows identity and system tools",
        "CWS evidence workbook",
        "CWS penetration-test report template"
    ],
    assessmentStandard: "Pro assessments require scenario judgment, defensible scope decisions, manual validation, minimal-impact proof, sanitized evidence, cleanup confirmation and actionable reporting. Generic repeated question banks do not qualify.",
    standardReferences: [
        {
            title: "NIST SP 800-115 — Technical Guide to Information Security Testing and Assessment",
            organization: "National Institute of Standards and Technology",
            url: "https://csrc.nist.gov/pubs/sp/800/115/final"
        },
        {
            title: "NICE Workforce Framework for Cybersecurity",
            organization: "National Institute of Standards and Technology",
            url: "https://www.nist.gov/itl/applied-cybersecurity/nice/nice-framework-resource-center"
        }
    ],
    completionRules: {
        minimumLessonCompletion: 100,
        minimumModuleAssessmentScore: 80,
        minimumRequiredLabScore: 80,
        finalAssessmentPassingScore: 85,
        capstonePassingScore: 85,
        requireAllModuleAssessments: true,
        requireRequiredLabs: true,
        requireFinalAssessment: true,
        requireCapstone: true
    },
    progression: {
        unlockMode: "sequential",
        allowLessonReview: true,
        allowAssessmentRetry: true,
        trackLessonCompletion: true,
        trackAssessmentScores: true,
        trackLabCompletion: true,
        resumeLastLesson: true,
        requireSequentialLabEvidence: true
    },
    objectives: [
        "Plan authorized penetration tests using scope and rules of engagement.",
        "Perform passive and active reconnaissance against authorized targets.",
        "Discover and enumerate hosts and services.",
        "Interpret Nmap and service-enumeration output accurately.",
        "Validate vulnerability candidates manually.",
        "Understand controlled exploitation in purpose-built labs.",
        "Analyze Linux and Windows privilege boundaries.",
        "Handle post-exploitation evidence responsibly.",
        "Write professional findings and remediation guidance.",
        "Complete an end-to-end practical assessment."
    ],
    modules: [
        {
            id: "module-01", number: 1, title: "Ethical Hacking Methodology and Scope",
            description: "Apply ethical hacking methodology and scope through structured professional methodology and hands-on authorized lab work.",
            access: "pro", labs: 1, assessments: 1,
            lessons: [
                buildLesson("lesson-01", "What Ethical Hacking Really Means", {"what": "authorized attacker-style security testing", "why": "use attacker thinking to identify risk without crossing legal or professional boundaries", "how": "Authorization → scope → reconnaissance → discovery → enumeration → validation → evidence → reporting", "workflow": "Authorization → scope → reconnaissance → discovery → enumeration → validation → evidence → reporting", "commands": []}),
                buildLesson("lesson-02", "Scope and Rules of Engagement", {"what": "the formal boundary of an assessment", "why": "prevent accidental testing of systems, techniques or time windows that were not approved", "how": "Define in-scope assets, out-of-scope assets, allowed actions, prohibited actions, contacts and stop conditions", "workflow": "Define in-scope assets, out-of-scope assets, allowed actions, prohibited actions, contacts and stop conditions", "commands": []}),
                buildLesson("lesson-03", "Assessment Workflow and Note Taking", {"what": "a repeatable record of what the tester did and observed", "why": "support reproducibility, evidence quality and accurate reporting", "how": "Record time, target, action, result, interpretation, evidence and next step", "workflow": "Record time, target, action, result, interpretation, evidence and next step", "commands": []}),
            ],
            labActivities: [buildLab("lab-01", "Build Your Assessment Workspace", "Ethical Hacking Methodology and Scope")],
            moduleAssessment: buildAssessment("Module 1 Assessment \u2014 Ethical Hacking Methodology and Scope")
        },
        {
            id: "module-02", number: 2, title: "Reconnaissance and Target Understanding",
            description: "Apply reconnaissance and target understanding through structured professional methodology and hands-on authorized lab work.",
            access: "pro", labs: 1, assessments: 1,
            lessons: [
                buildLesson("lesson-01", "Passive vs Active Reconnaissance", {"what": "two ways of gathering target information", "why": "choose lower-impact information gathering before direct probing when appropriate", "how": "Passive uses public information; active reconnaissance sends traffic to the authorized target", "workflow": "Passive uses public information; active reconnaissance sends traffic to the authorized target", "commands": []}),
                buildLesson("lesson-02", "DNS and Infrastructure Reconnaissance", {"what": "using DNS and public infrastructure clues to understand architecture", "why": "identify hosts, services and relationships that may matter later", "how": "Review A, AAAA, MX, NS, TXT and CNAME records and separate facts from assumptions", "workflow": "Review A, AAAA, MX, NS, TXT and CNAME records and separate facts from assumptions", "commands": [{"command": "dig training.cws.local", "explanation": "Query an authorized lab hostname."}, {"command": "nslookup training.cws.local", "explanation": "Perform a DNS lookup."}]}),
                buildLesson("lesson-03", "Building a Target Profile", {"what": "organizing reconnaissance into a useful model", "why": "turn scattered observations into hypotheses for later validation", "how": "Record assets, services, technologies, authentication points, trust relationships and confidence level", "workflow": "Record assets, services, technologies, authentication points, trust relationships and confidence level", "commands": []}),
            ],
            labActivities: [buildLab("lab-01", "Authorized Target Profile", "Reconnaissance and Target Understanding")],
            moduleAssessment: buildAssessment("Module 2 Assessment \u2014 Reconnaissance and Target Understanding")
        },
        {
            id: "module-03", number: 3, title: "Host Discovery and Port Scanning",
            description: "Apply host discovery and port scanning through structured professional methodology and hands-on authorized lab work.",
            access: "pro", labs: 1, assessments: 1,
            lessons: [
                buildLesson("lesson-01", "Host Discovery", {"what": "determining which authorized systems appear reachable", "why": "focus later testing on real lab systems", "how": "Use low-impact discovery such as nmap -sn on an isolated authorized subnet", "workflow": "Use low-impact discovery such as nmap -sn on an isolated authorized subnet", "commands": [{"command": "nmap -sn 192.168.56.0/24", "explanation": "Discover hosts only on your authorized isolated lab subnet."}]}),
                buildLesson("lesson-02", "TCP Port Scanning with Nmap", {"what": "identifying exposed TCP service endpoints", "why": "understand attack surface before deeper enumeration", "how": "Interpret open, closed and filtered states; never equate open with vulnerable", "workflow": "Interpret open, closed and filtered states; never equate open with vulnerable", "commands": [{"command": "nmap 192.168.56.20", "explanation": "Default TCP scan against one authorized lab host."}]}),
                buildLesson("lesson-03", "Service and Version Detection", {"what": "identifying the software behind an exposed service", "why": "select appropriate service-specific enumeration and research", "how": "Use nmap -sV, validate banners and consider backported or hidden versions", "workflow": "Use nmap -sV, validate banners and consider backported or hidden versions", "commands": [{"command": "nmap -sV 192.168.56.20", "explanation": "Service/version detection against an authorized lab host."}]}),
            ],
            labActivities: [buildLab("lab-01", "Authorized Nmap Discovery and Service Map", "Host Discovery and Port Scanning")],
            moduleAssessment: buildAssessment("Module 3 Assessment \u2014 Host Discovery and Port Scanning")
        },
        {
            id: "module-04", number: 4, title: "Service Enumeration",
            description: "Apply service enumeration through structured professional methodology and hands-on authorized lab work.",
            access: "pro", labs: 1, assessments: 1,
            lessons: [
                buildLesson("lesson-01", "What Enumeration Means", {"what": "service-specific information gathering", "why": "move from 'a service exists' to understanding how it is configured and exposed", "how": "Choose enumeration questions based on observed services", "workflow": "Choose enumeration questions based on observed services", "commands": []}),
                buildLesson("lesson-02", "Web Service Enumeration", {"what": "mapping an authorized web application's exposed features", "why": "identify routes, technologies, headers and authentication points", "how": "Begin with manual browsing and low-impact requests such as curl -I", "workflow": "Begin with manual browsing and low-impact requests such as curl -I", "commands": [{"command": "curl -I http://192.168.56.20", "explanation": "Retrieve response headers from an authorized lab web service."}]}),
                buildLesson("lesson-03", "SMB and SSH Enumeration Concepts", {"what": "targeted inspection of file-sharing and remote-access services", "why": "understand shares, protocol settings, banners and authentication requirements", "how": "Enumerate configuration without uncontrolled password guessing", "workflow": "Enumerate configuration without uncontrolled password guessing", "commands": []}),
            ],
            labActivities: [buildLab("lab-01", "Service Enumeration Worksheet", "Service Enumeration")],
            moduleAssessment: buildAssessment("Module 4 Assessment \u2014 Service Enumeration")
        },
        {
            id: "module-05", number: 5, title: "Vulnerability Assessment and Validation",
            description: "Apply vulnerability assessment and validation through structured professional methodology and hands-on authorized lab work.",
            access: "pro", labs: 1, assessments: 1,
            lessons: [
                buildLesson("lesson-01", "From Observation to Vulnerability", {"what": "turning technical observations into evidence-backed security findings", "why": "avoid false positives and unsupported claims", "how": "Validate affected feature, prerequisites, exposure, compensating controls and realistic impact", "workflow": "Validate affected feature, prerequisites, exposure, compensating controls and realistic impact", "commands": []}),
                buildLesson("lesson-02", "CVE, CVSS and Vulnerability Research", {"what": "researching publicly documented vulnerabilities and severity", "why": "connect observed software/configuration to known weakness information", "how": "CVE identifies vulnerabilities; CVSS expresses technical severity; business risk still needs context", "workflow": "CVE identifies vulnerabilities; CVSS expresses technical severity; business risk still needs context", "commands": []}),
                buildLesson("lesson-03", "Scanner Results and Manual Confirmation", {"what": "reviewing automated vulnerability findings manually", "why": "scanners accelerate discovery but do not replace tester judgment", "how": "Check target identity, evidence, affected versions, prerequisites and false-positive causes", "workflow": "Check target identity, evidence, affected versions, prerequisites and false-positive causes", "commands": []}),
            ],
            labActivities: [buildLab("lab-01", "Validate a Candidate Vulnerability", "Vulnerability Assessment and Validation")],
            moduleAssessment: buildAssessment("Module 5 Assessment \u2014 Vulnerability Assessment and Validation")
        },
        {
            id: "module-06", number: 6, title: "Controlled Exploitation Foundations",
            description: "Apply controlled exploitation foundations through structured professional methodology and hands-on authorized lab work.",
            access: "pro", labs: 1, assessments: 1,
            lessons: [
                buildLesson("lesson-01", "What Exploitation Proves", {"what": "controlled validation that a weakness can produce security impact", "why": "demonstrate risk only when scope permits and evidence is necessary", "how": "Use the minimum-impact proof required to show unauthorized access or control", "workflow": "Use the minimum-impact proof required to show unauthorized access or control", "commands": []}),
                buildLesson("lesson-02", "Exploit Preconditions and Reliability", {"what": "conditions required for exploit success", "why": "avoid blindly executing code against the wrong version or configuration", "how": "Check version, architecture, configuration, privileges and network path; review exploit behavior first", "workflow": "Check version, architecture, configuration, privileges and network path; review exploit behavior first", "commands": []}),
                buildLesson("lesson-03", "Metasploit in a Controlled Lab", {"what": "a framework for structured exploitation workflows", "why": "organize modules, options, validation and sessions in a training environment", "how": "Search → use → show options → set authorized target → check when supported → run", "workflow": "Search → use → show options → set authorized target → check when supported → run", "commands": []}),
            ],
            labActivities: [buildLab("lab-01", "Controlled Exploitation of a Purpose-Built Vulnerable VM", "Controlled Exploitation Foundations")],
            moduleAssessment: buildAssessment("Module 6 Assessment \u2014 Controlled Exploitation Foundations")
        },
        {
            id: "module-07", number: 7, title: "Privilege Escalation Foundations",
            description: "Apply privilege escalation foundations through structured professional methodology and hands-on authorized lab work.",
            access: "pro", labs: 1, assessments: 1,
            lessons: [
                buildLesson("lesson-01", "Privilege Escalation Concepts", {"what": "gaining permissions beyond the intended current role", "why": "show how local configuration weaknesses amplify an initial compromise", "how": "Enumerate identity, privileges, services, writable paths, credentials and delegated rights before acting", "workflow": "Enumerate identity, privileges, services, writable paths, credentials and delegated rights before acting", "commands": []}),
                buildLesson("lesson-02", "Linux Privilege Escalation Analysis", {"what": "reviewing Linux privilege boundaries", "why": "identify unsafe sudo rules, permissions, services and exposed secrets", "how": "Use read-only checks such as id, sudo -l, ps aux and ss -tuln", "workflow": "Use read-only checks such as id, sudo -l, ps aux and ss -tuln", "commands": [{"command": "id", "explanation": "Show current Linux identity and groups."}, {"command": "sudo -l", "explanation": "Show permitted sudo commands."}]}),
                buildLesson("lesson-03", "Windows Privilege Escalation Analysis", {"what": "reviewing Windows privilege boundaries", "why": "identify risky services, token privileges, tasks, patches and configuration", "how": "Use whoami, whoami /groups, whoami /priv and systeminfo in the lab", "workflow": "Use whoami, whoami /groups, whoami /priv and systeminfo in the lab", "commands": [{"command": "whoami /groups", "explanation": "Show Windows group memberships."}, {"command": "whoami /priv", "explanation": "Show token privileges."}]}),
            ],
            labActivities: [buildLab("lab-01", "Privilege Boundary Analysis", "Privilege Escalation Foundations")],
            moduleAssessment: buildAssessment("Module 7 Assessment \u2014 Privilege Escalation Foundations")
        },
        {
            id: "module-08", number: 8, title: "Post-Exploitation Discipline and Evidence",
            description: "Apply post-exploitation discipline and evidence through structured professional methodology and hands-on authorized lab work.",
            access: "pro", labs: 1, assessments: 1,
            lessons: [
                buildLesson("lesson-01", "Post-Exploitation Objectives", {"what": "measuring what validated access actually means", "why": "translate technical access into realistic impact without unnecessary data collection", "how": "Determine privilege level, reachable assets, trust relationships and minimum evidence required", "workflow": "Determine privilege level, reachable assets, trust relationships and minimum evidence required", "commands": []}),
                buildLesson("lesson-02", "Evidence and Sensitive Data Handling", {"what": "collecting proof safely and systematically", "why": "support findings without exposing unnecessary secrets or personal data", "how": "Use structured evidence names, timestamps and redaction", "workflow": "Use structured evidence names, timestamps and redaction", "commands": []}),
                buildLesson("lesson-03", "Cleanup and Retesting", {"what": "restoring assessment artifacts and verifying remediation", "why": "leave the environment in a known state and confirm fixes later", "how": "Document changes, remove approved test artifacts and repeat the original validation method during retest", "workflow": "Document changes, remove approved test artifacts and repeat the original validation method during retest", "commands": []}),
            ],
            labActivities: [buildLab("lab-01", "Evidence Pack and Cleanup Checklist", "Post-Exploitation Discipline and Evidence")],
            moduleAssessment: buildAssessment("Module 8 Assessment \u2014 Post-Exploitation Discipline and Evidence")
        },
        {
            id: "module-09", number: 9, title: "Professional Findings and Reporting",
            description: "Apply professional findings and reporting through structured professional methodology and hands-on authorized lab work.",
            access: "pro", labs: 1, assessments: 1,
            lessons: [
                buildLesson("lesson-01", "Anatomy of a Strong Finding", {"what": "a reproducible description of a security issue", "why": "help technical teams understand, verify and remediate the problem", "how": "Title, severity, asset, description, evidence, reproduction, impact, remediation and references", "workflow": "Title, severity, asset, description, evidence, reproduction, impact, remediation and references", "commands": []}),
                buildLesson("lesson-02", "Severity, Impact and Remediation", {"what": "prioritizing findings and recommending corrective action", "why": "turn technical evidence into useful business risk decisions", "how": "Consider exploitability, exposure and impact; write specific remediation that addresses root cause", "workflow": "Consider exploitability, exposure and impact; write specific remediation that addresses root cause", "commands": []}),
                buildLesson("lesson-03", "Executive Summary and Assessment Narrative", {"what": "a non-technical view of the assessment outcome", "why": "give decision-makers the overall risk picture and priorities", "how": "Summarize scope, major risks, themes, limitations and recommended priorities", "workflow": "Summarize scope, major risks, themes, limitations and recommended priorities", "commands": []}),
            ],
            labActivities: [buildLab("lab-01", "Write a Professional Finding", "Professional Findings and Reporting")],
            moduleAssessment: buildAssessment("Module 9 Assessment \u2014 Professional Findings and Reporting")
        },
        {
            id: "module-10", number: 10, title: "Ethical Hacking Capstone",
            description: "Apply ethical hacking capstone through structured professional methodology and hands-on authorized lab work.",
            access: "pro", labs: 1, assessments: 1,
            lessons: [
                buildLesson("lesson-01", "Capstone Planning", {"what": "planning the final end-to-end engagement", "why": "ensure methodology and evidence requirements are clear before testing", "how": "Prepare scope, rules, workspace, timeline and deliverables", "workflow": "Prepare scope, rules, workspace, timeline and deliverables", "commands": []}),
                buildLesson("lesson-02", "Execute the Assessment", {"what": "performing the complete authorized methodology", "why": "demonstrate integrated practical ability rather than isolated tool use", "how": "Scope → recon → discovery → enumeration → validation → privilege analysis when relevant → evidence → cleanup", "workflow": "Scope → recon → discovery → enumeration → validation → privilege analysis when relevant → evidence → cleanup", "commands": []}),
                buildLesson("lesson-03", "Final Report and Retest Plan", {"what": "turning the capstone into actionable deliverables", "why": "show what was tested, what was found and how remediation will be verified", "how": "Produce findings, executive summary, remediation priorities and retest steps", "workflow": "Produce findings, executive summary, remediation priorities and retest steps", "commands": []}),
            ],
            labActivities: [buildLab("lab-01", "CWS Ethical Hacking Practical Capstone", "Ethical Hacking Capstone")],
            moduleAssessment: buildAssessment("Module 10 Assessment \u2014 Ethical Hacking Capstone")
        },
    ],

    finalAssessment: {
        title: "CWS Ethical Hacking Final Assessment",
        description: "Demonstrate ethical-hacking methodology, scope awareness, reconnaissance, enumeration, vulnerability validation, exploitation discipline, privilege analysis and reporting.",
        passingScore: 80,
        allowRetry: true,
        required: true,
        questions: [
            {question:"What must begin every ethical-hacking engagement?",options:["Explicit authorization and scope","Exploitation","Privilege escalation","Report writing"],answer:0},
            {question:"What is reconnaissance used for?",options:["Understanding the authorized target and attack surface","Causing disruption","Replacing validation","Avoiding scope"],answer:0},
            {question:"What does an open port prove?",options:["A service is accepting connections","The host is compromised","A vulnerability definitely exists","Credentials are weak"],answer:0},
            {question:"What should follow service discovery?",options:["Targeted enumeration","Random exploitation","Scope expansion","Evidence deletion"],answer:0},
            {question:"Why validate scanner findings manually?",options:["Automated results may be false or incomplete","Scanners never work","Validation is unnecessary","Only CVSS matters"],answer:0},
            {question:"What should controlled exploitation demonstrate?",options:["Relevant impact with minimum necessary action","Maximum damage","Unrelated access","Service disruption"],answer:0},
            {question:"What should happen before exploit code is run?",options:["Review prerequisites, behavior, target and scope","Run it immediately","Disable monitoring","Expand scope"],answer:0},
            {question:"What is privilege escalation?",options:["Gaining permissions beyond the intended current role","DNS resolution","Port scanning","Writing a summary"],answer:0},
            {question:"What is good post-exploitation evidence practice?",options:["Collect only what is necessary to prove impact","Copy all accessible data","Publish secrets","Remove timestamps"],answer:0},
            {question:"Why clean up testing artifacts?",options:["Return the authorized environment to a known state","Hide activity","Destroy evidence","Change scope"],answer:0},
            {question:"What does a strong finding contain?",options:["Evidence, impact, reproduction and remediation","Only a screenshot","Only CVSS","Only a tool name"],answer:0},
            {question:"Why does severity need context?",options:["Exposure, exploitability and business impact affect priority","Every finding is critical","Severity is irrelevant","Only tools decide"],answer:0},
            {question:"What should an executive summary communicate?",options:["Overall risk, major findings and priorities","Every command","Raw packets only","Tool installation"],answer:0},
            {question:"What is retesting for?",options:["Confirm remediation resolved the original issue","Expand scope","Discover unrelated systems","Delete history"],answer:0},
            {question:"What best describes professional penetration testing?",options:["A repeatable evidence-driven process from scope through reporting","Running the most tools","Exploitation without notes","Only scanning"],answer:0},
            {question:"Why separate observations from conclusions?",options:["To avoid overstating evidence","Because evidence is unnecessary","To make notes shorter","To avoid validation"],answer:0},
            {question:"What should happen to an out-of-scope asset?",options:["Exclude it unless scope is formally changed","Test it quickly","Attempt authentication","Add it silently"],answer:0},
            {question:"What is a safe proof after obtaining a lab shell?",options:["whoami or hostname","Deleting files","Disabling services","Changing accounts"],answer:0},
            {question:"What is the role of the report?",options:["Turn technical evidence into actionable risk information","Hide testing","Replace remediation","List tool output only"],answer:0},
            {question:"What shows strongest ethical-hacking understanding?",options:["Choosing justified actions, staying in scope, validating evidence and reporting clearly","Knowing many exploit names","Running automated scans","Using the most tools"],answer:0}
        ]
    }
};


applyEthicalHackingProStandard(ethicalHacking);
