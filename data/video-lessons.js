/* =========================================================
   CWS ACADEMY
   VIDEO LESSON REGISTRY
   File: data/video-lessons.js

   IMPORTANT:
   The key includes course + module + lesson because CWS
   courses commonly reuse IDs such as lesson-01 in modules.
========================================================= */

export const videoLessons = {

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
