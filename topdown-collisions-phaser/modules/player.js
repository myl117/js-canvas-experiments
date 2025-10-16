export default class Player {
  constructor(scene, x, y, size) {
    this.scene = scene;
    this.size = size;

    this.sprite = scene.physics.add.sprite(x, y, "player_right", 0);
    this.sprite.setCollideWorldBounds(true);

    this.sprite.body.setSize(size * 0.6, size * 0.85);
    this.sprite.setScale(2);

    this.keys = scene.input.keyboard.addKeys("W,A,S,D");

    this.lastDirection = "right";
  }

  update() {
    const speed = 200;
    const body = this.sprite.body;
    body.setVelocity(0);

    let moving = false;

    // Horizontal
    if (this.keys.A.isDown) {
      body.setVelocityX(-speed);
      this.sprite.setFlipX(true);
      this.sprite.play("walk_left", true);
      this.lastDirection = "left";
      moving = true;
    } else if (this.keys.D.isDown) {
      body.setVelocityX(speed);
      this.sprite.setFlipX(false);
      this.sprite.play("walk_right", true);
      this.lastDirection = "right";
      moving = true;
    }

    // Vertical
    if (this.keys.W.isDown) {
      body.setVelocityY(-speed);
      if (this.lastDirection === "left") {
        this.sprite.setFlipX(true);
        this.sprite.play("walk_left", true);
      } else {
        this.sprite.setFlipX(false);
        this.sprite.play("walk_right", true);
      }
      moving = true;
    } else if (this.keys.S.isDown) {
      body.setVelocityY(speed);
      if (this.lastDirection === "left") {
        this.sprite.setFlipX(true);
        this.sprite.play("walk_left", true);
      } else {
        this.sprite.setFlipX(false);
        this.sprite.play("walk_right", true);
      }
      moving = true;
    }

    // Idle
    if (!moving) {
      this.sprite.anims.stop();

      // Freeze on 3rd frame
      if (this.lastDirection === "left") {
        this.sprite.setFlipX(true);
        this.sprite.setFrame(2);
      } else {
        this.sprite.setFlipX(false);
        this.sprite.setFrame(2);
      }
    }
  }
}
