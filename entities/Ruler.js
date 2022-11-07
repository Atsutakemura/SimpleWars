class Ruler {   // Player, AI or Neutral
    constructor (game, data, position) {
        this.game = game;
        this.data = data;
        this.position = position;
        this.buildings = [];
        this.groups = [];

        if(data['user_type'] < 1000) {  // not Neutral
            for(let i=0; i<common.START_BUILDINGS.length; i++) {
                this.addBuilding(common.START_BUILDINGS[i]);
            }

            for (let i = 0; i < common.START_UNITS.length; i++) {
                this.addGroup(common.START_UNITS[i]);
            }

            this.setFormation(this.buildings[0].root.position.subtract(game.spawnOffset));	// set start spawn of unit groups
        }
    }

    addGroup(data) {    // unitlist data of DB
        const newGroup = new Group(this.game, this, data);
        this.groups.push(newGroup);
		
		if(this.game.userId === this.data['user_id']) {	// Main Player
			this.game.userGroups.push(newGroup);
		}
    }

    setFormation(center = BABYLON.Vector3.Zero()) {
        const formation = Formations.CircularGrouping(this.groups, center);
        for (let i = 0; i < this.groups.length; i++) {
            this.groups[i].root.position = formation[i];
        }
    }

    addBuilding(data) {    // buildlist data of DB
        const newBuilding = new Building(this.game, this, data);
        this.buildings.push(newBuilding);
    }
}