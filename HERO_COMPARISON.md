# WebGL Lion Hero: Implementation Comparison

Two implementations are available. Switch by changing the import in `src/main.js`:

- **Original (structural)**: `import { initHeroLion } from './hero-lion.js'`
- **Gemini (dense cloud)**: `import { initHeroLion } from './hero-lion-gemini.js'`

---

## Original Implementation (`hero-lion.js`)

### Approach
- **Structural / wireframe** – Ellipses and line segments define mane, face, ears, eyes, nose, jaw, whiskers
- **~500 particles** – Sparse, intentional placement
- **Outline lines** – Silhouette lines (outer mane, inner brow, mane arc) for clear shape

### Geometry
- Ellipses for mane (7 layers), face, ears, eyes, nose
- Line segments for jaw, whiskers, mouth
- All in 2D (z ≈ 0) with slight random offset

### Shader
- **Mouse: attract** – Particles move toward cursor
- **Pulse** – Per-point sine wave for glow
- **Single color** – Blue-white gradient in fragment shader

### Visual
- Soft blue-white glow (#7cc5ff → #ffffff)
- Clear lion silhouette from outlines + particles
- Background: sparse static point field

### Pros
- Readable lion shape (mane, face, ears)
- Lightweight (~500 particles)
- Outline lines add clarity

### Cons
- Can feel sparse
- Single color palette

---

## Gemini Implementation (`hero-lion-gemini.js`)

### Approach
- **Dense particle cloud** – 4000 particles, volumetric feel
- **Radial mane** – 2500 particles in polar distribution (radius 2–5.5)
- **Structural features** – Line segments for snout, brows, cheeks, jaw, whiskers
- **No outline lines** – Pure particle cloud

### Geometry
- Mane: `angle = random * 2π`, `radius = 2 + random^1.5 * 3.5`
- 3D depth: z varies with radius (mane pushed back)
- Face: lerped line segments
- Eyes: 150 particles each (dense clusters)
- Nose: 100 particles

### Shader
- **Mouse: repel** – Particles push away from cursor (z increases when near)
- **Breathing** – `sin(time)`, `cos(time)` for subtle motion
- **Per-vertex color** – Cyan (#00f0ff), blue (#0033ff), white (#ffffff)

### Visual
- Electric cyan / deep blue / white
- Sparkles-style background (300 points)
- Glassmorphism overlay at bottom center

### Pros
- Dense, volumetric look
- Strong color contrast (cyan vs blue)
- Mouse repel feels interactive
- Sparkles add atmosphere

### Cons
- Lion shape less obvious (no outlines)
- Heavier (4000 particles)
- Different scale/coordinate system

---

## Summary

| Aspect | Original | Gemini |
|--------|----------|--------|
| Particles | ~500 | 4000 |
| Shape clarity | High (outlines) | Medium (cloud) |
| Color | Blue-white | Cyan-blue-white |
| Mouse | Attract | Repel |
| Background | Static points | Sparkles |
| Overlay | Top-left | Bottom center |
| File size | Smaller | Larger |

**Use Original** when you want a clear, recognizable lion with a lighter scene.  
**Use Gemini** when you prefer a dense, atmospheric particle cloud with stronger color contrast.
