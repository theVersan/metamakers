import {SFX} from "../../UI/sfx.js";
// Variável para guardar os acertos do jogador
var acertouDois = false;
var acertouQuatro = false;

// Define a classe que representa a cena "TarefasMeta" no jogo.
export class TarefasMeta extends Phaser.Scene {
  constructor() {
    super({ key: "TarefasMeta" }); // Chama o construtor da classe pai com a chave da cena.
  }

  // Método preload carrega os assets necessários para a cena.
  preload() {
    // Carga das imagens usadas na cena, como a tela de fundo, botões, mensagem de erro, etc.
    this.load.image("telaSeguranca", "assets/seguranca.png");
    this.load.image("botaoSuperiorEsquerdo", "assets/seguranca_botao_um.png");
    this.load.image('botaoSuperiorDireito', 'assets/seguranca_botao_dois.png');
    this.load.image('botaoSuperiorDireitoAzul', 'assets/seguranca_botao_dois_azul.png');
    this.load.image('botaoInferiorEsquerdo', 'assets/seguranca_botao_tres.png');
    this.load.image('botaoInferiorDireito', 'assets/seguranca_botao_quatro.png');
    this.load.image('botaoInferiorDireitoAzul', 'assets/seguranca_botao_quatro_azul.png');
    this.load.image('mensagemErro', 'assets/opcao_incorreta.png');
    this.load.image('botaoOk', 'assets/ok.png');
    this.load.image('proximo', 'assets/proximo.png')
    // Nota-se a carga de várias imagens, incluindo versões alternativas dos botões para indicar estados diferentes (por exemplo, botão pressionado).

    // Carrega o som de click das opções de contrato
    this.sfx = new SFX(this);
    this.sfx.preload('clickSound', 'assets/sounds/mouseClick.mp3');
  }

  // Método create configura os objetos da cena quando esta é iniciada.
  create() {
    // Cria o som de click
    this.sfx.create('clickSound');
    // Adiciona a imagem de fundo e escala para o tamanho desejado.
    this.add.image(600, 430, "telaSeguranca").setScale(1.2);

    // Configuração dos botões na cena, incluindo posição, escala e interatividade.
    // Botão superior esquerdo:
    this.botaoUm = this.add
      .image(468, 414, "botaoSuperiorEsquerdo")
      .setScale(1.2);
    this.botaoUm.setInteractive();
    // Define o comportamento ao clicar no botão, mostrando uma mensagem de que a alternativa está incorreta
    this.botaoUm.on("pointerdown", () => {
      this.sfx.play("clickSound"); // Toca o som de click
      this.avisoErro = this.add.image(600, 430, "mensagemErro").setScale(1.2);
      // Botão OK para fechar a mensagem de erro.
      this.botaoOk = this.add.image(600, 466, "botaoOk").setScale(1.2);
      this.botaoOk.setInteractive();
      this.botaoOk.on("pointerdown", () => {
        this.sfx.play("clickSound"); // Toca o som de click
        this.botaoOk.setInteractive(false);
        this.botaoOk.setVisible(false);
        this.avisoErro.setVisible(false);
      });
    });

    // Botão Superior Direito
    this.botaoDois = this.add.image(737, 414, 'botaoSuperiorDireito').setScale(1.2);
    this.botaoDois.setInteractive();
    this.botaoDois.on ('pointerdown', () => {
      this.sfx.play('clickSound'); // Toca o som de click
      this.add.image(737, 414,'botaoSuperiorDireitoAzul').setScale(1.2);
      acertouDois = true;
    });

    //botão inferior esquerdo
    this.botaoTres = this.add.image(468, 537, 'botaoInferiorEsquerdo').setScale(1.2);
    this.botaoTres.setInteractive();
    this.botaoTres.on ('pointerdown', () => {
      this.sfx.play('clickSound'); // Toca o som de click
      // Define o comportamento ao clicar no botão, mostrando uma mensagem de que a alternativa está incorreta
      this.avisoErro = this.add.image(600, 430,'mensagemErro').setScale(1.2);
      this.botaoOk = this.add.image(600, 466, 'botaoOk').setScale(1.2);
      this.botaoOk.setInteractive();
      this.botaoOk.on ('pointerdown', () => {
        this.sfx.play('clickSound'); // Toca o som de click
        this.botaoOk.disableInteractive();
        this.botaoOk.setVisible(false);
        this.avisoErro.setVisible(false);
      });
    });

        this.botaoQuatro = this.add.image(737, 537, 'botaoInferiorDireito').setScale(1.2);
        this.botaoQuatro.setInteractive();
        this.botaoQuatro.on ('pointerdown', () => {
            this.sfx.play('clickSound'); // Toca o som de click
            this.add.image(737, 537,'botaoInferiorDireitoAzul').setScale(1.2);
            acertouQuatro = true;
        });

    // Botão para prosseguir para a próxima cena, visível apenas após atingir um número suficiente de acertos.
    this.botaoProximo = this.add.image(1000, 640, "proximo");
    this.botaoProximo.setInteractive();
    this.botaoProximo.on("pointerdown", () => {
      this.sfx.play("clickSound"); // Toca o som de click
      this.scene.stop("TarefasMeta"); // Para a cena atual.
      this.scene.start("PurchaseOrder"); // Inicia a cena seguinte.
    });
  }

  // Método update é chamado repetidamente a cada frame do jogo.
  update() {
    // Verifica a quantidade de acertos de segurança para controlar a visibilidade do botão próximo.
    if (acertouDois == true && acertouQuatro == true) {
      this.botaoProximo.setVisible(true);
      this.botaoProximo.setInteractive();
    } else {
      this.botaoProximo.setVisible(false);
      this.botaoProximo.disableInteractive();
    }
  }
}
