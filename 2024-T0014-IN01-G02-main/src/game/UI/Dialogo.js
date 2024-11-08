// Importando o estado do jogo de um módulo externo para controle de diálogos já mostrados.
import { gameState } from '../UI/gameState.js';

// Definindo a classe Dialogo, responsável por gerenciar diálogos na cena.
export class Dialogo {
    constructor(scene, botImageKey, lastDialog) {
        // Inicializa a classe com a cena atual, identificador da cena e chave da imagem do bot.
        this.scene = scene;
        this.sceneId = scene.scene.key;
        this.dialogos = []; // Array para armazenar os diálogos.
        this.dialogoAtual = 0; // Índice para controlar o diálogo atual.
        this.textoCompleto = false; // Indica se o texto do diálogo atual foi completamente exibido.
        this.ultimoDialogo = null; // Armazena os elementos visuais do último diálogo exibido.
        this.eventoEnter = null; // Referência ao listener do evento de pressionar a tecla Enter.
        this.teclaEnterPressionada = false; // Controla se a tecla Enter foi pressionada.
        this.timerEvent = null; // Evento de temporizador para o efeito de digitação do texto.
        this.botImageKey = botImageKey; // Chave da imagem do bot usada no diálogo.
        this.lastDialog = lastDialog; // Diz se é o último diálogo nessa cena.
    }

    // Adiciona novos diálogos ao array de diálogos, aceitando tanto arrays quanto itens únicos.
    adicionarDialogos(novosDialogos) {
        if (Array.isArray(novosDialogos)) {
            this.dialogos = this.dialogos.concat(novosDialogos);
        } else {
            this.dialogos.push(novosDialogos);
        }
    }

    // Inicia a exibição dos diálogos, configurando o comportamento para avançar ou finalizar o diálogo.
    iniciarDialogos() {
        // Verifica se existe diálogo para ser mostrado e se o mesmo ainda não foi exibido.
        if (this.dialogos.length > 0 && this.dialogoAtual === 0 && !gameState.saguaoDialogShown[this.sceneId]) {
            this.criarDialogo(this.dialogos[this.dialogoAtual]);
            gameState.saguaoDialogShown[this.sceneId] = this.lastDialog; // Marca o diálogo como mostrado.
        }
        // Configura o listener para a tecla Enter, permitindo avançar no diálogo ou exibir o texto completo.
        this.scene.input.keyboard.on('keydown-ENTER', () => {
            if (!this.textoCompleto) {
                this.mostrarTextoCompleto();
            } else if (this.dialogoAtual < this.dialogos.length - 1) {
                this.dialogoAtual++;
                this.criarDialogo(this.dialogos[this.dialogoAtual]);
            } else {
                this.limparDialogo(); // Limpa o diálogo quando todos foram exibidos.
                this.dialogoAtual = 0;
                this.textoCompleto = false;
            }
        });
    }

    // Cria visualmente a caixa de diálogo e inicia o efeito de digitação para o texto.
    criarDialogo(texto) {
        this.limparDialogo(); // Remove o diálogo anterior, se houver.
        // Calcula dimensões e posições para a caixa de diálogo e o texto.
        const largura = this.scene.cameras.main.width;
        const altura = this.scene.cameras.main.height;
        const boxWidth = largura * 0.8;
        const boxHeight = 150;
        const boxX = largura * 0.1;
        const padding = 20;
        const botWidth = 80;
        // Cria os elementos visuais da caixa de diálogo.
        let dialogoFundo = this.scene.add.rectangle(boxX, altura - boxHeight, boxWidth, boxHeight, 0xFFFFFF)
            .setOrigin(0, 0)
            .setDepth(1000);
        dialogoFundo.setStrokeStyle(3, 0x000000);
        let textoWidth = boxWidth - (padding * 2) - botWidth - padding;
        let dialogoTexto = this.scene.add.text(boxX + padding, altura - boxHeight + padding, '', {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#3b5998',
            wordWrap: { width: textoWidth }
        }).setDepth(1002);
        let imagemBot = this.scene.add.image(boxX + boxWidth - botWidth / 2 - padding / 2, altura - boxHeight / 2, this.botImageKey)
            .setOrigin(0.5)
            .setScale(2.5)
            .setDepth(1003);
        // Armazena os elementos criados para futura referência.
        this.ultimoDialogo = { fundo: dialogoFundo, texto: dialogoTexto, bot: imagemBot };
        this.textoAtual = '';
        this.textoCompleto = false;
        // Inicia o evento de temporizador para simular a digitação do texto.
        let i = 0;
        if (this.timerEvent) {
            this.timerEvent.remove();
        }
        this.timerEvent = this.scene.time.addEvent({
            delay: 50, // Intervalo de tempo entre cada letra sendo "digitada".
            callback: () => {
                if (!this.textoCompleto) {
                    this.textoAtual += texto[i++];
                    this.ultimoDialogo.texto.setText(this.textoAtual);
                }
                if (i >= texto.length || this.teclaEnterPressionada) {
                    this.textoCompleto = true;
                    this.timerEvent.remove();
                    this.timerEvent = null;
                }
            },
            repeat: texto.length - 1,
            callbackScope: this
        });
    }

    // Exibe imediatamente o texto completo do diálogo atual, se ainda não estiver completo.
    mostrarTextoCompleto() {
        if (!this.textoCompleto) {
            this.textoAtual = this.dialogos[this.dialogoAtual];
            this.ultimoDialogo.texto.setText(this.textoAtual);
            this.textoCompleto = true;
            if (this.timerEvent) {
                this.timerEvent.remove();
                this.timerEvent = null;
            }
        }
    }

    // Limpa os elementos visuais da caixa de diálogo e remove event listeners.
    limparDialogo() {
        if (this.ultimoDialogo) {
            this.ultimoDialogo.fundo.destroy();
            this.ultimoDialogo.texto.destroy();
            this.ultimoDialogo.bot.destroy();
            this.ultimoDialogo = null;
        }
        if (this.timerEvent) {
            this.timerEvent.remove();
            this.timerEvent = null;
        }
        if (this.eventoEnter) {
            this.eventoEnter.removeListener('keydown-ENTER');
            this.eventoEnter = null;
        }
        this.teclaEnterPressionada = false;
        this.textoAtual = '';
        this.textoCompleto = false;
    }
}
