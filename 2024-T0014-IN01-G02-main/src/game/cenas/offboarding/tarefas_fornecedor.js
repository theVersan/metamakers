import { SFX } from "../../UI/sfx.js";
// Variáveis para contar os acertos na cena TarefasFornecedor
var acertoUm = false;
var acertoDois = false;
var acertoTres = false;

// Define a classe TarefasFornecedor representando uma cena do jogo
export class TarefasFornecedor extends Phaser.Scene {
  constructor() {
    super({ key: "TarefasFornecedor" }); // Chama o construtor da classe pai com a chave da cena.
  }

  // Método preload carrega os assets necessários para a cena.
  preload() {
    // Carregamento das imagens usadas na cena de mensagem, incluindo o fundo, botões e avisos de erro.
    this.load.image("fundoMensagem", "assets/mensagem.png");
    this.load.image('botaoUm', 'assets/mensagem_botao_um.png');
    this.load.image('botaoUmAzul', 'assets/mensagem_botao_um_azul.png');
    this.load.image('botaoDois', 'assets/mensagem_botao_dois.png');
    this.load.image('botaoDoisAzul', 'assets/mensagem_botao_dois_azul.png');
    this.load.image('botaoTres', 'assets/mensagem_botao_tres.png');
    this.load.image('botaoTresAzul', 'assets/mensagem_botao_tres_azul.png');
    this.load.image('botaoQuatro', 'assets/mensagem_botao_quatro.png');
    this.load.image('avisoErro', 'assets/opcao_incorreta.png');
    this.load.image('botaoOk', 'assets/ok.png');
    this.load.image('next', 'assets/proximo.png');
    // Nota-se a carga de botões com duas versões: normal e azul (indicando seleção ou acerto).

    // Carrega o som de click das opções de contrato
    this.sfx = new SFX(this);
    this.sfx.preload('clickSound', 'assets/sounds/mouseClick.mp3');
  }

  // Método create configura os objetos da cena quando esta é iniciada.
  create() {
    // Cria o som de click
    this.sfx.create('clickSound');

    // Adiciona a imagem de fundo e ajusta sua escala.
    this.add.image(600, 430, "fundoMensagem").setScale(1.2);

    // Configuração e interatividade dos botões. Ao serem clicados, mudam para sua versão azul e incrementam a contagem de acertos.
    // Primeiro botão:
    this.botaoUm = this.add.image(472, 420, "botaoUm").setScale(1.2);
    this.botaoUm.setInteractive();
    this.botaoUm.on("pointerdown", () => {
      this.sfx.play("clickSound"); // Toca o som de click
      this.add.image(472, 420, "botaoUmAzul").setScale(1.2);
      acertoUm = true;
    });

    // Configuração similar para os outros botões, com a particularidade de que um deles, ao ser clicado, exibe uma mensagem de erro ao invés de incrementar a contagem de acertos.

    this.botaoDois = this.add.image(747, 423, 'botaoDois').setScale(1.2);
      this.botaoDois.setInteractive();
      this.botaoDois.on ('pointerdown', () => {
        this.sfx.play('clickSound'); // Toca o som de click
        this.add.image(747, 423,'botaoDoisAzul').setScale(1.2);
        acertoDois = true;
      });

      this.botaoTres = this.add.image(472, 545, 'botaoTres').setScale(1.2);
      this.botaoTres.setInteractive();
      this.botaoTres.on ('pointerdown', () => {
        this.sfx.play('clickSound'); // Toca o som de click
        this.add.image(472, 545,'botaoTresAzul').setScale(1.2);
        acertoTres = true;
      });

      this.botaoQuatro = this.add.image(747, 545, 'botaoQuatro').setScale(1.2);
      this.botaoQuatro.setInteractive();
      this.botaoQuatro.on ('pointerdown', () => {
        this.sfx.play('clickSound'); // Toca o som de click
        this.avisoErro = this.add.image(600, 430,'avisoErro').setScale(1.2);
        this.botaoOk = this.add.image(600, 466, 'botaoOk').setScale(1.2);
        this.botaoOk.setInteractive();
        this.botaoOk.on ('pointerdown', () => {
          this.sfx.play('clickSound'); // Toca o som de click
          this.botaoOk.setInteractive(false);
          this.botaoOk.setVisible(false);
          this.avisoErro.setVisible(false);
        });
      });
    
    // Botão para avançar para a próxima cena, visível apenas após acertar
    this.botaoProximaCena = this.add.image(1000, 640, "next");
    this.botaoProximaCena.setInteractive();
    this.botaoProximaCena.on("pointerdown", () => {
      this.sfx.play("clickSound"); // Toca o som de click
      this.scene.stop("TarefasFornecedor"); // Para a cena atual.
      this.scene.start("TarefasMeta"); // Inicia a cena de segurança.
    });
  }

  // Método update é chamado repetidamente a cada frame do jogo.
  update() {
    // Verifica a quantidade de acertos para controlar a visibilidade do botão de próxima cena.
    if (acertoUm == true && acertoDois == true && acertoTres == true) {
      this.botaoProximaCena.setVisible(true);
      this.botaoProximaCena.setInteractive(true);
    } else {
      this.botaoProximaCena.setVisible(false);
      this.botaoProximaCena.setInteractive(false);
    }
  }
}
