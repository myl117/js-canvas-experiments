import { PlayerControlled, Velocity } from "../components/components.js";

export class KeyboardInputSystem {
  constructor() {
    this.keys = {};

    window.addEventListener("keydown", (e) => {
      this.keys[e.code] = true;
    });

    window.addEventListener("keyup", (e) => {
      this.keys[e.code] = false;
    });
  }

  update(entities, dt) {
    for (const e of entities) {
      if (!e.has(PlayerControlled, Velocity)) continue;

      const player = e.get(PlayerControlled);
      const vel = e.get(Velocity);

      vel.x = 0;
      vel.z = 0;

      if (this.keys["KeyW"]) vel.z -= player.speed;
      if (this.keys["KeyS"]) vel.z += player.speed;
      if (this.keys["KeyA"]) vel.x -= player.speed;
      if (this.keys["KeyD"]) vel.x += player.speed;
    }
  }
}
