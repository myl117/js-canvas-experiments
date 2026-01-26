import { Mesh, SceneObject } from "../components/components.js";

export class SceneSystem {
  constructor(scene) {
    this.scene = scene;
  }

  update(entities) {
    for (const e of entities) {
      if (!e.has(Mesh, SceneObject)) continue;

      const mesh = e.get(Mesh).mesh;

      if (!mesh.parent) {
        this.scene.add(mesh);
      }
    }
  }
}
