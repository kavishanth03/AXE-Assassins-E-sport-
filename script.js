// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.main-nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  nav.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    nav.classList.remove('active');
  });
});

// Back to Top Button
const goTopBtn = document.getElementById('goTopBtn');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    goTopBtn.style.display = 'flex';
  } else {
    goTopBtn.style.display = 'none';
  }
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}