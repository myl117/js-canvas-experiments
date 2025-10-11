export const walls = [
  { x: 300, y: 100, size: 150, color: "#4444ffff" },
  { x: 800, y: 250, size: 120, color: "#4444ffff" },
  { x: 200, y: 400, size: 100, color: "#4444ffff" },
  { x: 500, y: 500, size: 200, color: "#4444ffff" },
  { x: 1200, y: 600, size: 200, color: "#44ff44ff" },
  { x: 1500, y: 300, size: 150, color: "#44ff44ff" },
];

export function drawWalls(ctx, camera) {
  for (const wall of walls) {
    ctx.fillStyle = wall.color;
    ctx.fillRect(wall.x - camera.x, wall.y - camera.y, wall.size, wall.size);
  }
}
