# Third Person Controller

This project explores building a 3rd person controller from scratch in Three.js.

### Camera

```js
const cameraOffset = new THREE.Vector3(0, 3, 4);
const rotatedOffset = cameraOffset
  .clone()
  .applyEuler(new THREE.Euler(0, character.model.rotation.y, 0));
const desiredPos = character.model.position.clone().add(rotatedOffset);
camera.position.lerp(desiredPos, 0.1);
camera.lookAt(character.model.position);
```

- We clone our camera so we don't apply changes to the existing camera causing it so spin out of control.
- Rotate around the Y axis using Euler angles so that we stay behind the camera. - elab here
- Clone the player position and add the rotated offset. The returned position should be where the camera will sit.
- Use linear interpolation so the movement is smooth instead of snapping
- Lastly, make the camera always point at the character

### Loading Model

```js
if (model.children.length > 0) {
  model.children[0].rotation.y = Math.PI; // 180° turn
}
```

When loading, rotate the model by PI degrees (180). Mixamo assumes forward is +z whereas the controller logic assumes -z.

```js
const tPoseAction = actions[gltf.animations[0].name];
const walkAction = actions[gltf.animations[1].name];
```

The first Mixamo animation is a T pose and the second one is the main one.

### Controller Logic

```js
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
```

- We use the "moving" flag to decided whether to show T pose or walking animation
- a/d rotates the player around the y axis
- When user clicks on forward, create a forward vector and rotate it around the y axis (if the user has clicked a/d)
- Then scale this vector by movement speed
- Then add the vector to the players position
