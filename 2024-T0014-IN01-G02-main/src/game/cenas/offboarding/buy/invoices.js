// Classe responsável pela cena de faturas
export class Invoices extends Phaser.Scene {
  constructor() {
    super({ key: "Invoices" });
  }

  // Pré-carrega os recursos necessários para a cena
  preload() {
    this.load.image("fundoInvoices", "assets/invoices_pc.png");
    this.load.image("sair", "assets/sair.png");
  }

  // Cria os elementos da cena
  create() {
    this.add.image(600, 430, "fundoInvoices").setScale(1.2);

    // Adiciona um botão para sair da cena e iniciar a cena 'AndarSeis'
    this.botaoSair = this.add.image(1000, 640, "sair");
    this.botaoSair.setInteractive();
    this.botaoSair.on("pointerdown", () => {
      this.scene.stop("Invoices");
      this.scene.start("EscritorioSeis", { minigameFinalizado: true });
    });
  }

  // Atualiza a cena
  update() {}
}
