import { SFX } from "../../UI/sfx.js";
// Classe ContratoQuatro que estende Phaser.Scene
export class ContratoQuatro extends Phaser.Scene {
  acertos;

  constructor() {
    super({ key: "ContratoQuatro" });
  }

  init(dados) {
    this.acertos = dados.acertos;
  }

  // Pré-carrega os recursos necessários
  preload() {
    this.load.image("fornecedor4", "assets/fornecedores/fornecedorSprite_4.png");
    this.load.image("progressoUm", "assets/progress_1.png");
    this.load.image("progressoDois", "assets/progress_2.png");
    this.load.image("progressoTres", "assets/progress_3.png");
    this.load.image("progressoQuatro", "assets/progress_4.png");
    this.load.image("progressoCinco", "assets/progress_5.png");
    // Carrega o som de click das opções de contrato
    this.sfx = new SFX(this);
    this.sfx.preload('clickSound', '../../../assets/sounds/mouseClick.mp3');
  }

  // Cria os elementos da cena
  create() {
    // Cria o som de click
    this.sfx.create('clickSound');

    // Adiciona a imagem do notebook e sua tela
    this.add.image(600, 430, "notebook").setScale(2);
    this.add.rectangle(594, 355, 897, 424, 0xffffff);

    // Adiciona a imagem do fornecedor
    this.add.image(290, 325, "fornecedor4").setScale(3);

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

    // Adiciona o texto à tela do computador
    this.add.text(535, 200, "Contrato", { fontSize: "25px", color: "#000000" });
    this.add.text(370, 250, " O Benedito Caravelas Ltd. empodera pessoas pretas e \n fornece um ambiente de crescimento seguro \n e equitativo com a finalidade de \n diversificar o cenário corporativo.", { fontSize: "18px", color: "#000000" });

    this.add.text(380, 340, "Diversidade: ", { fontSize: "18px", color: "#000000" });
    this.add.image(650, 350, "progressoQuatro");

    this.add.text(380, 380, "Reputação: ", { fontSize: "18px", color: "#000000" });
    this.add.image(650, 390, "progressoTres");

    this.add.text(380, 420, "KPI: ", { fontSize: "18px", color: "#000000" });
    this.add.image(650, 430, "progressoTres");
  }

  // Para a cena "ContratoQuatro" e inicia a cena "Contratos"
  passarDeCena(acertos){
    this.scene.stop("ContratoQuatro");
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
    this.add.text(470, 330, " Escolha \n incorreta!", { fontSize: "35px", color: "#000000" });
    this.deny.disableInteractive(); //impede que o botão seja clicado
    this.check.disableInteractive(); //impede que o botão seja clicado
    this.time.delayedCall(2000, this.passarDeCena, [this.acertos], this); // espera 2s e avança de cena
  }

  // Atualiza a cena
  update() { }
}
