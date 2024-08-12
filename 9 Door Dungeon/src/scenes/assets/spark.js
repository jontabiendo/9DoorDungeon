export class Spark extends Phaser.Physics.Arcade.Sprite {

  constructor(scene, x, y, texture) {
    super(scene, x, y, texture)

    this.speed = 700
    this.lifespan = 1000
    // scene.sys.updateList.add(this);
    // scene.sys.displayList.add(this);
    // scene.physics.world.enableBody(this)
    this.setScale(1)
    // this.setSize(10, 10)
  }
  shoot (char)
  {
    this.lifespan = 1000;

    let start = char.getRightCenter();

    this.setActive(true);
    this.setVisible(true);
    this.setPosition(start.x - 15, start.y + 30);

    this.body.velocity.x = 700;
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

