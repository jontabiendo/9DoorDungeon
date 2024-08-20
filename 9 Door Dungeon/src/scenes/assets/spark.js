export class Spark extends Phaser.Physics.Arcade.Sprite {

  constructor(scene, x, y, texture, damage) {
    super(scene, x, y, texture)

    this.speed = 700
    this.lifespan = 500
    this.setScale(1)
    this.damage =  damage
  }

  shoot (x, y, facing)
  {
    this.lifespan = 500;

    this.setActive(true);
    this.setVisible(true);
    this.setPosition(x - 15, y + 30);
    this.setSize(10, 10)
    this.body.offset.x = 30
    this.body.offset.y = 30

    this.body.velocity.x = facing === 'left'? -1000: 1000;
    this.body.velocity.y = 0;

  }

  update (delta)
  {
    this.lifespan -= 10;
    this.anims.play('spark', true)

    if (this.lifespan <= 0)
    {
      this.setActive(false);
      this.setVisible(false);
    }
  }

  onWorldBounds () 
  {
    this.disableBody(true, true)
  }
};

