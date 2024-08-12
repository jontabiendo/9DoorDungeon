export class MC extends Phaser.Physics.Arcade.Sprite
{
  constructor (scene, x, y, key)
  {
    super(scene, x, y, key)
    scene.add.existing(this);
    // this.setSize(30, 55);
    // this.body.offset.x = 50;
    // this.body.offset.y = 70;
    this.facing = 'right';
    this.lastAttack = 4;
    this.lastFired = 0;
    this.hp = 1000;
  }

  idle() {
    this.anims.play('idle', true);
  }

  moveRight() {
    this.flipX = false;
    this.body.setVelocityX(400)
    // this.anims.play('run', true)
    this.facing = 'right'
  }

  moveLeft() {
    this.flipX = true;
    this.body.setVelocityX(-400)
    // this.anims.play('run', true)
    this.facing = 'left'
  }

  jump() {
    this.body.setVelocityY(-330);
  }

  attack() {
    if (this.lastAttack === 1) {
      this.anims.play('attack2', true).once('animationcomplete', () => {
        this.lastAttack = 2
      })
    } else if (this.lastAttack === 2) {
      this.anims.play('attack3', true).once('animationcomplete', () => {
        this.lastAttack = 3
      })
    } else {
      this.anims.play('attack1', true).once('animationcomplete', () => {
        this.lastAttack = 1
      })
    }
  }

  fastFall() {
    this.body.setVelocityY(500)
  }

  shoot(sparks, time) {
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

      if (spark)
      {
        spark.shoot(x, y, this.facing);

        this.lastFired = time + 100;
      }
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
        this.jump();
    }

    if (cursors.down.isDown) {
      this.fastFall();
    }
  }

  animate(cursors, slash, shoot, time, delta, sparks) {
    if (slash.isDown) {
        this.attack()
    } else if (shoot.isDown && time > this.lastFired) {
      this.shoot(sparks, time)
        // this.player.anims.play('shoot', true).once('animationcomplete', () => {
        //     this.lastAttack = 4
        //     // let start;
        //     // if (this.facing === 'right') {
        //     //     start = this.player.getRightCenter()
        //     // } else {
        //     //     start = this.player.getLeftCenter()
        //     // }
        //     // let newSpark = new Spark()
        //     // this.sparks.add(new Spark())

        //     const spark = this.sparks.get();

        //     if (spark)
        //     {
        //         spark.shoot(this.player);

        //         this.lastFired = time + 100;
        //     }
        // })
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