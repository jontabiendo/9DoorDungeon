import { FX, Scene } from 'phaser';
import { Spark } from './assets/spark';
import { MC, createMC } from './assets/mc';
import { Robot } from './assets/robot'
import { SlashSprite } from './assets/slashSprite';
import { foe } from './assets/foe';

export class RobotFight extends Scene
{
    constructor ()
    {
        super('RobotFight');
        this.player;
        this.cursors;
        this.slash;
        this.shoot;
        this.sparks;
        this.lastFired = 0;
        this.complete = false;
        this.roll = null;
    }

    preload()
    {
        // assets
        this.load.image('ship', 'assets/stages/spaceship.jpg');
        // this.load.image('castleGround', 'assets/platforms/wall_3.png');
        this.load.image('metal_center', 'assets/platforms/metal_center.png'
        )
        this.load.image('metal_left', 'assets/platforms/metal_left.png'
        )
        this.load.image('metal_right', 'assets/platforms/metal_right.png'
        )

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
        this.load.spritesheet('hurt',
            'assets/characterAssets/main/Hurt.png',
            {
                frameWidth: 128,
                frameHeight: 128
            }
        )
        this.load.spritesheet('mcDie',
            'assets/characterAssets/main/Dead.png',
            {
                frameWidth: 128,
                frameHeight: 128
            }
        )
        this.load.spritesheet('slash1.1',
            'assets/effects/slashes/6/1.png',
            {
                frameWidth: 496,
                frameHeight: 496
            }
        )
        this.load.spritesheet('slash1.2',
            'assets/effects/slashes/6/2.png',
            {
                frameWidth: 496,
                frameHeight: 496
            }
        )
        this.load.spritesheet('slash1.3',
            'assets/effects/slashes/6/3.png',
            {
                frameWidth: 496,
                frameHeight: 496
            }
        )
        this.load.spritesheet('slash1.4',
            'assets/effects/slashes/6/4.png',
            {
                frameWidth: 496,
                frameHeight: 496
            }
        )
        this.load.spritesheet('slash1.5',
            'assets/effects/slashes/6/5.png',
            {
                frameWidth: 496,
                frameHeight: 496
            }
        )
        this.load.spritesheet('slash1.6',
            'assets/effects/slashes/6/6.png',
            {
                frameWidth: 496,
                frameHeight: 496
            }
        )
        this.load.spritesheet('slash1.7',
            'assets/effects/slashes/6/7.png',
            {
                frameWidth: 496,
                frameHeight: 496
            }
        )
        this.load.spritesheet('slash1.8',
            'assets/effects/slashes/6/8.png',
            {
                frameWidth: 496,
                frameHeight: 496
            }
        )
        this.load.spritesheet('slash1.9',
            'assets/effects/slashes/6/9.png',
            {
                frameWidth: 496,
                frameHeight: 496
            }
        )        
        this.load.spritesheet('slash1.10',
            'assets/effects/slashes/6/10.png',
            {
                frameWidth: 496,
                frameHeight: 496
            }
        )
        this.load.spritesheet('slash2.1',
            'assets/effects/slashes/4/1.png',
            {
                frameWidth: 496,
                frameHeight: 496
            }
        )
        this.load.spritesheet('slash2.2',
            'assets/effects/slashes/4/2.png',
            {
                frameWidth: 496,
                frameHeight: 496
            }
        )
        this.load.spritesheet('slash2.3',
            'assets/effects/slashes/4/3.png',
            {
                frameWidth: 496,
                frameHeight: 496
            }
        )
        this.load.spritesheet('slash2.4',
            'assets/effects/slashes/4/4.png',
            {
                frameWidth: 496,
                frameHeight: 496
            }
        )
        this.load.spritesheet('slash2.5',
            'assets/effects/slashes/4/5.png',
            {
                frameWidth: 496,
                frameHeight: 496
            }
        )
        this.load.spritesheet('slash2.6',
            'assets/effects/slashes/4/6.png',
            {
                frameWidth: 496,
                frameHeight: 496
            }
        )
        this.load.spritesheet('slash2.7',
            'assets/effects/slashes/4/7.png',
            {
                frameWidth: 496,
                frameHeight: 496
            }
        )
        this.load.spritesheet('slash2.8',
            'assets/effects/slashes/4/8.png',
            {
                frameWidth: 496,
                frameHeight: 496
            }
        )

        this.load.spritesheet('spark',
            'assets/effects/sparks/spark-.png',
            {
                frameWidth: 72,
                frameHeight: 72
            }
        )
        this.load.spritesheet('sparkHit',
            'assets/effects/sparks/sparkHit.png',
            {
                frameWidth: 72,
                frameHeight: 72
            }
        )

        this.load.spritesheet('robAtt1',
            'assets/characterAssets/cyborg/Attack_1.png',
            {
                frameWidth: 128,
                frameHeight: 128
            }
        )
        this.load.spritesheet('robAtt2',
            'assets/characterAssets/cyborg/Attack_2.png',
            {
                frameWidth: 128,
                frameHeight: 128
            }
        )
        this.load.spritesheet('robAtt3',
            'assets/characterAssets/cyborg/Attack_3.png',
            {
                frameWidth: 128,
                frameHeight: 128
            }
        )
        this.load.spritesheet('robShoot',
            'assets/characterAssets/cyborg/Attack_4.png',
            {
                frameWidth: 128,
                frameHeight: 128
            }
        )
        this.load.spritesheet('robDead',
            'assets/characterAssets/cyborg/Dead.png',
            {
                frameWidth: 128,
                frameHeight: 128
            }
        )
        this.load.spritesheet('robEnabling',
            'assets/characterAssets/cyborg/Enabling.png',
            {
                frameWidth: 128,
                frameHeight: 128
            }
        )
        this.load.spritesheet('robHurt',
            'assets/characterAssets/cyborg/Hurt.png',
            {
                frameWidth: 128,
                frameHeight: 128
            }
        )
        this.load.spritesheet('robIdle',
            'assets/characterAssets/cyborg/Idle.png',
            {
                frameWidth: 128,
                frameHeight: 128
            }
        )
        this.load.spritesheet('robWalk',
            'assets/characterAssets/cyborg/Pick_Up.png',
            {
                frameWidth: 128,
                frameHeight: 128
            }
        )
        this.load.spritesheet('robShutdown',
            'assets/characterAssets/cyborg/Shutdown.png',
            {
                frameWidth: 128,
                frameHeight: 128
            }
        )
    }

    create ()
    {

        this.add.image(400, 300, 'ship').setScale(0.75);
        
        // platforms
        let platforms = this.physics.add.staticGroup();
        
        // platforms.create(0, 600, 'metal_left');
        // let centerPlatform = platforms.create(700, 600, 'metal_center')
        // centerPlatform.setScale(10, 0);
        // console.log(centerPlatform)
        // platforms.create(800, 600, 'metal_right');

        for (let i = 0; i < 800; i += 16) {
            platforms.create(i, 600, 'metal_center')
        }
        
        let playerConfig = localStorage.getItem('MCPlayerData') || {}
        console.log(playerConfig)
        this.player = createMC(this, 100, 100, 'MC', playerConfig);
        
        this.physics.add.existing(this.player)
        this.player.setSize(30, 55)
        this.player.body.offset.x = 50;
        this.player.body.offset.y = 70;
        
        this.player.setCollideWorldBounds(true);
        this.player.body.setGravity(0, 300)

        this.physics.add.collider(this.player, platforms);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.slash = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        // console.log(this.slash)
        this.slash.setEmitOnRepeat(false)
        this.slash.emitOnRepeat = true;
        this.shoot = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        this.sparks = this.physics.add.group({
            classType: Spark,
            // maxSize: 30,
            allowGravity: false,
            runChildUpdate: true
        });

        this.enemySparks = this.physics.add.group({
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

        this.foe = new Robot(this, 500, 400, 'robot');
        this.foe.setScale(1.5)
        foe.foe = 'robot'
        foe.weapon = 'cannon'

        this.physics.add.existing(this.foe)
        this.foe.setSize(20, 60);
        this.foe.body.offset.x = 55;
        this.foe.body.offset.y = 65;
        this.foe.setCollideWorldBounds(true)
        this.foe.body.setGravity(0, 300)
        this.physics.add.collider(this.foe, platforms)

        this.physics.add.collider(this.sparks, this.foe, (foe, spark) => {
            const { x, y } = spark.body.center;
            spark.disableBody(true, true);

            this.particle.emitParticleAt(x, y)
        })
        
        // console.log(this.player.slashBox)
        this.physics.add.collider(this.player.slashBox, this.foe, (slashBox, foe) => {
            // console.log(this.player.slashBox)
            if (this.player.slashBox.colliderActive) {
                this.foe.takeDamage(100)
                slashBox.colliderActive = false
            }
            this.physics.world.disable(slashBox)
        })

        this.physics.add.collider(this.foe.swordBox, this.player, (swordBox, player) => {
            if (this.foe.swordBox.colliderActive) {
                this.player.getHit(100)
                swordBox.colliderActive = false
            }
            this.physics.world.disable(swordBox)
        })

        // this.slashes = this.physics.add.group({
        //     classType: SlashSprite,
        //     maxSize: 10,
        //     allowGravity: false,
        //     runChildUpdate: true
        // });

        // this.physics.add.collider(this.slashes, this.foe, (foe, slash) => {
        //     console.log(foe)
        // })

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
            key: 'hurt',
            frames: this.anims.generateFrameNumbers('hurt', { start: 0, end: 1}),
            frameRate: 10
        })

        this.anims.create({
            key: 'mcDie',
            frames: this.anims.generateFrameNumbers('mcDie', { start : 0, end: 4}),
            frameRate: 10
        })

        this.anims.create({
            key: 'mcSlash3',
            frames: [
                { key: 'slash1.1'},
                { key: 'slash1.2'},
                { key: 'slash1.3'},
                { key: 'slash1.4'},
                { key: 'slash1.5'},
                { key: 'slash1.6'},
                { key: 'slash1.7'},
                { key: 'slash1.8'},
                { key: 'slash1.9'},
                { key: 'slash1.10'}
            ],
            frameRate: 40,
            duration: 50
        })

        this.anims.create({
            key: 'mcSlash2',
            frames: [
                { key: 'slash2.1'},
                { key: 'slash2.2'},
                { key: 'slash2.3'},
                { key: 'slash2.4'},
                { key: 'slash2.5'},
                { key: 'slash2.6'},
                { key: 'slash2.7'},
                { key: 'slash2.8'}
            ],
            frameRate: 100,
            duration: 10
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

        this.anims.create({
            key: 'robAtt1',
            frames: this.anims.generateFrameNumbers('robAtt1', { start: 0, end: 3}),
            framRate: 5,
            duration: 400
        })

        this.anims.create({
            key: 'robAtt2',
            frames: this.anims.generateFrameNumbers('robAtt2', { start: 0, end: 1}),
            framRate: 5,
            duration: 400
        })
        this.anims.create({
            key: 'robAtt3',
            frames: this.anims.generateFrameNumbers('robAtt3', { start: 0, end: 1}),
            framRate: 5,
            duration: 400
        })
        this.anims.create({
            key: 'robShoot',
            frames: this.anims.generateFrameNumbers('robShoot', { start: 0, end: 1}),
            framRate: 10,
            // repeat: -1
            duration: 600
        })
        this.anims.create({
            key: 'robDead',
            frames: this.anims.generateFrameNumbers('robDead', { start: 0, end: 3}),
            framRate: 10,
            duration: 1000
        })
        this.anims.create({
            key: 'robEnabling',
            frames: this.anims.generateFrameNumbers('robEnabling', { start: 0, end: 4}),
            framRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'robHurt',
            frames: this.anims.generateFrameNumbers('robHurt', { start: 0, end: 2}),
            framRate: 10,
            duration: 100
        })
        this.anims.create({
            key: 'robIdle',
            frames: this.anims.generateFrameNumbers('robIdle', { start: 0, end: 4}),
            framRate: 10,
            repeat: -1,
        })
        this.anims.create({
            key: 'robWalk',
            frames: this.anims.generateFrameNumbers('robWalk', { start: 0, end: 7}),
            framRate: 10,
            repeat: -1,
            duration: 600
        })
        this.anims.create({
            key: 'robShutdown',
            frames: this.anims.generateFrameNumbers('robShutdown', { start: 0, end: 4}),
            framRate: 10,
        })
    }

    update(time, delta)
    {
        if (!this.complete && !this.player.dead) {
            this.player.update(this.cursors, this.slash, this.shoot, time, delta, this.sparks, this.meleeWeapons)

            this.foe.update(this.player, this.sparks, time, this.meleeWeapons)
        } else if (this.player.dead && !this.foe.win) {
            this.foe.victory()
        } else {
            if (this.spacebar.isDown && this.roll === null) {
                this.showRoll()
                this.player.savePlayer()
            }
        }
    }

    completeLevel() {
        // console.log('you win')
        const text = this.add.text(150, 300, 'YOU BEAT THE ROBOT', { fontSize: '48px', fill: 'white'})
        text.setOrigin(0,0)

        this.tempText = this.add.text(100, 400, 'PRESS SPACE TO ROLL YOUR REWARD', { fontSize: '36px', fill: 'white'})
        this.complete = true

        // console.log(this.spacebar)
    }

    showRoll() {
        let roll = Math.ceil(Math.random() * 9)
        // console.log(this.tempText)
        this.tempText = this.add.text(100, 400, `YOU ROLLED A ${this.roll} LASER`)
        this.player.cannon = roll
    }
}
