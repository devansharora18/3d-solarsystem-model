import * as THREE from 'three';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Background
const backgroundTexture = new THREE.TextureLoader().load('black.jpeg');
scene.background = backgroundTexture;

// Sun
const sunGeometry = new THREE.SphereGeometry(10, 32, 32);
const sunTexture = new THREE.TextureLoader().load('sun.jpeg');
const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);
sun.name = 'sun';

// Planets data
const planetsData = [
  { name: 'mercury', radius: 1, distance: 18, speed: 0.002, texture: 'mercury.jpeg' },
  { name: 'venus', radius: 1.8, distance: 30, speed: 0.0006, texture: 'venus.jpeg' },
  { name: 'earth', radius: 2, distance: 40, speed: 0.0004, texture: 'earth.jpeg' },
  { name: 'mars', radius: 1.8, distance: 50, speed: 0.0008, texture: 'mars.jpeg' },
  { name: 'jupiter', radius: 5, distance: 100, speed: 0.00005, texture: 'jupiter.jpeg' },
  { name: 'saturn', radius: 5, distance: 150, speed: 0.00002, texture: 'saturn.jpeg' },
  { name: 'uranus', radius: 3.5, distance: 180, speed: 0.00001, texture: 'uranus.jpeg' },
  { name: 'neptune', radius: 3.5, distance: 200, speed: 0.000005, texture: 'neptune.jpeg' },
];

// Create planets and paths
const planets = [];
for (const planetData of planetsData) {
  const geometry = new THREE.SphereGeometry(planetData.radius, 32, 32);
  const texture = new THREE.TextureLoader().load(planetData.texture);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const planet = new THREE.Mesh(geometry, material);
  scene.add(planet);
  planet.name = planetData.name;
  planets.push(planet);

  const pathPoints = [];
  const segments = 100;
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    const x = planetData.distance * Math.cos(theta);
    const z = planetData.distance * Math.sin(theta);
    pathPoints.push(new THREE.Vector3(x, 0, z));
  }
  const pathGeometry = new THREE.BufferGeometry().setFromPoints(pathPoints);
  const pathMaterial = new THREE.LineBasicMaterial({ color: "rgb(255, 255, 255)" });
  const path = new THREE.Line(pathGeometry, pathMaterial);
  scene.add(path);
}

// Asteroid belt
const asteroidGeometry = new THREE.SphereGeometry(0.2, 10, 10);
const asteroidMaterial = new THREE.MeshBasicMaterial({ color: 0x888888 });
const numAsteroids = 1000;
const asteroidBeltRadius = 70;
const minRadius = 70;
const maxRadius = 80;
const asteroids = [];
const beltRadius = [];
for (let i = 0; i < numAsteroids; i++) {
  const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
  asteroids.push(asteroid);
  scene.add(asteroid);

  const angle = Math.random() * Math.PI * 5;
  const radius = Math.random() * (maxRadius - minRadius) + minRadius;
  beltRadius.push(radius);
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * asteroidBeltRadius;
  const y = Math.random() * 2 - 1;
  asteroid.position.set(x, y, z);
}

// Saturn rings
const saturnRingsGeometry = new THREE.RingGeometry(6, 10, 64);
const saturnRingsTexture = new THREE.TextureLoader().load('saturn-ring.jpeg');
const saturnRingsMaterial = new THREE.MeshBasicMaterial({ map: saturnRingsTexture, side: THREE.DoubleSide, transparent: true });
const saturnRings = new THREE.Mesh(saturnRingsGeometry, saturnRingsMaterial);
scene.getObjectByName('saturn').add(saturnRings);
saturnRings.rotation.x = Math.PI / 2;

// Animation
let focused_object = null;
function animate() {
  requestAnimationFrame(animate);

  sun.rotation.y += 0.005;

  for (const planet of planets) {
    planet.rotation.y += 0.01;
    const planetData = planetsData.find(data => data.name === planet.name);
    planet.position.x = planetData.distance * Math.cos(Date.now() * planetData.speed);
    planet.position.z = planetData.distance * Math.sin(Date.now() * planetData.speed);
  }

  for (let i = 0; i < asteroids.length; i++) {
    const asteroid = asteroids[i];
    asteroid.rotation.y += 0.01;

    const radius = beltRadius[i];
    const angle = (i / asteroids.length) * Math.PI * 2 + (Date.now() * 0.0000001 * i * radius / 100);
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    asteroid.position.set(x, asteroid.position.y, z);
  }

  if (focused_object != null) {
    camera.lookAt(focused_object.position);
    camera.position.set(focused_object.position.x, focused_object.position.y + 10, focused_object.position.z - 30);
  } else {
    camera.lookAt(scene.position);
  }

  renderer.render(scene, camera);
}
animate();

// Camera setup
camera.position.set(0, 30, 100);
camera.rotation.set(-Math.PI / 6, 0, 0);
camera.lookAt(scene.position);

// Event listeners
let isDragging = false;
let previousMousePosition = {
  x: 0,
  y: 0
};

renderer.domElement.addEventListener('click', onMouseClick);
renderer.domElement.addEventListener('mousedown', onMouseDown);
renderer.domElement.addEventListener('mousemove', onMouseMove);
renderer.domElement.addEventListener('mouseup', onMouseUp);
renderer.domElement.addEventListener('wheel', onMouseWheel);

function onMouseClick(event) {
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
    const clickedObject = intersects[0].object;
    focused_object = clickedObject;
  }
}

function onMouseDown(event) {
  isDragging = true;
  previousMousePosition = {
    x: event.clientX,
    y: event.clientY
  };
}

function onMouseMove(event) {
  if (!isDragging) return;

  const deltaMove = {
    x: event.clientX - previousMousePosition.x,
    y: event.clientY - previousMousePosition.y
  };

  const rotationSpeed = 0.1;
  const rotation = new THREE.Euler(
    toRadians(deltaMove.y * -rotationSpeed),
    toRadians(deltaMove.x * -rotationSpeed),
    0,
    'XYZ'
  );
  const quaternion = new THREE.Quaternion().setFromEuler(rotation);

  camera.position.applyQuaternion(quaternion);

  previousMousePosition = {
    x: event.clientX,
    y: event.clientY
  };
}

function onMouseUp() {
  isDragging = false;
}

function onMouseWheel(event) {
  const zoomSpeed = 0.1;
  const deltaZoom = event.deltaY * zoomSpeed;
  if (camera.position.z - deltaZoom < 0)
    camera.position.z = 0;
  else if (camera.position.z - deltaZoom > 300)
    camera.position.z = 300;
  else
    camera.position.z -= deltaZoom;
}

function toRadians(angle) {
  return angle * (Math.PI / 180);
}

function reset(event) {
  camera.position.set(0, 30, 100);
  camera.rotation.set(-Math.PI / 6, 0, 0);
  camera.lookAt(scene.position);
  focused_object = null;
}

let button = document.getElementById('reset-btn');
button.addEventListener('click', reset);

// Planet buttons
for (const planetData of planetsData) {
  const button = document.getElementById(planetData.name);
  button.addEventListener('click', function(event) {
    focused_object = scene.getObjectByName(planetData.name);
  });
}

// Responsive design
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.render(scene, camera);
}
