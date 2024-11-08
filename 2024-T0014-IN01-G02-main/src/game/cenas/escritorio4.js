import { Metinha } from "../UI/metinha.js";
import { Dialogo } from "../UI/Dialogo.js";
import { gameState } from "../UI/gameState.js"; // Importa a cena de UI
import { SFX } from "../UI/sfx.js"; // Importa a cena de UI

export class EscritorioQuatro extends Phaser.Scene {
  entrou;
  completouMinigame;

  constructor() {
    super({ key: "EscritorioQuatro" }); // Chamada ao construtor da superclasse
  }

  init(dados) {
    this.completouMinigame = dados.minigameFinalizado;
  }

  preload() {
    // Carregamento de recursos
    this.load.tilemapTiledJSON("mapa4", "assets/escritorio4.json");
    this.load.image("1", "assets/1_Generic_Shadowless_48x48.png");
    this.load.image("14", "assets/14_Basement_Shadowless_48x48.png");
    this.load.image("fundo", "assets/Room_Builder_48x48.png");
    this.load.image("escritorio", "assets/Modern_Office_48x48.png");
    this.load.image("balao", "assets/balao.png");
    this.load.image("mepa", "assets/MEPA.png");
    this.load.image("logo", "assets/messlogoo.png");
    this.load.image("botEscritorio4", "assets/messengerbot.png");
    this.load.spritesheet("pontoExclamacao", "assets/pontoExclamacao.png", {
      frameWidth: 45,
      frameHeight: 48,
    });
    this.metinha = new Metinha(this);
    this.metinha.preload();

    this.sfx = new SFX(this);
    this.sfx.preload("elevador", "assets/elevador.mp3");
    this.sfx.preload("passos", "assets/passos.mp3");
  }

  create() {
    console.log("oi");
    this.entrou = false;

    this.metinha.create(550, 150);
    this.sfx.create("passos", { loop: true, volume: 0.5 });
    // Inicialização do tilemap vazio
    this.mapa = this.make.tilemap({ key: "mapa4" });
    console.log(this.mapa);

    // Adicionando imagens ao tilemap
    const tileset1 = this.mapa.addTilesetImage(
      "1_Generic_Shadowless_48x48",
      "1"
    );
    const tileset14 = this.mapa.addTilesetImage(
      "14_Basement_Shadowless_48x48",
      "14"
    );
    const tilesetBalao = this.mapa.addTilesetImage("balao", "balao");
    const tilesetMepa = this.mapa.addTilesetImage("MEPA", "MEPA");
    const tilesetLogo = this.mapa.addTilesetImage("messlogoo", "logo");
    const tilesetFundo = this.mapa.addTilesetImage(
      "Room_Builder_48x48",
      "fundo"
    );
    const tilesetEscritorio = this.mapa.addTilesetImage(
      "Modern_Office_48x48",
      "escritorio"
    );

    // Criação de camadas do tilemap
    (this.fundo = this.mapa.createLayer("fundo", tilesetFundo, 0, 0)),
      (this.mess = this.mapa.createLayer("mess", tilesetLogo, 0, 0)),
      (this.sofa = this.mapa.createLayer("sofa14", tileset14, 0, 0)),
      (this.elevador = this.mapa.createLayer("elevador1", tileset1, 0, 0)),
      (this.mesameio = this.mapa.createLayer("mesameio1", tileset1, 0, 0)),
      (this.quadrobot = this.mapa.createLayer("quadrobot1", tileset1, 0, 0)),
      (this.balaomes = this.mapa.createLayer("balaomes", tilesetBalao, 0, 0)),
      (this.objofice = this.mapa.createLayer(
        "objofice",
        tilesetEscritorio,
        0,
        0
      )),
      (this.office = this.mapa.createLayer("office", tilesetEscritorio, 0, 0)),
      (this.mesparede = this.mapa.createLayer("mesparede", tilesetMepa, 0, 0)),
      (this.borda = this.mapa.createLayer("bordaROOM", tilesetFundo, 0, 0)),
      // Ativando o boolean que criamos no mapa
      this.sofa.setCollisionByProperty({ colisor: true });
    this.mesameio.setCollisionByProperty({ colisor: true });
    this.quadrobot.setCollisionByProperty({ colisor: true });
    this.balaomes.setCollisionByProperty({ colisor: true });
    this.objofice.setCollisionByProperty({ colisor: true });
    this.office.setCollisionByProperty({ colisor: true });
    this.mesparede.setCollisionByProperty({ colisor: true });

    // Criando a colisão entre a layer com a propriedade de colisão e a sprite desejada (no caso, o "personagem")
    this.physics.add.collider(this.metinha.sprite, this.sofa);
    this.physics.add.collider(this.metinha.sprite, this.mesameio);
    this.physics.add.collider(this.metinha.sprite, this.quadrobot);
    this.physics.add.collider(this.metinha.sprite, this.balaomes);
    this.physics.add.collider(this.metinha.sprite, this.objofice);
    this.physics.add.collider(this.metinha.sprite, this.office);
    this.physics.add.collider(this.metinha.sprite, this.mesparede);

    //Configurar interação do personagem com a porta
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
      this.dialogo = new Dialogo(this, "botEscritorio4", true);
      this.dialogo.adicionarDialogos([
        "Olá, Metinha! Já voltou? Mais rápido que uma mensagem no Messenger!",
        "Obrigado por confirmar a entrega de cada item! Vi que você foi bem atencioso aos detalhes, parabéns!",
        "Agora, siga até o elevador à esquerda e suba para o próximo andar. Lá, conhecerá o querido ThreadsBot!",
        "Ah, é claro, não se esqueça de responder a sua avó no Messenger viu! Ela tá esperando sua resposta hehe :)",
      ]);
      this.dialogo.iniciarDialogos();
    } else {
      this.dialogo = new Dialogo(this, "botEscritorio4", false);
      this.dialogo.adicionarDialogos([
        "Prazer, Metinhaaa! Como vai? Eu sou o Messenbot e, aqui nesse andar, sou responsável pelo recebimento das entregas e dos serviços dos fornecedores",
        "Agora, estou muito animado para a festa de lançamento do novo Meta Quest 3, e você? Não está também!?",
        "Mas olha, sei que acabamos de nos conhecer, mas pelas mensagens dos meus irmãos (falando muito bem de você hehe), gostaria de te pedir um favor!",
        "Siga até o computador e verifique os itens e serviços que recebemos para a nossa festa… não se esqueça de ter bastante atenção com a verificação, hein!?",
      ]);
      this.dialogo.iniciarDialogos();
    }

    // Adicionamos troca de cena
    this.entradaEscritorioCinco = this.add.rectangle(450, 95, 90, 10);
    this.physics.add.existing(this.entradaEscritorioCinco);

    this.entradaEscritorioTres = this.add.rectangle(650, 95, 90, 10);
    this.physics.add.existing(this.entradaEscritorioTres);

    this.sfx.create("elevador", { loop: false, volume: 0.5 });
    // Verificar sobreposição
    this.physics.add.overlap(
      this.metinha.sprite,
      this.entradaEscritorioCinco,
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
              this.scene.start("EscritorioCinco");
              this.scene.stop("EscritorioQuatro");
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
              this.scene.stop("EscritorioQuatro");
              this.scene.start("EscritorioTres");
              this.sfx.stop("elevador");
            },
            this
          );
        }
      },
      null,
      this
    );

    // MinigameAndarQuatro
    this.notebookAndarQuatro = this.add
      .rectangle(190, 560, 100, 100, 0x000000, 0)
      .setScale(0.9);
    this.physics.add.existing(this.notebookAndarQuatro);
    this.physics.add.overlap(
      this.metinha.sprite,
      this.notebookAndarQuatro,
      () => {
        this.scene.stop("EscritorioQuatro");
        this.scene.start("MinigamePran");
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

    // Criando a animação da exclamação
    this.anims.create({
      key: 'alertaExclamacao',
      frames:
      this.anims.generateFrameNumbers('pontoExclamacao', {start:0, end:1}),
      frameRate: 3,
      repeat:-1
    });

    // Adicionando a animação de exclamação
    this.exclamacao = this.add.sprite(172, 450, "pontoExclamacao");
    this.exclamacao.play("alertaExclamacao");

    //plataforma para colisão com a parede
    this.parede = this.add.rectangle(600, 40, 1200, 100);
    this.physics.add.existing(this.parede);
    this.parede.body.setImmovable(true);
    this.physics.add.collider(this.metinha.sprite, this.parede);

    this.paredeFace = this.add.rectangle(360, 240, 60, 80);
    this.physics.add.existing(this.paredeFace);
    this.paredeFace.body.setImmovable(true);
    this.physics.add.collider(this.metinha.sprite, this.paredeFace);

    this.paredeFace = this.add.rectangle(580, 450, 170, 250);
    this.physics.add.existing(this.paredeFace);
    this.paredeFace.body.setImmovable(true);
    this.physics.add.collider(this.metinha.sprite, this.paredeFace);

    this.paredeFace = this.add.rectangle(580, 333, 60, 80);
    this.physics.add.existing(this.paredeFace);
    this.paredeFace.body.setImmovable(true);
    this.physics.add.collider(this.metinha.sprite, this.paredeFace);

    this.paredeFace = this.add.rectangle(670, 413, 60, 68);
    this.physics.add.existing(this.paredeFace);
    this.paredeFace.body.setImmovable(true);
    this.physics.add.collider(this.metinha.sprite, this.paredeFace);

    this.paredeFace = this.add.rectangle(480, 413, 60, 68);
    this.physics.add.existing(this.paredeFace);
    this.paredeFace.body.setImmovable(true);
    this.physics.add.collider(this.metinha.sprite, this.paredeFace);

    this.paredeFace = this.add.rectangle(980, 517, 400, 72);
    this.physics.add.existing(this.paredeFace);
    this.paredeFace.body.setImmovable(true);
    this.physics.add.collider(this.metinha.sprite, this.paredeFace);

    this.paredeFace = this.add.rectangle(170, 517, 400, 72);
    this.physics.add.existing(this.paredeFace);
    this.paredeFace.body.setImmovable(true);
    this.physics.add.collider(this.metinha.sprite, this.paredeFace);

    this.paredeFace = this.add.rectangle(170, 810, 400, 72);
    this.physics.add.existing(this.paredeFace);
    this.paredeFace.body.setImmovable(true);
    this.physics.add.collider(this.metinha.sprite, this.paredeFace);

    this.paredeFace = this.add.rectangle(980, 810, 400, 72);
    this.physics.add.existing(this.paredeFace);
    this.paredeFace.body.setImmovable(true);
    this.physics.add.collider(this.metinha.sprite, this.paredeFace);

    // Criação da tecla de interação
    this.teclaDeInteracao = this.add.sprite(300, 300, "teclaE");
    this.teclaDeInteracao.play("teclaEAnim");
    this.teclaDeInteracao.setVisible(false);

    // Um retângulo como exemplo de personagem (Apagar completamente)
    this.messenbot = this.add.sprite(362, 242, "botEscritorio4").setScale(1.2);

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
  }

  update() {
    this.metinha.update();

    // Atualiza a posição do botão de interações em relação ao Metinha
    this.teclaDeInteracao.x = this.metinha.sprite.x;
    this.teclaDeInteracao.y = this.metinha.sprite.y - 70;

    // Verifique a sobreposição entre o jogador e o NPC
    if (this.physics.world.overlap(this.metinha.sprite, this.notebookAndarQuatro)) {
      this.teclaDeInteracao.setVisible(true);
    } else {
      this.teclaDeInteracao.setVisible(false);
    }
  }
}
