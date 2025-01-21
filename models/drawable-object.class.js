class DrawableObject {
    x = 90;
    y = 275;
    height = 150;
    width = 80;
    img;
    imageCache = {};
    currentImage = 0;

    /**
     * Loads a single image and sets it as the object's image.
     * - Creates a new `Image` object and assigns it to the `img` property.
     * - Sets the source of the image to the given path.
     *
     * @param {string} path - The file path of the image to be loaded.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;

    }

    /**
     * Loads multiple images and caches them for future use.
     * - Iterates over an array of image paths.
     * - Creates a new `Image` object for each path, sets its source, and stores it in the `imageCache`.
     *
     * @param {string[]} arr - An array of image file paths to be loaded and cached.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws the object's image on the canvas.
     * - Attempts to draw the image specified by the `img` property.
     * - If an error occurs during the drawing process, logs a warning message with details.
     *
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas on which to draw the image.
     */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (error) {
            console.warn('Error loading image', error);
            console.warn('Could noht load image', this.img);
        }

    }
}
