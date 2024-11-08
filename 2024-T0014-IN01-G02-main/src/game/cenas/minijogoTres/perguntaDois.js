import { SFX } from "../../UI/sfx.js";
export class PerguntaDois extends Phaser.Scene {
  constructor() {
    super({ key: "PerguntaDois" });
  }

  //Pré-carrega os recursos necessários para a cena.
  preload() {
    this.load.image("background", "assets/WhatsGame.png");
    this.load.image("check", "assets/check.png");
    this.load.image("deny", "assets/deny.png");
    this.load.image("popup", "assets/popup.png");
    this.load.image("cinza", "assets/balaocinza.png");
    this.load.image("verde", "assets/balaoverde.png");
    this.sfx = new SFX(this);
    this.sfx.preload('clickSound', 'assets/sounds/mouseClick.mp3');
  }

  //Cria os objetos do jogo e configura a cena.
  create() {
    this.sfx.create('clickSound');
    this.add.image(600, 430, "background").setScale(1.6);

    this.add.image(600, 320, "cinza").setScale(1).setDisplaySize(1000, 110);
    this.add.image(600, 430, "verde").setScale(1).setDisplaySize(1000, 95);
    this.add.image(600, 530, "verde").setScale(1).setDisplaySize(1000, 95);
    this.add.image(600, 650, "verde").setScale(1).setDisplaySize(1000, 140);

      this.perguntaDois = this.add.text(130, 260, " O que é um MSA (Master Service \n Agreement)?", {
        fontSize: "50px",
        color: "#ffffff",
      });
      this.doisAlternativaA = this.add.text(
        95,
        400,
        " A-) Um documento que contém detalhes financeiros dos fornecedores.",
        { fontSize: "25px", color: "#ffffff" }
      );
      this.doisAlternativaB = this.add.text(
        95,
        500,
        " B-) Acordo de não divulgação.",
        { fontSize: "25px", color: "#ffffff" }
      );
      this.doisAlternativaC = this.add.text(
        95,
        590,
        " C-)  Um acordo mestre que estabelece os termos e condições gerais \n que regem a relação entre duas partes, geralmente um \n prestador de serviços e um cliente.",
        { fontSize: "25px", color: "#ffffff" }
      );

    this.doisAlternativaA.setInteractive();
    this.doisAlternativaB.setInteractive();
    this.doisAlternativaC.setInteractive();

    // Quando clicar na pasta
    this.doisAlternativaA.on("pointerdown", () => {
      this.respostaIncorreta();
    });

    this.doisAlternativaB.on("pointerdown", () => {
      this.respostaIncorreta();
    });

    this.doisAlternativaC.on("pointerdown", () => {
      this.respostaCorreta();
    });
  }

  // Para a cena "ContratoQuatro" e inicia a cena "Contratos"
  passarDeCena() {
    this.scene.stop("PerguntaDois");
    this.scene.start("PerguntaTres");
  }

  sairDeCena() {
    this.scene.stop("PerguntaDois");
    this.scene.start("MinijogoTres");
  }

  //caso o botão certo seja escolhido pelo jogador
  respostaCorreta(){
    this.sfx.play('clickSound'); // emite o som de click
    this.add.image(600, 450, "popup").setScale(2); // mensagem de confirmação
    this.add.text(450, 430, " Escolha \n correta!", { fontSize: "50px", color: "#000000" });
    this.time.delayedCall(2000, this.passarDeCena, [], this); // espera 2s e avança de cena
  }
  //caso o botão errado seja escolhido pelo jogador
  respostaIncorreta() {
    this.sfx.play("clickSound"); // emite o som de click
    this.add.image(600, 400, "popup").setScale(2);
    this.add.text(420, 400, " Escolha \n incorreta!", {
      fontSize: "50px",
      color: "#000000",
    });
    this.time.delayedCall(2000, this.sairDeCena, [], this); // espera 2s e avança de cena
  }

  update() {}
}
