import { SFX } from "../../UI/sfx.js";
// Classe ContratoCinco que herda da classe Phaser.Scene
export class ContratoCinco extends Phaser.Scene {
  acertos;

  constructor() {
    super({ key: "ContratoCinco" });
  }

  init(dados) {
    this.acertos = dados.acertos;
  }

  // Função de pré-carregamento
  preload() {
    this.load.image("fornecedor5", "assets/fornecedores/fornecedorSprite_5.png");
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

    // Adiciona uma imagem de um notebook e um retângulo como tela
    this.add.image(600, 430, "notebook").setScale(2);
    this.add.rectangle(594, 355, 897, 424, 0xffffff);

    // Adiciona uma imagem do fornecedor 5
    this.add.image(290, 325, "fornecedor5").setScale(3);

    // Adiciona uma imagem de um check e de um "x"
    this.check = this.add.image(900, 300, "check").setScale(6);
    this.deny = this.add.image(900, 405, "deny").setScale(6);

    // Torna as imagens interativas
    this.check.setInteractive();
    this.deny.setInteractive();

    //determina o que ocorre quando as imagens são clicadas
    this.check.on("pointerdown", () => {
      this.respostaCorreta();
    });
    this.deny.on("pointerdown", () => {
      this.respostaIncorreta();
    });

    // Adiciona um texto
    this.add.text(535, 200, "Contrato", { fontSize: "25px", color: "#000000" });
    this.add.text(370, 250, " O G.H. Inc. é uma empresa em ascensão que \n fornece serviços de marketing. Ministramos \n aulas a fim de capacitar mulheres em \n situação de vulnerabilidade, diminuindo o \n gap de gênero no mercado de trabalho. ", { fontSize: "18px", color: "#000000" });

    this.add.text(380, 340, "Diversidade: ", { fontSize: "18px", color: "#000000" });
    this.add.image(650, 350, "progressoQuatro");

    this.add.text(380, 380, "Reputação: ", { fontSize: "18px", color: "#000000" });
    this.add.image(650, 390, "progressoQuatro");

    this.add.text(380, 420, "KPI: ", { fontSize: "18px", color: "#000000" });
    this.add.image(650, 430, "progressoQuatro");
  }

  // Para a cena "ContratoCinco" e inicia a cena "Contratos"
  passarDeCena(acertos){
    this.scene.stop("ContratoCinco");
    this.scene.start("Contratos", { acertos: acertos });
  }

  //caso o botão certo seja escolhido pelo jogador
  respostaCorreta(){
    this.sfx.play('clickSound'); // emite o som de click
    this.add.image(600, 360, "popup"); // mensagem de confirmação
    this.add.text(490, 340, " Escolha \n correta!", { fontSize: "35px", color: "#000000" });
    this.deny.disableInteractive(); //impede que o botão seja clicado
    this.check.disableInteractive(); //impede que o botão seja clicado
    this.time.delayedCall(2000, this.passarDeCena, [this.acertos + 1], this); // espera 2s e avança de cena
  }
  //caso o botão errado seja escolhido pelo jogador
  respostaIncorreta(){
    this.sfx.play('clickSound'); // emite o som de click
    this.add.image(600, 360, "popup");
    this.add.text(470, 340, " Escolha \n incorreta!", { fontSize: "35px", color: "#000000" });
    this.deny.disableInteractive(); //impede que o botão seja clicado
    this.check.disableInteractive(); //impede que o botão seja clicado
    this.time.delayedCall(2000, this.passarDeCena, [this.acertos], this); // espera 2s e avança de cena
  }

  // Função de atualização da cena
  update() {}
}
