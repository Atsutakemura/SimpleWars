class Group {
    constructor(ruler, id) {
        this.game = ruler.game;
        this.scene = this.game.scene;
        this.ruler = ruler;
        this.data = this.game.unitlists[ruler.data['user_id']][id];
        this.root = new BABYLON.TransformNode('root', this.scene);
        this.units = [];
        this.mass = 0;
        this.subsidence = 0;	// height ~ ground
        this.destination = null;
        this.command = this.game.selectionManager.Commands.IDLE;
        this.commandable = true;

        this.addUnits();    // create amount of units
    }

    addUnits() {
        for (let i = 0; i < this.data['unitlist_count']; i++) {
            this.addUnit();
        }
		
		const formation = Formations.CircularGrouping(this.units, BABYLON.Vector3.Zero(), 0);	// start Formation positions
        for (let i = 0; i < this.units.length; i++) {
            this.units[i].root.position = formation[i];
        }
		
		this.speed = this.units[0] ? this.units[0].speed : 0;
    }

    addUnit() {
        const newUnit = new Unit(this);
        this.mass += newUnit.mass;
        this.units.push(newUnit);
		
        if(this.game.userId === this.ruler.data['user_id']) {	// Main Player
            this.game.userUnits.push(newUnit.root);
        }
        else {
            if(this.ruler.data['user_type'] < 1000) {  // not Neutral
                this.game.enemyUnits.push(newUnit);
            }
            this.game.otherUnits.push(newUnit);
        }
    }
	
	regroup(center = BABYLON.Vector3.Zero()) {	// lerp regrouping of units
		const formation = Formations.CircularGrouping(this.units, center, 0);
        for (let i = 0; i < this.units.length; i++) {
			this.game.selectionManager.addRegrouped(this.units[i], formation[i]);
        }
	}

    execute(dT) {	// execute Command (Move, Attack)
        if(this.root.position.equals(this.destination)) {
            this.game.selectionManager.removeCommanded(this);
        }
        else {
            BABYLON.Vector3.LerpToRef(this.root.position, this.destination, dT * this.speed, this.root.position);
        }
    }
}