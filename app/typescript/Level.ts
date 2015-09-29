/// <reference path="../../bower_components/phaser/typescript/phaser.d.ts"/>;
module TheBlob {
    export class Level extends Phaser.State {
        player: Phaser.Sprite;
        ball: Phaser.Sprite;
        ground: Phaser.Physics.P2.Body;

        initGround() {
            var physics = this.game.physics.p2;
            this.ground = physics.createBody(0, 600, 0, true);
            this.ground.addPlane();
            physics.addBody(this.ground);
        }

        initPlayer() {
        	//Sprite
        	this.player = this.game.add.sprite(200, 400, 'blob');
            this.player.scale.setTo(1.2);
            //Animations
        	this.player.animations.add('standing',[0,1,1,0]);
        	this.player.animations.add('move',[0,1,2,3,3,2,1,0]);
        	this.player.animations.add('jump',[7]);
        	//Physics
            this.game.physics.p2.enable(this.player);
        	this.player.body.collideWorldBounds = true;
        	this.player.body.fixedRotation = true;
        }

        initBall() {
        	//Sprite
        	this.ball = this.game.add.sprite(400,0, 'ball');
        	this.ball.scale.setTo(0.3);
        	//Physics
            this.game.physics.p2.enable(this.ball);
            this.ball.body.clearShapes();
            this.ball.body.addCircle(this.ball.width/2);
            this.ball.body.mass = 0.1;
            this.ball.body.setZeroDamping();
        }

        initContacts() {
            var playerMaterial = this.game.physics.p2.createMaterial('playerMaterial', this.player.body);
            var ballMaterial = this.game.physics.p2.createMaterial('ballMaterial', this.ball.body);
            var groundMaterial = this.game.physics.p2.createMaterial('worldMaterial', this.ground);

            
            var contactMaterial = this.game.physics.p2.createContactMaterial(playerMaterial, groundMaterial);
            contactMaterial.restitution = 0.2;

            contactMaterial = this.game.physics.p2.createContactMaterial(ballMaterial, groundMaterial);
            contactMaterial.restitution = 0.4;

            contactMaterial = this.game.physics.p2.createContactMaterial(playerMaterial, ballMaterial);
            contactMaterial.restitution = 1;
            contactMaterial.friction = 0;
            contactMaterial.frictionRelaxation = 0;
        }

        create() {
        	this.game.physics.p2.gravity.y = 2000;
        	this.game.physics.p2.restitution = 0.4;
        	var back = this.game.add.sprite(0, 0, 'background');
            back.width = this.game.width;

        	this.initGround();
        	this.initPlayer();
        	this.initBall();
        	this.initContacts();
        }

        checkPlayerInput() {
            var canJump = this.checkIfCanJump();
        	if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
		    {
                this.player.body.moveLeft(500);
                if (canJump)
                    this.player.animations.play('move', 10, true);
		    }else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
		    {
                this.player.body.moveRight(500);
                if (canJump)
                    this.player.animations.play('move', 10, true);
		    }
            else if(canJump){
                this.player.animations.play('standing', 10, true);
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP) && canJump) {
                this.player.body.velocity.y = -1000;
                this.player.animations.play('jump', 1, false);
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                this.ball.body.velocity.y = -1000;
            }
        }

        update() {
        	//Player
            this.player.body.velocity.x = 0;
        	this.checkPlayerInput();
        }

        checkIfCanJump() {
            var yAxis = p2.vec2.fromValues(0, 1);

            for (var i = 0; i < this.game.physics.p2.world.narrowphase.contactEquations.length; ++i) {
                var equation = this.game.physics.p2.world.narrowphase.contactEquations[i];
                var isBodyA = equation.bodyA === this.player.body.data;
                if (isBodyA || equation.bodyB === this.player.body.data) {
                    var d = p2.vec2.dot(equation.normalA, yAxis); // Normal dot Y-axis
                    if (isBodyA) d *= -1;
                    if (d > 0.5) {
                        return true;
                    }
                }
            }    

            return false;
        }
    }
}