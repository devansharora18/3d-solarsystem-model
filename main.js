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
const earthTexture = new THREE.TextureLoader().load('earth.png');
const earthMaterial = new THREE.MeshBasicMaterial({ map: earthTexture });
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earth);

earth.position.x = 30;

const animate = () => {
	requestAnimationFrame(animate);
	sun.rotation.y += 0.005;
	earth.rotation.y += 0.01;
	earth.position.x = 30 * Math.cos(Date.now() * 0.0004);
	earth.position.z = 30 * Math.sin(Date.now() * 0.0004);
	renderer.render(scene, camera);
}
animate();

camera.position.z = 50;