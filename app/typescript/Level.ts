/// <reference path="../../bower_components/phaser/typescript/phaser.d.ts"/>;
module TheBlob {
    export class Level extends Phaser.State {
        player: Phaser.Sprite;
        create() {
        	this.game.add.sprite(0, 0, "background");
        	this.player = this.game.add.sprite(50, 400, "blob");
        	this.player.anchor.set(1);
        	this.player.animations.add('standing',[0,1,1,0]);
        	this.player.animations.add('move',[0,1,2,3,3,2,1,0]);
        	this.player.animations.add('jump',[7]);
        	this.game.physics.enable(this.player);
        	this.player.body.collideWorldBounds = true;
        	this.player.body.gravity.y = 700;
        }

        update() {
        	this.player.body.velocity.x = 0;
        	if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
		    {
		        this.player.body.velocity.x = -100;
		        if(this.player.body.onFloor()){
		        	this.player.animations.play('move', 10, true);
		        }
		    }
		    else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
		    {
		        this.player.body.velocity.x = 100;
		        if(this.player.body.onFloor()){
		        	this.player.animations.play('move', 10, true);
		        }
		    }
		    else if(this.player.body.onFloor()){
				this.player.animations.play('standing', 10, true);
		    }
		    if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP) && this.player.body.onFloor())
		    {
		        this.player.body.velocity.y = -600;
		        this.player.animations.play('jump', 1, false);
		    }
        }
    }
}