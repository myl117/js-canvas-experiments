export default class MovingWall {
  constructor(scene, x, y, width, height, range = 200, speed = 100) {
    this.scene = scene;
    this.startX = x;
    this.range = range;
    this.speed = speed;

    this.sprite = scene.add.rectangle(x, y, width, height, 0x00ff88);
    scene.physics.add.existing(this.sprite);

    this.sprite.body.setImmovable(true);
    this.sprite.body.setCollideWorldBounds(true);
    this.sprite.body.setVelocityX(speed);
  }

  update() {
    if (this.sprite.x > this.startX + this.range) {
      this.sprite.body.setVelocityX(-this.speed);
    } else if (this.sprite.x < this.startX - this.range) {
      this.sprite.body.setVelocityX(this.speed);
    }
  }
}
