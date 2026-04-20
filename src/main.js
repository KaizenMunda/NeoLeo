/**
 * NeoLeo - Main entry point
 * Webflow-free, GSAP-powered animations + React WebGL hero
 */
import './main.css';
import { initNav } from './nav.js';
import { initAnimations } from './animations.js';
import { mountHero } from './hero-mount.jsx';

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initAnimations();

  if (document.getElementById('hero-root')) {
    mountHero();
  }
});
