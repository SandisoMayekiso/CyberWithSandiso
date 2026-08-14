/* =========================================================
   CWS ACADEMY
   CYBERSECURITY FUNDAMENTALS
   LESSON ENGINE

   Version: 2.0

   Supports:

   lesson.html
   ?course=cybersecurity-fundamentals
   &module=module-01

   OR:

   lesson.html
   ?course=cybersecurity-fundamentals
   &module=module-01
   &lesson=module-01-lesson-01
========================================================= */


/* =========================================================
   FIREBASE
========================================================= */

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";


import {
    doc,
    getDoc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";


import {
    auth,
    db
} from "./firebase-config.js";


/* =========================================================
   DEBUG
========================================================= */

const DEBUG = true;


function log(...args) {

    if (DEBUG) {

        console.log(
            "[CWS LESSON]",
            ...args
        );

    }

}


function warn(...args) {

    if (DEBUG) {

        console.warn(
            "[CWS LESSON]",
            ...args
        );

    }

}


function error(...args) {

    console.error(
        "[CWS LESSON]",
        ...args
    );

}


/* =========================================================
   DOM
========================================================= */

const lessonLoading =
    document.getElementById(
        "lessonLoading"
    );


const lessonNotFound =
    document.getElementById(
        "lessonNotFound"
    );


const lessonContent =
    document.getElementById(
        "lessonContent"
    );


const studentName =
    document.getElementById(
        "studentName"
    );


const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );


const breadcrumbCourse =
    document.getElementById(
        "breadcrumbCourse"
    );


const breadcrumbModule =
    document.getElementById(
        "breadcrumbModule"
    );


const lessonModuleNumber =
    document.getElementById(
        "lessonModuleNumber"
    );


const lessonNumber =
    document.getElementById(
        "lessonNumber"
    );


const lessonTitle =
    document.getElementById(
        "lessonTitle"
    );


const lessonDescription =
    document.getElementById(
        "lessonDescription"
    );


const lessonObjectives =
    document.getElementById(
        "lessonObjectives"
    );


const lessonBody =
    document.getElementById(
        "lessonBody"
    );


const lessonProgressPercent =
    document.getElementById(
        "lessonProgressPercent"
    );


const lessonProgressFill =
    document.getElementById(
        "lessonProgressFill"
    );


const lessonProgressText =
    document.getElementById(
        "lessonProgressText"
    );


const markCompleteBtn =
    document.getElementById(
        "markCompleteBtn"
    );


const previousLessonBtn =
    document.getElementById(
        "previousLessonBtn"
    );


const nextLessonBtn =
    document.getElementById(
        "nextLessonBtn"
    );


const lessonModuleList =
    document.getElementById(
        "lessonModuleList"
    );


/* =========================================================
   STATE
========================================================= */

let currentUser = null;

let currentCourse = null;

let currentModule = null;

let currentLesson = null;

let currentProgress = null;


/* =========================================================
   COURSE DATA
========================================================= */

const courses = {

    "cybersecurity-fundamentals": {

        id:
            "cybersecurity-fundamentals",

        title:
            "Cybersecurity Fundamentals",

        description:
            "A comprehensive introduction to security architecture, networks, threats, endpoints, governance and incident response.",

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
                    "Security Design & Architecture",

                description:
                    "Core principles used to design secure systems and protect information.",

                lessons: [

                    {

                        id:
                            "module-01-lesson-01",

                        number:
                            1,

                        title:
                            "The CIA Triad",

                        description:
                            "Understand confidentiality, integrity and availability and how they form the foundation of information security.",

                        objectives: [

                            "Define confidentiality, integrity and availability.",

                            "Explain how the CIA Triad applies to information systems.",

                            "Identify security controls that support each principle.",

                            "Understand security trade-offs."

                        ],

                        content: [

                            {
                                type: "heading",
                                text: "The CIA Triad"
                            },

                            {
                                type: "paragraph",
                                text: "The CIA Triad is one of the foundational concepts of cybersecurity. It describes three objectives that security controls should help organizations achieve: confidentiality, integrity and availability."
                            },

                            {
                                type: "heading",
                                text: "Confidentiality"
                            },

                            {
                                type: "paragraph",
                                text: "Confidentiality means information should only be accessible to authorized people, systems or processes. Access controls, encryption and authentication are examples of controls that can support confidentiality."
                            },

                            {
                                type: "heading",
                                text: "Integrity"
                            },

                            {
                                type: "paragraph",
                                text: "Integrity means information remains accurate, complete and trustworthy. Organizations can use access controls, hashes, digital signatures, logging and change management to help protect integrity."
                            },

                            {
                                type: "heading",
                                text: "Availability"
                            },

                            {
                                type: "paragraph",
                                text: "Availability means authorized users can access systems and information when they need them. Redundancy, backups, monitoring, maintenance and disaster recovery planning can support availability."
                            },

                            {
                                type: "callout",
                                title: "Security Principle",
                                text: "Strong security requires balancing confidentiality, integrity and availability rather than focusing on only one objective."
                            }

                        ]

                    },


                    {

                        id:
                            "module-01-lesson-02",

                        number:
                            2,

                        title:
                            "Defense-in-Depth",

                        description:
                            "Learn how multiple layers of security controls work together to reduce risk.",

                        objectives: [

                            "Explain defense-in-depth.",

                            "Distinguish physical, technical and administrative controls.",

                            "Understand why multiple controls are valuable.",

                            "Identify examples of layered security."

                        ],

                        content: [

                            {
                                type: "heading",
                                text: "What Is Defense-in-Depth?"
                            },

                            {
                                type: "paragraph",
                                text: "Defense-in-depth is a security strategy that uses multiple layers of controls. If one control fails, another layer can still reduce the likelihood or impact of compromise."
                            },

                            {
                                type: "heading",
                                text: "Physical Controls"
                            },

                            {
                                type: "paragraph",
                                text: "Physical controls protect facilities, hardware and physical access. Examples include locks, access cards, security guards, cameras and environmental controls."
                            },

                            {
                                type: "heading",
                                text: "Technical Controls"
                            },

                            {
                                type: "paragraph",
                                text: "Technical controls are implemented through technology. Examples include firewalls, authentication systems, encryption, endpoint protection and network monitoring."
                            },

                            {
                                type: "heading",
                                text: "Administrative Controls"
                            },

                            {
                                type: "paragraph",
                                text: "Administrative controls include policies, procedures, security awareness training, risk management and organizational rules."
                            },

                            {
                                type: "callout",
                                title: "Key Idea",
                                text: "Security should not depend on a single control. Layered defenses make it harder for one failure to become a major security incident."
                            }

                        ]

                    },


                    {

                        id:
                            "module-01-lesson-03",

                        number:
                            3,

                        title:
                            "Cryptography Basics",

                        description:
                            "Understand encryption, hashing and the role of public key infrastructure.",

                        objectives: [

                            "Differentiate symmetric and asymmetric encryption.",

                            "Explain the purpose of hashing.",

                            "Understand SHA-256 at a conceptual level.",

                            "Describe the role of PKI."

                        ],

                        content: [

                            {
                                type: "heading",
                                text: "Symmetric Encryption"
                            },

                            {
                                type: "paragraph",
                                text: "Symmetric encryption uses the same secret key to encrypt and decrypt information. It is generally efficient and is commonly used for protecting data once a secure key has been established."
                            },

                            {
                                type: "heading",
                                text: "Asymmetric Encryption"
                            },

                            {
                                type: "paragraph",
                                text: "Asymmetric cryptography uses a related public and private key. The public key can be shared, while the private key must be protected. This model supports applications such as secure communication and digital signatures."
                            },

                            {
                                type: "heading",
                                text: "Hashing"
                            },

                            {
                                type: "paragraph",
                                text: "A cryptographic hash function transforms input data into a fixed-length value. Hashes are designed to be one-way and are useful for integrity verification and other security applications."
                            },

                            {
                                type: "heading",
                                text: "SHA-256"
                            },

                            {
                                type: "paragraph",
                                text: "SHA-256 is a member of the SHA-2 family of cryptographic hash functions and produces a 256-bit digest."
                            },

                            {
                                type: "heading",
                                text: "Public Key Infrastructure"
                            },

                            {
                                type: "paragraph",
                                text: "PKI provides the systems, policies and processes used to manage digital certificates and public keys. Certificate authorities play an important role in establishing trust relationships."
                            },

                            {
                                type: "callout",
                                title: "Remember",
                                text: "Encryption is designed to protect confidentiality, while hashing is primarily used to support integrity and verification."
                            }

                        ]

                    },


                    {

                        id:
                            "module-01-lesson-04",

                        number:
                            4,

                        title:
                            "Identity & Access Management",

                        description:
                            "Explore MFA, SSO and least privilege as fundamental access-control concepts.",

                        objectives: [

                            "Explain identity and access management.",

                            "Understand multi-factor authentication.",

                            "Explain single sign-on.",

                            "Apply the principle of least privilege."

                        ],

                        content: [

                            {
                                type: "heading",
                                text: "Identity and Access Management"
                            },

                            {
                                type: "paragraph",
                                text: "Identity and Access Management, or IAM, focuses on identifying users and systems and controlling what resources they are allowed to access."
                            },

                            {
                                type: "heading",
                                text: "Multi-Factor Authentication"
                            },

                            {
                                type: "paragraph",
                                text: "MFA requires multiple authentication factors. Common factor categories include something you know, something you have and something you are."
                            },

                            {
                                type: "heading",
                                text: "Single Sign-On"
                            },

                            {
                                type: "paragraph",
                                text: "SSO allows a user to authenticate through a central identity provider and then access multiple authorized applications without repeatedly entering credentials."
                            },

                            {
                                type: "heading",
                                text: "Least Privilege"
                            },

                            {
                                type: "paragraph",
                                text: "The principle of least privilege means users and systems should receive only the access necessary to perform their legitimate responsibilities."
                            },

                            {
                                type: "callout",
                                title: "Security Principle",
                                text: "Access should be intentional, limited and regularly reviewed."
                            }

                        ]

                    }

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
                    "Network Security",

                description:
                    "Learn how networks communicate and how security controls protect network infrastructure.",

                lessons: [

                    {

                        id:
                            "module-02-lesson-01",

                        number:
                            1,

                        title:
                            "Ports, Protocols & TCP/IP",

                        description:
                            "Understand how network services communicate using ports and protocols.",

                        objectives: [

                            "Explain the purpose of ports.",

                            "Understand TCP/IP at a high level.",

                            "Recognize common network protocols.",

                            "Understand why protocol knowledge matters to defenders."

                        ],

                        content: [

                            {
                                type: "heading",
                                text: "Network Communication"
                            },

                            {
                                type: "paragraph",
                                text: "Networks allow devices and applications to communicate. Protocols define how that communication is structured, while ports help identify services associated with network connections."
                            },

                            {
                                type: "heading",
                                text: "Common Protocols"
                            },

                            {
                                type: "list",
                                items: [
                                    "TCP/IP",
                                    "DNS",
                                    "HTTP",
                                    "HTTPS",
                                    "SSH",
                                    "DHCP"
                                ]
                            },

                            {
                                type: "heading",
                                text: "Why Ports Matter"
                            },

                            {
                                type: "paragraph",
                                text: "Ports allow operating systems to distinguish between different network services. Security teams monitor exposed services because unnecessary or incorrectly configured services can increase attack surface."
                            }

                        ]

                    },


                    {

                        id:
                            "module-02-lesson-02",

                        number:
                            2,

                        title:
                            "The OSI Model",

                        description:
                            "Learn the seven-layer OSI model and how it helps security professionals understand networks.",

                        objectives: [

                            "Identify the seven OSI layers.",

                            "Understand the purpose of each layer.",

                            "Relate protocols to layers.",

                            "Use the OSI model for troubleshooting."

                        ],

                        content: [

                            {
                                type: "heading",
                                text: "The Seven Layers"
                            },

                            {
                                type: "list",
                                items: [
                                    "Layer 7 — Application",
                                    "Layer 6 — Presentation",
                                    "Layer 5 — Session",
                                    "Layer 4 — Transport",
                                    "Layer 3 — Network",
                                    "Layer 2 — Data Link",
                                    "Layer 1 — Physical"
                                ]
                            },

                            {
                                type: "paragraph",
                                text: "The OSI model provides a conceptual framework for understanding how data moves through a network. Security professionals use it when analyzing network traffic, diagnosing problems and understanding where controls operate."
                            },

                            {
                                type: "callout",
                                title: "Study Tip",
                                text: "When investigating a network problem, asking which OSI layer is involved can help narrow the problem space."
                            }

                        ]

                    },


                    {

                        id:
                            "module-02-lesson-03",

                        number:
                            3,

                        title:
                            "Firewalls & IDS/IPS",

                        description:
                            "Understand network security controls used to monitor and control traffic.",

                        objectives: [

                            "Explain the purpose of firewalls.",

                            "Differentiate IDS and IPS.",

                            "Understand network segmentation.",

                            "Recognize the importance of security monitoring."

                        ],

                        content: [

                            {
                                type: "heading",
                                text: "Firewalls"
                            },

                            {
                                type: "paragraph",
                                text: "A firewall controls network traffic according to defined rules. Firewalls can be deployed at network boundaries, between network segments or directly on endpoints."
                            },

                            {
                                type: "heading",
                                text: "Intrusion Detection Systems"
                            },

                            {
                                type: "paragraph",
                                text: "An IDS monitors activity and generates alerts when suspicious patterns or known indicators are detected."
                            },

                            {
                                type: "heading",
                                text: "Intrusion Prevention Systems"
                            },

                            {
                                type: "paragraph",
                                text: "An IPS can actively block or prevent traffic that matches defined security conditions."
                            },

                            {
                                type: "callout",
                                title: "Important",
                                text: "Security controls must be properly configured, monitored and maintained. A security product alone does not guarantee security."
                            }

                        ]

                    },


                    {

                        id:
                            "module-02-lesson-04",

                        number:
                            4,

                        title:
                            "VPNs & Wireless Security",

                        description:
                            "Learn how VPNs and modern Wi-Fi security help protect network communications.",

                        objectives: [

                            "Explain the purpose of VPNs.",

                            "Understand WPA3.",

                            "Explain enterprise wireless authentication.",

                            "Recognize secure wireless configuration principles."

                        ],

                        content: [

                            {
                                type: "heading",
                                text: "Virtual Private Networks"
                            },

                            {
                                type: "paragraph",
                                text: "A VPN creates a protected communication channel across a network. Organizations commonly use VPN technologies to provide secure remote access or connect network environments."
                            },

                            {
                                type: "heading",
                                text: "Wireless Security"
                            },

                            {
                                type: "paragraph",
                                text: "Wireless networks must be configured to prevent unauthorized access and protect communications. Modern deployments should use strong authentication and current security standards."
                            },

                            {
                                type: "heading",
                                text: "WPA3"
                            },

                            {
                                type: "paragraph",
                                text: "WPA3 is a modern Wi-Fi security standard designed to improve protection over earlier wireless security technologies."
                            },

                            {
                                type: "heading",
                                text: "Enterprise Authentication"
                            },

                            {
                                type: "paragraph",
                                text: "Enterprise wireless environments can integrate authentication with centralized identity systems, allowing organizations to manage access more effectively."
                            }

                        ]

                    }

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
                    "Threats, Attacks & Vulnerabilities",

                description:
                    "Understand common threats and vulnerabilities from a defensive cybersecurity perspective.",

                lessons: [

                    {

                        id:
                            "module-03-lesson-01",

                        number:
                            1,

                        title:
                            "Malware",

                        description:
                            "Learn the characteristics of viruses, worms, trojans, ransomware and fileless malware.",

                        objectives: [

                            "Define malware.",

                            "Differentiate common malware categories.",

                            "Understand common defensive controls.",

                            "Recognize why malware analysis matters."

                        ],

                        content: [

                            {
                                type: "heading",
                                text: "What Is Malware?"
                            },

                            {
                                type: "paragraph",
                                text: "Malware is malicious software designed to compromise systems, disrupt operations, steal information or perform other unauthorized actions."
                            },

                            {
                                type: "list",
                                items: [
                                    "Viruses",
                                    "Worms",
                                    "Trojans",
                                    "Ransomware",
                                    "Fileless malware"
                                ]
                            },

                            {
                                type: "heading",
                                text: "Defensive Approach"
                            },

                            {
                                type: "paragraph",
                                text: "Defenders can use endpoint protection, application controls, monitoring, patch management, backups and security awareness to reduce malware risk."
                            }

                        ]

                    },


                    {

                        id:
                            "module-03-lesson-02",

                        number:
                            2,

                        title:
                            "Social Engineering",

                        description:
                            "Recognize phishing and other techniques that manipulate people rather than technology alone.",

                        objectives: [

                            "Explain social engineering.",

                            "Identify phishing and spear phishing.",

                            "Recognize vishing and tailgating.",

                            "Understand watering-hole attacks."

                        ],

                        content: [

                            {
                                type: "heading",
                                text: "The Human Element"
                            },

                            {
                                type: "paragraph",
                                text: "Social engineering involves manipulating people into revealing information, performing actions or violating security procedures."
                            },

                            {
                                type: "list",
                                items: [
                                    "Phishing",
                                    "Spear phishing",
                                    "Vishing",
                                    "Tailgating",
                                    "Watering-hole attacks"
                                ]
                            },

                            {
                                type: "heading",
                                text: "Defensive Measures"
                            },

                            {
                                type: "paragraph",
                                text: "Security awareness training, strong authentication, verification procedures, reporting mechanisms and technical email controls can reduce social engineering risk."
                            },

                            {
                                type: "callout",
                                title: "Think Before You Trust",
                                text: "Unexpected urgency, requests for sensitive information and unusual communication channels should be treated cautiously."
                            }

                        ]

                    },


                    {

                        id:
                            "module-03-lesson-03",

                        number:
                            3,

                        title:
                            "Application Attacks",

                        description:
                            "Understand SQL injection and Cross-Site Scripting from a defensive perspective.",

                        objectives: [

                            "Explain SQL injection conceptually.",

                            "Explain Cross-Site Scripting.",

                            "Understand input validation.",

                            "Recognize secure development practices."

                        ],

                        content: [

                            {
                                type: "heading",
                                text: "SQL Injection"
                            },

                            {
                                type: "paragraph",
                                text: "SQL injection occurs when untrusted input is incorrectly incorporated into database queries. Secure development practices such as parameterized queries help prevent this class of vulnerability."
                            },

                            {
                                type: "heading",
                                text: "Cross-Site Scripting"
                            },

                            {
                                type: "paragraph",
                                text: "Cross-Site Scripting, or XSS, involves untrusted content being interpreted as executable script in a user's browser. Output encoding, input handling and appropriate security controls help reduce the risk."
                            },

                            {
                                type: "heading",
                                text: "Secure Development"
                            },

                            {
                                type: "list",
                                items: [
                                    "Validate input",
                                    "Use parameterized database queries",
                                    "Encode output appropriately",
                                    "Apply secure authentication",
                                    "Keep dependencies updated"
                                ]
                            }

                        ]

                    },


                    {

                        id:
                            "module-03-lesson-04",

                        number:
                            4,

                        title:
                            "Network Attacks",

                        description:
                            "Understand DDoS and Man-in-the-Middle attacks and how defenders reduce exposure.",

                        objectives: [

                            "Explain denial-of-service attacks.",

                            "Understand DDoS at a high level.",

                            "Explain Man-in-the-Middle attacks.",

                            "Identify defensive strategies."

                        ],

                        content: [

                            {
                                type: "heading",
                                text: "Denial of Service"
                            },

                            {
                                type: "paragraph",
                                text: "A denial-of-service attack attempts to make a service unavailable to legitimate users. Distributed denial-of-service attacks use multiple systems or sources to generate traffic or requests."
                            },

                            {
                                type: "heading",
                                text: "Man-in-the-Middle"
                            },

                            {
                                type: "paragraph",
                                text: "A Man-in-the-Middle attack involves an unauthorized party positioning itself between communicating parties in an attempt to observe or manipulate communications."
                            },

                            {
                                type: "heading",
                                text: "Defensive Controls"
                            },

                            {
                                type: "list",
                                items: [
                                    "Encryption",
                                    "Certificate validation",
                                    "Secure network configuration",
                                    "Network monitoring",
                                    "DDoS protection services",
                                    "Strong authentication"
                                ]
                            }

                        ]

                    }

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
                    "System & Endpoint Security",

                description:
                    "Learn how operating systems and endpoints can be hardened and protected.",

                lessons: [

                    {

                        id:
                            "module-04-lesson-01",

                        number:
                            1,

                        title:
                            "Operating System Hardening",

                        description:
                            "Learn how Windows, Linux and macOS systems can be securely configured.",

                        objectives: [

                            "Explain operating system hardening.",

                            "Identify unnecessary services.",

                            "Understand secure configuration.",

                            "Recognize the importance of system baselines."

                        ],

                        content: [

                            {
                                type: "heading",
                                text: "What Is Hardening?"
                            },

                            {
                                type: "paragraph",
                                text: "System hardening reduces unnecessary attack surface by configuring systems securely and removing or disabling features that are not required."
                            },

                            {
                                type: "heading",
                                text: "Common Hardening Activities"
                            },

                            {
                                type: "list",
                                items: [
                                    "Disable unnecessary services",
                                    "Remove unused applications",
                                    "Apply security updates",
                                    "Use strong authentication",
                                    "Restrict administrative access",
                                    "Enable appropriate logging"
                                ]
                            },

                            {
                                type: "callout",
                                title: "Security Baseline",
                                text: "Organizations should establish secure configuration baselines and regularly verify that systems continue to meet them."
                            }

                        ]

                    },


                    {

                        id:
                            "module-04-lesson-02",

                        number:
                            2,

                        title:
                            "Endpoint Protection & EDR",

                        description:
                            "Understand endpoint protection and Endpoint Detection and Response capabilities.",

                        objectives: [

                            "Explain endpoint protection.",

                            "Understand EDR.",

                            "Recognize endpoint telemetry.",

                            "Understand detection and response."

                        ],

                        content: [

                            {
                                type: "heading",
                                text: "Endpoint Protection"
                            },

                            {
                                type: "paragraph",
                                text: "Endpoints include laptops, desktops, servers and other computing devices. Endpoint security controls help prevent, detect and respond to suspicious activity."
                            },

                            {
                                type: "heading",
                                text: "Endpoint Detection and Response"
                            },

                            {
                                type: "paragraph",
                                text: "EDR platforms collect endpoint telemetry and provide capabilities for detecting suspicious behavior, investigating events and supporting response activities."
                            },

                            {
                                type: "heading",
                                text: "Local Firewalls"
                            },

                            {
                                type: "paragraph",
                                text: "Host-based firewalls can control network connections to and from individual systems and provide an additional layer of protection."
                            }

                        ]

                    },


                    {

                        id:
                            "module-04-lesson-03",

                        number:
                            3,

                        title:
                            "Patch Management",

                        description:
                            "Learn how organizations identify, test and deploy software and firmware updates.",

                        objectives: [

                            "Explain patch management.",

                            "Understand vulnerability remediation.",

                            "Recognize the importance of testing.",

                            "Understand patch prioritization."

                        ],

                        content: [

                            {
                                type: "heading",
                                text: "Why Patching Matters"
                            },

                            {
                                type: "paragraph",
                                text: "Software vulnerabilities can expose systems to security risks. Patch management provides a structured process for identifying available updates, assessing them and deploying them appropriately."
                            },

                            {
                                type: "heading",
                                text: "Patch Lifecycle"
                            },

                            {
                                type: "list",
                                items: [
                                    "Identify updates",
                                    "Assess security impact",
                                    "Test updates",
                                    "Schedule deployment",
                                    "Deploy updates",
                                    "Verify successful installation",
                                    "Document results"
                                ]
                            },

                            {
                                type: "callout",
                                title: "Important",
                                text: "Critical updates should be prioritized based on factors such as severity, exposure, exploitability and business impact."
                            }

                        ]

                    },


                    {

                        id:
                            "module-04-lesson-04",

                        number:
                            4,

                        title:
                            "Endpoint Security Strategy",

                        description:
                            "Combine hardening, monitoring, access control and patching into an endpoint security strategy.",

                        objectives: [

                            "Combine multiple endpoint controls.",

                            "Understand defense-in-depth for endpoints.",

                            "Recognize the role of monitoring.",

                            "Understand endpoint security lifecycle management."

                        ],

                        content: [

                            {
                                type: "heading",
                                text: "Layered Endpoint Security"
                            },

                            {
                                type: "paragraph",
                                text: "Endpoint security is strongest when multiple controls work together. Hardening, patching, authentication, endpoint protection, firewalls and monitoring can collectively reduce risk."
                            },

                            {
                                type: "heading",
                                text: "Continuous Monitoring"
                            },

                            {
                                type: "paragraph",
                                text: "Security is not a one-time configuration. Organizations need to continuously monitor systems, investigate alerts and verify that security controls remain effective."
                            },

                            {
                                type: "callout",
                                title: "Security Mindset",
                                text: "Secure configuration is a process rather than a single event."
                            }

                        ]

                    }

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
                    "Governance, Risk & Compliance",

                description:
                    "Understand how organizations manage cyber risk, security frameworks and regulatory obligations.",

                lessons: [

                    {

                        id:
                            "module-05-lesson-01",

                        number:
                            1,

                        title:
                            "Risk Management",

                        description:
                            "Learn how organizations identify, assess and treat cybersecurity risks.",

                        objectives: [

                            "Define cybersecurity risk.",

                            "Understand risk assessment.",

                            "Explain risk treatment options.",

                            "Differentiate acceptance, avoidance and transference."

                        ],

                        content: [

                            {
                                type: "heading",
                                text: "Cybersecurity Risk"
                            },

                            {
                                type: "paragraph",
                                text: "Risk represents the possibility that a threat may exploit a vulnerability and cause an unwanted outcome. Risk management helps organizations identify and prioritize these situations."
                            },

                            {
                                type: "heading",
                                text: "Risk Treatment"
                            },

                            {
                                type: "list",
                                items: [
                                    "Risk acceptance",
                                    "Risk avoidance",
                                    "Risk transference",
                                    "Risk mitigation"
                                ]
                            },

                            {
                                type: "paragraph",
                                text: "The appropriate treatment depends on the organization's risk appetite, business requirements, available controls and potential impact."
                            }

                        ]

                    },


                    {

                        id:
                            "module-05-lesson-02",

                        number:
                            2,

                        title:
                            "Security Frameworks",

                        description:
                            "Explore NIST, ISO/IEC 27001, CIS Controls and MITRE ATT&CK.",

                        objectives: [

                            "Explain the purpose of security frameworks.",

                            "Understand NIST at a high level.",

                            "Understand ISO/IEC 27001.",

                            "Recognize CIS Controls and MITRE ATT&CK."

                        ],

                        content: [

                            {
                                type: "heading",
                                text: "Why Frameworks Matter"
                            },

                            {
                                type: "paragraph",
                                text: "Security frameworks provide structured approaches for managing cybersecurity activities, identifying risks and improving security maturity."
                            },

                            {
                                type: "heading",
                                text: "NIST"
                            },

                            {
                                type: "paragraph",
                                text: "NIST cybersecurity guidance provides organizations with structured approaches for identifying, protecting, detecting, responding to and recovering from cybersecurity risks."
                            },

                            {
                                type: "heading",
                                text: "ISO/IEC 27001"
                            },

                            {
                                type: "paragraph",
                                text: "ISO/IEC 27001 focuses on establishing and continually improving an information security management system."
                            },

                            {
                                type: "heading",
                                text: "CIS Controls"
                            },

                            {
                                type: "paragraph",
                                text: "CIS Controls provide prioritized safeguards intended to help organizations improve cybersecurity."
                            },

                            {
                                type: "heading",
                                text: "MITRE ATT&CK"
                            },

                            {
                                type: "paragraph",
                                text: "MITRE ATT&CK is a knowledge base describing adversary tactics and techniques. Security teams use it for threat-informed defense, detection engineering and analysis."
                            }

                        ]

                    },


                    {

                        id:
                            "module-05-lesson-03",

                        number:
                            3,

                        title:
                            "Regulations & Privacy",

                        description:
                            "Understand the purpose of data protection and security regulations.",

                        objectives: [

                            "Understand privacy obligations.",

                            "Recognize GDPR concepts.",

                            "Understand HIPAA at a high level.",

                            "Understand PCI-DSS."

                        ],

                        content: [

                            {
                                type: "heading",
                                text: "Privacy and Security"
                            },

                            {
                                type: "paragraph",
                                text: "Organizations may have legal and contractual obligations concerning how information is collected, processed, stored and protected."
                            },

                            {
                                type: "heading",
                                text: "GDPR"
                            },

                            {
                                type: "paragraph",
                                text: "The General Data Protection Regulation establishes requirements around the processing and protection of personal data within its scope."
                            },

                            {
                                type: "heading",
                                text: "HIPAA"
                            },

                            {
                                type: "paragraph",
                                text: "HIPAA establishes requirements related to protected health information in the United States healthcare context."
                            },

                            {
                                type: "heading",
                                text: "PCI-DSS"
                            },

                            {
                                type: "paragraph",
                                text: "PCI-DSS provides security requirements for organizations involved in storing, processing or transmitting payment card data."
                            },

                            {
                                type: "callout",
                                title: "Important",
                                text: "Compliance does not automatically mean an organization is secure. Security programs should address both regulatory obligations and actual risk."
                            }

                        ]

                    },


                    {

                        id:
                            "module-05-lesson-04",

                        number:
                            4,

                        title:
                            "Governance & Security Policy",

                        description:
                            "Understand how security governance turns security objectives into organizational processes.",

                        objectives: [

                            "Explain security governance.",

                            "Understand security policies.",

                            "Recognize roles and responsibilities.",

                            "Understand security accountability."

                        ],

                        content: [

                            {
                                type: "heading",
                                text: "Security Governance"
                            },

                            {
                                type: "paragraph",
                                text: "Security governance establishes accountability, direction and oversight for cybersecurity activities."
                            },

                            {
                                type: "heading",
                                text: "Security Policies"
                            },

                            {
                                type: "paragraph",
                                text: "Policies define organizational expectations around areas such as acceptable use, access control, incident response, data handling and security responsibilities."
                            },

                            {
                                type: "heading",
                                text: "Accountability"
                            },

                            {
                                type: "paragraph",
                                text: "Effective governance requires clearly defined responsibilities, appropriate oversight and regular review of security performance."
                            }

                        ]

                    }

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
                    "Incident Response & Business Continuity",

                description:
                    "Learn how organizations detect, contain and recover from security incidents while maintaining business operations.",

                lessons: [

                    {

                        id:
                            "module-06-lesson-01",

                        number:
                            1,

                        title:
                            "Incident Response Lifecycle",

                        description:
                            "Understand the major phases of responding to cybersecurity incidents.",

                        objectives: [

                            "Explain incident response.",

                            "Identify the major lifecycle phases.",

                            "Understand containment and eradication.",

                            "Understand lessons learned."

                        ],

                        content: [

                            {
                                type: "heading",
                                text: "Incident Response"
                            },

                            {
                                type: "paragraph",
                                text: "Incident response is the structured process used to prepare for, detect, investigate, contain and recover from security incidents."
                            },

                            {
                                type: "heading",
                                text: "Lifecycle"
                            },

                            {
                                type: "list",
                                items: [
                                    "Preparation",
                                    "Detection and analysis",
                                    "Containment",
                                    "Eradication",
                                    "Recovery",
                                    "Lessons learned"
                                ]
                            },

                            {
                                type: "paragraph",
                                text: "A mature incident response capability helps organizations reduce damage, restore services and improve defenses after an incident."
                            }

                        ]

                    },


                    {

                        id:
                            "module-06-lesson-02",

                        number:
                            2,

                        title:
                            "Digital Forensics",

                        description:
                            "Learn the foundations of preserving and analyzing digital evidence.",

                        objectives: [

                            "Understand digital forensics.",

                            "Explain evidence preservation.",

                            "Understand chain of custody.",

                            "Recognize the importance of logs."

                        ],

                        content: [

                            {
                                type: "heading",
                                text: "Digital Forensics"
                            },

                            {
                                type: "paragraph",
                                text: "Digital forensics involves the structured collection, preservation and analysis of digital evidence."
                            },

                            {
                                type: "heading",
                                text: "Chain of Custody"
                            },

                            {
                                type: "paragraph",
                                text: "Chain of custody documents how evidence is collected, handled, transferred and stored. Proper documentation helps maintain confidence in the integrity of evidence."
                            },

                            {
                                type: "heading",
                                text: "Log Analysis"
                            },

                            {
                                type: "paragraph",
                                text: "Logs can provide valuable information about authentication events, system activity, network connections and application behavior."
                            },

                            {
                                type: "callout",
                                title: "Forensic Principle",
                                text: "Evidence should be handled carefully and documented throughout the investigation."
                            }

                        ]

                    },


                    {

                        id:
                            "module-06-lesson-03",

                        number:
                            3,

                        title:
                            "Disaster Recovery",

                        description:
                            "Understand backups, recovery strategies and the 3-2-1 backup principle.",

                        objectives: [

                            "Explain disaster recovery.",

                            "Understand backup strategies.",

                            "Explain the 3-2-1 rule.",

                            "Understand recovery objectives."

                        ],

                        content: [

                            {
                                type: "heading",
                                text: "Disaster Recovery"
                            },

                            {
                                type: "paragraph",
                                text: "Disaster recovery focuses on restoring systems and data after disruptive events such as security incidents, hardware failures or natural disasters."
                            },

                            {
                                type: "heading",
                                text: "The 3-2-1 Rule"
                            },

                            {
                                type: "list",
                                items: [
                                    "Maintain at least 3 copies of important data.",
                                    "Use at least 2 different storage media or environments.",
                                    "Keep at least 1 copy offsite or otherwise isolated."
                                ]
                            },

                            {
                                type: "heading",
                                text: "Recovery Objectives"
                            },

                            {
                                type: "paragraph",
                                text: "Organizations should establish recovery requirements based on business needs, including how quickly systems need to be restored and how much data loss can be tolerated."
                            }

                        ]

                    },


                    {

                        id:
                            "module-06-lesson-04",

                        number:
                            4,

                        title:
                            "Business Continuity & Lessons Learned",

                        description:
                            "Bring incident response, recovery and business continuity together into a resilient security program.",

                        objectives: [

                            "Explain business continuity planning.",

                            "Understand the relationship between IR and DR.",

                            "Recognize the importance of testing plans.",

                            "Understand lessons learned."

                        ],

                        content: [

                            {
                                type: "heading",
                                text: "Business Continuity"
                            },

                            {
                                type: "paragraph",
                                text: "Business Continuity Planning focuses on maintaining critical business functions during and after disruptive events."
                            },

                            {
                                type: "heading",
                                text: "Incident Response vs Disaster Recovery"
                            },

                            {
                                type: "paragraph",
                                text: "Incident response focuses on managing security incidents, while disaster recovery focuses on restoring systems and services. The two disciplines often operate together during major disruptions."
                            },

                            {
                                type: "heading",
                                text: "Testing"
                            },

                            {
                                type: "paragraph",
                                text: "Plans should be tested regularly. Exercises can reveal unclear responsibilities, missing dependencies and weaknesses in recovery procedures."
                            },

                            {
                                type: "heading",
                                text: "Lessons Learned"
                            },

                            {
                                type: "paragraph",
                                text: "After an incident or exercise, organizations should review what happened, identify improvements and update their security and continuity plans."
                            },

                            {
                                type: "callout",
                                title: "Course Principle",
                                text: "Cybersecurity maturity improves when organizations continuously learn, measure and improve."
                            }

                        ]

                    }

                ]

            }

        ]

    }

};


/* =========================================================
   URL PARAMETERS
========================================================= */

function getUrlParameters() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    return {

        courseId:
            (
                params.get("course") || ""
            )
                .trim()
                .toLowerCase(),

        moduleId:
            (
                params.get("module") || ""
            )
                .trim()
                .toLowerCase(),

        lessonId:
            (
                params.get("lesson") || ""
            )
                .trim()
                .toLowerCase()

    };

}


/* =========================================================
   USER NAME
========================================================= */

function getUserName(user) {

    if (!user) {

        return "Student";

    }


    if (
        user.displayName &&
        user.displayName.trim()
    ) {

        return user.displayName.trim();

    }


    if (
        user.email &&
        user.email.includes("@")
    ) {

        return user.email
            .split("@")[0]
            .replace(/[._-]+/g, " ")
            .split(" ")
            .map(
                word =>
                    word.charAt(0).toUpperCase() +
                    word.slice(1)
            )
            .join(" ");

    }


    return "Student";

}


/* =========================================================
   DISPLAY USER
========================================================= */

function displayStudent(user) {

    if (studentName) {

        studentName.textContent =
            getUserName(user);

    }

}


/* =========================================================
   PAGE STATES
========================================================= */

function showLoading() {

    if (lessonLoading) {

        lessonLoading.hidden =
            false;

    }


    if (lessonNotFound) {

        lessonNotFound.hidden =
            true;

    }


    if (lessonContent) {

        lessonContent.hidden =
            true;

    }

}


function showNotFound() {

    if (lessonLoading) {

        lessonLoading.hidden =
            true;

    }


    if (lessonContent) {

        lessonContent.hidden =
            true;

    }


    if (lessonNotFound) {

        lessonNotFound.hidden =
            false;

    }

}


function showContent() {

    if (lessonLoading) {

        lessonLoading.hidden =
            true;

    }


    if (lessonNotFound) {

        lessonNotFound.hidden =
            true;

    }


    if (lessonContent) {

        lessonContent.hidden =
            false;

    }

}


/* =========================================================
   COURSE HELPERS
========================================================= */

function findCourse(courseId) {

    return courses[courseId] || null;

}


function findModule(course, moduleId) {

    if (!course) {

        return null;

    }


    return (
        course.modules.find(
            module =>
                module.id === moduleId
        ) || null
    );

}


function findLesson(module, lessonId) {

    if (!module) {

        return null;

    }


    return (
        module.lessons.find(
            lesson =>
                lesson.id === lessonId
        ) || null
    );

}


/* =========================================================
   ALL LESSONS
========================================================= */

function getAllLessons(course) {

    if (!course) {

        return [];

    }


    const result = [];


    course.modules.forEach(
        module => {

            module.lessons.forEach(
                lesson => {

                    result.push({

                        moduleId:
                            module.id,

                        moduleNumber:
                            module.number,

                        moduleTitle:
                            module.title,

                        lessonId:
                            lesson.id,

                        lessonNumber:
                            lesson.number,

                        lessonTitle:
                            lesson.title

                    });

                }
            );

        }
    );


    return result;

}


/* =========================================================
   PROGRESS
========================================================= */

function getDefaultProgress() {

    return {

        courseId:
            currentCourse.id,

        completedLessons:
            [],

        currentModule:
            currentModule.id,

        currentLesson:
            currentLesson.id,

        started:
            true,

        completed:
            false,

        progressPercent:
            0

    };

}


function getProgressRef() {

    if (
        !db ||
        !currentUser ||
        !currentCourse
    ) {

        return null;

    }


    return doc(
        db,
        "users",
        currentUser.uid,
        "courseProgress",
        currentCourse.id
    );

}


async function loadProgress() {

    currentProgress =
        getDefaultProgress();


    if (!db) {

        warn(
            "Firestore unavailable."
        );

        return;

    }


    const progressRef =
        getProgressRef();


    if (!progressRef) {

        return;

    }


    try {

        const snapshot =
            await getDoc(
                progressRef
            );


        if (snapshot.exists()) {

            currentProgress = {

                ...getDefaultProgress(),

                ...snapshot.data()

            };

        }


        if (
            !Array.isArray(
                currentProgress.completedLessons
            )
        ) {

            currentProgress.completedLessons =
                [];

        }


    } catch (err) {

        error(
            "Progress load failed:",
            err
        );

    }

}


async function saveProgress() {

    if (
        !db ||
        !currentUser ||
        !currentCourse ||
        !currentProgress
    ) {

        return;

    }


    const progressRef =
        getProgressRef();


    if (!progressRef) {

        return;

    }


    try {

        await setDoc(
            progressRef,
            {

                ...currentProgress,

                updatedAt:
                    serverTimestamp()

            },
            {
                merge: true
            }
        );


    } catch (err) {

        error(
            "Progress save failed:",
            err
        );

    }

}


/* =========================================================
   CALCULATE PROGRESS
========================================================= */

function calculateProgress() {

    if (!currentCourse) {

        return 0;

    }


    const lessons =
        getAllLessons(
            currentCourse
        );


    const total =
        lessons.length;


    const completed =
        currentProgress
            ?.completedLessons
            ?.filter(
                id =>
                    lessons.some(
                        lesson =>
                            lesson.lessonId === id
                    )
            )
            .length || 0;


    if (!total) {

        return 0;

    }


    return Math.round(
        (
            completed /
            total
        ) * 100
    );

}


/* =========================================================
   UPDATE PROGRESS UI
========================================================= */

function updateProgressUI() {

    const percent =
        calculateProgress();


    const lessons =
        getAllLessons(
            currentCourse
        );


    const completed =
        currentProgress
            ?.completedLessons
            ?.length || 0;


    if (lessonProgressPercent) {

        lessonProgressPercent.textContent =
            `${percent}%`;

    }


    if (lessonProgressFill) {

        lessonProgressFill.style.width =
            `${percent}%`;

    }


    if (lessonProgressText) {

        lessonProgressText.textContent =
            `${completed} of ${lessons.length} lessons completed`;

    }


    const progressBar =
        document.querySelector(
            ".lesson-progress-bar"
        );


    if (progressBar) {

        progressBar.setAttribute(
            "aria-valuenow",
            String(percent)
        );

    }

}


/* =========================================================
   RENDER OBJECTIVES
========================================================= */

function renderObjectives(
    objectives = []
) {

    if (!lessonObjectives) {

        return;

    }


    lessonObjectives.innerHTML =
        "";


    objectives.forEach(
        objective => {

            const li =
                document.createElement(
                    "li"
                );


            const icon =
                document.createElement(
                    "i"
                );


            icon.className =
                "fa-solid fa-check";


            const text =
                document.createElement(
                    "span"
                );


            text.textContent =
                objective;


            li.appendChild(
                icon
            );


            li.appendChild(
                text
            );


            lessonObjectives.appendChild(
                li
            );

        }
    );

}


/* =========================================================
   RENDER LESSON CONTENT
========================================================= */

function renderLessonBody(
    content = []
) {

    if (!lessonBody) {

        return;

    }


    lessonBody.innerHTML =
        "";


    content.forEach(
        block => {

            let element;


            switch (
                block.type
            ) {

                case "heading":

                    element =
                        document.createElement(
                            "h2"
                        );

                    element.textContent =
                        block.text;

                    break;


                case "paragraph":

                    element =
                        document.createElement(
                            "p"
                        );

                    element.textContent =
                        block.text;

                    break;


                case "list":

                    element =
                        document.createElement(
                            "ul"
                        );


                    (
                        block.items || []
                    ).forEach(
                        item => {

                            const li =
                                document.createElement(
                                    "li"
                                );


                            li.textContent =
                                item;


                            element.appendChild(
                                li
                            );

                        }
                    );

                    break;


                case "callout":

                    element =
                        document.createElement(
                            "aside"
                        );


                    element.className =
                        "lesson-callout";


                    const title =
                        document.createElement(
                            "strong"
                        );


                    title.textContent =
                        block.title ||
                        "Important";


                    const paragraph =
                        document.createElement(
                            "p"
                        );


                    paragraph.textContent =
                        block.text;


                    element.appendChild(
                        title
                    );


                    element.appendChild(
                        paragraph
                    );

                    break;


                default:

                    element =
                        document.createElement(
                            "p"
                        );


                    element.textContent =
                        block.text ||
                        "";

            }


            if (element) {

                lessonBody.appendChild(
                    element
                );

            }

        }
    );

}


/* =========================================================
   LESSON URL
========================================================= */

function buildLessonUrl(
    courseId,
    moduleId,
    lessonId
) {

    return (
        `./lesson.html?course=${encodeURIComponent(
            courseId
        )}` +
        `&module=${encodeURIComponent(
            moduleId
        )}` +
        `&lesson=${encodeURIComponent(
            lessonId
        )}`
    );

}


/* =========================================================
   RENDER MODULE SIDEBAR
========================================================= */

function renderModuleList() {

    if (!lessonModuleList) {

        return;

    }


    lessonModuleList.innerHTML =
        "";


    currentCourse.modules.forEach(
        module => {

            const section =
                document.createElement(
                    "div"
                );


            section.className =
                "module-section";


            const heading =
                document.createElement(
                    "div"
                );


            heading.className =
                "module-section-title";


            heading.textContent =
                `Module ${String(
                    module.number
                ).padStart(
                    2,
                    "0"
                )} — ${module.title}`;


            section.appendChild(
                heading
            );


            module.lessons.forEach(
                lesson => {

                    const link =
                        document.createElement(
                            "a"
                        );


                    link.className =
                        "lesson-module-item";


                    link.href =
                        buildLessonUrl(
                            currentCourse.id,
                            module.id,
                            lesson.id
                        );


                    if (
                        currentModule.id ===
                            module.id &&
                        currentLesson.id ===
                            lesson.id
                    ) {

                        link.classList.add(
                            "active"
                        );

                    }


                    const completed =
                        currentProgress
                            ?.completedLessons
                            ?.includes(
                                lesson.id
                            );


                    if (completed) {

                        link.classList.add(
                            "completed"
                        );

                    }


                    const number =
                        document.createElement(
                            "span"
                        );


                    number.className =
                        "lesson-module-item-number";


                    number.textContent =
                        String(
                            lesson.number
                        ).padStart(
                            2,
                            "0"
                        );


                    const title =
                        document.createElement(
                            "span"
                        );


                    title.className =
                        "lesson-module-item-title";


                    title.textContent =
                        lesson.title;


                    link.appendChild(
                        number
                    );


                    link.appendChild(
                        title
                    );


                    if (completed) {

                        const check =
                            document.createElement(
                                "i"
                            );


                        check.className =
                            "fa-solid fa-check";


                        link.appendChild(
                            check
                        );

                    }


                    section.appendChild(
                        link
                    );

                }
            );


            lessonModuleList.appendChild(
                section
            );

        }
    );

}


/* =========================================================
   NAVIGATION
========================================================= */

function updateNavigation() {

    const lessons =
        getAllLessons(
            currentCourse
        );


    const currentIndex =
        lessons.findIndex(
            lesson =>
                lesson.lessonId ===
                currentLesson.id
        );


    log(
        "Navigation:",
        {
            currentIndex,
            total: lessons.length
        }
    );


    /* =====================================================
       PREVIOUS
    ====================================================== */

    if (previousLessonBtn) {

        if (currentIndex > 0) {

            const previous =
                lessons[
                    currentIndex - 1
                ];


            previousLessonBtn.href =
                buildLessonUrl(
                    currentCourse.id,
                    previous.moduleId,
                    previous.lessonId
                );


            previousLessonBtn.hidden =
                false;

        } else {

            previousLessonBtn.hidden =
                true;

        }

    }


    /* =====================================================
       NEXT
    ====================================================== */

    if (nextLessonBtn) {

        if (
            currentIndex >= 0 &&
            currentIndex <
                lessons.length - 1
        ) {

            const next =
                lessons[
                    currentIndex + 1
                ];


            nextLessonBtn.href =
                buildLessonUrl(
                    currentCourse.id,
                    next.moduleId,
                    next.lessonId
                );


            nextLessonBtn.hidden =
                false;

        } else {

            nextLessonBtn.hidden =
                true;

        }

    }

}


/* =========================================================
   COMPLETE BUTTON
========================================================= */

function updateCompleteButton() {

    if (!markCompleteBtn) {

        return;

    }


    const completed =
        currentProgress
            ?.completedLessons
            ?.includes(
                currentLesson.id
            );


    if (completed) {

        markCompleteBtn.classList.add(
            "completed"
        );


        markCompleteBtn.innerHTML = `
            <i class="fa-solid fa-check"></i>
            Lesson Completed
        `;

    } else {

        markCompleteBtn.classList.remove(
            "completed"
        );


        markCompleteBtn.innerHTML = `
            <i class="fa-solid fa-check"></i>
            Mark Lesson Complete
        `;

    }

}


/* =========================================================
   RENDER LESSON
========================================================= */

function renderLesson() {

    if (
        !currentCourse ||
        !currentModule ||
        !currentLesson
    ) {

        return;

    }


    if (breadcrumbCourse) {

        breadcrumbCourse.textContent =
            currentCourse.title;

    }


    if (breadcrumbModule) {

        breadcrumbModule.textContent =
            currentModule.title;

    }


    if (lessonModuleNumber) {

        lessonModuleNumber.textContent =
            `MODULE ${String(
                currentModule.number
            ).padStart(
                2,
                "0"
            )}`;

    }


    if (lessonNumber) {

        lessonNumber.textContent =
            `LESSON ${String(
                currentLesson.number
            ).padStart(
                2,
                "0"
            )}`;

    }


    if (lessonTitle) {

        lessonTitle.textContent =
            currentLesson.title;

    }


    if (lessonDescription) {

        lessonDescription.textContent =
            currentLesson.description;

    }


    renderObjectives(
        currentLesson.objectives
    );


    renderLessonBody(
        currentLesson.content
    );


    updateProgressUI();


    renderModuleList();


    updateNavigation();


    updateCompleteButton();

}


/* =========================================================
   REMEMBER LESSON
========================================================= */

async function rememberCurrentLesson() {

    if (!currentProgress) {

        return;

    }


    currentProgress.currentModule =
        currentModule.id;


    currentProgress.currentLesson =
        currentLesson.id;


    currentProgress.started =
        true;


    await saveProgress();

}


/* =========================================================
   MARK COMPLETE
========================================================= */

async function markLessonComplete() {

    if (
        !currentProgress ||
        !currentLesson
    ) {

        return;

    }


    if (
        !Array.isArray(
            currentProgress.completedLessons
        )
    ) {

        currentProgress.completedLessons =
            [];

    }


    if (
        !currentProgress.completedLessons.includes(
            currentLesson.id
        )
    ) {

        currentProgress.completedLessons.push(
            currentLesson.id
        );

    }


    currentProgress.currentModule =
        currentModule.id;


    currentProgress.currentLesson =
        currentLesson.id;


    currentProgress.started =
        true;


    currentProgress.progressPercent =
        calculateProgress();


    const totalLessons =
        getAllLessons(
            currentCourse
        ).length;


    currentProgress.completed =
        currentProgress.completedLessons.length >=
        totalLessons;


    updateProgressUI();


    updateCompleteButton();


    renderModuleList();


    await saveProgress();


    log(
        "Completed:",
        currentLesson.id
    );

}


/* =========================================================
   LOGOUT
========================================================= */

async function logout() {

    if (!auth) {

        error(
            "Firebase Auth unavailable."
        );

        return;

    }


    if (logoutBtn) {

        logoutBtn.disabled =
            true;

        logoutBtn.classList.add(
            "is-loading"
        );

    }


    try {

        await signOut(
            auth
        );


        window.location.replace(
            "../pages/login.html"
        );


    } catch (err) {

        error(
            "Logout failed:",
            err
        );


        if (logoutBtn) {

            logoutBtn.disabled =
                false;

            logoutBtn.classList.remove(
                "is-loading"
            );

        }


        alert(
            "Unable to sign out. Please try again."
        );

    }

}


/* =========================================================
   LOGOUT EVENT
========================================================= */

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        logout
    );

}


/* =========================================================
   COMPLETE EVENT
========================================================= */

if (markCompleteBtn) {

    markCompleteBtn.addEventListener(
        "click",
        markLessonComplete
    );

}


/* =========================================================
   LOAD LESSON
========================================================= */

async function loadLesson() {

    showLoading();


    const {
        courseId,
        moduleId,
        lessonId
    } =
        getUrlParameters();


    log(
        "URL:",
        {
            courseId,
            moduleId,
            lessonId
        }
    );


    /* =====================================================
       COURSE
    ====================================================== */

    if (!courseId) {

        warn(
            "Missing course parameter."
        );

        showNotFound();

        return;

    }


    const course =
        findCourse(
            courseId
        );


    if (!course) {

        warn(
            "Course not found:",
            courseId
        );

        showNotFound();

        return;

    }


    /* =====================================================
       MODULE
    ====================================================== */

    if (!moduleId) {

        warn(
            "Missing module parameter."
        );

        showNotFound();

        return;

    }


    const module =
        findModule(
            course,
            moduleId
        );


    if (!module) {

        warn(
            "Module not found:",
            moduleId
        );

        showNotFound();

        return;

    }


    /* =====================================================
       LESSON
    ====================================================== */

    let selectedLessonId =
        lessonId;


    if (!selectedLessonId) {

        selectedLessonId =
            module.lessons[0]?.id;

    }


    if (!selectedLessonId) {

        warn(
            "Module has no lessons."
        );

        showNotFound();

        return;

    }


    const lesson =
        findLesson(
            module,
            selectedLessonId
        );


    if (!lesson) {

        warn(
            "Lesson not found:",
            selectedLessonId
        );

        showNotFound();

        return;

    }


    /* =====================================================
       SET STATE
    ====================================================== */

    currentCourse =
        course;


    currentModule =
        module;


    currentLesson =
        lesson;


    /* =====================================================
       LOAD FIRESTORE PROGRESS
    ====================================================== */

    await loadProgress();


    /* =====================================================
       SAVE CURRENT LOCATION
    ====================================================== */

    await rememberCurrentLesson();


    /* =====================================================
       RENDER
    ====================================================== */

    renderLesson();


    showContent();


    /* =====================================================
       NORMALIZE URL
    ====================================================== */

    const normalizedUrl =
        buildLessonUrl(
            currentCourse.id,
            currentModule.id,
            currentLesson.id
        );


    if (
        window.location.pathname +
        window.location.search !==
        normalizedUrl
    ) {

        window.history.replaceState(
            {},
            "",
            normalizedUrl
        );

    }


    log(
        "Lesson loaded:",
        currentLesson.title
    );

}


/* =========================================================
   AUTH
========================================================= */

if (!auth) {

    error(
        "Firebase Auth was not initialized."
    );


    window.location.replace(
        "../pages/login.html"
    );

} else {

    onAuthStateChanged(
        auth,
        async user => {

            log(
                "Auth state:",
                user
                    ? "AUTHENTICATED"
                    : "SIGNED OUT"
            );


            if (!user) {

                currentUser =
                    null;


                const {
                    courseId,
                    moduleId,
                    lessonId
                } =
                    getUrlParameters();


                const loginUrl =
                    `../pages/login.html` +
                    `?redirect=lesson` +
                    `&course=${encodeURIComponent(
                        courseId
                    )}` +
                    `&module=${encodeURIComponent(
                        moduleId
                    )}` +
                    `&lesson=${encodeURIComponent(
                        lessonId
                    )}`;


                window.location.replace(
                    loginUrl
                );


                return;

            }


            currentUser =
                user;


            displayStudent(
                user
            );


            try {

                await loadLesson();

            } catch (err) {

                error(
                    "Lesson initialization failed:",
                    err
                );


                showNotFound();

            }

        }
    );

}


/* =========================================================
   INITIAL MESSAGE
========================================================= */

log(
    "CWS Lesson Engine v2 loaded."
);
