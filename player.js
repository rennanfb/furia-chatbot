class Player {
    constructor(name, id, role, description) {
        this.name = name;
        this.id = id;
        this.role = role || "Jogador";
        this.description = description || "Sem descrição disponível.";
    }

    getPlayerDescription() {
        return this.description;
    }
}

// Exporta a classe para ser utilizada em outros arquivos
export default Player;