export const WORLD_WIDTH = window.innerWidth * 2;
export const WORLD_HEIGHT = window.innerHeight * 2;

export const camera = {
  x: 0,
  y: 0,
  width: window.innerWidth,
  height: window.innerHeight,
};

export function updateCamera(player) {
  camera.x = player.x + player.size / 2 - camera.width / 2;
  camera.y = player.y + player.size / 2 - camera.height / 2;

  // clamp camera inside world bounds
  camera.x = Math.max(0, Math.min(camera.x, WORLD_WIDTH - camera.width));
  camera.y = Math.max(0, Math.min(camera.y, WORLD_HEIGHT - camera.height));
}
