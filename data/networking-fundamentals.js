/* =========================================================
   CWS ACADEMY
   NETWORKING FUNDAMENTALS
========================================================= */


function lesson(
    id,
    title,
    duration = "25 minutes",
    extra = {}
) {

    return {

        id,
        title,

        duration,

        type: "Lesson",

        subtitle:
            extra.subtitle ||
            `Learn ${title} from a cybersecurity perspective.`,

        icon:
            extra.icon ||
            "fa-solid fa-network-wired",

        objectives:
            extra.objectives || [
                `Understand ${title}.`,
                "Recognize how the concept is used in computer networks.",
                "Explain why the concept matters in cybersecurity."
            ],

        introduction:
            extra.introduction || `
                <h2>${title}</h2>

                <p>
                    This lesson introduces ${title} and examines
                    its importance in modern computer networks
                    and cybersecurity.
                </p>
            `,

        body:
            extra.body || `
                <h2>Understanding ${title}</h2>

                <p>
                    Networking knowledge is essential for security
                    professionals because attacks, defenses and
                    monitoring frequently depend on understanding
                    how devices communicate.
                </p>

                <div class="lesson-callout">

                    <div class="lesson-callout-icon">
                        <i class="fa-solid fa-network-wired"></i>
                    </div>

                    <div>

                        <strong>
                            Cybersecurity Perspective
                        </strong>

                        <p>
                            Understanding normal network behaviour
                            makes it easier to identify suspicious
                            behaviour.
                        </p>

                    </div>

                </div>
            `,

        keyConcepts:
            extra.keyConcepts || [],

        quiz:
            extra.quiz || []

    };

}


export const networkingFundamentals = {

    id:
        "networking-fundamentals",

    title:
        "Networking Fundamentals",

    category:
        "CWS ACADEMY • NETWORKING",

    level:
        "Beginner",

    levelKey:
        "beginner",

    status:
        "available",

    icon:
        "fa-solid fa-network-wired",

    description:
        "Learn IP addressing, CIDR, ARP, TCP, UDP, ICMP, routing, DNS, HTTP and HTTPS from a cybersecurity perspective.",

    longDescription:
        "Networking Fundamentals teaches how computers communicate across local and remote networks. Students learn network protocols, addressing, routing, name resolution and web traffic while examining how these technologies relate to cybersecurity.",

    duration:
        "20–25 Hours",

    objectives: [

        "Understand computer networks and network devices.",

        "Explain the OSI and TCP/IP models.",

        "Understand IPv4 addressing.",

        "Understand subnetting and CIDR.",

        "Explain Ethernet, MAC addresses and ARP.",

        "Compare TCP and UDP.",

        "Understand ports and network services.",

        "Understand ICMP and network diagnostics.",

        "Explain routing and gateways.",

        "Understand DNS and DHCP.",

        "Understand HTTP, HTTPS and TLS.",

        "Analyze networking concepts from a cybersecurity perspective."

    ],


    modules: [

        {
            id: "module-01",

            number: 1,

            title:
                "Networking Foundations",

            description:
                "Understand computer networks, network types, networking devices and communication models.",

            labs: 0,

            assessments: 1,

            lessons: [

                lesson(
                    "lesson-01",
                    "What Is a Computer Network?",
                    "25 minutes",
                    {
                        subtitle:
                            "Understand how devices connect and communicate across computer networks.",

                        objectives: [

                            "Define a computer network.",

                            "Understand why networks are used.",

                            "Identify common network components.",

                            "Understand clients, servers and network communication.",

                            "Explain why networking knowledge is important in cybersecurity."

                        ],

                        introduction: `
                            <h2>What Is a Computer Network?</h2>

                            <p>
                                A computer network is a collection of
                                interconnected devices that communicate
                                and exchange information.
                            </p>

                            <p>
                                Networks allow computers, servers,
                                smartphones, printers, security appliances
                                and many other devices to share resources
                                and communicate.
                            </p>
                        `,

                        body: `
                            <h2>Why Do We Use Networks?</h2>

                            <p>
                                Networks allow devices to exchange data,
                                access shared services and communicate
                                with systems located locally or across
                                the Internet.
                            </p>

                            <h3>Clients</h3>

                            <p>
                                A client is typically a device or
                                application requesting a service.
                            </p>

                            <h3>Servers</h3>

                            <p>
                                A server provides services or resources
                                to clients.
                            </p>

                            <h3>Network Communication</h3>

                            <p>
                                Data is broken into units that travel
                                through networking devices and protocols
                                until they reach their destination.
                            </p>

                            <h2>Cybersecurity Perspective</h2>

                            <p>
                                Network defenders need to understand
                                normal communication so they can detect
                                suspicious traffic.
                            </p>

                            <p>
                                Penetration testers also need networking
                                knowledge to discover systems, identify
                                services and understand network boundaries.
                            </p>
                        `,

                        keyConcepts: [

                            {
                                title:
                                    "Network",

                                description:
                                    "A collection of connected devices capable of communicating."
                            },

                            {
                                title:
                                    "Client",

                                description:
                                    "A device or application requesting a service."
                            },

                            {
                                title:
                                    "Server",

                                description:
                                    "A system that provides services or resources."
                            },

                            {
                                title:
                                    "Protocol",

                                description:
                                    "A defined set of rules used for communication."
                            }

                        ],

                        quiz: [

                            {
                                question:
                                    "What is the primary purpose of a computer network?",

                                options: [

                                    "To prevent computers from communicating",

                                    "To allow connected devices to communicate and share resources",

                                    "To replace operating systems",

                                    "To remove the need for IP addresses"

                                ],

                                answer: 1
                            }

                        ]

                    }
                ),

                lesson(
                    "lesson-02",
                    "LAN, WAN and Network Types"
                ),

                lesson(
                    "lesson-03",
                    "Routers, Switches and Network Devices"
                ),

                lesson(
                    "lesson-04",
                    "OSI and TCP/IP Models"
                )

            ]

        },


        {
            id: "module-02",

            number: 2,

            title:
                "IP Addressing",

            description:
                "Learn IPv4 addressing, host identification and public and private addressing.",

            labs: 1,

            assessments: 1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Understanding IPv4"
                ),

                lesson(
                    "lesson-02",
                    "Network and Host Portions"
                ),

                lesson(
                    "lesson-03",
                    "Public and Private IP Addresses"
                ),

                lesson(
                    "lesson-04",
                    "IPv4 from a Security Perspective"
                )

            ]

        },


        {
            id: "module-03",

            number: 3,

            title:
                "Subnetting and CIDR",

            description:
                "Understand subnet masks, CIDR notation and network ranges.",

            labs: 1,

            assessments: 1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Understanding Subnet Masks"
                ),

                lesson(
                    "lesson-02",
                    "CIDR Notation"
                ),

                lesson(
                    "lesson-03",
                    "Network and Broadcast Addresses"
                ),

                lesson(
                    "lesson-04",
                    "Subnetting for Network Security"
                )

            ]

        },


        {
            id: "module-04",

            number: 4,

            title:
                "Ethernet, MAC Addresses and ARP",

            description:
                "Learn local network communication using Ethernet, MAC addresses and ARP.",

            labs: 1,

            assessments: 1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Ethernet Fundamentals"
                ),

                lesson(
                    "lesson-02",
                    "MAC Addresses"
                ),

                lesson(
                    "lesson-03",
                    "Understanding ARP"
                ),

                lesson(
                    "lesson-04",
                    "ARP Security Risks"
                )

            ]

        },


        {
            id: "module-05",

            number: 5,

            title:
                "TCP and UDP",

            description:
                "Understand transport protocols, ports and network services.",

            labs: 1,

            assessments: 1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Transport Layer Fundamentals"
                ),

                lesson(
                    "lesson-02",
                    "TCP and the Three-Way Handshake"
                ),

                lesson(
                    "lesson-03",
                    "Understanding UDP"
                ),

                lesson(
                    "lesson-04",
                    "Ports and Services"
                ),

                lesson(
                    "lesson-05",
                    "TCP and UDP in Cybersecurity"
                )

            ]

        },


        {
            id: "module-06",

            number: 6,

            title:
                "ICMP and Network Diagnostics",

            description:
                "Learn ICMP, ping and traceroute.",

            labs: 1,

            assessments: 1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Understanding ICMP"
                ),

                lesson(
                    "lesson-02",
                    "Ping"
                ),

                lesson(
                    "lesson-03",
                    "Traceroute"
                ),

                lesson(
                    "lesson-04",
                    "ICMP Security Considerations"
                )

            ]

        },


        {
            id: "module-07",

            number: 7,

            title:
                "Routing and Network Communication",

            description:
                "Understand routers, gateways and routing tables.",

            labs: 1,

            assessments: 1,

            lessons: [

                lesson(
                    "lesson-01",
                    "What Is Routing?"
                ),

                lesson(
                    "lesson-02",
                    "Default Gateways"
                ),

                lesson(
                    "lesson-03",
                    "Routing Tables"
                ),

                lesson(
                    "lesson-04",
                    "Static and Dynamic Routing"
                ),

                lesson(
                    "lesson-05",
                    "Routing Security"
                )

            ]

        },


        {
            id: "module-08",

            number: 8,

            title:
                "DNS and DHCP",

            description:
                "Understand domain-name resolution and automatic network configuration.",

            labs: 1,

            assessments: 1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Introduction to DNS"
                ),

                lesson(
                    "lesson-02",
                    "DNS Records"
                ),

                lesson(
                    "lesson-03",
                    "DNS Resolution"
                ),

                lesson(
                    "lesson-04",
                    "Understanding DHCP"
                ),

                lesson(
                    "lesson-05",
                    "DNS and DHCP Security"
                )

            ]

        },


        {
            id: "module-09",

            number: 9,

            title:
                "HTTP, HTTPS and Web Traffic",

            description:
                "Understand web traffic, HTTP requests, responses and TLS.",

            labs: 1,

            assessments: 1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Introduction to HTTP"
                ),

                lesson(
                    "lesson-02",
                    "HTTP Requests and Responses"
                ),

                lesson(
                    "lesson-03",
                    "HTTP Methods and Status Codes"
                ),

                lesson(
                    "lesson-04",
                    "HTTPS and TLS"
                ),

                lesson(
                    "lesson-05",
                    "Web Traffic Security"
                )

            ]

        },


        {
            id: "module-10",

            number: 10,

            title:
                "Network Security and Final Review",

            description:
                "Bring networking concepts together through network defense and traffic analysis.",

            labs: 1,

            assessments: 1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Network Segmentation"
                ),

                lesson(
                    "lesson-02",
                    "Firewalls"
                ),

                lesson(
                    "lesson-03",
                    "IDS and IPS"
                ),

                lesson(
                    "lesson-04",
                    "Packet Analysis"
                ),

                lesson(
                    "lesson-05",
                    "Networking Fundamentals Review"
                )

            ]

        }

    ]

};
