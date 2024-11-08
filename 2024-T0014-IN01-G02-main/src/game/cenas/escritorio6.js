import { Metinha } from "../UI/metinha.js";
import { SFX } from "../UI/sfx.js"; // Importa a cena de UI
import { Dialogo } from "../UI/Dialogo.js";

export class EscritorioSeis extends Phaser.Scene {
  entrou;
  completouMinigame;

  constructor() {
    super({ key: "EscritorioSeis" }); // Chamada ao construtor da superclasse
  }

  init(dados) {
    this.completouMinigame = dados.minigameFinalizado;
    console.log(dados)
  }

  preload() {
    // Carregamento dos recursos do mapa
    this.load.tilemapTiledJSON("mapa6", "assets/andarSeis.json");
    this.load.image("2", "assets/2_LivingRoom_Shadowless_48x48.png");
    this.load.image("basement", "assets/basement.png");
    this.load.image("interiors", "assets/Interiors_free_48x48.png");
    this.load.image("chao", "assets/RoomBuilder.png");
    this.load.image("mesa", "assets/mesa.png");
    this.load.image("escritorio", "assets/Modern_Office_Shadowless_48x48.png");
    this.load.image("quadro", "assets/quadro.png");
    this.load.image("paredeAzul", "assets/parede.png");
    this.load.image("thatis", "assets/thatis.png");
    this.load.image('shane', 'assets/shane.png');
    this.load.spritesheet("pontoExclamacao", "assets/pontoExclamacao.png", { frameWidth: 45, frameHeight: 48 });

    this.metinha = new Metinha(this);
    this.metinha.preload();
    this.sfx = new SFX(this);
    this.sfx.preload("elevador", "assets/elevador.mp3");
    this.sfx.preload("passos", "assets/passos.mp3");

    // Load da imagem final
    this.load.image("telaFinal", "document/assets/telaFinal.png");
  }

  create() {
    this.entrou = false;

    this.metinha.create(550, 150);
    this.sfx.create("passos", { loop: true, volume: 0.5 });
    // Inicialização do tilemap vazio
    this.mapa = this.make.tilemap({ key: "mapa6" });
    console.log(this.mapa);

    // Adicionando imagens ao tilemap
    const tileset2 = this.mapa.addTilesetImage("2_LivingRoom_48x48", "2");
    const tileset14 = this.mapa.addTilesetImage(
      "14_Basement_48x48",
      "basement"
    );
    const tilesetInteriors = this.mapa.addTilesetImage(
      "Interiors_free_48x48",
      "interiors"
    );
    const tilesetChao = this.mapa.addTilesetImage("RoomBuilder", "chao");
    const tilesetMesa = this.mapa.addTilesetImage("mesa", "mesa");
    const tilesetQuadro = this.mapa.addTilesetImage("quadro", "quadro");
    const tilesetParedeAzul = this.mapa.addTilesetImage("parede", "paredeAzul");
    const tilesetEscritorio = this.mapa.addTilesetImage(
      "Modern_Office_48x48",
      "escritorio"
    );

    // Criação de camadas do tilemap
    (this.layerUm = this.mapa.createLayer("um_RoomBuilder", tilesetChao, 0, 0)),
      (this.layerDois = this.mapa.createLayer(
        "dois_parede",
        tilesetParedeAzul,
        0,
        0
      )),
      (this.layerTres = this.mapa.createLayer(
        "tres_RoomBuilder",
        tilesetChao,
        0,
        0
      )),
      (this.layerQuatro = this.mapa.createLayer(
        "quatro_interiorsFree",
        tilesetInteriors,
        0,
        0
      )),
      (this.layerCinco = this.mapa.createLayer(
        "cinco_interiorsFree",
        tilesetInteriors,
        0,
        0
      )),
      (this.layerSeis = this.mapa.createLayer("seis_mesa", tilesetMesa, 0, 0)),
      (this.layerSete = this.mapa.createLayer("sete_mesa", tilesetMesa, 0, 0)),
      (this.layerOito = this.mapa.createLayer(
        "oito_basement",
        tileset14,
        0,
        0
      )),
      (this.layerNove = this.mapa.createLayer(
        "nove_basement",
        tileset14,
        0,
        0
      ));
    this.layerDez = this.mapa.createLayer("dez_basement", tileset14, 0, 0);
    this.layerOnze = this.mapa.createLayer(
      "onze_modernOffice",
      tilesetEscritorio,
      0,
      0
    );
    this.layerDoze = this.mapa.createLayer(
      "doze_modernOffice",
      tilesetEscritorio,
      0,
      0
    );
    this.layerTreze = this.mapa.createLayer(
      "treze_modernOffice",
      tilesetEscritorio,
      0,
      0
    );
    this.layerQuatorze = this.mapa.createLayer(
      "quatorze_modernOffice",
      tilesetEscritorio,
      0,
      0
    );
    this.layerQuinze = this.mapa.createLayer(
      "quinzeModernOffice",
      tilesetEscritorio,
      0,
      0
    );
    this.layerDezesseis = this.mapa.createLayer(
      "dezesseis_ModernOffice",
      tilesetEscritorio,
      0,
      0
    );
    this.layerDezessete = this.mapa.createLayer(
      "dezessete_quadro",
      tilesetQuadro,
      0,
      0
    );
    this.layerDezoito = this.mapa.createLayer(
      "dezoito_LivingRoom",
      tileset2,
      0,
      0
    );
    this.layerDezenove = this.mapa.createLayer(
      "dezenove_RoomBuilder",
      tilesetChao,
      0,
      0
    );

    // Ativando o boolean que criamos no mapa
    this.layerUm.setCollisionByProperty({ colisor: true });
    this.layerDois.setCollisionByProperty({ colisor: true });
    this.layerTres.setCollisionByProperty({ colisor: true });
    this.layerQuatro.setCollisionByProperty({ colisor: true });
    this.layerCinco.setCollisionByProperty({ colisor: true });
    this.layerSeis.setCollisionByProperty({ colisor: true });
    this.layerSete.setCollisionByProperty({ colisor: true });
    this.layerOito.setCollisionByProperty({ colisor: true });
    this.layerNove.setCollisionByProperty({ colisor: true });
    this.layerDez.setCollisionByProperty({ colisor: true });
    this.layerOnze.setCollisionByProperty({ colisor: true });
    this.layerDoze.setCollisionByProperty({ colisor: true });
    this.layerTreze.setCollisionByProperty({ colisor: true });
    this.layerQuatorze.setCollisionByProperty({ colisor: true });
    this.layerQuinze.setCollisionByProperty({ colisor: true });
    this.layerDezesseis.setCollisionByProperty({ colisor: true });
    this.layerDezessete.setCollisionByProperty({ colisor: true });
    this.layerDezoito.setCollisionByProperty({ colisor: true });
    this.layerDezenove.setCollisionByProperty({ colisor: true });

    // Criando a colisão entre a layer com a propriedade de colisão e a sprite desejada (no caso, o "personagem")
    this.physics.add.collider(this.metinha.sprite, this.layerUm);
    this.physics.add.collider(this.metinha.sprite, this.layerDois);
    this.physics.add.collider(this.metinha.sprite, this.layerTres);
    this.physics.add.collider(this.metinha.sprite, this.layerQuatro);
    this.physics.add.collider(this.metinha.sprite, this.layerCinco);
    this.physics.add.collider(this.metinha.sprite, this.layerSeis);
    this.physics.add.collider(this.metinha.sprite, this.layerSete);
    this.physics.add.collider(this.metinha.sprite, this.layerOito);
    this.physics.add.collider(this.metinha.sprite, this.layerNove);
    this.physics.add.collider(this.metinha.sprite, this.layerDez);
    this.physics.add.collider(this.metinha.sprite, this.layerOnze);
    this.physics.add.collider(this.metinha.sprite, this.layerDoze);
    this.physics.add.collider(this.metinha.sprite, this.layerTreze);
    this.physics.add.collider(this.metinha.sprite, this.layerQuatorze);
    this.physics.add.collider(this.metinha.sprite, this.layerQuinze);
    this.physics.add.collider(this.metinha.sprite, this.layerDezesseis);
    this.physics.add.collider(this.metinha.sprite, this.layerDezessete);
    this.physics.add.collider(this.metinha.sprite, this.layerDezoito);
    this.physics.add.collider(this.metinha.sprite, this.layerDezenove);

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

    // Adicionamos troca de cena
    this.entradaEscritorioCinco = this.add.rectangle(720, 90, 90, 10);
    this.physics.add.existing(this.entradaEscritorioCinco);
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
              this.scene.stop("EscritorioSeis");
              this.scene.start("EscritorioCinco");
              this.sfx.stop("elevador");
            },
            this
          );
        }
      },
      null,
      this
    );

    // Criando o Bot do Andar
    this.thatis = this.physics.add
      .staticImage(790, 170, "thatis")
      .setScale(1.2);
    this.shane = this.physics.add.staticImage(870, 170, "shane").setScale(1.2);

    this.physics.add.collider(this.metinha.sprite, this.thatis);
    this.physics.add.collider(this.metinha.sprite, this.shane);

    this.RectNPC = this.add.rectangle(830, 180, 150, 100, 0x000000, 0);
    this.physics.add.existing(this.RectNPC);

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

    this.minigame = false;

    this.computador = this.add.rectangle(235, 750, 90, 90, 0x000000, 0);
    this.physics.add.existing(this.computador);
    this.physics.add.overlap(this.metinha.sprite, this.computador, () => {
        this.teclaDeInteracao.setVisible(true);
        this.input.keyboard.on('keydown-E', () => {
            this.scene.start('ChecarContrato');
            this.minigame = true;
        });
    })
    // Criando a animação da exclamação
    this.anims.create({
      key: 'alertaExclamacao',
      frames:
      this.anims.generateFrameNumbers('pontoExclamacao', {start:0, end:1}),
      frameRate: 3,
      repeat:-1
    });

    // Adicionando a animação de exclamação
    this.exclamacao = this.add.sprite(242, 750, "pontoExclamacao");
    this.exclamacao.play("alertaExclamacao");
    this.physics.add.overlap(this.metinha.sprite, this.RectNPC, () => {
      this.teclaDeInteracao.setVisible(true);
    });
    //plataforma para colisão com a parede
    this.parede = this.add.rectangle(600, 40, 1200, 100);
    this.physics.add.existing(this.parede);
    this.parede.body.setImmovable(true);
    this.physics.add.collider(this.metinha.sprite, this.parede);

    if (this.completouMinigame) {
      this.dialogo = new Dialogo(this, "shane", true);
      this.dialogo.adicionarDialogos([
        "Muito bom!! Agora você finalizou o Offboarding, a última etapa da Supplier Journey.",
        "Em todas os desafios você adquiriu conhecimentos que vão te auxiliar em suas futuras contratações",
        "Chegou o momento de celebrar sua conquista, não foi fácil passar por todas essas etapas.",
        "Boa sorte com suas futuras contratações. Volte sempre que precisar, até logo!",
      ]);
      this.add.image(575, 430, "telaFinal");
      this.metinha.sprite.setVisible(false);
    } else {
      this.dialogo = new Dialogo(this, "thatis", false);
      this.dialogo.adicionarDialogos([
        "Parabéns por ter chegado até aqui! Você realizou todas as etapas anteriores corretamente!",
        "Depois de pesquisar fornecedores, escolher um, negociar, receber os produtos e serviços e pagá-lo, está na hora de realizar o Offboarding da empresa.",
        "Quando um fornecedor é considerado bom o suficiente para fazer futuros trabalhos, mas ele não é necessário no momento, realiza-se o Offboarding desse fornecedor.",
        "Essa etapa possui diversas tarefas, mas não precisa se preocupar, você receberá ajuda para realizá-la.",
        "Siga até o computador indicado para realizar essas etapas",
      ]);
    }
    this.dialogo.iniciarDialogos();
  }

  update() {
    this.metinha.update();

    // Atualiza a posição do botão de interações em relação ao Metinha
    this.teclaDeInteracao.x = this.metinha.sprite.x;
    this.teclaDeInteracao.y = this.metinha.sprite.y - 70;

    // Verifique a sobreposição entre o jogador e o NPC
    if (
      this.physics.world.overlap(this.computador, this.metinha.sprite)
    ) {
      this.teclaDeInteracao.setVisible(true);
    } else {
      this.teclaDeInteracao.setVisible(false);
    }
  }
}
