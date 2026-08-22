/* =========================================================
   CWS ACADEMY
   LINUX PRIVILEGE ESCALATION
   PRO • INTERMEDIATE
========================================================= */

function lesson(id, title, what, why, how) {
    return {
        id,
        title,
        duration: "55 minutes",
        access: "pro",
        type: "Lesson",
        icon: "fa-solid fa-terminal",
        subtitle: `Analyze ${title} in an authorized Linux lab.`,
        objectives: [
            `Explain ${title} in your own words.`,
            `Identify where ${title} appears on Linux.`,
            `Describe why ${title} can create privilege risk.`,
            `Validate the condition safely in an isolated lab.`,
            `Recommend a defensive fix.`
        ],
        introduction: `<h2>${title}</h2><p><strong>What:</strong> ${what}</p><p><strong>Why:</strong> ${why}</p>`,
        body: `
            <h2>How It Works</h2><p>${how}</p>
            <h2>Privilege-Escalation Reasoning</h2>
            <p>Start with the current identity and effective privilege. Map trusted execution paths, permissions, services, scheduled tasks, credentials and system configuration before attempting any escalation.</p>
            <h2>Common Mistakes</h2>
            <ul>
                <li>Running escalation tools before understanding the current user and groups.</li>
                <li>Ignoring effective permissions and ownership.</li>
                <li>Assuming a writable file automatically creates elevated execution.</li>
                <li>Trying kernel exploitation before lower-risk configuration paths.</li>
                <li>Failing to document why the path works.</li>
            </ul>
            <h2>Safe Validation</h2>
            <ol>
                <li>Confirm the target is an authorized isolated lab host.</li>
                <li>Collect read-only evidence first.</li>
                <li>Identify the exact privilege boundary.</li>
                <li>Use the minimum validation action required.</li>
                <li>Capture evidence and remediation guidance.</li>
            </ol>
        `,
        keyConcepts: [
            {title, description: what},
            {title: "Effective Privilege", description: "The permissions the current process or identity can actually exercise."},
            {title: "Trusted Execution", description: "A command, service, task or binary that executes with elevated rights."},
            {title: "Privilege Path", description: "A sequence of permissions or configuration weaknesses leading to higher privilege."}
        ],
        quiz: balanceAnswerPositions([
            {question:`What should drive analysis of ${title}?`,options:["Current identity, permissions and evidence","Random exploit choice","Maximum impact","Guessing"],answer:0},
            {question:"What is the safest escalation workflow?",options:["Enumerate first, understand the path, then validate minimally","Run kernel exploits first","Modify system files immediately","Ignore current privileges"],answer:0},
            {question:"What makes an escalation finding useful?",options:["Clear evidence of the privilege path and remediation","Only a root shell screenshot","Only a tool name","Only a CVE"],answer:0}
        ])
    };
}

function lab(id, title, moduleTitle) {
    return {
        id,
        title,
        type: "Hands-On Lab",
        duration: "90–150 minutes",
        objective: `Apply ${moduleTitle} in an isolated Linux privilege-escalation training environment.`,
        scenario: "You have authorized low-privilege access to an intentionally misconfigured Linux training VM.",
        prerequisites: ["Isolated Linux training VM","Non-root training account","VM snapshot","Written lab scope"],
        instructions: [
            "Confirm the lab host and current identity.",
            `Apply the ${moduleTitle} workflow.`,
            "Collect read-only evidence first.",
            "Identify one intentionally vulnerable privilege path.",
            "Validate only the minimum required action.",
            "Capture evidence.",
            "Write one remediation recommendation."
        ],
        evidence: ["Current identity evidence","Misconfiguration evidence","Validation proof","Remediation note"],
        reflection: ["Which trust boundary failed?","Why did the account gain more privilege?","How could the administrator remove this path?"],
        safety: "Use only isolated lab systems or environments where you have explicit authorization."
    };
}

function assessment(title) {
    return {
        title,
        type: "Module Assessment",
        passingScore: 75,
        allowRetry: true,
        showResults: true,
        questions: [
            {question:"What should happen before privilege escalation validation?",options:["Enumerate identity, groups, permissions and trusted execution paths","Run random exploits","Delete files","Disable logging"],answer:0},
            {question:"Why is sudo configuration security-sensitive?",options:["It can allow lower-privilege users to execute commands with elevated rights","It only changes DNS","It only affects filenames","It cannot change privilege"],answer:0},
            {question:"What is the preferred validation principle?",options:["Use the minimum action necessary to prove the path","Maximize impact","Modify unrelated configuration","Collect all files"],answer:0},
            {question:"What is a good remediation principle?",options:["Remove unnecessary privilege and unsafe writable trust","Add more root-owned writable scripts","Disable logging","Share root credentials"],answer:0},
            {question:"What makes Linux privilege escalation professional?",options:["Evidence-driven enumeration, minimal validation and clear remediation","Always using kernel exploits","Running the most tools","Ignoring permissions"],answer:0}
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


const linuxPrivilegeQuestionBanks = {
    "module-01": [
        proQuestion("What establishes the starting privilege context?", "Current UID, GID, supplementary groups, effective capabilities and session context", "Kernel version only", "Open ports only", "The hostname only"),
        proQuestion("Why should local enumeration start read-only?", "It builds evidence and reduces unnecessary impact before validating a privilege path", "It guarantees root access", "It disables security controls", "It replaces scope"),
        proQuestion("A process runs as root. What must be established before calling it exploitable?", "A lower-privilege identity can influence a trusted input, file, configuration or execution path", "The process has a PID", "The service listens locally", "The binary is old"),
        proQuestion("Which system information is necessary for vulnerability research?", "Distribution, exact package or kernel build, architecture and relevant configuration", "Only uname output", "Only the desktop version", "Only available disk space"),
        proQuestion("What makes an enumeration record reproducible?", "Timestamped commands, target context, raw output, interpretation and next hypothesis", "A root-shell screenshot", "A tool name", "A list copied from a checklist")
    ],
    "module-02": [
        proQuestion("What does sudo -l reveal?", "Permitted commands, target users, tags and authentication conditions for the current identity", "Every SUID binary", "Kernel vulnerabilities", "Container mounts"),
        proQuestion("Why is an allowed editor or interpreter high risk under sudo?", "It may provide indirect command execution or privileged file modification", "It changes DNS", "It cannot open files", "It removes environment variables"),
        proQuestion("What is the safest sudo rule design?", "Use absolute paths, narrow arguments, least privilege and controlled environment behavior", "Allow all commands with NOPASSWD", "Trust the user's PATH", "Permit arbitrary wildcards"),
        proQuestion("How can PATH affect privileged execution?", "An unqualified command may resolve to an attacker-controlled executable earlier in PATH", "PATH changes file ownership", "PATH disables sudo logging", "PATH affects DNS only"),
        proQuestion("What should a sudo finding prove?", "The exact rule, controlled input and resulting privilege transition with minimum impact", "Only that sudo is installed", "Only a GTFOBins entry", "Only that the user knows a password")
    ],
    "module-03": [
        proQuestion("What does SUID change during execution?", "The effective user identity of the process to the file owner", "The file contents", "The network route", "The current shell history"),
        proQuestion("Why are custom SUID binaries reviewed carefully?", "Their code and trusted inputs may expose unintended privileged behavior", "All custom binaries are malware", "They cannot execute", "They only affect groups"),
        proQuestion("What do Linux file capabilities provide?", "Selected kernel privileges without requiring full root identity", "Filesystem encryption", "DNS delegation", "Package signatures"),
        proQuestion("A binary has cap_setuid. What must be validated?", "Whether an unprivileged user can cause it to change identity in an unintended way", "Only the filename", "Only the file size", "Whether it uses TCP"),
        proQuestion("What is the strongest remediation for unnecessary special privilege?", "Remove the unneeded bit or capability and correct the program's design, ownership and access", "Hide the file", "Disable logging", "Add more users to its group")
    ],
    "module-04": [
        proQuestion("When is a writable file a privilege-escalation path?", "A privileged process later trusts or executes attacker-controlled content from it", "Whenever any user can read it", "Whenever it is under /tmp", "Whenever it contains text"),
        proQuestion("Why does directory writability matter?", "It may allow replacement, renaming or creation of trusted path entries even when a file itself is not writable", "It changes the kernel", "It always grants root", "It disables permissions"),
        proQuestion("What should be checked for a systemd unit path?", "Unit ownership, drop-ins, referenced executables, environment files and writable parent paths", "Only the service name", "Only the PID", "Only the network port"),
        proQuestion("What is a safe validation approach for a root-run writable script in a lab?", "Use an approved benign marker, capture the transition and restore the original state", "Delete the script", "Create persistence", "Modify unrelated services"),
        proQuestion("What remediation addresses writable trusted execution?", "Correct ownership and permissions and eliminate unnecessary privileged trust in writable paths", "Rename the script", "Turn off auditing", "Add sudo access")
    ],
    "module-05": [
        proQuestion("Why are root cron jobs security-sensitive?", "They execute scheduled commands with elevated privilege and may trust writable inputs", "Cron affects DNS only", "Cron never runs scripts", "Cron removes permissions"),
        proQuestion("What should be reviewed in a scheduled command?", "Executable, arguments, PATH, working directory, wildcards, referenced files and ownership", "Only the schedule", "Only the username", "Only standard output"),
        proQuestion("Why can wildcard expansion be dangerous in privileged tasks?", "Attacker-controlled filenames may be interpreted as options or arguments", "Wildcards encrypt files", "Wildcards disable cron", "Wildcards change DNS"),
        proQuestion("What evidence proves a systemd timer relationship?", "Timer definition, triggered service, execution identity, referenced paths and observed controlled run", "Only systemctl list-timers", "Only the unit name", "Only a timestamp"),
        proQuestion("What is the strongest scheduled-task remediation?", "Use absolute commands and safe arguments with protected ownership, environment and working paths", "Run more often", "Hide the schedule", "Disable journal logging")
    ],
    "module-06": [
        proQuestion("What should guide handling of discovered credentials?", "Minimum necessary evidence, scope, secure storage, redaction and agreed notification", "Copy all secrets", "Reuse them broadly", "Publish them in the report"),
        proQuestion("Why are configuration files a common secret source?", "Applications may store credentials, tokens or connection strings for automated access", "Configuration files are always world-writable", "Linux requires plaintext root passwords", "Config files bypass permissions"),
        proQuestion("What is the safe way to demonstrate a readable secret?", "Prove exposure with redacted context and avoid authentication unless separately authorized", "Log into every related service", "Copy the complete file", "Commit the secret to notes"),
        proQuestion("Why review environment and shell history cautiously?", "They can expose sensitive values but also contain unrelated private data", "They always grant root", "They are public by design", "They replace filesystem permissions"),
        proQuestion("What remediation is strongest for an exposed reusable secret?", "Remove exposure, rotate the secret, reduce privilege and use an approved secret mechanism", "Rename the variable", "Delete all logs", "Reuse it in fewer scripts")
    ],
    "module-07": [
        proQuestion("What makes a privileged service locally exploitable?", "A lower-privilege user can control trusted configuration, code, search paths, IPC or inputs", "The service has a network port", "The package is installed", "The process uses memory"),
        proQuestion("Why is version matching alone insufficient for a package vulnerability?", "Backports, build options, configuration and reachable code paths affect applicability", "Versions are never useful", "Every CVE grants root", "Only kernels receive patches"),
        proQuestion("What should be reviewed for custom local software?", "Ownership, permissions, update process, dependencies, execution identity and trusted inputs", "Only its name", "Only its source language", "Only its install date"),
        proQuestion("A service executable is protected but its config directory is writable. What is the concern?", "The service may consume attacker-controlled configuration with elevated privilege", "The executable becomes encrypted", "The service loses its PID", "DNS stops working"),
        proQuestion("What makes a service finding defensible?", "Trace the controllable input to privileged behavior and demonstrate only the approved minimum effect", "A process list", "A package age claim", "A scanner severity")
    ],
    "module-08": [
        proQuestion("Why can Docker-group membership be equivalent to high host privilege?", "Control of the daemon may permit privileged containers or host filesystem access", "Docker changes DNS", "Containers cannot mount paths", "The group only reads logs"),
        proQuestion("What weakens a container isolation boundary?", "Excess capabilities, privileged mode, dangerous sockets or sensitive host mounts", "A small image", "Read-only application files", "A non-root process"),
        proQuestion("What should be verified before testing a container-to-host path?", "Authorization, runtime configuration, mount and capability scope, expected impact and recovery", "Only the container name", "Only the image tag", "Only network reachability"),
        proQuestion("Why are mounted secrets security-sensitive?", "Container processes may read credentials that provide access beyond the intended workload", "Mounts are always encrypted", "Secrets cannot leave containers", "They affect performance only"),
        proQuestion("What is a strong container remediation principle?", "Remove unnecessary daemon access, privilege, capabilities and host mounts and use least-privilege identities", "Add every user to docker", "Use privileged mode", "Mount the host root read-write")
    ],
    "module-09": [
        proQuestion("Why should kernel exploitation be a last-resort validation method?", "It can be unstable and higher impact than configuration-based proof", "Kernel flaws never exist", "It cannot elevate privilege", "It only affects networks"),
        proQuestion("What must be established before kernel exploit research is applicable?", "Exact kernel build, architecture, patch state, configuration, prerequisites and allowed risk", "Only uname -r", "Only the CVE score", "Only the exploit title"),
        proQuestion("What is the safest alternative when kernel proof is too risky?", "Use authoritative applicability evidence and document the unvalidated impact and mitigation", "Run it anyway", "Report successful root access", "Disable monitoring"),
        proQuestion("Which control reduces common local privilege paths most broadly?", "Least privilege with secure ownership, patched software and protected trusted execution", "Shared root access", "World-writable scripts", "Disabled logs"),
        proQuestion("What belongs in a kernel-risk finding?", "Applicable build evidence, prerequisites, exposure, risk, non-destructive validation limits and remediation", "Only exploit code", "Only a crash screenshot", "Only the operating-system name")
    ],
    "module-10": [
        proQuestion("What is the correct privilege-assessment sequence?", "Scope, identity baseline, systematic enumeration, path prioritization, minimal validation, cleanup, reporting and retest plan", "Kernel exploit first", "Collect secrets and then define scope", "Run scripts without interpretation"),
        proQuestion("How should candidate privilege paths be prioritized?", "Evidence strength, required access, reliability, impact, safety and assessment objective", "Tool order", "Exploit popularity", "Maximum disruption"),
        proQuestion("What must the capstone prove beyond obtaining root?", "The complete privilege transition, why it works, its realistic impact and how to remove and retest it", "Only the final UID", "Only a tool name", "Only a CVE"),
        proQuestion("What belongs in the capstone artifact register?", "Every created or changed file, process, account, task or configuration item and its cleanup status", "Only screenshots", "Only shell history", "Only the report"),
        proQuestion("What makes the capstone recruiter-ready?", "Systematic reasoning, sanitized evidence, minimal impact, prioritized remediation, verified cleanup and exact retest steps", "The largest enumeration output", "Multiple kernel exploits", "Unredacted secrets")
    ]
};

export const linuxPrivilegeEscalation = {
    id: "linux-privilege-escalation",
    title: "Linux Privilege Escalation",
    overviewTitle: "Analyze and Validate Linux Privilege Boundaries",
    category: "CWS ACADEMY • LINUX SECURITY",
    level: "Intermediate",
    levelKey: "intermediate",
    status: "available",
    access: "pro",
    icon: "fa-solid fa-terminal",
    description: "Learn Linux privilege escalation through systematic enumeration, sudo, SUID/SGID, capabilities, services, scheduled tasks, writable paths, credentials, containers, kernel risk and evidence-based remediation.",
    longDescription: "Linux Privilege Escalation is a CWS Pro specialization for students who already understand Linux fundamentals and ethical hacking. Students learn how privilege boundaries fail through misconfiguration, excessive permissions, unsafe trusted execution, exposed credentials, privileged services, containers and outdated kernels.",
    duration: "75–95 Hours",
    estimatedLessons: 30,
    certificateEligible: true,
    learningStandard: "Systematic Enumeration • Privilege-Path Validation • Hands-On Labs • Evidence • Cleanup • Remediation",
    prerequisites: ["Linux Fundamentals","Ethical Hacking"],
    recommendedPrerequisites: ["Bash & Linux Automation","Practical Penetration Testing"],
    skills: [
        "Linux local enumeration",
        "Effective-privilege analysis",
        "Sudo policy review",
        "SUID, SGID and capability analysis",
        "Trusted-path and writable-input analysis",
        "Cron and systemd timer review",
        "Secure credential-exposure validation",
        "Privileged-service analysis",
        "Container and Docker boundary review",
        "Kernel-risk assessment",
        "Privilege-path reporting and retesting"
    ],
    tools: [
        "id and groups",
        "sudo",
        "find",
        "getcap",
        "ps",
        "ss",
        "systemctl",
        "journalctl",
        "Docker inspection commands",
        "CWS privilege-path evidence workbook"
    ],
    assessmentStandard: "Every Pro assessment requires a traceable starting identity, controllable condition, trusted execution step, resulting privilege, minimal-impact proof, defensive root-cause fix, cleanup confirmation and retest method.",
    standardReferences: [
        {
            title: "MITRE ATT&CK — Privilege Escalation",
            organization: "MITRE",
            url: "https://attack.mitre.org/tactics/TA0004/"
        },
        {
            title: "MITRE ATT&CK — Enterprise Linux Matrix",
            organization: "MITRE",
            url: "https://attack.mitre.org/matrices/enterprise/linux/"
        },
        {
            title: "NIST SP 800-115 — Technical Guide to Information Security Testing and Assessment",
            organization: "National Institute of Standards and Technology",
            url: "https://csrc.nist.gov/pubs/sp/800/115/final"
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
        "Perform systematic Linux local enumeration.",
        "Interpret users, groups and effective privileges.",
        "Assess sudo configuration safely.",
        "Analyze SUID, SGID and file capabilities.",
        "Identify risky services and writable execution paths.",
        "Assess scheduled tasks and cron configurations.",
        "Recognize credential exposure in files and environment data.",
        "Understand kernel and package privilege-escalation risk.",
        "Assess container and Docker-related privilege boundaries.",
        "Build evidence-backed Linux privilege-escalation findings."
    ],
    modules: [
        {
            id: "module-01",
            number: 1,
            title: "Linux Local Enumeration",
            description: "Develop practical skill in linux local enumeration through evidence-driven authorized lab work.",
            access: "pro",
            labs: 1,
            assessments: 1,
            lessons: [
                lesson("lesson-01", "Current Identity and Group Membership", "Understand the current user, UID, GID and supplementary groups.", "Identity and group membership determine the starting privilege context.", "Use read-only commands such as whoami and id before any escalation attempt."),
                lesson("lesson-02", "System and Kernel Enumeration", "Identify the distribution, kernel and architecture.", "Version and architecture affect configuration and vulnerability research.", "Use uname -a and /etc/os-release, then interpret the information in context."),
                lesson("lesson-03", "Processes, Services and Listening Ports", "Map running processes, services and local listeners.", "Privileged services may trust writable files or unsafe configuration.", "Use ps aux and ss -tulnp to build a local service map."),
            ],
            labActivities: [lab("lab-01", "Linux Local Enumeration Lab", "Linux Local Enumeration")],
            moduleAssessment: assessment("Module 1 Assessment \u2014 Linux Local Enumeration")
        },
        {
            id: "module-02",
            number: 2,
            title: "Sudo Privilege Analysis",
            description: "Develop practical skill in sudo privilege analysis through evidence-driven authorized lab work.",
            access: "pro",
            labs: 1,
            assessments: 1,
            lessons: [
                lesson("lesson-01", "How Sudo Delegation Works", "Understand sudo as policy-controlled privilege delegation.", "Misconfigured sudo rules can turn limited accounts into elevated execution.", "Use sudo -l and interpret command, target-user and password requirements."),
                lesson("lesson-02", "Unsafe Sudo Command Paths", "Identify sudo-approved programs that can execute other commands or modify trusted files.", "A safe-looking rule may expose indirect shell or file-write capability.", "Review the allowed binary's behavior before attempting any validation."),
                lesson("lesson-03", "Sudo Environment and PATH Risk", "Analyze environment and command lookup during privileged execution.", "Unsafe PATH or preserved environment variables can redirect elevated execution.", "Review absolute paths, PATH order and environment preservation."),
            ],
            labActivities: [lab("lab-01", "Sudo Privilege Analysis Lab", "Sudo Privilege Analysis")],
            moduleAssessment: assessment("Module 2 Assessment \u2014 Sudo Privilege Analysis")
        },
        {
            id: "module-03",
            number: 3,
            title: "SUID, SGID and Capabilities",
            description: "Develop practical skill in suid, sgid and capabilities through evidence-driven authorized lab work.",
            access: "pro",
            labs: 1,
            assessments: 1,
            lessons: [
                lesson("lesson-01", "SUID and SGID Fundamentals", "Understand special permission bits that alter runtime identity.", "Privileged binaries can expose sensitive operations when misused or poorly designed.", "Map file owner/group and understand what the binary can actually do."),
                lesson("lesson-02", "Enumerating Special-Permission Files", "Find unusual SUID/SGID executables.", "Custom or unexpected privileged binaries deserve deeper inspection.", "Use find with permission filters and compare results against expected system binaries."),
                lesson("lesson-03", "Linux Capabilities", "Understand fine-grained kernel privileges assigned to files or processes.", "Capabilities can grant powerful operations without full root identity.", "Use getcap and interpret the specific capability before deciding risk."),
            ],
            labActivities: [lab("lab-01", "SUID, SGID and Capabilities Lab", "SUID, SGID and Capabilities")],
            moduleAssessment: assessment("Module 3 Assessment \u2014 SUID, SGID and Capabilities")
        },
        {
            id: "module-04",
            number: 4,
            title: "Writable Files and Trusted Execution Paths",
            description: "Develop practical skill in writable files and trusted execution paths through evidence-driven authorized lab work.",
            access: "pro",
            labs: 1,
            assessments: 1,
            lessons: [
                lesson("lesson-01", "Writable Configuration and Scripts", "Find user-writable files consumed by privileged processes.", "Writable trusted content can become an indirect escalation path.", "Trace which process uses the file and under what privilege."),
                lesson("lesson-02", "Directory and PATH Trust", "Understand how writable directories and relative command lookup affect execution.", "Privileged programs may execute attacker-controlled files if path trust is weak.", "Review directory permissions and absolute versus relative commands."),
                lesson("lesson-03", "Service File and Unit Permissions", "Assess service definitions, wrappers and supporting files.", "A root service that trusts writable content can cross privilege boundaries.", "Map service user, executable, config and effective write permissions."),
            ],
            labActivities: [lab("lab-01", "Writable Files and Trusted Execution Paths Lab", "Writable Files and Trusted Execution Paths")],
            moduleAssessment: assessment("Module 4 Assessment \u2014 Writable Files and Trusted Execution Paths")
        },
        {
            id: "module-05",
            number: 5,
            title: "Cron, Timers and Scheduled Execution",
            description: "Develop practical skill in cron, timers and scheduled execution through evidence-driven authorized lab work.",
            access: "pro",
            labs: 1,
            assessments: 1,
            lessons: [
                lesson("lesson-01", "Cron and Scheduled Jobs", "Understand time-based privileged execution.", "Root cron jobs may trust writable scripts or directories.", "Enumerate cron entries, execution user and referenced files."),
                lesson("lesson-02", "Systemd Timers", "Understand scheduled systemd execution.", "Timers may trigger privileged services that reference unsafe paths.", "Map timer units to service units and inspect command paths."),
                lesson("lesson-03", "Wildcard and Argument Handling Risks", "Understand how shell expansion can change privileged command meaning.", "User-controlled filenames may influence command-line parsing.", "Analyze the exact expansion behavior before validation."),
            ],
            labActivities: [lab("lab-01", "Cron, Timers and Scheduled Execution Lab", "Cron, Timers and Scheduled Execution")],
            moduleAssessment: assessment("Module 5 Assessment \u2014 Cron, Timers and Scheduled Execution")
        },
        {
            id: "module-06",
            number: 6,
            title: "Credential and Secret Exposure",
            description: "Develop practical skill in credential and secret exposure through evidence-driven authorized lab work.",
            access: "pro",
            labs: 1,
            assessments: 1,
            lessons: [
                lesson("lesson-01", "Configuration File Secrets", "Identify passwords, tokens or connection strings in readable configuration.", "Local file access can expose credentials for more privileged identities or services.", "Review only authorized application config and minimize secret collection."),
                lesson("lesson-02", "Shell History and Environment Data", "Assess history and environment variables for leaked sensitive values.", "Operational mistakes may expose credentials or tokens.", "Inspect only authorized user data and capture minimal evidence."),
                lesson("lesson-03", "SSH Keys and Reused Credentials", "Assess private keys and credential reuse safely.", "Weakly protected keys may provide access to other authorized accounts.", "Review file permissions and validate only against explicitly scoped lab accounts."),
            ],
            labActivities: [lab("lab-01", "Credential and Secret Exposure Lab", "Credential and Secret Exposure")],
            moduleAssessment: assessment("Module 6 Assessment \u2014 Credential and Secret Exposure")
        },
        {
            id: "module-07",
            number: 7,
            title: "Services, Packages and Local Software",
            description: "Develop practical skill in services, packages and local software through evidence-driven authorized lab work.",
            access: "pro",
            labs: 1,
            assessments: 1,
            lessons: [
                lesson("lesson-01", "Privileged Service Analysis", "Review root-run services and everything they trust.", "Writable dependencies can create privilege escalation paths.", "Map service user, executable, config and writable dependencies."),
                lesson("lesson-02", "Package and Version Risk", "Assess outdated local software for privilege risk.", "Some local vulnerabilities depend on exact versions and conditions.", "Verify versions and prerequisites before considering exploitation."),
                lesson("lesson-03", "Custom and Third-Party Software", "Assess locally installed non-standard software.", "Custom software may have weak permissions or unsafe wrappers.", "Review install paths, ownership, execution context and update hygiene."),
            ],
            labActivities: [lab("lab-01", "Services, Packages and Local Software Lab", "Services, Packages and Local Software")],
            moduleAssessment: assessment("Module 7 Assessment \u2014 Services, Packages and Local Software")
        },
        {
            id: "module-08",
            number: 8,
            title: "Containers and Docker Privilege Boundaries",
            description: "Develop practical skill in containers and docker privilege boundaries through evidence-driven authorized lab work.",
            access: "pro",
            labs: 1,
            assessments: 1,
            lessons: [
                lesson("lesson-01", "Container Security Boundaries", "Understand namespaces, mounts and runtime isolation.", "Container misconfiguration can expose host resources.", "Review runtime configuration, capabilities and mounted paths."),
                lesson("lesson-02", "Docker Group Risk", "Understand why Docker daemon control is highly privileged.", "Docker group membership can effectively grant host-level administrative capability.", "Treat Docker access as an administrative right and validate only in a lab."),
                lesson("lesson-03", "Mounted Secrets and Host Paths", "Assess sensitive mounts inside containers.", "Unsafe mounts can expose host files, sockets or secrets.", "Inspect container configuration and identify sensitive host resources."),
            ],
            labActivities: [lab("lab-01", "Containers and Docker Privilege Boundaries Lab", "Containers and Docker Privilege Boundaries")],
            moduleAssessment: assessment("Module 8 Assessment \u2014 Containers and Docker Privilege Boundaries")
        },
        {
            id: "module-09",
            number: 9,
            title: "Kernel Escalation Risk and Hardening",
            description: "Develop practical skill in kernel escalation risk and hardening through evidence-driven authorized lab work.",
            access: "pro",
            labs: 1,
            assessments: 1,
            lessons: [
                lesson("lesson-01", "Kernel Privilege-Escalation Concepts", "Understand local kernel vulnerabilities that may cross privilege boundaries.", "Kernel flaws can provide high-impact escalation but may be unstable.", "Verify kernel version and affected conditions before any lab validation."),
                lesson("lesson-02", "Why Kernel Exploits Are Last Resort", "Prioritize safer configuration paths before low-level exploitation.", "Kernel exploitation may crash or destabilize systems.", "Use snapshots and exhaust lower-impact paths first."),
                lesson("lesson-03", "Linux Privilege Hardening", "Reduce local escalation paths using least privilege and secure ownership.", "Most preventable paths come from excessive trust or weak permissions.", "Harden sudo, SUID/capabilities, services, tasks, secrets and patching."),
            ],
            labActivities: [lab("lab-01", "Kernel Escalation Risk and Hardening Lab", "Kernel Escalation Risk and Hardening")],
            moduleAssessment: assessment("Module 9 Assessment \u2014 Kernel Escalation Risk and Hardening")
        },
        {
            id: "module-10",
            number: 10,
            title: "Linux Privilege Escalation Capstone",
            description: "Develop practical skill in linux privilege escalation capstone through evidence-driven authorized lab work.",
            access: "pro",
            labs: 1,
            assessments: 1,
            lessons: [
                lesson("lesson-01", "Capstone Enumeration Plan", "Create a complete local privilege checklist.", "A systematic workflow prevents simple paths from being missed.", "Move from identity and read-only enumeration to targeted validation."),
                lesson("lesson-02", "Execute the Privilege Assessment", "Apply the full local privilege-escalation methodology.", "The capstone measures reasoning rather than memorized commands.", "Enumerate, prioritize, validate minimally, capture evidence and remediate."),
                lesson("lesson-03", "Final Finding and Retest Plan", "Document the privilege path and how defenders can verify the fix.", "The goal is risk reduction, not merely obtaining root.", "Write starting identity, vulnerable condition, privilege transition, remediation and retest steps."),
            ],
            labActivities: [lab("lab-01", "Linux Privilege Escalation Capstone Lab", "Linux Privilege Escalation Capstone")],
            moduleAssessment: assessment("Module 10 Assessment \u2014 Linux Privilege Escalation Capstone")
        },
    ],

    finalAssessment: {
        title: "CWS Linux Privilege Escalation Final Assessment",
        description: "Demonstrate practical understanding of Linux local enumeration, sudo, SUID, capabilities, scheduled execution, credentials, services, containers and hardening.",
        passingScore: 80,
        allowRetry: true,
        required: true,
        questions: [
            {question:"What should happen first after gaining authorized low-privilege access?",options:["Enumerate current identity and local environment","Run a kernel exploit","Modify sudoers","Delete logs"],answer:0},
            {question:"What does id show?",options:["UID, GID and group memberships","Only kernel version","Only open ports","Only environment variables"],answer:0},
            {question:"What does sudo -l show?",options:["Commands the current user may execute through sudo","Running containers","Network routes","Installed packages"],answer:0},
            {question:"Why can SUID binaries be security-sensitive?",options:["They may execute with the file owner's privilege","They only affect file size","They disable networking","They only affect groups"],answer:0},
            {question:"What are Linux capabilities?",options:["Fine-grained kernel privileges assigned to processes or files","Only filesystem quotas","DNS permissions","Shell aliases"],answer:0},
            {question:"Why are writable root-run scripts dangerous?",options:["A lower-privilege user may influence elevated execution","They only affect readability","They never execute","Root ignores file contents"],answer:0},
            {question:"Why should PATH trust be reviewed?",options:["Relative lookup may execute attacker-controlled binaries","PATH only affects DNS","PATH cannot affect root","PATH is cosmetic"],answer:0},
            {question:"What is the risk of a root cron job calling a writable script?",options:["The writable script may execute with root privilege","Cron disables the script","The script becomes read-only","Only the filename changes"],answer:0},
            {question:"Why are credentials in config files dangerous?",options:["Readable secrets may enable access to higher-privilege identities or services","Config files cannot contain secrets","Credentials only matter remotely","Linux ignores config files"],answer:0},
            {question:"What should be done with discovered secrets during testing?",options:["Collect only the minimum evidence necessary and protect it","Publish them","Reuse them everywhere","Copy unrelated secrets"],answer:0},
            {question:"Why enumerate privileged services?",options:["Their trusted files and execution paths may create escalation opportunities","Services never run as root","They only affect networking","They cannot read files"],answer:0},
            {question:"Why should kernel exploits usually be considered later?",options:["They may be less stable and higher impact than configuration-based paths","Kernel vulnerabilities never exist","They only work remotely","They cannot change privilege"],answer:0},
            {question:"Why can Docker group membership be highly privileged?",options:["Docker daemon control can provide host-level administrative capability","Docker only reads logs","Containers cannot mount host paths","Docker never runs privileged processes"],answer:0},
            {question:"What is the risk of sensitive host-path mounts in containers?",options:["Container users may gain access to host resources","Mounts only affect performance","Mounted files are always encrypted","Containers cannot read mounts"],answer:0},
            {question:"What is the strongest Linux hardening principle?",options:["Least privilege and secure trusted execution paths","Give all users sudo","Make scripts world-writable","Disable auditing"],answer:0},
            {question:"What should a privilege-escalation finding explain?",options:["Starting identity, vulnerable condition, privilege transition and remediation","Only the root username","Only a tool name","Only the kernel version"],answer:0},
            {question:"What is the purpose of a retest?",options:["Confirm that remediation removed the original privilege path","Find new targets","Delete findings","Change scope"],answer:0},
            {question:"What is the safest validation principle?",options:["Use the minimum necessary action to prove privilege impact","Modify as much as possible","Collect all data","Ignore snapshots"],answer:0},
            {question:"Why should automated enumeration scripts not replace manual reasoning?",options:["Tools may miss context or misinterpret conditions","Automation never works","Manual testing is always faster","Scripts cannot read files"],answer:0},
            {question:"What best demonstrates Linux privilege-escalation competence?",options:["Systematic enumeration, accurate privilege reasoning, minimal validation and clear remediation","Always using kernel exploits","Running the most tools","Only obtaining root"],answer:0}
        ]
    }
};


/* =========================================================
   CWS PRO COURSE STANDARDIZATION
========================================================= */

function applyLinuxPrivilegeProStandard(course) {
    course.modules.forEach(module => {
        module.learningOutcomes = [
            `Analyze ${module.title} from a known low-privilege identity and authorized scope.`,
            "Trace controllable input through trusted execution to the resulting privilege boundary.",
            "Validate only the minimum effect required and preserve sanitized evidence.",
            "Recommend a root-cause defensive fix and an exact retest procedure."
        ];

        module.professionalCompetencies = [
            "Linux privilege-boundary reasoning",
            "Evidence-driven local enumeration",
            "Controlled validation and artifact management",
            "Defensive remediation and retesting"
        ];

        module.moduleAssessment = {
            title: `${module.title} — Pro Verified Assessment`,
            type: "Module Assessment",
            access: "pro",
            passingScore: 80,
            allowRetry: true,
            showResults: true,
            required: true,
            questionCount: linuxPrivilegeQuestionBanks[module.id].length,
            questions: balanceAnswerPositions(
                linuxPrivilegeQuestionBanks[module.id],
                module.number - 1
            )
        };

        module.labActivities = (module.labActivities || []).map(activity => ({
            ...activity,
            access: "pro",
            required: true,
            minimumScore: 80,
            prerequisites: [
                "Completed lessons in this module",
                "Isolated intentionally vulnerable Linux VM",
                "Non-root training account",
                "Verified snapshot or recovery point",
                "Written fictional rules of engagement and artifact log"
            ],
            instructions: [
                "Confirm the exact lab target, current identity, permitted techniques and stop conditions.",
                `Apply the ${module.title} enumeration workflow using read-only checks first.`,
                "Record each candidate condition separately and distinguish controllable input from assumptions.",
                "Prioritize one intentionally vulnerable privilege path using evidence, safety and reliability.",
                "Validate only the minimum benign effect required to prove the privilege transition.",
                "Preserve sanitized raw evidence and write the complete privilege-path explanation.",
                "Recommend root-cause remediation and an exact verification method.",
                "Remove test artifacts, verify cleanup and restore the intended lab baseline."
            ],
            evidence: [
                "Target, scope, current UID/GID/groups and timestamp",
                "Read-only enumeration commands and raw output",
                "Candidate-path comparison and prioritization reasoning",
                "Starting identity, controllable condition and trusted execution step",
                "Minimum benign proof of resulting privilege",
                "Finding with impact, root cause, remediation and retest steps",
                "Artifact register and verified cleanup evidence"
            ],
            successCriteria: "The learner proves one intentionally vulnerable privilege path from starting identity to elevated effect, remains within scope, avoids unrelated sensitive data, explains the root cause and verifies cleanup.",
            cleanup: [
                "Remove every marker, payload, temporary file, shell, task or configuration artifact created during validation.",
                "Restore original files and permissions or revert to the verified snapshot.",
                "Confirm that no test process or listener remains.",
                "Retain only sanitized evidence with no reusable credentials or secrets."
            ],
            safety: "Use only an isolated purpose-built privilege-escalation lab or an environment covered by explicit written authorization. Never test production, retain discovered secrets, create persistence or use unstable kernel proof without specific approval and recovery controls.",
            rubric: {
                enumerationAndPrioritization: 20,
                privilegePathAccuracy: 25,
                minimalValidationAndEvidence: 25,
                remediationAndRetest: 15,
                safetyAndCleanup: 10,
                documentation: 5
            }
        }));

        module.lessons.forEach((item, lessonIndex) => {
            item.performanceObjectives = [
                `Explain ${item.title} and its Linux trust boundary accurately.`,
                "Identify the starting privilege and evidence needed before validation.",
                "Trace a lab condition from controllable input to elevated execution.",
                "Define a minimal proof, cleanup method, defensive fix and retest."
            ];
            item.evidenceStandard = [
                "Record current identity, host, scope and timestamp.",
                "Preserve exact read-only commands and raw output.",
                "Separate the vulnerable condition from the privilege-impact conclusion.",
                "Capture only the minimum benign validation proof.",
                "Redact credentials, tokens, personal information and unnecessary host details."
            ];
            item.completionCriteria = [
                "The learner explains the path without relying on automated-tool labels.",
                "The learner identifies at least one false-positive or non-exploitable condition.",
                "The knowledge check is passed.",
                "Associated evidence meets the Pro standard."
            ];
            item.quiz = balanceAnswerPositions(item.quiz, module.number + lessonIndex);
        });
    });

    const integrativeScenarios = [
        proQuestion("A root-owned script is not writable, but its parent directory is writable by the current user. What is the key risk?", "The file may be replaced or renamed so privileged execution uses attacker-controlled content", "The script becomes encrypted", "The kernel changes ownership", "The directory cannot affect execution"),
        proQuestion("sudo permits one command with a fixed absolute path but unrestricted user-controlled arguments. What should be analyzed?", "Whether arguments expose file writes, command execution, environment control or other unintended privileged behavior", "Only the binary version", "Only the sudo password", "Only the command name"),
        proQuestion("An automated script flags a SUID binary that is expected and not controllable by the user. What is the correct conclusion?", "It is an observation requiring behavior and input validation, not a confirmed escalation path", "Root access is confirmed", "Delete the binary", "Report critical immediately"),
        proQuestion("A secret is discovered in a readable config file but authenticating with it is outside scope. What should happen?", "Capture minimal redacted exposure evidence, protect it and report the unvalidated potential impact", "Use it anyway", "Copy the full file", "Publish the secret"),
        proQuestion("A privileged cron job executes a script by relative name. Which evidence is essential?", "Execution identity, PATH and working directory, attacker-controlled path entry and a safe observed run", "Only the cron schedule", "Only the script extension", "Only the hostname"),
        proQuestion("Docker-group membership is found on a host. What should be proven before reporting host-level privilege?", "The current user can actually control the relevant daemon and the permitted lab validation shows the host boundary can be crossed", "Only that Docker is installed", "Only that containers are running", "Only the group name"),
        proQuestion("A kernel CVE appears applicable, but the lab snapshot cannot be restored. What is the best professional choice?", "Do not run unstable proof; document applicability evidence, validation limits and remediation", "Run it repeatedly", "Report a successful exploit", "Disable logging"),
        proQuestion("Two privilege paths exist: a safe writable-task proof and an unstable kernel exploit. Which should be prioritized?", "The lower-impact reliable path that meets the assessment objective", "The kernel exploit because it is advanced", "Both simultaneously", "Neither should be documented"),
        proQuestion("A lab validation created a temporary root-owned marker. What closes the activity correctly?", "Remove it through the approved process, verify absence and record cleanup in the artifact register", "Leave it for the instructor", "Hide it", "Delete the artifact log"),
        proQuestion("What is the strongest final Pro-course submission?", "A complete privilege-path narrative with systematic enumeration, sanitized proof, root-cause remediation, verified cleanup and exact retest steps", "A root-shell screenshot", "Raw automated enumeration output", "A list of CVEs")
    ];

    const finalQuestions = [
        ...Object.values(linuxPrivilegeQuestionBanks).flatMap(bank => bank.slice(0, 2)),
        ...integrativeScenarios
    ];

    course.finalAssessment = {
        id: "final-assessment",
        title: "CWS Linux Privilege Escalation Pro Final Assessment",
        description: "A server-verified, scenario-based assessment covering Linux privilege context, sudo, special permissions, capabilities, trusted paths, scheduled execution, secrets, services, containers, kernel risk, hardening and professional evidence.",
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
        title: "Linux Privilege Boundary Assessment",
        access: "pro",
        required: true,
        minimumScore: 85,
        estimatedTime: "12–16 hours",
        scenario: "Assess a purpose-built Linux host containing multiple intentional local misconfigurations. Identify, compare and safely validate privilege paths from a non-root starting identity.",
        deliverables: [
            "Written fictional scope, stop conditions and starting identity",
            "Systematic local-enumeration workbook",
            "Privilege-path map covering sudo, permissions, tasks, secrets, services and container boundaries",
            "Candidate-path prioritization matrix",
            "Minimum-impact validation of two distinct approved paths",
            "Sanitized evidence pack and complete testing timeline",
            "Two professional findings with root cause and impact",
            "Layered hardening recommendations and exact retest steps",
            "Artifact register and verified cleanup report",
            "Executive summary with limitations and residual risk"
        ],
        rubric: {
            methodologyAndEnumeration: 20,
            privilegePathAccuracy: 25,
            validationAndEvidence: 20,
            remediationAndRetesting: 15,
            safetyAndCleanup: 10,
            professionalReporting: 10
        }
    };

    course.qualityVersion = "CWS-PRO-STANDARD-2026.2";
}


applyLinuxPrivilegeProStandard(linuxPrivilegeEscalation);
