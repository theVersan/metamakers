export class Animacao extends Phaser.Scene {
  constructor() {
    super({ key: "Animacao" });
  }

  preload() {
    this.load.video("menupro", "assets/menupro.mp4");
    this.load.audio("saguaoSong", "assets/sounds/cutScene-menuSong.mp3");
  }

  create() {
    // Inicia o Fade-In da cena
    this.cameras.main.fadeIn(7000, 0, 0, 0);

    this.add.video(600, 430, "menupro").play(true);
    // Carrega a música de transição para a cena Saguao
    const saguaoSong = this.sound.add("saguaoSong", { loop: true, volume: 1 });
    saguaoSong.play();

    //dellay para a transição de cena
    this.time.delayedCall(7000, () => {
      this.scene.start("Saguao");
      this.scene.stop("Animacao");
    });
  }

  update() {}
}
