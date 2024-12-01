class Endboss extends MovableObject {
    y = 30;
    speed = 5;
    height = 1045 / 2.5;
    width = 1217 / 2.5;
    energy = 25;
    timer = 0;
    isActivated = false;
    isAttacking = false;


    BOSS_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    BOSS_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    BOSS_ATTACKING = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    BOSS_HURTING = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    BOSS_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
    constructor() {
        super().loadImage(this.BOSS_ALERT[7]);
        this.loadImages(this.BOSS_ALERT);
        this.loadImages(this.BOSS_WALKING);
        this.loadImages(this.BOSS_ATTACKING);
        this.loadImages(this.BOSS_HURTING);
        this.loadImages(this.BOSS_DEAD);


        this.x = 1700;
        this.animate();
    }


    animate() {

        setInterval(() => {
            if (this.isDead()) {
                console.log(this.BOSS_DEAD);
                this.isActivated = false;
                this.playAnimation(this.BOSS_DEAD);
                console.log('Boss ist dead!!!');
            } else if (this.isHurt()) {
                this.playAnimation(this.BOSS_HURTING);
            } else if (this.characterMeetEndboss()) {
                this.playAnimation(this.BOSS_ALERT);
            } else if (this.isAttacking) {
                this.playAnimation(this.BOSS_ATTACKING);
            } else {
                this.playAnimation(this.BOSS_WALKING);
            }
        }, 160);

        setInterval(() => {
            if (this.isActivated) {
                this.moveLeft();
            }
        }, 200);

    }


    bossAttack() {
        if (!this.isAttacking && this.isHurt()) {
            this.isAttacking = true;
            setTimeout(() => {
                this.isAttacking = false;
            }, 2000);
        }
    }

};