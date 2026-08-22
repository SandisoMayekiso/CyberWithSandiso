/* =========================================================
   CWS ACADEMY
   WINDOWS FUNDAMENTALS FOR CYBERSECURITY
   FREE • BEGINNER
========================================================= */

function buildLesson(id, title, what, why, how) {
    return {
        id,
        title,
        duration: "45–55 minutes",
        access: "free",
        type: "Lesson",
        icon: "fa-brands fa-windows",
        subtitle: `Understand ${title} through Windows administration and cybersecurity examples.`,
        objectives: [
            `Explain ${title} in your own words.`,
            `Describe why ${title} exists or is used.`,
            `Recognize ${title} on a Windows system.`,
            `Apply the concept in an isolated Windows lab.`,
            `Explain its cybersecurity relevance.`
        ],
        introduction: `
            <h2>${title}</h2>
            <p><strong>What:</strong> ${what}</p>
            <p><strong>Why:</strong> ${why}</p>
        `,
        body: `
            <h2>What Is ${title}?</h2>
            <p>${what}</p>

            <h2>Why Does It Exist?</h2>
            <p>${why}</p>

            <h2>How Does It Work?</h2>
            <p>${how}</p>

            <h2>Cybersecurity Relevance</h2>
            <p>
                Windows is widely used across workstations and enterprise environments.
                Understanding normal identity, permissions, services, networking,
                configuration and logging is necessary before students can reliably
                recognize insecure or unusual behavior.
            </p>

            <h2>Practical Example</h2>
            <p>
                Use an isolated Windows training VM to locate the feature, inspect it
                with built-in tools and record what the output means. The objective is
                understanding normal Windows behavior before moving into offensive or
                advanced defensive techniques.
            </p>

            <h2>Common Mistakes</h2>
            <ul>
                <li>Memorizing commands without understanding the underlying Windows concept.</li>
                <li>Confusing local identities with domain identities.</li>
                <li>Assuming administrator membership means every process is always elevated.</li>
                <li>Changing configuration before recording the original state.</li>
                <li>Disabling security controls just to make a lab easier.</li>
            </ul>

            <h2>Before Moving On</h2>
            <p>
                Explain what the feature does, why Windows needs it, where you can
                inspect it and how a defender could use the information.
            </p>
        `,
        keyConcepts: [
            { title, description: what },
            { title: "Purpose", description: why },
            { title: "Cybersecurity Context", description: "Understand normal Windows behavior before attempting to identify abnormal or insecure behavior." }
        ],
        quiz: [
            {
                question: `What is the best way to learn ${title}?`,
                options: [
                    "Understand what it is, why it exists, how it works and then inspect it in a lab",
                    "Memorize one command only",
                    "Skip directly to exploitation",
                    "Disable the feature"
                ],
                answer: 0
            },
            {
                question: "Why should students record the original system state?",
                options: [
                    "It provides evidence and context before changes are made",
                    "It increases privileges",
                    "It disables logging",
                    "It is only needed on servers"
                ],
                answer: 0
            },
            {
                question: "Why is Windows knowledge important in cybersecurity?",
                options: [
                    "Analysts need to understand normal Windows identity, configuration, services and logs",
                    "Windows has no security controls",
                    "Only Linux is used in enterprises",
                    "Windows knowledge is only for developers"
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
        duration: "60–90 minutes",
        objective: `Apply ${moduleTitle} concepts on an isolated Windows training VM.`,
        scenario: "You are reviewing a Windows workstation in the CWS Academy training environment.",
        prerequisites: [
            "Windows 10 or Windows 11 training VM",
            "VM snapshot",
            "Standard training account",
            "Permission to inspect the lab system"
        ],
        instructions: [
            "Confirm the Windows VM and account you are using.",
            `Review the ${moduleTitle} concepts from the module.`,
            "Use built-in Windows tools to inspect the relevant configuration.",
            "Record what each important value means.",
            "Capture evidence where appropriate.",
            "Write one security observation and one recommended good practice."
        ],
        evidence: [
            "System or configuration output",
            "Screenshot where useful",
            "Short explanation",
            "Security observation"
        ],
        safety: "Perform the lab only on your own Windows VM or another system where you have explicit authorization."
    };
}

function buildAssessment(title) {
    return {
        title,
        type: "Module Assessment",
        passingScore: 70,
        allowRetry: true,
        showResults: true,
        questions: [
            {
                question: "Why should cybersecurity students understand normal Windows behavior?",
                options: [
                    "It provides a baseline for recognizing insecure or unusual behavior",
                    "It removes the need for networking",
                    "It automatically grants administrator rights",
                    "It replaces logging"
                ],
                answer: 0
            },
            {
                question: "What should happen before changing a Windows security setting in a lab?",
                options: [
                    "Understand and record the original state",
                    "Disable all security controls",
                    "Delete logs",
                    "Change several settings at once"
                ],
                answer: 0
            },
            {
                question: "What is the preferred learning sequence?",
                options: [
                    "Concept → purpose → operation → example → lab → assessment",
                    "Exploit → concept",
                    "Command memorization only",
                    "Assessment before learning"
                ],
                answer: 0
            },
            {
                question: "What is least privilege?",
                options: [
                    "Giving an identity only the access needed for its role",
                    "Making every user an administrator",
                    "Disabling UAC",
                    "Sharing administrator accounts"
                ],
                answer: 0
            },
            {
                question: "What makes a Windows lab useful?",
                options: [
                    "The student can explain the evidence rather than only reproduce commands",
                    "The student runs the most commands",
                    "Security controls are disabled",
                    "No notes are taken"
                ],
                answer: 0
            }
        ]
    };
}

/* =========================================================
   ASSESSMENT QUALITY HELPERS
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

function windowsQuestion(prompt, correct, ...distractors) {
    return {
        question: prompt,
        options: [correct, ...distractors],
        answer: 0
    };
}

const windowsModuleBlueprints = {
    "module-01": {
        focus: "identify Windows edition, build, architecture, hostname, current identity and security context before administration",
        command: "Use read-only System Information, Settings, whoami and PowerShell system queries",
        evidence: "edition, version, build, architecture, device identity, current user and timestamp",
        risk: "confusing edition, architecture or identity can produce incorrect commands, controls and conclusions",
        control: "record a system context baseline before making changes"
    },
    "module-02": {
        focus: "reason about Windows paths, NTFS ownership, explicit permissions, inheritance and effective access",
        command: "Use Explorer security properties, icacls and controlled test files in a disposable directory",
        evidence: "path, owner, ACL entries, inheritance source, before-and-after effective access and cleanup",
        risk: "broad inherited or explicit permissions can expose or allow modification of sensitive data",
        control: "apply least privilege to a controlled folder and verify both allowed and denied behavior"
    },
    "module-03": {
        focus: "distinguish local and domain identities, group membership, tokens, elevation and User Account Control",
        command: "Use Computer Management, net user, net localgroup, whoami and controlled UAC observations",
        evidence: "identity source, SID where appropriate, groups, integrity or elevation context and permitted action",
        risk: "administrator membership does not mean every process is elevated, and shared privilege weakens accountability",
        control: "use standard accounts for routine work and elevate only an approved administrative task"
    },
    "module-04": {
        focus: "map processes, parent relationships, services, startup context and scheduled tasks",
        command: "Use Task Manager, Get-Process, Get-Service, sc.exe and Task Scheduler read-only views",
        evidence: "name, PID, parent or service, account, path, start mode, state, trigger and timestamp",
        risk: "unexpected execution paths, privileged service accounts or weak task configuration can expand attack surface",
        control: "compare observed execution with documented host purpose before changing or stopping anything"
    },
    "module-05": {
        focus: "understand Registry hives, keys, values, views and configuration provenance",
        command: "Use Registry Editor or Get-ItemProperty in read-only mode and export only approved sample keys",
        evidence: "hive, full key path, value name, type, data, source context and timestamp",
        risk: "incorrect Registry edits can impair startup, security controls or application behavior",
        control: "record and export the original controlled key, change only with approval and verify rollback"
    },
    "module-06": {
        focus: "use PowerShell objects and pipelines for transparent, read-only Windows inspection",
        command: "Use Get-Help, Get-Command, Get-Member, Select-Object, Where-Object and Export-Csv on approved data",
        evidence: "PowerShell version, exact command, object properties, output, errors and export path",
        risk: "string-based assumptions, unsafe downloads or unvalidated input can turn administration into code-execution risk",
        control: "prefer native cmdlets, validate input, avoid secrets and review scripts before execution"
    },
    "module-07": {
        focus: "document interfaces, addresses, routes, DNS, listeners, SMB shares and Windows Firewall profiles",
        command: "Use ipconfig, Get-NetIPConfiguration, Get-NetTCPConnection, Get-SmbShare and Get-NetFirewallProfile",
        evidence: "interface, address, route, resolver, listener, owning process, share permissions and firewall profile",
        risk: "unnecessary listeners, broad SMB access or incorrect firewall profiles increase exposure",
        control: "permit only required services on the correct profile and validate access from an approved test point"
    },
    "module-08": {
        focus: "understand Microsoft Defender Antivirus, Windows Security, updates and modern platform protections",
        command: "Use Windows Security, Get-MpComputerStatus and Windows Update history without disabling controls",
        evidence: "protection state, engine and signature status, scan state, exclusions, update status and timestamp",
        risk: "disabled, outdated or broadly excluded protection reduces prevention and detection coverage",
        control: "maintain supported updates and security controls, then investigate rather than bypass warnings"
    },
    "module-09": {
        focus: "build a basic Windows investigation timeline from relevant channels and event fields",
        command: "Use Event Viewer and Get-WinEvent with narrow log, ID and time filters",
        evidence: "channel, provider, event ID, record ID, time, computer, account or process context and message",
        risk: "a single event without surrounding context can be misinterpreted and logs may contain sensitive data",
        control: "correlate multiple events and host observations while preserving timestamps and provenance"
    },
    "module-10": {
        focus: "compare a workstation with a documented secure baseline and prioritize proportionate improvements",
        command: "Use Microsoft baseline guidance, local policy views and read-only configuration evidence",
        evidence: "host purpose, current setting, baseline recommendation, deviation, impact, owner and verification plan",
        risk: "blind hardening can break required business functions while weak defaults can leave unnecessary exposure",
        control: "test approved baseline changes with backup, rollback and post-change functional verification"
    },
    "module-11": {
        focus: "perform and communicate a complete Windows workstation security review",
        command: "Use a repeatable read-only checklist spanning identity, NTFS, execution, Registry, network, Defender, updates and logs",
        evidence: "scope, system baseline, commands, findings, limitations, prioritized improvements and cleanup status",
        risk: "unsupported conclusions or untracked changes make an assessment unreliable and unsafe",
        control: "separate observation from risk, verify recommendations and produce a reproducible report"
    }
};

function buildWindowsQuestionBank(moduleId, moduleTitle) {
    const item = windowsModuleBlueprints[moduleId];
    return [
        windowsQuestion(`What is the main objective for ${moduleTitle}?`, item.focus, "Memorize one command", "Disable security features", "Use administrator access for every task"),
        windowsQuestion(`Which method is appropriate for ${moduleTitle}?`, item.command, "Change settings before inspection", "Use an untrusted script", "Delete the original evidence"),
        windowsQuestion(`Which evidence best supports ${moduleTitle}?`, item.evidence, "An unlabeled screenshot", "Only a command name", "A conclusion without timestamp or context"),
        windowsQuestion(`Which risk matters most in ${moduleTitle}?`, item.risk, "The desktop wallpaper", "The terminal font", "The filename length"),
        windowsQuestion(`Which control best strengthens ${moduleTitle}?`, item.control, "Disable logging", "Share administrator credentials", "Apply every setting without testing")
    ];
}

export const windowsFundamentals = {
    id: "windows-fundamentals",
    title: "Windows Fundamentals for Cybersecurity",
    overviewTitle: "Understand Windows Before Defending or Assessing It",
    category: "CWS ACADEMY • WINDOWS FUNDAMENTALS",
    level: "Beginner",
    levelKey: "beginner",
    status: "available",
    access: "free",
    icon: "fa-brands fa-windows",
    description: "Build practical Windows cybersecurity foundations through users, groups, NTFS, processes, services, Registry, PowerShell, networking, Defender, firewall and event logs.",
    longDescription: "Windows Fundamentals for Cybersecurity teaches the operating-system knowledge students need before Active Directory and advanced security testing. Every major topic follows the CWS learning standard: what it is, why it exists, how it works, cybersecurity relevance, practical examples, hands-on inspection and assessment.",
    duration: "55–70 Hours",
    estimatedLessons: 33,
    certificateEligible: true,
    learningStandard: "What • Why • How • Examples • Security Context • Labs • Assessment",
    prerequisites: ["Cybersecurity Fundamentals"],
    recommendedPrerequisites: ["Networking Fundamentals"],
    skills: [
        "Windows system and security context",
        "NTFS ownership, permissions and inheritance",
        "Local and domain identity concepts",
        "UAC, tokens and least privilege",
        "Processes, services and scheduled tasks",
        "Registry inspection and change safety",
        "PowerShell objects and pipelines",
        "Windows networking, SMB and firewall profiles",
        "Microsoft Defender and update posture",
        "Event Viewer and investigation timelines",
        "Windows baseline review and hardening"
    ],
    tools: [
        "Windows 10 or Windows 11 training VM",
        "System Information",
        "Task Manager and Computer Management",
        "icacls",
        "whoami",
        "PowerShell",
        "Get-NetIPConfiguration and Get-NetTCPConnection",
        "Windows Defender cmdlets",
        "Event Viewer and Get-WinEvent",
        "Microsoft Windows security baseline guidance"
    ],
    assessmentStandard: "Assessments require accurate Windows reasoning, read-only baselines, before-and-after evidence for approved changes, independent verification and safe rollback or cleanup.",
    standardReferences: [
        {
            title: "Windows security documentation",
            organization: "Microsoft",
            url: "https://learn.microsoft.com/en-us/windows/security/"
        },
        {
            title: "Windows security baselines guide",
            organization: "Microsoft",
            url: "https://learn.microsoft.com/en-us/windows/security/operating-system-security/device-management/windows-security-configuration-framework/windows-security-baselines"
        },
        {
            title: "PowerShell security features",
            organization: "Microsoft",
            url: "https://learn.microsoft.com/en-us/powershell/scripting/security/security-features"
        },
        {
            title: "MITRE ATT&CK Enterprise — Windows",
            organization: "MITRE",
            url: "https://attack.mitre.org/matrices/enterprise/windows/"
        }
    ],
    completionRules: {
        minimumLessonCompletion: 100,
        minimumModuleAssessmentScore: 75,
        finalAssessmentPassingScore: 80,
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
        resumeLastLesson: true
    },
    objectives: [
        "Explain core Windows architecture and system information.",
        "Navigate the Windows filesystem and understand NTFS permissions.",
        "Differentiate local users, groups, UAC and domain identities.",
        "Inspect processes, services and scheduled tasks.",
        "Understand Registry structure and safe investigation.",
        "Use PowerShell for legitimate administration and inspection.",
        "Understand Windows networking, SMB and firewall profiles.",
        "Explain Microsoft Defender and Windows security controls.",
        "Read Windows Event Viewer and basic Security log evidence.",
        "Perform a structured Windows workstation security review."
    ],
    modules: [
        {
            id: "module-01",
            number: 1,
            title: "Windows Foundations",
            description: "Build practical understanding of windows foundations and its cybersecurity relevance.",
            access: "free",
            labs: 1,
            assessments: 1,
            lessons: [
                buildLesson("lesson-01", "Windows in Cybersecurity", "Microsoft Windows is a desktop and server operating-system family widely used in enterprise environments.", "Security analysts need to understand the platform they are defending or assessing.", "Connect Windows editions, hosts, users, applications and security controls to a typical organization."),
                buildLesson("lesson-02", "Windows Architecture Overview", "Windows separates user-facing applications, services and lower-level operating-system components.", "Architecture explains where processes, services, drivers and security controls operate.", "Learn the high-level relationship between user mode, kernel mode, services and system resources."),
                buildLesson("lesson-03", "Windows Editions and System Information", "Windows editions and builds identify the operating environment and available features.", "Accurate system identification is essential for administration, troubleshooting and security analysis.", "Use built-in system information to identify edition, build, architecture, hostname and hardware context."),
            ],
            labActivities: [buildLab("lab-01", "Windows Foundations Practical Lab", "Windows Foundations")],
            moduleAssessment: buildAssessment("Module 1 Assessment — Windows Foundations")
        },
        {
            id: "module-02",
            number: 2,
            title: "Files, Directories and NTFS",
            description: "Build practical understanding of files, directories and ntfs and its cybersecurity relevance.",
            access: "free",
            labs: 1,
            assessments: 1,
            lessons: [
                buildLesson("lesson-01", "Windows Filesystem Structure", "Windows organizes system, program and user data into predictable filesystem locations.", "Knowing standard paths helps distinguish normal files from unusual ones.", "Explore Windows, Program Files, ProgramData and user-profile directories."),
                buildLesson("lesson-02", "NTFS Permissions", "NTFS permissions control which identities can read, write, modify or control files and folders.", "Poor permissions can expose sensitive information or create privilege problems.", "Understand allow/deny entries, inheritance and effective access through practical examples."),
                buildLesson("lesson-03", "Ownership and Inheritance", "Windows objects have owners and can inherit permissions from parent objects.", "Ownership and inheritance explain why effective access may differ from what a student initially expects.", "Trace a folder's owner, inherited entries and explicitly assigned permissions."),
            ],
            labActivities: [buildLab("lab-01", "Files, Directories and NTFS Practical Lab", "Files, Directories and NTFS")],
            moduleAssessment: buildAssessment("Module 2 Assessment — Files, Directories and NTFS")
        },
        {
            id: "module-03",
            number: 3,
            title: "Users, Groups and Access Control",
            description: "Build practical understanding of users, groups and access control and its cybersecurity relevance.",
            access: "free",
            labs: 1,
            assessments: 1,
            lessons: [
                buildLesson("lesson-01", "Local Users and Groups", "Windows supports local identities and groups for authentication and authorization on a computer.", "Local account configuration affects who can sign in and what they can do.", "Identify local users, built-in groups and the difference between standard and administrative accounts."),
                buildLesson("lesson-02", "User Account Control", "UAC separates normal user activity from administrative elevation.", "It reduces unnecessary use of elevated privileges and creates an explicit elevation boundary.", "Understand standard tokens, elevation prompts and why an administrator account is not always running every process elevated."),
                buildLesson("lesson-03", "Local vs Domain Accounts", "Local accounts belong to one computer while domain accounts are centrally managed through Active Directory.", "The distinction becomes essential before students progress into Active Directory.", "Compare identity scope, sign-in format and centralized versus local administration."),
            ],
            labActivities: [buildLab("lab-01", "Users, Groups and Access Control Practical Lab", "Users, Groups and Access Control")],
            moduleAssessment: buildAssessment("Module 3 Assessment — Users, Groups and Access Control")
        },
        {
            id: "module-04",
            number: 4,
            title: "Processes, Services and Tasks",
            description: "Build practical understanding of processes, services and tasks and its cybersecurity relevance.",
            access: "free",
            labs: 1,
            assessments: 1,
            lessons: [
                buildLesson("lesson-01", "Windows Processes", "A process is a running instance of a program with an identity, resources and permissions.", "Process context helps analysts understand what is executing and under which account.", "Use Task Manager or built-in commands to inspect process name, PID and user context."),
                buildLesson("lesson-02", "Windows Services", "Services are background components commonly used for operating-system and application functions.", "Services may run with powerful identities and are important to administration and security.", "Identify service status, startup behavior, account context and executable path."),
                buildLesson("lesson-03", "Scheduled Tasks", "Task Scheduler runs programs or actions based on triggers and conditions.", "Scheduled automation is common in administration and can also become security-relevant when poorly configured.", "Inspect task triggers, actions and execution identity without modifying production tasks."),
            ],
            labActivities: [buildLab("lab-01", "Processes, Services and Tasks Practical Lab", "Processes, Services and Tasks")],
            moduleAssessment: buildAssessment("Module 4 Assessment — Processes, Services and Tasks")
        },
        {
            id: "module-05",
            number: 5,
            title: "Registry and Windows Configuration",
            description: "Build practical understanding of registry and windows configuration and its cybersecurity relevance.",
            access: "free",
            labs: 1,
            assessments: 1,
            lessons: [
                buildLesson("lesson-01", "Windows Registry Fundamentals", "The Registry is a hierarchical configuration database used by Windows and applications.", "Many system, application and security settings are represented in Registry keys and values.", "Learn hives, keys, values and safe read-only inspection."),
                buildLesson("lesson-02", "Important Registry Hives", "Major hives organize machine-wide, user-specific and other configuration data.", "Recognizing hive purpose makes Registry evidence easier to interpret.", "Differentiate HKLM, HKCU and other commonly encountered hives."),
                buildLesson("lesson-03", "Safe Registry Investigation", "Registry changes can affect system stability, so investigation should begin read-only.", "Security students need evidence skills without treating configuration changes casually.", "Use Registry Editor or command-line queries to inspect known lab keys and record findings."),
            ],
            labActivities: [buildLab("lab-01", "Registry and Windows Configuration Practical Lab", "Registry and Windows Configuration")],
            moduleAssessment: buildAssessment("Module 5 Assessment — Registry and Windows Configuration")
        },
        {
            id: "module-06",
            number: 6,
            title: "PowerShell Fundamentals",
            description: "Build practical understanding of powershell fundamentals and its cybersecurity relevance.",
            access: "free",
            labs: 1,
            assessments: 1,
            lessons: [
                buildLesson("lesson-01", "What Is PowerShell?", "PowerShell is Microsoft's command shell and automation environment built around structured objects.", "It is central to modern Windows administration and security workflows.", "Understand cmdlets, objects and the verb-noun command naming model."),
                buildLesson("lesson-02", "PowerShell Pipeline and Objects", "PowerShell passes structured objects through pipelines rather than relying only on plain text.", "Object pipelines make filtering and automation more reliable.", "Practice Get-Process, Where-Object and Select-Object using local system data."),
                buildLesson("lesson-03", "PowerShell Security Practices", "PowerShell is a powerful administrative tool whose use should be logged and controlled.", "Students should learn legitimate administration and defensive visibility before advanced security automation.", "Use help, readable scripts, least privilege and appropriate logging in training environments."),
            ],
            labActivities: [buildLab("lab-01", "PowerShell Fundamentals Practical Lab", "PowerShell Fundamentals")],
            moduleAssessment: buildAssessment("Module 6 Assessment — PowerShell Fundamentals")
        },
        {
            id: "module-07",
            number: 7,
            title: "Windows Networking and SMB",
            description: "Build practical understanding of windows networking and smb and its cybersecurity relevance.",
            access: "free",
            labs: 1,
            assessments: 1,
            lessons: [
                buildLesson("lesson-01", "Windows Network Configuration", "Windows maintains IP, DNS, gateway and interface configuration like other networked operating systems.", "Students need to connect Networking Fundamentals to real Windows hosts.", "Inspect IP configuration, routes and DNS settings with built-in tools."),
                buildLesson("lesson-02", "SMB and Windows File Sharing", "SMB provides file, printer and related resource sharing in Windows environments.", "SMB is fundamental to enterprise Windows networks and later Active Directory security topics.", "Understand shares, UNC paths, authentication and share versus NTFS permissions."),
                buildLesson("lesson-03", "Windows Firewall", "Windows Defender Firewall controls network traffic according to profiles and rules.", "Host firewalls reduce unnecessary network exposure and are a core defensive control.", "Understand Domain, Private and Public profiles and inspect rules without weakening protections."),
            ],
            labActivities: [buildLab("lab-01", "Windows Networking and SMB Practical Lab", "Windows Networking and SMB")],
            moduleAssessment: buildAssessment("Module 7 Assessment — Windows Networking and SMB")
        },
        {
            id: "module-08",
            number: 8,
            title: "Windows Security and Microsoft Defender",
            description: "Build practical understanding of windows security and microsoft defender and its cybersecurity relevance.",
            access: "free",
            labs: 1,
            assessments: 1,
            lessons: [
                buildLesson("lesson-01", "Microsoft Defender Antivirus", "Microsoft Defender Antivirus provides built-in antimalware protection on modern Windows systems.", "Endpoint protection is a major layer of Windows security.", "Understand real-time protection, signatures, scans and the role of centralized management."),
                buildLesson("lesson-02", "Windows Security Controls", "Windows combines antivirus, firewall, account protection and other security features.", "Defense depends on multiple controls rather than one product.", "Map common Windows Security areas to the threats they help reduce."),
                buildLesson("lesson-03", "Updates and Patch Management", "Windows Update delivers security and reliability fixes.", "Unpatched systems may remain exposed to known vulnerabilities.", "Understand update status, restart requirements and why patch management must be controlled in organizations."),
            ],
            labActivities: [buildLab("lab-01", "Windows Security and Microsoft Defender Practical Lab", "Windows Security and Microsoft Defender")],
            moduleAssessment: buildAssessment("Module 8 Assessment — Windows Security and Microsoft Defender")
        },
        {
            id: "module-09",
            number: 9,
            title: "Event Viewer and Security Logs",
            description: "Build practical understanding of event viewer and security logs and its cybersecurity relevance.",
            access: "free",
            labs: 1,
            assessments: 1,
            lessons: [
                buildLesson("lesson-01", "Windows Event Logging", "Windows records operating-system, application and security activity in event logs.", "Logs provide evidence for troubleshooting, auditing and incident investigation.", "Understand log channels, event records, timestamps, providers and event IDs."),
                buildLesson("lesson-02", "Security Log Fundamentals", "The Security log records audited security events such as authentication and account activity when configured.", "Students need this foundation before studying detection and Active Directory events.", "Inspect authorized sample events and distinguish event ID, account, computer and timestamp fields."),
                buildLesson("lesson-03", "Building a Basic Investigation Timeline", "A timeline organizes related events chronologically.", "Security incidents are easier to understand when evidence from multiple events is correlated.", "Filter a small lab dataset, record relevant timestamps and describe the sequence without over-interpreting it."),
            ],
            labActivities: [buildLab("lab-01", "Event Viewer and Security Logs Practical Lab", "Event Viewer and Security Logs")],
            moduleAssessment: buildAssessment("Module 9 Assessment — Event Viewer and Security Logs")
        },
        {
            id: "module-10",
            number: 10,
            title: "Windows Administration and Hardening",
            description: "Build practical understanding of windows administration and hardening and its cybersecurity relevance.",
            access: "free",
            labs: 1,
            assessments: 1,
            lessons: [
                buildLesson("lesson-01", "Least Privilege on Windows", "Users and services should receive only the access required for their responsibilities.", "Excessive administrative access increases security impact when an account is compromised.", "Review account roles, group membership and administrative necessity."),
                buildLesson("lesson-02", "Secure Windows Baselines", "A baseline defines expected secure configuration for systems of a particular role.", "Consistent configuration makes drift and weak settings easier to identify.", "Understand baseline concepts for accounts, firewall, updates, logging and unnecessary services."),
                buildLesson("lesson-03", "Backup, Recovery and System Protection", "Recovery controls help organizations restore systems and data after failure or security incidents.", "Resilience is part of security, not only prevention.", "Understand backups, restore concepts and why recovery procedures must be tested."),
            ],
            labActivities: [buildLab("lab-01", "Windows Administration and Hardening Practical Lab", "Windows Administration and Hardening")],
            moduleAssessment: buildAssessment("Module 10 Assessment — Windows Administration and Hardening")
        },
        {
            id: "module-11",
            number: 11,
            title: "Windows Security Capstone",
            description: "Build practical understanding of windows security capstone and its cybersecurity relevance.",
            access: "free",
            labs: 1,
            assessments: 1,
            lessons: [
                buildLesson("lesson-01", "Capstone Workstation Assessment Plan", "A structured checklist keeps a Windows review consistent and evidence-driven.", "The capstone should combine concepts instead of testing isolated memorization.", "Plan identity, filesystem, processes, services, networking, security controls and logging checks."),
                buildLesson("lesson-02", "Perform a Windows Security Review", "A basic security review compares observed configuration with expected security practices.", "Students demonstrate that they can turn Windows knowledge into a repeatable workflow.", "Inspect an isolated Windows VM using read-only tools and record observations."),
                buildLesson("lesson-03", "Write a Windows Security Summary", "A professional summary distinguishes observations, risks and recommendations.", "Clear communication is a core cybersecurity skill.", "Write a short asset summary, evidence table, key observations and prioritized improvements."),
            ],
            labActivities: [buildLab("lab-01", "Windows Security Capstone Practical Lab", "Windows Security Capstone")],
            moduleAssessment: buildAssessment("Module 11 Assessment — Windows Security Capstone")
        },
    ],

    finalAssessment: {
        title: "CWS Windows Fundamentals for Cybersecurity Final Assessment",
        description: "Demonstrate foundational understanding of Windows identity, permissions, configuration, administration, networking and security evidence.",
        passingScore: 75,
        allowRetry: true,
        required: true,
        questions: [
            {question:"What is the purpose of an operating system?",options:["Manage hardware, applications, users and system resources","Only browse the web","Only store passwords","Only provide networking"],answer:0},
            {question:"Why does Windows architecture matter in cybersecurity?",options:["It helps explain where applications, services and security controls operate","It replaces networking","It disables malware","It only matters to developers"],answer:0},
            {question:"What does NTFS provide?",options:["Filesystem features including permissions and ownership","Only DNS","Only antivirus","Only user passwords"],answer:0},
            {question:"Why does permission inheritance matter?",options:["Child objects can receive permissions from parent objects","It disables permissions","It only affects networks","It creates domain accounts"],answer:0},
            {question:"What is a local account?",options:["An account managed by an individual Windows computer","An account that always belongs to Active Directory","A Microsoft Defender rule","A DNS record"],answer:0},
            {question:"What is UAC designed to support?",options:["Controlled administrative elevation","Automatic Domain Admin access","Firewall removal","Password sharing"],answer:0},
            {question:"What is a Windows process?",options:["A running instance of a program","A user group","A firewall profile","A Registry hive"],answer:0},
            {question:"What is a Windows service?",options:["A background component commonly used by Windows or applications","Only a desktop shortcut","A file permission","A DNS query"],answer:0},
            {question:"Why inspect scheduled tasks?",options:["They can automatically execute actions under defined identities and triggers","They only change wallpapers","They disable processes","They are unrelated to security"],answer:0},
            {question:"What is the Windows Registry?",options:["A hierarchical configuration database","A network protocol","An antivirus engine","A filesystem"],answer:0},
            {question:"What does HKLM generally contain?",options:["Machine-wide configuration","Only the current user's files","DNS packets","Browser history only"],answer:0},
            {question:"What is PowerShell?",options:["A command shell and automation environment built around structured objects","Only a text editor","A firewall","A hypervisor"],answer:0},
            {question:"What is useful about the PowerShell pipeline?",options:["It passes structured objects between commands","It disables logging","It only processes images","It grants administrator rights"],answer:0},
            {question:"What information does Windows IP configuration provide?",options:["Interface, address, gateway and DNS information","Only passwords","Only process IDs","Only Registry values"],answer:0},
            {question:"What is SMB commonly used for?",options:["Sharing files and related resources","Only web browsing","Only antivirus updates","Only PowerShell execution"],answer:0},
            {question:"What do Windows Firewall profiles represent?",options:["Different network contexts such as Domain, Private and Public","Different user passwords","Different filesystems","Different Registry hives"],answer:0},
            {question:"What is Microsoft Defender Antivirus?",options:["Built-in antimalware protection on modern Windows","A domain controller","A shell","A filesystem"],answer:0},
            {question:"Why are Windows updates security-relevant?",options:["They can remediate known vulnerabilities","They remove all logs","They replace permissions","They create users"],answer:0},
            {question:"What is Windows Event Viewer used for?",options:["Viewing recorded system, application and security events","Editing NTFS permissions only","Creating DNS records","Installing hardware only"],answer:0},
            {question:"What best demonstrates Windows fundamentals competence?",options:["Explaining normal Windows behavior, inspecting it safely and interpreting security-relevant evidence","Memorizing commands only","Disabling security controls","Skipping foundational concepts"],answer:0}
        ]
    }
};

/* =========================================================
   CWS COURSE STANDARDIZATION
========================================================= */

function applyWindowsFundamentalsStandard(course) {

    course.modules.forEach(module => {

        module.learningOutcomes = [
            `Explain the essential ${module.title} concepts and dependencies.`,
            "Inspect the relevant Windows state with built-in, read-only tools.",
            "Interpret identity, permission, configuration or event evidence accurately.",
            "Recommend a proportionate improvement with verification and rollback guidance."
        ];

        module.labActivities = (module.labActivities || []).map(activity => ({
            ...activity,
            access: "free",
            required: true,
            prerequisites: [
                "Completed lessons in this module",
                "Owned or explicitly authorized Windows training VM",
                "VM snapshot or tested recovery option",
                "Standard user account and approved elevation method",
                "Dedicated folder for sanitized evidence"
            ],
            evidence: [
                ...(activity.evidence || []),
                "Windows edition, build, hostname, current identity and timestamp",
                "Expected state before inspection",
                "Exact built-in tool, command or interface path",
                "Relevant output or configuration with learner interpretation",
                "Independent verification of the conclusion",
                "Approved change, rollback and cleanup status where applicable"
            ],
            successCriteria:
                "The learner identifies the correct Windows state, explains what the evidence proves, avoids unapproved changes and provides a verifiable next step or improvement.",
            reflection: [
                "Which Windows identity, permission or service context affected the result?",
                "What evidence distinguishes the observation from an assumption?",
                "What should be tested before applying the recommendation beyond the lab?"
            ],
            cleanup: [
                "Remove disposable users, groups, files, shares, tasks or settings created only for the lab.",
                "Restore the documented baseline or VM snapshot when required.",
                "Confirm temporary PowerShell sessions, exports and test processes are closed.",
                "Retain only sanitized evidence without credentials, tokens or unnecessary personal data."
            ],
            safety:
                "Use only an owned or explicitly authorized Windows training VM. Record the original state, prefer read-only inspection, use least privilege and never disable protections or edit critical Registry, service or boot settings without a recovery-tested exercise.",
            rubric: {
                windowsAccuracy: 25,
                safeMethodAndLeastPrivilege: 20,
                evidenceAndVerification: 25,
                securityInterpretation: 15,
                recoveryAndCleanup: 10,
                documentation: 5
            }
        }));

        module.labs = module.labActivities.length;
        module.assessments = 1;

        const moduleQuestions = buildWindowsQuestionBank(
            module.id,
            module.title
        );

        module.moduleAssessment = {
            title: `${module.title} — Verified Module Assessment`,
            type: "Module Assessment",
            passingScore: 75,
            allowRetry: true,
            showResults: true,
            required: true,
            questionCount: moduleQuestions.length,
            questions: balanceAnswerPositions(moduleQuestions, module.number - 1)
        };

        module.lessons.forEach((item, lessonIndex) => {

            item.performanceObjectives = [
                `Explain ${item.title} accurately in Windows security context.`,
                "Predict which built-in view or command should expose the relevant state.",
                "Inspect the authorized VM without unnecessary elevation or configuration change.",
                "Verify the conclusion and identify one proportionate defensive next step."
            ];

            item.evidenceStandard = [
                "Windows edition, build, hostname, identity and timestamp",
                "Exact interface path or built-in command",
                "Relevant output, event or configuration field",
                "Learner interpretation and independent verification",
                "Before-and-after plus rollback status for any approved change",
                "Redaction of credentials, personal data and unnecessary identifiers"
            ];

            item.completionCriteria = [
                "The learner explains the Windows concept instead of only memorizing a command.",
                "The learner recognizes when elevation or configuration change is unnecessary.",
                "The three-question lesson assessment is passed.",
                "Associated lab evidence meets the success criteria."
            ];

            item.quiz = balanceAnswerPositions([
                windowsQuestion(`What best demonstrates understanding of ${item.title}?`, "A correct explanation supported by scoped Windows evidence and independent verification", "A copied command without context", "An administrator session for every task", "A screenshot without system identity"),
                windowsQuestion(`An observation involving ${item.title} is unexpected. What should happen first?`, "Preserve the evidence, confirm identity and system context, then use a second read-only check", "Change multiple settings", "Disable Microsoft Defender", "Delete the event log"),
                windowsQuestion(`Which safety rule applies while practising ${item.title}?`, "Use an authorized VM, record the original state, prefer least privilege and maintain a recovery path", "Test a work computer without permission", "Remove the snapshot", "Suppress all errors")
            ], module.number + lessonIndex);

        });

    });

    const integrativeScenarios = [
        windowsQuestion("A command prompt shows an administrator group membership, but an administrative action is denied. What should be checked?", "The current token, integrity level and whether UAC elevation was approved", "The desktop background", "DNS cache only", "The filename extension"),
        windowsQuestion("A user inherits Modify permission from a parent folder but should have read-only access. What is the strongest investigation step?", "Trace effective access, inheritance source and group membership before changing the ACL", "Add a deny entry immediately", "Take ownership as administrator", "Disable inheritance everywhere"),
        windowsQuestion("A service is running from an unexpected writable directory. What should the learner do?", "Record path, account, permissions and service configuration, assess risk and avoid changing a critical service without approval", "Replace the binary", "Stop every service", "Delete the directory"),
        windowsQuestion("A Registry value appears suspicious. What makes the conclusion credible?", "Full path, value type and data, related process or feature, timestamp and corroborating evidence", "The key name alone", "A web search only", "Changing the value"),
        windowsQuestion("A PowerShell pipeline displays truncated properties. What should happen?", "Inspect the underlying objects and select the required properties explicitly", "Assume the hidden values", "Convert everything to plain text", "Run as SYSTEM"),
        windowsQuestion("A workstation is on the Public firewall profile but file sharing is reachable. What should be reviewed?", "Active profile, enabled rules, scope, listener, share permissions and authorized network path", "Only the share name", "Only the IP address", "The Registry editor theme"),
        windowsQuestion("Microsoft Defender reports current signatures but real-time protection is disabled. What is the correct assessment?", "Signature currency does not replace active protection; document the disabled control and approved remediation path", "The host is fully protected", "Delete the alert", "Disable updates"),
        windowsQuestion("One failed-logon event appears in the Security log. What is the strongest response?", "Correlate surrounding events, account, source, logon type, time and normal activity before concluding", "Report compromise", "Delete the event", "Disable auditing"),
        windowsQuestion("A baseline recommends disabling a service required by the lab's business function. What should happen?", "Document the dependency and choose a tested compensating or scoped control rather than applying the baseline blindly", "Disable it immediately", "Ignore all baselines", "Remove logging"),
        windowsQuestion("What makes the Windows capstone portfolio credible?", "Repeatable read-only evidence, accurate interpretation, prioritized improvements, rollback guidance and honest limitations", "The most screenshots", "Administrator access", "Disabled security controls")
    ];

    const finalQuestions = [
        ...course.finalAssessment.questions,
        ...integrativeScenarios
    ];

    course.finalAssessment = {
        ...course.finalAssessment,
        description:
            "A scenario-based assessment covering Windows architecture, NTFS, identities, UAC, execution, Registry, PowerShell, networking, Defender, event logs, baselines and safe administration.",
        duration: "65–80 minutes",
        passingScore: 80,
        allowRetry: true,
        required: true,
        questionCount: finalQuestions.length,
        questions: balanceAnswerPositions(finalQuestions)
    };

    course.capstone = {
        title: "Windows Workstation Security Baseline Portfolio",
        required: true,
        estimatedTime: "8–10 hours",
        scenario:
            "Review an authorized Windows training workstation, document its normal administrative and security state and produce a prioritized improvement plan without disabling security controls or making unapproved changes.",
        deliverables: [
            "System purpose, edition, build, architecture, identity and recovery notes",
            "Filesystem, ownership, NTFS and inheritance review",
            "Local users, groups, UAC and privilege-context review",
            "Process, service and scheduled-task baseline",
            "Selected read-only Registry configuration evidence",
            "PowerShell evidence-collection script using native cmdlets",
            "Interface, route, DNS, listener, SMB and firewall-profile baseline",
            "Microsoft Defender, update and Windows Security posture",
            "Event Viewer investigation timeline for a controlled scenario",
            "Comparison with relevant Microsoft security baseline guidance",
            "Five prioritized improvements with impact, owner, verification and rollback",
            "Sanitized report, limitations and cleanup confirmation"
        ],
        rubric: {
            windowsAndIdentityAccuracy: 20,
            permissionsAndExecutionReview: 15,
            networkAndSecurityControls: 15,
            loggingAndInvestigation: 15,
            evidenceAndVerification: 15,
            hardeningAndRecoveryPlan: 15,
            documentationAndSafety: 5
        }
    };

    course.qualityVersion = "CWS-COURSE-STANDARD-2026.2";
}

applyWindowsFundamentalsStandard(windowsFundamentals);
