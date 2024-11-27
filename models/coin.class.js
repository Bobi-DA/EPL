class Coins extends MovableObject {
    y = 130;
    height = 300 / 5;
    width = 301 / 5;

    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ]

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);

        this.x = 100 + Math.random() * 700;
        this.y = 100 + Math.random() * 100;

        this.animate();
    }

    animate() {
        // this.moveLeft();

        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 160);

    }
}