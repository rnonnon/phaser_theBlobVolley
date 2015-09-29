/// <reference path="../../bower_components/phaser/typescript/phaser.d.ts"/>;
/// <reference path="Boot.ts"/>;
/// <reference path="Preloader.ts"/>;
/// <reference path="Level.ts"/>;
module TheBlob {
    export class Game extends Phaser.Game {
        constructor() {
            super(1500, 683, Phaser.AUTO, 'game', null);
            
            this.state.add('Boot', Boot);
            this.state.add('Preloader', Preloader);
            this.state.add('Level', Level);

            this.state.start('Boot');
        }
    }
}