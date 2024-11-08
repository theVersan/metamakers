import { SFX } from "../../UI/sfx.js";
export class PerguntaQuatro extends Phaser.Scene {
  constructor() {
    super({ key: "PerguntaQuatro" });
  }

  //Pré-carrega os recursos necessários para a cena.
  preload() {
    this.load.image("background", "assets/WhatsGame.png");
    this.load.image("check", "assets/check.png");
    this.load.image("deny", "assets/deny.png");
    this.load.image("cinza", "assets/balaocinza.png");
      this.load.image("verde", "assets/balaoverde.png");
    // Carrega o som de click das opções de contrato
    this.load.image("popup", "assets/popup.png");
    this.sfx = new SFX(this);
    this.sfx.preload('clickSound', 'assets/sounds/mouseClick.mp3');
  }

  //Cria os objetos do jogo e configura a cena.
  create() {
    // Cria o som de click
    this.sfx.create('clickSound');

    this.add.image(600, 430, "background").setScale(1.7);

    this.add.image(600, 320, "cinza").setScale(1).setDisplaySize(1000, 110);
    this.add.image(600, 430, "verde").setScale(1).setDisplaySize(1000, 95);
    this.add.image(600, 530, "verde").setScale(1).setDisplaySize(1000, 95);
    this.add.image(600, 650, "verde").setScale(1).setDisplaySize(1000, 95);

    this.perguntaQuatro = this.add.text(350, 280, " O que é um SLA?", {
      fontSize: "50px",
      color: "#ffffff",
    });
    this.QuatroAlternativaA = this.add.text(
      120,
      400,
      " A-) Documento onde se especificam as condições mínimas para um serviço ser \n considerado satisfatório.",
      { fontSize: "21px", color: "#ffffff" }
    );
    this.QuatroAlternativaB = this.add.text(
      120,
      500,
      " B-) Qualquer termo adicional ou condição que seja relevante para o projeto \n e seu contrato associado.",
      { fontSize: "21px", color: "#ffffff" }
    );
    this.QuatroAlternativaC = this.add.text(
      120,
      620,
      " C-) Detalhes sobre os custos associados ao projeto, incluindo qualquer \n orçamento específico",
      { fontSize: "21px", color: "#ffffff" }
    );

    this.QuatroAlternativaA.setInteractive();
    this.QuatroAlternativaB.setInteractive();
    this.QuatroAlternativaC.setInteractive();

    // Quando clicar na pasta
    this.QuatroAlternativaA.on("pointerdown", () => {
      this.respostaCorreta();
    });

    this.QuatroAlternativaB.on("pointerdown", () => {
      this.respostaIncorreta();
    });

    this.QuatroAlternativaC.on("pointerdown", () => {
      this.respostaIncorreta();
    });
  }

  // Para a cena "ContratoQuatro" e inicia a cena "Contratos"
  passarDeCena() {
    this.scene.stop("PerguntaQuatro");
    this.scene.start("PerguntaCinco");
  }

  sairDeCena() {
    this.scene.stop("PerguntaQuatro");
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
