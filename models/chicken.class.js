class Chicken extends MovableObject {
    y = 375;
    height = 50;
    width = 40;

    alive = true;
    indexChicken;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

    CHICKEN_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]

    CHICKEN_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.CHICKEN_WALKING);
        this.loadImages(this.CHICKEN_DEAD);

        this.x = 250 + Math.random() * 1400;
        this.speed = 0.25 + Math.random() * 0.4;

        this.animate();
    }


    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 16)

        setInterval(() => {
            if (this.alive) {
                this.playAnimation(this.CHICKEN_WALKING);
            } else {
                level1.enemies[this.indexChicken].speed = 0;
                this.playAnimation(this.CHICKEN_DEAD);
                setTimeout(() => {
                    if (!this.alive) {
                        level1.enemies.splice(this.indexChicken, 1);
                        this.alive = true;
                    }
                }, 500);
            }
        }, 160);

        // setInterval(() => {
        //     for (const mo of level1.enemies) {
        //         if (this.isCollidingOnTop(mo)) {
        //             mo.playAnimation(mo.CHICKEN_DEAD);
        //             console.log('chicken dead');

        //         }
        //     }
        // }, 100);


        // setInterval(() => {
        //     if (this.checkCollisionWithEnemieTop()) {
        //     this.playAnimation(this.CHICKEN_DEAD);
        //     }
        // }, 100);
    }


    indexOfChicken(index) {
        console.log('IndexChickenClass: ', index);
        this.indexChicken = index;
        if (index > -1) {
            this.alive = false;
        }
    }
}
