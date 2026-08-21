/* =========================================================
   CWS ACADEMY
   PREMIUM COURSE EXPERIENCE METADATA

   This lightweight registry keeps presentation metadata out
   of the large lesson-data files. It can later be replaced
   with protected API/Firestore content without changing the
   course-detail components.
========================================================= */


const instructor = Object.freeze({
    name: "Sandiso Mayekiso",
    role: "Cybersecurity Instructor & Ethical Hacking Practitioner",
    bio: "Sandiso teaches practical cybersecurity through clear explanations, controlled lab work and evidence-based security thinking.",
    credentials: [
        "CompTIA A+, Network+ and Security+",
        "Cisco CCNA",
        "Cybersecurity and penetration-testing training"
    ]
});


const experienceByCourse = Object.freeze({
    "cybersecurity-fundamentals": {
        skills: ["Security fundamentals", "Risk analysis", "Security controls", "Identity security", "Incident awareness"],
        tools: ["Web browser", "Password manager", "Security checklists", "Sample logs"]
    },
    "networking-fundamentals": {
        skills: ["TCP/IP", "Subnetting", "Network services", "Traffic analysis", "Network troubleshooting"],
        tools: ["Wireshark", "Nmap", "ping", "traceroute", "ipconfig / ip"]
    },
    "linux-fundamentals": {
        skills: ["Linux navigation", "Permissions", "Processes", "Services", "System hardening"],
        tools: ["Bash", "SSH", "systemctl", "journalctl", "Linux utilities"]
    },
    "windows-fundamentals": {
        skills: ["Windows administration", "NTFS permissions", "Services", "Event logs", "Endpoint security"],
        tools: ["PowerShell", "Event Viewer", "Task Manager", "Windows Defender"]
    },
    "bash-linux-automation": {
        skills: ["Shell scripting", "Automation", "Input validation", "Log processing", "Secure scripting"],
        tools: ["Bash", "grep", "awk", "sed", "cron"]
    },
    "python-cybersecurity-fundamentals": {
        skills: ["Python fundamentals", "File processing", "JSON", "Error handling", "Security automation"],
        tools: ["Python 3", "VS Code", "pip", "requests", "JSON"]
    },
    "active-directory-fundamentals": {
        skills: ["Identity administration", "Domains", "Users and groups", "Group Policy", "AD security"],
        tools: ["Windows Server", "Active Directory Users and Computers", "PowerShell", "Group Policy"]
    },
    "ethical-hacking": {
        skills: ["Scoping", "Reconnaissance", "Enumeration", "Vulnerability validation", "Security reporting"],
        tools: ["Kali Linux", "Nmap", "Burp Suite", "Metasploit", "Nessus"]
    },
    "web-application-security": {
        skills: ["Application mapping", "HTTP analysis", "Authentication testing", "Input validation", "OWASP testing"],
        tools: ["Burp Suite", "OWASP ZAP", "Browser DevTools", "curl", "OWASP Juice Shop"]
    },
    "python-offensive-security": {
        skills: ["Security scripting", "Network automation", "HTTP automation", "Data parsing", "Tool development"],
        tools: ["Python 3", "requests", "socket", "Scapy", "Git"]
    },
    "active-directory-security-pentesting": {
        skills: ["AD enumeration", "Privilege-path analysis", "Kerberos security", "Credential exposure", "Remediation reporting"],
        tools: ["BloodHound", "PowerView", "Impacket", "CrackMapExec", "Windows Server lab"]
    },
    "linux-privilege-escalation": {
        skills: ["Enumeration", "Permission analysis", "Service analysis", "Credential discovery", "Remediation"],
        tools: ["Linux", "Bash", "sudo", "systemctl", "LinPEAS"]
    },
    "practical-penetration-testing": {
        skills: ["End-to-end methodology", "Attack-surface mapping", "Controlled validation", "Evidence handling", "Professional reporting"],
        tools: ["Kali Linux", "Nmap", "Burp Suite", "Metasploit", "Wireshark"]
    }
});


const experienceCache =
    new Map();


function normalizeId(value) {
    return String(value || "")
        .trim()
        .toLowerCase();
}


function getFirstLesson(course) {
    const module = Array.isArray(course?.modules)
        ? course.modules.find(item => Array.isArray(item?.lessons) && item.lessons.length)
        : null;

    const lesson = module?.lessons?.[0] || null;

    if (!module || !lesson) {
        return null;
    }

    const params = new URLSearchParams({
        course: course.id,
        module: module.id,
        lesson: lesson.id
    });

    return {
        title: lesson.title,
        duration: lesson.duration || "Self-paced",
        url: `lesson.html?${params.toString()}`
    };
}


function getPrerequisiteMessage(required, recommended) {
    if (!required.length && !recommended.length) {
        return "No previous cybersecurity course is required. This is a suitable starting point for the CWS Academy learning path.";
    }

    if (required.length) {
        return "Complete the required courses before starting. Recommended courses provide useful supporting knowledge but do not replace the required foundation.";
    }

    return "There are no mandatory prerequisites, but completing the recommended courses will make the practical work easier to follow.";
}


export function getCourseExperience(
    course,
    {
        required = [],
        recommended = [],
        resolveCourseName = value => value
    } = {}
) {
    if (!course?.id) {
        return null;
    }

    const courseId = normalizeId(course.id);
    const cacheKey = [
        courseId,
        required.join(","),
        recommended.join(",")
    ].join("|");


    if (experienceCache.has(cacheKey)) {
        return experienceCache.get(cacheKey);
    }


    const custom = experienceByCourse[courseId] || {};
    const requiredNames = required.map(resolveCourseName);
    const recommendedNames = recommended.map(resolveCourseName);
    const sampleLesson = getFirstLesson(course);

    const experience = {
        cover: {
            src: `../assets/images/covers/${courseId}.webp`,
            fallback: "../assets/images/cybersecurity.png",
            alt: `${course.title} course cover`
        },
        trailer: {
            title: `${course.title} Preview`,
            description: `Preview the learning approach, practical activities and outcomes included in ${course.title}.`,
            videoUrl: String(course?.trailer?.videoUrl || "").trim(),
            poster: String(course?.trailer?.poster || `../assets/images/covers/${courseId}.webp`).trim(),
            duration: String(course?.trailer?.duration || "Preview coming soon").trim()
        },
        instructor,
        outcomes: Array.isArray(course.objectives) ? course.objectives : [],
        prerequisites: {
            required: requiredNames,
            recommended: recommendedNames,
            explanation: getPrerequisiteMessage(requiredNames, recommendedNames)
        },
        estimatedTime: course.duration || "Self-paced",
        difficulty: course.level || "All levels",
        skills: custom.skills || ["Cybersecurity knowledge", "Practical analysis", "Professional reporting"],
        tools: custom.tools || ["Web browser", "CWS browser lab", "Course resources"],
        rating: {
            average: Number(course?.rating?.average || 0),
            count: Number(course?.rating?.count || 0)
        },
        sampleLesson,
        certificate: {
            eligible: course.certificateEligible === true,
            title: `${course.title} Certificate of Completion`,
            explanation: course.certificateEligible === true
                ? "Earned after completing all required lessons, practical activities and assessments at the required passing scores."
                : "This course currently contributes to learning-path progress but does not issue an individual certificate."
        }
    };


    experienceCache.set(
        cacheKey,
        experience
    );


    return experience;
}


export { instructor as cwsInstructor };
