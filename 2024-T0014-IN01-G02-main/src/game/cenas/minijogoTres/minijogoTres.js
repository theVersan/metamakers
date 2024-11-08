import { Dialogo } from "../../UI/Dialogo.js"; // Importa a cena de UI
import { SFX } from "../../UI/sfx.js"; // Importa a classe SFX
export class MinijogoTres extends Phaser.Scene {
  constructor() {
    super({ key: "MinijogoTres" });
  }

  //Pré-carrega os recursos necessários para a cena.
  preload() {
    this.load.image("background", "assets/WhatsGame.png");
    this.load.image("check", "assets/check.png");
    this.load.image("deny", "assets/deny.png");
    this.load.image("button", "assets/whats_button.png");
    this.load.image("cinza", "assets/balaocinza.png");
    // Carrega o som de click das opções de contrato e instancia a classe SFX
    this.sfx = new SFX(this);
    this.sfx.preload('clickSound', 'assets/sounds/mouseClick.mp3');
  }

  //Cria os objetos do jogo e configura a cena.
  create() {
    // Cria o som de click
    this.sfx.create("clickSound");

    this.camera = this.cameras.main;
    // this.camera.setViewport(0, 0, 1536, 864);
    this.add.image(600, 430, "background").setScale(1.6);

    this.botao = this.add.image(600, 475, "button").setScale(3);

    this.add.text(300, 450, "Começar o Minigame", {
      fontSize: "45px",
      color: "#ffffff",
    });

    this.botao.setInteractive();

    // Quando clicar na pasta
    this.botao.on("pointerdown", () => {
      // Toca o som de click
      this.sfx.play("clickSound");
      
      this.passarDeCena();
    });

    this.dialogo = new Dialogo(this, "botEscritorio3", true);
    this.dialogo.adicionarDialogos([
      "Na etapa de contracting você deverá saber contratar negociação e execução; Obter aproveitamento de termos contratuais corretos e claramente definidos KPIs / SLAs; E trabalhar com S2P para garantir preço adequado para a interação com fornecedor      ",
      "Para isso você precisa conhecer alguns termos essenciais (LEIA COM ATENÇÃO!!!)",
      "KPIs (Key Performance Indicators) são métricas utilizadas para avaliar o sucesso ou o progresso de uma organização, projeto, processo ou atividade específica em relação aos seus objetivos e metas.",
      "SLA (Service Level Agreement) é um acordo de nível de serviço estabelecido entre um provedor de serviços e seus clientes. Este acordo define os padrões e as métricas pelos quais o serviço será medido e entregue.",
      "SOW (Statement of Work), em português Declaração de Trabalho, é um documento que descreve os detalhes e os requisitos de um projeto ou trabalho a ser realizado",
      "Um SOW tipicamente inclui os seguintes elementos: Objetivos do projeto; Escopo do trabalho; Cronograma; Recursos Necessários; Orçamento e custos; Critérios de aceitação; Termos e condições",
      "MSA (Master Service Agreement) É um contrato que estabelece os termos e condições gerais entre um provedor de serviços e um cliente. O MSA define os parâmetros gerais que regem a relação entre as duas partes e serve como base para futuros acordos específicos de trabalho ou projetos individuais.",
      "PO (Purchase Order): Um PO é um documento emitido por um comprador para um fornecedor, formalizando uma solicitação de compra de bens ou serviços. Ele geralmente inclui detalhes como a descrição dos itens ou serviços a serem adquiridos, quantidades, preços, termos de pagamento e outras condições específicas da transação.",
      "Conseguiu sacar tudo? Agora, tente responder esse questionário sobre esses conceitos...",
      "Clique na resposta que você achar pertinente!",
    ]);
    this.dialogo.iniciarDialogos();
  }

  //caso o botão certo seja escolhido pelo jogador
  passarDeCena() {
    this.scene.stop("MinijogoTres");
    this.scene.start("PerguntaUm");
  }

  update() {}
}
