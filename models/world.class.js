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

    // iha_sound = new Audio('audio/iha.mp3');
    // coin_sound = new Audio('audio/coin.mp3');
    // bottle_sound = new Audio('audio/bottle.mp3');
    // male_hurt_sound = new Audio('audio/male_hurt.mp3');


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;    // Die Instanz der Klasse "World" wird dem Charakter "world" zugewiesen
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
                if (bgsound) sounds[6].play();
                level1.enemies[index].alive = false;
            }
        });
    }

    checkCollisionsWithEndboss() {
        if (this.character.isColliding(this.endboss)) {
            this.character.hit();
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


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);

        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.endboss);
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObject);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);
        if (this.endboss.isStatusBarVisible) {
            this.addToMap(this.statusBarEndboss);
        }
        this.ctx.translate(this.camera_x, 0);

        this.ctx.translate(-this.camera_x, 0);




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
        mo.drawFrame(this.ctx);
        mo.drawFrameRed(this.ctx);

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



// Warum in " this.ctx.drawImage(this.character.img, this.character.x, this.character.y,
// this.character.width, this.character.height);" die Punkt-Notation funktioniert.

// Die Klasse World muss nicht von MovableObject erben, weil in der World-Klasse eine Instanz der
// Character-Klasse erstellt wird, und die Character-Klasse wiederum von MovableObject erbt. Das
// bedeutet, dass der Character, der in der Welt existiert, bereits die Eigenschaften und Methoden
// von MovableObject hat, wie zum Beispiel die moveRight()- oder moveLeft()-Methoden.
// Die World-Klasse hat also Zugriff auf den Character und damit auf alles, was der Character erbt.
// Die World selbst braucht diese Vererbung nicht, weil sie nicht selbst ein bewegliches Objekt ist,
// sondern eher eine übergeordnete Instanz, die die verschiedenen Objekte (wie den Charakter und die Feinde)
// verwaltet und zeichnet.