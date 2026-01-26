import { Entity } from "./entity.js";

export class World {
  constructor() {
    this.entities = [];
    this.systems = [];
    this.nextId = 0;
  }

  createEntity() {
    const entity = new Entity(this.nextId++);
    this.entities.push(entity);
    return entity;
  }

  addSystem(system) {
    this.systems.push(system);
  }

  update(dt) {
    for (const system of this.systems) {
      system.update(this.entities, dt);
    }
  }
}
