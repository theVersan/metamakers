import { SFX } from "../../UI/sfx.js";

export class MinigamePran extends Phaser.Scene {
  constructor() {
    super({ key: "MinigamePran" });
  }
  
  preload() {
    this.load.image("boxpran", "assets/pranbox.png");
    this.load.image("certo", "assets/correto.png");
    // Carrega o som de click das opções de contrato
    this.sfx = new SFX(this);
    this.sfx.preload('clickSound', 'assets/sounds/mouseClick.mp3');     
  }
  
  create() {
    // Cria o som de click
    this.sfx.create('clickSound');

    this.cameras.main.setBackgroundColor('#ffffff');
    this.add.image(600, 430, "boxpran").setScale(2);
   
   this.certo = this.add.image(940, 600, "certo").setScale(0.3);
   this.add.text(80, 230, "Aqui você deve verificar se todos os items e serviços foram entregues ", { fontSize: "25px", color: "0x000000" });
   this.add.text(80, 300, "e executados de modo correto, para verificar os items clique nos items ", { fontSize: "25px", color: "0x000000" });
   this.add.text(80, 370, "da prancheta utilizando seu mouse ", { fontSize: "25px", color: "0x000000" });
   this.certo.setInteractive();
   this.certo.on("pointerdown", () => {
    this.sfx.play('clickSound'); // Toca o som de click
    this.scene.stop("MinigamePran");
    this.scene.start("MinigameQuatro");
    },
    null,
    this
  );
  }
  
  update() {
  
  }
  
  }
