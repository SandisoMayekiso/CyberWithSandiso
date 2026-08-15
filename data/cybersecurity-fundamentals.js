/* =========================================================
   CWS ACADEMY
   CYBERSECURITY FUNDAMENTALS
   Expanded lesson content
========================================================= */

function buildLesson({ id, title, duration = "25 minutes", subtitle, icon = "fa-solid fa-shield-halved", overview, explanation, security, example, objectives = [], keyConcepts = [], quiz = [] }) {
    return {
        id, title, duration, type: "Lesson", icon,
        subtitle: subtitle || `Develop a practical understanding of ${title}.`,
        objectives: objectives.length ? objectives : [
            `Explain ${title} in your own words.`,
            `Describe why ${title} matters in cybersecurity.`,
            `Recognize how ${title} appears in realistic security scenarios.`,
            `Connect ${title} to risk, controls and defensive decision-making.`
        ],
        introduction: `
            <h2>${title}</h2>
            <p>${overview}</p>
            <p>This lesson goes beyond a short definition. The goal is to understand how the concept works, why security teams care about it, and how it connects to decisions you may need to make as a cybersecurity professional.</p>
        `,
        body: `
            <h2>Understanding the Concept</h2>
            <p>${explanation}</p>
            <p>Security concepts become more useful when you connect them to assets, users, systems and business processes. Instead of asking only what a term means, ask what can go wrong, which controls reduce the risk, and what evidence would show that the control is working.</p>
            <h2>Cybersecurity Perspective</h2>
            <p>${security}</p>
            <p>A mature security approach usually combines prevention, detection and response. Even a strong preventive control can fail, so organizations also need visibility, logging, procedures and recovery capabilities.</p>
            <h2>Practical Example</h2>
            <p>${example}</p>
            <div class="lesson-callout">
                <div class="lesson-callout-icon"><i class="fa-solid fa-lightbulb"></i></div>
                <div><strong>CWS Academy Study Tip</strong><p>When you finish this lesson, try explaining the topic without looking at the page. Then identify one preventive control, one detective control and one realistic failure scenario related to it.</p></div>
            </div>
            <h2>What to Remember</h2>
            <p>The most important outcome is not memorizing terminology. You should be able to recognize the concept in a real environment, explain the risk it addresses and describe how it interacts with other security controls.</p>
        `,
        keyConcepts: keyConcepts.length ? keyConcepts : [
            { title, description: overview },
            { title: "Security Context", description: security }
        ],
        quiz: quiz.length ? quiz : [
            {
                question: `What is the best description of why ${title} matters in cybersecurity?`,
                options: [
                    "It is only useful for memorizing terminology.",
                    "It helps security teams understand and reduce risk in real systems.",
                    "It removes the need for monitoring and response.",
                    "It guarantees that security incidents can never happen."
                ],
                answer: 1
            }
        ]
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
    description: "Build a strong foundation in cybersecurity concepts, threats, vulnerabilities, security controls and ethical security practices.",
    longDescription: "Cybersecurity Fundamentals introduces the core concepts students need before progressing into networking, Linux, defensive security, ethical hacking and penetration testing. Each lesson develops the ideas in depth and connects them to realistic defensive and risk-management decisions.",
    duration: "25–35 Hours",
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
            lessons: [
                buildLesson({
                    id: "lesson-01", title: "What Is Cybersecurity?", duration: "20 minutes", icon: "fa-solid fa-shield-halved",
                    subtitle: "Develop a deeper understanding of What Is Cybersecurity? and its role in practical cybersecurity.",
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
    ]
};
