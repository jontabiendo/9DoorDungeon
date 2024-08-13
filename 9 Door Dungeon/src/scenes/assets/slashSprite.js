export class SlashSprite extends Phaser.Physics.Arcade.Sprite
{
  constructor (scene, x, y, key) {
    super (scene, x + 60, y + 25, key)
    this.setScale(0.2)
  }

  animate(facing, slash) {
    this.scene.add.existing(this);

    // this.setSize(50, 50)
    console.log(this)

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
      })
    } else if (slash === 2) {
      this.setRotation(90)
      this.setScale(0.15)
      this.y += 20
      this.anims.play('mcSlash2', true).once('animationcomplete', () => {
        this.setActive(false);
        this.setVisible(false);
      })
    } else if (slash === 3) {
      this.anims.play('mcSlash3', true).once('animationcomplete', () => {
        this.setActive(false);
        this.setVisible(false);
      })
    }
  }

  onComplete() {
    this.disableBody(true, true)
  }
}