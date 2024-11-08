import { SFX } from "../UI/sfx.js";

export class Menu extends Phaser.Scene {
  constructor() {
    super('Menu'); // Variável para armazenar a música do menu
  } 
 
  preload() {
    // Carrega as imagens e áudio necessários para o menu
    this.load.image('menu', 'assets/menu.png');
    this.load.image('play_button', 'assets/buttonPlay_un.png');
    this.load.image('options_button', 'assets/buttonOptions_un.png');
    this.load.image('credits_button', 'assets/buttonCredits_un.png');
    this.load.image('play_button_pressed', 'assets/buttonPlay_click.png');
    this.load.image('options_button_pressed', 'assets/buttonOptions_click.png');
    this.load.image('credits_button_pressed', 'assets/buttonCredits_click.png');
    this.load.audio('menu_music', 'assets/menu_music.mp3');
    this.load.image('metaLogo', 'assets/metalogo.png');

    // Carrega o áudio de clique dos botões do menu e instancia a classe SFX
    this.sfx = new SFX(this);
    this.sfx.preload('clickSound', 'assets/sounds/mouseClick.mp3');
  }

  create() {
    // Atribui o som de clique à variável clickSound
    this.sfx.create('clickSound');

    // Fade in da cena do menu
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    const menuMusic = this.sound.add('menu_music', { loop: true, volume: 0.4 });
    menuMusic.play();

    // Adiciona a imagem do menu centralizada e ajusta o tamanho proporcionalmente
    const menuImage = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'menu');
    // Calcula a escala necessária para ajustar a imagem ao tamanho da tela
    const scaleX = this.cameras.main.width / menuImage.width;
    const scaleY = this.cameras.main.height / menuImage.height;
    const scale = Math.max(scaleX, scaleY); // Usa a maior escala para cobrir toda a tela
    menuImage.setScale(scale).setScrollFactor(0);
    menuImage.setOrigin(0.5, 0.5); // Certifica-se de que a imagem é centralizada
    const playButton = this.add.image(600, 550, 'play_button').setInteractive().setScale(2);

    playButton.on('pointerdown', () => {
      playButton.setTexture('play_button_pressed');
      menuMusic.stop();

      // Emite som de clique ao pressionar o botão de Play
      this.sfx.play('clickSound');

      // Adiciona um retângulo preto para cobrir a tela
      const blackScreen = this.add.rectangle(this.cameras.main.centerX, this.cameras.main.centerY, this.sys.game.config.width, this.sys.game.config.height, 0xFFFFFF).setOrigin(0.5);
      const metaLogo = this.add.image(this.cameras.main.centerX, this.cameras.main.height - 400, 'metaLogo').setOrigin(0.5, 1).setScale(3);
      metaLogo.setVisible(true); // Inicialmente invisível
      
      // Adiciona o texto 'Loading'
      let loadingText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 20, 'Carregando', {
        fontFamily: 'Arial',
        fontSize: '24px',
        color: '#3b5998'
      }).setOrigin(0.5).setScale(1.5);

      // Inicia a animação dos três pontos no texto 'Carregando...'
      let dots = '';
      const dotsTimer = this.time.addEvent({
        delay: 500, // Atualiza os pontos a cada 500ms
        callback: () => {
          dots += '.';
          if (dots.length > 3) {
            dots = '';
          }
          loadingText.setText(`Carregando${dots}`);
        },
        loop: true
      });

      // Cria a barra de carregamento
      const progressBar = this.add.graphics();
      const progressBox = this.add.graphics();
      progressBox.fillStyle(0x3b5998, 0.8);
      progressBox.fillRect(this.cameras.main.centerX - 160, this.cameras.main.centerY + 100, 320, 50);

      // Configuração do tempo de carregamento
      const loadingTime = 3000;
      const startTime = this.time.now;
      const percentText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 125, '0%', {
        fontFamily: 'Arial',
        fontSize: '18px',
        color: '#ffffff'
      }).setOrigin(0.5);

      this.time.addEvent({
        delay: 20,
        callback: () => {
          const elapsedTime = this.time.now - startTime;
          const progress = elapsedTime / loadingTime;
          const width = progress * 320;
          if (width <= 320) {
            progressBar.clear();
            progressBar.fillStyle(0x3b5998, 1);
            progressBar.fillRect(this.cameras.main.centerX - 160, this.cameras.main.centerY + 100, width, 50);
            percentText.setText(parseInt(progress * 100) + '%');
          }
        },
        loop: true
      });

      this.time.delayedCall(loadingTime, () => {
        // Para a animação dos pontos ao finalizar o carregamento
        dotsTimer.remove();

        // Limpa os elementos da tela
        blackScreen.destroy();
        loadingText.destroy();
        progressBar.destroy();
        progressBox.destroy();
        percentText.destroy();
        metaLogo.destroy();
        // Inicia o fade out
        this.cameras.main.fadeOut(2000, 0, 0, 0, (camera, progress) => {
          if (progress === 1) {
            // Após o fade out, inicia a cena da animação
            this.scene.start('Animacao');
            
          }

        });
      });

    });
    // Botão Options
    const optionsButton = this.add.image(600, 650, 'options_button').setInteractive().setScale(2);
    optionsButton.on('pointerdown', () => {
      // Emite som de clique ao pressionar o botão de Options
      this.sfx.play('clickSound');

      optionsButton.setTexture('options_button_pressed');
    });

    // Botão Credits
    const creditsButton = this.add.image(600, 750, 'credits_button').setInteractive().setScale(2);
    creditsButton.on('pointerdown', () => {
      // Emite som de clique ao pressionar o botão de Créditos
      this.sfx.play('clickSound');

      creditsButton.setTexture('credits_button_pressed');
      this.scene.start('CreditsScene'); // Inicia a cena de créditos
    });
  }
}
