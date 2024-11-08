import { Dialogo } from "../../UI/Dialogo.js"; // Importa a cena de UI
import { SFX } from "../../UI/sfx.js";
export class PerguntaUm extends Phaser.Scene {
  constructor() {
    super({ key: "PerguntaUm" });
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

    this.add.image(600, 450, "background").setScale(1.6);
    this.add.image(600, 320, "cinza").setScale(1).setDisplaySize(1000, 100);
    this.add.image(600, 530, "verde").setScale(1).setDisplaySize(1000, 95);
    this.add.image(600, 630, "verde").setScale(1).setDisplaySize(1000, 95);
    this.add.image(600, 730, "verde").setScale(1).setDisplaySize(1000, 95);

    this.perguntaUm = this.add.text(130, 280, " O que é um Statement of Work?", {
      fontSize: "50px",
      color: "#FFFFFF",
    });
    this.umAlternativaA = this.add.text(
      150,
      480,
      " A-) Ferramenta para avaliar e melhorar o desempenho da equipe em projetos e  \n através de questionários.",
      { fontSize: "30px", color: "#ffffff" }
    );
    this.umAlternativaB = this.add.text(
      150,
      580,
      " B-) Documento que descreve em detalhes os serviços específicos a \n serem prestados em um projeto ou contrato.",
      { fontSize: "30px", color: "#ffffff" }
    );
    this.umAlternativaC = this.add.text(
      150,
      690,
      " C-) Documento emitido por um comprador para um vendedor para confirmar \n um pedido de compra",
      { fontSize: "22px", color: "#ffffff" }
    );

    this.umAlternativaA.setInteractive();
    this.umAlternativaB.setInteractive();
    this.umAlternativaC.setInteractive();
    
    // Quando clicar na pasta
    this.umAlternativaA.on("pointerdown", () => {
      this.respostaIncorreta();
    });
    
    this.umAlternativaB.on("pointerdown", () => {
      this.sfx.play("clickSound");  // Toca o som de click
      this.add.image(600, 360, "check").setScale(7); // mensagem de confirmação
      this.respostaCorreta();
    });
    
    this.umAlternativaC.on("pointerdown", () => {
      this.sfx.play("clickSound");  // Toca o som de click
      this.add.image(600, 360, "deny").setScale(7); // adiciona mensagem de correção
      this.respostaIncorreta();
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
      "Conseguiu sacar tudo? Agora, tente responder esse questionário sobre esses conceitos:",
    ]);
    this.dialogo.iniciarDialogos();
  }

  // Para a cena "ContratoQuatro" e inicia a cena "Contratos"
  passarDeCena() {
    this.scene.stop("PerguntaUm");
    this.scene.start("PerguntaDois");
  }

  sairDeCena() {
    this.scene.stop("PerguntaUm");
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
    this.add.text(420, 380, " Escolha \n incorreta!", {
      fontSize: "50px",
      color: "#000000",
    });
    this.time.delayedCall(2000, this.sairDeCena, [], this); // espera 2s e avança de cena
  }

  update() {}
}