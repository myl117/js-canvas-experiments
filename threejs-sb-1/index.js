import * as THREE from "three";
import { initLights } from "./lights.js";
import { initHelpers } from "./helpers.js";
import { loadObjects } from "./objects.js";

const scene = new THREE.Scene();

// FOV = 75, aspect ratio, near clipping plain, far clipping plane
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 3;

initLights(scene, THREE);
const { renderer, controls } = initHelpers(camera, scene, THREE);
loadObjects(scene, THREE);

function animate() {
  requestAnimationFrame(animate);
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  renderer.render(scene, camera);
  controls.update();
}

animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
