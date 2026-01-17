import {
  areCubesEqual,
  createSolvedCube,
  MOVES,
  applyMoves,
} from "./rubiks-cube.js";

const solvedCube = createSolvedCube();
const moves = Object.keys(MOVES);

function isValid(move, lastMove) {
  if (!lastMove) {
    return true;
  }

  if (move[0] == lastMove[0]) {
    return false;
  }

  return true;
}

const DFS = (c, depth, lastMove, path) => {
  if (areCubesEqual(c, solvedCube)) {
    return true;
  }

  if (depth == 0) {
    return false;
  }

  for (const move of moves) {
    if (!isValid(move, lastMove)) {
      continue;
    }

    let nextCube = applyMoves(c, [move]);

    path.push(move);

    if (DFS(nextCube, depth - 1, move, path)) {
      return true;
    }

    path.pop();
  }

  return false;
};

const IDDFS = (c, MAX_DEPTH) => {
  for (let depth = 0; depth < MAX_DEPTH; depth++) {
    let path = [];

    if (DFS(c, depth, null, path)) {
      return path;
    }
  }

  return false;
};

export { IDDFS };
