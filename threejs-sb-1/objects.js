const loadObjects = (scene, THREE) => {
  // render cube with coloured mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({ color: 0xff8080 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  cube.position.y = 0.5;
};

export { loadObjects };
