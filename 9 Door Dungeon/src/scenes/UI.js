import { Scene } from "phaser";
import { foe } from "./assets/foe";


export class UI extends Scene{
  constructor()
  {
    super({key: 'UI', active: true})

    this.playerHP;
    this.foeHP;
    this.foeName;
    this.sceneKey;
    this.enemyBar;
    this.enemyBarOuter
    this.playerBar;
    this.playerBarOuter
    this.foeHeader
    this.playerName
  }

  create()
  {
    const currentScene = this.scene.get('RobotFight')
    // let foeHeader
    
    currentScene.events.on('fightStart', (name) => {
      this.foeName = name;
      this.foeHeader = this.add.text(400, 100, `${this.foeName}`, {
        fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
        stroke: '#000000', strokeThickness: 8, align: 'center'
      }).setOrigin(0.5)

      this.playerName = this.add.text(400, 520, `PLAYER`, {
        fontFamily: 'Arial Black', fontSize: 24, color: '#ffffff',
        stroke: '#000000', strokeThickness: 8, align: 'center'
      }).setOrigin(0.5)
      
      this.enemyBarOuter = this.add.rectangle(400, 50, 600, 32).setStrokeStyle(1, 0xffffff);
  
      this.enemyBar = this.add.rectangle(400, 50, 600, 28, 0xffffff);  
  
      this.playerBarOuter = this.add.rectangle(400, 550, 600, 32).setStrokeStyle(1, 0xffffff)
  
      this.playerBar = this.add.rectangle(400, 550, 600, 28, 0xffffff)
    })

    currentScene.events.on('foeHit', (hpPercent) => {
      this.playerHP = hpPercent;

      this.enemyBar.width = 600 * (hpPercent > 0? hpPercent : 0)
    })

    currentScene.events.on('playerHit', (hpPercent) => {
      this.playerHP = hpPercent;

      this.playerBar.setSize(600 * hpPercent, 28);   
    })

    currentScene.events.on('removeUI', () => {
      this.enemyBar.destroy(true)
      this.playerBar.destroy(true)
      this.foeHeader.destroy(true)
      this.enemyBarOuter.destroy(true)
      this.playerBarOuter.destroy(true)
      this.playerName.destroy(true)
    })
  }
}