/* =========================================================
   CWS ACADEMY
   BASH & LINUX AUTOMATION
   INTERMEDIATE • FREE

   Practical Linux scripting and cybersecurity automation.
========================================================= */


/* =========================================================
   LESSON BUILDER
========================================================= */

function lesson(
    id,
    title,
    duration,
    extra = {}
) {

    return {

        id,
        title,
        duration,

        access:
            "free",

        type:
            extra.type ||
            "Lesson",

        subtitle:
            extra.subtitle ||
            `Learn ${title} through practical Bash examples.`,

        icon:
            extra.icon ||
            "fa-solid fa-terminal",

        objectives:
            extra.objectives ||
            [],

        introduction:
            extra.introduction ||
            "",

        body:
            extra.body ||
            "",

        keyConcepts:
            extra.keyConcepts ||
            [],

        commands:
            extra.commands ||
            [],

        lab:
            extra.lab ||
            null,

        whyItMatters:
            extra.whyItMatters ||
            `Understanding ${title} helps you move from running isolated Linux commands to building Bash automation that is predictable, reusable and safe.`,

        commonMistakes:
            extra.commonMistakes ||
            [
                "Copying commands into a script without understanding their input, output or exit status.",
                "Failing to quote variable expansions when values may contain spaces or special characters.",
                "Trusting arguments, filenames, paths or command output without validating them first.",
                "Automating a destructive action before testing the workflow with read-only or sample data."
            ],

        troubleshooting:
            extra.troubleshooting ||
            [
                "Run the failing command by itself before debugging the entire script.",
                "Inspect the previous command exit status with echo $?.",
                "Print or trace variable values to confirm that the script received the data you expected.",
                "Check quoting, paths, permissions and wildcard expansion.",
                "Reduce the script to the smallest failing example, correct it and then rebuild the workflow.",
                "Test both successful and failure conditions before considering the automation complete."
            ],

        practice:
            extra.practice ||
            {
                title:
                    "Apply What You Learned",

                steps: [
                    `Explain ${title} in your own words.`,
                    "Recreate one example without copying the lesson.",
                    "Predict the command or script output before running it.",
                    "Change one variable, argument or condition and explain why the result changes.",
                    "Describe one Linux administration or defensive cybersecurity task where the concept would be useful.",
                    "Test one incorrect or unexpected input and explain how the script should respond."
                ]
            },

        quiz:
            extra.quiz ||
            []

    };

}


/* =========================================================
   COURSE
========================================================= */

export const bashLinuxAutomation = {

    id:
        "bash-linux-automation",

    title:
        "Bash & Linux Automation",

    overviewTitle:
        "Automate Linux Tasks with Bash",

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
        "Build Bash scripting skills from first principles through deep explanations, worked examples, Linux administration, text processing, troubleshooting and safe defensive cybersecurity automation.",

    longDescription:
        "Bash & Linux Automation teaches students how to move from individual Linux commands to understandable, testable and reliable scripts using a structured what, why, how and practice approach. Students learn how Bash interprets commands, how quoting and expansion affect data, how exit codes control workflows, how conditions and loops make decisions, how grep, sed and awk process text, and how scripts can inspect processes and networking information safely. Cybersecurity examples emphasize defensive automation, explicit scope, validation, predictable behavior and documentation. The course finishes with a complete read-only Linux security health-reporting project for local or explicitly authorized lab environments.",

    duration:
        "35–45 Hours",

    learningStandard:
        "Deep Explanation • Worked Examples • Linux Context • Security Context • Troubleshooting • Practice",

    lessonMethod: [
        "What the Bash or Linux concept is",
        "Why the concept exists",
        "How Bash interprets or executes it",
        "Syntax and command structure",
        "Worked Linux example",
        "Expected output and interpretation",
        "Defensive cybersecurity relevance",
        "Common mistakes and unsafe assumptions",
        "Troubleshooting",
        "Hands-on practice and knowledge check"
    ],

    learningEnvironment:
        "Use a local Linux or Kali Linux lab, sample files and systems you own or are explicitly authorized to administer or assess.",

    curriculumNote:
        "Students should understand every command and script component before automating it. Free-course automation remains focused on foundations, administration and defensive read-only workflows; deeper assessment automation belongs in later Pro training.",

    objectives: [

        "Understand how Bash and Linux shells execute commands.",
        "Create and run Bash scripts safely.",
        "Use variables, arguments and interactive input.",
        "Build conditional logic with test expressions, if statements and case statements.",
        "Automate repetitive work using loops.",
        "Process text using grep, sed, awk and pipelines.",
        "Inspect Linux processes and networking information programmatically.",
        "Automate defensive and authorized cybersecurity workflows.",
        "Handle input, errors and output more reliably.",
        "Build and document a complete Bash automation project."

    ],


    modules: [

        /* =================================================
           MODULE 01
        ================================================= */

        {

            id:
                "module-01",

            number:
                1,

            title:
                "Bash & Shell Fundamentals",

            description:
                "Understand shells, Bash syntax, command execution, scripts, exit codes and command chaining.",

            access:
                "free",

            labs:
                1,

            assessments:
                1,

            lessons: [

                lesson(
                    "lesson-01",
                    "What Is Bash?",
                    "25 minutes",
                    {

                        subtitle:
                            "Understand the shell, terminal and Bash scripting environment.",

                        objectives: [

                            "Explain the difference between a terminal and a shell.",
                            "Describe what Bash is used for.",
                            "Identify common shell prompts.",
                            "Understand why Bash is useful in cybersecurity."

                        ],

                        introduction: `
                            <h2>From Commands to Automation</h2>

                            <p>
                                Linux users often begin by typing individual
                                commands into a terminal. Bash allows those
                                commands to be combined into repeatable,
                                reusable scripts.
                            </p>

                            <p>
                                For cybersecurity professionals, this is useful
                                for system checks, log review, file processing,
                                network troubleshooting and lab automation.
                            </p>
                        `,

                        body: `
                            <h2>Terminal vs Shell</h2>

                            <p>
                                A terminal is the interface where you type
                                commands. A shell is the program that interprets
                                those commands. Bash, which stands for
                                Bourne Again Shell, is one of the most widely
                                used shells on Linux systems.
                            </p>

                            <h2>What Bash Does</h2>

                            <p>
                                Bash reads commands, expands variables, starts
                                programs, connects commands through pipes and
                                provides scripting features such as conditions,
                                loops and functions.
                            </p>

                            <h2>Why Bash Matters in Cybersecurity</h2>

                            <p>
                                Security work frequently involves repetitive
                                technical tasks. A well-written Bash script can
                                reduce manual work while keeping the workflow
                                consistent and documented.
                            </p>

                            <div class="lesson-callout">
                                <div class="lesson-callout-icon">
                                    <i class="fa-solid fa-shield-halved"></i>
                                </div>

                                <div>
                                    <strong>
                                        CWS Security Principle
                                    </strong>

                                    <p>
                                        Automation should never remove safety
                                        boundaries. Scripts should validate
                                        targets and operate only on systems you
                                        own or are authorized to assess.
                                    </p>
                                </div>
                            </div>
                        `,

                        keyConcepts: [

                            {
                                title:
                                    "Terminal",

                                description:
                                    "The interface used to interact with a command-line environment."
                            },

                            {
                                title:
                                    "Shell",

                                description:
                                    "The command interpreter that processes user commands."
                            },

                            {
                                title:
                                    "Bash",

                                description:
                                    "A Linux shell and scripting language used for interactive work and automation."
                            }

                        ],

                        commands: [

                            {
                                command:
                                    "echo $SHELL",

                                explanation:
                                    "Displays the current user's configured login shell."
                            },

                            {
                                command:
                                    "bash --version",

                                explanation:
                                    "Displays the installed Bash version."
                            },

                            {
                                command:
                                    "whoami",

                                explanation:
                                    "Displays the current username."
                            },

                            {
                                command:
                                    "pwd",

                                explanation:
                                    "Shows the present working directory."
                            }

                        ],

                        lab: {

                            title:
                                "Explore Your Bash Environment",

                            objective:
                                "Identify the current user, shell, working directory and Bash version.",

                            steps: [

                                "Open a terminal on your Linux or Kali Linux lab machine.",
                                "Run whoami.",
                                "Run pwd.",
                                "Run echo $SHELL.",
                                "Run bash --version.",
                                "Write down what each command tells you about your environment."

                            ],

                            successCriteria:
                                "You can identify your user, working directory, configured shell and Bash version."

                        },

                        quiz: [

                            {
                                question:
                                    "What is the main role of Bash?",

                                options: [

                                    "It is only a text editor.",
                                    "It interprets commands and provides scripting features.",
                                    "It replaces the Linux kernel.",
                                    "It is a web browser."

                                ],

                                answer:
                                    1
                            },

                            {
                                question:
                                    "Which command displays the current working directory?",

                                options: [

                                    "pwd",
                                    "whoami",
                                    "grep",
                                    "chmod"

                                ],

                                answer:
                                    0
                            }

                        ]

                    }
                ),


                lesson(
                    "lesson-02",
                    "Creating and Running Bash Scripts",
                    "35 minutes",
                    {

                        subtitle:
                            "Create executable scripts and understand the shebang.",

                        objectives: [

                            "Create a Bash script file.",
                            "Understand the purpose of the shebang.",
                            "Make a script executable.",
                            "Run a script using Bash and direct execution."

                        ],

                        introduction: `
                            <h2>Your First Script</h2>

                            <p>
                                A Bash script is a text file containing commands
                                that Bash can execute in sequence.
                            </p>
                        `,

                        body: `
                            <h2>The Shebang</h2>

                            <p>
                                Bash scripts commonly begin with:
                            </p>

                            <pre><code>#!/usr/bin/env bash</code></pre>

                            <p>
                                This line tells the operating system which
                                interpreter should execute the script.
                            </p>

                            <h2>Example Script</h2>

                            <pre><code>#!/usr/bin/env bash

echo "CWS Academy Bash Lab"
whoami
date</code></pre>

                            <h2>File Permissions</h2>

                            <p>
                                A script can be run with
                                <code>bash script.sh</code> even when it is not
                                executable. To run it directly as
                                <code>./script.sh</code>, add execute permission.
                            </p>

                            <pre><code>chmod +x script.sh
./script.sh</code></pre>
                        `,

                        keyConcepts: [

                            {
                                title:
                                    "Shebang",

                                description:
                                    "The first line that identifies the interpreter used to execute a script."
                            },

                            {
                                title:
                                    "Execute Permission",

                                description:
                                    "The permission required to run a file directly as a program."
                            }

                        ],

                        commands: [

                            {
                                command:
                                    "nano hello.sh",

                                explanation:
                                    "Creates or edits a Bash script using Nano."
                            },

                            {
                                command:
                                    "bash hello.sh",

                                explanation:
                                    "Runs the script explicitly with Bash."
                            },

                            {
                                command:
                                    "chmod +x hello.sh",

                                explanation:
                                    "Adds executable permission."
                            },

                            {
                                command:
                                    "./hello.sh",

                                explanation:
                                    "Executes the script from the current directory."
                            }

                        ],

                        lab: {

                            title:
                                "Create Your First CWS Bash Script",

                            objective:
                                "Create an executable script that prints system information.",

                            steps: [

                                "Create a file named system-info.sh.",
                                "Add the Bash shebang.",
                                "Print a heading using echo.",
                                "Display the current user using whoami.",
                                "Display the current date using date.",
                                "Display the working directory using pwd.",
                                "Make the file executable.",
                                "Run it using ./system-info.sh."

                            ],

                            successCriteria:
                                "The script executes successfully and displays all requested information."

                        },

                        quiz: [

                            {
                                question:
                                    "Why is chmod +x commonly used on a Bash script?",

                                options: [

                                    "To delete it.",
                                    "To encrypt it.",
                                    "To give it execute permission.",
                                    "To change the interpreter."

                                ],

                                answer:
                                    2
                            }

                        ]

                    }
                ),


                lesson(
                    "lesson-03",
                    "Exit Codes and Command Chaining",
                    "35 minutes",
                    {

                        subtitle:
                            "Use command results to control automation workflows.",

                        objectives: [

                            "Explain what an exit code represents.",
                            "Inspect the previous command's exit code.",
                            "Use && and || command operators.",
                            "Understand why reliable automation checks command results."

                        ],

                        introduction: `
                            <h2>Did the Command Work?</h2>

                            <p>
                                Scripts need a way to determine whether a
                                command succeeded. Linux programs communicate
                                this through exit codes.
                            </p>
                        `,

                        body: `
                            <h2>Exit Status</h2>

                            <p>
                                An exit code of <code>0</code> normally means
                                success. A non-zero value normally indicates an
                                error or different outcome.
                            </p>

                            <pre><code>ls /tmp
echo $?</code></pre>

                            <h2>Command Chaining</h2>

                            <p>
                                The <code>&amp;&amp;</code> operator runs the next
                                command only if the first command succeeds.
                            </p>

                            <pre><code>mkdir cws-lab && cd cws-lab</code></pre>

                            <p>
                                The <code>||</code> operator runs the next
                                command when the previous command fails.
                            </p>

                            <pre><code>test -f report.txt || echo "report.txt is missing"</code></pre>

                            <h2>Security Automation</h2>

                            <p>
                                Checking command results prevents scripts from
                                blindly continuing after an important failure.
                            </p>
                        `,

                        commands: [

                            {
                                command:
                                    "echo $?",

                                explanation:
                                    "Displays the exit code of the previously executed command."
                            },

                            {
                                command:
                                    "command1 && command2",

                                explanation:
                                    "Runs command2 only when command1 succeeds."
                            },

                            {
                                command:
                                    "command1 || command2",

                                explanation:
                                    "Runs command2 when command1 fails."
                            }

                        ],

                        lab: {

                            title:
                                "Build a Safe Directory Setup Script",

                            objective:
                                "Use exit behavior to create and enter a lab directory safely.",

                            steps: [

                                "Create a Bash script named setup-lab.sh.",
                                "Use mkdir -p to create a directory named cws-bash-lab.",
                                "Use && to enter the directory only after creation succeeds.",
                                "Print a success message.",
                                "Run the script and verify the directory exists."

                            ],

                            successCriteria:
                                "The script only reports success after the directory operation succeeds."

                        },

                        quiz: [

                            {
                                question:
                                    "What does an exit status of 0 normally indicate?",

                                options: [

                                    "Success",
                                    "Permission denied",
                                    "The script was deleted",
                                    "The system restarted"

                                ],

                                answer:
                                    0
                            },

                            {
                                question:
                                    "What does && do between two commands?",

                                options: [

                                    "Runs the second command only if the first succeeds.",
                                    "Runs both commands in reverse order.",
                                    "Deletes the first command.",
                                    "Runs the second command only if the first fails."

                                ],

                                answer:
                                    0
                            }

                        ]

                    }
                )

            ]

        },


        /* =================================================
           MODULE 02
        ================================================= */

        {

            id:
                "module-02",

            number:
                2,

            title:
                "Variables and User Input",

            description:
                "Store information, accept arguments and collect validated user input.",

            access:
                "free",

            labs:
                1,

            assessments:
                1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Variables and Quoting",
                    "35 minutes",
                    {

                        objectives: [

                            "Create and read Bash variables.",
                            "Understand variable expansion.",
                            "Use single and double quotes appropriately.",
                            "Avoid common whitespace and quoting mistakes."

                        ],

                        body: `
                            <h2>Variables</h2>

                            <pre><code>name="Sandiso"
echo "$name"</code></pre>

                            <p>
                                Bash assignments do not place spaces around the
                                equals sign.
                            </p>

                            <h2>Double vs Single Quotes</h2>

                            <pre><code>course="Bash"
echo "Course: $course"
echo 'Course: $course'</code></pre>

                            <p>
                                Double quotes allow variable expansion.
                                Single quotes preserve text literally.
                            </p>

                            <h2>Cybersecurity Relevance</h2>

                            <p>
                                Correct quoting is important when scripts handle
                                filenames, user input or data collected from
                                other commands.
                            </p>
                        `,

                        commands: [

                            {
                                command:
                                    'target="192.168.56.10"',

                                explanation:
                                    "Stores a value in a variable."
                            },

                            {
                                command:
                                    'echo "$target"',

                                explanation:
                                    "Safely expands the variable."
                            }

                        ],

                        quiz: [

                            {
                                question:
                                    "Which form allows Bash to expand $name?",

                                options: [

                                    "'Hello $name'",
                                    "\"Hello $name\"",
                                    "Neither form",
                                    "Only comments"

                                ],

                                answer:
                                    1
                            }

                        ]

                    }
                ),


                lesson(
                    "lesson-02",
                    "Positional Arguments",
                    "35 minutes",
                    {

                        objectives: [

                            "Use $1, $2 and other positional arguments.",
                            "Use $0 to identify the script.",
                            "Use $# to count arguments.",
                            "Validate required arguments."

                        ],

                        body: `
                            <h2>Passing Values to Scripts</h2>

                            <pre><code>./check-host.sh 192.168.56.10</code></pre>

                            <p>
                                Inside the script, the first argument is
                                available as <code>$1</code>.
                            </p>

                            <pre><code>#!/usr/bin/env bash

target="$1"

echo "Target: $target"</code></pre>

                            <h2>Validate Inputs</h2>

                            <pre><code>if [ "$#" -lt 1 ]; then
    echo "Usage: $0 &lt;target&gt;"
    exit 1
fi</code></pre>

                            <p>
                                Security automation should fail safely when
                                required scope information is missing.
                            </p>
                        `,

                        lab: {

                            title:
                                "Argument-Based Host Information Script",

                            objective:
                                "Create a script that requires a hostname or IP argument.",

                            steps: [

                                "Create host-info.sh.",
                                "Require exactly one argument.",
                                "Store $1 in a variable named target.",
                                "Print a usage message when no target is supplied.",
                                "Print the selected target when valid input is supplied."

                            ],

                            successCriteria:
                                "The script rejects missing input and accepts a supplied target."

                        }

                    }
                ),


                lesson(
                    "lesson-03",
                    "Interactive User Input",
                    "30 minutes",
                    {

                        objectives: [

                            "Collect input with read.",
                            "Use read -r safely.",
                            "Validate empty values.",
                            "Avoid trusting user input automatically."

                        ],

                        body: `
                            <h2>Using read</h2>

                            <pre><code>read -r -p "Enter lab name: " lab_name
echo "Lab: $lab_name"</code></pre>

                            <p>
                                The <code>-r</code> option prevents backslashes
                                from being interpreted unexpectedly.
                            </p>

                            <h2>Validate Empty Input</h2>

                            <pre><code>if [ -z "$lab_name" ]; then
    echo "Lab name cannot be empty."
    exit 1
fi</code></pre>

                            <p>
                                Never assume interactive input is valid simply
                                because the user supplied a value.
                            </p>
                        `,

                        quiz: [

                            {
                                question:
                                    "Why should user input be validated?",

                                options: [

                                    "Because all user input is automatically safe.",
                                    "To prevent invalid or unsafe values from controlling script behavior.",
                                    "Only to make the script longer.",
                                    "Validation is only needed in Python."

                                ],

                                answer:
                                    1
                            }

                        ]

                    }
                )

            ]

        },


        /* =================================================
           MODULE 03
        ================================================= */

        {

            id:
                "module-03",

            number:
                3,

            title:
                "Conditions and Decision Making",

            description:
                "Build branching logic using tests, if statements and case statements.",

            access:
                "free",

            labs:
                1,

            assessments:
                1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Test Expressions",
                    "35 minutes",
                    {

                        body: `
                            <h2>Testing Conditions</h2>

                            <p>
                                Bash can test files, strings and numbers.
                            </p>

                            <pre><code>if [ -f "/etc/passwd" ]; then
    echo "File exists"
fi</code></pre>

                            <h2>Useful File Tests</h2>

                            <pre><code>-f  regular file
-d  directory
-r  readable
-w  writable
-x  executable</code></pre>

                            <p>
                                File tests are especially useful for defensive
                                scripts that verify expected permissions or
                                configuration files.
                            </p>
                        `,

                        commands: [

                            {
                                command:
                                    '[ -f "/etc/passwd" ]',

                                explanation:
                                    "Tests whether /etc/passwd exists as a regular file."
                            },

                            {
                                command:
                                    '[ -d "/tmp" ]',

                                explanation:
                                    "Tests whether /tmp exists as a directory."
                            }

                        ]

                    }
                ),


                lesson(
                    "lesson-02",
                    "If, Elif and Else",
                    "35 minutes",
                    {

                        body: `
                            <h2>Branching Logic</h2>

                            <pre><code>if [ "$status" = "active" ]; then
    echo "Service is active"
elif [ "$status" = "inactive" ]; then
    echo "Service is inactive"
else
    echo "Unknown state"
fi</code></pre>

                            <p>
                                Conditions allow scripts to respond differently
                                depending on system state or collected data.
                            </p>
                        `,

                        lab: {

                            title:
                                "File Permission Checker",

                            objective:
                                "Build a script that reports whether a selected file is readable and writable.",

                            steps: [

                                "Accept a filename as $1.",
                                "Check whether the file exists.",
                                "Check whether it is readable.",
                                "Check whether it is writable.",
                                "Print a clear result for each check."

                            ],

                            successCriteria:
                                "The script correctly reports file existence and basic permissions."

                        }

                    }
                ),


                lesson(
                    "lesson-03",
                    "Case Statements",
                    "30 minutes",
                    {

                        body: `
                            <h2>Multiple Choices</h2>

                            <pre><code>case "$1" in
    start)
        echo "Starting"
        ;;
    stop)
        echo "Stopping"
        ;;
    status)
        echo "Checking status"
        ;;
    *)
        echo "Usage: $0 {start|stop|status}"
        ;;
esac</code></pre>

                            <p>
                                Case statements are useful for scripts with
                                multiple clear operating modes.
                            </p>
                        `

                    }
                )

            ]

        },


        /* =================================================
           MODULE 04
        ================================================= */

        {

            id:
                "module-04",

            number:
                4,

            title:
                "Loops and Repetitive Tasks",

            description:
                "Automate repeated work with for, while and loop-control statements.",

            access:
                "free",

            labs:
                1,

            assessments:
                1,

            lessons: [

                lesson(
                    "lesson-01",
                    "For Loops",
                    "35 minutes",
                    {

                        body: `
                            <h2>Iterating Through Values</h2>

                            <pre><code>for user in alice bob charlie; do
    echo "Checking: $user"
done</code></pre>

                            <h2>Iterating Through Files</h2>

                            <pre><code>for file in *.log; do
    echo "$file"
done</code></pre>

                            <p>
                                Loops are powerful, but scripts should avoid
                                operating on unvalidated wildcard results when
                                changes could be destructive.
                            </p>
                        `

                    }
                ),


                lesson(
                    "lesson-02",
                    "While and Until Loops",
                    "35 minutes",
                    {

                        body: `
                            <h2>While Loops</h2>

                            <pre><code>count=1

while [ "$count" -le 5 ]; do
    echo "$count"
    count=$((count + 1))
done</code></pre>

                            <p>
                                A while loop repeats while its condition remains
                                true. Always make sure the condition can
                                eventually change.
                            </p>
                        `

                    }
                ),


                lesson(
                    "lesson-03",
                    "Break, Continue and Safe Iteration",
                    "30 minutes",
                    {

                        body: `
                            <h2>Controlling Loops</h2>

                            <p>
                                <code>break</code> exits a loop.
                                <code>continue</code> skips the rest of the
                                current iteration.
                            </p>

                            <pre><code>for file in *; do

    [ -f "$file" ] || continue

    echo "Regular file: $file"

done</code></pre>

                            <p>
                                This pattern avoids processing directories when
                                the script expects regular files.
                            </p>
                        `,

                        lab: {

                            title:
                                "Log File Inventory",

                            objective:
                                "Create a safe script that inventories .log files in a selected directory.",

                            steps: [

                                "Accept a directory as an argument.",
                                "Verify that the directory exists.",
                                "Loop over .log files.",
                                "Skip entries that are not regular files.",
                                "Print each filename and its size using du -h or stat.",
                                "Do not modify or delete any files."

                            ],

                            successCriteria:
                                "The script inventories matching log files without changing them."

                        }

                    }
                )

            ]

        },


        /* =================================================
           MODULE 05
        ================================================= */

        {

            id:
                "module-05",

            number:
                5,

            title:
                "Files, grep, sed and awk",

            description:
                "Process files and text using pipelines and core Linux utilities.",

            access:
                "free",

            labs:
                2,

            assessments:
                1,

            lessons: [

                lesson(
                    "lesson-01",
                    "grep and Pattern Matching",
                    "40 minutes",
                    {

                        body: `
                            <h2>Searching Text</h2>

                            <pre><code>grep "Failed" auth.log
grep -i "error" application.log
grep -n "warning" system.log</code></pre>

                            <p>
                                grep is one of the most useful tools for quick
                                log triage and text searching.
                            </p>

                            <h2>Recursive Search</h2>

                            <pre><code>grep -R "TODO" ./scripts</code></pre>

                            <p>
                                Keep searches inside directories you are
                                authorized to inspect.
                            </p>
                        `

                    }
                ),


                lesson(
                    "lesson-02",
                    "sed for Text Transformation",
                    "40 minutes",
                    {

                        body: `
                            <h2>Stream Editing</h2>

                            <pre><code>echo "server=old" | sed 's/old/new/'</code></pre>

                            <p>
                                sed can transform text streams without manually
                                editing every line.
                            </p>

                            <div class="lesson-callout">
                                <div class="lesson-callout-icon">
                                    <i class="fa-solid fa-triangle-exclamation"></i>
                                </div>

                                <div>
                                    <strong>Safety Tip</strong>
                                    <p>
                                        Practice transformations without
                                        in-place editing first. Review output
                                        before changing important files.
                                    </p>
                                </div>
                            </div>
                        `

                    }
                ),


                lesson(
                    "lesson-03",
                    "awk for Structured Text",
                    "45 minutes",
                    {

                        body: `
                            <h2>Working with Fields</h2>

                            <pre><code>awk -F: '{print $1}' /etc/passwd</code></pre>

                            <p>
                                This prints the first colon-separated field from
                                each line of /etc/passwd.
                            </p>

                            <h2>Pipelines</h2>

                            <pre><code>grep "ERROR" app.log | awk '{print $1, $2}'</code></pre>

                            <p>
                                Pipelines connect the output of one command to
                                the input of another.
                            </p>
                        `,

                        lab: {

                            title:
                                "Security Log Triage Pipeline",

                            objective:
                                "Practice extracting relevant information from a sample log file.",

                            steps: [

                                "Create a harmless sample log containing INFO, WARNING and ERROR lines.",
                                "Use grep to select ERROR lines.",
                                "Use wc -l to count them.",
                                "Use awk to print selected fields.",
                                "Save the summarized output to a new report file."

                            ],

                            successCriteria:
                                "The report contains only the selected error information from the sample data."

                        }

                    }
                )

            ]

        },


        /* =================================================
           MODULE 06
        ================================================= */

        {

            id:
                "module-06",

            number:
                6,

            title:
                "Processes and Networking",

            description:
                "Inspect running processes, services, interfaces, routes and sockets.",

            access:
                "free",

            labs:
                2,

            assessments:
                1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Processes and Signals",
                    "40 minutes",
                    {

                        body: `
                            <h2>Process Inspection</h2>

                            <pre><code>ps aux
pgrep ssh
top</code></pre>

                            <p>
                                Process inspection helps administrators and
                                defenders understand what is running on a host.
                            </p>

                            <h2>Signals</h2>

                            <p>
                                Signals communicate events to processes.
                                Avoid terminating processes unless you understand
                                their purpose and have authorization.
                            </p>
                        `

                    }
                ),


                lesson(
                    "lesson-02",
                    "Linux Networking Utilities",
                    "45 minutes",
                    {

                        body: `
                            <h2>Interfaces and Addresses</h2>

                            <pre><code>ip addr
ip route</code></pre>

                            <h2>Listening and Established Sockets</h2>

                            <pre><code>ss -tuln</code></pre>

                            <p>
                                These commands provide useful host-level network
                                visibility without scanning external systems.
                            </p>
                        `,

                        commands: [

                            {
                                command:
                                    "ip addr",

                                explanation:
                                    "Displays network interfaces and addresses."
                            },

                            {
                                command:
                                    "ip route",

                                explanation:
                                    "Displays the routing table."
                            },

                            {
                                command:
                                    "ss -tuln",

                                explanation:
                                    "Lists listening TCP and UDP sockets numerically."
                            }

                        ]

                    }
                ),


                lesson(
                    "lesson-03",
                    "Automating Host Health Checks",
                    "45 minutes",
                    {

                        body: `
                            <h2>Combine Multiple Checks</h2>

                            <p>
                                A health-check script can report disk usage,
                                memory, uptime, interface information and
                                listening sockets without making changes to the
                                system.
                            </p>

                            <pre><code>echo "=== Uptime ==="
uptime

echo "=== Disk ==="
df -h

echo "=== Memory ==="
free -h

echo "=== Listening Sockets ==="
ss -tuln</code></pre>
                        `,

                        lab: {

                            title:
                                "Build a Linux Health Check",

                            objective:
                                "Create a read-only system health-report script.",

                            steps: [

                                "Display hostname and current date.",
                                "Display uptime.",
                                "Display disk usage.",
                                "Display memory usage.",
                                "Display IP addresses.",
                                "Display listening sockets.",
                                "Write the report to a timestamped text file."

                            ],

                            successCriteria:
                                "A report file is produced without modifying system configuration."

                        }

                    }
                )

            ]

        },


        /* =================================================
           MODULE 07
        ================================================= */

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

            labs:
                2,

            assessments:
                1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Log and File Triage Automation",
                    "45 minutes",
                    {

                        body: `
                            <h2>Defensive Automation</h2>

                            <p>
                                Bash can help analysts collect file metadata,
                                count event patterns and organize logs for
                                review.
                            </p>

                            <pre><code>find ./logs -type f -name "*.log"
grep -R -i "failed" ./logs
find ./evidence -type f -exec sha256sum {} \;</code></pre>

                            <p>
                                Hashing evidence can help confirm whether files
                                change during an investigation.
                            </p>
                        `

                    }
                ),


                lesson(
                    "lesson-02",
                    "Authorized Reconnaissance Helpers",
                    "45 minutes",
                    {

                        body: `
                            <h2>Scope Comes First</h2>

                            <p>
                                Automation for reconnaissance must be explicitly
                                restricted to systems you own or have permission
                                to assess.
                            </p>

                            <p>
                                A Bash helper can organize approved targets,
                                collect local DNS information or call approved
                                tools with predefined scope.
                            </p>

                            <pre><code>target="$1"

if [ -z "$target" ]; then
    echo "Usage: $0 &lt;authorized-target&gt;"
    exit 1
fi

echo "Authorized target: $target"</code></pre>

                            <p>
                                Later Pro courses can build on this concept with
                                deeper assessment automation.
                            </p>
                        `

                    }
                ),


                lesson(
                    "lesson-03",
                    "Safe Automation Practices",
                    "40 minutes",
                    {

                        body: `
                            <h2>Reliable Scripts</h2>

                            <p>
                                Good automation should be predictable,
                                understandable and easy to stop.
                            </p>

                            <h2>Useful Practices</h2>

                            <ul>
                                <li>Validate arguments.</li>
                                <li>Quote variables.</li>
                                <li>Check command exit codes.</li>
                                <li>Avoid destructive defaults.</li>
                                <li>Use explicit scope.</li>
                                <li>Write useful logs.</li>
                                <li>Test against lab data first.</li>
                            </ul>

                            <h2>Strict Mode Concepts</h2>

                            <pre><code>set -u
set -o pipefail</code></pre>

                            <p>
                                These options can help expose certain script
                                errors, but students should understand their
                                behavior before enabling them blindly.
                            </p>
                        `,

                        lab: {

                            title:
                                "Harden an Existing Script",

                            objective:
                                "Improve a previous course script with validation and error handling.",

                            steps: [

                                "Choose one script created earlier in the course.",
                                "Add argument validation.",
                                "Quote variable expansions.",
                                "Add clear error messages.",
                                "Check at least one command result.",
                                "Ensure the default behavior does not delete or overwrite data.",
                                "Test both valid and invalid inputs."

                            ],

                            successCriteria:
                                "The improved script behaves predictably for both correct and incorrect input."

                        }

                    }
                )

            ]

        },


        /* =================================================
           MODULE 08
        ================================================= */

        {

            id:
                "module-08",

            number:
                8,

            title:
                "Bash Automation Project",

            description:
                "Design, build, test and document a complete Bash automation project.",

            access:
                "free",

            labs:
                1,

            assessments:
                1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Project Planning and Requirements",
                    "30 minutes",
                    {

                        body: `
                            <h2>Define the Problem</h2>

                            <p>
                                Before writing code, identify exactly what the
                                script should automate.
                            </p>

                            <h2>Recommended Project</h2>

                            <p>
                                Build a CWS Linux Security Health Reporter that
                                collects read-only system information and writes
                                a structured report.
                            </p>

                            <h2>Suggested Requirements</h2>

                            <ul>
                                <li>Hostname and timestamp.</li>
                                <li>Logged-in user.</li>
                                <li>System uptime.</li>
                                <li>Disk and memory usage.</li>
                                <li>Network interfaces.</li>
                                <li>Listening sockets.</li>
                                <li>Selected log-event counts.</li>
                                <li>Clear output sections.</li>
                            </ul>
                        `

                    }
                ),


                lesson(
                    "lesson-02",
                    "Build and Test the Project",
                    "90 minutes",
                    {

                        body: `
                            <h2>Build Incrementally</h2>

                            <p>
                                Add one report section at a time and test each
                                section before continuing.
                            </p>

                            <h2>Suggested Structure</h2>

                            <pre><code>#!/usr/bin/env bash

report="cws-health-$(date +%Y%m%d-%H%M%S).txt"

{
    echo "CWS Academy Linux Security Health Report"
    echo "Generated: $(date)"
    echo

    echo "=== HOST ==="
    hostname
    whoami

    echo
    echo "=== UPTIME ==="
    uptime

    echo
    echo "=== DISK ==="
    df -h

    echo
    echo "=== MEMORY ==="
    free -h

    echo
    echo "=== NETWORK ==="
    ip addr

    echo
    echo "=== LISTENING SOCKETS ==="
    ss -tuln

} &gt; "$report"

echo "Report written to: $report"</code></pre>

                            <p>
                                Students should understand every command before
                                submitting the project.
                            </p>
                        `

                    }
                ),


                lesson(
                    "lesson-03",
                    "Documentation and Final Assessment",
                    "45 minutes",
                    {

                        body: `
                            <h2>Document Your Work</h2>

                            <p>
                                Technical automation becomes more valuable when
                                another person can understand and use it.
                            </p>

                            <h2>README Requirements</h2>

                            <ul>
                                <li>Project purpose.</li>
                                <li>Requirements.</li>
                                <li>How to run the script.</li>
                                <li>Example output.</li>
                                <li>Safety limitations.</li>
                                <li>Known issues.</li>
                                <li>Possible future improvements.</li>
                            </ul>
                        `,

                        lab: {

                            title:
                                "Final Bash Automation Capstone",

                            objective:
                                "Submit a documented, read-only Linux security health-reporting script.",

                            steps: [

                                "Complete the health-reporting Bash script.",
                                "Test it on your Linux lab machine.",
                                "Test at least one failure or edge case.",
                                "Confirm that it does not alter system configuration.",
                                "Create a README explaining how it works.",
                                "Save sample output.",
                                "Review the script for quoting, validation and readable formatting."

                            ],

                            successCriteria:
                                "The project runs successfully, produces a useful report and includes clear documentation."

                        },

                        quiz: [

                            {
                                question:
                                    "What should come before automating a cybersecurity workflow?",

                                options: [

                                    "Removing all validation.",
                                    "Defining the task, scope and safety boundaries.",
                                    "Running commands against random systems.",
                                    "Disabling error handling."

                                ],

                                answer:
                                    1
                            },

                            {
                                question:
                                    "Why is documentation important for an automation project?",

                                options: [

                                    "It makes the script impossible to run.",
                                    "It helps users understand purpose, usage, limitations and expected behavior.",
                                    "It replaces testing.",
                                    "It removes the need for authorization."

                                ],

                                answer:
                                    1
                            }

                        ]

                    }
                )

            ]

        }

    ]

};
