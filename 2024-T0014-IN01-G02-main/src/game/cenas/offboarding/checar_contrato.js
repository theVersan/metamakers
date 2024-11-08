import { SFX } from "../../UI/sfx.js";
// Variáveis para armazenar se os checks foram marcados
var checkUm = false;
var checkDois = false;
var checkTres = false;

export class ChecarContrato extends Phaser.Scene {
  constructor() {
    super({ key: "ChecarContrato" });
  }
  
  preload() {
    // Carrega as imagens necessárias
    this.load.image('fundoContrato', 'assets/tarefas_do_contrato.png');
    this.load.image('boxChecked', 'assets/check_box.png');
    this.load.image('box', 'assets/Contrato_check(1).png');
    this.load.image('next', 'assets/proximo.png');
    this.load.image('explicacaoTarefasContrato', 'assets/explicacao_contrato.png');
    this.load.image('botaoOk', 'assets/ok.png');
    // Carrega o som de click das opções de contrato
    this.sfx = new SFX(this);
    this.sfx.preload('clickSound', 'assets/sounds/mouseClick.mp3');
  }

  create(){
    // Cria o som de click
    this.sfx.create('clickSound');

    // Adiciona a imagem de fundo do contrato
    this.add.image(600, 430, 'fundoContrato').setScale(1.2);

    
    // Adiciona o botão de check um
    this.botaoCheckUm = this.add.image(371, 406, 'box').setScale(1.3);
    this.botaoCheckUm.setInteractive();
    this.botaoCheckUm.on ('pointerdown', () => {
      //this.botaoCheckUm.disableInteractive();//impede que o botão seja clicado novamente
      this.add.image(371, 406, 'boxChecked').setScale(1);// Adiciona a imagem de check quando o botão é clicado
      checkUm = true;
    })

    // Adiciona o botão de check dois
    this.botaoCheckDois = this.add.image(371, 355, 'box').setScale(1.3);
    this.botaoCheckDois.setInteractive();
    this.botaoCheckDois.on ('pointerdown', () => {
      // Emite som de click quando o botão é clicado
      this.sfx.play('clickSound');
      
      // Adiciona a imagem de check quando o botão é clicado
      this.add.image(371, 355, 'boxChecked').setScale(1);
      checkDois = true;
    })

    // Adiciona o botão de check três
    this.botaoCheckTres = this.add.image(371, 457, 'box').setScale(1.3);
    this.botaoCheckTres.setInteractive();
    this.botaoCheckTres.on ('pointerdown', () => {
      // Emite som de click quando o botão é clicado
      this.sfx.play('clickSound');
      // Adiciona a imagem de check quando o botão é clicado
      this.add.image(371, 457, 'boxChecked').setScale(1);
      checkTres = true;
    })

    // Adiciona a imagem de explicação das tarefas do contrato
    this.explicacao = this.add.image(600, 430,'explicacaoTarefasContrato').setScale(1.2);
    // Adiciona o botão OK
    this.botaoOk = this.add.image(600, 508, 'botaoOk').setScale(1.2);
    this.botaoOk.setInteractive();
    this.botaoOk.on ('pointerdown', () => {
      // Emite som de click quando o botão é clicado
      this.sfx.play('clickSound');
      // Esconde o botão OK e a imagem de explicação quando o botão é clicado
      this.botaoOk.setInteractive(false);
      this.botaoOk.setVisible(false);
      this.explicacao.setVisible(false);
    });

    // Adiciona o botão de próximo
    this.botaoNext = this.add.image(1000, 640, 'next');
    this.botaoNext.setInteractive();
    this.botaoNext.on('pointerdown', () => {
      // Emite som de click quando o botão é clicado
      this.sfx.play('clickSound');
      // Para a cena atual e inicia a cena de mensagem quando o botão é clicado
      this.scene.stop("ChecarContrato");
      this.scene.start("TarefasFornecedor");
    })
  }

  update(){
    // Verifica se todos os checks foram marcados
    if(checkUm == true && checkDois == true && checkTres == true){
      // Mostra o botão de próximo quando todos os checks foram marcados
      this.botaoNext.setVisible(true);
      this.botaoNext.setInteractive(true);
    }
    else{
      // Esconde o botão de próximo quando nem todos os checks foram marcados
      this.botaoNext.setVisible(false);
      this.botaoNext.setInteractive(false);
    }
  }
}