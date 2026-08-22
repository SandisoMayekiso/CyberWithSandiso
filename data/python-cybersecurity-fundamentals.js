/* =========================================================
   CWS ACADEMY
   PYTHON FUNDAMENTALS FOR CYBERSECURITY
   INTERMEDIATE • FREE

   Practical Python programming for cybersecurity learners.
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
            `Learn ${title} through practical Python examples.`,

        icon:
            extra.icon ||
            "fa-brands fa-python",

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
            `Understanding ${title} helps you move beyond memorizing Python syntax and understand how the concept supports reliable cybersecurity automation.`,

        commonMistakes:
            extra.commonMistakes ||
            [
                "Copying code without understanding the data flowing through it.",
                "Assuming external input is valid before checking its type, format and expected range.",
                "Testing only the successful path instead of checking errors and unexpected conditions."
            ],

        troubleshooting:
            extra.troubleshooting ||
            [
                "Read the complete Python traceback from the final error line upward.",
                "Check variable values and data types before the failing operation.",
                "Reduce the problem to the smallest reproducible example.",
                "Use print(), logging or a debugger to inspect program state.",
                "Verify the fix with both expected and unexpected input."
            ],

        practice:
            extra.practice ||
            {
                title: "Apply What You Learned",
                steps: [
                    `Explain ${title} in your own words.`,
                    "Recreate one lesson example without copying it.",
                    "Predict the program output before running the code.",
                    "Change one input or condition and explain why the result changes.",
                    "Describe one defensive cybersecurity use for the concept."
                ]
            },

        quiz:
            extra.quiz ||
            []

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


function pythonQuestion(prompt, correct, ...distractors) {

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


const pythonQuestionBanks = {

    "module-01": [
        pythonQuestion("A port value is read from input as the string \"443\". What should happen before comparing it numerically?", "Validate the text and convert it to an integer", "Compare the string directly with every integer", "Execute the value as Python code", "Store it in a Boolean"),
        pythonQuestion("Which structure best represents one security event with named fields such as source, severity and timestamp?", "A dictionary", "A single Boolean", "A floating-point value", "A comment"),
        pythonQuestion("What does ports[0] return when ports = [22, 80, 443]?", "22", "80", "443", "The complete list"),
        pythonQuestion("Why should a learner inspect type(value) while debugging?", "To confirm the runtime data type before an operation", "To encrypt the value", "To grant the value permissions", "To import a module"),
        pythonQuestion("Which name follows clear Python variable naming for a failed-login count?", "failed_login_count", "2failed-logins", "class", "failed logins"),
        pythonQuestion("A dictionary lookup may reference a missing key. Which approach can return a controlled default?", "Use dictionary.get with an explicit default", "Convert the dictionary to an integer", "Open the dictionary as a file", "Use an infinite loop")
    ],

    "module-02": [
        pythonQuestion("A script classifies risk as high, medium or low. Why should the conditions be ordered carefully?", "The first true branch runs, so overlapping conditions can change the result", "Python always runs every branch", "Conditions can contain only strings", "Else must appear first"),
        pythonQuestion("Which loop is most appropriate for processing every event in a known list?", "A for loop", "An unconditional infinite loop", "An import statement", "A class definition"),
        pythonQuestion("What is the safest response when a while loop depends on external state?", "Define a termination condition and a maximum attempt or timeout", "Remove every break condition", "Run it as administrator", "Ignore the state value"),
        pythonQuestion("What does continue do inside a loop?", "Skips the remainder of the current iteration and moves to the next one", "Terminates Python", "Returns a value from the program", "Imports the next module"),
        pythonQuestion("A log parser should ignore blank lines. Where is that decision normally expressed?", "In a condition inside the processing loop", "In the filename extension", "In the interpreter version", "In the network socket"),
        pythonQuestion("Why should loop tests include empty and malformed input?", "To verify boundary and failure behavior, not only the happy path", "To make the loop run forever", "To disable validation", "To hide exceptions")
    ],

    "module-03": [
        pythonQuestion("What is the strongest reason to move repeated parsing logic into a function?", "It creates a reusable, testable unit with a clear responsibility", "It automatically validates every input", "It removes the need for return values", "It grants additional permissions"),
        pythonQuestion("A function calculates a risk score. What should it return?", "The calculated value needed by the caller", "A global administrator account", "The source file itself", "An imported module name"),
        pythonQuestion("Why should a function avoid changing unrelated global state?", "Hidden side effects make testing and reasoning harder", "Global state is always encrypted", "Functions cannot read parameters", "Return values stop working"),
        pythonQuestion("What does an import statement provide?", "Access to names defined by a module", "Automatic authorization to scan systems", "A new operating-system user", "A network route"),
        pythonQuestion("A custom module is named json.py and shadows the standard library json module. What is the best fix?", "Rename the local module and remove stale cache files if needed", "Run the script with more privileges", "Disable exception handling", "Convert all JSON to XML"),
        pythonQuestion("What makes a function interface easier to test?", "Explicit parameters, predictable returns and limited side effects", "Reading every value from global variables", "Printing instead of returning", "Catching every error without reporting it")
    ],

    "module-04": [
        pythonQuestion("What should happen before a script reads a user-supplied path?", "Validate the path, expected location and file type", "Execute the path as a command", "Disable filesystem permissions", "Assume the file exists"),
        pythonQuestion("Why specify encoding=\"utf-8\" when reading text or JSON?", "It makes text decoding explicit and consistent", "It encrypts the file", "It changes file ownership", "It validates every JSON field"),
        pythonQuestion("Which operation converts a Python dictionary to JSON text?", "json.dumps", "json.loads", "path.unlink", "socket.connect"),
        pythonQuestion("A security log contains one malformed line. What is a professional parser strategy?", "Record the line number and controlled error, then follow the defined policy", "Silently change the event", "Delete the complete log", "Execute the line"),
        pythonQuestion("Why should output files be written to a controlled destination?", "To reduce path confusion, accidental overwrite and unauthorized disclosure", "To avoid using variables", "To make errors impossible", "To bypass permissions"),
        pythonQuestion("Which evidence best validates a parser?", "Known input fixtures with expected counts plus malformed and empty cases", "One screenshot of the source code", "A successful import only", "The file extension")
    ],

    "module-05": [
        pythonQuestion("What information is most useful at the end of a Python traceback?", "The exception type and final message at the failing operation", "Only the first imported module", "The terminal color", "The current wallpaper"),
        pythonQuestion("When should a broad except Exception handler be used?", "At a deliberate boundary where the error is logged and handled or re-raised appropriately", "Around every line without logging", "To conceal programming defects", "Instead of input validation"),
        pythonQuestion("Which validation is strongest for a port number?", "Confirm an integer within the permitted range and the scenario's allowlist", "Check only that input is non-empty", "Accept any floating-point number", "Execute the input"),
        pythonQuestion("What should application logs avoid?", "Passwords, tokens and unnecessary personal or sensitive data", "Timestamps", "Severity levels", "Controlled error identifiers"),
        pythonQuestion("Why use named logging levels?", "They communicate severity and support filtering and routing", "They encrypt every message", "They replace tests", "They change file permissions"),
        pythonQuestion("A validation failure is security-relevant. What should be recorded?", "The field, reason, safe context and outcome without logging the secret value", "The raw password", "Every environment variable", "Nothing")
    ],

    "module-06": [
        pythonQuestion("What should a Requests call normally specify for reliability?", "An explicit timeout", "An administrator password", "A wildcard target", "An infinite retry loop"),
        pythonQuestion("What does response.raise_for_status() help detect?", "Unsuccessful HTTP status responses", "Invalid Python indentation", "Missing local files", "Socket ownership"),
        pythonQuestion("An API returns JSON with a 200 status but an unexpected schema. What should the client do?", "Validate required fields and types before using the data", "Trust the payload automatically", "Execute every returned string", "Disable TLS"),
        pythonQuestion("Where should an API token normally be stored for a local training script?", "In an approved secret or environment mechanism outside source control", "Hard-coded in the repository", "Inside a public URL", "In an exception message"),
        pythonQuestion("Why distinguish query parameters from headers?", "They have different HTTP roles, visibility and security implications", "Headers can contain only numbers", "Parameters always encrypt data", "They are identical on the wire"),
        pythonQuestion("A request fails intermittently. What evidence should be preserved?", "URL host and method, safe parameters, timeout, status or exception, timing and retry policy", "Only the successful response body", "The API token", "The browser history")
    ],

    "module-07": [
        pythonQuestion("What uniquely identifies the remote endpoint of a TCP connection?", "The remote IP address and port, interpreted with the protocol", "A filename and line number", "A JSON key", "A Python variable name"),
        pythonQuestion("Why should a socket client set a timeout?", "To avoid waiting indefinitely when a response or connection does not arrive", "To make every connection fail", "To disable DNS", "To close every local file"),
        pythonQuestion("A local connection attempt is refused. What does that normally indicate?", "The host responded but no service accepted the connection on that endpoint", "The port is definitely vulnerable", "The network is encrypted", "The Python syntax is invalid"),
        pythonQuestion("What should an authorized service checker avoid?", "Expanding from one approved endpoint into an unapproved port scan", "Closing its socket", "Reporting a timeout", "Validating the port"),
        pythonQuestion("Why use a context manager or finally block with sockets?", "To ensure resources are closed even when errors occur", "To bypass firewalls", "To grant root access", "To convert TCP to JSON"),
        pythonQuestion("Which conclusion is justified by one successful TCP connection?", "The selected endpoint accepted a connection at that time", "The service has no vulnerabilities", "Every port is open", "The host is fully trusted")
    ],

    "module-08": [
        pythonQuestion("What should a project plan define before implementation?", "Purpose, inputs, outputs, trust boundaries, failure cases and acceptance tests", "Only the filename", "Only the preferred editor", "A production target"),
        pythonQuestion("Why should the event analyzer separate parsing from reporting?", "Separation makes each responsibility easier to test and change", "It removes the need for functions", "It guarantees every input is safe", "It grants network access"),
        pythonQuestion("What makes a test fixture useful?", "Its input and expected result are controlled and reproducible", "It contains live secrets", "It changes every run", "It cannot fail"),
        pythonQuestion("A missing input file is expected user error. What is the best behavior?", "Return a clear controlled message and non-success outcome without exposing internals", "Display a full secret environment dump", "Create unrelated files", "Continue with invented data"),
        pythonQuestion("What belongs in the project README?", "Purpose, setup, usage, input and output formats, tests, limitations and security considerations", "Only the author's name", "Live tokens", "Unverified claims"),
        pythonQuestion("What makes the capstone evidence credible?", "Source, test fixtures, expected results, observed results, error cases and a sanitized report", "A screenshot without code", "Only a successful output", "A copied tutorial")
    ]

};


/* =========================================================
   COURSE
========================================================= */

export const pythonCybersecurityFundamentals = {

    id:
        "python-cybersecurity-fundamentals",

    title:
        "Python Fundamentals for Cybersecurity",

    overviewTitle:
        "Learn Python Through Cybersecurity",

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

    certificateEligible:
        true,

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

    icon:
        "fa-brands fa-python",

    description:
        "Learn Python from first principles through cybersecurity-focused explanations, worked examples, files, structured data, HTTP requests, networking, troubleshooting and safe automation.",

    longDescription:
        "Python Fundamentals for Cybersecurity teaches programming through a structured what, why, how and practice approach. Students learn not only Python syntax but why each programming concept exists, how data flows through a program, how to interpret output, how to troubleshoot failures and how the concept applies to defensive cybersecurity work. The curriculum covers variables, data structures, conditions, loops, functions, modules, files, JSON, exceptions, validation, logging, HTTP requests, sockets and safe automation, finishing with a documented cybersecurity automation project for local or explicitly authorized lab environments.",

    duration:
        "45–60 Hours",

    learningStandard:
        "Deep Explanation • Worked Examples • Cybersecurity Context • Troubleshooting • Practice",

    lessonMethod: [
        "What the concept is",
        "Why the concept exists",
        "How Python implements it",
        "Syntax and code structure",
        "Worked cybersecurity example",
        "Expected output and interpretation",
        "Defensive cybersecurity relevance",
        "Common mistakes",
        "Troubleshooting",
        "Practice and knowledge check"
    ],

    learningEnvironment:
        "Use local systems, sample data, training APIs and explicitly authorized lab environments only.",

    prerequisites: [
        "Basic computer and command-line confidence",
        "Ability to create files and run Python 3 in an owned or authorized lab",
        "No previous programming experience is required"
    ],

    recommendedPrerequisites: [
        "Cybersecurity Fundamentals",
        "Linux Fundamentals"
    ],

    skills: [
        "Python syntax and data types",
        "Collections and control flow",
        "Functions, modules and reusable design",
        "Safe file and path handling",
        "JSON and security-data parsing",
        "Exceptions, validation and secure logging",
        "HTTP API clients with timeouts and schema checks",
        "Scoped socket programming",
        "Testing, documentation and defensive automation"
    ],

    tools: [
        "Python 3",
        "venv and pip",
        "pathlib",
        "json",
        "logging",
        "Requests",
        "socket",
        "unittest or pytest-compatible test cases",
        "CWS sample logs and training APIs"
    ],

    assessmentStandard:
        "Assessments require code reasoning, safe input handling, reproducible tests, interpreted output and evidence from local, sample-data or explicitly authorized environments.",

    standardReferences: [
        {
            title:
                "The Python Tutorial",
            organization:
                "Python Software Foundation",
            url:
                "https://docs.python.org/3/tutorial/"
        },
        {
            title:
                "Python Logging Facility",
            organization:
                "Python Software Foundation",
            url:
                "https://docs.python.org/3/library/logging.html"
        },
        {
            title:
                "Requests Quickstart",
            organization:
                "Python Requests",
            url:
                "https://requests.readthedocs.io/en/latest/user/quickstart/"
        },
        {
            title:
                "Input Validation Cheat Sheet",
            organization:
                "OWASP",
            url:
                "https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html"
        },
        {
            title:
                "Logging Cheat Sheet",
            organization:
                "OWASP",
            url:
                "https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html"
        }
    ],

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

    objectives: [

        "Understand Python syntax, variables and core data types.",
        "Use lists, dictionaries and other collections.",
        "Build decision-making logic with conditions.",
        "Automate repetitive processing with loops.",
        "Write reusable functions and import modules.",
        "Read and write files safely.",
        "Parse JSON and structured security data.",
        "Handle errors using exceptions.",
        "Add useful logging to automation scripts.",
        "Understand HTTP requests and responses.",
        "Learn basic socket and networking concepts.",
        "Build and document a cybersecurity-focused Python automation project."

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
                "Python Foundations",

            description:
                "Learn Python syntax, variables, data types, collections and basic program execution.",

            access:
                "free",

            labs:
                1,

            assessments:
                1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Python and Cybersecurity",
                    "30 minutes",
                    {

                        objectives: [

                            "Explain what Python is.",
                            "Describe common cybersecurity uses for Python.",
                            "Run Python interactively.",
                            "Execute a Python script."

                        ],

                        introduction: `
                            <h2>Why Python?</h2>

                            <p>
                                Cybersecurity professionals often need to
                                process data, automate repetitive tasks,
                                communicate with APIs and build small tools.
                                Python is popular for these tasks because its
                                syntax is readable and its ecosystem is large.
                            </p>
                        `,

                        body: `
                            <h2>Python as an Automation Language</h2>

                            <p>
                                Python can help with defensive analysis,
                                reporting, file processing, API interaction,
                                lab automation and many other legitimate
                                security workflows.
                            </p>

                            <h2>Interactive Python</h2>

                            <pre><code>python3</code></pre>

                            <p>
                                This opens the Python interpreter on many Linux
                                systems.
                            </p>

                            <pre><code>print("Welcome to CWS Academy")</code></pre>

                            <h2>Python Scripts</h2>

                            <p>
                                Python code can also be saved to a file such as
                                <code>hello.py</code>.
                            </p>

                            <pre><code>print("CWS Academy")
print("Python for Cybersecurity")</code></pre>

                            <p>
                                Run it with:
                            </p>

                            <pre><code>python3 hello.py</code></pre>

                            <div class="lesson-callout">
                                <div class="lesson-callout-icon">
                                    <i class="fa-solid fa-shield-halved"></i>
                                </div>

                                <div>
                                    <strong>CWS Security Principle</strong>

                                    <p>
                                        Automation does not create
                                        authorization. Security scripts must
                                        only interact with systems, accounts
                                        and data you are permitted to use.
                                    </p>
                                </div>
                            </div>
                        `,

                        commands: [

                            {
                                command:
                                    "python3 --version",

                                explanation:
                                    "Displays the installed Python 3 version."
                            },

                            {
                                command:
                                    "python3 hello.py",

                                explanation:
                                    "Runs a Python script named hello.py."
                            }

                        ],

                        lab: {

                            title:
                                "Create Your First Python Security Script",

                            objective:
                                "Create a simple script that displays basic lab information.",

                            steps: [

                                "Create a file named cws_intro.py.",
                                "Print the heading CWS Academy Python Lab.",
                                "Print your chosen lab name.",
                                "Print a short statement explaining what you want to automate with Python.",
                                "Save the file.",
                                "Run it with python3 cws_intro.py."

                            ],

                            successCriteria:
                                "The Python script executes without errors and prints all requested information."

                        },

                        quiz: [

                            {
                                question:
                                    "Why is Python useful in cybersecurity?",

                                options: [

                                    "It can only create websites.",
                                    "It can automate and process many security-related workflows.",
                                    "It replaces operating systems.",
                                    "It can only run on Windows."

                                ],

                                answer:
                                    1
                            }

                        ]

                    }
                ),


                lesson(
                    "lesson-02",
                    "Variables and Data Types",
                    "40 minutes",
                    {

                        objectives: [

                            "Create variables.",
                            "Work with strings, integers, floats and booleans.",
                            "Inspect data types.",
                            "Convert between compatible types."

                        ],

                        body: `
                            <h2>Variables</h2>

                            <pre><code>username = "student"
failed_logins = 3
risk_score = 7.5
account_locked = False</code></pre>

                            <p>
                                Python determines the data type from the value
                                assigned to the variable.
                            </p>

                            <h2>Common Types</h2>

                            <pre><code>str
int
float
bool</code></pre>

                            <h2>Inspecting Types</h2>

                            <pre><code>print(type(username))
print(type(failed_logins))</code></pre>

                            <h2>Type Conversion</h2>

                            <pre><code>port_text = "443"
port = int(port_text)</code></pre>

                            <p>
                                Data received from users, files and network
                                services may need validation and conversion
                                before use.
                            </p>
                        `,

                        keyConcepts: [

                            {
                                title:
                                    "String",

                                description:
                                    "Text data such as usernames, hostnames and log messages."
                            },

                            {
                                title:
                                    "Integer",

                                description:
                                    "Whole numbers such as port numbers or event counts."
                            },

                            {
                                title:
                                    "Boolean",

                                description:
                                    "A True or False value useful for program decisions."
                            }

                        ],

                        quiz: [

                            {
                                question:
                                    "What type is the value 443 in Python?",

                                options: [

                                    "str",
                                    "int",
                                    "bool",
                                    "list"

                                ],

                                answer:
                                    1
                            }

                        ]

                    }
                ),


                lesson(
                    "lesson-03",
                    "Lists and Dictionaries",
                    "45 minutes",
                    {

                        objectives: [

                            "Store multiple values in lists.",
                            "Access list elements.",
                            "Store key-value data in dictionaries.",
                            "Apply collections to cybersecurity data."

                        ],

                        body: `
                            <h2>Lists</h2>

                            <pre><code>ports = [22, 80, 443]

print(ports[0])
print(len(ports))</code></pre>

                            <h2>Dictionaries</h2>

                            <pre><code>host = {
    "ip": "192.168.56.10",
    "hostname": "lab-server",
    "status": "online"
}

print(host["hostname"])</code></pre>

                            <p>
                                Dictionaries are particularly useful when
                                processing structured security records.
                            </p>

                            <h2>Nested Data</h2>

                            <pre><code>assets = [
    {"name": "server01", "os": "Linux"},
    {"name": "client01", "os": "Windows"}
]</code></pre>
                        `,

                        lab: {

                            title:
                                "Build a Small Asset Inventory",

                            objective:
                                "Represent lab systems using Python dictionaries and lists.",

                            steps: [

                                "Create a list named assets.",
                                "Add at least three dictionaries to the list.",
                                "Give each asset a name, IP address and operating system.",
                                "Print the complete list.",
                                "Print only the name of the first asset."

                            ],

                            successCriteria:
                                "The script stores and retrieves structured asset information correctly."

                        }

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
                "Conditions and Loops",

            description:
                "Control program behavior using conditions and repetitive processing.",

            access:
                "free",

            labs:
                1,

            assessments:
                1,

            lessons: [

                lesson(
                    "lesson-01",
                    "If, Elif and Else",
                    "40 minutes",
                    {

                        objectives: [

                            "Create Boolean conditions.",
                            "Use if, elif and else.",
                            "Compare strings and numbers.",
                            "Build simple security classification logic."

                        ],

                        body: `
                            <h2>Making Decisions</h2>

                            <pre><code>failed_logins = 7

if failed_logins >= 10:
    print("High")
elif failed_logins >= 5:
    print("Medium")
else:
    print("Low")</code></pre>

                            <p>
                                Indentation is part of Python syntax. Statements
                                belonging to a condition must be indented
                                consistently.
                            </p>

                            <h2>Comparison Operators</h2>

                            <pre><code>==
!=
&gt;
&lt;
&gt;=
&lt;=</code></pre>
                        `

                    }
                ),


                lesson(
                    "lesson-02",
                    "For Loops",
                    "40 minutes",
                    {

                        body: `
                            <h2>Processing Collections</h2>

                            <pre><code>ports = [22, 80, 443]

for port in ports:
    print(f"Configured port: {port}")</code></pre>

                            <h2>Looping Through Dictionaries</h2>

                            <pre><code>host = {
    "name": "server01",
    "os": "Linux"
}

for key, value in host.items():
    print(key, value)</code></pre>

                            <p>
                                Security datasets frequently contain many
                                records. Loops allow each record to be processed
                                consistently.
                            </p>
                        `

                    }
                ),


                lesson(
                    "lesson-03",
                    "While Loops and Loop Control",
                    "35 minutes",
                    {

                        body: `
                            <h2>While Loops</h2>

                            <pre><code>attempt = 1

while attempt &lt;= 3:
    print(f"Attempt {attempt}")
    attempt += 1</code></pre>

                            <h2>Break and Continue</h2>

                            <p>
                                <code>break</code> exits a loop.
                                <code>continue</code> skips to the next
                                iteration.
                            </p>

                            <p>
                                Always ensure that a while loop can eventually
                                stop.
                            </p>
                        `,

                        lab: {

                            title:
                                "Analyze Login Counts",

                            objective:
                                "Classify a harmless set of sample login-failure counts.",

                            steps: [

                                "Create a dictionary containing usernames and sample failed-login counts.",
                                "Loop through the dictionary.",
                                "Classify each count as Low, Medium or High using if statements.",
                                "Print the username, count and classification.",
                                "Verify that all sample users are processed."

                            ],

                            successCriteria:
                                "Every sample account receives the expected classification."

                        }

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
                "Functions and Modules",

            description:
                "Organize reusable Python code using functions, parameters, return values and imports.",

            access:
                "free",

            labs:
                1,

            assessments:
                1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Writing Functions",
                    "40 minutes",
                    {

                        body: `
                            <h2>Reusable Logic</h2>

                            <pre><code>def classify_login_count(count):
    if count >= 10:
        return "High"

    if count >= 5:
        return "Medium"

    return "Low"</code></pre>

                            <p>
                                Functions help avoid repeating the same logic
                                throughout a program.
                            </p>
                        `

                    }
                ),


                lesson(
                    "lesson-02",
                    "Parameters, Scope and Return Values",
                    "40 minutes",
                    {

                        body: `
                            <h2>Parameters</h2>

                            <pre><code>def describe_host(name, ip):
    return f"{name}: {ip}"

result = describe_host(
    "server01",
    "192.168.56.10"
)

print(result)</code></pre>

                            <p>
                                Parameters provide input to a function.
                                Return values send results back to the calling
                                code.
                            </p>

                            <h2>Scope</h2>

                            <p>
                                Variables created inside a function are
                                generally local to that function. Keeping data
                                scoped appropriately makes code easier to
                                understand.
                            </p>
                        `

                    }
                ),


                lesson(
                    "lesson-03",
                    "Using Python Modules",
                    "40 minutes",
                    {

                        body: `
                            <h2>The Standard Library</h2>

                            <pre><code>import platform
import datetime

print(platform.system())
print(datetime.datetime.now())</code></pre>

                            <p>
                                Python includes many modules without requiring
                                third-party packages.
                            </p>

                            <h2>Import Specific Names</h2>

                            <pre><code>from pathlib import Path

current = Path.cwd()
print(current)</code></pre>

                            <p>
                                Prefer well-maintained libraries and understand
                                why a dependency is required before adding it to
                                a security project.
                            </p>
                        `,

                        lab: {

                            title:
                                "Reusable Host Report Functions",

                            objective:
                                "Create functions that format basic host information.",

                            steps: [

                                "Import platform.",
                                "Create a function that returns the operating system name.",
                                "Create another function that formats a hostname and IP address.",
                                "Call both functions.",
                                "Print the returned values."

                            ],

                            successCriteria:
                                "The program uses functions and at least one standard-library module successfully."

                        }

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
                "Files and Security Data",

            description:
                "Read, write and process text, CSV-like data and JSON safely.",

            access:
                "free",

            labs:
                2,

            assessments:
                1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Reading and Writing Files",
                    "45 minutes",
                    {

                        body: `
                            <h2>Reading Text Files</h2>

                            <pre><code>from pathlib import Path

path = Path("sample.log")

text = path.read_text(
    encoding="utf-8"
)

print(text)</code></pre>

                            <h2>Writing Reports</h2>

                            <pre><code>report = Path("report.txt")

report.write_text(
    "CWS Security Report\n",
    encoding="utf-8"
)</code></pre>

                            <p>
                                Be careful when writing files. Overwriting an
                                existing file may destroy useful evidence or
                                data.
                            </p>
                        `

                    }
                ),


                lesson(
                    "lesson-02",
                    "Working with JSON",
                    "45 minutes",
                    {

                        body: `
                            <h2>Structured Data</h2>

                            <pre><code>import json

data = {
    "host": "server01",
    "status": "online"
}

json_text = json.dumps(
    data,
    indent=4
)

print(json_text)</code></pre>

                            <h2>Reading JSON</h2>

                            <pre><code>with open(
    "assets.json",
    "r",
    encoding="utf-8"
) as file:
    assets = json.load(file)</code></pre>

                            <p>
                                APIs and security tools frequently use JSON for
                                structured input and output.
                            </p>
                        `

                    }
                ),


                lesson(
                    "lesson-03",
                    "Parsing Security Data",
                    "45 minutes",
                    {

                        body: `
                            <h2>Processing Lines</h2>

                            <pre><code>events = [
    "INFO login successful",
    "WARNING failed login",
    "ERROR account locked"
]

for event in events:

    if "failed" in event.lower():
        print(event)</code></pre>

                            <p>
                                Small scripts can help analysts filter and
                                summarize large amounts of text before manual
                                review.
                            </p>
                        `,

                        lab: {

                            title:
                                "Security Event Summary",

                            objective:
                                "Read a harmless sample log and create an event summary.",

                            steps: [

                                "Create a sample log file containing INFO, WARNING and ERROR records.",
                                "Read the file using Python.",
                                "Count each event type.",
                                "Store the counts in a dictionary.",
                                "Write the summary to summary.json.",
                                "Open the JSON file and verify its contents."

                            ],

                            successCriteria:
                                "The program accurately summarizes the sample log and creates valid JSON."

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
                "Exceptions, Validation and Logging",

            description:
                "Handle failures safely and produce useful diagnostic information.",

            access:
                "free",

            labs:
                1,

            assessments:
                1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Exceptions",
                    "40 minutes",
                    {

                        body: `
                            <h2>Handling Expected Errors</h2>

                            <pre><code>try:
    port = int("443")
    print(port)

except ValueError:
    print("Invalid port value")</code></pre>

                            <p>
                                Exception handling allows programs to respond
                                cleanly to expected problems.
                            </p>

                            <h2>Avoid Catching Everything Blindly</h2>

                            <p>
                                Catch specific exceptions where possible.
                                Hiding every error can make troubleshooting and
                                security review difficult.
                            </p>
                        `

                    }
                ),


                lesson(
                    "lesson-02",
                    "Input Validation",
                    "40 minutes",
                    {

                        body: `
                            <h2>Validate Before Use</h2>

                            <pre><code>port = 443

if not 1 &lt;= port &lt;= 65535:
    raise ValueError(
        "Port must be between 1 and 65535"
    )</code></pre>

                            <p>
                                Scripts should define what valid input looks
                                like instead of trusting arbitrary values.
                            </p>

                            <h2>Security Benefit</h2>

                            <p>
                                Validation reduces unexpected behavior and helps
                                keep automation inside intended boundaries.
                            </p>
                        `

                    }
                ),


                lesson(
                    "lesson-03",
                    "Logging",
                    "40 minutes",
                    {

                        body: `
                            <h2>Using logging</h2>

                            <pre><code>import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s: %(message)s"
)

logging.info(
    "CWS analysis started"
)</code></pre>

                            <p>
                                Logs provide useful records for troubleshooting
                                and auditing program behavior.
                            </p>

                            <div class="lesson-callout">
                                <div class="lesson-callout-icon">
                                    <i class="fa-solid fa-lock"></i>
                                </div>

                                <div>
                                    <strong>Do Not Log Secrets</strong>

                                    <p>
                                        Passwords, API keys, authentication
                                        tokens and other secrets should not be
                                        written to ordinary logs.
                                    </p>
                                </div>
                            </div>
                        `,

                        lab: {

                            title:
                                "Build a Validated Data Processor",

                            objective:
                                "Add validation, exception handling and logging to a small script.",

                            steps: [

                                "Ask the user for a numeric port value.",
                                "Convert the input to an integer inside a try block.",
                                "Reject values outside 1 through 65535.",
                                "Log successful validation.",
                                "Print a clear error for invalid input.",
                                "Test valid text, invalid text and out-of-range values."

                            ],

                            successCriteria:
                                "The script handles all tested input without an uncontrolled crash."

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
                "HTTP Requests and APIs",

            description:
                "Understand web requests and safely automate approved HTTP interactions.",

            access:
                "free",

            labs:
                1,

            assessments:
                1,

            lessons: [

                lesson(
                    "lesson-01",
                    "HTTP Fundamentals for Python",
                    "45 minutes",
                    {

                        body: `
                            <h2>Requests and Responses</h2>

                            <p>
                                HTTP clients send requests to web servers and
                                receive responses containing status codes,
                                headers and optional body data.
                            </p>

                            <h2>Common Methods</h2>

                            <pre><code>GET
POST
PUT
PATCH
DELETE</code></pre>

                            <p>
                                This course uses read-only or controlled lab
                                examples. Later web-security courses explore
                                application security in greater depth.
                            </p>
                        `

                    }
                ),


                lesson(
                    "lesson-02",
                    "Making Requests with Python",
                    "50 minutes",
                    {

                        body: `
                            <h2>The requests Library</h2>

                            <pre><code>import requests

response = requests.get(
    "http://127.0.0.1:8000",
    timeout=5
)

print(response.status_code)</code></pre>

                            <p>
                                The example assumes a local web service running
                                in your own lab.
                            </p>

                            <h2>Timeouts Matter</h2>

                            <p>
                                Network requests should generally include a
                                timeout so a program does not wait forever for
                                an unavailable service.
                            </p>
                        `

                    }
                ),


                lesson(
                    "lesson-03",
                    "Headers, Parameters and JSON",
                    "45 minutes",
                    {

                        body: `
                            <h2>Inspecting Headers</h2>

                            <pre><code>print(response.headers)</code></pre>

                            <h2>JSON Responses</h2>

                            <pre><code>data = response.json()
print(data)</code></pre>

                            <h2>Query Parameters</h2>

                            <pre><code>params = {
    "page": 1,
    "limit": 10
}

response = requests.get(
    "http://127.0.0.1:8000/api/events",
    params=params,
    timeout=5
)</code></pre>

                            <p>
                                Only automate APIs you are authorized to access,
                                and respect their authentication and rate
                                limits.
                            </p>
                        `,

                        lab: {

                            title:
                                "Local API Response Inspector",

                            objective:
                                "Build a small client for an approved local or training API.",

                            steps: [

                                "Choose a local training endpoint.",
                                "Send a GET request with a timeout.",
                                "Print the response status code.",
                                "Print selected response headers.",
                                "If the response is JSON, parse and display it.",
                                "Handle connection errors cleanly."

                            ],

                            successCriteria:
                                "The client reports useful response information and handles an unavailable service safely."

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
                "Networking and Sockets",

            description:
                "Learn basic Python socket concepts using controlled local network exercises.",

            access:
                "free",

            labs:
                1,

            assessments:
                1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Socket Fundamentals",
                    "45 minutes",
                    {

                        body: `
                            <h2>What Is a Socket?</h2>

                            <p>
                                A socket is a programming interface used by
                                applications to communicate over a network.
                            </p>

                            <h2>Address and Port</h2>

                            <p>
                                Network services are commonly identified by an
                                IP address or hostname together with a port
                                number.
                            </p>

                            <pre><code>host = "127.0.0.1"
port = 8000</code></pre>

                            <p>
                                <code>127.0.0.1</code> refers to the local
                                machine, making it useful for safe introductory
                                networking exercises.
                            </p>
                        `

                    }
                ),


                lesson(
                    "lesson-02",
                    "Building a TCP Client",
                    "50 minutes",
                    {

                        body: `
                            <h2>Connecting to a Local Service</h2>

                            <pre><code>import socket

host = "127.0.0.1"
port = 8000

with socket.socket(
    socket.AF_INET,
    socket.SOCK_STREAM
) as client:

    client.settimeout(3)
    client.connect(
        (host, port)
    )

    print("Connected")</code></pre>

                            <p>
                                Only connect to services you own or are
                                explicitly authorized to test.
                            </p>
                        `

                    }
                ),


                lesson(
                    "lesson-03",
                    "Timeouts and Network Error Handling",
                    "40 minutes",
                    {

                        body: `
                            <h2>Networks Fail</h2>

                            <p>
                                Services may be offline, blocked or slow.
                                Reliable network programs should expect these
                                conditions.
                            </p>

                            <pre><code>import socket

try:
    # Authorized connection logic
    pass

except socket.timeout:
    print("Connection timed out")

except ConnectionRefusedError:
    print("Connection refused")</code></pre>

                            <p>
                                Specific error handling produces clearer
                                results than allowing the program to terminate
                                unexpectedly.
                            </p>
                        `,

                        lab: {

                            title:
                                "Local Service Availability Checker",

                            objective:
                                "Check whether one explicitly selected local lab service accepts a TCP connection.",

                            steps: [

                                "Set the host to 127.0.0.1.",
                                "Choose a port belonging to a service you intentionally started in your lab.",
                                "Create a TCP socket.",
                                "Set a short timeout.",
                                "Attempt one connection.",
                                "Report connected, refused or timed out.",
                                "Close the socket cleanly."

                            ],

                            successCriteria:
                                "The program correctly reports the state of the selected local service without scanning additional ports."

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
                "Cybersecurity Automation Project",

            description:
                "Combine Python fundamentals into a practical, defensive security automation project.",

            access:
                "free",

            labs:
                1,

            assessments:
                1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Project Planning",
                    "35 minutes",
                    {

                        body: `
                            <h2>CWS Security Event Analyzer</h2>

                            <p>
                                The recommended final project is a Python
                                program that reads a harmless sample security
                                log, classifies events and generates a JSON
                                report.
                            </p>

                            <h2>Project Requirements</h2>

                            <ul>
                                <li>Accept an input log filename.</li>
                                <li>Validate that the file exists.</li>
                                <li>Read the file safely.</li>
                                <li>Count INFO, WARNING and ERROR events.</li>
                                <li>Identify lines containing a selected keyword.</li>
                                <li>Store results in a dictionary.</li>
                                <li>Export the report as JSON.</li>
                                <li>Log important program events.</li>
                                <li>Handle errors cleanly.</li>
                            </ul>
                        `

                    }
                ),


                lesson(
                    "lesson-02",
                    "Build the Security Event Analyzer",
                    "90 minutes",
                    {

                        body: `
                            <h2>Suggested Program Structure</h2>

                            <pre><code>from pathlib import Path
import json
import logging


def analyze_log(path):

    results = {
        "info": 0,
        "warning": 0,
        "error": 0
    }

    for line in path.read_text(
        encoding="utf-8"
    ).splitlines():

        upper = line.upper()

        if "ERROR" in upper:
            results["error"] += 1

        elif "WARNING" in upper:
            results["warning"] += 1

        elif "INFO" in upper:
            results["info"] += 1

    return results</code></pre>

                            <p>
                                Students should extend the program themselves
                                rather than simply submitting the example.
                            </p>

                            <h2>Output</h2>

                            <pre><code>{
    "info": 14,
    "warning": 4,
    "error": 2
}</code></pre>
                        `

                    }
                ),


                lesson(
                    "lesson-03",
                    "Testing, Documentation and Assessment",
                    "50 minutes",
                    {

                        body: `
                            <h2>Test More Than the Happy Path</h2>

                            <p>
                                Test the analyzer with a valid log, an empty
                                log and a missing filename.
                            </p>

                            <h2>README Requirements</h2>

                            <ul>
                                <li>Project purpose.</li>
                                <li>Python version and dependencies.</li>
                                <li>Usage instructions.</li>
                                <li>Input format.</li>
                                <li>Example output.</li>
                                <li>Error-handling behavior.</li>
                                <li>Security and privacy considerations.</li>
                                <li>Future improvements.</li>
                            </ul>
                        `,

                        lab: {

                            title:
                                "Python Cybersecurity Capstone",

                            objective:
                                "Build and document a security-event analysis tool using the concepts from the course.",

                            steps: [

                                "Create a harmless sample security log.",
                                "Build the analyzer using functions.",
                                "Validate the supplied file path.",
                                "Count event categories.",
                                "Export the results as JSON.",
                                "Add useful logging without logging secrets.",
                                "Handle missing or unreadable files.",
                                "Test at least three scenarios.",
                                "Create a README.",
                                "Review the code for readability and safe behavior."

                            ],

                            successCriteria:
                                "The analyzer processes the sample data correctly, handles errors and produces a documented JSON report."

                        },

                        quiz: [

                            {
                                question:
                                    "What should a cybersecurity automation script do before using external input?",

                                options: [

                                    "Trust it automatically.",
                                    "Validate it against the program's expected format and scope.",
                                    "Delete it.",
                                    "Always convert it to a password."

                                ],

                                answer:
                                    1
                            },

                            {
                                question:
                                    "Why should network operations use timeouts?",

                                options: [

                                    "To make every request fail.",
                                    "To prevent the program from waiting indefinitely for an unavailable service.",
                                    "To disable networking.",
                                    "Timeouts are only used for files."

                                ],

                                answer:
                                    1
                            },

                            {
                                question:
                                    "What is the purpose of exception handling?",

                                options: [

                                    "To hide all programming mistakes.",
                                    "To respond predictably to expected failure conditions.",
                                    "To remove input validation.",
                                    "To automatically grant administrator privileges."

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

function applyPythonCybersecurityFundamentalsStandard(course) {

    const labBlueprints = {

        "module-01": {
            title:
                "Security Event Data Model",
            objective:
                "Build a small typed data model for sanitized authentication events and verify its contents.",
            instructions: [
                "Create five harmless sample events containing timestamp, username alias, source IP, port, outcome and failed-attempt count.",
                "Choose appropriate Python types and explain each choice.",
                "Store the events using lists and dictionaries.",
                "Print a readable summary without exposing real usernames or addresses.",
                "Test one missing key and one invalid port value using controlled handling."
            ]
        },

        "module-02": {
            title:
                "Deterministic Event Triage",
            objective:
                "Classify sample events with conditions and loops while proving boundary and termination behavior.",
            instructions: [
                "Define documented low, medium and high thresholds for a fictional failed-login count.",
                "Process a list of valid, empty and malformed event records.",
                "Record which branch each valid event follows and why.",
                "Use bounded iteration for any retry-style workflow.",
                "Test exact boundary values and confirm the loop terminates."
            ]
        },

        "module-03": {
            title:
                "Reusable Indicator Normalization Module",
            objective:
                "Design and test small functions that normalize and summarize harmless indicator data.",
            instructions: [
                "Define clear function inputs, outputs and error behavior.",
                "Create functions that trim and normalize hostnames, validate a numeric port and summarize a record.",
                "Move the functions into a local module and import them from a separate runner.",
                "Test expected, empty and invalid values.",
                "Document side effects and confirm the functions do not change unrelated global state."
            ]
        },

        "module-04": {
            title:
                "Safe Log-to-JSON Pipeline",
            objective:
                "Parse a harmless sample log into validated JSON using controlled paths and explicit encoding.",
            instructions: [
                "Create a disposable input directory and a sanitized sample log.",
                "Validate the requested input path and reject files outside the approved directory.",
                "Parse valid lines while recording line-numbered errors for malformed entries.",
                "Write a UTF-8 JSON report to a separate controlled output directory.",
                "Verify counts against a known expected result and test an empty and missing file."
            ]
        },

        "module-05": {
            title:
                "Validated and Observable Parser",
            objective:
                "Add precise exception handling, allowlist validation and safe structured logging to a parser.",
            instructions: [
                "Define expected input types, ranges and permitted values.",
                "Catch specific expected exceptions near the operation that can fail.",
                "Configure named log levels and a consistent message format.",
                "Log validation outcomes without passwords, tokens or raw sensitive input.",
                "Run success, validation-failure and filesystem-failure tests and interpret the logs."
            ]
        },

        "module-06": {
            title:
                "Resilient Training-API Client",
            objective:
                "Build a read-only client for an approved training API with timeouts, status checks and schema validation.",
            instructions: [
                "Use only the supplied training endpoint or a local mock service.",
                "Set an explicit connect/read timeout and call raise_for_status or equivalent status handling.",
                "Validate the expected JSON fields and types before using them.",
                "Keep credentials outside source code and never print them.",
                "Test a valid response, a timeout, an HTTP error and an unexpected JSON shape."
            ]
        },

        "module-07": {
            title:
                "Single-Endpoint Local Service Checker",
            objective:
                "Check one intentionally started local TCP service with bounded, resource-safe network code.",
            instructions: [
                "Start or select one disposable service on 127.0.0.1 and record the approved endpoint.",
                "Validate the host and port against the lab scope.",
                "Create a TCP client with a short timeout and guaranteed socket cleanup.",
                "Report connected, refused and timed-out outcomes without expanding to other ports.",
                "Stop the disposable service and confirm no temporary listener remains."
            ]
        },

        "module-08": {
            title:
                "Security Event Analyzer Portfolio Milestone",
            objective:
                "Integrate parsing, validation, error handling, logging, testing and documentation into a reviewable automation artifact.",
            instructions: [
                "Define the analyzer's purpose, trust boundaries, input contract and acceptance criteria.",
                "Implement separate parsing, analysis and reporting functions.",
                "Validate paths and data fields before processing.",
                "Create tests for valid, empty, malformed, missing and mixed-severity input.",
                "Generate a sanitized JSON report and README, then compare observed results with expected fixtures."
            ]
        }

    };


    course.modules.forEach(
        module => {

            const blueprint =
                labBlueprints[module.id];

            module.learningOutcomes = [
                `Explain the essential ${module.title} concepts and data flow.`,
                "Write readable Python that validates inputs and handles expected failures.",
                "Test normal, boundary and error behavior with reproducible sample data.",
                "Interpret output and connect the result to safe defensive cybersecurity automation."
            ];

            module.labActivities = [
                {
                    id:
                        "activity-01",
                    title:
                        blueprint.title,
                    type:
                        module.id === "module-08"
                            ? "Portfolio Capstone Milestone"
                            : "Guided Python Lab",
                    access:
                        "free",
                    required:
                        true,
                    duration:
                        module.id === "module-08"
                            ? "120–180 minutes"
                            : "60–90 minutes",
                    objective:
                        blueprint.objective,
                    scenario:
                        "You are building a defensive automation component for the fictional CWS Academy environment. Use only sanitized sample data, a local mock service or an explicitly authorized lab.",
                    prerequisites: [
                        "Completed lessons in this module",
                        "Python 3 virtual environment",
                        "Disposable working directory",
                        "Sanitized fixtures with no live credentials or personal data"
                    ],
                    instructions:
                        blueprint.instructions,
                    evidence: [
                        "Python version, dependency list and working-directory scope",
                        "Source code with clear functions and comments where needed",
                        "Input fixtures and expected results",
                        "Commands used to execute the program and tests",
                        "Observed output for success, boundary and failure cases",
                        "Interpretation, limitation and one defensive use",
                        "Cleanup confirmation"
                    ],
                    successCriteria:
                        "The program behaves predictably for documented success and failure cases, remains within scope, protects sensitive data and is supported by reproducible evidence.",
                    reflection: [
                        "Which input or dependency created the greatest reliability risk?",
                        "What does the evidence prove, and what remains untested?",
                        "How would the design change before production use?"
                    ],
                    cleanup: [
                        "Stop local mock services and close temporary network listeners.",
                        "Remove disposable input, output and cache files created only for the activity.",
                        "Delete temporary environment secrets and retain only sanitized evidence."
                    ],
                    safety:
                        "Use only sanitized sample data, local services and systems or APIs you own or are explicitly authorized to use. Do not store secrets in source control, scan unrelated targets or process real sensitive data for training.",
                    rubric: {
                        pythonCorrectness:
                            25,
                        validationAndErrorHandling:
                            20,
                        testingAndEvidence:
                            25,
                        securityAndScope:
                            15,
                        codeQualityAndDocumentation:
                            15
                    }
                }
            ];

            module.labs =
                1;
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
                    pythonQuestionBanks[module.id].length,
                questions:
                    balanceAnswerPositions(
                        pythonQuestionBanks[module.id],
                        module.number - 1
                    )
            };

            module.lessons.forEach(
                (item, lessonIndex) => {

                    item.performanceObjectives = [
                        `Explain ${item.title} accurately and trace the relevant data flow.`,
                        "Predict the result before running the example.",
                        "Implement a scoped variation without copying the completed answer.",
                        "Test one successful, one boundary and one failure case."
                    ];

                    item.evidenceStandard = [
                        "Record Python version, dependencies and authorized data or endpoint scope.",
                        "Preserve the exact source and execution command.",
                        "Capture expected and observed output for success and failure cases.",
                        "Explain the relevant exception, type, branch or protocol result.",
                        "Remove passwords, API tokens, personal data and unnecessary system identifiers."
                    ];

                    item.completionCriteria = [
                        "The learner explains the code rather than only reproducing it.",
                        "The learner predicts and verifies the result.",
                        "The three-question knowledge check is passed.",
                        "Associated practical evidence meets the stated success criteria."
                    ];

                    const supplements = [
                        pythonQuestion(
                            `Which result best demonstrates understanding of ${item.title}?`,
                            "A clear explanation supported by working code, predicted output and success plus failure tests",
                            "A copied snippet with no explanation",
                            "A screenshot without source or input",
                            "An unbounded script run against an unrelated target"
                        ),
                        pythonQuestion(
                            `${item.title} produces an unexpected result. What should happen first?`,
                            "Preserve the traceback or output, inspect inputs and types, then isolate the smallest failing example",
                            "Change several unrelated parts at once",
                            "Suppress every exception",
                            "Run the code with more privilege"
                        ),
                        pythonQuestion(
                            `Which security standard applies while practising ${item.title}?`,
                            "Use sanitized data and authorized scope, validate external input and avoid exposing secrets",
                            "Trust all input from files or APIs",
                            "Hard-code credentials for convenience",
                            "Use public targets without permission"
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


    const integrativeScenarios = [
        pythonQuestion("A parser expects an integer severity score but receives \"high\". What is the correct response?", "Reject or handle it through the documented validation path and preserve a safe error", "Execute the value", "Convert it to True automatically", "Ignore the field"),
        pythonQuestion("A dictionary record may not contain a source_ip key. Which design avoids an uncontrolled KeyError?", "Use a documented required-field check or get with an appropriate default", "Convert the record to a socket", "Import the key", "Open it with write mode"),
        pythonQuestion("A loop polls a local service. What protects reliability and scope?", "Approved endpoint, bounded attempts, delay or backoff, timeout and a clear stop condition", "An infinite loop", "Administrator privileges", "A list of public IP addresses"),
        pythonQuestion("A function both parses input and writes several global files. What refactoring improves testability?", "Separate parsing from output and pass dependencies explicitly", "Add more global variables", "Catch and discard every error", "Remove return values"),
        pythonQuestion("A supplied filename resolves outside the approved input directory. What should the script do?", "Reject it before opening the file", "Follow it automatically", "Delete the destination", "Run with elevated privileges"),
        pythonQuestion("An API call returns 503. What is the strongest client response?", "Record the status safely and apply the documented bounded retry or failure policy", "Treat it as valid JSON", "Remove the timeout", "Print the token"),
        pythonQuestion("A JSON response omits a required list field. What should happen before iteration?", "Validate the schema and report a controlled error", "Assume an arbitrary value", "Execute the response", "Disable TLS verification"),
        pythonQuestion("A socket attempt times out. Which conclusion is justified?", "The endpoint did not complete the expected operation within the timeout; the cause remains to be investigated", "The service is vulnerable", "The port is definitely closed", "The host has no network interface"),
        pythonQuestion("Which log entry is safest?", "Validation failed for field port: out of permitted range; request ID 42", "Login failed; password=Winter2026!", "API token abc123 was rejected", "Full environment follows"),
        pythonQuestion("A test passes only with one real production log. What should improve?", "Use sanitized fixtures with known expected outputs and explicit edge cases", "Commit the production log", "Delete the test", "Remove validation"),
        pythonQuestion("Which project evidence best proves correct error handling?", "Reproducible failure fixtures, expected error behavior and observed controlled output", "A claim that errors are handled", "Only a successful demonstration", "An empty README"),
        pythonQuestion("Why should an automation script use least privilege?", "A failure or misuse then has less ability to affect unrelated resources", "It increases every timeout", "It replaces testing", "It guarantees authorization"),
        pythonQuestion("What should be checked before adding a third-party dependency?", "Need, source, maintained version, license, security posture and reproducible installation", "Only package popularity", "Only the shortest name", "Whether it requests administrator access"),
        pythonQuestion("What makes the final Python portfolio recruiter-ready?", "Readable source, safe design, tests, sanitized fixtures, evidence, documentation and honest limitations", "Only a certificate screenshot", "One long function", "Live credentials")
    ];

    const finalQuestions = [
        ...Object.values(pythonQuestionBanks)
            .flatMap(
                bank =>
                    bank.slice(0, 2)
            ),
        ...integrativeScenarios
    ];

    course.finalAssessment = {
        id:
            "final-assessment",
        title:
            "Python Fundamentals for Cybersecurity Final Assessment",
        description:
            "A scenario-based assessment covering Python data, control flow, functions, files, JSON, validation, logging, HTTP clients, sockets, testing and safe automation.",
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
            "Defensive Security Event Analyzer",
        required:
            true,
        estimatedTime:
            "7–10 hours",
        scenario:
            "Build a local Python application that validates and analyzes harmless security-event fixtures, produces a sanitized JSON report and demonstrates reliable behavior under expected failure conditions.",
        deliverables: [
            "Scope, threat assumptions and input contract",
            "Readable Python source separated into parsing, analysis and reporting responsibilities",
            "Sanitized valid, empty, malformed, missing-field and boundary fixtures",
            "Path, type, range and required-field validation",
            "Specific exception handling and safe structured logging",
            "JSON report with deterministic event counts and selected indicators",
            "Automated or repeatable test matrix with expected and observed results",
            "Dependency and environment setup instructions",
            "README covering usage, limitations, privacy and security considerations",
            "Short improvement backlog for production readiness"
        ],
        rubric: {
            pythonDesignAndCorrectness:
                25,
            validationAndSecureHandling:
                20,
            testingAndFailureBehavior:
                20,
            evidenceAndInterpretation:
                15,
            documentationAndMaintainability:
                15,
            scopeAndEthics:
                5
        }
    };

    course.qualityVersion =
        "CWS-COURSE-STANDARD-2026.2";

}


applyPythonCybersecurityFundamentalsStandard(
    pythonCybersecurityFundamentals
);
