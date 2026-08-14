/* =========================================================
   CWS ACADEMY
   NETWORKING FUNDAMENTALS
   EXPANDED COURSE CONTENT

   IMPORTANT:
   This course is split into 3 text files for easier editing.
   Copy PART 1, then PART 2, then PART 3 into:
   data/networking-fundamentals.js

   Keep the parts in that exact order.
========================================================= */


/* =========================================================
   LESSON BUILDER
========================================================= */

function lesson(
    id,
    title,
    duration = "30 minutes",
    extra = {}
) {

    return {

        id,
        title,
        duration,

        type:
            extra.type ||
            "Lesson",

        subtitle:
            extra.subtitle ||
            `Learn ${title} from a cybersecurity perspective.`,

        icon:
            extra.icon ||
            "fa-solid fa-network-wired",

        objectives:
            extra.objectives || [],

        introduction:
            extra.introduction || "",

        body:
            extra.body || "",

        keyConcepts:
            extra.keyConcepts || [],

        quiz:
            extra.quiz || []

    };

}


/* =========================================================
   COURSE
========================================================= */

export const networkingFundamentals = {

    id:
        "networking-fundamentals",

    title:
        "Networking Fundamentals",

    overviewTitle:
        "Understand the Networks You Protect",

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
        "Networking Fundamentals explains how devices communicate from the local network to the Internet. Students learn addressing, Ethernet, ARP, TCP, UDP, ICMP, routing, DNS, DHCP, HTTP, HTTPS and network-defense concepts through detailed explanations, worked examples and practical command demonstrations.",

    duration:
        "30–40 Hours",

    objectives: [

        "Understand computer networks, network types and common network devices.",
        "Explain the OSI and TCP/IP communication models.",
        "Understand IPv4 addressing, subnet masks and CIDR notation.",
        "Calculate basic network ranges, network addresses and broadcast addresses.",
        "Explain Ethernet, MAC addressing and ARP.",
        "Compare TCP and UDP and understand common ports and services.",
        "Use ICMP, ping and traceroute for basic troubleshooting.",
        "Understand routing, default gateways and routing tables.",
        "Explain DNS, DHCP, HTTP, HTTPS and TLS.",
        "Recognize common network-security controls and suspicious network behaviour.",
        "Interpret basic packet and connection information from a cybersecurity perspective."

    ],

    modules: [
        {
            id:
                "module-01",

            number:
                1,

            title:
                "Networking Foundations",

            description:
                "Understand computer networks, network types, networking devices and communication models.",

            labs:
                0,

            assessments:
                1,

            lessons: [

                lesson(
                    "lesson-01",
                    "What Is a Computer Network?",
                    "30 minutes",
                    {
                        subtitle:
                            "Understand how devices connect and exchange information across a network.",

                        objectives: [
                            "Define a computer network.",
                            "Identify common network components.",
                            "Distinguish clients from servers.",
                            "Explain why networking knowledge matters in cybersecurity."
                        ],

                        introduction: `
                            <h2>What Is a Computer Network?</h2>

                            <p>
                                A computer network is a collection of devices that can exchange information using agreed communication rules called protocols.
                            </p>

                            <p>
                                Networks range from two devices on a small home LAN to global infrastructures connecting millions of systems. The same fundamental ideas—addressing, forwarding, protocols and services—appear at every scale.
                            </p>
                        `,

                        body: `
                            <h2>Why Networks Exist</h2>

                            <p>
                                Networks allow users and applications to share files, printers, Internet access, databases, authentication services and many other resources. Communication normally involves multiple layers: an application creates data, the operating system prepares it for transmission, networking hardware forwards it, and the destination reverses the process.
                            </p>

                            <div class="lesson-callout">
                                <div class="lesson-callout-icon">
                                    <i class="fa-solid fa-lightbulb"></i>
                                </div>
                                <div>
                                    <strong>Example</strong>
                                    <p>When you open a website, your browser may use DNS to learn the server address, TCP to establish a connection, TLS to protect the session and HTTP to request the page.</p>
                                </div>
                            </div>

                            <h2>Clients and Servers</h2>

                            <p>
                                A client requests a service. A server listens for requests and provides a service. The same device can act as both depending on the software it is running. For example, a laptop is usually a client when browsing the web, but it can become a server if it hosts an SSH or web service.
                            </p>

                            <h2>Cybersecurity Perspective</h2>

                            <p>
                                Security teams need to understand normal communication before they can recognize abnormal communication. Unexpected outbound connections, unusual listening services or communication between systems that normally never interact can be important indicators during an investigation.
                            </p>

                            <pre class="lesson-code-block">Client -> Switch -> Router -> Internet -> Web Server
       local LAN        routed networks</pre>
                        `,

                        keyConcepts: [
                            {
                                title: "Network",
                                description: "Connected devices that exchange information."
                            },
                            {
                                title: "Protocol",
                                description: "A defined set of communication rules."
                            },
                            {
                                title: "Client",
                                description: "A system or application requesting a service."
                            },
                            {
                                title: "Server",
                                description: "A system or application providing a service."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "What is a primary purpose of a computer network?",

                                options: [
                                    "To prevent devices from communicating",
                                    "To allow devices to communicate and share resources",
                                    "To replace operating systems",
                                    "To remove the need for protocols"
                                ],

                                answer:
                                    1
                            }
                        ]

                    }
                ),

                lesson(
                    "lesson-02",
                    "LAN, WAN and Network Types",
                    "30 minutes",
                    {
                        subtitle:
                            "Compare common network types and understand where security boundaries may exist.",

                        objectives: [
                            "Define LAN and WAN.",
                            "Recognize WLAN, PAN and VPN concepts.",
                            "Understand the difference between physical and logical network boundaries.",
                            "Relate network scope to security controls."
                        ],

                        introduction: `
                            <h2>LAN, WAN and Network Types</h2>

                            <p>
                                Networks are commonly described according to their geographic scope, ownership or purpose. These labels help engineers and security professionals reason about where systems are located and how traffic moves between them.
                            </p>

                            <p>
                                The boundaries between network types are also useful security boundaries. Traffic crossing from an internal LAN to the Internet, for example, commonly passes through routers, firewalls or other inspection points.
                            </p>
                        `,

                        body: `
                            <h2>Local Area Networks</h2>

                            <p>
                                A LAN connects devices within a limited area such as a home, office, classroom or data centre. Ethernet switches and wireless access points are common LAN technologies. Devices on the same LAN may communicate directly at Layer 2 when they are in the same broadcast domain.
                            </p>

                            <pre class="lesson-code-block">Office LAN
PC-1 --\
PC-2 ---- Switch ---- Router ---- Internet
Printer -/</pre>

                            <h2>Wide Area Networks</h2>

                            <p>
                                A WAN connects networks across larger distances. Organizations may use leased circuits, MPLS, SD-WAN, site-to-site VPNs or public Internet links to interconnect offices. The Internet itself is the largest example of interconnected networks.
                            </p>

                            <h2>Other Useful Terms</h2>

                            <p>
                                A WLAN is a wireless LAN. A PAN connects devices over a very short range, such as Bluetooth devices. A VPN creates a protected logical connection across another network. A VLAN logically separates Layer 2 broadcast domains even when devices share physical switching infrastructure.
                            </p>

                            <h2>Security Example</h2>

                            <p>
                                A flat network where every device can reach every other device increases the potential impact of a compromise. Separating users, servers, management systems and guest devices into different network segments can reduce unnecessary communication paths.
                            </p>
                        `,

                        keyConcepts: [
                            {
                                title: "LAN",
                                description: "A network covering a relatively small local area."
                            },
                            {
                                title: "WAN",
                                description: "A network connecting locations across larger distances."
                            },
                            {
                                title: "VPN",
                                description: "A protected logical connection across another network."
                            },
                            {
                                title: "VLAN",
                                description: "A logical Layer 2 network segment."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Which network type typically covers a single office or building?",

                                options: [
                                    "LAN",
                                    "WAN",
                                    "Internet",
                                    "Autonomous System"
                                ],

                                answer:
                                    0
                            }
                        ]

                    }
                ),

                lesson(
                    "lesson-03",
                    "Routers, Switches and Network Devices",
                    "30 minutes",
                    {
                        subtitle:
                            "Understand the roles of common networking devices and where they operate.",

                        objectives: [
                            "Explain what a switch does.",
                            "Explain what a router does.",
                            "Recognize access points, firewalls and gateways.",
                            "Understand why different devices make different forwarding decisions."
                        ],

                        introduction: `
                            <h2>Routers, Switches and Network Devices</h2>

                            <p>
                                Networks depend on specialized devices that move, filter or inspect traffic. Two of the most important are switches and routers, but modern environments also contain access points, firewalls, load balancers, proxies and security appliances.
                            </p>

                            <p>
                                Understanding the role of each device makes troubleshooting easier and helps security professionals identify where traffic can be monitored or controlled.
                            </p>
                        `,

                        body: `
                            <h2>Switches</h2>

                            <p>
                                A traditional Ethernet switch forwards frames primarily using destination MAC addresses. It learns which MAC addresses are reachable through which switch ports and stores this information in a MAC address table. Switches are commonly associated with Layer 2 of the OSI model.
                            </p>

                            <pre class="lesson-code-block">MAC table example
00:11:22:AA:BB:01 -> Gi0/1
00:11:22:AA:BB:02 -> Gi0/2</pre>

                            <h2>Routers</h2>

                            <p>
                                A router forwards packets between IP networks. It examines the destination IP address, consults its routing table and chooses an appropriate next hop or outgoing interface. Routers separate Layer 2 broadcast domains and are associated primarily with OSI Layer 3.
                            </p>

                            <pre class="lesson-code-block">Destination        Next hop
192.168.20.0/24   10.0.0.2
0.0.0.0/0         10.0.0.1</pre>

                            <h2>Other Devices</h2>

                            <p>
                                Wireless access points bridge wireless clients into a network. Firewalls enforce traffic policy. Proxies communicate on behalf of clients or servers. Load balancers distribute connections across multiple backend systems. A gateway is a general term for a device or service that enables communication between different environments.
                            </p>

                            <h2>Security Perspective</h2>

                            <p>
                                A firewall can block unwanted traffic, but it cannot automatically compensate for insecure services that are intentionally allowed. Security therefore depends on layered controls across endpoints, applications, identity systems and the network.
                            </p>
                        `,

                        keyConcepts: [
                            {
                                title: "Switch",
                                description: "Forwards Ethernet frames within a Layer 2 network."
                            },
                            {
                                title: "Router",
                                description: "Forwards IP packets between networks."
                            },
                            {
                                title: "Firewall",
                                description: "Enforces rules controlling permitted traffic."
                            },
                            {
                                title: "Access Point",
                                description: "Connects wireless devices to a network."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Which device primarily forwards packets between different IP networks?",

                                options: [
                                    "Switch",
                                    "Router",
                                    "Wireless client",
                                    "DNS resolver"
                                ],

                                answer:
                                    1
                            }
                        ]

                    }
                ),

                lesson(
                    "lesson-04",
                    "OSI and TCP/IP Models",
                    "35 minutes",
                    {
                        subtitle:
                            "Use layered networking models to understand how protocols work together.",

                        objectives: [
                            "Name the seven OSI layers.",
                            "Understand the four-layer TCP/IP model.",
                            "Map common protocols to approximate layers.",
                            "Use layering to troubleshoot network problems."
                        ],

                        introduction: `
                            <h2>OSI and TCP/IP Models</h2>

                            <p>
                                Layered models divide complex network communication into smaller functions. The OSI model is commonly used for learning and troubleshooting, while the TCP/IP model more closely reflects the Internet protocol suite used in real networks.
                            </p>

                            <p>
                                A packet capture often exposes several layers at once: an Ethernet header, an IP header, a TCP or UDP header and application data. Thinking in layers helps explain the purpose of each part.
                            </p>
                        `,

                        body: `
                            <h2>The OSI Model</h2>

                            <p>
                                The seven OSI layers are Physical, Data Link, Network, Transport, Session, Presentation and Application. Real protocols do not always fit perfectly into only one layer, but the model provides a useful vocabulary for discussing communication.
                            </p>

                            <pre class="lesson-code-block">7 Application
6 Presentation
5 Session
4 Transport
3 Network
2 Data Link
1 Physical</pre>

                            <h2>The TCP/IP Model</h2>

                            <p>
                                A common TCP/IP model uses Application, Transport, Internet and Network Access layers. HTTP and DNS are application-layer protocols, TCP and UDP are transport protocols, IP operates at the Internet layer, and Ethernet or Wi-Fi provide network access.
                            </p>

                            <pre class="lesson-code-block">Application      HTTP / DNS / SSH
Transport        TCP / UDP
Internet         IP / ICMP
Network Access   Ethernet / Wi-Fi</pre>

                            <h2>Encapsulation</h2>

                            <p>
                                As application data moves down the stack, protocols add headers containing control information. At the destination, those headers are processed in reverse. This process is often called encapsulation and decapsulation.
                            </p>

                            <h2>Troubleshooting Example</h2>

                            <p>
                                If a host has no physical link, debugging HTTP is premature. If IP connectivity works but a hostname does not resolve, investigate DNS. Layered reasoning prevents random troubleshooting.
                            </p>
                        `,

                        keyConcepts: [
                            {
                                title: "OSI Model",
                                description: "A seven-layer conceptual networking model."
                            },
                            {
                                title: "TCP/IP Model",
                                description: "A layered model representing the Internet protocol suite."
                            },
                            {
                                title: "Encapsulation",
                                description: "Adding protocol information as data moves down the networking stack."
                            },
                            {
                                title: "Decapsulation",
                                description: "Processing and removing protocol information at the destination."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "At which OSI layer is IP primarily associated?",

                                options: [
                                    "Data Link",
                                    "Transport",
                                    "Network",
                                    "Application"
                                ],

                                answer:
                                    2
                            }
                        ]

                    }
                )

            ]

        },


        {
            id:
                "module-02",

            number:
                2,

            title:
                "IP Addressing",

            description:
                "Learn IPv4 addressing, host identification and public and private addressing.",

            labs:
                1,

            assessments:
                1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Understanding IPv4",
                    "30 minutes",
                    {
                        subtitle:
                            "Understand the structure and purpose of IPv4 addresses.",

                        objectives: [
                            "Describe an IPv4 address.",
                            "Convert between dotted decimal and basic binary.",
                            "Understand address uniqueness within a network context.",
                            "Recognize an address, prefix and subnet mask."
                        ],

                        introduction: `
                            <h2>Understanding IPv4</h2>

                            <p>
                                IPv4 provides logical addressing so packets can be delivered across interconnected networks. An IPv4 address contains 32 bits and is normally written as four decimal octets separated by periods.
                            </p>

                            <p>
                                An address alone does not tell you where the network boundary is. A subnet mask or CIDR prefix identifies which bits represent the network and which bits can vary for hosts.
                            </p>
                        `,

                        body: `
                            <h2>32 Bits and Four Octets</h2>

                            <p>
                                Each IPv4 octet represents eight bits and can range from 0 to 255. The address 192.168.1.25 is therefore four 8-bit values, giving a total of 32 bits.
                            </p>

                            <pre class="lesson-code-block">192       168       1         25
11000000  10101000  00000001  00011001</pre>

                            <h2>Address Plus Prefix</h2>

                            <p>
                                The notation 192.168.1.25/24 means the first 24 bits identify the network prefix. A /24 corresponds to the subnet mask 255.255.255.0.
                            </p>

                            <pre class="lesson-code-block">Address: 192.168.1.25/24
Network: 192.168.1.0
Typical host range: 192.168.1.1 - 192.168.1.254
Broadcast: 192.168.1.255</pre>

                            <h2>Why Security Analysts Care</h2>

                            <p>
                                IP addresses appear throughout firewall logs, proxy logs, endpoint telemetry and packet captures. Analysts need to recognize whether an address is internal, external, expected or unusual before drawing conclusions.
                            </p>
                        `,

                        keyConcepts: [
                            {
                                title: "IPv4",
                                description: "A 32-bit Internet Protocol address."
                            },
                            {
                                title: "Octet",
                                description: "Eight bits of an IPv4 address."
                            },
                            {
                                title: "Prefix Length",
                                description: "Number of leading bits representing the network prefix."
                            },
                            {
                                title: "Subnet Mask",
                                description: "A dotted-decimal representation of network and host boundaries."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "How many bits are in an IPv4 address?",

                                options: [
                                    "8",
                                    "16",
                                    "32",
                                    "128"
                                ],

                                answer:
                                    2
                            }
                        ]

                    }
                ),

                lesson(
                    "lesson-02",
                    "Network and Host Portions",
                    "30 minutes",
                    {
                        subtitle:
                            "Determine which part of an IPv4 address identifies the network and which part identifies a host.",

                        objectives: [
                            "Explain network and host portions.",
                            "Use a subnet mask to identify the boundary.",
                            "Understand why hosts compare destination networks.",
                            "Determine whether two /24 addresses are in the same subnet."
                        ],

                        introduction: `
                            <h2>Network and Host Portions</h2>

                            <p>
                                An IPv4 address is interpreted together with its subnet mask or prefix length. The network portion identifies the subnet, while the remaining bits identify addresses within that subnet.
                            </p>

                            <p>
                                Hosts use this distinction to decide whether a destination is local or must be reached through a router.
                            </p>
                        `,

                        body: `
                            <h2>Using a /24</h2>

                            <p>
                                With 192.168.10.42/24, the first 24 bits are the network portion and the last eight bits are available for addresses within the subnet. The network address is 192.168.10.0.
                            </p>

                            <pre class="lesson-code-block">192.168.10.42/24
NNNNNNNN.NNNNNNNN.NNNNNNNN.HHHHHHHH</pre>

                            <h2>Local or Remote?</h2>

                            <p>
                                If 192.168.10.42/24 sends to 192.168.10.80, both addresses are in 192.168.10.0/24, so local Layer 2 delivery can be used. If it sends to 192.168.20.80, the destination is outside the local /24 and traffic is normally sent to a default gateway.
                            </p>

                            <h2>Worked Example</h2>

                            <p>
                                Host A is 10.10.5.20/24 and Host B is 10.10.5.99/24. Both share network 10.10.5.0/24. Host C is 10.10.6.10/24, which belongs to a different network and requires routing between the subnets.
                            </p>
                        `,

                        keyConcepts: [
                            {
                                title: "Network Portion",
                                description: "Bits identifying the IP subnet."
                            },
                            {
                                title: "Host Portion",
                                description: "Bits that vary within a subnet."
                            },
                            {
                                title: "Local Destination",
                                description: "A destination considered to be on the same IP subnet."
                            },
                            {
                                title: "Remote Destination",
                                description: "A destination reached through routing."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "With 192.168.50.10/24, what is the network address?",

                                options: [
                                    "192.168.50.10",
                                    "192.168.50.0",
                                    "192.168.0.0",
                                    "192.168.50.255"
                                ],

                                answer:
                                    1
                            }
                        ]

                    }
                ),

                lesson(
                    "lesson-03",
                    "Public and Private IP Addresses",
                    "30 minutes",
                    {
                        subtitle:
                            "Distinguish private, public and other special-use IPv4 address ranges.",

                        objectives: [
                            "Identify RFC 1918 private ranges.",
                            "Understand why private addresses are used.",
                            "Explain the basic purpose of NAT.",
                            "Recognize loopback and link-local concepts."
                        ],

                        introduction: `
                            <h2>Public and Private IP Addresses</h2>

                            <p>
                                Not every IPv4 address is globally routable on the public Internet. Private ranges are reserved for internal networks, allowing many organizations to reuse the same address space.
                            </p>

                            <p>
                                Network Address Translation is commonly used at an Internet edge so privately addressed devices can communicate externally using one or more public addresses.
                            </p>
                        `,

                        body: `
                            <h2>Private IPv4 Ranges</h2>

                            <p>
                                The three commonly used private ranges are 10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16. Routers on the public Internet do not normally route these ranges as globally reachable addresses.
                            </p>

                            <pre class="lesson-code-block">10.0.0.0     - 10.255.255.255
172.16.0.0   - 172.31.255.255
192.168.0.0  - 192.168.255.255</pre>

                            <h2>NAT Example</h2>

                            <p>
                                A laptop may use 192.168.1.25 internally while the home router translates outbound connections to a public address assigned by the ISP. Remote Internet servers therefore see the translated public address rather than the laptop's private address.
                            </p>

                            <h2>Other Useful Addresses</h2>

                            <p>
                                127.0.0.0/8 is associated with loopback; 127.0.0.1 is commonly called localhost. 169.254.0.0/16 is used for IPv4 link-local addressing when a host cannot obtain normal configuration in some environments.
                            </p>

                            <h2>Security Perspective</h2>

                            <p>
                                Private addressing does not itself provide security. An internal host can still be vulnerable to another compromised internal system, and NAT should not be treated as a replacement for firewall policy.
                            </p>
                        `,

                        keyConcepts: [
                            {
                                title: "Private Address",
                                description: "An address reserved for internal use."
                            },
                            {
                                title: "Public Address",
                                description: "An address intended to be globally routable, subject to routing and policy."
                            },
                            {
                                title: "NAT",
                                description: "Translation between address representations at a network boundary."
                            },
                            {
                                title: "Loopback",
                                description: "Addressing used to communicate with the local host itself."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Which is an RFC 1918 private IPv4 address?",

                                options: [
                                    "8.8.8.8",
                                    "1.1.1.1",
                                    "10.20.30.40",
                                    "203.0.113.10"
                                ],

                                answer:
                                    2
                            }
                        ]

                    }
                ),

                lesson(
                    "lesson-04",
                    "IPv4 from a Security Perspective",
                    "30 minutes",
                    {
                        subtitle:
                            "Interpret IP addressing information during security monitoring and investigations.",

                        objectives: [
                            "Recognize what an IP address can and cannot prove.",
                            "Understand source and destination addressing in logs.",
                            "Recognize spoofing and NAT limitations.",
                            "Use context when investigating addresses."
                        ],

                        introduction: `
                            <h2>IPv4 from a Security Perspective</h2>

                            <p>
                                IP addresses are fundamental evidence in network-security logs, but they must be interpreted carefully. A source address identifies what a packet claims as its source at a particular observation point; it does not automatically identify a human user.
                            </p>

                            <p>
                                NAT, VPNs, proxies, dynamic addressing, cloud infrastructure and spoofing can all change how an IP address should be interpreted.
                            </p>
                        `,

                        body: `
                            <h2>Reading a Security Log</h2>

                            <p>
                                A firewall event might record source IP, source port, destination IP, destination port, protocol, action and timestamp. Analysts combine these fields with asset inventories, DHCP logs, identity data and other telemetry to understand what occurred.
                            </p>

                            <pre class="lesson-code-block">src=10.10.20.45 sport=52144
dst=172.16.5.10 dport=443
proto=tcp action=allow</pre>

                            <h2>Source Address Spoofing</h2>

                            <p>
                                IP headers contain a source address field that can sometimes be forged. Spoofing is especially relevant to connectionless traffic or certain denial-of-service scenarios. TCP communication is harder to fake successfully when the attacker must receive and respond to sequence-aware traffic.
                            </p>

                            <h2>NAT and Attribution</h2>

                            <p>
                                If hundreds of internal systems share one public address, an external log showing only that public address may not identify the internal device. NAT translation logs, timestamps and source ports may be needed to correlate activity.
                            </p>

                            <h2>Investigation Principle</h2>

                            <p>
                                Treat an IP address as one piece of evidence, not absolute attribution. Always ask where the log was captured, what translation occurred and whether the address was dynamically assigned.
                            </p>
                        `,

                        keyConcepts: [
                            {
                                title: "Source IP",
                                description: "The source address recorded in an IP packet."
                            },
                            {
                                title: "Destination IP",
                                description: "The address the packet is intended to reach."
                            },
                            {
                                title: "Spoofing",
                                description: "Falsifying addressing information."
                            },
                            {
                                title: "Attribution",
                                description: "Connecting observed activity to a responsible system, account or actor using evidence."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Why should an analyst avoid treating one IP address as proof of a specific user?",

                                options: [
                                    "IP addresses are never logged",
                                    "NAT, VPNs, DHCP and spoofing can affect interpretation",
                                    "IPv4 has no destination address",
                                    "Routers delete source addresses"
                                ],

                                answer:
                                    1
                            }
                        ]

                    }
                )

            ]

        },


        {
            id:
                "module-03",

            number:
                3,

            title:
                "Subnetting and CIDR",

            description:
                "Understand subnet masks, CIDR notation and network ranges.",

            labs:
                1,

            assessments:
                1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Understanding Subnet Masks",
                    "30 minutes",
                    {
                        subtitle:
                            "Use subnet masks to identify network and host bits in IPv4.",

                        objectives: [
                            "Explain the purpose of a subnet mask.",
                            "Recognize common subnet masks.",
                            "Relate subnet masks to prefix lengths.",
                            "Use bitwise reasoning to find a network address."
                        ],

                        introduction: `
                            <h2>Understanding Subnet Masks</h2>

                            <p>
                                A subnet mask is a 32-bit value used with an IPv4 address to identify the network prefix. Binary 1 bits mark the network portion while binary 0 bits mark bits available within the subnet.
                            </p>

                            <p>
                                CIDR prefix notation is usually more compact, but understanding masks helps explain how devices determine local and remote destinations.
                            </p>
                        `,

                        body: `
                            <h2>Common Masks</h2>

                            <p>
                                255.255.255.0 corresponds to /24, 255.255.0.0 to /16 and 255.0.0.0 to /8. Other valid masks such as 255.255.255.192 (/26) create boundaries inside an octet.
                            </p>

                            <pre class="lesson-code-block">/24 = 255.255.255.0
/25 = 255.255.255.128
/26 = 255.255.255.192
/27 = 255.255.255.224</pre>

                            <h2>Bitwise AND Concept</h2>

                            <p>
                                A host can determine its network address by applying a bitwise AND between its IP address and subnet mask. You do not need to perform binary calculations for every task, but understanding this operation explains why the result is deterministic.
                            </p>

                            <pre class="lesson-code-block">IP:   192.168.1.77
Mask: 255.255.255.0
Net:  192.168.1.0</pre>

                            <h2>Security Use</h2>

                            <p>
                                Subnet masks matter when defining firewall rules, vulnerability-scan scopes and network-monitoring ranges. A mistake such as scanning /16 instead of /24 can dramatically expand the number of targeted addresses.
                            </p>
                        `,

                        keyConcepts: [
                            {
                                title: "Subnet Mask",
                                description: "A 32-bit mask defining an IPv4 network prefix."
                            },
                            {
                                title: "Prefix",
                                description: "Leading network bits shared by addresses in a subnet."
                            },
                            {
                                title: "Bitwise AND",
                                description: "Operation used to derive the network address from IP and mask."
                            },
                            {
                                title: "Scope",
                                description: "The addresses or systems included in an activity such as monitoring or scanning."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Which CIDR prefix corresponds to 255.255.255.0?",

                                options: [
                                    "/8",
                                    "/16",
                                    "/24",
                                    "/32"
                                ],

                                answer:
                                    2
                            }
                        ]

                    }
                ),

                lesson(
                    "lesson-02",
                    "CIDR Notation",
                    "30 minutes",
                    {
                        subtitle:
                            "Interpret CIDR prefixes and estimate the size of IPv4 networks.",

                        objectives: [
                            "Explain CIDR notation.",
                            "Calculate the number of address bits remaining.",
                            "Recognize common prefix sizes.",
                            "Understand why CIDR replaced rigid classful boundaries."
                        ],

                        introduction: `
                            <h2>CIDR Notation</h2>

                            <p>
                                CIDR, or Classless Inter-Domain Routing, represents an IP network using an address followed by a slash and prefix length. For example, 192.168.10.0/24 represents a network whose first 24 bits are fixed.
                            </p>

                            <p>
                                A longer prefix means fewer host bits and therefore a smaller address block. A shorter prefix represents a larger block.
                            </p>
                        `,

                        body: `
                            <h2>Address Count</h2>

                            <p>
                                For IPv4, the theoretical number of addresses in a prefix is 2 raised to the number of host bits. A /24 leaves 8 host bits, so it contains 256 addresses. A /26 leaves 6 host bits, so it contains 64 addresses.
                            </p>

                            <pre class="lesson-code-block">/24 -> 8 host bits -> 256 addresses
/25 -> 7 host bits -> 128 addresses
/26 -> 6 host bits -> 64 addresses
/27 -> 5 host bits -> 32 addresses</pre>

                            <h2>Worked Example</h2>

                            <p>
                                192.168.1.64/26 starts at .64. A /26 block has 64 addresses, so this subnet spans .64 through .127. The network address is .64 and the broadcast address is .127.
                            </p>

                            <h2>CIDR in Security Tools</h2>

                            <p>
                                Firewalls, SIEM platforms, cloud security groups and scanners commonly accept CIDR ranges. A rule permitting 10.0.0.0/8 is far broader than one permitting 10.20.30.0/24, so prefix accuracy is security-relevant.
                            </p>
                        `,

                        keyConcepts: [
                            {
                                title: "CIDR",
                                description: "Classless notation representing an IP prefix."
                            },
                            {
                                title: "Prefix Length",
                                description: "Number after the slash indicating fixed network bits."
                            },
                            {
                                title: "Host Bits",
                                description: "Bits remaining after the prefix."
                            },
                            {
                                title: "Address Block",
                                description: "Contiguous addresses represented by a prefix."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "How many total IPv4 addresses are contained in a /26 block?",

                                options: [
                                    "32",
                                    "64",
                                    "128",
                                    "256"
                                ],

                                answer:
                                    1
                            }
                        ]

                    }
                ),

                lesson(
                    "lesson-03",
                    "Network and Broadcast Addresses",
                    "30 minutes",
                    {
                        subtitle:
                            "Identify network, broadcast and usable host ranges in traditional IPv4 subnets.",

                        objectives: [
                            "Define a network address.",
                            "Define a broadcast address.",
                            "Determine a basic usable host range.",
                            "Calculate boundaries for common prefixes."
                        ],

                        introduction: `
                            <h2>Network and Broadcast Addresses</h2>

                            <p>
                                Traditional IPv4 subnets reserve the lowest address as the network identifier and the highest address as the directed broadcast address. The addresses between them are commonly available for host assignments, with some special-case exceptions in modern networking.
                            </p>

                            <p>
                                Knowing these boundaries helps administrators configure networks and helps security analysts understand whether an observed address is a normal host address.
                            </p>
                        `,

                        body: `
                            <h2>Simple /24 Example</h2>

                            <p>
                                For 192.168.50.0/24, the network address is 192.168.50.0 and broadcast is 192.168.50.255. Common usable host addresses are .1 through .254.
                            </p>

                            <pre class="lesson-code-block">Network:   192.168.50.0
First host:192.168.50.1
Last host: 192.168.50.254
Broadcast: 192.168.50.255</pre>

                            <h2>A /26 Example</h2>

                            <p>
                                For 10.0.0.128/26, the block size is 64. The addresses span .128 through .191. Therefore .128 is the network, .191 is broadcast, and .129-.190 form the traditional host range.
                            </p>

                            <pre class="lesson-code-block">10.0.0.128/26
Network:   10.0.0.128
Hosts:     10.0.0.129 - 10.0.0.190
Broadcast: 10.0.0.191</pre>

                            <h2>Why This Matters</h2>

                            <p>
                                A security rule written for the wrong range may expose additional hosts or exclude systems that were intended to be protected. Accurate network boundaries are therefore part of access-control hygiene.
                            </p>
                        `,

                        keyConcepts: [
                            {
                                title: "Network Address",
                                description: "Lowest address identifying a traditional IPv4 subnet."
                            },
                            {
                                title: "Broadcast Address",
                                description: "Highest address used for directed broadcast in a traditional subnet."
                            },
                            {
                                title: "Host Range",
                                description: "Addresses available for devices under common subnetting conventions."
                            },
                            {
                                title: "Block Size",
                                description: "Number of addresses represented by a prefix."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "What is the broadcast address of 192.168.1.0/24?",

                                options: [
                                    "192.168.1.0",
                                    "192.168.1.1",
                                    "192.168.1.254",
                                    "192.168.1.255"
                                ],

                                answer:
                                    3
                            }
                        ]

                    }
                ),

                lesson(
                    "lesson-04",
                    "Subnetting for Network Security",
                    "30 minutes",
                    {
                        subtitle:
                            "Understand how subnet design supports segmentation and limits unnecessary communication.",

                        objectives: [
                            "Explain how subnetting supports segmentation.",
                            "Relate subnet boundaries to routing and firewall policy.",
                            "Understand blast-radius reduction.",
                            "Recognize why segmentation must be enforced rather than assumed."
                        ],

                        introduction: `
                            <h2>Subnetting for Network Security</h2>

                            <p>
                                Subnetting is an addressing technique, but it becomes a security tool when different subnets are separated by controlled routing and policy. Placing systems in different subnets creates an opportunity to inspect or restrict traffic between them.
                            </p>

                            <p>
                                Good segmentation can reduce lateral movement, simplify monitoring and make access rules easier to express.
                            </p>
                        `,

                        body: `
                            <h2>Segmentation Example</h2>

                            <p>
                                An organization might place employee laptops in 10.10.10.0/24, application servers in 10.10.20.0/24, databases in 10.10.30.0/24 and management systems in 10.10.40.0/24. A firewall can then allow only required flows between these zones.
                            </p>

                            <pre class="lesson-code-block">Users 10.10.10.0/24
        |
     Firewall
   /      |       \
Apps    DBs      Mgmt
.20/24  .30/24   .40/24</pre>

                            <h2>Least Connectivity</h2>

                            <p>
                                Network policy should permit necessary communication rather than assuming every internal system needs unrestricted access. For example, user workstations may need HTTPS access to an application server but should not necessarily connect directly to database ports.
                            </p>

                            <h2>Limits of Subnetting</h2>

                            <p>
                                Simply assigning different IP ranges does not guarantee isolation. If routing permits unrestricted communication between them, the security benefit is limited. Segmentation requires enforcement through firewalls, ACLs, security groups or equivalent controls.
                            </p>
                        `,

                        keyConcepts: [
                            {
                                title: "Segmentation",
                                description: "Dividing a network into controlled zones."
                            },
                            {
                                title: "Lateral Movement",
                                description: "Movement from one compromised system to other systems."
                            },
                            {
                                title: "ACL",
                                description: "Rules that permit or deny traffic based on defined criteria."
                            },
                            {
                                title: "Least Connectivity",
                                description: "Allowing only communication required for legitimate operation."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "What turns subnet separation into a meaningful security control?",

                                options: [
                                    "Using shorter hostnames",
                                    "Changing MAC vendors",
                                    "Enforcing traffic policy between segments",
                                    "Using the same password everywhere"
                                ],

                                answer:
                                    2
                            }
                        ]

                    }
                )

            ]

        },


        /* ===== CONTINUE WITH PART 2 BELOW THIS LINE ===== */

/* =========================================================
   NETWORKING FUNDAMENTALS — PART 2 OF 3

   IMPORTANT:
   Paste this immediately after PART 1.
   Do not add another `modules: [` line.
========================================================= */

        {
            id:
                "module-04",

            number:
                4,

            title:
                "Ethernet, MAC Addresses and ARP",

            description:
                "Learn local network communication using Ethernet, MAC addresses and ARP.",

            labs:
                1,

            assessments:
                1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Ethernet Fundamentals",
                    "30 minutes",
                    {
                        subtitle:
                            "Understand Ethernet frames, switching and local Layer 2 delivery.",

                        objectives: [
                            "Explain Ethernet's role on LANs.",
                            "Identify basic Ethernet frame fields.",
                            "Understand unicast and broadcast delivery.",
                            "Explain how switches forward frames."
                        ],

                        introduction: `
                            <h2>Ethernet Fundamentals</h2>

                            <p>
                                Ethernet is one of the most common technologies used on wired local networks. It defines how network interfaces identify one another at Layer 2 and how data is packaged into frames for local delivery.
                            </p>

                            <p>
                                An IP packet traveling across an Ethernet LAN is carried inside an Ethernet frame. The Ethernet header changes as packets cross routed boundaries, while the IP addressing generally represents the end-to-end logical conversation.
                            </p>
                        `,

                        body: `
                            <h2>Ethernet Frames</h2>

                            <p>
                                An Ethernet frame contains destination and source MAC addresses, a type field identifying the payload protocol, the payload itself and an error-detection value. VLAN tags may also be present.
                            </p>

                            <pre class="lesson-code-block">[Dst MAC][Src MAC][Type][Payload........][FCS]</pre>

                            <h2>Switch Forwarding</h2>

                            <p>
                                A switch learns source MAC addresses and associates them with incoming ports. When the destination MAC is known, the frame is forwarded toward the learned port. Unknown unicast and broadcast traffic may be flooded within the relevant VLAN.
                            </p>

                            <h2>Security Perspective</h2>

                            <p>
                                Layer 2 visibility matters when investigating local attacks, rogue devices or ARP manipulation. Network access controls, switch security features and segmentation can help reduce exposure on shared LANs.
                            </p>
                        `,

                        keyConcepts: [
                            {
                                title: "Ethernet Frame",
                                description: "Layer 2 unit used to carry data on Ethernet."
                            },
                            {
                                title: "MAC Address",
                                description: "Layer 2 identifier used for local delivery."
                            },
                            {
                                title: "Broadcast",
                                description: "Traffic intended for all devices in a broadcast domain."
                            },
                            {
                                title: "FCS",
                                description: "Frame Check Sequence used to detect transmission errors."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "What address does an Ethernet switch primarily use for normal Layer 2 forwarding?",

                                options: [
                                    "IP address",
                                    "MAC address",
                                    "DNS name",
                                    "TCP sequence number"
                                ],

                                answer:
                                    1
                            }
                        ]

                    }
                ),

                lesson(
                    "lesson-02",
                    "MAC Addresses",
                    "30 minutes",
                    {
                        subtitle:
                            "Understand MAC addressing and how switches learn local devices.",

                        objectives: [
                            "Describe the format of a MAC address.",
                            "Understand source and destination MAC addresses.",
                            "Explain MAC learning.",
                            "Recognize limitations of using MAC addresses as identity."
                        ],

                        introduction: `
                            <h2>MAC Addresses</h2>

                            <p>
                                A MAC address is typically a 48-bit value represented as six hexadecimal octets. Network interfaces use MAC addresses for Layer 2 communication on Ethernet networks.
                            </p>

                            <p>
                                Although MAC addresses are useful for local delivery, they should not be treated as strong identity. Software can often change or spoof the address presented by a network interface.
                            </p>
                        `,

                        body: `
                            <h2>MAC Format</h2>

                            <p>
                                A value such as 00:1A:2B:3C:4D:5E contains 48 bits. The first portion is historically associated with an organizational identifier, while the remainder identifies an interface value assigned by the vendor or software.
                            </p>

                            <pre class="lesson-code-block">00:1A:2B:3C:4D:5E</pre>

                            <h2>Learning Process</h2>

                            <p>
                                When a switch receives a frame, it observes the source MAC and records which port the frame arrived on. This allows future frames for that MAC to be forwarded efficiently.
                            </p>

                            <h2>MAC Spoofing</h2>

                            <p>
                                Because host software can often alter a MAC address, MAC allowlists alone are weak protection. Stronger controls may include authenticated network access, switch-port security, endpoint identity and monitoring.
                            </p>
                        `,

                        keyConcepts: [
                            {
                                title: "MAC Address",
                                description: "A Layer 2 hardware/interface identifier."
                            },
                            {
                                title: "MAC Table",
                                description: "Switch table mapping learned MAC addresses to ports."
                            },
                            {
                                title: "Spoofing",
                                description: "Presenting a forged identifier."
                            },
                            {
                                title: "Hexadecimal",
                                description: "Base-16 notation commonly used for MAC addresses."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Why is a MAC address not strong proof of device identity?",

                                options: [
                                    "It contains no bits",
                                    "Routers always delete it permanently",
                                    "It can often be changed or spoofed",
                                    "It is the same on every device"
                                ],

                                answer:
                                    2
                            }
                        ]

                    }
                ),

                lesson(
                    "lesson-03",
                    "Understanding ARP",
                    "30 minutes",
                    {
                        subtitle:
                            "Understand how IPv4 hosts discover local Ethernet destinations using ARP.",

                        objectives: [
                            "Explain the purpose of ARP.",
                            "Describe ARP request and reply behaviour.",
                            "Understand ARP caches.",
                            "Connect IP-layer decisions to MAC-layer delivery."
                        ],

                        introduction: `
                            <h2>Understanding ARP</h2>

                            <p>
                                Address Resolution Protocol bridges the gap between IPv4 addressing and Ethernet delivery on a local network. A host may know the destination IPv4 address but still need the corresponding destination MAC address before it can build an Ethernet frame.
                            </p>

                            <p>
                                ARP is normally used only for local-link resolution. When the final destination is remote, a host usually resolves the MAC address of its default gateway instead.
                            </p>
                        `,

                        body: `
                            <h2>ARP Request</h2>

                            <p>
                                If a host needs the MAC address for 192.168.1.20, it can send a broadcast ARP request asking which device owns that IPv4 address.
                            </p>

                            <pre class="lesson-code-block">Who has 192.168.1.20?
Tell 192.168.1.10</pre>

                            <h2>ARP Reply</h2>

                            <p>
                                The device configured with 192.168.1.20 replies with its MAC address. The requesting host stores the mapping temporarily in its ARP cache and can then address an Ethernet frame correctly.
                            </p>

                            <pre class="lesson-code-block">192.168.1.20 is at 00:11:22:33:44:55</pre>

                            <h2>Viewing the Cache</h2>

                            <p>
                                On Windows, \`arp -a\` can display learned ARP entries. On Linux, \`ip neigh\` is commonly used to inspect neighbour mappings.
                            </p>

                            <pre class="lesson-code-block">Windows: arp -a
Linux:   ip neigh</pre>

                            <h2>Security Context</h2>

                            <p>
                                ARP has no built-in authentication. This makes forged ARP messages possible on some local networks, which is why secure switching practices and encrypted higher-layer protocols remain important.
                            </p>
                        `,

                        keyConcepts: [
                            {
                                title: "ARP",
                                description: "Protocol mapping local IPv4 addresses to MAC addresses."
                            },
                            {
                                title: "ARP Request",
                                description: "Broadcast query asking for the MAC associated with an IPv4 address."
                            },
                            {
                                title: "ARP Reply",
                                description: "Response providing an address mapping."
                            },
                            {
                                title: "ARP Cache",
                                description: "Temporary host table of learned IP-to-MAC mappings."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "What does ARP resolve on a typical IPv4 Ethernet LAN?",

                                options: [
                                    "Domain names to URLs",
                                    "IPv4 addresses to MAC addresses",
                                    "Ports to processes",
                                    "Passwords to users"
                                ],

                                answer:
                                    1
                            }
                        ]

                    }
                ),

                lesson(
                    "lesson-04",
                    "ARP Security Risks",
                    "30 minutes",
                    {
                        subtitle:
                            "Understand ARP spoofing concepts and defensive controls.",

                        objectives: [
                            "Explain why ARP trust can be abused.",
                            "Understand the concept of ARP spoofing.",
                            "Recognize potential man-in-the-middle impact.",
                            "Identify defensive measures."
                        ],

                        introduction: `
                            <h2>ARP Security Risks</h2>

                            <p>
                                ARP was designed for convenient local address resolution rather than authenticated trust. Hosts may update neighbour information based on received ARP messages, which creates opportunities for malicious manipulation on an accessible Layer 2 network.
                            </p>

                            <p>
                                A common concept is ARP spoofing or ARP poisoning, where forged mappings cause traffic to be sent to the wrong MAC address.
                            </p>
                        `,

                        body: `
                            <h2>Conceptual Attack</h2>

                            <p>
                                An attacker on the same LAN may attempt to convince a victim that the attacker's MAC corresponds to the default gateway, while also convincing the gateway that the attacker's MAC corresponds to the victim. If successful, traffic may pass through the attacker's device.
                            </p>

                            <pre class="lesson-code-block">Victim ---> Attacker ---> Gateway
   forged ARP mappings</pre>

                            <h2>Potential Impact</h2>

                            <p>
                                Depending on the environment and protections, manipulated traffic paths may enable interception, disruption or redirection. Encryption such as properly validated HTTPS limits what an intermediary can read or alter at the application layer.
                            </p>

                            <h2>Defensive Measures</h2>

                            <p>
                                Possible defenses include network segmentation, Dynamic ARP Inspection on supported switches, DHCP snooping as a trust source, static mappings for special cases, endpoint monitoring and widespread use of encrypted protocols.
                            </p>

                            <h2>Ethical Boundary</h2>

                            <p>
                                ARP-manipulation testing should only be performed in an isolated lab or on networks where you have explicit authorization. Interfering with real network traffic can disrupt users and expose sensitive data.
                            </p>
                        `,

                        keyConcepts: [
                            {
                                title: "ARP Spoofing",
                                description: "Sending forged ARP information."
                            },
                            {
                                title: "Man-in-the-Middle",
                                description: "Positioning between communicating systems."
                            },
                            {
                                title: "Dynamic ARP Inspection",
                                description: "Switch feature that validates ARP information against trusted bindings."
                            },
                            {
                                title: "Encryption",
                                description: "Protection that can reduce the value of intercepted traffic."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Which control can help validate ARP information on supported enterprise switches?",

                                options: [
                                    "DNS recursion",
                                    "HTTP redirect",
                                    "NAT overload",
                                    "Dynamic ARP Inspection"
                                ],

                                answer:
                                    3
                            }
                        ]

                    }
                )

            ]

        },


        {
            id:
                "module-05",

            number:
                5,

            title:
                "TCP and UDP",

            description:
                "Understand transport protocols, ports and network services.",

            labs:
                1,

            assessments:
                1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Transport Layer Fundamentals",
                    "30 minutes",
                    {
                        subtitle:
                            "Understand transport-layer communication, ports and multiplexing.",

                        objectives: [
                            "Explain the role of the transport layer.",
                            "Understand ports and sockets conceptually.",
                            "Differentiate connection-oriented and connectionless transport.",
                            "Relate transport data to applications."
                        ],

                        introduction: `
                            <h2>Transport Layer Fundamentals</h2>

                            <p>
                                The transport layer provides communication between applications running on hosts. Two major Internet transport protocols are TCP and UDP. They use port numbers so multiple applications can communicate using the same IP address.
                            </p>

                            <p>
                                A network conversation is commonly identified using source and destination IP addresses, source and destination ports, and transport protocol.
                            </p>
                        `,

                        body: `
                            <h2>Ports</h2>

                            <p>
                                Ports are 16-bit numbers from 0 through 65535. Servers often listen on predictable ports, while clients frequently use temporary high-numbered source ports.
                            </p>

                            <pre class="lesson-code-block">Client 10.0.0.10:53124 -> Server 203.0.113.20:443/TCP</pre>

                            <h2>Multiplexing</h2>

                            <p>
                                The operating system uses addresses and ports to deliver incoming transport data to the correct process or socket. This allows a computer to browse multiple sites, perform DNS lookups and maintain other connections simultaneously.
                            </p>

                            <h2>Security Perspective</h2>

                            <p>
                                Open ports may indicate reachable services, but a port number alone does not guarantee which application is running. Security analysis combines port information with protocol behaviour, banners, process data and configuration.
                            </p>
                        `,

                        keyConcepts: [
                            {
                                title: "Port",
                                description: "Transport-layer number associated with an application endpoint."
                            },
                            {
                                title: "Socket",
                                description: "Software abstraction for a communication endpoint."
                            },
                            {
                                title: "TCP",
                                description: "Connection-oriented transport protocol."
                            },
                            {
                                title: "UDP",
                                description: "Connectionless datagram transport protocol."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Why are port numbers used?",

                                options: [
                                    "To identify Ethernet cable color",
                                    "To direct transport traffic to applications",
                                    "To replace IP addresses",
                                    "To encrypt packets"
                                ],

                                answer:
                                    1
                            }
                        ]

                    }
                ),

                lesson(
                    "lesson-02",
                    "TCP and the Three-Way Handshake",
                    "35 minutes",
                    {
                        subtitle:
                            "Understand reliable TCP connections and the three-way handshake.",

                        objectives: [
                            "Explain TCP's connection-oriented nature.",
                            "Describe SYN, SYN-ACK and ACK.",
                            "Understand sequence and acknowledgement concepts.",
                            "Recognize common TCP flags."
                        ],

                        introduction: `
                            <h2>TCP and the Three-Way Handshake</h2>

                            <p>
                                TCP provides a reliable byte-stream abstraction over IP. Before ordinary application data is exchanged, TCP endpoints normally establish connection state using a three-way handshake.
                            </p>

                            <p>
                                TCP also uses sequence numbers, acknowledgements, retransmission and flow-control mechanisms to help provide ordered, reliable delivery.
                            </p>
                        `,

                        body: `
                            <h2>Three-Way Handshake</h2>

                            <p>
                                The client sends SYN, the server responds with SYN-ACK, and the client completes the handshake with ACK. Both sides establish initial sequence state as part of this exchange.
                            </p>

                            <pre class="lesson-code-block">Client                 Server
  SYN  ----------------->
       <------------- SYN-ACK
  ACK  ----------------->
       Connection established</pre>

                            <h2>TCP Flags</h2>

                            <p>
                                Common flags include SYN for synchronization, ACK for acknowledgement, FIN for orderly connection shutdown and RST for resetting a connection. Packet analysis often relies heavily on these flags.
                            </p>

                            <h2>Reliability</h2>

                            <p>
                                When TCP detects missing data through sequence and acknowledgement behaviour, lost segments can be retransmitted. The receiving application gets an ordered stream even when the underlying IP network does not guarantee delivery.
                            </p>

                            <h2>Security Perspective</h2>

                            <p>
                                TCP state helps firewalls distinguish new and established flows. Analysts can also recognize suspicious patterns such as large numbers of incomplete handshakes, resets or repeated connection attempts.
                            </p>
                        `,

                        keyConcepts: [
                            {
                                title: "SYN",
                                description: "TCP flag used during connection establishment."
                            },
                            {
                                title: "ACK",
                                description: "TCP flag indicating acknowledgement information is valid."
                            },
                            {
                                title: "Sequence Number",
                                description: "Number used to track bytes in a TCP stream."
                            },
                            {
                                title: "Retransmission",
                                description: "Resending data believed to have been lost."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "What is the normal TCP three-way handshake order?",

                                options: [
                                    "ACK, SYN, FIN",
                                    "SYN, ACK, RST",
                                    "SYN, SYN-ACK, ACK",
                                    "FIN, SYN-ACK, SYN"
                                ],

                                answer:
                                    2
                            }
                        ]

                    }
                ),

                lesson(
                    "lesson-03",
                    "Understanding UDP",
                    "30 minutes",
                    {
                        subtitle:
                            "Understand connectionless UDP communication and where it is commonly used.",

                        objectives: [
                            "Explain UDP's connectionless model.",
                            "Compare UDP overhead with TCP.",
                            "Recognize applications that commonly use UDP.",
                            "Understand security and reliability trade-offs."
                        ],

                        introduction: `
                            <h2>Understanding UDP</h2>

                            <p>
                                UDP sends independent datagrams without establishing TCP-style connection state. Its header is small, and it does not provide built-in retransmission, ordered delivery or flow control.
                            </p>

                            <p>
                                Applications choose UDP when low overhead, timing or application-controlled reliability is more important than TCP's built-in delivery guarantees.
                            </p>
                        `,

                        body: `
                            <h2>UDP Header</h2>

                            <p>
                                The UDP header contains source port, destination port, length and checksum fields. There are no sequence and acknowledgement fields like those used by TCP.
                            </p>

                            <pre class="lesson-code-block">[Src Port][Dst Port][Length][Checksum]
[Application Data..................]</pre>

                            <h2>Common Uses</h2>

                            <p>
                                DNS queries often use UDP, although DNS can also use TCP. Real-time voice/video, streaming technologies, DHCP and many service-discovery protocols also commonly use UDP.
                            </p>

                            <h2>Security Perspective</h2>

                            <p>
                                Because UDP does not require a handshake, source-address spoofing can be easier in some scenarios. This contributes to the possibility of reflection and amplification attacks against poorly designed or exposed UDP services.
                            </p>
                        `,

                        keyConcepts: [
                            {
                                title: "Datagram",
                                description: "Independent unit sent using a connectionless protocol."
                            },
                            {
                                title: "Connectionless",
                                description: "Communication without maintaining TCP-style connection state."
                            },
                            {
                                title: "Low Overhead",
                                description: "Relatively small protocol control information."
                            },
                            {
                                title: "Amplification",
                                description: "Receiving a larger response than the triggering request, potentially useful in abuse scenarios."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Which statement about UDP is correct?",

                                options: [
                                    "UDP does not perform a TCP-style handshake",
                                    "UDP always guarantees ordered delivery",
                                    "UDP has a SYN flag",
                                    "UDP requires TLS"
                                ],

                                answer:
                                    0
                            }
                        ]

                    }
                ),

                lesson(
                    "lesson-04",
                    "Ports and Services",
                    "30 minutes",
                    {
                        subtitle:
                            "Recognize common ports and understand why service identification matters.",

                        objectives: [
                            "Explain well-known and ephemeral ports.",
                            "Recognize several common service ports.",
                            "Understand that ports are conventions, not guarantees.",
                            "Relate listening services to attack surface."
                        ],

                        introduction: `
                            <h2>Ports and Services</h2>

                            <p>
                                Port numbers help applications identify transport endpoints. Some services commonly use standardized ports, such as HTTPS on TCP 443, SSH on TCP 22 and DNS on UDP/TCP 53.
                            </p>

                            <p>
                                However, services can be configured on non-standard ports, and malware can use any available port. Port numbers are therefore clues rather than proof of application identity.
                            </p>
                        `,

                        body: `
                            <h2>Common Examples</h2>

                            <p>
                                Security students should become familiar with frequently encountered ports, while remembering that service detection requires more than memorization.
                            </p>

                            <pre class="lesson-code-block">22/tcp   SSH
53/udp   DNS queries
53/tcp   DNS and zone-related operations
80/tcp   HTTP
443/tcp  HTTPS
445/tcp  SMB
3389/tcp RDP</pre>

                            <h2>Listening vs Outbound</h2>

                            <p>
                                A listening socket waits for incoming connections or datagrams. Client applications often create temporary outbound connections using ephemeral source ports. Seeing a high-numbered source port is therefore normal in many client-server communications.
                            </p>

                            <h2>Attack Surface</h2>

                            <p>
                                Every reachable service should have a business purpose, be securely configured and receive appropriate updates. Unnecessary listening services increase the number of components an attacker may probe.
                            </p>

                            <h2>Demonstration</h2>

                            <p>
                                On Windows, \`netstat -ano\` can show connections and listening ports. On Linux, \`ss -tulpn\` is commonly used to inspect sockets, subject to permissions.
                            </p>

                            <pre class="lesson-code-block">Windows: netstat -ano
Linux:   ss -tulpn</pre>
                        `,

                        keyConcepts: [
                            {
                                title: "Well-Known Port",
                                description: "Standardized low-numbered port associated with common services."
                            },
                            {
                                title: "Ephemeral Port",
                                description: "Temporary client-side port often chosen dynamically."
                            },
                            {
                                title: "Listening Socket",
                                description: "Endpoint waiting for inbound communication."
                            },
                            {
                                title: "Attack Surface",
                                description: "Reachable functionality that may potentially be attacked."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Which port is conventionally associated with HTTPS?",

                                options: [
                                    "22",
                                    "53",
                                    "80",
                                    "443"
                                ],

                                answer:
                                    3
                            }
                        ]

                    }
                ),

                lesson(
                    "lesson-05",
                    "TCP and UDP in Cybersecurity",
                    "30 minutes",
                    {
                        subtitle:
                            "Interpret transport behaviour during monitoring, scanning and incident response.",

                        objectives: [
                            "Compare TCP and UDP from a monitoring perspective.",
                            "Understand connection states in logs.",
                            "Recognize suspicious transport patterns.",
                            "Use transport context during investigations."
                        ],

                        introduction: `
                            <h2>TCP and UDP in Cybersecurity</h2>

                            <p>
                                Security tools frequently summarize network activity in terms of protocol, source/destination addresses and source/destination ports. Understanding TCP and UDP allows analysts to interpret whether those records represent connection attempts, established sessions or standalone datagrams.
                            </p>

                            <p>
                                Transport behaviour also matters when configuring firewalls because stateful devices can track TCP sessions differently from connectionless UDP flows.
                            </p>
                        `,

                        body: `
                            <h2>Firewall Example</h2>

                            <p>
                                A stateful firewall may permit return packets for an established outbound TCP connection without requiring a separate inbound rule for the temporary client port. UDP state is usually inferred from recent flows rather than a handshake.
                            </p>

                            <h2>Scanning Patterns</h2>

                            <p>
                                Repeated TCP connection attempts to many ports may indicate service discovery, while UDP probing may generate ICMP errors or no response. Similar patterns can also be produced by legitimate monitoring tools, so context matters.
                            </p>

                            <h2>Incident Example</h2>

                            <p>
                                Suppose a workstation suddenly makes TCP connections to many internal hosts on port 445. This might be administrative activity, vulnerability scanning or lateral movement. Analysts correlate the pattern with endpoint processes, user identity and change records.
                            </p>
                        `,

                        keyConcepts: [
                            {
                                title: "Stateful Firewall",
                                description: "Firewall that tracks connection/flow state."
                            },
                            {
                                title: "Flow",
                                description: "A communication record identified by addressing, ports and protocol."
                            },
                            {
                                title: "Service Discovery",
                                description: "Determining reachable network services."
                            },
                            {
                                title: "Context",
                                description: "Additional evidence needed to interpret network behaviour accurately."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Why is context necessary when analyzing repeated connections to many ports?",

                                options: [
                                    "Ports contain no numbers",
                                    "The pattern can be legitimate or malicious depending on circumstances",
                                    "TCP cannot be logged",
                                    "Firewalls hide all internal traffic"
                                ],

                                answer:
                                    1
                            }
                        ]

                    }
                )

            ]

        },


        {
            id:
                "module-06",

            number:
                6,

            title:
                "ICMP and Network Diagnostics",

            description:
                "Learn ICMP, ping and traceroute.",

            labs:
                1,

            assessments:
                1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Understanding ICMP",
                    "30 minutes",
                    {
                        subtitle:
                            "Understand how ICMP carries control and diagnostic information for IP networks.",

                        objectives: [
                            "Explain ICMP's purpose.",
                            "Recognize echo and error messages.",
                            "Understand that ICMP is not simply 'ping'.",
                            "Relate ICMP to troubleshooting and security."
                        ],

                        introduction: `
                            <h2>Understanding ICMP</h2>

                            <p>
                                Internet Control Message Protocol communicates status, error and diagnostic information related to IP delivery. It is carried directly over IP rather than using TCP or UDP ports.
                            </p>

                            <p>
                                Ping uses ICMP echo messages, but ICMP supports many other message types, including destination-unreachable and time-exceeded messages.
                            </p>
                        `,

                        body: `
                            <h2>Common Message Types</h2>

                            <p>
                                Echo Request and Echo Reply support reachability testing. Destination Unreachable can report delivery problems. Time Exceeded is important to traceroute behaviour. Different ICMP versions and message types exist for IPv4 and IPv6.
                            </p>

                            <h2>No Port Numbers</h2>

                            <p>
                                Because ICMP is not TCP or UDP, it does not use transport-layer port numbers. Firewall rules therefore often identify ICMP by protocol and message type rather than port.
                            </p>

                            <h2>Security Perspective</h2>

                            <p>
                                Blocking all ICMP may hide some reconnaissance, but it can also break useful diagnostics and network functions. Mature security policy usually permits necessary ICMP messages while controlling unnecessary exposure.
                            </p>
                        `,

                        keyConcepts: [
                            {
                                title: "ICMP",
                                description: "Protocol carrying IP-related control and diagnostic messages."
                            },
                            {
                                title: "Echo Request",
                                description: "Message commonly used by ping."
                            },
                            {
                                title: "Time Exceeded",
                                description: "Message used when packet lifetime expires."
                            },
                            {
                                title: "Destination Unreachable",
                                description: "Message indicating certain delivery failures."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Does ICMP use TCP or UDP port numbers?",

                                options: [
                                    "Only TCP ports",
                                    "Only UDP ports",
                                    "No",
                                    "Only port 0"
                                ],

                                answer:
                                    2
                            }
                        ]

                    }
                ),

                lesson(
                    "lesson-02",
                    "Ping",
                    "30 minutes",
                    {
                        subtitle:
                            "Use ping to understand basic IP reachability and round-trip response.",

                        objectives: [
                            "Explain what ping tests.",
                            "Interpret replies and timeouts.",
                            "Understand round-trip time.",
                            "Recognize the limitations of ping."
                        ],

                        introduction: `
                            <h2>Ping</h2>

                            <p>
                                Ping sends ICMP Echo Requests and waits for Echo Replies. It is a simple way to test whether a target responds at the IP layer and to estimate round-trip delay.
                            </p>

                            <p>
                                A failed ping does not automatically prove the host is offline. Firewalls may block echo traffic while allowing application services.
                            </p>
                        `,

                        body: `
                            <h2>Basic Demonstration</h2>

                            <p>
                                Both Windows and Linux provide a \`ping\` command, though option syntax differs. Always test systems you are authorized to interact with.
                            </p>

                            <pre class="lesson-code-block">Windows: ping 192.168.1.1
Linux:   ping -c 4 192.168.1.1</pre>

                            <h2>Interpreting Output</h2>

                            <p>
                                Successful replies show the responding address and timing information. Packet loss may indicate congestion, filtering, an unreachable system or other network conditions. High round-trip time can indicate distance, congestion or processing delay.
                            </p>

                            <h2>Troubleshooting Sequence</h2>

                            <p>
                                A useful sequence is to ping the local loopback, local interface, default gateway and then a remote address. This helps narrow down where connectivity fails.
                            </p>

                            <pre class="lesson-code-block">127.0.0.1
   -> local IP
   -> default gateway
   -> remote IP
   -> remote hostname</pre>

                            <h2>Security Caution</h2>

                            <p>
                                Ping sweeps can be used to identify live systems, but defenders also use ping for legitimate monitoring. An observed echo request alone is not evidence of compromise.
                            </p>
                        `,

                        keyConcepts: [
                            {
                                title: "Ping",
                                description: "Diagnostic utility using ICMP echo messages."
                            },
                            {
                                title: "Round-Trip Time",
                                description: "Time for a request to reach a destination and a reply to return."
                            },
                            {
                                title: "Packet Loss",
                                description: "Expected responses that are not observed."
                            },
                            {
                                title: "Reachability",
                                description: "Whether a destination can be contacted through the network path."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "If ping fails but HTTPS works, what is a likely explanation?",

                                options: [
                                    "The server has no IP address",
                                    "ICMP may be filtered while TCP 443 is allowed",
                                    "HTTPS uses no network",
                                    "DNS always blocks ping"
                                ],

                                answer:
                                    1
                            }
                        ]

                    }
                ),

                lesson(
                    "lesson-03",
                    "Traceroute",
                    "30 minutes",
                    {
                        subtitle:
                            "Understand how traceroute reveals intermediate routing hops.",

                        objectives: [
                            "Explain TTL/hop-limit concepts.",
                            "Understand how traceroute discovers hops.",
                            "Interpret incomplete traceroute results.",
                            "Use traceroute cautiously during troubleshooting."
                        ],

                        introduction: `
                            <h2>Traceroute</h2>

                            <p>
                                Traceroute attempts to reveal intermediate routers along a path by sending probes with progressively increasing packet lifetime values. In IPv4 this field is called TTL, while IPv6 uses Hop Limit.
                            </p>

                            <p>
                                When the lifetime reaches zero, a router can return an ICMP Time Exceeded message, allowing the sender to learn about that hop.
                            </p>
                        `,

                        body: `
                            <h2>Conceptual Flow</h2>

                            <p>
                                The first probe uses TTL 1 and expires at the first router. The next uses TTL 2 and can reach the second router, and so on until the destination or a configured limit is reached.
                            </p>

                            <pre class="lesson-code-block">TTL 1 -> Router A -> Time Exceeded
TTL 2 -> Router A -> Router B -> Time Exceeded
TTL 3 -> Router A -> Router B -> Destination</pre>

                            <h2>Different Implementations</h2>

                            <p>
                                Windows \`tracert\` traditionally uses ICMP probes, while many Unix-like \`traceroute\` implementations may use UDP by default. Options can alter probe types.
                            </p>

                            <pre class="lesson-code-block">Windows: tracert example.com
Linux:   traceroute example.com</pre>

                            <h2>Missing Hops</h2>

                            <p>
                                Asterisks or missing responses do not necessarily indicate a broken path. Routers may deprioritize or filter traceroute-related responses while continuing to forward normal traffic.
                            </p>

                            <h2>Security Perspective</h2>

                            <p>
                                Path information can help defenders understand routing and external dependencies. Publicly exposed topology information may also assist reconnaissance, so organizations balance diagnostic usefulness with policy.
                            </p>
                        `,

                        keyConcepts: [
                            {
                                title: "TTL",
                                description: "IPv4 packet lifetime field decremented by routers."
                            },
                            {
                                title: "Hop",
                                description: "An intermediate routed step."
                            },
                            {
                                title: "Time Exceeded",
                                description: "ICMP response generated when packet lifetime expires."
                            },
                            {
                                title: "Traceroute",
                                description: "Diagnostic method for discovering path hops."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "What allows traceroute to reveal successive routers?",

                                options: [
                                    "Increasing packet TTL/hop limits",
                                    "Changing DNS names",
                                    "Changing MAC vendors",
                                    "Opening port 65535"
                                ],

                                answer:
                                    0
                            }
                        ]

                    }
                ),

                lesson(
                    "lesson-04",
                    "ICMP Security Considerations",
                    "30 minutes",
                    {
                        subtitle:
                            "Balance ICMP filtering with network functionality and visibility.",

                        objectives: [
                            "Recognize reconnaissance uses of ICMP.",
                            "Understand ICMP-related abuse concepts.",
                            "Explain why blanket blocking can be harmful.",
                            "Apply risk-based ICMP policy."
                        ],

                        introduction: `
                            <h2>ICMP Security Considerations</h2>

                            <p>
                                ICMP can reveal useful network information and may be abused in reconnaissance or denial-of-service activity, but it also performs legitimate control functions.
                            </p>

                            <p>
                                The correct security approach is usually to understand which message types are required and enforce policy accordingly instead of assuming all ICMP is dangerous.
                            </p>
                        `,

                        body: `
                            <h2>Reconnaissance</h2>

                            <p>
                                Echo requests can help identify responsive systems. Time-exceeded responses can reveal path information. However, modern discovery also uses TCP, UDP and application protocols, so blocking ICMP does not make a network invisible.
                            </p>

                            <h2>Operational Need</h2>

                            <p>
                                Path MTU discovery and error reporting can depend on ICMP behaviour. Excessive filtering can create hard-to-diagnose application problems.
                            </p>

                            <h2>Monitoring</h2>

                            <p>
                                Security teams can baseline expected ICMP usage and alert on unusual volume, uncommon message types or patterns inconsistent with normal operations.
                            </p>
                        `,

                        keyConcepts: [
                            {
                                title: "Reconnaissance",
                                description: "Information gathering about systems and networks."
                            },
                            {
                                title: "Baseline",
                                description: "Expected normal behaviour used for comparison."
                            },
                            {
                                title: "Filtering",
                                description: "Allowing or denying traffic according to policy."
                            },
                            {
                                title: "Path MTU",
                                description: "Maximum packet size usable along a network path without problematic fragmentation."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Why can blocking all ICMP be undesirable?",

                                options: [
                                    "ICMP is required for HTTP syntax",
                                    "ICMP assigns MAC addresses",
                                    "It can interfere with diagnostics and useful control functions",
                                    "It automatically disables DNS"
                                ],

                                answer:
                                    2
                            }
                        ]

                    }
                )

            ]

        },


        {
            id:
                "module-07",

            number:
                7,

            title:
                "Routing and Network Communication",

            description:
                "Understand routers, gateways and routing tables.",

            labs:
                1,

            assessments:
                1,

            lessons: [

                lesson(
                    "lesson-01",
                    "What Is Routing?",
                    "30 minutes",
                    {
                        subtitle:
                            "Understand how routers choose paths between IP networks.",

                        objectives: [
                            "Define routing.",
                            "Explain route lookup at a high level.",
                            "Understand next hops and interfaces.",
                            "Recognize connected and learned routes."
                        ],

                        introduction: `
                            <h2>What Is Routing?</h2>

                            <p>
                                Routing is the process of forwarding IP packets between networks. A router examines the destination IP address and compares it against entries in a routing table.
                            </p>

                            <p>
                                Routes describe reachable prefixes and where packets for those prefixes should be sent. Routers normally prefer the most specific matching prefix.
                            </p>
                        `,

                        body: `
                            <h2>Routing Table Concept</h2>

                            <p>
                                A route may identify a destination prefix, next-hop address, outgoing interface and preference/metric. Directly connected networks are learned from configured interfaces, while other routes may be static or learned dynamically.
                            </p>

                            <pre class="lesson-code-block">10.10.10.0/24  directly connected
10.20.0.0/16    via 192.0.2.2
0.0.0.0/0       via 192.0.2.1</pre>

                            <h2>Longest Prefix Match</h2>

                            <p>
                                If both 10.0.0.0/8 and 10.20.30.0/24 match a destination of 10.20.30.50, the /24 route is more specific and is generally preferred for forwarding.
                            </p>

                            <h2>Security Perspective</h2>

                            <p>
                                Routing determines which paths are possible. Incorrect routes can expose networks, bypass inspection points or create outages. Security architecture therefore considers both firewall rules and underlying routing.
                            </p>
                        `,

                        keyConcepts: [
                            {
                                title: "Routing",
                                description: "Forwarding packets between IP networks."
                            },
                            {
                                title: "Route",
                                description: "Instruction describing how to reach a destination prefix."
                            },
                            {
                                title: "Next Hop",
                                description: "Router/address toward which a packet is forwarded."
                            },
                            {
                                title: "Longest Prefix Match",
                                description: "Selecting the most specific matching route."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "What information does a router primarily inspect to choose a route?",

                                options: [
                                    "HTTP cookie",
                                    "Source MAC vendor",
                                    "Destination IP address",
                                    "Username"
                                ],

                                answer:
                                    2
                            }
                        ]

                    }
                ),

                lesson(
                    "lesson-02",
                    "Default Gateways",
                    "30 minutes",
                    {
                        subtitle:
                            "Understand how hosts send traffic to destinations outside their local subnet.",

                        objectives: [
                            "Define a default gateway.",
                            "Explain when a host uses it.",
                            "Relate ARP to gateway delivery.",
                            "Troubleshoot gateway configuration."
                        ],

                        introduction: `
                            <h2>Default Gateways</h2>

                            <p>
                                A host's default gateway is normally a router interface on the local network used when the destination is not considered local and no more specific host route exists.
                            </p>

                            <p>
                                The host does not ARP for the remote Internet server's MAC address. Instead, it resolves the MAC address of the local gateway and sends the Ethernet frame to that router.
                            </p>
                        `,

                        body: `
                            <h2>Local vs Remote Example</h2>

                            <p>
                                Host 192.168.1.10/24 can deliver directly to 192.168.1.50. To reach 8.8.8.8, it sends the packet toward its default gateway, perhaps 192.168.1.1.
                            </p>

                            <pre class="lesson-code-block">Host:    192.168.1.10/24
Gateway: 192.168.1.1
Remote:  8.8.8.8

Ethernet destination = gateway MAC
IP destination       = 8.8.8.8</pre>

                            <h2>Failure Scenario</h2>

                            <p>
                                A host with the correct local IP and subnet mask but an incorrect default gateway may communicate locally yet fail to reach remote networks.
                            </p>

                            <h2>Security Perspective</h2>

                            <p>
                                Malicious or accidental gateway changes can redirect or disrupt traffic. DHCP security, endpoint configuration management and network monitoring help detect unauthorized network settings.
                            </p>
                        `,

                        keyConcepts: [
                            {
                                title: "Default Gateway",
                                description: "Router used for destinations without a more specific route."
                            },
                            {
                                title: "Local Subnet",
                                description: "Network directly reachable without an IP router."
                            },
                            {
                                title: "Remote Network",
                                description: "Network requiring routing."
                            },
                            {
                                title: "Gateway MAC",
                                description: "Layer 2 destination used to deliver a remote-bound packet to the local router."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "When does a host normally send a packet to its default gateway?",

                                options: [
                                    "When the destination is always itself",
                                    "When the destination is outside the local subnet and no more specific route exists",
                                    "Only for DNS",
                                    "Only for UDP"
                                ],

                                answer:
                                    1
                            }
                        ]

                    }
                ),

                lesson(
                    "lesson-03",
                    "Routing Tables",
                    "30 minutes",
                    {
                        subtitle:
                            "Read basic host and router routing-table information.",

                        objectives: [
                            "Identify destination prefixes in a routing table.",
                            "Understand default routes.",
                            "Recognize interfaces and metrics.",
                            "Use host routing commands."
                        ],

                        introduction: `
                            <h2>Routing Tables</h2>

                            <p>
                                Every IP host makes routing decisions, not only dedicated routers. A workstation usually has routes for directly connected networks, loopback/local behavior and a default route.
                            </p>

                            <p>
                                Viewing the routing table helps troubleshoot why traffic chooses a particular interface or gateway.
                            </p>
                        `,

                        body: `
                            <h2>Host Commands</h2>

                            <p>
                                On Windows, \`route print\` displays routing information. On Linux, \`ip route\` is commonly used.
                            </p>

                            <pre class="lesson-code-block">Windows: route print
Linux:   ip route</pre>

                            <h2>Linux Example</h2>

                            <p>
                                A line such as \`default via 192.168.1.1 dev eth0\` means unmatched destinations use gateway 192.168.1.1 through eth0. A connected route such as \`192.168.1.0/24 dev eth0\` identifies the local subnet.
                            </p>

                            <pre class="lesson-code-block">default via 192.168.1.1 dev eth0
192.168.1.0/24 dev eth0 proto kernel</pre>

                            <h2>Metrics</h2>

                            <p>
                                When multiple routes are otherwise comparable, administrative preference and metrics can influence path selection. Exact behavior depends on the operating system or routing protocol.
                            </p>

                            <h2>Security Use</h2>

                            <p>
                                Unexpected routes may indicate misconfiguration, VPN changes or malicious persistence. Analysts sometimes compare current routing tables with known-good configuration during incident response.
                            </p>
                        `,

                        keyConcepts: [
                            {
                                title: "Default Route",
                                description: "Fallback route, represented as 0.0.0.0/0 in IPv4."
                            },
                            {
                                title: "Metric",
                                description: "Value influencing preference among candidate routes."
                            },
                            {
                                title: "Interface",
                                description: "Local network endpoint used to transmit traffic."
                            },
                            {
                                title: "Routing Table",
                                description: "Set of routes used for forwarding decisions."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Which Linux command commonly displays the host routing table?",

                                options: [
                                    "ip neigh",
                                    "ip route",
                                    "arp -d",
                                    "whoami"
                                ],

                                answer:
                                    1
                            }
                        ]

                    }
                ),

                lesson(
                    "lesson-04",
                    "Static and Dynamic Routing",
                    "30 minutes",
                    {
                        subtitle:
                            "Compare manually configured routes with routes learned through routing protocols.",

                        objectives: [
                            "Define static routing.",
                            "Define dynamic routing.",
                            "Recognize common dynamic routing protocols.",
                            "Understand trade-offs between simplicity and adaptability."
                        ],

                        introduction: `
                            <h2>Static and Dynamic Routing</h2>

                            <p>
                                Static routes are configured manually and remain until changed or removed. Dynamic routing protocols allow routers to exchange reachability information and adapt to topology changes.
                            </p>

                            <p>
                                The right approach depends on network size, redundancy requirements and operational complexity.
                            </p>
                        `,

                        body: `
                            <h2>Static Routing</h2>

                            <p>
                                Static routes are predictable and simple for small or stable environments. They do not automatically discover alternative paths when topology changes unless additional mechanisms are configured.
                            </p>

                            <h2>Dynamic Routing</h2>

                            <p>
                                Protocols such as OSPF, IS-IS and BGP exchange routing information according to different scopes and algorithms. OSPF is common inside organizations, while BGP is fundamental to routing between autonomous systems on the Internet.
                            </p>

                            <h2>Security Considerations</h2>

                            <p>
                                Routing protocols require protection because unauthorized or incorrect route advertisements can redirect or disrupt traffic. Controls can include authentication features, filtering, neighbour restrictions and control-plane protections.
                            </p>
                        `,

                        keyConcepts: [
                            {
                                title: "Static Route",
                                description: "Manually configured route."
                            },
                            {
                                title: "Dynamic Routing",
                                description: "Automated route exchange between routers."
                            },
                            {
                                title: "OSPF",
                                description: "Interior routing protocol commonly used within organizations."
                            },
                            {
                                title: "BGP",
                                description: "Path-vector routing protocol central to inter-domain Internet routing."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Which protocol is fundamental to routing between autonomous systems on the Internet?",

                                options: [
                                    "ARP",
                                    "DHCP",
                                    "HTTP",
                                    "BGP"
                                ],

                                answer:
                                    3
                            }
                        ]

                    }
                ),

                lesson(
                    "lesson-05",
                    "Routing Security",
                    "30 minutes",
                    {
                        subtitle:
                            "Understand routing attacks, route filtering and resilient network design.",

                        objectives: [
                            "Recognize route hijacking concepts.",
                            "Understand route filtering.",
                            "Explain control-plane protection.",
                            "Relate routing resilience to cybersecurity."
                        ],

                        introduction: `
                            <h2>Routing Security</h2>

                            <p>
                                Routing is part of the network control plane. If incorrect routing information is accepted, traffic may be redirected, dropped or sent through unintended paths.
                            </p>

                            <p>
                                Routing security therefore focuses on controlling who can participate, validating accepted routes and monitoring unexpected topology changes.
                            </p>
                        `,

                        body: `
                            <h2>Internal Threats</h2>

                            <p>
                                Within an enterprise, unauthorized route advertisements or misconfigured routing can create traffic black holes or bypass planned security controls. Network devices should use authenticated management and tightly controlled routing adjacencies.
                            </p>

                            <h2>Internet Routing Risk</h2>

                            <p>
                                BGP historically relies heavily on trust between networks. Route leaks and hijacks can affect Internet reachability. Modern mitigations include prefix filtering and Resource Public Key Infrastructure (RPKI) based route-origin validation.
                            </p>

                            <h2>Monitoring</h2>

                            <p>
                                Operations teams monitor route changes, adjacency status and reachability. Sudden changes in path, prefixes or next hops may indicate faults or require security investigation.
                            </p>
                        `,

                        keyConcepts: [
                            {
                                title: "Control Plane",
                                description: "Network logic responsible for learning and maintaining forwarding information."
                            },
                            {
                                title: "Route Hijack",
                                description: "Unauthorized or incorrect advertisement attracting traffic."
                            },
                            {
                                title: "Prefix Filtering",
                                description: "Policy controlling which routes are accepted or advertised."
                            },
                            {
                                title: "RPKI",
                                description: "Infrastructure supporting cryptographic validation of route-origin authorization."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "What is the purpose of route filtering?",

                                options: [
                                    "Control which routing information is accepted or advertised",
                                    "Encrypt all web traffic",
                                    "Assign DHCP addresses",
                                    "Replace firewalls"
                                ],

                                answer:
                                    0
                            }
                        ]

                    }
                )

            ]

        },


        /* ===== CONTINUE WITH PART 3 BELOW THIS LINE ===== */

/* =========================================================
   NETWORKING FUNDAMENTALS — PART 3 OF 3

   IMPORTANT:
   Paste this immediately after PART 2.
   This part closes the modules array and course object.
========================================================= */

        {
            id:
                "module-08",

            number:
                8,

            title:
                "DNS and DHCP",

            description:
                "Understand domain-name resolution and automatic network configuration.",

            labs:
                1,

            assessments:
                1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Introduction to DNS",
                    "30 minutes",
                    {
                        subtitle:
                            "Understand how DNS maps names to network information.",

                        objectives: [
                            "Explain the purpose of DNS.",
                            "Understand recursive and authoritative roles.",
                            "Describe a basic resolution flow.",
                            "Recognize why DNS is important to security."
                        ],

                        introduction: `
                            <h2>Introduction to DNS</h2>

                            <p>
                                The Domain Name System provides a distributed naming system that allows users and applications to work with names such as \`example.com\` rather than remembering IP addresses.
                            </p>

                            <p>
                                DNS does more than map names to addresses. It stores multiple record types used for mail routing, service verification, delegation and other purposes.
                            </p>
                        `,

                        body: `
                            <h2>Resolution Flow</h2>

                            <p>
                                A client commonly sends a query to a recursive resolver. If the resolver does not already have a cached answer, it may query root, top-level-domain and authoritative DNS servers to obtain the relevant record.
                            </p>

                            <pre class="lesson-code-block">Client -> Recursive Resolver
             -> Root
             -> .com TLD
             -> Authoritative DNS
        <- final answer</pre>

                            <h2>Caching</h2>

                            <p>
                                Resolvers cache answers according to their TTL values, reducing latency and load. This means DNS changes may not appear instantly everywhere.
                            </p>

                            <h2>Security Perspective</h2>

                            <p>
                                DNS logs can reveal domains contacted by endpoints and are valuable during threat hunting. Malicious software may use DNS for command-and-control discovery, while phishing relies heavily on deceptive domain names.
                            </p>
                        `,

                        keyConcepts: [
                            {
                                title: "DNS",
                                description: "Distributed Domain Name System."
                            },
                            {
                                title: "Resolver",
                                description: "Service that performs or assists DNS lookups."
                            },
                            {
                                title: "Authoritative Server",
                                description: "Server responsible for definitive records in a DNS zone."
                            },
                            {
                                title: "Cache",
                                description: "Temporarily stored DNS answer."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "What is the primary purpose of DNS?",

                                options: [
                                    "Encrypt Ethernet frames",
                                    "Resolve names and other DNS data",
                                    "Assign MAC addresses",
                                    "Create TCP handshakes"
                                ],

                                answer:
                                    1
                            }
                        ]

                    }
                ),

                lesson(
                    "lesson-02",
                    "DNS Records",
                    "30 minutes",
                    {
                        subtitle:
                            "Recognize common DNS record types and what they represent.",

                        objectives: [
                            "Explain A and AAAA records.",
                            "Understand CNAME and MX records.",
                            "Recognize NS and TXT records.",
                            "Interpret basic DNS lookup results."
                        ],

                        introduction: `
                            <h2>DNS Records</h2>

                            <p>
                                DNS zones contain records with specific types. Learning common record types helps administrators troubleshoot services and helps security analysts interpret reconnaissance and monitoring data.
                            </p>

                            <p>
                                Different records answer different questions: where a host lives, which servers handle mail, which names are aliases and which servers are authoritative for a zone.
                            </p>
                        `,

                        body: `
                            <h2>Common Records</h2>

                            <p>
                                A records map names to IPv4 addresses. AAAA records map names to IPv6 addresses. CNAME creates an alias to another canonical name. MX identifies mail exchangers. NS identifies authoritative name servers. TXT stores arbitrary text used by technologies such as SPF and domain verification.
                            </p>

                            <pre class="lesson-code-block">A     -> IPv4 address
AAAA  -> IPv6 address
CNAME -> alias
MX    -> mail exchanger
NS    -> name server
TXT   -> text/policy data</pre>

                            <h2>Lookup Demonstration</h2>

                            <p>
                                \`nslookup\` is available on many systems, while \`dig\` is common on Linux and administrative environments.
                            </p>

                            <pre class="lesson-code-block">nslookup example.com
dig example.com A
dig example.com MX</pre>

                            <h2>Security Context</h2>

                            <p>
                                DNS records can expose public infrastructure by design. Defensive teams should know what their domains publish, remove stale records and monitor unauthorized changes.
                            </p>
                        `,

                        keyConcepts: [
                            {
                                title: "A Record",
                                description: "Maps a name to an IPv4 address."
                            },
                            {
                                title: "AAAA Record",
                                description: "Maps a name to an IPv6 address."
                            },
                            {
                                title: "MX Record",
                                description: "Identifies mail servers for a domain."
                            },
                            {
                                title: "CNAME",
                                description: "Aliases one DNS name to another."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Which DNS record identifies mail exchangers?",

                                options: [
                                    "A",
                                    "TXT",
                                    "MX",
                                    "PTR"
                                ],

                                answer:
                                    2
                            }
                        ]

                    }
                ),

                lesson(
                    "lesson-03",
                    "DNS Resolution",
                    "30 minutes",
                    {
                        subtitle:
                            "Follow a DNS query from a client through recursive resolution.",

                        objectives: [
                            "Describe stub-resolver behavior.",
                            "Understand iterative queries conceptually.",
                            "Explain DNS caching and TTL.",
                            "Recognize resolution failure points."
                        ],

                        introduction: `
                            <h2>DNS Resolution</h2>

                            <p>
                                When an application needs a name resolved, it normally asks the operating system's resolver, which sends a query to a configured DNS resolver. That resolver may already know the answer from cache or may need to obtain it.
                            </p>

                            <p>
                                DNS resolution involves delegation: root servers direct queries toward top-level-domain servers, which direct them toward authoritative servers for the requested domain.
                            </p>
                        `,

                        body: `
                            <h2>Step-by-Step Example</h2>

                            <p>
                                To resolve \`www.example.com\`, a resolver can learn which servers handle \`.com\`, then which authoritative servers handle \`example.com\`, then ask an authoritative server for the \`www\` record.
                            </p>

                            <pre class="lesson-code-block">1 Client asks resolver
2 Resolver checks cache
3 Resolver asks root
4 Resolver asks .com TLD
5 Resolver asks example.com authoritative server
6 Resolver returns answer to client</pre>

                            <h2>TTL</h2>

                            <p>
                                Each cached record has a time-to-live that controls how long it may normally be reused before being refreshed. Short TTLs can speed changes but increase query load; long TTLs improve caching but slow propagation of changes.
                            </p>

                            <h2>Troubleshooting</h2>

                            <p>
                                If an IP address works but a hostname does not, DNS becomes a primary suspect. Check configured resolvers, query responses, search domains and whether the record exists.
                            </p>
                        `,

                        keyConcepts: [
                            {
                                title: "Stub Resolver",
                                description: "Client-side component asking a recursive DNS resolver."
                            },
                            {
                                title: "Delegation",
                                description: "DNS hierarchy directing queries to authoritative servers."
                            },
                            {
                                title: "TTL",
                                description: "Time-to-live controlling caching duration."
                            },
                            {
                                title: "NXDOMAIN",
                                description: "DNS response indicating the queried name does not exist."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "What does DNS TTL primarily influence?",

                                options: [
                                    "How long a response may be cached",
                                    "TCP window size",
                                    "Ethernet speed",
                                    "Password length"
                                ],

                                answer:
                                    0
                            }
                        ]

                    }
                ),

                lesson(
                    "lesson-04",
                    "Understanding DHCP",
                    "30 minutes",
                    {
                        subtitle:
                            "Understand how hosts automatically receive IP configuration.",

                        objectives: [
                            "Explain DHCP's purpose.",
                            "Describe DORA at a high level.",
                            "Recognize common DHCP-provided settings.",
                            "Understand leases."
                        ],

                        introduction: `
                            <h2>Understanding DHCP</h2>

                            <p>
                                Dynamic Host Configuration Protocol automatically supplies clients with network settings such as IP address, subnet mask, default gateway and DNS servers.
                            </p>

                            <p>
                                Without DHCP, administrators would need to configure many client systems manually, increasing operational effort and the chance of duplicate or incorrect settings.
                            </p>
                        `,

                        body: `
                            <h2>DORA Process</h2>

                            <p>
                                A common simplified DHCPv4 exchange is Discover, Offer, Request and Acknowledge. The client initially lacks normal addressing, so broadcast communication is involved during early stages.
                            </p>

                            <pre class="lesson-code-block">Client                     DHCP Server
Discover  -------------------->
          <---------------- Offer
Request   -------------------->
          <-------------- Acknowledge</pre>

                            <h2>Lease Concept</h2>

                            <p>
                                DHCP addresses are usually leased for a period rather than permanently assigned. Clients renew leases before they expire.
                            </p>

                            <h2>Configuration Provided</h2>

                            <p>
                                DHCP options can provide default gateway, DNS servers, domain search information, NTP servers and other network parameters depending on the environment.
                            </p>

                            <h2>Security Perspective</h2>

                            <p>
                                A rogue DHCP server can provide malicious gateway or DNS settings. Enterprise networks may use DHCP snooping and switch-port controls to reduce this risk.
                            </p>
                        `,

                        keyConcepts: [
                            {
                                title: "DHCP",
                                description: "Protocol for automated host network configuration."
                            },
                            {
                                title: "Lease",
                                description: "Temporary assignment of configuration."
                            },
                            {
                                title: "DORA",
                                description: "Discover, Offer, Request, Acknowledge."
                            },
                            {
                                title: "DHCP Snooping",
                                description: "Switch security feature distinguishing trusted DHCP information."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "What is the normal simplified DHCPv4 sequence?",

                                options: [
                                    "Offer, Discover, ACK, Request",
                                    "Discover, Offer, Request, Acknowledge",
                                    "SYN, SYN-ACK, ACK",
                                    "Query, Referral, Answer"
                                ],

                                answer:
                                    1
                            }
                        ]

                    }
                ),

                lesson(
                    "lesson-05",
                    "DNS and DHCP Security",
                    "30 minutes",
                    {
                        subtitle:
                            "Recognize DNS and DHCP attacks and defensive monitoring opportunities.",

                        objectives: [
                            "Understand DNS spoofing/cache-poisoning concepts.",
                            "Recognize rogue DHCP risk.",
                            "Explain the importance of protected resolvers.",
                            "Use logs to investigate configuration and resolution activity."
                        ],

                        introduction: `
                            <h2>DNS and DHCP Security</h2>

                            <p>
                                DNS and DHCP are foundational services. If attackers can manipulate name resolution or network configuration, they may redirect users, intercept traffic or disrupt connectivity.
                            </p>

                            <p>
                                Security teams therefore treat DNS and DHCP infrastructure as critical services requiring hardened administration, logging and restricted access.
                            </p>
                        `,

                        body: `
                            <h2>DNS Risks</h2>

                            <p>
                                Threats include unauthorized DNS record changes, malicious domains, DNS tunneling, spoofed responses and cache-poisoning attempts. Modern mitigations may include DNSSEC validation, protected recursive resolvers, access controls and threat-intelligence filtering.
                            </p>

                            <h2>DHCP Risks</h2>

                            <p>
                                A rogue DHCP service can assign incorrect gateways or DNS servers. DHCP starvation attacks attempt to exhaust available leases. Switch security features such as DHCP snooping can help establish trusted DHCP ports and bindings.
                            </p>

                            <h2>Monitoring Example</h2>

                            <p>
                                If several endpoints suddenly start using an unexpected DNS resolver, analysts should investigate DHCP configuration, endpoint settings and network traffic to determine whether the change was authorized.
                            </p>
                        `,

                        keyConcepts: [
                            {
                                title: "DNSSEC",
                                description: "Extensions enabling cryptographic validation of DNS data origin/integrity."
                            },
                            {
                                title: "DNS Tunneling",
                                description: "Encoding data within DNS queries/responses for covert communication."
                            },
                            {
                                title: "Rogue DHCP",
                                description: "Unauthorized DHCP service providing configuration."
                            },
                            {
                                title: "DHCP Starvation",
                                description: "Attempt to consume available DHCP leases."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Which feature can help block DHCP responses from untrusted switch ports?",

                                options: [
                                    "HTTP Strict Transport Security",
                                    "ARP cache timeout",
                                    "DHCP snooping",
                                    "TCP delayed ACK"
                                ],

                                answer:
                                    2
                            }
                        ]

                    }
                )

            ]

        },


        {
            id:
                "module-09",

            number:
                9,

            title:
                "HTTP, HTTPS and Web Traffic",

            description:
                "Understand web traffic, HTTP requests, responses and TLS.",

            labs:
                1,

            assessments:
                1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Introduction to HTTP",
                    "30 minutes",
                    {
                        subtitle:
                            "Understand the application protocol used for web requests and responses.",

                        objectives: [
                            "Explain HTTP's request-response model.",
                            "Recognize URLs and headers.",
                            "Understand statelessness conceptually.",
                            "Relate HTTP to TCP or newer transports."
                        ],

                        introduction: `
                            <h2>Introduction to HTTP</h2>

                            <p>
                                Hypertext Transfer Protocol is an application-layer protocol used to exchange web resources and API data. A client sends a request and a server returns a response.
                            </p>

                            <p>
                                Traditional HTTP/1.1 and HTTP/2 commonly run over TCP. HTTP/3 uses QUIC over UDP. HTTPS means HTTP communication protected by TLS.
                            </p>
                        `,

                        body: `
                            <h2>Request-Response</h2>

                            <p>
                                A request identifies a method, target and headers, possibly followed by a body. A response contains a status code, headers and optionally a response body.
                            </p>

                            <pre class="lesson-code-block">GET /index.html HTTP/1.1
Host: example.com
User-Agent: Browser

HTTP/1.1 200 OK
Content-Type: text/html</pre>

                            <h2>Statelessness</h2>

                            <p>
                                HTTP itself treats requests independently. Web applications add state through cookies, tokens, server-side sessions and other application mechanisms.
                            </p>

                            <h2>Security Perspective</h2>

                            <p>
                                Because web applications expose functionality through HTTP, analysts often inspect methods, paths, status codes, hostnames and user agents. Sensitive HTTP traffic should be protected with HTTPS rather than sent in plaintext.
                            </p>
                        `,

                        keyConcepts: [
                            {
                                title: "HTTP",
                                description: "Application protocol for web communication."
                            },
                            {
                                title: "Request",
                                description: "Message sent by a client to a server."
                            },
                            {
                                title: "Response",
                                description: "Message returned by a server."
                            },
                            {
                                title: "HTTPS",
                                description: "HTTP protected using TLS."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "What does an HTTP client normally send first in a request-response exchange?",

                                options: [
                                    "Request",
                                    "Response",
                                    "ARP reply",
                                    "DHCP offer"
                                ],

                                answer:
                                    0
                            }
                        ]

                    }
                ),

                lesson(
                    "lesson-02",
                    "HTTP Requests and Responses",
                    "30 minutes",
                    {
                        subtitle:
                            "Read the structure of HTTP messages and identify security-relevant fields.",

                        objectives: [
                            "Identify request line elements.",
                            "Recognize important headers.",
                            "Interpret response status and content.",
                            "Understand message bodies."
                        ],

                        introduction: `
                            <h2>HTTP Requests and Responses</h2>

                            <p>
                                HTTP messages carry metadata in headers and content in optional bodies. Security tools such as proxies, web application firewalls and browser developer tools expose these fields for analysis.
                            </p>

                            <p>
                                Understanding the message structure is essential before studying web vulnerabilities because attacks and defenses often manipulate particular headers, parameters or body content.
                            </p>
                        `,

                        body: `
                            <h2>Request Example</h2>

                            <p>
                                A POST request may send data to an application endpoint. Headers describe the target host, content type, cookies and other context.
                            </p>

                            <pre class="lesson-code-block">POST /login HTTP/1.1
Host: portal.example
Content-Type: application/x-www-form-urlencoded
Content-Length: 31

username=student&password=...</pre>

                            <h2>Response Example</h2>

                            <p>
                                The server responds with a status code and headers. A login might create a session using a Set-Cookie header.
                            </p>

                            <pre class="lesson-code-block">HTTP/1.1 302 Found
Location: /dashboard
Set-Cookie: session=abc123; Secure; HttpOnly</pre>

                            <h2>Security-Relevant Headers</h2>

                            <p>
                                Headers such as Host, Authorization, Cookie, Set-Cookie, Origin, Content-Type and security-policy headers can be important during troubleshooting and defensive analysis.
                            </p>

                            <h2>Demonstration</h2>

                            <p>
                                Browser developer tools provide a safe way to inspect requests generated by sites you are using. The Network tab displays URLs, methods, status codes, timing and headers.
                            </p>
                        `,

                        keyConcepts: [
                            {
                                title: "Header",
                                description: "HTTP metadata field."
                            },
                            {
                                title: "Body",
                                description: "Optional message content."
                            },
                            {
                                title: "Cookie",
                                description: "Browser-stored value commonly used for session or application state."
                            },
                            {
                                title: "Status Code",
                                description: "Numeric result category in an HTTP response."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Which response header is commonly used to create or update a browser cookie?",

                                options: [
                                    "Host",
                                    "User-Agent",
                                    "Set-Cookie",
                                    "Accept"
                                ],

                                answer:
                                    2
                            }
                        ]

                    }
                ),

                lesson(
                    "lesson-03",
                    "HTTP Methods and Status Codes",
                    "30 minutes",
                    {
                        subtitle:
                            "Understand common HTTP methods and response-code categories.",

                        objectives: [
                            "Recognize GET, POST, PUT, PATCH and DELETE.",
                            "Understand safe/idempotent concepts at a high level.",
                            "Interpret 2xx, 3xx, 4xx and 5xx classes.",
                            "Use status codes during troubleshooting."
                        ],

                        introduction: `
                            <h2>HTTP Methods and Status Codes</h2>

                            <p>
                                HTTP methods describe the intended action of a request, while status codes communicate the server's result. APIs often rely heavily on these semantics.
                            </p>

                            <p>
                                Applications may implement methods differently, so security testing must consider actual application behaviour rather than assuming the method name guarantees access control.
                            </p>
                        `,

                        body: `
                            <h2>Common Methods</h2>

                            <p>
                                GET retrieves a representation, POST often submits data or triggers processing, PUT commonly replaces a resource, PATCH partially updates it and DELETE requests removal. HEAD requests headers without a normal response body.
                            </p>

                            <pre class="lesson-code-block">GET    /users/42
POST   /users
PUT    /users/42
PATCH  /users/42
DELETE /users/42</pre>

                            <h2>Status Classes</h2>

                            <p>
                                2xx indicates successful handling, 3xx redirection, 4xx client/request problems and 5xx server-side failure. Common examples include 200 OK, 301/302 redirect, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found and 500 Internal Server Error.
                            </p>

                            <pre class="lesson-code-block">200 OK
302 Found
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
500 Internal Server Error</pre>

                            <h2>Security Perspective</h2>

                            <p>
                                A 403 response may show that a resource exists but access is denied, while repeated 401 or 403 responses could represent legitimate mistakes or probing. Logs should be interpreted with user, source and application context.
                            </p>
                        `,

                        keyConcepts: [
                            {
                                title: "GET",
                                description: "HTTP method commonly used to retrieve data."
                            },
                            {
                                title: "POST",
                                description: "Method commonly used to submit data or trigger processing."
                            },
                            {
                                title: "4xx",
                                description: "Status-code class indicating client/request errors."
                            },
                            {
                                title: "5xx",
                                description: "Status-code class indicating server errors."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Which HTTP status code normally means 'Not Found'?",

                                options: [
                                    "200",
                                    "302",
                                    "403",
                                    "404"
                                ],

                                answer:
                                    3
                            }
                        ]

                    }
                ),

                lesson(
                    "lesson-04",
                    "HTTPS and TLS",
                    "30 minutes",
                    {
                        subtitle:
                            "Understand how TLS protects web traffic and authenticates servers.",

                        objectives: [
                            "Explain what HTTPS adds to HTTP.",
                            "Understand encryption, integrity and certificate validation.",
                            "Describe a TLS handshake conceptually.",
                            "Recognize certificate warnings as security signals."
                        ],

                        introduction: `
                            <h2>HTTPS and TLS</h2>

                            <p>
                                HTTPS is HTTP carried over Transport Layer Security. TLS protects data confidentiality and integrity in transit and normally authenticates the server using digital certificates.
                            </p>

                            <p>
                                TLS does not make an application automatically secure. It protects the communication channel, while vulnerabilities such as broken authorization or insecure server logic may still exist.
                            </p>
                        `,

                        body: `
                            <h2>Certificate Validation</h2>

                            <p>
                                The browser checks whether the certificate is valid for the requested hostname, within its validity period and chained to a trusted certification authority according to configured trust rules.
                            </p>

                            <h2>Handshake Concept</h2>

                            <p>
                                Modern TLS handshakes negotiate cryptographic parameters, authenticate the server and establish shared session keys. After this, application data can be encrypted efficiently using symmetric cryptography.
                            </p>

                            <pre class="lesson-code-block">ClientHello -------------------->
           <--------------- ServerHello + Certificate
Key agreement / validation
Encrypted HTTP traffic follows</pre>

                            <h2>Security Indicators</h2>

                            <p>
                                Certificate warnings may indicate misconfiguration, interception or an untrusted certificate. Users should not blindly bypass them, especially when accessing sensitive services.
                            </p>

                            <h2>What TLS Does Not Solve</h2>

                            <p>
                                TLS does not prevent phishing on a valid HTTPS domain, stop server-side SQL injection or guarantee that the organization behind a domain is trustworthy. It secures the connection to the authenticated endpoint.
                            </p>
                        `,

                        keyConcepts: [
                            {
                                title: "TLS",
                                description: "Protocol protecting application traffic in transit."
                            },
                            {
                                title: "Certificate",
                                description: "Signed data binding identities such as hostnames to public keys."
                            },
                            {
                                title: "CA",
                                description: "Certification Authority trusted to issue or sign certificates."
                            },
                            {
                                title: "Session Key",
                                description: "Symmetric key material used to encrypt an established session."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "What does HTTPS primarily add to HTTP?",

                                options: [
                                    "A second IP address",
                                    "TLS protection for the communication channel",
                                    "A MAC-address firewall",
                                    "DHCP configuration"
                                ],

                                answer:
                                    1
                            }
                        ]

                    }
                ),

                lesson(
                    "lesson-05",
                    "Web Traffic Security",
                    "30 minutes",
                    {
                        subtitle:
                            "Analyze web traffic from a defensive cybersecurity perspective.",

                        objectives: [
                            "Recognize secure web-traffic controls.",
                            "Understand proxies and web filters.",
                            "Identify suspicious web patterns.",
                            "Relate network visibility to application security."
                        ],

                        introduction: `
                            <h2>Web Traffic Security</h2>

                            <p>
                                Web traffic represents a large portion of modern network communication, which makes it a major focus for monitoring and attack. Defenders use endpoint telemetry, DNS logs, proxies, firewalls and application logs to understand web activity.
                            </p>

                            <p>
                                Encrypted HTTPS protects content from ordinary network observers, but metadata such as destination addresses, DNS lookups and connection timing may still be available depending on the architecture.
                            </p>
                        `,

                        body: `
                            <h2>Forward Proxies</h2>

                            <p>
                                A forward proxy communicates with external services on behalf of clients. Organizations may use proxies to enforce policy, authenticate users, record destinations or apply malware scanning.
                            </p>

                            <h2>Reverse Proxies and WAFs</h2>

                            <p>
                                A reverse proxy sits in front of servers. A Web Application Firewall can inspect HTTP requests and apply application-aware rules, but it should complement secure application design rather than replace it.
                            </p>

                            <h2>Suspicious Patterns</h2>

                            <p>
                                Examples include high-volume requests to unusual paths, repeated authentication failures, unexpected user agents, connections to newly observed domains or large outbound uploads. None is automatically malicious without context.
                            </p>

                            <h2>Practical Demonstration</h2>

                            <p>
                                Use your browser's developer tools on a site you are authorized to access. Open the Network panel, reload the page and inspect the request method, hostname, path, status code and response content type.
                            </p>
                        `,

                        keyConcepts: [
                            {
                                title: "Forward Proxy",
                                description: "Intermediary acting on behalf of clients."
                            },
                            {
                                title: "Reverse Proxy",
                                description: "Intermediary acting on behalf of servers."
                            },
                            {
                                title: "WAF",
                                description: "Web Application Firewall inspecting application-layer web traffic."
                            },
                            {
                                title: "Metadata",
                                description: "Information about communication such as endpoints and timing, separate from content."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Where does a reverse proxy normally sit?",

                                options: [
                                    "Inside a keyboard",
                                    "Only between DNS root servers",
                                    "In front of one or more backend servers",
                                    "Inside an Ethernet frame"
                                ],

                                answer:
                                    2
                            }
                        ]

                    }
                )

            ]

        },


        {
            id:
                "module-10",

            number:
                10,

            title:
                "Network Security and Final Review",

            description:
                "Bring networking concepts together through network defense and traffic analysis.",

            labs:
                1,

            assessments:
                1,

            lessons: [

                lesson(
                    "lesson-01",
                    "Network Segmentation",
                    "30 minutes",
                    {
                        subtitle:
                            "Apply segmentation concepts to reduce unnecessary access and lateral movement.",

                        objectives: [
                            "Explain network segmentation.",
                            "Understand VLANs and routed security zones.",
                            "Design basic least-connectivity rules.",
                            "Recognize segmentation limitations."
                        ],

                        introduction: `
                            <h2>Network Segmentation</h2>

                            <p>
                                Network segmentation divides an environment into zones with controlled communication between them. The goal is not simply to create more subnets, but to enforce boundaries that reflect business and security requirements.
                            </p>

                            <p>
                                Segmentation can limit the impact of a compromised endpoint by reducing the systems it can directly reach.
                            </p>
                        `,

                        body: `
                            <h2>Example Architecture</h2>

                            <p>
                                Users, servers, databases, management systems, IoT devices and guest networks often have different trust requirements. Separating them allows different firewall and monitoring policies.
                            </p>

                            <pre class="lesson-code-block">Guest ----X---- Internal
Users --> Web Apps --> Databases
Admins --> Management Network</pre>

                            <h2>Microsegmentation</h2>

                            <p>
                                Traditional segmentation often occurs at network boundaries, while microsegmentation applies more granular policy between workloads, including systems within the same broader network or cloud environment.
                            </p>

                            <h2>Policy Principle</h2>

                            <p>
                                Start with required business flows. For example, application servers may connect to databases on a specific port, while ordinary user laptops should not have direct database access.
                            </p>

                            <h2>Verification</h2>

                            <p>
                                Segmentation should be tested and monitored. Configuration drift or overly broad rules can silently defeat the intended boundary.
                            </p>
                        `,

                        keyConcepts: [
                            {
                                title: "Segmentation",
                                description: "Division of systems into controlled network zones."
                            },
                            {
                                title: "Security Zone",
                                description: "Group of systems with similar trust or policy."
                            },
                            {
                                title: "Microsegmentation",
                                description: "Fine-grained workload-to-workload access control."
                            },
                            {
                                title: "Lateral Movement",
                                description: "Movement between systems after initial compromise."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "What is the main security purpose of network segmentation?",

                                options: [
                                    "Increase hostname length",
                                    "Limit unnecessary communication and reduce lateral movement",
                                    "Replace authentication",
                                    "Disable routing everywhere"
                                ],

                                answer:
                                    1
                            }
                        ]

                    }
                ),

                lesson(
                    "lesson-02",
                    "Firewalls",
                    "30 minutes",
                    {
                        subtitle:
                            "Understand firewall types, rule logic and stateful traffic filtering.",

                        objectives: [
                            "Explain what a firewall does.",
                            "Compare stateless and stateful filtering.",
                            "Understand basic rule criteria.",
                            "Recognize host and network firewalls."
                        ],

                        introduction: `
                            <h2>Firewalls</h2>

                            <p>
                                A firewall enforces policy about which network traffic is allowed or denied. Firewalls may operate on hosts, network appliances, cloud platforms or virtualized infrastructure.
                            </p>

                            <p>
                                Rules can examine addresses, ports, protocols, interfaces, connection state and sometimes application identity or user context.
                            </p>
                        `,

                        body: `
                            <h2>Rule Example</h2>

                            <p>
                                A simple rule might allow TCP 443 from a trusted client subnet to a web-server subnet while denying unnecessary direct access to database ports.
                            </p>

                            <pre class="lesson-code-block">ALLOW tcp 10.10.10.0/24 -> 10.10.20.10:443
DENY  ip  any -> 10.10.30.0/24</pre>

                            <h2>Stateful Filtering</h2>

                            <p>
                                A stateful firewall tracks flows and can automatically permit legitimate return traffic for established connections. Stateless ACLs evaluate packets more independently.
                            </p>

                            <h2>Rule Order and Scope</h2>

                            <p>
                                Firewall platforms differ, but overly broad rules such as 'allow any any' undermine segmentation. Rules should be specific, documented and periodically reviewed.
                            </p>

                            <h2>Defense in Depth</h2>

                            <p>
                                Firewalls reduce reachable attack surface but do not replace patching, authentication, encryption or secure application design.
                            </p>
                        `,

                        keyConcepts: [
                            {
                                title: "Firewall",
                                description: "Control enforcing traffic policy."
                            },
                            {
                                title: "Stateful Inspection",
                                description: "Tracking connection/flow state."
                            },
                            {
                                title: "ACL",
                                description: "Ordered or structured traffic-control rules."
                            },
                            {
                                title: "Default Deny",
                                description: "Policy where traffic is denied unless explicitly permitted."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "What is a benefit of stateful firewalling?",

                                options: [
                                    "It can track connection state and recognize legitimate return traffic",
                                    "It removes the need for IP addresses",
                                    "It replaces TLS certificates",
                                    "It automatically patches servers"
                                ],

                                answer:
                                    0
                            }
                        ]

                    }
                ),

                lesson(
                    "lesson-03",
                    "IDS and IPS",
                    "30 minutes",
                    {
                        subtitle:
                            "Understand detection and prevention systems used to analyze network traffic.",

                        objectives: [
                            "Differentiate IDS and IPS.",
                            "Understand signature and anomaly concepts.",
                            "Recognize false positives and false negatives.",
                            "Explain placement considerations."
                        ],

                        introduction: `
                            <h2>IDS and IPS</h2>

                            <p>
                                An Intrusion Detection System analyzes activity and generates alerts, while an Intrusion Prevention System is positioned to take blocking or prevention action based on policy. Products may combine both capabilities.
                            </p>

                            <p>
                                Detection can rely on signatures, protocol analysis, reputation, behavioural baselines and other techniques.
                            </p>
                        `,

                        body: `
                            <h2>IDS vs IPS</h2>

                            <p>
                                An IDS may receive mirrored traffic and alert without being inline. An IPS is commonly inline so it can block or alter traffic, which provides prevention capability but also creates availability considerations.
                            </p>

                            <pre class="lesson-code-block">IDS: Network ---> Switch ---> Destination
              \\-> mirrored copy -> IDS

IPS: Network ---> IPS ---> Destination</pre>

                            <h2>Detection Quality</h2>

                            <p>
                                A false positive is benign activity incorrectly flagged as malicious. A false negative is malicious activity that is not detected. Tuning aims to improve useful signal without hiding important events.
                            </p>

                            <h2>Encrypted Traffic</h2>

                            <p>
                                Encryption can limit payload inspection. Security teams may rely on endpoint telemetry, TLS metadata, controlled decryption in approved environments or application-layer logs.
                            </p>
                        `,

                        keyConcepts: [
                            {
                                title: "IDS",
                                description: "System that detects and alerts on suspicious activity."
                            },
                            {
                                title: "IPS",
                                description: "System capable of blocking activity according to detection policy."
                            },
                            {
                                title: "False Positive",
                                description: "Benign event incorrectly flagged."
                            },
                            {
                                title: "False Negative",
                                description: "Malicious event not detected."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "What primarily distinguishes an IPS from a passive IDS?",

                                options: [
                                    "IPS uses no network",
                                    "IDS always encrypts traffic",
                                    "IPS can take inline prevention action",
                                    "IDS replaces DNS"
                                ],

                                answer:
                                    2
                            }
                        ]

                    }
                ),

                lesson(
                    "lesson-04",
                    "Packet Analysis",
                    "35 minutes",
                    {
                        subtitle:
                            "Read basic packet captures and connect protocol fields to real communication.",

                        objectives: [
                            "Understand packet-capture purpose.",
                            "Recognize Ethernet, IP, TCP/UDP and application layers.",
                            "Use filters conceptually.",
                            "Interpret a basic conversation safely."
                        ],

                        introduction: `
                            <h2>Packet Analysis</h2>

                            <p>
                                Packet analysis captures network traffic so protocol fields can be inspected in detail. Tools such as Wireshark are widely used for troubleshooting, incident response and security research.
                            </p>

                            <p>
                                A packet capture can reveal how protocols are layered: Ethernet encapsulates IP, IP carries TCP/UDP/ICMP, and TCP or UDP may carry application protocols.
                            </p>
                        `,

                        body: `
                            <h2>Layered Packet Example</h2>

                            <p>
                                An HTTPS packet might contain an Ethernet destination/source MAC, IPv4 source/destination, TCP source/destination ports and encrypted TLS application data.
                            </p>

                            <pre class="lesson-code-block">Ethernet
  IPv4 10.0.0.10 -> 203.0.113.20
    TCP 53124 -> 443
      TLS encrypted data</pre>

                            <h2>Useful Filters</h2>

                            <p>
                                Wireshark display filters help narrow analysis. Examples include \`ip.addr == 10.0.0.10\`, \`tcp.port == 443\`, \`dns\`, or \`icmp\`. Capture only traffic you are authorized to inspect.
                            </p>

                            <pre class="lesson-code-block">ip.addr == 10.0.0.10
tcp.port == 443
dns
icmp</pre>

                            <h2>Follow the Evidence</h2>

                            <p>
                                A packet alone rarely tells the whole story. Analysts combine captures with host logs, process information, authentication events and network architecture.
                            </p>

                            <h2>Privacy and Authorization</h2>

                            <p>
                                Packet captures may contain credentials, personal data or confidential business information. Capture, store and share them only under appropriate authorization and data-handling rules.
                            </p>
                        `,

                        keyConcepts: [
                            {
                                title: "Packet Capture",
                                description: "Recorded network packets for analysis."
                            },
                            {
                                title: "Display Filter",
                                description: "Expression selecting packets to show in an analysis tool."
                            },
                            {
                                title: "Payload",
                                description: "Data carried by a protocol."
                            },
                            {
                                title: "Protocol Dissection",
                                description: "Interpreting packet fields according to protocol definitions."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Which Wireshark display filter would focus on DNS traffic?",

                                options: [
                                    "http.cookie",
                                    "route print",
                                    "arp -a",
                                    "dns"
                                ],

                                answer:
                                    3
                            }
                        ]

                    }
                ),

                lesson(
                    "lesson-05",
                    "Networking Fundamentals Review",
                    "30 minutes",
                    {
                        subtitle:
                            "Connect addressing, transport, routing, naming and security into one end-to-end communication flow.",

                        objectives: [
                            "Review the major course concepts.",
                            "Trace a web connection from name resolution to application traffic.",
                            "Recognize where security controls operate.",
                            "Prepare for further networking and cybersecurity study."
                        ],

                        introduction: `
                            <h2>Networking Fundamentals Review</h2>

                            <p>
                                Networking becomes easier when individual concepts are connected into one story. Consider what happens when a user on a LAN opens an HTTPS website by name.
                            </p>

                            <p>
                                The process can involve DHCP configuration, DNS resolution, ARP, Ethernet switching, default-gateway routing, IP forwarding, TCP or QUIC transport, TLS protection and HTTP application messages.
                            </p>
                        `,

                        body: `
                            <h2>End-to-End Walkthrough</h2>

                            <p>
                                A laptop obtains an IP address, subnet mask, gateway and DNS resolver through DHCP. The browser asks DNS for the website's address. Because the destination is remote, the host resolves the gateway's MAC using ARP, sends an Ethernet frame to the router, and routers forward the IP packet toward the destination.
                            </p>

                            <pre class="lesson-code-block">DHCP -> host configuration
DNS  -> hostname to address
ARP  -> gateway MAC
IP   -> routed delivery
TCP/QUIC -> transport
TLS  -> protected session
HTTP -> web request/response</pre>

                            <h2>Where Security Appears</h2>

                            <p>
                                Firewalls control permitted flows, IDS/IPS systems monitor traffic, segmentation limits communication, DNS monitoring reveals domain activity, endpoint security associates connections with processes and TLS protects application data in transit.
                            </p>

                            <h2>Troubleshooting Mindset</h2>

                            <p>
                                Work from evidence and layers. Confirm local configuration, determine whether the destination is local or remote, test gateway reachability, verify DNS, examine routes and then inspect transport/application behaviour.
                            </p>

                            <h2>Next Steps</h2>

                            <p>
                                This foundation prepares you for Linux networking tools, network scanning in authorized labs, packet analysis, firewall administration, SOC monitoring and penetration-testing methodology.
                            </p>
                        `,

                        keyConcepts: [
                            {
                                title: "End-to-End Flow",
                                description: "Complete sequence of protocols involved in a communication."
                            },
                            {
                                title: "Defense in Depth",
                                description: "Using multiple complementary security controls."
                            },
                            {
                                title: "Troubleshooting",
                                description: "Systematic isolation of the source of a problem."
                            },
                            {
                                title: "Network Visibility",
                                description: "Data that helps defenders understand network communication."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Which sequence best represents a typical HTTPS connection by hostname?",

                                options: [
                                    "ARP, DHCP, delete IP, HTTP",
                                    "DNS resolution, routed transport connection, TLS, HTTP",
                                    "HTTP, remove gateway, DNSSEC only",
                                    "MAC spoofing, BGP, DHCP release"
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
