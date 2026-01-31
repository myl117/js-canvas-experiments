import * as THREE from "three";
import { World } from "./ecs/entities/world.js";
import { GravitySystem } from "./ecs/systems/gravitySystem.js";
import { RenderSystem } from "./ecs/systems/renderSystem.js";
import { SceneSystem } from "./ecs/systems/sceneSystem.js";
import { KeyboardInputSystem } from "./ecs/systems/keyboardInputSystem.js";
import { MovementSystem } from "./ecs/systems/movementSystem.js";
import { VisionSystem } from "./ecs/systems/visionSystem.js";
import { initLights } from "./helpers/lights.js";
import { initHelpers } from "./helpers/helpers.js";
import { loadObjects } from "./objects.js";

const scene = new THREE.Scene();
const world = new World();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

camera.position.set(0, 10, 0);
camera.lookAt(0, 0, 0);

initLights(scene, THREE);
const { renderer, controls } = initHelpers(camera, scene, THREE);

world.addSystem(new KeyboardInputSystem());
world.addSystem(new MovementSystem());
world.addSystem(new GravitySystem());
world.addSystem(new VisionSystem(scene));
world.addSystem(new RenderSystem());
world.addSystem(new SceneSystem(scene));

loadObjects(scene, THREE, world);

let lastTime = performance.now();

function animate(time) {
  const dt = (time - lastTime) / 1000;
  lastTime = time;

  world.update(dt);

  renderer.render(scene, camera);
  controls.update();
  requestAnimationFrame(animate);
}

animate();
