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
        quiz: [
            {question:`What should drive analysis of ${title}?`,options:["Current identity, permissions and evidence","Random exploit choice","Maximum impact","Guessing"],answer:0},
            {question:"What is the safest escalation workflow?",options:["Enumerate first, understand the path, then validate minimally","Run kernel exploits first","Modify system files immediately","Ignore current privileges"],answer:0},
            {question:"What makes an escalation finding useful?",options:["Clear evidence of the privilege path and remediation","Only a root shell screenshot","Only a tool name","Only a CVE"],answer:0}
        ]
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
    duration: "55–70 Hours",
    estimatedLessons: 30,
    certificateEligible: true,
    learningStandard: "Deep Linux Enumeration • Privilege Paths • Hands-On Labs • Evidence • Remediation",
    prerequisites: ["Linux Fundamentals","Ethical Hacking"],
    recommendedPrerequisites: ["Bash & Linux Automation","Practical Penetration Testing"],
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
