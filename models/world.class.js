class World {

    character = new Character();
    endboss = new Endboss();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    statusBarEndboss = new StatusBarEndboss();
    statusBarCoins = new StatusbarCoins();
    statusBarBottles = new StatusbarBottles();
    throwableObject = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.collisionCharacterWithBottles();
            this.collisionCharacterWithCoins();
            this.checkThrowObjects();
            this.collisionBottleWithChicken();
            this.checkCollisionsWithEndboss();
        }, 50);

        setInterval(() => {
            this.checkCollisionWithEnemieTop();
        }, 5);
    }

    checkCollisions() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                if (bgsound) sounds[9].play();
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    checkCollisionWithEnemieTop() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isCollidingOnTop(enemy)) {
                this.level.enemies[index].indexOfChicken(index);
                this.level.enemies[index].offset.top = 400;
                if (bgsound) sounds[6].play();
                sounds[6].currentTime = 0;
                level1.enemies[index].alive = false;
            }
        });
    }

    checkCollisionsWithEndboss() {
        if (this.character.isColliding(this.endboss)) {
            this.character.bossHitCharacter();
            this.character.x -=100;
            console.log('x: ', this.character.x);
            
            this.statusBar.setPercentage(this.character.energy);
        }
    };

    collisionBottleWithChicken() {
        this.throwableObject.forEach(bottle => {
            if (this.endboss.isColliding(bottle)) {
                this.endboss.hit();
                this.statusBarEndboss.setPercentage(this.endboss.energy);
                bottle.splashing();

            }
        });
    }

    collisionCharacterWithBottles() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                if (bgsound) {
                    sounds[8].play();
                    sounds[8].currentTime = 0;
                }
                level1.bottles.splice(index, 1);
                this.statusBarBottles.incStatusbarBottle();
                this.statusBarBottles.setPercentage(this.statusBarBottles.percentage);
            }
        });
    }

    collisionCharacterWithCoins() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                if (bgsound) {
                    sounds[7].play();
                    sounds[7].currentTime = 0;
                }
                level1.coins.splice(index, 1);
                this.statusBarCoins.incStatusbarCoins();
                this.statusBarCoins.setPercentage(this.statusBarCoins.percentage);
            }
        });
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.statusBarBottles.percentage > 0) {
            let bottle = new ThrowableObject(this.character.x + 40, this.character.y + 70);
            this.throwableObject.push(bottle);
            this.statusBarBottles.decStatusbarBottle();
            this.statusBarBottles.setPercentage(this.statusBarBottles.percentage);
        }
    }

    /**
     * Draws all elements of the game, including the background, characters, enemies, and status bars.
     * Delegates specific tasks to helper methods for clarity and modularity.
     */
    draw() {
        this.clearCanvas();
        this.setCamera();
        this.drawLevelObjects();
        this.resetCamera();
        this.drawStatusBars();
        this.loopDraw();
    }

    /**
     * Clears the entire canvas to prepare it for the next frame.
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Adjusts the camera position by translating the context based on the current `camera_x` value.
     */
    setCamera() {
        this.ctx.translate(this.camera_x, 0);
    }

    /**
     * Draws all level-related objects, including background objects, clouds, coins, bottles,
     * enemies, the end boss, the main character, and throwable objects.
     */
    drawLevelObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.endboss);
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObject);
    }

    /**
     * Resets the camera position by translating the context back to its original position.
     */
    resetCamera() {
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Draws all status bars, including the character's health bar, coin status, and bottle status.
     * If the end boss is active, its status bar is also drawn.
     */
    drawStatusBars() {
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);
        if (this.endboss.isStatusBarVisible) {
            this.addToMap(this.statusBarEndboss);
        }
    }

    /**
     * Creates a continuous rendering loop using `requestAnimationFrame`.
     * Ensures that the `draw()` method is repeatedly called for smooth animation.
     */
    loopDraw() {
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }



    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}