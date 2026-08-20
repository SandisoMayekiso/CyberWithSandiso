/* =========================================================
   CWS ACADEMY
   LEARNING / CAREER PATH REGISTRY
   File: data/learning-paths.js
========================================================= */

export const learningPaths = {

    "cybersecurity-foundations": {

        id:
            "cybersecurity-foundations",

        title:
            "Cybersecurity Foundations",

        shortTitle:
            "Foundations",

        category:
            "Foundation",

        level:
            "Beginner",

        order:
            10,

        displayOrder:
            1,

        icon:
            "fa-solid fa-shield-halved",

        description:
            "Build the core cybersecurity, networking, Linux and Windows knowledge required before moving into specialist security paths.",

        estimatedTime:
            "Self-paced",

        credentialTitle:
            "CWS Cybersecurity Foundations Path Certificate",

        stages: [

            {
                id: "cybersecurity-fundamentals",
                type: "course",
                courseId: "cybersecurity-fundamentals",
                required: true
            },

            {
                id: "networking-fundamentals",
                type: "course",
                courseId: "networking-fundamentals",
                required: true
            },

            {
                id: "linux-fundamentals",
                type: "course",
                courseId: "linux-fundamentals",
                required: true
            },

            {
                id: "windows-fundamentals",
                type: "course",
                courseId: "windows-fundamentals",
                required: true
            },

            {
                id: "foundation-certificate",
                type: "credential",
                title: "CWS Foundations Path Certificate",
                description:
                    "Awarded after every required foundation course has been completed.",
                required: true
            }

        ]

    },


    "junior-penetration-tester": {

        id:
            "junior-penetration-tester",

        title:
            "Junior Penetration Tester",

        shortTitle:
            "Junior Pentester",

        category:
            "Offensive Security",

        level:
            "Beginner to Intermediate",

        order:
            20,

        displayOrder:
            2,

        icon:
            "fa-solid fa-user-secret",

        description:
            "Build the foundations, technical knowledge and practical methodology needed to begin working toward junior penetration-testing roles.",

        estimatedTime:
            "Self-paced",

        credentialTitle:
            "CWS Junior Penetration Tester Path Certificate",

        stages: [

            {
                id: "cybersecurity-foundations",
                type: "course",
                courseId: "cybersecurity-fundamentals",
                required: true
            },

            {
                id: "networking-foundations",
                type: "course",
                courseId: "networking-fundamentals",
                required: true
            },

            {
                id: "linux-foundations",
                type: "course",
                courseId: "linux-fundamentals",
                required: true
            },

            {
                id: "ethical-hacking",
                type: "course",
                courseId: "ethical-hacking",
                required: true
            },

            {
                id: "web-application-security",
                type: "course",
                courseId: "web-application-security",
                required: true
            },

            {
                id: "practical-penetration-testing",
                type: "course",
                courseId: "practical-penetration-testing",
                required: true
            },

            {
                id: "junior-pentest-capstone",
                type: "capstone",
                capstoneId: "junior-pentest-capstone",
                title: "Capstone Penetration Test",
                description:
                    "Complete an end-to-end authorized penetration-testing engagement and submit professional evidence and reporting.",
                required: true
            },

            {
                id: "career-path-certificate",
                type: "credential",
                title: "CWS Junior Penetration Tester Path Certificate",
                description:
                    "Awarded after every required course and the capstone have been completed.",
                required: true
            }

        ]

    },


    "web-application-pentester": {

        id:
            "web-application-pentester",

        title:
            "Web Application Pentester",

        shortTitle:
            "Web Pentester",

        category:
            "Application Security",

        level:
            "Intermediate",

        order:
            30,

        displayOrder:
            3,

        icon:
            "fa-solid fa-code",

        description:
            "Specialize in web application testing after completing the core offensive-security foundations.",

        estimatedTime:
            "Self-paced",

        status:
            "planned",

        stages: [
            {
                id: "ethical-hacking",
                type: "course",
                courseId: "ethical-hacking",
                required: true
            },
            {
                id: "web-application-security",
                type: "course",
                courseId: "web-application-security",
                required: true
            },
            {
                id: "python-offensive-security",
                type: "course",
                courseId: "python-offensive-security",
                required: false
            },
            {
                id: "web-capstone",
                type: "capstone",
                title: "Web Application Pentesting Capstone",
                required: true,
                status: "planned"
            }
        ]

    },


    "active-directory-pentester": {

        id:
            "active-directory-pentester",

        title:
            "Active Directory Pentester",

        shortTitle:
            "AD Pentester",

        category:
            "Enterprise Security",

        level:
            "Intermediate to Advanced",

        order:
            40,

        displayOrder:
            4,

        icon:
            "fa-solid fa-building-shield",

        description:
            "Develop enterprise Windows and Active Directory attack-path analysis skills in controlled lab environments.",

        estimatedTime:
            "Self-paced",

        status:
            "planned",

        stages: [
            {
                id: "windows-fundamentals",
                type: "course",
                courseId: "windows-fundamentals",
                required: true
            },
            {
                id: "active-directory-fundamentals",
                type: "course",
                courseId: "active-directory-fundamentals",
                required: true
            },
            {
                id: "ethical-hacking",
                type: "course",
                courseId: "ethical-hacking",
                required: true
            },
            {
                id: "active-directory-security-pentesting",
                type: "course",
                courseId: "active-directory-security-pentesting",
                required: true
            },
            {
                id: "ad-capstone",
                type: "capstone",
                title: "Active Directory Pentesting Capstone",
                required: true,
                status: "planned"
            }
        ]

    }

};


/* =========================================================
   SORTED PATH ACCESS
========================================================= */

export function getLearningPaths() {

    return Object.values(
        learningPaths
    )
        .sort(
            (a, b) =>
                Number(
                    a.displayOrder ||
                    a.order ||
                    999
                ) -
                Number(
                    b.displayOrder ||
                    b.order ||
                    999
                )
        );

}


export function getLearningPath(
    pathId
) {

    return (
        learningPaths[
            String(pathId || "")
                .trim()
                .toLowerCase()
        ] ||
        null
    );

}
