import { Scene } from "phaser";
import { MC, createMC } from "./assets/mc";
import { SlashSprite } from "./assets/slashSprite";
import { foe } from "./assets/foe";
import { Spark } from "./assets/spark";
import { Samurai } from "./assets/samurai";

export class SamuraiFight extends Scene
{
  constructor()
  {
    super('SamuraiFight');
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
    this.load.image('samuraiStage', 'assets/stages/samuraiStage.jpg');
    this.load.image('woodFloor', 'assets/platforms/wood.png')

    this.load.spritesheet('samAtt1', 'assets/characterAssets/ninja/Attack_1.png',
      {
        frameWidth: 128,
        frameHeight: 128
      }
    )
    this.load.spritesheet('samAtt2', 'assets/characterAssets/ninja/Attack_2.png',
      {
        frameWidth: 128,
        frameHeight: 128
      })
    this.load.spritesheet('samAtt3', 'assets/characterAssets/ninja/Attack_3.png',
      {
        frameWidth: 128,
        frameHeight: 128
      })
    this.load.spritesheet('samDead', 'assets/characterAssets/ninja/Dead.png',
      {
        frameWidth: 128,
        frameHeight: 128
      })
    this.load.spritesheet('samHurt', 'assets/characterAssets/ninja/Hurt.png',
      {
        frameWidth: 128,
        frameHeight: 128
      })
    this.load.spritesheet('samIdle', 'assets/characterAssets/ninja/Idle.png',
      {
        frameWidth: 128,
        frameHeight: 128
      })
    this.load.spritesheet('samJump', 'assets/characterAssets/ninja/Jump.png',
      {
        frameWidth: 128,
        frameHeight: 128
      })
    this.load.spritesheet('samRun', 'assets/characterAssets/ninja/Run.png',
      {
        frameWidth: 128,
        frameHeight: 128
      })
    this.load.spritesheet('samShield', 'assets/characterAssets/ninja/Shield.png',
      {
        frameWidth: 128,
        frameHeight: 128
      })
    this.load.spritesheet('samWalk', 'assets/characterAssets/ninja/Walk.png',
      {
        frameWidth: 128,
        frameHeight: 128
      })
  }

  create()
  {
    this.add.image(400, 300, 'samuraiStage').setScale(0.75)

    let platforms = this.physics.add.staticGroup();

    for (let i = 0; i < 800; i+= 340){
      platforms.create(i, 575, 'woodFloor').setFlipY(true)
    }

    let playerConfig = localStorage.getItem('MCPlayerData') || {}
    // console.log(playerConfig)
    this.player = createMC(this, 100, 100, 'MC', playerConfig);

    this.physics.add.existing(this.player)
    this.player.setSize(30, 55)
    this.player.body.offset.x = 50;
    this.player.body.offset.y = 70;
    
    this.player.setCollideWorldBounds(true);
    this.player.body.setGravity(0, 300)
    // console.log(this.player)

    this.physics.add.collider(this.player, platforms);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.slash = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
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

    this.foe = new Samurai(this, 600, 400, 'samurai')
    this.foe.setScale(1.7)

    foe.foe = 'samurai';
    foe.weapon = 'katana';

    this.physics.add.existing(this.foe)
    this.foe.setSize(20, 60);
    this.foe.body.offset.x = 55;
    this.foe.body.offset.y = 65;
    this.foe.setCollideWorldBounds(true)
    this.foe.body.setGravity(0, 300)
    this.physics.add.collider(this.foe, platforms)

    this.anims.create({
      key: 'samIdle',
      frames: this.anims.generateFrameNumbers('samIdle', { start: 0, end: 5 }),
      frameRate: 10
    })
    this.anims.create({
      key: 'samAtt1',
      frames: this.anims.generateFrameNumbers('samAtt1', { start: 0, end: 5 }),
      frameRate: 10
    })
    this.anims.create({
      key: 'samAtt2',
      frames: this.anims.generateFrameNumbers('samAtt2', { start: 0, end: 3 }),
      frameRate: 10
    })
    this.anims.create({
      key: 'samAtt3',
      frames: this.anims.generateFrameNumbers('samAtt3', { start: 0, end: 2 }),
      frameRate: 10
    })
    this.anims.create({
      key: 'samDead',
      frames: this.anims.generateFrameNumbers('samDead', { start: 0, end: 2 }),
      frameRate: 10
    })
    this.anims.create({
      key: 'samHurt',
      frames: this.anims.generateFrameNumbers('samHurt', { start: 0, end: 1 }),
      frameRate: 10
    })
    this.anims.create({
      key: 'samJump',
      frames: this.anims.generateFrameNumbers('samJump', { start: 0, end: 11 }),
      frameRate: 10
    })
    this.anims.create({
      key: 'samRun',
      frames: this.anims.generateFrameNumbers('samRun', { start: 0, end: 7 }),
      frameRate: 10
    })
    this.anims.create({
      key: 'samShield',
      frames: this.anims.generateFrameNumbers('samShield', { start: 0, end: 1 }),
      frameRate: 10
    })
    this.anims.create({
      key: 'samWalk',
      frames: this.anims.generateFrameNumbers('samWalk', { start: 0, end: 7 }),
      frameRate: 10
    })

    this.events.emit('fightStart', 'Tsuki')
  }

  update(time, delta)
  {
    if (!this.complete && !this.player.dead) {
      this.player.update(this.cursors, this.slash, this.shoot, time, delta, this.sparks, this.meleeWeapons)

      this.foe.update(this.player, this.sparks, time)
    } else if (this.player.dead && !this.foe.win) {
      this.foe.victory()
    } else {
      if (this.spacebar.isDown && this.roll === null) {
          this.showRoll()
          this.player.savePlayer()
      }
  }
  }

  completeLevel()
  {

  }

  showRoll()
  {

  }
}