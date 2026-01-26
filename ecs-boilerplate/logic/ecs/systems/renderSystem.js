import { Position, Mesh } from "../components/components.js";

export class RenderSystem {
  update(entities) {
    for (const e of entities) {
      if (!e.has(Position, Mesh)) continue;

      const pos = e.get(Position);
      const mesh = e.get(Mesh).mesh;

      mesh.position.set(pos.x, pos.y, pos.z);
    }
  }
}
