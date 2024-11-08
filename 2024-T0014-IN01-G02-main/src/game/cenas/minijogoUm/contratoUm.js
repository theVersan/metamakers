import { SFX } from "../../UI/sfx.js";
//cena aberta após clicar na primeira pasta da cena Contratos
export class ContratoUm extends Phaser.Scene {
  acertos;

  constructor() {
    super({ key: "ContratoUm" });
  }

  init(dados) {
    this.acertos = dados.acertos;
  }

  preload() {
    // Carrega as imagens
    this.load.image(
      "fornecedor1",
      "assets/fornecedores/fornecedorSprite_1.png"
    );
    this.load.image("progressoUm", "assets/progress_1.png");
    this.load.image("progressoDois", "assets/progress_2.png");
    this.load.image("progressoTres", "assets/progress_3.png");
    this.load.image("progressoQuatro", "assets/progress_4.png");
    this.load.image("progressoCinco", "assets/progress_5.png");
    this.load.image("popup", "assets/popup.png");

    // Carrega o som de click das opções de contrato
    this.sfx = new SFX(this);
    this.sfx.preload("clickSound", "assets/sounds/mouseClick.mp3");
  }

  create() {
    // Cria o som de click
    this.sfx.create("clickSound");

    // Adiciona a imagem do notebook e sua tela
    this.add.image(600, 430, "notebook").setScale(2);
    this.add.rectangle(594, 355, 897, 424, 0xffffff);

    // Adiciona a imagem do fornecedor
    this.add.image(290, 325, "fornecedor1").setScale(3);

    // Adiciona as imagens do check e do "x"
    this.check = this.add.image(900, 300, "check").setScale(6);
    this.deny = this.add.image(900, 405, "deny").setScale(6);

    //torna as imagens de check e de "x" clicáveis
    this.check.setInteractive();
    this.deny.setInteractive();

    //determina o que acontece quando as imagens são clicadas
    this.check.on("pointerdown", () => {
      this.respostaIncorreta();
    });
    this.deny.on("pointerdown", () => {
      this.respostaCorreta();
    });

    // Adiciona o texto à tela do computador
    this.add.text(535, 200, "Contrato", { fontSize: "25px", color: "#000000" });
    this.add.text(
      370,
      250,
      " A Brilliant Corp é uma startup em ascensão. \n Com muitos profissionais renomados \n no mercado, prezamos por eficiência e \n competitividade.",
      { fontSize: "18px", color: "#000000" }
    );

    this.add.text(380, 340, "Diversidade: ", {
      fontSize: "18px",
      color: "#000000",
    });
    this.add.image(650, 350, "progressoDois");

    this.add.text(380, 380, "Reputação: ", {
      fontSize: "18px",
      color: "#000000",
    });
    this.add.image(650, 390, "progressoCinco");

    this.add.text(380, 420, "KPI: ", { fontSize: "18px", color: "#000000" });
    this.add.image(650, 430, "progressoQuatro");
  }

  // Para a cena "ContratoUm" e inicia a cena "Contratos"
  passarDeCena(acertos) {
    this.scene.stop("ContratoUm");
    this.scene.start("Contratos", { acertos: acertos });
  }

  //caso o botão certo seja escolhido pelo jogador
  respostaCorreta() {
    this.sfx.play("clickSound");
    this.add.image(600, 360, "popup"); // mensagem de confirmação
    this.add.text(490, 340, " Escolha \n correta!", { fontSize: "35px", color: "#000000" });
    this.deny.disableInteractive(); //impede que o botão seja clicado
    this.check.disableInteractive(); //impede que o botão seja clicado
    this.time.delayedCall(2000, this.passarDeCena, [this.acertos + 1], this); // espera 2s e avança de cena
  }

  //caso o botão errado seja escolhido pelo jogador
  respostaIncorreta() {
    this.sfx.play("clickSound");
    this.add.image(600, 360, "popup");
    this.add.text(470, 340, " Escolha \n incorreta!", { fontSize: "35px", color: "#000000" });
    this.deny.disableInteractive(); //impede que o botão seja clicado
    this.check.disableInteractive(); //impede que o botão seja clicado
    this.time.delayedCall(2000, this.passarDeCena, [this.acertos], this); // espera 2s e avança de cena
  }

  update() {}
}
