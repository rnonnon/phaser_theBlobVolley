/// <reference path="../../bower_components/phaser/typescript/phaser.d.ts"/>;
module TheBlob {
    export class Preloader extends Phaser.State {

        preloadBar: Phaser.Sprite;

        preload() {

            //  Set-up our preloader sprite
            this.preloadBar = this.add.sprite(this.world.width/2, this.world.height/2, 'preloadBar');
            this.preloadBar.anchor.set(0.5);
            this.load.setPreloadSprite(this.preloadBar);

            //  Load our actual games assets
            this.load.image('background', 'assets/background.png');
            this.load.atlasJSONHash('blob','assets/blob.png','assets/blob.json');
            this.load.image('ball','assets/ball.png');
        }

        create() {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.start, this);
        }

        start() {
            this.game.state.start('Level', true, false);
        }

    }

}