class Spawnpoint {
	constructor(ground, id) {
		this.game = ground.game;
		this.scene = this.game.scene;

		this.root = BABYLON.MeshBuilder.CreateSphere('spawn:mesh', {diameter: common.SPAWNPOINT_SCALE}, this.scene);
        this.root.position = ground.constants['ground_spawns'][id].scale(ground.groundSize);
		
		this.capturing = 0;	// time of current capture time
	}
	
	changeRuler(ruler) {
		this.ruler = ruler;
		
		// change holographic color of spawn point
	}
}