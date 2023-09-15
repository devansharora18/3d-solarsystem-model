const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const backgroundTexture = new THREE.TextureLoader().load('black.jpeg');
scene.background = backgroundTexture;

const sunGeometry = new THREE.SphereGeometry(10, 32, 32);
const sunTexture = new THREE.TextureLoader().load('sun.jpeg');
const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);
sun.name = 'sun';

const planets = []

const earthGeometry = new THREE.SphereGeometry(2, 32, 32);

const earthDayTexture = new THREE.TextureLoader().load('earth.jpeg');
const earthDayMaterial = new THREE.MeshBasicMaterial({ map: earthDayTexture });

const earth = new THREE.Mesh(earthGeometry, earthDayMaterial);
scene.add(earth);
planets.push(earth);
earth.name = 'earth';

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
// scene.add(path);

const mercuryGeometry = new THREE.SphereGeometry(1, 32, 32);
const mercuryTexture = new THREE.TextureLoader().load('mercury.jpeg');
const mercuryMaterial = new THREE.MeshBasicMaterial({ map: mercuryTexture });
const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);

scene.add(mercury);
planets.push(mercury);
mercury.name = 'mercury';

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
// scene.add(mercuryPath);


const venusGeometry = new THREE.SphereGeometry(1.8, 32, 32);
const venusTexture = new THREE.TextureLoader().load('venus.jpeg');
const venusMaterial = new THREE.MeshBasicMaterial({ map: venusTexture });
const venus = new THREE.Mesh(venusGeometry, venusMaterial);

scene.add(venus);
planets.push(venus);
venus.name = 'venus';

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
// scene.add(venusPath);

const marsGeometry = new THREE.SphereGeometry(1.8, 32, 32);
const marsTexture = new THREE.TextureLoader().load('mars.jpeg');
const marsMaterial = new THREE.MeshBasicMaterial({ map: marsTexture });
const mars = new THREE.Mesh(marsGeometry, marsMaterial);

scene.add(mars);
planets.push(mars);
mars.name = 'mars';

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
// scene.add(marsPath);

const jupiterGeometry = new THREE.SphereGeometry(5, 32, 32);
const jupiterTexture = new THREE.TextureLoader().load('jupiter.jpeg');
const jupiterMaterial = new THREE.MeshBasicMaterial({ map: jupiterTexture });
const jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);

scene.add(jupiter);

planets.push(jupiter);
jupiter.name = 'jupiter';

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

// scene.add(jupiterPath);

const saturnGeometry = new THREE.SphereGeometry(5, 32, 32);
const saturnTexture = new THREE.TextureLoader().load('saturn.jpeg');
const saturnMaterial = new THREE.MeshBasicMaterial({ map: saturnTexture })
const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);

scene.add(saturn);
planets.push(saturn);
saturn.name = 'saturn';

saturn.position.x = 150;

const saturnPathPoints = [];
const saturnRadius = 150;
const saturnSegments = 100;
for (let i = 0; i <= saturnSegments; i++) {
	const theta = (i / saturnSegments) * Math.PI * 2;
  const x = saturnRadius * Math.cos(theta);
  const z = saturnRadius * Math.sin(theta);
  saturnPathPoints.push(new THREE.Vector3(x, 0, z));
}
const saturnPathGeometry = new THREE.BufferGeometry().setFromPoints(saturnPathPoints);
const saturnPathMaterial = new THREE.LineBasicMaterial({ color: "rgb(255, 255, 255)" });
const saturnPath = new THREE.Line(saturnPathGeometry, saturnPathMaterial);
// scene.add(saturnPath);

const saturnRingsGeometry = new THREE.RingGeometry(6, 10, 64);
const saturnRingsTexture = new THREE.TextureLoader().load('saturn-ring.jpeg');
const saturnRingsMaterial = new THREE.MeshBasicMaterial({ map: saturnRingsTexture, side: THREE.DoubleSide, transparent: true });
const saturnRings = new THREE.Mesh(saturnRingsGeometry, saturnRingsMaterial);
saturn.add(saturnRings);

saturnRings.rotation.x = Math.PI / 2;

const uranusGeometry = new THREE.SphereGeometry(3.5, 32, 32);
const uranusTexture = new THREE.TextureLoader().load('uranus.jpeg');
const uranusMaterial = new THREE.MeshBasicMaterial({ map: uranusTexture })

const uranus = new THREE.Mesh(uranusGeometry, uranusMaterial);
scene.add(uranus);

planets.push(uranus);
uranus.name = 'uranus';

uranus.position.x = 180;

const uranusPathPoints = [];
const uranusRadius = 180;
const uranusSegments = 100;
for (let i = 0; i <= uranusSegments; i++) {
	const theta = (i / uranusSegments) * Math.PI * 2;
  const x = uranusRadius * Math.cos(theta);
  const z = uranusRadius * Math.sin(theta);
  uranusPathPoints.push(new THREE.Vector3(x, 0, z));
}
const uranusPathGeometry = new THREE.BufferGeometry().setFromPoints(uranusPathPoints);
const uranusPathMaterial = new THREE.LineBasicMaterial({ color: "rgb(255, 255, 255)" })
const uranusPath = new THREE.Line(uranusPathGeometry, uranusPathMaterial);
// scene.add(uranusPath);

const neptuneGeometry = new THREE.SphereGeometry(3.5, 32, 32);
const neptuneTexture = new THREE.TextureLoader().load('neptune.jpeg');
const neptuneMaterial = new THREE.MeshBasicMaterial({ map: neptuneTexture });


const neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial);
scene.add(neptune);

planets.push(neptune);
neptune.name = 'neptune';

neptune.position.x = 200;

const neptunePathPoints = [];
const neptuneRadius = 200;
const neptuneSegments = 100;
for (let i = 0; i <= neptuneSegments; i++) {
	const theta = (i / neptuneSegments) * Math.PI * 2;
  const x = neptuneRadius * Math.cos(theta);
  const z = neptuneRadius * Math.sin(theta);
  neptunePathPoints.push(new THREE.Vector3(x, 0, z));
}
const neptunePathGeometry = new THREE.BufferGeometry().setFromPoints(neptunePathPoints);
const neptunePathMaterial = new THREE.LineBasicMaterial({ color: "rgb(255, 255, 255)" });
const neptunePath = new THREE.Line(neptunePathGeometry, neptunePathMaterial);
// scene.add(neptunePath);

const asteroidGeometry = new THREE.SphereGeometry(0.2, 10, 10);
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

let focused_object = null;

const animate = () => {
	requestAnimationFrame(animate);

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

	jupiter.rotation.y += 0.07;
	jupiter.position.x = 100 * Math.cos(Date.now() * 0.00005);
	jupiter.position.z = 100 * Math.sin(Date.now() * 0.00005);

	saturn.rotation.y += 0.07;
	saturn.position.x = 150 * Math.cos(Date.now() * 0.00002);
	saturn.position.z = 150 * Math.sin(Date.now() * 0.00002);

	uranus.rotation.y += 0.07;
	uranus.position.x = 180 * Math.cos(Date.now() * 0.00001);
	uranus.position.z = 180 * Math.sin(Date.now() * 0.00001);

	neptune.rotation.y += 0.07;
	neptune.position.x = 200 * Math.cos(Date.now() * 0.000005);
	neptune.position.z = 200 * Math.sin(Date.now() * 0.000005);

	//saturnRings.rotation.x += 0.07;

  for (let i = 0; i < asteroids.length; i++) {
    const asteroid = asteroids[i];

    asteroid.rotation.y += 0.01;

		const radius = Math.random() * (maxRadius - minRadius) + minRadius;

    const angle = (i / asteroids.length) * Math.PI * 2 + (Date.now() * 0.0000001 * i * beltRadius[i]/100);

    const x = Math.cos(angle) * beltRadius[i];
    const z = Math.sin(angle) * beltRadius[i];
		
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

renderer.domElement.addEventListener('click', onMouseClick, false);

function onMouseClick(event) {
	console.log('mouse click');
  // Calculate mouse position in normalized device coordinates
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Cast a ray from the mouse position
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  // Check for intersections with the objects in the scene
  const intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
		console.log('intersected');
    // An object was clicked
    const clickedObject = intersects[0].object;
		console.log(clickedObject.name);

    // Check the identifier of the clicked object and execute the corresponding function
    switch (clickedObject.name) {
      case 'sun':
				console.log('sun')
        focused_object = sun;
        break;
      case 'earth':
				console.log('earth')
        focused_object = earth;
				break;
			case 'venus':
				console.log('venus')
        focused_object = venus;
				break;
			case 'mercury':
				console.log('mercury')
        focused_object = mercury;
				break;
			case 'mars':
				console.log('mars')
        focused_object = mars;
				break;
			case 'jupiter':
				console.log('jupiter')
        focused_object = jupiter;
				break;
			case 'saturn':
				console.log('saturn')
        focused_object = saturn;
				break;
			case 'uranus':
				console.log('uranus')
        focused_object = uranus;
				break;
			case 'neptune':
				console.log('neptune')
        focused_object = neptune;
				break;
    }
  }
}


camera.position.set(0, 30, 100);
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
  //camera.lookAt(scene.position);

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
	//camera.lookAt(scene.position);
}

function toRadians(angle) {
  return angle * (Math.PI / 180);
}

function reset(event) {
	camera.position.set(0, 30, 100);
	camera.rotation.set(-Math.PI / 6, 0, 0);
	camera.lookAt(scene.position);
	focused_object = null;
	console.log('reset');

}

let button = document.getElementById('reset-btn');
button.addEventListener('click', reset);

let mercury_btn = document.getElementById('mercury');
mercury_btn.addEventListener('click', function(event) {
	focused_object = mercury;
});

let venus_btn = document.getElementById('venus');
venus_btn.addEventListener('click', function(event) {
	focused_object = venus;
});

let earth_btn = document.getElementById('earth');
earth_btn.addEventListener('click', function(event) {
	focused_object = earth;
});

let mars_btn = document.getElementById('mars');
mars_btn.addEventListener('click', function(event) {
	focused_object = mars;
});

let jupiter_btn = document.getElementById('jupiter');
jupiter_btn.addEventListener('click', function(event) {
	focused_object = jupiter;
});

let saturn_btn = document.getElementById('saturn');
saturn_btn.addEventListener('click', function(event) {
	focused_object = saturn;
});

let uranus_btn = document.getElementById('uranus');
uranus_btn.addEventListener('click', function(event) {
	focused_object = uranus;
});

let neptune_btn = document.getElementById('neptune');
neptune_btn.addEventListener('click', function(event) {
	focused_object = neptune;
});