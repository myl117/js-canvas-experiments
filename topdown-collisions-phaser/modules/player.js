export default class Player {
  constructor(scene, x, y, size) {
    this.scene = scene;
    this.size = size;

    this.sprite = scene.add.rectangle(x, y, size, size, 0xff0000);
    scene.physics.add.existing(this.sprite);

    this.sprite.body.setCollideWorldBounds(true);
    this.sprite.body.setSize(size, size);

    this.keys = scene.input.keyboard.addKeys("W,A,S,D");
  }

  update() {
    const speed = 200;
    this.sprite.body.setVelocity(0);

    if (this.keys.W.isDown) this.sprite.body.setVelocityY(-speed);
    else if (this.keys.S.isDown) this.sprite.body.setVelocityY(speed);

    if (this.keys.A.isDown) this.sprite.body.setVelocityX(-speed);
    else if (this.keys.D.isDown) this.sprite.body.setVelocityX(speed);
  }
}
