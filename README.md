# NeoLeo

A modern, animation-ready website—**Webflow-free** and powered by **GSAP** for smooth interactions.

## Tech Stack

- **Vite** – Fast build tool & dev server
- **Three.js** – WebGL lion hero (cursor-reactive particle mesh)
- **GSAP** – Professional-grade animations (ScrollTrigger included)
- **Vanilla JS** – Lightweight, no framework overhead
- **CSS** – Custom styles with CSS variables

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Adding Animations

### Data attributes (no JS needed)

Add these to any element for automatic animations:

| Attribute | Effect |
|-----------|--------|
| `data-animate="fade-up"` | Fades in and slides up on scroll |
| `data-animate="parallax"` | Parallax scroll effect |
| `data-animate="stagger"` | Staggers children with fade-up (add to parent) |

### Custom GSAP animations

Edit `src/animations.js` to add your own:

```javascript
// Example: Custom timeline
gsap.from('.my-element', {
  scrollTrigger: {
    trigger: '.my-element',
    start: 'top 80%',
  },
  duration: 1,
  opacity: 0,
  x: -50,
  ease: 'power3.out',
});
```

### GSAP resources

- [GSAP Docs](https://gsap.com/docs/v3/)
- [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [Ease Visualizer](https://gsap.com/docs/v3/Eases/)

## Project Structure

```
├── src/
│   ├── main.js       # Entry point
│   ├── main.css      # Style imports
│   ├── nav.js        # Mobile menu toggle
│   ├── animations.js # GSAP animations
│   ├── hero-lion.js  # WebGL lion hero (Three.js)
│   ├── hero-lion.css # Hero container styles
│   └── base.css      # Layout utilities
├── css/
│   ├── normalize.css
│   └── neoleo-fcb1ec.webflow.css  # Theme styles
├── public/
│   ├── images/
│   ├── fonts/
│   ├── videos/
│   └── documents/
└── *.html            # Pages
```

## Deployment

The project is configured for **Netlify**—push to your repo and Netlify will build and deploy automatically.
