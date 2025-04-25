// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.main-nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  nav.classList.toggle('active');
});

// Close mobile nav when clicking a link
document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    nav.classList.remove('active');
  });
});

// Scroll to Top Button
const goTopBtn = document.getElementById('goTopBtn');

window.addEventListener('scroll', () => {
  goTopBtn.style.display = window.scrollY > 100 ? 'block' : 'none';
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
