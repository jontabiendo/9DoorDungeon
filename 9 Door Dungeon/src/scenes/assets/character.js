export class Character extends Phaser.Physics.Arcade.Sprite
{
  constructor(scene, x, y, key)
  {
    super(scene, x, y, key);
    this.hp = 1000;
    this.maxHP = 1000;
    this.armor = 1;
    this.dmgAmp = 1;
    this.moveSpeed;
    this.facing = 'right';
    this.dead = false;
    this.projectile;
    this.lastAttack;
    this.lastFired;
    this.attackSound;
    this.projectileSound;
    this.soundFX;

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

  // attack()
  // {
  //   this.attackLocked = true
  // }

  // shoot()
  // {

  // }

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