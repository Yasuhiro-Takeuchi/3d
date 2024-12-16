document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './assets/targets/multiple_targets.mind' // 複数マーカーを含むファイル
    });
    const {renderer, scene, camera} = mindarThree;

    // 照明を追加
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    // 動物モデルをロード
    const dog = await loadGLTF('./assets/models/uploads_files_3481608_dog_fur4.glb');
    const zou = await loadGLTF('./assets/models/zou.gltf');
    const syachi = await loadGLTF('./assets/models/syachi.gltf');
    const nezumi = await loadGLTF('./assets/models/nezumi.gltf');

    // スケールや位置を設定
    dog.scene.scale.set(2, 2, 2);
    dog.scene.position.set(0, 0, 0);
    dog.scene.rotation.set(0, 0, 0);

    zou.scene.scale.set(2, 2, 2);
    zou.scene.position.set(0, 0, 0);
    zou.scene.rotation.set(0, 0, 0);

    syachi.scene.scale.set(2, 2, 2);
    syachi.scene.position.set(0, 0, 0);
    syachi.scene.rotation.set(0, 0, 0);

    nezumi.scene.scale.set(2, 2, 2);
    nezumi.scene.position.set(0, 0, 0);
    nezumi.scene.rotation.set(0, 0, 0);

    // アンカーを作成
    const dogAnchor = mindarThree.addAnchor(0); // 1つ目のターゲット
    const zouAnchor = mindarThree.addAnchor(1); // 2つ目のターゲット
    const syachiAnchor = mindarThree.addAnchor(2); // 3つ目のターゲット
    const nezumiAnchor = mindarThree.addAnchor(3); // 4つ目のターゲット

    // 各アンカーにモデルを追加
    dogAnchor.group.add(dog.scene);
    zouAnchor.group.add(zou.scene);
    syachiAnchor.group.add(syachi.scene);
    nezumiAnchor.group.add(nezumi.scene);
    // MindARを開始
    await mindarThree.start();

    // アニメーションループを開始
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  };

  // 開始ボタンを追加
  const startButton = document.createElement("button");
  startButton.textContent = "Start";
  startButton.addEventListener("click", start);
  document.body.appendChild(startButton);
});
