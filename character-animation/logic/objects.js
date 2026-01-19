const loadGravityCube = (scene, THREE) => {
  // render cube with coloured mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({ color: 0x89cff0 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  cube.position.y = 4;
  cube.position.x = 3;

  let velocityY = 0;
  const gravity = -0.5 * 0.01;
  const floorY = 0.5;

  const applyGravity = () => {
    velocityY += gravity;

    // Apply velocity to cube
    cube.position.y += velocityY;

    // Stop on floor
    if (cube.position.y <= floorY) {
      cube.position.y = floorY;
      velocityY = 0;
    }
  };

  return { cube, applyGravity };
};

const loadObjects = (scene, THREE) => {
  const gravityCube = loadGravityCube(scene, THREE);

  return { gravityCube };
};

export { loadObjects };
