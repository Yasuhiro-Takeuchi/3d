import { loadGLTF } from "./libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async () => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './assets/targets/o-pn.mind'
    });
    const { renderer, scene, camera } = mindarThree;

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    const loadModelForMarker = async (markerId, modelPath, position, scale, rotation) => {
      const markerAnchor = mindarThree.addAnchor(markerId);
      const model = await loadGLTF(modelPath);
      model.scene.scale.set(scale.x, scale.y, scale.z);
      model.scene.position.set(position.x, position.y, position.z);
      model.scene.rotation.set(rotation.x, rotation.y, rotation.z);
      markerAnchor.group.add(model.scene);
    };

    await loadModelForMarker(0, './assets/models/house/dog.gltf', { x: 1, y: 0, z: 0 }, { x: 3, y: 3, z: 3 }, { x: 0, y: 0, z: 0 });

    await loadModelForMarker(1, './assets/models/other_model.gltf', { x: 2, y: 0, z: 0 }, { x: 2, y: 2, z: 2 }, { x: 0, y: Math.PI / 2, z: 0 });

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }

  const startButton = document.createElement("button");
  startButton.textContent = "Start";
  startButton.addEventListener("click", start);
  document.body.appendChild(startButton);
});
