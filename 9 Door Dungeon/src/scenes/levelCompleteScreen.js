import { Scene } from "phaser";
import { foe } from "./assets/foe";

export class LevelComplete extends Scene
{
  constructor () {
    super('LevelComplete');
    this.foe = foe.getFoe().foe;
    this.weapon = foe.getFoe().weapon;
    this.roll = null
    this.locked = false
  }

  preload()
  {

  }

  create() 
  {
    this.events.emit('removeUI')
    this.cameras.main.setBackgroundColor(0x000000);
    const text = this.add.text(150, 300, `YOU BEAT THE ${(foe.getFoe().foe).toUpperCase()}`, { fontSize: '48px', fill: 'white'})
    text.setOrigin(0,0)

    this.tempText = this.add.text(100, 400, 'PRESS SPACE TO ROLL YOUR REWARD', { fontSize: '36px', fill: 'white'})

    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    
  }

  update()
  {
    if (this.spacebar.isDown && !this.roll) {
      this.rollReward()
    }
    if (this.spacebar.isDown && !this.locked) {
      this.nextScene()
    }
  }

  rollReward() {
    this.locked = true
    this.tempText.destroy()
    this.roll = Math.ceil(Math.random() * 9)
    this.tempText = this.add.text(180, 400, `YOU ROLLED A ${this.roll} ${(foe.getFoe().weapon).toUpperCase()}`, { fontSize: '36px', fill: 'white' })
    // this.player.cannon = roll
    this.savePlayer()
  }

  savePlayer() {
    let config;
    let prevData = JSON.parse(localStorage.getItem('9DDPlayerData'))
    if (prevData) {
      config = prevData
    } else {
      config = {
        maxHP: 1000,
        dmgMod: 1,
        attackMod: 1,
        cannon: null,
        attackSpeedMod: null,
        dmgOutputMod: null,
        claws: null,
        cannon: null,
        armor: null,
        freeze: null,
        hammer: null,
        sword: null,
        boots: null,
        wings: null,
        crit: null
      };
    } 

    config[foe.getFoe().weapon] = this.roll


    localStorage.setItem('9DDPlayerData', JSON.stringify(config))

    setTimeout(() => this.locked = false, 2000)
  }

  nextScene()
  {
    this.scene.start('SamuraiFight')
  }
}