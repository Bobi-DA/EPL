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

    percentage = 25;

    constructor() {
        super();
        this.loadImages(this.STATUSBAR_ENDBOSS);
        this.setPercentage(25);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.STATUSBAR_ENDBOSS[this.resolveImageIndex()];
        this.img = this.imageCache[path];

    }

    resolveImageIndex() {
        if (this.percentage == 25) {
            return 5;
        } else if (this.percentage >= 20) {
            return 4;
        } else if (this.percentage >= 15) {
            return 3;
        } else if (this.percentage >= 10) {
            return 2;
        } else if (this.percentage >= 5) {
            return 1;
        } else {
            return 0;
        }
    }




}