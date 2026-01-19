import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const loadAnimatedModel = (scene, THREE, url) => {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();

    loader.load(
      url,
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(1, 1, 1);
        model.position.set(0, 0, 0);
        scene.add(model);

        const mixer = new THREE.AnimationMixer(model);
        gltf.animations.forEach((clip) => {
          mixer.clipAction(clip).play();
        });

        resolve({ model, mixer });
      },
      undefined,
      (error) => reject(error),
    );
  });
};

export { loadAnimatedModel };
