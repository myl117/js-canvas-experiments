const initLights = (scene, THREE) => {
  const lights = [
    [-3, 3, -3],
    [3, 3, 3],
    [-3, -3, -3],
  ];

  for (const l of lights) {
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(l[0], l[1], l[2]);
    scene.add(light);

    const lightHelper = new THREE.DirectionalLightHelper(light, 1);
    scene.add(lightHelper);
  }

  const hemLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
  scene.add(hemLight);
};

export { initLights };
