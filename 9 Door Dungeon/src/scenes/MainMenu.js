import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    preload()
    {
        this.load.audio('music', 'assets/audio/music/ES_Fight Club - Cushy.mp3')
        this.load.audio('slash1', 'assets/audio/effects/slash1.mp3')

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

    }
    
    create ()
    {
        this.add.image(400, 300, 'coverScreen');
        
        // const music = this.sound.add('music')
        // if (!this.music.isPlaying) {
            // music.play({
            // volume: 0.4
            // })
        // }

        // this.add.image(400, 300, 'logo');

        this.add.text(400, 430, 'Main Menu', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.input.once('pointerdown', () => {

            this.scene.start('RobotFight');

        });
    }
}
