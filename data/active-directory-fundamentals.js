/* =========================================================
   CWS ACADEMY
   ACTIVE DIRECTORY FUNDAMENTALS
   INTERMEDIATE • FREE

   Practical Active Directory foundations for cybersecurity.
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
            `Learn ${title} through practical Active Directory examples.`,

        icon:
            extra.icon ||
            "fa-solid fa-building-shield",

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

        quiz:
            extra.quiz ||
            []

    };

}


/* =========================================================
   COURSE
========================================================= */

export const activeDirectoryFundamentals = {

    id:
        "active-directory-fundamentals",

    title:
        "Active Directory Fundamentals",

    overviewTitle:
        "Understand and Build an Active Directory Lab",

    category:
        "CWS ACADEMY • ACTIVE DIRECTORY",

    level:
        "Intermediate",

    levelKey:
        "intermediate",

    status:
        "available",

    access:
        "free",

    icon:
        "fa-solid fa-building-shield",

    description:
        "Learn how Microsoft Active Directory organizes identities, computers, authentication and policy in Windows domain environments.",

    longDescription:
        "Active Directory Fundamentals introduces the core technologies behind Windows enterprise identity environments. Students learn domains, forests, domain controllers, DNS, users, groups, organizational units, Group Policy, LDAP, Kerberos, NTLM, permissions and security fundamentals. The course concludes with a guided Windows Server and Windows client Active Directory lab suitable for defensive administration and future authorized penetration-testing study.",

    duration:
        "20–26 Hours",

    objectives: [

        "Explain the purpose of Active Directory Domain Services.",
        "Understand domains, trees, forests and domain controllers.",
        "Explain why DNS is essential to Active Directory.",
        "Create and organize users, groups and computers.",
        "Understand Organizational Units and delegation concepts.",
        "Explain Group Policy and how policies reach domain systems.",
        "Understand LDAP directory concepts.",
        "Explain Kerberos authentication at a foundational level.",
        "Understand NTLM and why legacy authentication matters.",
        "Apply least privilege and account-security principles.",
        "Inspect Active Directory using built-in administrative tools.",
        "Build a small Windows Server Active Directory lab."

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
                "Active Directory Foundations",

            description:
                "Understand directories, domains, forests and the role of Active Directory Domain Services.",

            access:
                "free",

            labs:
                1,

            assessments:
                1,

            lessons: [

                lesson(
                    "lesson-01",
                    "What Is Active Directory?",
                    "35 minutes",
                    {

                        objectives: [

                            "Explain what Active Directory is.",
                            "Describe centralized identity management.",
                            "Understand Active Directory Domain Services.",
                            "Identify common enterprise uses."

                        ],

                        introduction: `
                            <h2>Centralized Identity</h2>

                            <p>
                                Organizations may have hundreds or thousands of
                                employees, computers and applications.
                                Active Directory provides a centralized way to
                                organize and manage many of these identities and
                                resources.
                            </p>
                        `,

                        body: `
                            <h2>Active Directory</h2>

                            <p>
                                Microsoft Active Directory is a collection of
                                directory technologies. Active Directory Domain
                                Services, commonly abbreviated AD DS, provides
                                domain-based identity, authentication and
                                directory services.
                            </p>

                            <h2>Directory Objects</h2>

                            <p>
                                Active Directory stores objects such as:
                            </p>

                            <ul>
                                <li>Users</li>
                                <li>Groups</li>
                                <li>Computers</li>
                                <li>Organizational Units</li>
                                <li>Printers and other directory resources</li>
                            </ul>

                            <h2>Why Cybersecurity Professionals Learn AD</h2>

                            <p>
                                Active Directory is widely used in enterprise
                                Windows environments. Defenders, administrators
                                and authorized penetration testers need to
                                understand how identity, authentication and
                                permissions work within a domain.
                            </p>

                            <div class="lesson-callout">
                                <div class="lesson-callout-icon">
                                    <i class="fa-solid fa-shield-halved"></i>
                                </div>

                                <div>
                                    <strong>CWS Security Principle</strong>

                                    <p>
                                        Identity infrastructure is highly
                                        sensitive. Administrative and security
                                        exercises in this course should be
                                        performed only in your own lab or an
                                        environment where you have explicit
                                        authorization.
                                    </p>
                                </div>
                            </div>
                        `,

                        keyConcepts: [

                            {
                                title:
                                    "Directory",

                                description:
                                    "A structured store of information about identities and resources."
                            },

                            {
                                title:
                                    "AD DS",

                                description:
                                    "Active Directory Domain Services, the Windows Server role that provides domain directory services."
                            },

                            {
                                title:
                                    "Domain",

                                description:
                                    "A logical administrative and security boundary containing directory objects."
                            }

                        ],

                        quiz: [

                            {
                                question:
                                    "What does AD DS stand for?",

                                options: [

                                    "Active Directory Domain Services",
                                    "Advanced Device Detection System",
                                    "Automatic Domain Deployment Service",
                                    "Active Data Distribution Server"

                                ],

                                answer:
                                    0
                            }

                        ]

                    }
                ),


                lesson(
                    "lesson-02",
                    "Domains, Trees and Forests",
                    "40 minutes",
                    {

                        objectives: [

                            "Define an Active Directory domain.",
                            "Understand domain trees.",
                            "Explain the role of an AD forest.",
                            "Recognize basic trust relationships."

                        ],

                        body: `
                            <h2>Domains</h2>

                            <p>
                                A domain contains Active Directory objects and
                                provides an administrative and authentication
                                structure.
                            </p>

                            <p>
                                A training environment might use a name such as:
                            </p>

                            <pre><code>cwsacademy.test</code></pre>

                            <h2>Trees</h2>

                            <p>
                                Related domains with a contiguous DNS namespace
                                can form a domain tree.
                            </p>

                            <pre><code>cwsacademy.test
students.cwsacademy.test</code></pre>

                            <h2>Forests</h2>

                            <p>
                                A forest is the top-level Active Directory
                                structure and can contain one or more domain
                                trees.
                            </p>

                            <p>
                                For a small training lab, a single forest with a
                                single domain is normally sufficient.
                            </p>
                        `

                    }
                ),


                lesson(
                    "lesson-03",
                    "Domain Controllers",
                    "40 minutes",
                    {

                        objectives: [

                            "Explain what a domain controller does.",
                            "Understand directory replication conceptually.",
                            "Recognize important DC responsibilities.",
                            "Understand why domain controllers require strong protection."

                        ],

                        body: `
                            <h2>The Domain Controller</h2>

                            <p>
                                A domain controller runs Active Directory Domain
                                Services and participates in authentication and
                                directory operations for the domain.
                            </p>

                            <h2>Important Responsibilities</h2>

                            <ul>
                                <li>Store directory information.</li>
                                <li>Authenticate domain identities.</li>
                                <li>Provide directory queries.</li>
                                <li>Participate in Group Policy processing.</li>
                                <li>Replicate directory information with other domain controllers.</li>
                            </ul>

                            <h2>Security Importance</h2>

                            <p>
                                Domain controllers are among the most sensitive
                                systems in a Windows enterprise environment.
                                Administrative access should be tightly
                                controlled and monitored.
                            </p>
                        `,

                        lab: {

                            title:
                                "Map an Example AD Environment",

                            objective:
                                "Design a simple conceptual Active Directory environment.",

                            steps: [

                                "Choose a fictional organization name.",
                                "Create a training domain name.",
                                "Draw one domain controller.",
                                "Add two Windows client computers.",
                                "Add three example users.",
                                "Identify which system provides AD DS.",
                                "Label the forest and domain."

                            ],

                            successCriteria:
                                "Your diagram correctly distinguishes the forest, domain, domain controller, users and client computers."

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
                "DNS and Active Directory",

            description:
                "Understand why DNS is essential for locating Active Directory services.",

            access:
                "free",

            labs:
                1,

            assessments:
                1,

            lessons: [

                lesson(
                    "lesson-01",
                    "DNS Refresher",
                    "40 minutes",
                    {

                        body: `
                            <h2>Names and Addresses</h2>

                            <p>
                                DNS translates names into information such as IP
                                addresses. Active Directory relies heavily on DNS
                                to locate domain services.
                            </p>

                            <h2>Common Records</h2>

                            <ul>
                                <li>A — IPv4 host record</li>
                                <li>AAAA — IPv6 host record</li>
                                <li>CNAME — alias</li>
                                <li>PTR — reverse lookup</li>
                                <li>SRV — service location</li>
                            </ul>

                            <p>
                                SRV records are particularly important in
                                Active Directory because clients use them to
                                locate services such as domain controllers.
                            </p>
                        `

                    }
                ),


                lesson(
                    "lesson-02",
                    "How AD Uses DNS",
                    "45 minutes",
                    {

                        body: `
                            <h2>Finding Domain Services</h2>

                            <p>
                                When a Windows client needs a domain controller,
                                it uses DNS service records to locate suitable
                                domain services.
                            </p>

                            <h2>Example SRV Lookup</h2>

                            <pre><code>nslookup -type=SRV _ldap._tcp.dc._msdcs.cwsacademy.test</code></pre>

                            <p>
                                Run this only after your own lab domain has been
                                configured.
                            </p>

                            <h2>Common Lab Mistake</h2>

                            <p>
                                A domain client should normally use the
                                Active Directory DNS service configured for the
                                lab rather than an unrelated public DNS server
                                when it needs to discover the domain.
                            </p>
                        `,

                        commands: [

                            {
                                command:
                                    "ipconfig /all",

                                explanation:
                                    "Displays Windows network configuration including configured DNS servers."
                            },

                            {
                                command:
                                    "nslookup cwsacademy.test",

                                explanation:
                                    "Queries DNS for the specified training domain."
                            }

                        ]

                    }
                ),


                lesson(
                    "lesson-03",
                    "Troubleshooting AD DNS",
                    "45 minutes",
                    {

                        body: `
                            <h2>Start with Configuration</h2>

                            <p>
                                Domain-join and authentication problems are often
                                related to DNS configuration.
                            </p>

                            <h2>Useful Checks</h2>

                            <pre><code>ipconfig /all
nslookup cwsacademy.test
nslookup dc01.cwsacademy.test</code></pre>

                            <p>
                                Verify the client's IP address, subnet mask,
                                default gateway where required and especially
                                the DNS server address.
                            </p>
                        `,

                        lab: {

                            title:
                                "Verify AD Lab DNS",

                            objective:
                                "Confirm that a Windows client can resolve the lab domain and domain controller.",

                            steps: [

                                "Open Command Prompt on your Windows lab client.",
                                "Run ipconfig /all.",
                                "Confirm the configured DNS server is the intended AD lab DNS server.",
                                "Resolve the domain name with nslookup.",
                                "Resolve the domain controller hostname.",
                                "Document the results."

                            ],

                            successCriteria:
                                "The client successfully resolves the lab domain and domain controller through the intended DNS service."

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
                "Users, Groups and Computers",

            description:
                "Learn how identities and computer objects are represented and managed in Active Directory.",

            access:
                "free",

            labs:
                2,

            assessments:
                1,

            lessons: [

                lesson(
                    "lesson-01",
                    "User Accounts",
                    "45 minutes",
                    {

                        body: `
                            <h2>Domain Users</h2>

                            <p>
                                A domain user account represents an identity that
                                can authenticate to domain resources according
                                to assigned permissions and policies.
                            </p>

                            <h2>Important Account Attributes</h2>

                            <ul>
                                <li>Display name</li>
                                <li>Username</li>
                                <li>User Principal Name</li>
                                <li>Group memberships</li>
                                <li>Account status</li>
                                <li>Password-related settings</li>
                            </ul>

                            <h2>Security</h2>

                            <p>
                                Avoid giving ordinary user accounts unnecessary
                                administrative privileges.
                            </p>
                        `

                    }
                ),


                lesson(
                    "lesson-02",
                    "Security Groups",
                    "45 minutes",
                    {

                        body: `
                            <h2>Why Groups?</h2>

                            <p>
                                Groups allow permissions to be assigned to a
                                collection of users rather than repeatedly
                                managing each user individually.
                            </p>

                            <h2>Example</h2>

                            <pre><code>Users:
  Alice
  Bob
  Charlie

Group:
  Helpdesk

Permission:
  Helpdesk group → approved resource</code></pre>

                            <p>
                                Group-based access control makes permissions
                                easier to review and maintain.
                            </p>
                        `

                    }
                ),


                lesson(
                    "lesson-03",
                    "Computer Accounts",
                    "40 minutes",
                    {

                        body: `
                            <h2>Computers Are Directory Objects Too</h2>

                            <p>
                                Domain-joined computers have accounts in Active
                                Directory. These accounts participate in secure
                                communication with the domain.
                            </p>

                            <h2>Example Naming</h2>

                            <pre><code>DC01
CLIENT01
CLIENT02</code></pre>

                            <p>
                                Clear naming standards can improve inventory,
                                administration and incident response.
                            </p>
                        `,

                        lab: {

                            title:
                                "Create an AD Identity Structure",

                            objective:
                                "Create sample users and groups in your isolated AD lab.",

                            steps: [

                                "Open Active Directory Users and Computers.",
                                "Create three training user accounts.",
                                "Create a security group named CWS-Students.",
                                "Add the three training users to the group.",
                                "Review each user's group membership.",
                                "Do not grant Domain Admin or other unnecessary privileged membership."

                            ],

                            successCriteria:
                                "The sample users exist and are members of the intended non-privileged training group."

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
                "Organizational Units and Delegation",

            description:
                "Organize directory objects and understand administrative delegation.",

            access:
                "free",

            labs:
                1,

            assessments:
                1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Organizational Units",
                    "40 minutes",
                    {

                        body: `
                            <h2>What Is an OU?</h2>

                            <p>
                                An Organizational Unit is a container used to
                                organize Active Directory objects within a
                                domain.
                            </p>

                            <h2>Example Structure</h2>

                            <pre><code>CWS Academy
├── Users
│   ├── Students
│   └── Staff
└── Computers
    ├── Workstations
    └── Servers</code></pre>

                            <p>
                                OUs are commonly designed around administrative
                                and Group Policy requirements rather than simply
                                copying an organization's physical structure.
                            </p>
                        `

                    }
                ),


                lesson(
                    "lesson-02",
                    "Delegation of Control",
                    "45 minutes",
                    {

                        body: `
                            <h2>Delegating Administration</h2>

                            <p>
                                Delegation allows selected users or groups to
                                perform specific administrative tasks without
                                receiving broad domain-wide privileges.
                            </p>

                            <h2>Example</h2>

                            <p>
                                A helpdesk group might be permitted to reset
                                passwords for users in a specific OU without
                                being made Domain Admins.
                            </p>

                            <div class="lesson-callout">
                                <div class="lesson-callout-icon">
                                    <i class="fa-solid fa-user-shield"></i>
                                </div>

                                <div>
                                    <strong>Least Privilege</strong>

                                    <p>
                                        Give identities only the permissions
                                        required for their legitimate role.
                                    </p>
                                </div>
                            </div>
                        `

                    }
                ),


                lesson(
                    "lesson-03",
                    "Designing an OU Structure",
                    "40 minutes",
                    {

                        body: `
                            <h2>Plan Before Building</h2>

                            <p>
                                An OU structure should make administration and
                                policy application understandable.
                            </p>

                            <p>
                                Avoid creating unnecessary complexity in a small
                                environment.
                            </p>
                        `,

                        lab: {

                            title:
                                "Build the CWS Lab OU Structure",

                            objective:
                                "Organize training users and computers into a simple OU design.",

                            steps: [

                                "Create a top-level CWS Academy OU.",
                                "Create Students and Staff child OUs.",
                                "Create a Computers OU.",
                                "Create Workstations and Servers beneath Computers.",
                                "Move only your lab objects into the appropriate OUs.",
                                "Review the final structure."

                            ],

                            successCriteria:
                                "Users and computers are organized into a clear OU structure suitable for later Group Policy exercises."

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
                "Group Policy Fundamentals",

            description:
                "Understand how Group Policy centrally configures domain users and computers.",

            access:
                "free",

            labs:
                1,

            assessments:
                1,

            lessons: [

                lesson(
                    "lesson-01",
                    "What Is Group Policy?",
                    "45 minutes",
                    {

                        body: `
                            <h2>Centralized Configuration</h2>

                            <p>
                                Group Policy allows administrators to configure
                                many Windows settings centrally.
                            </p>

                            <h2>GPOs</h2>

                            <p>
                                A Group Policy Object contains policy settings
                                that can be linked to Active Directory
                                containers such as sites, domains and OUs.
                            </p>

                            <h2>Two Major Areas</h2>

                            <ul>
                                <li>Computer Configuration</li>
                                <li>User Configuration</li>
                            </ul>
                        `

                    }
                ),


                lesson(
                    "lesson-02",
                    "GPO Scope and Processing",
                    "45 minutes",
                    {

                        body: `
                            <h2>Where Policy Applies</h2>

                            <p>
                                GPO behavior depends on factors such as where
                                the object is located, GPO links, inheritance
                                and security filtering.
                            </p>

                            <h2>Resultant Policy</h2>

                            <p>
                                Administrators should verify the policies that
                                actually reach a user or computer rather than
                                assuming a configured GPO applied successfully.
                            </p>

                            <pre><code>gpresult /r</code></pre>
                        `

                    }
                ),


                lesson(
                    "lesson-03",
                    "Security Policy Lab",
                    "50 minutes",
                    {

                        body: `
                            <h2>Safe Training Policy</h2>

                            <p>
                                In the lab, create a simple non-destructive GPO
                                so students can observe centralized policy
                                application.
                            </p>

                            <p>
                                Keep production environments out of this
                                exercise.
                            </p>
                        `,

                        lab: {

                            title:
                                "Apply a Training GPO",

                            objective:
                                "Create and verify a simple Group Policy setting in your isolated domain.",

                            steps: [

                                "Open Group Policy Management.",
                                "Create a GPO named CWS-Student-Policy.",
                                "Link it to the Students OU.",
                                "Configure one harmless training setting.",
                                "Sign in to the Windows lab client using a student account.",
                                "Update policy with gpupdate /force if appropriate.",
                                "Use gpresult /r to review applied policy."

                            ],

                            successCriteria:
                                "The training GPO is linked to the intended OU and its application can be verified on the lab client."

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
                "LDAP and Directory Queries",

            description:
                "Learn how directory information is structured and queried using LDAP concepts.",

            access:
                "free",

            labs:
                1,

            assessments:
                1,

            lessons: [

                lesson(
                    "lesson-01",
                    "LDAP Fundamentals",
                    "45 minutes",
                    {

                        body: `
                            <h2>LDAP</h2>

                            <p>
                                Lightweight Directory Access Protocol is used to
                                access and interact with directory information.
                            </p>

                            <h2>Distinguished Names</h2>

                            <pre><code>CN=Alice,
OU=Students,
DC=cwsacademy,
DC=test</code></pre>

                            <p>
                                A distinguished name identifies an object's
                                location in the directory hierarchy.
                            </p>
                        `

                    }
                ),


                lesson(
                    "lesson-02",
                    "Common AD Attributes",
                    "40 minutes",
                    {

                        body: `
                            <h2>Directory Attributes</h2>

                            <p>
                                Active Directory objects contain attributes that
                                describe the object.
                            </p>

                            <pre><code>displayName
sAMAccountName
userPrincipalName
memberOf</code></pre>

                            <p>
                                Understanding attributes is important for
                                administration, identity integrations and
                                security analysis.
                            </p>
                        `

                    }
                ),


                lesson(
                    "lesson-03",
                    "Safe Directory Inspection",
                    "45 minutes",
                    {

                        body: `
                            <h2>PowerShell AD Cmdlets</h2>

                            <p>
                                On a properly configured administrative system,
                                the ActiveDirectory PowerShell module provides
                                cmdlets for directory administration and
                                inspection.
                            </p>

                            <pre><code>Get-ADUser -Identity student01
Get-ADGroup -Identity CWS-Students</code></pre>

                            <p>
                                These examples query specific objects in your
                                own lab rather than performing broad collection.
                            </p>
                        `,

                        lab: {

                            title:
                                "Inspect Lab Directory Objects",

                            objective:
                                "Review selected user and group properties using approved administrative tools.",

                            steps: [

                                "Choose one training user you created.",
                                "View the user in Active Directory Users and Computers.",
                                "Review its username and group membership.",
                                "If the ActiveDirectory PowerShell module is available, query that specific user.",
                                "Query the CWS-Students group.",
                                "Compare the graphical and PowerShell information."

                            ],

                            successCriteria:
                                "You can identify key attributes and group membership for your selected lab identity."

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
                "Windows Domain Authentication",

            description:
                "Understand Kerberos, NTLM and the basic domain authentication process.",

            access:
                "free",

            labs:
                1,

            assessments:
                1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Authentication vs Authorization",
                    "35 minutes",
                    {

                        body: `
                            <h2>Authentication</h2>

                            <p>
                                Authentication answers:
                                <strong>Who are you?</strong>
                            </p>

                            <h2>Authorization</h2>

                            <p>
                                Authorization answers:
                                <strong>What are you allowed to do?</strong>
                            </p>

                            <p>
                                A user may authenticate successfully but still
                                be denied access to a resource because they lack
                                the required authorization.
                            </p>
                        `

                    }
                ),


                lesson(
                    "lesson-02",
                    "Kerberos Fundamentals",
                    "50 minutes",
                    {

                        body: `
                            <h2>Kerberos in Active Directory</h2>

                            <p>
                                Kerberos is the primary authentication protocol
                                used in modern Active Directory domain
                                environments.
                            </p>

                            <h2>Conceptual Flow</h2>

                            <ol>
                                <li>The user authenticates within the domain.</li>
                                <li>A Ticket Granting Ticket can be issued.</li>
                                <li>The client requests tickets for specific services.</li>
                                <li>Services use the ticket-based process to support authenticated access.</li>
                            </ol>

                            <h2>Important Components</h2>

                            <ul>
                                <li>Client</li>
                                <li>Key Distribution Center</li>
                                <li>Ticket Granting Ticket</li>
                                <li>Service ticket</li>
                                <li>Service Principal Name</li>
                            </ul>

                            <p>
                                The later Active Directory Security &
                                Pentesting course can examine Kerberos security
                                issues in authorized lab environments.
                            </p>
                        `

                    }
                ),


                lesson(
                    "lesson-03",
                    "NTLM Fundamentals",
                    "45 minutes",
                    {

                        body: `
                            <h2>NTLM</h2>

                            <p>
                                NTLM is an older Windows authentication
                                technology that can still appear in modern
                                environments for compatibility and specific
                                scenarios.
                            </p>

                            <h2>Security Perspective</h2>

                            <p>
                                Administrators should understand where legacy
                                authentication is used and follow current
                                Microsoft guidance when reducing unnecessary
                                reliance on older protocols.
                            </p>
                        `,

                        lab: {

                            title:
                                "Inspect Kerberos Tickets",

                            objective:
                                "Observe the Kerberos tickets associated with your own domain lab session.",

                            steps: [

                                "Sign in to your domain-joined Windows lab client using a training account.",
                                "Open Command Prompt.",
                                "Run klist.",
                                "Review the displayed ticket information.",
                                "Identify the domain name.",
                                "Document what you observe without modifying or exporting credentials."

                            ],

                            successCriteria:
                                "You can identify that the domain session has Kerberos ticket information and explain its basic purpose."

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
                "Active Directory Security Fundamentals",

            description:
                "Apply least privilege, account hygiene and administrative security principles.",

            access:
                "free",

            labs:
                1,

            assessments:
                1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Privileged Accounts and Least Privilege",
                    "45 minutes",
                    {

                        body: `
                            <h2>Privilege Matters</h2>

                            <p>
                                Highly privileged groups and accounts should be
                                tightly controlled because compromise can have
                                broad consequences.
                            </p>

                            <h2>Least Privilege</h2>

                            <p>
                                Users and administrators should receive only the
                                permissions needed for their role.
                            </p>

                            <h2>Good Administrative Habits</h2>

                            <ul>
                                <li>Limit privileged group membership.</li>
                                <li>Use separate administrative identities where appropriate.</li>
                                <li>Review group membership regularly.</li>
                                <li>Remove obsolete accounts.</li>
                                <li>Protect domain controllers.</li>
                            </ul>
                        `

                    }
                ),


                lesson(
                    "lesson-02",
                    "Password and Account Security",
                    "45 minutes",
                    {

                        body: `
                            <h2>Identity Security</h2>

                            <p>
                                Password policy is only one part of account
                                security. Organizations should also consider
                                modern authentication controls, monitoring,
                                account lifecycle management and protection of
                                privileged identities.
                            </p>

                            <h2>Common Administrative Risks</h2>

                            <ul>
                                <li>Unused accounts remaining enabled.</li>
                                <li>Excessive privileged membership.</li>
                                <li>Shared administrative accounts.</li>
                                <li>Weak operational separation.</li>
                                <li>Poor visibility into authentication events.</li>
                            </ul>
                        `

                    }
                ),


                lesson(
                    "lesson-03",
                    "Security Review Checklist",
                    "45 minutes",
                    {

                        body: `
                            <h2>Basic AD Review</h2>

                            <p>
                                A foundational security review can begin with
                                administrative questions rather than offensive
                                testing.
                            </p>

                            <ul>
                                <li>Who has privileged access?</li>
                                <li>Are old accounts disabled?</li>
                                <li>Are users organized appropriately?</li>
                                <li>Are GPOs understandable and intentional?</li>
                                <li>Are clients using the correct DNS?</li>
                                <li>Are administrative roles separated?</li>
                                <li>Are important authentication events monitored?</li>
                            </ul>
                        `,

                        lab: {

                            title:
                                "Review Your CWS Lab Domain",

                            objective:
                                "Perform a basic defensive review of the training domain you created.",

                            steps: [

                                "Review all training users.",
                                "Review security-group membership.",
                                "Identify privileged groups.",
                                "Confirm ordinary training users are not privileged administrators.",
                                "Review the OU structure.",
                                "Review the training GPO.",
                                "Confirm the client uses the intended AD DNS server.",
                                "Write down three security improvements or observations."

                            ],

                            successCriteria:
                                "You can explain the current identity and policy structure and identify basic security considerations."

                        }

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
                "Build an Active Directory Lab",

            description:
                "Deploy a small Windows Server domain and join a Windows client.",

            access:
                "free",

            labs:
                2,

            assessments:
                1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Lab Architecture and Networking",
                    "45 minutes",
                    {

                        body: `
                            <h2>CWS AD Lab</h2>

                            <p>
                                Build the environment inside virtualization
                                software using an isolated lab network.
                            </p>

                            <h2>Example Architecture</h2>

                            <pre><code>DC01
Windows Server
192.168.56.10/24

CLIENT01
Windows 11
192.168.56.100/24

Domain
cwsacademy.test

CLIENT01 DNS
192.168.56.10</code></pre>

                            <p>
                                Adapt addresses to your actual lab design and
                                ensure they do not conflict with another
                                network.
                            </p>

                            <h2>Why Isolation Matters</h2>

                            <p>
                                Security labs should be separated from
                                production or unrelated networks wherever
                                practical.
                            </p>
                        `

                    }
                ),


                lesson(
                    "lesson-02",
                    "Install AD DS and Create the Domain",
                    "75 minutes",
                    {

                        body: `
                            <h2>Server Preparation</h2>

                            <p>
                                Before installing Active Directory, configure
                                the Windows Server lab machine with a suitable
                                hostname and stable lab network configuration.
                            </p>

                            <h2>High-Level Process</h2>

                            <ol>
                                <li>Configure the Windows Server lab VM.</li>
                                <li>Assign the intended static lab address.</li>
                                <li>Rename the server to DC01.</li>
                                <li>Install the Active Directory Domain Services role.</li>
                                <li>Promote the server to a domain controller.</li>
                                <li>Create the new training forest.</li>
                                <li>Restart and verify the domain.</li>
                            </ol>

                            <p>
                                Use a non-production training domain and keep
                                recovery credentials secure.
                            </p>
                        `,

                        lab: {

                            title:
                                "Deploy DC01",

                            objective:
                                "Create the domain controller for the isolated CWS training environment.",

                            steps: [

                                "Create or start your Windows Server lab VM.",
                                "Configure the intended static lab IP address.",
                                "Rename the server to DC01.",
                                "Install Active Directory Domain Services.",
                                "Promote DC01 to a domain controller.",
                                "Create the cwsacademy.test training forest or your chosen lab equivalent.",
                                "Restart the server.",
                                "Sign in and confirm Active Directory administrative tools are available."

                            ],

                            successCriteria:
                                "DC01 operates as a domain controller for the isolated training domain."

                        }

                    }
                ),


                lesson(
                    "lesson-03",
                    "Join a Windows Client to the Domain",
                    "60 minutes",
                    {

                        body: `
                            <h2>Prepare the Client</h2>

                            <p>
                                The Windows client must be able to resolve the
                                Active Directory domain through the lab DNS
                                service.
                            </p>

                            <h2>Example Client Configuration</h2>

                            <pre><code>IP address:
192.168.56.100

Subnet:
255.255.255.0

DNS:
192.168.56.10</code></pre>

                            <h2>Domain Join</h2>

                            <p>
                                After networking and DNS are correct, join the
                                compatible Windows client edition to the
                                training domain and restart it.
                            </p>
                        `,

                        lab: {

                            title:
                                "Join CLIENT01",

                            objective:
                                "Join a Windows client to your training domain and authenticate with a domain user.",

                            steps: [

                                "Configure CLIENT01 with the intended lab IP settings.",
                                "Set its DNS server to DC01.",
                                "Verify DC01 and the domain resolve correctly.",
                                "Join CLIENT01 to the training domain.",
                                "Restart CLIENT01.",
                                "Sign in using a non-privileged training domain user.",
                                "Run whoami.",
                                "Run ipconfig /all.",
                                "Run gpresult /r.",
                                "Run klist.",
                                "Document the results."

                            ],

                            successCriteria:
                                "CLIENT01 is domain joined, resolves the domain correctly and supports a normal domain-user sign-in."

                        }

                    }
                ),


                lesson(
                    "lesson-04",
                    "Final AD Fundamentals Assessment",
                    "60 minutes",
                    {

                        body: `
                            <h2>Capstone Review</h2>

                            <p>
                                Your final task is to document the Active
                                Directory environment you built and explain how
                                its major components work together.
                            </p>

                            <h2>Required Documentation</h2>

                            <ul>
                                <li>Network diagram.</li>
                                <li>Domain and forest name.</li>
                                <li>Domain controller configuration.</li>
                                <li>Client configuration.</li>
                                <li>OU structure.</li>
                                <li>Users and groups.</li>
                                <li>Training GPO.</li>
                                <li>DNS explanation.</li>
                                <li>Kerberos explanation.</li>
                                <li>Security observations.</li>
                            </ul>
                        `,

                        lab: {

                            title:
                                "CWS Active Directory Fundamentals Capstone",

                            objective:
                                "Demonstrate and document a functioning isolated Active Directory environment.",

                            steps: [

                                "Confirm DC01 is operational.",
                                "Confirm CLIENT01 is domain joined.",
                                "Verify domain DNS resolution.",
                                "Verify a training user can sign in.",
                                "Review the OU structure.",
                                "Review group membership.",
                                "Verify the training GPO.",
                                "Inspect Kerberos tickets with klist.",
                                "Create a network and directory diagram.",
                                "Write a short security review of the environment."

                            ],

                            successCriteria:
                                "The lab functions correctly and the documentation demonstrates understanding of Active Directory identity, DNS, policy and authentication fundamentals."

                        },

                        quiz: [

                            {
                                question:
                                    "Why is DNS important to Active Directory?",

                                options: [

                                    "AD clients use DNS to locate domain services.",
                                    "DNS replaces all user accounts.",
                                    "DNS creates Windows passwords.",
                                    "Active Directory never uses DNS."

                                ],

                                answer:
                                    0
                            },

                            {
                                question:
                                    "What is the purpose of an Organizational Unit?",

                                options: [

                                    "To replace the domain controller.",
                                    "To organize directory objects and support administration and policy design.",
                                    "To store only DNS records.",
                                    "To provide Internet access."

                                ],

                                answer:
                                    1
                            },

                            {
                                question:
                                    "What is the primary authentication protocol in modern Active Directory domains?",

                                options: [

                                    "FTP",
                                    "Kerberos",
                                    "SMTP",
                                    "SNMP"

                                ],

                                answer:
                                    1
                            },

                            {
                                question:
                                    "What does least privilege mean?",

                                options: [

                                    "Every user should be a Domain Admin.",
                                    "Accounts should receive only the access required for their legitimate role.",
                                    "All permissions should be disabled.",
                                    "Users should share administrator accounts."

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
