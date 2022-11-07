class Game {
    constructor() {
		this.canvas = document.getElementById('renderCanvas');
        this.engine = new BABYLON.Engine(this.canvas, true);
		
		this.scene = new BABYLON.Scene(this.engine);
		
        this.unitRegister = {1:{unit_id:1, unit_mass:1.6, unit_structure:600, unit_speed:12, unit_range:200, unit_ground:-50, unit_name:'Spaceship'},
            2:{unit_id:2, unit_mass:.3, unit_structure:50, unit_speed:3, unit_range:100, unit_ground:0, unit_name:'Soldier'},
            3:{unit_id:3, unit_mass:.9, unit_structure:320, unit_speed:7, unit_range:150, unit_ground:.1, unit_name:'Vehicle'}
        };

        this.buildingRegister = {1:{building_id:1, building_mass:2.2, building_structure:1600, building_position:new BABYLON.Vector3(-20, 0, 0), building_name:'Titan Mine'},
            2:{building_id:2, building_mass:1.5, building_structure:1250, building_position:new BABYLON.Vector3(20, 0, 20), building_name:'Silicon Mine'},
            3:{building_id:3, building_mass:1.5, building_structure:500, building_position:new BABYLON.Vector3(20, 0, 20), building_name:'Chemical Plant'},
            4:{building_id:4, building_mass:1.5, building_structure:750, building_position:new BABYLON.Vector3(0, 0, 50), building_name:'Synthesizer'},
            5:{building_id:5, building_mass:1.5, building_structure:280, building_position:new BABYLON.Vector3(50, 0, 50), building_name:'Greenhouse'},
            6:{building_id:6, building_mass:5.5, building_structure:3200, building_position:new BABYLON.Vector3(0, 0, 0), building_name:'Base'}
        };
		
		this.obstacleRegister = {1:{obstacle_id:1, obstacle_mass:0.7, obstacle_structure:320, obstacle_name:'Tree'},
            2:{obstacle_id:2, obstacle_mass:1.5, obstacle_structure:480, obstacle_name:'Asteroid'},
        };

        this.users = [{user_id:3001, user_type:1001}, // Neutral (Simple AI)
			{user_id:1, user_type:0},    // Player
            {user_id:101, user_type:50}    // Imperialist (AI)
        ];

        this.mapTypes = {SPACE:0, GROUND:1};
		this.mapTextureSize = 256;
        this.mapScale = 1;
        this.mapSize = this.mapScale * this.mapTextureSize;
        this.starts = [new BABYLON.Vector3(.25*this.mapSize, 0, .25*this.mapSize),	// map start spawns per ruler (i.e. base, spawnpoint)
            new BABYLON.Vector3(-.4*this.mapSize, 0, -.4*this.mapSize),
            new BABYLON.Vector3(.4*this.mapSize, 0, .4*this.mapSize)];

        this.spawnOffset = new BABYLON.Vector3(0, 0, this.buildingRegister[6]['building_mass']);	// unit start spawn by base z-dimension

        this.rulers = [];	// List of Player, AI or Neutral
        this.userId = this.users[0]['user_id']; // main player id
		
        this.createScene();
    }
    
    createScene() {
        this.cameraSystem = new CameraSystem(this);

        this.light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), this.scene);
        this.light.intensity = 0.7;
		
		this.userGroups = [];
		this.units = [];
        this.userUnits = [];
        this.otherUnits = [];
        this.enemyUnits = [];
		
		this.selectionManager = new SelectionManager(this);
		
		this.ground = new Ground(this, 'assets/textures/background.png', this.mapTypes.SPACE);
		
		this.obstacles = [];
		for (let i=0; i<common.START_OBSTACLES.length; i++) {
			const newObstacle = new obstacle(this, common.START_OBSTACLES[i]);
			this.obstacles.push();
		}

        this.scene.onReadyObservable.add(() => {	// after meshes are imported
            for (let i=0; i<this.users.length; i++) {	// create Rulers
                const newRuler = new Ruler(this, this.users[i], this.starts[i]);
                this.rulers.push(newRuler);
            }

            this.selectionManager.addSelection();	// add Selection (Rectangular & Commands)

            this.rollingAverage = new BABYLON.RollingAverage(60);
            this.scene.registerBeforeRender(() => {
                this.rollingAverage.add(this.scene.getAnimationRatio());
                this.update(this.rollingAverage.average);
            });
        });
		
		this.engine.runRenderLoop(() => {
			this.scene.render();
		});

        window.addEventListener('resize', () => {	// Watch for browser/canvas resize events
            this.engine.resize();
        });
		
		return this.scene;
    }

    update(dT) {
        for (let i=0; i<this.units; i++) {	// Battle (fire in range)
            this.units[i].battle();
        }
        this.selectionManager.update(dT);	// Entities execute Command (RMB: Move, Attack)
    }
}