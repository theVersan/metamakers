import { SFX } from "../../UI/sfx.js";
export class PerguntaTres extends Phaser.Scene {
  constructor() {
    super({ key: "PerguntaTres" });
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
    this.add.image(600, 430, "background").setScale(1.6);
    this.sfx.create('clickSound');
    this.add.image(600, 320, "cinza").setScale(1).setDisplaySize(1000, 110);
    this.add.image(600, 430, "verde").setScale(1).setDisplaySize(1000, 95);
    this.add.image(600, 530, "verde").setScale(1).setDisplaySize(1000, 95);
    this.add.image(600, 650, "verde").setScale(1).setDisplaySize(1000, 140);

      this.perguntaTres = this.add.text(370, 280, " O que é um PO?", {
        fontSize: "50px",
        color: "#ffffff",
      });
      this.tresAlternativaA = this.add.text(
        110,
        400,
        " A-) Estratégia de negócios que se concentra em obter uma visão completa \n e unificada do cliente.",
        { fontSize: "21px", color: "#ffffff" }
      );
      this.tresAlternativaB = this.add.text(
        110,
        500,
        " B-) Acordo estabelecido sobre os prazos e parâmetros do serviço.",
        { fontSize: "25px", color: "#ffffff" }
      );
      this.tresAlternativaC = this.add.text(
        110,
        600,
        " C-) Documento emitido por um comprador para um vendedor para confirmar um \n pedido de compra.",
        { fontSize: "21px", color: "#ffffff" }
      );

    this.tresAlternativaA.setInteractive();
    this.tresAlternativaB.setInteractive();
    this.tresAlternativaC.setInteractive();

    // Quando clicar na pasta
    this.tresAlternativaA.on("pointerdown", () => {
      this.respostaIncorreta();
    });

    this.tresAlternativaB.on("pointerdown", () => {
      this.respostaIncorreta();
    });

    this.tresAlternativaC.on("pointerdown", () => {
      this.respostaCorreta();
    });
  }

// Para a cena "ContratoQuatro" e inicia a cena "Contratos"
passarDeCena() {
  this.scene.stop("PerguntaTres");
  this.scene.start("PerguntaQuatro");
}

sairDeCena() {
  this.scene.stop("PerguntaTres");
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
