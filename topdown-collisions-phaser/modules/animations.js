export function createPlayerAnimations(scene) {
  scene.anims.create({
    key: "walk_right",
    frames: scene.anims.generateFrameNumbers("player_right", {
      start: 0,
      end: 5,
    }),
    frameRate: 10,
    repeat: -1,
  });

  scene.anims.create({
    key: "walk_left",
    frames: scene.anims.generateFrameNumbers("player_right", {
      start: 0,
      end: 5,
    }),
    frameRate: 10,
    repeat: -1,
  });
}
