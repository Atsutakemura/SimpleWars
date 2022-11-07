const common = {
	GAME_SPEED:1,
    GROUND_Y_SCALE: 1,
    UNIT_SCALE: 1,
	BUILDING_SCALE: 1,
	SPAWNPOINT_SCALE: 1,
    MAP_SUBDIVISIONS_U: 40,
    MAP_SUBDIVISIONS_V: 40,
    UNIT_SPEED_SCALE: .005,
	FORMATION_SPACING_SCALE: 1.5,
    START_BUILDINGS: [{buildlist_id:1, buildlist_building_id:6, buildlist_level:1},    // Basis
        {buildlist_id:2, buildlist_building_id:1, buildlist_level:1}    // Titan Mine
    ],
    START_UNITS: [{unitlist_id:1, unitlist_unit_id:2, unitlist_count:5},    // Infantry
        {unitlist_id:2, unitlist_unit_id:3, unitlist_count:2}    // Vehicle
    ],
	START_OBSTACLES: [[{obstaclelist_id:1, obstaclelist_obstacle_id:1, obstaclelist_position:new BABYLON.Vector3(20, 0, 20)}],    // Tree
        [{obstaclelist_id:2, obstaclelist_obstacle_id:2, obstaclelist_position:new BABYLON.Vector3(40, 0, 40)}]    // Rock
    ]
}