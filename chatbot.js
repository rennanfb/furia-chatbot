export class ChatBot {
    constructor(name) {
        this.name = name;
        this.chatBox = document.getElementById('chat-box');
        this.buttonContainer = document.getElementById('button-container');
    }

    showIntroduction() {
        this.displayBotMessage("Fala furioso, seja bem-vindo ao canal de Counter-Strike do Time FURIA, eu sou o FuriaChatBot!");
        this.displayBotMessage("Tenho diversas informações sobre o nosso time ao seu dispor.");
    }

    showOptions() {
        this.clearButtons();
        this.displayBotMessage("Sobre o que está curioso?");
        const options = [
            { text: "Sobre a FURIA", value: "1" },
            { text: "Atual formação do time", value: "2" },
            { text: "Próximas partidas", value: "3" },
            { text: "Resultados dos últimos jogos", value: "4" },
            { text: "Quem já jogou pela FURIA", value: "5" }
        ];
        this.createButtons(options, (value) => this.handleMainOption(value));
    }

    displayBotMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messageElement.classList.add('bot-message');
        this.chatBox.appendChild(messageElement);
        this.chatBox.scrollTop = this.chatBox.scrollHeight;
    }

    displayUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messageElement.classList.add('user-message');
        this.chatBox.appendChild(messageElement);
        this.chatBox.scrollTop = this.chatBox.scrollHeight;
    }

    clearButtons() {
        this.buttonContainer.innerHTML = '';
    }

    createButtons(options, callback) {
        this.clearButtons();
        options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option.text;
            button.classList.add('button-option');
            button.addEventListener('click', () => callback(option.value));
            this.buttonContainer.appendChild(button);
        });
    }

    handleMainOption(option) {
        this.displayUserMessage(`Você escolheu: ${option}`);
        this.clearButtons();

        switch (option) {
            case "1":
                this.showAboutUs();
                break;
            case "2":
                this.showCurrentTeamOptions();
                break;
            case "3":
                this.showNextGameInfo();
                break;
            case "4":
                this.showLastGamesInfo();
                break;
            case "5":
                this.showLastPlayersInfo();
                break;
            default:
                this.displayBotMessage("Opção inválida. Tente novamente.");
                this.showOptions();
        }
    }

    showAboutUs() {
        this.displayBotMessage("Somos FURIA. Uma organização de esports que nasceu do desejo de representar o Brasil no CS e conquistou muito mais que isso...");
        this.backToMenu();
    }

    showCurrentTeamOptions() {
        this.clearButtons();
        this.displayBotMessage("O atual time de Counter-Strike da FURIA é composto pelos membros:");
        const players = [
            { text: "FalleN", value: "1" },
            { text: "yuurih", value: "2" },
            { text: "KSCERATO", value: "3" },
            { text: "molodoy", value: "4" },
            { text: "YEKINDAR", value: "5" },
            { text: "sidde (Treinador)", value: "6" },
            { text: "Hepa (Assistente)", value: "7" },
            { text: "Voltar", value: "0" }
        ];
        this.createButtons(players, (value) => this.handlePlayerOption(value));
    }

    handlePlayerOption(option) {
        this.displayUserMessage(`Você escolheu: ${option}`);
        this.clearButtons();

        const playerInfos = {
            "1": "FalleN: Nascido em 30/05/1991, líder de duas conquistas de Major...",
            "2": "yuurih: Brasileiro nascido em 22/12/1999, referência no cenário nacional.",
            "3": "KSCERATO: Promovido da FURIA Academy em 2018, estrela em ascensão.",
            "4": "molodoy: AWPer cazaque de 20 anos, destaque da AMKAL em 2025.",
            "5": "YEKINDAR: Letão agressivo e confiante, famoso pela Virtus.pro.",
            "6": "sidde: Técnico focado em disciplina e comunicação.",
            "7": "Hepa: Conhecido pela inteligência tática e leitura de jogo."
        };

        if (option === "0") {
            this.showOptions();
            return;
        }

        if (playerInfos[option]) {
            this.displayBotMessage(playerInfos[option]);
        } else {
            this.displayBotMessage("Opção inválida.");
        }

        this.askAnotherPlayer();
    }

    askAnotherPlayer() {
        this.clearButtons(); // <<<<< limpar antes
        this.displayBotMessage("Deseja saber sobre outro integrante?");
        const options = [
            { text: "Sim", value: "yes" },
            { text: "Não", value: "no" }
        ];
        this.createButtons(options, (choice) => {
            if (choice === "yes") {
                this.showCurrentTeamOptions();
            } else {
                this.showOptions();
            }
        });
    }

    showNextGameInfo() {
        this.displayBotMessage("Em breve teremos atualizações sobre os próximos jogos da FURIA! Fique ligado!");
        this.backToMenu();
    }

    showLastGamesInfo() {
        this.displayBotMessage("Últimos resultados:");
        this.displayBotMessage("- FURIA 2x1 Team Liquid");
        this.displayBotMessage("- FURIA 1x2 G2 Esports");
        this.displayBotMessage("- FURIA 2x0 Imperial");
        this.backToMenu();
    }

    showLastPlayersInfo() {
        this.displayBotMessage("Grandes nomes que já passaram pela FURIA:");
        this.displayBotMessage("- VINI");
        this.displayBotMessage("- arT");
        this.displayBotMessage("- KSCERATO");
        this.displayBotMessage("- yuurih");
        this.displayBotMessage("- chelo");
        this.backToMenu();
    }

    backToMenu() {
        this.clearButtons();
        this.displayBotMessage("O que mais deseja saber?");
        const options = [
            { text: "Voltar ao menu principal", value: "menu" }
        ];
        this.createButtons(options, (value) => {
            if (value === "menu") {
                this.showOptions();
            }
        });
    }
}