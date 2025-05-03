import { UIManager } from './UIManager.js';
import Team from './Team.js';

export class ConversationManager {
    // Creates an instance of ConversationManager.
    constructor() {
        this.uiManager = new UIManager('chat-box', 'button-container');
        this.team = new Team();
    }

    // Load team players from a data file
    async initialize() {
        await this.team.loadPlayersFromFile();
    }

    // Load messages from a data file
    async loadMessages(fileName) {
        try {
            const response = await fetch(`data/${fileName}`);
            const data = await response.json();
            return data.messages || [];
        } catch (error) {
            console.error(`Erro ao carregar o arquivo ${fileName}:`, error);
            return ["Desculpe, não conseguimos carregar as mensagens agora."];
        }
    }

    // Load and display introduction messages
    async displayIntro() {
        this.uiManager.clearMessages();

        const msgs = await this.loadMessages("introMessages.json");
        msgs.forEach(msg => this.uiManager.displayBotMessage(msg));

        this.displayMainOptions();
    }

    // Display main conversation options
    displayMainOptions() {
        this.uiManager.clearButtons();
        this.uiManager.displayBotMessage("Sobre o que está curioso?");
        const options = [
            { text: "O que é a FURIA?", value: "1" },
            { text: "Atual formação do time", value: "2" },
            { text: "Próximas partidas", value: "3" },
            { text: "Sobre os últimos jogos", value: "4" },
            { text: "Quem já jogou pela FURIA", value: "5" }
        ];
        this.uiManager.createButtons(options, (value) => this.handleMainOption(value));
    }

    // Load and display about us messages
    async displayAboutUs() {
        const msgs = await this.loadMessages("aboutUsMessages.json");
        msgs.forEach(msg => this.uiManager.displayBotMessage(msg));

        this.backToMenu();
    }

    // Display players from current team and options for more information about them
    displayCurrentTeamOptions() {
        this.uiManager.clearButtons();
    
        this.uiManager.displayBotMessage("O atual time de Counter-Strike da FURIA é composto pelos membros:");
    
        const players = this.team.getPlayers(); 
    
        players.forEach(player => { this.uiManager.displayBotMessage(`• ${player.name} - ${player.role}`);
        });

        this.uiManager.displayBotMessage("Gostaria de saber mais sobre quem?");

        const playerOptions = players.map(player => ({
            text: player.name,
            value: player.id
        }));
    
        playerOptions.push({ text: "Ninguém", value: "0" });
    
        this.uiManager.createButtons(playerOptions, (selectedValue) => {
            this.handlePlayerOption(selectedValue);
        });
    }

    // Ask for another player
    askAnotherPlayer() {
        this.uiManager.clearButtons(); 

        this.uiManager.displayBotMessage("Deseja saber sobre outro integrante?");
        const options = [
            { text: "Sim", value: "yes" },
            { text: "Não", value: "no" }
        ];
        this.uiManager.createButtons(options, (choice) => {
            if (choice === "yes") {
                this.uiManager.displayUserMessage("Sim, eu gostaria");

                this.displayCurrentTeamOptions();
            } else {
                this.uiManager.displayUserMessage("Por enquanto, não")
                this.displayMainOptions();
            }
        });
    }

    // Load and display next game messages
    async displayNextGame() {
        const msgs = await this.loadMessages("nextGameMessages.json");
        msgs.forEach(msg => this.uiManager.displayBotMessage(msg));

        this.backToMenu();
    }

    // Load and display previous games messages
    async displayPreviousGames() {
        const msgs = await this.loadMessages("lastGameMessages.json");
        msgs.forEach(msg => this.uiManager.displayBotMessage(msg));

        this.backToMenu();
    }

    // Load and display former players
    async displayFormerPlayers() {
        this.uiManager.displayBotMessage("A FURIA já contou com diversos jogadores fenomenais, como:");

        const msgs = await this.loadMessages("formerPlayers.json");
        msgs.forEach(msg => this.uiManager.displayBotMessage(`• ${msg}`));

        this.backToMenu();
    }

    // Asks if the conversation should goes on
    backToMenu() {
        this.uiManager.clearButtons();

        this.uiManager.displayBotMessage("Mais alguma duvida?")

        const options = [
            { text: "Quero outras informações", value: "menu" },
            { text: "Encerrar conversa", value : "encerrar"}
        ];

        this.uiManager.createButtons(options, (value) => {
            switch (value) {
                case "menu":
                    this.uiManager.displayUserMessage("Eu gostaria de saber mais sobre a FURIA")
                    this.displayMainOptions();
                    break;
        
                case "encerrar":
                    this.uiManager.displayUserMessage("Estou satisfeito por enquanto, obrigado.")
                    this.endConversation();
                    break;
            }
        });
    }

    // End the conversation end provide a button to restart
    endConversation() {
        this.uiManager.clearButtons();
        this.uiManager.displayBotMessage("Obrigado pela conversa furioso, se precisar de mais informações estarei aqui.")

        const options = [
            { text: "ChatBot, está ai?", value: "1" },
        ];
        this.uiManager.createButtons(options, (value) => this.displayIntro())
    }

    // Read the response from the main options and answers it
    handleMainOption(option) {
        this.uiManager.clearButtons();

        switch (option) {
            case "1":
                this.uiManager.displayUserMessage("Eu quero saber mais sobre a FURIA")
                this.displayAboutUs();
                break;
            case "2":
                this.uiManager.displayUserMessage("Qual a atual escalação do time ?")
                this.displayCurrentTeamOptions();
                break;
            case "3":
                this.uiManager.displayUserMessage("Quando será o proximo jogo da FURIA ?")
                this.displayNextGame();
                break;
            case "4":
                this.uiManager.displayUserMessage("Como foi o resultado dos ultimos jogos ?")
                this.displayPreviousGames();
                break;
            case "5":
                this.uiManager.displayUserMessage("Quem ja jogou pela FURIA ?")
                this.displayFormerPlayers();
                break;
            default:
                this.uiManager.displayBotMessage("Opção inválida. Tente novamente.");
                this.displayMainOptions();
        }
    }

    // Read the response from the current team options and answers it
    handlePlayerOption(option) {

        if (option === "0") {
            this.uiManager.displayUserMessage("Por enquanto, ninguém")
            this.displayMainOptions(); 
            return;  
        }
        const player = this.team.getPlayerById(option);

        this.uiManager.displayUserMessage(`Quero saber mais sobre ${player.name}`);
        this.uiManager.clearButtons();

        if (player) {
            const descriptions = player.getPlayerDescription();
        
            descriptions.forEach(description => { this.uiManager.displayBotMessage(description);});
        } else {
            this.uiManager.displayBotMessage("Opção inválida.");
        }

        this.askAnotherPlayer();
    }
}