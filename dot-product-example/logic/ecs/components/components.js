export class Position {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

export class Velocity {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
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

export class PlayerControlled {
  constructor(speed = 3) {
    this.speed = speed;
    this.input = {
      forward: false,
      backward: false,
      left: false,
      right: false,
    };
  }
}

export class Facing {
  constructor(x = 0, z = 1) {
    this.x = x;
    this.z = z;
  }
}

export class Watcher {
  constructor(fovDeg = 90, viewDistance = 10) {
    this.fov = (fovDeg * Math.PI) / 180; // convert degrees to radians
    this.viewDistance = viewDistance;
  }
}
