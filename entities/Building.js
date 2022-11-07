class Building {
    constructor (ruler, data) {
        this.game = ruler.game;
        this.scene = this.game.scene;
        this.selectionManager = this.game.selectionManager;
        this.ruler = ruler;
        this.data = data;
        this.mass = this.game.buildingRegister[data['buildlist_building_id']]['building_mass'];
        this.health = this.game.buildingRegister[data['buildlist_building_id']]['building_structure'];
        this.root = BABYLON.MeshBuilder.CreateSphere('building:mesh', {diameter: this.mass*common.BUILDING_SCALE}, this.scene);
        this.root.position = ruler.position.add(this.game.buildingRegister[data['buildlist_building_id']]['building_position']);

        this.root.actionManager = new BABYLON.ActionManager(this.game.scene);
        this.root.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, (evt) => {
            if(this.selectionManager.selecteds.indexOf(this) < 0) {  // building not selected
                this.selectionManager.clear();
                this.selectionManager.select(this);
            }
        }));
        this.root.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, () => {
            this.scene.hoverCursor = 'pointer';
        }));
    }
}