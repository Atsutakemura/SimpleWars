class Obstacle {
    constructor(game, data) {
		this.game = game;
        this.selectionManager = game.selectionManager;
        this.data = data;
        this.mass = game.obstacleRegister[data['obstaclelist_obstacle_id']]['obstacle_mass'];
        this.health = game.obstacleRegister[data['obstaclelist_obstacle_id']]['obstacle_structure'];
        this.root = BABYLON.MeshBuilder.CreateSphere('obstacle:mesh', {diameter: this.mass*common.BUILDING_SCALE}, this.scene);
        this.root.position = game.obstacleRegister[data['obstaclelist_obstacle_id']]['obstacle_position'];

        this.root.actionManager = new BABYLON.ActionManager(game.scene);
        this.root.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, (evt) => {
            if(this.selectionManager.selecteds.indexOf(this) < 0) {  // obstacle not selected
                this.selectionManager.clear();
                this.selectionManager.select(this);
            }
        }));
        this.root.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, () => {
            this.scene.hoverCursor = 'pointer';
        }));
	}
}