const createSolvedCube = () => {
  const cube = [];
  for (let i = 0; i < 54; i++) cube.push(i);
  return cube;
};

const rotateFaceStickers = (cube, faceIndices, clockwise = true) => {
  const prev = faceIndices.map((i) => cube[i]);
  const map = clockwise
    ? [6, 3, 0, 7, 4, 1, 8, 5, 2]
    : [2, 5, 8, 1, 4, 7, 0, 3, 6];

  faceIndices.forEach((targetIdx, i) => {
    cube[targetIdx] = prev[map[i]];
  });
};

const cycleEdges = (cube, groups, clockwise = true) => {
  const tmp = groups.map((group) => group.map((idx) => cube[idx]));
  const n = groups.length;

  for (let i = 0; i < n; i++) {
    const from = clockwise ? (i + n - 1) % n : (i + 1) % n;
    groups[i].forEach((targetIdx, j) => {
      cube[targetIdx] = tmp[from][j];
    });
  }
};

const generateMove = (cube, faceIndices, edgeGroups, clockwise = true) => {
  const newCube = [...cube];
  rotateFaceStickers(newCube, faceIndices, clockwise);
  cycleEdges(newCube, edgeGroups, clockwise);
  return newCube;
};

const U_FACE = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const L_FACE = [9, 10, 11, 12, 13, 14, 15, 16, 17];
const F_FACE = [18, 19, 20, 21, 22, 23, 24, 25, 26];
const R_FACE = [27, 28, 29, 30, 31, 32, 33, 34, 35];
const B_FACE = [36, 37, 38, 39, 40, 41, 42, 43, 44];
const D_FACE = [45, 46, 47, 48, 49, 50, 51, 52, 53];

const U_EDGES = [
  [18, 19, 20],
  [27, 28, 29],
  [36, 37, 38],
  [9, 10, 11],
];

const D_EDGES = [
  [24, 25, 26],
  [33, 34, 35],
  [42, 43, 44],
  [15, 16, 17],
];

const F_EDGES = [
  [6, 7, 8],
  [27, 30, 33],
  [47, 46, 45],
  [17, 14, 11],
];

const B_EDGES = [
  [2, 1, 0],
  [9, 12, 15],
  [51, 52, 53],
  [35, 32, 29],
];

const L_EDGES = [
  [0, 3, 6],
  [18, 21, 24],
  [45, 48, 51],
  [44, 41, 38],
];

const R_EDGES = [
  [8, 5, 2],
  [36, 39, 42],
  [53, 50, 47],
  [26, 23, 20],
];

const MOVES = {};

const addMove = (name, face, edges) => {
  MOVES[name] = (cube) => generateMove(cube, face, edges, true);
  MOVES[name + "'"] = (cube) => generateMove(cube, face, edges, false);
  MOVES[name + "2"] = (cube) => MOVES[name](MOVES[name](cube));
};

addMove("U", U_FACE, U_EDGES);
addMove("D", D_FACE, D_EDGES);
addMove("F", F_FACE, F_EDGES);
addMove("B", B_FACE, B_EDGES);
addMove("L", L_FACE, L_EDGES);
addMove("R", R_FACE, R_EDGES);

const applyMoves = (cube, moves) => {
  return moves.reduce((c, m) => MOVES[m](c), cube);
};

const areCubesEqual = (c1, c2) => {
  return c1.every((val, i) => val === c2[i]);
};

export { createSolvedCube, MOVES, areCubesEqual, applyMoves };
