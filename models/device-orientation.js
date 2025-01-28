function checkOrientationDevice() {
    checkOrientation();
    checkDevice();
}
/**
 * Checks the device type and toggles mobile controls visibility based on screen width.
 */
function checkDevice() {
    const isMobile = window.innerWidth <= 480;
    const controls = document.getElementById('mobileControls');

    if (isMobile) {
        controls.classList.remove('d-none');
    } else {
        controls.classList.add('d-none');
    }
}
// Event listener for orientation changes
// Event listeners to handle device resizing and initial load.
window.addEventListener('resize', checkDevice);
window.addEventListener('resize', checkOrientation);
window.addEventListener('load', checkDevice);


/**
 * Checks the screen orientation and toggles the orientation message accordingly.
 */
// function checkOrientation() {
//     const rotateMessage = document.getElementById('rotateMessage');
//     if (window.matchMedia("(orientation: portrait)").matches) {
//         rotateMessage.classList.remove('d-none');
//     } else if (window.matchMedia("(orientation: landscape)").matches) {
//         rotateMessage.classList.add('d-none');
//     }
// }

/**
 * Displays or hides the rotation message based on screen dimensions.
 */
// function orientationDisplay() {
//     const widthScreen = window.innerWidth;
//     // const heightScreen = window.innerHeight;
//     const rotateMessage = document.getElementById('rotateMessage');

//     if (widthScreen < 480) {   //widthScreen < heightScreen
//         rotateMessage.classList.remove('d-none');
//     } else {
//         rotateMessage.classList.add('d-none');
//     }
// }

function checkOrientation() {
    let warning = document.getElementById("orientation-warning");
    let game = document.getElementById("game-container");

    if (window.innerWidth < 480 && window.innerHeight > window.innerWidth) {
        warning.style.display = "flex";
        game.style.display = "none";
    } else {
        warning.style.display = "none";
        game.style.display = "flex";
    }
}

// Automatische Drehungserkennung
window.addEventListener("resize", checkOrientation);
window.addEventListener("load", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);