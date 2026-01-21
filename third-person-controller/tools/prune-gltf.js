const { NodeIO } = require("@gltf-transform/core");
const { prune } = require("@gltf-transform/functions");

async function removeMeshesKeepSkeleton(inputPath, outputPath) {
  const io = new NodeIO();

  const document = await io.read(inputPath);

  const root = document.getRoot();

  root.listNodes().forEach((node) => {
    if (node.getMesh()) node.setMesh(null);
  });

  await document.transform(prune());

  io.write(outputPath, document);

  console.log(`Saved skeleton-only file to ${outputPath}`);
}

removeMeshesKeepSkeleton(
  "../assets/animations/running.glb",
  "../assets/animations/running-pruned.glb",
);
