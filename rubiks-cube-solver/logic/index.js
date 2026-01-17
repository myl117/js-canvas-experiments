import * as THREE from "three";
import GUI from "lil-gui";
import { initLights } from "./helpers/lights.js";
import { initHelpers } from "./helpers/helpers.js";
import { loadObjects } from "./objects.js";

const scene = new THREE.Scene();

// FOV = 75, aspect ratio, near clipping plain, far clipping plane
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
const { rubiksCube } = loadObjects(scene, THREE);

const gui = new GUI();

const params = {
  moveIndex: 0,
  delay: 100,
  scrambleCount: 3,
  maxSolveDepth: 6,
  scramble: () => {
    rubiksCube.scramble(params.scrambleCount, params.delay);
  },
  unscramble: () => {
    rubiksCube.unScramble(params.delay);
  },
  solve: () => {
    rubiksCube.solve(params.delay, params.maxSolveDepth);
  },
};

gui.add(params, "delay", 10, 1000, 10).name("Delay (ms)");
gui.add(params, "scramble").name("Scramble");
gui.add(params, "unscramble").name("Unscramble");
gui.add(params, "scrambleCount").name("Scramble Count");
gui.add(params, "maxSolveDepth").name("Max Solve Depth");
gui.add(params, "solve").name("Solve (IDDFS)");

// const moves = [
//   "R",
//   "U",
//   "F",
//   "B",
//   "L",
//   "D",
//   "U'",
//   "U",
//   "D'",
//   "L'",
//   "B'",
//   "F'",
//   "U'",
//   "R'",
// ];

// let currentMoveIndex = 0;

// const applyNextMove = () => {
//   if (currentMoveIndex >= moves.length) return;
//   rubiksCube.updateCube([moves[currentMoveIndex]]);
//   currentMoveIndex++;

//   setTimeout(applyNextMove, 100);
// };

// applyNextMove();

function animate() {
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
