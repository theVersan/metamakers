import { SFX } from "../UI/sfx.js"; // Importa a cena de UI
export class Metinha {
  constructor(scene) {
    this.scene = scene; // A cena em que o personagem será adicionado
    this.sprite = null; // O sprite do personagem
    this.cursors = null; // Controles do teclado
    this.speed = 120; // Velocidade do personagem
    this.sfx = new SFX(scene);//adiciona instancia de SFX
    this.isMoving = false;
  }

  preload() {
    // Carrega o spritesheet do personagem
    this.scene.load.spritesheet(
      "metinhaSprite",
      "assets/metinhaOriginal.png",
      {
        frameWidth: 51,
        frameHeight: 70,
      }
    );
    this.sfx.preload('passos', 'assets/passos.mp3');
  }

  create(x, y) {
    this.sfx.create('passos', { loop: false, volume: 0.5 });
    // Cria o sprite do metinha na cena
    this.sprite = this.scene.physics.add
      .sprite(x, y, "metinhaSprite")
      .setScale(1.2);

    this.sprite.setDepth(100);

    // Cria as animações do metinha
    this.createAnimations();

    // Garante que o metinha colida com o mundo
    this.sprite.body.setCollideWorldBounds(true);

    //hitbox metinha
    this.sprite.body.setSize(30, 10, true).setOffset(10, 57);
    // Inicializa os controles do teclado
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.keyW = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.W
    );
    this.keyA = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.A
    );
    this.keyS = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.S
    );
    this.keyD = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.D
    );
  }

  createAnimations() {
    ///animar o metinha
    this.scene.anims.create({
      key: "down",
      frames: this.scene.anims.generateFrameNumbers("metinhaSprite", {
        start: 18,
        end: 23,
      }),
      frameRate: 12,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "left",
      frames: this.scene.anims.generateFrameNumbers("metinhaSprite", {
        start: 12,
        end: 17,
      }),
      frameRate: 12,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "right",
      frames: this.scene.anims.generateFrameNumbers("metinhaSprite", {
        start: 0,
        end: 5,
      }),
      frameRate: 12,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "up",
      frames: this.scene.anims.generateFrameNumbers("metinhaSprite", {
        start: 6,
        end: 11,
      }),
      frameRate: 12,
      repeat: -1,
    });
  }

  update() {
    // Lógica de movimentação
    let moving = false;
    let velocity = new Phaser.Math.Vector2();
  
    if (this.cursors.left.isDown || this.keyA.isDown) {
      velocity.x = -1;
      moving = true;
    } else if (this.cursors.right.isDown || this.keyD.isDown) {
      velocity.x = 1;
      moving = true;
    }
  
    if (this.cursors.up.isDown || this.keyW.isDown) {
      velocity.y = -1;
      moving = true;
    } else if (this.cursors.down.isDown || this.keyS.isDown) {
      velocity.y = 1;
      moving = true;
    }
  
    // Normaliza a velocidade para que o movimento diagonal não seja mais rápido
    velocity.normalize();
    this.sprite.setVelocity(velocity.x * this.speed, velocity.y * this.speed);
  
    // Atualiza a animação baseada na direção
    if (moving) {
      if (!this.sfx.get('passos').isPlaying) {
        this.sfx.play('passos'); // Toca o som de passos
      }
      // if (!this.isMoving) {
      //   this.isMoving = true; // Atualiza o estado para movendo
      //   this.sfx.play('passos'); // Toca o som de passos
      // }
      let direction = 
        velocity.x < 0 ? "left" :
        velocity.x > 0 ? "right" :
        velocity.y < 0 ? "up" : "down";
      this.sprite.anims.play(direction, true); // Continua a animação de movimento
    } else {
      if (this.sfx.get('passos').isPlaying) {
        this.sfx.stop('passos');
      }
      this.sprite.anims.stop(); // Para a animação de movimento

      // if (this.isMoving) {
      //   this.isMoving = false; // Atualiza o estado para parado
      //   this.sfx.stop('passos'); // Para o som de passos
      // }
    }
  }  
}
