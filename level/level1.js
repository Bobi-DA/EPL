let level1;

function initLevel() {

    level1 = new Level(

        [
            // new Chicken(),
            // new Chicken(),
            // new Chicken(),
            // new Chicken(),
            // new MiniChicken(),
            // new MiniChicken(),
            // new MiniChicken(),
        ],

        [
            new Cloud()
        ],

        [
            new BackgroundObject('img/5_background/layers/air.png', -719, 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719, 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719, 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719, 0),

            new BackgroundObject('img/5_background/layers/air.png', 0, 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0, 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0, 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0, 0),

            new BackgroundObject('img/5_background/layers/air.png', 719, 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719, 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719, 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719, 0),

            new BackgroundObject('img/5_background/layers/air.png', 2 * 719, 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 2 * 719, 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 2 * 719, 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 2 * 719, 0)
        ],

        [
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins()
        ],

        [
            new Bottles('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 280),
            new Bottles('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 380),
            new Bottles('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 480),
            new Bottles('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 680),
            new Bottles('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 880)

        ]
    );
}