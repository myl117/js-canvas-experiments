import { Position, Velocity } from "../components/components.js";

export class MovementSystem {
  update(entities, dt) {
    for (const e of entities) {
      if (!e.has(Position, Velocity)) continue;

      const pos = e.get(Position);
      const vel = e.get(Velocity);

      pos.x += vel.x;
      pos.z += vel.z;
    }
  }
}
