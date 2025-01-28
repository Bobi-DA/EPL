let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;

/**
 * Initializes the game by setting up the canvas, world, and event listeners.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    keyPressButton();
    keyPressTouch();
}


/**
 * Starts the game by initializing levels and the game world,
 * and managing UI visibility for the start screen and sound controls.
 */
function startGame() {
    initLevel();
    init();
    document.getElementById('startScreenContainer').classList.add('d-none');
    document.getElementById('soundContainer').classList.remove('d-none');
    soundPlay();
}

/**
 * Displays the information screen.
 */
function infoButton() {
    document.getElementById('infoScreenContainer').classList.remove('d-none');
    document.getElementById('startInfoBtnContainer').classList.add('d-none');
}

/**
 * Hides the information screen and returns to the previous screen.
 */
function backButton() {
    document.getElementById('infoScreenContainer').classList.add('d-none');
    document.getElementById('startInfoBtnContainer').classList.remove('d-none');

}

/**
 * Reloads the current page to restart the game.
 */
function homeButton() {
    document.getElementById('startScreenContainer').classList.remove('d-none');
    document.getElementById('gameOverContainer').classList.add('d-none');
    document.getElementById('winGameContainer').classList.add('d-none');
}

/**
 * Restarts the game by resetting all sounds, hiding game over screens,
 * and re-initializing the game world.
 */
function restartGame() {
    sounds.forEach(sound => {
        sound.currentTime = 0;
    });
    document.getElementById('gameOverContainer').classList.add('d-none');
    document.getElementById('winGameContainer').classList.add('d-none');
    document.getElementById('audioOffBtn').classList.add('d-none');
    document.getElementById('audioOnBtn').classList.remove('d-none');
    bgsound = Boolean(JSON.parse(loadDataToLocalStorage()));
    startGame();
}

/**
 * Adds event listeners for keyboard input to set the `keyboard` state.
 */
function keyPressButton() {
    window.addEventListener("keydown", (event) => {
        if (event.code == 'ArrowLeft') keyboard.LEFT = true;
        if (event.code == 'ArrowRight') keyboard.RIGHT = true;
        if (event.code == 'ArrowDown') keyboard.DOWN = true;
        if (event.code == 'ArrowUP') keyboard.UP = true;
        if (event.code == 'Space') keyboard.SPACE = true;
        if (event.code == 'KeyD') keyboard.D = true;
    });

    window.addEventListener("keyup", (event) => {
        if (event.code == 'ArrowLeft') keyboard.LEFT = false;
        if (event.code == 'ArrowRight') keyboard.RIGHT = false;
        if (event.code == 'ArrowDown') keyboard.DOWN = false;
        if (event.code == 'ArrowUP') keyboard.UP = false;
        if (event.code == 'Space') keyboard.SPACE = false;
        if (event.code == 'KeyD') keyboard.D = false;
    });
}

/**
 * Adds touch event listeners for mobile controls to set the `keyboard` state.
 */
function keyPressTouch() {
    document.getElementById('leftButton').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.LEFT = true;
    });

    document.getElementById('leftButton').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById('rightButton').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById('rightButton').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById('jumpButton').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.SPACE = true;
    });

    document.getElementById('jumpButton').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.SPACE = false;
    });

    document.getElementById('throwButton').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.D = true;
    });

    document.getElementById('throwButton').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.D = false;
    });

    document.getElementById('audioOnBtn').addEventListener('touchstart', (event) => {
        event.preventDefault();
        soundPlay();
    });

    document.getElementById('audioOffBtn').addEventListener('touchend', (event) => {
        event.preventDefault();
        soundPlay();
    });
}


