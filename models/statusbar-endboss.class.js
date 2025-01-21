class StatusBarEndboss extends DrawableObject {
    x = 510;
    y = 6;
    height = 158 / 3;
    width = 595 / 3;


    STATUSBAR_ENDBOSS = [
        'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.STATUSBAR_ENDBOSS);
        this.setPercentage(100);
    }

    /**
    * Updates the percentage value for the status bar and sets the appropriate image based on the percentage.
    * 
    * @param {number} percentage - The new percentage value to set (ranges from 0 to 5).
    */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.STATUSBAR_ENDBOSS[this.resolveImageIndex()];
        this.img = this.imageCache[path];

    }

     /**
     * Determines the appropriate image index based on the current percentage value.
     * 
     * @returns {number} - The index of the image corresponding to the current percentage (ranges from 0 to 5).
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}