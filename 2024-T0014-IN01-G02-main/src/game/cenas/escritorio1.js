import { Metinha } from "../UI/metinha.js"; // Importa a Classe Metinha
import { Dialogo } from "../UI/Dialogo.js"; // Importa a Classe Diálogo
import { gameState } from "../UI/gameState.js"; // Importa a cena de UI
import { SFX } from "../UI/sfx.js"; // Importa a cena de UI

export class Escritorio extends Phaser.Scene {
  entrou;
  completouMinigame;

  constructor() {
    super({ key: "Escritorio" }); // Chamada ao construtor da superclasse
  }

  init(dados) {
    this.completouMinigame = dados.minigameFinalizado;
  }

  preload() {
    // Carregamento de recursos
    this.load.tilemapTiledJSON("mapa1", "assets/escritorio1.json");
    this.load.image("fundo", "assets/Room_Builder_48x48.png");
    this.load.image("14", "assets/14_Basement_Shadowless_48x48.png");
    this.load.image("Tv2", "assets/Tv_Studio_Design_layer_2_48x48.png");
    this.load.image("seguranca", "assets/18_Jail_Shadowless_48x48.png");
    this.load.image("1", "assets/1_Generic_Shadowless_48x48.png");
    this.load.image("19", "assets/19_Hospital_Shadowless_48x48.png");
    this.load.image("escritorio", "assets/Modern_Office_48x48.png");
    this.load.image("face", "assets/facee-Photoroom.png");
    this.load.spritesheet("pontoExclamacao", "assets/pontoExclamacao.png", { frameWidth: 45, frameHeight: 48 });
    // Inicia uma instância da Classe do Metinha
    this.metinha = new Metinha(this);

    this.metinha.preload();
    this.load.image("botEscritorio1", "assets/bots/novoFacebot.png");
    this.sfx = new SFX(this);
    this.sfx.preload("elevador", "assets/elevador.mp3");
    this.sfx.preload("passos", "assets/passos.mp3");
    this.load.audio("computerSound", "../../../assets/sounds/computerSound.mp3");
  }

  create() {
    this.entrou = false;
    
    // Criar o personagem metinha
    this.metinha.create(550, 150);
    this.sfx.create("passos", { loop: true, volume: 0.5 });
    // Inicialização do tilemap vazio
    this.mapa = this.make.tilemap({ key: "mapa1" });
    console.log(this.mapa);
    this.cameras.main.fadeIn(1000, 0, 0, 0);

    // Adicionando imagens ao tilemap
    const tilesetFundo = this.mapa.addTilesetImage(
      "Room_Builder_48x48",
      "fundo"
    );
    const tileset14 = this.mapa.addTilesetImage(
      "14_Basement_Shadowless_48x48",
      "14"
    );
    const tilesetTv2 = this.mapa.addTilesetImage(
      "Tv_Studio_Design_layer_2_48x48",
      "Tv2"
    );
    const tilesetSeguranca = this.mapa.addTilesetImage(
      "18_Jail_Shadowless_48x48",
      "seguranca"
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
    const tilesetFace = this.mapa.addTilesetImage("facee-Photoroom", "face");

    // Criação de camadas do tilemap
    this.fundo = this.mapa.createLayer("fundo", tilesetFundo, 0, 0);
    this.tapete114 = this.mapa.createLayer("tapete114", tileset14, 0, 0);
    this.dwal = this.mapa.createLayer("3dwal", tilesetFundo, 0, 0);
    this.mesa14 = this.mapa.createLayer("mesa14", tileset14, 0, 0);
    this.poltrometaTV2 = this.mapa.createLayer(
      "poltrometaTV2",
      tilesetTv2,
      0,
      0
    );
    this.hosp19 = this.mapa.createLayer("hosp19", tileset19, 0, 0);
    this.face = this.mapa.createLayer("face", tilesetFace, 0, 0);
    this.hospit19 = this.mapa.createLayer("hospit19", tileset19, 0, 0);
    this.paredeOF = this.mapa.createLayer("paredeOF", tilesetEscritorio, 0, 0);
    this.cadeirasoffice = this.mapa.createLayer(
      "cadeirasoffice",
      tilesetEscritorio,
      0,
      0
    );
    this.mesasoffice = this.mapa.createLayer(
      "mesasoffice",
      tilesetEscritorio,
      0,
      0
    );
    this.ofice = this.mapa.createLayer("ofice", tilesetEscritorio, 0, 0);
    this.ofizao = this.mapa.createLayer("ofizao", tilesetEscritorio, 0, 0);
    this.elevador1 = this.mapa.createLayer("elevador1", tileset1, 0, 0);
    this.jail18 = this.mapa.createLayer("jail18", tilesetSeguranca, 0, 0);
    this.borda = this.mapa.createLayer("borda", tilesetFundo, 0, 0);

    // Ativando o boolean que criamos no mapa
    this.dwal.setCollisionByProperty({ colisor: true });
    this.mesa14.setCollisionByProperty({ colisor: true });
    this.poltrometaTV2.setCollisionByProperty({ colisor: true });
    this.hosp19.setCollisionByProperty({ colisor: true });
    this.face.setCollisionByProperty({ colisor: true });
    this.hospit19.setCollisionByProperty({ colisor: true });
    this.paredeOF.setCollisionByProperty({ colisor: true });
    this.cadeirasoffice.setCollisionByProperty({ colisor: true });
    this.mesasoffice.setCollisionByProperty({ colisor: true });
    this.ofice.setCollisionByProperty({ colisor: true });
    this.ofizao.setCollisionByProperty({ colisor: true });
    this.elevador1.setCollisionByProperty({ colisor: true });
    this.jail18.setCollisionByProperty({ colisor: true });
    // this.borda.setCollisionByProperty({ colisor: true });

    // Criando a colisão entre a layer com a propriedade de colisão e a sprite desejada (no caso, o "personagem")
    this.physics.add.collider(this.metinha.sprite, this.dwal);
    this.physics.add.collider(this.metinha.sprite, this.mesa14);
    this.physics.add.collider(this.metinha.sprite, this.poltrometaTV2);
    this.physics.add.collider(this.metinha.sprite, this.hosp19);
    this.physics.add.collider(this.metinha.sprite, this.face);
    this.physics.add.collider(this.metinha.sprite, this.hospit19);
    this.physics.add.collider(this.metinha.sprite, this.paredeOF);
    this.physics.add.collider(this.metinha.sprite, this.cadeirasoffice);
    this.physics.add.collider(this.metinha.sprite, this.mesasoffice);
    this.physics.add.collider(this.metinha.sprite, this.ofice);
    this.physics.add.collider(this.metinha.sprite, this.ofizao);
    this.physics.add.collider(this.metinha.sprite, this.elevador1);
    this.physics.add.collider(this.metinha.sprite, this.jail18);
    // this.physics.add.collider(this.metinha.sprite, this.borda);

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

    //implementação do dialogo
    if (this.completouMinigame) {
      this.dialogo = new Dialogo(this, "botEscritorio1", true);
      this.dialogo.adicionarDialogos(["Parabéns! Você concluiu o a etapa de Sourcing! \n Agora você pode seguir para a próxima etapa da Supplier Journey! \n Vá até o elevador esquerdo para ir ao próximo andar!"
      ]);
      this.dialogo.iniciarDialogos();
    }
    else {
      this.dialogo = new Dialogo(this, "botEscritorio1", false);
      this.dialogo.adicionarDialogos([
        "Esse é o andar 01. Aqui você irá aprender sobre a primeira etapa do Supplier Journey: Sourcing!",
        "para celebrar o anúncio do Meta Quest 3, iremos fazer uma festa na MetaTower!",
        " ...Você foi convidado, claro... ",
        "Mas para isso, precisamos contratar um fornecedor de marketing e eventos que seja diverso.",
        "Um fornecedor diverso apresenta 51 % de seu quadro de funcionários composto por pessoas de grupos minoritários ou sub representados",
        "Nesse treinamento iremos te guiar para contratar fornecedores que atendam a esses requisitos",
        "Siga até o computador a seguir para iniciar o processo de contratação",
      ]);
      this.dialogo.iniciarDialogos(); 
    }

    this.contratosRect = this.add
      .rectangle(162, 540, 200, 100, 0x000000, 0)
      .setScale(0.9);
    this.physics.add.existing(this.contratosRect);

    // Adicionamos troca de cena
    this.entradaEscritorio3 = this.add.rectangle(500, 95, 90, 10);
    this.physics.add.existing(this.entradaEscritorio3);

    this.entradaSaguao = this.add.rectangle(700, 95, 90, 10);
    this.physics.add.existing(this.entradaSaguao);

    this.sfx.create("elevador", { loop: false, volume: 0.5 });
    // Verificar sobreposição
    this.physics.add.overlap(
      this.metinha.sprite,
      this.entradaEscritorio3,
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
              this.scene.stop("Escritorio");
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
      this.entradaSaguao,
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
              this.scene.stop("Escritorio");
              this.scene.start("Saguao");
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
      key: 'teclaEAnim',
      frames:
      this.anims.generateFrameNumbers('teclaE', {start:0, end:1}),
      frameRate: 3,
      repeat:-1
    });

    // Criação da tecla de interação
    this.teclaDeInteracao = this.add.sprite(300, 300, 'teclaE');
    this.teclaDeInteracao.play('teclaEAnim');
    this.teclaDeInteracao.setVisible(false);

    // Adicionando o Bot do Andar
    this.add.sprite(362, 262, 'botEscritorio1').setScale(1.15);

    //plataforma para colisão com a parede
    this.parede = this.add.rectangle(600, 40, 1200, 100);
    this.physics.add.existing(this.parede);
    this.parede.body.setImmovable(true);
    this.physics.add.collider(this.metinha.sprite, this.parede);

    this.paredeFace = this.add.rectangle(189, 435, 190, 100);
    this.physics.add.existing(this.paredeFace);
    this.paredeFace.body.setImmovable(true);
    this.physics.add.collider(this.metinha.sprite, this.paredeFace);

    this.paredeFace = this.add.rectangle(189, 185, 190, 75);
    this.physics.add.existing(this.paredeFace);
    this.paredeFace.body.setImmovable(true);
    this.physics.add.collider(this.metinha.sprite, this.paredeFace);

    this.paredeFace = this.add.rectangle(1057, 435, 390, 100);
    this.physics.add.existing(this.paredeFace);
    this.paredeFace.body.setImmovable(true);
    this.physics.add.collider(this.metinha.sprite, this.paredeFace);

    this.paredeFace = this.add.rectangle(260, 735, 50, 700);
    this.physics.add.existing(this.paredeFace);
    this.paredeFace.body.setImmovable(true);
    this.physics.add.collider(this.metinha.sprite, this.paredeFace);

    this.paredeFace = this.add.rectangle(890, 1025, 50, 700);
    this.physics.add.existing(this.paredeFace);
    this.paredeFace.body.setImmovable(true);
    this.physics.add.collider(this.metinha.sprite, this.paredeFace);

    this.paredeFace = this.add.rectangle(890, 480, 50, 190);
    this.physics.add.existing(this.paredeFace);
    this.paredeFace.body.setImmovable(true);
    this.physics.add.collider(this.metinha.sprite, this.paredeFace);

    this.paredeFace = this.add.rectangle(360,260, 60, 80);
    this.physics.add.existing(this.paredeFace);
    this.paredeFace.body.setImmovable(true);
    this.physics.add.collider(this.metinha.sprite, this.paredeFace);

    
    this.paredeFace = this.add.rectangle(50,80, 60, 80);
    this.physics.add.existing(this.paredeFace);
    this.paredeFace.body.setImmovable(true);
    this.physics.add.collider(this.metinha.sprite, this.paredeFace);
    
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
    
    // Criando um evento para reconhecer se a tecla "E" está pressionada
    this.input.keyboard.on('keydown-E', function() {
      if (this.physics.world.overlap(this.contratosRect, this.metinha.sprite)) {
        if(!this.entrou) {
          this.entrou = true;
          this.scene.start("Contratos", {acertos: 0})
          // Emite o som se Start do computador ao pressionar a tecla "E"
          var computerSound = this.sound.add("computerSound");
          computerSound.play();

          this.scene.stop("Escritorio")
        }
      }
    }, this);

  }

  update() {
    this.metinha.update();

    // Atualiza a posição do botão de interações em relação ao Metinha
    this.teclaDeInteracao.x = this.metinha.sprite.x;
    this.teclaDeInteracao.y = this.metinha.sprite.y - 70;

    // Verificam a sobreposição entre o jogador e o NPC
    if (this.physics.world.overlap(this.contratosRect, this.metinha.sprite)) {
      this.teclaDeInteracao.setVisible(true);
    } 
    else {
      this.teclaDeInteracao.setVisible(false);
    }
  }
}
