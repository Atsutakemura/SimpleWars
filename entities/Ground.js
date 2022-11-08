class Ground { // ground map (i.e. space or terrain)
   constructor(game) {
		this.game = game;
		this.scene = game.scene;
		this.constants = game.groundConstants[game.groundId];
		this.groundSize = common.GROUND_SCALE * this.constants['ground_size'];
			
		if(this.constants['ground_type'] === game.groundTypes.SPACE) {
			this.selectionManager = game.selectionManager;
			this.mesh = BABYLON.MeshBuilder.CreatePlane('ground', {width: this.groundSize, height: this.groundSize}, game.scene)
			this.mesh.material = new BABYLON.StandardMaterial('matGround', game.scene)
			this.mesh.material.diffuseTexture = new BABYLON.Texture(this.constants['ground_url'], game.scene);
			this.mesh.material.diffuseTexture.uScale = common.GROUND_SUBDIVISIONS_U;
			this.mesh.material.diffuseTexture.vScale = common.GROUND_SUBDIVISIONS_V;
			this.mesh.material.specularColor = new BABYLON.Color3(0, 0, 0);
			this.mesh.rotation.x = Math.PI / 2;
		}
		else {
			var terrainMaterial = new BABYLON.TerrainMaterial('terrainMaterial', game.scene);
			terrainMaterial.specularColor = new BABYLON.Color3(0.5, 0.5, 0.5);
			terrainMaterial.specularPower = 64;

			terrainMaterial.mixTexture = new BABYLON.Texture('assets/textures/mixMap.png', game.scene);

			terrainMaterial.diffuseTexture1 = new BABYLON.Texture('assets/textures/floor.png', game.scene); // Red
			terrainMaterial.diffuseTexture2 = new BABYLON.Texture('assets/textures/rock.png', game.scene);  // Green
			terrainMaterial.diffuseTexture3 = new BABYLON.Texture('assets/textures/grass.png', game.scene); // Blue

			terrainMaterial.bumpTexture1 = new BABYLON.Texture('assets/textures/floor_bump.png', game.scene);
			terrainMaterial.bumpTexture2 = new BABYLON.Texture('assets/textures/rockn.png', game.scene);
			terrainMaterial.bumpTexture3 = new BABYLON.Texture('assets/textures/grassn.png', game.scene);

			terrainMaterial.diffuseTexture1.uScale = terrainMaterial.diffuseTexture1.vScale = 10;
			terrainMaterial.diffuseTexture2.uScale = terrainMaterial.diffuseTexture2.vScale = 10;
			terrainMaterial.diffuseTexture3.uScale = terrainMaterial.diffuseTexture3.vScale = 10;

			this.mesh = BABYLON.MeshBuilder.CreateGroundFromHeightMap('ground', this.constants['ground_url'], {width:this.groundSize, height:this.groundSize, subdivisions:100, minHeight:0, maxHeight:10, updatable:false}, scene);
			this.mesh.material = terrainMaterial;
		}
		
		this.spawns = [];	// Terrain has fixed Spawnpoints
		for (let i=0; i<this.constants['ground_spawns'].length; i++) {
			this.spawns.push(new Spawnpoint(this, i));
		}
		
		this.obstacles = [];
		for (let i=0; i<this.constants['ground_obstacles'].length; i++) {
			const newObstacle = new Obstacle(this, i);
			this.obstacles.push(newObstacle);
		}
		
		this.mesh.actionManager = new BABYLON.ActionManager(game.scene);
		this.mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, () => {
			if(this.selectionManager.selecteds.length > 0) {  // entity (i.e. group, building) not selected
				this.selectionManager.clear();
			}
		}));
		this.mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, () => {
			this.scene.hoverCursor = '';
		}));
    }
	
	setSpawnRulers() {
		for (let i=0; i<this.constants['ground_spawns'].length; i++) {
			if(i === this.game.rulers[i].role) {	// Attacker
				this.spawns[i].changeRuler(this.game.rulers[i]);
			}
			else {
				this.spawns[i].changeRuler(this.game.rulers[0]);	// set neutral
			}
		}
	}
}