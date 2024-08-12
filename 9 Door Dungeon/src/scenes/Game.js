import { FX, Scene } from 'phaser';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
        this.player,
        this.cursors,
        this.slash
        this.shoot
        this.lastAttack = 3
        this.sparks
        this.facing = 'right'
    }

    preload()
    {
        // assets
        this.load.image('vampireCastle', 'assets/stages/vampire_castle.jpg');
        this.load.image('castleGround', 'assets/platforms/wall_3.png');

        // sprites
        this.load.spritesheet('run',
            'assets/characterAssets/main/Run.png',
            { 
                frameWidth: 128, 
                frameHeight: 128
            }
        );
        this.load.spritesheet('mainIdle',
            'assets/characterAssets/main/Idle.png',
            {
                frameWidth: 128,
                frameHeight: 128
            }
        )
        this.load.spritesheet('attack1', 
            'assets/characterAssets/main/Attack_1.png',
            {
                frameWidth: 128,
                frameHeight: 128
            }
        );
        this.load.spritesheet('attack2', 
            'assets/characterAssets/main/Attack_2.png',
            {
                frameWidth: 128,
                frameHeight: 128
            }
        );
        this.load.spritesheet('attack3', 
            'assets/characterAssets/main/Attack_3.png',
            {
                frameWidth: 128,
                frameHeight: 128
            }
        );
        this.load.spritesheet('attack4', 
            'assets/characterAssets/main/Attack_4.png',
            {
                frameWidth: 128,
                frameHeight: 128
            }
        );
        this.load.spritesheet('jump',
            'assets/characterAssets/main/Jump.png',
            {
                frameWidth: 128,
                frameHeight: 128
            }
        )
        this.load.spritesheet('spark',
            'assets/effects/spark-.png',
            {
                frameWidth: 72,
                frameHeight: 72
            }
        )
    }

    create ()
    {
        this.add.image(400, 300, 'vampireCastle').setScale(0.75);
        
        // platforms
        let platforms = this.physics.add.staticGroup();
        
        let firstPlat = platforms.create(100, 600, 'castleGround');
        platforms.create(250, 600, 'castleGround');
        platforms.create(500, 600, 'castleGround');
        platforms.create(700, 600, 'castleGround');
        
        platforms.create(600, 400, 'castleGround');
        platforms.create(700, 400, 'castleGround');
        platforms.create(50, 250, 'castleGround');
        platforms.create(750, 220, 'castleGround');
        
        this.player = this.physics.add.sprite(100, 100, 'idle');
        this.player.setSize(30, 55)
        this.player.body.offset.x = 50;
        this.player.body.offset.y = 70;
        
        // this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.player.body.setGravity(300)

        this.physics.add.collider(this.player, platforms);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.slash = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.slash.emitOnRepeat = true;
        this.shoot = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        this.sparks = this.physics.add.group();
        let testSpark = this.sparks.create(400, 300, 'spark').setSize(10, 10)
        // testSpark.

        this.physics.add.collider(this.player, this.sparks)
        this.physics.add.collider(this.sparks, platforms)

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('run', { start: 7, end: 0 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNames('mainIdle', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('jump', { start: 0, end: 1}),
            frameRate: 10
        })

        this.anims.create({
            key: 'land',
            frames: this.anims.generateFrameNumbers('jump', { start: 6, end: 7}),
            frameRate: 10
        })

        this.anims.create({
            key: 'falling',
            frames: this.anims.generateFrameNumbers('jump', { start: 3, end: 4}),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'attack1',
            frames: this.anims.generateFrameNumbers('attack1', { start: 0, end: 4}),
            frameRate: 10
        })

        this.anims.create({
            key: 'attack2',
            frames: this.anims.generateFrameNumbers('attack2', { start: 0, end: 2}),
            frameRate: 10
        })

        this.anims.create({
            key: 'attack3',
            frames: this.anims.generateFrameNumbers('attack3', { start: 0, end: 2}),
            frameRate: 10
        })

        this.anims.create({
            key: 'shoot',
            frames: this.anims.generateFrameNumbers('attack4', { start: 0, end: 9}),
            frameRate: 10
        })

        this.anims.create({
            key:'spark',
            frames: this.anims.generateFrameNumbers({ start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        })
    }

    movement() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.facing = 'left'
        } else if (this.cursors.right.isDown){
            this.player.setAccelerationX(160);
            this.facing = 'right'
        } else {
            this.player.setVelocityX(0);
        }
    
        if (this.cursors.up.isDown && this.player.body.touching.down){
            this.player.setVelocityY(-330);
        }
    }

    animate() {
        if (this.slash.isDown) {
            if (this.lastAttack === 3 || this.lastAttack === 4) {
                this.player.anims.play('attack1', true).once('animationcomplete', () => {
                    this.lastAttack = 1
                })
            } else if (this.lastAttack === 1) {
                this.player.anims.play('attack2', true).once('animationcomplete', () => {
                    this.lastAttack = 2
                })
            } else {
                this.player.anims.play('attack3', true).once('animationcomplete', () => {
                    this.lastAttack = 3
                })
            }
        } else if (this.shoot.isDown) {
            this.player.anims.play('shoot', true).once('animationcomplete', () => {
                this.lastAttack = 4
                let start;
                if (this.facing === 'right') {
                    start = this.player.getRightCenter()
                } else {
                    start = this.player.getLeftCenter()
                }
                this.sparks.create(start.x - 15, start.y + 25, 'spark').setSize(10, 10)
            })
        }else if (!this.player.body.touching.down) {
            this.player.anims.play('falling', true)
        } else if (this.cursors.left.isDown || this.cursors.right.isDown) {
            this.player.anims.play('run', true)
        } else {
            this.player.anims.play('idle', true)
        }
    }

    update()
    {
        if (this.facing === 'left') {
            this.player.setFlipX(true)
        } else {
            this.player.setFlipX(false)
        }
        this.movement()
        this.animate()
    }
}
