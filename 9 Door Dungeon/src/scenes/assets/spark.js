export class Spark extends Phaser.Physics.Arcade.Sprite {

  constructor(scene, x, y, texture) {
    super(scene, x, y, texture)

    this.speed = 700
    this.lifespan = 1000
    this.setScale(1)
  }
  shoot (x, y, facing)
  {
    this.lifespan = 1000;

    this.setActive(true);
    this.setVisible(true);
    this.setPosition(x - 15, y + 30);

    this.body.velocity.x = facing === 'left'? -1000: 1000;
    this.body.velocity.y = 0;
  }

  update ()
  {
    this.lifespan -= devicePixelRatio;

    if (this.lifespan <= 0)
    {
      this.setActive(false);
      this.setVisible(false);
      this.body.stop();
    }
  }

  onWorldBounds () 
  {
    this.disableBody(true, true)
  }
};

