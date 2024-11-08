export class MinigameTPA extends Phaser.Scene {
    constructor() {
        super({ key: "MinigameTPA" });
    }

    preload() {
        // Carrega as imagens utilizadas no minigame
        this.load.image("bg_minigame", "assets/minigame_instagram.png");
        this.load.image("check", "assets/check.png");
        this.load.image("deny", "assets/deny.png");
        this.load.image("contractIcon", "assets/contractIcon.png");
    }

    create() {
        // Adiciona a imagem de fundo do minigame
        this.add.image(600, 430, "bg_minigame").setDisplaySize(1200, 860);
        // Adiciona o título do questionário
        this.add.text(100, 70, "Questionário TPA", { fontSize: "25px", color: "#000000" }).setScale(2);
        // Adiciona o ícone do contrato
        this.add.image(1100, 100, "contractIcon").setScale(1);
        // Adiciona um retângulo para o texto do contrato
        this.add.rectangle(435, 540, 800, 590, 0xf5f2d0);
        // Adiciona o texto do contrato
        this.add.text(-30, 230, `
                
        08/04/2024 - 08/04/2026

        Meta., Av. Brig. Faria Lima, 3732, Itaim Bibi, São Paulo - SP, 

        e MetaMakers Solutions Inc., Rua Haddock Lobo, 1311, Jardins, São Paulo, SP, 

        firmam este Acordo de Administração de Benefícios. META, como "Contratante", 

        e MetaMakers, por Metinha, "Administrador", estabelecem a gestão de 

        benefícios de saúde e seguros de vida dos funcionários.

        O acordo inicia em [         ...         ], com pagamento 

        de [            ...            ] ao Administrador sobre os prêmios, 

        garantindo a [            ...            ] das informações dos empregados. 

        Válido até [          ...          ], seguindo a legislação brasileira.

        O Administrador oferecerá suporte contínuo, 

        acesso a informações dos benefícios e 

        resolução de dúvidas rapidamente, 

        visando a transparência e o serviço de excelência.

        Auditorias e relatórios anuais serão feitos 

        pelo Administrador, permitindo ajustes anuais 

        do acordo para atender as novas demandas dos 

        empregados ou mudanças de mercado.`
            , { fontSize: "17px", color: "#000000" }).setDepth(1000).setOrigin(0, 0);

        // Definição das posições iniciais e drop zones para as lacunas
        const gapsInfo = [
            // Cada objeto aqui é uma lacuna arrastável que será adicionada à cena
            { text: "08 de abril de 2024", position: { x: 910, y: 315 }, dropZone: { x: 260, y: 440, width: 200, height: 50 } },
            { text: "5% dos prêmios dos planos", position: { x: 880, y: 465 }, dropZone: { x: 130, y: 470, width: 200, height: 50 } },
            { text: "confidencialidade estrita", position: { x: 880, y: 615 }, dropZone: { x: 230, y: 500, width: 200, height: 50 } },
            { text: "08 de abril de 2026", position: { x: 910, y: 765 }, dropZone: { x: 200, y: 535, width: 200, height: 50 } },
        ];

        const denyButton = this.add.image(30, 50, 'deny')
            .setInteractive()
            .setScale(6)
            .setVisible(false);

        gapsInfo.forEach(gap => {
            // Adiciona o texto da lacuna arrastável
            let draggableText = this.add.text(gap.position.x, gap.position.y, gap.text, {
                font: "17px",
                color: "#000000",
                backgroundColor: "#f5f2d0",
                padding: { x: 10, y: 5 },
            }).setInteractive();

            this.input.setDraggable(draggableText);

            draggableText.on('drag', (pointer, dragX, dragY) => {
                draggableText.x = dragX;
                draggableText.y = dragY;
            });

            draggableText.on('dragend', (pointer) => {
                const dz = gap.dropZone;
                if (pointer.x > dz.x && pointer.x < dz.x + dz.width &&
                    pointer.y > dz.y && pointer.y < dz.y + dz.height) {
                    draggableText.x = dz.x + (dz.width - draggableText.width) / 2;
                    draggableText.y = dz.y + (dz.height - draggableText.height) / 2;
                    draggableText.setDepth(1001); // Garante que a lacuna fique sobre o texto do contrato
                    draggableText.disableInteractive(); // Desativa a interatividade

                    // Cria o ícone "check"
                    let checkIcon = this.add.image(dz.x + dz.width / 2, dz.y + dz.height / 2, 'check')
                        .setDisplaySize(dz.width, dz.height)
                        .setDepth(1002)
                        .setScale(6);

                    // Incrementa o contador de lacunas corretas e verifica se o minigame está completo
                    correctGaps++;
                    if (correctGaps === gapsInfo.length) {
                        denyButton.setVisible(true);
                    }

                    // Faz o ícone "check" desaparecer após um breve período
                    this.time.delayedCall(500, () => {
                        checkIcon.destroy();
                    });
                } else {
                    draggableText.x = gap.position.x;
                    draggableText.y = gap.position.y;
                }
            });
        });

        denyButton.on('pointerdown', () => {
            if (correctGaps === gapsInfo.length) {
                // Ao clicar no botão "deny" e todas as lacunas estiverem corretas, a cena é encerrada e outra cena é iniciada
                this.scene.stop("MinigameTPA");
                this.scene.start("EscritorioDois", { minigameFinalizado: true });
            }
        });
    }
}
