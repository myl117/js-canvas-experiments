export default class Wall {
  constructor(scene, x, y, size) {
    const rect = scene.add.rectangle(x, y, size, size, 0x4444ff);

    scene.physics.add.existing(rect, true);
    rect.body.setSize(size, size);

    return rect;
  }
}
