/* =========================================================
   CWS ACADEMY
   CYBERSECURITY FUNDAMENTALS
   Expanded lesson content
========================================================= */

function buildLesson({
    id,
    title,
    duration = "35 minutes",
    subtitle,
    icon = "fa-solid fa-shield-halved",
    overview,
    explanation,
    security,
    example,
    objectives = [],
    keyConcepts = [],
    quiz = [],
    whyItMatters,
    howItWorks,
    commonMistakes = [],
    verificationSteps = [],
    practicePrompts = []
}) {

    const normalizedTitle =
        String(
            title || ""
        )
            .trim()
            .replace(
                /\?+$/,
                ""
            );


    const topicName =
        normalizedTitle.replace(
            /^What Is\s+/i,
            ""
        );

    const resolvedWhy =
        whyItMatters ||
        security ||
        `${topicName} matters because cybersecurity decisions depend on understanding how the concept changes risk, exposure, trust or defensive capability.`;

    const resolvedHow =
        howItWorks ||
        explanation ||
        overview;

    const resolvedMistakes =
        commonMistakes.length
            ? commonMistakes
            : [
                `Memorizing the definition of ${topicName} without connecting it to a realistic asset, threat or business process.`,
                "Assuming one security control is enough instead of considering prevention, detection, response and recovery together.",
                "Treating a technical finding as automatically high risk without considering exposure, likelihood, asset value and impact."
            ];

    const resolvedVerification =
        verificationSteps.length
            ? verificationSteps
            : [
                "Identify the asset, identity, system or business process involved.",
                "State the expected secure behavior before reviewing evidence.",
                "Identify which control should prevent, detect or limit the problem.",
                "Look for evidence that confirms whether the control is operating as intended.",
                "Document assumptions, gaps and any follow-up action that is still required."
            ];

    const resolvedPractice =
        practicePrompts.length
            ? practicePrompts
            : [
                `Explain ${topicName} in your own words without reading the lesson.`,
                "Create one realistic scenario where the concept reduces risk.",
                "Create one realistic scenario where the relevant control fails or is misconfigured.",
                "Name one preventive control and one detective control connected to this topic.",
                "Describe what evidence an analyst could review to determine whether the control is working."
            ];

    const supplementalQuiz = [
        {
            question:
                `Which approach shows the strongest understanding of ${topicName}?`,
            options: [
                "Memorize the definition only.",
                "Connect the concept to assets, threats, controls, evidence and business impact.",
                "Assume one security product solves the entire problem.",
                "Ignore context and rank every issue as critical."
            ],
            answer:
                1
        },
        {
            question:
                `When reviewing ${topicName} in a real environment, what should a security professional do first?`,
            options: [
                "Change the configuration immediately.",
                "Define the expected behavior and gather relevant evidence.",
                "Disable all related services.",
                "Assume the most severe explanation is correct."
            ],
            answer:
                1
        },
        {
            question:
                `Why should ${topicName} be considered together with other security controls?`,
            options: [
                "Because defense in depth reduces dependence on a single control.",
                "Because individual controls never need monitoring.",
                "Because cybersecurity risk can always be reduced to zero.",
                "Because technical controls automatically replace policy and response."
            ],
            answer:
                0
        }
    ];

    const resolvedQuiz =
        balanceAnswerPositions(
            [
                ...quiz,
                ...supplementalQuiz
            ]
                .slice(
                    0,
                    Math.max(
                        3,
                        Math.min(
                            5,
                            quiz.length + 3
                        )
                    )
                )
        );


    const questionHeading =
        /^(what|who|why|how|when|where|which|can|does|do|is|are)\b/i
            .test(
                normalizedTitle
            )
                ? `${normalizedTitle}?`
                : `What Is ${normalizedTitle}?`;


    return {

        id,
        title,
        duration,
        type:
            "Lesson",
        icon,

        subtitle:
            subtitle ||
            `Develop a practical understanding of ${topicName}.`,

        objectives:
            objectives.length
                ? objectives
                : [
                    `Explain ${topicName} in your own words.`,
                    `Describe why ${topicName} matters in cybersecurity.`,
                    `Explain how ${topicName} works in a realistic environment.`,
                    `Recognize common mistakes or failure conditions related to ${topicName}.`,
                    `Identify evidence or controls used to verify ${topicName} in practice.`
                ],

        introduction: `
            <h2>${title}</h2>

            <p>${overview}</p>

            <p>
                This lesson goes beyond a short definition. You should finish
                able to explain <strong>what the concept is, why it exists,
                how it works, what can go wrong and how a security professional
                would evaluate it in a real environment</strong>.
            </p>
        `,

        body: `
            <h2>${questionHeading}</h2>

            <p>${overview}</p>


            <h2>Why Does It Matter?</h2>

            <p>${resolvedWhy}</p>

            <p>
                Cybersecurity decisions become more useful when the concept is
                tied to an actual asset, user, service or business process.
                Ask what could fail, who could abuse it, what impact would
                result and which controls reduce that risk.
            </p>


            <h2>How Does It Work?</h2>

            <p>${resolvedHow}</p>

            <p>
                When studying this topic, separate the <strong>expected
                behavior</strong> from the <strong>security failure</strong>.
                This makes it easier to understand whether a problem comes from
                design, configuration, implementation, user behavior or a
                missing control.
            </p>


            <h2>Cybersecurity Perspective</h2>

            <p>${security}</p>

            <p>
                A mature security approach combines prevention, detection,
                response and recovery. Preventive controls reduce the chance of
                an incident, detective controls provide visibility, response
                procedures limit damage and recovery controls help restore
                normal operations.
            </p>


            <h2>Worked Example</h2>

            <p>${example}</p>

            <div class="lesson-callout">

                <div class="lesson-callout-icon">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </div>

                <div>

                    <strong>How to analyse the example</strong>

                    <p>
                        Identify the asset, the threat or failure condition,
                        the vulnerability or weakness, the likely impact and
                        the controls that could prevent, detect or reduce the
                        problem. This five-part approach turns theory into
                        practical security reasoning.
                    </p>

                </div>

            </div>


            <h2>Common Mistakes and Misconceptions</h2>

            <ul>
                ${resolvedMistakes
                    .map(
                        item =>
                            `<li>${item}</li>`
                    )
                    .join("")}
            </ul>


            <h2>How Would You Verify It?</h2>

            <ol>
                ${resolvedVerification
                    .map(
                        item =>
                            `<li>${item}</li>`
                    )
                    .join("")}
            </ol>

            <p>
                Verification matters because a configured control and an
                effective control are not always the same thing. Security teams
                should look for evidence that the intended behavior is actually
                occurring.
            </p>


            <h2>Practice Before Moving On</h2>

            <ol>
                ${resolvedPractice
                    .map(
                        item =>
                            `<li>${item}</li>`
                    )
                    .join("")}
            </ol>


            <div class="lesson-callout">

                <div class="lesson-callout-icon">
                    <i class="fa-solid fa-lightbulb"></i>
                </div>

                <div>

                    <strong>CWS Academy Study Standard</strong>

                    <p>
                        Do not move on because you recognize the terminology.
                        Move on when you can explain the topic without notes,
                        apply it to a new scenario and justify which security
                        controls or evidence matter.
                    </p>

                </div>

            </div>


            <h2>What to Remember</h2>

            <p>
                The goal is not memorization. You should be able to recognize
                ${topicName} in a realistic environment, explain its relationship
                to risk and identify how security teams would prevent, detect,
                investigate or respond to problems involving it.
            </p>
        `,

        keyConcepts:
            keyConcepts.length
                ? keyConcepts
                : [
                    {
                        title,
                        description:
                            overview
                    },
                    {
                        title:
                            "Security Context",
                        description:
                            security
                    },
                    {
                        title:
                            "Verification",
                        description:
                            "Confirm expected security behavior using evidence rather than assumption."
                    }
                ],

        quiz:
            resolvedQuiz

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


function standardQuestion(prompt, correct, ...distractors) {

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


/* =========================================================
   MODULE ASSESSMENT BUILDER
========================================================= */

function buildModuleAssessment({
    title,
    passingScore = 75,
    questions = []
}) {
    return {
        title,
        type: "Module Assessment",
        passingScore,
        allowRetry: true,
        showResults: true,
        questions
    };
}


/* =========================================================
   PRACTICAL ACTIVITY BUILDER
========================================================= */

function buildLabActivity({
    id,
    title,
    type = "Guided Activity",
    duration = "20 minutes",
    objective,
    instructions = [],
    reflection = []
}) {
    return {
        id,
        title,
        type,
        duration,
        objective,
        instructions,
        reflection
    };
}

export const cybersecurityFundamentals = {
    id: "cybersecurity-fundamentals",
    title: "Cybersecurity Fundamentals",
    overviewTitle: "Build Your Cybersecurity Foundation",
    category: "CWS ACADEMY • CYBERSECURITY",
    level: "Beginner",
    levelKey: "beginner",
    status: "available",
    access: "free",
    icon: "fa-solid fa-shield-halved",
    description: "Build a deep practical foundation in cybersecurity concepts, threats, vulnerabilities, risk, controls, identity, network and endpoint security, ethics and defensive decision-making.",
    longDescription: "Cybersecurity Fundamentals teaches the core concepts students need before progressing into networking, Linux, defensive security, ethical hacking and penetration testing. Every lesson follows a what, why, how, example, verification and practice model so students learn to reason about assets, threats, vulnerabilities, risk, controls and evidence rather than memorizing definitions. The course connects technical concepts to realistic defensive decisions, business impact, professional ethics and incident-response thinking.",
    duration: "40–50 Hours",
    estimatedLessons: 44,
    learningStandard: "Deep Explanation • Scenario Analysis • Security Context • Verification • Practice",
    lessonMethod: [
        "What the concept is",
        "Why the concept exists",
        "How it works",
        "Realistic cybersecurity example",
        "Assets, threats, vulnerabilities and impact",
        "Preventive and detective controls",
        "Common mistakes and misconceptions",
        "Verification and evidence",
        "Practice before progression",
        "Knowledge check"
    ],
    learningEnvironment: "Use fictional scenarios, sample data and systems you own or are explicitly authorized to assess.",
    prerequisites: [
        "No prior cybersecurity experience is required",
        "Basic computer and web-browsing confidence",
        "Willingness to work only with fictional, owned or explicitly authorized systems and data"
    ],
    recommendedPrerequisites: [
        "Comfort creating folders, saving files and using a web browser",
        "A notebook or digital document for evidence and reflection"
    ],
    skills: [
        "Asset and risk identification",
        "CIA triad reasoning",
        "Threat and vulnerability analysis",
        "Security-control selection",
        "Identity and access-control fundamentals",
        "Network and endpoint security concepts",
        "Evidence-based verification",
        "Ethical security practice",
        "Clear security reporting"
    ],
    tools: [
        "Asset inventory worksheet",
        "Risk register template",
        "Control-mapping worksheet",
        "Authentication and access-review checklist",
        "Network and endpoint review checklist",
        "Incident scenario worksheet"
    ],
    assessmentStandard: "Assessments prioritize scenario interpretation, control selection, evidence and ethical decisions. Answer positions are balanced and completion requires both knowledge and documented practical work.",
    standardReferences: [
        {
            title: "NIST Cybersecurity Framework 2.0",
            organization: "National Institute of Standards and Technology",
            url: "https://www.nist.gov/cyberframework"
        },
        {
            title: "NICE Workforce Framework for Cybersecurity",
            organization: "National Institute of Standards and Technology",
            url: "https://www.nist.gov/itl/applied-cybersecurity/nice/nice-framework-resource-center"
        }
    ],
    certificateEligible: true,
    completionRules: {
        minimumLessonCompletion: 100,
        minimumModuleAssessmentScore: 75,
        finalAssessmentPassingScore: 80,
        requireAllModuleAssessments: true,
        requireRequiredLabs: true,
        requireFinalAssessment: true,
        requireCapstone: true
    },
    progression: {
        unlockMode: "sequential",
        allowLessonReview: true,
        allowAssessmentRetry: true,
        trackLessonCompletion: true,
        trackAssessmentScores: true,
        trackLabCompletion: true
    },
    objectives: [
        "Understand core cybersecurity principles and how they guide security decisions.",
        "Explain confidentiality, integrity and availability using practical examples.",
        "Identify common threats, vulnerabilities, attack techniques and threat actors.",
        "Understand cybersecurity risk and common approaches to risk treatment.",
        "Recognize technical, administrative and physical security controls.",
        "Understand authentication, authorization, MFA, least privilege and RBAC.",
        "Explain foundational network and endpoint security controls.",
        "Understand security policies, responsible disclosure and professional ethics.",
        "Apply cybersecurity concepts to realistic scenarios and defensive decisions.",
    ],
    modules: [
        {
            id: "module-01", number: 1, title: "Introduction to Cybersecurity",
            description: "Understand cybersecurity, digital assets, threats, vulnerabilities and the role of security professionals.", labs: 0, assessments: 1,

            practiceActivities: [
                buildLabActivity({
                    id: "activity-01",
                    title: "Identify Assets and Security Concerns",
                    duration: "20 minutes",
                    objective: "Practice identifying assets, threats and likely security concerns in a small organization.",
                    instructions: [
                        "Imagine a small online retailer with staff laptops, customer accounts, a website, email and cloud storage.",
                        "List at least five digital or business assets that need protection.",
                        "For each asset, identify one realistic threat or failure scenario.",
                        "Describe one security control that could reduce the risk."
                    ],
                    reflection: [
                        "Which asset would cause the greatest business impact if it became unavailable?",
                        "Which asset contains the most sensitive information?",
                        "Which risks depend more on people and process than on technology?"
                    ]
                })
            ],
            moduleAssessment: buildModuleAssessment({
                title: "Module 1 Assessment — Introduction to Cybersecurity",
                questions: [
                    {
                        question: "Which statement best describes cybersecurity?",
                        options: [
                            "Installing antivirus software on every computer",
                            "Protecting information, systems, networks and services using people, process and technology",
                            "Blocking all external network traffic",
                            "Preventing employees from using the Internet"
                        ],
                        answer: 1
                    },
                    {
                        question: "Which of the following is an asset?",
                        options: [
                            "A customer database",
                            "Only a physical server",
                            "Only information classified as secret",
                            "Only software purchased by the organization"
                        ],
                        answer: 0
                    },
                    {
                        question: "Why is cybersecurity considered continuous risk management?",
                        options: [
                            "Security controls never need updates",
                            "Threats, systems, users and vulnerabilities change over time",
                            "Only large companies experience cyber incidents",
                            "Security is completed after the first vulnerability scan"
                        ],
                        answer: 1
                    },
                    {
                        question: "What is the most important requirement before performing security testing?",
                        options: [
                            "Owning Kali Linux",
                            "Finding a vulnerability",
                            "Explicit authorization and defined scope",
                            "Using only open-source tools"
                        ],
                        answer: 2
                    },
                    {
                        question: "Which role is primarily offensive-security focused?",
                        options: [
                            "Penetration tester",
                            "Payroll administrator",
                            "Database customer",
                            "Marketing analyst"
                        ],
                        answer: 0
                    }
                ]
            }),
            lessons: [
                buildLesson({
                    id: "lesson-01", title: "What Is Cybersecurity?", duration: "20 minutes", icon: "fa-solid fa-shield-halved",
                    subtitle: "Develop a deeper understanding of cybersecurity and its role in protecting digital assets, systems and services.",
                    overview: "Cybersecurity is the discipline of protecting information, systems, networks, applications and digital services from events that could expose, alter, interrupt or destroy them. It combines technology, people, processes and governance because no single tool can protect an organization on its own.",
                    explanation: "Security work begins by identifying assets and understanding how they are used. Assets include data, user accounts, devices, servers, cloud services, software, intellectual property and business processes. Once assets are known, security teams consider the threats that could affect them, the weaknesses that may be exploited and the consequences of a successful incident.",
                    security: "A useful way to think about cybersecurity is as continuous risk management rather than a one-time installation of security software. Systems change, new vulnerabilities are discovered, employees join or leave, attackers adapt, and organizations adopt new technologies, so protection must also evolve.",
                    example: "For example, an online store may need to protect customer accounts, payment information, its website, its internal administration systems and its ability to stay online. A security failure could involve stolen passwords, modified prices, exposed customer data or an outage that prevents customers from placing orders."
                }),
                buildLesson({
                    id: "lesson-02", title: "Why Cybersecurity Matters", duration: "25 minutes", icon: "fa-solid fa-shield-halved",
                    subtitle: "Develop a deeper understanding of Why Cybersecurity Matters and its role in practical cybersecurity.",
                    overview: "Modern organizations depend on digital systems for communication, finance, healthcare, education, transportation, government services and everyday business operations. When those systems are disrupted or compromised, the impact can extend far beyond a single computer.",
                    explanation: "Cyber incidents can create financial losses, legal obligations, operational downtime and reputational damage. Sensitive information may be exposed, business processes may stop, customers may lose trust and staff may be unable to perform normal work while systems are investigated or restored.",
                    security: "Cybersecurity also matters at an individual level. Personal accounts, identity information, banking details, private messages, photographs and location data can all be targeted. Good security therefore protects both organizations and the people who rely on them.",
                    example: "A simple example is ransomware affecting a hospital. The technical problem may be encrypted computers, but the real-world impact can include delayed appointments, unavailable patient records and pressure on clinical staff. Cybersecurity focuses on preventing incidents where possible and reducing harm when prevention fails."
                }),
                buildLesson({
                    id: "lesson-03", title: "Cybersecurity Roles and Domains", duration: "30 minutes", icon: "fa-solid fa-shield-halved",
                    subtitle: "Develop a deeper understanding of Cybersecurity Roles and Domains and its role in practical cybersecurity.",
                    overview: "Cybersecurity is a broad field rather than a single job. Different roles focus on prevention, detection, response, architecture, testing, governance, identity, cloud security, application security, forensics and many other areas.",
                    explanation: "Defensive roles often include security analysts, SOC analysts, incident responders, threat hunters and security engineers. Offensive roles include penetration testers and red-team operators who test systems with authorization. Governance and risk professionals help translate technical risks into policies, controls and business decisions.",
                    security: "Specialization grows with experience. A cloud security engineer may focus on identity, logging and configuration in cloud platforms, while an application security specialist may review code, test web applications and work with developers to prevent vulnerabilities before software is released.",
                    example: "Students do not need to choose a specialty immediately. A strong foundation in networking, operating systems, identity, risk and common threats makes it easier to understand how the different domains connect and which areas are most interesting to pursue later."
                }),
                buildLesson({
                    id: "lesson-04", title: "Security Mindset and Ethics", duration: "25 minutes", icon: "fa-solid fa-scale-balanced",
                    subtitle: "Develop a deeper understanding of Security Mindset and Ethics and its role in practical cybersecurity.",
                    overview: "A security mindset means thinking about how systems can fail, how assumptions can be abused and what could happen if a user, device or process behaves unexpectedly. It involves curiosity, careful verification and an understanding that convenience and security sometimes create trade-offs.",
                    explanation: "Ethics is central because cybersecurity knowledge can be used to protect systems or to harm them. Security testing should be performed only on systems you own or have explicit authorization to assess. Permission, scope and documentation are not administrative details; they define whether an activity is legitimate.",
                    security: "Responsible professionals also minimize unnecessary impact. Even authorized testing should avoid actions that could damage data, interrupt services or expose sensitive information unless those actions are specifically approved and controlled.",
                    example: "For example, discovering a vulnerability in a public website does not create permission to exploit it. A responsible approach is to stop before causing harm, preserve relevant evidence and follow the organization's disclosure or reporting process."
                }),
            ]
        },
        {
            id: "module-02", number: 2, title: "The CIA Triad",
            description: "Learn confidentiality, integrity and availability.", labs: 0, assessments: 1,

            practiceActivities: [
                buildLabActivity({
                    id: "activity-01",
                    title: "CIA Triad Scenario Analysis",
                    duration: "20 minutes",
                    objective: "Classify realistic incidents according to confidentiality, integrity and availability.",
                    instructions: [
                        "Review five hypothetical security incidents.",
                        "Decide whether each incident primarily affects confidentiality, integrity, availability or more than one objective.",
                        "Explain your reasoning.",
                        "Suggest one control that could reduce the impact."
                    ],
                    reflection: [
                        "Which incidents affected more than one part of the CIA Triad?",
                        "Can a control improve one security objective while negatively affecting another?"
                    ]
                })
            ],
            moduleAssessment: buildModuleAssessment({
                title: "Module 2 Assessment — The CIA Triad",
                questions: [
                    {
                        question: "Which security objective is primarily concerned with preventing unauthorized disclosure?",
                        options: ["Integrity", "Availability", "Confidentiality", "Resilience"],
                        answer: 2
                    },
                    {
                        question: "Which control can help verify file integrity?",
                        options: ["Cryptographic hash", "Load balancer", "Password hint", "Screen lock"],
                        answer: 0
                    },
                    {
                        question: "A customer portal is offline for several hours. Which CIA objective is primarily affected?",
                        options: ["Confidentiality", "Availability", "Integrity", "Non-repudiation"],
                        answer: 1
                    },
                    {
                        question: "Unauthorized modification of payroll records primarily affects:",
                        options: ["Integrity", "Availability", "Confidentiality", "Redundancy"],
                        answer: 0
                    },
                    {
                        question: "Why is the CIA Triad useful?",
                        options: [
                            "It replaces all security frameworks",
                            "It provides a model for identifying what security objective an incident or control affects",
                            "It guarantees secure software",
                            "It applies only to classified government data"
                        ],
                        answer: 1
                    }
                ]
            }),
            lessons: [
                buildLesson({
                    id: "lesson-01", title: "Introduction to the CIA Triad", duration: "20 minutes", icon: "fa-solid fa-lock",
                    subtitle: "Develop a deeper understanding of Introduction to the CIA Triad and its role in practical cybersecurity.",
                    overview: "The CIA Triad is a foundational model for reasoning about information security. CIA stands for confidentiality, integrity and availability, three objectives that help security teams describe what needs protection and what kind of harm an incident may cause.",
                    explanation: "Confidentiality focuses on preventing unauthorized disclosure, integrity focuses on preventing unauthorized or incorrect changes, and availability focuses on ensuring that authorized users can access systems and information when required.",
                    security: "Real incidents often affect more than one part of the triad. A compromised administrator account could expose confidential records, alter important configurations and then be used to shut down services, affecting all three objectives at once.",
                    example: "Using the CIA Triad gives students a structured way to analyze controls. Encryption primarily supports confidentiality, file hashing can help verify integrity, and redundancy or backups can help support availability."
                }),
                buildLesson({
                    id: "lesson-02", title: "Confidentiality", duration: "25 minutes", icon: "fa-solid fa-lock",
                    subtitle: "Develop a deeper understanding of Confidentiality and its role in practical cybersecurity.",
                    overview: "Confidentiality is the protection of information from unauthorized access or disclosure. It is concerned with who is allowed to see information and under what circumstances that information can be shared.",
                    explanation: "Common confidentiality controls include authentication, access control, encryption, data classification and secure handling procedures. Strong passwords alone are not enough if users are given excessive permissions or sensitive files are copied into insecure locations.",
                    security: "Confidentiality also applies to data while it is stored, transmitted and processed. Encryption can protect a laptop drive if the device is stolen and TLS can protect data moving between a browser and a website, but applications must still enforce permissions after the data is decrypted for use.",
                    example: "An example confidentiality incident would be an employee accidentally emailing a customer database to an unauthorized recipient. No data may have been changed or deleted, but sensitive information has still been exposed."
                }),
                buildLesson({
                    id: "lesson-03", title: "Integrity", duration: "25 minutes", icon: "fa-solid fa-lock",
                    subtitle: "Develop a deeper understanding of Integrity and its role in practical cybersecurity.",
                    overview: "Integrity means preserving the accuracy, completeness and trustworthiness of information and systems. Security teams need confidence that data has not been altered in an unauthorized or accidental way.",
                    explanation: "Integrity controls include access restrictions, digital signatures, hashes, change management, version control and audit logs. These controls help prevent unauthorized modification or make changes easier to detect and investigate.",
                    security: "Integrity is important because manipulated information can be as harmful as stolen information. An attacker who changes payroll details, medical records, software packages or financial transactions may create serious consequences without ever deleting the underlying data.",
                    example: "For example, if an attacker modifies a software download and inserts malicious code, a cryptographic hash or digital signature can help users verify that the file they received is not the authentic version released by the vendor."
                }),
                buildLesson({
                    id: "lesson-04", title: "Availability", duration: "25 minutes", icon: "fa-solid fa-lock",
                    subtitle: "Develop a deeper understanding of Availability and its role in practical cybersecurity.",
                    overview: "Availability means ensuring that authorized users can access systems, services and information when they are needed. A secure system that is constantly unavailable cannot support the business or users it was designed to serve.",
                    explanation: "Availability is supported through resilient architecture, backups, redundant components, capacity planning, monitoring, patching, disaster recovery and protection against denial-of-service attacks. The goal is not to guarantee that failures never occur, but to reduce their likelihood and recover effectively when they do.",
                    security: "Security controls themselves must also consider availability. A firewall rule that blocks legitimate business traffic or an update process that causes widespread outages may protect one aspect of a system while harming another.",
                    example: "A common example is a website overwhelmed by excessive traffic. Even if no information is stolen or changed, customers may be unable to use the service, creating an availability incident."
                }),
            ]
        },
        {
            id: "module-03", number: 3, title: "Threats and Attack Types",
            description: "Explore malware, social engineering and common cyber attacks.", labs: 1, assessments: 1,

            labActivities: [
                buildLabActivity({
                    id: "lab-01",
                    title: "Threat Classification Lab",
                    duration: "30 minutes",
                    objective: "Classify common attack scenarios and identify defensive controls without performing any real-world attack activity.",
                    instructions: [
                        "Review scenarios involving phishing, malware, denial of service and credential theft.",
                        "Identify the threat technique in each scenario.",
                        "Identify the weakness or condition that could allow the attack to succeed.",
                        "Recommend one preventive and one detective control for each scenario."
                    ],
                    reflection: [
                        "Which attacks depend heavily on human behavior?",
                        "Which controls would reduce more than one threat type?"
                    ]
                })
            ],
            moduleAssessment: buildModuleAssessment({
                title: "Module 3 Assessment — Threats and Attack Types",
                questions: [
                    {
                        question: "What is the main difference between a threat and a vulnerability?",
                        options: [
                            "A threat is potential harm; a vulnerability is a weakness that may enable harm",
                            "They mean exactly the same thing",
                            "A vulnerability is always malicious",
                            "A threat only exists after exploitation"
                        ],
                        answer: 0
                    },
                    {
                        question: "Which attack relies primarily on manipulating human behavior?",
                        options: ["Phishing", "Disk encryption", "Load balancing", "Patch management"],
                        answer: 0
                    },
                    {
                        question: "What is ransomware designed to commonly do?",
                        options: [
                            "Improve system performance",
                            "Encrypt or deny access to data for extortion",
                            "Replace firewalls",
                            "Verify software integrity"
                        ],
                        answer: 1
                    },
                    {
                        question: "What distinguishes a distributed denial-of-service attack?",
                        options: [
                            "It always steals passwords",
                            "It uses multiple systems or traffic sources against a target",
                            "It only affects wireless networks",
                            "It requires physical access"
                        ],
                        answer: 1
                    },
                    {
                        question: "Why do defenders study threat actors?",
                        options: [
                            "To understand likely motivations, capabilities and techniques",
                            "To eliminate the need for patching",
                            "To predict every future attack exactly",
                            "To avoid monitoring systems"
                        ],
                        answer: 0
                    }
                ]
            }),
            lessons: [
                buildLesson({
                    id: "lesson-01", title: "Understanding Cyber Threats", duration: "25 minutes", icon: "fa-solid fa-bug",
                    subtitle: "Develop a deeper understanding of Understanding Cyber Threats and its role in practical cybersecurity.",
                    overview: "A cyber threat is a circumstance, actor or event capable of causing harm to an information system or organization. Threats may be deliberate, such as criminal activity, or accidental, such as human error and equipment failure.",
                    explanation: "Security teams distinguish threats from vulnerabilities. A threat represents potential harm, while a vulnerability is a weakness that may allow that harm to occur. Risk emerges when valuable assets, credible threats and exploitable weaknesses come together.",
                    security: "Threats can target people, software, networks, cloud environments, physical facilities and supply chains. Understanding the threat landscape helps organizations prioritize defenses instead of treating every possible scenario as equally likely.",
                    example: "For example, phishing is a threat technique that may target employees. Weak security awareness and lack of MFA can increase the chance that the technique succeeds and leads to account compromise."
                }),
                buildLesson({
                    id: "lesson-02", title: "Malware", duration: "30 minutes", icon: "fa-solid fa-bug",
                    subtitle: "Develop a deeper understanding of Malware and its role in practical cybersecurity.",
                    overview: "Malware is software intentionally designed to perform unwanted or harmful actions. Common categories include viruses, worms, trojans, ransomware, spyware, rootkits and downloaders, although modern malware often combines characteristics from several categories.",
                    explanation: "Malware may steal credentials, encrypt files, monitor activity, create remote access, disable defenses or spread to additional systems. Delivery methods include malicious attachments, compromised websites, software vulnerabilities, fake installers and stolen administrative credentials.",
                    security: "Defending against malware requires multiple layers. Endpoint protection, patching, email filtering, application control, least privilege, backups and user awareness all reduce different parts of the attack path.",
                    example: "Ransomware illustrates why layered defense matters. Preventing the initial infection is valuable, but organizations also need segmentation to limit spread, monitoring to detect suspicious activity and tested backups so recovery does not depend entirely on the attacker."
                }),
                buildLesson({
                    id: "lesson-03", title: "Phishing and Social Engineering", duration: "30 minutes", icon: "fa-solid fa-bug",
                    subtitle: "Develop a deeper understanding of Phishing and Social Engineering and its role in practical cybersecurity.",
                    overview: "Social engineering attacks manipulate people into revealing information or performing actions that benefit an attacker. Phishing is one of the most common forms and typically uses deceptive email, messaging or websites to create urgency, fear, curiosity or trust.",
                    explanation: "Variants include spear phishing aimed at a specific target, smishing through text messages, vishing through voice calls and pretexting where an attacker invents a believable story or identity. The technical quality of the message may vary, but the central goal is to influence human behavior.",
                    security: "Defenses include awareness training, email filtering, MFA, verification procedures and a culture where users feel comfortable questioning unusual requests. Processes should make high-risk actions, such as changing banking details, require independent verification.",
                    example: "For example, an attacker may impersonate a senior manager and urgently request a payment. A well-designed procedure requiring a separate approval channel can stop the fraud even when the message looks convincing."
                }),
                buildLesson({
                    id: "lesson-04", title: "Denial-of-Service Attacks", duration: "25 minutes", icon: "fa-solid fa-bug",
                    subtitle: "Develop a deeper understanding of Denial-of-Service Attacks and its role in practical cybersecurity.",
                    overview: "A denial-of-service attack attempts to make a system or service unavailable to legitimate users. This may be done by overwhelming bandwidth, exhausting server resources or exploiting a weakness that causes a service to fail.",
                    explanation: "Distributed denial-of-service attacks use many systems at once, often through botnets, making traffic harder to block from a single source. Some attacks generate huge traffic volumes while others use relatively small requests that require significant processing by the target.",
                    security: "Defenses can include rate limiting, traffic filtering, load balancing, resilient infrastructure, content delivery networks and specialized DDoS protection services. Monitoring is important because defenders need to distinguish malicious surges from genuine increases in customer demand.",
                    example: "Availability planning should consider both attacks and ordinary failures. A system designed with redundancy and capacity controls is generally more resilient whether disruption comes from malicious traffic, hardware failure or unexpected popularity."
                }),
                buildLesson({
                    id: "lesson-05", title: "Threat Actors", duration: "25 minutes", icon: "fa-solid fa-bug",
                    subtitle: "Develop a deeper understanding of Threat Actors and its role in practical cybersecurity.",
                    overview: "Threat actors are individuals or groups that may intentionally target systems or information. Categories commonly include cybercriminals, nation-state groups, insiders, hacktivists and opportunistic attackers, but motivations and capabilities can overlap.",
                    explanation: "Cybercriminals often focus on financial gain through fraud, extortion or data theft. Nation-state actors may pursue espionage, influence or strategic objectives. Insiders may be malicious, negligent or simply make mistakes that create exposure.",
                    security: "Understanding actor motivation helps defenders assess likely targets and techniques. A small business and a government agency may face some of the same attack methods, but the probability, persistence and goals of the attacker can differ significantly.",
                    example: "Threat intelligence attempts to turn observations about actors, infrastructure and techniques into useful defensive decisions. The objective is not merely to collect indicators, but to improve prioritization, detection and response."
                }),
            ]
        },
        {
            id: "module-04", number: 4, title: "Vulnerabilities and Risk",
            description: "Understand vulnerabilities, exploits and cybersecurity risk.", labs: 1, assessments: 1,

            labActivities: [
                buildLabActivity({
                    id: "lab-01",
                    title: "Risk Prioritization Exercise",
                    duration: "35 minutes",
                    objective: "Compare vulnerabilities using exposure, likelihood and business impact.",
                    instructions: [
                        "Review several fictional vulnerability findings affecting different assets.",
                        "Rate the likely business impact of each finding.",
                        "Consider whether the vulnerable service is exposed and whether compensating controls exist.",
                        "Rank the findings in remediation order and justify your decisions."
                    ],
                    reflection: [
                        "Did the highest technical severity always equal the highest business priority?",
                        "How did asset value and exposure change your decisions?"
                    ]
                })
            ],
            moduleAssessment: buildModuleAssessment({
                title: "Module 4 Assessment — Vulnerabilities and Risk",
                questions: [
                    {
                        question: "What is a vulnerability?",
                        options: [
                            "A weakness that could contribute to compromise",
                            "Any security product",
                            "A confirmed attacker",
                            "A completed incident report"
                        ],
                        answer: 0
                    },
                    {
                        question: "Which statement about exploits is correct?",
                        options: [
                            "Every vulnerability has a reliable public exploit",
                            "An exploit is a technique or code that takes advantage of a vulnerability",
                            "Exploits are always malware",
                            "Exploitation is required to calculate risk"
                        ],
                        answer: 1
                    },
                    {
                        question: "Risk analysis commonly considers:",
                        options: ["Likelihood and impact", "Only CVSS score", "Only asset price", "Only attacker location"],
                        answer: 0
                    },
                    {
                        question: "Which is a risk-treatment option?",
                        options: ["Mitigation", "Enumeration", "Compilation", "Obfuscation"],
                        answer: 0
                    },
                    {
                        question: "What is residual risk?",
                        options: [
                            "Risk that remains after controls are applied",
                            "Risk that has never been identified",
                            "Only physical-security risk",
                            "A vulnerability with no CVE"
                        ],
                        answer: 0
                    }
                ]
            }),
            lessons: [
                buildLesson({
                    id: "lesson-01", title: "Understanding Vulnerabilities", duration: "30 minutes", icon: "fa-solid fa-triangle-exclamation",
                    subtitle: "Develop a deeper understanding of Understanding Vulnerabilities and its role in practical cybersecurity.",
                    overview: "A vulnerability is a weakness in software, hardware, configuration, process or human behavior that could contribute to a security compromise. Vulnerabilities may result from coding mistakes, outdated components, insecure defaults, excessive permissions or poor operational practices.",
                    explanation: "Not every vulnerability has the same importance. Security teams consider whether it is exposed, how difficult it is to exploit, what privileges an attacker would gain and what business assets could be affected.",
                    security: "Vulnerability management is a lifecycle that includes discovery, validation, prioritization, remediation and verification. Simply running a scanner does not remove risk; findings must be interpreted and addressed in the context of the environment.",
                    example: "For example, a critical server vulnerability may appear urgent, but if the server is isolated and the vulnerable service is disabled, its practical risk may differ from a lower-scored flaw exposed directly to the Internet on a customer-facing system."
                }),
                buildLesson({
                    id: "lesson-02", title: "Exploits", duration: "25 minutes", icon: "fa-solid fa-triangle-exclamation",
                    subtitle: "Develop a deeper understanding of Exploits and its role in practical cybersecurity.",
                    overview: "An exploit is a technique, piece of code or sequence of actions that takes advantage of a vulnerability to produce unintended behavior. Exploitation may result in unauthorized access, information disclosure, privilege escalation, code execution or service disruption.",
                    explanation: "A vulnerability can exist without a publicly available exploit, and an exploit may require specific conditions to succeed. Defenders therefore need to understand both the vulnerability itself and the environment in which exploitation would occur.",
                    security: "Exploitability is one reason patching and compensating controls matter. If an immediate patch cannot be deployed, organizations may reduce exposure through firewall rules, configuration changes, application controls or temporary service restrictions.",
                    example: "Security professionals validate exploitation carefully and only with authorization. In production environments, proving a vulnerability by causing damage is usually unnecessary; evidence should be sufficient to demonstrate risk without creating avoidable impact."
                }),
                buildLesson({
                    id: "lesson-03", title: "Cybersecurity Risk", duration: "30 minutes", icon: "fa-solid fa-triangle-exclamation",
                    subtitle: "Develop a deeper understanding of Cybersecurity Risk and its role in practical cybersecurity.",
                    overview: "Cybersecurity risk describes the potential for loss or harm when threats affect valuable assets through vulnerabilities. Risk analysis connects technical security issues to business consequences so organizations can decide what deserves attention first.",
                    explanation: "A common way to reason about risk is to consider likelihood and impact. Likelihood reflects how plausible an event is, while impact considers consequences such as financial loss, downtime, safety concerns, legal exposure and damage to reputation.",
                    security: "Risk is contextual. The same vulnerability may be minor on a disposable test machine and severe on a system that processes sensitive customer data or controls a critical service.",
                    example: "Good risk management does not attempt to eliminate every possible risk because that is rarely practical. Instead, organizations identify, prioritize and treat risk according to their objectives, resources and tolerance for uncertainty."
                }),
                buildLesson({
                    id: "lesson-04", title: "Risk Treatment", duration: "25 minutes", icon: "fa-solid fa-triangle-exclamation",
                    subtitle: "Develop a deeper understanding of Risk Treatment and its role in practical cybersecurity.",
                    overview: "Once a risk is understood, an organization decides how to treat it. Common treatment options are mitigation, avoidance, transfer and acceptance.",
                    explanation: "Mitigation reduces likelihood or impact through controls such as patching, MFA, segmentation or monitoring. Avoidance removes the activity creating the risk, transfer shifts some financial or operational consequences to another party, and acceptance acknowledges that the remaining risk is within tolerance.",
                    security: "Risk treatment should be documented because decisions often involve trade-offs. A security team may recommend replacing an unsupported system, while the business may need temporary compensating controls because immediate replacement is not operationally possible.",
                    example: "Residual risk is the risk that remains after controls are applied. Effective governance requires decision-makers to understand that controls reduce risk rather than magically making it disappear."
                }),
            ]
        },
        {
            id: "module-05", number: 5, title: "Security Controls",
            description: "Understand technical, administrative and physical security controls.", labs: 1, assessments: 1,

            labActivities: [
                buildLabActivity({
                    id: "lab-01",
                    title: "Defense-in-Depth Control Mapping",
                    duration: "30 minutes",
                    objective: "Map preventive, detective, corrective and recovery controls to a realistic business scenario.",
                    instructions: [
                        "Choose a fictional organization that uses email, laptops, cloud storage and a customer-facing website.",
                        "Identify at least two administrative, technical and physical controls.",
                        "Classify each control by its primary function.",
                        "Explain how the controls overlap to create defense in depth."
                    ],
                    reflection: [
                        "What happens if one preventive control fails?",
                        "Which controls provide evidence for investigation?"
                    ]
                })
            ],
            moduleAssessment: buildModuleAssessment({
                title: "Module 5 Assessment — Security Controls",
                questions: [
                    {
                        question: "Which is a technical security control?",
                        options: ["Firewall", "Security policy", "Background check", "Visitor logbook"],
                        answer: 0
                    },
                    {
                        question: "Which is an administrative control?",
                        options: ["Security-awareness policy", "Disk encryption", "Door lock", "Network switch"],
                        answer: 0
                    },
                    {
                        question: "Which is a physical control?",
                        options: ["Secure server-room lock", "MFA", "Password standard", "EDR agent"],
                        answer: 0
                    },
                    {
                        question: "What does defense in depth mean?",
                        options: [
                            "Using multiple independent security layers",
                            "Using only one strong firewall",
                            "Disabling monitoring",
                            "Giving all users administrator privileges"
                        ],
                        answer: 0
                    },
                    {
                        question: "A detective control is designed primarily to:",
                        options: ["Identify suspicious or unwanted activity", "Guarantee prevention", "Remove all business risk", "Replace incident response"],
                        answer: 0
                    }
                ]
            }),
            lessons: [
                buildLesson({
                    id: "lesson-01", title: "Introduction to Security Controls", duration: "25 minutes", icon: "fa-solid fa-shield-halved",
                    subtitle: "Develop a deeper understanding of Introduction to Security Controls and its role in practical cybersecurity.",
                    overview: "Security controls are safeguards or countermeasures used to reduce risk. Controls can prevent incidents, detect suspicious activity, correct problems after they occur or help organizations recover from disruption.",
                    explanation: "Controls are often grouped as administrative, technical and physical. Administrative controls include policies and training, technical controls include firewalls and authentication systems, and physical controls include locks, barriers and surveillance.",
                    security: "Another useful classification is preventive, detective, corrective, deterrent and recovery controls. A mature security program uses several categories because no single control is perfect.",
                    example: "Defense in depth combines independent controls so that one failure does not immediately lead to compromise. For example, stolen credentials may be less useful to an attacker if MFA, device restrictions and monitoring are also in place."
                }),
                buildLesson({
                    id: "lesson-02", title: "Technical Controls", duration: "30 minutes", icon: "fa-solid fa-shield-halved",
                    subtitle: "Develop a deeper understanding of Technical Controls and its role in practical cybersecurity.",
                    overview: "Technical controls are security mechanisms implemented through hardware, software or system configuration. Examples include firewalls, encryption, endpoint protection, access control lists, MFA, logging, IDS/IPS and application security controls.",
                    explanation: "Technical controls can operate at different layers. A network firewall may restrict traffic between systems, an operating system may enforce file permissions, and an application may validate whether a user is allowed to view a specific record.",
                    security: "Controls need correct configuration and maintenance. A powerful security product can provide little protection if policies are too permissive, logs are ignored or updates are not applied.",
                    example: "Effective teams also monitor whether controls behave as intended. Testing, configuration reviews and alert analysis help confirm that technical safeguards continue to reduce risk as systems and threats change."
                }),
                buildLesson({
                    id: "lesson-03", title: "Administrative Controls", duration: "25 minutes", icon: "fa-solid fa-shield-halved",
                    subtitle: "Develop a deeper understanding of Administrative Controls and its role in practical cybersecurity.",
                    overview: "Administrative controls define how people and organizations should manage security. They include policies, procedures, standards, training, background checks, change management and incident-response processes.",
                    explanation: "These controls are important because technical safeguards depend on human decisions. A firewall cannot decide who should approve a new privileged account or how sensitive information should be classified across the business.",
                    security: "Good administrative controls are clear, practical and supported by management. Policies that are impossible to follow often encourage workarounds, so security requirements should be designed with real workflows in mind.",
                    example: "For example, an access-review procedure may require managers to periodically confirm which employees still need privileged permissions. This reduces the risk of old or unnecessary access accumulating over time."
                }),
                buildLesson({
                    id: "lesson-04", title: "Physical Controls", duration: "25 minutes", icon: "fa-solid fa-shield-halved",
                    subtitle: "Develop a deeper understanding of Physical Controls and its role in practical cybersecurity.",
                    overview: "Physical controls protect facilities, devices and infrastructure from unauthorized physical access, theft, damage and environmental hazards. Examples include locks, badges, guards, cameras, fences, secure server rooms and equipment disposal procedures.",
                    explanation: "Cybersecurity depends on physical security because attackers who gain direct access to a device may bypass protections that are effective over a network. A stolen laptop, exposed network port or unattended server console can create serious risk.",
                    security: "Environmental controls such as fire suppression, cooling and backup power also support security by protecting availability. Physical security therefore includes both access protection and resilience against non-malicious events.",
                    example: "Organizations often combine physical controls with identity systems. A badge may unlock a door, but logs, visitor procedures and restricted areas help create accountability around who entered sensitive locations and when."
                }),
            ]
        },
        {
            id: "module-06", number: 6, title: "Authentication and Access Control",
            description: "Learn authentication, authorization, MFA and least privilege.", labs: 1, assessments: 1,

            labActivities: [
                buildLabActivity({
                    id: "lab-01",
                    title: "Access Control Design Exercise",
                    duration: "35 minutes",
                    objective: "Design a simple RBAC and least-privilege model for a fictional organization.",
                    instructions: [
                        "Create roles for Help Desk, Finance, Developer and Administrator.",
                        "List the minimum systems or actions each role requires.",
                        "Identify which roles should require MFA.",
                        "Identify permissions that should never be granted to every employee."
                    ],
                    reflection: [
                        "Where could excessive privilege create the greatest impact?",
                        "How would you review access after an employee changes roles?"
                    ]
                })
            ],
            moduleAssessment: buildModuleAssessment({
                title: "Module 6 Assessment — Authentication and Access Control",
                questions: [
                    {
                        question: "Authentication answers which question?",
                        options: ["Who are you?", "What ports are open?", "What is the CVSS score?", "Where is the backup?"],
                        answer: 0
                    },
                    {
                        question: "Authorization determines:",
                        options: ["What an identity is allowed to do", "Whether a password is encrypted", "Whether DNS works", "How a packet is routed"],
                        answer: 0
                    },
                    {
                        question: "Which combination represents two different authentication factors?",
                        options: ["Password and security key", "Password and PIN", "Two passwords", "Two security questions"],
                        answer: 0
                    },
                    {
                        question: "Least privilege means:",
                        options: [
                            "Granting only the access required for legitimate work",
                            "Giving every user administrator access",
                            "Removing all user accounts",
                            "Allowing access permanently after first approval"
                        ],
                        answer: 0
                    },
                    {
                        question: "RBAC assigns permissions primarily through:",
                        options: ["Defined roles", "IP addresses only", "File hashes", "Random selection"],
                        answer: 0
                    }
                ]
            }),
            lessons: [
                buildLesson({
                    id: "lesson-01", title: "Authentication", duration: "30 minutes", icon: "fa-solid fa-user-shield",
                    subtitle: "Develop a deeper understanding of Authentication and its role in practical cybersecurity.",
                    overview: "Authentication is the process of verifying that a user, device or service is who it claims to be. It normally occurs before a system decides what that identity is allowed to access.",
                    explanation: "Authentication factors are commonly grouped into something you know, something you have and something you are. Passwords are knowledge factors, security keys or phones are possession factors, and biometrics such as fingerprints are inherence factors.",
                    security: "Strong authentication depends on more than password complexity. Credential storage, resistance to phishing, account recovery procedures, brute-force protections and monitoring all influence how difficult it is for an attacker to impersonate a legitimate user.",
                    example: "Authentication answers the question 'Who are you?' It should not be confused with authorization, which answers 'What are you allowed to do after your identity has been verified?'"
                }),
                buildLesson({
                    id: "lesson-02", title: "Authorization", duration: "25 minutes", icon: "fa-solid fa-user-shield",
                    subtitle: "Develop a deeper understanding of Authorization and its role in practical cybersecurity.",
                    overview: "Authorization determines which resources and actions an authenticated identity is permitted to use. It is enforced after or alongside authentication and is central to protecting sensitive data and administrative functions.",
                    explanation: "Permissions may be assigned directly, through groups, through roles or through policies that evaluate attributes such as department, device state, location or sensitivity of the requested resource.",
                    security: "Authorization failures are common causes of data exposure. An application may correctly authenticate users but still allow one customer to access another customer's records if object-level permissions are not enforced consistently.",
                    example: "Good authorization design follows least privilege and deny-by-default principles. Users should receive the minimum access needed for legitimate work, and new access should be explicitly granted rather than assumed."
                }),
                buildLesson({
                    id: "lesson-03", title: "Multi-Factor Authentication", duration: "30 minutes", icon: "fa-solid fa-user-shield",
                    subtitle: "Develop a deeper understanding of Multi-Factor Authentication and its role in practical cybersecurity.",
                    overview: "Multi-factor authentication requires more than one independent authentication factor. The goal is to reduce the chance that a single stolen credential is enough to compromise an account.",
                    explanation: "A password combined with a hardware security key is stronger than two passwords because the factors come from different categories. Some MFA methods are also more resistant to phishing than others; security keys and passkeys can provide stronger protection than one-time codes copied into a fraudulent website.",
                    security: "MFA is particularly important for privileged accounts, remote access, cloud administration and services containing sensitive information. It should be combined with secure recovery processes because attackers may target account-recovery channels when normal authentication is strong.",
                    example: "MFA does not make accounts invulnerable. Session theft, social engineering, malicious endpoints and poorly designed approval prompts can still create risk, so authentication should be part of a broader identity-security strategy."
                }),
                buildLesson({
                    id: "lesson-04", title: "Least Privilege", duration: "25 minutes", icon: "fa-solid fa-user-shield",
                    subtitle: "Develop a deeper understanding of Least Privilege and its role in practical cybersecurity.",
                    overview: "Least privilege means giving users, applications and systems only the permissions required to perform their intended functions. Reducing unnecessary privilege limits what can happen when an account is misused or compromised.",
                    explanation: "Privilege should consider both scope and duration. An administrator may need elevated access for a maintenance task but not for everyday browsing or email. Just-in-time access and separate administrative accounts can reduce continuous exposure.",
                    security: "Least privilege also applies to services and applications. A web application that only needs to read one database table should not run with unrestricted database-administrator rights.",
                    example: "Implementing least privilege requires periodic review because permissions tend to accumulate as people change roles and systems evolve. Access that was once justified may no longer be necessary months later."
                }),
                buildLesson({
                    id: "lesson-05", title: "Role-Based Access Control", duration: "30 minutes", icon: "fa-solid fa-user-shield",
                    subtitle: "Develop a deeper understanding of Role-Based Access Control and its role in practical cybersecurity.",
                    overview: "Role-Based Access Control, or RBAC, assigns permissions to defined roles and then assigns users to those roles. This simplifies administration by managing access according to job function rather than granting every permission individually.",
                    explanation: "Typical roles might include help-desk analyst, finance user, developer and system administrator. Each role receives permissions appropriate to its responsibilities, and users inherit those permissions through membership.",
                    security: "RBAC supports consistency and easier auditing, but roles must be designed carefully. Too many highly specific roles create complexity, while broad roles can grant excessive access.",
                    example: "Organizations often combine RBAC with additional controls such as MFA, conditional access and privileged-access management. A role may determine what actions are permitted, while contextual controls determine when and from where those actions can be performed."
                }),
            ]
        },
        {
            id: "module-07", number: 7, title: "Network Security Fundamentals",
            description: "Understand network security controls and traffic protection.", labs: 1, assessments: 1,

            labActivities: [
                buildLabActivity({
                    id: "lab-01",
                    title: "Network Security Architecture Exercise",
                    duration: "40 minutes",
                    objective: "Design a basic segmented network and identify where common security controls belong.",
                    instructions: [
                        "Sketch a small network containing user devices, a public web server, internal servers and an administration network.",
                        "Decide which systems should communicate with each other.",
                        "Identify where firewall rules or segmentation boundaries should be enforced.",
                        "Identify where monitoring would provide useful visibility."
                    ],
                    reflection: [
                        "Which communication paths are necessary for business operations?",
                        "Which paths should be denied by default?",
                        "How does segmentation reduce lateral movement?"
                    ]
                })
            ],
            moduleAssessment: buildModuleAssessment({
                title: "Module 7 Assessment — Network Security Fundamentals",
                questions: [
                    {
                        question: "What is the primary purpose of a firewall?",
                        options: ["Control network traffic according to rules", "Create user passwords", "Encrypt every stored file", "Replace backups"],
                        answer: 0
                    },
                    {
                        question: "What is a key difference between IDS and IPS?",
                        options: [
                            "IPS can take automated blocking action while IDS primarily detects and alerts",
                            "IDS always encrypts traffic",
                            "IPS only works on laptops",
                            "There is no difference"
                        ],
                        answer: 0
                    },
                    {
                        question: "Why is network segmentation useful?",
                        options: [
                            "It limits unnecessary trust and lateral movement",
                            "It removes the need for authentication",
                            "It makes every port public",
                            "It disables logging"
                        ],
                        answer: 0
                    },
                    {
                        question: "Which protocol is generally preferred over Telnet for remote administration?",
                        options: ["SSH", "HTTP", "FTP", "ARP"],
                        answer: 0
                    },
                    {
                        question: "Why are firewall logs useful?",
                        options: [
                            "They can provide evidence of blocked or unexpected network activity",
                            "They guarantee that no attack occurred",
                            "They replace network diagrams",
                            "They eliminate false positives"
                        ],
                        answer: 0
                    }
                ]
            }),
            lessons: [
                buildLesson({
                    id: "lesson-01", title: "Network Security Basics", duration: "30 minutes", icon: "fa-solid fa-network-wired",
                    subtitle: "Develop a deeper understanding of Network Security Basics and its role in practical cybersecurity.",
                    overview: "Network security protects communication paths, network devices and connected systems from unauthorized access, misuse and disruption. It begins with understanding what normal traffic should look like and where trust boundaries exist.",
                    explanation: "Important concepts include addressing, ports, protocols, routing, segmentation and network services. Defenders use this knowledge to decide which systems should communicate, which services should be exposed and where traffic should be inspected.",
                    security: "Network security is not limited to blocking traffic at the Internet edge. Internal networks, wireless networks, remote access, cloud networks and management interfaces all need appropriate protections and monitoring.",
                    example: "A basic design principle is to reduce unnecessary connectivity. If two systems do not need to communicate, allowing unrestricted traffic between them creates attack paths without providing business value."
                }),
                buildLesson({
                    id: "lesson-02", title: "Firewalls", duration: "30 minutes", icon: "fa-solid fa-network-wired",
                    subtitle: "Develop a deeper understanding of Firewalls and its role in practical cybersecurity.",
                    overview: "A firewall controls network traffic according to defined rules. Depending on the technology, decisions may consider source and destination addresses, ports, protocols, connection state, applications and sometimes user identity.",
                    explanation: "Network firewalls protect boundaries between networks, while host-based firewalls run directly on individual systems. Using both can provide layered protection, especially when a device moves between trusted and untrusted networks.",
                    security: "Firewall effectiveness depends heavily on rule design. Broad rules such as allowing any source to reach any destination on many ports may defeat the purpose of the control, while overly restrictive rules can interrupt legitimate services.",
                    example: "Firewall logs are also valuable evidence. They can reveal blocked connection attempts, unexpected outbound communication and changes in traffic patterns that may require investigation."
                }),
                buildLesson({
                    id: "lesson-03", title: "IDS and IPS", duration: "30 minutes", icon: "fa-solid fa-network-wired",
                    subtitle: "Develop a deeper understanding of IDS and IPS and its role in practical cybersecurity.",
                    overview: "Intrusion Detection Systems monitor activity for signs of suspicious or malicious behavior. Intrusion Prevention Systems perform similar analysis but can also take automated action, such as blocking traffic or terminating connections.",
                    explanation: "Detection methods may rely on known signatures, behavioral rules, protocol analysis or anomaly detection. Signature-based detection can identify known patterns efficiently, while behavioral approaches may help identify activity that does not match a previously defined signature.",
                    security: "Detection systems require tuning. If alerts are too noisy, analysts may miss important events; if rules are too narrow, malicious activity may pass unnoticed. Context about assets and expected behavior improves detection quality.",
                    example: "An IPS can reduce response time by blocking known attacks automatically, but prevention rules should be tested carefully because false positives can interrupt legitimate traffic."
                }),
                buildLesson({
                    id: "lesson-04", title: "Network Segmentation", duration: "30 minutes", icon: "fa-solid fa-network-wired",
                    subtitle: "Develop a deeper understanding of Network Segmentation and its role in practical cybersecurity.",
                    overview: "Network segmentation divides a network into smaller security zones and controls traffic between them. The objective is to reduce unnecessary trust and limit how far an attacker can move if one system is compromised.",
                    explanation: "Segments may separate user devices, servers, management systems, development environments, guest networks and sensitive databases. Firewalls, VLANs, access control lists and cloud security policies can enforce the boundaries.",
                    security: "Segmentation is especially valuable against lateral movement. A compromised workstation should not automatically have unrestricted access to domain controllers, backup servers or critical production systems.",
                    example: "Good segmentation follows actual communication requirements. Teams should understand which services need to talk to each other and then allow only those paths, rather than creating many zones without meaningful enforcement."
                }),
                buildLesson({
                    id: "lesson-05", title: "Secure Network Protocols", duration: "30 minutes", icon: "fa-solid fa-network-wired",
                    subtitle: "Develop a deeper understanding of Secure Network Protocols and its role in practical cybersecurity.",
                    overview: "Network protocols define how systems communicate, but not all protocols provide confidentiality, integrity or strong authentication. Security professionals should understand when a protocol sends sensitive information in clear text and when a secure alternative is available.",
                    explanation: "Examples of safer choices include HTTPS instead of HTTP for sensitive web traffic, SSH instead of Telnet for remote administration and secure mail or file-transfer mechanisms when credentials or private data are involved.",
                    security: "Transport encryption protects data while it crosses networks, but endpoint security remains essential. An encrypted connection cannot protect information from malware already running on an authorized endpoint.",
                    example: "Protocol security also includes certificate validation, modern cryptographic settings and disabling obsolete versions. A secure protocol can become weak if certificates are ignored or outdated algorithms remain enabled."
                }),
            ]
        },
        {
            id: "module-08", number: 8, title: "Endpoint and System Security",
            description: "Explore system hardening, patching and endpoint protection.", labs: 0, assessments: 1,

            practiceActivities: [
                buildLabActivity({
                    id: "activity-01",
                    title: "Endpoint Hardening Checklist",
                    duration: "30 minutes",
                    objective: "Create a defensible endpoint-hardening checklist for a workstation.",
                    instructions: [
                        "List unnecessary services or software that should be reviewed.",
                        "Identify patching, firewall, encryption and endpoint-protection requirements.",
                        "Identify which events should be logged or monitored.",
                        "Explain how the checklist should be reviewed over time."
                    ],
                    reflection: [
                        "Which hardening changes reduce attack surface?",
                        "Which controls improve detection rather than prevention?"
                    ]
                })
            ],
            moduleAssessment: buildModuleAssessment({
                title: "Module 8 Assessment — Endpoint and System Security",
                questions: [
                    {
                        question: "What is the goal of system hardening?",
                        options: ["Reduce unnecessary attack surface", "Install as much software as possible", "Disable all logging", "Give users more privileges"],
                        answer: 0
                    },
                    {
                        question: "Why is asset inventory important for patch management?",
                        options: ["You cannot reliably patch systems you do not know exist", "It replaces testing", "It encrypts patches", "It prevents all vulnerabilities"],
                        answer: 0
                    },
                    {
                        question: "What does EDR primarily provide?",
                        options: ["Endpoint visibility, detection and response capabilities", "Physical door access", "Only password storage", "DNS hosting"],
                        answer: 0
                    },
                    {
                        question: "When a critical patch cannot be applied immediately, organizations may use:",
                        options: ["Compensating controls", "No controls", "Shared administrator passwords", "Disabled backups"],
                        answer: 0
                    },
                    {
                        question: "Why should hardening baselines be periodically validated?",
                        options: ["Configurations can drift as systems change", "Baselines never change", "Validation weakens security", "Only new computers need security"],
                        answer: 0
                    }
                ]
            }),
            lessons: [
                buildLesson({
                    id: "lesson-01", title: "Endpoint Security", duration: "30 minutes", icon: "fa-solid fa-laptop-shield",
                    subtitle: "Develop a deeper understanding of Endpoint Security and its role in practical cybersecurity.",
                    overview: "Endpoints are devices such as workstations, laptops, servers and mobile devices that users and applications interact with directly. They are frequent targets because they process credentials, open files, run software and connect to many services.",
                    explanation: "Endpoint security combines secure configuration, patching, anti-malware, host firewalls, encryption, application control and monitoring. Device management can help organizations apply settings consistently and identify systems that fall out of compliance.",
                    security: "User behavior matters as well. A fully patched endpoint can still be exposed if users run untrusted software, approve malicious prompts or store sensitive information insecurely.",
                    example: "Defenders should think of endpoint protection as reducing attack surface and increasing visibility. The goal is both to prevent compromise and to detect suspicious behavior quickly when prevention fails."
                }),
                buildLesson({
                    id: "lesson-02", title: "Patch Management", duration: "25 minutes", icon: "fa-solid fa-laptop-shield",
                    subtitle: "Develop a deeper understanding of Patch Management and its role in practical cybersecurity.",
                    overview: "Patch management is the process of identifying, testing, deploying and verifying updates that fix software defects and security vulnerabilities. Effective patching reduces the window of opportunity between vulnerability disclosure and exploitation.",
                    explanation: "Organizations need an inventory of systems and software before they can patch reliably. Unknown devices and unsupported applications often become long-term weaknesses because no team is clearly responsible for maintaining them.",
                    security: "Patching also requires risk-based prioritization. Internet-facing vulnerabilities with active exploitation may require emergency action, while lower-risk updates can follow normal maintenance cycles after compatibility testing.",
                    example: "When a patch cannot be applied immediately, compensating controls such as service restrictions, segmentation or enhanced monitoring can reduce exposure until a permanent fix is available."
                }),
                buildLesson({
                    id: "lesson-03", title: "System Hardening", duration: "30 minutes", icon: "fa-solid fa-laptop-shield",
                    subtitle: "Develop a deeper understanding of System Hardening and its role in practical cybersecurity.",
                    overview: "System hardening reduces attack surface by removing unnecessary services, accounts, software and permissions and by configuring remaining components securely. The principle is simple: functionality that is not required should not create additional exposure.",
                    explanation: "Hardening may include disabling unused ports, enforcing secure authentication, removing default accounts, restricting administrative access, applying secure baseline settings and protecting logs from unauthorized modification.",
                    security: "Baselines help organizations apply consistent configurations across many systems. Frameworks and vendor guidance can provide starting points, but settings should be tested because aggressive hardening may conflict with application requirements.",
                    example: "Hardening is not a one-time task. New software, updates and operational changes can introduce drift, so organizations need configuration management and periodic validation."
                }),
                buildLesson({
                    id: "lesson-04", title: "Endpoint Detection and Response", duration: "30 minutes", icon: "fa-solid fa-laptop-shield",
                    subtitle: "Develop a deeper understanding of Endpoint Detection and Response and its role in practical cybersecurity.",
                    overview: "Endpoint Detection and Response, or EDR, provides detailed visibility into endpoint activity and supports investigation and response. It may collect information about processes, command execution, file changes, network connections and other system events.",
                    explanation: "EDR tools look for suspicious patterns that traditional antivirus may miss, such as unusual scripting behavior, credential theft techniques or legitimate system utilities being abused by an attacker.",
                    security: "Detection alone is not enough; analysts need context to determine whether activity is malicious. EDR investigations often reconstruct a sequence of events so responders can understand how an incident began, what the attacker did and which systems may be affected.",
                    example: "Response features may allow analysts to isolate a host, terminate a process or collect evidence remotely. These capabilities can reduce attacker dwell time when used with clear procedures and trained staff."
                }),
            ]
        },
        {
            id: "module-09", number: 9, title: "Security Policies and Ethics",
            description: "Understand policies, acceptable use and ethical security practice.", labs: 0, assessments: 1,

            practiceActivities: [
                buildLabActivity({
                    id: "activity-01",
                    title: "Responsible Disclosure Scenario",
                    duration: "25 minutes",
                    objective: "Practice making ethical decisions after discovering a vulnerability.",
                    instructions: [
                        "Read a scenario where a researcher notices a possible weakness on a public website.",
                        "Identify which actions would stay within responsible and ethical boundaries.",
                        "Draft a short vulnerability report containing only necessary evidence.",
                        "Explain when testing should stop."
                    ],
                    reflection: [
                        "Why does discovering a weakness not automatically grant permission to exploit it?",
                        "What information should be protected when reporting security issues?"
                    ]
                })
            ],
            moduleAssessment: buildModuleAssessment({
                title: "Module 9 Assessment — Security Policies and Ethics",
                questions: [
                    {
                        question: "What is the purpose of a security policy?",
                        options: ["Define organizational security expectations and requirements", "Exploit vulnerabilities", "Replace technical controls", "Publish passwords"],
                        answer: 0
                    },
                    {
                        question: "An Acceptable Use Policy primarily explains:",
                        options: ["Permitted and prohibited use of organizational resources", "How to write malware", "How routers forward packets", "How to calculate hashes"],
                        answer: 0
                    },
                    {
                        question: "What should a researcher do after finding a vulnerability without authorization to exploit it?",
                        options: [
                            "Avoid causing further harm and follow the organization's disclosure process",
                            "Immediately extract sensitive data",
                            "Publish credentials",
                            "Continue testing until administrator access is obtained"
                        ],
                        answer: 0
                    },
                    {
                        question: "Which is a core cybersecurity ethics principle?",
                        options: ["Authorization", "Maximum disruption", "Hidden scope", "Unrestricted data collection"],
                        answer: 0
                    },
                    {
                        question: "Why are scope and permission important in security testing?",
                        options: [
                            "They define what activity is authorized",
                            "They make vulnerabilities more severe",
                            "They replace reporting",
                            "They guarantee no technical risk"
                        ],
                        answer: 0
                    }
                ]
            }),
            lessons: [
                buildLesson({
                    id: "lesson-01", title: "Security Policies", duration: "25 minutes", icon: "fa-solid fa-shield-halved",
                    subtitle: "Develop a deeper understanding of Security Policies and its role in practical cybersecurity.",
                    overview: "Security policies document an organization's expectations and requirements for protecting information and systems. They translate security objectives into rules that guide employees, administrators, developers and third parties.",
                    explanation: "Policies may cover access control, passwords, data handling, incident reporting, remote work, acceptable use, backups and many other areas. Supporting standards and procedures explain how the high-level requirements should be implemented in practice.",
                    security: "A policy is useful only when it is understandable, communicated and enforced. Outdated documents that do not match real systems can create confusion and weaken accountability.",
                    example: "Policies should be reviewed as technology, laws and business operations change. Governance is therefore an ongoing process rather than a set of documents created once and forgotten."
                }),
                buildLesson({
                    id: "lesson-02", title: "Acceptable Use", duration: "20 minutes", icon: "fa-solid fa-scale-balanced",
                    subtitle: "Develop a deeper understanding of Acceptable Use and its role in practical cybersecurity.",
                    overview: "Acceptable Use Policies define how organizational systems, networks, devices and data may be used. They help users understand which activities are permitted, restricted or prohibited when using company resources.",
                    explanation: "Typical topics include personal use, software installation, internet access, handling confidential data, removable media, remote work and attempts to bypass security controls.",
                    security: "Clear acceptable-use rules protect both the organization and its users by reducing ambiguity. They should explain expectations without relying only on technical language or unrealistic restrictions that employees are likely to ignore.",
                    example: "Acceptable use also supports incident response and disciplinary processes because users have been informed about appropriate behavior before a problem occurs."
                }),
                buildLesson({
                    id: "lesson-03", title: "Responsible Disclosure", duration: "25 minutes", icon: "fa-solid fa-scale-balanced",
                    subtitle: "Develop a deeper understanding of Responsible Disclosure and its role in practical cybersecurity.",
                    overview: "Responsible disclosure is the process of reporting a discovered security vulnerability in a way that gives the affected organization an opportunity to investigate and remediate it while minimizing harm to users.",
                    explanation: "Researchers should look for published vulnerability-disclosure policies or security contact information. Reports are most useful when they clearly describe the affected system, steps to reproduce the issue, potential impact and evidence collected without unnecessary data exposure.",
                    security: "Finding a vulnerability does not automatically authorize further exploitation. Testing should stop before causing damage, accessing unrelated sensitive information or disrupting the service unless broader testing is explicitly permitted.",
                    example: "Coordinated disclosure requires communication and reasonable timelines. The purpose is to improve security, not to create pressure by unnecessarily exposing details before affected parties can respond."
                }),
                buildLesson({
                    id: "lesson-04", title: "Cybersecurity Ethics", duration: "25 minutes", icon: "fa-solid fa-scale-balanced",
                    subtitle: "Develop a deeper understanding of Cybersecurity Ethics and its role in practical cybersecurity.",
                    overview: "Cybersecurity ethics concerns how security knowledge and access should be used responsibly. Professionals may encounter sensitive systems, private information and capabilities that could cause harm if misused.",
                    explanation: "Core ethical principles include authorization, privacy, proportionality, honesty and respect for scope. Security professionals should collect only the information necessary for the task and protect evidence or credentials they encounter during their work.",
                    security: "Legal permission and ethical judgment are related but not identical. An action may technically be permitted within a broad scope yet still be unnecessarily risky or invasive, so professionals should consider impact and choose the least harmful method that achieves the objective.",
                    example: "Trust is a major part of the profession. Clients and employers rely on security practitioners to exercise judgment, protect confidential information and report findings accurately rather than exaggerating or hiding results."
                }),
            ]
        },
        {
            id: "module-10", number: 10, title: "Cybersecurity Foundations Review",
            description: "Review core concepts and complete the final assessment.", labs: 0, assessments: 1,

            practiceActivities: [
                buildLabActivity({
                    id: "activity-01",
                    title: "Foundation Scenario Challenge",
                    duration: "45 minutes",
                    objective: "Apply multiple cybersecurity concepts to one realistic incident scenario.",
                    instructions: [
                        "Review a fictional incident involving phishing, credential compromise and access to an internal system.",
                        "Identify affected assets, threats, vulnerabilities and CIA objectives.",
                        "Recommend preventive, detective and recovery controls.",
                        "Explain how MFA, least privilege, segmentation, logging and incident response could change the outcome."
                    ],
                    reflection: [
                        "Which single control would have reduced the attacker's opportunities most?",
                        "Which control would have helped investigators understand what happened?",
                        "What residual risk would remain after your recommendations?"
                    ]
                })
            ],
            moduleAssessment: buildModuleAssessment({
                title: "Module 10 Assessment — Cybersecurity Foundations Review",
                passingScore: 75,
                questions: [
                    {
                        question: "Which sequence best represents basic security reasoning?",
                        options: [
                            "Identify assets, threats and vulnerabilities, assess risk, then select controls",
                            "Install tools first and identify assets later",
                            "Exploit every weakness before documenting it",
                            "Ignore business impact"
                        ],
                        answer: 0
                    },
                    {
                        question: "Which control most directly reduces the impact of stolen passwords?",
                        options: ["MFA", "A larger monitor", "HTTP", "Unrestricted administrator access"],
                        answer: 0
                    },
                    {
                        question: "Which control can limit lateral movement after one workstation is compromised?",
                        options: ["Network segmentation", "Shared passwords", "Disabling logs", "Allow-all firewall rules"],
                        answer: 0
                    },
                    {
                        question: "Why are backups important in security?",
                        options: ["They support recovery and availability", "They prevent all phishing", "They replace access control", "They automatically patch systems"],
                        answer: 0
                    },
                    {
                        question: "What makes professional penetration testing legitimate?",
                        options: ["Authorization, scope, controlled testing and reporting", "Finding any public IP address", "Using open-source tools", "Remaining anonymous"],
                        answer: 0
                    }
                ]
            }),
            lessons: [
                buildLesson({
                    id: "lesson-01", title: "Security Principles Review", duration: "30 minutes", icon: "fa-solid fa-clipboard-check",
                    subtitle: "Develop a deeper understanding of Security Principles Review and its role in practical cybersecurity.",
                    overview: "This review brings together the foundational ideas that guide security decisions: protecting confidentiality, integrity and availability; verifying identity; controlling access; applying least privilege; and using multiple layers of defense.",
                    explanation: "These principles are not isolated definitions. They interact in real systems. Strong confidentiality may require authentication and encryption, integrity may rely on permissions and logging, and availability may depend on resilience, backups and monitoring.",
                    security: "When evaluating a control, ask which security objective it supports, what threat it reduces and what assumptions it depends on. This approach is more useful than memorizing a list of products.",
                    example: "A strong foundation allows you to reason about unfamiliar technologies later. The tools may change, but principles such as least privilege, separation of duties and defense in depth remain broadly applicable."
                }),
                buildLesson({
                    id: "lesson-02", title: "Threats and Vulnerabilities Review", duration: "30 minutes", icon: "fa-solid fa-bug",
                    subtitle: "Develop a deeper understanding of Threats and Vulnerabilities Review and its role in practical cybersecurity.",
                    overview: "Threats describe potential sources of harm, while vulnerabilities describe weaknesses that can be exploited or contribute to failure. Keeping these concepts separate makes risk analysis clearer.",
                    explanation: "Attackers may use malware, phishing, stolen credentials, exposed services or software exploits, but success often depends on multiple weaknesses working together. A phishing message may only become a serious incident if the user is deceived, MFA is absent and the compromised account has excessive privileges.",
                    security: "Vulnerability management therefore requires more than scanning. Teams need asset context, prioritization, remediation, validation and awareness of active threat activity.",
                    example: "During review, practice tracing an attack path from threat actor to technique, vulnerability, compromised asset and resulting impact. This builds the analytical thinking needed in both defensive and offensive security roles."
                }),
                buildLesson({
                    id: "lesson-03", title: "Defensive Controls Review", duration: "30 minutes", icon: "fa-solid fa-clipboard-check",
                    subtitle: "Develop a deeper understanding of Defensive Controls Review and its role in practical cybersecurity.",
                    overview: "Defensive security combines preventive, detective and recovery controls. Firewalls and hardening reduce exposure, monitoring and EDR improve detection, and backups and incident-response procedures support recovery.",
                    explanation: "Identity controls such as MFA, RBAC and least privilege reduce the value of stolen credentials. Network segmentation limits lateral movement, while patching and secure configuration reduce opportunities for exploitation.",
                    security: "No defensive control should be considered perfect. Mature security programs assume some controls will fail and use overlapping safeguards so another layer can still detect or limit the incident.",
                    example: "When reviewing defenses, ask what happens before an attack, during an attack and after an attack. Good architecture supports all three phases rather than concentrating only on prevention."
                }),
                buildLesson({
                    id: "lesson-04", title: "Scenario-Based Review", duration: "35 minutes", icon: "fa-solid fa-clipboard-check",
                    subtitle: "Develop a deeper understanding of Scenario-Based Review and its role in practical cybersecurity.",
                    overview: "Scenario-based analysis combines multiple concepts instead of testing isolated definitions. A security professional should be able to examine an event, identify affected assets, determine likely threats and vulnerabilities and recommend controls that address the actual risk.",
                    explanation: "Imagine an employee receives a convincing phishing message and enters credentials into a fake sign-in page. The initial technique is social engineering, but the final impact depends on whether MFA exists, what permissions the account has, whether unusual sign-ins are detected and how quickly responders act.",
                    security: "Another scenario could involve an exposed server running vulnerable software. Patching may be the preferred fix, but segmentation, firewall rules and monitoring can provide temporary risk reduction if immediate maintenance is not possible.",
                    example: "The purpose of scenarios is to develop judgment. Security work rarely presents itself as a multiple-choice definition; professionals must connect evidence, business context and technical controls to make defensible decisions."
                }),
                buildLesson({
                    id: "lesson-05", title: "Course Review", duration: "30 minutes", icon: "fa-solid fa-clipboard-check",
                    subtitle: "Develop a deeper understanding of Course Review and its role in practical cybersecurity.",
                    overview: "Cybersecurity Fundamentals has introduced the language and mental models used across the wider security field. You have examined assets, threats, vulnerabilities, risk, security objectives, access control, network defenses, endpoint protection and professional ethics.",
                    explanation: "The next stage is to deepen the technical foundations that support these concepts. Networking explains how systems communicate, Linux builds operating-system fluency, and later security courses can explore ethical hacking, web security and practical penetration testing in greater depth.",
                    security: "Continue practicing by connecting new topics to the principles in this course. When learning a new technology, ask what assets it contains, what trust relationships exist, what could fail and which controls reduce the resulting risk.",
                    example: "Cybersecurity develops through repeated study and hands-on practice. A strong foundation is valuable because tools and attack techniques change over time, while disciplined reasoning, ethics and core security principles remain essential."
                }),
            ]
        },
    ],

    finalAssessment: {
        id: "final-assessment",
        title: "Cybersecurity Fundamentals Final Assessment",
        type: "Final Assessment",
        duration: "60–75 minutes",
        passingScore: 80,
        allowRetry: true,
        description: "A scenario-focused assessment covering the major concepts taught across all ten modules.",
        questions: [
            {
                question: "A database containing customer records is exposed to an unauthorized user. Which CIA objective is primarily affected?",
                options: ["Availability", "Confidentiality", "Integrity", "Redundancy"],
                answer: 1
            },
            {
                question: "An attacker changes bank-account details in a payment system. Which CIA objective is primarily affected?",
                options: ["Integrity", "Availability", "Confidentiality", "Scalability"],
                answer: 0
            },
            {
                question: "Which statement best describes cybersecurity risk?",
                options: [
                    "Potential harm when threats affect assets through vulnerabilities",
                    "The number of security tools installed",
                    "Only vulnerabilities with public exploits",
                    "Only financial loss"
                ],
                answer: 0
            },
            {
                question: "Which is the strongest example of defense in depth?",
                options: [
                    "MFA, least privilege, endpoint monitoring and network segmentation working together",
                    "One shared administrator password",
                    "One firewall with an allow-all rule",
                    "Disabling logs to improve performance"
                ],
                answer: 0
            },
            {
                question: "What does least privilege reduce?",
                options: [
                    "The permissions available to a compromised or misused identity",
                    "The need for all authentication",
                    "The number of network protocols",
                    "The need for backups"
                ],
                answer: 0
            },
            {
                question: "A vulnerability scanner reports a critical finding. What should happen next?",
                options: [
                    "Validate and prioritize it using asset context, exposure and impact",
                    "Assume immediate full compromise",
                    "Delete the affected server",
                    "Ignore it until an incident occurs"
                ],
                answer: 0
            },
            {
                question: "Which control is most directly associated with detecting suspicious endpoint behavior?",
                options: ["EDR", "Door lock", "Acceptable Use Policy", "Load balancer"],
                answer: 0
            },
            {
                question: "Which practice helps reduce lateral movement?",
                options: ["Network segmentation", "Shared credentials", "Open management ports", "Allow-all access lists"],
                answer: 0
            },
            {
                question: "Why does MFA improve account security?",
                options: [
                    "A stolen password alone may no longer be sufficient for access",
                    "It guarantees accounts can never be compromised",
                    "It replaces authorization",
                    "It removes the need for secure recovery"
                ],
                answer: 0
            },
            {
                question: "What is the correct ethical approach to testing a system?",
                options: [
                    "Test only systems you own or are explicitly authorized to assess",
                    "Test any public system as long as no data is deleted",
                    "Continue until administrator access is gained",
                    "Avoid documenting scope"
                ],
                answer: 0
            },
            {
                question: "Which is an example of a detective control?",
                options: ["Security monitoring and alerting", "A policy requiring strong passwords", "A locked server-room door", "A backup generator"],
                answer: 0
            },
            {
                question: "Which risk-treatment approach removes the activity creating the risk?",
                options: ["Avoidance", "Acceptance", "Detection", "Enumeration"],
                answer: 0
            },
            {
                question: "Why are secure protocols such as SSH preferred over Telnet?",
                options: [
                    "They provide stronger protection for communication and credentials",
                    "They remove the need for authentication",
                    "They work without networks",
                    "They automatically patch endpoints"
                ],
                answer: 0
            },
            {
                question: "Why is patch management a lifecycle rather than a one-time task?",
                options: [
                    "New vulnerabilities, systems and software changes continually appear",
                    "Patches never need testing",
                    "Only servers need updates",
                    "Patching eliminates every other security requirement"
                ],
                answer: 0
            },
            {
                question: "What should a professional security report include?",
                options: [
                    "Evidence, impact, affected scope and practical remediation",
                    "Only exploit screenshots",
                    "Only tool output",
                    "Unverified assumptions"
                ],
                answer: 0
            }
        ]
    }

};


/* =========================================================
   CWS COURSE STANDARDIZATION
========================================================= */

function applyCybersecurityFoundationsStandard(course) {

    const frameworkMappings = {
        "module-01": [
            "NIST CSF 2.0: Govern",
            "NIST CSF 2.0: Identify"
        ],
        "module-02": [
            "NIST CSF 2.0: Protect",
            "NIST CSF 2.0: Detect",
            "NIST CSF 2.0: Recover"
        ],
        "module-03": [
            "NIST CSF 2.0: Identify",
            "NIST CSF 2.0: Detect"
        ],
        "module-04": [
            "NIST CSF 2.0: Identify",
            "NIST CSF 2.0: Govern"
        ],
        "module-05": [
            "NIST CSF 2.0: Protect",
            "NIST CSF 2.0: Detect",
            "NIST CSF 2.0: Respond",
            "NIST CSF 2.0: Recover"
        ],
        "module-06": [
            "NIST CSF 2.0: Protect"
        ],
        "module-07": [
            "NIST CSF 2.0: Protect",
            "NIST CSF 2.0: Detect"
        ],
        "module-08": [
            "NIST CSF 2.0: Protect",
            "NIST CSF 2.0: Detect",
            "NIST CSF 2.0: Respond"
        ],
        "module-09": [
            "NIST CSF 2.0: Govern"
        ],
        "module-10": [
            "NIST CSF 2.0: Govern",
            "NIST CSF 2.0: Identify",
            "NIST CSF 2.0: Protect",
            "NIST CSF 2.0: Detect",
            "NIST CSF 2.0: Respond",
            "NIST CSF 2.0: Recover"
        ]
    };

    course.modules.forEach(
        module => {

            module.learningOutcomes = [
                `Explain the essential ${module.title} concepts in plain language.`,
                "Apply the concepts to a new organizational scenario rather than repeating definitions.",
                "Distinguish assets, threats, vulnerabilities, impact, controls and evidence.",
                "Recommend a proportionate next action that respects scope, ethics and business context."
            ];

            module.frameworkMappings =
                frameworkMappings[module.id];

            const existingActivities = [
                ...(Array.isArray(module.labActivities)
                    ? module.labActivities
                    : []),
                ...(Array.isArray(module.practiceActivities)
                    ? module.practiceActivities
                    : [])
            ];

            module.labActivities =
                existingActivities.map(
                    (activity, index) => ({
                        ...activity,
                        id:
                            activity.id ||
                            `activity-${String(index + 1).padStart(2, "0")}`,
                        access:
                            "free",
                        required:
                            true,
                        type:
                            activity.type ||
                            "Guided Security Analysis",
                        duration:
                            activity.duration ||
                            "35–50 minutes",
                        scenario:
                            activity.scenario ||
                            "You are supporting the fictional CWS Academy security team. Review the supplied scenario, separate facts from assumptions and provide a defensible recommendation.",
                        prerequisites: [
                            "Completed lessons in this module",
                            "Fictional or sanitized scenario data",
                            "The CWS evidence and reflection worksheet"
                        ],
                        evidence: [
                            "A clearly defined asset, system, identity or process in scope",
                            "The relevant threat, weakness or failure condition",
                            "Expected secure behavior and observed evidence",
                            "At least one preventive and one detective or responsive control",
                            "A prioritized recommendation with assumptions and limitations"
                        ],
                        successCriteria:
                            activity.successCriteria ||
                            "The submission connects evidence to a reasonable security conclusion and proposes proportionate controls without overstating certainty.",
                        reflection:
                            Array.isArray(activity.reflection) &&
                            activity.reflection.length
                                ? activity.reflection
                                : [
                                    "Which fact most influenced the risk decision?",
                                    "Which assumption would need validation before action?",
                                    "How would the recommendation change if the asset were more critical?"
                                ],
                        cleanup: [
                            "Remove temporary fictional working files that are no longer needed.",
                            "Retain only sanitized evidence and the final worksheet.",
                            "Do not retain credentials, personal information or data from systems outside the exercise."
                        ],
                        safety:
                            "Use only fictional, owned or explicitly authorized systems and data. This foundation activity is for analysis and defensive validation, not unauthorized testing.",
                        rubric: {
                            conceptAccuracy:
                                25,
                            evidenceAndReasoning:
                                30,
                            controlSelection:
                                20,
                            ethicsAndScope:
                                15,
                            communication:
                                10
                        }
                    })
                );

            module.practiceActivities = [];
            module.labs =
                module.labActivities.length;
            module.assessments =
                1;

            module.moduleAssessment = {
                ...module.moduleAssessment,
                passingScore:
                    75,
                required:
                    true,
                questionCount:
                    module.moduleAssessment.questions.length,
                questions:
                    balanceAnswerPositions(
                        module.moduleAssessment.questions,
                        module.number - 1
                    )
            };

            module.lessons.forEach(
                (item, lessonIndex) => {

                    item.performanceObjectives = [
                        `Explain ${item.title} accurately without relying on memorized wording.`,
                        "Apply the topic to a new asset, user, system or business-process scenario.",
                        "Identify relevant evidence and distinguish confirmed facts from assumptions.",
                        "Recommend an ethical and proportionate control or next action."
                    ];

                    item.evidenceStandard = [
                        "Define the asset and scope.",
                        "State expected secure behavior before evaluating the scenario.",
                        "Record the observation or source supporting the conclusion.",
                        "Explain limitations, uncertainty and required follow-up.",
                        "Use no credentials, personal data or unauthorized system information."
                    ];

                    item.completionCriteria = [
                        "The learner can explain the topic in their own words.",
                        "The learner can apply the topic to an unfamiliar scenario.",
                        "The knowledge check is passed.",
                        "Any associated practical work meets its evidence standard."
                    ];

                    item.quiz =
                        balanceAnswerPositions(
                            item.quiz,
                            module.number + lessonIndex
                        );

                }
            );

        }
    );


    const advancedFoundationScenarios = [
        standardQuestion("A team lists servers but not the business services they support. What is the most important improvement?", "Connect technical assets to owners, data, dependencies and business impact", "Replace the inventory with vulnerability scores", "Remove low-value devices without review", "Treat every asset as equally critical"),
        standardQuestion("A control is marked implemented, but no evidence shows that it works. What should happen next?", "Define the expected outcome and test or observe suitable evidence", "Assume the control is effective", "Buy a second control immediately", "Delete the control record"),
        standardQuestion("A phishing-resistant MFA method protects administrators, while standard users have passwords only. What principle best guides the next decision?", "Prioritize stronger authentication according to identity risk and expand coverage deliberately", "Remove MFA from administrators", "Share an administrator account", "Disable sign-in logging"),
        standardQuestion("A critical vulnerability affects an isolated test server with no sensitive data. What is the best initial response?", "Validate the finding and prioritize it using exposure, asset value, exploitability and compensating controls", "Declare a major breach", "Ignore it permanently", "Publish the server details"),
        standardQuestion("An alert shows a new administrator sign-in from an unfamiliar location. What is the strongest first action?", "Preserve the alert and corroborate identity, device, time, authentication and change evidence", "Delete the account immediately without review", "Assume compromise based on location alone", "Turn off sign-in monitoring"),
        standardQuestion("A backup exists, but restoration has never been tested. Which conclusion is defensible?", "Recovery capability is not verified until a controlled restore test succeeds", "The backup guarantees availability", "Encryption is unnecessary", "The backup replaces incident response"),
        standardQuestion("A firewall blocks inbound traffic but allows unrestricted outbound connections. What should the reviewer do?", "Assess required business flows, egress risk, monitoring and least-privilege network policy", "Conclude the network is fully secure", "Disable all logging", "Open every inbound port for symmetry"),
        standardQuestion("A shared service account has broad permissions and no named owner. What is the priority?", "Establish ownership, document dependencies, reduce privilege and create a controlled credential lifecycle", "Rename the account only", "Add more permissions", "Publish the password for availability"),
        standardQuestion("A policy says incidents must be reported, but staff do not know how. What is missing?", "A usable process supported by roles, training, communication and testing", "A longer policy title", "More antivirus products", "A public list of employee passwords"),
        standardQuestion("A scanner finding conflicts with system-owner evidence. What is the best professional response?", "Document the conflict, validate scope and configuration, gather another source and state the remaining uncertainty", "Choose the more severe answer automatically", "Hide the conflicting evidence", "Close the finding without notes"),
        standardQuestion("An organization wants to eliminate all cyber risk. What should the analyst explain?", "Risk can be reduced and managed, but decisions require tolerance, trade-offs and continuous review", "Risk reaches zero after one audit", "Only insurance is needed", "Security controls remove business trade-offs"),
        standardQuestion("A security test could interrupt a production service. What must happen before testing?", "Confirm authorization, scope, timing, safeguards, communications and recovery arrangements", "Run it silently at peak time", "Disable monitoring", "Assume public access means permission"),
        standardQuestion("A report states that malware was present but provides no source or timestamp. What is the core problem?", "The conclusion is not supported by traceable, contextual evidence", "The report is too short", "The report lacks coloured charts", "The report should omit limitations"),
        standardQuestion("Which response best demonstrates defense in depth after credential phishing?", "Reset the credential, investigate sessions, enforce stronger authentication, review privilege, monitor related activity and improve user controls", "Change the password only", "Disable all user accounts", "Ignore the event if MFA exists"),
        standardQuestion("What makes a beginner cybersecurity capstone professionally credible?", "Clear scope, accurate reasoning, sanitized evidence, prioritized controls, ethical boundaries and an honest limitations section", "The largest number of tools", "Claims of zero risk", "Testing outside the approved scenario")
    ];

    const finalQuestions = [
        ...course.finalAssessment.questions,
        ...advancedFoundationScenarios
    ];

    course.finalAssessment = {
        ...course.finalAssessment,
        passingScore:
            80,
        required:
            true,
        questionCount:
            finalQuestions.length,
        questions:
            balanceAnswerPositions(finalQuestions)
    };

    course.capstone = {
        title:
            "Cybersecurity Foundations Risk and Controls Review",
        required:
            true,
        estimatedTime:
            "5–7 hours",
        scenario:
            "Review the fictional CWS Retail organization, identify its most important assets and risks, and present a defensible, prioritized improvement plan for a non-technical owner.",
        deliverables: [
            "Asset and business-impact inventory",
            "Five scenario-based risk statements",
            "Risk register with likelihood, impact, evidence and assumptions",
            "Preventive, detective, response and recovery control map",
            "Identity, network and endpoint review checklist",
            "One-page incident scenario and response outline",
            "Executive summary with three prioritized improvements",
            "Ethics, authorization and limitations statement"
        ],
        rubric: {
            conceptAccuracy:
                25,
            riskReasoning:
                25,
            evidenceQuality:
                20,
            controlSelection:
                15,
            ethicsAndScope:
                10,
            communication:
                5
        }
    };

    course.qualityVersion =
        "CWS-COURSE-STANDARD-2026.2";

}


applyCybersecurityFoundationsStandard(
    cybersecurityFundamentals
);
