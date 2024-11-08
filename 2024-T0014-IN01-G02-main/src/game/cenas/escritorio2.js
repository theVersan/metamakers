import { Metinha } from "../UI/metinha.js";
import { Dialogo } from "../UI/Dialogo.js";
import { gameState } from "../UI/gameState.js"; // Importa a cena de UI
import { SFX } from "../UI/sfx.js"; // Importa a cena de UI

export class EscritorioDois extends Phaser.Scene {
  entrou;
  completouMinigame;

  constructor() {
    super({ key: "EscritorioDois" }); // Chamada ao construtor da superclasse
  }

  init(dados) {
    this.completouMinigame = dados.minigameFinalizado;
  }

  preload() {
    // Carregamento de recursos
    this.load.tilemapTiledJSON("mapa2", "assets/escritorio2.json");
    this.load.image("1", "assets/1_Generic_Shadowless_48x48.png");
    this.load.image("2", "assets/2_LivingRoom_Shadowless_48x48.png");
    this.load.image("8", "assets/8_Gym_Shadowless_48x48.png");
    this.load.image("19", "assets/19_Hospital_Shadowless_48x48.png");
    this.load.image("fundo", "assets/Room_Builder_48x48.png");
    this.load.image("escritorio", "assets/Modern_Office_48x48.png");
    this.load.image("chaoGradiente", "assets/gradientpixel.png");
    this.load.image("instaAntigo", "assets/instaant (1).png");
    this.load.image("instaAtual", "assets/instapix.png");
    this.load.spritesheet("pontoExclamacao", "assets/pontoExclamacao.png", {
      frameWidth: 45,
      frameHeight: 48,
    });
    this.load.spritesheet("metinhaSprite", "assets/spriteTopdown1.png", {
      frameWidth: 65,
      frameHeight: 106,
    });
    this.metinha = new Metinha(this);
    this.metinha.preload();
    this.load.image("botEscritorio2", "assets/bots/novoInstaBot.png");
    this.sfx = new SFX(this);
    this.sfx.preload("elevador", "assets/elevador.mp3");
    this.sfx.preload("passos", "assets/passos.mp3");
  }

  create() {
    this.entrou = false;

    // Inicialização do tilemap vazio
    this.mapa = this.make.tilemap({ key: "mapa2" });
    console.log(this.mapa);
    this.sfx.create("passos", { loop: true, volume: 0.5 });
    // Adicionando imagens ao tilemap
    const tileset1 = this.mapa.addTilesetImage(
      "1_Generic_Shadowless_48x48",
      "1"
    );
    const tileset2 = this.mapa.addTilesetImage(
      "2_LivingRoom_Shadowless_48x48",
      "2"
    );
    const tileset8 = this.mapa.addTilesetImage("8_Gym_Shadowless_48x48", "8");
    const tileset19 = this.mapa.addTilesetImage(
      "19_Hospital_Shadowless_48x48",
      "19"
    );
    const tilesetFundo = this.mapa.addTilesetImage(
      "Room_Builder_48x48",
      "fundo"
    );
    const tilesetEscritorio = this.mapa.addTilesetImage(
      "Modern_Office_48x48",
      "escritorio"
    );
    const chaoGradiente = this.mapa.addTilesetImage(
      "gradientpixel",
      "chaoGradiente"
    );
    const instaAntigo = this.mapa.addTilesetImage(
      "instaant (1)",
      "instaAntigo"
    );
    const instaAtual = this.mapa.addTilesetImage("instapix", "instaAtual");

    // Criação de camadas do tilemap
    this.gradient = this.mapa.createLayer("gradient", chaoGradiente, 0, 0);
    this.fundoroom = this.mapa.createLayer("fundoroom", tilesetFundo, 0, 0);
    this.tresdroom = this.mapa.createLayer("3droom", tilesetFundo, 0, 0);
    this.tresdroom2 = this.mapa.createLayer("3d2room", tilesetFundo, 0, 0);
    this.instaant = this.mapa.createLayer("instaant", instaAntigo, 0, 0);
    this.instapix = this.mapa.createLayer("instapix", instaAtual, 0, 0);
    this.cadofice = this.mapa.createLayer("cadofice", tilesetEscritorio, 0, 0);
    this.office = this.mapa.createLayer("ofice", tilesetEscritorio, 0, 0);
    this.sofa = this.mapa.createLayer("sofa2", tileset2, 0, 0);
    this.cadcimaofice = this.mapa.createLayer(
      "cadcimaofice",
      tilesetEscritorio,
      0,
      0
    );
    this.hosp19 = this.mapa.createLayer("hosp19", tileset19, 0, 0);
    this.decofice = this.mapa.createLayer("decofice", tilesetEscritorio, 0, 0);
    this.gym = this.mapa.createLayer("gym", tileset8, 0, 0);
    this.elev1 = this.mapa.createLayer("elev1", tileset1, 0, 0);
    this.botao1 = this.mapa.createLayer("botao1", tileset1, 0, 0);
    this.borda = this.mapa.createLayer("borda", tilesetFundo, 0, 0);

    // Ativando o boolean que criamos no mapa
    this.tresdroom.setCollisionByProperty({ colisor: true });
    // this.tresdroom2.setCollisionByProperty({ colisor: true });
    this.instaant.setCollisionByProperty({ colisor: true });
    this.instapix.setCollisionByProperty({ colisor: true });
    this.cadofice.setCollisionByProperty({ colisor: true });
    this.office.setCollisionByProperty({ colisor: true });
    this.sofa.setCollisionByProperty({ colisor: true });
    this.cadcimaofice.setCollisionByProperty({ colisor: true });
    this.hosp19.setCollisionByProperty({ colisor: true });
    this.decofice.setCollisionByProperty({ colisor: true });
    this.gym.setCollisionByProperty({ colisor: true });
    this.elev1.setCollisionByProperty({ colisor: true });
    this.botao1.setCollisionByProperty({ colisor: true });
    this.borda.setCollisionByProperty({ colisor: true });

    // Criar o personagem metinha
    this.metinha.create(550, 150);

    // Criando a colisão entre a layer com a propriedade de colisão e a sprite desejada (no caso, o "personagem")
    this.physics.add.collider(this.metinha.sprite, this.tresdroom);
    // this.physics.add.collider(this.metinha.sprite, this.tresdroom2);
    this.physics.add.collider(this.metinha.sprite, this.instaant);
    this.physics.add.collider(this.metinha.sprite, this.instapix);
    this.physics.add.collider(this.metinha.sprite, this.cadofice);
    this.physics.add.collider(this.metinha.sprite, this.office);
    this.physics.add.collider(this.metinha.sprite, this.sofa);
    this.physics.add.collider(this.metinha.sprite, this.cadcimaofice);
    this.physics.add.collider(this.metinha.sprite, this.hosp19);
    this.physics.add.collider(this.metinha.sprite, this.decofice);
    this.physics.add.collider(this.metinha.sprite, this.gym);
    this.physics.add.collider(this.metinha.sprite, this.elev1);
    this.physics.add.collider(this.metinha.sprite, this.botao1);
    this.physics.add.collider(this.metinha.sprite, this.borda);

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
      this.dialogo = new Dialogo(this, "botEscritorio2", true);
      this.dialogo.adicionarDialogos([
        "O quê, você já acabou?",
        "Só um momento, estou terminando de postar um reels...",
        "Muito bem, agora você está pronto para prosseguir para os próximos andares",
        "Siga até o elevador e suba para o terceiro andar, onde você se encontrará com o Whatsbot",
        "Lá você aprenderá sobre a etapa de contracting... Não se preocupe, todas as suas informações estarão seguras com a criptografia de ponta a ponta",
        "Por enquanto é isso, e não se esqueça de curtir o meu reels!",
      ]);
      this.dialogo.iniciarDialogos();
    } else {
      this.dialogo = new Dialogo(this, "botEscritorio2", false);
      this.dialogo.adicionarDialogos([
        "Você parecia... Um pouco mais alto nas fotos...",
        "De qualquer forma, aqui você vai se atualizar sobre a etapa de Onboarding",
        "Não se assuste com a aparente complexidade do processo, você aprenderá mais rápido do que em um vídeo de stories!",
        "Para iniciar seu aprendizado, arrasta para ci--, desculpe, prossiga até o computador a seguir",
      ]);
      this.dialogo.iniciarDialogos();
    }

    // Adicionamos troca de cena
    this.entradaEscritorioTres = this.add.rectangle(500, 95, 90, 10);
    this.physics.add.existing(this.entradaEscritorioTres);

    this.entradaEscritorioUm = this.add.rectangle(650, 95, 90, 10);
    this.physics.add.existing(this.entradaEscritorioUm);

    this.sfx.create("elevador", { loop: false, volume: 0.5 });
    // Verificar sobreposição
    this.physics.add.overlap(
      this.metinha.sprite,
      this.entradaEscritorioTres,
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
              this.scene.start("EscritorioTres");
              this.scene.stop("EscritorioDois");
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
      this.entradaEscritorioUm,
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
              this.scene.start("Escritorio");
              this.scene.stop("EscritorioDois");
              this.sfx.stop("elevador");
            },
            this
          );
        }
      },
      null,
      this
    );

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
    this.instabot = this.add.sprite(362, 242, "botEscritorio2").setScale(1.2);

    //plataforma para colisão com a parede
    this.parede = this.add.rectangle(600, 40, 1200, 100);
    this.physics.add.existing(this.parede);
    this.parede.body.setImmovable(true);
    this.physics.add.collider(this.metinha.sprite, this.parede);
    // Adiciona a colisão entre o jogador e o NPC
    this.paredeFace = this.add.rectangle(360, 240, 60, 80);
    this.physics.add.existing(this.paredeFace);
    this.paredeFace.body.setImmovable(true);
    this.physics.add.collider(this.metinha.sprite, this.paredeFace);

    this.paredeFace = this.add.rectangle(420, 390, 70, 160);
    this.physics.add.existing(this.paredeFace);
    this.paredeFace.body.setImmovable(true);
    this.physics.add.collider(this.metinha.sprite, this.paredeFace);

    this.paredeFace = this.add.rectangle(420, 610, 70, 120);
    this.physics.add.existing(this.paredeFace);
    this.paredeFace.body.setImmovable(true);
    this.physics.add.collider(this.metinha.sprite, this.paredeFace);

    this.paredeFace = this.add.rectangle(300, 420, 70, 120);
    this.physics.add.existing(this.paredeFace);
    this.paredeFace.body.setImmovable(true);
    this.physics.add.collider(this.metinha.sprite, this.paredeFace);

    this.paredeFace = this.add.rectangle(90, 420, 70, 120);
    this.physics.add.existing(this.paredeFace);
    this.paredeFace.body.setImmovable(true);
    this.physics.add.collider(this.metinha.sprite, this.paredeFace);

    this.paredeFace = this.add.rectangle(110, 580, 70, 100);
    this.physics.add.existing(this.paredeFace);
    this.paredeFace.body.setImmovable(true);
    this.physics.add.collider(this.metinha.sprite, this.paredeFace);

    this.paredeFace = this.add.rectangle(270, 580, 70, 100);
    this.physics.add.existing(this.paredeFace);
    this.paredeFace.body.setImmovable(true);
    this.physics.add.collider(this.metinha.sprite, this.paredeFace);

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
    this.exclamacao = this.add.sprite(912, 590, "pontoExclamacao");
    this.exclamacao.play("alertaExclamacao");

    this.notebookAndarDois = this.add
      .rectangle(955, 625, 100, 150, 0x000000, 0)
      .setScale(0.9);
    this.physics.add.existing(this.notebookAndarDois);
    this.physics.add.overlap(
      this.metinha.sprite,
      this.notebookAndarDois,
      () => {
        this.teclaDeInteracao.setVisible(true);
      }
    );
    this.input.keyboard.on(
      "keydown-E",
      function () {
        if (
          this.physics.world.overlap(
            this.notebookAndarDois,
            this.metinha.sprite
          )
        ) {
          if (!this.entrou) {
            this.entrou = true;
            this.scene.start("MinigameTPA");
            this.scene.stop("EscritorioDois");
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
      this.physics.world.overlap(this.notebookAndarDois, this.metinha.sprite)
    ) {
      this.teclaDeInteracao.setVisible(true);
    } else {
      this.teclaDeInteracao.setVisible(false);
    }
  }
}
