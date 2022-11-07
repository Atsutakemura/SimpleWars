# SimpleWars - BabylonJS RTS Game

A simple game project, that uses BabylonJS to run on WebGL.

## Idea

The game is supposed to encourage RTS-games developments in BabylonJS and therefore it can be used as a basic template.

Also the project is open for community advices and contributions!

## Features

- Rectangular Selection System
- Terrain: Space and Ground (Heightmap)
- Circular Unit and Group Formations
- RTS-Camera (Zoom, Edgescroll, Planar WASD-Move & EQ-Rotate)

## Collection of Open Source Examples

### Updated

Rectangular Selection System and RTS-Camera: https://playground.babylonjs.com/#BDPQFL#15

Unit Formations: https://playground.babylonjs.com/#1KRC3N#23

Group Formations: https://playground.babylonjs.com/#YY3KMU#63

### Raws

Rectangular Selection System: https://forum.babylonjs.com/t/2d-rectangle-to-select/23337/5

RTS-Camera Setup: https://forum.babylonjs.com/t/rts-camera-wasd-move-eq-rotate-mousewheel-zoom-edge-scroll/29289

Unit Formations: https://github.com/quantuminformation/Density-Wars

## Known Issues

- Camera continues moving even after mouse left the scene
- Lines of Rectangle-Select dragged to the left is displayed like, when dragged to right
- Group Formation spacing too narrow

## Demands

- Regroup: On Unit Death
- Fog of War
- Pathfinding: RecastJS
- Server: Worker Threads
- Server: NullEngine in Workers
- Group Movement (optional): Caravan
- Group Behaviour (optional): Swarm
- Minimap (Interactive)
