class Player {
    // Creates an instance of Player
    constructor(name, id, role, description) {
        this.name = name;
        this.id = id;
        this.role = role;
        this.description = description ;
    }

    // Returns player description
    getPlayerDescription() {
        return this.description;
    }
}

export default Player;