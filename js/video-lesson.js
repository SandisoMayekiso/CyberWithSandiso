/* =========================================================
   CWS ACADEMY
   VIDEO LESSON COMPONENT
   File: js/video-lesson.js
========================================================= */

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

import {
    doc,
    getDoc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

import {
    auth,
    db
} from "./firebase-config.js";

import {
    getVideoLesson
} from "../data/video-lessons.js";

import {
    getUserEntitlement
} from "./access-control.js";


const params =
    new URLSearchParams(
        window.location.search
    );


const courseId =
    params.get("course") ||
    "";


const lessonId =
    params.get("lesson") ||
    "";


const mount =
    document.getElementById(
        "cwsVideoLesson"
    );


let currentUser =
    null;


let entitlement = {
    plan:
        "free",

    status:
        "active"
};


let videoConfig =
    null;


let player =
    null;


let lastSavedSecond =
    0;


/* =========================================================
   HELPERS
========================================================= */

function normalize(
    value
) {

    return String(
        value ||
        ""
    )
        .trim()
        .toLowerCase();

}


function activePro() {

    return (
        normalize(
            entitlement.plan
        ) ===
            "pro" &&
        [
            "active",
            "trialing"
        ].includes(
            normalize(
                entitlement.status
            )
        )
    );

}


function canAccessVideo() {

    if (!videoConfig) {
        return false;
    }


    return (
        normalize(
            videoConfig.access
        ) !==
            "pro" ||
        activePro()
    );

}


function progressRef() {

    if (
        !currentUser ||
        !videoConfig
    ) {
        return null;
    }


    return doc(
        db,
        "users",
        currentUser.uid,
        "videoProgress",
        videoConfig.id
    );

}


/* =========================================================
   PROGRESS
========================================================= */

async function loadVideoProgress() {

    const ref =
        progressRef();


    if (!ref) {
        return null;
    }


    try {

        const snapshot =
            await getDoc(
                ref
            );


        return snapshot.exists()
            ? snapshot.data()
            : null;

    }
    catch (error) {

        console.warn(
            "[CWS Video] Progress unavailable:",
            error
        );


        return null;

    }

}


async function saveVideoProgress(
    forceComplete = false
) {

    if (
        !player ||
        !currentUser ||
        !videoConfig
    ) {
        return;
    }


    const duration =
        Number(
            player.duration ||
            0
        );


    const currentTime =
        Number(
            player.currentTime ||
            0
        );


    const percentage =
        duration > 0
            ? Math.min(
                100,
                Math.round(
                    currentTime /
                    duration *
                    100
                )
            )
            : 0;


    const completed =
        forceComplete ||
        percentage >=
            90;


    try {

        await setDoc(
            progressRef(),
            {
                courseId:
                    videoConfig.courseId,

                lessonId:
                    videoConfig.lessonId,

                videoId:
                    videoConfig.id,

                currentTime,

                duration,

                percentage,

                completed,

                updatedAt:
                    serverTimestamp(),

                ...(completed
                    ? {
                        completedAt:
                            serverTimestamp()
                    }
                    : {})
            },
            {
                merge:
                    true
            }
        );

    }
    catch (error) {

        console.warn(
            "[CWS Video] Unable to save progress:",
            error
        );

    }

}


/* =========================================================
   UI
========================================================= */

function renderLocked() {

    mount.hidden =
        false;


    mount.innerHTML = `
        <section class="cws-video-card locked">

            <div class="cws-video-lock-icon">
                <i class="fa-solid fa-crown"></i>
            </div>

            <div class="cws-video-lock-copy">

                <span>
                    CWS PRO VIDEO LESSON
                </span>

                <h2>
                    ${videoConfig.title}
                </h2>

                <p>
                    Upgrade to CWS Pro to watch this practical
                    guided video lesson.
                </p>

            </div>

            <a
                class="cws-video-upgrade-btn"
                href="subscription.html?course=${encodeURIComponent(
                    videoConfig.courseId
                )}&from=video-lesson"
            >
                <i class="fa-solid fa-crown"></i>
                Unlock with CWS Pro
            </a>

        </section>
    `;

}


function chapterButton(
    chapter
) {

    const minutes =
        Math.floor(
            Number(
                chapter.time ||
                0
            ) /
            60
        );


    const seconds =
        String(
            Number(
                chapter.time ||
                0
            ) %
            60
        )
            .padStart(
                2,
                "0"
            );


    return `
        <button
            type="button"
            class="cws-video-chapter"
            data-time="${Number(
                chapter.time ||
                0
            )}"
        >
            <span>
                ${minutes}:${seconds}
            </span>

            <strong>
                ${chapter.label}
            </strong>
        </button>
    `;

}


async function renderPlayer() {

    const noVideoYet =
        !String(
            videoConfig.videoUrl ||
            ""
        ).trim();


    mount.hidden =
        false;


    mount.innerHTML = `
        <section class="cws-video-card">

            <div class="cws-video-heading">

                <div>
                    <span class="cws-video-eyebrow">
                        ${
                            normalize(
                                videoConfig.access
                            ) ===
                                "pro"
                                ? '<i class="fa-solid fa-crown"></i> CWS PRO VIDEO'
                                : '<i class="fa-solid fa-circle-play"></i> VIDEO LESSON'
                        }
                    </span>

                    <h2>
                        ${videoConfig.title}
                    </h2>

                    <p>
                        ${videoConfig.description || ""}
                    </p>
                </div>

                <span class="cws-video-duration">
                    <i class="fa-regular fa-clock"></i>
                    ${videoConfig.duration || "Video"}
                </span>

            </div>


            ${
                noVideoYet
                    ? `
                        <div class="cws-video-coming-soon">
                            <i class="fa-solid fa-video"></i>

                            <h3>
                                Video lesson prepared
                            </h3>

                            <p>
                                Add the final CWS video URL to
                                <code>data/video-lessons.js</code>
                                when the lesson recording is ready.
                            </p>
                        </div>
                      `
                    : `
                        <div class="cws-video-player-shell">

                            <video
                                id="cwsLessonVideo"
                                class="cws-video-player"
                                controls
                                preload="metadata"
                                playsinline
                                ${videoConfig.poster
                                    ? `poster="${videoConfig.poster}"`
                                    : ""}
                            >
                                <source
                                    src="${videoConfig.videoUrl}"
                                >
                                Your browser does not support HTML5 video.
                            </video>

                        </div>
                      `
            }


            ${
                Array.isArray(
                    videoConfig.chapters
                ) &&
                videoConfig.chapters.length
                    ? `
                        <div class="cws-video-chapters">

                            <span>
                                VIDEO CHAPTERS
                            </span>

                            <div>
                                ${videoConfig.chapters
                                    .map(
                                        chapterButton
                                    )
                                    .join("")}
                            </div>

                        </div>
                      `
                    : ""
            }


            ${
                videoConfig.transcript
                    ? `
                        <details class="cws-video-transcript">

                            <summary>
                                <i class="fa-solid fa-align-left"></i>
                                Video Transcript
                            </summary>

                            <div>
                                ${videoConfig.transcript}
                            </div>

                        </details>
                      `
                    : ""
            }

        </section>
    `;


    if (noVideoYet) {
        return;
    }


    player =
        document.getElementById(
            "cwsLessonVideo"
        );


    if (!player) {
        return;
    }


    const saved =
        await loadVideoProgress();


    if (
        saved &&
        Number(
            saved.currentTime ||
            0
        ) > 0
    ) {

        player.addEventListener(
            "loadedmetadata",
            () => {

                const safeTime =
                    Math.min(
                        Number(
                            saved.currentTime
                        ),
                        Math.max(
                            0,
                            player.duration -
                            3
                        )
                    );


                if (
                    Number.isFinite(
                        safeTime
                    )
                ) {

                    player.currentTime =
                        safeTime;

                }

            },
            {
                once:
                    true
            }
        );

    }


    player.addEventListener(
        "timeupdate",
        () => {

            const second =
                Math.floor(
                    player.currentTime
                );


            if (
                second -
                lastSavedSecond >=
                15
            ) {

                lastSavedSecond =
                    second;


                saveVideoProgress();

            }

        }
    );


    player.addEventListener(
        "pause",
        () =>
            saveVideoProgress()
    );


    player.addEventListener(
        "ended",
        () =>
            saveVideoProgress(
                true
            )
    );


    mount
        .querySelectorAll(
            ".cws-video-chapter"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        if (!player) {
                            return;
                        }


                        player.currentTime =
                            Number(
                                button.dataset.time ||
                                0
                            );


                        player.play()
                            .catch(
                                () => {}
                            );

                    }
                );

            }
        );

}


/* =========================================================
   INIT
========================================================= */

async function initVideoLesson(
    user
) {

    videoConfig =
        getVideoLesson(
            courseId,
            lessonId
        );


    if (
        !mount ||
        !videoConfig
    ) {

        if (mount) {
            mount.hidden =
                true;
        }


        return;
    }


    currentUser =
        user;


    try {

        entitlement =
            await getUserEntitlement(
                user
            ) ||
            entitlement;

    }
    catch (error) {

        console.warn(
            "[CWS Video] Entitlement unavailable:",
            error
        );

    }


    if (
        !canAccessVideo()
    ) {

        renderLocked();

        return;

    }


    await renderPlayer();

}


if (
    mount &&
    auth
) {

    onAuthStateChanged(
        auth,
        user => {

            if (!user) {

                mount.hidden =
                    true;

                return;

            }


            initVideoLesson(
                user
            );

        }
    );

}
