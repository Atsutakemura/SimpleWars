class SelectionManager {
    constructor(game) {
        this.game = game;
        this.scene = game.scene;
		this.camera = game.cameraSystem.camera;
		this.userGroups = game.userGroups;
		this.otherUnits = game.otherUnits;

        this.Commands = {IDLE:0, ATTACK:1, MOVE:2, DEFEND:3};

        this.selecteds = [];
        this.commandeds = [];
		this.regroupeds = [];
    }
	
	addSelection() {	// adds Rectangular Selection and Commands
		this.mousePos0;
		this.mousePos1;

		this.lines = BABYLON.MeshBuilder.CreateLines("lines",
		 {points: [
			 new BABYLON.Vector3(0, 0, 0),
			 new BABYLON.Vector3(1, 0, 0),
			 new BABYLON.Vector3(1, 1, 0),
			 new BABYLON.Vector3(0, 1, 0),
			 new BABYLON.Vector3(0, 0, 0)
		 ]}, this.scene);
		this.lines.billboardMode = 7;
		this.lines.setEnabled(false);

		this.markers = [];
		for(let i = 0; i < 4; i++){
			this.markers.push(new BABYLON.TransformNode("marker:"+i, this.scene));
		}
		
		this.rectangularSelectObserver = this.scene.onPointerObservable.add((pointerInfo) => {      		
			switch (pointerInfo.type) {
				case BABYLON.PointerEventTypes.POINTERMOVE:          
					if(this.mousePos0) { // pointer was down once before its up
						if(!this.lines.isEnabled(false)) {   // selection not enabled (checkAncestors = false)
							this.lines.setEnabled(true);
						}
						this.mousePos1 = {x:this.scene.pointerX, y:this.scene.pointerY};
						let rays = [];
						rays.push(this.scene.createPickingRay(this.mousePos0.x, this.mousePos0.y));
						rays.push(this.scene.createPickingRay(this.mousePos1.x, this.mousePos0.y));
						rays.push(this.scene.createPickingRay(this.mousePos0.x, this.mousePos1.y));
						rays.push(this.scene.createPickingRay(this.mousePos1.x, this.mousePos1.y));

						for(let i = 0; i < 4; i++)
							this.markers[i].position = rays[i].origin.add(rays[i].direction);
						
						this.lines.position.copyFrom(this.markers[0].position);
						this.lines.scaling.x = BABYLON.Vector3.Distance(this.markers[0].position, this.markers[1].position);
						this.lines.scaling.y = -BABYLON.Vector3.Distance(this.markers[0].position, this.markers[2].position);
						
						//this.lines.lookAt(this.markers[1].position, -Math.PI/2);

						//if (mousePos1.x < mousePos0.x)
						//    lines.scaling.x *= -1;
						if (this.mousePos1.y < this.mousePos0.y)
							this.lines.scaling.y *= -1;
					}
					break;
				case BABYLON.PointerEventTypes.POINTERDOWN:
					if(pointerInfo.event.button === 0) {	// LMB
						this.mousePos0 = {x:this.scene.pointerX, y:this.scene.pointerY};
						let ray0 = this.scene.createPickingRay(this.mousePos0.x, this.mousePos0.y);
						this.markers[0].position = ray0.origin.add(ray0.direction);
					}
					else if(pointerInfo.event.button === 2 && this.selecteds.length > 0) {  // RMB & selecteds > 0
						if(this.otherUnits.find(unit => unit.root === pointerInfo.pickInfo.pickedMesh)) {   // picked mesh of enemy
							this.addAttackCommand(pointerInfo.pickInfo.pickedMesh);
						}
						else {
							this.addMoveCommand(pointerInfo.pickInfo.pickedPoint);
						}
					}
					break;
				case BABYLON.PointerEventTypes.POINTERUP:
					if(pointerInfo.event.button === 0) {
						this.lines.setEnabled(false);
						this.mousePos1 = {x:this.scene.pointerX, y:this.scene.pointerY};
						if (this.mousePos0.x > this.mousePos1.x){
							let t = this.mousePos0.x;
							this.mousePos0.x = this.mousePos1.x;
							this.mousePos1.x = t;
						}
						if (this.mousePos0.y > this.mousePos1.y){
							let t = this.mousePos0.y;
							this.mousePos0.y = this.mousePos1.y;
							this.mousePos1.y = t;
						}
						let rays = [];
						rays.push(this.scene.createPickingRay(this.mousePos0.x, this.mousePos0.y));
						rays.push(this.scene.createPickingRay(this.mousePos1.x, this.mousePos0.y));
						rays.push(this.scene.createPickingRay(this.mousePos0.x, this.mousePos1.y));
						rays.push(this.scene.createPickingRay(this.mousePos1.x, this.mousePos1.y));

						for(let i = 0; i < 4; i++)
							this.markers[i].position = rays[i].origin.add(rays[i].direction);
							
						let n = [];
						n.push(BABYLON.Vector3.Cross(rays[0].direction, rays[1].direction));
						n.push(BABYLON.Vector3.Cross(rays[1].direction, rays[3].direction));
						n.push(BABYLON.Vector3.Cross(rays[2].direction, rays[0].direction));
						n.push(BABYLON.Vector3.Cross(rays[3].direction, rays[2].direction));

						let planes = [];
						for(let i = 0; i < 4; i++){
							planes.push(new BABYLON.Plane(n[i].x, n[i].y, n[i].z, 
							- rays[i].origin.x*n[i].x - rays[i].origin.y*n[i].y - rays[i].origin.z*n[i].z));
						}

						for(let i = 0; i < this.userGroups.length; i++){
							let contains = true;
							for(let j = 0; j < planes.length; j++){
								if (planes[j].signedDistanceTo(this.userGroups[i].root.position) >= 0){
									contains = false;
									break;
								}
							}

							if (contains) {  // add selection of mesh
								this.select(this.userGroups[i]);
							}
							else {  // remove selection of mesh
								//this.deselect(this.userGroups[i]);
							}
						}
						this.mousePos0 = null;
					}
				break;
			}
		});
	}

    select(entity) {
        this.selecteds.push(entity);
        if(entity.units) {
            entity.units.forEach(unit => unit.root.showBoundingBox = true);
        }
        else {
            entity.root.showBoundingBox = true;
        }
    }

    deselect(entity) {
		if(entity.units) {
			entity.units.forEach(unit => unit.root.showBoundingBox = false);
		}
		else {
			entity.root.showBoundingBox = false;
		}
    }

    clear() {
        for(let i=0; i<this.selecteds.length; i++) {
            this.deselect(this.selecteds[i]);
        }
        this.selecteds.length = 0; //this.selecteds = [];
    }

    removeCommanded(entity) {
        const entityIndex = this.commandeds.indexOf(entity);
        if(entityIndex > -1) {
            this.commandeds.splice(entityIndex, 1);
        }
    }

    addMoveCommand(destination) {
        for (let i=0; i<this.selecteds.length; i++) {
            if(this.selecteds[i].commandable) {
                if(this.commandeds.indexOf(this.selecteds[i]) < 0) {
                    this.commandeds.push(this.selecteds[i]);
                }
                this.selecteds[i].command = this.Commands.MOVE;
            }

            this.selecteds[i].destination = destination;
        }
    }

    addAttackCommand(enemyMesh) {
        for (let i = 0; i < this.selecteds.length; i++) {
            const direction = Formations.Direction2D(Formations.GetCentroid(this.selecteds[i].units), enemyMesh.position);	// direction from center of group units to destination
            if(direction.length() > this.selecteds[i].units[0].range) {	// destination in unit fire range
                const normal = direction.normalize();
                const destination = enemyMesh.position.subtract(normal.scale(this.selecteds[i].units[0].range));
                let formation = Formations.CircularGrouping(this.selecteds[i].units, destination)
                for (let j = 0; j < this.selecteds[i].units.length; j++) {
                    this.selecteds[i].units[j].moveTo(formation[j]);
                }
            }
        }
    }
	
	removeRegrouped(entity) {
        const entityIndex = this.regroupeds.indexOf(entity);
        if(entityIndex > -1) {	// still regrouping
            this.regroupeds.splice(entityIndex, 1);
        }
    }
	
	addRegrouped(entity, destination) {
		if(this.regroupeds.indexOf(entity) < 0) {	// not already regrouping
			this.regroupeds.push(entity);
		}

		entity.destination = destination;
    }

    update(dT) {
        for (let i=0; i<this.commandeds.length; i++) {
            this.commandeds[i].execute(dT);
        }
		
		for (let i=0; i<this.regroupeds.length; i++) {
            this.regroupeds[i].execute(dT);
        }
    }
}