class StatusbarBottles extends DrawableObject {
    x = 0;
    y = 80;
    height = 158 / 3;
    width = 595 / 3;

    STATUSBAR_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ];

    percentage = 0;

    constructor() {
        super();
        this.loadImages(this.STATUSBAR_BOTTLE);
        this.setPercentage(0);
    }

    /**
     * Updates the percentage value for the status bar and sets the appropriate image based on the percentage.
     * 
     * @param {number} percentage - The new percentage value to set (ranges from 0 to 5).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.STATUSBAR_BOTTLE[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    incStatusbarBottle() {
        this.percentage += 1;
    }

    decStatusbarBottle() {
        this.percentage -= 1;
    }

    /**
     * Determines the appropriate image index based on the current percentage value.
     * 
     * @returns {number} - The index of the image corresponding to the current percentage (ranges from 0 to 5).
     */
    resolveImageIndex() {
        if (this.percentage == 5) {
            return 5;
        } else if (this.percentage >= 4 && this.percentage < 5) {
            return 4;
        } else if (this.percentage >= 3 && this.percentage < 4) {
            return 3;
        } else if (this.percentage >= 2 && this.percentage < 3) {
            return 2;
        } else if (this.percentage >= 1 && this.percentage < 2) {
            return 1;
        } else {
            return 0;
        }
    }
}