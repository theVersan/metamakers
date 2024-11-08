import {SFX} from "../../UI/sfx.js";
export class ContratoTres extends Phaser.Scene {
  acertos;

  constructor() {
    super({ key: "ContratoTres" });
  }

  init(dados) {
    this.acertos = dados.acertos;
  }

  // Função de pré-carregamento
  preload() {
    this.load.image("fornecedor3", "assets/fornecedores/fornecedorSprite_3.png");
    this.load.image("progressoUm", "assets/progress_1.png");
    this.load.image("progressoDois", "assets/progress_2.png");
    this.load.image("progressoTres", "assets/progress_3.png");
    this.load.image("progressoQuatro", "assets/progress_4.png");
    this.load.image("progressoCinco", "assets/progress_5.png");
    this.load.image("popup", "assets/popup.png");
    // Carrega o som de click das opções de contrato e instancia a classe SFX
    this.sfx = new SFX(this);
    this.sfx.preload('clickSound', 'assets/sounds/mouseClick.mp3');
  }

  // Função de criação dos elementos da cena
  create() {
    // Cria o som de click
    this.sfx.create('clickSound');

    // Adiciona uma imagem de um notebook
    this.add.image(600, 430, "notebook").setScale(2);
    this.add.rectangle(594, 355, 897, 424, 0xffffff);

    // Adiciona uma imagem de um fornecedor
    this.add.image(290, 325, "fornecedor3").setScale(3);

    // Adiciona imagens de check e de "x"
    this.check = this.add.image(900, 300, "check").setScale(6);
    this.deny = this.add.image(900, 405, "deny").setScale(6);

    //torna check e "x" clicáveis
    this.check.setInteractive();
    this.deny.setInteractive();    

    //define o que ocorre quando as imagens são clicadas
    this.check.on("pointerdown", () => {
      this.respostaCorreta();
    });
    this.deny.on("pointerdown", () => {
      this.respostaIncorreta();
    });

    // Adiciona um texto
    this.add.text(535, 200, "Contrato", { fontSize: "25px", color: "#000000" });
    this.add.text(370, 250, " O Turing Group surgiu há um ano atrás com o \n propósito de fornecer oportunidades para \n pessoas LGBTQ+ no mercado de trabalho com \n ênfase na comunidade trans.", { fontSize: "18px", color: "#000000" });

    this.add.text(380, 340, "Diversidade: ", { fontSize: "18px", color: "#000000" });
    this.add.image(650, 350, "progressoCinco");

    this.add.text(380, 380, "Reputação: ", { fontSize: "18px", color: "#000000" });
    this.add.image(650, 390, "progressoTres");

    this.add.text(380, 420, "KPI: ", { fontSize: "18px", color: "#000000" });
    this.add.image(650, 430, "progressoDois");
  }

  passarDeCena(acertos){
    // Para a cena "ContratoTres"
    this.scene.stop("ContratoTres");
    // Inicia a cena "Contratos"
    this.scene.start("Contratos", { acertos: acertos });
  }

  //caso o botão certo seja escolhido pelo jogador
  respostaCorreta(){
    this.sfx.play('clickSound'); // toca o som de click
    this.add.image(600, 360, "popup"); // mensagem de confirmação
    this.add.text(490, 340, " Escolha \n correta!", { fontSize: "35px", color: "#000000" });
    this.deny.disableInteractive(); //impede que o botão seja clicado
    this.check.disableInteractive(); //impede que o botão seja clicado
    this.time.delayedCall(2000, this.passarDeCena, [this.acertos + 1], this); // espera 2s e avança de cena
  }
  //caso o botão errado seja escolhido pelo jogador
  respostaIncorreta(){
    this.sfx.play('clickSound'); // toca o som de click
    this.add.image(600, 360, "popup");
    this.add.text(470, 340, " Escolha \n incorreta!", { fontSize: "35px", color: "#000000" });
    this.deny.disableInteractive(); //impede que o botão seja clicado
    this.check.disableInteractive(); //impede que o botão seja clicado
    this.time.delayedCall(2000, this.passarDeCena, [this.acertos], this); // espera 2s e avança de cena
  }

  // Função de atualização da cena
  update() {}
}
