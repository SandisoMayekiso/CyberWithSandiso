/* =========================================================
   CWS ACADEMY
   LEARNING / CAREER PATH REGISTRY
   File: data/learning-paths.js
========================================================= */

export const learningPaths = {

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
                id: "capstone-penetration-test",
                type: "capstone",
                title: "Capstone Penetration Test",
                description:
                    "Complete an end-to-end authorized penetration-testing scenario and produce a professional findings report.",
                required: true,
                status: "coming-soon"
            },

            {
                id: "career-path-certificate",
                type: "credential",
                title: "CWS Career Path Certificate",
                description:
                    "Awarded after every required course and the final capstone have been completed.",
                required: true
            }

        ]

    }

};


export function getLearningPaths() {

    return Object.values(
        learningPaths
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
