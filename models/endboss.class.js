class Endboss extends MovableObject {
    y = 30;
    speed = 5;
    height = 1045 / 2.5;
    width = 1217 / 2.5;
    energy = 50;
    timer = 0;
    bossIsActivated = false;
    isAttacking = false;
    alertPlayedOff = false;
    activateBossAttack = false;
    isStatusBarVisible = false;


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

    chicken_sound = new Audio('audio/chicken.mp3');
    game_won_sound = new Audio('audio/game_won.mp3');

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
            this.chicken_sound.pause();

            if (this.isDead()) {
                this.bossIsActivated = false;
                this.playAnimation(this.BOSS_DEAD);
                this.gameWon();
                this.game_won_sound.play();
                setTimeout(() => {
                    this.clearAllIntervals();
                }, 1000);
            } else if (this.isHurt()) {
                this.playAnimation(this.BOSS_HURTING);
                this.chicken_sound.play();
            } else if (this.characterMeetsEndboss() && !this.alertPlayedOff) {
                this.isStatusBarVisible = true;
                this.playAnimation(this.BOSS_ALERT);
                setTimeout(() => {
                    this.alertPlayedOff = true;
                    this.activateBossAttack = true;
                }, 2000);
            } else if (this.activateBossAttack && !this.isAttacking) {
                this.bossAttack();
            } else if (this.isAttacking) {
                this.playAnimation(this.BOSS_ATTACKING);
            } else {
                this.playAnimation(this.BOSS_WALKING);
            }
        }, 160);

        setInterval(() => {
            if (this.bossIsActivated) {
                this.moveLeft();
            }
        }, 250);

    }


    bossAttack() {
        if (!this.isAttacking && this.activateBoss()) {
            this.isAttacking = true;
            setTimeout(() => {
                this.isAttacking = false;
            }, 3000);
        }
    }

    gameWon(){
        document.getElementById('winGameContainer').classList.remove('d-none');
    }
};