class Bottles extends MovableObject {
    y = 370;
    height = 50;
    width = 50;

    offset = {
        top: 0,
        left: 20,
        right: 10,
        bottom: 0
    };

    
    BOTTLE_GROUND = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    ];


    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
    }


    animate() {
        setInterval(() => {
            this.playAnimation(this.BOTTLE_GROUND);
        }, 1000);
    }
    
}