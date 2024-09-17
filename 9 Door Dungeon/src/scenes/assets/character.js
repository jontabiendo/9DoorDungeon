import { HitBox } from "./hitBox";

export class Character extends Phaser.Physics.Arcade.Sprite
{
  constructor(scene, x, y, key, config)
  {
    super(scene, x, y, key);
    this.hp = 1000;
    this.maxHP = 1000;
    this.dmgRed = 1;
    this.dmgAmp = 1;
    this.moveSpeed;
    this.facing = 'right';
    this.dead = false;
    this.projectile;
    this.meleeAtt;
    this.lastAttack = 1;
    this.lastFired = 0;

    //animations
    this.idleAnim;
    this.walkAnim;
    this.runAnim;
    this.jumpAnim;
    this.att1Anim;
    this.att2Anim;
    this.att3Anim;
    this.shootAnim;
    this.getHitAnim;
    this.dieAnim;

    //eventKeys
    this.charHit;
    // this.charDie;

    //soundfx
    this.meleeSound1
  };

  idle() 
  {
    this.anims.play(this.idleAnim, true)
  }

  //movementMethods

  moveRight()
  {
    this.flipX = false;
    this.body.setVelocityX(this.moveSpeed)
    this.facing = 'right'
  }

  moveLeft()
  {
    this.flipX = true;
    this.body.setVelocityX(this.moveSpeed)
    this.facing = 'left'
  }

  // jump()
  // {

  // }

  // fastFall()
  // {

  // }

  //action methods
  getHit(damage)
  {
    this.hp -= damage * this.armor;
    this.anims.play(this.getHitAnim, true);

    // event updates UI health bar
    this.scene.events.emit(this.charHit, this.hp / this.maxHP);
  }

  die()
  {
    this.anims.play(this.dieAnim, true).once('animationcomplete', () => {
      this.dead = true;
      this.scene.events.emit('removeUI')
      
      if (this.key === 'player') {
        setTimeout(() => this.scene.scene.start('GameOver'), 3000);
      } else {
        this.scene.scene.start('LevelComplete');
      }
    })
  }
}