import {SFX} from "../../UI/sfx.js";

export class FaturaUm extends Phaser.Scene {
  constructor() {
    super({ key: "FaturaUm" });
  }
  
  preload() {
    // Carrega as imagens necessárias
    this.load.image("notebook", "assets/notebook.png");
    this.load.image("check", "assets/check.png");
    this.load.image("deny", "assets/deny.png");
    
    // Carrega o som de click das opções de contrato
    this.sfx = new SFX(this);
    this.sfx.preload('clickSound', 'assets/sounds/mouseClick.mp3');
  }
  
  create() {
    // Cria o som de click
    this.sfx.create('clickSound');

    // Define a cor de fundo da cena
    this.cameras.main.setBackgroundColor('#ffffff');
    
    // Adiciona a imagem do notebook na posição desejada
    this.add.image(600, 430, "notebook").setScale(2);
  
    // Adiciona um retângulo branco para a área de conteúdo
    this.add.rectangle(600, 360, 600, 400, 0xffffff);
  
    // Adiciona a imagem do check (marca de seleção) e a torna interativa
    this.check = this.add.image(855, 535, "check").setScale(3);
    this.check.setInteractive();
  
    // Adiciona a imagem do deny (marca de negação) e a torna interativa
    this.deny = this.add.image(780, 535, "deny").setScale(3);
    this.deny.setInteractive();
    this.deny.on("pointerdown", () => {
    this.sfx.play('clickSound'); // Toca o som de click
    this.scene.stop("FaturaUm");
    this.scene.start("MinigameCinco");
    });

    // Adiciona os textos para os cabeçalhos das colunas
    this.add.text(350, 230, "Item", { fontSize: "20px", color: "0x000000" });
    this.add.text(520, 230, "Descrição", { fontSize: "20px", color: "0x000000" });
    this.add.text(710, 230, "Valor estimado", { fontSize: "20px", color: "0x000000" });
    
    // Adiciona as caixas de seleção e os textos para cada item
    this.checkBox1 = this.add.rectangle(375, 285, 25, 25, 0x000000).setInteractive();
    this.checkBox1.on("pointerdown", () => {
    this.sfx.play('clickSound'); // Toca o som de click
    this.checkSignal1 = this.add.image(375, 285, "check").setScale(1.5);
    });
    this.add.text(425, 275, "Brunch", { fontSize: "20px", color: "0x000000" });
    this.add.text(770, 275, "R$700~900", { fontSize: "20px", color: "0x000000" });

    this.checkBox2 = this.add.rectangle(375, 335, 25, 25, 0x000000).setInteractive();
    this.checkBox2.on("pointerdown", () => {
    this.sfx.play('clickSound'); // Toca o som de click
    this.checkSignal2 = this.add.image(375, 335, "check").setScale(1.5);
    });
    this.add.text(425, 325, "Fotografia", { fontSize: "20px", color: "0x000000" });
    this.add.text(770, 325, "R$700~900", { fontSize: "20px", color: "0x000000" });

    this.checkBox3 = this.add.rectangle(375, 385, 25, 25, 0x000000).setInteractive();
    this.checkBox3.on("pointerdown", () => {
    this.sfx.play('clickSound'); // Toca o som de click
    this.checkSignal3 = this.add.image(375, 385, "check").setScale(1.5);
    });
    this.add.text(425, 375, "Couvert Artístico", { fontSize: "20px", color: "0x000000" });
    this.add.text(770, 375, "R$400~500", { fontSize: "20px", color: "0x000000" });

    this.checkBox4 = this.add.rectangle(375, 435, 25, 25, 0x000000).setInteractive();
    this.checkBox4.on("pointerdown", () => {
    this.sfx.play('clickSound'); // Toca o som de click
    this.checkSignal4 = this.add.image(375, 435, "check").setScale(1.5);
    });
    this.add.text(425, 425, "Equipamento Som", { fontSize: "20px", color: "0x000000" });
    this.add.text(770, 425, "R$800~1000", { fontSize: "20px", color: "0x000000" });

    this.checkBox5 = this.add.rectangle(375, 485, 25, 25, 0x000000).setInteractive();
    this.checkBox5.on("pointerdown", () => {
    this.sfx.play('clickSound'); // Toca o som de click
    this.checkSignal5 = this.add.image(375, 485, "check").setScale(1.5);
    });
    this.add.text(425, 475, "Decoração", { fontSize: "20px", color: "0x000000" });
    this.add.text(770, 475, "R$700~800", { fontSize: "20px", color: "0x000000" });

    // Adiciona o texto para o cabeçalho principal
    this.add.text(350, 180, "Previsão de Fatura", { fontSize: "30px", color: "0x000000" });

  }
  
  update() {
    // Verifica se todas as caixas de seleção foram marcadas
    if(this.checkSignal1&&this.checkSignal2&&this.checkSignal3&&this.checkSignal4&&this.checkSignal5){
    // Se todas as caixas de seleção foram marcadas, ao clicar no check, a cena é encerrada e a próxima cena é iniciada
    this.check.on("pointerdown", ()=>{
      this.sfx.play('clickSound'); // Toca o som de click
      this.scene.stop("FaturaUm");
      this.scene.start("FaturaDois");
    })
    }
  }
}