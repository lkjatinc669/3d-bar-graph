import '../css/style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

class BoxScene {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.setup();
    this.setCameraPosition();

    window.addEventListener('resize', () => this.handleResize());
  }

  setup() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
  }

  createBox(dimensions, position, color) {
    const texture = new THREE.TextureLoader().load('../textures/texture-aqua.png');
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(dimensions[0], dimensions[1], dimensions[2]),
      new THREE.MeshBasicMaterial( { color: 0xff6347  } )
    )
    box.position.set(position[0], position[1], position[2]);
    this.scene.add(box)
  }

  setCameraPosition() {
    this.camera.position.z = 40;
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  handleResize() {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    this.camera.aspect = newWidth / newHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(newWidth, newHeight);
  }

  orbitalControls(){
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableRotate = true;
    this.controls.enablePan = false; // Disable pan
    this.controls.enableZoom = false; // Disable zoom
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.25;
  }
}

// Create an instance of the BoxScene
const boxScene = new BoxScene();
boxScene.createBox([5, 10, 5], [0, 0, 10], "");
boxScene.createBox([5, 15, 5], [10, 7.5, 0], "");
boxScene.orbitalControls()
boxScene.animate();