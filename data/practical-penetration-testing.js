/* =========================================================
   CWS ACADEMY
   PRACTICAL PENETRATION TESTING
   PRO COURSE
========================================================= */

export const practicalPenetrationTesting = {

    id:
        "practical-penetration-testing",

    title:
        "Practical Penetration Testing",

    category:
        "CWS ACADEMY • PENTESTING",

    level:
        "Advanced",

    levelKey:
        "advanced",

    status:
        "available",

    access:
        "pro",

    icon:
        "fa-solid fa-user-secret",

    description:
        "Bring reconnaissance, enumeration, vulnerability analysis, controlled validation and professional reporting together in structured laboratory work.",

    longDescription:
        "Practical Penetration Testing is an advanced CWS Academy course designed to bring together the core skills used during authorized security assessments. Students work through structured penetration-testing methodology, target scoping, reconnaissance, enumeration, vulnerability analysis, controlled validation, evidence handling and professional reporting. The course emphasizes legal authorization, safe testing boundaries, reproducible methodology and clear communication of security findings.",

    duration:
        "30–40 hours",

    labs:
        8,

    assessments:
        10,

    objectives: [

        "Understand the full penetration-testing lifecycle from scoping to reporting.",

        "Apply structured reconnaissance and enumeration methodologies.",

        "Analyze discovered services and identify likely security weaknesses.",

        "Use vulnerability information to prioritize validation activities.",

        "Perform controlled security validation inside authorized lab environments.",

        "Document evidence in a clear and reproducible way.",

        "Understand the importance of scope, authorization and rules of engagement.",

        "Differentiate vulnerability discovery from exploitation and impact validation.",

        "Write professional penetration-testing findings with remediation guidance.",

        "Complete an end-to-end penetration-testing capstone in a controlled environment."

    ],

    modules: [

        {
            id:
                "module-01",

            number:
                1,

            title:
                "Penetration Testing Methodology",

            description:
                "Understand the professional penetration-testing lifecycle, authorization, scope, objectives and rules of engagement.",

            access:
                "pro",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "What Is Penetration Testing?",

                    duration:
                        "20 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Penetration testing is an authorized security assessment that attempts to identify and validate weaknesses in systems, applications or networks. The goal is not simply to discover vulnerabilities, but to understand which weaknesses are realistically important and how they could affect the organization."
                        },
                        {
                            type:
                                "paragraph",

                            text:
                                "A professional penetration test is performed under clearly defined authorization. Before testing begins, the tester should understand the target environment, permitted testing techniques, excluded systems, time windows, communication procedures and reporting expectations."
                        },
                        {
                            type:
                                "note",

                            title:
                                "CWS Principle",

                            text:
                                "All practical exercises in this course should be performed only against systems you own or environments where you have explicit authorization to test."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Scope and Rules of Engagement",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Scope defines exactly what is included in an assessment. It may specify IP addresses, domains, applications, cloud environments, user accounts or other assets that the tester is allowed to evaluate."
                        },
                        {
                            type:
                                "paragraph",

                            text:
                                "Rules of engagement define how testing may be performed. They may include restrictions on social engineering, denial-of-service testing, credential attacks, persistence, destructive techniques and production-system interaction."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Building a Testing Workflow",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "A repeatable workflow helps prevent missed steps and keeps testing organized. A common workflow includes preparation, reconnaissance, discovery, enumeration, vulnerability analysis, controlled validation, evidence collection and reporting."
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
                "Reconnaissance and Attack Surface Mapping",

            description:
                "Learn how security professionals identify externally visible assets and build a structured view of the target environment.",

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
                                "Passive reconnaissance gathers information without directly interacting with the target systems. Sources may include DNS records, public documentation, certificate transparency data, public repositories and organization-owned web resources."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Active Discovery",

                    duration:
                        "30 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Active discovery interacts directly with authorized targets to identify reachable systems and exposed services. In a penetration test, this stage should follow the approved scope and testing limits."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Attack Surface Documentation",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Attack surface mapping organizes discovered hosts, services, applications and trust relationships so later testing can be prioritized intelligently."
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
                "Service Enumeration",

            description:
                "Develop a disciplined process for identifying services, versions, protocols and exposed functionality.",

            access:
                "pro",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Understanding Enumeration",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Enumeration turns a list of open ports into useful security information by identifying what services are running, how they are configured and what interfaces they expose."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Network Service Analysis",

                    duration:
                        "35 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Common services such as HTTP, SSH, DNS, SMB and database services should be assessed methodically. The tester should document service versions, authentication requirements, exposed functionality and signs of weak configuration."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Enumeration Notes and Evidence",

                    duration:
                        "20 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Good enumeration notes make later analysis easier. Record timestamps, targets, tools, observations and relevant output so findings can be reproduced."
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
                "Vulnerability Analysis",

            description:
                "Learn how to combine scanner results, service information and manual analysis to identify meaningful security weaknesses.",

            access:
                "pro",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "From Enumeration to Vulnerability Analysis",

                    duration:
                        "30 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Vulnerability analysis connects discovered technologies and configurations to known weaknesses. Scanner output is useful, but it must be interpreted carefully and validated against the actual environment."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Prioritizing Findings",

                    duration:
                        "30 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Not every vulnerability has the same importance. Prioritization should consider exposure, exploitability, affected assets, existing controls and potential business impact."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "False Positives and Manual Validation",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Automated scanners can produce false positives. Manual validation helps determine whether a reported weakness is actually present and whether it is relevant to the target."
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
                "Controlled Validation",

            description:
                "Learn how to validate security weaknesses safely and within the approved rules of engagement.",

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
                                "A penetration tester does not always need to fully exploit a weakness. Controlled validation should prove enough to demonstrate the security impact while minimizing unnecessary risk to the environment."
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
                                "Before validating a vulnerability, consider whether the action could disrupt availability, modify data, expose sensitive information or affect systems outside the approved scope."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Documenting Validation Evidence",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Evidence should clearly demonstrate the issue without collecting unnecessary sensitive data. Screenshots, sanitized output and concise reproduction notes are often sufficient."
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
                "Web and Application Testing Workflow",

            description:
                "Apply structured penetration-testing methodology to web applications and exposed application services.",

            access:
                "pro",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Mapping Application Functionality",

                    duration:
                        "30 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Application testing starts by understanding how the application behaves, which pages and endpoints exist, how users authenticate and where user-controlled input enters the system."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Authentication and Session Review",

                    duration:
                        "30 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Authentication and session controls are critical security boundaries. A penetration tester evaluates how credentials, sessions, authorization decisions and account states are handled."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Input and Authorization Testing",

                    duration:
                        "30 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Testing should identify whether user-controlled input is handled safely and whether users can access functionality or resources beyond their intended permissions."
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
                "Evidence and Note Taking",

            description:
                "Learn how professional testers organize notes, screenshots, commands and observations during an engagement.",

            access:
                "pro",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Why Notes Matter",

                    duration:
                        "20 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Penetration tests generate large amounts of information. Structured note taking helps the tester remember what was tested, reproduce findings and support the final report."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Evidence Quality",

                    duration:
                        "20 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Good evidence should be clear, relevant and minimal. It should demonstrate the weakness without exposing more sensitive information than necessary."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Maintaining a Finding Log",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "A finding log can track each potential issue, affected asset, evidence collected, severity, validation state and remediation notes."
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
                "Risk and Severity",

            description:
                "Understand how technical findings are translated into risk and business impact.",

            access:
                "pro",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Technical Severity vs Business Risk",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "A vulnerability can have high technical severity but limited real-world impact depending on exposure, compensating controls and the importance of the affected asset."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Communicating Impact",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Security findings should explain what could happen if the weakness were abused, which systems or data could be affected and why the issue matters to the organization."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Remediation Prioritization",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Effective remediation guidance should be practical, prioritized and connected to the root cause of the weakness rather than only describing a symptom."
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
                "module-09",

            number:
                9,

            title:
                "Professional Penetration Testing Reports",

            description:
                "Turn technical evidence into clear findings, remediation guidance and executive-level reporting.",

            access:
                "pro",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Structure of a Pentest Report",

                    duration:
                        "30 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "A professional report normally includes an executive summary, scope, methodology, limitations, findings, evidence, severity, remediation guidance and supporting appendices."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Writing Clear Findings",

                    duration:
                        "30 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "A good finding clearly explains what is wrong, where it was observed, why it matters, how it was validated and what should be done to correct it."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Executive Communication",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Executives usually need a concise explanation of overall risk, major themes, critical findings and recommended priorities rather than raw technical output."
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
                "module-10",

            number:
                10,

            title:
                "Penetration Testing Capstone",

            description:
                "Complete a structured end-to-end penetration-testing engagement inside an authorized CWS Academy lab environment.",

            access:
                "pro",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Capstone Briefing",

                    duration:
                        "20 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "The capstone brings together the full course workflow. Students receive a defined scope, objectives and testing boundaries for a controlled training environment."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Conducting the Assessment",

                    duration:
                        "2–4 hours",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Students perform reconnaissance, service discovery, enumeration, vulnerability analysis and controlled validation while maintaining organized notes and evidence."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Final Report and Review",

                    duration:
                        "60 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "The final exercise requires students to convert their observations into a structured penetration-testing report with findings, impact statements, evidence and remediation recommendations."
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
