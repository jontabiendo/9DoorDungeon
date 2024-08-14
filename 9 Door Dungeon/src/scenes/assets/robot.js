import { foe } from "./foe";
import { HitBox } from "./hitBox";

export class Robot extends Phaser.Physics.Arcade.Sprite
{
  constructor (scene, x, y, key)
  {
    super(scene, x, y, key);
    scene.add.existing(this);
    this.facing = 'left';
    this.lastAttack;
    this.hp = 1000; 
    this.dmgMod = 1
    this.isFrenzy = false;
    this.gunCD = 0;
    this.isLocked = false;
    this.swordBox = new HitBox(this.scene, this.x, this.y, 100, 100);
    this.dead = false
    this.win = false
  }

  idle() {
    this.anims.play('robIdle', true)
  }

  moveRight() {
    this.flipX = false
    this.body.setVelocityX(100)
    this.anims.play('robWalk', true)
    this.facing = 'right'
  }

  moveLeft() {
    this.flipX = true;
    this.body.setVelocityX(-100)
    this.anims.play('robWalk', true)
    this.facing = 'left'
  }

  attack() {
    // let { x, y } = this.facing === 'left' ? this.getLeftCenter() : this.getRightCenter()

    this.on('animationupdate', (anim, frame, sprite, frameKey) => {
      this.swordBox.animate(frame, this.facing, this.x, this.y)
    })

    if (this.lastAttack === 1) {
      this.anims.play('robAtt2', true).once('animationcomplete', () => {
        this.lastAttack = 2
        this.isLocked = false
        // sword.slash(x - 100, y, this.facing)
        this.scene.physics.world.disable(this.swordBox)
      })
    } else if (this.lastAttack === 2) {
      this.anims.play('robAtt3', true).once('animationcomplete', () => {
        this.lastAttack = 3
        this.isLocked = false
        this.scene.physics.world.disable(this.swordBox)
        // sword.slash(x, y, this.facing)
      })
    } else {
      this.anims.play('robAtt1', true).once('animationcomplete', () => {
        this.lastAttack = 1
        this.isLocked = false
        this.scene.physics.world.disable(this.swordBox)
        // sword.slash(x, y, this.facing)
      })
    }
    // console.log(sword)
  }

  shoot(sparks, time) {
    this.gunCD = 200
    this.anims.play('robShoot', true).once('animationcomplete', () => {
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

      if (spark)
      {
        spark.shoot(x, y, this.facing);

        this.lastFired = time + 100;
      }

      this.isLocked = false
    })
  }

  getHit(damage) {
    this.hp -= damage * this.dmgMod;
    this.anims.play('robHurt', true).once('animationcomplete', () => {
      // this.update()
    })
  }

  takeDamage(damage) {
    this.hp -= damage * this.dmgMod;
    console.log(this.hp)
  }

  die() {
    this.anims.play('robDead', true).once('animationcomplete', () => {
      this.dead = true,
      this.justBeat = {
        foe: 'robot',
        weapon: 'cannon'
      }
      this.scene.scene.start('LevelComplete')
    })
  }

  victory() {
    console.log('ROB WINS')
    this.win = true
    this.anims.play('robShutdown', true)
  }

  animate(command) {
    switch (command) {
      case 'attack':
        this.attack();
      case 'shoot':
        this.shoot();
      case 'left':
        this.moveLeft();
      case 'right':
        this.moveRight();
      default:
        this.idle();
    }
  }

  chooseCommand(player, sparks, time, meleeWeapon) {
    let bigX = Math.max(this.x, player.x)
    let smallX = Math.min(this.x, player.x)
    if (bigX - smallX < 60) {
      this.isLocked = true
      this.setVelocityX(0)
      this.attack(meleeWeapon);
    } else if (bigX - smallX > 100 && this.gunCD <= 0) {
      this.isLocked = true
      this.setVelocityX(0)
      this.shoot(sparks, time);
    } else if (player.x < this.x) {
      this.moveLeft();
    } else if (player.body.x > this.body.x) {
      this.moveRight();
    }
  }

  update(player, sparks, time, meleeWeapon) {
    if (this.facing === 'left') {
      this.setFlipX(true)
    } else {
      this.setFlipX(false)
    }
    if (this.hp <= 0 && !this.dead) {
      this.die()
    }

    if (this.gunCD > 0) {
      this.gunCD -= 1
    }

    if (!this.isLocked && this.hp > 0 && !this.win) {
      this.chooseCommand(player, sparks, time, meleeWeapon)
      // this.idle()
    }


  }
}