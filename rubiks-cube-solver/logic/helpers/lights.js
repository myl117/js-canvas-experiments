const initLights = (scene, THREE) => {
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(3, 3, 3);
  scene.add(light);

  light.position.x = -light.position.x;
  light.position.z = -light.position.z;

  const light2 = new THREE.DirectionalLight(0xffffff, 1);
  light2.position.set(3, 3, 3);
  scene.add(light2);

  const light3 = new THREE.DirectionalLight(0xffffff, 1);
  light3.position.set(3, 3, 3);
  scene.add(light3);

  light3.position.x = -light3.position.x;
  light3.position.z = -light3.position.z;
  light3.position.y = -light3.position.y;

  const lightHelper = new THREE.DirectionalLightHelper(light, 1);
  scene.add(lightHelper);

  const lightHelper2 = new THREE.DirectionalLightHelper(light2, 1);
  scene.add(lightHelper2);

  const lightHelper3 = new THREE.DirectionalLightHelper(light3, 1);
  scene.add(lightHelper3);
};

export { initLights };
