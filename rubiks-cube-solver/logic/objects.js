import { createSolvedCube, applyMoves, areCubesEqual } from "./rubiks-cube.js";

let c = createSolvedCube();
c = applyMoves(c, ["R", "U", "F", "B", "L", "D", "U'"]);
c = applyMoves(c, ["U", "D'", "L'", "B'", "F'", "U'", "R'"]);
console.log(areCubesEqual(c, createSolvedCube()));

const loadStaticCube = (scene, THREE) => {
  // render cube with coloured mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({ color: 0xff8080 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  cube.position.y = 0.5;
};

const loadObjects = (scene, THREE) => {
  loadStaticCube(scene, THREE);
};

export { loadObjects };
