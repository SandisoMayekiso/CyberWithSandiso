/* =========================================================
   CWS ACADEMY
   WEB APPLICATION SECURITY
   PRO COURSE - COMING SOON
========================================================= */

export const webApplicationSecurity = {

    id:
        "web-application-security",

    title:
        "Web Application Security",

    overviewTitle:
        "Web Application Security",

    category:
        "CWS ACADEMY • WEB SECURITY • PRO",

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
        "fa-solid fa-globe",

    description:
        "Learn how web applications communicate and explore authentication, sessions, input validation and common application security weaknesses.",

    longDescription:
        "Web Application Security teaches students how to assess the security boundaries of modern web applications in authorized environments. The course covers HTTP, application mapping, authentication, sessions, input validation, injection concepts, cross-site scripting, authorization, security configuration and professional reporting.",

    duration:
        "20–30 hours",

    labs:
        8,

    assessments:
        8,

    objectives: [

        "Understand web application architecture, HTTP and application trust boundaries.",

        "Map application functionality, endpoints, roles and user-controlled input.",

        "Review authentication, password recovery and MFA controls.",

        "Assess session-management and cookie-security controls.",

        "Understand injection risks and safe input-handling practices.",

        "Recognize cross-site scripting and browser-side security weaknesses.",

        "Evaluate object-level, role-based and function-level authorization.",

        "Review security headers, TLS, error handling and information exposure.",

        "Complete a structured web application security capstone in an authorized lab."

    ],

    modules: [

        {
            id:
                "module-01",

            number:
                1,

            title:
                "Web Application Foundations",

            description:
                "Understand how modern web applications communicate and where security boundaries exist.",

            access:
                "pro",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "How Web Applications Work",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Web applications combine browsers, servers, APIs, databases and supporting services. Understanding these components and their trust relationships is essential before testing security."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "HTTP Requests and Responses",

                    duration:
                        "30 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "HTTP requests and responses carry methods, URLs, headers, cookies, parameters and message bodies that define how clients and servers communicate."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

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
                                "Application mapping identifies pages, endpoints, forms, APIs, workflows, roles and user-controlled inputs so testing can be systematic."
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
                "Authentication Security",

            description:
                "Explore login workflows, password handling, account recovery and multi-factor authentication from a defensive testing perspective.",

            access:
                "pro",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Authentication Workflows",

                    duration:
                        "30 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Authentication workflows should correctly verify identity while limiting information leakage, automated abuse and bypass opportunities."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Password and Recovery Controls",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Password-reset and account-recovery functions are security-critical because weak recovery controls can undermine an otherwise strong login process."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Multi-Factor Authentication",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "MFA adds an additional verification factor, but implementations should still be reviewed for enrollment, recovery, fallback and session-handling weaknesses."
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
                "Session Management",

            description:
                "Learn how applications create, protect and terminate authenticated sessions.",

            access:
                "pro",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Cookies and Session Tokens",

                    duration:
                        "30 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Session tokens represent authenticated state and should be unpredictable, protected during transport and stored using appropriate browser security attributes."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Session Lifecycle",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Secure applications manage session creation, renewal, timeout and logout consistently so old or stolen sessions cannot remain valid indefinitely."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Session Security Review",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "A session review examines cookie settings, token handling, logout behavior, timeout controls and whether sensitive transitions require additional verification."
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
                "Input Validation and Injection",

            description:
                "Understand why untrusted input must be validated and how injection weaknesses can emerge.",

            access:
                "pro",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Trust Boundaries and User Input",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Every point where user-controlled data enters an application should be treated as a trust boundary and handled according to the context in which the data will be used."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "SQL Injection Concepts",

                    duration:
                        "30 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "SQL injection can occur when untrusted input is incorporated into database queries unsafely. Parameterized queries and correct data-access patterns are key defenses."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Command and Interpreter Injection",

                    duration:
                        "30 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Applications that pass untrusted data to operating-system commands or interpreters can create serious security risk when separation and validation controls are weak."
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
                "Cross-Site Scripting and Browser Security",

            description:
                "Explore browser-side trust boundaries, output encoding and script injection risks.",

            access:
                "pro",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Understanding XSS",

                    duration:
                        "30 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Cross-site scripting occurs when untrusted data is interpreted by a browser as executable script in a context where it should have remained data."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Stored, Reflected and DOM-Based XSS",

                    duration:
                        "30 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "XSS can appear through server responses, persisted content or client-side DOM processing. Each form requires understanding where untrusted input reaches an executable browser context."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Preventing XSS",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Context-aware output encoding, safe templating, input handling and browser controls such as Content Security Policy help reduce XSS risk."
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
                "Authorization and Access Control",

            description:
                "Learn how broken authorization can expose data or functionality to the wrong users.",

            access:
                "pro",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Authentication vs Authorization",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Authentication establishes who a user is, while authorization determines what that user is permitted to access or perform."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Object-Level Authorization",

                    duration:
                        "30 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Applications should verify authorization on every sensitive object request rather than assuming that knowing or changing an identifier grants access."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Role and Function-Level Access",

                    duration:
                        "30 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Administrative and privileged functions should enforce authorization on the server side for every request."
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
                "Web Security Configuration",

            description:
                "Review security headers, error handling, transport security and common configuration weaknesses.",

            access:
                "pro",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Security Headers",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "HTTP security headers can help browsers enforce safer behavior for content loading, framing, transport and other browser security boundaries."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "TLS and Secure Transport",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Sensitive web traffic should use properly configured TLS so credentials, sessions and application data are protected while in transit."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Error Handling and Information Exposure",

                    duration:
                        "25 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Verbose errors, debug information and unnecessary technology details can reveal useful information to attackers and should be minimized in production."
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
                "Web Application Security Capstone",

            description:
                "Apply a structured application-security review to an authorized CWS Academy training application.",

            access:
                "pro",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Testing Plan and Scope",

                    duration:
                        "20 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "The capstone begins by defining application scope, roles, test accounts, permitted techniques and evidence requirements."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Conducting the Web Assessment",

                    duration:
                        "2–3 hours",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Students map functionality and review authentication, sessions, input handling and authorization within a controlled training environment."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Web Security Report",

                    duration:
                        "60 min",

                    access:
                        "pro",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Students document validated findings, impact, evidence, remediation recommendations and an executive summary."
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
