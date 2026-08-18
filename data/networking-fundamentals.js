/* =========================================================
   CWS ACADEMY
   NETWORKING FUNDAMENTALS
   COMPLETE COURSE • CWS CURRICULUM STANDARD

   Teaching standard used throughout:
   What -> Why -> How -> Examples -> Security -> Troubleshooting
   -> Recap -> Knowledge Check -> Next Step
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
        "Networking Fundamentals teaches how devices communicate from the local network to the Internet using a structured CWS learning standard. Every major topic explains what the technology is, why it exists, how it works, worked examples, troubleshooting, cybersecurity relevance and knowledge checks before students progress. The course covers addressing, subnetting, Ethernet, ARP, TCP, UDP, ICMP, routing, DNS, DHCP, HTTP, HTTPS, packet analysis and network-defense concepts.",

    duration:
        "50–65 Hours",

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
                "Understand what networks are, why they exist, how devices communicate, the roles of common network devices and how layered models explain network communication.",

            labs:
                0,

            assessments:
                1,

            lessons: [

                lesson(
                    "lesson-01",
                    "What Is a Computer Network?",
                    "45 minutes",
                    {
                        subtitle:
                            "Learn what a network is, why networks exist, how devices exchange information and why networking knowledge is essential in cybersecurity.",

                        objectives: [
                            "Define a computer network in plain language.",
                            "Explain why networks are used in homes and organizations.",
                            "Identify common network components and resources.",
                            "Distinguish clients, servers, peers and network services.",
                            "Describe a simple end-to-end communication example.",
                            "Explain why understanding normal network traffic matters in cybersecurity."
                        ],

                        introduction: `
                            <h2>What Is a Computer Network?</h2>

                            <p>
                                A <strong>computer network</strong> is a group of devices that are connected so they can exchange information and share services or resources.
                                The devices may be computers, phones, servers, printers, cameras, routers, switches, virtual machines, cloud systems or many other types of equipment.
                            </p>

                            <p>
                                For communication to work, the devices must follow agreed rules. These rules are called <strong>protocols</strong>.
                                Protocols define things such as how devices identify one another, how data is formatted, how a connection is created and what should happen when information is lost or arrives incorrectly.
                            </p>

                            <div class="lesson-callout">
                                <div class="lesson-callout-icon">
                                    <i class="fa-solid fa-lightbulb"></i>
                                </div>

                                <div>
                                    <strong>Simple idea</strong>
                                    <p>
                                        A network is similar to a transport system. Devices are destinations, addresses identify where information should go, network devices help move the information and protocols define the rules everyone follows.
                                    </p>
                                </div>
                            </div>
                        `,

                        body: `
                            <h2>Why Do Networks Exist?</h2>

                            <p>
                                Without networks, each computer would operate mainly as an isolated system. Moving information between devices would require manual methods such as removable storage.
                                Networks allow systems to communicate automatically and make shared services possible.
                            </p>

                            <p>
                                Common reasons for building networks include:
                            </p>

                            <ul>
                                <li>Sharing Internet access.</li>
                                <li>Accessing websites and cloud applications.</li>
                                <li>Sending email and instant messages.</li>
                                <li>Sharing files and folders.</li>
                                <li>Accessing printers and other shared devices.</li>
                                <li>Connecting users to business applications and databases.</li>
                                <li>Providing centralized authentication and identity services.</li>
                                <li>Backing up information to servers or cloud platforms.</li>
                                <li>Supporting monitoring, security and remote administration.</li>
                            </ul>

                            <h2>What Is Actually Being Shared?</h2>

                            <p>
                                When people say that devices are communicating, they are really exchanging <strong>data</strong>.
                                That data may represent a web page, an image, a password authentication request, a video stream, a file, a DNS query or almost any other digital information.
                            </p>

                            <p>
                                The data does not normally travel across a network as one large block. Networking protocols divide, identify, transport and rebuild information using structured units such as frames, packets and segments.
                                Later modules will explain these units in more detail.
                            </p>

                            <h2>Common Network Components</h2>

                            <p>
                                A basic network usually contains several types of components:
                            </p>

                            <pre class="lesson-code-block">End devices
  Laptop
  Desktop
  Smartphone
  Server
  Printer

Network devices
  Switch
  Router
  Wireless access point
  Firewall

Communication media
  Ethernet cable
  Fibre
  Wi-Fi / radio

Network services
  DNS
  DHCP
  Web
  Email
  Authentication</pre>

                            <p>
                                <strong>End devices</strong> create or consume information. <strong>Network devices</strong> help move or control that information.
                                <strong>Communication media</strong> provide the physical or wireless path, while <strong>network services</strong> provide useful functions to users and applications.
                            </p>

                            <h2>Clients and Servers</h2>

                            <p>
                                A <strong>client</strong> requests a service. A <strong>server</strong> provides a service.
                                These words describe roles rather than necessarily describing special hardware.
                            </p>

                            <div class="lesson-callout">
                                <div class="lesson-callout-icon">
                                    <i class="fa-solid fa-laptop"></i>
                                </div>

                                <div>
                                    <strong>Example</strong>
                                    <p>
                                        When your browser requests a web page, the browser acts as a client and the web server responds with the requested content.
                                    </p>
                                </div>
                            </div>

                            <p>
                                A single computer can perform both roles. Your laptop is normally a client when browsing the Internet, but if you start a web server or SSH service on the laptop, it can also provide services to other devices.
                            </p>

                            <h2>Peer-to-Peer Communication</h2>

                            <p>
                                Not every network follows a strict client-server design. In a <strong>peer-to-peer</strong> model, systems may communicate more directly and each system may both request and provide resources.
                                Small file-sharing environments are a common example.
                            </p>

                            <h2>How Does a Website Request Travel?</h2>

                            <p>
                                Consider a student opening <code>https://academy.example.com</code> in a browser.
                                Many networking technologies work together before the page appears.
                            </p>

                            <pre class="lesson-code-block">1. User enters academy.example.com
2. DNS helps find the server IP address
3. The computer decides whether the destination is local or remote
4. Local network information is prepared
5. A switch forwards local Ethernet traffic
6. A router forwards traffic toward remote networks
7. TCP can establish a reliable connection
8. TLS can protect the session
9. HTTP carries the web request and response
10. The browser displays the returned content</pre>

                            <p>
                                The important point is that networking is not one single protocol. Multiple technologies cooperate, with each one solving a specific part of the communication problem.
                            </p>

                            <pre class="lesson-code-block">Laptop
   |
   v
Switch
   |
   v
Router / Firewall
   |
   v
Internet
   |
   v
Web Server</pre>

                            <h2>What Happens If One Part Fails?</h2>

                            <p>
                                A network problem can appear at many points. For example:
                            </p>

                            <ul>
                                <li>A damaged cable may prevent the device from connecting at all.</li>
                                <li>An incorrect IP address may prevent communication with other networks.</li>
                                <li>A DNS problem may allow an IP address to work while a hostname fails.</li>
                                <li>A firewall may intentionally block a connection.</li>
                                <li>The remote server may be offline even though the network itself is working.</li>
                            </ul>

                            <p>
                                Good troubleshooting therefore starts by identifying <em>which part of communication is failing</em> instead of randomly changing settings.
                            </p>

                            <h2>Cybersecurity Perspective</h2>

                            <p>
                                Cybersecurity professionals must understand what normal communication looks like before they can recognize abnormal communication.
                                A security analyst may investigate unusual outbound connections, unexpected listening services, unknown remote IP addresses or traffic between systems that normally should not communicate.
                            </p>

                            <p>
                                A penetration tester also needs networking knowledge because security testing depends on understanding addresses, ports, protocols, routing and network boundaries.
                                Tools alone are not enough if the tester does not understand what the tool is observing.
                            </p>

                            <div class="lesson-callout">
                                <div class="lesson-callout-icon">
                                    <i class="fa-solid fa-shield-halved"></i>
                                </div>

                                <div>
                                    <strong>Security example</strong>
                                    <p>
                                        If a workstation suddenly creates repeated connections to an unfamiliar external server every 30 seconds, an analyst needs networking knowledge to determine the destination, protocol, port and possible purpose of the communication.
                                    </p>
                                </div>
                            </div>

                            <h2>Lesson Recap</h2>

                            <ul>
                                <li>A network allows connected devices to exchange information.</li>
                                <li>Protocols define the rules used for communication.</li>
                                <li>Clients request services and servers provide them.</li>
                                <li>Switches, routers and other devices help move or control traffic.</li>
                                <li>Multiple protocols normally work together during one user action.</li>
                                <li>Cybersecurity analysis depends on understanding normal network behaviour.</li>
                            </ul>

                            <h2>What Comes Next?</h2>

                            <p>
                                Now that you understand what a network is and why networks exist, the next lesson explains different network types such as LANs, WANs, WLANs, VPNs and VLANs.
                            </p>
                        `,

                        keyConcepts: [
                            {
                                title: "Network",
                                description: "A collection of connected devices that exchange information and share services or resources."
                            },
                            {
                                title: "Protocol",
                                description: "A defined set of rules that systems follow when communicating."
                            },
                            {
                                title: "Client",
                                description: "A system or application that requests a service."
                            },
                            {
                                title: "Server",
                                description: "A system or application that provides a service."
                            },
                            {
                                title: "Network Service",
                                description: "A function made available over a network, such as DNS, web, email or authentication."
                            },
                            {
                                title: "Peer-to-Peer",
                                description: "A communication model where systems may both request and provide resources directly."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Why are computer networks used?",
                                options: [
                                    "To isolate every device permanently",
                                    "To allow devices to communicate and share services or resources",
                                    "To remove the need for applications",
                                    "To make protocols unnecessary"
                                ],
                                answer:
                                    1
                            },
                            {
                                question:
                                    "Which statement best describes a protocol?",
                                options: [
                                    "A physical network cable",
                                    "A set of rules used for communication",
                                    "A type of computer monitor",
                                    "A replacement for an IP address"
                                ],
                                answer:
                                    1
                            },
                            {
                                question:
                                    "A browser requests a web page from a remote system. Which role is the browser performing?",
                                options: [
                                    "Router",
                                    "Server",
                                    "Client",
                                    "Firewall"
                                ],
                                answer:
                                    2
                            },
                            {
                                question:
                                    "A user can reach a website by IP address but not by hostname. Which service should be investigated first?",
                                options: [
                                    "DNS",
                                    "Printer sharing",
                                    "Bluetooth",
                                    "Display settings"
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Why is understanding normal network communication important in cybersecurity?",
                                options: [
                                    "Because every network connection is malicious",
                                    "Because security professionals need a baseline to recognize unusual or suspicious behaviour",
                                    "Because networking removes the need for endpoint security",
                                    "Because all attacks happen only at the physical layer"
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
                    "45 minutes",
                    {
                        subtitle:
                            "Understand common network types, why they exist, how their scope differs and how network boundaries affect security.",

                        objectives: [
                            "Define LAN, WLAN, WAN, PAN, VPN and VLAN.",
                            "Explain why organizations use different network types.",
                            "Distinguish geographic scope from logical segmentation.",
                            "Describe how traffic moves between local and remote networks.",
                            "Explain how network segmentation can reduce security risk.",
                            "Interpret simple network examples using the correct terminology."
                        ],

                        introduction: `
                            <h2>Why Do We Classify Networks?</h2>

                            <p>
                                Networks can be described according to their size, geographic scope, technology or purpose.
                                Terms such as <strong>LAN</strong>, <strong>WAN</strong>, <strong>WLAN</strong>, <strong>VPN</strong> and <strong>VLAN</strong> help administrators quickly describe how systems are connected.
                            </p>

                            <p>
                                These terms are also useful in cybersecurity because boundaries between networks are often places where security controls are applied.
                                For example, traffic leaving an internal company network for the Internet may pass through a firewall, proxy or monitoring system.
                            </p>
                        `,

                        body: `
                            <h2>Local Area Network — LAN</h2>

                            <p>
                                A <strong>Local Area Network</strong> connects devices within a relatively limited area such as a home, office, classroom, branch, floor or data centre.
                            </p>

                            <p>
                                LANs commonly use Ethernet switches and wireless access points.
                                Devices on the same Layer 2 network may be able to exchange Ethernet frames directly without sending the traffic to a router.
                            </p>

                            <pre class="lesson-code-block">Office LAN

PC-1 --------\
PC-2 --------- Switch ------- Router ------- Internet
Printer -----/
Server ------/</pre>

                            <p>
                                In this example, the switch connects devices inside the local network. The router provides a path from the local network to other networks.
                            </p>

                            <h2>Wireless LAN — WLAN</h2>

                            <p>
                                A <strong>WLAN</strong> is a Local Area Network that uses wireless technology such as Wi-Fi for client connectivity.
                                The wireless access point normally bridges wireless devices into the broader local network.
                            </p>

                            <pre class="lesson-code-block">Laptop )))
Phone  )))  Wireless AP ---- Switch ---- Router
Tablet )))</pre>

                            <p>
                                Wireless communication introduces additional security considerations because the signal travels through the air.
                                Organizations therefore use encryption, authentication and controlled wireless configuration to protect access.
                            </p>

                            <h2>Wide Area Network — WAN</h2>

                            <p>
                                A <strong>Wide Area Network</strong> connects networks across larger geographic distances.
                                An organization with offices in Cape Town, Johannesburg and Durban may use WAN technologies to connect the branch networks.
                            </p>

                            <p>
                                WAN connectivity can be provided through technologies such as leased circuits, MPLS, SD-WAN, site-to-site VPNs or encrypted connections over the public Internet.
                            </p>

                            <pre class="lesson-code-block">Cape Town LAN
      |
      v
   WAN / VPN
      |
      +---------------- Johannesburg LAN
      |
      +---------------- Durban LAN</pre>

                            <h2>Personal Area Network — PAN</h2>

                            <p>
                                A <strong>Personal Area Network</strong> covers a very short range around a person.
                                Bluetooth connections between a phone, smartwatch, keyboard or headphones are common examples.
                            </p>

                            <p>
                                Although PANs are small, they still have security considerations such as device pairing, discoverability and unauthorized connection attempts.
                            </p>

                            <h2>Virtual Private Network — VPN</h2>

                            <p>
                                A <strong>VPN</strong> creates a protected logical connection across another network.
                                It allows users or sites to exchange traffic through an encrypted tunnel even when the underlying transport is the public Internet.
                            </p>

                            <h3>Remote-access VPN example</h3>

                            <pre class="lesson-code-block">Employee Laptop
      |
      | encrypted VPN tunnel
      v
Internet
      |
      v
Company VPN Gateway
      |
      v
Internal Resources</pre>

                            <p>
                                The employee may physically be at home, but after authentication the VPN can provide controlled access to internal company resources.
                            </p>

                            <h2>Virtual LAN — VLAN</h2>

                            <p>
                                A <strong>VLAN</strong> is different from a VPN.
                                A VLAN logically separates Layer 2 broadcast domains on switching infrastructure.
                                Multiple VLANs may use the same physical switches while remaining logically separated.
                            </p>

                            <pre class="lesson-code-block">Physical switch

Ports 1-8   -> VLAN 10 Users
Ports 9-12  -> VLAN 20 Servers
Ports 13-16 -> VLAN 30 Guest</pre>

                            <p>
                                Devices in different VLANs normally require routing to communicate.
                                This provides an opportunity to apply firewall rules or access-control policies between segments.
                            </p>

                            <h2>Physical vs Logical Boundaries</h2>

                            <p>
                                A physical boundary is based on actual infrastructure or location.
                                A logical boundary is created by configuration.
                            </p>

                            <p>
                                Two computers may sit next to each other and connect to the same switch but belong to different VLANs.
                                Their physical distance is small, yet their logical network separation may require traffic to pass through a router or firewall.
                            </p>

                            <h2>Why Segmentation Matters</h2>

                            <p>
                                A <strong>flat network</strong> gives many devices broad ability to communicate with one another.
                                If one device is compromised, an attacker may have more opportunities to reach other systems.
                            </p>

                            <p>
                                Segmentation can separate:
                            </p>

                            <ul>
                                <li>User workstations.</li>
                                <li>Servers.</li>
                                <li>Administrative systems.</li>
                                <li>Guest Wi-Fi.</li>
                                <li>IoT devices.</li>
                                <li>Development and production environments.</li>
                            </ul>

                            <div class="lesson-callout">
                                <div class="lesson-callout-icon">
                                    <i class="fa-solid fa-shield-halved"></i>
                                </div>

                                <div>
                                    <strong>Security example</strong>
                                    <p>
                                        Guest Wi-Fi users should normally not be able to directly reach payroll servers or domain controllers. Placing guests in a separate network and applying restrictive routing or firewall rules reduces unnecessary exposure.
                                    </p>
                                </div>
                            </div>

                            <h2>Troubleshooting Example</h2>

                            <p>
                                Suppose a user can communicate with computers in the same VLAN but cannot reach a server in another VLAN.
                                This tells you that local Layer 2 communication may be functioning while inter-VLAN routing, firewall policy or the remote network may require investigation.
                            </p>

                            <h2>Lesson Recap</h2>

                            <ul>
                                <li>A LAN covers a local area.</li>
                                <li>A WLAN is a wireless LAN.</li>
                                <li>A WAN connects networks across larger distances.</li>
                                <li>A PAN covers a very short personal range.</li>
                                <li>A VPN creates a protected logical tunnel.</li>
                                <li>A VLAN creates logical Layer 2 separation.</li>
                                <li>Segmentation can reduce unnecessary communication paths and limit exposure.</li>
                            </ul>

                            <h2>What Comes Next?</h2>

                            <p>
                                Now that you can identify different network types, the next lesson explains the devices that move and control traffic inside and between those networks.
                            </p>
                        `,

                        keyConcepts: [
                            {
                                title: "LAN",
                                description: "A network covering a relatively small local area."
                            },
                            {
                                title: "WLAN",
                                description: "A wireless Local Area Network."
                            },
                            {
                                title: "WAN",
                                description: "A network connecting locations across larger distances."
                            },
                            {
                                title: "PAN",
                                description: "A very short-range network around a person or device."
                            },
                            {
                                title: "VPN",
                                description: "A protected logical connection carried across another network."
                            },
                            {
                                title: "VLAN",
                                description: "A logical Layer 2 network segment on switching infrastructure."
                            },
                            {
                                title: "Segmentation",
                                description: "Dividing a network into controlled areas to manage communication and reduce exposure."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "Which network type normally connects devices inside a single office or building?",
                                options: [
                                    "LAN",
                                    "WAN",
                                    "PAN only",
                                    "Internet backbone"
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "What is the main difference between a VLAN and a VPN?",
                                options: [
                                    "There is no difference",
                                    "A VLAN creates logical Layer 2 segmentation, while a VPN creates a protected connection across another network",
                                    "A VPN works only inside a switch",
                                    "A VLAN always encrypts Internet traffic"
                                ],
                                answer:
                                    1
                            },
                            {
                                question:
                                    "Why might an organization place guest Wi-Fi in a separate network?",
                                options: [
                                    "To give guests direct access to internal servers",
                                    "To reduce unnecessary access between guest devices and internal systems",
                                    "To remove the need for authentication",
                                    "To make all devices part of one flat network"
                                ],
                                answer:
                                    1
                            },
                            {
                                question:
                                    "Two systems are connected to the same physical switch but belong to different VLANs. What normally allows them to communicate?",
                                options: [
                                    "Routing between the VLANs",
                                    "A keyboard",
                                    "A DNS TXT record",
                                    "A monitor"
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "A company connects branch-office networks in different cities. Which term best describes the larger interconnection?",
                                options: [
                                    "PAN",
                                    "WAN",
                                    "Loopback",
                                    "Broadcast address"
                                ],
                                answer:
                                    1
                            }
                        ]
                    }
                ),

                lesson(
                    "lesson-03",
                    "Routers, Switches and Network Devices",
                    "50 minutes",
                    {
                        subtitle:
                            "Understand why switches, routers, access points, firewalls, proxies and other devices exist and how each device handles network traffic.",

                        objectives: [
                            "Explain why switches are used inside Ethernet networks.",
                            "Explain how a switch learns and forwards using MAC addresses.",
                            "Explain why routers are needed between IP networks.",
                            "Describe basic routing-table decision making.",
                            "Recognize the roles of access points, firewalls, proxies and load balancers.",
                            "Identify where security monitoring and control can be applied.",
                            "Distinguish Layer 2 forwarding from Layer 3 routing."
                        ],

                        introduction: `
                            <h2>Why Do Networks Need Specialized Devices?</h2>

                            <p>
                                End devices cannot efficiently communicate across large environments without infrastructure that helps move, direct and control traffic.
                                Network devices perform different jobs depending on the type of information they examine and the decision they need to make.
                            </p>

                            <p>
                                A switch usually helps devices communicate inside a local Ethernet network.
                                A router helps traffic move between IP networks.
                                A firewall controls permitted communication according to security policy.
                            </p>

                            <p>
                                Understanding these roles helps you answer an important troubleshooting question:
                                <strong>Which device should be responsible for this part of the communication?</strong>
                            </p>
                        `,

                        body: `
                            <h2>Switches — Connecting Devices Inside a LAN</h2>

                            <p>
                                An Ethernet <strong>switch</strong> connects devices inside a Layer 2 network.
                                It normally forwards Ethernet frames based on the destination <strong>MAC address</strong>.
                            </p>

                            <p>
                                A switch learns by examining the source MAC address of frames arriving on its ports.
                                It stores these learned addresses in a MAC address table.
                            </p>

                            <pre class="lesson-code-block">Example MAC table

MAC Address          Switch Port
00:11:22:AA:BB:01    Gi0/1
00:11:22:AA:BB:02    Gi0/2
00:11:22:AA:BB:03    Gi0/3</pre>

                            <h3>Worked example</h3>

                            <p>
                                PC-A is connected to port Gi0/1 and PC-B is connected to Gi0/2.
                                When PC-A sends a frame, the switch learns that PC-A's source MAC address is reachable through Gi0/1.
                            </p>

                            <p>
                                If the switch already knows PC-B's destination MAC address, it can forward the frame only toward Gi0/2 instead of sending it out every port.
                            </p>

                            <pre class="lesson-code-block">PC-A
  |
Gi0/1
  |
Switch ------- Gi0/2 ------- PC-B
  |
Gi0/3
  |
Printer</pre>

                            <h2>What If the Switch Does Not Know the Destination?</h2>

                            <p>
                                If the destination MAC address is unknown, the switch may flood the frame through relevant ports in the same VLAN, except the port on which it arrived.
                                Once the destination responds, the switch can learn its location.
                            </p>

                            <p>
                                Broadcast traffic is also forwarded through the broadcast domain according to VLAN boundaries.
                                This is one reason VLAN design matters.
                            </p>

                            <h2>Routers — Connecting IP Networks</h2>

                            <p>
                                A <strong>router</strong> forwards IP packets between different networks.
                                Instead of choosing a destination based primarily on a MAC address, the router examines the destination IP address and consults a <strong>routing table</strong>.
                            </p>

                            <pre class="lesson-code-block">Example routing table

Destination         Next Hop / Interface
192.168.10.0/24     directly connected
192.168.20.0/24     10.0.0.2
10.50.0.0/16        10.0.0.3
0.0.0.0/0           10.0.0.1</pre>

                            <p>
                                The route <code>0.0.0.0/0</code> is commonly used as a default route.
                                It can be used when no more specific route matches the destination.
                            </p>

                            <h3>Why a router is needed</h3>

                            <pre class="lesson-code-block">192.168.10.0/24
PC-A 192.168.10.20
        |
        v
      Router
        |
        v
192.168.20.0/24
Server 192.168.20.50</pre>

                            <p>
                                PC-A and the server belong to different IP networks.
                                PC-A therefore sends remote traffic toward its default gateway, and the router determines how to reach the destination network.
                            </p>

                            <h2>Switch vs Router</h2>

                            <pre class="lesson-code-block">Switch
- Primarily Layer 2
- Uses MAC addresses for Ethernet forwarding
- Connects devices in local Layer 2 networks
- Maintains a MAC address table

Router
- Primarily Layer 3
- Uses IP addresses for packet forwarding
- Connects different IP networks
- Maintains a routing table</pre>

                            <p>
                                Modern network equipment can combine these functions. A multilayer switch, for example, can perform both switching and routing.
                                The concepts remain important even when one physical device performs multiple roles.
                            </p>

                            <h2>Wireless Access Points</h2>

                            <p>
                                A <strong>wireless access point</strong> allows wireless clients to join a network using Wi-Fi.
                                It commonly bridges wireless traffic into a wired Ethernet network.
                            </p>

                            <p>
                                Security settings such as WPA2 or WPA3, authentication, guest isolation and management access are important because wireless signals extend beyond physical cables.
                            </p>

                            <h2>Firewalls</h2>

                            <p>
                                A <strong>firewall</strong> enforces policy about which traffic should be allowed or blocked.
                                Depending on the firewall, decisions can consider source and destination IP addresses, ports, protocols, connection state, applications, users or other context.
                            </p>

                            <pre class="lesson-code-block">Example policy idea

ALLOW users -> web servers TCP 443
ALLOW admins -> management network SSH
DENY guest network -> internal servers
DENY unexpected inbound traffic</pre>

                            <p>
                                A firewall is an important security control, but it does not make insecure applications safe.
                                If an organization intentionally allows HTTPS to a vulnerable web application, the firewall cannot automatically fix flaws inside that application.
                            </p>

                            <h2>Proxies</h2>

                            <p>
                                A <strong>proxy</strong> communicates on behalf of another system.
                                A forward proxy may represent clients when they access external services.
                                A reverse proxy may sit in front of servers and receive requests before passing them to backend applications.
                            </p>

                            <pre class="lesson-code-block">Forward proxy
User -> Proxy -> Internet

Reverse proxy
Internet -> Reverse Proxy -> Web Server</pre>

                            <p>
                                Proxies can provide logging, filtering, access control, caching or security inspection depending on the design.
                            </p>

                            <h2>Load Balancers</h2>

                            <p>
                                A <strong>load balancer</strong> distributes traffic across multiple backend systems.
                                This improves availability and allows applications to handle more demand.
                            </p>

                            <pre class="lesson-code-block">Clients
   |
   v
Load Balancer
 |    |    |
 v    v    v
Web1 Web2 Web3</pre>

                            <h2>Gateway</h2>

                            <p>
                                The word <strong>gateway</strong> can have several meanings.
                                In ordinary IP networking, the <strong>default gateway</strong> is the router a host uses to reach destinations outside its local subnet.
                            </p>

                            <p>
                                More generally, a gateway may be a device or service that enables communication between different networks, protocols or environments.
                            </p>

                            <h2>Security Monitoring Points</h2>

                            <p>
                                Network infrastructure provides useful places to monitor communication.
                                Firewalls, routers, proxies, DNS servers and switches may generate logs or telemetry that help security teams understand what systems are doing.
                            </p>

                            <div class="lesson-callout">
                                <div class="lesson-callout-icon">
                                    <i class="fa-solid fa-shield-halved"></i>
                                </div>

                                <div>
                                    <strong>Investigation example</strong>
                                    <p>
                                        A firewall log shows a workstation repeatedly connecting to an unknown external IP on an unusual port. The analyst can correlate the firewall event with endpoint logs, DNS history and proxy records to determine whether the traffic is expected.
                                    </p>
                                </div>
                            </div>

                            <h2>Troubleshooting Example</h2>

                            <p>
                                A user can reach devices in the same subnet but cannot reach any external network.
                                Local switching may therefore be working. The next checks might include the user's default gateway, router availability, routing table, firewall policy or upstream connectivity.
                            </p>

                            <h2>Lesson Recap</h2>

                            <ul>
                                <li>Switches forward Ethernet traffic primarily using MAC addresses.</li>
                                <li>Routers forward IP traffic between networks using routing information.</li>
                                <li>Access points connect wireless clients.</li>
                                <li>Firewalls enforce traffic policy.</li>
                                <li>Proxies communicate on behalf of clients or servers.</li>
                                <li>Load balancers distribute connections across backend systems.</li>
                                <li>Infrastructure devices are valuable sources of security telemetry.</li>
                            </ul>

                            <h2>What Comes Next?</h2>

                            <p>
                                You now know the roles of common network devices. The next lesson introduces the OSI and TCP/IP models, which provide a structured way to understand how these devices and protocols work together.
                            </p>
                        `,

                        keyConcepts: [
                            {
                                title: "Switch",
                                description: "A device that forwards Ethernet frames within Layer 2 networks using MAC-address information."
                            },
                            {
                                title: "MAC Address Table",
                                description: "A table a switch uses to associate learned MAC addresses with switch ports."
                            },
                            {
                                title: "Router",
                                description: "A device that forwards IP packets between networks using routing information."
                            },
                            {
                                title: "Routing Table",
                                description: "A set of routes used to determine how destinations can be reached."
                            },
                            {
                                title: "Firewall",
                                description: "A security control that allows or blocks traffic according to policy."
                            },
                            {
                                title: "Access Point",
                                description: "A device that connects wireless clients to a network."
                            },
                            {
                                title: "Proxy",
                                description: "A service that communicates on behalf of a client or server."
                            },
                            {
                                title: "Load Balancer",
                                description: "A device or service that distributes traffic across multiple backend systems."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "What information does a traditional Ethernet switch primarily use to forward a frame?",
                                options: [
                                    "Destination MAC address",
                                    "DNS domain name",
                                    "Username",
                                    "File extension"
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which device is primarily responsible for forwarding packets between different IP networks?",
                                options: [
                                    "Router",
                                    "Keyboard",
                                    "Monitor",
                                    "Wireless client"
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "A host needs to reach a destination outside its local subnet. Where does it normally send the traffic first?",
                                options: [
                                    "Its default gateway",
                                    "Its own loopback interface only",
                                    "A random switch port",
                                    "The DNS TXT record"
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which device or service commonly distributes incoming client connections across several backend servers?",
                                options: [
                                    "Load balancer",
                                    "Mouse",
                                    "PAN",
                                    "Subnet mask"
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Why can firewall logs be useful to a security analyst?",
                                options: [
                                    "They can show communication decisions and connection details",
                                    "They always identify the human attacker with certainty",
                                    "They replace all endpoint logs",
                                    "They remove the need to understand networking"
                                ],
                                answer:
                                    0
                            }
                        ]
                    }
                ),

                lesson(
                    "lesson-04",
                    "OSI and TCP/IP Models",
                    "55 minutes",
                    {
                        subtitle:
                            "Understand why layered models exist, what each layer is responsible for, how encapsulation works and how layers help with troubleshooting and security analysis.",

                        objectives: [
                            "Explain why networking uses layered models.",
                            "Name and describe the seven OSI layers.",
                            "Describe the common four-layer TCP/IP model.",
                            "Map common protocols and technologies to approximate layers.",
                            "Explain encapsulation and decapsulation.",
                            "Distinguish frames, packets, segments and application data.",
                            "Use layered reasoning to troubleshoot network problems.",
                            "Explain how packet captures expose information from multiple layers."
                        ],

                        introduction: `
                            <h2>Why Do We Need Networking Models?</h2>

                            <p>
                                Network communication is complex. A single web request may involve Ethernet or Wi-Fi, IP, TCP, TLS, HTTP and DNS.
                                Trying to understand all of these technologies as one large process would be difficult.
                            </p>

                            <p>
                                Layered models divide communication into smaller responsibilities.
                                Each layer focuses on a particular problem and interacts with the layers above and below it.
                            </p>

                            <p>
                                Two models are especially useful:
                            </p>

                            <ul>
                                <li>The <strong>OSI model</strong>, commonly used for learning, discussion and troubleshooting.</li>
                                <li>The <strong>TCP/IP model</strong>, which more closely represents the protocol suite used by modern Internet networks.</li>
                            </ul>
                        `,

                        body: `
                            <h2>The OSI Model</h2>

                            <p>
                                The Open Systems Interconnection model contains seven conceptual layers.
                                Real technologies do not always fit perfectly into one layer, but the model gives engineers and security professionals a shared vocabulary.
                            </p>

                            <pre class="lesson-code-block">Layer 7  Application
Layer 6  Presentation
Layer 5  Session
Layer 4  Transport
Layer 3  Network
Layer 2  Data Link
Layer 1  Physical</pre>

                            <h2>Layer 1 — Physical</h2>

                            <p>
                                The Physical layer concerns the transmission of raw bits through physical or radio media.
                                Examples include cables, fibre, connectors, electrical signalling and radio transmission.
                            </p>

                            <p>
                                Questions at this layer include:
                            </p>

                            <ul>
                                <li>Is the cable connected?</li>
                                <li>Is the network interface active?</li>
                                <li>Is there a wireless signal?</li>
                                <li>Is the link operating at the expected speed?</li>
                            </ul>

                            <h2>Layer 2 — Data Link</h2>

                            <p>
                                The Data Link layer handles local network communication over technologies such as Ethernet.
                                MAC addresses, Ethernet frames, switching and VLANs are commonly discussed here.
                            </p>

                            <pre class="lesson-code-block">Ethernet frame idea

[Destination MAC]
[Source MAC]
[Type]
[Payload]
[Error-checking information]</pre>

                            <h2>Layer 3 — Network</h2>

                            <p>
                                The Network layer handles logical addressing and communication between networks.
                                IP addressing and routing are the major concepts.
                            </p>

                            <p>
                                Routers examine destination IP information and select paths toward remote networks.
                            </p>

                            <h2>Layer 4 — Transport</h2>

                            <p>
                                The Transport layer supports communication between applications on hosts.
                                TCP and UDP are common transport protocols.
                            </p>

                            <p>
                                Ports help identify which application or service should receive traffic.
                                TCP additionally provides mechanisms for connection-oriented and reliable delivery.
                            </p>

                            <h2>Layer 5 — Session</h2>

                            <p>
                                The Session layer conceptually describes the establishment, management and termination of communication sessions between applications.
                                In real TCP/IP implementations, session responsibilities are often handled by applications or supporting libraries rather than one distinct protocol layer.
                            </p>

                            <h2>Layer 6 — Presentation</h2>

                            <p>
                                The Presentation layer describes how information may be formatted, encoded, compressed or encrypted for applications.
                                Modern protocol stacks often handle these functions inside application protocols or libraries.
                            </p>

                            <h2>Layer 7 — Application</h2>

                            <p>
                                The Application layer is closest to the user-facing software and application services.
                                Protocols such as HTTP, DNS, SMTP and SSH are commonly discussed at this layer.
                            </p>

                            <h2>The TCP/IP Model</h2>

                            <p>
                                A common four-layer TCP/IP model groups networking functions differently:
                            </p>

                            <pre class="lesson-code-block">TCP/IP Layer       Examples

Application        HTTP, HTTPS, DNS, SSH, SMTP
Transport          TCP, UDP
Internet           IP, ICMP
Network Access     Ethernet, Wi-Fi</pre>

                            <p>
                                The upper three OSI layers—Application, Presentation and Session—are commonly grouped into the TCP/IP Application layer.
                            </p>

                            <h2>OSI and TCP/IP Mapping</h2>

                            <pre class="lesson-code-block">OSI                         TCP/IP

7 Application    \
6 Presentation    >-------> Application
5 Session        /

4 Transport      ---------> Transport

3 Network        ---------> Internet

2 Data Link      \
1 Physical        >-------> Network Access</pre>

                            <h2>Encapsulation</h2>

                            <p>
                                When an application sends data, each networking layer can add information needed for its own function.
                                This process is called <strong>encapsulation</strong>.
                            </p>

                            <h3>Example: sending an HTTPS request</h3>

                            <pre class="lesson-code-block">Application data
      |
      v
TCP adds transport information
      |
      v
IP adds source and destination IP information
      |
      v
Ethernet adds local MAC-address information
      |
      v
Bits are transmitted through the medium</pre>

                            <p>
                                The destination performs the reverse process, interpreting and removing the relevant information as data moves upward through the stack.
                                This is called <strong>decapsulation</strong>.
                            </p>

                            <h2>Frames, Packets and Segments</h2>

                            <p>
                                Different layers use different names for protocol data units.
                                Terminology varies slightly depending on context, but a useful beginner mapping is:
                            </p>

                            <pre class="lesson-code-block">Layer 7-5  Data
Layer 4    TCP segment / UDP datagram
Layer 3    IP packet
Layer 2    Ethernet frame
Layer 1    Bits</pre>

                            <h2>Worked Example: Opening a Website</h2>

                            <p>
                                Suppose a user opens <code>https://example.com</code>.
                                The browser creates application data. TCP may manage the transport connection. IP identifies source and destination networks.
                                Ethernet or Wi-Fi handles the local link.
                            </p>

                            <pre class="lesson-code-block">HTTP/TLS data
   inside
TCP segment
   inside
IP packet
   inside
Ethernet frame</pre>

                            <p>
                                A packet capture may display all of these layers together.
                                That is why tools such as Wireshark show separate sections for Ethernet, IP, TCP and application protocols.
                            </p>

                            <h2>Why MAC Addresses Change but IP Addresses Can Remain</h2>

                            <p>
                                Layer 2 information is used for local delivery on each network segment.
                                As a packet crosses routers, the local Ethernet frame is removed and replaced for the next link.
                            </p>

                            <p>
                                The source and destination IP addresses normally remain associated with the end-to-end conversation unless translation such as NAT changes them.
                                The local source and destination MAC addresses can change at each routed hop.
                            </p>

                            <h2>Troubleshooting with Layers</h2>

                            <p>
                                Layered reasoning helps prevent random troubleshooting.
                            </p>

                            <h3>Scenario 1 — no link</h3>

                            <p>
                                If the Ethernet cable is disconnected and the interface reports no link, there is little value troubleshooting DNS first.
                                Start with the Physical layer.
                            </p>

                            <h3>Scenario 2 — local IP works, hostname fails</h3>

                            <p>
                                If a server responds when addressed by IP but not by hostname, lower-layer connectivity may be working.
                                DNS at the application layer becomes a strong suspect.
                            </p>

                            <h3>Scenario 3 — destination network unreachable</h3>

                            <p>
                                If local communication works but remote networks cannot be reached, investigate Layer 3 settings such as IP address, subnet mask, default gateway and routing.
                            </p>

                            <h3>Scenario 4 — connection reaches server but application fails</h3>

                            <p>
                                If TCP connectivity succeeds but the application returns an error, the issue may be at the application or service layer rather than basic network transport.
                            </p>

                            <h2>Cybersecurity Perspective</h2>

                            <p>
                                Attackers and defenders both interact with multiple network layers.
                                Security controls and attacks therefore cannot be understood from only one layer.
                            </p>

                            <ul>
                                <li>MAC-address and ARP behaviour relates to local Layer 2 networking.</li>
                                <li>IP routing and filtering involve Layer 3.</li>
                                <li>TCP and UDP ports are Transport-layer concepts.</li>
                                <li>DNS, HTTP and SSH are Application-layer protocols.</li>
                            </ul>

                            <p>
                                Packet analysis becomes much easier once a student can identify which fields belong to which layer.
                            </p>

                            <div class="lesson-callout">
                                <div class="lesson-callout-icon">
                                    <i class="fa-solid fa-magnifying-glass"></i>
                                </div>

                                <div>
                                    <strong>Security analysis example</strong>
                                    <p>
                                        In Wireshark, an analyst may inspect an Ethernet source MAC address, an IP destination, a TCP destination port and an HTTP request inside the same captured communication. Layering explains why all of those fields appear together.
                                    </p>
                                </div>
                            </div>

                            <h2>Lesson Recap</h2>

                            <ul>
                                <li>Layered models divide networking into smaller responsibilities.</li>
                                <li>The OSI model has seven conceptual layers.</li>
                                <li>The common TCP/IP model uses four broader layers.</li>
                                <li>Encapsulation adds protocol information as data moves down the stack.</li>
                                <li>Decapsulation processes that information at the destination.</li>
                                <li>Layered thinking improves troubleshooting and packet analysis.</li>
                            </ul>

                            <h2>What Comes Next?</h2>

                            <p>
                                With the networking foundation established, the next module moves into IPv4 addressing—how devices are identified, how network and host portions are determined and how systems decide whether a destination is local or remote.
                            </p>
                        `,

                        keyConcepts: [
                            {
                                title: "OSI Model",
                                description: "A seven-layer conceptual model used to describe network communication."
                            },
                            {
                                title: "TCP/IP Model",
                                description: "A layered model representing the Internet protocol suite."
                            },
                            {
                                title: "Encapsulation",
                                description: "The process of adding protocol information as data moves down the network stack."
                            },
                            {
                                title: "Decapsulation",
                                description: "The process of interpreting and removing protocol information as data moves up the destination stack."
                            },
                            {
                                title: "Frame",
                                description: "A Layer 2 unit of communication, such as an Ethernet frame."
                            },
                            {
                                title: "Packet",
                                description: "A Layer 3 unit of communication, commonly an IP packet."
                            },
                            {
                                title: "Segment",
                                description: "A common term for a TCP transport-layer unit."
                            },
                            {
                                title: "Layered Troubleshooting",
                                description: "Diagnosing network problems by identifying which communication layer is failing."
                            }
                        ],

                        quiz: [
                            {
                                question:
                                    "At which OSI layer is IP primarily associated?",
                                options: [
                                    "Physical",
                                    "Data Link",
                                    "Network",
                                    "Application"
                                ],
                                answer:
                                    2
                            },
                            {
                                question:
                                    "Which protocols belong primarily to the Transport layer?",
                                options: [
                                    "TCP and UDP",
                                    "HTTP and DNS",
                                    "Ethernet and Wi-Fi",
                                    "ARP and MAC only"
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "What is encapsulation?",
                                options: [
                                    "Removing every network header before transmission",
                                    "Adding protocol information as data moves down the networking stack",
                                    "Deleting application data",
                                    "Replacing all IP addresses with MAC addresses"
                                ],
                                answer:
                                    1
                            },
                            {
                                question:
                                    "A host can reach a server by IP address but not by hostname. Which area should be investigated first?",
                                options: [
                                    "DNS / Application layer",
                                    "Physical cable only",
                                    "Monitor settings",
                                    "Keyboard driver"
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Why can Ethernet MAC addresses change as traffic crosses routers while end-to-end IP addresses often remain the same?",
                                options: [
                                    "Because Layer 2 addressing is local to each link while IP provides Layer 3 addressing across networks",
                                    "Because IP addresses exist only inside switches",
                                    "Because routers never inspect IP packets",
                                    "Because MAC addresses are application-layer names"
                                ],
                                answer:
                                    0
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
                        

                            <h2>Why This Matters</h2>

                            <p>
                                IPv4 is the addressing system most beginners encounter first in local networks, firewall logs, cloud security groups and packet captures. Knowing only that an address contains four numbers is not enough; a learner must understand that the address is a 32-bit value interpreted together with a prefix or subnet mask.
                            </p>

                            <h2>How to Think About It</h2>

                            <p>
                                Read an IPv4 address in two views at the same time: dotted decimal for human readability and binary for understanding boundaries. Each decimal octet represents eight bits. The prefix length tells you how many leading bits identify the network. The remaining bits identify addresses inside that network. This is why 192.168.10.25/24 and 192.168.10.200/24 are local to the same /24, while 192.168.11.25/24 is not.
                            </p>

                            <h2>Worked Example</h2>

                            <p>
                                A workstation configured as 192.168.50.25/24 interprets 192.168.50.80 as local because both addresses belong to 192.168.50.0/24. It interprets 192.168.60.80 as remote and normally sends that traffic to a default gateway.
                            </p>

                            <h2>Cybersecurity Relevance</h2>

                            <p>
                                Security tools constantly expose source IP, destination IP and prefix information. An analyst who understands addressing can quickly tell whether traffic stays inside a subnet, crosses a security boundary or targets an unexpected external address.
                            </p>

                            <h2>Troubleshooting / Investigation Example</h2>

                            <p>
                                If a host has an IP address but cannot reach expected systems, confirm the address, prefix length, gateway and whether the address belongs to the intended subnet. A correct-looking address with the wrong prefix can still produce broken or misleading connectivity.
                            </p>

                            <h2>Lesson Recap</h2>

                            <p>
                                Before moving on, make sure you can explain <strong>Understanding IPv4</strong> in your own words, describe why it exists, follow the basic communication flow and connect the concept to a real troubleshooting or security scenario.
                            </p>

                            <h2>What Comes Next?</h2>

                            <p>
                                The next lesson separates the network portion from the host portion so you can predict whether a destination is local or requires routing.
                            </p>`,

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
                        ,
                            {
                                question:
                                    "Which statement best describes IPv4?",
                                options: [
                                    "A 32-bit Internet Protocol address.",
                                    "Eight bits of an IPv4 address.",
                                    "Number of leading bits representing the network prefix.",
                                    "A dotted-decimal representation of network and host boundaries."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Octet?",
                                options: [
                                    "Eight bits of an IPv4 address.",
                                    "A 32-bit Internet Protocol address.",
                                    "Number of leading bits representing the network prefix.",
                                    "A dotted-decimal representation of network and host boundaries."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Prefix Length?",
                                options: [
                                    "Number of leading bits representing the network prefix.",
                                    "A 32-bit Internet Protocol address.",
                                    "Eight bits of an IPv4 address.",
                                    "A dotted-decimal representation of network and host boundaries."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Subnet Mask?",
                                options: [
                                    "A dotted-decimal representation of network and host boundaries.",
                                    "A 32-bit Internet Protocol address.",
                                    "Eight bits of an IPv4 address.",
                                    "Number of leading bits representing the network prefix."
                                ],
                                answer:
                                    0
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
                        

                            <h2>Why This Matters</h2>

                            <p>
                                An IP address by itself does not tell a device what is local. The subnet mask or CIDR prefix creates the boundary. Hosts use that boundary every time they decide whether to deliver traffic directly on the LAN or send it to a router.
                            </p>

                            <h2>How to Think About It</h2>

                            <p>
                                Conceptually, apply the subnet mask to both the local address and destination address. If the resulting network values match, the destination is local. If they differ, the destination is remote. In a /24, the first three octets form the network portion; in other prefixes the boundary can fall inside an octet, which is why binary understanding becomes important.
                            </p>

                            <h2>Worked Example</h2>

                            <p>
                                10.10.5.20/24 and 10.10.5.99/24 both calculate to network 10.10.5.0/24. 10.10.6.10/24 calculates to 10.10.6.0/24, so a router is needed between the networks.
                            </p>

                            <h2>Cybersecurity Relevance</h2>

                            <p>
                                Network segmentation, ACLs and firewall policies are usually expressed in prefixes. Misunderstanding the host/network boundary can result in rules that expose too many systems or unintentionally block legitimate traffic.
                            </p>

                            <h2>Troubleshooting / Investigation Example</h2>

                            <p>
                                When two nearby devices cannot communicate, do not assume they are local simply because their addresses look similar. Compare the full prefix. A /23, /24 and /25 can produce very different local-network decisions.
                            </p>

                            <h2>Lesson Recap</h2>

                            <p>
                                Before moving on, make sure you can explain <strong>Network and Host Portions</strong> in your own words, describe why it exists, follow the basic communication flow and connect the concept to a real troubleshooting or security scenario.
                            </p>

                            <h2>What Comes Next?</h2>

                            <p>
                                Next you will learn which IPv4 ranges are intended for private networks, which are globally routable and why NAT is commonly used at network edges.
                            </p>`,

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
                        ,
                            {
                                question:
                                    "Which statement best describes Network Portion?",
                                options: [
                                    "Bits identifying the IP subnet.",
                                    "Bits that vary within a subnet.",
                                    "A destination considered to be on the same IP subnet.",
                                    "A destination reached through routing."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Host Portion?",
                                options: [
                                    "Bits that vary within a subnet.",
                                    "Bits identifying the IP subnet.",
                                    "A destination considered to be on the same IP subnet.",
                                    "A destination reached through routing."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Local Destination?",
                                options: [
                                    "A destination considered to be on the same IP subnet.",
                                    "Bits identifying the IP subnet.",
                                    "Bits that vary within a subnet.",
                                    "A destination reached through routing."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Remote Destination?",
                                options: [
                                    "A destination reached through routing.",
                                    "Bits identifying the IP subnet.",
                                    "Bits that vary within a subnet.",
                                    "A destination considered to be on the same IP subnet."
                                ],
                                answer:
                                    0
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
                        

                            <h2>Why This Matters</h2>

                            <p>
                                The Internet cannot assign a unique public IPv4 address to every internal device indefinitely, so private address space allows organizations to reuse the same ranges internally. Understanding these ranges prevents analysts from confusing internal addresses with Internet-routable ones.
                            </p>

                            <h2>How to Think About It</h2>

                            <p>
                                RFC 1918 private space includes 10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16. Edge devices commonly use NAT or PAT to translate internal private connections to public addresses. The translation changes how a flow appears depending on where it is observed.
                            </p>

                            <h2>Worked Example</h2>

                            <p>
                                A laptop may use 192.168.1.25:51522 internally. A home router can translate that flow to 203.0.113.50:62001 before sending it to the Internet. The remote server sees the translated public tuple, not the private one.
                            </p>

                            <h2>Cybersecurity Relevance</h2>

                            <p>
                                Private addressing is not a security control by itself. Attackers who gain an internal foothold can still communicate with other private systems. NAT also complicates attribution because many users may share one public address.
                            </p>

                            <h2>Troubleshooting / Investigation Example</h2>

                            <p>
                                If an external service logs one public IP for many users, correlate timestamps and translated source ports with NAT logs. If a host self-assigns a 169.254.x.x address unexpectedly, investigate DHCP or local connectivity.
                            </p>

                            <h2>Lesson Recap</h2>

                            <p>
                                Before moving on, make sure you can explain <strong>Public and Private IP Addresses</strong> in your own words, describe why it exists, follow the basic communication flow and connect the concept to a real troubleshooting or security scenario.
                            </p>

                            <h2>What Comes Next?</h2>

                            <p>
                                The next lesson applies IPv4 knowledge to security evidence such as firewall logs, attribution, spoofing, VPNs and NAT.
                            </p>`,

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
                        ,
                            {
                                question:
                                    "Which statement best describes Private Address?",
                                options: [
                                    "An address reserved for internal use.",
                                    "An address intended to be globally routable, subject to routing and policy.",
                                    "Translation between address representations at a network boundary.",
                                    "Addressing used to communicate with the local host itself."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Public Address?",
                                options: [
                                    "An address intended to be globally routable, subject to routing and policy.",
                                    "An address reserved for internal use.",
                                    "Translation between address representations at a network boundary.",
                                    "Addressing used to communicate with the local host itself."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes NAT?",
                                options: [
                                    "Translation between address representations at a network boundary.",
                                    "An address reserved for internal use.",
                                    "An address intended to be globally routable, subject to routing and policy.",
                                    "Addressing used to communicate with the local host itself."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Loopback?",
                                options: [
                                    "Addressing used to communicate with the local host itself.",
                                    "An address reserved for internal use.",
                                    "An address intended to be globally routable, subject to routing and policy.",
                                    "Translation between address representations at a network boundary."
                                ],
                                answer:
                                    0
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
                        

                            <h2>Why This Matters</h2>

                            <p>
                                IP addresses are everywhere in security investigations, yet they are easy to over-interpret. An address identifies a network endpoint at an observation point, not automatically a person, device owner or attacker.
                            </p>

                            <h2>How to Think About It</h2>

                            <p>
                                Always interpret an IP together with time, direction, interface, ports, translation state and asset ownership. VPNs, proxies, cloud services, DHCP and NAT can all change the meaning of an address. Source spoofing can also make some packets claim an address that did not originate the traffic.
                            </p>

                            <h2>Worked Example</h2>

                            <p>
                                A firewall log showing src=10.10.20.45 dst=172.16.5.10 dport=443 tells you a private source communicated toward a private destination over TCP 443 at that firewall. It does not by itself tell you which human used 10.10.20.45; DHCP and identity records may be needed.
                            </p>

                            <h2>Cybersecurity Relevance</h2>

                            <p>
                                Good analysts correlate IP evidence with endpoint telemetry, authentication logs, DHCP leases, DNS history, VPN records and asset inventories before making attribution claims.
                            </p>

                            <h2>Troubleshooting / Investigation Example</h2>

                            <p>
                                When an IP appears suspicious, first establish whether it is internal or public, whether translation occurred, whether the address was dynamically assigned and where the event was captured. This prevents false conclusions.
                            </p>

                            <h2>Lesson Recap</h2>

                            <p>
                                Before moving on, make sure you can explain <strong>IPv4 from a Security Perspective</strong> in your own words, describe why it exists, follow the basic communication flow and connect the concept to a real troubleshooting or security scenario.
                            </p>

                            <h2>What Comes Next?</h2>

                            <p>
                                With addressing understood, the course moves into subnet masks and CIDR so you can calculate exact network ranges and security boundaries.
                            </p>`,

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
                        ,
                            {
                                question:
                                    "Which statement best describes Source IP?",
                                options: [
                                    "The source address recorded in an IP packet.",
                                    "The address the packet is intended to reach.",
                                    "Falsifying addressing information.",
                                    "Connecting observed activity to a responsible system, account or actor using evidence."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Destination IP?",
                                options: [
                                    "The address the packet is intended to reach.",
                                    "The source address recorded in an IP packet.",
                                    "Falsifying addressing information.",
                                    "Connecting observed activity to a responsible system, account or actor using evidence."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Spoofing?",
                                options: [
                                    "Falsifying addressing information.",
                                    "The source address recorded in an IP packet.",
                                    "The address the packet is intended to reach.",
                                    "Connecting observed activity to a responsible system, account or actor using evidence."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Attribution?",
                                options: [
                                    "Connecting observed activity to a responsible system, account or actor using evidence.",
                                    "The source address recorded in an IP packet.",
                                    "The address the packet is intended to reach.",
                                    "Falsifying addressing information."
                                ],
                                answer:
                                    0
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
                        

                            <h2>Why This Matters</h2>

                            <p>
                                Subnet masks define the network boundary used by hosts and routers. They are also the foundation of firewall scopes, route definitions and network segmentation. A small mistake can change the size of a trusted network dramatically.
                            </p>

                            <h2>How to Think About It</h2>

                            <p>
                                A subnet mask contains contiguous 1 bits for the network portion followed by 0 bits for the host portion. 255.255.255.0 corresponds to /24 because it contains 24 leading 1 bits. The mask is combined with an IP address to calculate the network address.
                            </p>

                            <h2>Worked Example</h2>

                            <p>
                                For 192.168.10.42 with mask 255.255.255.0, the network is 192.168.10.0. With mask 255.255.255.128 (/25), 192.168.10.42 belongs to 192.168.10.0/25 while 192.168.10.200 belongs to 192.168.10.128/25.
                            </p>

                            <h2>Cybersecurity Relevance</h2>

                            <p>
                                Overly broad masks in access rules can unintentionally trust or expose more hosts than intended. Analysts should verify the actual prefix instead of guessing from familiar address patterns.
                            </p>

                            <h2>Troubleshooting / Investigation Example</h2>

                            <p>
                                When two hosts disagree about whether they are local, compare their masks. Inconsistent masks can make one host ARP directly while the other tries to route through a gateway, producing confusing one-way symptoms.
                            </p>

                            <h2>Lesson Recap</h2>

                            <p>
                                Before moving on, make sure you can explain <strong>Understanding Subnet Masks</strong> in your own words, describe why it exists, follow the basic communication flow and connect the concept to a real troubleshooting or security scenario.
                            </p>

                            <h2>What Comes Next?</h2>

                            <p>
                                CIDR notation expresses the same boundary more compactly and makes it easier to reason about prefixes and address ranges.
                            </p>`,

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
                        ,
                            {
                                question:
                                    "Which statement best describes Subnet Mask?",
                                options: [
                                    "A 32-bit mask defining an IPv4 network prefix.",
                                    "Leading network bits shared by addresses in a subnet.",
                                    "Operation used to derive the network address from IP and mask.",
                                    "The addresses or systems included in an activity such as monitoring or scanning."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Prefix?",
                                options: [
                                    "Leading network bits shared by addresses in a subnet.",
                                    "A 32-bit mask defining an IPv4 network prefix.",
                                    "Operation used to derive the network address from IP and mask.",
                                    "The addresses or systems included in an activity such as monitoring or scanning."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Bitwise AND?",
                                options: [
                                    "Operation used to derive the network address from IP and mask.",
                                    "A 32-bit mask defining an IPv4 network prefix.",
                                    "Leading network bits shared by addresses in a subnet.",
                                    "The addresses or systems included in an activity such as monitoring or scanning."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Scope?",
                                options: [
                                    "The addresses or systems included in an activity such as monitoring or scanning.",
                                    "A 32-bit mask defining an IPv4 network prefix.",
                                    "Leading network bits shared by addresses in a subnet.",
                                    "Operation used to derive the network address from IP and mask."
                                ],
                                answer:
                                    0
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
                        

                            <h2>Why This Matters</h2>

                            <p>
                                CIDR is the standard compact way to describe IP prefixes. Routes, cloud security rules, VPN networks and firewall objects frequently use notation such as /24, /20 or /32, so learners must read it confidently.
                            </p>

                            <h2>How to Think About It</h2>

                            <p>
                                The number after the slash is the count of network bits. A /24 leaves 8 host bits, giving 256 total addresses before reserved-address considerations. A /26 leaves 6 host bits, giving 64 total addresses. Smaller host-bit counts create smaller subnets.
                            </p>

                            <h2>Worked Example</h2>

                            <p>
                                192.168.10.0/24 contains 256 addresses. Splitting it into /26 networks creates four blocks: .0/26, .64/26, .128/26 and .192/26. Each block spans 64 addresses.
                            </p>

                            <h2>Cybersecurity Relevance</h2>

                            <p>
                                CIDR is common in allowlists and deny rules. Accidentally using /16 instead of /24 can expand access from 256 addresses to 65,536 addresses.
                            </p>

                            <h2>Troubleshooting / Investigation Example</h2>

                            <p>
                                If a rule appears to permit too many or too few systems, translate the CIDR to its actual range. Do not rely on visual similarity of addresses.
                            </p>

                            <h2>Lesson Recap</h2>

                            <p>
                                Before moving on, make sure you can explain <strong>CIDR Notation</strong> in your own words, describe why it exists, follow the basic communication flow and connect the concept to a real troubleshooting or security scenario.
                            </p>

                            <h2>What Comes Next?</h2>

                            <p>
                                Next you will calculate network and broadcast addresses so you can identify exact subnet boundaries.
                            </p>`,

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
                        ,
                            {
                                question:
                                    "Which statement best describes CIDR?",
                                options: [
                                    "Classless notation representing an IP prefix.",
                                    "Number after the slash indicating fixed network bits.",
                                    "Bits remaining after the prefix.",
                                    "Contiguous addresses represented by a prefix."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Prefix Length?",
                                options: [
                                    "Number after the slash indicating fixed network bits.",
                                    "Classless notation representing an IP prefix.",
                                    "Bits remaining after the prefix.",
                                    "Contiguous addresses represented by a prefix."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Host Bits?",
                                options: [
                                    "Bits remaining after the prefix.",
                                    "Classless notation representing an IP prefix.",
                                    "Number after the slash indicating fixed network bits.",
                                    "Contiguous addresses represented by a prefix."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Address Block?",
                                options: [
                                    "Contiguous addresses represented by a prefix.",
                                    "Classless notation representing an IP prefix.",
                                    "Number after the slash indicating fixed network bits.",
                                    "Bits remaining after the prefix."
                                ],
                                answer:
                                    0
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
                        

                            <h2>Why This Matters</h2>

                            <p>
                                Every traditional IPv4 subnet has boundary addresses with special meaning. Knowing the network and broadcast addresses helps you calculate usable ranges, validate configurations and interpret scanning or routing results.
                            </p>

                            <h2>How to Think About It</h2>

                            <p>
                                The network address has all host bits set to 0. The directed broadcast address has all host bits set to 1. Addresses between them are normally available for hosts in ordinary subnets, with exceptions for special designs such as /31 point-to-point links.
                            </p>

                            <h2>Worked Example</h2>

                            <p>
                                For 192.168.10.64/26, the block size is 64. The network is .64, the broadcast is .127 and the traditional usable host range is .65 through .126.
                            </p>

                            <h2>Cybersecurity Relevance</h2>

                            <p>
                                Correct range calculation prevents assessment tools from scanning outside an authorized subnet. It also helps defenders distinguish legitimate host addresses from unusual or invalid configurations.
                            </p>

                            <h2>Troubleshooting / Investigation Example</h2>

                            <p>
                                If a supposed host address equals the calculated network or broadcast address in a conventional LAN, verify the configuration. Also verify that your scanner scope stops at the authorized range boundary.
                            </p>

                            <h2>Lesson Recap</h2>

                            <p>
                                Before moving on, make sure you can explain <strong>Network and Broadcast Addresses</strong> in your own words, describe why it exists, follow the basic communication flow and connect the concept to a real troubleshooting or security scenario.
                            </p>

                            <h2>What Comes Next?</h2>

                            <p>
                                The next lesson connects subnetting directly to segmentation, least privilege and containment.
                            </p>`,

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
                        ,
                            {
                                question:
                                    "Which statement best describes Network Address?",
                                options: [
                                    "Lowest address identifying a traditional IPv4 subnet.",
                                    "Highest address used for directed broadcast in a traditional subnet.",
                                    "Addresses available for devices under common subnetting conventions.",
                                    "Number of addresses represented by a prefix."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Broadcast Address?",
                                options: [
                                    "Highest address used for directed broadcast in a traditional subnet.",
                                    "Lowest address identifying a traditional IPv4 subnet.",
                                    "Addresses available for devices under common subnetting conventions.",
                                    "Number of addresses represented by a prefix."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Host Range?",
                                options: [
                                    "Addresses available for devices under common subnetting conventions.",
                                    "Lowest address identifying a traditional IPv4 subnet.",
                                    "Highest address used for directed broadcast in a traditional subnet.",
                                    "Number of addresses represented by a prefix."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Block Size?",
                                options: [
                                    "Number of addresses represented by a prefix.",
                                    "Lowest address identifying a traditional IPv4 subnet.",
                                    "Highest address used for directed broadcast in a traditional subnet.",
                                    "Addresses available for devices under common subnetting conventions."
                                ],
                                answer:
                                    0
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
                        

                            <h2>Why This Matters</h2>

                            <p>
                                Subnetting is not only an addressing exercise. It creates boundaries that can support security policy, monitoring and containment. Thoughtful segmentation reduces the number of systems that can communicate freely.
                            </p>

                            <h2>How to Think About It</h2>

                            <p>
                                Design subnets around trust, function and operational need. User devices, servers, management interfaces, guest systems and sensitive services can be placed into different prefixes. Routing and firewall policy then control permitted paths between them.
                            </p>

                            <h2>Worked Example</h2>

                            <p>
                                A company might use 10.20.10.0/24 for users, 10.20.20.0/24 for servers and 10.20.30.0/24 for guest Wi-Fi. Guest-to-server traffic can be denied while users are allowed only the specific server ports they need.
                            </p>

                            <h2>Cybersecurity Relevance</h2>

                            <p>
                                Segmentation supports least privilege and can slow lateral movement after compromise. It also creates useful monitoring points where inter-segment traffic can be logged and inspected.
                            </p>

                            <h2>Troubleshooting / Investigation Example</h2>

                            <p>
                                If an application breaks after segmentation, identify its real communication dependencies rather than opening broad any-to-any rules. Capture required source, destination, protocol and port information and permit only what is necessary.
                            </p>

                            <h2>Lesson Recap</h2>

                            <p>
                                Before moving on, make sure you can explain <strong>Subnetting for Network Security</strong> in your own words, describe why it exists, follow the basic communication flow and connect the concept to a real troubleshooting or security scenario.
                            </p>

                            <h2>What Comes Next?</h2>

                            <p>
                                The course now moves down to local Ethernet communication, beginning with frames, switches and MAC addresses.
                            </p>`,

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
                        ,
                            {
                                question:
                                    "Which statement best describes Segmentation?",
                                options: [
                                    "Dividing a network into controlled zones.",
                                    "Movement from one compromised system to other systems.",
                                    "Rules that permit or deny traffic based on defined criteria.",
                                    "Allowing only communication required for legitimate operation."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Lateral Movement?",
                                options: [
                                    "Movement from one compromised system to other systems.",
                                    "Dividing a network into controlled zones.",
                                    "Rules that permit or deny traffic based on defined criteria.",
                                    "Allowing only communication required for legitimate operation."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes ACL?",
                                options: [
                                    "Rules that permit or deny traffic based on defined criteria.",
                                    "Dividing a network into controlled zones.",
                                    "Movement from one compromised system to other systems.",
                                    "Allowing only communication required for legitimate operation."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Least Connectivity?",
                                options: [
                                    "Allowing only communication required for legitimate operation.",
                                    "Dividing a network into controlled zones.",
                                    "Movement from one compromised system to other systems.",
                                    "Rules that permit or deny traffic based on defined criteria."
                                ],
                                answer:
                                    0
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
                        

                            <h2>Why This Matters</h2>

                            <p>
                                Most wired LAN communication uses Ethernet. IP packets usually travel inside Ethernet frames on local links, so understanding frames explains what switches actually forward and what packet captures show at Layer 2.
                            </p>

                            <h2>How to Think About It</h2>

                            <p>
                                An Ethernet frame includes destination and source MAC addresses, an EtherType or length field, payload and error-detection information. A switch reads the Layer 2 header to determine where a frame should go inside the VLAN.
                            </p>

                            <h2>Worked Example</h2>

                            <p>
                                When Host A sends an IP packet to Host B on the same LAN, the packet is placed inside an Ethernet frame addressed to Host B's MAC. When Host A sends to a remote network, the frame is instead addressed to the local router's MAC while the IP destination remains remote.
                            </p>

                            <h2>Cybersecurity Relevance</h2>

                            <p>
                                Layer 2 visibility can reveal unknown devices, unusual MAC changes and local attacks. Ethernet concepts are essential before studying ARP spoofing or VLAN security.
                            </p>

                            <h2>Troubleshooting / Investigation Example</h2>

                            <p>
                                If an interface has link but local communication fails, inspect VLAN membership, MAC learning, duplex/speed issues and whether the expected destination MAC can be resolved.
                            </p>

                            <h2>Lesson Recap</h2>

                            <p>
                                Before moving on, make sure you can explain <strong>Ethernet Fundamentals</strong> in your own words, describe why it exists, follow the basic communication flow and connect the concept to a real troubleshooting or security scenario.
                            </p>

                            <h2>What Comes Next?</h2>

                            <p>
                                Next you will examine MAC addresses themselves—how they are formatted, learned and used for local delivery.
                            </p>`,

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
                        ,
                            {
                                question:
                                    "Which statement best describes Ethernet Frame?",
                                options: [
                                    "Layer 2 unit used to carry data on Ethernet.",
                                    "Layer 2 identifier used for local delivery.",
                                    "Traffic intended for all devices in a broadcast domain.",
                                    "Frame Check Sequence used to detect transmission errors."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes MAC Address?",
                                options: [
                                    "Layer 2 identifier used for local delivery.",
                                    "Layer 2 unit used to carry data on Ethernet.",
                                    "Traffic intended for all devices in a broadcast domain.",
                                    "Frame Check Sequence used to detect transmission errors."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Broadcast?",
                                options: [
                                    "Traffic intended for all devices in a broadcast domain.",
                                    "Layer 2 unit used to carry data on Ethernet.",
                                    "Layer 2 identifier used for local delivery.",
                                    "Frame Check Sequence used to detect transmission errors."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes FCS?",
                                options: [
                                    "Frame Check Sequence used to detect transmission errors.",
                                    "Layer 2 unit used to carry data on Ethernet.",
                                    "Layer 2 identifier used for local delivery.",
                                    "Traffic intended for all devices in a broadcast domain."
                                ],
                                answer:
                                    0
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
                        

                            <h2>Why This Matters</h2>

                            <p>
                                MAC addresses identify network interfaces for local Layer 2 delivery. They appear in switch tables, ARP caches and packet captures and help map observed traffic to local devices.
                            </p>

                            <h2>How to Think About It</h2>

                            <p>
                                A common Ethernet MAC address is 48 bits written as six hexadecimal octets. Switches learn source MAC addresses and associate them with ports. The all-FF address is used for Ethernet broadcast.
                            </p>

                            <h2>Worked Example</h2>

                            <p>
                                If a switch learns 00:11:22:33:44:55 on Gi0/5, later unicast frames destined for that MAC can be forwarded toward Gi0/5 rather than flooded across the VLAN.
                            </p>

                            <h2>Cybersecurity Relevance</h2>

                            <p>
                                MAC addresses can be changed or spoofed, so they are useful evidence but not strong identity by themselves. Port-security features and network-access controls may use MAC information as one signal.
                            </p>

                            <h2>Troubleshooting / Investigation Example</h2>

                            <p>
                                If a device appears on an unexpected switch port, verify whether the endpoint moved, a virtual machine migrated, a phone is bridging a PC or suspicious spoofing is occurring.
                            </p>

                            <h2>Lesson Recap</h2>

                            <p>
                                Before moving on, make sure you can explain <strong>MAC Addresses</strong> in your own words, describe why it exists, follow the basic communication flow and connect the concept to a real troubleshooting or security scenario.
                            </p>

                            <h2>What Comes Next?</h2>

                            <p>
                                IP communication still needs a way to discover the correct local MAC address. ARP solves that problem in IPv4 networks.
                            </p>`,

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
                        ,
                            {
                                question:
                                    "Which statement best describes MAC Address?",
                                options: [
                                    "A Layer 2 hardware/interface identifier.",
                                    "Switch table mapping learned MAC addresses to ports.",
                                    "Presenting a forged identifier.",
                                    "Base-16 notation commonly used for MAC addresses."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes MAC Table?",
                                options: [
                                    "Switch table mapping learned MAC addresses to ports.",
                                    "A Layer 2 hardware/interface identifier.",
                                    "Presenting a forged identifier.",
                                    "Base-16 notation commonly used for MAC addresses."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Spoofing?",
                                options: [
                                    "Presenting a forged identifier.",
                                    "A Layer 2 hardware/interface identifier.",
                                    "Switch table mapping learned MAC addresses to ports.",
                                    "Base-16 notation commonly used for MAC addresses."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Hexadecimal?",
                                options: [
                                    "Base-16 notation commonly used for MAC addresses.",
                                    "A Layer 2 hardware/interface identifier.",
                                    "Switch table mapping learned MAC addresses to ports.",
                                    "Presenting a forged identifier."
                                ],
                                answer:
                                    0
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
                        

                            <h2>Why This Matters</h2>

                            <p>
                                A host may know a destination IPv4 address but Ethernet delivery requires a MAC address. ARP bridges that gap on a local IPv4 network by asking which MAC address owns a particular IP.
                            </p>

                            <h2>How to Think About It</h2>

                            <p>
                                When no valid ARP cache entry exists, a host broadcasts an ARP request such as “Who has 192.168.1.1?” The device owning that address replies with its MAC. The sender caches the mapping temporarily and can then build Ethernet frames.
                            </p>

                            <h2>Worked Example</h2>

                            <p>
                                A laptop 192.168.1.25 wants to reach its gateway 192.168.1.1. It broadcasts an ARP request. The router responds with its MAC address, and the laptop sends remote-bound frames to that MAC.
                            </p>

                            <h2>Cybersecurity Relevance</h2>

                            <p>
                                ARP has no built-in authentication. A malicious local system may send false mappings, enabling traffic interception or disruption. This is why ARP behaviour matters in local-network security.
                            </p>

                            <h2>Troubleshooting / Investigation Example</h2>

                            <p>
                                If local IPv4 communication fails despite correct addressing, inspect the ARP cache and capture ARP requests/replies. Duplicate IP addresses or stale mappings can produce intermittent symptoms.
                            </p>

                            <h2>Lesson Recap</h2>

                            <p>
                                Before moving on, make sure you can explain <strong>Understanding ARP</strong> in your own words, describe why it exists, follow the basic communication flow and connect the concept to a real troubleshooting or security scenario.
                            </p>

                            <h2>What Comes Next?</h2>

                            <p>
                                The next lesson focuses on ARP abuse, spoofing indicators and defensive controls.
                            </p>`,

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
                        ,
                            {
                                question:
                                    "Which statement best describes ARP?",
                                options: [
                                    "Protocol mapping local IPv4 addresses to MAC addresses.",
                                    "Broadcast query asking for the MAC associated with an IPv4 address.",
                                    "Response providing an address mapping.",
                                    "Temporary host table of learned IP-to-MAC mappings."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes ARP Request?",
                                options: [
                                    "Broadcast query asking for the MAC associated with an IPv4 address.",
                                    "Protocol mapping local IPv4 addresses to MAC addresses.",
                                    "Response providing an address mapping.",
                                    "Temporary host table of learned IP-to-MAC mappings."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes ARP Reply?",
                                options: [
                                    "Response providing an address mapping.",
                                    "Protocol mapping local IPv4 addresses to MAC addresses.",
                                    "Broadcast query asking for the MAC associated with an IPv4 address.",
                                    "Temporary host table of learned IP-to-MAC mappings."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes ARP Cache?",
                                options: [
                                    "Temporary host table of learned IP-to-MAC mappings.",
                                    "Protocol mapping local IPv4 addresses to MAC addresses.",
                                    "Broadcast query asking for the MAC associated with an IPv4 address.",
                                    "Response providing an address mapping."
                                ],
                                answer:
                                    0
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
                        

                            <h2>Why This Matters</h2>

                            <p>
                                ARP trusts local replies, which creates opportunities for spoofing. Understanding the attack at a conceptual level helps defenders recognize why local network segmentation and switch controls matter.
                            </p>

                            <h2>How to Think About It</h2>

                            <p>
                                In ARP spoofing, a malicious host advertises a false IP-to-MAC mapping—for example claiming that the default gateway IP belongs to the attacker's MAC. Other hosts may then send gateway-bound frames to the attacker.
                            </p>

                            <h2>Worked Example</h2>

                            <p>
                                Victim 192.168.1.20 expects gateway 192.168.1.1. An attacker repeatedly sends forged ARP replies associating 192.168.1.1 with the attacker MAC. The victim's ARP cache can be poisoned and traffic may be redirected.
                            </p>

                            <h2>Cybersecurity Relevance</h2>

                            <p>
                                Defenses can include network segmentation, Dynamic ARP Inspection on supported switches, DHCP snooping dependencies, static mappings for limited critical use cases and monitoring for unexpected MAC/IP changes.
                            </p>

                            <h2>Troubleshooting / Investigation Example</h2>

                            <p>
                                Symptoms can include changing ARP entries, certificate warnings during interception attempts, duplicate-IP alerts or traffic unexpectedly passing through another host. Verify with switch tables and packet captures.
                            </p>

                            <h2>Lesson Recap</h2>

                            <p>
                                Before moving on, make sure you can explain <strong>ARP Security Risks</strong> in your own words, describe why it exists, follow the basic communication flow and connect the concept to a real troubleshooting or security scenario.
                            </p>

                            <h2>What Comes Next?</h2>

                            <p>
                                After local delivery, the course moves to the Transport layer where TCP and UDP carry application traffic between ports.
                            </p>`,

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
                        ,
                            {
                                question:
                                    "Which statement best describes ARP Spoofing?",
                                options: [
                                    "Sending forged ARP information.",
                                    "Positioning between communicating systems.",
                                    "Switch feature that validates ARP information against trusted bindings.",
                                    "Protection that can reduce the value of intercepted traffic."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Man-in-the-Middle?",
                                options: [
                                    "Positioning between communicating systems.",
                                    "Sending forged ARP information.",
                                    "Switch feature that validates ARP information against trusted bindings.",
                                    "Protection that can reduce the value of intercepted traffic."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Dynamic ARP Inspection?",
                                options: [
                                    "Switch feature that validates ARP information against trusted bindings.",
                                    "Sending forged ARP information.",
                                    "Positioning between communicating systems.",
                                    "Protection that can reduce the value of intercepted traffic."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Encryption?",
                                options: [
                                    "Protection that can reduce the value of intercepted traffic.",
                                    "Sending forged ARP information.",
                                    "Positioning between communicating systems.",
                                    "Switch feature that validates ARP information against trusted bindings."
                                ],
                                answer:
                                    0
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
                        

                            <h2>Why This Matters</h2>

                            <p>
                                IP gets packets to a host, but applications need a way to distinguish one conversation from another. Transport protocols provide ports and delivery behaviour so many applications can communicate simultaneously.
                            </p>

                            <h2>How to Think About It</h2>

                            <p>
                                TCP and UDP use source and destination ports. A flow is commonly identified using source IP, source port, destination IP, destination port and protocol. The operating system uses these values to deliver received traffic to the correct process.
                            </p>

                            <h2>Worked Example</h2>

                            <p>
                                A browser might open TCP source port 53012 toward a web server destination port 443. Another browser tab can use a different source port while reaching the same server and port.
                            </p>

                            <h2>Cybersecurity Relevance</h2>

                            <p>
                                Firewall rules, connection logs and service discovery rely heavily on transport information. A listening port indicates a service endpoint but does not prove that the service is safe or correctly configured.
                            </p>

                            <h2>Troubleshooting / Investigation Example</h2>

                            <p>
                                If IP connectivity works but an application cannot connect, verify whether the destination port is listening, whether a firewall permits the protocol and whether the application expects TCP or UDP.
                            </p>

                            <h2>Lesson Recap</h2>

                            <p>
                                Before moving on, make sure you can explain <strong>Transport Layer Fundamentals</strong> in your own words, describe why it exists, follow the basic communication flow and connect the concept to a real troubleshooting or security scenario.
                            </p>

                            <h2>What Comes Next?</h2>

                            <p>
                                Next you will study TCP in depth, including connection establishment and reliable delivery.
                            </p>`,

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
                        ,
                            {
                                question:
                                    "Which statement best describes Port?",
                                options: [
                                    "Transport-layer number associated with an application endpoint.",
                                    "Software abstraction for a communication endpoint.",
                                    "Connection-oriented transport protocol.",
                                    "Connectionless datagram transport protocol."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Socket?",
                                options: [
                                    "Software abstraction for a communication endpoint.",
                                    "Transport-layer number associated with an application endpoint.",
                                    "Connection-oriented transport protocol.",
                                    "Connectionless datagram transport protocol."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes TCP?",
                                options: [
                                    "Connection-oriented transport protocol.",
                                    "Transport-layer number associated with an application endpoint.",
                                    "Software abstraction for a communication endpoint.",
                                    "Connectionless datagram transport protocol."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes UDP?",
                                options: [
                                    "Connectionless datagram transport protocol.",
                                    "Transport-layer number associated with an application endpoint.",
                                    "Software abstraction for a communication endpoint.",
                                    "Connection-oriented transport protocol."
                                ],
                                answer:
                                    0
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
                        

                            <h2>Why This Matters</h2>

                            <p>
                                TCP supports many critical protocols because it provides connection-oriented, ordered and reliable delivery. The three-way handshake establishes shared state before application data is exchanged.
                            </p>

                            <h2>How to Think About It</h2>

                            <p>
                                The client sends SYN, the server replies SYN-ACK and the client responds ACK. TCP then tracks sequence numbers, acknowledgements, retransmissions and flow control. Connection teardown commonly uses FIN/ACK exchanges, while RST can terminate a connection abruptly.
                            </p>

                            <h2>Worked Example</h2>

                            <p>
                                Client 10.0.0.5:51000 sends SYN to 10.0.0.10:443. The server replies from 443 to 51000 with SYN-ACK. The client ACKs, after which TLS and HTTP can proceed.
                            </p>

                            <h2>Cybersecurity Relevance</h2>

                            <p>
                                SYN patterns help analysts recognize connection attempts. Large volumes of incomplete handshakes can appear in scanning or denial-of-service activity, although context is required before labeling traffic malicious.
                            </p>

                            <h2>Troubleshooting / Investigation Example</h2>

                            <p>
                                If SYN leaves the client but no SYN-ACK returns, investigate routing, firewall policy and whether the service is listening. An immediate RST often indicates a reachable host but closed or rejected port.
                            </p>

                            <h2>Lesson Recap</h2>

                            <p>
                                Before moving on, make sure you can explain <strong>TCP and the Three-Way Handshake</strong> in your own words, describe why it exists, follow the basic communication flow and connect the concept to a real troubleshooting or security scenario.
                            </p>

                            <h2>What Comes Next?</h2>

                            <p>
                                UDP takes a different approach: it avoids connection establishment and reliability mechanisms in exchange for lower overhead.
                            </p>`,

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
                        ,
                            {
                                question:
                                    "Which statement best describes SYN?",
                                options: [
                                    "TCP flag used during connection establishment.",
                                    "TCP flag indicating acknowledgement information is valid.",
                                    "Number used to track bytes in a TCP stream.",
                                    "Resending data believed to have been lost."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes ACK?",
                                options: [
                                    "TCP flag indicating acknowledgement information is valid.",
                                    "TCP flag used during connection establishment.",
                                    "Number used to track bytes in a TCP stream.",
                                    "Resending data believed to have been lost."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Sequence Number?",
                                options: [
                                    "Number used to track bytes in a TCP stream.",
                                    "TCP flag used during connection establishment.",
                                    "TCP flag indicating acknowledgement information is valid.",
                                    "Resending data believed to have been lost."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Retransmission?",
                                options: [
                                    "Resending data believed to have been lost.",
                                    "TCP flag used during connection establishment.",
                                    "TCP flag indicating acknowledgement information is valid.",
                                    "Number used to track bytes in a TCP stream."
                                ],
                                answer:
                                    0
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
                        

                            <h2>Why This Matters</h2>

                            <p>
                                Some applications value low overhead, speed or simple request-response behaviour more than built-in reliability. UDP provides a lightweight datagram service without a TCP-style handshake.
                            </p>

                            <h2>How to Think About It</h2>

                            <p>
                                UDP carries source port, destination port, length, checksum and payload. It does not establish a connection, guarantee delivery, reorder data or retransmit missing datagrams. Applications add reliability themselves if they need it.
                            </p>

                            <h2>Worked Example</h2>

                            <p>
                                A traditional DNS query can use UDP port 53: a client sends one query and receives one response. Real-time voice or video may also tolerate occasional loss better than waiting for retransmission.
                            </p>

                            <h2>Cybersecurity Relevance</h2>

                            <p>
                                Because UDP is connectionless, spoofing and amplification patterns are important security considerations. Analysts must also remember that “no response” does not necessarily distinguish filtering from an unused UDP port.
                            </p>

                            <h2>Troubleshooting / Investigation Example</h2>

                            <p>
                                If a UDP service fails, packet capture is especially useful because there is no handshake to show connection state. Verify requests, responses, ICMP errors and firewall rules.
                            </p>

                            <h2>Lesson Recap</h2>

                            <p>
                                Before moving on, make sure you can explain <strong>Understanding UDP</strong> in your own words, describe why it exists, follow the basic communication flow and connect the concept to a real troubleshooting or security scenario.
                            </p>

                            <h2>What Comes Next?</h2>

                            <p>
                                The next lesson organizes TCP and UDP communication around well-known and ephemeral ports and common services.
                            </p>`,

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
                        ,
                            {
                                question:
                                    "Which statement best describes Datagram?",
                                options: [
                                    "Independent unit sent using a connectionless protocol.",
                                    "Communication without maintaining TCP-style connection state.",
                                    "Relatively small protocol control information.",
                                    "Receiving a larger response than the triggering request, potentially useful in abuse scenarios."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Connectionless?",
                                options: [
                                    "Communication without maintaining TCP-style connection state.",
                                    "Independent unit sent using a connectionless protocol.",
                                    "Relatively small protocol control information.",
                                    "Receiving a larger response than the triggering request, potentially useful in abuse scenarios."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Low Overhead?",
                                options: [
                                    "Relatively small protocol control information.",
                                    "Independent unit sent using a connectionless protocol.",
                                    "Communication without maintaining TCP-style connection state.",
                                    "Receiving a larger response than the triggering request, potentially useful in abuse scenarios."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Amplification?",
                                options: [
                                    "Receiving a larger response than the triggering request, potentially useful in abuse scenarios.",
                                    "Independent unit sent using a connectionless protocol.",
                                    "Communication without maintaining TCP-style connection state.",
                                    "Relatively small protocol control information."
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
                        

                            <h2>Why This Matters</h2>

                            <p>
                                Ports let multiple network applications share the same IP address. Knowing common ports helps with troubleshooting and security triage, but port numbers should be treated as clues rather than absolute proof of the application.
                            </p>

                            <h2>How to Think About It</h2>

                            <p>
                                Servers usually listen on stable destination ports while clients often choose ephemeral source ports. IANA conventions divide port ranges, but applications can be configured on non-standard ports.
                            </p>

                            <h2>Worked Example</h2>

                            <p>
                                A browser may use source port 52144 to connect to server TCP 443. The reply reverses the tuple: source TCP 443 back to destination 52144.
                            </p>

                            <h2>Cybersecurity Relevance</h2>

                            <p>
                                Unexpected listening services expand attack surface. Defenders compare exposed ports with approved services, and testers enumerate ports only within authorized scopes to discover reachable services.
                            </p>

                            <h2>Troubleshooting / Investigation Example</h2>

                            <p>
                                If a service works locally but not remotely, confirm it is listening on the correct interface and port, then check host firewalls, network firewalls, NAT and routing.
                            </p>

                            <h2>Lesson Recap</h2>

                            <p>
                                Before moving on, make sure you can explain <strong>Ports and Services</strong> in your own words, describe why it exists, follow the basic communication flow and connect the concept to a real troubleshooting or security scenario.
                            </p>

                            <h2>What Comes Next?</h2>

                            <p>
                                Next you will interpret TCP/UDP behaviour from a cybersecurity perspective rather than memorizing port numbers alone.
                            </p>`,

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
                        ,
                            {
                                question:
                                    "Which statement best describes Well-Known Port?",
                                options: [
                                    "Standardized low-numbered port associated with common services.",
                                    "Temporary client-side port often chosen dynamically.",
                                    "Endpoint waiting for inbound communication.",
                                    "Reachable functionality that may potentially be attacked."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Ephemeral Port?",
                                options: [
                                    "Temporary client-side port often chosen dynamically.",
                                    "Standardized low-numbered port associated with common services.",
                                    "Endpoint waiting for inbound communication.",
                                    "Reachable functionality that may potentially be attacked."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Listening Socket?",
                                options: [
                                    "Endpoint waiting for inbound communication.",
                                    "Standardized low-numbered port associated with common services.",
                                    "Temporary client-side port often chosen dynamically.",
                                    "Reachable functionality that may potentially be attacked."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Attack Surface?",
                                options: [
                                    "Reachable functionality that may potentially be attacked.",
                                    "Standardized low-numbered port associated with common services.",
                                    "Temporary client-side port often chosen dynamically.",
                                    "Endpoint waiting for inbound communication."
                                ],
                                answer:
                                    0
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
                        

                            <h2>Why This Matters</h2>

                            <p>
                                Security tools frequently summarize traffic by protocol, ports and connection state. Understanding the transport layer allows analysts to distinguish a completed connection from a failed attempt, scan pattern or connectionless exchange.
                            </p>

                            <h2>How to Think About It</h2>

                            <p>
                                Combine transport flags, timing, byte counts, direction and repeated attempts. TCP SYNs without completed handshakes may indicate blocked services, scanning or network failure. UDP analysis often relies on request/response pairing and ICMP errors.
                            </p>

                            <h2>Worked Example</h2>

                            <p>
                                One host sending SYN packets to hundreds of destination ports on another host over a short period resembles service enumeration. The same pattern can also come from an approved scanner, so asset and change context matters.
                            </p>

                            <h2>Cybersecurity Relevance</h2>

                            <p>
                                Transport telemetry supports firewall tuning, intrusion detection and incident response. Never infer an application solely from the port; TLS, tunnels and custom services can use unexpected ports.
                            </p>

                            <h2>Troubleshooting / Investigation Example</h2>

                            <p>
                                When a detection fires on a port pattern, validate whether the source is an approved scanner, management system or actual suspicious endpoint. Compare endpoint processes and network telemetry.
                            </p>

                            <h2>Lesson Recap</h2>

                            <p>
                                Before moving on, make sure you can explain <strong>TCP and UDP in Cybersecurity</strong> in your own words, describe why it exists, follow the basic communication flow and connect the concept to a real troubleshooting or security scenario.
                            </p>

                            <h2>What Comes Next?</h2>

                            <p>
                                The next module introduces ICMP, which reports network conditions and supports tools such as ping and traceroute.
                            </p>`,

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
                        ,
                            {
                                question:
                                    "Which statement best describes Stateful Firewall?",
                                options: [
                                    "Firewall that tracks connection/flow state.",
                                    "A communication record identified by addressing, ports and protocol.",
                                    "Determining reachable network services.",
                                    "Additional evidence needed to interpret network behaviour accurately."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Flow?",
                                options: [
                                    "A communication record identified by addressing, ports and protocol.",
                                    "Firewall that tracks connection/flow state.",
                                    "Determining reachable network services.",
                                    "Additional evidence needed to interpret network behaviour accurately."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Service Discovery?",
                                options: [
                                    "Determining reachable network services.",
                                    "Firewall that tracks connection/flow state.",
                                    "A communication record identified by addressing, ports and protocol.",
                                    "Additional evidence needed to interpret network behaviour accurately."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Context?",
                                options: [
                                    "Additional evidence needed to interpret network behaviour accurately.",
                                    "Firewall that tracks connection/flow state.",
                                    "A communication record identified by addressing, ports and protocol.",
                                    "Determining reachable network services."
                                ],
                                answer:
                                    0
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
                        

                            <h2>Why This Matters</h2>

                            <p>
                                IP itself does not provide rich error reporting. ICMP carries control and diagnostic messages that help hosts and routers report network conditions such as unreachable destinations or expired hop limits.
                            </p>

                            <h2>How to Think About It</h2>

                            <p>
                                ICMP messages have types and codes. Echo Request and Echo Reply support ping. Destination Unreachable reports delivery problems. Time Exceeded is important to traceroute. ICMP is carried directly in IP rather than using TCP or UDP ports.
                            </p>

                            <h2>Worked Example</h2>

                            <p>
                                If a router cannot forward a packet because no route exists, it may return an ICMP Destination Unreachable message. If TTL reaches zero at a router, the router may return ICMP Time Exceeded.
                            </p>

                            <h2>Cybersecurity Relevance</h2>

                            <p>
                                ICMP can aid reconnaissance but also supports legitimate troubleshooting and Path MTU Discovery. Blocking all ICMP can cause operational problems, so policy should be deliberate rather than reflexive.
                            </p>

                            <h2>Troubleshooting / Investigation Example</h2>

                            <p>
                                When ICMP behaves differently across paths, consider firewall policy, rate limiting and device configuration. Lack of ping response does not prove that a host is offline.
                            </p>

                            <h2>Lesson Recap</h2>

                            <p>
                                Before moving on, make sure you can explain <strong>Understanding ICMP</strong> in your own words, describe why it exists, follow the basic communication flow and connect the concept to a real troubleshooting or security scenario.
                            </p>

                            <h2>What Comes Next?</h2>

                            <p>
                                Next you will use Echo Request and Echo Reply through the ping utility and learn what ping can and cannot prove.
                            </p>`,

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
                        ,
                            {
                                question:
                                    "Which statement best describes ICMP?",
                                options: [
                                    "Protocol carrying IP-related control and diagnostic messages.",
                                    "Message commonly used by ping.",
                                    "Message used when packet lifetime expires.",
                                    "Message indicating certain delivery failures."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Echo Request?",
                                options: [
                                    "Message commonly used by ping.",
                                    "Protocol carrying IP-related control and diagnostic messages.",
                                    "Message used when packet lifetime expires.",
                                    "Message indicating certain delivery failures."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Time Exceeded?",
                                options: [
                                    "Message used when packet lifetime expires.",
                                    "Protocol carrying IP-related control and diagnostic messages.",
                                    "Message commonly used by ping.",
                                    "Message indicating certain delivery failures."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Destination Unreachable?",
                                options: [
                                    "Message indicating certain delivery failures.",
                                    "Protocol carrying IP-related control and diagnostic messages.",
                                    "Message commonly used by ping.",
                                    "Message used when packet lifetime expires."
                                ],
                                answer:
                                    0
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
                        

                            <h2>Why This Matters</h2>

                            <p>
                                Ping is one of the fastest ways to test whether an IP path can carry ICMP echo traffic and to observe round-trip time. It is useful, but students must understand its limits to avoid incorrect conclusions.
                            </p>

                            <h2>How to Think About It</h2>

                            <p>
                                Ping sends ICMP Echo Requests and waits for Echo Replies. Output commonly shows success or loss, round-trip latency and sometimes TTL. DNS resolution may occur first if you ping a hostname.
                            </p>

                            <h2>Worked Example</h2>

                            <p>
                                If `ping 8.8.8.8` works but `ping example.com` fails to resolve the name, basic IP connectivity may be working while DNS is not. If both fail, investigate lower layers and routing.
                            </p>

                            <h2>Cybersecurity Relevance</h2>

                            <p>
                                Attackers may use ping sweeps for discovery, but monitoring must distinguish authorized administration from malicious reconnaissance. Many hosts intentionally block echo requests.
                            </p>

                            <h2>Troubleshooting / Investigation Example</h2>

                            <p>
                                Test in stages: loopback, local address, default gateway, remote IP and finally hostname. This sequence narrows the failing layer instead of treating one ping result as definitive.
                            </p>

                            <h2>Lesson Recap</h2>

                            <p>
                                Before moving on, make sure you can explain <strong>Ping</strong> in your own words, describe why it exists, follow the basic communication flow and connect the concept to a real troubleshooting or security scenario.
                            </p>

                            <h2>What Comes Next?</h2>

                            <p>
                                Traceroute builds on TTL behaviour to reveal intermediate hops along a path.
                            </p>`,

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
                        ,
                            {
                                question:
                                    "Which statement best describes Ping?",
                                options: [
                                    "Diagnostic utility using ICMP echo messages.",
                                    "Time for a request to reach a destination and a reply to return.",
                                    "Expected responses that are not observed.",
                                    "Whether a destination can be contacted through the network path."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Round-Trip Time?",
                                options: [
                                    "Time for a request to reach a destination and a reply to return.",
                                    "Diagnostic utility using ICMP echo messages.",
                                    "Expected responses that are not observed.",
                                    "Whether a destination can be contacted through the network path."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Packet Loss?",
                                options: [
                                    "Expected responses that are not observed.",
                                    "Diagnostic utility using ICMP echo messages.",
                                    "Time for a request to reach a destination and a reply to return.",
                                    "Whether a destination can be contacted through the network path."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Reachability?",
                                options: [
                                    "Whether a destination can be contacted through the network path.",
                                    "Diagnostic utility using ICMP echo messages.",
                                    "Time for a request to reach a destination and a reply to return.",
                                    "Expected responses that are not observed."
                                ],
                                answer:
                                    0
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
                        

                            <h2>Why This Matters</h2>

                            <p>
                                A successful or failed connection does not reveal where along a multi-hop route the behaviour changes. Traceroute helps visualize the path by intentionally manipulating TTL or hop-limit values.
                            </p>

                            <h2>How to Think About It</h2>

                            <p>
                                Packets are sent with increasing TTL values. Each router that reduces TTL to zero can return an ICMP Time Exceeded message, allowing the sender to learn an intermediate hop. Implementations differ across operating systems and may use UDP, ICMP or other probe styles.
                            </p>

                            <h2>Worked Example</h2>

                            <p>
                                Hop 1 may be the local gateway, hop 2 an ISP edge and later hops transit networks. Asterisks mean no response was received for a probe; they do not automatically mean the path is broken.
                            </p>

                            <h2>Cybersecurity Relevance</h2>

                            <p>
                                Traceroute reveals network structure and can aid both troubleshooting and reconnaissance. Organizations may rate-limit or filter responses, which can hide some hops without affecting real application traffic.
                            </p>

                            <h2>Troubleshooting / Investigation Example</h2>

                            <p>
                                Do not assume the first non-responding hop is the failure. Test the final destination and understand that routers can forward traffic while refusing to answer traceroute probes.
                            </p>

                            <h2>Lesson Recap</h2>

                            <p>
                                Before moving on, make sure you can explain <strong>Traceroute</strong> in your own words, describe why it exists, follow the basic communication flow and connect the concept to a real troubleshooting or security scenario.
                            </p>

                            <h2>What Comes Next?</h2>

                            <p>
                                Next you will examine ICMP from a security-policy perspective, including why over-blocking can create blind spots or operational failures.
                            </p>`,

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
                        ,
                            {
                                question:
                                    "Which statement best describes TTL?",
                                options: [
                                    "IPv4 packet lifetime field decremented by routers.",
                                    "An intermediate routed step.",
                                    "ICMP response generated when packet lifetime expires.",
                                    "Diagnostic method for discovering path hops."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Hop?",
                                options: [
                                    "An intermediate routed step.",
                                    "IPv4 packet lifetime field decremented by routers.",
                                    "ICMP response generated when packet lifetime expires.",
                                    "Diagnostic method for discovering path hops."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Time Exceeded?",
                                options: [
                                    "ICMP response generated when packet lifetime expires.",
                                    "IPv4 packet lifetime field decremented by routers.",
                                    "An intermediate routed step.",
                                    "Diagnostic method for discovering path hops."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Traceroute?",
                                options: [
                                    "Diagnostic method for discovering path hops.",
                                    "IPv4 packet lifetime field decremented by routers.",
                                    "An intermediate routed step.",
                                    "ICMP response generated when packet lifetime expires."
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
                        

                            <h2>Why This Matters</h2>

                            <p>
                                ICMP sits at the intersection of operations and security. It can reveal information and participate in abuse, but it is also part of healthy IP networking and diagnostics.
                            </p>

                            <h2>How to Think About It</h2>

                            <p>
                                Security policy should consider message type, direction and business need. Echo traffic may be restricted differently from fragmentation-related messages or error reporting. Rate limiting is often more appropriate than indiscriminate blocking.
                            </p>

                            <h2>Worked Example</h2>

                            <p>
                                A perimeter firewall might block unsolicited inbound echo requests while still allowing necessary ICMP error messages. Internal monitoring may permit ping from management networks to servers.
                            </p>

                            <h2>Cybersecurity Relevance</h2>

                            <p>
                                Reconnaissance, covert channels and denial-of-service abuse are possible, yet defenders also rely on ICMP for visibility. Treat it as a protocol to govern, not simply “good” or “bad”.
                            </p>

                            <h2>Troubleshooting / Investigation Example</h2>

                            <p>
                                If large packets fail while smaller ones succeed, consider MTU and required ICMP messages. Excessive ICMP blocking can contribute to Path MTU Discovery problems.
                            </p>

                            <h2>Lesson Recap</h2>

                            <p>
                                Before moving on, make sure you can explain <strong>ICMP Security Considerations</strong> in your own words, describe why it exists, follow the basic communication flow and connect the concept to a real troubleshooting or security scenario.
                            </p>

                            <h2>What Comes Next?</h2>

                            <p>
                                The course now moves into routing: how hosts and routers choose paths between IP networks.
                            </p>`,

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
                        ,
                            {
                                question:
                                    "Which statement best describes Reconnaissance?",
                                options: [
                                    "Information gathering about systems and networks.",
                                    "Expected normal behaviour used for comparison.",
                                    "Allowing or denying traffic according to policy.",
                                    "Maximum packet size usable along a network path without problematic fragmentation."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Baseline?",
                                options: [
                                    "Expected normal behaviour used for comparison.",
                                    "Information gathering about systems and networks.",
                                    "Allowing or denying traffic according to policy.",
                                    "Maximum packet size usable along a network path without problematic fragmentation."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Filtering?",
                                options: [
                                    "Allowing or denying traffic according to policy.",
                                    "Information gathering about systems and networks.",
                                    "Expected normal behaviour used for comparison.",
                                    "Maximum packet size usable along a network path without problematic fragmentation."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Path MTU?",
                                options: [
                                    "Maximum packet size usable along a network path without problematic fragmentation.",
                                    "Information gathering about systems and networks.",
                                    "Expected normal behaviour used for comparison.",
                                    "Allowing or denying traffic according to policy."
                                ],
                                answer:
                                    0
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
                        

                            <h2>Why This Matters</h2>

                            <p>
                                Local switching only solves communication inside a Layer 2 segment. Routing allows packets to move between IP networks and ultimately across the Internet.
                            </p>

                            <h2>How to Think About It</h2>

                            <p>
                                A router compares the destination IP with entries in its routing table and chooses the most specific matching prefix. It then forwards the packet toward a next hop or directly connected interface, subject to policy and reachability.
                            </p>

                            <h2>Worked Example</h2>

                            <p>
                                A router with routes for 10.0.0.0/8 and 10.20.30.0/24 will prefer the /24 for destination 10.20.30.50 because it is the longer, more specific match.
                            </p>

                            <h2>Cybersecurity Relevance</h2>

                            <p>
                                Routing determines which networks are reachable. Route manipulation, misconfiguration or insecure peering can redirect or expose traffic. Firewalls often rely on correct routing to enforce expected paths.
                            </p>

                            <h2>Troubleshooting / Investigation Example</h2>

                            <p>
                                When local traffic works but remote traffic fails, inspect the host gateway and router routes in both directions. Return-path routing matters as much as the forward path.
                            </p>

                            <h2>Lesson Recap</h2>

                            <p>
                                Before moving on, make sure you can explain <strong>What Is Routing?</strong> in your own words, describe why it exists, follow the basic communication flow and connect the concept to a real troubleshooting or security scenario.
                            </p>

                            <h2>What Comes Next?</h2>

                            <p>
                                Next you will focus on the first router a host normally uses for remote destinations: the default gateway.
                            </p>`,

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
                        ,
                            {
                                question:
                                    "Which statement best describes Routing?",
                                options: [
                                    "Forwarding packets between IP networks.",
                                    "Instruction describing how to reach a destination prefix.",
                                    "Router/address toward which a packet is forwarded.",
                                    "Selecting the most specific matching route."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Route?",
                                options: [
                                    "Instruction describing how to reach a destination prefix.",
                                    "Forwarding packets between IP networks.",
                                    "Router/address toward which a packet is forwarded.",
                                    "Selecting the most specific matching route."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Next Hop?",
                                options: [
                                    "Router/address toward which a packet is forwarded.",
                                    "Forwarding packets between IP networks.",
                                    "Instruction describing how to reach a destination prefix.",
                                    "Selecting the most specific matching route."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Longest Prefix Match?",
                                options: [
                                    "Selecting the most specific matching route.",
                                    "Forwarding packets between IP networks.",
                                    "Instruction describing how to reach a destination prefix.",
                                    "Router/address toward which a packet is forwarded."
                                ],
                                answer:
                                    0
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
                        

                            <h2>Why This Matters</h2>

                            <p>
                                A host cannot maintain routes to every network on the Internet. The default gateway provides a simple next hop for destinations outside the local subnet.
                            </p>

                            <h2>How to Think About It</h2>

                            <p>
                                The host first decides whether the destination is local using its address and prefix. For a remote destination it resolves the gateway's local MAC address and sends an Ethernet frame to that gateway while keeping the remote IP as the packet destination.
                            </p>

                            <h2>Worked Example</h2>

                            <p>
                                Host 192.168.1.25/24 sending to 8.8.8.8 uses gateway 192.168.1.1. The Ethernet destination is the router MAC; the IP destination remains 8.8.8.8.
                            </p>

                            <h2>Cybersecurity Relevance</h2>

                            <p>
                                A malicious or incorrect gateway can intercept or disrupt traffic. DHCP configuration and local ARP integrity therefore influence which device becomes the next hop.
                            </p>

                            <h2>Troubleshooting / Investigation Example</h2>

                            <p>
                                If same-subnet systems work but remote destinations fail, verify the configured default gateway, confirm it is in the local subnet and test reachability to it.
                            </p>

                            <h2>Lesson Recap</h2>

                            <p>
                                Before moving on, make sure you can explain <strong>Default Gateways</strong> in your own words, describe why it exists, follow the basic communication flow and connect the concept to a real troubleshooting or security scenario.
                            </p>

                            <h2>What Comes Next?</h2>

                            <p>
                                Routing tables generalize this concept by storing many possible destination prefixes and next hops.
                            </p>`,

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
                        ,
                            {
                                question:
                                    "Which statement best describes Default Gateway?",
                                options: [
                                    "Router used for destinations without a more specific route.",
                                    "Network directly reachable without an IP router.",
                                    "Network requiring routing.",
                                    "Layer 2 destination used to deliver a remote-bound packet to the local router."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Local Subnet?",
                                options: [
                                    "Network directly reachable without an IP router.",
                                    "Router used for destinations without a more specific route.",
                                    "Network requiring routing.",
                                    "Layer 2 destination used to deliver a remote-bound packet to the local router."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Remote Network?",
                                options: [
                                    "Network requiring routing.",
                                    "Router used for destinations without a more specific route.",
                                    "Network directly reachable without an IP router.",
                                    "Layer 2 destination used to deliver a remote-bound packet to the local router."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Gateway MAC?",
                                options: [
                                    "Layer 2 destination used to deliver a remote-bound packet to the local router.",
                                    "Router used for destinations without a more specific route.",
                                    "Network directly reachable without an IP router.",
                                    "Network requiring routing."
                                ],
                                answer:
                                    0
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
                        

                            <h2>Why This Matters</h2>

                            <p>
                                Routing tables are the decision maps used by hosts and routers. Reading them explains why traffic chooses one interface or next hop instead of another.
                            </p>

                            <h2>How to Think About It</h2>

                            <p>
                                Routes include a destination prefix and forwarding information. Selection commonly prefers the longest prefix match, then uses route preference or metrics when multiple candidate routes exist. A default route matches destinations not covered by more specific entries.
                            </p>

                            <h2>Worked Example</h2>

                            <p>
                                For destination 192.168.50.20, a route 192.168.50.0/24 beats 192.168.0.0/16 because /24 is more specific. If neither exists, 0.0.0.0/0 may be used.
                            </p>

                            <h2>Cybersecurity Relevance</h2>

                            <p>
                                Unexpected routes can bypass monitoring points or send sensitive traffic to unauthorized gateways. Route-table review is therefore useful in host and network investigations.
                            </p>

                            <h2>Troubleshooting / Investigation Example</h2>

                            <p>
                                If traffic follows the wrong path, compare competing prefix lengths, metrics, VPN routes and policy routes. Also confirm the reverse path from the destination.
                            </p>

                            <h2>Lesson Recap</h2>

                            <p>
                                Before moving on, make sure you can explain <strong>Routing Tables</strong> in your own words, describe why it exists, follow the basic communication flow and connect the concept to a real troubleshooting or security scenario.
                            </p>

                            <h2>What Comes Next?</h2>

                            <p>
                                Next you will compare manually configured static routes with routes learned dynamically between routers.
                            </p>`,

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
                        ,
                            {
                                question:
                                    "Which statement best describes Default Route?",
                                options: [
                                    "Fallback route, represented as 0.0.0.0/0 in IPv4.",
                                    "Value influencing preference among candidate routes.",
                                    "Local network endpoint used to transmit traffic.",
                                    "Set of routes used for forwarding decisions."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Metric?",
                                options: [
                                    "Value influencing preference among candidate routes.",
                                    "Fallback route, represented as 0.0.0.0/0 in IPv4.",
                                    "Local network endpoint used to transmit traffic.",
                                    "Set of routes used for forwarding decisions."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Interface?",
                                options: [
                                    "Local network endpoint used to transmit traffic.",
                                    "Fallback route, represented as 0.0.0.0/0 in IPv4.",
                                    "Value influencing preference among candidate routes.",
                                    "Set of routes used for forwarding decisions."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Routing Table?",
                                options: [
                                    "Set of routes used for forwarding decisions.",
                                    "Fallback route, represented as 0.0.0.0/0 in IPv4.",
                                    "Value influencing preference among candidate routes.",
                                    "Local network endpoint used to transmit traffic."
                                ],
                                answer:
                                    0
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
                        

                            <h2>Why This Matters</h2>

                            <p>
                                Small networks may be manageable with manually configured routes, while larger environments need routers to exchange reachability information automatically.
                            </p>

                            <h2>How to Think About It</h2>

                            <p>
                                Static routes are explicitly configured and remain until changed or made unusable by dependent conditions. Dynamic routing protocols such as OSPF or BGP exchange information and calculate paths according to protocol-specific rules.
                            </p>

                            <h2>Worked Example</h2>

                            <p>
                                A small branch can use one static default route toward headquarters. An enterprise with many redundant paths may use OSPF internally so routers automatically adapt when a link fails.
                            </p>

                            <h2>Cybersecurity Relevance</h2>

                            <p>
                                Dynamic routing introduces trust relationships and control-plane attack surface. Authentication, filtering and careful peer configuration help prevent unauthorized route advertisements.
                            </p>

                            <h2>Troubleshooting / Investigation Example</h2>

                            <p>
                                When a dynamic route disappears, check neighbor relationships, interface state, advertisements and policy filters. When static routes fail, verify next-hop reachability and exact prefix syntax.
                            </p>

                            <h2>Lesson Recap</h2>

                            <p>
                                Before moving on, make sure you can explain <strong>Static and Dynamic Routing</strong> in your own words, describe why it exists, follow the basic communication flow and connect the concept to a real troubleshooting or security scenario.
                            </p>

                            <h2>What Comes Next?</h2>

                            <p>
                                The next lesson examines routing-specific threats and defensive controls.
                            </p>`,

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
                        ,
                            {
                                question:
                                    "Which statement best describes Static Route?",
                                options: [
                                    "Manually configured route.",
                                    "Automated route exchange between routers.",
                                    "Interior routing protocol commonly used within organizations.",
                                    "Path-vector routing protocol central to inter-domain Internet routing."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Dynamic Routing?",
                                options: [
                                    "Automated route exchange between routers.",
                                    "Manually configured route.",
                                    "Interior routing protocol commonly used within organizations.",
                                    "Path-vector routing protocol central to inter-domain Internet routing."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes OSPF?",
                                options: [
                                    "Interior routing protocol commonly used within organizations.",
                                    "Manually configured route.",
                                    "Automated route exchange between routers.",
                                    "Path-vector routing protocol central to inter-domain Internet routing."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes BGP?",
                                options: [
                                    "Path-vector routing protocol central to inter-domain Internet routing.",
                                    "Manually configured route.",
                                    "Automated route exchange between routers.",
                                    "Interior routing protocol commonly used within organizations."
                                ],
                                answer:
                                    0
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
                        

                            <h2>Why This Matters</h2>

                            <p>
                                If an attacker or misconfiguration changes where traffic is routed, confidentiality, availability and monitoring can all be affected even when endpoints themselves are secure.
                            </p>

                            <h2>How to Think About It</h2>

                            <p>
                                Routing security includes protecting router management access, authenticating routing peers where supported, filtering accepted and advertised prefixes, logging changes and limiting who can modify routes.
                            </p>

                            <h2>Worked Example</h2>

                            <p>
                                An incorrect route for a sensitive subnet could send traffic through an untrusted path or black-hole the network. A more specific malicious route can win because longest-prefix matching prefers it.
                            </p>

                            <h2>Cybersecurity Relevance</h2>

                            <p>
                                Internet-scale route leaks and hijacks demonstrate that routing is a security dependency. Inside enterprises, compromised routing devices can also alter segmentation and traffic paths.
                            </p>

                            <h2>Troubleshooting / Investigation Example</h2>

                            <p>
                                When traffic suddenly changes path, compare current routes with known-good configuration, review routing-protocol events and check for newly advertised more-specific prefixes.
                            </p>

                            <h2>Lesson Recap</h2>

                            <p>
                                Before moving on, make sure you can explain <strong>Routing Security</strong> in your own words, describe why it exists, follow the basic communication flow and connect the concept to a real troubleshooting or security scenario.
                            </p>

                            <h2>What Comes Next?</h2>

                            <p>
                                With routing understood, the course moves to application-layer infrastructure: DNS and DHCP.
                            </p>`,

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
                        ,
                            {
                                question:
                                    "Which statement best describes Control Plane?",
                                options: [
                                    "Network logic responsible for learning and maintaining forwarding information.",
                                    "Unauthorized or incorrect advertisement attracting traffic.",
                                    "Policy controlling which routes are accepted or advertised.",
                                    "Infrastructure supporting cryptographic validation of route-origin authorization."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Route Hijack?",
                                options: [
                                    "Unauthorized or incorrect advertisement attracting traffic.",
                                    "Network logic responsible for learning and maintaining forwarding information.",
                                    "Policy controlling which routes are accepted or advertised.",
                                    "Infrastructure supporting cryptographic validation of route-origin authorization."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Prefix Filtering?",
                                options: [
                                    "Policy controlling which routes are accepted or advertised.",
                                    "Network logic responsible for learning and maintaining forwarding information.",
                                    "Unauthorized or incorrect advertisement attracting traffic.",
                                    "Infrastructure supporting cryptographic validation of route-origin authorization."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes RPKI?",
                                options: [
                                    "Infrastructure supporting cryptographic validation of route-origin authorization.",
                                    "Network logic responsible for learning and maintaining forwarding information.",
                                    "Unauthorized or incorrect advertisement attracting traffic.",
                                    "Policy controlling which routes are accepted or advertised."
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
                        

                            <h2>Why This Matters</h2>

                            <p>
                                Humans prefer names while IP networking uses addresses. DNS provides a scalable distributed system that maps names to many kinds of network information and lets services move without requiring users to memorize new addresses.
                            </p>

                            <h2>How to Think About It</h2>

                            <p>
                                A client normally asks a configured recursive resolver. If the answer is not cached, the resolver can follow delegation from root servers to a top-level-domain server and then to the authoritative server for the requested zone. The final answer is returned and cached according to TTL.
                            </p>

                            <h2>Worked Example</h2>

                            <p>
                                To resolve www.example.com, a resolver may learn which servers handle .com, then which servers are authoritative for example.com, and finally request the www record. The browser then uses the returned address to start network communication.
                            </p>

                            <h2>Cybersecurity Relevance</h2>

                            <p>
                                DNS is both infrastructure and telemetry. Phishing depends on deceptive names, malware can query command-and-control domains and defenders can use DNS logs to understand endpoint behaviour.
                            </p>

                            <h2>Troubleshooting / Investigation Example</h2>

                            <p>
                                If an IP works but a hostname does not, compare local resolver configuration, cached answers, authoritative records and query responses. Test with `nslookup` or `dig` rather than guessing.
                            </p>

                            <h2>Lesson Recap</h2>

                            <p>
                                Before moving on, make sure you can explain <strong>Introduction to DNS</strong> in your own words, describe why it exists, follow the basic communication flow and connect the concept to a real troubleshooting or security scenario.
                            </p>

                            <h2>What Comes Next?</h2>

                            <p>
                                Next you will learn the individual record types stored in DNS zones and what each one means.
                            </p>`,

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
                        ,
                            {
                                question:
                                    "Which statement best describes DNS?",
                                options: [
                                    "Distributed Domain Name System.",
                                    "Service that performs or assists DNS lookups.",
                                    "Server responsible for definitive records in a DNS zone.",
                                    "Temporarily stored DNS answer."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Resolver?",
                                options: [
                                    "Service that performs or assists DNS lookups.",
                                    "Distributed Domain Name System.",
                                    "Server responsible for definitive records in a DNS zone.",
                                    "Temporarily stored DNS answer."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Authoritative Server?",
                                options: [
                                    "Server responsible for definitive records in a DNS zone.",
                                    "Distributed Domain Name System.",
                                    "Service that performs or assists DNS lookups.",
                                    "Temporarily stored DNS answer."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Cache?",
                                options: [
                                    "Temporarily stored DNS answer.",
                                    "Distributed Domain Name System.",
                                    "Service that performs or assists DNS lookups.",
                                    "Server responsible for definitive records in a DNS zone."
                                ],
                                answer:
                                    0
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
                        

                            <h2>Why This Matters</h2>

                            <p>
                                DNS is not simply a hostname-to-IPv4 database. Different record types represent IPv4, IPv6, aliases, mail routing, delegation, reverse mappings and policy or verification text.
                            </p>

                            <h2>How to Think About It</h2>

                            <p>
                                A records return IPv4 addresses, AAAA returns IPv6, CNAME aliases one name to another, MX identifies mail exchangers, NS identifies authoritative servers, TXT stores text data and PTR is commonly used in reverse lookup zones.
                            </p>

                            <h2>Worked Example</h2>

                            <p>
                                A company may publish `www` as an A record, mail routing with MX, SPF information inside TXT records and authoritative server names with NS records. Each record answers a different question.
                            </p>

                            <h2>Cybersecurity Relevance</h2>

                            <p>
                                Public records intentionally disclose some infrastructure. Defenders should remove stale records, protect registrar and DNS-provider accounts and monitor unauthorized changes. Security testers interpret records only within authorized reconnaissance scopes.
                            </p>

                            <h2>Troubleshooting / Investigation Example</h2>

                            <p>
                                When a service fails, request the exact record type instead of only doing a generic lookup. A working A record does not prove that MX, TXT or delegation is correct.
                            </p>

                            <h2>Lesson Recap</h2>

                            <p>
                                Before moving on, make sure you can explain <strong>DNS Records</strong> in your own words, describe why it exists, follow the basic communication flow and connect the concept to a real troubleshooting or security scenario.
                            </p>

                            <h2>What Comes Next?</h2>

                            <p>
                                Next you will follow the resolution process step by step and understand caching, TTL and common failure points.
                            </p>`,

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
                        ,
                            {
                                question:
                                    "Which statement best describes A Record?",
                                options: [
                                    "Maps a name to an IPv4 address.",
                                    "Maps a name to an IPv6 address.",
                                    "Identifies mail servers for a domain.",
                                    "Aliases one DNS name to another."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes AAAA Record?",
                                options: [
                                    "Maps a name to an IPv6 address.",
                                    "Maps a name to an IPv4 address.",
                                    "Identifies mail servers for a domain.",
                                    "Aliases one DNS name to another."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes MX Record?",
                                options: [
                                    "Identifies mail servers for a domain.",
                                    "Maps a name to an IPv4 address.",
                                    "Maps a name to an IPv6 address.",
                                    "Aliases one DNS name to another."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes CNAME?",
                                options: [
                                    "Aliases one DNS name to another.",
                                    "Maps a name to an IPv4 address.",
                                    "Maps a name to an IPv6 address.",
                                    "Identifies mail servers for a domain."
                                ],
                                answer:
                                    0
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
                        

                            <h2>Why This Matters</h2>

                            <p>
                                Knowing record types is only part of DNS. Troubleshooting requires understanding how a query moves from the application through caches, recursive resolvers, delegation and authoritative servers.
                            </p>

                            <h2>How to Think About It</h2>

                            <p>
                                The operating system stub resolver asks a recursive server. The recursive server checks cache; if needed it follows referrals through the DNS hierarchy. The authoritative server supplies the answer or relevant negative response. TTL determines how long cached data can normally be reused.
                            </p>

                            <h2>Worked Example</h2>

                            <p>
                                A recently changed A record may be correct on the authoritative server while some users still receive the old address because their recursive resolvers legitimately cached it before the change.
                            </p>

                            <h2>Cybersecurity Relevance</h2>

                            <p>
                                Resolution paths create multiple observation and trust points. DNSSEC can provide authenticity for signed DNS data, while encrypted DNS transports affect where defenders can observe client queries.
                            </p>

                            <h2>Troubleshooting / Investigation Example</h2>

                            <p>
                                Compare answers from the local resolver with direct queries to authoritative servers. Check TTL, CNAME chains, delegation and whether negative responses are being cached.
                            </p>

                            <h2>Lesson Recap</h2>

                            <p>
                                Before moving on, make sure you can explain <strong>DNS Resolution</strong> in your own words, describe why it exists, follow the basic communication flow and connect the concept to a real troubleshooting or security scenario.
                            </p>

                            <h2>What Comes Next?</h2>

                            <p>
                                DNS tells systems where services are; DHCP helps devices obtain the network configuration required to communicate in the first place.
                            </p>`,

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
                        ,
                            {
                                question:
                                    "Which statement best describes Stub Resolver?",
                                options: [
                                    "Client-side component asking a recursive DNS resolver.",
                                    "DNS hierarchy directing queries to authoritative servers.",
                                    "Time-to-live controlling caching duration.",
                                    "DNS response indicating the queried name does not exist."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Delegation?",
                                options: [
                                    "DNS hierarchy directing queries to authoritative servers.",
                                    "Client-side component asking a recursive DNS resolver.",
                                    "Time-to-live controlling caching duration.",
                                    "DNS response indicating the queried name does not exist."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes TTL?",
                                options: [
                                    "Time-to-live controlling caching duration.",
                                    "Client-side component asking a recursive DNS resolver.",
                                    "DNS hierarchy directing queries to authoritative servers.",
                                    "DNS response indicating the queried name does not exist."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes NXDOMAIN?",
                                options: [
                                    "DNS response indicating the queried name does not exist.",
                                    "Client-side component asking a recursive DNS resolver.",
                                    "DNS hierarchy directing queries to authoritative servers.",
                                    "Time-to-live controlling caching duration."
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
                        

                            <h2>Why This Matters</h2>

                            <p>
                                Manually configuring every client IP address, mask, gateway and DNS server does not scale. DHCP automates network configuration and reduces administrative errors.
                            </p>

                            <h2>How to Think About It</h2>

                            <p>
                                A typical IPv4 lease process is summarized as DORA: Discover, Offer, Request, Acknowledge. A new client broadcasts because it may not yet know its own network details. The server offers configuration and records the lease.
                            </p>

                            <h2>Worked Example</h2>

                            <p>
                                A laptop joins office Wi-Fi, broadcasts DHCP Discover, receives an offer for 10.20.30.55/24 with gateway 10.20.30.1 and DNS 10.20.1.10, requests the offer and receives an acknowledgement.
                            </p>

                            <h2>Cybersecurity Relevance</h2>

                            <p>
                                Unauthorized DHCP servers can provide malicious gateways or DNS settings. Switch features such as DHCP snooping can help establish trusted server ports and support other controls such as Dynamic ARP Inspection.
                            </p>

                            <h2>Troubleshooting / Investigation Example</h2>

                            <p>
                                If a Windows host receives 169.254.x.x unexpectedly, investigate whether DHCP messages are reaching a valid server, whether the pool has free addresses and whether VLAN relay configuration is correct.
                            </p>

                            <h2>Lesson Recap</h2>

                            <p>
                                Before moving on, make sure you can explain <strong>Understanding DHCP</strong> in your own words, describe why it exists, follow the basic communication flow and connect the concept to a real troubleshooting or security scenario.
                            </p>

                            <h2>What Comes Next?</h2>

                            <p>
                                The next lesson combines DNS and DHCP from a security perspective, focusing on tampering, monitoring and hardening.
                            </p>`,

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
                        ,
                            {
                                question:
                                    "Which statement best describes DHCP?",
                                options: [
                                    "Protocol for automated host network configuration.",
                                    "Temporary assignment of configuration.",
                                    "Discover, Offer, Request, Acknowledge.",
                                    "Switch security feature distinguishing trusted DHCP information."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Lease?",
                                options: [
                                    "Temporary assignment of configuration.",
                                    "Protocol for automated host network configuration.",
                                    "Discover, Offer, Request, Acknowledge.",
                                    "Switch security feature distinguishing trusted DHCP information."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes DORA?",
                                options: [
                                    "Discover, Offer, Request, Acknowledge.",
                                    "Protocol for automated host network configuration.",
                                    "Temporary assignment of configuration.",
                                    "Switch security feature distinguishing trusted DHCP information."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes DHCP Snooping?",
                                options: [
                                    "Switch security feature distinguishing trusted DHCP information.",
                                    "Protocol for automated host network configuration.",
                                    "Temporary assignment of configuration.",
                                    "Discover, Offer, Request, Acknowledge."
                                ],
                                answer:
                                    0
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
                        

                            <h2>Why This Matters</h2>

                            <p>
                                DNS and DHCP shape how clients find services and how they are configured. Compromise of either service can redirect users without changing the endpoint application itself.
                            </p>

                            <h2>How to Think About It</h2>

                            <p>
                                Protect DNS administrative accounts, restrict zone changes, monitor record modifications and use secure update mechanisms. For DHCP, control trusted server locations, monitor leases and use switch protections where supported.
                            </p>

                            <h2>Worked Example</h2>

                            <p>
                                A rogue DHCP server could give clients an attacker-controlled DNS resolver. The clients may appear to have normal IP connectivity while name resolution is manipulated.
                            </p>

                            <h2>Cybersecurity Relevance</h2>

                            <p>
                                Monitor sudden DNS-record changes, suspicious newly registered domains, unusual query volume, unauthorized DHCP offers and unexpected gateway or DNS options.
                            </p>

                            <h2>Troubleshooting / Investigation Example</h2>

                            <p>
                                When many users suddenly reach wrong destinations, compare their DHCP options and DNS responses. A shared infrastructure problem can affect many endpoints at once.
                            </p>

                            <h2>Lesson Recap</h2>

                            <p>
                                Before moving on, make sure you can explain <strong>DNS and DHCP Security</strong> in your own words, describe why it exists, follow the basic communication flow and connect the concept to a real troubleshooting or security scenario.
                            </p>

                            <h2>What Comes Next?</h2>

                            <p>
                                The course now follows web traffic after DNS resolution, beginning with HTTP.
                            </p>`,

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
                        ,
                            {
                                question:
                                    "Which statement best describes DNSSEC?",
                                options: [
                                    "Extensions enabling cryptographic validation of DNS data origin/integrity.",
                                    "Encoding data within DNS queries/responses for covert communication.",
                                    "Unauthorized DHCP service providing configuration.",
                                    "Attempt to consume available DHCP leases."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes DNS Tunneling?",
                                options: [
                                    "Encoding data within DNS queries/responses for covert communication.",
                                    "Extensions enabling cryptographic validation of DNS data origin/integrity.",
                                    "Unauthorized DHCP service providing configuration.",
                                    "Attempt to consume available DHCP leases."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Rogue DHCP?",
                                options: [
                                    "Unauthorized DHCP service providing configuration.",
                                    "Extensions enabling cryptographic validation of DNS data origin/integrity.",
                                    "Encoding data within DNS queries/responses for covert communication.",
                                    "Attempt to consume available DHCP leases."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes DHCP Starvation?",
                                options: [
                                    "Attempt to consume available DHCP leases.",
                                    "Extensions enabling cryptographic validation of DNS data origin/integrity.",
                                    "Encoding data within DNS queries/responses for covert communication.",
                                    "Unauthorized DHCP service providing configuration."
                                ],
                                answer:
                                    0
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
                        

                            <h2>Why This Matters</h2>

                            <p>
                                HTTP is the application protocol behind the web and many APIs. Security professionals encounter it in proxies, browser developer tools, web-server logs and application-security testing.
                            </p>

                            <h2>How to Think About It</h2>

                            <p>
                                HTTP follows a request-response model. A client sends a request describing a resource and action. The server returns a response containing a status, headers and often a body. HTTP semantics are independent of whether TLS protects the transport.
                            </p>

                            <h2>Worked Example</h2>

                            <p>
                                A browser requests `/courses` from a web server. The server may return `200 OK` with HTML. A request for a missing resource may return `404 Not Found`.
                            </p>

                            <h2>Cybersecurity Relevance</h2>

                            <p>
                                HTTP carries authentication tokens, cookies, parameters and application data. Understanding its structure is essential for recognizing insecure exposure, suspicious requests and web-application attacks.
                            </p>

                            <h2>Troubleshooting / Investigation Example</h2>

                            <p>
                                If DNS and TCP work but the page fails, inspect the HTTP status, response headers, redirects and application logs rather than assuming basic networking is broken.
                            </p>

                            <h2>Lesson Recap</h2>

                            <p>
                                Before moving on, make sure you can explain <strong>Introduction to HTTP</strong> in your own words, describe why it exists, follow the basic communication flow and connect the concept to a real troubleshooting or security scenario.
                            </p>

                            <h2>What Comes Next?</h2>

                            <p>
                                Next you will break HTTP into the exact structure of requests and responses.
                            </p>`,

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
                        ,
                            {
                                question:
                                    "Which statement best describes HTTP?",
                                options: [
                                    "Application protocol for web communication.",
                                    "Message sent by a client to a server.",
                                    "Message returned by a server.",
                                    "HTTP protected using TLS."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Request?",
                                options: [
                                    "Message sent by a client to a server.",
                                    "Application protocol for web communication.",
                                    "Message returned by a server.",
                                    "HTTP protected using TLS."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Response?",
                                options: [
                                    "Message returned by a server.",
                                    "Application protocol for web communication.",
                                    "Message sent by a client to a server.",
                                    "HTTP protected using TLS."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes HTTPS?",
                                options: [
                                    "HTTP protected using TLS.",
                                    "Application protocol for web communication.",
                                    "Message sent by a client to a server.",
                                    "Message returned by a server."
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
                        

                            <h2>Why This Matters</h2>

                            <p>
                                Web troubleshooting and security analysis depend on reading raw HTTP rather than only seeing the rendered page. Headers and bodies reveal what the browser actually sent and what the server actually returned.
                            </p>

                            <h2>How to Think About It</h2>

                            <p>
                                A request contains a request line, headers and optionally a body. A response contains a status line, headers and optionally a body. Headers carry metadata such as Host, Content-Type, authorization information, cookies and caching directives.
                            </p>

                            <h2>Worked Example</h2>

                            <p>
                                A request `GET /login HTTP/1.1` with `Host: academy.example.com` asks for the login resource. A response `HTTP/1.1 200 OK` with `Content-Type: text/html` tells the client how to interpret the returned body.
                            </p>

                            <h2>Cybersecurity Relevance</h2>

                            <p>
                                Sensitive tokens can appear in Authorization or Cookie headers. Proxies and logs must be configured carefully so secrets are not exposed unnecessarily.
                            </p>

                            <h2>Troubleshooting / Investigation Example</h2>

                            <p>
                                Compare the request that failed with one that succeeds. Differences in Host, method, cookies, content type or redirects often explain application behaviour.
                            </p>

                            <h2>Lesson Recap</h2>

                            <p>
                                Before moving on, make sure you can explain <strong>HTTP Requests and Responses</strong> in your own words, describe why it exists, follow the basic communication flow and connect the concept to a real troubleshooting or security scenario.
                            </p>

                            <h2>What Comes Next?</h2>

                            <p>
                                The next lesson adds meaning to common methods and status-code families so you can interpret application behaviour quickly.
                            </p>`,

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
                        ,
                            {
                                question:
                                    "Which statement best describes Header?",
                                options: [
                                    "HTTP metadata field.",
                                    "Optional message content.",
                                    "Browser-stored value commonly used for session or application state.",
                                    "Numeric result category in an HTTP response."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Body?",
                                options: [
                                    "Optional message content.",
                                    "HTTP metadata field.",
                                    "Browser-stored value commonly used for session or application state.",
                                    "Numeric result category in an HTTP response."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Cookie?",
                                options: [
                                    "Browser-stored value commonly used for session or application state.",
                                    "HTTP metadata field.",
                                    "Optional message content.",
                                    "Numeric result category in an HTTP response."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Status Code?",
                                options: [
                                    "Numeric result category in an HTTP response.",
                                    "HTTP metadata field.",
                                    "Optional message content.",
                                    "Browser-stored value commonly used for session or application state."
                                ],
                                answer:
                                    0
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
                        

                            <h2>Why This Matters</h2>

                            <p>
                                Methods communicate intended actions while status codes summarize server outcomes. Understanding both makes logs and proxy captures far easier to interpret.
                            </p>

                            <h2>How to Think About It</h2>

                            <p>
                                GET commonly retrieves resources, POST submits data, PUT replaces or creates representations, PATCH modifies and DELETE requests removal. Status codes are grouped: 1xx informational, 2xx success, 3xx redirection, 4xx client-side/request problems and 5xx server errors.
                            </p>

                            <h2>Worked Example</h2>

                            <p>
                                `GET /profile` may return 200. Accessing a protected page without authentication may return 401 or redirect to login. A non-existent path may return 404, while an application crash can produce 500.
                            </p>

                            <h2>Cybersecurity Relevance</h2>

                            <p>
                                Unexpected methods, repeated 401/403 responses and unusual 404 patterns may appear during probing, but context is essential because legitimate applications can generate the same codes.
                            </p>

                            <h2>Troubleshooting / Investigation Example</h2>

                            <p>
                                Treat status codes as starting points, not complete diagnoses. A 502 from a reverse proxy can mean the frontend is reachable while a backend service is unhealthy.
                            </p>

                            <h2>Lesson Recap</h2>

                            <p>
                                Before moving on, make sure you can explain <strong>HTTP Methods and Status Codes</strong> in your own words, describe why it exists, follow the basic communication flow and connect the concept to a real troubleshooting or security scenario.
                            </p>

                            <h2>What Comes Next?</h2>

                            <p>
                                HTTP by itself does not protect confidentiality. HTTPS combines HTTP with TLS, which is the next lesson.
                            </p>`,

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
                        ,
                            {
                                question:
                                    "Which statement best describes GET?",
                                options: [
                                    "HTTP method commonly used to retrieve data.",
                                    "Method commonly used to submit data or trigger processing.",
                                    "Status-code class indicating client/request errors.",
                                    "Status-code class indicating server errors."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes POST?",
                                options: [
                                    "Method commonly used to submit data or trigger processing.",
                                    "HTTP method commonly used to retrieve data.",
                                    "Status-code class indicating client/request errors.",
                                    "Status-code class indicating server errors."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes 4xx?",
                                options: [
                                    "Status-code class indicating client/request errors.",
                                    "HTTP method commonly used to retrieve data.",
                                    "Method commonly used to submit data or trigger processing.",
                                    "Status-code class indicating server errors."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes 5xx?",
                                options: [
                                    "Status-code class indicating server errors.",
                                    "HTTP method commonly used to retrieve data.",
                                    "Method commonly used to submit data or trigger processing.",
                                    "Status-code class indicating client/request errors."
                                ],
                                answer:
                                    0
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
                        

                            <h2>Why This Matters</h2>

                            <p>
                                Plain HTTP can expose data to observers on the path. TLS provides confidentiality, integrity and server authentication so HTTP can be transported securely as HTTPS.
                            </p>

                            <h2>How to Think About It</h2>

                            <p>
                                During a TLS handshake, client and server negotiate cryptographic parameters and the server presents a certificate. The client validates the certificate chain and hostname before establishing encrypted session keys. Modern TLS uses asymmetric cryptography mainly for authentication/key agreement and efficient symmetric encryption for data.
                            </p>

                            <h2>Worked Example</h2>

                            <p>
                                When a browser connects to `https://example.com`, it verifies that the certificate is valid for the hostname and chains to a trusted certificate authority. After the handshake, HTTP content is encrypted inside TLS records.
                            </p>

                            <h2>Cybersecurity Relevance</h2>

                            <p>
                                TLS protects data in transit but does not make the web application itself secure. A vulnerable application can still be attacked over a perfectly encrypted HTTPS connection.
                            </p>

                            <h2>Troubleshooting / Investigation Example</h2>

                            <p>
                                Certificate errors may result from wrong hostname, expired certificate, untrusted issuer, clock problems or interception. TLS-version and cipher incompatibility can also prevent connection establishment.
                            </p>

                            <h2>Lesson Recap</h2>

                            <p>
                                Before moving on, make sure you can explain <strong>HTTPS and TLS</strong> in your own words, describe why it exists, follow the basic communication flow and connect the concept to a real troubleshooting or security scenario.
                            </p>

                            <h2>What Comes Next?</h2>

                            <p>
                                Next you will interpret web traffic from a defender and tester perspective, combining HTTP, TLS, proxies and logs.
                            </p>`,

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
                        ,
                            {
                                question:
                                    "Which statement best describes TLS?",
                                options: [
                                    "Protocol protecting application traffic in transit.",
                                    "Signed data binding identities such as hostnames to public keys.",
                                    "Certification Authority trusted to issue or sign certificates.",
                                    "Symmetric key material used to encrypt an established session."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Certificate?",
                                options: [
                                    "Signed data binding identities such as hostnames to public keys.",
                                    "Protocol protecting application traffic in transit.",
                                    "Certification Authority trusted to issue or sign certificates.",
                                    "Symmetric key material used to encrypt an established session."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes CA?",
                                options: [
                                    "Certification Authority trusted to issue or sign certificates.",
                                    "Protocol protecting application traffic in transit.",
                                    "Signed data binding identities such as hostnames to public keys.",
                                    "Symmetric key material used to encrypt an established session."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Session Key?",
                                options: [
                                    "Symmetric key material used to encrypt an established session.",
                                    "Protocol protecting application traffic in transit.",
                                    "Signed data binding identities such as hostnames to public keys.",
                                    "Certification Authority trusted to issue or sign certificates."
                                ],
                                answer:
                                    0
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
                        

                            <h2>Why This Matters</h2>

                            <p>
                                Web applications are major attack surfaces, and their network traffic contains valuable evidence. Defenders need to know what can be observed in HTTP, what TLS hides and where logs remain available.
                            </p>

                            <h2>How to Think About It</h2>

                            <p>
                                A reverse proxy or web server can record source context, requested path, method, status, user agent and timing. TLS encrypts content on the network path, but endpoints terminating TLS can still inspect application requests.
                            </p>

                            <h2>Worked Example</h2>

                            <p>
                                A burst of requests for many unusual paths followed by repeated 404 responses may indicate automated enumeration. The same activity from an approved vulnerability scanner may be expected, so authorization context matters.
                            </p>

                            <h2>Cybersecurity Relevance</h2>

                            <p>
                                Use HTTPS, secure cookies, appropriate headers, authentication, input validation and server-side authorization. Network controls complement but do not replace application security.
                            </p>

                            <h2>Troubleshooting / Investigation Example</h2>

                            <p>
                                When suspicious traffic is reported, correlate reverse-proxy logs, application logs, WAF events, authentication logs and endpoint activity before drawing conclusions.
                            </p>

                            <h2>Lesson Recap</h2>

                            <p>
                                Before moving on, make sure you can explain <strong>Web Traffic Security</strong> in your own words, describe why it exists, follow the basic communication flow and connect the concept to a real troubleshooting or security scenario.
                            </p>

                            <h2>What Comes Next?</h2>

                            <p>
                                The final module combines the networking concepts into security architecture, monitoring and packet analysis.
                            </p>`,

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
                        ,
                            {
                                question:
                                    "Which statement best describes Forward Proxy?",
                                options: [
                                    "Intermediary acting on behalf of clients.",
                                    "Intermediary acting on behalf of servers.",
                                    "Web Application Firewall inspecting application-layer web traffic.",
                                    "Information about communication such as endpoints and timing, separate from content."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Reverse Proxy?",
                                options: [
                                    "Intermediary acting on behalf of servers.",
                                    "Intermediary acting on behalf of clients.",
                                    "Web Application Firewall inspecting application-layer web traffic.",
                                    "Information about communication such as endpoints and timing, separate from content."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes WAF?",
                                options: [
                                    "Web Application Firewall inspecting application-layer web traffic.",
                                    "Intermediary acting on behalf of clients.",
                                    "Intermediary acting on behalf of servers.",
                                    "Information about communication such as endpoints and timing, separate from content."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Metadata?",
                                options: [
                                    "Information about communication such as endpoints and timing, separate from content.",
                                    "Intermediary acting on behalf of clients.",
                                    "Intermediary acting on behalf of servers.",
                                    "Web Application Firewall inspecting application-layer web traffic."
                                ],
                                answer:
                                    0
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
                        

                            <h2>Why This Matters</h2>

                            <p>
                                Segmentation reduces unnecessary trust and communication. If every endpoint can freely reach every server, one compromised device may have a much easier path to sensitive systems.
                            </p>

                            <h2>How to Think About It</h2>

                            <p>
                                Create zones or subnets around function and trust level, then route between them through policy controls. VLANs provide Layer 2 separation; routers and firewalls enforce Layer 3/4 communication rules; identity-aware controls can add context.
                            </p>

                            <h2>Worked Example</h2>

                            <p>
                                Guest, user, server and management networks can be separated. Guests may reach only the Internet, users reach approved application ports and management access is limited to administrator networks.
                            </p>

                            <h2>Cybersecurity Relevance</h2>

                            <p>
                                Segmentation supports least privilege and containment. It is especially valuable for protecting administrative interfaces, backup systems, identity infrastructure and sensitive databases.
                            </p>

                            <h2>Troubleshooting / Investigation Example</h2>

                            <p>
                                When segmentation blocks business traffic, document the exact required flow and create narrow rules. Avoid “temporary” any-to-any exceptions that become permanent.
                            </p>

                            <h2>Lesson Recap</h2>

                            <p>
                                Before moving on, make sure you can explain <strong>Network Segmentation</strong> in your own words, describe why it exists, follow the basic communication flow and connect the concept to a real troubleshooting or security scenario.
                            </p>

                            <h2>What Comes Next?</h2>

                            <p>
                                Firewalls are one of the main controls used to enforce policy between network segments.
                            </p>`,

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
                        ,
                            {
                                question:
                                    "Which statement best describes Segmentation?",
                                options: [
                                    "Division of systems into controlled network zones.",
                                    "Group of systems with similar trust or policy.",
                                    "Fine-grained workload-to-workload access control.",
                                    "Movement between systems after initial compromise."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Security Zone?",
                                options: [
                                    "Group of systems with similar trust or policy.",
                                    "Division of systems into controlled network zones.",
                                    "Fine-grained workload-to-workload access control.",
                                    "Movement between systems after initial compromise."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Microsegmentation?",
                                options: [
                                    "Fine-grained workload-to-workload access control.",
                                    "Division of systems into controlled network zones.",
                                    "Group of systems with similar trust or policy.",
                                    "Movement between systems after initial compromise."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Lateral Movement?",
                                options: [
                                    "Movement between systems after initial compromise.",
                                    "Division of systems into controlled network zones.",
                                    "Group of systems with similar trust or policy.",
                                    "Fine-grained workload-to-workload access control."
                                ],
                                answer:
                                    0
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
                        

                            <h2>Why This Matters</h2>

                            <p>
                                Firewalls provide controlled boundaries where network communication can be permitted, denied and logged. They translate security policy into enforceable traffic rules.
                            </p>

                            <h2>How to Think About It</h2>

                            <p>
                                Rules can evaluate source, destination, protocol, port and connection state; advanced firewalls may also use application or identity context. Stateful firewalls remember established flows so return traffic can be handled appropriately.
                            </p>

                            <h2>Worked Example</h2>

                            <p>
                                A rule may allow user networks to reach a web application on TCP 443 while denying direct database access. Administrative SSH can be limited to a management subnet.
                            </p>

                            <h2>Cybersecurity Relevance</h2>

                            <p>
                                Good firewall policy follows least privilege, has clear ownership and is reviewed for stale or overly broad rules. Logging important denies and sensitive allows helps investigations.
                            </p>

                            <h2>Troubleshooting / Investigation Example</h2>

                            <p>
                                When a flow is blocked, verify rule order, direction, interfaces, NAT, state and whether the traffic actually matches the expected source/destination tuple.
                            </p>

                            <h2>Lesson Recap</h2>

                            <p>
                                Before moving on, make sure you can explain <strong>Firewalls</strong> in your own words, describe why it exists, follow the basic communication flow and connect the concept to a real troubleshooting or security scenario.
                            </p>

                            <h2>What Comes Next?</h2>

                            <p>
                                Next you will compare IDS and IPS—controls that inspect traffic for suspicious patterns rather than only enforcing static reachability rules.
                            </p>`,

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
                        ,
                            {
                                question:
                                    "Which statement best describes Firewall?",
                                options: [
                                    "Control enforcing traffic policy.",
                                    "Tracking connection/flow state.",
                                    "Ordered or structured traffic-control rules.",
                                    "Policy where traffic is denied unless explicitly permitted."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Stateful Inspection?",
                                options: [
                                    "Tracking connection/flow state.",
                                    "Control enforcing traffic policy.",
                                    "Ordered or structured traffic-control rules.",
                                    "Policy where traffic is denied unless explicitly permitted."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes ACL?",
                                options: [
                                    "Ordered or structured traffic-control rules.",
                                    "Control enforcing traffic policy.",
                                    "Tracking connection/flow state.",
                                    "Policy where traffic is denied unless explicitly permitted."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Default Deny?",
                                options: [
                                    "Policy where traffic is denied unless explicitly permitted.",
                                    "Control enforcing traffic policy.",
                                    "Tracking connection/flow state.",
                                    "Ordered or structured traffic-control rules."
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
                        

                            <h2>Why This Matters</h2>

                            <p>
                                Firewalls decide whether traffic is allowed, but permitted traffic can still contain attacks. Intrusion Detection and Prevention Systems inspect network activity for suspicious signatures or behaviour.
                            </p>

                            <h2>How to Think About It</h2>

                            <p>
                                An IDS typically alerts without directly blocking, while an IPS is positioned to prevent or disrupt matching traffic. Detection can use signatures, protocol analysis, reputation or behavioural techniques.
                            </p>

                            <h2>Worked Example</h2>

                            <p>
                                An IDS may alert when it observes a known exploit pattern inside traffic. An IPS with an appropriate rule could drop the matching packet or connection, depending on configuration.
                            </p>

                            <h2>Cybersecurity Relevance</h2>

                            <p>
                                Detection quality depends on placement, tuning and context. Encrypted traffic reduces payload visibility unless inspection occurs where TLS is terminated or decrypted legitimately.
                            </p>

                            <h2>Troubleshooting / Investigation Example</h2>

                            <p>
                                Investigate false positives by reviewing packet evidence, affected assets and rule logic. Do not disable noisy detections blindly; tune them against known legitimate behaviour.
                            </p>

                            <h2>Lesson Recap</h2>

                            <p>
                                Before moving on, make sure you can explain <strong>IDS and IPS</strong> in your own words, describe why it exists, follow the basic communication flow and connect the concept to a real troubleshooting or security scenario.
                            </p>

                            <h2>What Comes Next?</h2>

                            <p>
                                Packet analysis gives you the underlying evidence needed to validate many network detections.
                            </p>`,

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
                        ,
                            {
                                question:
                                    "Which statement best describes IDS?",
                                options: [
                                    "System that detects and alerts on suspicious activity.",
                                    "System capable of blocking activity according to detection policy.",
                                    "Benign event incorrectly flagged.",
                                    "Malicious event not detected."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes IPS?",
                                options: [
                                    "System capable of blocking activity according to detection policy.",
                                    "System that detects and alerts on suspicious activity.",
                                    "Benign event incorrectly flagged.",
                                    "Malicious event not detected."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes False Positive?",
                                options: [
                                    "Benign event incorrectly flagged.",
                                    "System that detects and alerts on suspicious activity.",
                                    "System capable of blocking activity according to detection policy.",
                                    "Malicious event not detected."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes False Negative?",
                                options: [
                                    "Malicious event not detected.",
                                    "System that detects and alerts on suspicious activity.",
                                    "System capable of blocking activity according to detection policy.",
                                    "Benign event incorrectly flagged."
                                ],
                                answer:
                                    0
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
                        

                            <h2>Why This Matters</h2>

                            <p>
                                Logs summarize events, while packet captures can expose the actual protocol fields and timing of communication. Packet analysis is one of the strongest ways to verify what happened on a network path.
                            </p>

                            <h2>How to Think About It</h2>

                            <p>
                                Start with a question, then filter. Examine Ethernet, IP, transport and application layers in order. Follow conversations, compare timestamps and distinguish requests from responses. Tools such as Wireshark decode protocols but the analyst must interpret them.
                            </p>

                            <h2>Worked Example</h2>

                            <p>
                                To investigate failed HTTPS connectivity, confirm ARP/gateway behaviour, IP destination, TCP handshake and then TLS handshake. A missing SYN-ACK indicates a different problem from a TLS alert after TCP succeeds.
                            </p>

                            <h2>Cybersecurity Relevance</h2>

                            <p>
                                Captures can contain passwords, tokens and personal or sensitive data, especially for unencrypted protocols. Capture only where authorized, minimize scope and protect stored PCAP files.
                            </p>

                            <h2>Troubleshooting / Investigation Example</h2>

                            <p>
                                If a capture appears empty, verify the capture interface and observation point. Switched networks do not automatically deliver every host's traffic to your interface.
                            </p>

                            <h2>Lesson Recap</h2>

                            <p>
                                Before moving on, make sure you can explain <strong>Packet Analysis</strong> in your own words, describe why it exists, follow the basic communication flow and connect the concept to a real troubleshooting or security scenario.
                            </p>

                            <h2>What Comes Next?</h2>

                            <p>
                                The final lesson integrates addressing, switching, routing, transport, DNS, web traffic and security controls into one end-to-end review.
                            </p>`,

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
                        ,
                            {
                                question:
                                    "Which statement best describes Packet Capture?",
                                options: [
                                    "Recorded network packets for analysis.",
                                    "Expression selecting packets to show in an analysis tool.",
                                    "Data carried by a protocol.",
                                    "Interpreting packet fields according to protocol definitions."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Display Filter?",
                                options: [
                                    "Expression selecting packets to show in an analysis tool.",
                                    "Recorded network packets for analysis.",
                                    "Data carried by a protocol.",
                                    "Interpreting packet fields according to protocol definitions."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Payload?",
                                options: [
                                    "Data carried by a protocol.",
                                    "Recorded network packets for analysis.",
                                    "Expression selecting packets to show in an analysis tool.",
                                    "Interpreting packet fields according to protocol definitions."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Protocol Dissection?",
                                options: [
                                    "Interpreting packet fields according to protocol definitions.",
                                    "Recorded network packets for analysis.",
                                    "Expression selecting packets to show in an analysis tool.",
                                    "Data carried by a protocol."
                                ],
                                answer:
                                    0
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
                        

                            <h2>Why This Matters</h2>

                            <p>
                                Networking knowledge becomes useful when concepts can be combined, not when each definition is memorized separately. Security work requires tracing one event through several layers and devices.
                            </p>

                            <h2>How to Think About It</h2>

                            <p>
                                Use an end-to-end mental model: the client receives configuration, resolves a name, decides local versus remote delivery, resolves a gateway MAC, creates transport state, crosses routers/firewalls and exchanges application data. At each stage ask what evidence and failure modes exist.
                            </p>

                            <h2>Worked Example</h2>

                            <p>
                                For a failed website request: check link and IP configuration, local subnet decision, gateway reachability, routing, DNS, TCP 443, TLS and finally HTTP/application response. The first failing stage narrows the investigation.
                            </p>

                            <h2>Cybersecurity Relevance</h2>

                            <p>
                                The same model supports incident response and ethical testing. A suspicious domain query, new outbound TCP connection and unusual HTTP request may be three views of the same activity.
                            </p>

                            <h2>Troubleshooting / Investigation Example</h2>

                            <p>
                                Avoid jumping directly to advanced tools. Confirm fundamentals in order and record evidence. Networking problems often become obvious once you identify the first layer or dependency that fails.
                            </p>

                            <h2>Lesson Recap</h2>

                            <p>
                                Before moving on, make sure you can explain <strong>Networking Fundamentals Review</strong> in your own words, describe why it exists, follow the basic communication flow and connect the concept to a real troubleshooting or security scenario.
                            </p>

                            <h2>What Comes Next?</h2>

                            <p>
                                After this course, students are ready for deeper hands-on networking, packet analysis and security courses where these fundamentals are applied in realistic labs.
                            </p>`,

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
                        ,
                            {
                                question:
                                    "Which statement best describes End-to-End Flow?",
                                options: [
                                    "Complete sequence of protocols involved in a communication.",
                                    "Using multiple complementary security controls.",
                                    "Systematic isolation of the source of a problem.",
                                    "Data that helps defenders understand network communication."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Defense in Depth?",
                                options: [
                                    "Using multiple complementary security controls.",
                                    "Complete sequence of protocols involved in a communication.",
                                    "Systematic isolation of the source of a problem.",
                                    "Data that helps defenders understand network communication."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Troubleshooting?",
                                options: [
                                    "Systematic isolation of the source of a problem.",
                                    "Complete sequence of protocols involved in a communication.",
                                    "Using multiple complementary security controls.",
                                    "Data that helps defenders understand network communication."
                                ],
                                answer:
                                    0
                            },
                            {
                                question:
                                    "Which statement best describes Network Visibility?",
                                options: [
                                    "Data that helps defenders understand network communication.",
                                    "Complete sequence of protocols involved in a communication.",
                                    "Using multiple complementary security controls.",
                                    "Systematic isolation of the source of a problem."
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
