import {
  Position,
  Facing,
  Watcher,
  PlayerControlled,
} from "../components/components.js";
import * as THREE from "three";

export class VisionSystem {
  constructor(scene) {
    this.scene = scene;
    this.debugLines = [];
  }

  update(entities) {
    for (const line of this.debugLines) {
      this.scene.remove(line);
    }
    this.debugLines = [];

    const players = entities.filter((e) => e.has(PlayerControlled, Position));

    for (const watcher of entities) {
      if (!watcher.has(Position, Facing, Watcher)) continue;

      const pos = watcher.get(Position);
      const facing = watcher.get(Facing);
      const watcherComp = watcher.get(Watcher);

      // normalise direction vector
      const fLen = Math.hypot(facing.x, facing.z);
      const fx = facing.x / fLen;
      const fz = facing.z / fLen;

      for (const player of players) {
        const pPos = player.get(Position);

        const dx = pPos.x - pos.x;
        const dz = pPos.z - pos.z;
        const dist = Math.hypot(dx, dz);

        if (dist > watcherComp.viewDistance) continue;

        const nx = dx / dist;
        const nz = dz / dist;

        // calculate dot product
        const dot = fx * nx + fz * nz;

        // derive angle
        const angle = Math.acos(dot);

        if (angle < watcherComp.fov / 2) {
          const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
          const points = [
            new THREE.Vector3(pos.x, pos.y + 0.5, pos.z),
            new THREE.Vector3(pPos.x, pPos.y + 0.5, pPos.z),
          ];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const line = new THREE.Line(geometry, material);
          this.scene.add(line);
          this.debugLines.push(line);

          console.log(
            `Gravity cube sees the player! dot product: ${dot.toFixed(2)} angle: ${angle.toFixed(2)}`,
          );
        }
      }
    }
  }
}
