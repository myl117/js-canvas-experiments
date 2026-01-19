import * as THREE from "three";
import { initLights } from "./helpers/lights.js";
import { initHelpers } from "./helpers/helpers.js";
import { loadObjects } from "./objects.js";

const scene = new THREE.Scene();

// All this code is redundant as the new camera system follows the player
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
const { gravityCube, character } = await loadObjects(scene, THREE);

const clock = new THREE.Clock();

function animate() {
  const delta = clock.getDelta();

  character.update(delta);
  gravityCube.applyGravity();

  // follow our player
  const cameraOffset = new THREE.Vector3(0, 3, 4);
  const rotatedOffset = cameraOffset
    .clone()
    .applyEuler(new THREE.Euler(0, character.model.rotation.y, 0));
  const desiredPos = character.model.position.clone().add(rotatedOffset);
  camera.position.lerp(desiredPos, 0.1);
  camera.lookAt(character.model.position);

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
