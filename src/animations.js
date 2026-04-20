/**
 * GSAP animations - Add your cool animations and interactions here!
 * Docs: https://gsap.com/docs/v3/
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  // Fade-in hero content on load
  gsap.from('.hero-header', {
    duration: 1,
    opacity: 0,
    y: 30,
    ease: 'power3.out',
    delay: 0.3,
  });

  gsap.from('.double-button-component', {
    duration: 1,
    opacity: 0,
    y: 20,
    ease: 'power3.out',
    delay: 0.6,
  });

  // Scroll-triggered fade-ins - elements with data-animate="fade-up"
  gsap.utils.toArray('[data-animate="fade-up"]').forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      duration: 0.8,
      opacity: 0,
      y: 50,
      ease: 'power3.out',
    });
  });

  // Parallax effect for hero headings (optional - add data-animate="parallax" to use)
  gsap.utils.toArray('[data-animate="parallax"]').forEach((el) => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
      yPercent: 30,
      ease: 'none',
    });
  });

  // Stagger children animation - add data-animate="stagger" to parent
  gsap.utils.toArray('[data-animate="stagger"]').forEach((parent) => {
    const children = parent.children;
    gsap.from(children, {
      scrollTrigger: {
        trigger: parent,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      duration: 0.6,
      opacity: 0,
      y: 30,
      stagger: 0.1,
      ease: 'power3.out',
    });
  });
}
