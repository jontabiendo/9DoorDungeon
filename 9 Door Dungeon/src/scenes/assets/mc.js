import { SlashSprite } from "./slashSprite";
import { HitBox } from "./hitBox";

export class MC extends Phaser.Physics.Arcade.Sprite
{
  constructor (scene, x, y, key, config)
  {
    super(scene, x, y, key)
    scene.add.existing(this);
    this.hp = 1000;
    this.maxHP = 1000
    this.dmgMod = 1
    this.attackMod = 1
    this.cannon = config.cannon
    this.claws = config.claws
    this.armor = config.armor
    this.freeze = config. freeze
    this.hammer = config.hammer
    this.sword = config.sword
    this.boots = config.boots 
    this.crit = config.crit
    this.wings = config. wings

    this.facing = 'right';
    this.lastAttack = 3;
    this.lastFired = 0;
    this.charging = false
    this.slashBox = new HitBox(this.scene, this.x, this.y, 100, 100)
    this.attackLocked = false
    this.dead = false

    this.slashSound1 = this.scene.sound.add('slash1')
  }
  
  savePlayer() {
    let config = {
      maxHP: this.maxHP,
      dmgMod: this.dmgMod,
      cannon: this.cannon,
      attackSpeedMod: this.attackSpeedMod,
      dmgOutputMod: this.dmgOutputMod,
      claws: this.claws,
      cannon: this.cannon,
      armor: this.armor,
      freeze: this.freeze,
      hammer: this.hammer,
      sword: this.sword,
      boots: this.boots,
      wings: this.wings,
      crit: this.crit
    };

    localStorage.setItem('9DDPlayerData', JSON.stringify(config))
  }

  idle() {
    this.anims.play('idle', true);
  }

  moveRight() {
    this.flipX = false;
    this.body.setVelocityX(400)
    this.facing = 'right'
  }

  moveLeft() {
    this.flipX = true;
    this.body.setVelocityX(-400)
    this.facing = 'left'
  }

  attack() {
    this.attackLocked = true
    let slash1 = new SlashSprite(this.scene, this.x, this.y, 'mcSlash1')
    let slash2 = new SlashSprite(this.scene, this.x, this.y, 'mcSlash2')
    // console.log(this.slashBox)
    // this.slashBox.colliderActive = false
    console.log(this.slashSound1)

    if (this.lastAttack === 1) {
      slash2.animate(this.facing, 2, this.x, this.y, this.slashBox, this.slashSound1)
      this.slashSound1.play()
      this.anims.play('attack2', true).once('animationcomplete', () => {
        this.lastAttack = 2
        this.attackLocked = false

        // slash.disableBody(true, true)

      })
    } else if (this.lastAttack === 2) {
      slash2.animate(this.facing, 3, this.x, this.y, this.slashBox)
      this.slashSound1.play()
      this.anims.play('attack3', true).once('animationcomplete', () => {
        this.lastAttack = 3
        this.attackLocked = false

        // slash.disableBody(true, true)

      })
    } else {
      slash1.animate(this.facing, 1, this.x, this.y, this.slashBox)
      this.slashSound1.play()
      this.anims.play('attack1', true).once('animationcomplete', () => {
        this.lastAttack = 1
        this.attackLocked = false
        // slash.disableBody(true, true)

      })
    }

  }

  shoot(sparks, time) {
    // let start = Date.now()
    this.attackLocked = true

      this.anims.play('shoot', true).once('animationcomplete', () => {
        this.lastAttack = 4;
        
        let x, y;
        if (this.facing === 'left') {
          x = this.body.x
          y = this.body.y
        } else {
          x = this.body.x
          y = this.body.y
        };
        
        const spark = sparks.get();
        // console.log(spark)
        
        if (spark)
          {
            spark.shoot(x, y, this.facing);
            
            this.lastFired = time + 150;
          }
        })
        this.attackLocked = false

      // console.log("time:", Date.now() - start)
  }

  getHit(damage){
    console.log(this.hp)
    if (this.hp > 0){
      this.anims.play('hurt')
      this.hp -= damage * this.dmgMod;
    }

    this.scene.events.emit('playerHit', this.hp / this.maxHP)
    // console.log('IM HIT', this.hp)
  }

  die() {
    this.anims.play('mcDie', true).once('animationcomplete', () => {
      this.dead = true;
      this.scene.events.emit('fightEnd')

      setTimeout(() => this.scene.scene.start('GameOver'), 3000)
    })
  }

  movement(cursors) {
    if (cursors.left.isDown) {
        this.moveLeft();
        this.facing = 'left'
    } else if (cursors.right.isDown){
        this.moveRight();
        this.facing = 'right'
    } else {
        this.body.setVelocityX(0);
    }

    if (cursors.up.isDown && this.body.touching.down){
      this.body.setVelocityY(-330);
    }

    if (cursors.down.isDown) {
      this.body.setVelocityY(500)
    }
  }

  animate(cursors, slash, shoot, time, delta, sparks) {
    if (slash._justDown) {
        this.attack()
    } else if (shoot.isDown && time > this.lastFired && !this.charging) {
      this.shoot(sparks, time)
    }else if (!this.body.touching.down) {
        this.anims.play('falling', true)
    } else if (cursors.left.isDown || cursors.right.isDown) {
        this.anims.play('run', true)
    } else {
        this.anims.play('idle', true)
    }
}  
  
  update(cursors, slash, shoot, time, delta, sparks) {
    if (this.facing === 'left') {
      this.setFlipX(true)
    } else {
      this.setFlipX(false)
    }

    if (this.hp <= 0 && !this.dead) {
      console.log('MC IS DYING')
      this.die()
    }

    if (this.hp > 0) {
      this.movement(cursors)
      if (!this.attackLocked) {
      this.animate(cursors, slash, shoot, time, delta, sparks)
      }
    }
  }

}

export function createMC(scene, x, y, key, config)
{
  let playerConfig = {
    cannon : config.cannon || null,
    claws : config.claws || null,
    armor : config.armor || null,
    freeze : config. freeze || null,
    hammer : config.hammer || null,
    sword : config.sword || null,
    boots : config.boots || null,
    crit : config.crit || null,
    wings : config. wings || null
  }
  let player = new MC(scene, x, y, key, playerConfig);

  return player
}