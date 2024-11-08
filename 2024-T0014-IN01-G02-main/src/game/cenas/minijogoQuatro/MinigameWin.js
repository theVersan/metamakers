import { SFX } from "../../UI/sfx.js";

export class MinigameWin extends Phaser.Scene {
  constructor() {
    super({ key: "MinigameWin" });
  }

  preload() {
    // Pré-carrega as imagens necessárias
    this.load.image("corretoconclude", "assets/certoconclude.png");
    this.load.image("check", "assets/check.png");
    // Carrega o som de click das opções de contrato
    this.sfx = new SFX(this);
    this.sfx.preload("clickSound", "assets/sounds/mouseClick.mp3");
  }

  create() {
    // Cria o som de click
    this.sfx.create("clickSound");

    this.cameras.main.setBackgroundColor("#ffffff");
    this.add.image(600, 430, "corretoconclude").setScale(2);

    this.add.text(350, 240, "Verificação Concluída", {
      fontSize: "40px",
      color: "#00FF00",
    });
    this.add.text(
      150,
      375,
      "Parabéns! Você concluiu a etapa de verificação de",
      { fontSize: "30px", color: "#000000" }
    );
    this.add.text(
      150,
      425,
      "Goods and Services, converse com MesBot pra mais",
      { fontSize: "30px", color: "#000000" }
    );
    this.add.text(
      150,
      475,
      "informações de sua próxima tarefa nesse processo!",
      { fontSize: "30px", color: "#000000" }
    );
    this.check = this.add.image(1000, 550, "check").setScale(3);
    this.check.setInteractive();
    this.check.on("pointerdown", () => {
      this.sfx.play("clickSound"); // Toca o som de click
      this.scene.stop("MinigameWin");
      this.scene.start("EscritorioQuatro", { minigameFinalizado: true });
    });
  }

  update() {}
}
