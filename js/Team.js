import Player from './Player.js';

class Team {
    // Creates an instance of Team
    constructor() {
        // List to store the team players
        this.players = [];
    }

    // Load players from a JSON File
    async loadPlayersFromFile(fileName = 'currentPlayers.json') {
        try {
            const response = await fetch(`./data/${fileName}`);
            const data = await response.json();
            this.players = data.players.map(
                p => new Player(p.name, p.id, p.role, p.description)
            );
        } catch (error) {
            console.error(`Erro ao carregar o arquivo ${fileName}:`, error);
            this.players = [];
        }
    }

    // Returns a player by the id 
    getPlayerById(id) {
        return this.players.find(player => player.id === id);
    }

    // Returns all players from the team
    getPlayers() {
        return this.players;
    }
}

export default Team;