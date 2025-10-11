export const keys = { w: false, a: false, s: false, d: false };

window.addEventListener("keydown", (e) => {
  if (keys.hasOwnProperty(e.key.toLowerCase()))
    keys[e.key.toLowerCase()] = true;
});

window.addEventListener("keyup", (e) => {
  if (keys.hasOwnProperty(e.key.toLowerCase()))
    keys[e.key.toLowerCase()] = false;
});
