import { drawCube } from "./modules/cube.js";
import { drawWalls } from "./modules/walls.js";
import { loop } from "./modules/gameLoop.js";

// start the game loop
loop(drawCube, drawWalls);
