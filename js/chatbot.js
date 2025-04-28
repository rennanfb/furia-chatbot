import Team from './team.js';

export class ChatBot {
    constructor(name) {
        this.name = name;
        this.chatBox = document.getElementById('chat-box');
        this.buttonContainer = document.getElementById('button-container');
        this.team = new Team();
    }

    showIntroduction() {
        this.clearMessages();

        this.displayBotMessage("Fala furioso, seja bem-vindo ao canal de Counter-Strike do Time FURIA, eu sou o FuriaChatBot!");
        this.displayBotMessage("Tenho diversas informações sobre o nosso time ao seu dispor.");

        this.showOptions();
    }

    showOptions() {
        this.clearButtons();
        this.displayBotMessage("Sobre o que está curioso?");
        const options = [
            { text: "O que é a FURIA?", value: "1" },
            { text: "Atual formação do time", value: "2" },
            { text: "Próximas partidas", value: "3" },
            { text: "Sobre os últimos jogos", value: "4" },
            { text: "Quem já jogou pela FURIA", value: "5" }
        ];
        this.createButtons(options, (value) => this.handleMainOption(value));
    }

    askAnotherPlayer() {
        this.clearButtons(); 

        this.displayBotMessage("Deseja saber sobre outro integrante?");
        const options = [
            { text: "Sim", value: "yes" },
            { text: "Não", value: "no" }
        ];
        this.createButtons(options, (choice) => {
            if (choice === "yes") {
                this.displayUserMessage("sim, eu gostaria");

                this.showCurrentTeamOptions();
            } else {
                this.displayUserMessage("Por enquanto, não")
                this.showOptions();
            }
        });
    }

    endConversation() {
        this.clearButtons();
        this.displayBotMessage("Obrigado pela conversa furioso, se precisar de mais informações estarei aqui.")

        const options = [
            { text: "FuriaChatBot, está ai?", value: "1" },
        ];
        this.createButtons(options, (value) => this.showIntroduction())
    }

    backToMenu() {
        this.clearButtons();

        this.displayBotMessage("Mais alguma duvida?")

        const options = [
            { text: "Quero outras informações", value: "menu" },
            { text: "Encerrar conversa", value : "encerrar"}
        ];

        this.createButtons(options, (value) => {
            switch (value) {
                case "menu":
                    this.displayUserMessage("Eu gostaria de saber mais sobre a FURIA")
                    this.showOptions();
                    break;
        
                case "encerrar":
                    this.displayUserMessage("Estou satisfeito por enquanto, obrigado.")
                    this.endConversation();
                    break;
            }
        });
    }

    handleMainOption(option) {
        this.clearButtons();

        switch (option) {
            case "1":
                this.displayUserMessage("Eu quero saber mais sobre a FURIA")
                this.showAboutUs();
                break;
            case "2":
                this.displayUserMessage("Qual a atual escalação do time ?")
                this.showCurrentTeamOptions();
                break;
            case "3":
                this.displayUserMessage("Quando será o proximo jogo da FURIA ?")
                this.showNextGameInfo();
                break;
            case "4":
                this.displayUserMessage("Como foi o resultado dos ultimos jogos ?")
                this.showLastGamesInfo();
                break;
            case "5":
                this.displayUserMessage("Quem ja jogou pela FURIA ?")
                this.showLastPlayersInfo();
                break;
            default:
                this.displayBotMessage("Opção inválida. Tente novamente.");
                this.showOptions();
        }
    }

    handlePlayerOption(option) {

        if (option === "0") {
            this.displayUserMessage("Por enquanto, não")
            this.showOptions(); 
            return;  
        }
        const player = this.team.getPlayerById(option);

        this.displayUserMessage(`Quero saber mais sobre ${player.name}`);
        this.clearButtons();

        if (player) {
            const descriptions = player.getPlayerDescription();
        
            descriptions.forEach(description => {
                this.displayBotMessage(description);
            });
        } else {
            this.displayBotMessage("Opção inválida.");
        }

        this.askAnotherPlayer();
    }

    showAboutUs() {
        this.displayBotMessage(`Somos FURIA. Uma organização de esports que nasceu do desejo de representar o Brasil no CS 
            e conquistou muito mais que isso: expandimos nossas ligas, disputamos os principais títulos, adotamos novos objetivos 
            e ganhamos um propósito maior.`);

        this.displayBotMessage(`Somos muito mais que o sucesso competitivo, somos um movimento sociocultural. 
            Nossa história é de pioneirismo, grandes conquistas e tradição. Nosso presente é de desejo, garra e estratégia. `);

        this.displayBotMessage(`A pantera estampada no peito estampa também nosso futuro de glória. Nossos pilares de performance, lifestyle, 
            conteúdo, business, tecnologia e social são os principais constituintes do movimento FURIA, que representa uma 
            unidade que respeita as individualidades e impacta positivamente os contextos em que se insere.`);

        this.displayBotMessage(`Unimos pessoas e alimentamos sonhos dentro e fora dos jogos.`);

        this.backToMenu();
    }

    showCurrentTeamOptions() {
        this.clearButtons();
    
        this.displayBotMessage("O atual time de Counter-Strike da FURIA é composto pelos membros:");
    
        const players = this.team.getPlayers(); 
    
        players.forEach(player => {
            this.displayBotMessage(`• ${player.name} - ${player.role}`);
        });

        this.displayBotMessage("Quer mais informações sobre algum deles?");

        const playerOptions = players.map(player => ({
            text: player.name,
            value: player.id
        }));
    
        playerOptions.push({ text: "Não", value: "0" });
    
        this.createButtons(playerOptions, (selectedValue) => {
            this.handlePlayerOption(selectedValue);
        });
    }

    showNextGameInfo() {
        this.displayBotMessage(`O proximo confronto do time da FURIA, ainda não tem data exata definida, mas será no PGL Astana 2025.`);

        this.displayBotMessage(`O PGL Astana 2025 é um dos principais torneios de Counter-Strike 2 (CS2) do ano, reunindo 16 das 
            melhores equipes do mundo em uma competição de alto nível.`);

         this.displayBotMessage(`O evento acontecerá de 10 a 18 de maio de 2025, na Barys Arena, localizada em 
            Astana, capital do Cazaquistão .`);

        this.backToMenu();
    }

    showLastGamesInfo() {
        this.displayBotMessage("FURIA 0:2 TheMongolz | PGL Bucharest 2025 | 09/04/2025 | Escalação: FalleN, chelo, yuurih, KSCERATO, skullz");
        this.displayBotMessage("FURIA 0:2 Virtus.pro | PGL Bucharest 2025 | 08/04/2025 | Escalação: FalleN, chelo, yuurih, KSCERATO, skullz");
        this.displayBotMessage("FURIA 1:2 Complexity Gaming | PGL Bucharest 2025 | 07/04/2025 | Escalação: FalleN, chelo, yuurih, KSCERATO, skullz");
        this.displayBotMessage("FURIA 2:0 Apogee Esports | PGL Bucharest 2025 | 06/04/2025 | Escalação: FalleN, chelo, yuurih, KSCERATO, skullz");
        this.backToMenu();
    }

    showLastPlayersInfo() {
        this.displayBotMessage("A FURIA ja contou com diversos jogadores fenomenais, como");
        this.displayBotMessage("• skullz - Felipe Medeiros");
        this.displayBotMessage("• chelo - Marcelos Cespedes");
        this.displayBotMessage("• kye - Kayke Bertolucci");
        this.displayBotMessage("• arT - Andrei Piovezan");
        this.displayBotMessage("• Wicadia - Ali Haydar Yalçın");
        this.displayBotMessage("• MAJ3R - Engin Kupeli");
        this.displayBotMessage("• Woxic - Özgür Eker");
        this.displayBotMessage("• Calyx - Buğra Arkın");
        this.displayBotMessage("• XANTARES - Can Dörtkardeş");
        this.displayBotMessage("• drop - André Abreu");
        this.displayBotMessage("• saffee - Rafael Costa");
        this.displayBotMessage("• VINI - Vinicius Figueiredo");
        this.displayBotMessage("• guerri - Nicholas Nogueira");
        this.displayBotMessage("• honda - Lucas Cano");
        this.displayBotMessage("• junior - Paytyn Johnson");
        this.displayBotMessage("• HEN1 - Henrique Teles");
        this.displayBotMessage("• LUCAS1 - Lucas Teles");
        this.displayBotMessage("• ableJ - Rinaldo Moda Junior");
        this.displayBotMessage("• spacca - Guilherme Spacca");

        this.backToMenu();
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

    clearMessages() {
        this.chatBox.innerHTML = '';
    }

}