class Ground { // ground map (i.e. space or terrain)
   constructor(game, url) {
        this.scene = game.scene;
        this.selectionManager = game.selectionManager;
        this.mesh = BABYLON.MeshBuilder.CreatePlane('ground', {width: game.mapSize, height: game.mapSize}, game.scene)
        this.mesh.material = new BABYLON.StandardMaterial('matGround', game.scene)
        this.mesh.material.diffuseTexture = new BABYLON.Texture(url, game.scene);
        this.mesh.material.diffuseTexture.uScale = common.MAP_SUBDIVISIONS_U;
        this.mesh.material.diffuseTexture.vScale = common.MAP_SUBDIVISIONS_V
        this.mesh.material.specularColor = new BABYLON.Color3(0, 0, 0);
        this.mesh.rotation.x = Math.PI / 2;
        this.mesh.actionManager = new BABYLON.ActionManager(game.scene);
        this.mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, () => {
            if(this.selectionManager.selecteds.length > 0) {  // group not selected
                this.selectionManager.clear();
            }
        }));
        this.mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, () => {
            this.scene.hoverCursor = '';
        }));
    }
}