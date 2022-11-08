class Obstacle {
    constructor(ground, id) {
		this.game = ground.game;
		this.scene = this.game.scene;
        this.selectionManager = this.game.selectionManager;
        this.data = ground.constants['ground_obstacles'][id];
        this.mass = this.game.obstacleConstants[this.data['obstaclelist_obstacle_id']]['obstacle_mass'];
        this.health = this.game.obstacleConstants[this.data['obstaclelist_obstacle_id']]['obstacle_structure'];
        this.root = BABYLON.MeshBuilder.CreateSphere('obstacle:mesh', {diameter: this.mass}, this.scene);
        this.root.position = this.data['obstaclelist_position'];

        this.root.actionManager = new BABYLON.ActionManager(this.game.scene);
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