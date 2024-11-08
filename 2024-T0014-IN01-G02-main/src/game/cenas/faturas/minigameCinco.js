import {SFX} from "../../UI/sfx.js";

export class MinigameCinco extends Phaser.Scene {
  constructor() {
    super({ key: "MinigameCinco" });
  }
  
  preload() {
    // Carrega as imagens necessárias
    this.load.image("notebook", "assets/notebook.png");
    this.load.image("pastas", "assets/pasta.png");
    this.load.image("check", "assets/check.png");
    this.load.image("deny", "assets/deny.png");
    
    // Carrega o som de click das opções de contrato
    this.sfx = new SFX(this);
    this.sfx.preload('clickSound', 'assets/sounds/mouseClick.mp3');
  }
  
  create() {
    // Cria o som de click
    this.sfx.create('clickSound');

    this.cameras.main.setBackgroundColor('#ffffff');
    this.add.image(600, 430, "notebook").setScale(2);
    this.pastaUm = this.add.image(580, 340, "pastas").setScale(10);

    this.pastaUm.setInteractive()

    this.pastaUm.on ('pointerdown', () => {
    this.sfx.play('clickSound'); // Toca o som de click
    this.scene.stop('MinigameCinco');
    this.scene.start('FaturaUm');
    })
  }
  
  update() {
  
  }
  
  }