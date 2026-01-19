import * as THREE from "three";
import { initLights } from "./helpers/lights.js";
import { initHelpers } from "./helpers/helpers.js";
import { loadObjects } from "./objects.js";
import { loadAnimatedModel } from "./character.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

camera.position.z = 5;
const radius = camera.position.z;
const angle = THREE.MathUtils.degToRad(-30);
camera.position.x = radius * Math.sin(angle);
camera.position.z = radius * Math.cos(angle);
camera.position.y = 4;
camera.lookAt(0, 0, 0);

initLights(scene, THREE);
const { renderer, controls } = initHelpers(camera, scene, THREE);
const { gravityCube } = loadObjects(scene, THREE);

const { mixer } = await loadAnimatedModel(
  scene,
  THREE,
  "../assets/models/walking.glb",
);

const clock = new THREE.Clock();

function animate() {
  const delta = clock.getDelta();

  mixer?.update(delta);
  gravityCube.applyGravity();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}

animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
