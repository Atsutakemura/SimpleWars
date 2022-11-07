class Unit {
    constructor(game, group) {
        this.game = game;
        this.scene = game.scene;
        this.group = group;
        this.selectionManager = game.selectionManager;
        this.mass = game.unitRegister[group.data['unitlist_unit_id']]['unit_mass']*common.UNIT_SCALE;
        this.health = game.unitRegister[group.data['unitlist_unit_id']]['unit_structure'];
        this.speed = game.unitRegister[group.data['unitlist_unit_id']]['unit_speed']*common.SPEED_SCALE;
        this.range = game.unitRegister[group.data['unitlist_unit_id']]['unit_range'];
        this.subsidence = game.unitRegister[group.data['unitlist_unit_id']]['unit_ground'];
        this.root = BABYLON.MeshBuilder.CreateSphere('unit:mesh', {diameter: this.mass}, this.scene);
        this.root.parent = group.root;

        this.root.material = new BABYLON.StandardMaterial('green', this.scene)
        if (game.userId === group.ruler.data['user_id']) {
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

    takeDamage (amount) {
        this.health -= amount
        if (this.health < 1) {
            this.explode()
        }
    }

    explode () {
        this.root.dispose()
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