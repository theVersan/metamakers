import {SFX} from "../../UI/sfx.js";

export class FaturaTres extends Phaser.Scene {
  constructor() {
    super({ key: "FaturaTres" });
  }
  
  preload() {
    // Carrega as imagens necessárias
    this.load.image("notebook", "assets/notebook.png");
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
  
    this.add.rectangle(600, 360, 500, 360, 0xffffff);
  
    // this.add.image(570, 200, "fornecedor1").setScale(2);
  
    this.check = this.add.image(775, 500, "check").setScale(4);
    this.check.setInteractive();
    this.check.on("pointerdown", () => {
    this.sfx.play('clickSound'); // Toca o som de click
    this.scene.start("FaturaQuatro");
    this.scene.stop("FaturaTres");
    });
  
    this.deny = this.add.image(700, 500, "deny").setScale(4);
    this.deny.setInteractive();
    this.deny.on("pointerdown", () => {
    this.sfx.play('clickSound'); // Toca o som de click
    this.scene.start("FaturaDois");
    this.scene.stop("FaturaTres");
    });

    this.add.text(425, 240, "APROVAÇÃO DA FATURA", { fontSize: "25px", color: "0x000000" });
    this.add.text(425, 340, "Você deseja realmente confirmar \na aprovação da fatura?", { fontSize: "20px", color: "0x000000" });
  }
  
  update() {
  }
}