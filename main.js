import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // Allows for orbit controls for user interaction
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB); // Light blue sky color

// Create the walls
const wallGeometry = new THREE.BoxGeometry(12, 10, 10); // Define wall geometry first
const textureLoader2 = new THREE.TextureLoader();
const wallTexture = textureLoader2.load('textures/muur.png'); // Ensure it's a supported format
const wallMaterial = new THREE.MeshStandardMaterial({ map: wallTexture });
const walls = new THREE.Mesh(wallGeometry, wallMaterial);
walls.position.y = 5; // Lift walls above the ground
scene.add(walls);

// Roof
const roofGeometry = new THREE.ConeGeometry(9, 4, 4);
const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 }); // Black color for the roof
const roof = new THREE.Mesh(roofGeometry, roofMaterial);
roof.rotation.y = Math.PI / 4;
roof.position.y = 12;
scene.add(roof);

// Door
const doorGeometry = new THREE.BoxGeometry(2, 4, 0.2);
const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x654321 }); // Dark brown for the door
const door = new THREE.Mesh(doorGeometry, doorMaterial);
door.position.set(0, 2, 5.1);
scene.add(door);

// Windows
const windowGeometry = new THREE.PlaneGeometry(2, 2);
const windowMaterial = new THREE.MeshBasicMaterial({ color: 0x87CEFA, transparent: true }); // Light Blue with transparency

const window1 = new THREE.Mesh(windowGeometry, windowMaterial);
window1.position.set(-4, 7, 5.1);
scene.add(window1);

const window2 = new THREE.Mesh(windowGeometry, windowMaterial);
window2.position.set(4, 7, 5.1);
scene.add(window2);

// Ground
const groundGeometry = new THREE.PlaneGeometry(50, 50);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 }); // Green for grass
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -0.1;
scene.add(ground);

// Create a white card with your name or photo
const cardGeometry = new THREE.PlaneGeometry(2, 2); // Adjust the size as needed
const cardMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff }); // White color for the card
const card = new THREE.Mesh(cardGeometry, cardMaterial);
card.position.set(0, 6, 5.1); // Position the card in front of the house
scene.add(card);

// Foto
const textureLoader = new THREE.TextureLoader();
const photoTexture = textureLoader.load('/images/yann_pick.jpg'); 
card.material.map = photoTexture; 
card.material.needsUpdate = true;


//Clouds
const positions = [
  { x: 10, y: 13, z: 0 },
  { x: -10, y: 15, z: 5 },
  { x: 5, y: 12, z: -10 },
  { x: -5, y: 14, z: -10 },
];

const loader = new GLTFLoader();
positions.forEach((pos) => {
  loader.load('/models/scene.gltf', (gltf) => {
      gltf.scene.position.set(pos.x, pos.y, pos.z); 
      gltf.scene.scale.set(0.01, 0.01, 0.01);
      scene.add(gltf.scene);
  }, undefined, (error) => {
      console.error('Error loading model:', error);
  });
});

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// Camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 10, 50);
scene.add(camera);

// Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;


// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();