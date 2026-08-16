/* =========================================================
   CWS ACADEMY
   ACTIVE DIRECTORY FUNDAMENTALS
========================================================= */

export const activeDirectoryFundamentals = {

    id:
        "active-directory-fundamentals",

    title:
        "Active Directory Fundamentals",

    overviewTitle:
        "Active Directory Fundamentals",

    category:
        "CWS ACADEMY • WINDOWS IDENTITY",

    level:
        "Intermediate",

    levelKey:
        "intermediate",

    status:
        "available",

    access:
        "free",

    icon:
        "fa-solid fa-sitemap",

    description:
        "Understand domains, forests, domain controllers, users, groups, Group Policy, DNS, LDAP, Kerberos and core Windows identity concepts.",

    longDescription:
        "Active Directory Fundamentals explains the architecture, identities, authentication protocols and management concepts used in Windows domain environments and prepares students for advanced AD security labs.",

    duration:
        "22–30 hours",

    objectives: [
        "Understand Active Directory architecture and terminology.",

        "Understand users, computers, groups and their relationships.",

        "Use Organizational Units to structure and manage directory objects.",

        "Understand Group Policy processing and security relevance.",

        "Understand the relationship between DNS and Active Directory.",

        "Understand LDAP concepts and directory structure.",

        "Understand Kerberos authentication at a conceptual level.",

        "Understand domain authentication and authorization flow.",

        "Apply basic security principles to Active Directory environments.",

        "Plan and document a small Active Directory practice lab."
    ],

    modules: [
        {
            id:
                "module-01",

            number:
                1,

            title:
                "Active Directory Foundations",

            description:
                "Understand the purpose and architecture of Active Directory.",

            access:
                "free",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "What Is Active Directory?",

                    duration:
                        "25 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Active Directory provides centralized identity, authentication and management for Windows domain environments."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Domains, Trees and Forests",

                    duration:
                        "30 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Domains, trees and forests define logical boundaries and relationships in Active Directory."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Domain Controllers",

                    duration:
                        "25 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Domain controllers host directory services and participate in authentication and replication."
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
                "Users, Computers and Groups",

            description:
                "Learn how core directory objects are organized and managed.",

            access:
                "free",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "User Accounts",

                    duration:
                        "25 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "User objects represent identities and carry attributes used by authentication and authorization."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Computer Accounts",

                    duration:
                        "25 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Domain-joined computers have their own directory identities."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Security Groups",

                    duration:
                        "30 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Groups simplify permission assignment and access management across many users."
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
                "Organizational Units",

            description:
                "Organize directory objects using OUs and administrative boundaries.",

            access:
                "free",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Understanding OUs",

                    duration:
                        "25 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Organizational Units group directory objects for management and policy application."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Delegation Basics",

                    duration:
                        "25 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Delegation can distribute administrative responsibilities without granting full domain control."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Design Considerations",

                    duration:
                        "25 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "A clear OU structure makes policy and administration easier to understand and maintain."
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
                "Group Policy Fundamentals",

            description:
                "Understand how Group Policy configures users and computers.",

            access:
                "free",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "What Is Group Policy?",

                    duration:
                        "25 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Group Policy centrally manages configuration for domain users and computers."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "GPO Links and Scope",

                    duration:
                        "30 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Policies are linked to sites, domains or OUs and apply according to scope and processing rules."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Security Settings",

                    duration:
                        "30 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Group Policy can enforce password, firewall, audit and other important security settings."
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
                "DNS and Active Directory",

            description:
                "Understand why DNS is essential to domain operations.",

            access:
                "free",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "DNS in a Domain",

                    duration:
                        "25 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Active Directory relies heavily on DNS for locating domain services."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Service Records",

                    duration:
                        "25 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "SRV records help clients discover services such as LDAP and Kerberos endpoints."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Troubleshooting Basics",

                    duration:
                        "25 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Incorrect DNS configuration is a common cause of domain join and authentication problems."
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
                "LDAP Fundamentals",

            description:
                "Learn how directory data is represented and queried.",

            access:
                "free",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "What Is LDAP?",

                    duration:
                        "25 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "LDAP is a protocol used to access and manage directory information."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Distinguished Names",

                    duration:
                        "25 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Distinguished Names identify objects by their location in the directory hierarchy."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Attributes and Queries",

                    duration:
                        "25 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Directory objects expose attributes that can be queried by authorized users and applications."
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
                "Kerberos Fundamentals",

            description:
                "Understand ticket-based authentication in Windows domains.",

            access:
                "free",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Kerberos Overview",

                    duration:
                        "30 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Kerberos uses trusted tickets to authenticate identities without repeatedly sending passwords."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "TGTs and Service Tickets",

                    duration:
                        "30 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Ticket Granting Tickets and service tickets support authentication to domain services."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Why Time and DNS Matter",

                    duration:
                        "25 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Kerberos depends on correct time synchronization and service discovery."
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
                "Domain Authentication",

            description:
                "Connect identities, credentials, tickets and access decisions.",

            access:
                "free",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Interactive Logon",

                    duration:
                        "25 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Domain logon combines identity verification with local and domain policy."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Authentication vs Authorization",

                    duration:
                        "25 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Authentication proves identity while authorization determines permitted actions."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Credential Security",

                    duration:
                        "25 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Strong credential handling and least privilege reduce identity-related risk."
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
                "Active Directory Security Fundamentals",

            description:
                "Introduce common security principles for Windows domains.",

            access:
                "free",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Least Privilege",

                    duration:
                        "25 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Administrative rights should be limited to what each identity actually needs."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Tiered Administration Concepts",

                    duration:
                        "25 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Separating administrative contexts reduces the impact of credential compromise."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Auditing and Monitoring",

                    duration:
                        "25 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Directory changes and authentication events should be logged and reviewed."
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
                "Build a Small AD Lab",

            description:
                "Design a safe practice domain for future CWS Academy labs.",

            access:
                "free",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Lab Architecture",

                    duration:
                        "25 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "A basic lab can include one domain controller, one Windows client and an isolated virtual network."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Users, Groups and OUs",

                    duration:
                        "30 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Students create a simple logical structure for users, groups and computers."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Baseline Validation",

                    duration:
                        "30 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "The lab is validated by checking DNS, domain join, authentication and policy application."
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
