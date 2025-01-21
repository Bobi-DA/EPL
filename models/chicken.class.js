class Chicken extends MovableObject {
    y = 360;
    height = 70;
    width = 56;

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

        this.x = 300 + Math.random() * 1800;
        this.speed = 0.25 + Math.random() * 0.4;

        this.animate();
    }

    /**
     * Controls the animation and behavior of the chicken.
     * - Moves the chicken continuously to the left.
     * - Updates the chicken's animation based on its state (alive or dead).
     * - Removes the chicken from the `level1.enemies` array after a delay when it is dead.
     */
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

    }

    /**
     * Sets the index of the chicken in the `level1.enemies` array and marks it as dead.
     * - Updates the `indexChicken` property to the given index.
     * - Sets the `alive` property to `false` if the index is valid.
     * 
     * @param {number} index - The index of the chicken in the `level1.enemies` array. A value greater than -1 marks the chicken as dead.
     */
    indexOfChicken(index) {
        this.indexChicken = index;
        if (index > -1) {
            this.alive = false;
        }
    }
}
