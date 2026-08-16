/* =========================================================
   CWS ACADEMY
   LINUX PRIVILEGE ESCALATION
========================================================= */

export const linuxPrivilegeEscalation = {

    id:
        "linux-privilege-escalation",

    title:
        "Linux Privilege Escalation",

    overviewTitle:
        "Linux Privilege Escalation",

    category:
        "CWS ACADEMY • LINUX SECURITY • PRO",

    level:
        "Advanced",

    levelKey:
        "advanced",

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
        "fa-brands fa-linux",

    description:
        "Analyze Linux privilege boundaries, sudo rules, SUID binaries, services, scheduled tasks and configuration weaknesses in authorized labs.",

    longDescription:
        "Linux Privilege Escalation teaches a structured and controlled methodology for reviewing local Linux security weaknesses, validating approved escalation paths and documenting defensive remediation.",

    duration:
        "20–28 hours",

    objectives: [
        "Understand Linux privilege boundaries and escalation prerequisites.",

        "Identify risky Linux permission configurations.",

        "Assess sudo configuration for unnecessary privilege exposure.",

        "Understand SUID/SGID behavior and associated risk.",

        "Assess privileged services for local security weaknesses.",

        "Identify insecure scheduled-task configurations.",

        "Recognize common local credential-exposure risks.",

        "Complete and report on a controlled Linux privilege-escalation lab."
    ],

    modules: [
        {
            id:
                "module-01",

            number:
                1,

            title:
                "Linux Privilege Boundaries",

            description:
                "Understand users, groups, root and privilege separation.",

            access:
                "pro",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Users and Groups",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Linux permissions and group membership define many local access boundaries."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Root and sudo",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Root has broad system control while sudo delegates selected administrative actions."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Privilege Escalation Methodology",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "A structured review begins with enumeration, evidence and safe validation."
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
                "Permission Misconfigurations",

            description:
                "Review insecure file and directory permissions.",

            access:
                "pro",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "World-Writable Paths",

                    duration:
                        "30 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Writable files and directories can become dangerous when privileged processes trust them."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Ownership and Groups",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Unexpected ownership or group access can expose sensitive resources."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Sensitive Files",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Configuration, credential and key files should have restrictive permissions."
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
                "sudo Security",

            description:
                "Analyze delegated command privileges and unsafe sudo rules.",

            access:
                "pro",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Reading sudo Rules",

                    duration:
                        "30 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Authorized users can review their delegated sudo capabilities."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Dangerous Delegation Patterns",

                    duration:
                        "30 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Some delegated programs can perform broader actions than administrators intend."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Hardening sudo",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Least privilege and explicit command paths reduce sudo-related risk."
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
                "SUID and SGID",

            description:
                "Understand special permission bits and their security implications.",

            access:
                "pro",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Special Permission Bits",

                    duration:
                        "30 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "SUID and SGID can cause programs to run with different effective identities."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Inventory and Review",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Security assessments should inventory unusual privileged binaries."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Risk Validation",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Validation should remain controlled and avoid unnecessary system changes."
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
                "Services and Processes",

            description:
                "Review privileged services, processes and configuration.",

            access:
                "pro",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Running Services",

                    duration:
                        "30 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Privileged services expand the local attack surface."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Service Configuration",

                    duration:
                        "30 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Writable service configuration or executable paths can create risk."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Process Environment",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Environment and startup settings should not allow untrusted modification."
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
                "Scheduled Tasks",

            description:
                "Analyze cron and scheduled execution paths.",

            access:
                "pro",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "cron Fundamentals",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "cron executes commands on schedules and may run them with elevated privileges."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Writable Scripts and Paths",

                    duration:
                        "30 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Scheduled tasks should not depend on files writable by lower-privileged users."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Defensive Review",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Scheduled jobs should be inventoried and assigned least privilege."
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
                "Credentials and Secrets",

            description:
                "Review local exposure of credentials, keys and tokens.",

            access:
                "pro",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Configuration Secrets",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Applications may store credentials in configuration files or environment variables."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "SSH Keys",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Private keys require strict permissions and controlled distribution."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "History and Temporary Files",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Command history and temporary files can expose sensitive information."
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
                "Linux Privilege Escalation Capstone",

            description:
                "Perform a structured local-security review in an isolated lab.",

            access:
                "pro",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Enumeration Plan",

                    duration:
                        "20 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Students define a repeatable local-enumeration checklist."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Controlled Validation",

                    duration:
                        "90 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Students identify and safely validate approved privilege-escalation paths in a training VM."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Remediation Report",

                    duration:
                        "45 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Students document root causes and practical hardening recommendations."
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
