window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelector(".loader-wrapper").classList.add("hidden");
    document.body.classList.add("loaded");
  }, 5000); // Changed delay to 5000ms (5 seconds)
});

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
const container = document.getElementById("pubg-model");
renderer.setSize(150, 150);
container.appendChild(renderer.domElement);
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 2;

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

window.onscroll = function () {
  const btn = document.getElementById("goTopBtn");
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
};

document.getElementById("goTopBtn").addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
// Get the button
const goTopBtn = document.getElementById("goTopBtn");

// Show or hide button on scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    goTopBtn.classList.add("show");
  } else {
    goTopBtn.classList.remove("show");
  }
});

// Scroll to top function
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}