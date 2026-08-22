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
            balanceAnswerPositions(
                extra.quiz?.length
                    ? extra.quiz
                    : [
                        question(
                            `Which result best demonstrates practical understanding of ${title}?`,
                            "A small, correctly scoped script whose expected result is verified and explained",
                            "A copied command that was not reviewed",
                            "A script run with unnecessary privileges",
                            "An undocumented result from an unknown system"
                        ),
                        question(
                            `What is the safest way to practise ${title}?`,
                            "Use owned or explicitly authorized lab data, begin read-only and test expected failure conditions",
                            "Run the first example as root against a workplace server",
                            "Disable validation so the script finishes faster",
                            "Store reusable credentials in the script"
                        ),
                        question(
                            `What evidence should accompany work involving ${title}?`,
                            "The inputs, expected behavior, observed result, exit status and a short interpretation",
                            "Only the script filename",
                            "Only a screenshot with no context",
                            "No evidence if the command returned output"
                        )
                    ]
            )

    };

}


/* =========================================================
   ASSESSMENT QUALITY HELPERS
========================================================= */

function balanceAnswerPositions(
    questions = [],
    offset = 0
) {

    return questions.map(
        (item, index) => {

            const options =
                Array.isArray(item.options)
                    ? [...item.options]
                    : [];

            if (!options.length) {
                return item;
            }

            const answer =
                Number.isInteger(item.answer)
                    ? item.answer
                    : 0;

            const shift =
                (index + offset) % options.length;

            return {
                ...item,
                options: [
                    ...options.slice(shift),
                    ...options.slice(0, shift)
                ],
                answer:
                    (answer - shift + options.length) % options.length
            };

        }
    );

}


function question(prompt, correct, ...distractors) {

    return {
        question:
            prompt,
        options: [
            correct,
            ...distractors
        ],
        answer:
            0
    };

}


const bashQuestionBanks = {

    "module-01": [
        question("What is Bash?", "A command shell and scripting language that interprets commands and automates workflows", "A Linux filesystem", "A network protocol", "A package repository"),
        question("What does an exit status of zero normally mean?", "The command completed successfully", "The shell stopped permanently", "The command ran as root", "The command produced no output"),
        question("Why should a script begin with a suitable shebang?", "It identifies the interpreter intended to execute the file", "It grants administrator privileges", "It encrypts the script", "It validates all user input"),
        question("What does the && operator do between commands?", "Runs the next command only if the previous command succeeded", "Runs both commands simultaneously", "Ignores every error", "Redirects standard error"),
        question("What is the strongest first debugging step?", "Reproduce the smallest failing command and inspect its inputs, output and exit status", "Add sudo everywhere", "Delete all error handling", "Run the script repeatedly without changing anything")
    ],

    "module-02": [
        question("Why should variable expansions usually be quoted?", "To prevent unintended word splitting and pathname expansion", "To make every value numeric", "To execute the variable as root", "To disable input validation"),
        question("What does $1 represent inside a Bash script?", "The first positional argument", "The previous command exit status", "The script process ID", "The current username"),
        question("What should happen before using external input in a command?", "Validate its type, format, allowed range and intended use", "Trust it because the user is signed in", "Remove all quotes", "Write it to a system file"),
        question("Which construct safely collects interactive input?", "read with an appropriate prompt and validation", "eval on arbitrary text", "A world-writable configuration file", "A hard-coded password"),
        question("How should secrets normally be handled?", "Keep them out of source code and logs and use an approved secret mechanism", "Embed them in comments", "Print them during debugging", "Commit them to the repository")
    ],

    "module-03": [
        question("What is the purpose of an if statement?", "Choose a branch based on a command or test result", "Repeat forever", "Create a network socket", "Change file ownership automatically"),
        question("Which operator tests whether a regular file exists?", "-f", "-d", "-z", "-n"),
        question("When is a case statement useful?", "When one value must be matched against several explicit patterns", "When every command must run as root", "When binary data must be encrypted", "When a process must be killed"),
        question("Why should failure branches be explicit?", "They make unsafe assumptions visible and allow useful errors and exit codes", "They hide error messages", "They eliminate testing", "They turn strings into numbers"),
        question("What is a safe default for an unknown action argument?", "Reject it, show valid usage and return a non-zero status", "Execute the closest matching command", "Run every action", "Ignore the argument and report success")
    ],

    "module-04": [
        question("When is a for loop appropriate?", "When processing a known list or set of expanded items", "When handling only one value", "When bypassing permissions", "When replacing validation"),
        question("What protects a while loop from running forever?", "A condition that changes predictably plus an intentional stop or timeout", "Running it as root", "Removing the condition", "Redirecting output"),
        question("What is the safest way to process filenames?", "Use quoting and null-delimited input where names may contain spaces or newlines", "Split every filename on spaces", "Use eval", "Assume names contain only letters"),
        question("Why should a batch script report per-item failures?", "One failed item should be traceable without hiding the status of the remaining work", "Every item always succeeds", "Logs are unnecessary", "It prevents loops from ending"),
        question("What makes repetitive automation idempotent?", "Repeated runs preserve the intended state without harmful duplicate effects", "It always appends duplicate data", "It deletes its logs", "It requires manual editing on every run")
    ],

    "module-05": [
        question("What is grep primarily used for?", "Selecting lines that match a pattern", "Changing file ownership", "Starting services", "Creating user accounts"),
        question("What is sed commonly used for?", "Stream-oriented text selection and transformation", "Network routing", "Password hashing", "Process scheduling"),
        question("What is awk especially useful for?", "Field-based text processing and reporting", "Disk encryption", "User authentication", "Firewall state tracking"),
        question("Why should a pipeline be validated stage by stage?", "A later command may hide empty or malformed output from an earlier stage", "Every pipeline always succeeds", "Pipelines cannot process text", "Exit statuses are irrelevant"),
        question("What is the safest approach before rewriting a file?", "Validate the input, write to a controlled temporary file, verify it and replace deliberately", "Edit the only copy in place without a backup", "Disable permission checks", "Use an unquoted wildcard")
    ],

    "module-06": [
        question("What does ps provide?", "A snapshot of process information", "A permanent firewall rule", "A DNS zone", "A package signature"),
        question("What should be confirmed before terminating a process?", "Identity, ownership, purpose, scope and expected operational impact", "Only its name", "That sudo is available", "That no logs exist"),
        question("What does ss help inspect?", "Network sockets, listening services and connections", "Password policy", "File checksums", "Cron syntax only"),
        question("Why is a listening port not automatically a vulnerability?", "Risk depends on service, binding, exposure, configuration, authorization and compensating controls", "All ports are harmless", "Port numbers prove exploitation", "Only public IP addresses need review"),
        question("What makes a process or network report useful?", "Timestamped, scoped observations with commands, filters and an interpretation", "Unlabelled command output", "Only a count", "A claim without evidence")
    ],

    "module-07": [
        question("What is the safest default for defensive automation?", "Read-only collection with explicit scope and least privilege", "Automatic remediation on every discovered host", "Unbounded Internet scanning", "Logging reusable secrets"),
        question("What should a log-review script preserve?", "Source, time range, filter logic, relevant evidence and limitations", "Only matching usernames", "No timestamps", "Only the final count"),
        question("Why should indicators be treated as leads rather than proof?", "Benign activity can match a pattern, so context and corroboration are required", "Every match proves compromise", "Indicators never change", "Logs are always complete"),
        question("What must precede network automation?", "Explicit authorization, target scope, rate limits and a defined purpose", "A list of random public IPs", "Disabled monitoring", "Maximum concurrency"),
        question("What is responsible failure behavior?", "Stop safely, return a useful non-zero status and avoid partial destructive changes", "Report success regardless of result", "Delete the evidence", "Retry forever")
    ],

    "module-08": [
        question("What should the final automation project do first?", "Validate its environment, dependencies, permissions, inputs and output location", "Modify firewall rules", "Install unknown software", "Delete previous logs"),
        question("What belongs in a professional script report?", "Timestamp, host and scope, collection method, findings, limitations and next steps", "Only coloured terminal output", "Only the script source", "Reusable credentials"),
        question("What does ShellCheck contribute?", "Static analysis that identifies many common shell-script defects and portability concerns", "Runtime authorization", "Automatic incident containment", "Secret storage"),
        question("Why test failure and edge cases?", "Reliable automation must respond predictably to missing data, permissions and command failures", "Only successful paths matter", "Failure tests weaken scripts", "They replace documentation"),
        question("What makes the capstone defensible?", "Repeatable read-only collection, sanitized evidence, accurate interpretation and documented limitations", "Running as root with no reason", "One screenshot", "Unverified claims")
    ]

};


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

    estimatedLessons:
        24,

    certificateEligible:
        true,

    prerequisites: [
        "Linux Fundamentals or equivalent command-line confidence",
        "Access to a Linux virtual machine or other isolated lab system",
        "Permission to inspect every system and dataset used in the exercises"
    ],

    recommendedPrerequisites: [
        "Cybersecurity Fundamentals",
        "Networking Fundamentals"
    ],

    skills: [
        "Bash scripting",
        "Input validation",
        "Control flow",
        "Text processing",
        "Linux process inspection",
        "Network-socket inspection",
        "Defensive automation",
        "Evidence-based troubleshooting",
        "Technical documentation"
    ],

    tools: [
        "Bash",
        "GNU coreutils",
        "grep",
        "sed",
        "awk",
        "find",
        "ps",
        "ss",
        "journalctl",
        "ShellCheck"
    ],

    completionRules: {
        minimumLessonCompletion:
            100,
        minimumModuleAssessmentScore:
            75,
        finalAssessmentPassingScore:
            80,
        requireAllModuleAssessments:
            true,
        requireRequiredLabs:
            true,
        requireFinalAssessment:
            true,
        requireCapstone:
            true
    },

    progression: {
        unlockMode:
            "sequential",
        allowLessonReview:
            true,
        allowAssessmentRetry:
            true,
        trackLessonCompletion:
            true,
        trackAssessmentScores:
            true,
        trackLabCompletion:
            true,
        resumeLastLesson:
            true
    },

    assessmentStandard:
        "Module and final assessments use scenario-based questions with balanced answer positions. Practical work requires reproducible evidence, safe scope, meaningful exit behavior and written interpretation.",

    standardReferences: [
        {
            title:
                "GNU Bash Reference Manual",
            organization:
                "GNU Project",
            url:
                "https://www.gnu.org/software/bash/manual/"
        },
        {
            title:
                "ShellCheck Wiki",
            organization:
                "ShellCheck",
            url:
                "https://github.com/koalaman/shellcheck/wiki"
        }
    ],

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


/* =========================================================
   CWS COURSE STANDARDIZATION
========================================================= */

function applyBashAutomationStandard(course) {

    course.modules.forEach(
        module => {

            module.learningOutcomes = [
                `Explain the essential ${module.title} concepts and their operational implications.`,
                "Implement a small, correctly scoped Bash solution without relying on unexplained copied code.",
                "Test successful, failure and edge-case behavior and interpret the resulting evidence.",
                "Apply quoting, validation, least privilege and safe failure behavior consistently."
            ];

            const lessonLabs =
                module.lessons
                    .filter(
                        item =>
                            item.lab
                    )
                    .map(
                        (item, index) => ({
                            id:
                                `activity-${String(index + 1).padStart(2, "0")}`,
                            title:
                                item.lab.title,
                            type:
                                module.id === "module-08"
                                    ? "Portfolio Capstone Milestone"
                                    : "Guided Automation Lab",
                            access:
                                "free",
                            required:
                                true,
                            duration:
                                item.lab.duration ||
                                "60–90 minutes",
                            objective:
                                item.lab.objective ||
                                `Apply ${module.title} in a controlled Linux lab.`,
                            scenario:
                                "You are supporting the fictional CWS Academy security team. Build a narrowly scoped, non-destructive automation that another analyst can review and repeat.",
                            prerequisites: [
                                "Completed lessons in this module",
                                "Linux lab system that you own or are explicitly authorized to inspect",
                                "A dedicated working directory containing non-sensitive sample data",
                                "A recovery point before any exercise that can alter files"
                            ],
                            instructions:
                                Array.isArray(item.lab.steps)
                                    ? item.lab.steps
                                    : [],
                            evidence: [
                                "Script source with readable functions, comments and quoted expansions",
                                "The exact test inputs and expected output",
                                "Successful-run output and exit status",
                                "At least one failure or edge-case result",
                                "ShellCheck result or documented review of any accepted finding",
                                "A short explanation of security scope, limitations and next action"
                            ],
                            successCriteria:
                                item.lab.successCriteria ||
                                "The automation produces the intended result, fails safely and is supported by reproducible evidence.",
                            reflection: [
                                "Which input or environmental assumption posed the greatest reliability risk?",
                                "How did quoting, validation and exit-status handling change the result?",
                                "What would need additional approval or safeguards before production use?"
                            ],
                            cleanup: [
                                "Remove temporary files created only for the exercise.",
                                "Restore changed sample data or the lab snapshot when applicable.",
                                "Retain only sanitized scripts and evidence with no credentials, tokens or sensitive host data."
                            ],
                            safety:
                                "Use only owned or explicitly authorized systems. Begin read-only, avoid unbounded targets, do not embed secrets and never automate a destructive action without a tested recovery path.",
                            rubric: {
                                technicalAccuracy:
                                    30,
                                safeImplementation:
                                    25,
                                testingAndEvidence:
                                    25,
                                interpretation:
                                    10,
                                documentation:
                                    10
                            }
                        })
                    );

            module.labActivities =
                lessonLabs;

            module.practiceActivities =
                Array.isArray(module.practiceActivities)
                    ? module.practiceActivities
                    : [];

            module.labs =
                lessonLabs.length;

            module.assessments =
                1;

            module.moduleAssessment = {
                title:
                    `${module.title} — Verified Module Assessment`,
                type:
                    "Module Assessment",
                passingScore:
                    75,
                allowRetry:
                    true,
                showResults:
                    true,
                required:
                    true,
                questionCount:
                    bashQuestionBanks[module.id].length,
                questions:
                    balanceAnswerPositions(
                        bashQuestionBanks[module.id],
                        module.number - 1
                    )
            };

            module.lessons.forEach(
                (item, lessonIndex) => {

                    item.performanceObjectives = [
                        `Explain ${item.title} accurately in the learner's own words.`,
                        "Predict the result of the example before execution.",
                        "Implement or adapt the concept in the controlled Linux lab.",
                        "Verify both success and failure behavior using appropriate evidence."
                    ];

                    item.evidenceStandard = [
                        "Record the interpreter, relevant environment and test scope.",
                        "Preserve the exact command or script version that produced the result.",
                        "Capture input, output, error output and exit status where relevant.",
                        "Explain what the evidence proves and what it does not prove.",
                        "Mask credentials, tokens, personal data and unnecessary host identifiers."
                    ];

                    item.scriptQualityStandard = [
                        "Quote expansions unless deliberate splitting or globbing is documented.",
                        "Validate external input before use.",
                        "Use meaningful errors and non-zero exit statuses for failures.",
                        "Prefer least privilege, deterministic output and idempotent behavior.",
                        "Review with ShellCheck and test at least one failure path."
                    ];

                    item.completionCriteria = [
                        "The learner can explain the concept without copying the lesson wording.",
                        "The knowledge check is passed.",
                        "The example or associated lab is verified with interpretable evidence."
                    ];

                    const supplements = [
                        question(
                            `A script involving ${item.title} works once but fails with spaces in an input value. What should be reviewed first?`,
                            "Quoting, array use and assumptions about word splitting",
                            "Whether every command can be prefixed with sudo",
                            "Whether logging can be disabled",
                            "Whether the filename can be shortened"
                        ),
                        question(
                            `Evidence for ${item.title} differs from the prediction. What is the best response?`,
                            "Preserve the result, recheck inputs and scope, isolate the smallest failing step and document the correction",
                            "Change several commands at once",
                            "Delete the unexpected output",
                            "Report the predicted result instead"
                        )
                    ];

                    item.quiz =
                        balanceAnswerPositions(
                            [
                                ...item.quiz,
                                ...supplements.slice(
                                    0,
                                    Math.max(0, 3 - item.quiz.length)
                                )
                            ],
                            module.number + lessonIndex
                        );

                }
            );

        }
    );


    const finalScenarios = [
        question("A script must process filenames supplied by find. Which design handles unusual names most safely?", "Use null-delimited output and a matching null-delimited reader with quoted expansions", "Split output using spaces", "Use eval on each filename", "Assume filenames contain no whitespace"),
        question("A health-check command is unavailable on one host. What should the script do?", "Record the missing dependency, skip or degrade that check safely and return an honest status", "Install software without approval", "Report the check as passed", "Abort after deleting partial evidence"),
        question("A log search returns many matches. What makes the result analytically useful?", "A documented time range, source, pattern, context, false-positive limitations and prioritized follow-up", "The largest possible output file", "Only a match count", "A claim that every match is malicious"),
        question("A script needs elevated access for one read-only check. What is the best design?", "Document the need and isolate the minimum privileged operation instead of running the entire workflow with broad privilege", "Run every command as root", "Store the administrator password in the script", "Disable audit logging"),
        question("A cleanup function can remove files. What is the minimum safe control?", "Constrain it to a validated dedicated directory, reject broad or empty paths and test with disposable data", "Use an unquoted wildcard", "Run it from the filesystem root", "Ignore the target path"),
        question("What is the strongest capstone validation?", "Repeat the same controlled tests from the documented instructions and obtain consistent, correctly interpreted results", "Confirm that the file exists", "Show one successful terminal screenshot", "Run it against an unknown public host")
    ];

    const finalQuestions = [
        ...Object.values(bashQuestionBanks)
            .flatMap(
                bank =>
                    bank.slice(0, 3)
            ),
        ...finalScenarios
    ];

    course.finalAssessment = {
        id:
            "final-assessment",
        title:
            "Bash & Linux Automation Final Assessment",
        description:
            "A scenario-based assessment covering shell behavior, input handling, control flow, text processing, inspection, defensive automation, testing and professional delivery.",
        type:
            "Final Assessment",
        duration:
            "60–75 minutes",
        passingScore:
            80,
        allowRetry:
            true,
        required:
            true,
        questionCount:
            finalQuestions.length,
        questions:
            balanceAnswerPositions(finalQuestions)
    };

    course.capstone = {
        title:
            "Defensive Linux Health-Reporting Automation",
        required:
            true,
        estimatedTime:
            "6–8 hours",
        scenario:
            "Create a read-only Bash tool that collects a scoped Linux host baseline, identifies noteworthy conditions and produces an analyst-ready report without changing system configuration.",
        deliverables: [
            "Documented Bash source and usage help",
            "Dependency, privilege and input validation",
            "Read-only process, socket, storage and log observations",
            "Deterministic text or structured report output",
            "Successful, failure and edge-case test evidence",
            "ShellCheck review and accepted-finding notes",
            "README covering scope, limitations, cleanup and safe future improvements"
        ],
        rubric: {
            technicalAccuracy:
                25,
            safetyAndScope:
                20,
            reliabilityAndErrorHandling:
                20,
            testingAndEvidence:
                20,
            documentationAndInterpretation:
                15
        }
    };

    course.qualityVersion =
        "CWS-COURSE-STANDARD-2026.2";

}


applyBashAutomationStandard(
    bashLinuxAutomation
);
