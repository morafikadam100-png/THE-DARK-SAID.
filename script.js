/* ==================================================
   THE DARK SAID
   SMOKER SYSTEM
================================================== */


/* ==================================================
   ELEMENTS
================================================== */

const entry =
    document.getElementById("darkEntry");

const terminal =
    document.getElementById("terminalText");

const audio =
    document.getElementById("audio");

const playButton =
    document.getElementById("playButton");

const trackName =
    document.getElementById("trackName");

const volume =
    document.getElementById("volume");

const songs =
    document.querySelectorAll(".song");


/* ==================================================
   PLAYLIST
================================================== */

const playlist = [

    {
        title: "WELCOME TO THE DARK",
        file: "assets/music/welcome.mp3"
    },

    {
        title: "NIGHT SIGNAL",
        file: "assets/music/song2.mp3"
    },

    {
        title: "AFTER MIDNIGHT",
        file: "assets/music/song3.mp3"
    }

];


let currentSong = 0;


/* ==================================================
   TERMINAL INTRO
================================================== */

const messages = [

    "> CONNECTION ESTABLISHED",

    "> IDENTITY: SMOKER",

    "> ACCESS: GRANTED",

    "> WELCOME TO THE DARK"

];


let messageIndex = 0;

let characterIndex = 0;


function typeTerminal() {


    if (
        messageIndex >=
        messages.length
    ) {

        createEnterButton();

        return;

    }


    const message =
        messages[messageIndex];


    if (
        characterIndex <
        message.length
    ) {

        terminal.innerHTML +=
            message[characterIndex];

        characterIndex++;

        setTimeout(
            typeTerminal,
            35
        );

        return;

    }


    terminal.innerHTML +=
        "<br><br>";

    messageIndex++;

    characterIndex = 0;


    setTimeout(
        typeTerminal,
        350
    );

}


/* ==================================================
   ENTER BUTTON
================================================== */

function createEnterButton() {


    const button =
        document.createElement("button");


    button.textContent =
        "[ ENTER THE DARK ]";


    button.style.cssText = `

        margin-top: 20px;

        padding: 12px 25px;

        background: #120000;

        border: 1px solid #750000;

        color: #c7a84d;

        font-family: "JetBrains Mono";

        font-size: 9px;

        letter-spacing: 2px;

        cursor: pointer;

    `;


    terminal.appendChild(
        button
    );


    button.addEventListener(
        "click",
        enterDark
    );

}


/* ==================================================
   ENTER SITE
================================================== */

async function enterDark() {


    loadSong(0);


    try {

        await audio.play();

    }

    catch (error) {

        console.log(
            "Audio waiting for interaction."
        );

    }


    entry.classList.add(
        "hidden"
    );

}


/* ==================================================
   MUSIC
================================================== */

function loadSong(index) {


    currentSong = index;


    const song =
        playlist[index];


    audio.src =
        song.file;


    audio.volume =
        Number(volume.value);


    trackName.textContent =
        song.title;


    songs.forEach(
        (button, i) => {

            button.classList.toggle(
                "active",
                i === index
            );

        }
    );

}


/* ==================================================
   PLAY / PAUSE
================================================== */

playButton.addEventListener(
    "click",
    async () => {


        if (
            audio.paused
        ) {

            try {

                await audio.play();

            }

            catch (error) {

                console.log(error);

            }

            playButton.textContent =
                "Ⅱ";

        }

        else {

            audio.pause();

            playButton.textContent =
                "▶";

        }

    }
);


/* ==================================================
   SONG BUTTONS
================================================== */

songs.forEach(
    (button) => {


        button.addEventListener(
            "click",
            async () => {


                const index =
                    Number(
                        button.dataset.index
                    );


                loadSong(index);


                try {

                    await audio.play();

                    playButton.textContent =
                        "Ⅱ";

                }

                catch (error) {

                    console.log(error);

                }

            }
        );

    }
);


/* ==================================================
   VOLUME
================================================== */

volume.addEventListener(
    "input",
    () => {

        audio.volume =
            Number(volume.value);

    }
);


/* ==================================================
   AUTO NEXT SONG
================================================== */

audio.addEventListener(
    "ended",
    () => {


        currentSong++;


        if (
            currentSong >=
            playlist.length
        ) {

            currentSong = 0;

        }


        loadSong(
            currentSong
        );


        audio.play();

    }
);


/* ==================================================
   MOUSE PARALLAX
================================================== */

const heroImage =
    document.querySelector(
        ".hero-image"
    );


document.addEventListener(
    "mousemove",
    (event) => {


        const x =
            (event.clientX /
                window.innerWidth -
                .5) * 20;


        const y =
            (event.clientY /
                window.innerHeight -
                .5) * 20;


        heroImage.style.transform = `

            translate(
                calc(-50% + ${x}px),
                ${y}px
            )

            scale(1.02)

        `;

    }
);


/* ==================================================
   START
================================================== */

loadSong(0);

typeTerminal();