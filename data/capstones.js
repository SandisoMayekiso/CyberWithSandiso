/* =========================================================
   CWS ACADEMY
   CAPSTONE REGISTRY
   File: data/capstones.js
========================================================= */

export const capstones = {

    "junior-pentest-capstone": {

        id:
            "junior-pentest-capstone",

        pathId:
            "junior-penetration-tester",

        title:
            "Junior Penetration Tester Capstone",

        subtitle:
            "End-to-End Authorized Security Assessment",

        access:
            "pro",

        level:
            "Intermediate",

        duration:
            "4–6 hours",

        passingScore:
            80,

        description:
            "Perform a structured penetration test against an isolated CWS training environment, collect evidence, document findings and submit a professional final report.",

        client:
            "Northstar Finance Training Environment",

        engagementType:
            "Internal Penetration Test",

        scenario:
            "Northstar Finance has commissioned CWS Academy to assess a small isolated training network before a simulated production launch. Your task is to identify exposed services, validate security weaknesses using minimum necessary impact, document evidence and produce a professional report.",

        scope: {

            inScope: [
                "Only the hosts listed in the CWS capstone lab environment",
                "Approved web applications exposed by those hosts",
                "Approved local accounts provided for the engagement",
                "Network and host enumeration within the isolated lab"
            ],

            outOfScope: [
                "Any public Internet system",
                "Real third-party services",
                "Denial-of-service testing",
                "Destructive actions",
                "Persistence outside the lab requirements",
                "Accessing unrelated personal or sensitive information"
            ]

        },

        rulesOfEngagement: [
            "Use only the isolated CWS Academy capstone environment.",
            "Use the minimum action required to demonstrate impact.",
            "Do not intentionally interrupt services.",
            "Do not alter unrelated user data.",
            "Record important commands, timestamps and evidence.",
            "Stop testing if the environment behaves unexpectedly or appears outside the stated lab scope."
        ],

        objectives: [
            {
                id: "objective-01",
                title: "Build the Attack Surface",
                description:
                    "Identify in-scope hosts, reachable services and application entry points."
            },
            {
                id: "objective-02",
                title: "Perform Targeted Enumeration",
                description:
                    "Gather enough service and application information to identify realistic security hypotheses."
            },
            {
                id: "objective-03",
                title: "Validate Security Weaknesses",
                description:
                    "Validate supported findings with controlled, minimum-impact testing."
            },
            {
                id: "objective-04",
                title: "Analyze Privilege Boundaries",
                description:
                    "Where authorized access is obtained, inspect local privilege and identify whether an escalation path exists."
            },
            {
                id: "objective-05",
                title: "Document Professional Evidence",
                description:
                    "Capture reproducible technical evidence for every supported finding."
            },
            {
                id: "objective-06",
                title: "Produce the Final Report",
                description:
                    "Submit an executive summary, technical findings, remediation guidance and retest recommendations."
            }
        ],

        tasks: [
            {
                id: "task-01",
                title: "Confirm Scope",
                category: "Engagement",
                required: true,
                evidenceRequired: false
            },
            {
                id: "task-02",
                title: "Host Discovery",
                category: "Reconnaissance",
                required: true,
                evidenceRequired: true
            },
            {
                id: "task-03",
                title: "Service Mapping",
                category: "Enumeration",
                required: true,
                evidenceRequired: true
            },
            {
                id: "task-04",
                title: "Web Application Review",
                category: "Application Security",
                required: true,
                evidenceRequired: true
            },
            {
                id: "task-05",
                title: "Vulnerability Validation",
                category: "Validation",
                required: true,
                evidenceRequired: true
            },
            {
                id: "task-06",
                title: "Privilege Analysis",
                category: "Host Security",
                required: true,
                evidenceRequired: true
            },
            {
                id: "task-07",
                title: "Findings Review",
                category: "Reporting",
                required: true,
                evidenceRequired: true
            },
            {
                id: "task-08",
                title: "Final Report Submission",
                category: "Reporting",
                required: true,
                evidenceRequired: true
            }
        ],

        reportRequirements: [
            "Executive summary",
            "Scope and methodology",
            "Attack-surface summary",
            "At least two evidence-backed findings where supported by the lab",
            "Affected asset or endpoint",
            "Severity and business impact",
            "Reproduction / validation evidence",
            "Remediation recommendation",
            "Retest recommendation"
        ],

        gradingRubric: {
            passingScore: 80,

            mandatoryGates: {
                requireAllTasks: true,
                minimumFindings: 2,
                minimumExecutiveSummaryWords: 80,
                requireEvidenceForFindings: true,
                requireRemediationForFindings: true,
                requireRetestForFindings: true,
                requireAcademicIntegrityDeclaration: true
            },

            weights: {
                taskCompletion: 20,
                evidenceQuality: 15,
                methodology: 10,
                executiveSummary: 15,
                technicalFindings: 25,
                remediationAndRetest: 10,
                professionalCompleteness: 5
            }
        }

    }

};


export function getCapstone(
    capstoneId
) {

    return (
        capstones[
            String(capstoneId || "")
                .trim()
                .toLowerCase()
        ] ||
        null
    );

}
