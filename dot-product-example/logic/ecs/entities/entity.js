export class Entity {
  constructor(id) {
    this.id = id;
    this.components = new Map();
  }

  add(component) {
    this.components.set(component.constructor, component);
    return this;
  }

  get(componentClass) {
    return this.components.get(componentClass);
  }

  has(...componentClasses) {
    return componentClasses.every((c) => this.components.has(c));
  }
}
