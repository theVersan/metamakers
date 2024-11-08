import { Metinha } from "../UI/metinha.js";
import { Dialogo } from "../UI/Dialogo.js";
import { gameState } from "../UI/gameState.js"; // Importa a cena de UI
import { SFX } from "../UI/sfx.js"; // Importa a cena de UI

export class EscritorioTres extends Phaser.Scene {
  entrou;
  completouMinigame;

  constructor() {
    super({ key: "EscritorioTres" }); // Chamada ao construtor da superclasse
  }

  init(dados) {
    this.completouMinigame = dados.minigameFinalizado;
  }

  preload() {
    // Carregamento de recursos
    this.load.tilemapTiledJSON("mapa3", "assets/escritorio3.json");
    this.load.image("1", "assets/1_Generic_Shadowless_48x48.png");
    this.load.image("19", "assets/19_Hospital_Shadowless_48x48.png");
    this.load.image("fundo", "assets/Room_Builder_48x48.png");
    this.load.image("escritorio", "assets/Modern_Office_48x48.png");
    this.load.image("zap", "assets/zap.png");
    this.metinha = new Metinha(this);
    this.metinha.preload();
    this.load.spritesheet("pontoExclamacao", "assets/pontoExclamacao.png", {
      frameWidth: 45,
      frameHeight: 48,
    });
    this.load.image("botEscritorio3", "assets/bots/whatsBot.png");
    this.sfx = new SFX(this);
    this.sfx.preload("elevador", "assets/elevador.mp3");
    this.sfx.preload("passos", "assets/passos.mp3");
  }

  create() {
    this.entrou = false;

    this.metinha.create(550, 150);
    this.sfx.create("passos", { loop: true, volume: 0.5 });
    // Inicialização do tilemap vazio
    this.mapa = this.make.tilemap({ key: "mapa3" });
    console.log(this.mapa);

    // Adicionando imagens ao tilemap
    const tilesetFundo = this.mapa.addTilesetImage(
      "Room_Builder_48x48",
      "fundo"
    );
    const tileset1 = this.mapa.addTilesetImage(
      "1_Generic_Shadowless_48x48",
      "1"
    );
    const tileset19 = this.mapa.addTilesetImage(
      "19_Hospital_Shadowless_48x48",
      "19"
    );
    const tilesetEscritorio = this.mapa.addTilesetImage(
      "Modern_Office_48x48",
      "escritorio"
    );
    const tilesetZap = this.mapa.addTilesetImage("zap", "zap");

    // Criação de camadas do tilemap
    this.fundo = this.mapa.createLayer("fundo", tilesetFundo, 0, 0);
    this.zap = this.mapa.createLayer("zap", tilesetZap, 0, 0);
    this.elevador = this.mapa.createLayer("elevador1", tileset1, 0, 0);
    this.moveis = this.mapa.createLayer(
      "moveis office",
      tilesetEscritorio,
      0,
      0
    );
    this.pcs = this.mapa.createLayer("pcs office", tilesetEscritorio, 0, 0);
    this.botao = this.mapa.createLayer("botao office", tilesetEscritorio, 0, 0);
    this.office = this.mapa.createLayer("office", tilesetEscritorio, 0, 0);
    this.dezenove = this.mapa.createLayer("19", tileset19, 0, 0);
    this.chaoParede = this.mapa.createLayer(
      "chaoparede room builder",
      tileset19,
      0,
      0
    );
    this.borda = this.mapa.createLayer(
      "borda room builder",
      tilesetFundo,
      0,
      0
    );
    this.estante = this.mapa.createLayer(
      "estante office",
      tilesetEscritorio,
      0,
      0
    );

    // Ativando o boolean que criamos no mapa
    this.moveis.setCollisionByProperty({ colisor: true });
    this.pcs.setCollisionByProperty({ colisor: true });
    this.botao.setCollisionByProperty({ colisor: true });
    this.office.setCollisionByProperty({ colisor: true });
    this.dezenove.setCollisionByProperty({ colisor: true });
    this.borda.setCollisionByProperty({ colisor: true });
    this.estante.setCollisionByProperty({ colisor: true });

    // Criando a colisão entre a layer com a propriedade de colisão e a sprite desejada (no caso, o "personagem")
    this.physics.add.collider(this.metinha.sprite, this.moveis);
    this.physics.add.collider(this.metinha.sprite, this.pcs);
    this.physics.add.collider(this.metinha.sprite, this.botao);
    this.physics.add.collider(this.metinha.sprite, this.office);
    this.physics.add.collider(this.metinha.sprite, this.dezenove);
    this.physics.add.collider(this.metinha.sprite, this.borda);
    this.physics.add.collider(this.metinha.sprite, this.estante);

    // Configurar interação do personagem com a porta
    this.physics.world.setBounds(
      0,
      0,
      this.mapa.widthInPixels,
      this.mapa.heightInPixels,
      true,
      true,
      true,
      true
    );

    if (this.completouMinigame) {
      this.dialogo = new Dialogo(this, "botEscritorio3", true);
      this.dialogo.adicionarDialogos([
        "Antes de eu continuar… Deixa só eu responder uma mensagem aqui. Hmm… Me perdoe a indelicadeza",
        "Sim, agora sim. Que maravilha! Você completou mais uma etapa do Supplier Journey!",
        "Siga até o elevador da esquerda para subir até o andar 4. Lá você encontrará o Messenbot, que irá te guiar durante a etapa de goods / service delivery",
        "Até lá, foi um prazer te conhecer, Metinha. Se precisar de algo, pode me mandar um 'zap', viu?",
      ]);
      this.dialogo.iniciarDialogos();
    } else {
      this.dialogo = new Dialogo(this, "botEscritorio3", false);
      this.dialogo.adicionarDialogos([
        "Olá Metinha, seja bem vindo ao andar 3!",
        "Eu sou o Whatsbot e irei te guiar através da etapa de contracting",
        "Siga até o computador indicado e interaja com o chat",
      ]);
      this.dialogo.iniciarDialogos();
    }

    // Adicionamos troca de cena
    this.entradaEscritorioQuatro = this.add.rectangle(500, 95, 90, 10);
    this.physics.add.existing(this.entradaEscritorioQuatro);

    this.entradaEscritorioDois = this.add.rectangle(700, 95, 90, 10);
    this.physics.add.existing(this.entradaEscritorioDois);

    this.sfx.create("elevador", { loop: false, volume: 0.5 });
    // Verificar sobreposição
    this.physics.add.overlap(
      this.metinha.sprite,
      this.entradaEscritorioQuatro,
      () => {
        // Inicia imediatamente o fadeOut ao detectar a colisão
        if (!this.entrou) {
          this.entrou = true;

          this.cameras.main.fadeOut(1500, 0, 0, 0);
          this.sfx.play("elevador");

          // Aguarda a conclusão do fadeOut para mudar de cena
          this.cameras.main.on(
            "camerafadeoutcomplete",
            () => {
              this.scene.start("EscritorioQuatro");
              this.scene.stop("EscritorioTres");
              this.sfx.stop("elevador");
            },
            this
          );
        }
      },
      null,
      this
    );
    // Verificar sobreposição
    this.physics.add.overlap(
      this.metinha.sprite,
      this.entradaEscritorioDois,
      () => {
        // Inicia imediatamente o fadeOut ao detectar a colisão
        if (!this.entrou) {
          this.entrou = true;

          this.cameras.main.fadeOut(1500, 0, 0, 0);
          this.sfx.play("elevador");

          // Aguarda a conclusão do fadeOut para mudar de cena
          this.cameras.main.on(
            "camerafadeoutcomplete",
            () => {
              this.scene.start("EscritorioDois");
              this.scene.stop("EscritorioTres");
              this.sfx.stop("elevador");
            },
            this
          );
        }
      },
      null,
      this
    );
    // Criando a animação da exclamação
    this.anims.create({
      key: "alertaExclamacao",
      frames: this.anims.generateFrameNumbers("pontoExclamacao", {
        start: 0,
        end: 1,
      }),
      frameRate: 3,
      repeat: -1,
    });

    // Adicionando a animação de exclamação
    this.exclamacao = this.add.sprite(152, 250, "pontoExclamacao");
    this.exclamacao.play("alertaExclamacao");

    // MinigameAndarTres
    this.notebookAndarTres = this.add
      .rectangle(170, 262, 150, 150, 0x000000, 0)
      .setScale(0.9);
    this.physics.add.existing(this.notebookAndarTres);

    // Criando a animação da tecla E de interação
    this.anims.create({
      key: "teclaEAnim",
      frames: this.anims.generateFrameNumbers("teclaE", { start: 0, end: 1 }),
      frameRate: 3,
      repeat: -1,
    });

    // Criação da tecla de interação
    this.teclaDeInteracao = this.add.sprite(300, 300, "teclaE");
    this.teclaDeInteracao.play("teclaEAnim");
    this.teclaDeInteracao.setVisible(false);

    // Um retângulo como exemplo de personagem (Apagar completamente)
    this.whatsbot = this.add.sprite(362, 242, "botEscritorio3").setScale(1.15);

    //plataforma para colisão com a parede
    this.parede = this.add.rectangle(600, 40, 1200, 100);
    this.physics.add.existing(this.parede);
    this.parede.body.setImmovable(true);
    this.physics.add.collider(this.metinha.sprite, this.parede);

    this.paredeFace = this.add.rectangle(360, 240, 60, 80);
    this.physics.add.existing(this.paredeFace);
    this.paredeFace.body.setImmovable(true);
    this.physics.add.collider(this.metinha.sprite, this.paredeFace);

    // Criando um evento para reconhecer se a tecla "E" está pressionada
    this.input.keyboard.on(
      "keydown-E",
      function () {
        if (
          this.physics.world.overlap(
            this.notebookAndarTres,
            this.metinha.sprite
          )
        ) {
          if (!this.entrou) {
            this.entrou = true;
            this.scene.start("MinijogoTres");
            this.scene.stop("EscritorioTres");
          }
        }
      },
      this
    );
  }

  update() {
    this.metinha.update();

    // Atualiza a posição do botão de interações em relação ao Metinha
    this.teclaDeInteracao.x = this.metinha.sprite.x;
    this.teclaDeInteracao.y = this.metinha.sprite.y - 70;

    // Verifique a sobreposição entre o jogador e o NPC
    if (
      this.physics.world.overlap(this.metinha.sprite, this.notebookAndarTres)
    ) {
      this.teclaDeInteracao.setVisible(true);
    } else {
      this.teclaDeInteracao.setVisible(false);
    }
  }
}
