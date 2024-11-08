export class CloseLines extends Phaser.Scene {
  constructor() {
    super({ key: "CloseLines" });
  }
  
  preload() {
    // Carrega as imagens necessárias
    this.load.image('closeLines', 'assets/purchase_order_closed.png');
    this.load.image('botaoInvoice', 'assets/invoice_botao.png');
    this.load.image('instrucao', 'assets/instrucao_invoice.png');
  }

  create(){
    // Adiciona a imagem "closeLines" na posição (600, 430) com escala de 1.2
    this.add.image(600, 430, 'closeLines').setScale(1.2);

    // Adiciona a imagem "instrucao" na posição (250, 610)
    this.add.image(250, 610, 'instrucao');

    // Adiciona o botão "botaoInvoice" na posição (393, 490) com escala de 1.3
    this.botaoInvoice = this.add.image(393, 484, 'botaoInvoice').setScale(1.3);
    this.botaoInvoice.setInteractive();
    // Define o evento de clique para o botão "botaoInvoice"
    this.botaoInvoice.on ('pointerdown', () => {
    // Para a cena "CloseLines"
    this.scene.stop("CloseLines");
    // Inicia a cena "Invoices"
    this.scene.start("Invoices");
    })
  }

  update(){

  }
}