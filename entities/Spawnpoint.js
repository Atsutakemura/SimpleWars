class Spawnpoint {
	constructor(game) {
		this.game = game;
		this.scene = scene;

		this.root = BABYLON.MeshBuilder.CreateSphere('spawn:mesh', {diameter: common.SPAWNPOINT_SCALE}, this.scene);
        this.root.position = new BABYLON.Vector3(0, 0, 0);
		
		this.changeRuler(game.rulers[0]);	// set neutral as ruler
	}
	
	changeRuler(ruler) {
		this.ruler = ruler;
		
		// change holographic color of spawn point
	}
}