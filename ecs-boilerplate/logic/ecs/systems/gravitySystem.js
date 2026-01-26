import {
  Position,
  Velocity,
  Gravity,
  Floor,
} from "../components/components.js";

export class GravitySystem {
  update(entities, dt) {
    for (const e of entities) {
      if (!e.has(Position, Velocity, Gravity)) continue;

      const pos = e.get(Position);
      const vel = e.get(Velocity);
      const grav = e.get(Gravity);
      const floor = e.get(Floor);

      // no dt as not tuned
      vel.y += grav.strength;
      pos.y += vel.y;

      if (floor && pos.y <= floor.y) {
        pos.y = floor.y;
        vel.y = 0;
      }
    }
  }
}
