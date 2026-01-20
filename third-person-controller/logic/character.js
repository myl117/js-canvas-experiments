import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { gravityCube } from "./objects.js";

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

        // walkAction.play();
        // tPoseAction.play();

        resolve({ model, mixer, actions, walkAction, tPoseAction });
      },
      undefined,
      (error) => reject(error),
    );
  });
};

const loadAnimationOnly = (THREE, url) => {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.load(
      url,
      (gltf) => {
        const clip = gltf.animations[0];
        resolve(clip);
      },
      undefined,
      (error) => reject(error),
    );
  });
};

const anims = {
  walking: "../assets/models/walking.glb",
  running: "../assets/animations/running.glb",
  idle: "../assets/animations/idle.glb",
};

const loadCharacter = async (scene, THREE) => {
  const { model, mixer, actions, walkAction } = await loadAnimatedModel(
    scene,
    THREE,
    anims.walking,
  );

  const runningClip = await loadAnimationOnly(THREE, anims.running);
  const runningAction = mixer.clipAction(runningClip);

  const idleClip = await loadAnimationOnly(THREE, anims.idle);
  const idleAction = mixer.clipAction(idleClip);

  idleAction.play();

  const rotationSpeed = 0.04;
  const speed = 0.025; // movement speed
  const runSpeed = 0.05;
  const fadeDuration = 0.3;
  const keys = {};

  // Track key presses
  window.addEventListener("keydown", (e) => {
    keys[e.key.toLowerCase()] = true;
  });
  window.addEventListener("keyup", (e) => {
    keys[e.key.toLowerCase()] = false;
  });

  let activeAction = idleAction;

  let playerBox = new THREE.Box3();
  const playerHelper = new THREE.Box3Helper(playerBox, 0x00ff00);
  scene.add(playerHelper);

  const playerBoxVector = new THREE.Vector3(0.9, 1.8, 0.9);

  const updatePlayerBox = () => {
    playerBox.setFromCenterAndSize(
      model.position.clone().setY(1),
      playerBoxVector,
    );
    playerHelper.updateMatrixWorld(true);
  };

  const update = (delta) => {
    let moving = false;

    const running = keys["shift"] || keys["shiftleft"] || keys["shiftright"];
    const currentSpeed = running ? runSpeed : speed;

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
        .multiplyScalar(currentSpeed);

      const cubeBox = new THREE.Box3().setFromObject(gravityCube.cube);

      const cubeHelper = new THREE.Box3Helper(
        new THREE.Box3().setFromObject(gravityCube.cube),
        0xff0000,
      );
      scene.add(cubeHelper);

      let canMoveX = true;
      let canMoveZ = true;

      // Check X axis
      const testPosX = model.position
        .clone()
        .add(new THREE.Vector3(forward.x, 0, 0));
      const boxX = new THREE.Box3().setFromCenterAndSize(
        testPosX.clone().setY(1),
        playerBoxVector,
      );
      if (boxX.intersectsBox(cubeBox)) canMoveX = false;

      // Check Z axis
      const testPosZ = model.position
        .clone()
        .add(new THREE.Vector3(0, 0, forward.z));
      const boxZ = new THREE.Box3().setFromCenterAndSize(
        testPosZ.clone().setY(1),
        playerBoxVector,
      );
      if (boxZ.intersectsBox(cubeBox)) canMoveZ = false;

      // Apply allowed movement
      const newPos = model.position.clone();
      if (canMoveX) newPos.x += forward.x;
      if (canMoveZ) newPos.z += forward.z;

      model.position.copy(newPos);
      moving = canMoveX || canMoveZ;
    }

    updatePlayerBox();

    let targetAction;
    if (!moving) targetAction = idleAction;
    else targetAction = running ? runningAction : walkAction;

    if (activeAction !== targetAction) {
      activeAction.fadeOut(fadeDuration);

      targetAction.reset();
      targetAction.enabled = true;
      targetAction.fadeIn(fadeDuration);
      targetAction.play();

      activeAction = targetAction;
    }

    // --- Update mixer ---
    mixer.update(delta);
  };

  return { model, mixer, update };
};

export { loadCharacter };
