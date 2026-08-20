/* =========================================================
   CWS ACADEMY
   VIDEO LESSON REGISTRY
   File: data/video-lessons.js

   Add video lessons here without changing the lesson engine.
========================================================= */

export const videoLessons = {

    /*
     * Example FREE video lesson
     *
     * Replace the demo URLs with your own hosted video URLs
     * when CWS moves to Netlify / production hosting.
     */

    "cybersecurity-fundamentals:introduction-to-cybersecurity": {

        id:
            "cybersecurity-fundamentals:introduction-to-cybersecurity",

        courseId:
            "cybersecurity-fundamentals",

        lessonId:
            "introduction-to-cybersecurity",

        access:
            "free",

        title:
            "Introduction to Cybersecurity",

        description:
            "A guided introduction to cybersecurity, threats, risk and the role of defensive and offensive security.",

        duration:
            "08:00",

        provider:
            "cws",

        videoUrl:
            "",

        poster:
            "",

        transcript:
            "",

        chapters: [
            {
                time:
                    0,

                label:
                    "What cybersecurity means"
            },
            {
                time:
                    120,

                label:
                    "Threats, vulnerabilities and risk"
            },
            {
                time:
                    300,

                label:
                    "Defensive vs offensive security"
            }
        ]

    },


    /*
     * Example PRO video lesson.
     *
     * This stays locked for Free students even if the written
     * lesson itself is visible as a preview.
     */

    "ethical-hacking:reconnaissance": {

        id:
            "ethical-hacking:reconnaissance",

        courseId:
            "ethical-hacking",

        lessonId:
            "reconnaissance",

        access:
            "pro",

        title:
            "Reconnaissance in Practice",

        description:
            "A practical walkthrough of authorized reconnaissance methodology, evidence collection and documentation.",

        duration:
            "12:00",

        provider:
            "cws",

        videoUrl:
            "",

        poster:
            "",

        transcript:
            "",

        chapters: [
            {
                time:
                    0,

                label:
                    "Engagement scope"
            },
            {
                time:
                    140,

                label:
                    "Passive reconnaissance"
            },
            {
                time:
                    360,

                label:
                    "Active reconnaissance"
            },
            {
                time:
                    600,

                label:
                    "Recording findings"
            }
        ]

    }

};


/* =========================================================
   HELPERS
========================================================= */

export function getVideoLesson(
    courseId,
    lessonId
) {

    const key =
        `${String(courseId || "").trim()}:${String(lessonId || "").trim()}`;


    return (
        videoLessons[key] ||
        null
    );

}


export function hasVideoLesson(
    courseId,
    lessonId
) {

    return Boolean(
        getVideoLesson(
            courseId,
            lessonId
        )
    );

}
