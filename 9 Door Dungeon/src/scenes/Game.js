import { FX, Scene } from 'phaser';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
        this.player,
        this.cursors,
        this.attack
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
        this.load.spritesheet('mainAttack', 
            'assets/characterAssets/main/Attack_1.png',
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

        this.attack = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        // console.log(Phaser.Input.Keyboard.Key)

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
            key: 'attack',
            frames: this.anims.generateFrameNumbers('mainAttack', { start: 0, end: 5}),
            frameRate: 10,
            repeat: -1
        })

        // this.input.once('pointerdown', () => {

        //     this.scene.start('GameOver');

        // });
    }

    update()
    {
        // console.log(this.player)
        if (this.player.body.velocity.x < 0) {
            this.player.setFlipX(true)
        } else {
            this.player.setFlipX(false)
        }

        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-160);

            this.player.anims.play('run', true);

        } else if (this.cursors.right.isDown)
        {
            this.player.setAccelerationX(160);

            this.player.anims.play('run', true);

        } else
        {
            this.player.setVelocityX(0);

            this.player.anims.play('idle');

        }

        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-330);

            this.player.anims.play('jump')
        }

        if (!this.player.body.touching.down)
        {
            this.player.anims.play('falling')
        }

        // console.log(this.events)
        if (this.attack.isDown) {
            this.player.anims.play('attack')
        }
    }
}
