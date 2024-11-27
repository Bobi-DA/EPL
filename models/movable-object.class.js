class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    accelelration = 2.5;
    energy = 100;

    lastHit = 0;


    applyGravity() {
        setInterval(() => {
            if (this.isAboutGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.accelelration;
            }

        }, 1000 / 25);
    }

    isAboutGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 190;
        }
    }


    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height
    }

    hit() {
        this.energy -= 5;

        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    characterMeetEndboss() {
        if (world.character.x > 1300) {
            return true;
        } else{
            return false;
        }
    }

    activateBoss() {
        this.isActivated = true; // Endboss wird aktiviert
        // console.log('Endboss aktiviert!');
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }


    isDead() {
        return this.energy == 0;
    }

    isWaiting() {
        if (!this.world.keyboard.D && !this.world.keyboard.LEFT && !this.world.keyboard.RIGHT && !this.world.keyboard.SPACE && !this.isAboutGround()) {
            return true;
        }
    }



    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }
}