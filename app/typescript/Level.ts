/// <reference path="../../bower_components/phaser/typescript/phaser.d.ts"/>;
module TheBlob {
    export class Level extends Phaser.State {
        player: Phaser.Sprite;
        ball: Phaser.Sprite;
        ground: Phaser.Sprite;

        initGround() {
        	//Sprite
        	this.ground = this.game.add.sprite(0, 600);
        	this.ground.width = this.game.width;
        	this.ground.height = 1;
        	//Physics
        	this.game.physics.arcade.enable(this.ground);
        	this.ground.body.immovable = true;
        	this.ground.body.allowGravity = false;
        }

        initPlayer() {
        	//Sprite
        	this.player = this.game.add.sprite(200, 400, 'blob');
        	this.player.anchor.set(0.5);
        	//Animations
        	this.player.animations.add('standing',[0,1,1,0]);
        	this.player.animations.add('move',[0,1,2,3,3,2,1,0]);
        	this.player.animations.add('jump',[7]);
        	//Physics
        	this.game.physics.arcade.enable(this.player);
        	this.player.body.collideWorldBounds = true;
        	this.player.body.bounce.y = 0.2;
        }

        initBall() {
        	//Sprite
        	this.ball = this.game.add.sprite(200,0, 'ball');
        	this.ball.scale.setTo(0.2);
        	//Physics
        	this.game.physics.arcade.enable(this.ball);
        	this.ball.body.collideWorldBounds = true;
        	this.ball.body.bounce.setTo(0.8,0.5);
        	this.ball.anchor.setTo(0.5);
        }

        create() {
        	this.game.physics.arcade.gravity.y = 2000;
        	this.game.add.sprite(0, 0, 'background');

        	this.initGround();
        	this.initPlayer();
        	this.initBall();
        }

        rotateBall() {
        	if(this.ball.body.velocity.x > 0){
        		this.ball.angle += 5;
	        }else if(this.ball.body.velocity.x < 0){
	        	this.ball.angle -= 5;
	        }
        }

        moveBall() {
			if(this.ball.body.velocity.x >= 3){
        		this.ball.body.velocity.x -= 3;
        	}else if(this.ball.body.velocity.x <= -3){
        		this.ball.body.velocity.x += 3;
        	}else {
        		this.ball.body.velocity.x = 0;
        	}
        }

        checkPlayerInput() {
        	if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
		    {
		        this.player.body.velocity.x = -300;
		        if(this.player.body.touching.down){
		        	this.player.animations.play('move', 10, true);
		        }
		    }else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
		    {
		        this.player.body.velocity.x = 300;
		        if(this.player.body.touching.down){
		        	this.player.animations.play('move', 10, true);
		        }
		    }else if(this.player.body.touching.down){
				this.player.animations.play('standing', 10, true);
		    }

		    if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP) && this.player.body.touching.down)
		    {
		        this.player.body.velocity.y = -1000;
		        this.player.animations.play('jump', 1, false);
		    }
        }

        update() {
        	//Collisions
        	this.game.physics.arcade.collide(this.ball, this.player, ()=>this.rotateBall());
        	this.game.physics.arcade.collide(this.ball, this.ground);
        	this.game.physics.arcade.collide(this.player, this.ground);

        	//Ball
        	this.rotateBall();
        	this.moveBall();

        	//Player
        	this.player.body.velocity.x = 0;
        	this.checkPlayerInput();
        }
    }
}