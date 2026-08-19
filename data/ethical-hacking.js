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
        quiz: data.quiz || [
            {
                question: `What is the strongest reason to use ${title} during an ethical-hacking assessment?`,
                options: [
                    "To support a defined assessment objective with evidence",
                    "To run as many tools as possible",
                    "To expand scope automatically",
                    "To avoid documentation"
                ],
                answer: 0
            },
            {
                question: "What should happen before any active testing?",
                options: [
                    "Confirm authorization and scope",
                    "Disable monitoring",
                    "Attempt exploitation",
                    "Collect credentials"
                ],
                answer: 0
            },
            {
                question: "What should a tester do with an uncertain result?",
                options: [
                    "Record the uncertainty and gather appropriate additional evidence",
                    "Report it as confirmed",
                    "Delete it",
                    "Assume the highest severity"
                ],
                answer: 0
            }
        ]
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
    duration: "55–70 Hours",
    estimatedLessons: 30,
    certificateEligible: true,
    learningStandard: "Deep Explanation • Tool Usage • Hands-On Labs • Evidence • Reporting • Verified Assessment",
    prerequisites: ["Cybersecurity Fundamentals","Networking Fundamentals","Linux Fundamentals"],
    recommendedPrerequisites: ["Python Fundamentals for Cybersecurity","Bash & Linux Automation"],
    completionRules: {
        minimumLessonCompletion: 100,
        minimumModuleAssessmentScore: 75,
        finalAssessmentPassingScore: 80,
        requireAllModuleAssessments: true,
        requireRequiredLabs: true,
        requireFinalAssessment: true
    },
    progression: {
        unlockMode: "sequential",
        allowLessonReview: true,
        allowAssessmentRetry: true,
        trackLessonCompletion: true,
        trackAssessmentScores: true,
        trackLabCompletion: true
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
