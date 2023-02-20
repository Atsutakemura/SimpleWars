# Engage on Fulwia - BabylonJS RTS Game

A commercial real-time strategy game project, that uses BabylonJS to run on WebGL. The project is open for community advices and contributions!

# Flag System
All **flags** are listed in config/Types.js

# Faction System
Every **ruler** (Human, AI) can be assigned to a **party**, that plays a certain **role** in the game. The supported **roles** are Attacker, Defender, Neutral or None. None is used for **obstacles** e.g. resources, in contrary to a **Neutral** party that can be attacked.

# Spawn, Conquest and Reinforce System

![Spawn](https://user-images.githubusercontent.com/106460589/218605803-a097f630-f564-4174-a60d-c663aa4078af.png)

Capture the Flag on **spawn** can be colorized by **HighlightLayer** or **GlowLayer** per party.

![reinforce tab](https://user-images.githubusercontent.com/106460589/218619833-d4575145-36d6-490e-8085-3b19a6798bf0.png)

You can spawn (reinforce) at conquered **spawn** i.e. spaceship drops ground infantry or vehicles. The **projection** will be red if out of spawn range.

# Resource System
Create **custom resources**, that can be **collected** by workers and **refactored** by industry.

# Crafting System

![Craft Plane](https://user-images.githubusercontent.com/106460589/218614220-825f4e91-e5da-457c-a657-76b1ca90886b.png)

**Planar foundation** can be moved by mouse pointer and **indicates** when obstacles are intersecting by red or green color. Additionally it is possible to **upgrade** the level of a building.

# Hire System

![building](https://user-images.githubusercontent.com/106460589/218599026-4ee2d887-8480-4fba-b314-123437bcaff4.png)

The barracks allows to **queue** unit hirements.

# Movement Variants

Hover, Walk (Animated), Tracked (Dynamic UV Scaling), Flying

# Animation Management

![sprint animations](https://user-images.githubusercontent.com/106460589/218614851-688e0ce0-4a52-4b15-a8b1-e53316ed2444.png)

**Idle, sprint and attack** of unit is supported.

# Series System

![hps cruiser](https://user-images.githubusercontent.com/106460589/218625280-cfff62e8-5aa5-493c-b7d4-3686a6be2430.png)

Create **custom hardpoints** to interact with parts of entities. An hardpoint can also be an attached model e.g. individual turrets on a spaceship. The name of the entity's **main hull** is expected to be 'M_H'. Hardpoints can be interactive (targetable) or not (w/o GUI). They can even be weapons i.e. turrets that aims and attacks seperately. The preview [Selection Focus](https://github.com/Atsutakemura/ToolShop).

# Formations Management

![Rectangle Formation](https://user-images.githubusercontent.com/106460589/218611076-e0ea039f-a9e2-484b-91dd-238fe83731eb.png)

The supported types are Rectangular and Circular.

# Navigation Systems
Pathfinding is realized by **RecastJS**, where **NavMesh** is created out of ground mesh. Furthermore, **static** entities can be added as obstacles and **dynamic** entities are grouped in crowds as agents. The navigation allows entities to go **around** each other.

The Command System offers the following **commands**: Move, Attack, (Re-)Gather, Craft, Patrol, Follow, Skill

# Battle Systems

## Health and Shield System
All life entities got **health** and optionally **shield**. The health can be **healed** or repaired, while the shield **charges up**.

## Targeting System
**Auto-Detection** of enemy entities in unit detection **range** as target, to auto-attack. Also parts of a entity can be locked as **subtarget**. Auto-Detection is skipped when **Attack command** is active.

## Aiming System
The **hardpoints** of an entity **aims** automatically i.e. rotate turret and barrel towards the target and validate if **projectile** would cross target body.

## Solid Particle Management
Create multiple **SolidParticleSystems**. Each consisting multiple SolidParticleGroups to set **custom projectiles and behaviours**. The projectiles are **buffered** by groups to prevent performance loss in large battles.

## Damage System
Targets in weapon **range** will be attacked. The **damage** caused can be of different type i.e. **physical** that does not interact with the certain shield.

## Death System
Infantry entities use **death animation** to fall over and structure entities can **smoke, burn, explode** partly and explode as a whole.

# Camera System
The camera can be **moved** by arrow keys and WASD. Rotation is apllied by EQ. The mousewheel can be used to zoom in or out. Edgescroll. The **CameraSystem** offers **swingTo(position)**, to transition camera position towards given position.

# Research System

![Research](https://user-images.githubusercontent.com/106460589/218611554-3b4cff61-263f-48f4-8b62-6865ed772e9f.png)

The **research** building allows to upgrade **technology**, that affects damage, health and shield.

# Skill System
Skills can be **melee** e.g. whirlwind, heal or buff. While other skills are **ranged** i.e. physical or magical projectile. All skills are applied on **area of effects**.

# Hero System
A hero can obtain experience to increase its level, while leveling difficulty can be adjusted. The higher **leveling**-property of GroundSystem the slower experiencing is in general. While the **levelingEnd**-property reduces a low level kill experience. The **required experience** value of a level is determined by the **heroDifficulty**-property.
The **stats** are strength, affinity and agility. The **strength** affects physical damage, **affinity** modifies magical damage and heal. While **agility** is multiplies to attack speed.

# Ground System

![MixMaterial](https://user-images.githubusercontent.com/106460589/218611839-0ffbaa4e-c6a8-4d92-9716-677663bc2aab.png)

Creates Ground from Heightmap as Space or Terrain and can inherit **obstacles** i.e. trees and rocks. Set **custom constants, onMatchStart() and onMatchEnd(winnerParty)**. Supports **TerrainMaterial** and **MixMaterial**.

# Selection Management:
**Single** selection via **left-click** on entity, i.e. unit, building or obstacle.

![marquee](https://user-images.githubusercontent.com/106460589/218607433-bbfe67c6-86c4-46de-9b51-b5d167bba621.png)

Draw **rectangle** to select **multiple** groups / entities.

# Battle Effects

[smoke.webm](https://user-images.githubusercontent.com/106460589/218627486-00417259-b943-4660-8afe-12f8d5a11fa0.webm)

[fire.webm](https://user-images.githubusercontent.com/106460589/218627695-f3380442-83d7-49af-8201-a643cc6e0e55.webm)

Management of **ParticleSystemSets** e.g. smoke, fire, explosion

# Languages
Set **custom data** for supported languages, i.e. UNIT1 to name unit of id 1. Can be accessed via Languages.EN.UNIT1.

# GUI

![Menu](https://user-images.githubusercontent.com/106460589/218610480-6bfcc775-ecf8-436a-b367-1c29e04e2799.png)

Set **custom menu** i.e. title, buttons and structure.

![Selection Info](https://user-images.githubusercontent.com/106460589/218612704-5e490c16-edab-49c0-b83b-c66b8e2e4213.png)

Set **custom entity info mask** providing image source, text string and rgb color.

![craft pad](https://user-images.githubusercontent.com/106460589/218613030-29b20a59-7bb6-4a92-8ed9-4c27d8eaf07e.png)

The **pad** allows to craft building or hire units. The **queue** can handle different entity types.

**health bars** i.e. shield and health above entity.

Supports **custom tooltips**.

![progress bar](https://user-images.githubusercontent.com/106460589/218613443-65f39af8-e80d-4aee-8c50-9183db6b8629.png)

**Visual queue progress** for i.e. crafting and hiring.

# Detection and Visibility

The **isVisible**-property of **unallied** entity roots is set by **detection ranges** of controlled entities.

# Interactive Minimap

![Minimap](https://user-images.githubusercontent.com/106460589/219248954-2c14db45-b9ba-41c8-b111-e30f306f7ea2.png)

The **minimap** is attached to camera position and camera rotation visualized by marker icon rotation. Click on map to swing camera to world position. Create SVG, paths as **custom icons** for individual entities. Use mouse **wheel** (scroll) to **zoom** in or out. Can be used to command entities. Support dynamic, static and grouped entities.

# Design Management

Centralized GUI and convenience settings.

# Optimization

Concerning materials are frozen to reduce **shaders overhead**. All world matrices of static entities are frozen to reduce **world matrix computation**. Materials and meshes are instantiated or cloned to reduce **draw calls**. The stencil and depth buffer clearing is skipped to reduce **OpenGL clear calls**. Animation ratio is used to flatten the frame rate differences. The material dirty mechanism is blocked to avoid bottleneck when various materials are used. A map of geometry ids is used to **speed-up the addition and removal of Geometry** in the scene. After a match ends on disposing of all meshes the active meshes and rendering groups are blocked to **speed-up the removal**.

Options:
- skipPointerMovePicking can be set to spare scene to pick on pointer move, though the health bars won't be shown on hover.
- onlyDetectedVisible can be set, so visibility is determined by detection range.

# Known Issues

- Pathfinding issues if building and unit size relation too great

# To-Do-List

- 3rd Person Hero Control
- AI

# Not supported

- Fog of War, kills performance on very large maps
