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

export default Player;