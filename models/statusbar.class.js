class StatusBar extends DrawableObject {
    x = 0;
    y = 0;
    height = 158 / 3;
    width = 595 / 3;


    STATUSBAR_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.STATUSBAR_HEALTH);
        this.setPercentage(100);
    }

    /**
    * Updates the percentage value for the status bar and sets the appropriate image based on the percentage.
    * 
    * @param {number} percentage - The new percentage value to set (ranges from 0 to 5).
    */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.STATUSBAR_HEALTH[this.resolveImageIndex()];
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
        } else if (this.percentage >= 10) {
            return 1;
        } else {
            return 0;
        }
    }




}