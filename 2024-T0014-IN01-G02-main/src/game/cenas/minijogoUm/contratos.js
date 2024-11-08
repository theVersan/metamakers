import { Dialogo } from "../../UI/Dialogo.js"; // Importa a cena de UI

/**
 * Representa a cena Contratos no jogo.
 * Esta cena exibe uma imagem de um caderno e várias pastas com as quais o jogador pode interagir.
 * Clicar em uma pasta irá parar a cena Contratos e iniciar uma cena de contrato específica.
 */
export class Contratos extends Phaser.Scene {
  dados;

  constructor() {
    super({ key: "Contratos" });
  }

  init(dados) {
    this.dados = dados;
    if (this.dados.acertos === 5) {
      this.scene.start("Escritorio", { minigameFinalizado: true });
    }
  }

  //Pré-carrega os recursos necessários para a cena.
  preload() {
    this.load.image("notebook", "assets/notebook.png");
    this.load.image("pastas", "assets/pasta.png");
    this.load.image("check", "assets/check.png");
    this.load.image("deny", "assets/deny.png");
    // load do audio de Click das pastas do computador
    this.load.audio("click", "assets/sounds/mouseClick.mp3");
  }

  //Cria os objetos do jogo e configura a cena.

  create() {
    this.add.image(600, 430, "notebook").setScale(2);

    this.pastaUm = this.add.image(350, 300, "pastas").setScale(8);
    this.pastaDois = this.add.image(600, 300, "pastas").setScale(8);
    this.pastaTres = this.add.image(850, 300, "pastas").setScale(8);
    this.pastaQuatro = this.add.image(475, 425, "pastas").setScale(8);
    this.pastaCinco = this.add.image(725, 425, "pastas").setScale(8);

    this.pastaUm.setInteractive();
    this.pastaDois.setInteractive();
    this.pastaTres.setInteractive();
    this.pastaQuatro.setInteractive();
    this.pastaCinco.setInteractive();

    // Quando clicar na pasta
    this.pastaUm.on("pointerdown", () => {
      this.scene.stop("Contratos");
      var clickSound = this.sound.add("click");
      clickSound.play();
      this.scene.start("ContratoUm", this.dados);
    });

    this.pastaDois.on("pointerdown", () => {
      this.scene.stop("Contratos");
      var clickSound = this.sound.add("click");
      clickSound.play();
      this.scene.start("ContratoDois", this.dados);
    });
    this.pastaTres.on("pointerdown", () => {
      this.scene.stop("Contratos");
      var clickSound = this.sound.add("click");
      clickSound.play();
      this.scene.start("ContratoTres", this.dados);
    });
    this.pastaQuatro.on("pointerdown", () => {
      this.scene.stop("Contratos");
      var clickSound = this.sound.add("click");
      clickSound.play();
      this.scene.start("ContratoQuatro", this.dados);
    });
    this.pastaCinco.on("pointerdown", () => {
      this.scene.stop("Contratos");
      var clickSound = this.sound.add("click");
      clickSound.play();
      this.scene.start("ContratoCinco", this.dados);
    });

    //implementação do dialogo
    this.dialogo = new Dialogo(this, "botEscritorio1", true);
    this.dialogo.adicionarDialogos([
      "Bom, pense que aqui você está numa espécie de marketplace, mas de fornecedores!! Aqui você precisará selecionar os que forem mais pertinentes para o que procuramos.",
      "Pense que é necessário levar em conta alguns fatores como: KPI, reputação, taxa de diversidade e também o background!",
      "Depois, se puder, me dê um feedback do que achou! (seja um like, um amei, um haha ou até grr), se quiser mais joguinhos depois desse não esquece de dar uma passada no facebook gaming pra jogar com seus colegas!",
    ]);
    this.dialogo.iniciarDialogos();
  }
}
