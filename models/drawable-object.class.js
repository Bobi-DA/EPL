class DrawableObject {
    x = 90;
    y = 275;
    height = 150;
    width = 80;
    img;
    imageCache = {};
    currentImage = 0;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;     // Die src-Eigenschaft eines Bild-Objekts gibt den Pfad zur Bilddatei an.

    }

    loadImages(arr) {                           // Die Methode `loadImages` nimmt ein Array `arr` von Bildpfaden.
        arr.forEach((path) => {                 // Für jeden Bildpfad im Array wird eine Funktion ausgeführt.
            let img = new Image();              // Ein neues Bild-Objekt wird erstellt.
            img.src = path;                     // Der Pfad des Bildes wird gesetzt, sodass der Browser das Bild lädt.
            this.imageCache[path] = img;        // Das Bild wird im Cache `imageCache` unter dem Pfad als Schlüssel gespeichert.
        });
    }
    
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof MiniChicken
            || this instanceof Endboss || this instanceof Coins || this instanceof Bottles) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }

    }

}