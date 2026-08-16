/* =========================================================
   CWS ACADEMY
   BASH & LINUX AUTOMATION
========================================================= */

export const bashLinuxAutomation = {

    id:
        "bash-linux-automation",

    title:
        "Bash & Linux Automation",

    overviewTitle:
        "Bash & Linux Automation",

    category:
        "CWS ACADEMY • AUTOMATION",

    level:
        "Intermediate",

    levelKey:
        "intermediate",

    status:
        "available",

    access:
        "free",

    icon:
        "fa-solid fa-terminal",

    description:
        "Build practical Bash scripting skills for Linux administration, repetitive security tasks, file processing and automation workflows.",

    longDescription:
        "Bash & Linux Automation teaches practical shell scripting for Linux and cybersecurity workflows, including variables, conditions, loops, text processing, processes, networking and safe automation.",

    duration:
        "18–24 hours",

    objectives: [
        "Understand Bash syntax, shells, scripts and safe command execution.",

        "Use variables, positional arguments and user input in Bash scripts.",

        "Build reliable conditional logic for automation tasks.",

        "Automate repetitive tasks using loops and iteration.",

        "Process files and text using grep, sed, awk and pipelines.",

        "Automate process and network inspection tasks safely.",

        "Apply Bash automation to authorized cybersecurity workflows.",

        "Build and document a complete Bash automation project."
    ],

    modules: [
        {
            id:
                "module-01",

            number:
                1,

            title:
                "Bash & Shell Fundamentals",

            description:
                "Understand shells, Bash syntax, commands, scripts and execution basics.",

            access:
                "free",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "What Is Bash?",

                    duration:
                        "20 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Bash is a command shell and scripting language widely used on Linux systems for interactive administration and automation."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Running Commands and Scripts",

                    duration:
                        "25 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Bash commands can be run interactively or saved in executable script files to automate repeatable workflows."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Exit Codes and Command Chaining",

                    duration:
                        "25 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Exit codes and command operators help scripts make decisions based on whether previous commands succeeded or failed."
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
                "Variables and User Input",

            description:
                "Use variables, arguments and input safely inside Bash scripts.",

            access:
                "free",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Variables and Quoting",

                    duration:
                        "25 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Variables store values for reuse, while correct quoting prevents unwanted word splitting and expansion."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Positional Arguments",

                    duration:
                        "25 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Positional parameters allow scripts to accept values supplied at execution time."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Reading User Input",

                    duration:
                        "25 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Interactive input can be collected safely and validated before it is used by a script."
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
                "Conditions and Decision Making",

            description:
                "Build branching logic with tests, if statements and case statements.",

            access:
                "free",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Test Expressions",

                    duration:
                        "25 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Bash test expressions evaluate files, strings and numbers so scripts can make decisions."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "If and Else",

                    duration:
                        "25 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "If, elif and else blocks allow scripts to branch based on conditions."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Case Statements",

                    duration:
                        "25 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Case statements provide a clean way to handle multiple expected values."
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
                "Loops and Repetitive Tasks",

            description:
                "Automate repeated operations with for, while and until loops.",

            access:
                "free",

            lessons: [

                {
                    id:
                        "lesson-01",

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
                                "For loops repeat actions across lists, files, hosts or other collections."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "While and Until Loops",

                    duration:
                        "25 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "While and until loops continue while a condition remains true or false."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Loop Control",

                    duration:
                        "20 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Break and continue control how a script moves through repetitive tasks."
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
                "Files, grep, sed and awk",

            description:
                "Process text and files using core Linux command-line utilities.",

            access:
                "free",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "grep and Pattern Matching",

                    duration:
                        "30 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "grep searches text streams and files for matching patterns."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "sed for Text Transformation",

                    duration:
                        "30 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "sed can perform stream-based substitutions and transformations."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "awk for Structured Text",

                    duration:
                        "30 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "awk is useful for selecting fields, filtering rows and producing formatted output."
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
                "Processes and Networking",

            description:
                "Automate process inspection and basic Linux networking checks.",

            access:
                "free",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Processes and Signals",

                    duration:
                        "25 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Process tools expose running programs, resource usage and process identifiers."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Networking Utilities",

                    duration:
                        "30 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Common Linux networking tools can inspect interfaces, routes, sockets and connectivity."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Automating Health Checks",

                    duration:
                        "30 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Scripts can combine process and network checks into repeatable health or troubleshooting routines."
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
                "Cybersecurity Automation",

            description:
                "Apply Bash to defensive and authorized security workflows.",

            access:
                "free",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Log and File Triage",

                    duration:
                        "30 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Bash can automate repetitive inspection of logs, files and indicators during security analysis."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Reconnaissance Helpers",

                    duration:
                        "30 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Simple scripts can organize authorized reconnaissance tasks and normalize results."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Safe Automation Practices",

                    duration:
                        "25 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Security scripts should validate input, limit scope and avoid destructive defaults."
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
                "Bash Automation Project",

            description:
                "Combine the course concepts into a practical automation project.",

            access:
                "free",

            lessons: [

                {
                    id:
                        "lesson-01",

                    title:
                        "Project Planning",

                    duration:
                        "20 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "A useful automation project starts with a clear task, expected inputs, outputs and error conditions."
                        }
                    ]
                },

                {
                    id:
                        "lesson-02",

                    title:
                        "Build and Test",

                    duration:
                        "60 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "Students implement and test a Bash script inside an approved lab environment."
                        }
                    ]
                },

                {
                    id:
                        "lesson-03",

                    title:
                        "Document and Improve",

                    duration:
                        "30 min",

                    access:
                        "free",

                    content: [
                        {
                            type:
                                "paragraph",

                            text:
                                "The final step is to document usage, limitations and future improvements."
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
