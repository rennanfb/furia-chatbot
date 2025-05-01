import { UIManager } from './UIManager.js';
import Team from './team.js';

export class ConversationManager {
    constructor() {
        this.uiManager = new UIManager('chat-box', 'button-container');
        this.team = new Team();
    }

    showIntroduction() {
        this.uiManager.clearMessages();

        const msgs = [
            "Fala furioso, seja bem-vindo ao canal de Counter-Strike do Time FURIA, eu sou o FuriaChatBot!",

            "Tenho diversas informações sobre o nosso time ao seu dispor."
        ];
        msgs.forEach(msg => this.uiManager.displayBotMessage(msg));

        this.showOptions();
    }

    showOptions() {
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

                this.showCurrentTeamOptions();
            } else {
                this.uiManager.displayUserMessage("Por enquanto, não")
                this.showOptions();
            }
        });
    }

    showAboutUs() {
        const msgs = [
            `Somos FURIA. Uma organização de esports que nasceu do desejo de representar o Brasil no CS 
            e conquistou muito mais que isso: expandimos nossas ligas, disputamos os principais títulos, adotamos novos objetivos 
            e ganhamos um propósito maior.`,

            `Somos muito mais que o sucesso competitivo, somos um movimento sociocultural. 
            Nossa história é de pioneirismo, grandes conquistas e tradição. Nosso presente é de desejo, garra e estratégia. `,

            `A pantera estampada no peito estampa também nosso futuro de glória. Nossos pilares de performance, lifestyle, 
            conteúdo, business, tecnologia e social são os principais constituintes do movimento FURIA, que representa uma 
            unidade que respeita as individualidades e impacta positivamente os contextos em que se insere.`,

            `Unimos pessoas e alimentamos sonhos dentro e fora dos jogos.`
        ];
        msgs.forEach(msg => this.uiManager.displayBotMessage(msg));
        this.backToMenu();
    }

    showCurrentTeamOptions() {
        this.uiManager.clearButtons();
    
        this.uiManager.displayBotMessage("O atual time de Counter-Strike da FURIA é composto pelos membros:");
    
        const players = this.team.getPlayers(); 
    
        players.forEach(player => {
            this.uiManager.displayBotMessage(`• ${player.name} - ${player.role}`);
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

    showNextGameInfo() {
        const msgs = [
            `O proximo confronto do time da FURIA, ainda não tem data exata definida, mas será no PGL Astana 2025.`,

            `O PGL Astana 2025 é um dos principais torneios de Counter-Strike 2 (CS2) do ano, reunindo 16 das 
            melhores equipes do mundo em uma competição de alto nível.`,

            `O evento acontecerá de 10 a 18 de maio de 2025, na Barys Arena, localizada em 
            Astana, capital do Cazaquistão .`,

        ];
        msgs.forEach(msg => this.uiManager.displayBotMessage(msg));

        this.backToMenu();
    }

    showLastGamesInfo() {

        const msgs = [
            "FURIA 0:2 TheMongolz | PGL Bucharest 2025 | 09/04/2025 | Escalação: FalleN, chelo, yuurih, KSCERATO, skullz",

            "FURIA 0:2 Virtus.pro | PGL Bucharest 2025 | 08/04/2025 | Escalação: FalleN, chelo, yuurih, KSCERATO, skullz",

            "FURIA 1:2 Complexity Gaming | PGL Bucharest 2025 | 07/04/2025 | Escalação: FalleN, chelo, yuurih, KSCERATO, skullz",

            "FURIA 2:0 Apogee Esports | PGL Bucharest 2025 | 06/04/2025 | Escalação: FalleN, chelo, yuurih, KSCERATO, skullz"

        ];
        msgs.forEach(msg => this.uiManager.displayBotMessage(msg));

        this.backToMenu();
    }

    showLastPlayersInfo() {

        const names = [
            "skullz - Felipe Medeiros",
            "chelo - Marcelos Cespedes",
            "kye - Kayke Bertolucci",
            "arT - Andrei Piovezan",
            "Wicadia - Ali Haydar Yalçın",
            "MAJ3R - Engin Kupeli",
            "Woxic - Özgür Eker",
            "Calyx - Buğra Arkın",
            "XANTARES - Can Dörtkardeş",
            "drop - André Abreu",
            "saffee - Rafael Costa",
            "VINI - Vinicius Figueiredo",
            "guerri - Nicholas Nogueira",
            "honda - Lucas Cano",
            "junior - Paytyn Johnson",
            "HEN1 - Henrique Teles",
            "LUCAS1 - Lucas Teles",
            "ableJ - Rinaldo Moda Junior",
            "spacca - Guilherme Spacca"
        ];

        this.uiManager.displayBotMessage("A FURIA já contou com diversos jogadores fenomenais, como:");
        names.forEach(name => this.uiManager.displayBotMessage(`• ${name}`));

        this.backToMenu();
    }

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
                    this.showOptions();
                    break;
        
                case "encerrar":
                    this.uiManager.displayUserMessage("Estou satisfeito por enquanto, obrigado.")
                    this.endConversation();
                    break;
            }
        });
    }

    endConversation() {
        this.uiManager.clearButtons();
        this.uiManager.displayBotMessage("Obrigado pela conversa furioso, se precisar de mais informações estarei aqui.")

        const options = [
            { text: "FuriaChatBot, está ai?", value: "1" },
        ];
        this.uiManager.createButtons(options, (value) => this.showIntroduction())
    }

    handleMainOption(option) {
        this.uiManager.clearButtons();

        switch (option) {
            case "1":
                this.uiManager.displayUserMessage("Eu quero saber mais sobre a FURIA")
                this.showAboutUs();
                break;
            case "2":
                this.uiManager.displayUserMessage("Qual a atual escalação do time ?")
                this.showCurrentTeamOptions();
                break;
            case "3":
                this.uiManager.displayUserMessage("Quando será o proximo jogo da FURIA ?")
                this.showNextGameInfo();
                break;
            case "4":
                this.uiManager.displayUserMessage("Como foi o resultado dos ultimos jogos ?")
                this.showLastGamesInfo();
                break;
            case "5":
                this.uiManager.displayUserMessage("Quem ja jogou pela FURIA ?")
                this.showLastPlayersInfo();
                break;
            default:
                this.uiManager.displayBotMessage("Opção inválida. Tente novamente.");
                this.showOptions();
        }
    }

    handlePlayerOption(option) {

        if (option === "0") {
            this.uiManager.displayUserMessage("Por enquanto, ninguém")
            this.showOptions(); 
            return;  
        }
        const player = this.team.getPlayerById(option);

        this.uiManager.displayUserMessage(`Quero saber mais sobre ${player.name}`);
        this.uiManager.clearButtons();

        if (player) {
            const descriptions = player.getPlayerDescription();
        
            descriptions.forEach(description => {
                this.uiManager.displayBotMessage(description);
            });
        } else {
            this.uiManager.displayBotMessage("Opção inválida.");
        }

        this.askAnotherPlayer();
    }
}