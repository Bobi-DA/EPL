

// Sound-Objekte
const sounds = [
    new Audio('audio/walking.mp3'), //0
    new Audio('audio/game_over.mp3'), //1
    new Audio('audio/snoring.mp3'), //2
    new Audio('audio/mexican-hat-dance.mp3'), //3
    new Audio('audio/chicken.mp3'),  //4
    new Audio('audio/game_won.mp3'), //5
    new Audio('audio/iha.mp3'),  //6
    new Audio('audio/coin.mp3'),  //7
    new Audio('audio/bottle.mp3'),  //8
    new Audio('audio/male_hurt.mp3') //9
];

let bgsound = false;

/**
 * Toggles the background sound in the game and updates the audio control buttons.
 * - Pauses or plays all sounds based on the `bgsound` state.
 * - Ensures that the specified sound (index 3 in the `sounds` array) loops when playing.
 * - Toggles visibility of the audio control buttons based on the current sound state.
 */
function soundPlay() {
    sounds.forEach((sound) => {
        if (bgsound) {
            sound.pause();
        } else {
            if (sound === sounds[3]) sound.loop = true;
            sounds[3].play();
        }
    });

    bgsound = !bgsound;

    document.getElementById('audioOnBtn').classList.toggle('d-none', !bgsound);
    document.getElementById('audioOffBtn').classList.toggle('d-none', bgsound);
}

