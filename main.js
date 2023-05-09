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

// Daytime texture
const earthDayTexture = new THREE.TextureLoader().load('earth.png');
const earthDayMaterial = new THREE.MeshBasicMaterial({ map: earthDayTexture });

// Nighttime texture
const earthNightTexture = new THREE.TextureLoader().load('earth_night.png');
const earthNightMaterial = new THREE.MeshBasicMaterial({ map: earthNightTexture });


const earth = new THREE.Mesh(earthGeometry, earthDayMaterial);
scene.add(earth);

earth.position.x = 30;

const pathPoints = [];
const radius = 30;
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

const calculateDayNightRatio = () => {
	const now = new Date();

	const sunrise = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 0); // Example: 6:00 AM
	const sunset = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 0); // Example: 6:00 PM

	const totalDuration = sunset - sunrise;
	const currentDuration = now - sunrise;

	const dayNightRatio = Math.max(0, Math.min(1, currentDuration / totalDuration))
	//console.log(dayNightRatio);
	return dayNightRatio;
}

const dayNightThreshold = 1;

const animate = () => {
	requestAnimationFrame(animate);

	const dayNightRatio = calculateDayNightRatio(); // Calculate day/night ratio based on time or other factors
	
	if (dayNightRatio == dayNightThreshold) {
		earth.material = earthNightMaterial; // Set daytime material
	} else {
		earth.material = earthDayMaterial; // Set nighttime material
	}

	sun.rotation.y += 0.005;
	earth.rotation.y += 0.01;
	earth.position.x = 30 * Math.cos(Date.now() * 0.0004);
	earth.position.z = 30 * Math.sin(Date.now() * 0.0004);
	renderer.render(scene, camera);
}
animate();

camera.position.set(0, 30, 50);
camera.rotation.set(-Math.PI / 6, 0, 0);

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
  camera.position.z -= deltaZoom;
	camera.lookAt(scene.position);
}

function toRadians(angle) {
  return angle * (Math.PI / 180);
}
