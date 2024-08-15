import { foe } from "./foe";
import { HitBox } from "./hitBox";

export class Samurai extends Phaser.Physics.Arcade.Sprite
{
  constructor (scene, x, y, key)
  {
    super(scene, x, y, key);
    scene.add.existing(this);
    this.facing = 'left';
    this.lastAttack;
    this.hp = 1000;
    this.dmgMod = 1;
    this.isFrenzy = false;
    this.projectileCD = 0;
    this.isLocked = false;
    this.swordBox = new HitBox(this.scene, this.x, this.y, 100, 100);
    this.dead = false;
    this.win = false;
  }

  idle()
  {
    this.anims.play('samIdle', true)
  }

  moveRight() {
    this.flipX = false
    // this.body.setVelocityX(200)
    this.anims.play('samRun', true)
    this.facing = 'right'
  }

  moveLeft()
  {
    this.flipX = true;
    // this.body.setVelocityX(-200)
    this.anims.play('samRun', true)
    this.facing = 'left'
  }

  attack()
  {

  }

  shoot()
  {

  }

  getHit()
  {

  }

  takeDamage()
  {

  }

  die()
  {

  }

  victory()
  {

  }

  animate(command)
  {
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

  chooseCommand(player, sparks, time, weapon)
  {
    let bigX = Math.max(this.x, player.x);
    let smallX = Math.min(this.x, player.x)

    if (bigX - smallX < 60) {
      this.isLocked = true
      this.setVelocityX(0)
      this.attack(weapon);
    // } else if (bigX - smallX > 100 && this.projectileCD <= 0) {
    //   this.isLocked = true
    //   this.setVelocityX(0)
    //   this.shoot(sparks, time);
    } else if (player.x < this.x) {
      this.moveLeft();
    } else if (player.body.x > this.body.x) {
      this.moveRight();
    }
  }

  update(player, sparks, time, weapon)
  {
    if (this.facing === 'left') {
      this.setFlipX(true)
    } else {
      this.setFlipX(false)
    }
    this.idle()
    // if (this.hp <= 0 && !this.dead) {
    //   this.die()
    // }

    // // if (this.projectileCD > 0) {
    // //   this.projectileCD -= 1
    // // }

    // if (!this.isLocked && this.hp > 0 && !this.win) {
    //   this.chooseCommand(player, sparks, time, weapon)
    //   this.idle()
    // }

  }
}