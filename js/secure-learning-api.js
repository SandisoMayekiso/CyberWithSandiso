/* =========================================================
   CWS ACADEMY
   TRUSTED LEARNING BACKEND CLIENT
========================================================= */

import {
    getFunctions,
    httpsCallable
} from
"https://www.gstatic.com/firebasejs/12.17.1/firebase-functions.js";


const functions =
    getFunctions(
        undefined,
        "us-central1"
    );


const callables =
    new Map();


function getCallable(name) {

    if (!callables.has(name)) {

        callables.set(
            name,
            httpsCallable(
                functions,
                name,
                {
                    timeout:
                        60_000
                }
            )
        );

    }


    return callables.get(name);

}


function friendlyError(error) {

    const code =
        String(
            error?.code ||
            ""
        )
            .replace(
                "functions/",
                ""
            );


    const allowedCodes =
        new Set([
            "unauthenticated",
            "permission-denied",
            "invalid-argument",
            "not-found",
            "failed-precondition",
            "resource-exhausted",
            "unavailable"
        ]);


    const message =
        allowedCodes.has(code) &&
        typeof error?.message ===
            "string"
            ? error.message.replace(
                /^Firebase:\s*/,
                ""
            )
            : "CWS Academy could not complete the secure request. Please try again.";


    const safeError =
        new Error(
            message
        );


    safeError.code =
        code ||
        "unknown";


    return safeError;

}


async function invoke(
    name,
    payload = {}
) {

    try {

        const response =
            await getCallable(
                name
            )(
                payload
            );


        return (
            response.data ||
            {}
        );

    }
    catch (error) {

        throw friendlyError(
            error
        );

    }

}


export function getProtectedLesson(
    courseId,
    moduleId,
    lessonId
) {

    return invoke(
        "getProtectedLesson",
        {
            courseId,
            moduleId,
            lessonId
        }
    );

}


export function getProtectedActivity(
    courseId,
    moduleId,
    activityId
) {

    return invoke(
        "getProtectedActivity",
        {
            courseId,
            moduleId,
            activityId
        }
    );

}


export function getProtectedAssessment(
    courseId,
    type,
    moduleId = ""
) {

    return invoke(
        "getProtectedAssessment",
        {
            courseId,
            type,
            ...(moduleId
                ? {
                    moduleId
                }
                : {})
        }
    );

}


export function getProtectedCapstone(
    capstoneId
) {

    return invoke(
        "getProtectedCapstone",
        {
            capstoneId
        }
    );

}


export function startSecureCourse(
    courseId,
    moduleId,
    lessonId
) {

    return invoke(
        "startCourse",
        {
            courseId,
            moduleId,
            lessonId
        }
    );

}


export function submitSecureLessonQuiz({
    courseId,
    moduleId,
    lessonId,
    answers
}) {

    return invoke(
        "submitLessonQuiz",
        {
            courseId,
            moduleId,
            lessonId,
            answers
        }
    );

}


export function completeSecureLesson({
    courseId,
    moduleId,
    lessonId,
    nextModuleId,
    nextLessonId
}) {

    return invoke(
        "completeLesson",
        {
            courseId,
            moduleId,
            lessonId,
            nextModuleId,
            nextLessonId
        }
    );

}


export function completeSecureActivity({
    courseId,
    moduleId,
    activityId
}) {

    return invoke(
        "completeActivity",
        {
            courseId,
            moduleId,
            activityId
        }
    );

}


export function submitSecureModuleAssessment({
    courseId,
    moduleId,
    answers
}) {

    return invoke(
        "submitModuleAssessment",
        {
            courseId,
            moduleId,
            answers
        }
    );

}


export function submitSecureFinalAssessment({
    courseId,
    answers
}) {

    return invoke(
        "submitFinalAssessment",
        {
            courseId,
            answers
        }
    );

}


export function ensureCourseCertificate(
    courseId
) {

    return invoke(
        "ensureCourseCertificate",
        {
            courseId
        }
    );

}


export function saveSecureCapstoneDraft(
    capstoneId,
    submission
) {

    return invoke(
        "saveCapstoneDraft",
        {
            capstoneId,
            submission
        }
    );

}


export function submitSecureCapstone(
    capstoneId,
    submission
) {

    return invoke(
        "submitCapstone",
        {
            capstoneId,
            submission
        }
    );

}


export function issueCareerPathCertificate(
    pathId
) {

    return invoke(
        "issueCareerPathCertificate",
        {
            pathId
        }
    );

}
