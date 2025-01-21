class ThrowableObject extends MovableObject {
    width = 400 / 7;
    height = 400 / 7;

    BOTTLE_THROWING = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    BOTTLE_SPLASHING = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.loadImages(this.BOTTLE_THROWING);
        this.loadImages(this.BOTTLE_SPLASHING);
        // this.throw();
        this.animation();
    }

    animation() {

        if (this.x > world.endboss.x) {
            this.splashing();
        } else {
            this.throw();
        }
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();

        setInterval(() => {
            if (!world.character.otherDirection) {
                this.playAnimation(this.BOTTLE_THROWING);
                this.x += 10;
            } else {
                this.playAnimation(this.BOTTLE_THROWING);
                this.x -= 10;
            }
        }, 30);
    }

    splashing() {
        setInterval(() => {
            this.playAnimation(this.BOTTLE_SPLASHING);
        }, 30);
    }
}