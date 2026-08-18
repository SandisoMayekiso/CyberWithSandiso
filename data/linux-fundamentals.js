/* =========================================================
   CWS ACADEMY
   LINUX FUNDAMENTALS
   EXPANDED COURSE CONTENT

   This file is ready to use as:
   data/linux-fundamentals.js
========================================================= */


/* =========================================================
   HELPERS
========================================================= */

function escapeLessonText(value = "") {
    return String(value);
}


function buildParagraphs(paragraphs = []) {

    return paragraphs
        .map(
            paragraph => `
                <p>
                    ${escapeLessonText(paragraph)}
                </p>
            `
        )
        .join("");

}


function buildSections(sections = []) {

    const inferWhyItMatters = (section = {}) => {
        if (section.why) {
            return section.why;
        }

        if (section.note) {
            return section.note;
        }

        return `Understanding ${section.heading || "this concept"} helps you reason about Linux behavior instead of memorizing commands. In administration and cybersecurity, that makes troubleshooting, configuration review and security analysis more accurate.`;
    };

    const inferExampleExplanation = (section = {}) => {
        if (section.exampleExplanation) {
            return section.exampleExplanation;
        }

        if (section.demo) {
            return `Read the example from left to right. Identify the command, any options, the target being inspected or changed, and the result you expect. Run examples only in a system or lab you are authorized to use, then compare the real output with the explanation in the lesson.`;
        }

        return "";
    };

    const inferCommonMistakes = (section = {}) => {
        if (Array.isArray(section.commonMistakes) && section.commonMistakes.length) {
            return section.commonMistakes;
        }

        return [
            `Memorizing ${section.heading || "the topic"} without understanding what problem it solves.`,
            "Running a command without checking the current user, path, target, permissions or expected effect.",
            "Treating one command result as complete proof instead of checking surrounding context."
        ];
    };

    const inferTroubleshooting = (section = {}) => {
        if (Array.isArray(section.troubleshooting) && section.troubleshooting.length) {
            return section.troubleshooting;
        }

        return [
            "Read the exact error message before changing anything.",
            "Confirm your current user, working directory and permissions.",
            "Check command syntax with --help or the relevant man page.",
            "Verify the result with a separate read-only command whenever possible."
        ];
    };

    const buildList = (items = []) =>
        items
            .map(item => `<li>${escapeLessonText(item)}</li>`)
            .join("");

    return sections
        .map(
            section => {

                const paragraphs =
                    buildParagraphs(
                        section.paragraphs || []
                    );

                const demo =
                    section.demo
                        ? `
                            <div class="lesson-example">
                                <h3>
                                    <i class="fa-solid fa-terminal"></i>
                                    Practical Example
                                </h3>

                                <pre class="lesson-code-block">${escapeLessonText(
                                    section.demo
                                )}</pre>

                                <div class="lesson-example-explanation">
                                    <strong>How to read this example</strong>
                                    <p>
                                        ${escapeLessonText(
                                            inferExampleExplanation(section)
                                        )}
                                    </p>
                                </div>
                            </div>
                        `
                        : "";

                const why =
                    `
                        <div class="lesson-why">
                            <h3>
                                <i class="fa-solid fa-circle-question"></i>
                                Why does this matter?
                            </h3>

                            <p>
                                ${escapeLessonText(
                                    inferWhyItMatters(section)
                                )}
                            </p>
                        </div>
                    `;

                const note =
                    section.note
                        ? `
                            <div class="lesson-callout">

                                <div class="lesson-callout-icon">
                                    <i class="fa-solid fa-shield-halved"></i>
                                </div>

                                <div>

                                    <strong>
                                        ${escapeLessonText(
                                            section.noteTitle ||
                                            "Security Perspective"
                                        )}
                                    </strong>

                                    <p>
                                        ${escapeLessonText(
                                            section.note
                                        )}
                                    </p>

                                </div>

                            </div>
                        `
                        : "";

                const mistakes =
                    `
                        <div class="lesson-deep-dive lesson-mistakes">
                            <h3>
                                <i class="fa-solid fa-triangle-exclamation"></i>
                                Common Mistakes
                            </h3>

                            <ul>
                                ${buildList(
                                    inferCommonMistakes(section)
                                )}
                            </ul>
                        </div>
                    `;

                const troubleshooting =
                    `
                        <div class="lesson-deep-dive lesson-troubleshooting">
                            <h3>
                                <i class="fa-solid fa-screwdriver-wrench"></i>
                                Troubleshooting Approach
                            </h3>

                            <ol>
                                ${buildList(
                                    inferTroubleshooting(section)
                                )}
                            </ol>
                        </div>
                    `;

                return `
                    <section class="lesson-topic">

                        <h2>
                            ${escapeLessonText(
                                section.heading
                            )}
                        </h2>

                        ${paragraphs}

                        ${why}

                        ${demo}

                        ${note}

                        ${mistakes}

                        ${troubleshooting}

                    </section>
                `;

            }
        )
        .join("");

}


/* =========================================================
   LESSON BUILDER
========================================================= */

function lesson(
    id,
    title,
    duration,
    data
) {

    return {

        id,
        title,
        duration,

        type:
            data.type ||
            "Lesson",

        subtitle:
            data.subtitle,

        icon:
            data.icon ||
            "fa-brands fa-linux",

        objectives:
            data.objectives ||
            [],

        introduction: `
            <h2>
                ${title}
            </h2>

            ${buildParagraphs(
                data.introduction ||
                []
            )}
        `,

        body:
            buildSections(
                data.sections ||
                []
            ),

        keyConcepts:
            data.keyConcepts ||
            [],

        practice: {
            title:
                data.practice?.title ||
                "Check Your Understanding",

            instructions:
                data.practice?.instructions ||
                [
                    `Explain ${title} in your own words without looking at the lesson.`,
                    "Run or review the lesson examples in an authorized Linux lab.",
                    "Predict the result before executing each command.",
                    "Verify the result with a read-only command and explain what changed.",
                    "Write down one cybersecurity use case and one common mistake related to this lesson."
                ]
        },

        quiz:
            data.quiz ||
            []

    };

}


/* =========================================================
   COURSE
========================================================= */

export const linuxFundamentals = {

    id:
        "linux-fundamentals",

    title:
        "Linux Fundamentals",

    overviewTitle:
        "Build Your Linux Administration Foundation",

    category:
        "CWS ACADEMY • LINUX",

    level:
        "Beginner",

    levelKey:
        "beginner",

    status:
        "available",

    access:
        "free",

    icon:
        "fa-brands fa-linux",

    description:
        "Learn the Linux command line, filesystem, permissions, processes, networking utilities and security fundamentals.",

    longDescription:
        "Linux Fundamentals teaches Linux administration from first principles and a cybersecurity perspective. Every topic is designed to explain what the concept is, why it exists, how it works, how to use it, what output to expect, where it appears in real systems, common mistakes, troubleshooting approaches and its security relevance. Students learn how Linux is structured, how to navigate and manipulate the filesystem, how users and permissions work, how to inspect processes and services, how to troubleshoot networking, how to manage software, how to automate tasks with Bash and how to apply fundamental Linux security practices.",

    duration:
        "45–60 Hours",

    learningStandard:
        "Deep Explanation • Examples • Security Context • Troubleshooting • Practice",

    lessonMethod: [
        "What the concept is",
        "Why the concept exists",
        "How it works",
        "Commands and syntax",
        "Practical examples",
        "Expected interpretation",
        "Cybersecurity relevance",
        "Common mistakes",
        "Troubleshooting",
        "Knowledge check and practice"
    ],

    objectives: [

        "Understand the role of Linux in modern computing and cybersecurity.",
        "Navigate the Linux filesystem confidently using the command line.",
        "Create, inspect, copy, move, search and remove files and directories.",
        "Understand Linux users, groups, ownership and permissions.",
        "Manage and troubleshoot processes and system services.",
        "Use Linux networking commands to inspect interfaces, routes and sockets.",
        "Install, update and remove software packages securely.",
        "Use pipes, redirection, variables, conditions and loops in Bash.",
        "Read important Linux logs and understand basic host hardening.",
        "Apply Linux administration skills in security, cloud and penetration-testing environments."

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
                "Introduction to Linux",

            description:
                "Understand what Linux is, how distributions work and how to begin using the terminal and shell.",

            labs:
                1,

            assessments:
                1,

            lessons: [

                lesson(
                    "lesson-01",
                    "What Is Linux?",
                    "30 minutes",
                    {

                        subtitle:
                            "Understand Linux, the kernel, distributions and why Linux matters in cybersecurity.",

                        objectives: [
                            "Define Linux and the Linux kernel.",
                            "Explain the difference between Linux and a Linux distribution.",
                            "Recognize common Linux use cases.",
                            "Explain why Linux skills are valuable in cybersecurity."
                        ],

                        introduction: [
                            "Linux is a family of Unix-like operating systems built around the Linux kernel. It powers servers, cloud platforms, embedded systems, networking equipment, security appliances and developer workstations.",
                            "For cybersecurity students, Linux is especially important because many defensive and offensive security tools run on Linux, and many production servers that need to be protected are Linux-based."
                        ],

                        sections: [

                            {
                                heading:
                                    "The Linux Kernel",

                                paragraphs: [
                                    "The kernel is the core component of the operating system. It manages CPU scheduling, memory, devices, filesystems, networking and communication between software and hardware.",
                                    "Applications normally run in user space and request services from the kernel instead of communicating directly with hardware."
                                ],

                                demo:
`uname -a
cat /etc/os-release
whoami
id`,

                                note:
                                    "Kernel vulnerabilities can have high impact because the kernel has broad control over the system. Keeping supported kernels patched is an important part of Linux security."
                            },

                            {
                                heading:
                                    "Linux Distributions",

                                paragraphs: [
                                    "A Linux distribution combines the Linux kernel with system utilities, software repositories, a package manager and distribution-specific defaults.",
                                    "Ubuntu, Debian, Fedora, Rocky Linux, Arch Linux and Kali Linux all share Linux fundamentals even though their package managers and administration conventions differ."
                                ],

                                demo:
`Ubuntu / Debian -> apt
Fedora / RHEL   -> dnf
Arch Linux      -> pacman
Kali Linux      -> apt`
                            },

                            {
                                heading:
                                    "Why Cybersecurity Professionals Learn Linux",

                                paragraphs: [
                                    "Linux is common in web hosting, cloud computing, containers, security monitoring platforms and network appliances.",
                                    "Penetration testers also use Linux because many security utilities integrate naturally with command-line workflows. More importantly, understanding Linux administration makes it easier to recognize insecure configuration and suspicious behavior."
                                ]
                            }

                        ],

                        keyConcepts: [
                            {
                                title:
                                    "Kernel",
                                description:
                                    "Core operating-system component responsible for low-level resource management."
                            },
                            {
                                title:
                                    "Distribution",
                                description:
                                    "A complete Linux operating system built around the kernel and supporting software."
                            },
                            {
                                title:
                                    "User Space",
                                description:
                                    "Environment where ordinary user applications and processes execute."
                            },
                            {
                                title:
                                    "Root",
                                description:
                                    "The traditional Linux superuser account."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "What is the Linux kernel?",
                                options: [
                                    "A text editor",
                                    "The core operating-system component",
                                    "A web browser",
                                    "A package repository"
                                ],
                                answer:
                                    1
                            }
                        ]

                    }
                ),


                lesson(
                    "lesson-02",
                    "Linux Distributions",
                    "30 minutes",
                    {

                        subtitle:
                            "Compare Linux distribution families, release models and common use cases.",

                        objectives: [
                            "Explain what distinguishes one Linux distribution from another.",
                            "Recognize Debian-based and Red Hat-based distribution families.",
                            "Understand stable and rolling release models.",
                            "Choose a distribution based on operational requirements."
                        ],

                        introduction: [
                            "Linux distributions package the same underlying Linux concepts in different ways. They may use different package managers, release schedules, desktop environments and support models.",
                            "Security professionals often encounter several distributions in the same organization, so learning portable Linux fundamentals is more valuable than memorizing one graphical interface."
                        ],

                        sections: [

                            {
                                heading:
                                    "Distribution Families",

                                paragraphs: [
                                    "Debian and Ubuntu use DEB packages and APT. Fedora, Rocky Linux, AlmaLinux and Red Hat Enterprise Linux use RPM packages with DNF or related tooling.",
                                    "Kali Linux is Debian-based and focuses on penetration testing and security research."
                                ],

                                demo:
`Debian family:
  Debian
  Ubuntu
  Kali Linux

Red Hat family:
  Fedora
  RHEL
  Rocky Linux
  AlmaLinux`
                            },

                            {
                                heading:
                                    "Stable and Rolling Releases",

                                paragraphs: [
                                    "Stable releases prioritize predictability and support lifecycles. Rolling distributions deliver newer versions continuously.",
                                    "Production infrastructure frequently favors stable, supported releases because predictable updates simplify maintenance and testing."
                                ]
                            },

                            {
                                heading:
                                    "Choosing Securely",

                                paragraphs: [
                                    "A distribution is not secure merely because it has a security-oriented name. Security depends on patching, configuration, exposure, identity controls and operational practices."
                                ],

                                note:
                                    "Kali Linux is excellent for authorized security testing, but ordinary server distributions are often more appropriate for production workloads."
                            }

                        ],

                        keyConcepts: [
                            {
                                title:
                                    "APT",
                                description:
                                    "Package-management tooling used by Debian-based distributions."
                            },
                            {
                                title:
                                    "DNF",
                                description:
                                    "Package-management tooling commonly used by Fedora and Red Hat family distributions."
                            },
                            {
                                title:
                                    "LTS",
                                description:
                                    "Long-Term Support release with an extended support lifecycle."
                            },
                            {
                                title:
                                    "Rolling Release",
                                description:
                                    "Distribution model that continuously delivers package updates."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Which distribution family commonly uses APT?",
                                options: [
                                    "Debian and Ubuntu",
                                    "Red Hat only",
                                    "Arch only",
                                    "Windows Server"
                                ],
                                answer:
                                    0
                            }
                        ]

                    }
                ),


                lesson(
                    "lesson-03",
                    "The Linux Terminal",
                    "30 minutes",
                    {

                        subtitle:
                            "Learn how to work efficiently and safely from the Linux command line.",

                        objectives: [
                            "Explain the difference between a terminal and shell.",
                            "Read a Linux command prompt.",
                            "Understand command options and arguments.",
                            "Use command history and built-in help."
                        ],

                        introduction: [
                            "A terminal provides a text interface to a shell. On a desktop this is usually a terminal emulator, while on servers the same shell may be reached through SSH.",
                            "Command-line skills are central to Linux administration because they are fast, scriptable and available even when no graphical interface is installed."
                        ],

                        sections: [

                            {
                                heading:
                                    "Reading the Prompt",

                                paragraphs: [
                                    "A prompt often displays the username, hostname and current directory. The exact format depends on shell configuration."
                                ],

                                demo:
`student@linuxlab:~$ whoami
student

student@linuxlab:~$ pwd
/home/student`
                            },

                            {
                                heading:
                                    "Command Structure",

                                paragraphs: [
                                    "Commands usually consist of a program name followed by options and arguments. Options change behavior while arguments identify what the command should operate on."
                                ],

                                demo:
`ls -la /etc

ls     -> command
-la    -> options
/etc   -> argument`
                            },

                            {
                                heading:
                                    "Getting Help",

                                paragraphs: [
                                    "Linux provides extensive local documentation. `man` opens manual pages and many commands support `--help`."
                                ],

                                demo:
`man ls
ls --help
man chmod
help cd`
                            },

                            {
                                heading:
                                    "Command-Line Safety",

                                paragraphs: [
                                    "Linux commands can make large changes quickly. Before running commands with sudo, recursive flags, wildcards or redirection, verify exactly which files or services will be affected."
                                ],

                                note:
                                    "Treat commands copied from websites or messages as untrusted until you understand what they do."
                            }

                        ],

                        keyConcepts: [
                            {
                                title:
                                    "Terminal",
                                description:
                                    "Text interface used to interact with a shell."
                            },
                            {
                                title:
                                    "Shell",
                                description:
                                    "Program that interprets commands."
                            },
                            {
                                title:
                                    "Option",
                                description:
                                    "Modifier that changes command behavior."
                            },
                            {
                                title:
                                    "Argument",
                                description:
                                    "Value supplied to a command, such as a path."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "What does the pwd command normally display?",
                                options: [
                                    "The current working directory",
                                    "The current password",
                                    "The package database",
                                    "The kernel version"
                                ],
                                answer:
                                    0
                            }
                        ]

                    }
                ),


                lesson(
                    "lesson-04",
                    "Understanding the Shell",
                    "35 minutes",
                    {

                        subtitle:
                            "Understand Bash, variables, environment settings and quoting.",

                        objectives: [
                            "Explain the role of a Linux shell.",
                            "Recognize Bash as a common shell.",
                            "Inspect environment variables.",
                            "Use quoting to control shell interpretation."
                        ],

                        introduction: [
                            "The shell reads commands, expands variables and wildcards, performs redirection and then launches programs or built-in operations.",
                            "Bash is one of the most common Linux shells, but Zsh, Dash and Fish are also widely used."
                        ],

                        sections: [

                            {
                                heading:
                                    "Identify Your Shell",

                                paragraphs: [
                                    "The SHELL environment variable often records your configured login shell. You can also inspect the currently running shell process."
                                ],

                                demo:
`echo $SHELL
ps -p $$`
                            },

                            {
                                heading:
                                    "Environment Variables",

                                paragraphs: [
                                    "Environment variables configure behavior for the shell and programs launched from it. Important examples include HOME, USER, PATH and LANG."
                                ],

                                demo:
`echo $USER
echo $HOME
echo $PATH

course="Linux Fundamentals"
echo "$course"`
                            },

                            {
                                heading:
                                    "Quoting",

                                paragraphs: [
                                    "Double quotes permit variable expansion, while single quotes generally preserve literal text."
                                ],

                                demo:
`name="Sandiso"

echo "$name"
echo '$name'`
                            },

                            {
                                heading:
                                    "Shell Security",

                                paragraphs: [
                                    "Characters such as semicolons, pipes, redirection operators and command substitutions have special meaning to the shell.",
                                    "Applications that construct shell commands from untrusted input can create command-injection vulnerabilities."
                                ]
                            }

                        ],

                        keyConcepts: [
                            {
                                title:
                                    "Bash",
                                description:
                                    "Bourne Again Shell, a common Linux command interpreter."
                            },
                            {
                                title:
                                    "Environment Variable",
                                description:
                                    "Variable inherited by child processes."
                            },
                            {
                                title:
                                    "PATH",
                                description:
                                    "Directories searched when resolving executable commands."
                            },
                            {
                                title:
                                    "Quoting",
                                description:
                                    "Controlling how the shell interprets text."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Which environment variable commonly controls where commands are searched for?",
                                options: [
                                    "HOME",
                                    "PATH",
                                    "PWD only",
                                    "LANG"
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
           MODULE 02
        ================================================= */

        {

            id:
                "module-02",

            number:
                2,

            title:
                "Linux Filesystem",

            description:
                "Understand the Linux directory hierarchy, filesystem paths, mounts and navigation.",

            labs:
                1,

            assessments:
                1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Understanding the Linux Filesystem",
                    "30 minutes",
                    {

                        subtitle:
                            "Understand the single Linux directory tree and how storage is mounted into it.",

                        objectives: [
                            "Explain the Linux root directory.",
                            "Understand mounted filesystems.",
                            "Recognize virtual filesystems such as proc and sys.",
                            "Connect filesystem layout to administration and security."
                        ],

                        introduction: [
                            "Linux presents a single directory tree beginning at `/`, known as the root directory.",
                            "Additional disks, partitions and remote filesystems are mounted at directories within that tree instead of appearing as separate drive letters."
                        ],

                        sections: [

                            {
                                heading:
                                    "The Root Directory",

                                paragraphs: [
                                    "Every absolute path begins somewhere beneath `/`. A filesystem mounted at `/data` becomes part of the same tree as `/etc`, `/home` and `/var`."
                                ],

                                demo:
`/
├── etc
├── home
├── proc
├── usr
├── var
└── data`
                            },

                            {
                                heading:
                                    "Virtual Filesystems",

                                paragraphs: [
                                    "Some paths do not represent ordinary data stored on disk. `/proc` exposes process and kernel information, while `/sys` exposes kernel device and subsystem information."
                                ],

                                demo:
`cat /proc/cpuinfo
cat /proc/meminfo
ls /sys/class/net`
                            },

                            {
                                heading:
                                    "Mounted Storage",

                                paragraphs: [
                                    "Use `df` and `findmnt` to understand mounted filesystems and disk usage."
                                ],

                                demo:
`df -h
findmnt`
                            },

                            {
                                heading:
                                    "Security Perspective",

                                paragraphs: [
                                    "Permissions and mount options influence security. Options such as noexec, nosuid and nodev can reduce risk for specific filesystems when appropriate."
                                ]
                            }

                        ],

                        keyConcepts: [
                            {
                                title:
                                    "Root Directory",
                                description:
                                    "Top of the Linux filesystem tree."
                            },
                            {
                                title:
                                    "Mount",
                                description:
                                    "Attach a filesystem to a directory path."
                            },
                            {
                                title:
                                    "Virtual Filesystem",
                                description:
                                    "Kernel-provided filesystem exposing runtime information."
                            },
                            {
                                title:
                                    "findmnt",
                                description:
                                    "Utility for inspecting mounted filesystems."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "What is the top of the Linux filesystem hierarchy?",
                                options: [
                                    "C:\\",
                                    "/",
                                    "/home",
                                    "/etc"
                                ],
                                answer:
                                    1
                            }
                        ]

                    }
                ),


                lesson(
                    "lesson-02",
                    "Important Linux Directories",
                    "35 minutes",
                    {

                        subtitle:
                            "Learn the roles of important directories used for configuration, logs, users and applications.",

                        objectives: [
                            "Recognize common Linux directories.",
                            "Locate system configuration.",
                            "Locate logs and user data.",
                            "Identify security-relevant filesystem locations."
                        ],

                        introduction: [
                            "Linux directory conventions make it easier to find configuration, programs, logs and user data even across different distributions.",
                            "Security analysts frequently inspect `/etc`, `/var/log`, `/home`, `/tmp` and service-specific directories."
                        ],

                        sections: [

                            {
                                heading:
                                    "Core Directory Map",

                                paragraphs: [
                                    "`/etc` contains system configuration, `/home` contains ordinary user home directories and `/root` is the root account's home.",
                                    "`/var` stores data that changes during operation, including logs and caches."
                                ],

                                demo:
`/etc       system configuration
/home      user homes
/root      root home
/var/log   logs
/tmp       temporary files
/usr       programs and shared data
/opt       optional applications`
                            },

                            {
                                heading:
                                    "Executables",

                                paragraphs: [
                                    "Programs commonly live under `/usr/bin` and `/usr/sbin`. Some distributions link older locations such as `/bin` into `/usr/bin`."
                                ],

                                demo:
`which bash
command -v ssh
type cd`
                            },

                            {
                                heading:
                                    "Security-Relevant Paths",

                                paragraphs: [
                                    "SSH configuration is typically under `/etc/ssh`. Account information is stored in `/etc/passwd` and password hashes are normally protected in `/etc/shadow`.",
                                    "Authentication logs are often found in `/var/log/auth.log` or `/var/log/secure`, depending on the distribution."
                                ]
                            }

                        ],

                        keyConcepts: [
                            {
                                title:
                                    "/etc",
                                description:
                                    "System-wide configuration directory."
                            },
                            {
                                title:
                                    "/var/log",
                                description:
                                    "Common location for system and service logs."
                            },
                            {
                                title:
                                    "/home",
                                description:
                                    "Home directories for ordinary users."
                            },
                            {
                                title:
                                    "/tmp",
                                description:
                                    "Temporary file storage."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Where are system-wide configuration files commonly stored?",
                                options: [
                                    "/etc",
                                    "/tmp",
                                    "/dev/null",
                                    "/home only"
                                ],
                                answer:
                                    0
                            }
                        ]

                    }
                ),


                lesson(
                    "lesson-03",
                    "Absolute and Relative Paths",
                    "30 minutes",
                    {

                        subtitle:
                            "Use Linux paths accurately in commands, navigation and scripts.",

                        objectives: [
                            "Define absolute paths.",
                            "Define relative paths.",
                            "Use dot and dot-dot notation.",
                            "Avoid path-related automation mistakes."
                        ],

                        introduction: [
                            "A path identifies a file or directory. Absolute paths begin at `/` and are independent of your current location.",
                            "Relative paths are interpreted from the current working directory."
                        ],

                        sections: [

                            {
                                heading:
                                    "Absolute Paths",

                                paragraphs: [
                                    "An absolute path always identifies the same location if that filesystem layout exists."
                                ],

                                demo:
`cat /etc/hostname
cd /var/log`
                            },

                            {
                                heading:
                                    "Relative Paths",

                                paragraphs: [
                                    "`.` represents the current directory and `..` represents the parent directory."
                                ],

                                demo:
`cd /home/student
cat notes.txt

cd ..
ls ./student`
                            },

                            {
                                heading:
                                    "Home Directory Shortcut",

                                paragraphs: [
                                    "The tilde is commonly expanded by the shell to the current user's home directory."
                                ],

                                demo:
`cd ~
pwd
ls ~/Documents`
                            },

                            {
                                heading:
                                    "Security Perspective",

                                paragraphs: [
                                    "Security-sensitive scripts should avoid ambiguous paths and validate user-provided path input.",
                                    "A script launched from an unexpected working directory can otherwise read or overwrite the wrong file."
                                ]
                            }

                        ],

                        keyConcepts: [
                            {
                                title:
                                    "Absolute Path",
                                description:
                                    "Path beginning at the root directory."
                            },
                            {
                                title:
                                    "Relative Path",
                                description:
                                    "Path resolved from the current directory."
                            },
                            {
                                title:
                                    ".",
                                description:
                                    "Current directory."
                            },
                            {
                                title:
                                    "..",
                                description:
                                    "Parent directory."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Which path is absolute?",
                                options: [
                                    "../logs",
                                    "./config",
                                    "/etc/passwd",
                                    "notes.txt"
                                ],
                                answer:
                                    2
                            }
                        ]

                    }
                ),


                lesson(
                    "lesson-04",
                    "Filesystem Navigation",
                    "30 minutes",
                    {

                        subtitle:
                            "Navigate confidently using pwd, cd, ls and shell completion.",

                        objectives: [
                            "Identify the current directory.",
                            "Change directories efficiently.",
                            "List directory contents.",
                            "Use tab completion to reduce mistakes."
                        ],

                        introduction: [
                            "Navigation is one of the first Linux skills that should become automatic.",
                            "Administrators constantly move between configuration, logs, user data and application directories."
                        ],

                        sections: [

                            {
                                heading:
                                    "pwd and cd",

                                paragraphs: [
                                    "`pwd` prints the current working directory. `cd` changes it, and `cd -` commonly returns to the previous directory."
                                ],

                                demo:
`pwd
cd /etc
pwd
cd -`
                            },

                            {
                                heading:
                                    "Listing Contents",

                                paragraphs: [
                                    "`ls -l` displays detailed information and `ls -a` includes hidden files."
                                ],

                                demo:
`ls
ls -l
ls -la /home/student`
                            },

                            {
                                heading:
                                    "Tab Completion",

                                paragraphs: [
                                    "Press Tab to complete commands and paths where supported. Completion reduces typing errors and helps reveal possible filenames."
                                ]
                            },

                            {
                                heading:
                                    "Navigation Habit",

                                paragraphs: [
                                    "Before changing or deleting files, use `pwd` and `ls` to confirm where you are. Many command-line accidents come from operating in the wrong directory."
                                ]
                            }

                        ],

                        keyConcepts: [
                            {
                                title:
                                    "pwd",
                                description:
                                    "Print current working directory."
                            },
                            {
                                title:
                                    "cd",
                                description:
                                    "Change working directory."
                            },
                            {
                                title:
                                    "ls -la",
                                description:
                                    "Detailed listing including hidden files."
                            },
                            {
                                title:
                                    "Tab Completion",
                                description:
                                    "Shell feature for completing commands and paths."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Which command commonly returns to the previous working directory?",
                                options: [
                                    "cd -",
                                    "pwd -",
                                    "ls -",
                                    "mv -"
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
           MODULE 03
        ================================================= */

        {

            id:
                "module-03",

            number:
                3,

            title:
                "Working with Files and Directories",

            description:
                "Create, inspect, copy, move, search and remove Linux files and directories.",

            labs:
                1,

            assessments:
                1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Listing Files with ls",
                    "30 minutes",
                    {

                        subtitle:
                            "Interpret Linux file listings, hidden files, ownership and timestamps.",

                        objectives: [
                            "Use common ls options.",
                            "Interpret long-format listings.",
                            "Recognize hidden files.",
                            "Understand why file metadata matters in security investigations."
                        ],

                        introduction: [
                            "`ls` is one of the most frequently used Linux commands.",
                            "Detailed listings reveal permissions, ownership, file size and modification times."
                        ],

                        sections: [

                            {
                                heading:
                                    "Long Listing Format",

                                paragraphs: [
                                    "`ls -l` shows file type and permissions, link count, owner, group, size, timestamp and filename."
                                ],

                                demo:
`$ ls -l
-rw-r----- 1 student analysts 1842 Aug 14 10:22 report.txt`
                            },

                            {
                                heading:
                                    "Hidden Files",

                                paragraphs: [
                                    "Names beginning with a dot are hidden from normal listings. User configuration files such as `.bashrc` are common examples."
                                ],

                                demo:
`ls -a
ls -la ~/.ssh`
                            },

                            {
                                heading:
                                    "Readable Sizes",

                                paragraphs: [
                                    "`ls -lh` formats sizes with human-friendly units."
                                ],

                                demo:
`ls -lh /var/log`
                            },

                            {
                                heading:
                                    "Security Perspective",

                                paragraphs: [
                                    "Unexpected executables in temporary directories, unfamiliar hidden files or recently modified configuration can warrant investigation.",
                                    "Metadata is only a starting point; hashes, process information and logs provide additional evidence."
                                ]
                            }

                        ],

                        keyConcepts: [
                            {
                                title:
                                    "Long Format",
                                description:
                                    "Detailed listing produced by ls -l."
                            },
                            {
                                title:
                                    "Hidden File",
                                description:
                                    "Filename beginning with a dot."
                            },
                            {
                                title:
                                    "Owner",
                                description:
                                    "User account associated with a file."
                            },
                            {
                                title:
                                    "Timestamp",
                                description:
                                    "Filesystem metadata recording time-related information."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Which option includes hidden files?",
                                options: [
                                    "-a",
                                    "-r",
                                    "-s",
                                    "-x"
                                ],
                                answer:
                                    0
                            }
                        ]

                    }
                ),


                lesson(
                    "lesson-02",
                    "Creating Files and Directories",
                    "30 minutes",
                    {

                        subtitle:
                            "Create files and directory structures safely with touch, mkdir and redirection.",

                        objectives: [
                            "Create empty files.",
                            "Create nested directories.",
                            "Write and append simple file content.",
                            "Understand overwrite risks."
                        ],

                        introduction: [
                            "`touch` and `mkdir` are basic building blocks for Linux filesystem work.",
                            "Shell redirection can also create files, but care is required because output redirection can overwrite existing data."
                        ],

                        sections: [

                            {
                                heading:
                                    "Creating Files",

                                paragraphs: [
                                    "`touch` creates an empty file when it does not exist and otherwise updates timestamps."
                                ],

                                demo:
`touch notes.txt
touch report.txt evidence.txt`
                            },

                            {
                                heading:
                                    "Creating Directories",

                                paragraphs: [
                                    "`mkdir -p` creates missing parent directories automatically."
                                ],

                                demo:
`mkdir projects
mkdir -p labs/linux/module1`
                            },

                            {
                                heading:
                                    "Adding Content",

                                paragraphs: [
                                    "`>` writes output and truncates the destination first. `>>` appends."
                                ],

                                demo:
`echo "CWS Academy" > notes.txt
echo "Second line" >> notes.txt
cat notes.txt`
                            },

                            {
                                heading:
                                    "Security Perspective",

                                paragraphs: [
                                    "Before redirecting command output into configuration, logs or evidence files, confirm the target path.",
                                    "Accidentally using `>` instead of `>>` can destroy existing content."
                                ]
                            }

                        ],

                        keyConcepts: [
                            {
                                title:
                                    "touch",
                                description:
                                    "Create files or update timestamps."
                            },
                            {
                                title:
                                    "mkdir",
                                description:
                                    "Create directories."
                            },
                            {
                                title:
                                    ">",
                                description:
                                    "Redirect output and replace existing content."
                            },
                            {
                                title:
                                    ">>",
                                description:
                                    "Append output to an existing file."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Which command creates missing parent directories automatically?",
                                options: [
                                    "mkdir -p",
                                    "touch -r",
                                    "ls -a",
                                    "cp -n"
                                ],
                                answer:
                                    0
                            }
                        ]

                    }
                ),


                lesson(
                    "lesson-03",
                    "Copying, Moving and Removing Files",
                    "35 minutes",
                    {

                        subtitle:
                            "Use cp, mv, rm and rmdir carefully and predictably.",

                        objectives: [
                            "Copy files and directories.",
                            "Move and rename files.",
                            "Remove files safely.",
                            "Understand recursive operations."
                        ],

                        introduction: [
                            "Linux file-management commands are efficient and powerful.",
                            "That power means recursive or privileged mistakes can affect large amounts of data very quickly."
                        ],

                        sections: [

                            {
                                heading:
                                    "Copying",

                                paragraphs: [
                                    "`cp` copies files. Directory copies require recursive behavior or archive-style options."
                                ],

                                demo:
`cp report.txt report.bak
cp -r project project-copy
cp -a evidence evidence-backup`
                            },

                            {
                                heading:
                                    "Moving and Renaming",

                                paragraphs: [
                                    "`mv` moves a file or renames it when the destination is another filename."
                                ],

                                demo:
`mv draft.txt final.txt
mv final.txt ~/Documents/`
                            },

                            {
                                heading:
                                    "Removing",

                                paragraphs: [
                                    "`rm` removes files. Recursive removal descends into directories. `rmdir` only removes empty directories."
                                ],

                                demo:
`rm old.txt
rmdir empty-folder
rm -r test-folder`
                            },

                            {
                                heading:
                                    "Safety",

                                paragraphs: [
                                    "Avoid destructive commands you do not fully understand, particularly when they include wildcards, recursion or sudo."
                                ],

                                note:
                                    "In production environments, backups and change control matter just as much as knowing the command syntax."
                            }

                        ],

                        keyConcepts: [
                            {
                                title:
                                    "cp",
                                description:
                                    "Copy files or directory trees."
                            },
                            {
                                title:
                                    "mv",
                                description:
                                    "Move or rename filesystem objects."
                            },
                            {
                                title:
                                    "rm",
                                description:
                                    "Remove files and, with recursion, directories."
                            },
                            {
                                title:
                                    "Recursive",
                                description:
                                    "Operation applied throughout nested directory contents."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Which command is commonly used to rename a file?",
                                options: [
                                    "mv",
                                    "cat",
                                    "pwd",
                                    "grep"
                                ],
                                answer:
                                    0
                            }
                        ]

                    }
                ),


                lesson(
                    "lesson-04",
                    "Reading Files",
                    "30 minutes",
                    {

                        subtitle:
                            "Inspect text files efficiently with cat, less, head and tail.",

                        objectives: [
                            "Choose a suitable file-viewing command.",
                            "Read the beginning or end of a file.",
                            "Follow growing logs.",
                            "Avoid dumping huge files unnecessarily."
                        ],

                        introduction: [
                            "Linux configuration and log files are often plain text.",
                            "Different viewing tools are appropriate for different file sizes and investigation tasks."
                        ],

                        sections: [

                            {
                                heading:
                                    "cat and less",

                                paragraphs: [
                                    "`cat` is convenient for small files, while `less` provides paged navigation and searching for larger files."
                                ],

                                demo:
`cat /etc/hostname
less /var/log/syslog`
                            },

                            {
                                heading:
                                    "head and tail",

                                paragraphs: [
                                    "`head` shows the beginning and `tail` shows the end. `tail -f` follows new data as it is appended."
                                ],

                                demo:
`head -n 20 file.txt
tail -n 50 /var/log/auth.log
tail -f /var/log/syslog`
                            },

                            {
                                heading:
                                    "Security Perspective",

                                paragraphs: [
                                    "Following logs in real time can help observe authentication attempts and service behavior.",
                                    "Logs may contain sensitive information and should be protected accordingly."
                                ]
                            }

                        ],

                        keyConcepts: [
                            {
                                title:
                                    "cat",
                                description:
                                    "Print file contents."
                            },
                            {
                                title:
                                    "less",
                                description:
                                    "Paged file viewer."
                            },
                            {
                                title:
                                    "head",
                                description:
                                    "Display the first lines of a file."
                            },
                            {
                                title:
                                    "tail -f",
                                description:
                                    "Follow lines appended to a file."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Which command is best suited to following a growing log file?",
                                options: [
                                    "tail -f",
                                    "pwd",
                                    "mkdir",
                                    "chmod"
                                ],
                                answer:
                                    0
                            }
                        ]

                    }
                ),


                lesson(
                    "lesson-05",
                    "Searching with find and grep",
                    "35 minutes",
                    {

                        subtitle:
                            "Locate files and search their contents using find, grep and pipelines.",

                        objectives: [
                            "Search for files by name and type.",
                            "Search text for matching patterns.",
                            "Combine commands with pipes.",
                            "Use searching during administration and security investigations."
                        ],

                        introduction: [
                            "Administrators frequently need to locate configuration files, logs and specific text inside large directory trees.",
                            "`find` searches filesystem objects, while `grep` searches text."
                        ],

                        sections: [

                            {
                                heading:
                                    "Finding Files",

                                paragraphs: [
                                    "`find` can search by name, type, owner, permissions and modification time."
                                ],

                                demo:
`find /etc -name "*.conf"
find /home -type f -name "*.sh"
find /var/log -type f -mtime -1`
                            },

                            {
                                heading:
                                    "Searching Text",

                                paragraphs: [
                                    "`grep -i` ignores case, `-n` prints line numbers and `-r` searches recursively."
                                ],

                                demo:
`grep "Failed password" /var/log/auth.log
grep -in "error" application.log
grep -r "PermitRootLogin" /etc/ssh`
                            },

                            {
                                heading:
                                    "Combining Tools",

                                paragraphs: [
                                    "Pipes send one command's output to another command for further filtering."
                                ],

                                demo:
`ps aux | grep ssh
find /var/log -type f | grep auth`
                            },

                            {
                                heading:
                                    "Security Perspective",

                                paragraphs: [
                                    "Search tools help locate suspicious scripts, insecure permissions and authentication events.",
                                    "A text match is evidence to investigate, not automatic proof of compromise."
                                ]
                            }

                        ],

                        keyConcepts: [
                            {
                                title:
                                    "find",
                                description:
                                    "Search filesystem objects."
                            },
                            {
                                title:
                                    "grep",
                                description:
                                    "Search text for matching patterns."
                            },
                            {
                                title:
                                    "Regular Expression",
                                description:
                                    "Pattern language for matching text."
                            },
                            {
                                title:
                                    "Pipe",
                                description:
                                    "Send one command's output to another command."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Which command searches file contents for matching text?",
                                options: [
                                    "grep",
                                    "mkdir",
                                    "mv",
                                    "pwd"
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
           MODULE 04
        ================================================= */

        {

            id:
                "module-04",

            number:
                4,

            title:
                "Users, Groups and Permissions",

            description:
                "Understand Linux identity, ownership, permissions, sudo and privilege boundaries.",

            labs:
                1,

            assessments:
                1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Linux Users and Groups",
                    "35 minutes",
                    {

                        subtitle:
                            "Understand Linux identities, numeric IDs, service accounts and group membership.",

                        objectives: [
                            "Explain Linux users and groups.",
                            "Understand UID and GID values.",
                            "Inspect account information.",
                            "Recognize privileged and service accounts."
                        ],

                        introduction: [
                            "Linux uses users and groups to represent identities and organize access control.",
                            "Each user has a numeric user ID, or UID, and belongs to one or more groups identified by group IDs."
                        ],

                        sections: [

                            {
                                heading:
                                    "Account Information",

                                paragraphs: [
                                    "`/etc/passwd` stores basic account records. Password hashes are normally stored in the more restricted `/etc/shadow` file.",
                                    "Service accounts may exist for web servers, databases and other daemons even when those accounts are not intended for interactive login."
                                ],

                                demo:
`cat /etc/passwd
getent passwd student
id student
groups student`
                            },

                            {
                                heading:
                                    "UID and GID",

                                paragraphs: [
                                    "Linux checks numeric IDs internally. Usernames and group names are human-friendly labels mapped to those IDs.",
                                    "UID 0 traditionally represents root."
                                ],

                                demo:
`id
getent group sudo

awk -F: '$3 == 0 {print $1}' /etc/passwd`
                            },

                            {
                                heading:
                                    "Security Perspective",

                                paragraphs: [
                                    "Unexpected accounts with UID 0 or unnecessary membership in powerful groups should be investigated.",
                                    "Groups such as sudo, wheel or docker may grant substantial privilege depending on system configuration."
                                ]
                            }

                        ],

                        keyConcepts: [
                            {
                                title:
                                    "UID",
                                description:
                                    "Numeric user identifier."
                            },
                            {
                                title:
                                    "GID",
                                description:
                                    "Numeric group identifier."
                            },
                            {
                                title:
                                    "/etc/passwd",
                                description:
                                    "Basic Linux account database."
                            },
                            {
                                title:
                                    "/etc/shadow",
                                description:
                                    "Protected password-hash and password-aging database."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Which UID is traditionally associated with root?",
                                options: [
                                    "0",
                                    "1",
                                    "1000",
                                    "65535"
                                ],
                                answer:
                                    0
                            }
                        ]

                    }
                ),


                lesson(
                    "lesson-02",
                    "File Ownership",
                    "30 minutes",
                    {

                        subtitle:
                            "Understand user and group ownership and how it interacts with permissions.",

                        objectives: [
                            "Read owner and group information.",
                            "Change ownership appropriately.",
                            "Understand group-based access.",
                            "Recognize suspicious ownership changes."
                        ],

                        introduction: [
                            "Every normal Linux file has an owning user and an owning group.",
                            "Ownership determines which set of permission bits Linux evaluates for a given user."
                        ],

                        sections: [

                            {
                                heading:
                                    "Reading Ownership",

                                paragraphs: [
                                    "`ls -l` displays the owner and group after the link-count field."
                                ],

                                demo:
`-rw-r----- 1 alice analysts 2400 Aug 14 report.txt
               ^     ^
              owner group`
                            },

                            {
                                heading:
                                    "Changing Ownership",

                                paragraphs: [
                                    "`chown` changes user ownership and can also change the group. `chgrp` changes only the group."
                                ],

                                demo:
`sudo chown alice report.txt
sudo chown alice:analysts report.txt
sudo chgrp analysts report.txt`
                            },

                            {
                                heading:
                                    "Security Perspective",

                                paragraphs: [
                                    "System executables, startup scripts and sensitive configuration files should be owned by the expected administrative account.",
                                    "Unexpected ownership changes can indicate an accidental deployment problem or malicious tampering."
                                ]
                            }

                        ],

                        keyConcepts: [
                            {
                                title:
                                    "Owner",
                                description:
                                    "User account associated with a file."
                            },
                            {
                                title:
                                    "Group Owner",
                                description:
                                    "Group associated with a file."
                            },
                            {
                                title:
                                    "chown",
                                description:
                                    "Change user and optionally group ownership."
                            },
                            {
                                title:
                                    "chgrp",
                                description:
                                    "Change a file's group ownership."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Which command changes a file's owner?",
                                options: [
                                    "chown",
                                    "chmod",
                                    "grep",
                                    "ps"
                                ],
                                answer:
                                    0
                            }
                        ]

                    }
                ),


                lesson(
                    "lesson-03",
                    "Linux Permissions",
                    "40 minutes",
                    {

                        subtitle:
                            "Read symbolic and numeric permissions and understand their security impact.",

                        objectives: [
                            "Interpret symbolic permission strings.",
                            "Understand owner, group and other permission classes.",
                            "Explain directory permissions.",
                            "Recognize common numeric permission modes."
                        ],

                        introduction: [
                            "Linux permissions commonly consist of read, write and execute bits for the file owner, owning group and everyone else.",
                            "Permissions are one of the most important Linux security controls because overly broad access can expose sensitive data or allow unauthorized modification."
                        ],

                        sections: [

                            {
                                heading:
                                    "Symbolic Permissions",

                                paragraphs: [
                                    "A mode such as `-rwxr-x---` gives the owner read, write and execute; the group read and execute; and others no access."
                                ],

                                demo:
`-rwxr-x---
 ||| ||| |||
 usr grp oth`
                            },

                            {
                                heading:
                                    "Numeric Permissions",

                                paragraphs: [
                                    "Read has value 4, write value 2 and execute value 1. Add the values for each permission class.",
                                    "For example, 750 means rwx for owner, r-x for group and --- for others."
                                ],

                                demo:
`chmod 750 script.sh
chmod 640 report.txt
chmod 600 ~/.ssh/id_ed25519`
                            },

                            {
                                heading:
                                    "Directory Permissions",

                                paragraphs: [
                                    "On directories, read controls listing names, write controls creation or removal of entries, and execute controls traversal."
                                ],

                                noteTitle:
                                    "Important",

                                note:
                                    "Directory permissions behave differently from file permissions. A user can sometimes know a filename but still be unable to traverse the directory containing it."
                            },

                            {
                                heading:
                                    "Security Perspective",

                                paragraphs: [
                                    "World-writable sensitive files and private data readable by everyone are common hardening problems.",
                                    "Private keys, password databases and service secrets should use restrictive permissions."
                                ]
                            }

                        ],

                        keyConcepts: [
                            {
                                title:
                                    "Read",
                                description:
                                    "Permission represented by r or numeric value 4."
                            },
                            {
                                title:
                                    "Write",
                                description:
                                    "Permission represented by w or numeric value 2."
                            },
                            {
                                title:
                                    "Execute",
                                description:
                                    "Permission represented by x or numeric value 1."
                            },
                            {
                                title:
                                    "Other",
                                description:
                                    "Users who are neither the owner nor matched through the owning group."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "What does mode 600 normally grant?",
                                options: [
                                    "Owner read and write only",
                                    "Everyone read and write",
                                    "Owner execute only",
                                    "Group full control"
                                ],
                                answer:
                                    0
                            }
                        ]

                    }
                ),


                lesson(
                    "lesson-04",
                    "chmod, chown and chgrp",
                    "35 minutes",
                    {

                        subtitle:
                            "Modify Linux access controls safely using symbolic and numeric commands.",

                        objectives: [
                            "Use chmod in symbolic and numeric modes.",
                            "Change file ownership.",
                            "Apply recursive changes cautiously.",
                            "Verify access changes after making them."
                        ],

                        introduction: [
                            "`chmod`, `chown` and `chgrp` are the main commands used to change Linux file access and ownership.",
                            "They are simple to use, but recursive changes can affect large directory trees and should be applied carefully."
                        ],

                        sections: [

                            {
                                heading:
                                    "chmod Examples",

                                paragraphs: [
                                    "Numeric modes set a complete permission state, while symbolic modes add or remove selected permissions."
                                ],

                                demo:
`chmod 640 report.txt
chmod u+x script.sh
chmod g-w shared.txt
chmod o-r secret.txt`
                            },

                            {
                                heading:
                                    "Ownership Examples",

                                paragraphs: [
                                    "Use `user:group` syntax with chown to change both fields together."
                                ],

                                demo:
`sudo chown webadmin:www-data site.conf
sudo chgrp analysts report.txt`
                            },

                            {
                                heading:
                                    "Recursive Changes",

                                paragraphs: [
                                    "`-R` applies a change recursively. Files and directories often need different permissions, so recursive chmod deserves special care."
                                ],

                                demo:
`sudo chown -R student:student ~/project

find ~/project -maxdepth 2 -ls`
                            },

                            {
                                heading:
                                    "Avoid chmod 777",

                                paragraphs: [
                                    "Granting 777 is often used as a quick workaround when access fails, but it gives every local user broad permissions.",
                                    "Correct the actual owner, group and required permission set instead."
                                ],

                                note:
                                    "Permission problems should be solved with least privilege, not by making everything writable."
                            }

                        ],

                        keyConcepts: [
                            {
                                title:
                                    "chmod",
                                description:
                                    "Change Linux permission bits."
                            },
                            {
                                title:
                                    "Symbolic Mode",
                                description:
                                    "Permission syntax such as u+x."
                            },
                            {
                                title:
                                    "Numeric Mode",
                                description:
                                    "Permission syntax such as 640 or 750."
                            },
                            {
                                title:
                                    "Recursive",
                                description:
                                    "Apply a change throughout a directory tree."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Why is chmod 777 usually a poor security fix?",
                                options: [
                                    "It encrypts the file",
                                    "It grants broad access to everyone",
                                    "It removes ownership",
                                    "It disables execution"
                                ],
                                answer:
                                    1
                            }
                        ]

                    }
                ),


                lesson(
                    "lesson-05",
                    "sudo and Root Privileges",
                    "35 minutes",
                    {

                        subtitle:
                            "Use administrative privilege responsibly and understand least privilege.",

                        objectives: [
                            "Explain the power of root.",
                            "Understand sudo delegation.",
                            "Review sudo privileges.",
                            "Recognize risks of excessive administrative access."
                        ],

                        introduction: [
                            "The root account has broad control over Linux and can bypass many normal permission checks.",
                            "Routine administration is safer when users operate without root privileges and elevate only for tasks that require them."
                        ],

                        sections: [

                            {
                                heading:
                                    "Using sudo",

                                paragraphs: [
                                    "`sudo` allows authorized users to execute specific commands with elevated privileges according to policy."
                                ],

                                demo:
`sudo apt update
sudo systemctl restart ssh
sudo -l`
                            },

                            {
                                heading:
                                    "Root Shells",

                                paragraphs: [
                                    "`sudo -i` may open a root shell when permitted. Every command then runs with elevated privilege until you exit."
                                ],

                                demo:
`sudo -i
whoami
exit`
                            },

                            {
                                heading:
                                    "Least Privilege",

                                paragraphs: [
                                    "Users should receive only the administrative permissions required by their responsibilities.",
                                    "Broad sudo rules can make a normal account effectively equivalent to root."
                                ],

                                note:
                                    "Administrative convenience should not silently become permanent unrestricted privilege."
                            },

                            {
                                heading:
                                    "Auditability",

                                paragraphs: [
                                    "sudo usage can be logged, which provides better accountability than sharing one root password among administrators."
                                ]
                            }

                        ],

                        keyConcepts: [
                            {
                                title:
                                    "root",
                                description:
                                    "Traditional Linux superuser account."
                            },
                            {
                                title:
                                    "sudo",
                                description:
                                    "Delegated privilege-execution tool."
                            },
                            {
                                title:
                                    "Least Privilege",
                                description:
                                    "Grant only the access required to perform legitimate tasks."
                            },
                            {
                                title:
                                    "sudoers",
                                description:
                                    "Policy controlling sudo authorization."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Which command commonly shows the sudo privileges granted to your account?",
                                options: [
                                    "sudo -l",
                                    "pwd -l",
                                    "chmod -l",
                                    "grep -l only"
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
           MODULE 05
        ================================================= */

        {

            id:
                "module-05",

            number:
                5,

            title:
                "Processes and Services",

            description:
                "Inspect, manage and troubleshoot Linux processes and system services.",

            labs:
                1,

            assessments:
                1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Understanding Linux Processes",
                    "30 minutes",
                    {

                        subtitle:
                            "Understand process IDs, parent-child relationships and process states.",

                        objectives: [
                            "Define a Linux process.",
                            "Understand PID and PPID.",
                            "Recognize common process states.",
                            "Connect processes to users and security events."
                        ],

                        introduction: [
                            "A process is a running instance of a program. Linux assigns each process a process ID and records information about its owner, parent process, command line and resource usage.",
                            "Security monitoring frequently focuses on processes because malicious or unauthorized actions eventually execute as processes."
                        ],

                        sections: [

                            {
                                heading:
                                    "Process Identity",

                                paragraphs: [
                                    "A PID uniquely identifies a process at a point in time. PPID identifies the process that created it."
                                ],

                                demo:
`ps -ef
ps -o pid,ppid,user,cmd -p $$`
                            },

                            {
                                heading:
                                    "Process States",

                                paragraphs: [
                                    "Processes can be running, sleeping, stopped or zombie, among other states.",
                                    "A zombie has exited but remains in the process table until its parent collects the exit status."
                                ],

                                demo:
`ps aux

# Common STAT values:
# R = running
# S = sleeping
# T = stopped
# Z = zombie`
                            },

                            {
                                heading:
                                    "Security Perspective",

                                paragraphs: [
                                    "Unexpected processes, suspicious command lines, unusual parent-child relationships or privileged processes can be investigation leads.",
                                    "Legitimate system services often run as root, so context and expected baselines matter."
                                ]
                            }

                        ],

                        keyConcepts: [
                            {
                                title:
                                    "Process",
                                description:
                                    "Running instance of a program."
                            },
                            {
                                title:
                                    "PID",
                                description:
                                    "Process identifier."
                            },
                            {
                                title:
                                    "PPID",
                                description:
                                    "Parent process identifier."
                            },
                            {
                                title:
                                    "Zombie",
                                description:
                                    "Exited process whose parent has not yet collected its status."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "What does PID stand for?",
                                options: [
                                    "Process Identifier",
                                    "Package Installation Directory",
                                    "Permission Identity Data",
                                    "Process Internet Driver"
                                ],
                                answer:
                                    0
                            }
                        ]

                    }
                ),


                lesson(
                    "lesson-02",
                    "ps, top and htop",
                    "35 minutes",
                    {

                        subtitle:
                            "Monitor Linux processes, CPU usage and memory consumption.",

                        objectives: [
                            "Use ps for process snapshots.",
                            "Use top interactively.",
                            "Interpret CPU and memory usage.",
                            "Recognize processes that deserve further investigation."
                        ],

                        introduction: [
                            "Linux provides multiple tools for understanding what is currently running.",
                            "`ps` provides a snapshot while `top` and `htop` continuously update process and resource information."
                        ],

                        sections: [

                            {
                                heading:
                                    "Using ps",

                                paragraphs: [
                                    "`ps aux` shows processes for all users with CPU and memory information."
                                ],

                                demo:
`ps aux
ps aux --sort=-%cpu | head
ps aux --sort=-%mem | head`
                            },

                            {
                                heading:
                                    "Using top",

                                paragraphs: [
                                    "`top` summarizes CPU, memory, load and process activity in an interactive display."
                                ],

                                demo:
`top`
                            },

                            {
                                heading:
                                    "Using htop",

                                paragraphs: [
                                    "`htop`, when installed, provides a more visual and interactive process display."
                                ],

                                demo:
`htop`
                            },

                            {
                                heading:
                                    "Security Perspective",

                                paragraphs: [
                                    "A malicious crypto-miner may consume unusual CPU, while compromised applications can spawn unexpected child processes.",
                                    "High resource use alone does not prove compromise, but it can guide investigation."
                                ]
                            }

                        ],

                        keyConcepts: [
                            {
                                title:
                                    "ps",
                                description:
                                    "Command for process snapshots."
                            },
                            {
                                title:
                                    "top",
                                description:
                                    "Interactive process and resource monitor."
                            },
                            {
                                title:
                                    "CPU Usage",
                                description:
                                    "Processor resources consumed by a process."
                            },
                            {
                                title:
                                    "Memory Usage",
                                description:
                                    "RAM consumed by a process."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Which command continuously updates process and resource information?",
                                options: [
                                    "top",
                                    "mkdir",
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
                    "lesson-03",
                    "Managing Processes",
                    "35 minutes",
                    {

                        subtitle:
                            "Control processes using signals and shell job management.",

                        objectives: [
                            "Explain Linux signals.",
                            "Use kill safely.",
                            "Manage foreground and background jobs.",
                            "Understand graceful and forced termination."
                        ],

                        introduction: [
                            "Linux uses signals to notify or control processes.",
                            "Administrators can request that a process terminate, reload configuration, stop or resume."
                        ],

                        sections: [

                            {
                                heading:
                                    "Common Signals",

                                paragraphs: [
                                    "SIGTERM requests graceful termination. SIGKILL forces immediate termination and cannot be handled by the process. SIGHUP is commonly used by some daemons to reload configuration."
                                ],

                                demo:
`kill PID
kill -TERM PID
kill -HUP PID
kill -KILL PID`
                            },

                            {
                                heading:
                                    "Shell Jobs",

                                paragraphs: [
                                    "Appending `&` starts a command in the background. `jobs`, `fg` and `bg` manage jobs associated with the current shell."
                                ],

                                demo:
`sleep 300 &
jobs
fg %1`
                            },

                            {
                                heading:
                                    "Security and Incident Response",

                                paragraphs: [
                                    "Avoid jumping immediately to SIGKILL because the process cannot clean up state.",
                                    "During incident response, terminating suspicious processes can also destroy volatile evidence, so evidence collection may need to happen first."
                                ]
                            }

                        ],

                        keyConcepts: [
                            {
                                title:
                                    "Signal",
                                description:
                                    "Kernel mechanism for notifying or controlling a process."
                            },
                            {
                                title:
                                    "SIGTERM",
                                description:
                                    "Graceful termination request."
                            },
                            {
                                title:
                                    "SIGKILL",
                                description:
                                    "Forced process termination."
                            },
                            {
                                title:
                                    "Job Control",
                                description:
                                    "Shell management of foreground and background commands."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Which signal is generally preferred before SIGKILL?",
                                options: [
                                    "SIGTERM",
                                    "SIGSTOP only",
                                    "SIGPIPE",
                                    "SIGUSR2 always"
                                ],
                                answer:
                                    0
                            }
                        ]

                    }
                ),


                lesson(
                    "lesson-04",
                    "Linux Services",
                    "30 minutes",
                    {

                        subtitle:
                            "Understand daemons, background services, service accounts and listening network services.",

                        objectives: [
                            "Define a Linux service or daemon.",
                            "Identify common services.",
                            "Inspect listening services.",
                            "Explain why unnecessary services increase attack surface."
                        ],

                        introduction: [
                            "A Linux service is a long-running background process that provides system or network functionality.",
                            "Examples include SSH servers, web servers, databases, schedulers and logging services."
                        ],

                        sections: [

                            {
                                heading:
                                    "Common Services",

                                paragraphs: [
                                    "`sshd` provides SSH access, nginx or Apache may provide web services and database daemons listen for application connections."
                                ],

                                demo:
`systemctl --type=service --state=running
ss -tulpn`
                            },

                            {
                                heading:
                                    "Service Accounts",

                                paragraphs: [
                                    "Many services run under dedicated low-privilege users to limit the impact of a compromise."
                                ]
                            },

                            {
                                heading:
                                    "Attack Surface",

                                paragraphs: [
                                    "Every reachable service adds software and configuration that must be maintained.",
                                    "Disable or remove services that have no business purpose."
                                ],

                                note:
                                    "A service that is never required should not remain exposed simply because it was installed by default."
                            }

                        ],

                        keyConcepts: [
                            {
                                title:
                                    "Daemon",
                                description:
                                    "Long-running background process."
                            },
                            {
                                title:
                                    "Service",
                                description:
                                    "Managed system functionality often backed by a daemon."
                            },
                            {
                                title:
                                    "Listening Socket",
                                description:
                                    "Network endpoint waiting for incoming traffic."
                            },
                            {
                                title:
                                    "Attack Surface",
                                description:
                                    "Reachable functionality that may potentially be attacked."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Why should unnecessary services be disabled?",
                                options: [
                                    "To increase attack surface",
                                    "To reduce attack surface",
                                    "To remove all users",
                                    "To disable logging"
                                ],
                                answer:
                                    1
                            }
                        ]

                    }
                ),


                lesson(
                    "lesson-05",
                    "systemctl and systemd",
                    "40 minutes",
                    {

                        subtitle:
                            "Manage services, startup behavior and logs with systemd tools.",

                        objectives: [
                            "Inspect service status.",
                            "Start, stop and restart services.",
                            "Enable or disable startup behavior.",
                            "Inspect logs associated with a service."
                        ],

                        introduction: [
                            "systemd is the init and service-management system used by many modern Linux distributions.",
                            "It manages units representing services, timers, mounts, sockets and other operating-system resources."
                        ],

                        sections: [

                            {
                                heading:
                                    "Checking Status",

                                paragraphs: [
                                    "`systemctl status` shows whether a unit is loaded, active and enabled, along with recent diagnostic information."
                                ],

                                demo:
`systemctl status ssh
systemctl status nginx`
                            },

                            {
                                heading:
                                    "Managing Runtime State",

                                paragraphs: [
                                    "Start and stop control current runtime state, while enable and disable influence startup behavior."
                                ],

                                demo:
`sudo systemctl start nginx
sudo systemctl stop nginx
sudo systemctl restart nginx

sudo systemctl enable nginx
sudo systemctl disable nginx`
                            },

                            {
                                heading:
                                    "Reading Logs",

                                paragraphs: [
                                    "`journalctl` queries systemd's journal and can filter by unit or time."
                                ],

                                demo:
`journalctl -u ssh
journalctl -u nginx --since today
journalctl -p warning`
                            },

                            {
                                heading:
                                    "Security Perspective",

                                paragraphs: [
                                    "Attackers sometimes create or modify service units for persistence.",
                                    "Unexpected enabled services or altered unit definitions should be investigated."
                                ]
                            }

                        ],

                        keyConcepts: [
                            {
                                title:
                                    "systemd",
                                description:
                                    "Linux init and service-management system."
                            },
                            {
                                title:
                                    "Unit",
                                description:
                                    "Resource managed by systemd."
                            },
                            {
                                title:
                                    "systemctl",
                                description:
                                    "Command-line interface for systemd."
                            },
                            {
                                title:
                                    "journalctl",
                                description:
                                    "Tool for querying systemd journal logs."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Which command enables a service to start automatically at boot?",
                                options: [
                                    "systemctl enable SERVICE",
                                    "systemctl cat SERVICE",
                                    "journalctl SERVICE",
                                    "pwd SERVICE"
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
           MODULE 06
        ================================================= */

        {

            id:
                "module-06",

            number:
                6,

            title:
                "Linux Networking Fundamentals",

            description:
                "Inspect interfaces, routes, connectivity, DNS and network sockets from Linux.",

            labs:
                1,

            assessments:
                1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Linux Network Interfaces",
                    "30 minutes",
                    {

                        subtitle:
                            "Understand Linux physical, virtual and loopback network interfaces.",

                        objectives: [
                            "Identify Linux network interfaces.",
                            "Understand interface state.",
                            "Recognize loopback.",
                            "Relate interfaces to IP configuration."
                        ],

                        introduction: [
                            "Linux represents network connections as interfaces with names such as eth0, ens33, enp0s3, wlan0 and lo.",
                            "Interfaces can represent physical adapters, Wi-Fi devices, virtual machines, containers, VPN tunnels and other software-defined connections."
                        ],

                        sections: [

                            {
                                heading:
                                    "Listing Interfaces",

                                paragraphs: [
                                    "`ip link` displays link-layer information and state. `ip addr` adds IP addresses."
                                ],

                                demo:
`ip link
ip addr`
                            },

                            {
                                heading:
                                    "Loopback",

                                paragraphs: [
                                    "`lo` represents the local host itself. IPv4 loopback commonly uses 127.0.0.1 and IPv6 uses ::1."
                                ],

                                demo:
`ip addr show lo
ping -c 2 127.0.0.1`
                            },

                            {
                                heading:
                                    "Security Perspective",

                                paragraphs: [
                                    "Unexpected tunnel or virtual interfaces may be legitimate products such as VPN clients or containers.",
                                    "If they do not match expected configuration, they can become useful investigation clues."
                                ]
                            }

                        ],

                        keyConcepts: [
                            {
                                title:
                                    "Interface",
                                description:
                                    "Linux networking endpoint."
                            },
                            {
                                title:
                                    "Loopback",
                                description:
                                    "Interface for communication with the local host."
                            },
                            {
                                title:
                                    "Link State",
                                description:
                                    "Whether an interface is operationally available."
                            },
                            {
                                title:
                                    "Virtual Interface",
                                description:
                                    "Software-defined networking interface."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Which interface is normally the Linux loopback interface?",
                                options: [
                                    "lo",
                                    "eth9",
                                    "dns0",
                                    "wan-only"
                                ],
                                answer:
                                    0
                            }
                        ]

                    }
                ),


                lesson(
                    "lesson-02",
                    "ip addr and ip link",
                    "35 minutes",
                    {

                        subtitle:
                            "Inspect network addressing and link state using modern iproute2 tools.",

                        objectives: [
                            "Read IPv4 and IPv6 addresses.",
                            "Understand network prefixes.",
                            "Inspect interface state.",
                            "Recognize temporary and persistent configuration."
                        ],

                        introduction: [
                            "The modern Linux `ip` command replaces many older networking utilities.",
                            "`ip addr` focuses on addresses while `ip link` focuses on interface properties and state."
                        ],

                        sections: [

                            {
                                heading:
                                    "Reading Addresses",

                                paragraphs: [
                                    "Look for `inet` for IPv4 and `inet6` for IPv6. Prefix lengths appear after a slash."
                                ],

                                demo:
`ip addr show
ip -br addr`
                            },

                            {
                                heading:
                                    "Link State",

                                paragraphs: [
                                    "With appropriate privileges, an interface can be brought up or down."
                                ],

                                demo:
`ip link show

sudo ip link set dev eth0 down
sudo ip link set dev eth0 up`
                            },

                            {
                                heading:
                                    "Temporary Lab Addressing",

                                paragraphs: [
                                    "Addresses can be added manually for authorized lab work. Such changes may not persist after reboot."
                                ],

                                demo:
`sudo ip addr add 192.168.56.10/24 dev eth1
ip addr show dev eth1`
                            },

                            {
                                heading:
                                    "Security Perspective",

                                paragraphs: [
                                    "Unexpected IP addresses or interface-state changes can affect routing, firewall rules and monitoring.",
                                    "Configuration management helps detect unauthorized changes."
                                ]
                            }

                        ],

                        keyConcepts: [
                            {
                                title:
                                    "iproute2",
                                description:
                                    "Modern Linux networking utility suite."
                            },
                            {
                                title:
                                    "inet",
                                description:
                                    "IPv4 address marker in ip addr output."
                            },
                            {
                                title:
                                    "Prefix Length",
                                description:
                                    "Number of network bits in CIDR notation."
                            },
                            {
                                title:
                                    "Persistent Configuration",
                                description:
                                    "Network settings designed to survive reboot."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Which command gives a compact overview of interface addresses?",
                                options: [
                                    "ip -br addr",
                                    "chmod -R",
                                    "ps aux",
                                    "systemctl cat"
                                ],
                                answer:
                                    0
                            }
                        ]

                    }
                ),


                lesson(
                    "lesson-03",
                    "Routing with ip route",
                    "35 minutes",
                    {

                        subtitle:
                            "Read and troubleshoot the Linux routing table and default gateway.",

                        objectives: [
                            "Interpret a default route.",
                            "Recognize connected routes.",
                            "Understand gateways and interfaces.",
                            "Perform a route lookup for a destination."
                        ],

                        introduction: [
                            "Every Linux host makes routing decisions for outgoing packets.",
                            "The routing table determines whether a destination is directly connected or should be sent through a gateway."
                        ],

                        sections: [

                            {
                                heading:
                                    "Reading the Routing Table",

                                paragraphs: [
                                    "A default route handles destinations not matched by a more specific route."
                                ],

                                demo:
`$ ip route

default via 192.168.1.1 dev eth0
192.168.1.0/24 dev eth0 proto kernel scope link src 192.168.1.20`
                            },

                            {
                                heading:
                                    "Route Lookup",

                                paragraphs: [
                                    "`ip route get` shows how Linux expects to reach a specific destination."
                                ],

                                demo:
`ip route get 8.8.8.8
ip route get 192.168.1.50`
                            },

                            {
                                heading:
                                    "Security Perspective",

                                paragraphs: [
                                    "Unexpected routes can redirect traffic through unintended gateways or bypass expected monitoring points.",
                                    "VPN software legitimately modifies routes, so compare findings with known configuration."
                                ]
                            }

                        ],

                        keyConcepts: [
                            {
                                title:
                                    "Routing Table",
                                description:
                                    "Rules used to select network paths."
                            },
                            {
                                title:
                                    "Default Route",
                                description:
                                    "Fallback route for destinations without a more specific match."
                            },
                            {
                                title:
                                    "Gateway",
                                description:
                                    "Next-hop router used for remote networks."
                            },
                            {
                                title:
                                    "Connected Route",
                                description:
                                    "Route to a directly attached network."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Which command displays the Linux routing table?",
                                options: [
                                    "ip route",
                                    "ls route",
                                    "pwd route",
                                    "chmod route"
                                ],
                                answer:
                                    0
                            }
                        ]

                    }
                ),


                lesson(
                    "lesson-04",
                    "Ping, Traceroute and DNS",
                    "40 minutes",
                    {

                        subtitle:
                            "Troubleshoot reachability, routing paths and name resolution from Linux.",

                        objectives: [
                            "Use ping for basic reachability.",
                            "Use traceroute conceptually.",
                            "Test DNS resolution.",
                            "Distinguish DNS failures from general connectivity failures."
                        ],

                        introduction: [
                            "Linux network troubleshooting works best when each layer is tested separately.",
                            "Ping, traceroute, dig and related tools help isolate whether the problem is local connectivity, routing or name resolution."
                        ],

                        sections: [

                            {
                                heading:
                                    "Ping",

                                paragraphs: [
                                    "Ping sends ICMP echo requests. Use a limited count in labs so the command terminates automatically."
                                ],

                                demo:
`ping -c 4 192.168.1.1
ping -c 4 8.8.8.8`
                            },

                            {
                                heading:
                                    "Traceroute",

                                paragraphs: [
                                    "Traceroute sends probes with increasing hop limits to identify intermediate routers where responses are permitted."
                                ],

                                demo:
`traceroute example.com
tracepath example.com`
                            },

                            {
                                heading:
                                    "DNS",

                                paragraphs: [
                                    "`dig` provides detailed DNS output while `getent hosts` uses the system's normal resolver configuration."
                                ],

                                demo:
`dig example.com
dig example.com A
getent hosts example.com`
                            },

                            {
                                heading:
                                    "Troubleshooting Sequence",

                                paragraphs: [
                                    "If the default gateway is unreachable, investigate the local network first.",
                                    "If a public IP works but a hostname fails, investigate DNS rather than assuming Internet access is down."
                                ]
                            }

                        ],

                        keyConcepts: [
                            {
                                title:
                                    "ping",
                                description:
                                    "ICMP-based reachability utility."
                            },
                            {
                                title:
                                    "traceroute",
                                description:
                                    "Path-discovery utility."
                            },
                            {
                                title:
                                    "dig",
                                description:
                                    "DNS query and troubleshooting tool."
                            },
                            {
                                title:
                                    "getent",
                                description:
                                    "Query system-configured name-service databases."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "If a remote IP address works but the hostname does not, what should you investigate first?",
                                options: [
                                    "DNS",
                                    "Filesystem permissions",
                                    "Bash history",
                                    "Process signals"
                                ],
                                answer:
                                    0
                            }
                        ]

                    }
                ),


                lesson(
                    "lesson-05",
                    "netstat and ss",
                    "35 minutes",
                    {

                        subtitle:
                            "Inspect listening ports and active network connections on Linux.",

                        objectives: [
                            "Use ss to inspect sockets.",
                            "Understand listening and established states.",
                            "Associate sockets with processes.",
                            "Recognize suspicious network activity."
                        ],

                        introduction: [
                            "Socket inspection reveals which services a Linux host exposes and which systems it is communicating with.",
                            "`ss` is the modern Linux tool for socket information, while `netstat` is still encountered on older systems."
                        ],

                        sections: [

                            {
                                heading:
                                    "Listening Sockets",

                                paragraphs: [
                                    "`-l` shows listening sockets, `-t` TCP, `-u` UDP, `-n` numeric addresses and `-p` process information where permissions allow."
                                ],

                                demo:
`ss -tulpn
ss -lntp
ss -lnup`
                            },

                            {
                                heading:
                                    "Established Connections",

                                paragraphs: [
                                    "Use `ss -tnp` to inspect active TCP connections."
                                ],

                                demo:
`ss -tnp
ss -tan state established`
                            },

                            {
                                heading:
                                    "Security Perspective",

                                paragraphs: [
                                    "Unexpected listening ports, unfamiliar external connections or processes communicating outside their normal role can be investigation leads.",
                                    "Combine socket data with process trees, logs and asset context."
                                ]
                            }

                        ],

                        keyConcepts: [
                            {
                                title:
                                    "Socket",
                                description:
                                    "Communication endpoint."
                            },
                            {
                                title:
                                    "LISTEN",
                                description:
                                    "State waiting for inbound communication."
                            },
                            {
                                title:
                                    "ESTABLISHED",
                                description:
                                    "Active TCP connection state."
                            },
                            {
                                title:
                                    "ss",
                                description:
                                    "Modern Linux socket-inspection tool."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Which command commonly shows listening TCP and UDP sockets with process information?",
                                options: [
                                    "ss -tulpn",
                                    "chmod 777",
                                    "find / -delete",
                                    "pwd"
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
           MODULE 07
        ================================================= */

        {

            id:
                "module-07",

            number:
                7,

            title:
                "Package Management and Software",

            description:
                "Install, update, inspect and remove software using trusted Linux package-management workflows.",

            labs:
                1,

            assessments:
                1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Linux Software Packages",
                    "30 minutes",
                    {

                        subtitle:
                            "Understand packages, dependencies, repositories and software trust.",

                        objectives: [
                            "Explain Linux software packages.",
                            "Understand dependencies.",
                            "Recognize trusted repositories.",
                            "Understand risks of arbitrary software downloads."
                        ],

                        introduction: [
                            "Linux software is commonly distributed as packages containing files, metadata and dependency information.",
                            "Package managers track installed software and simplify updates and removal."
                        ],

                        sections: [

                            {
                                heading:
                                    "Package Formats",

                                paragraphs: [
                                    "Debian-based distributions commonly use DEB packages, while Red Hat-based distributions use RPM packages."
                                ],

                                demo:
`Debian / Ubuntu:
  .deb
  apt
  dpkg

RHEL / Fedora:
  .rpm
  dnf
  rpm`
                            },

                            {
                                heading:
                                    "Dependencies",

                                paragraphs: [
                                    "Applications often depend on shared libraries and supporting packages. Package managers resolve these dependencies automatically."
                                ]
                            },

                            {
                                heading:
                                    "Repository Trust",

                                paragraphs: [
                                    "Repositories provide signed metadata and controlled software sources.",
                                    "Using trusted repositories is generally safer than downloading random executables from unknown websites."
                                ],

                                note:
                                    "Do not disable signature verification merely to force a package installation."
                            }

                        ],

                        keyConcepts: [
                            {
                                title:
                                    "Package",
                                description:
                                    "Installable software bundle plus metadata."
                            },
                            {
                                title:
                                    "Dependency",
                                description:
                                    "Another package required for software to work."
                            },
                            {
                                title:
                                    "Repository",
                                description:
                                    "Managed source of software packages."
                            },
                            {
                                title:
                                    "Signature Verification",
                                description:
                                    "Cryptographic validation of package or repository authenticity."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Why are trusted package repositories useful?",
                                options: [
                                    "They provide managed, verifiable software sources",
                                    "They disable permissions",
                                    "They remove dependencies",
                                    "They prevent all vulnerabilities"
                                ],
                                answer:
                                    0
                            }
                        ]

                    }
                ),


                lesson(
                    "lesson-02",
                    "APT Package Management",
                    "35 minutes",
                    {

                        subtitle:
                            "Use APT to refresh metadata, search packages and install software.",

                        objectives: [
                            "Refresh APT metadata.",
                            "Search package repositories.",
                            "Inspect package information.",
                            "Install packages from configured repositories."
                        ],

                        introduction: [
                            "APT is the high-level package-management interface used by Debian, Ubuntu, Kali and related distributions.",
                            "It communicates with configured repositories and resolves package dependencies."
                        ],

                        sections: [

                            {
                                heading:
                                    "Refreshing Metadata",

                                paragraphs: [
                                    "`apt update` downloads current information about available package versions. It does not by itself install every available update."
                                ],

                                demo:
`sudo apt update`
                            },

                            {
                                heading:
                                    "Searching and Inspecting",

                                paragraphs: [
                                    "Search repository metadata before installing unfamiliar software."
                                ],

                                demo:
`apt search nginx
apt show nginx
apt list --installed | grep openssh`
                            },

                            {
                                heading:
                                    "Installing Packages",

                                paragraphs: [
                                    "APT displays the planned transaction before making changes."
                                ],

                                demo:
`sudo apt install curl
sudo apt install nginx`
                            },

                            {
                                heading:
                                    "Security Perspective",

                                paragraphs: [
                                    "Confirm package names and repository sources before installation.",
                                    "Typosquatting and untrusted third-party repositories can introduce malicious software."
                                ]
                            }

                        ],

                        keyConcepts: [
                            {
                                title:
                                    "apt update",
                                description:
                                    "Refresh repository package metadata."
                            },
                            {
                                title:
                                    "apt install",
                                description:
                                    "Install software packages."
                            },
                            {
                                title:
                                    "apt search",
                                description:
                                    "Search available packages."
                            },
                            {
                                title:
                                    "Repository Source",
                                description:
                                    "Configured location from which APT obtains software."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "What does sudo apt update primarily do?",
                                options: [
                                    "Refresh package metadata",
                                    "Immediately upgrade the kernel",
                                    "Delete all package caches",
                                    "Create a new user"
                                ],
                                answer:
                                    0
                            }
                        ]

                    }
                ),


                lesson(
                    "lesson-03",
                    "Installing and Removing Software",
                    "35 minutes",
                    {

                        subtitle:
                            "Install, remove and purge packages while understanding package ownership.",

                        objectives: [
                            "Install packages.",
                            "Remove packages.",
                            "Understand remove vs purge.",
                            "Determine which package installed a file."
                        ],

                        introduction: [
                            "Package managers maintain a database describing installed software and which files belong to each package.",
                            "This makes installation and removal more predictable than manually copying arbitrary binaries around the filesystem."
                        ],

                        sections: [

                            {
                                heading:
                                    "Install and Remove",

                                paragraphs: [
                                    "`remove` uninstalls a package but may retain configuration. `purge` removes package-managed configuration as well."
                                ],

                                demo:
`sudo apt install tree
sudo apt remove tree
sudo apt purge nginx`
                            },

                            {
                                heading:
                                    "Automatic Dependencies",

                                paragraphs: [
                                    "`apt autoremove` can remove packages that were installed automatically and are no longer needed. Review the proposed list before confirming."
                                ],

                                demo:
`sudo apt autoremove`
                            },

                            {
                                heading:
                                    "Package Ownership",

                                paragraphs: [
                                    "`dpkg -S` identifies which installed package owns a file and `dpkg -L` lists files belonging to a package."
                                ],

                                demo:
`dpkg -S /usr/bin/ssh
dpkg -L openssh-client | head`
                            },

                            {
                                heading:
                                    "Security Perspective",

                                paragraphs: [
                                    "Unexpected software packages can indicate unauthorized installations.",
                                    "Package inventories are useful when comparing a system with a known-good baseline."
                                ]
                            }

                        ],

                        keyConcepts: [
                            {
                                title:
                                    "remove",
                                description:
                                    "Uninstall a package while often retaining configuration."
                            },
                            {
                                title:
                                    "purge",
                                description:
                                    "Remove a package and package-managed configuration."
                            },
                            {
                                title:
                                    "dpkg -S",
                                description:
                                    "Identify which installed package owns a file."
                            },
                            {
                                title:
                                    "autoremove",
                                description:
                                    "Remove unused automatically installed dependencies."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Which APT action removes package-managed configuration as well?",
                                options: [
                                    "purge",
                                    "search",
                                    "show",
                                    "download"
                                ],
                                answer:
                                    0
                            }
                        ]

                    }
                ),


                lesson(
                    "lesson-04",
                    "Updating Linux Systems",
                    "40 minutes",
                    {

                        subtitle:
                            "Understand Linux patch management, update planning and security remediation.",

                        objectives: [
                            "Explain why patching matters.",
                            "Distinguish metadata refresh from package upgrades.",
                            "Review available updates.",
                            "Understand why services may need restart or reboot."
                        ],

                        introduction: [
                            "Software updates frequently include fixes for security vulnerabilities and reliability problems.",
                            "Production patching still requires planning because updates can affect compatibility and service availability."
                        ],

                        sections: [

                            {
                                heading:
                                    "Reviewing Updates",

                                paragraphs: [
                                    "Refresh metadata, review the available changes and then apply updates according to policy."
                                ],

                                demo:
`sudo apt update
apt list --upgradable
sudo apt upgrade`
                            },

                            {
                                heading:
                                    "Running Code vs Updated Files",

                                paragraphs: [
                                    "Updating files on disk does not always mean running processes have loaded the new code.",
                                    "Services may need restart and kernel updates commonly require reboot."
                                ],

                                demo:
`uname -r
systemctl status ssh`
                            },

                            {
                                heading:
                                    "Security Perspective",

                                paragraphs: [
                                    "Attackers often target vulnerabilities after fixes become public.",
                                    "Systems that cannot be patched immediately should use compensating controls such as reduced exposure, segmentation and increased monitoring."
                                ]
                            },

                            {
                                heading:
                                    "Operational Practice",

                                paragraphs: [
                                    "Important production systems should use backups, testing and maintenance windows appropriate to their criticality."
                                ]
                            }

                        ],

                        keyConcepts: [
                            {
                                title:
                                    "Patch Management",
                                description:
                                    "Process of testing and deploying software fixes."
                            },
                            {
                                title:
                                    "Upgrade",
                                description:
                                    "Install newer package versions."
                            },
                            {
                                title:
                                    "Compensating Control",
                                description:
                                    "Alternative protection used when primary remediation is delayed."
                            },
                            {
                                title:
                                    "Maintenance Window",
                                description:
                                    "Planned time for operational changes."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Why might a service need to restart after its package is updated?",
                                options: [
                                    "The running process may still have old code loaded",
                                    "Linux deletes every service",
                                    "APT disables networking",
                                    "Permissions disappear automatically"
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
           MODULE 08
        ================================================= */

        {

            id:
                "module-08",

            number:
                8,

            title:
                "Bash and Shell Scripting",

            description:
                "Automate Linux tasks with variables, pipelines, conditions, loops and executable Bash scripts.",

            labs:
                1,

            assessments:
                1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Introduction to Bash",
                    "30 minutes",
                    {

                        subtitle:
                            "Understand shell scripts, shebangs and executable Bash files.",

                        objectives: [
                            "Define a shell script.",
                            "Use a shebang.",
                            "Run scripts safely.",
                            "Understand executable permissions."
                        ],

                        introduction: [
                            "A Bash script is a text file containing commands that the shell executes in sequence.",
                            "Scripts turn repeated manual steps into reusable automation, which improves consistency but can also repeat mistakes quickly if the script is poorly tested."
                        ],

                        sections: [

                            {
                                heading:
                                    "Your First Script",

                                paragraphs: [
                                    "A shebang on the first line tells Linux which interpreter should execute the script when it is run directly."
                                ],

                                demo:
`#!/usr/bin/env bash

echo "Hello from CWS Academy"`
                            },

                            {
                                heading:
                                    "Make the Script Executable",

                                paragraphs: [
                                    "Grant execute permission and run the script with a relative or absolute path."
                                ],

                                demo:
`chmod u+x hello.sh
./hello.sh`
                            },

                            {
                                heading:
                                    "Run Through Bash",

                                paragraphs: [
                                    "You can also invoke Bash explicitly without first setting the execute bit."
                                ],

                                demo:
`bash hello.sh`
                            },

                            {
                                heading:
                                    "Security Perspective",

                                paragraphs: [
                                    "Never run downloaded shell scripts blindly.",
                                    "Read scripts before executing them, especially when instructions pipe remote content directly into a privileged shell."
                                ]
                            }

                        ],

                        keyConcepts: [
                            {
                                title:
                                    "Shell Script",
                                description:
                                    "Text file containing commands for a shell."
                            },
                            {
                                title:
                                    "Shebang",
                                description:
                                    "Interpreter directive at the start of a script."
                            },
                            {
                                title:
                                    "Executable Bit",
                                description:
                                    "Permission allowing direct execution of a file."
                            },
                            {
                                title:
                                    "Automation",
                                description:
                                    "Using scripts to perform repeatable tasks."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "What does a shebang specify?",
                                options: [
                                    "The script interpreter",
                                    "The file owner",
                                    "The DNS server",
                                    "The current process ID"
                                ],
                                answer:
                                    0
                            }
                        ]

                    }
                ),


                lesson(
                    "lesson-02",
                    "Variables and User Input",
                    "35 minutes",
                    {

                        subtitle:
                            "Store values, accept arguments and handle user input safely in Bash.",

                        objectives: [
                            "Create and reference Bash variables.",
                            "Use positional parameters.",
                            "Read interactive input.",
                            "Quote variable expansions correctly."
                        ],

                        introduction: [
                            "Variables make scripts reusable by allowing values such as filenames, usernames and paths to change without rewriting the script.",
                            "Bash scripts can receive values from command-line arguments or interactive prompts."
                        ],

                        sections: [

                            {
                                heading:
                                    "Variables",

                                paragraphs: [
                                    "Bash variable assignment does not use spaces around the equals sign."
                                ],

                                demo:
`course="Linux Fundamentals"

echo "$course"`
                            },

                            {
                                heading:
                                    "Command-Line Arguments",

                                paragraphs: [
                                    "`$1`, `$2` and later values represent positional arguments. `$#` contains the number of arguments supplied."
                                ],

                                demo:
`#!/usr/bin/env bash

file="$1"

echo "Inspecting: $file"

# Example:
./inspect.sh /var/log/syslog`
                            },

                            {
                                heading:
                                    "Interactive Input",

                                paragraphs: [
                                    "`read` can accept input directly from the user."
                                ],

                                demo:
`read -r -p "Enter a username: " username

echo "User: $username"`
                            },

                            {
                                heading:
                                    "Quote Expansions",

                                paragraphs: [
                                    "Use quotes around variable expansions unless you deliberately want word splitting or wildcard expansion.",
                                    "This is especially important when filenames may contain spaces."
                                ],

                                demo:
`file="My Report.txt"

cat "$file"`
                            },

                            {
                                heading:
                                    "Security Perspective",

                                paragraphs: [
                                    "Do not insert untrusted input into privileged shell commands without careful validation.",
                                    "Quoting prevents many accidental parsing problems but does not automatically make every constructed shell command safe."
                                ]
                            }

                        ],

                        keyConcepts: [
                            {
                                title:
                                    "Variable",
                                description:
                                    "Named value stored by the shell."
                            },
                            {
                                title:
                                    "Positional Parameter",
                                description:
                                    "Command-line argument such as $1."
                            },
                            {
                                title:
                                    "read",
                                description:
                                    "Bash built-in used to collect input."
                            },
                            {
                                title:
                                    "Quoting",
                                description:
                                    "Protecting variable values from unwanted shell interpretation."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Which expression contains the first positional argument?",
                                options: [
                                    "$1",
                                    "$#",
                                    "$$",
                                    "$?"
                                ],
                                answer:
                                    0
                            }
                        ]

                    }
                ),


                lesson(
                    "lesson-03",
                    "Pipes and Redirection",
                    "40 minutes",
                    {

                        subtitle:
                            "Combine Linux commands and control stdin, stdout and stderr.",

                        objectives: [
                            "Explain standard input, output and error.",
                            "Use pipelines.",
                            "Redirect output and errors.",
                            "Build simple log-analysis pipelines."
                        ],

                        introduction: [
                            "Unix-style commands are often designed to perform one focused task and combine with other commands.",
                            "Pipes and redirection allow these small tools to form powerful administration and analysis workflows."
                        ],

                        sections: [

                            {
                                heading:
                                    "Standard Streams",

                                paragraphs: [
                                    "Programs normally have standard input, standard output and standard error.",
                                    "The conventional file descriptor numbers are 0 for stdin, 1 for stdout and 2 for stderr."
                                ],

                                demo:
`0 = stdin
1 = stdout
2 = stderr`
                            },

                            {
                                heading:
                                    "Pipelines",

                                paragraphs: [
                                    "A pipe sends standard output from the command on the left into standard input of the command on the right."
                                ],

                                demo:
`ps aux | grep ssh

cat access.log | grep "404" | wc -l`
                            },

                            {
                                heading:
                                    "Output Redirection",

                                paragraphs: [
                                    "`>` overwrites, `>>` appends and `2>` redirects standard error."
                                ],

                                demo:
`command > output.txt

command >> output.txt

command 2> errors.txt

command > all.txt 2>&1`
                            },

                            {
                                heading:
                                    "Log Analysis Example",

                                paragraphs: [
                                    "Pipelines can summarize repeated patterns in log data."
                                ],

                                demo:
`grep "Failed password" auth.log |
awk '{print $NF}' |
sort |
uniq -c |
sort -nr`
                            },

                            {
                                heading:
                                    "Security Perspective",

                                paragraphs: [
                                    "A pipeline can produce convincing-looking output even when the field selection is wrong.",
                                    "Always understand the input format and verify that your command is extracting the intended data."
                                ]
                            }

                        ],

                        keyConcepts: [
                            {
                                title:
                                    "stdin",
                                description:
                                    "Standard input stream."
                            },
                            {
                                title:
                                    "stdout",
                                description:
                                    "Standard output stream."
                            },
                            {
                                title:
                                    "stderr",
                                description:
                                    "Standard error stream."
                            },
                            {
                                title:
                                    "Pipe",
                                description:
                                    "Connect one command's output to another command's input."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Which symbol creates a pipeline between commands?",
                                options: [
                                    "|",
                                    ">",
                                    "<",
                                    "& only"
                                ],
                                answer:
                                    0
                            }
                        ]

                    }
                ),


                lesson(
                    "lesson-04",
                    "Conditions and Loops",
                    "40 minutes",
                    {

                        subtitle:
                            "Use if statements and loops to make Bash scripts dynamic.",

                        objectives: [
                            "Write basic conditional logic.",
                            "Loop over values and files.",
                            "Use Bash test expressions.",
                            "Avoid unsafe or infinite loops."
                        ],

                        introduction: [
                            "Conditions let a script choose what to do based on system state.",
                            "Loops repeat work across files, users, lines or other controlled collections."
                        ],

                        sections: [

                            {
                                heading:
                                    "if Statements",

                                paragraphs: [
                                    "Bash conditional expressions can test whether files exist, strings match or numeric conditions are true."
                                ],

                                demo:
`if [[ -f "$1" ]]; then
    echo "File exists"
else
    echo "File not found"
fi`
                            },

                            {
                                heading:
                                    "for Loops",

                                paragraphs: [
                                    "A for loop iterates over a list of values."
                                ],

                                demo:
`for file in *.log; do
    echo "Checking $file"
done`
                            },

                            {
                                heading:
                                    "while Loops",

                                paragraphs: [
                                    "A while loop repeats while its condition remains true. Make sure the condition can eventually change."
                                ],

                                demo:
`count=1

while [[ $count -le 3 ]]; do
    echo "$count"
    ((count++))
done`
                            },

                            {
                                heading:
                                    "Security Perspective",

                                paragraphs: [
                                    "Automation magnifies both good and bad decisions.",
                                    "Test loops on small, controlled datasets before running them across production hosts or large directory trees."
                                ]
                            }

                        ],

                        keyConcepts: [
                            {
                                title:
                                    "if",
                                description:
                                    "Conditional execution construct."
                            },
                            {
                                title:
                                    "for",
                                description:
                                    "Loop that iterates through values."
                            },
                            {
                                title:
                                    "while",
                                description:
                                    "Loop that repeats while a condition remains true."
                            },
                            {
                                title:
                                    "[[ ]]",
                                description:
                                    "Bash conditional-expression syntax."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Which construct repeats while a condition remains true?",
                                options: [
                                    "while",
                                    "echo",
                                    "chmod",
                                    "pwd"
                                ],
                                answer:
                                    0
                            }
                        ]

                    }
                ),


                lesson(
                    "lesson-05",
                    "Writing Your First Bash Script",
                    "45 minutes",
                    {

                        subtitle:
                            "Combine Linux commands into a small system-inspection script.",

                        objectives: [
                            "Build a multi-command Bash script.",
                            "Produce readable output.",
                            "Handle command failure simply.",
                            "Collect local system information for baselining."
                        ],

                        introduction: [
                            "A useful beginner project is a system-inspection script that gathers identity, operating-system, networking and listening-socket information.",
                            "This demonstrates real automation without making destructive system changes."
                        ],

                        sections: [

                            {
                                heading:
                                    "System Inspection Script",

                                paragraphs: [
                                    "Create a file named `system-check.sh`, add the following content and make it executable."
                                ],

                                demo:
`#!/usr/bin/env bash

set -u

echo "=== Identity ==="
whoami
id

echo "=== OS ==="
cat /etc/os-release | head

echo "=== Addresses ==="
ip -br addr

echo "=== Routes ==="
ip route

echo "=== Listening Sockets ==="
ss -lntup 2>/dev/null || ss -lntu`
                            },

                            {
                                heading:
                                    "Run the Script",

                                paragraphs: [
                                    "Use execute permissions or run it directly through Bash."
                                ],

                                demo:
`chmod u+x system-check.sh

./system-check.sh

# Or:
bash system-check.sh`
                            },

                            {
                                heading:
                                    "Basic Error Handling",

                                paragraphs: [
                                    "Scripts should expect that commands can fail."
                                ],

                                demo:
`if ip route >/dev/null 2>&1; then
    echo "Routing table available"
else
    echo "Could not read routing table"
fi`
                            },

                            {
                                heading:
                                    "Security Perspective",

                                paragraphs: [
                                    "Inventory scripts can support baselining by recording expected configuration.",
                                    "Avoid storing sensitive output in locations that other users can read."
                                ]
                            }

                        ],

                        keyConcepts: [
                            {
                                title:
                                    "Baseline",
                                description:
                                    "Known-good reference state."
                            },
                            {
                                title:
                                    "Exit Status",
                                description:
                                    "Numeric result indicating command success or failure."
                            },
                            {
                                title:
                                    "set -u",
                                description:
                                    "Bash option that treats unset variables as errors."
                            },
                            {
                                title:
                                    "Inventory",
                                description:
                                    "Collected system configuration and state information."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "What is the purpose of a baseline script?",
                                options: [
                                    "Record expected system state for later comparison",
                                    "Disable all services",
                                    "Delete logs",
                                    "Replace package management"
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
           MODULE 09
        ================================================= */

        {

            id:
                "module-09",

            number:
                9,

            title:
                "Linux Security Fundamentals",

            description:
                "Apply least privilege, logging, SSH hardening and host firewall concepts to Linux systems.",

            labs:
                1,

            assessments:
                1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Linux Security Principles",
                    "35 minutes",
                    {

                        subtitle:
                            "Apply least privilege, secure configuration, patching and defense in depth.",

                        objectives: [
                            "Explain least privilege.",
                            "Understand attack-surface reduction.",
                            "Recognize the importance of patching.",
                            "Apply defense in depth."
                        ],

                        introduction: [
                            "Linux security is not one product or one command.",
                            "A secure host combines identity controls, patching, restricted services, secure configuration, logging, network controls and operational discipline."
                        ],

                        sections: [

                            {
                                heading:
                                    "Least Privilege",

                                paragraphs: [
                                    "Users and services should receive only the access they require.",
                                    "Running applications with unnecessary root privileges increases the impact of compromise."
                                ]
                            },

                            {
                                heading:
                                    "Reduce Attack Surface",

                                paragraphs: [
                                    "Remove unnecessary packages and disable services that have no operational purpose."
                                ],

                                demo:
`systemctl --type=service --state=running
ss -lntup`
                            },

                            {
                                heading:
                                    "Patch and Monitor",

                                paragraphs: [
                                    "Keep supported software updated and monitor authentication, service and system events."
                                ],

                                demo:
`sudo apt update
apt list --upgradable

journalctl -p warning`
                            },

                            {
                                heading:
                                    "Defense in Depth",

                                paragraphs: [
                                    "Use multiple complementary controls so one failure does not automatically expose the system.",
                                    "Examples include MFA for remote administration, host firewalls, backups, logging and application isolation."
                                ],

                                note:
                                    "Hardening lowers risk, but monitoring is still necessary because prevention is never perfect."
                            }

                        ],

                        keyConcepts: [
                            {
                                title:
                                    "Least Privilege",
                                description:
                                    "Grant only required access."
                            },
                            {
                                title:
                                    "Attack Surface",
                                description:
                                    "Potentially reachable and exploitable functionality."
                            },
                            {
                                title:
                                    "Defense in Depth",
                                description:
                                    "Use multiple complementary security controls."
                            },
                            {
                                title:
                                    "Hardening",
                                description:
                                    "Reducing unnecessary exposure and privilege through secure configuration."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Which action best reduces attack surface?",
                                options: [
                                    "Disable unnecessary services",
                                    "Install more unused packages",
                                    "Run everything as root",
                                    "Turn off logs"
                                ],
                                answer:
                                    0
                            }
                        ]

                    }
                ),


                lesson(
                    "lesson-02",
                    "Secure Users and Permissions",
                    "40 minutes",
                    {

                        subtitle:
                            "Review users, privileged groups and sensitive filesystem permissions.",

                        objectives: [
                            "Audit user accounts.",
                            "Identify risky group membership.",
                            "Inspect sensitive file permissions.",
                            "Recognize overly broad write access."
                        ],

                        introduction: [
                            "Account and permission reviews help identify stale users, excess privilege and insecure file access.",
                            "The goal is to compare actual configuration with policy and operational need."
                        ],

                        sections: [

                            {
                                heading:
                                    "Account Review",

                                paragraphs: [
                                    "Identify privileged users, sudo-capable groups and unexpected UID 0 accounts."
                                ],

                                demo:
`getent passwd

getent group sudo
getent group wheel 2>/dev/null

awk -F: '$3 == 0 {print $1}' /etc/passwd`
                            },

                            {
                                heading:
                                    "Sensitive Files",

                                paragraphs: [
                                    "Private keys and password-related files should have restrictive modes and correct ownership."
                                ],

                                demo:
`ls -l /etc/shadow
ls -la ~/.ssh`
                            },

                            {
                                heading:
                                    "World-Writable Files",

                                paragraphs: [
                                    "In an authorized lab, you can search a limited path for files writable by everyone."
                                ],

                                demo:
`find /home -type f -perm -0002 -ls`
                            },

                            {
                                heading:
                                    "Interpret Results Carefully",

                                paragraphs: [
                                    "Broad permissions are not automatically vulnerabilities. Some shared locations legitimately require special behavior such as the sticky bit.",
                                    "Understand the intended purpose before changing permissions."
                                ]
                            }

                        ],

                        keyConcepts: [
                            {
                                title:
                                    "Account Audit",
                                description:
                                    "Review of users and privileges."
                            },
                            {
                                title:
                                    "World-Writable",
                                description:
                                    "Writable through the other permission class."
                            },
                            {
                                title:
                                    "Sticky Bit",
                                description:
                                    "Directory control restricting deletion or rename of other users' files."
                            },
                            {
                                title:
                                    "Privilege Review",
                                description:
                                    "Comparison of administrative rights with legitimate need."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Which is a primary concern during a Linux account review?",
                                options: [
                                    "Unexpected administrative privilege",
                                    "Long filenames",
                                    "Terminal colors",
                                    "Number of directories"
                                ],
                                answer:
                                    0
                            }
                        ]

                    }
                ),


                lesson(
                    "lesson-03",
                    "Linux Logs",
                    "40 minutes",
                    {

                        subtitle:
                            "Use logs and the systemd journal to investigate Linux activity.",

                        objectives: [
                            "Identify common Linux log sources.",
                            "Query journalctl.",
                            "Search authentication events.",
                            "Understand why logs should be centralized and protected."
                        ],

                        introduction: [
                            "Logs provide historical evidence about authentication, services, kernel activity and applications.",
                            "The exact source varies by distribution and logging stack, so analysts should understand both systemd journal data and traditional files under `/var/log`."
                        ],

                        sections: [

                            {
                                heading:
                                    "Systemd Journal",

                                paragraphs: [
                                    "`journalctl` can filter by boot, time, severity and service."
                                ],

                                demo:
`journalctl -b
journalctl --since "1 hour ago"
journalctl -p warning
journalctl -u ssh`
                            },

                            {
                                heading:
                                    "Traditional Authentication Logs",

                                paragraphs: [
                                    "Debian-based systems often log authentication activity to `/var/log/auth.log`. Some Red Hat-based systems use `/var/log/secure`."
                                ],

                                demo:
`sudo grep "Failed password" /var/log/auth.log

sudo tail -f /var/log/auth.log`
                            },

                            {
                                heading:
                                    "Correlating Evidence",

                                paragraphs: [
                                    "One log line rarely tells the whole story.",
                                    "Combine timestamps, usernames, source addresses, sudo events, service logs and process information."
                                ],

                                noteTitle:
                                    "Investigation Example",

                                note:
                                    "Repeated failed SSH logins followed by a successful login may justify checking the source address, account, sudo usage and processes launched afterward."
                            },

                            {
                                heading:
                                    "Protecting Logs",

                                paragraphs: [
                                    "Privileged attackers may modify local logs.",
                                    "Important environments often forward logs to centralized systems so evidence is harder to rewrite from one compromised host."
                                ]
                            }

                        ],

                        keyConcepts: [
                            {
                                title:
                                    "journalctl",
                                description:
                                    "Tool for querying the systemd journal."
                            },
                            {
                                title:
                                    "Authentication Log",
                                description:
                                    "Events related to login and authorization."
                            },
                            {
                                title:
                                    "Correlation",
                                description:
                                    "Combining multiple evidence sources."
                            },
                            {
                                title:
                                    "Centralized Logging",
                                description:
                                    "Forwarding logs to separate collection infrastructure."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Why centralize important logs?",
                                options: [
                                    "To reduce the ability of one compromised host to rewrite all evidence",
                                    "To disable timestamps",
                                    "To remove authentication",
                                    "To replace firewalls"
                                ],
                                answer:
                                    0
                            }
                        ]

                    }
                ),


                lesson(
                    "lesson-04",
                    "SSH Security",
                    "45 minutes",
                    {

                        subtitle:
                            "Secure remote Linux administration using SSH and strong authentication.",

                        objectives: [
                            "Explain SSH's purpose.",
                            "Understand key-based authentication.",
                            "Review root and password authentication settings.",
                            "Recognize suspicious SSH activity."
                        ],

                        introduction: [
                            "SSH provides encrypted remote shell access and file transfer.",
                            "Because it frequently exposes administrative access, SSH should be hardened and monitored carefully."
                        ],

                        sections: [

                            {
                                heading:
                                    "SSH Client Basics",

                                paragraphs: [
                                    "SSH commonly connects to TCP port 22, although administrators may configure another port."
                                ],

                                demo:
`ssh student@server.example

ssh -p 2222 student@server.example`
                            },

                            {
                                heading:
                                    "Public-Key Authentication",

                                paragraphs: [
                                    "Key-based authentication can provide strong authentication when private keys are protected properly."
                                ],

                                demo:
`ssh-keygen -t ed25519

ssh-copy-id student@server.example

ls -la ~/.ssh`
                            },

                            {
                                heading:
                                    "Review Server Configuration",

                                paragraphs: [
                                    "Common hardening decisions include controlling root login, password authentication and which users or groups may connect.",
                                    "Exact settings depend on organizational requirements."
                                ],

                                demo:
`sudo sshd -T |
grep -E 'permitrootlogin|passwordauthentication'

sudo systemctl reload ssh`
                            },

                            {
                                heading:
                                    "Monitoring",

                                paragraphs: [
                                    "Repeated failures, unusual source addresses and unexpected successful logins are useful signals.",
                                    "A few failed logins may simply be user mistakes, so context remains important."
                                ]
                            }

                        ],

                        keyConcepts: [
                            {
                                title:
                                    "SSH",
                                description:
                                    "Secure Shell remote administration protocol."
                            },
                            {
                                title:
                                    "Public-Key Authentication",
                                description:
                                    "Authentication using asymmetric key pairs."
                            },
                            {
                                title:
                                    "Private Key",
                                description:
                                    "Secret cryptographic key material that must be protected."
                            },
                            {
                                title:
                                    "sshd",
                                description:
                                    "OpenSSH server daemon."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Where are a user's SSH configuration and keys commonly stored?",
                                options: [
                                    "~/.ssh",
                                    "/tmp/ssh-public",
                                    "/var/www/html",
                                    "/dev/null"
                                ],
                                answer:
                                    0
                            }
                        ]

                    }
                ),


                lesson(
                    "lesson-05",
                    "Linux Firewalls",
                    "40 minutes",
                    {

                        subtitle:
                            "Understand host firewalls, UFW and nftables from a defense-in-depth perspective.",

                        objectives: [
                            "Explain host firewall purpose.",
                            "Understand allow and deny rules.",
                            "Recognize UFW and nftables.",
                            "Apply least-connectivity principles."
                        ],

                        introduction: [
                            "A Linux host firewall controls traffic according to policy on the endpoint itself.",
                            "Modern Linux commonly uses nftables underneath, while higher-level tools such as UFW or firewalld simplify administration."
                        ],

                        sections: [

                            {
                                heading:
                                    "UFW Example",

                                paragraphs: [
                                    "On Ubuntu, UFW provides a simpler interface for common firewall rules.",
                                    "Only modify firewall policy on systems you own or are authorized to administer."
                                ],

                                demo:
`sudo ufw status verbose

sudo ufw allow 22/tcp
sudo ufw allow 443/tcp

sudo ufw status numbered`
                            },

                            {
                                heading:
                                    "nftables",

                                paragraphs: [
                                    "nftables organizes filtering through tables, chains and rules."
                                ],

                                demo:
`sudo nft list ruleset`
                            },

                            {
                                heading:
                                    "Default Policy",

                                paragraphs: [
                                    "A common host-hardening approach is to deny unsolicited inbound traffic by default and explicitly allow required services."
                                ],

                                note:
                                    "Firewall policy should enforce architecture without becoming so inconvenient that administrators bypass it."
                            },

                            {
                                heading:
                                    "Defense in Depth",

                                paragraphs: [
                                    "Host firewalls complement network firewalls, authentication controls and application security.",
                                    "They are valuable for servers, laptops and cloud instances that may operate in different network environments."
                                ]
                            }

                        ],

                        keyConcepts: [
                            {
                                title:
                                    "Host Firewall",
                                description:
                                    "Traffic-control policy enforced directly on an endpoint."
                            },
                            {
                                title:
                                    "UFW",
                                description:
                                    "Simplified firewall-management interface commonly used on Ubuntu."
                            },
                            {
                                title:
                                    "nftables",
                                description:
                                    "Modern Linux packet-filtering framework."
                            },
                            {
                                title:
                                    "Default Deny",
                                description:
                                    "Deny traffic unless it is explicitly permitted."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Which command displays the current nftables ruleset?",
                                options: [
                                    "nft list ruleset",
                                    "ip passwd",
                                    "ss --firewall",
                                    "journalctl --nft-only"
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
           MODULE 10
        ================================================= */

        {

            id:
                "module-10",

            number:
                10,

            title:
                "Linux Administration & Security Review",

            description:
                "Bring Linux administration, troubleshooting, networking and security concepts together.",

            labs:
                1,

            assessments:
                1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Linux Administration Review",
                    "40 minutes",
                    {

                        subtitle:
                            "Combine identity, filesystem, services, networking and package inspection into one workflow.",

                        objectives: [
                            "Connect major Linux administration topics.",
                            "Perform a basic system inventory.",
                            "Recognize important configuration areas.",
                            "Prepare for practical Linux labs."
                        ],

                        introduction: [
                            "Linux administration becomes useful when commands are combined into a repeatable workflow.",
                            "When you first receive responsibility for a server, you need to understand who you are, what operating system is running, how storage is organized, which services are active and how the system is networked."
                        ],

                        sections: [

                            {
                                heading:
                                    "Identity and Operating System",

                                paragraphs: [
                                    "Begin with non-destructive commands that establish host and user context."
                                ],

                                demo:
`hostname
whoami
id
uname -a
cat /etc/os-release
uptime`
                            },

                            {
                                heading:
                                    "Storage",

                                paragraphs: [
                                    "Review filesystem usage and mounts before troubleshooting storage problems."
                                ],

                                demo:
`df -h
findmnt`
                            },

                            {
                                heading:
                                    "Services and Network Exposure",

                                paragraphs: [
                                    "Identify running services and listening sockets."
                                ],

                                demo:
`systemctl --type=service --state=running

ss -lntup`
                            },

                            {
                                heading:
                                    "Package State",

                                paragraphs: [
                                    "Review available updates and installed software according to your distribution."
                                ],

                                demo:
`apt list --upgradable 2>/dev/null`
                            },

                            {
                                heading:
                                    "Security Perspective",

                                paragraphs: [
                                    "Inventory is the foundation of hardening.",
                                    "You cannot effectively secure a system if you do not know which accounts, services, packages and network listeners exist."
                                ]
                            }

                        ],

                        keyConcepts: [
                            {
                                title:
                                    "Inventory",
                                description:
                                    "Documented system configuration and state."
                            },
                            {
                                title:
                                    "Baseline",
                                description:
                                    "Known-good reference state."
                            },
                            {
                                title:
                                    "Service Review",
                                description:
                                    "Inspection of active services."
                            },
                            {
                                title:
                                    "Package Review",
                                description:
                                    "Inspection of installed and available software versions."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "What is the main purpose of a system inventory?",
                                options: [
                                    "Understand what is present before making changes",
                                    "Delete all services",
                                    "Disable the network",
                                    "Reset every password"
                                ],
                                answer:
                                    0
                            }
                        ]

                    }
                ),


                lesson(
                    "lesson-02",
                    "Linux Networking Review",
                    "40 minutes",
                    {

                        subtitle:
                            "Review interfaces, routing, DNS, reachability and sockets as one troubleshooting process.",

                        objectives: [
                            "Inspect local addressing.",
                            "Verify routing.",
                            "Test reachability and DNS.",
                            "Identify listening services and connections."
                        ],

                        introduction: [
                            "Network troubleshooting is most effective when performed in a logical order.",
                            "Start with the local interface, then routing, then reachability, DNS and application sockets."
                        ],

                        sections: [

                            {
                                heading:
                                    "Step 1: Interfaces",

                                paragraphs: [
                                    "Confirm that the expected interface is up and has the expected addresses."
                                ],

                                demo:
`ip -br link
ip -br addr`
                            },

                            {
                                heading:
                                    "Step 2: Routing",

                                paragraphs: [
                                    "Confirm the connected network and default gateway."
                                ],

                                demo:
`ip route

ip route get 8.8.8.8`
                            },

                            {
                                heading:
                                    "Step 3: Reachability and DNS",

                                paragraphs: [
                                    "Test the local gateway, a known remote IP and then a hostname."
                                ],

                                demo:
`ping -c 2 192.168.1.1

ping -c 2 8.8.8.8

dig example.com`
                            },

                            {
                                heading:
                                    "Step 4: Sockets",

                                paragraphs: [
                                    "Confirm that the expected local service is listening and inspect active connections."
                                ],

                                demo:
`ss -lntup
ss -tnp`
                            },

                            {
                                heading:
                                    "Security Perspective",

                                paragraphs: [
                                    "Unexpected changes to interfaces, routes, DNS or sockets can indicate misconfiguration or malicious activity.",
                                    "Compare observations with the expected network design and recent change history."
                                ]
                            }

                        ],

                        keyConcepts: [
                            {
                                title:
                                    "Interface State",
                                description:
                                    "Whether a network interface is operational."
                            },
                            {
                                title:
                                    "Route Lookup",
                                description:
                                    "Determining the path Linux will use for a destination."
                            },
                            {
                                title:
                                    "DNS Resolution",
                                description:
                                    "Mapping names to network information."
                            },
                            {
                                title:
                                    "Socket Review",
                                description:
                                    "Inspecting local listening and connected endpoints."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "If a host has no usable default route, what is a likely symptom?",
                                options: [
                                    "Local subnet access may work while remote networks fail",
                                    "All file permissions disappear",
                                    "Bash stops parsing variables",
                                    "Every service becomes root"
                                ],
                                answer:
                                    0
                            }
                        ]

                    }
                ),


                lesson(
                    "lesson-03",
                    "Linux Security Review",
                    "45 minutes",
                    {

                        subtitle:
                            "Perform a beginner-friendly review of accounts, services, logs and updates.",

                        objectives: [
                            "Review privileged accounts.",
                            "Check network exposure.",
                            "Inspect authentication logs.",
                            "Review available security updates."
                        ],

                        introduction: [
                            "A Linux security review combines identity, process, network, package and logging information.",
                            "The objective is to determine whether actual system state matches expected security policy."
                        ],

                        sections: [

                            {
                                heading:
                                    "Accounts and Privilege",

                                paragraphs: [
                                    "Identify UID 0 accounts and review sudo-capable groups."
                                ],

                                demo:
`awk -F: '$3 == 0 {print $1}' /etc/passwd

getent group sudo

sudo -l`
                            },

                            {
                                heading:
                                    "Services and Exposure",

                                paragraphs: [
                                    "Compare running services and listening ports with the intended purpose of the server."
                                ],

                                demo:
`systemctl --type=service --state=running

ss -lntup`
                            },

                            {
                                heading:
                                    "Logs",

                                paragraphs: [
                                    "Review authentication and service events for unusual activity."
                                ],

                                demo:
`journalctl -u ssh --since today

sudo grep "Failed password" /var/log/auth.log 2>/dev/null`
                            },

                            {
                                heading:
                                    "Updates",

                                paragraphs: [
                                    "Check whether software fixes are waiting to be installed."
                                ],

                                demo:
`sudo apt update

apt list --upgradable`
                            },

                            {
                                heading:
                                    "Prioritize by Risk",

                                paragraphs: [
                                    "Not all findings are equally urgent.",
                                    "An unnecessary Internet-exposed service running with high privilege is usually more important than a cosmetic configuration inconsistency."
                                ]
                            }

                        ],

                        keyConcepts: [
                            {
                                title:
                                    "Security Review",
                                description:
                                    "Structured assessment of system security posture."
                            },
                            {
                                title:
                                    "Finding",
                                description:
                                    "Observed condition requiring evaluation."
                            },
                            {
                                title:
                                    "Remediation",
                                description:
                                    "Action taken to reduce identified risk."
                            },
                            {
                                title:
                                    "Prioritization",
                                description:
                                    "Ordering findings according to risk and impact."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Which finding would generally deserve the highest priority?",
                                options: [
                                    "An unnecessary externally exposed privileged service",
                                    "A long hostname",
                                    "A colorful terminal prompt",
                                    "A missing desktop wallpaper"
                                ],
                                answer:
                                    0
                            }
                        ]

                    }
                ),


                lesson(
                    "lesson-04",
                    "Troubleshooting Linux Systems",
                    "45 minutes",
                    {

                        subtitle:
                            "Use evidence-based troubleshooting rather than random changes.",

                        objectives: [
                            "Follow a structured troubleshooting method.",
                            "Collect evidence before changing system state.",
                            "Use status, logs and networking tools.",
                            "Document fixes and results."
                        ],

                        introduction: [
                            "Good troubleshooting starts with a precise symptom and attempts to isolate the failing component.",
                            "Randomly restarting services or changing permissions can hide the real problem and create additional faults."
                        ],

                        sections: [

                            {
                                heading:
                                    "Define the Symptom",

                                paragraphs: [
                                    "A statement such as 'the server is broken' is too broad.",
                                    "A statement such as 'nginx returns connection refused on TCP 443 after today's configuration change' is much more actionable."
                                ]
                            },

                            {
                                heading:
                                    "Collect Evidence",

                                paragraphs: [
                                    "Inspect service status, logs, sockets, resource usage and filesystem state before making major changes."
                                ],

                                demo:
`systemctl status nginx

journalctl -u nginx --since "30 minutes ago"

ss -lntp

ps aux --sort=-%cpu | head

df -h`
                            },

                            {
                                heading:
                                    "Test a Hypothesis",

                                paragraphs: [
                                    "If you suspect that nginx is not listening, confirm that with `ss`.",
                                    "If you suspect DNS, test the IP separately from the hostname. If you suspect permissions, inspect ownership before changing anything."
                                ],

                                demo:
`curl -I http://127.0.0.1

ls -l /etc/nginx/nginx.conf

nginx -t 2>/dev/null`
                            },

                            {
                                heading:
                                    "Security Perspective",

                                paragraphs: [
                                    "Operational troubleshooting can uncover evidence of compromise.",
                                    "Unexpected binary paths, altered service units or unfamiliar outbound connections may require incident-response handling rather than ordinary troubleshooting."
                                ],

                                note:
                                    "Observe, form a hypothesis, test it, change one thing, verify the result and document what happened."
                            }

                        ],

                        keyConcepts: [
                            {
                                title:
                                    "Symptom",
                                description:
                                    "Observable problem or abnormal behavior."
                            },
                            {
                                title:
                                    "Hypothesis",
                                description:
                                    "Proposed explanation that can be tested."
                            },
                            {
                                title:
                                    "Evidence",
                                description:
                                    "Data supporting or contradicting a hypothesis."
                            },
                            {
                                title:
                                    "Change Control",
                                description:
                                    "Documented management of system changes."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "What should you generally do before making major troubleshooting changes?",
                                options: [
                                    "Collect evidence",
                                    "Delete logs",
                                    "Run chmod 777",
                                    "Disable every service"
                                ],
                                answer:
                                    0
                            }
                        ]

                    }
                ),


                lesson(
                    "lesson-05",
                    "Linux Fundamentals Final Review",
                    "45 minutes",
                    {

                        subtitle:
                            "Connect Linux administration concepts and prepare for advanced cybersecurity work.",

                        objectives: [
                            "Review core Linux commands.",
                            "Connect administration to cybersecurity.",
                            "Recognize the value of baselines and automation.",
                            "Identify logical next learning steps."
                        ],

                        introduction: [
                            "You now have the foundation required to work comfortably in Linux-based cybersecurity environments.",
                            "The goal is not to memorize every command. The goal is to understand how Linux organizes identity, files, processes, services, networking and software so you can reason through unfamiliar systems."
                        ],

                        sections: [

                            {
                                heading:
                                    "Core Command Map",

                                paragraphs: [
                                    "Use this as a mental index of the major topics covered in the course."
                                ],

                                demo:
`Identity:
  whoami
  id
  groups

Filesystem:
  pwd
  ls
  cd
  find
  grep

Permissions:
  chmod
  chown
  sudo

Processes:
  ps
  top
  kill

Services:
  systemctl
  journalctl

Networking:
  ip
  ping
  dig
  ss

Packages:
  apt
  dpkg

Scripting:
  bash
  pipes
  redirection`
                            },

                            {
                                heading:
                                    "How Linux Connects to Security",

                                paragraphs: [
                                    "Permissions support least privilege. Process and service inspection support detection. Networking commands help investigate connections.",
                                    "Logs provide historical evidence. Package management supports patching. Bash provides repeatable automation."
                                ],

                                noteTitle:
                                    "Key Takeaway",

                                note:
                                    "Linux cybersecurity skills become much stronger when Linux administration fundamentals are already comfortable."
                            },

                            {
                                heading:
                                    "Next Steps",

                                paragraphs: [
                                    "A logical progression is Linux hardening, networking labs, packet analysis, secure SSH administration, container security, SOC workflows and ethical hacking in authorized environments."
                                ]
                            }

                        ],

                        keyConcepts: [
                            {
                                title:
                                    "Administration",
                                description:
                                    "Operating and maintaining Linux systems."
                            },
                            {
                                title:
                                    "Hardening",
                                description:
                                    "Reducing unnecessary exposure and privilege."
                            },
                            {
                                title:
                                    "Automation",
                                description:
                                    "Repeatable execution of tasks through scripts and tools."
                            },
                            {
                                title:
                                    "Cybersecurity Foundation",
                                description:
                                    "Core technical knowledge supporting advanced defensive and offensive security work."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Which statement best summarizes this course?",
                                options: [
                                    "Linux administration skills support both defensive and offensive cybersecurity work",
                                    "Linux is only useful for servers",
                                    "Security tools remove the need to understand Linux",
                                    "Only root users need Linux knowledge"
                                ],
                                answer:
                                    0
                            }
                        ]

                    }
                )

            ]

        }

    ]

};
