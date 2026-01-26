export class Position {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

export class Velocity {
  constructor(y = 0) {
    this.y = y;
  }
}

export class Gravity {
  constructor(strength = -0.5) {
    this.strength = strength;
  }
}

export class Mesh {
  constructor(mesh) {
    this.mesh = mesh;
  }
}

export class Floor {
  constructor(y = 0.5) {
    this.y = y;
  }
}

export class SceneObject {}
