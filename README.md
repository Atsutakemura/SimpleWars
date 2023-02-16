# Engage on Fulwia - BabylonJS RTS Game

A commercial real-time strategy game project, that uses BabylonJS to run on WebGL. The project is open for community advices and contributions!

# Flag System
All Flags are listed in config/Types.js

# Faction System
Every Ruler (Human, AI) can be assigned to a Party, that plays a certain Role in the game. Roles are Attacker, Defender, Neutral or None. None is used for Obstacles e.g. resources, contrary to a Neutral Party that can be attacked.

# Spawn, Conquest and Reinforce System

![Spawn](https://user-images.githubusercontent.com/106460589/218605803-a097f630-f564-4174-a60d-c663aa4078af.png)

Capture the Flag on Spawn using HighlightLayer or GlowLayer per Party.

![reinforce tab](https://user-images.githubusercontent.com/106460589/218619833-d4575145-36d6-490e-8085-3b19a6798bf0.png)

You can spawn (reinforce) at conquered Spawn i.e. spaceship drops ground entities. Projection will be red if not in Spawn range.

# Resource System
Create Custom Resources. Worker collect and Industry refactor resources.

# Crafting System

![Craft Plane](https://user-images.githubusercontent.com/106460589/218614220-825f4e91-e5da-457c-a657-76b1ca90886b.png)

Planar Foundation is red if area on pointer is blocked and green when Construction Site to craft Building, can be set. Additionally it is possible to Upgrade Building Levels.

# Hire System

![building](https://user-images.githubusercontent.com/106460589/218599026-4ee2d887-8480-4fba-b314-123437bcaff4.png)

Barracks to hire Units.

# Movement Systems

Hover, Walk (Animated), Tracked (Dynamic UV Scaling), Flying

# Animation Management

![sprint animations](https://user-images.githubusercontent.com/106460589/218614851-688e0ce0-4a52-4b15-a8b1-e53316ed2444.png)

Support Unit Idle, Sprint and Attack.

# Series System

![hps cruiser](https://user-images.githubusercontent.com/106460589/218625280-cfff62e8-5aa5-493c-b7d4-3686a6be2430.png)

Custom Attachs or other Hardpoints to interact with parts of entities. The name of the entity's main hull is expected to be 'M_H'. Hardpoints can be interactive (targetable) or not (w/o GUI). They can even be weapons i.e. turrets that aims and attacks seperately. Check out image on [Selection Focus](https://github.com/Atsutakemura/ToolShop).

# Formations Management

![Rectangle Formation](https://user-images.githubusercontent.com/106460589/218611076-e0ea039f-a9e2-484b-91dd-238fe83731eb.png)

Rectangular, Circular, Group

# Navigation Systems
Pathfinding (RecastJS), Command System (Move, Attack, Gather, Craft, Patrol, Follow, Skill)

# Battle Systems

## Health and Shield System
All life entities got health and shield (>=0). The health can be healed or repaired, while the shield charges up.

## Targeting System
Auto-Detection of Enemies in Unit Detection Range as Target. Also parts of a entity can be locked as subtarget. Auto-Detection is skipped when Attack Command is active.

## Aiming System
The Hardpoints of an entity aims i.e. rotate turret and barrel towards the target and validate if projectile would cross target body.

## Solid Particle Management
Create multiple Solid Particle Systems. Each consisting multiple Solid Particle Groups to set Custom Projectiles and Behaviours. The Projectiles  are buffered by Groups to prevent performance loss in large battles.

## Damage System
Targets in combat range will be attacked. The damage caused can be of different types i.e. physical that does not interact with the certain shield.

## Death System
Infantry Entities use Death Animation to fall over and Structure Entities can smoke, burn, explode partly and explode as a whole.

# Camera System
WASD-Move & EQ-Rotate, Zoom, Edgescroll, Swings

# Research System

![Research](https://user-images.githubusercontent.com/106460589/218611554-3b4cff61-263f-48f4-8b62-6865ed772e9f.png)

Holiversity to upgrade Technology, that affects damage, health and shield.

# Hero System
Skills (Melee, Ranged, Magic, Heal, Buff), Level, Stats (Strength, Affinity, Agility)

# Ground System

![MixMaterial](https://user-images.githubusercontent.com/106460589/218611839-0ffbaa4e-c6a8-4d92-9716-677663bc2aab.png)

Creates Ground from Heightmap as Space or Terrain and can inherit Obstacles i.e. Trees and Rocks. Supports TerrainMaterial and MixMaterial. Set Custom Constants, onMatchStart() and onMatchEnd(winnerParty).

# Selection Management:
Single Selection via Left-Click on Entity, i.e. Unit, Building or Obstacle.

![marquee](https://user-images.githubusercontent.com/106460589/218607433-bbfe67c6-86c4-46de-9b51-b5d167bba621.png)

Draw Rectangle to select multiple groups / entities.

# Battle Effects

[smoke.webm](https://user-images.githubusercontent.com/106460589/218627486-00417259-b943-4660-8afe-12f8d5a11fa0.webm)

[fire.webm](https://user-images.githubusercontent.com/106460589/218627695-f3380442-83d7-49af-8201-a643cc6e0e55.webm)

Management of ParticleSystemSets e.g. Smoke, Fire, Explosion

# Languages
Set data for supported languages, i.e. UNIT1 to name unit of id 1. Can be accessed via Languages.EN.UNIT1.

# GUI

![Menu](https://user-images.githubusercontent.com/106460589/218610480-6bfcc775-ecf8-436a-b367-1c29e04e2799.png)

Set Custom Menu i.e. title, buttons and structure.

![Selection Info](https://user-images.githubusercontent.com/106460589/218612704-5e490c16-edab-49c0-b83b-c66b8e2e4213.png)

Set Custom Selection Info Mask providing image source, text string and rgb color.

![craft pad](https://user-images.githubusercontent.com/106460589/218613030-29b20a59-7bb6-4a92-8ed9-4c27d8eaf07e.png)

Pad/Panel to craft building or hire units. Different entities can be queued simultaneously.

Health Bars i.e. shield and health above entity.

Supports Custom Tooltips.

![progress bar](https://user-images.githubusercontent.com/106460589/218613443-65f39af8-e80d-4aee-8c50-9183db6b8629.png)

Visual Queue Progress for i.e. crafting and hiring.

# Interactive Minimap

![Minimap](https://user-images.githubusercontent.com/106460589/219248954-2c14db45-b9ba-41c8-b111-e30f306f7ea2.png)

The Minimap is attached to camera position and camera rotation visualized by marker icon rotation. Click on map to swing camera to world position. Set SVG Paths to create Custom Icons for individual Entities. Support Dynamic, Static and Grouped Entities.

# Design Management

GUI and Convenience Settings

# Optimization

The regarding materials are frozen to reduce shaders overhead. The world matrices of static entities are frozen to reduce world matrix computation. Material, Mesh, are instantiated or cloned to reduce draw calls. The stencil and depth buffer clearing is skipped to reduce OpenGL clear calls. The animation ratio is used to flatten the frame rate differences. The material dirty mechanism is blocked to avoid bottleneck when various materials are used. A map of geometry ids is used to speed-up the addition and removal of Geometry in the scene. After a match ends on disposing of all meshes the active meshes and rendering groups are blocked to speed-up the removal.

Optionally skipPointerMovePicking can be set to spare scene to pick on pointer move, though the health bars won't be shown on hover.

# Known Issues

- Pathfinding issues if building and unit size relation too great

# Demands

- 3rd Person Hero Control
- Formation: Dynamic
- Fog of War
