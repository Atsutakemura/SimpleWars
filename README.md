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

# Crafting System

![Craft Plane](https://user-images.githubusercontent.com/106460589/218614220-825f4e91-e5da-457c-a657-76b1ca90886b.png)

Planar Foundation is red if area on pointer is blocked and green when Construction Site to craft Building, can be set. Additionally it is possible to Upgrade Building Levels.

# Hire System

![building](https://user-images.githubusercontent.com/106460589/218599026-4ee2d887-8480-4fba-b314-123437bcaff4.png)

Barracks to hire Units.

# Movements

Hover, Walk (Animated), Tracked (Dynamic UV Scaling), Flying

# Animation Management

![sprint animations](https://user-images.githubusercontent.com/106460589/218614851-688e0ce0-4a52-4b15-a8b1-e53316ed2444.png)

Support Unit Idle, Sprint and Attack.

# Series System

![hps cruiser](https://user-images.githubusercontent.com/106460589/218625280-cfff62e8-5aa5-493c-b7d4-3686a6be2430.png)

Custom Attachs or other Hardpoints to interact with parts of entities. The name of the entity's main hull is expected to be 'M_H'. Hardpoints can be interactive (targetable) or not (w/o GUI). They can even be weapons i.e. turrets that aims and attacks seperately. Check out image on [Selection Focus](https://github.com/Atsutakemura/ToolShop).

# Formations

![Rectangle Formation](https://user-images.githubusercontent.com/106460589/218611076-e0ea039f-a9e2-484b-91dd-238fe83731eb.png)

Rectangular, Circular, Group

# Navigation Systems
Pathfinding (RecastJS), Command System (Move, Attack, Gather, Craft, Patrol, Follow, Skill)

# Targeting System
Auto-Detection of Enemies in Unit Detection Range.

# Solid Particle Management
Set Custom Projectiles and Behaviours

# Battle Systems
Damage and Health Systems, Aiming, Attacking, Death Behavior

# Camera System
WASD-Move & EQ-Rotate, Zoom, Edgescroll, Swings

# Resource System
Worker collect and Industry refactor resources

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

Management of ParticleSystemSets e.g. Smoke, Fire, Explosion

# Languages
Set data for supported languages, i.e. UNIT1 to name unit of id 1. Can be accessed via Languages.EN.UNIT1.

# GUI

![Menu](https://user-images.githubusercontent.com/106460589/218610480-6bfcc775-ecf8-436a-b367-1c29e04e2799.png)

Set Custom Menu i.e. title and buttons.

![Selection Info](https://user-images.githubusercontent.com/106460589/218612704-5e490c16-edab-49c0-b83b-c66b8e2e4213.png)

Set Custom Selection Info Mask providing image source, text string and rgb color.

![craft pad](https://user-images.githubusercontent.com/106460589/218613030-29b20a59-7bb6-4a92-8ed9-4c27d8eaf07e.png)

Pad/Panel to craft building or hire units. Different entities can be queued simultaneously.

Health Bars i.e. shield and health above entity.

Supports Custom Tooltips.

![progress bar](https://user-images.githubusercontent.com/106460589/218613443-65f39af8-e80d-4aee-8c50-9183db6b8629.png)

Visual Queue Progress for i.e. crafting and hiring.

# Design Management

GUI and Convenience Settings

# Known Issues

- Pathfinding issues if building and unit size relation too great

# Demands

- Formation: Dynamic
- Fog of War
- Minimap (Interactive)
