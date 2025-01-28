class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    accelelration = 2.5;
    energy = 100;

    lastHit = 0;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

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
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height -mo.offset.bottom;
    }


    isCollidingOnTop(mo) {
        const isOnTop = this.y + this.height >= mo.y && this.y + this.height <= mo.y + 50; 
        const isHorizontallyAligned = this.x + this.width > mo.x && this.x < mo.x + mo.width;
        const isFalling = this.speedY < 0;

        return isOnTop && isHorizontallyAligned && isFalling;
    }

    hit() {
        this.energy -= 2;

        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    bossHitCharacter() {
        this.energy -= 10;

        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    characterMeetsEndboss() {
        if (!world || !world.character) {
            return false;
        }
        return world.character.x > 1200;
    }


    activateBoss() {
        if (!this.bossIsActivated) {
            this.bossIsActivated = true;
            console.log('Boss aktiviert!');
        }
        return this.bossIsActivated;
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }


    isDead() {
        return this.energy <= 0;
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
    
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
      }
}