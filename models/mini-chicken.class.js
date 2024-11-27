class MiniChicken extends MovableObject {
    y = 395;
    height = 50/2;
    width = 40/2;

    MINICHICKEN_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ]

    MINICHICKEN_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    ]

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.MINICHICKEN_WALKING);

        this.x = 250 + Math.random() * 1400;
        this.speed = 0.25 + Math.random() * 0.4;

        this.animate();
    }


    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 16)

        setInterval(() => {
            this.playAnimation(this.MINICHICKEN_WALKING);
        }, 160);

    }
}