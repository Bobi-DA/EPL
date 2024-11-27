let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);    // In dieser Variable wird das neue Objekt gespeichert, das aus der Klasse 'World' erstellt wird.



    console.log('games.js: ',world);


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
