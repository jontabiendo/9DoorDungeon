import { SlashSprite } from "./slashSprite";

export class MC extends Phaser.Physics.Arcade.Sprite
{
  constructor (scene, x, y, key)
  {
    super(scene, x, y, key)
    scene.add.existing(this);
    this.facing = 'right';
    this.lastAttack = 3;
    this.lastFired = 0;
    this.hp = 1000;
    this.dmgMod = 1
    this.cannon = 0
    this.charging = false
    this.slashBox = this.scene.add.zone(this.x, this.y, 100, 100)
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

  jump() {
    this.body.setVelocityY(-330);
  }

  attack() {
    let slash1 = new SlashSprite(this.scene, this.x, this.y, 'mcSlash1')
    let slash2 = new SlashSprite(this.scene, this.x, this.y, 'mcSlash2')
    // console.log(this.slashBox)
    this.slashBox.colliderActive = false

    if (this.lastAttack === 1) {
      slash2.animate(this.facing, 2, this.x, this.y, this.slashBox)
      this.anims.play('attack2', true).once('animationcomplete', () => {
        this.lastAttack = 2
        // slash.disableBody(true, true)

      })
    } else if (this.lastAttack === 2) {
      slash2.animate(this.facing, 3, this.x, this.y, this.slashBox)
      this.anims.play('attack3', true).once('animationcomplete', () => {
        this.lastAttack = 3
        // slash.disableBody(true, true)

      })
    } else {
      slash1.animate(this.facing, 1, this.x, this.y, this.slashBox)
      this.anims.play('attack1', true).once('animationcomplete', () => {
        this.lastAttack = 1
        // slash.disableBody(true, true)

      })
    }

  }

  fastFall() {
    this.body.setVelocityY(500)
  }

  shoot(sparks, time) {
    // let start = Date.now()

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
      // console.log("time:", Date.now() - start)
  }

  getHit(damage){
    this.anims.play('hurt')
    this.hp -= damage * this.dmgMod;
    // console.log('IM HIT', this.hp)
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
        this.jump();
    }

    if (cursors.down.isDown) {
      this.fastFall();
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
    this.movement(cursors)
    this.animate(cursors, slash, shoot, time, delta, sparks)
  }
}