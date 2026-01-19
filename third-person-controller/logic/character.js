import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const loadAnimatedModel = (scene, THREE, url) => {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();

    loader.load(
      url,
      (gltf) => {
        const model = gltf.scene;

        if (model.children.length > 0) {
          model.children[0].rotation.y = Math.PI; // 180 deg turn
        }

        model.scale.set(1, 1, 1);
        model.position.set(0, 0, 0);
        scene.add(model);

        const mixer = new THREE.AnimationMixer(model);
        const actions = {};

        gltf.animations.forEach((clip) => {
          actions[clip.name] = mixer.clipAction(clip);
        });

        const tPoseAction = actions[gltf.animations[0].name];
        const walkAction = actions[gltf.animations[1].name];

        walkAction.play();
        tPoseAction.play();

        resolve({ model, mixer, actions, walkAction, tPoseAction });
      },
      undefined,
      (error) => reject(error),
    );
  });
};

const anims = {
  walking: "../assets/models/walking.glb",
};

const loadCharacter = async (scene, THREE) => {
  const { model, mixer, actions, walkAction, tPoseAction } =
    await loadAnimatedModel(scene, THREE, anims.walking);

  const rotationSpeed = 0.04;
  const speed = 0.025; // movement speed
  const keys = {};

  // Track key presses
  window.addEventListener("keydown", (e) => {
    keys[e.key.toLowerCase()] = true;
  });
  window.addEventListener("keyup", (e) => {
    keys[e.key.toLowerCase()] = false;
  });

  const update = (delta) => {
    let moving = false;

    // --- Rotate character left/right ---
    if (keys["a"] || keys["arrowleft"]) {
      model.rotation.y += rotationSpeed; // positive = turn left
    }
    if (keys["d"] || keys["arrowright"]) {
      model.rotation.y -= rotationSpeed; // negative = turn right
    }

    // --- Move forward only ---
    if (keys["w"] || keys["arrowup"]) {
      const forward = new THREE.Vector3(0, 0, -1)
        .applyEuler(new THREE.Euler(0, model.rotation.y, 0))
        .multiplyScalar(speed);
      model.position.add(forward);
      moving = true;
    }

    // --- Animation toggle ---
    if (moving) {
      walkAction.enabled = true;
      tPoseAction.enabled = false;
    } else {
      walkAction.enabled = false;
      tPoseAction.enabled = true;
    }

    // --- Update mixer ---
    mixer.update(delta);
  };

  return { model, mixer, update };
};

export { loadCharacter };
