class Character extends MovableObject {
    x = 90;
    y = 190;
    height = 240;
    width = 120;
    speed = 5;
    timer = 0;

    offset = {
        top: 100,
        left: 20,
        right: 30,
        bottom: 30
    };

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_SLEEPING = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    IMAGES_HURTING = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    IMAGES_WAITING = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];



    world;

    constructor() {
        super().loadImage('./img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_SLEEPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURTING);
        this.loadImages(this.IMAGES_WAITING);
        this.applyGravity();
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.handleMovement();
        }, 1000 / 60);

        setInterval(() => {
            this.updateAnimation();
        }, 90);

        setInterval(() => {
            this.handleIdleTimer();
        }, 300);

    }


    gameOver() {
        document.getElementById('gameOverContainer').classList.remove('d-none');
    }

    /**
     * Handles the movement of the character based on user input.
     * - Moves the character left or right.
     * - Makes the character jump if the spacebar is pressed.
     * - Plays background sound during movement if enabled.
    */
    handleMovement() {
        sounds[0].pause();

        if (!bgsound) {
            sounds[0].pause();
            sounds[0].currentTime = 0;
        }
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            if (bgsound) sounds[0].play();
            this.otherDirection = false;
        }
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            if (bgsound) sounds[0].play();
            this.otherDirection = true;
        }
        if (this.world.keyboard.SPACE && !this.isAboutGround()) {
            this.jump();
        }
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Updates the character's animations based on its current state.
     * - Plays the "dead" animation and ends the game if the character is dead.
     * - Plays the "hurt" animation if the character is injured.
     * - Plays the "jumping" animation if the character is in the air.
     * - Plays the "walking" animation if the character is moving left or right.
     */
    updateAnimation() {
        if (this.isDead()) {
            sounds[3].pause();
            sounds[0].pause();
            this.gameOver();
            if (bgsound) sounds[1].play();
            this.playAnimation(this.IMAGES_DEAD);
            this.clearAllIntervals();
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURTING);
        } else if (this.isAboutGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }
    }

    /**
     * Handles the character's idle behavior when no input is detected.
     * - Plays the "waiting" animation while idle.
     * - Transitions to the "sleeping" animation if the character remains idle for a set duration.
     * - Plays a sleeping sound effect when transitioning to the "sleeping" animation.
     */
    handleIdleTimer() {
        if (this.isWaiting()) {
            this.playAnimation(this.IMAGES_WAITING);
            this.timer += 300;
            if (this.timer >= 13000) {
                this.playAnimation(this.IMAGES_SLEEPING);
                if (bgsound) sounds[2].play();
            }
        } else {
            this.timer = 0;
        }
    }
}
