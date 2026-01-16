const initLights = (scene, THREE) => {
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(3, 3, 3);
  scene.add(light);

  light.position.x = -light.position.x;
  light.position.z = -light.position.z;

  const light2 = new THREE.DirectionalLight(0xffffff, 1);
  light2.position.set(3, 3, 3);
  scene.add(light2);

  const lightHelper = new THREE.DirectionalLightHelper(light, 1);
  scene.add(lightHelper);

  const lightHelper2 = new THREE.DirectionalLightHelper(light2, 1);
  scene.add(lightHelper2);
};

export { initLights };
