/* =========================================================
   CWS ACADEMY
   ETHICAL HACKING FUNDAMENTALS
   PRO COURSE - COMING SOON
========================================================= */

export const ethicalHackingFundamentals = {

    id:
        "ethical-hacking-fundamentals",

    title:
        "Ethical Hacking Fundamentals",

    overviewTitle:
        "Ethical Hacking Fundamentals",

    category:
        "CWS ACADEMY • SECURITY • PRO",

    level:
        "Intermediate",

    levelKey:
        "intermediate",

    status:
        "planned",

    access:
        "pro",

    proOnly:
        true,

    locked:
        true,

    availability:
        "pro-coming-soon",

    availabilityLabel:
        "Pro Coming Soon",

    icon:
        "fa-solid fa-user-secret",

    description:
        "Explore the penetration testing methodology, reconnaissance, enumeration, vulnerability identification and security reporting.",

    longDescription:
        "Ethical Hacking Fundamentals introduces the structured workflow used during authorized security assessments. The course covers professional scope and ethics, reconnaissance, discovery, enumeration, vulnerability identification, authentication and access-control review, controlled validation, evidence handling and security reporting. All practical work is designed for systems you own or environments where you have explicit authorization to test.",

    duration:
        "20–30 hours",

    labs:
        6,

    assessments:
        8,

    objectives: [

        "Understand ethical hacking, authorization, scope and professional responsibilities.",

        "Apply structured reconnaissance and target-profiling methods.",

        "Perform host, service and application enumeration in authorized environments.",

        "Interpret vulnerability information and validate findings responsibly.",

        "Understand authentication, authorization and session-security weaknesses.",

        "Collect evidence while minimizing unnecessary risk and exposure.",

        "Prioritize findings according to technical severity and business context.",

        "Write clear security findings and practical remediation guidance.",

        "Complete an authorized ethical-hacking capstone in a controlled lab."

    ],

    modules: [

        {
            id:
                "module-01",

            number:
                1,

            title:
                "Ethical Hacking Foundations",

            description:
                "Understand ethical hacking, authorization, scope, professional conduct and the relationship between ethical hacking and penetration testing.",

            access:
                "pro",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "What Is Ethical Hacking?",

                    duration:
                        "20 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Ethical hacking is the authorized process of examining systems, networks and applications for security weaknesses so those weaknesses can be understood and corrected before they are abused."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Authorization, Scope and Ethics",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Every ethical hacking engagement requires explicit authorization, clear scope boundaries and agreed rules of engagement. Testing outside those boundaries can create technical, legal and operational risk."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "The Ethical Hacking Lifecycle",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "A structured ethical hacking lifecycle normally moves from preparation and reconnaissance through discovery, enumeration, vulnerability analysis, controlled validation and professional reporting."
                        }
                    ]
                }

            ],

            labs:
                0,

            assessments:
                1
        },


        {
            id:
                "module-02",

            number:
                2,

            title:
                "Reconnaissance and OSINT",

            description:
                "Learn how authorized security testers collect and organize information about a target before deeper testing begins.",

            access:
                "pro",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Passive Reconnaissance",

                    duration:
                        "30 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Passive reconnaissance collects useful information without directly interacting with the target environment. Sources may include public websites, DNS data, certificate records and public repositories."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Active Reconnaissance",

                    duration:
                        "30 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Active reconnaissance involves controlled interaction with in-scope systems to learn about reachable hosts, services and exposed infrastructure."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Building a Target Profile",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Reconnaissance findings should be organized into a clear target profile so later enumeration and vulnerability-analysis activities remain focused and reproducible."
                        }
                    ]
                }

            ],

            labs:
                1,

            assessments:
                1
        },


        {
            id:
                "module-03",

            number:
                3,

            title:
                "Network Discovery and Enumeration",

            description:
                "Build a disciplined workflow for identifying hosts, ports, protocols, services and exposed functionality.",

            access:
                "pro",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Host and Service Discovery",

                    duration:
                        "30 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Discovery identifies reachable systems and the services they expose. Ethical hackers record targets, ports, protocols and observations so later testing can be performed systematically."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Service Enumeration",

                    duration:
                        "35 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Enumeration turns basic discovery results into detailed technical information such as service types, versions, authentication methods and exposed interfaces."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Interpreting Enumeration Results",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Enumeration data becomes useful when it is compared with expected configurations, known weaknesses and the actual purpose of the service being assessed."
                        }
                    ]
                }

            ],

            labs:
                1,

            assessments:
                1
        },


        {
            id:
                "module-04",

            number:
                4,

            title:
                "Vulnerability Identification",

            description:
                "Learn how security weaknesses are identified, prioritized and validated without relying blindly on automated tools.",

            access:
                "pro",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Understanding Vulnerabilities",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "A vulnerability is a weakness that can negatively affect confidentiality, integrity or availability. Ethical hackers evaluate weaknesses in context rather than treating every scanner result as equally important."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Vulnerability Scanning",

                    duration:
                        "30 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Vulnerability scanners can accelerate discovery, but their findings must be reviewed carefully for false positives, missing context and relevance to the actual target."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Manual Validation and Prioritization",

                    duration:
                        "30 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Manual validation helps confirm whether a reported weakness is real, while prioritization considers exploitability, exposure, affected assets and likely impact."
                        }
                    ]
                }

            ],

            labs:
                1,

            assessments:
                1
        },


        {
            id:
                "module-05",

            number:
                5,

            title:
                "Authentication and Access Control Testing",

            description:
                "Understand common weaknesses in authentication, authorization, session handling and privilege boundaries.",

            access:
                "pro",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Authentication Security",

                    duration:
                        "30 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Authentication testing evaluates how identities are verified, how credentials are protected and whether security controls such as MFA and lockout mechanisms behave as intended."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Authorization and Privilege Boundaries",

                    duration:
                        "30 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Authorization testing examines whether users can access resources or actions beyond the permissions assigned to their account or role."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Session Security",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Session testing reviews how sessions are created, maintained, invalidated and protected from misuse."
                        }
                    ]
                }

            ],

            labs:
                1,

            assessments:
                1
        },


        {
            id:
                "module-06",

            number:
                6,

            title:
                "Controlled Security Validation",

            description:
                "Learn how ethical hackers demonstrate risk safely while minimizing unnecessary disruption or exposure.",

            access:
                "pro",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Validation vs Exploitation",

                    duration:
                        "30 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "The purpose of controlled validation is to gather enough evidence to demonstrate a weakness and its impact without performing unnecessary or destructive actions."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Safe Testing Decisions",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Before performing a validation step, the tester should consider scope, business impact, data exposure, service availability and whether a less risky method can provide sufficient evidence."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Evidence Collection",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Professional evidence should be relevant, reproducible and minimized. Screenshots, sanitized output and concise reproduction notes are often enough."
                        }
                    ]
                }

            ],

            labs:
                1,

            assessments:
                1
        },


        {
            id:
                "module-07",

            number:
                7,

            title:
                "Security Reporting",

            description:
                "Turn technical observations into clear findings, risk explanations and practical remediation guidance.",

            access:
                "pro",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Writing Security Findings",

                    duration:
                        "30 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "A strong finding explains what was observed, where it exists, why it matters, how it was validated and what should be done to reduce the risk."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Risk and Severity",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Severity should reflect more than a technical score. Exposure, exploitability, business context, affected data and compensating controls all influence risk."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Remediation Guidance",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Useful remediation guidance addresses the root cause of a weakness and gives defenders practical steps for reducing risk."
                        }
                    ]
                }

            ],

            labs:
                0,

            assessments:
                1
        },


        {
            id:
                "module-08",

            number:
                8,

            title:
                "Ethical Hacking Capstone",

            description:
                "Bring the complete ethical-hacking workflow together in an authorized CWS Academy training scenario.",

            access:
                "pro",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Engagement Briefing",

                    duration:
                        "20 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "The capstone begins with a defined scope, objectives, rules of engagement and evidence requirements."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Conducting the Assessment",

                    duration:
                        "2–3 hours",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Students apply reconnaissance, discovery, enumeration and vulnerability-analysis methods inside a controlled lab while maintaining organized notes."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Final Findings and Report",

                    duration:
                        "60 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Students convert their validated observations into a structured security report with findings, impact, evidence and remediation recommendations."
                        }
                    ]
                }

            ],

            labs:
                1,

            assessments:
                1
        }

    ]

};
