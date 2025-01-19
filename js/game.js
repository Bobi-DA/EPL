let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);    // In dieser Variable wird das neue Objekt gespeichert, das aus der Klasse 'World' erstellt wird.

    // Initiale Prüfung
    checkOrientation();
    keyPressButton();
    keyPressTouch();
    checkDevice();
}

// Überprüfen, ob es sich um ein Smartphone handelt
function checkDevice() {
    const isMobile = window.innerWidth <= 768;
    const controls = document.getElementById('mobile-controls');

    if (isMobile) {
        controls.classList.remove('d-none');
    } else {
        controls.classList.add('d-none');
    }
}


// Beim Laden und bei Größenänderung prüfen
window.addEventListener('resize', checkDevice);
window.addEventListener('load', checkDevice);


function startGame() {
    initLevel();
    init();
    document.getElementById('startScreenContainer').classList.add('d-none');
    document.getElementById('soundContainer').classList.remove('d-none');
    sounds[3].play();
    bgsound = true;
}

function infoButton() {
    document.getElementById('infoScreenContainer').classList.remove('d-none');
}

function backButton() {
    document.getElementById('infoScreenContainer').classList.add('d-none');
}

function homeButton() {
    location.reload();
}

function restartGame() {
    location.reload();
}




function keyPressButton() {
    window.addEventListener("keydown", (event) => {
        if (event.code == 'ArrowLeft') {
            keyboard.LEFT = true;
        }
        if (event.code == 'ArrowRight') {
            keyboard.RIGHT = true;
        }
        if (event.code == 'ArrowDown') {
            keyboard.DOWN = true;
        }
        if (event.code == 'ArrowUP') {
            keyboard.UP = true;
        }
        if (event.code == 'Space') {
            keyboard.SPACE = true;
        }
        if (event.code == 'KeyD') {
            keyboard.D = true;
        }

    });

    window.addEventListener("keyup", (event) => {
        if (event.code == 'ArrowLeft') {
            keyboard.LEFT = false;
        }
        if (event.code == 'ArrowRight') {
            keyboard.RIGHT = false;
        }
        if (event.code == 'ArrowDown') {
            keyboard.DOWN = false;
        }
        if (event.code == 'ArrowUP') {
            keyboard.UP = false;
        }
        if (event.code == 'Space') {
            keyboard.SPACE = false;
        }
        if (event.code == 'KeyD') {
            keyboard.D = false;
        }

    });
}

function keyPressTouch() {
    document.getElementById('leftButton').addEventListener('touchstart', (event) => {
        if (event.cancelable) {
            event.preventDefault();
        };
        keyboard.LEFT = true;
    });

    document.getElementById('leftButton').addEventListener('touchend', (event) => {
        if (event.cancelable) {
            event.preventDefault();
        };
        keyboard.LEFT = false;
    });


    document.getElementById('rightButton').addEventListener('touchstart', (event) => {
        if (event.cancelable) {
            event.preventDefault();
        };
        keyboard.RIGHT = true;
    });

    document.getElementById('rightButton').addEventListener('touchend', (event) => {
        if (event.cancelable) {
            event.preventDefault();
        };
        keyboard.RIGHT = false;
    });


    document.getElementById('jumpButton').addEventListener('touchstart', (event) => {
        if (event.cancelable) {
            event.preventDefault();
        };
        keyboard.SPACE = true;
    });

    document.getElementById('jumpButton').addEventListener('touchend', (event) => {
        if (event.cancelable) {
            event.preventDefault();
        };
        keyboard.SPACE = false;
    });


    document.getElementById('throwButton').addEventListener('touchstart', (event) => {
        if (event.cancelable) {
            event.preventDefault();
        };
        keyboard.D = true;
    });

    document.getElementById('throwButton').addEventListener('touchend', (event) => {
        if (event.cancelable) {
            event.preventDefault();
        };
        keyboard.D = false;
    });


    document.getElementById('audioOnBtn').addEventListener('touchstart', (event) => {
        if (event.cancelable) {
            event.preventDefault();
        };
        console.log('push button on');
        
        soundPlay();
    });


    document.getElementById('audioOffBtn').addEventListener('touchend', (event) => {
        if (event.cancelable) {
            event.preventDefault();
        };
        console.log('push button off');

        soundPlay();
    });
}

function checkOrientation() {
    titleGame = document.getElementById('titleGame');
    if (window.matchMedia("(orientation: portrait)").matches) {
        // console.log('Hochformat');
        // titleGame.classList.remove("dn");
        rotateMessage.classList.remove('d-none');

    } else if (window.matchMedia("(orientation: landscape)").matches) {
        rotateMessage.classList.add('d-none');
        // console.log('Querformat');
        // titleGame.classList.add("dn");
    }
}

// Event-Listener für Änderungen der Orientierung
window.addEventListener('resize', checkOrientation);


function orientationDisplay() {
    let widthScreen = window.innerWidth;
    let heightScreen = window.innerHeight;
    const rotateMessage = document.getElementById('rotateMessage');
    // const gameContainer = document.getElementById('game-container'); 

    if (widthScreen < heightScreen) {
        rotateMessage.classList.remove('d-none');
    } else {
        rotateMessage.classList.add('d-none');
    }
}