import { SFX } from "../../UI/sfx.js";
export class FaturaQuatro extends Phaser.Scene {
  constructor() {
    super({ key: "FaturaQuatro" });
  }

  preload() {
    this.load.image("notebook", "assets/notebook.png");
    this.load.image("check", "assets/check.png");
    this.load.image("deny", "assets/deny.png");
    // Carrega o som de click das opções de contrato
    this.sfx = new SFX(this);
    this.sfx.preload("clickSound", "assets/sounds/mouseClick.mp3");
  }

  create() {
    // Cria o som de click
    this.sfx.create("clickSound");

    this.cameras.main.setBackgroundColor("#ffffff");
    this.add.image(600, 430, "notebook").setScale(2);

    this.add.rectangle(600, 360, 500, 360, 0xffffff);

    // this.add.image(570, 200, "fornecedor1").setScale(2);

    this.check = this.add.image(775, 500, "check").setScale(4);
    this.check.setInteractive();
    this.check.on("pointerdown", () => {
      this.sfx.play("clickSound"); // Toca o som de click
      this.scene.start("EscritorioCinco", { minigameFinalizado: true });
      this.scene.stop("FaturaQuatro");
    });

    this.add.text(425, 240, " FATURA CONFIRMADA", {
      fontSize: "30px",
      color: "0xff0000",
    });
    this.add.text(
      425,
      340,
      "A fatura foi confirmada  \ne enviada para Contas a Pagar.\n\nNão se esqueça de falar com Tom\naqui no Andar, ele te instruirá\nsobre os próximos passos.",
      { fontSize: "20px", color: "0x000000" }
    );
  }

  update() {}
}
