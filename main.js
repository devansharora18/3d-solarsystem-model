const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const backgroundTexture = new THREE.TextureLoader().load('stars.jpg');
scene.background = backgroundTexture;

const sunGeometry = new THREE.SphereGeometry(10, 32, 32);
const sunTexture = new THREE.TextureLoader().load('sun.png');
const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

const earthGeometry = new THREE.SphereGeometry(2, 32, 32);

const earthDayTexture = new THREE.TextureLoader().load('earth.png');
const earthDayMaterial = new THREE.MeshBasicMaterial({ map: earthDayTexture });

const earthNightTexture = new THREE.TextureLoader().load('earth_night.png');
const earthNightMaterial = new THREE.MeshBasicMaterial({ map: earthNightTexture });


const earth = new THREE.Mesh(earthGeometry, earthDayMaterial);
scene.add(earth);

earth.position.x = 40;

const pathPoints = [];
const radius = 40;
const segments = 100;
for (let i = 0; i <= segments; i++) {
  const theta = (i / segments) * Math.PI * 2;
  const x = radius * Math.cos(theta);
  const z = radius * Math.sin(theta);
  pathPoints.push(new THREE.Vector3(x, 0, z));
}

const pathGeometry = new THREE.BufferGeometry().setFromPoints(pathPoints);
const pathMaterial = new THREE.LineBasicMaterial({ color: "rgb(255, 255, 255)" });;
const path = new THREE.Line(pathGeometry, pathMaterial);
scene.add(path);

const mercuryGeometry = new THREE.SphereGeometry(1, 32, 32);
const mercuryTexture = new THREE.TextureLoader().load('mercury.png');
const mercuryMaterial = new THREE.MeshBasicMaterial({ map: mercuryTexture });
const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);

scene.add(mercury);

mercury.position.x = 18;

const mercuryPathPoints = [];
const mercuryRadius = 18;
const mercurySegments = 100;
for (let i = 0; i <= mercurySegments; i++) {
  const theta = (i / mercurySegments) * Math.PI * 2;
  const x = mercuryRadius * Math.cos(theta);
  const z = mercuryRadius * Math.sin(theta);
  mercuryPathPoints.push(new THREE.Vector3(x, 0, z));
}

const mercuryPathGeometry = new THREE.BufferGeometry().setFromPoints(mercuryPathPoints);
const mercuryPathMaterial = new THREE.LineBasicMaterial({ color: "rgb(255, 255, 255)" });;
const mercuryPath = new THREE.Line(mercuryPathGeometry, mercuryPathMaterial);
scene.add(mercuryPath);


const venusGeometry = new THREE.SphereGeometry(1.8, 32, 32);
const venusTexture = new THREE.TextureLoader().load('venus.png');
const venusMaterial = new THREE.MeshBasicMaterial({ map: venusTexture });
const venus = new THREE.Mesh(venusGeometry, venusMaterial);

scene.add(venus);

venus.position.x = 30;

const venusPathPoints = [];
const venusRadius = 30;
const venusSegments = 100;
for (let i = 0; i <= venusSegments; i++) {
  const theta = (i / venusSegments) * Math.PI * 2;
  const x = venusRadius * Math.cos(theta);
  const z = venusRadius * Math.sin(theta);
  venusPathPoints.push(new THREE.Vector3(x, 0, z));
}

const venusPathGeometry = new THREE.BufferGeometry().setFromPoints(venusPathPoints);
const venusPathMaterial = new THREE.LineBasicMaterial({ color: "rgb(255, 255, 255)" });;
const venusPath = new THREE.Line(venusPathGeometry, venusPathMaterial);
scene.add(venusPath);

const marsGeometry = new THREE.SphereGeometry(1.8, 32, 32);
const marsTexture = new THREE.TextureLoader().load('mars.png');
const marsMaterial = new THREE.MeshBasicMaterial({ map: marsTexture });
const mars = new THREE.Mesh(marsGeometry, marsMaterial);

scene.add(mars);

mars.position.x = 50;

const marsPathPoints = [];
const marsRadius = 50;
const marsSegments = 100;
for (let i = 0; i <= marsSegments; i++) {
  const theta = (i / marsSegments) * Math.PI * 2;
  const x = marsRadius * Math.cos(theta);
  const z = marsRadius * Math.sin(theta);
  marsPathPoints.push(new THREE.Vector3(x, 0, z));
}

const marsPathGeometry = new THREE.BufferGeometry().setFromPoints(marsPathPoints);
const marsPathMaterial = new THREE.LineBasicMaterial({ color: "rgb(255, 255, 255)" });;
const marsPath = new THREE.Line(marsPathGeometry, marsPathMaterial);
scene.add(marsPath);

const jupiterGeometry = new THREE.SphereGeometry(5, 32, 32);
const jupiterTexture = new THREE.TextureLoader().load('jupiter.png');
const jupiterMaterial = new THREE.MeshBasicMaterial({ map: jupiterTexture });
const jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);

scene.add(jupiter);

jupiter.position.x = 100;

const jupiterPathPoints = [];
const jupiterRadius = 100;
const jupiterSegments = 100;
for (let i = 0; i <= jupiterSegments; i++) {
	const theta = (i / jupiterSegments) * Math.PI * 2;
  const x = jupiterRadius * Math.cos(theta);
  const z = jupiterRadius * Math.sin(theta);
  jupiterPathPoints.push(new THREE.Vector3(x, 0, z));
}
const jupiterPathGeometry = new THREE.BufferGeometry().setFromPoints(jupiterPathPoints);
const jupiterPathMaterial = new THREE.LineBasicMaterial({ color: "rgb(255, 255, 255)" });
const jupiterPath = new THREE.Line(jupiterPathGeometry, jupiterPathMaterial);

scene.add(jupiterPath);

const asteroidGeometry = new THREE.SphereGeometry(0.2, 16, 16);
const asteroidMaterial = new THREE.MeshBasicMaterial({ color: 0x888888 });

const numAsteroids = 1000;
const asteroidBeltRadius = 70;
const asteroids = [];

const minRadius = 70;
const maxRadius = 80;
const beltRadius = [];

for (let i = 0; i < numAsteroids; i++) {
  const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
  asteroids.push(asteroid);

  const angle = Math.random() * Math.PI * 5;
  const radius = Math.random() * (maxRadius - minRadius) + minRadius; // Random radius between minRadius and maxRadius
  beltRadius.push(radius);
	const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * asteroidBeltRadius;
  const y = Math.random() * 2 - 1;

  asteroid.position.set(x, y, z);

  scene.add(asteroid);
}


const calculateDayNightRatio = () => {
	const now = new Date();

	const sunrise = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 0);
	const sunset = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 0);

	const totalDuration = sunset - sunrise;
	const currentDuration = now - sunrise;

	const dayNightRatio = Math.max(0, Math.min(1, currentDuration / totalDuration))
	//console.log(dayNightRatio);
	return dayNightRatio;
}

const dayNightThreshold = 1;

const animate = () => {
	requestAnimationFrame(animate);

	const dayNightRatio = calculateDayNightRatio();
	
	if (dayNightRatio == dayNightThreshold) {
		earth.material = earthNightMaterial;
	} else {
		earth.material = earthDayMaterial;
	}

	sun.rotation.y += 0.005;
	
	earth.rotation.y += 0.01;
	earth.position.x = 40 * Math.cos(Date.now() * 0.0004);
	earth.position.z = 40 * Math.sin(Date.now() * 0.0004);

	venus.rotation.y += 0.01;
	venus.position.x = 30 * Math.cos(Date.now() * 0.0006);
	venus.position.z = 30 * Math.sin(Date.now() * 0.0006);

	mercury.rotation.y += 0.004;
	mercury.position.x = 18 * Math.cos(Date.now() * 0.002);
	mercury.position.z = 18 * Math.sin(Date.now() * 0.002);

	mars.rotation.y += 0.004;
	mars.position.x = 50 * Math.cos(Date.now() * 0.0008);
	mars.position.z = 50 * Math.sin(Date.now() * 0.0008);

	jupiter.rotation.y += 0.002;
	jupiter.position.x = 100 * Math.cos(Date.now() * 0.00005);
	jupiter.position.z = 100 * Math.sin(Date.now() * 0.00005);

  for (let i = 0; i < asteroids.length; i++) {
    const asteroid = asteroids[i];

    asteroid.rotation.y += 0.01;

		const radius = Math.random() * (maxRadius - minRadius) + minRadius;

    const angle = (i / asteroids.length) * Math.PI * 2 + (Date.now() * 0.0000001 * i * beltRadius[i]/100);

    const x = Math.cos(angle) * beltRadius[i];
    const z = Math.sin(angle) * beltRadius[i];
		
    asteroid.position.set(x, asteroid.position.y, z);
  }

	
	renderer.render(scene, camera);
}
animate();

camera.position.set(0, 30, 80);
camera.rotation.set(-Math.PI / 6, 0, 0);
camera.lookAt(scene.position);

let isDragging = false;
let previousMousePosition = {
  x: 0,
  y: 0
};

renderer.domElement.addEventListener('mousedown', onMouseDown);
renderer.domElement.addEventListener('mousemove', onMouseMove);
renderer.domElement.addEventListener('mouseup', onMouseUp);
renderer.domElement.addEventListener('wheel', onMouseWheel);

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
  camera.lookAt(scene.position);

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
	camera.lookAt(scene.position);
}

function toRadians(angle) {
  return angle * (Math.PI / 180);
}