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
        this.character.world = this;    // Die Instanz der Klasse "World" wird dem Charakter "world" zugewiesen
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.collisionCharacterWithBottles();
            this.collisionCharacterWithCoins();
            this.checkThrowObjects();
            this.collisionBottleWithChicken();
        }, 200);
    }

    checkCollisions() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    collisionBottleWithChicken() {
            this.throwableObject.forEach(bottle => {
                if (this.endboss.isColliding(bottle)) {
                    console.log('world.class.js: Endboss ist getroffen');
                    this.endboss.hit();
                    this.statusBarEndboss.setPercentage(this.endboss.energy);
                }
            });
    }

    collisionCharacterWithBottles() {
        this.level.bottles.forEach(bottle => {
            if (this.character.isColliding(bottle)) {
                level1.bottles.splice(bottle, 1);
                this.statusBarBottles.incStatusbarBottle();
                this.statusBarBottles.setPercentage(this.statusBarBottles.percentage);
            }
        });
    }

    collisionCharacterWithCoins() {
        this.level.coins.forEach(coin => {
            if (this.character.isColliding(coin)) {
                level1.coins.splice(coin, 1);
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
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObject);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarEndboss);
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