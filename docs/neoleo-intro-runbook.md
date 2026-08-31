# NeoLeo intro — Cursor build runbook

Seven prompts, in order. One per session. Each ends in something you can
look at in a browser; if you can't see the result, don't move on.

Before starting:

- Save the rules file as `.cursor/rules/intro.mdc` (or `.cursorrules`)
- Drop `neoleo-3d.html` into the repo root so you can `@`-mention it
- Put the optimised `leo.glb` in `/public/`
- Note your site wordmark's viewport coordinates at 1440px, 768px and 375px
  (devtools → select the element → read the box model). You need these in
  step 1.

---

## 1 — Curtain shell

No animation, no lion, no FX. Just a black-and-white overlay that appears
instantly and can be dismissed.

```
Build <IntroCurtain /> in components/intro/. A self-contained full-viewport
overlay above the existing site. Do not modify any existing page component,
style or copy.

- position fixed, inset 0, z-index above everything, its own black-and-white
  design (markup below)
- body scroll locked while mounted
- a temporary "Dismiss" button that unmounts it

Preventing the pre-flash — the critical part. Without this the colour site
paints for a frame before the curtain mounts, which ruins the reveal:
- a blocking inline script in <head> that sets a class on <html> before
  first paint, hiding the site underneath
- the curtain's critical CSS inlined so it renders on that first paint
- text only, no images — this element will be the LCP

Teardown must unmount the component entirely, remove the html class, unlock
scroll, and remove listeners. Never leave it at opacity 0.

Place the NeoLeo wordmark at exactly these viewport coordinates so it
appears not to move when the curtain is destroyed: [your measurements].
Give it a stable id — the beam will target it.

Markup and styles for the curtain:
[paste your B&W design]
```

**Check:** hard-refresh several times. You should never see colour before
the curtain. Dismiss returns you to a working, scrollable site.

---

## 2 — The whole cinematic, no lion

The big one. Everything dramatic happens here, and you tune it here.

```
@neoleo-3d.html is a working prototype. Port its 2D FX layer into
<IntroCurtain />. Read drawBeam, detonate and frame — the particle
behaviour and easing there are what I want.

Add a full-viewport canvas inside the curtain, above its content,
pointer-events none, dpr capped at 2, resizing with the window.

Hardcode the beam origin at { x: width * 0.82, y: height * 0.88 }. A 3D
model replaces this later. The FX code must not know where the origin
came from.

Sequence, one clock, offsets from mount:
  2500ms  beam fires from origin toward the live getBoundingClientRect
          centre of #[wordmark id], travelling over 380ms
  2880ms  impact: white flash, shockwave ring, ~150 embers, smoke puffs
  2990ms  at flash peak, the curtain becomes invisible in one frame,
          revealing the site — the FX canvas keeps drawing above it
  6480ms  sequence ends, unmount the curtain entirely

Recompute the wordmark rect every frame, don't cache it.
Add a dev-only Replay button.
```

**Check:** the flash fully covers the swap — no seam, no flicker of the
curtain leaving. Then tune: flash duration, smoke dissipation rate, beam
sustain. Do this before adding the lion; these settings decide whether the
whole thing feels expensive.

---

## 3 — Leo, static

Install `three` (plus `@react-three/fiber` and `@react-three/drei` if
you're on React) first.

```
Add a transparent WebGL canvas inside the curtain, below the FX canvas.
Load /leo.glb — a Meshy export, unrigged single mesh, arbitrary scale and
origin. Loader must handle draco, meshopt and ktx2.

On load: Box3, centre X/Z, sit min.y at y=0, uniform scale so height ===
CONFIG.height. Never hardcode a scale factor.

Anchor it to the bottom-right of the viewport by unprojecting an NDC point,
so it holds position across aspect ratios. Widen the FOV in portrait.

No animation — it just sits there. Suspense fallback renders nothing.

Also add a dev-only tuner behind a keypress: sliders for height, position,
rotation, muzzle offset and light intensity, a visible marker at the muzzle,
and a Copy Config button. Must not ship to production.
```

**Check:** Leo sits correctly at 375px, 768px and 1440px. Tune, copy the
config, paste it into CONFIG.

---

## 4 — Weld the beam to the barrel

```
Replace the hardcoded beam origin. Parent an Object3D to the model at
CONFIG.muzzle. Each frame: getWorldPosition(v).project(camera), convert
NDC to CSS pixels, supply that to the FX layer as the origin. Recompute
every frame — the model will recoil.
```

**Check:** resize the window mid-sequence. The beam should stay welded to
the muzzle.

---

## 5 — Leo moves

```
Add four phases to the model on the same clock, all in useFrame with refs:

  500ms   entrance: rise from -1.25 * height to 0 over 620ms, easeOutBack
          with overshoot
  after   idle: continuous ~0.04 vertical bob and ~0.02 rad sway, sine,
          periods offset so they don't beat together
  1150ms  charge: brace into the shot over 900ms, sin(p*PI) so it returns
  2500ms  recoil: kick back and right over 320ms, rotate on z and x,
          sin(p*PI) so it settles

Idle runs continuously underneath the others — additive, not exclusive.
All values into CONFIG.
```

**Check:** then hand-tune. Lengthen the anticipation before the shot,
shorten and sharpen the recoil. That's nearly always the correction.

---

## 6 — Sprite-sheet smoke (optional, biggest visual upgrade)

Render the explosion in Blender first: transparent background, ~60 frames,
512×512, exported as an 8×8 WebP atlas into `/public/`.

```
Replace the procedural smoke puffs with sprite-sheet playback. /public/
smoke-atlas.webp is an 8x8 grid of 512x512 frames, 60 used, transparent.

Blit one cell per frame onto the FX canvas, scaled to cover the viewport
and centred on the live wordmark rect. Preload the atlas on mount, during
the first two seconds while nothing has fired.

Keep beam, flash and shockwave procedural — they need to stay dynamic.
If the atlas fails to load, fall back to the existing procedural smoke.
```

---

## 7 — Harden

```
Add these guards. Every failure path must land on the working site with no
broken state and no blocked interaction:

- sessionStorage: intro plays once per session
- Skip button visible from the first frame
- prefers-reduced-motion: skip entirely, never mount the curtain
- WebGL context creation fails: run the sequence without the lion
- GLB fails or takes over 3s: run the sequence without the lion
- Under 768px or low navigator.deviceMemory: skip the 3D layer
- Dispose geometries, materials, textures, renderer on unmount
- Preload the GLB; serve from CDN with brotli and a long cache
- Confirm the intro does not block LCP

Then remove all dev-only tooling from the production bundle and show me
the bundle size difference.
```

---

## Debugging prompts

When something's wrong, these beat describing the symptom:

```
The framerate drops during [phase]. Profile it and tell me what's
allocating per frame. Don't fix anything yet.
```

```
Something is causing a React re-render during the animation. Find it.
```

```
Show me every place a timing value is defined outside CONFIG.
```

## Habits

- One step per session. Cursor degrades sharply when asked to do 3 and 5
  together, and you lose the ability to tell which change broke the
  framerate.
- Always take the plan first. Its default instinct is to restructure your
  site to suit the animation.
- Commit after every green step. You will want to go back.
- Tune motion yourself. Cursor produces technically correct animation that
  reads as limp; the feel is not delegable.
