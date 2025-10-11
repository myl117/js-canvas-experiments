export const cube = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  size: 50,
  color: "red",
};

export function drawCube(ctx, obj, camera) {
  ctx.fillStyle = obj.color;
  ctx.fillRect(obj.x - camera.x, obj.y - camera.y, obj.size, obj.size);
}
