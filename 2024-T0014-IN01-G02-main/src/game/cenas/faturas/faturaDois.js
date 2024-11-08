import { SFX } from "../../UI/sfx.js";

export class FaturaDois extends Phaser.Scene {
  constructor() {
    super({ key: "FaturaDois" });
  }

  preload() {
    // Pré-carrega as imagens necessárias
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

    this.add.rectangle(600, 360, 600, 400, 0xffffff);
    // const retanguloFoto = this.add.rectangle(570, 210, 50, 50, 0xffffff).setScale(1.5);
    // retanguloFoto.setStrokeStyle(4, 0xefc53f);  

    this.check = this.add.image(855, 530, "check").setScale(4);
    this.check.setInteractive();

    this.deny = this.add.image(780, 530, "deny").setScale(4);
    this.deny.setInteractive();
    this.deny.on("pointerdown", () => {
      this.sfx.play('clickSound'); // Toca o som de click
      this.scene.stop("FaturaDois");
      this.scene.start("MinigameCinco");
    });

    this.checkBox1 = this.add.rectangle(360, 490, 25, 25, 0x000000).setInteractive();
    this.checkBox1.on("pointerdown", () => {
      this.sfx.play('clickSound'); // Toca o som de click
      this.checkSignal1.setVisible(true);
      this.box1 = true;
    });

    this.add.text(350, 230, "Item", { fontSize: "20px", color: "0x000000" });
    this.add.text(520, 230, "Descrição", { fontSize: "20px", color: "0x000000" });
    this.add.text(770, 230, "Valor", { fontSize: "20px", color: "0x000000" });

    this.add.text(350, 270, "Brunch: Buffet Completo", { fontSize: "20px", color: "0x000000" });
    this.add.text(770, 270, "R$500", { fontSize: "20px", color: "0x000000" });

    this.add.text(350, 310, "Fotografia: Contratação", { fontSize: "20px", color: "0x000000" });
    this.add.text(770, 310, "R$700", { fontSize: "20px", color: "0x000000" });

    this.add.text(350, 350, "DJ: Couvert Artístico", { fontSize: "20px", color: "0x000000" });
    this.add.text(770, 350, "R$400", { fontSize: "20px", color: "0x000000" });

    this.add.text(350, 390, "Aluguel: Equipamento de Som", { fontSize: "20px", color: "0x000000" });
    this.add.text(770, 390, "R$1000", { fontSize: "20px", color: "0x000000" });

    this.add.text(350, 430, "Decoração: Temática Evento  ", { fontSize: "20px", color: "0x000000" });
    this.add.text(770, 430, "R$800", { fontSize: "20px", color: "0x000000" });

    this.add.text(380, 480, "Estou ciente que sou responsável pela\nvalidação desta fatura.", { fontSize: "20px", color: "0x000000" });
    this.checkSignal1 = this.add.image(360, 490, "check").setScale(1.5).setVisible(false);
    this.box1 = false;

    this.add.text(350, 180, "Fatura", { fontSize: "30px", color: "0x000000" });
  }

  update() {
    if(this.box1){
      if(this.check.on("pointerdown", () => {
        this.sfx.play('clickSound'); // Toca o som de click
        this.scene.start("FaturaTres");
        this.scene.stop("FaturaDois");
      }));
    }
  }
}