import Player from "./player.js";
import Wall from "./wall.js";
import MovingWall from "./MovingWall.js";

export default class Scene extends Phaser.Scene {
  constructor() {
    super({ key: "Scene" });
  }

  preload() {}

  create() {
    // Create walls
    this.walls = this.physics.add.staticGroup();
    this.walls.add(new Wall(this, 400, 200, 100));
    this.walls.add(new Wall(this, 600, 400, 100));
    this.walls.add(new Wall(this, 300, 450, 100));
    this.walls.add(new Wall(this, 800, 800, 100));

    this.movingWall = new MovingWall(this, 800, 600, 150, 40, 250, 150);

    this.player = new Player(this, 700, 700, 50);

    // collisions
    this.physics.add.collider(this.player.sprite, this.walls);
    this.physics.add.collider(this.player.sprite, this.movingWall.sprite);

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
    this.movingWall.update();
  }
}
