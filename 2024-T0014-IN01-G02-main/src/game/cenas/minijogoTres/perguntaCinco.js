import { SFX } from "../../UI/sfx.js";
export class PerguntaCinco extends Phaser.Scene {
  constructor() {
    super({ key: "PerguntaCinco" });
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
    this.sfx.preload("clickSound", "assets/sounds/mouseClick.mp3");
  }

  //Cria os objetos do jogo e configura a cena.
  create() {
    // Cria o som de click
    this.sfx.create('clickSound');
    
    this.add.image(600, 430, "background").setScale(1.6);
   
    this.add.image(600, 320, "cinza").setScale(1).setDisplaySize(1000, 110);
    this.add.image(600, 430, "verde").setScale(1).setDisplaySize(1000, 95);
    this.add.image(600, 530, "verde").setScale(1).setDisplaySize(1000, 95);
    this.add.image(600, 650, "verde").setScale(1).setDisplaySize(1000, 95);
    

    this.perguntaCinco = this.add.text(330, 280, "  O que é um KPI?", {
      fontSize: "50px",
      color: "#ffffff",
    });

    this.cincoAlternativaA = this.add.text(
      120,
      410,
      " A-) Uma chave que libera o acesso a informações sobre o fornecedor.",
      { fontSize: "21px", color: "#ffffff" }
    );

    this.cincoAlternativaB = this.add.text(
      120,
      490,
      " B-) Um KPI é uma medida quantificável que ajuda a avaliar o desempenho \n de uma organização, equipe ou processo em relação a metas \n e objetivos específicos.",
      { fontSize: "21px", color: "#ffffff" }
    );

    this.cincoAlternativaC = this.add.text(
      120,
      630,
      " C-) Um contrato de negociação",
      { fontSize: "21px", color: "#ffffff" }
    );

    this.cincoAlternativaA.setInteractive();
    this.cincoAlternativaB.setInteractive();
    this.cincoAlternativaC.setInteractive();

    // Quando clicar na pasta
    this.cincoAlternativaA.on("pointerdown", () => {
      this.respostaIncorreta();
    });

    this.cincoAlternativaB.on("pointerdown", () => {
      this.respostaCorreta();
    });

    this.cincoAlternativaC.on("pointerdown", () => {
      this.respostaIncorreta();
    });
  }

 // Para a cena "ContratoQuatro" e inicia a cena "Contratos"
 passarDeCena() {
  this.scene.stop("PerguntaCinco");
  this.scene.start("EscritorioTres", { minigameFinalizado: true });
}

sairDeCena() {
  this.scene.stop("PerguntaCinco");
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
