/* =========================================================
   CWS ACADEMY
   CYBERSECURITY FUNDAMENTALS
========================================================= */


function lesson(
    id,
    title,
    duration = "20 minutes",
    extra = {}
) {

    return {

        id,
        title,

        duration,

        type: "Lesson",

        subtitle:
            extra.subtitle ||
            `Learn the core concepts behind ${title}.`,

        icon:
            extra.icon ||
            "fa-solid fa-shield-halved",

        objectives:
            extra.objectives || [
                `Understand ${title}.`,
                "Recognize its cybersecurity importance.",
                "Apply the concept to basic security scenarios."
            ],

        introduction:
            extra.introduction || `
                <h2>${title}</h2>

                <p>
                    This lesson introduces ${title} and explains
                    why the concept is important to cybersecurity
                    professionals.
                </p>
            `,

        body:
            extra.body || `
                <h2>Understanding ${title}</h2>

                <p>
                    This topic forms part of your Cybersecurity
                    Fundamentals learning path. Study the key
                    concepts carefully before continuing to the
                    next lesson.
                </p>

                <div class="lesson-callout">

                    <div class="lesson-callout-icon">
                        <i class="fa-solid fa-lightbulb"></i>
                    </div>

                    <div>

                        <strong>
                            CWS Academy
                        </strong>

                        <p>
                            More practical examples and exercises
                            can be added to this lesson as the
                            course develops.
                        </p>

                    </div>

                </div>
            `,

        keyConcepts:
            extra.keyConcepts || [],

        quiz:
            extra.quiz || []

    };

}


export const cybersecurityFundamentals = {

    id:
        "cybersecurity-fundamentals",

    title:
        "Cybersecurity Fundamentals",

    category:
        "CWS ACADEMY • CYBERSECURITY",

    level:
        "Beginner",

    levelKey:
        "beginner",

    status:
        "available",

    icon:
        "fa-solid fa-shield-halved",

    description:
        "Build a strong foundation in cybersecurity concepts, threats, vulnerabilities, security controls and ethical security practices.",

    longDescription:
        "Cybersecurity Fundamentals introduces the core concepts students need before progressing into networking, Linux, defensive security, ethical hacking and penetration testing.",

    duration:
        "20–25 Hours",

    objectives: [

        "Understand core cybersecurity principles.",

        "Explain confidentiality, integrity and availability.",

        "Identify common cybersecurity threats.",

        "Understand vulnerabilities and cybersecurity risk.",

        "Recognize common security controls.",

        "Understand authentication and access control.",

        "Understand network and endpoint security concepts.",

        "Recognize security policies and ethical responsibilities.",

        "Apply cybersecurity concepts to practical scenarios."

    ],


    modules: [

        {
            id: "module-01",

            number: 1,

            title:
                "Introduction to Cybersecurity",

            description:
                "Understand cybersecurity, digital assets, threats, vulnerabilities and the role of security professionals.",

            labs: 0,

            assessments: 1,

            lessons: [

                lesson(
                    "lesson-01",
                    "What Is Cybersecurity?",
                    "20 minutes",
                    {
                        subtitle:
                            "Understand cybersecurity and why protecting digital systems matters.",

                        objectives: [

                            "Define cybersecurity.",

                            "Understand what cybersecurity protects.",

                            "Recognize common digital assets.",

                            "Understand the relationship between threats, vulnerabilities and risk."

                        ],

                        introduction: `
                            <h2>What Is Cybersecurity?</h2>

                            <p>
                                Cybersecurity is the practice of protecting
                                computers, networks, applications, services
                                and information from unauthorized access,
                                disruption, manipulation or destruction.
                            </p>

                            <p>
                                Modern organizations depend heavily on digital
                                systems. Protecting those systems therefore
                                becomes essential to business operations,
                                privacy and public trust.
                            </p>
                        `,

                        body: `
                            <h2>What Does Cybersecurity Protect?</h2>

                            <p>
                                Cybersecurity protects digital assets such as
                                computers, servers, networks, applications,
                                databases and user accounts.
                            </p>

                            <h3>Assets</h3>

                            <p>
                                An asset is something that has value and needs
                                protection.
                            </p>

                            <h3>Threats</h3>

                            <p>
                                A threat is something capable of causing harm
                                to an asset.
                            </p>

                            <h3>Vulnerabilities</h3>

                            <p>
                                A vulnerability is a weakness that could be
                                exploited by a threat.
                            </p>

                            <h3>Risk</h3>

                            <p>
                                Cybersecurity risk considers the likelihood
                                and potential impact of a threat exploiting
                                a vulnerability.
                            </p>
                        `,

                        keyConcepts: [

                            {
                                title: "Asset",

                                description:
                                    "Something valuable that an organization needs to protect."
                            },

                            {
                                title: "Threat",

                                description:
                                    "Something capable of causing harm."
                            },

                            {
                                title: "Vulnerability",

                                description:
                                    "A weakness that may be exploited."
                            },

                            {
                                title: "Risk",

                                description:
                                    "The potential impact and likelihood of a security event."
                            }

                        ],

                        quiz: [

                            {
                                question:
                                    "What is a vulnerability?",

                                options: [

                                    "A valuable digital asset",

                                    "A weakness that could be exploited",

                                    "A security policy",

                                    "A backup system"

                                ],

                                answer: 1
                            }

                        ]

                    }
                ),

                lesson(
                    "lesson-02",
                    "Why Cybersecurity Matters"
                ),

                lesson(
                    "lesson-03",
                    "Cybersecurity Roles and Domains"
                ),

                lesson(
                    "lesson-04",
                    "Security Mindset and Ethics"
                )

            ]

        },


        {
            id: "module-02",

            number: 2,

            title:
                "The CIA Triad",

            description:
                "Learn confidentiality, integrity and availability.",

            labs: 0,

            assessments: 1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Introduction to the CIA Triad"
                ),

                lesson(
                    "lesson-02",
                    "Confidentiality"
                ),

                lesson(
                    "lesson-03",
                    "Integrity"
                ),

                lesson(
                    "lesson-04",
                    "Availability"
                )

            ]

        },


        {
            id: "module-03",

            number: 3,

            title:
                "Threats and Attack Types",

            description:
                "Explore malware, social engineering and common cyber attacks.",

            labs: 1,

            assessments: 1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Understanding Cyber Threats"
                ),

                lesson(
                    "lesson-02",
                    "Malware"
                ),

                lesson(
                    "lesson-03",
                    "Phishing and Social Engineering"
                ),

                lesson(
                    "lesson-04",
                    "Denial-of-Service Attacks"
                ),

                lesson(
                    "lesson-05",
                    "Threat Actors"
                )

            ]

        },


        {
            id: "module-04",

            number: 4,

            title:
                "Vulnerabilities and Risk",

            description:
                "Understand vulnerabilities, exploits and cybersecurity risk.",

            labs: 1,

            assessments: 1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Understanding Vulnerabilities"
                ),

                lesson(
                    "lesson-02",
                    "Exploits"
                ),

                lesson(
                    "lesson-03",
                    "Cybersecurity Risk"
                ),

                lesson(
                    "lesson-04",
                    "Risk Treatment"
                )

            ]

        },


        {
            id: "module-05",

            number: 5,

            title:
                "Security Controls",

            description:
                "Understand technical, administrative and physical security controls.",

            labs: 1,

            assessments: 1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Introduction to Security Controls"
                ),

                lesson(
                    "lesson-02",
                    "Technical Controls"
                ),

                lesson(
                    "lesson-03",
                    "Administrative Controls"
                ),

                lesson(
                    "lesson-04",
                    "Physical Controls"
                )

            ]

        },


        {
            id: "module-06",

            number: 6,

            title:
                "Authentication and Access Control",

            description:
                "Learn authentication, authorization, MFA and least privilege.",

            labs: 1,

            assessments: 1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Authentication"
                ),

                lesson(
                    "lesson-02",
                    "Authorization"
                ),

                lesson(
                    "lesson-03",
                    "Multi-Factor Authentication"
                ),

                lesson(
                    "lesson-04",
                    "Least Privilege"
                ),

                lesson(
                    "lesson-05",
                    "Role-Based Access Control"
                )

            ]

        },


        {
            id: "module-07",

            number: 7,

            title:
                "Network Security Fundamentals",

            description:
                "Understand network security controls and traffic protection.",

            labs: 1,

            assessments: 1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Network Security Basics"
                ),

                lesson(
                    "lesson-02",
                    "Firewalls"
                ),

                lesson(
                    "lesson-03",
                    "IDS and IPS"
                ),

                lesson(
                    "lesson-04",
                    "Network Segmentation"
                ),

                lesson(
                    "lesson-05",
                    "Secure Network Protocols"
                )

            ]

        },


        {
            id: "module-08",

            number: 8,

            title:
                "Endpoint and System Security",

            description:
                "Explore system hardening, patching and endpoint protection.",

            labs: 0,

            assessments: 1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Endpoint Security"
                ),

                lesson(
                    "lesson-02",
                    "Patch Management"
                ),

                lesson(
                    "lesson-03",
                    "System Hardening"
                ),

                lesson(
                    "lesson-04",
                    "Endpoint Detection and Response"
                )

            ]

        },


        {
            id: "module-09",

            number: 9,

            title:
                "Security Policies and Ethics",

            description:
                "Understand policies, acceptable use and ethical security practice.",

            labs: 0,

            assessments: 1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Security Policies"
                ),

                lesson(
                    "lesson-02",
                    "Acceptable Use"
                ),

                lesson(
                    "lesson-03",
                    "Responsible Disclosure"
                ),

                lesson(
                    "lesson-04",
                    "Cybersecurity Ethics"
                )

            ]

        },


        {
            id: "module-10",

            number: 10,

            title:
                "Cybersecurity Foundations Review",

            description:
                "Review core concepts and complete the final assessment.",

            labs: 0,

            assessments: 1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Security Principles Review"
                ),

                lesson(
                    "lesson-02",
                    "Threats and Vulnerabilities Review"
                ),

                lesson(
                    "lesson-03",
                    "Defensive Controls Review"
                ),

                lesson(
                    "lesson-04",
                    "Scenario-Based Review"
                ),

                lesson(
                    "lesson-05",
                    "Course Review"
                )

            ]

        }

    ]

};
