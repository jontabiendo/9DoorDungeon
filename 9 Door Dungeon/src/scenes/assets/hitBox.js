export class HitBox extends Phaser.GameObjects.Zone
{
  constructor(scene, x, y, width, height)
  {
    super(scene, x, y, width, height);
    this.setOrigin(0, 0)
  }

  animate(frame, facing, x, y) {
    // console.log(this)
    // this.body.setVelocity(0, 0)
    if (frame.index === 1) {
      this.scene.physics.world.disable(this)
      // slashBox = facing === 'left' ? x -100: x
      // slashBox = y
      // slashBox.body.allowGravity = false
    }
    if (frame.index === 2) {
      this.colliderActive = true
      this.scene.physics.world.enable(this)
      // console.log(this.scene.physics.world)
      // this.x = facing === 'left' ? x -30: x + 50
      this.x = facing === 'left' ? x - 60 : x + 20
      this.y = y 
      this.body.height = 60
      this.body.width = 60
    }
    if (frame.index > 2 && frame.index < 10) {
      // this.scene.physics.world.enable(slashBox)
      // console.log(this.scene.physics.world)
      // this.x = facing === 'left' ? x -30: x + 50
      this.x = facing === 'left' ? x - 60 : x
      this.y = y
      this.body.height = 60
      this.body.width = 60
      // console.log(slashBox)
    }
  
  }
}