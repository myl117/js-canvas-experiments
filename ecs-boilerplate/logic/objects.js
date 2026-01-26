import {
  Position,
  Velocity,
  Gravity,
  Mesh,
  Floor,
  SceneObject,
} from "./ecs/components/components.js";

export function loadObjects(scene, THREE, world) {
  // Static cube
  world
    .createEntity()
    .add(new Position(0, 0.5, 0))
    .add(
      new Mesh(
        new THREE.Mesh(
          new THREE.BoxGeometry(1, 1, 1),
          new THREE.MeshStandardMaterial({ color: 0xff8080 }),
        ),
      ),
    )
    .add(new SceneObject());

  // Gravity cube
  world
    .createEntity()
    .add(new Position(3, 4, 0))
    .add(new Velocity())
    .add(new Gravity(-0.005))
    .add(new Floor(0.5))
    .add(
      new Mesh(
        new THREE.Mesh(
          new THREE.BoxGeometry(1, 1, 1),
          new THREE.MeshStandardMaterial({ color: 0x89cff0 }),
        ),
      ),
    )
    .add(new SceneObject());
}
