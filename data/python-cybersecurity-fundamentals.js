/* =========================================================
   CWS ACADEMY
   PYTHON FUNDAMENTALS FOR CYBERSECURITY
========================================================= */

export const pythonCybersecurityFundamentals = {

    id:
        "python-cybersecurity-fundamentals",

    title:
        "Python Fundamentals for Cybersecurity",

    overviewTitle:
        "Python Fundamentals for Cybersecurity",

    category:
        "CWS ACADEMY • PYTHON",

    level:
        "Intermediate",

    levelKey:
        "intermediate",

    status:
        "available",

    access:
        "free",

    icon:
        "fa-brands fa-python",

    description:
        "Learn Python fundamentals through cybersecurity-focused examples including files, HTTP requests, data processing and simple automation.",

    longDescription:
        "Python Fundamentals for Cybersecurity introduces programming concepts through practical security-oriented tasks, preparing students for later automation and offensive-security courses.",

    duration:
        "18–24 hours",

    objectives: [
        "Understand core Python syntax and data types.",

        "Use conditions and loops to control Python programs.",

        "Write reusable functions and organize code into modules.",

        "Process files and structured data safely.",

        "Handle errors and add practical logging to scripts.",

        "Use Python to make and inspect HTTP requests.",

        "Understand basic sockets and network programming concepts.",

        "Build and document a simple cybersecurity-focused Python project."
    ],

    modules: [
        {
            id:
                "module-01",

            number:
                1,

            title:
                "Python Foundations",

            description:
                "Learn Python syntax, variables, data types and execution.",

            access:
                "free",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Python and Cybersecurity",

                    duration:
                        "20 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Python is widely used for automation, data processing and security tooling."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Variables and Data Types",

                    duration:
                        "30 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Python variables can hold strings, numbers, booleans, lists and other useful data structures."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Input, Output and Formatting",

                    duration:
                        "25 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Programs read input, produce output and format information for users or logs."
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
                "Conditions and Loops",

            description:
                "Control program flow using conditions and repetition.",

            access:
                "free",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "If Statements",

                    duration:
                        "25 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Conditional statements let programs make decisions based on data."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "For Loops",

                    duration:
                        "25 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "For loops iterate through collections such as lists, files and ranges."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "While Loops",

                    duration:
                        "25 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "While loops continue processing while a condition remains true."
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
                "Functions and Modules",

            description:
                "Organize reusable code with functions and imports.",

            access:
                "free",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Writing Functions",

                    duration:
                        "30 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Functions group reusable logic behind clear parameters and return values."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Scope and Return Values",

                    duration:
                        "25 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Variable scope and return values help functions communicate predictably."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Using Modules",

                    duration:
                        "25 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Modules let Python programs reuse functionality from the standard library or installed packages."
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
                "Files and Data",

            description:
                "Read, write and parse common data formats.",

            access:
                "free",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Reading and Writing Files",

                    duration:
                        "30 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Python can read and write text files for automation and analysis."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Working with JSON",

                    duration:
                        "30 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "JSON is common in APIs, logs and security tools and maps naturally to Python dictionaries and lists."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Parsing Text Data",

                    duration:
                        "30 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Structured parsing is more reliable than manually copying data between tools."
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
                "Exceptions and Logging",

            description:
                "Handle errors and record useful program events.",

            access:
                "free",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Exceptions",

                    duration:
                        "25 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Exceptions allow programs to handle expected failures without crashing unpredictably."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Validation",

                    duration:
                        "25 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Input validation helps prevent bad data from producing unsafe or confusing behavior."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Logging",

                    duration:
                        "25 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Logging records useful runtime information for troubleshooting and auditing."
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
                "HTTP Requests",

            description:
                "Interact with web services and APIs from Python.",

            access:
                "free",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "HTTP with Python",

                    duration:
                        "30 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Python libraries can send HTTP requests and inspect responses for automation tasks."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Headers, Parameters and JSON",

                    duration:
                        "30 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Requests often include headers, query parameters and JSON bodies."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Safe API Automation",

                    duration:
                        "25 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Automated API interaction should respect authorization, rate limits and scope."
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
                "Networking and Sockets",

            description:
                "Understand basic socket programming and network automation.",

            access:
                "free",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Socket Fundamentals",

                    duration:
                        "30 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Sockets provide a programming interface for network communication."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "TCP Client Basics",

                    duration:
                        "30 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "A simple TCP client can connect to an authorized service and exchange data."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Timeouts and Error Handling",

                    duration:
                        "25 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Network programs need timeouts and error handling because remote systems may be slow or unreachable."
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
                "Cybersecurity Automation Project",

            description:
                "Build a small Python tool for an approved security workflow.",

            access:
                "free",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Choose the Workflow",

                    duration:
                        "20 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Students identify a repetitive approved task that Python can simplify."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Build the Tool",

                    duration:
                        "75 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Students combine files, HTTP or networking concepts into a small tool."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Test and Document",

                    duration:
                        "30 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "The final project includes testing notes, usage instructions and limitations."
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
