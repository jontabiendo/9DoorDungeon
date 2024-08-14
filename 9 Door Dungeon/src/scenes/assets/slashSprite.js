export class SlashSprite extends Phaser.Physics.Arcade.Sprite
{
  constructor (scene, x, y, key) {
    super (scene, x + 60, y + 25, key)
    this.setScale(0.2)
  }

  animate(facing, slash, x, y, slashBox) {
    this.scene.add.existing(this);

    // this.setSize(50, 50)
    // console.log(this)

    this.on('animationupdate', (anim, frame, sprite, frameKey) => {
      // console.log(frame.index)
      if (frame.index === 1) {
        this.scene.physics.world.disable(slashBox)
        slashBox = facing === 'left' ? x -100: x
        slashBox = y
        slashBox.body.allowGravity = false
      }
      if (frame.index === 2) {
        slashBox.colliderActive = true
        this.scene.physics.world.enable(slashBox)
        // console.log(this.scene.physics.world)
        slashBox.x = facing === 'left' ? x -30: x + 50
        slashBox.y = y + 50
        slashBox.body.height = 60
        slashBox.body.width = 60
      }
      if (frame.index > 2 && frame.index < 10) {
        // this.scene.physics.world.enable(slashBox)
        // console.log(this.scene.physics.world)
        slashBox.x = facing === 'left' ? x -30: x + 50
        slashBox.y = y + 50
        slashBox.body.height = 60
        slashBox.body.width = 60
        // console.log(slashBox)
      }
    })

    if (facing === 'left') {
      this.setFlipX(true)
      this.x -= 100
    } else {
      this.setFlipX(false)  
    } 

    if (slash === 1) {
      this.setRotation(-45)
      this.setFlipY(true)
      this.setScale(0.15)
      this.y += 20
      this.anims.playAfterDelay('mcSlash2', 250).once('animationcomplete', () => {
        this.setActive(false);
        this.setVisible(false);
        this.scene.physics.world.disable(slashBox)

      })
    } else if (slash === 2) {
      this.setRotation(90)
      this.setScale(0.15)
      this.y += 20
      this.anims.play('mcSlash2', true).once('animationcomplete', () => {
        this.setActive(false);
        this.setVisible(false);
        this.scene.physics.world.disable(slashBox)

      })
    } else if (slash === 3) {
      this.anims.play('mcSlash3', true).once('animationcomplete', () => {
        this.setActive(false);
        this.setVisible(false);
        this.scene.physics.world.disable(slashBox)

      })
    }
  }

  onComplete() {
    this.disableBody(true, true)
  }
}