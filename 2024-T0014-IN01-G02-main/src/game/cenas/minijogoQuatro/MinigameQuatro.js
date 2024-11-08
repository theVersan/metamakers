import { SFX } from "../../UI/sfx.js";

export class MinigameQuatro extends Phaser.Scene {
  constructor() {
    super({ key: "MinigameQuatro" });
  }

  preload() {
    // Carrega as imagens necessárias
    this.load.image("prancheta", "assets/pran.png");
    this.load.image("check", "assets/check.png");
    this.load.image("rest", "assets/reset.png");
    this.load.image("incorreto", "assets/erro.png");
    this.load.image("dj", "assets/dj.png");
    this.load.image("jbl", "assets/equisom.png");
    this.load.image("fotografia", "assets/fotocamera.png");
    this.load.image("banquete", "assets/banquete.png");
    this.load.image("table", "assets/tabela.png");
    // Carrega o som de click das opções de contrato
    this.sfx = new SFX(this);
    this.sfx.preload('clickSound', 'assets/sounds/mouseClick.mp3');
  }

  create() {
    // Cria o som de click
    this.sfx.create('clickSound');

    this.cameras.main.setBackgroundColor('#ffffff');
    this.add.image(600, 430, "prancheta").setScale(2);
    
    this.add.image(700, 300, "dj").setScale(1);
    this.add.image(1000, 300, "jbl").setScale(1.2);
    this.add.image(1000, 600, "fotografia").setScale(1.3);
    this.add.image(700, 600, "banquete").setScale(1.5);
    this.add.image(850, 400, "table").setScale(3);

    // Define as variáveis de sinal como falsas
    this.signal1 = false;
    this.signal2 = false;
    this.signal3 = false;
    this.signal4 = false;
    this.signal5 = false;
    this.signal6 = false;
    
    // Adiciona o botão de check
    this.check = this.add.image(370, 650, "check").setScale(3);
    this.check.setInteractive();
    this.check.on("pointerdown", () => {
      this.sfx.play('clickSound'); // Toca o som de click

      // Verifica se todas as opções corretas foram selecionadas
      if (this.signal1 === true && this.signal3 === true && this.signal4 === true && this.signal5 === true && this.signal2 === false && this.signal6 === false) {
        // Para a cena atual e inicia a cena de vitória
        this.scene.stop("MinigameQuatro");
        this.scene.start("MinigameWin");
      }
    });

    // Adiciona o botão de reset
    this.reset= this.add.image(300, 650, "rest").setScale(0.09);
    this.reset.setInteractive();
    this.reset.on("pointerdown", () => {
      this.sfx.play('clickSound'); // Toca o som de click

      // Para a cena atual e reinicia a cena atual
      this.scene.stop("MinigameQuatro");
      this.scene.start("MinigameQuatro");
    });

    // Adiciona o botão de falha
    this.falha= this.add.image(420, 180, "incorreto").setScale(0.06);
    this.falha.setInteractive();
    this.falha.on("pointerdown", () => {
      this.sfx.play('clickSound'); // Toca o som de click
      // Para a cena atual e inicia a cena do escritório
      this.scene.stop("MinigameQuatro");
      this.scene.start("EscritorioQuatro");
    });

    // Adiciona as caixas de seleção e os textos correspondentes
    this.checkBox1 = this.add.rectangle(180, 220, 25, 25, 0x000000).setInteractive();
    this.checkBox1.on("pointerdown", () => {
      this.sfx.play('clickSound'); // Toca o som de click
      this.checkSignal1 = this.add.image(180, 220, "check").setScale(1.5);
      this.signal1 = true;
    });

    this.checkBox2 = this.add.rectangle(180, 280, 25, 25, 0x000000).setInteractive();
    this.checkBox2.on("pointerdown", () => {
      this.sfx.play('clickSound'); // Toca o som de click
      this.checkSignal2 = this.add.image(180, 280, "check").setScale(1.5);
      this.signal2 = true;
    });

    this.checkBox3 = this.add.rectangle(180, 340, 25, 25, 0x000000).setInteractive();
    this.checkBox3.on("pointerdown", () => {
      this.sfx.play('clickSound'); // Toca o som de click
      this.checkSignal3 = this.add.image(180, 340, "check").setScale(1.5);
      this.signal3 = true;
    });

    this.checkBox4 = this.add.rectangle(180, 400, 25, 25, 0x000000).setInteractive();
    this.checkBox4.on("pointerdown", () => {
      this.sfx.play('clickSound'); // Toca o som de click
      this.checkSignal4 = this.add.image(180, 400, "check").setScale(1.5);
      this.signal4 = true;
    });

    this.checkBox5 = this.add.rectangle(180, 460, 25, 25, 0x000000).setInteractive();
    this.checkBox5.on("pointerdown", () => {
      this.sfx.play('clickSound'); // Toca o som de click
      this.checkSignal5 = this.add.image(180, 460, "check").setScale(1.5);
      this.signal5 = true;
    });

    this.checkBox6 = this.add.rectangle(180, 520, 25, 25, 0x000000).setInteractive();
    this.checkBox6.on("pointerdown", () => {
      this.sfx.play('clickSound'); // Toca o som de click
      this.checkSignal6 = this.add.image(180, 520, "check").setScale(1.5);
      this.signal6 = true;
    });

    // Adiciona os textos das opções
    this.add.text(200, 205, "Brunch", { fontSize: "25px", color: "#000000" });
    this.add.text(200, 265, "Limpeza", { fontSize: "25px", color: "#000000" });
    this.add.text(200, 325, "Cover Artistico", { fontSize: "25px", color: "#000000" });
    this.add.text(200, 385, "Equip de som", { fontSize: "25px", color: "#000000" });
    this.add.text(200, 445, "Fotografia", { fontSize: "25px", color: "#000000" });
    this.add.text(200, 505, "Decoração", { fontSize: "25px", color: "#000000" });
   
    this.add.text(600, 150, "Cover Artistico", { fontSize: "25px", color: "#000000" });
    this.add.text(900, 150, "Equip de Som", { fontSize: "25px", color: "#000000" });
    this.add.text(650, 450, "Brunch", { fontSize: "25px", color: "#000000" });
    this.add.text(920, 450, "Fotografia", { fontSize: "25px", color: "#000000" });
  }

  update() {

  }

}  