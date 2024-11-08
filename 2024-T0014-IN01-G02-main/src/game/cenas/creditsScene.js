export class CreditsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CreditsScene' });
    }
    preload() {
        // Carrega a imagem de fundo
        this.load.image('credits', 'assets/credss.png');
    }
    create() {
        // Fundo preto
        this.cameras.main.setBackgroundColor('#000');

       this.add.image(600, 430, 'credits').setScale(0.9);

        

        // Volta para o menu principal após 5 segundos
        this.time.delayedCall(5000, () => {
            this.scene.start('Menu');
        });

        // Adiciona um listener para qualquer clique voltar ao menu instantaneamente
        this.input.on('pointerdown', () => {
            this.scene.start('Menu');
        });
    }
}
