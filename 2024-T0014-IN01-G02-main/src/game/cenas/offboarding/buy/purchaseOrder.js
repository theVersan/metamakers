export class PurchaseOrder extends Phaser.Scene {
  constructor() {
    super({ key: "PurchaseOrder" });
  }
  
  // Pré-carrega as imagens necessárias para a cena
  preload() {
    this.load.image('fundoPurchaseOrder', 'assets/purchase_orders.png')
    this.load.image('fundoPurchaseOrderClosed', 'assets/po_closed.png');
    this.load.image('botaoTresPontos', 'assets/invoices_tres_pontos.png');
    this.load.image('botaoInvoice', 'assets/invoice_botao.png');
    this.load.image('opcoes', 'assets/opcoes_purchase_order.png');
    this.load.image('botaoCloseLines', 'assets/close_lines_botao.png');
    this.load.image('instrucaoUm', 'assets/instrucao_close_po_um.png');
    this.load.image('instrucaoDois', 'assets/instrucao_close_po_dois.png');
  }

  // Cria os elementos da cena
  create(){
    this.add.image(600, 430, 'fundoPurchaseOrder').setScale(1.2);

    //this.fundoClosed = this.add.image(600, 430, 'fundoPurchaseOrderClosed').setScale(1.2);
    //this.fundoClosed.setVisible(false);

    this.instrucaoUm = this.add.image(250, 610, 'instrucaoUm');

    this.botaoTresPontos = this.add.image(845, 402, 'botaoTresPontos').setScale(1.2);
    this.botaoTresPontos.setInteractive();
    this.botaoTresPontos.on ('pointerdown', () => {
    this.instrucaoUm.setVisible(false);
    this.add.image(250, 610, 'instrucaoDois');
    this.opcoes = this.add.image(730, 456,'opcoes').setScale(1.2);
    this.botaoClose = this.add.image(756, 500, 'botaoCloseLines').setScale(1.3);
    this.botaoClose.setInteractive();
    this.botaoClose.on ('pointerdown', () => {
      this.scene.stop("PurchaseOrder");
      this.scene.start("CloseLines");
    });
    })

  }

  update(){

  }
}