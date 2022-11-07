class Unit {
    constructor(group) {
        this.game = group.game;
        this.scene = this.game.scene;
        this.group = group;
        this.selectionManager = this.game.selectionManager;
		
        this.mass = this.game.unitRegister[group.data['unitlist_unit_id']]['unit_mass']*common.UNIT_SCALE;
        this.health = this.game.unitRegister[group.data['unitlist_unit_id']]['unit_structure'];
        this.speed = this.game.unitRegister[group.data['unitlist_unit_id']]['unit_speed']*common.UNIT_SPEED_SCALE;
        this.range = this.game.unitRegister[group.data['unitlist_unit_id']]['unit_range'];
        this.subsidence = this.game.unitRegister[group.data['unitlist_unit_id']]['unit_ground'];
        this.root = BABYLON.MeshBuilder.CreateSphere('unit:mesh', {diameter: this.mass}, this.scene);
        this.root.parent = group.root;
		this.destination = null;

        this.root.material = new BABYLON.StandardMaterial('green', this.scene)
        if (this.game.userId === group.ruler.data['user_id']) {
            this.root.material.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.8)
            this.root.material.specularColor = new BABYLON.Color3(0.4, 0.4, 0.8)
        }
        else {
            this.root.material.diffuseColor = new BABYLON.Color3(0.8, 0.4, 0.4)
            this.root.material.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4)
        }

        this.lastFire = 0;

        this.root.actionManager = new BABYLON.ActionManager(this.scene);
        this.root.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, (evt) => {
            if(this.selectionManager.selecteds.indexOf(this.group) < 0) {  // group not selected
                this.selectionManager.clear();
                this.selectionManager.select(this.group);
            }
        }));
        this.root.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, () => {
            this.scene.hoverCursor = 'pointer';
        }));
    }

    takeDamage(amount) {
        this.health -= amount;
        if (this.health < 1) {
			this.group.regroup();
            this.die();
        }
    }

    explode() {
        this.root.die();
    }
	
	execute(dT) {	// execute command
        if(this.root.position.equals(this.destination)) {
            this.game.selectionManager.removeRegrouped(this);
        }
        else {
            BABYLON.Vector3.LerpToRef(this.root.position, this.destination, dT * this.speed, this.root.position);
        }
    }

    fire() {
        this.lastFire = Date.now();
    }

    battle() {
        if(Date.now() - this.lastFire > 1000) { // 1 sec after last fire
            this.validFire = false;
            for (let i=0; i<this.enemyUnits; i++) {
                if(Formations.Distance2D(this.root.position, this.enemyUnits[i].root.position) <= this.range) {
                    this.target = this.enemyUnits[i];
                    this.validFire = true;
                }
            }

            if(this.validFire) {
                this.fire();
            }
        }
    }
}