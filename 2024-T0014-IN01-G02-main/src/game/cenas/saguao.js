import { Dialogo } from "../UI/Dialogo.js"; // Importa a cena de UI
import { Metinha } from "../UI/metinha.js"; // Importa a cena de UI
import { gameState } from "../UI/gameState.js"; // Importa a cena de UI
import { SFX } from "../UI/sfx.js"; // Importa a cena de UI
export class Saguao extends Phaser.Scene {
  entrouElevador;

  constructor() {
    super({ key: "Saguao" }); // Chamada ao construtor da superclasse
  }
  preload() {
    // Carrega os recursos necessários
    this.load.tilemapTiledJSON("saguao", "assets/saguao.json");
    this.load.image("fundo", "assets/Room_Builder_48x48.png");
    this.load.image("14", "assets/14_Basement_Shadowless_48x48.png");
    this.load.image(
      "Tv2",
      "assets/Tv_Studio_Design_layer_2_48x48.png"
    );
    this.load.image(
      "Tv3",
      "assets/Tv_Studio_Design_layer_3_48x48.png"
    );
    this.load.image("1", "assets/1_Generic_Shadowless_48x48.png");
    this.load.image("19", "assets/19_Hospital_Shadowless_48x48.png");
    this.load.image("8", "assets/8_Gym_Shadowless_48x48.png");
    this.load.image(
      "kombi",
      "assets/safeimagekit-pixel-art__2_-removebg-preview (2) (1).png"
    );
    this.metinha = new Metinha(this);
    this.metinha.preload();
    this.load.image("botSaguao", "assets/bots/novoFacebot.png");
    this.load.audio("elevador", "assets/elevador.mp3");

    this.sfx = new SFX(this);
    this.sfx.preload('elevador', 'assets/elevador.mp3');
    this.sfx.preload('passos', 'assets/passos.mp3');

    // Carregando asset do botão de interação
    this.load.spritesheet('teclaE', 'assets/E-Key.png', { frameWidth: 32, frameHeight: 32});
  }

  create() {
    this.entrouElevador = false;

    this.sfx.create('passos', { loop: true, volume: 0.5 });
    // Iniciando um tilemap vazio
    this.mapa = this.make.tilemap({ key: "saguao" });
    // Inicia com um fade in
    this.cameras.main.fadeIn(1000, 0, 0, 0);
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
    const tilesetTv3 = this.mapa.addTilesetImage(
      "Tv_Studio_Design_layer_3_48x48",
      "Tv3"
    );
    const tileset1 = this.mapa.addTilesetImage(
      "1_Generic_Shadowless_48x48",
      "1"
    );
    const tileset19 = this.mapa.addTilesetImage(
      "19_Hospital_Shadowless_48x48",
      "19"
    );
    const tileset8 = this.mapa.addTilesetImage("8_Gym_Shadowless_48x48", "8");
    const tilesetKombi = this.mapa.addTilesetImage(
      "safeimagekit-pixel-art__2_-removebg-preview (2) (1)",
      "kombi"
    );

    this.metinha.create(550, 150);
    this.fundo = this.mapa.createLayer("fundo", tilesetFundo, 0, 0);
    this.tapete14 = this.mapa.createLayer("tapete14", tileset14, 0, 0);
    this.sofa = this.mapa.createLayer("14sofa", tileset14, 0, 0);

    this.mesabasement = this.mapa.createLayer(
      "14mesabasement",
      tileset14,
      0,
      0
    );
    this.cadeirametatv2 = this.mapa.createLayer(
      "cadeirametatv2",
      tilesetTv2,
      0,
      0
    );
    this.mesasgenericshadow = this.mapa.createLayer(
      "1mesasgenericshadow",
      tileset1,
      0,
      0
    );
    this.decoracaobase = this.mapa.createLayer(
      "14decoracaobase",
      tileset14,
      0,
      0
    );
    this.dec19 = this.mapa.createLayer("dec19", tileset19, 0, 0);
    this.dec1 = this.mapa.createLayer("dec1", tileset1, 0, 0);
    this.bot1 = this.mapa.createLayer("bot1", tileset1, 0, 0);
    this.kombi = this.mapa.createLayer("kombi", tilesetKombi, 0, 0);
    this.gym = this.mapa.createLayer("8gym", tileset8, 0, 0);
    this.mesametatv3 = this.mapa.createLayer("mesametatv3", tilesetTv3, 0, 0);
    this.borda = this.mapa.createLayer("borda", tilesetFundo, 0, 0);

    // Ativando o boolean que criamos no mapa
    this.sofa.setCollisionByProperty({ colisor: true });
    this.mesabasement.setCollisionByProperty({ colisor: true });
    this.cadeirametatv2.setCollisionByProperty({ colisor: true });
    this.mesasgenericshadow.setCollisionByProperty({ colisor: true });
    this.decoracaobase.setCollisionByProperty({ colisor: true });
    this.dec19.setCollisionByProperty({ colisor: true });
    this.dec1.setCollisionByProperty({ colisor: true });
    this.bot1.setCollisionByProperty({ colisor: true });
    this.kombi.setCollisionByProperty({ colisor: true });
    this.gym.setCollisionByProperty({ colisor: true });
    this.mesametatv3.setCollisionByProperty({ colisor: true });
    this.borda.setCollisionByProperty({ colisor: true });

    // Criando a colisão entre a layer com a propriedade de colisão e a sprite desejada (no caso, o "personagem")
    this.physics.add.collider(this.metinha.sprite, this.sofa);
    this.physics.add.collider(this.metinha.sprite, this.mesabasement);
    this.physics.add.collider(this.metinha.sprite, this.mesasgenericshadow);
    this.physics.add.collider(this.metinha.sprite, this.decoracaobase);
    this.physics.add.collider(this.metinha.sprite, this.dec19);
    this.physics.add.collider(this.metinha.sprite, this.dec1);
    this.physics.add.collider(this.metinha.sprite, this.bot1);
    this.physics.add.collider(this.metinha.sprite, this.kombi);
    this.physics.add.collider(this.metinha.sprite, this.gym);
    this.physics.add.collider(this.metinha.sprite, this.mesametatv3);
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

    this.cameras.main.setBounds(
      0,
      0,
      this.mapa.widthInPixels,
      this.mapa.heightInPixels,
      true,
      true,
      true,
      true
    );

    // Implementação do dialogo
    this.dialogo = new Dialogo(this, 'botSaguao', true);
    this.dialogo.adicionarDialogos([
      "Oi! Tudo bem? Eu sou o Facebot! Como está se sentindo hoje? *No que está pensando, Metinha?* Ah, tantas perguntas, enfim…",
      "Seja bem vindo à Meta Tower, o maior e mais novo escritório da Meta... em forma de torre! Incrível, não é? Use as teclas WASD e as setas para se movimentar. Enter para pular os Diálogos. Vamos começar!",
      "Aqui, você inicia a sua jornada de aprendizado sobre contratação de fornecedores diversos...",
      "E a cada etapa do processo que você dominar irá permitir que você avance novos andares na torre...",
      "Animad@?",
      "Até lá, explore cada andar, complete as missões e procure dar o seu melhor...",
      "Você encontrará os meus irmãos à frente e receberá mais instruções...",
      "Até lá, boa sorte!"
    ]);
    this.dialogo.iniciarDialogos();

    // Adiciona troca de cena
    this.entradaEscritorio1 = this.add.rectangle(550, 90, 90, 10);

    this.physics.add.existing(this.entradaEscritorio1);

    this.sfx.create('elevador', { loop: false, volume: 0.5 });
    // Verifica sobreposição
    this.physics.add.overlap(this.metinha.sprite, this.entradaEscritorio1, () => {
      // Inicia imediatamente o fadeOut ao detectar a colisão
      if (!this.entrouElevador) {
        this.entrouElevador = true;

        this.cameras.main.fadeOut(1500, 0, 0, 0);
        this.sfx.play('elevador')

      // Aguarda a conclusão do fadeOut para mudar de cena
        this.cameras.main.on("camerafadeoutcomplete", () =>  {
          this.scene.start('Escritorio');
          this.scene.stop('Saguao');
          this.sfx.stop('elevador');
        }, this);
      }
    }, null, this);

    // Cria câmera que segue o personagem
    //var camera = this.cameras.add(0, 0, this.widthInPixels, this.heightInPixels);
    this.cameras.main.startFollow(this.metinha.sprite);
    // // Dá zoom na câmera
    // this.cameras.main.setZoom(1.2);

    
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
    
    //plataforma para colisão com a parede
    this.parede = this.add.rectangle(600, 40, 1200, 100);
    this.physics.add.existing(this.parede);
    this.parede.body.setImmovable(true);
    this.physics.add.collider(this.metinha.sprite, this.parede);

    // Um retângulo como exemplo de personagem (Apagar completamente)
    this.add.sprite(362, 262, 'botSaguao').setScale(1.1);
    //colisoes bugadas
    this.paredeFace = this.add.rectangle(310, 140, 230, 100);
    this.physics.add.existing(this.paredeFace);
    this.paredeFace.body.setImmovable(true);
    this.physics.add.collider(this.metinha.sprite, this.paredeFace);
    
    this.paredeFace = this.add.rectangle(850, 90, 230, 100);
    this.physics.add.existing(this.paredeFace);
    this.paredeFace.body.setImmovable(true);
    this.physics.add.collider(this.metinha.sprite, this.paredeFace);

    this.paredeFace = this.add.rectangle(1150, 70, 330, 100);
    this.physics.add.existing(this.paredeFace);
    this.paredeFace.body.setImmovable(true);
    this.physics.add.collider(this.metinha.sprite, this.paredeFace);

    this.paredeFace = this.add.rectangle(986, 710, 90, 150);
    this.physics.add.existing(this.paredeFace);
    this.paredeFace.body.setImmovable(true);
    this.physics.add.collider(this.metinha.sprite, this.paredeFace);

    this.paredeFace = this.add.rectangle(986, 485, 95, 150);
    this.physics.add.existing(this.paredeFace);
    this.paredeFace.body.setImmovable(true);
    this.physics.add.collider(this.metinha.sprite, this.paredeFace);

    this.paredeFace = this.add.rectangle(986, 485, 95, 150);
    this.physics.add.existing(this.paredeFace);
    this.paredeFace.body.setImmovable(true);
    this.physics.add.collider(this.metinha.sprite, this.paredeFace);

    this.paredeFace = this.add.rectangle(25, 345, 95, 250);
    this.physics.add.existing(this.paredeFace);
    this.paredeFace.body.setImmovable(true);
    this.physics.add.collider(this.metinha.sprite, this.paredeFace);

    this.paredeFace = this.add.rectangle(626, 500, 200, 110);
    this.physics.add.existing(this.paredeFace);
    this.paredeFace.body.setImmovable(true);
    this.physics.add.collider(this.metinha.sprite, this.paredeFace);

    this.paredeFace = this.add.rectangle(626, 700, 200, 110);
    this.physics.add.existing(this.paredeFace);
    this.paredeFace.body.setImmovable(true);
    this.physics.add.collider(this.metinha.sprite, this.paredeFace);

    this.paredeFace = this.add.rectangle(626, 650, 80, 110);
    this.physics.add.existing(this.paredeFace);
    this.paredeFace.body.setImmovable(true);
    this.physics.add.collider(this.metinha.sprite, this.paredeFace);

    this.paredeFace = this.add.rectangle(626,460, 70, 110);
    this.physics.add.existing(this.paredeFace);
    this.paredeFace.body.setImmovable(true);
    this.physics.add.collider(this.metinha.sprite, this.paredeFace);

    this.paredeFace = this.add.rectangle(50,660, 280, 150);
    this.physics.add.existing(this.paredeFace);
    this.paredeFace.body.setImmovable(true);
    this.physics.add.collider(this.metinha.sprite, this.paredeFace);

    this.paredeFace = this.add.rectangle(140,50, 60, 150);
    this.physics.add.existing(this.paredeFace);
    this.paredeFace.body.setImmovable(true);
    this.physics.add.collider(this.metinha.sprite, this.paredeFace);

    this.paredeFace = this.add.rectangle(360,260, 60, 80);
    this.physics.add.existing(this.paredeFace);
    this.paredeFace.body.setImmovable(true);
    this.physics.add.collider(this.metinha.sprite, this.paredeFace);

    this.RectNPC = this.add
    .rectangle(362, 262, 100, 100, 0x000000, 0)
    .setScale(0.9);
    this.physics.add.existing(this.RectNPC);
  }

  update() { //contem a logica de movimentacao do metinha, elaborada na classe metinha
    this.metinha.update();
  }
}
