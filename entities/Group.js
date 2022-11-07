class Group {
    constructor(game, ruler, data) {
        this.game = game;
        this.scene = game.scene;
        this.ruler = ruler;
        this.data = data;
        this.root = new BABYLON.TransformNode('root', game.scene);
        this.units = [];
        this.mass = 0;
        this.subsidence = 0;
        this.destination = null;
        this.command = 0;
        this.commandable = true;

        this.addUnits(data);    // create amount of units
        this.speed = this.units[0].speed;
    }

    addUnits(data) {
        for (let i = 0; i < data['unitlist_count']; i++) {
            this.addUnit(data['unitlist_unit_id']);
        }
    }

    addUnit(id) {
        let newUnit = new Unit(this.game, this, id);
        this.mass += newUnit.mass;
        this.units.push(newUnit);
        if(this.game.userId === this.ruler.data['user_id']) {
            this.game.userUnits.push(newUnit.root);
        }
        else {
            if(this.ruler.data['user_type'] < 1000) {  // not Neutral
                this.game.enemyUnits.push(newUnit);
            }
            this.game.otherUnits.push(newUnit);
        }
    }

    setCenter() {
        this.root.position.addInPlace(Formations.getCentroid(this.units));
    }

    setFormation(center = BABYLON.Vector3.Zero()) {
        let formation = Formations.circularGrouping(this.units, center, 0);
        for (let i = 0; i < this.units.length; i++) {
            this.units[i].root.position = formation[i];
        }
    }

    execute(dT) {
        if(this.root.position.equals(this.destination)) {
            this.game.selectionManager.removeCommanded(this);
        }
        else {
            BABYLON.Vector3.LerpToRef(this.root.position, this.destination, dT * this.speed, this.root.position);
        }
    }
}