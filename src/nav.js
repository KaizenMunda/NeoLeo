/**
 * Mobile navbar toggle - replaces Webflow's nav behavior
 */
export function initNav() {
  const navbar = document.querySelector('.navbar');
  const menuButton = document.querySelector('.menu-button');

  if (!navbar || !menuButton) return;

  menuButton.addEventListener('click', () => {
    navbar.classList.toggle('nav-open');
    document.body.style.overflow = navbar.classList.contains('nav-open') ? 'hidden' : '';
  });

  // Close menu when clicking a link (for in-page navigation)
  navbar.querySelectorAll('.nav-link, .link-block-navbar').forEach((link) => {
    link.addEventListener('click', () => {
      navbar.classList.remove('nav-open');
      document.body.style.overflow = '';
    });
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navbar.classList.contains('nav-open')) {
      navbar.classList.remove('nav-open');
      document.body.style.overflow = '';
    }
  });

  // Close menu on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 991) {
      navbar.classList.remove('nav-open');
      document.body.style.overflow = '';
    }
  });
}
