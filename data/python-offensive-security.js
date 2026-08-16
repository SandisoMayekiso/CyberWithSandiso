/* =========================================================
   CWS ACADEMY
   PYTHON FOR OFFENSIVE SECURITY
========================================================= */

export const pythonOffensiveSecurity = {

    id:
        "python-offensive-security",

    title:
        "Python for Offensive Security",

    overviewTitle:
        "Python for Offensive Security",

    category:
        "CWS ACADEMY • OFFENSIVE PYTHON • PRO",

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
        "fa-brands fa-python",

    description:
        "Use Python to automate reconnaissance, interact with HTTP services, process security data and build controlled offensive-security tooling.",

    longDescription:
        "Python for Offensive Security focuses on building safe, scoped automation for authorized security assessments, including HTTP, sockets, reconnaissance data processing, API workflows and tooling reliability.",

    duration:
        "20–28 hours",

    objectives: [
        "Understand how Python supports authorized offensive-security workflows.",

        "Automate authorized HTTP workflows with Python.",

        "Automate collection and organization of reconnaissance data.",

        "Apply basic network programming to authorized security labs.",

        "Process security-tool output programmatically.",

        "Automate non-destructive API security checks in approved environments.",

        "Test and harden custom security automation.",

        "Build and document an authorized offensive-security automation project."
    ],

    modules: [
        {
            id:
                "module-01",

            number:
                1,

            title:
                "Offensive Python Foundations",

            description:
                "Prepare Python for authorized offensive-security automation.",

            access:
                "pro",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Workflow Automation",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Python can reduce repetitive work in authorized assessments by collecting, normalizing and processing technical data."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Safe Tool Design",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Security tools should enforce scope, validate input and avoid destructive defaults."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Project Structure",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Clear structure makes small security tools easier to test, maintain and explain."
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
                "module-02",

            number:
                2,

            title:
                "HTTP Automation",

            description:
                "Automate approved web requests and response analysis.",

            access:
                "pro",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Request Sessions",

                    duration:
                        "30 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Reusable HTTP sessions can maintain headers, cookies and connection state."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Response Parsing",

                    duration:
                        "30 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Scripts can extract status codes, headers and structured response data."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Rate and Scope Controls",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Automation should include limits that keep requests inside approved scope."
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
                "Reconnaissance Automation",

            description:
                "Organize authorized reconnaissance data with Python.",

            access:
                "pro",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Target Inputs",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Reliable tools accept explicit targets and validate them before use."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Result Normalization",

                    duration:
                        "30 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Normalized output makes data from multiple tools easier to compare."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Exporting Findings",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Results can be written to JSON, CSV or text for later analysis."
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
                "Network Programming",

            description:
                "Use sockets and protocols inside controlled labs.",

            access:
                "pro",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "TCP Clients",

                    duration:
                        "30 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "TCP clients can communicate with known lab services for protocol learning."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Banner Collection",

                    duration:
                        "30 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Controlled banner collection can help identify services and versions."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Timeouts and Concurrency Concepts",

                    duration:
                        "30 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Network automation should handle slow hosts and bounded concurrency carefully."
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
                "Security Data Processing",

            description:
                "Parse scanner, log and enumeration output.",

            access:
                "pro",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Parsing Text Output",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Structured parsing reduces manual copy-and-paste work."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Working with JSON Results",

                    duration:
                        "30 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Many APIs and tools return JSON that Python can process directly."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Deduplication and Prioritization",

                    duration:
                        "30 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Automation can group repeated findings and highlight important records."
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
                "API Security Automation",

            description:
                "Build small helpers for approved API security reviews.",

            access:
                "pro",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "API Authentication",

                    duration:
                        "30 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Scripts can manage tokens and headers for authorized test accounts."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Schema and Endpoint Mapping",

                    duration:
                        "30 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Automation can organize known endpoints and expected behaviors."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Evidence Capture",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Tools can save sanitized response evidence for reporting."
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
                "Tool Reliability and Testing",

            description:
                "Make small security tools predictable and maintainable.",

            access:
                "pro",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Input Validation",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Security tools should reject invalid targets and parameters early."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Error Handling",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Clear errors help users understand network, authentication and parsing failures."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Unit Testing Concepts",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Small tests reduce regressions when tools evolve."
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
                "module-08",

            number:
                8,

            title:
                "Offensive Security Tooling Project",

            description:
                "Build a controlled Python security automation project.",

            access:
                "pro",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Project Scope",

                    duration:
                        "20 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Students define an approved use case and explicit safety boundaries."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Implementation",

                    duration:
                        "90 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Students build a small tool using HTTP, sockets or data-processing concepts."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Documentation and Demo",

                    duration:
                        "30 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "The final project explains purpose, usage, limitations and safe operation."
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
