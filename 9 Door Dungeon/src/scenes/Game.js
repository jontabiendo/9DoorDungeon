import { FX, Scene } from 'phaser';
import { Spark } from './assets/spark';
import { MC } from './assets/mc';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
        this.player,
        this.cursors,
        this.slash
        this.shoot
        this.sparks
        this.lastFired = 0;
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
        this.load.spritesheet('sparkHit',
            'assets/effects/sparkHit.png',
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
        
        this.player = new MC(this, 100, 100, 'MC');
        
        this.physics.add.existing(this.player)
        this.player.setSize(30, 55)
        this.player.body.offset.x = 50;
        this.player.body.offset.y = 70;
        
        this.player.setCollideWorldBounds(true);
        this.player.body.setGravity(0, 300)

        this.physics.add.collider(this.player, platforms);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.slash = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.slash.emitOnRepeat = true;
        this.shoot = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        this.sparks = this.physics.add.group({
            classType: Spark,
            // maxSize: 30,
            allowGravity: false,
            runChildUpdate: true
        });

        this.particle = this.add.particles(0, 0, 'sparkHit', {
            alpha: { start: 0, end: 3 },
            blendMode: Phaser.BlendModes.SCREEN,
            frequency: -1,
            lifespan: 200,
            radial: false,
            scale: { start: 1, end: 2, ease: 'Cubic.easeOut' }
        })

        this.physics.add.collider(this.sparks, platforms, (spark, platform) => {
            const { x, y } = spark.body.center;
            spark.disableBody(true, true)

            this.particle.emitParticleAt(x, y)
        })


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
            frames: this.anims.generateFrameNumbers('spark', { start: 0, end: 3}),
            frameRate: 10,
            // repeat: -1
        })        

        this.anims.create({
            key: 'sparkHit',
            frames: this.anims.generateFrameNumbers('sparkHit', { start: 0, end: 3}),
            frameRate: 10,
        })
    }



    animate(time, delta) {
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
        } else if (this.shoot.isDown && time > this.lastFired) {
            this.player.anims.play('shoot', true).once('animationcomplete', () => {
                this.lastAttack = 4
            })
        }else if (!this.player.body.touching.down) {
            this.player.anims.play('falling', true)
        } else if (this.cursors.left.isDown || this.cursors.right.isDown) {
            this.player.anims.play('run', true)
        } else {
            this.player.anims.play('idle', true)
        }
    }

    update(time, delta)
    {
        this.player.update(this.cursors, this.slash, this.shoot, time, delta, this.sparks)
    }
}
