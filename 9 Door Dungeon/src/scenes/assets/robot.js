export class Robot extends Phaser.Physics.Arcade.Sprite
{
  constructor (scene, x, y, key)
  {
    super(scene, x, y, key);
    scene.add.existing(this);
    this.facing = 'left';
    this.lastAttack;
    this.hp = 1000;
    this.isFrenzy = false;
    this.gunCD = 0;
    this.isLocked = false;
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
    // console.log(this.lastAttack)
    if (this.lastAttack === 1) {
      this.anims.play('robAtt2', true).once('animationcomplete', () => {
        this.lastAttack = 2
        this.isLocked = false

      })
    } else if (this.lastAttack === 2) {
      this.anims.play('robAtt3', true).once('animationcomplete', () => {
        this.lastAttack = 3
        this.isLocked = false

      })
    } else {
      this.anims.play('robAtt1', true).once('animationcomplete', () => {
        this.lastAttack = 1
        this.isLocked = false
      })
    }
  }

  shoot() {
    this.gunCD = 200
    this.anims.play('robShoot', true).once('animationcomplete', () => {
      this.lastAttack = 4;

      // let x, y;
      // if (this.facing === 'left') {
      //   x = this.body.x
      //   y = this.body.y
      // } else {
      //   x = this.body.x
      //   y = this.body.y
      // };

      // const spark = sparks.get();

      // if (spark)
      // {
      //   spark.shoot(x, y, this.facing);

      //   this.lastFired = time + 100;
      // }

      this.isLocked = false
    })
  }

  animate(command) {
    console.log(command, this.gunCD)
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

  chooseCommand(player) {
    let bigX = Math.max(this.x, player.x)
    let smallX = Math.min(this.x, player.x)
    if (bigX - smallX < 60) {
      console.log('attack', this.gunCD)
      this.isLocked = true
      this.setVelocityX(0)
      this.attack();
    } else if (bigX - smallX > 100 && this.gunCD <= 0) {
      console.log('shoot', this.gunCD)
      this.isLocked = true
      this.setVelocityX(0)

      this.shoot();
    } else if (player.x < this.x) {
      console.log('left', this.gunCD)

      this.moveLeft();
    } else if (player.body.x > this.body.x) {
      console.log('right', this.gunCD)

      this.moveRight();
    }
  }

  update(player, delta) {
    if (this.facing === 'left') {
      this.setFlipX(true)
    } else {
      this.setFlipX(false)
    }

    if (this.gunCD > 0) {
      this.gunCD -= 1
    }

    if (!this.isLocked) {
      this.chooseCommand(player)
    }

  }
}