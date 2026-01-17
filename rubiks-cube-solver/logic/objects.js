import {
  createSolvedCube,
  applyMoves,
  scramble as scrambleCube,
  inverseMoves,
} from "./rubiks-cube.js";

// let c = createSolvedCube();
// c = applyMoves(c, ["R", "U", "F", "B", "L", "D", "U'"]);
// c = applyMoves(c, ["U", "D'", "L'", "B'", "F'", "U'", "R'"]);
// console.log(areCubesEqual(c, createSolvedCube()));

const getCubeColor = (index) => {
  if (index >= 0 && index <= 8) return "white"; // U
  if (index >= 9 && index <= 17) return "#FF5C00"; // "orange"; // L
  if (index >= 18 && index <= 26) return "green"; // F
  if (index >= 27 && index <= 35) return "red"; // R
  if (index >= 36 && index <= 44) return "blue"; // B
  if (index >= 45 && index <= 53) return "yellow"; // D
  return null;
};

const generateFaceTexture = (faceIndices, size = 300) => {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  const cellSize = size / 3;

  for (let i = 0; i < 9; i++) {
    const color = getCubeColor(faceIndices[i]);

    const row = Math.floor(i / 3);
    const col = i % 3;

    ctx.fillStyle = color;
    ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);

    // Optional: draw black border around each sticker
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
  }

  // Return the canvas as an image
  const img = new Image();
  img.src = canvas.toDataURL();
  return img;
};

const generateCubeTexture = (cube) => {
  return {
    top: generateFaceTexture(cube.slice(0, 9)),
    bottom: generateFaceTexture(cube.slice(45, 54)),
    front: generateFaceTexture(cube.slice(18, 27)),
    back: generateFaceTexture(cube.slice(36, 45)),
    left: generateFaceTexture(cube.slice(9, 18)),
    right: generateFaceTexture(cube.slice(27, 36)),
  };
};

const loadRubiksCube = (scene, THREE) => {
  let rubiksCube = createSolvedCube();
  let scrambledMoves = [];

  const getCubeTex = () => {
    const cubeTex = generateCubeTexture(rubiksCube);

    const textureLoader = new THREE.TextureLoader();

    const materials = [
      new THREE.MeshStandardMaterial({
        map: textureLoader.load(cubeTex.right.src),
      }),
      new THREE.MeshStandardMaterial({
        map: textureLoader.load(cubeTex.left.src),
      }),
      new THREE.MeshStandardMaterial({
        map: textureLoader.load(cubeTex.top.src),
      }),
      new THREE.MeshStandardMaterial({
        map: textureLoader.load(cubeTex.bottom.src),
      }),
      new THREE.MeshStandardMaterial({
        map: textureLoader.load(cubeTex.front.src),
      }),
      new THREE.MeshStandardMaterial({
        map: textureLoader.load(cubeTex.back.src),
      }),
    ];

    return materials;
  };

  const updateCube = (moves) => {
    rubiksCube = applyMoves(rubiksCube, moves);

    const cubeTex = generateCubeTexture(rubiksCube);
    const faceMaps = [
      cubeTex.right,
      cubeTex.left,
      cubeTex.top,
      cubeTex.bottom,
      cubeTex.front,
      cubeTex.back,
    ];

    cube.material.forEach((mat, i) => {
      if (mat.map) mat.map.dispose();
      mat.map = new THREE.CanvasTexture(faceMaps[i]);
      mat.map.needsUpdate = true;
    });
  };

  const scramble = async (moves, delay) => {
    updateCube(inverseMoves(scrambledMoves));
    const { movesMade } = await scrambleCube(
      rubiksCube,
      moves,
      updateCube,
      delay,
    );
    scrambledMoves = movesMade;
  };

  const unScramble = async (delay) => {
    const unscrambleMoves = inverseMoves(scrambledMoves);

    for (const m of unscrambleMoves) {
      console.log(m);
      await new Promise((r) => setTimeout(r, 100));
      updateCube([m]);
    }

    scrambledMoves = [];
  };

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const cube = new THREE.Mesh(geometry, getCubeTex());
  scene.add(cube);

  cube.position.y = 0.5;

  return { updateCube, scramble, unScramble };
};

const loadObjects = (scene, THREE) => {
  const rubiksCube = loadRubiksCube(scene, THREE);
  return { rubiksCube };
};

export { loadObjects };
