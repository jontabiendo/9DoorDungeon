import { SlashSprite } from "./slashSprite";
import { HitBox } from "./hitBox";
import { Character } from "./character";

export class Player extends Character
{
  constructor (scene, x, y, key, playerConfig, CharConfig)
  {
    super(scene, x, y, key, CharConfig)
    this.attackLocked = false
    // gear
    this.cannon = playerConfig.cannon;
    this.claws = playerConfig.claws;
    this.armor = playerConfig.armor;
    this.freeze = playerConfig. freeze
    this.hammer = playerConfig.hammer
    this.sword = playerConfig.sword
    this.boots = playerConfig.boots 
    this.crit = playerConfig.crit
    this.wings = playerConfig. wings  
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

  attack() {
    this.attackLocked = true
    let slash1 = new SlashSprite(this.scene, this.x, this.y, 'mcSlash1')
    let slash2 = new SlashSprite(this.scene, this.x, this.y, 'mcSlash2')

    if (this.lastAttack === 1) {
      slash2.animate(this.facing, 2, this.x, this.y, this.slashBox, this.slashSound1)
      this.meleeSound1.play()
      this.anims.play('attack2', true).once('animationcomplete', () => {
        this.lastAttack = 2
        this.attackLocked = false

      })
    } else if (this.lastAttack === 2) {
      slash2.animate(this.facing, 3, this.x, this.y, this.slashBox)
      this.meleeSound1.play()
      this.anims.play('attack3', true).once('animationcomplete', () => {
        this.lastAttack = 3
        this.attackLocked = false

        // slash.disableBody(true, true)

      })
    } else {
      slash1.animate(this.facing, 1, this.x, this.y, this.slashBox)
      this.meleeSound1.play()
      this.anims.play('attack1', true).once('animationcomplete', () => {
        this.lastAttack = 1
        this.attackLocked = false
        // slash.disableBody(true, true)

      })
    }
  }

  shoot(sparks, time) {
    this.attackLocked = true

    this.anims.play('shoot', true).once('animationcomplete', () => {
      this.lastAttack = 4;
        
      let x = this.body.x;
      let y = this.body.y;
        
      const spark = sparks.get();
        
      if (spark)
      {
        spark.shoot(x, y, this.facing);
            
        this.lastFired = time + 150;
      }
    })
    this.attackLocked = false
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
    } else if (!this.body.touching.down) {
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

export function createPlayer(scene, x, y, key, config)
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

  let charConfig = {
    idleAnim: 'idle',
    walkAnim: 'walk',
    runAnim: 'run',
    jumpAnim: 'jump',
    att1Anim: 'attack1',
    att2Anim: 'attack2',
    att3Anim: 'attack3',
    shootAnim: 'shoot',
    getHitAnim: 'hurt',
    dieAnim: 'mcDie'
  }

  let player = new Player(scene, x, y, key, playerConfig, charConfig);

  return player
}