import { Metinha } from "../UI/metinha.js";
import { SFX } from "../UI/sfx.js"; // Importa a cena de UI
import { Dialogo } from "../UI/Dialogo.js"; // Importa a cena de UI

export class EscritorioCinco extends Phaser.Scene {
  entrou;
  completouMinigame;

  constructor() {
    super({ key: "EscritorioCinco" }); // Chamada ao construtor da superclasse
  }

  init(dados) {
    this.completouMinigame = dados.minigameFinalizado;
  }

  preload() {
    // Carregamento de recursos
    this.load.tilemapTiledJSON("mapa5", "assets/escritorio5.json");
    this.load.image("1", "assets/1_Generic_Shadowless_48x48.png");
    this.load.image("14", "assets/14_Basement_Shadowless_48x48.png");
    this.load.image("fundo", "assets/RoomBuilder.png");
    this.load.image("escritorio", "assets/Modern_Office_Shadowless_48x48.png");
    this.load.image("threads", "assets/tapete-threads-sprite.png");
    this.load.image("parede", "assets/RoomBuilder.png");
    this.load.image("botEscritorio5", "assets/threadsbot.png");
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
    this.entrou = false;

    this.metinha.create(550, 150);
    this.sfx.create("passos", { loop: true, volume: 0.5 });
    // Inicialização do tilemap vazio
    this.mapa = this.make.tilemap({ key: "mapa5" });
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
    const tilesetFundo = this.mapa.addTilesetImage("RoomBuilder", "fundo");
    const tilesetEscritorio = this.mapa.addTilesetImage(
      "Modern_Office_Shadowless_48x48",
      "escritorio"
    );
    const tilesetThreads = this.mapa.addTilesetImage(
      "tapete-threads-sprite",
      "threads"
    );
    const tilesetParede = this.mapa.addTilesetImage("RoomBuilder", "parede");

    // Criação de camadas do tilemap
    (this.layUm = this.mapa.createLayer(
      "lay1-RoomBuilder",
      tilesetParede,
      0,
      0
    )),
      (this.layDois = this.mapa.createLayer(
        "lay2-ModernOfficeShadowless",
        tilesetEscritorio,
        0,
        0
      )),
      (this.layTres = this.mapa.createLayer(
        "lay3-ModernOfficeShadowless",
        tilesetEscritorio,
        0,
        0
      )),
      (this.layQuatro = this.mapa.createLayer(
        "lay4-ModernOfficeShadowless",
        tilesetEscritorio,
        0,
        0
      )),
      (this.layCinco = this.mapa.createLayer(
        "lay5-interiors14",
        tileset14,
        0,
        0
      )),
      (this.laySeis = this.mapa.createLayer(
        "lay6-interiors14",
        tileset14,
        0,
        0
      )),
      (this.laySete = this.mapa.createLayer("lay7-interiors1", tileset1, 0, 0)),
      (this.layOito = this.mapa.createLayer(
        "lay8-threads",
        tilesetThreads,
        0,
        0
      )),
      (this.layNove = this.mapa.createLayer(
        "lay9-RoomBuilder",
        tilesetFundo,
        0,
        0
      ));

    // Ativando o boolean que criamos no mapa
    this.layUm.setCollisionByProperty({ colisor: true });
    this.layDois.setCollisionByProperty({ colisor: true });
    this.layTres.setCollisionByProperty({ colisor: true });
    this.layQuatro.setCollisionByProperty({ colisor: true });
    this.layCinco.setCollisionByProperty({ colisor: true });
    this.laySeis.setCollisionByProperty({ colisor: true });
    this.laySete.setCollisionByProperty({ colisor: true });
    this.layOito.setCollisionByProperty({ colisor: true });
    this.layNove.setCollisionByProperty({ colisor: true });

    // Criando a colisão entre a layer com a propriedade de colisão e a sprite desejada (no caso, o "personagem")
    this.physics.add.collider(this.metinha.sprite, this.layUm);
    this.physics.add.collider(this.metinha.sprite, this.layDois);
    this.physics.add.collider(this.metinha.sprite, this.layTres);
    this.physics.add.collider(this.metinha.sprite, this.layQuatro);
    this.physics.add.collider(this.metinha.sprite, this.layCinco);
    this.physics.add.collider(this.metinha.sprite, this.laySeis);
    this.physics.add.collider(this.metinha.sprite, this.laySete);
    this.physics.add.collider(this.metinha.sprite, this.layOito);
    this.physics.add.collider(this.metinha.sprite, this.layNove);

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
      this.dialogo = new Dialogo(this, "botEscritorio5", true);
      this.dialogo.adicionarDialogos([
        "Metinhaaa! Como você tá?! Meus irmãos falaram muito bem sobre você! Queria conhecer o Metinha, o novo colaborador da Meta… Soa bem, né? :)",
        "Esse é o andar das Contas a Pagar (Accounts Payable ou AP), aqui nós cuidamos das finanças da Meta. Processamos faturas, efetuamos os pagamentos e asseguramos que tudo seja feito dentro dos prazos. Legal, não é mesmo?",
        "Agora, preciso da sua ajuda…Vá até o computador à frente e dê uma olhada nos documentos que o fornecedor enviou: a previsão de custos (Invoice Forecast) e a fatura (Invoice).",
        "Não se esqueça de efetuar a aprovação de fatura (Approval for Invoice), por favor!",
      ]);
      this.dialogo.iniciarDialogos();
    } else {
      this.dialogo = new Dialogo(this, "botEscritorio5", false);
      this.dialogo.adicionarDialogos([
        "Caramba, Metinha, como você é rápido! Não é à toa que falam tão bem de você (com menos de 500 caracteres) hihihi",
        "Continuando, agora você falaria com o Tom, o nosso gestor de faturas… mas ele precisou sair de última hora… Então vou te atualizar sobre o que ele diria",
        "Depois de aprovarmos a fatura, enviamos para o fornecedor as informações do Receivable Financing Program…",
        "Ah sim, melhor explicando, com esse Programa, os fornecedores podem usar o pagamento da Meta como garantia para aderirem a empréstimos.",
        "Isso ajuda empresas de menor porte a não comprometerem seu caixa após a prestação dos serviços para a Meta.",
        "Mas é isso, muito obrigado pela sua ajuda aqui no andar… Agora, siga até o elevador da esquerda e continue a sua jornada… Beijos!"
      ]);
      this.dialogo.iniciarDialogos();
    }

    // Adicionamos troca de cena
    this.entradaEscritorioQuatro = this.add.rectangle(700, 100, 90, 10);
    this.physics.add.existing(this.entradaEscritorioQuatro);
    this.entradaEscritorioSeis = this.add.rectangle(500, 100, 90, 10);
    this.physics.add.existing(this.entradaEscritorioSeis);
    this.sfx.create("elevador", { loop: false, volume: 0.5 });

    this.physics.add.overlap(
      this.metinha.sprite,
      this.entradaEscritorioSeis,
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
              this.scene.start("EscritorioSeis");
              this.scene.stop("EscritorioCinco");
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
              this.scene.stop("EscritorioCinco");
              this.scene.start("EscritorioQuatro");
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
    //plataforma para colisão com a parede
    this.parede = this.add.rectangle(600, 40, 1200, 100);
    this.physics.add.existing(this.parede);
    this.parede.body.setImmovable(true);
    this.physics.add.collider(this.metinha.sprite, this.parede);

    // Criação da tecla de interação
    this.teclaDeInteracao = this.add.sprite(300, 300, "teclaE");
    this.teclaDeInteracao.play("teclaEAnim");
    this.teclaDeInteracao.setVisible(false);

    // Criando o Bot do Andar
    this.threads = this.add.sprite(700, 300, "botEscritorio5").setScale(1.2);

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
    this.exclamacao = this.add.sprite(972, 650, "pontoExclamacao");
    this.exclamacao.play("alertaExclamacao");

    // MinigameAndarCinco
    this.notebookAndarCinco = this.add
      .rectangle(955, 625, 100, 100, 0x000000, 0)
      .setScale(0.9);
    this.physics.add.existing(this.notebookAndarCinco);

    // Criando um evento para reconhecer se a tecla "E" está pressionada
    this.input.keyboard.on(
      "keydown-E",
      function () {
        if (
          this.physics.world.overlap(
            this.notebookAndarCinco,
            this.metinha.sprite
          )
        ) {
          if (!this.entrou) {
            this.entrou = true;
            this.scene.start("MinigameCinco");
            this.scene.stop("EscritorioCinco");
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
      this.physics.world.overlap(this.notebookAndarCinco, this.metinha.sprite)
    ) {
      this.teclaDeInteracao.setVisible(true);
    } else {
      this.teclaDeInteracao.setVisible(false);
    }
  }
}
