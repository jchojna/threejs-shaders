import * as THREE from 'three';

import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <canvas id="canvas"></canvas>
`;

const aspectRatio = 1;
const canvas = document.querySelector<HTMLCanvasElement>('#canvas');
if (!canvas) throw new Error('Canvas not found');

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(55, aspectRatio, 0.1, 1000);
camera.position.z = 100;
camera.position.y = 100;

const geometry = new THREE.RawShaderMaterial({});

// scene.add(camera, geometry);

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
  canvas: canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.render(scene, camera);
