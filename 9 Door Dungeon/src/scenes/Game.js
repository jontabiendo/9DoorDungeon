import { FX, Scene } from 'phaser';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
        this.player,
        this.cursors
    }

    

    preload()
    {
        // assets
        this.load.image('vampireCastle', 'assets/stages/vampire_castle.jpg');
        this.load.image('castleGround', 'assets/platforms/wall_3.png');

        // sprites
        this.load.spritesheet('mainRight',
            'assets/characterAssets/main/RunRight.png',
            { 
                frameWidth: 128, 
                frameHeight: 128
            }
        );
        this.load.spritesheet('mainLeft',
            'assets/characterAssets/main/RunLeft.png',
            { 
                frameWidth: 128, 
                frameHeight: 70
            }
        );
        this.load.spritesheet('mainIdle',
            'assets/characterAssets/main/Idle.png',
            {
                frameWidth: 128,
                frameHeight: 70
            }
        )
        this.load.spritesheet('mainAttack', 
            'assets/characterAssets/main/Attack_1.png',
            {
                frameWidth: 128,
                frameHeight: 128
            }
        );
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

        console.log(firstPlat.getBounds())
        
        this.player = this.physics.add.sprite(100, 100, 'idle').setOrigin(0, 64);
        
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.player.body.setGravity(300)

        this.physics.add.collider(this.player, 
            platforms, 
            null,
            (player, platform) => 
            {
                return this.player.body.velocity.y >= 0;
            }
        );

        this.cursors = this.input.keyboard.createCursorKeys();

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('mainLeft', { start: 7, end: 0 }),
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
            key: 'right',
            frames: this.anims.generateFrameNumbers('mainRight', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'mainAttack',
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
        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);

        } else if (this.cursors.right.isDown)
        {
            this.player.setAccelerationX(160);

            this.player.anims.play('right', true);

        } else
        {
            this.player.setVelocityX(0);

            this.player.anims.play('idle');

        }

        if (this.cursors.down.isDown) 
            {
                this.player.anims.play('mainAttack', true)
            } 

        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-330);
        }
    }
}
