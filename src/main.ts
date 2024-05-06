import * as THREE from 'three';

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

const geometry = new THREE.PlaneGeometry(100, 100, 50, 50);

const material = new THREE.RawShaderMaterial({
  vertexShader: `
    uniform mat4 modelMatrix;
    uniform mat4 viewMatrix;
    uniform mat4 projectionMatrix;

    attribute vec3 position;

    void main() {
      gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    precision mediump float;

    void main() {
      gl_FragColor = vec4(0.4, 1.0, 0.4, 1.0);
    }
  `,
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
