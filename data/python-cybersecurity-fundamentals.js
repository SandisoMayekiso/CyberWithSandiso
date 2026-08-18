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

    icon:
        "fa-brands fa-python",

    description:
        "Learn Python from first principles through cybersecurity-focused explanations, worked examples, files, structured data, HTTP requests, networking, troubleshooting and safe automation.",

    longDescription:
        "Python Fundamentals for Cybersecurity teaches programming through a structured what, why, how and practice approach. Students learn not only Python syntax but why each programming concept exists, how data flows through a program, how to interpret output, how to troubleshoot failures and how the concept applies to defensive cybersecurity work. The curriculum covers variables, data structures, conditions, loops, functions, modules, files, JSON, exceptions, validation, logging, HTTP requests, sockets and safe automation, finishing with a documented cybersecurity automation project for local or explicitly authorized lab environments.",

    duration:
        "35–45 Hours",

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
