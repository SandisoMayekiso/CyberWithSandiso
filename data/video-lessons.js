/* =========================================================
   CWS ACADEMY
   VIDEO LESSON REGISTRY
   File: data/video-lessons.js

   IMPORTANT:
   The key includes course + module + lesson because CWS
   courses commonly reuse IDs such as lesson-01 in modules.
========================================================= */

export const videoLessons = {

    "cybersecurity-fundamentals:module-01:lesson-01": {

        id:
            "cybersecurity-fundamentals:module-01:lesson-01",

        courseId:
            "cybersecurity-fundamentals",

        moduleId:
            "module-01",

        lessonId:
            "lesson-01",

        access:
            "free",

        title:
            "What Is Cybersecurity? â€” Guided Video",

        description:
            "A guided visual explanation of cybersecurity, digital assets, threats, vulnerabilities, controls and responsible security practice.",

        duration:
            "08:00",

        /*
           Add a direct HTTPS MP4/WebM URL here when the
           final video is uploaded to Firebase Storage,
           Cloudinary, Bunny Stream or the future host.
        */
        videoUrl:
            "",

        poster:
            "../assets/images/covers/cybersecurity-fundamentals.webp",

        transcript: `
            <p>
                Cybersecurity is the practice of protecting systems,
                networks, applications, identities and information from
                unauthorized access, disruption, manipulation and loss.
            </p>
            <p>
                Effective cybersecurity combines people, processes and
                technology. It uses preventive, detective, response and
                recovery controls while respecting authorization, privacy
                and professional ethics.
            </p>
        `,

        chapters: [
            {
                time: 0,
                label: "Introduction"
            },
            {
                time: 90,
                label: "Assets, threats and vulnerabilities"
            },
            {
                time: 240,
                label: "Security controls"
            },
            {
                time: 390,
                label: "Ethics and next steps"
            }
        ]

    },

    /*
    "cybersecurity-fundamentals:module-01:lesson-01": {

        id:
            "cybersecurity-fundamentals:module-01:lesson-01",

        courseId:
            "cybersecurity-fundamentals",

        moduleId:
            "module-01",

        lessonId:
            "lesson-01",

        access:
            "free",

        title:
            "Introduction to Cybersecurity",

        description:
            "A guided introduction to the lesson.",

        duration:
            "08:00",

        videoUrl:
            "",

        poster:
            "",

        transcript:
            "",

        chapters: [
            {
                time: 0,
                label: "Introduction"
            },
            {
                time: 120,
                label: "Core concepts"
            }
        ]

    }
    */

};


export function getVideoLesson(
    courseId,
    moduleId,
    lessonId
) {

    const key =
        [
            courseId,
            moduleId,
            lessonId
        ]
            .map(
                value =>
                    String(
                        value || ""
                    )
                        .trim()
                        .toLowerCase()
            )
            .join(":");


    return (
        videoLessons[key] ||
        null
    );

}


export function hasVideoLesson(
    courseId,
    moduleId,
    lessonId
) {

    return Boolean(
        getVideoLesson(
            courseId,
            moduleId,
            lessonId
        )
    );

}
