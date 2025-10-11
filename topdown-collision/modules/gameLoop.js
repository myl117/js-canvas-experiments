import { ctx } from "./canvas.js";
import { cube } from "./cube.js";
import { walls } from "./walls.js";
import { keys } from "./input.js";
import { camera, updateCamera, WORLD_WIDTH, WORLD_HEIGHT } from "./camera.js";

export function isColliding(a, b) {
  return (
    a.x < b.x + b.size &&
    a.x + a.size > b.x &&
    a.y < b.y + b.size &&
    a.y + a.size > b.y
  );
}

export function update() {
  const oldX = cube.x;
  const oldY = cube.y;
  const speed = 5;

  if (keys.w) cube.y -= speed;
  if (keys.s) cube.y += speed;
  if (keys.a) cube.x -= speed;
  if (keys.d) cube.x += speed;

  // world bounds
  cube.x = Math.max(0, Math.min(cube.x, WORLD_WIDTH - cube.size));
  cube.y = Math.max(0, Math.min(cube.y, WORLD_HEIGHT - cube.size));

  // wall collisions
  for (const wall of walls) {
    if (isColliding(cube, wall)) {
      cube.x = oldX;
      cube.y = oldY;
      break;
    }
  }

  updateCamera(cube);
}

export function loop(drawCube, drawWalls) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  update();
  drawWalls(ctx, camera);
  drawCube(ctx, cube, camera);
  requestAnimationFrame(() => loop(drawCube, drawWalls));
}
