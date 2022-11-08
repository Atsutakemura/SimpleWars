class Ruler {   // Player, AI or Neutral
    constructor (game, id) {
        this.game = game;
		
        this.data = game.users[id];
		this.role = game.roles[id];

		this.spawns = [];
        this.buildings = [];
        this.groups = [];

        if(this.data['user_type'] < 1000) {  // not Neutral
			if(this.role === game.roleTypes.DEFENDER) {
				this.position = game.ground.constants['ground_spawns'][this.role].scale(game.ground.groundSize);	// start position per user role
				for(let i=0; i<game.buildlists[this.data['user_id']].length; i++) {
					this.addBuilding(i);
				}
				
				for (let i=0; i<game.unitlists[this.data['user_id']].length; i++) {
					this.addGroup(i);
				}
				
				this.setFormation(this.buildings[0].root.position.subtract(game.spawnOffset));	// set start spawn of unit groups
			}
			else if(this.role === game.roleTypes.ATTACKER) {
				this.spawns[0] = game.ground.spawns[this.role];	// start attacker spawn
				this.position = this.spawns[0].root.position;	// start position per user role
				this.addGroup(0);	// add start unit group
				
				this.reinforces = [];
				for (let i=1; i<game.unitlists[this.data['user_id']].length; i++) {
					this.addReinforce(i);
				}

				this.setFormation(this.spawns[0].root.position);	// set start spawn of unit groups
			}
        }
    }

    addGroup(id) {    // unitlist data of DB
        const newGroup = new Group(this, id);
        this.groups.push(newGroup);
		
		if(this.game.userId === this.data['user_id']) {	// Main Player
			this.game.userGroups.push(newGroup);
		}
    }
	
	addReinforce(id) {    // unitlist data of DB
        const newGroup = new Group(this, id);
		newGroup.root.setEnabled(false);
        this.reinforces.push(newGroup);
    }
	
	spawnReinforce() {	// spawn reinforcement (group) at destination
	}

    setFormation(center = BABYLON.Vector3.Zero()) {
        const formation = Formations.CircularGrouping(this.groups, center);
        for (let i = 0; i < this.groups.length; i++) {
            this.groups[i].root.position = formation[i];
        }
    }

    addBuilding(id) {    // id of buildlist data of DB
        const newBuilding = new Building(this, id);
        this.buildings.push(newBuilding);
    }
}