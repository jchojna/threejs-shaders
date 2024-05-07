import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// @ts-expect-error - glsl import
import waveFragmentShader from './shaders/wave/fragment.glsl';
// @ts-expect-error - glsl import
import waveVertexShader from './shaders/wave/vertex.glsl';

import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <canvas id="canvas"></canvas>
`;

const aspectRatio = window.innerWidth / window.innerHeight;
const canvas = document.querySelector<HTMLCanvasElement>('#canvas');
if (!canvas) throw new Error('Canvas not found');

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(55, aspectRatio, 0.1, 1000);
camera.position.z = 100;
camera.position.y = 100;
camera.position.x = 100;
camera.lookAt(0, 0, 0);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const geometry = new THREE.PlaneGeometry(100, 100, 50, 50);

const material = new THREE.RawShaderMaterial({
  vertexShader: waveVertexShader,
  fragmentShader: waveFragmentShader,
  wireframe: true,
});

const mesh = new THREE.Mesh(geometry, material);

scene.add(camera, mesh);

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
  canvas: canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.render(scene, camera);

const tick = (): number => {
  renderer.render(scene, camera);
  controls.update();
  return window.requestAnimationFrame(() => tick());
};
tick();
