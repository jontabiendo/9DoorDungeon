export class SlashSprite extends Phaser.Physics.Arcade.Sprite
{
  constructor (scene, x, y, key) {
    super (scene, x + 60, y + 25, key)
    this.setScale(0.2)
  }

  animate(facing) {
    this.scene.add.existing(this);

    // this.setSize(50, 50)
    console.log(this)

    if (facing === 'left') {
      this.setFlipX(true)
      this.x -= 100
    } else {
      this.setFlipX(false)  
    } 

    this.anims.playAfterDelay('mcSlash', true, 100).once('animationcomplete', () => {
      this.setActive(false);
      this.setVisible(false);
    })    
  }

  onComplete() {
    this.disableBody(true, true)
  }
}