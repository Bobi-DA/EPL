class MiniChicken extends MovableObject {
    y = 375;
    height = 50;
    width = 40;

    alive = true;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

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
        this.loadImages(this.MINICHICKEN_DEAD);

        this.x = 300 + Math.random() * 2000;
        this.speed = 0.25 + Math.random() * 0.4;

        this.animate();
    }

    /**
     * Manages the animation and movement of the Mini Chicken character.
     * - Continuously moves the Mini Chicken to the left.
     * - Checks if the Mini Chicken is alive or dead and plays the appropriate animations.
     * - Removes the Mini Chicken from the enemy list when it is marked as dead.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 16)
        setInterval(() => {
            if (this.alive) {
                this.playAnimation(this.MINICHICKEN_WALKING);
            } else {
                level1.enemies[this.indexChicken].speed = 0;
                this.playAnimation(this.MINICHICKEN_DEAD);
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
     * Sets the index of the Mini Chicken in the enemies list and marks it as dead if a valid index is provided.
     * @param {number} index - The index of the Mini Chicken in the `level1.enemies` array.
     * - If `index > -1`, the Mini Chicken is marked as not alive.
     */
    indexOfChicken(index) {
        this.indexChicken = index;
        if (index > -1) {
            this.alive = false;
        }
    }
}