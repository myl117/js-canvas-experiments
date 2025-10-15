import Player from "./player.js";
import Wall from "./wall.js";

export default class Scene extends Phaser.Scene {
  constructor() {
    super({ key: "Scene" });
  }

  preload() {}

  create() {
    // Create walls
    this.walls = this.physics.add.staticGroup();
    this.walls.add(new Wall(this, 200, 150, 100));
    this.walls.add(new Wall(this, 600, 150, 100));
    this.walls.add(new Wall(this, 200, 450, 100));
    this.walls.add(new Wall(this, 600, 450, 100));

    this.player = new Player(this, 400, 300, 50);

    // collisions
    this.physics.add.collider(this.player.sprite, this.walls);

    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    const WORLD_WIDTH = canvasWidth * 2;
    const WORLD_HEIGHT = canvasHeight * 2;

    // camera follows player
    this.cameras.main.startFollow(this.player.sprite);
    this.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
    this.physics.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
  }

  update() {
    this.player.update();
  }
}
