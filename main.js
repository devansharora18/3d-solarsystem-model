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
	
	renderer.render(scene, camera);
}
animate();

camera.position.set(0, 30, 60);
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
	if (camera.position.z - deltaZoom < 0)
  camera.position.z = 0;
	else if (camera.position.z - deltaZoom > 200)
  camera.position.z = 200;
	else
	camera.position.z -= deltaZoom;
	camera.lookAt(scene.position);
}

function toRadians(angle) {
  return angle * (Math.PI / 180);
}