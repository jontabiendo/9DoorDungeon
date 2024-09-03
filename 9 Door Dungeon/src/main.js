import { Boot } from './scenes/Boot';
import { RobotFight } from './scenes/RobotFight';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';
import { Credits } from './scenes/Credits';
import { LevelComplete } from './scenes/levelCompleteScreen';
import { SamuraiFight } from './scenes/SamuraiFight';
import { UI } from './scenes/UI';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#028af8',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        RobotFight,
        SamuraiFight,
        LevelComplete,
        GameOver,
        Credits,
        UI
    ]
};

export default new Phaser.Game(config);
