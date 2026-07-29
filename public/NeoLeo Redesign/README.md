# Handoff: NeoLeo — Papercraft Marketing Site

## Overview

A complete single-page marketing site for **NeoLeo** (neoleo.tech) — an AI/intelligent-systems studio. The design is built around a layered-paper ("papercraft") art direction derived from a 3D papercraft lion sculpture the client produced, which serves as the hero visual and drives the entire palette.

Five bands, top to bottom: **Hero → Solutions → Approach → Client Voices → Contact/Footer**.

The site's organizing tagline is **"Bold Vision, Precise Execution."**

---

## About the Design Files

The files in this bundle are **design references created in HTML** — prototypes that demonstrate the intended look, motion, and behavior. **They are not production code to copy directly.**

The task is to **recreate these designs in the target codebase's existing environment** (React, Next.js, Vue, Astro, etc.) using its established patterns, component library, and styling solution. The prototypes use React 18 via CDN + Babel-in-browser and inline style objects purely because that was the fastest path to a faithful mock — none of that should survive into production. Port the *design decisions* (documented exhaustively below), not the delivery mechanism.

If no frontend environment exists yet, choose the most appropriate framework for the project and implement there.

---

## Fidelity

**High-fidelity.** All colors, typography, spacing, radii, shadows, animation timings, and copy are final and exact. Recreate pixel-faithfully using the codebase's existing primitives where they exist.

Two known gaps, both flagged in **Open Questions** at the end:
1. The real NeoLeo logo was never obtained — the wordmark is set type and the medallion carries no letterform.
2. The hero currently shows a **PNG render** of the lion. A GLB model exists on the client side and is intended to replace it with a live 3D viewer.

---

## Design Tokens

### Color

All palette values were sampled from the papercraft lion sculpture.

| Token | Hex | Role |
|---|---|---|
| `teal900` | `#2F5A5C` | Darkest teal — gradient terminus, page background |
| `teal700` | `#4A7E7D` | Mid teal — gradient body |
| `teal500` | `#6FA09C` | Light teal — gradient highlight, arch interior fill |
| `teal200` | `#A9CAC4` | Pale teal — decorative leaf fill |
| `cream` | `#F3E8D0` | Primary text on dark; wordmark |
| `paper` | `#FBF4E4` | Light band ground; light button fill |
| `ochre` | `#D9963F` | Primary accent — CTA fill, highlight block, medallion |
| `tan` | `#C0813F` | Secondary accent — link hover, medallion hub |
| `terra` | `#A65E38` | Tertiary accent — icon chip, leaf fill |
| `ink` | `#33251A` | Primary text on light |
| `inkDim` | `rgba(51,37,26,0.78)` | Secondary text on light — **7.24:1 on white** |

**Accessibility constraint (important):** `ochre`, `tan`, and `terra` are **fill-only** values. They are legible as backgrounds behind cream/paper content, and they fail WCAG AA as small text on white or cream. Do not use them as a foreground text color at body or caption size. Secondary text on light grounds always uses `inkDim`. On teal grounds, `ochre` **is** used for 11px uppercase mono labels (phase labels) and passes there.

Only **two ground colors** are used across the whole page — the teal gradient family and flat cream/paper. This is deliberate; do not introduce a third.

### Gradients

- **Hero:** `radial-gradient(120% 90% at 68% 40%, #6FA09C 0%, #4A7E7D 46%, #2F5A5C 100%)`
- **Approach band:** `radial-gradient(110% 80% at 30% 10%, #4A7E7D 0%, #2F5A5C 70%)`
- **Contact band:** `radial-gradient(110% 90% at 70% 0%, #4A7E7D 0%, #2F5A5C 68%)`
- **Arch interior vignette:** `linear-gradient(190deg, rgba(47,90,92,0) 50%, rgba(28,62,64,0.5) 100%)`

### Typography

Two families, loaded from Google Fonts:

- **Young Serif** (400 only) — all display type: h1, h2, h3, card headings, pull-quotes, phase numerals, wordmark, stat figures.
- **Geist** (400/500/600/700) — body copy, buttons, nav.
- **Geist Mono** (400/500) — eyebrows, labels, ordinals, meta text.

| Element | Family | Size | Line-height | Letter-spacing | Color |
|---|---|---|---|---|---|
| Hero h1 | Young Serif | `clamp(42px, 5vw, 86px)` | 1.03 | −0.022em | `paper` |
| Section h2 | Young Serif | `clamp(32px, 3.8vw, 54px)` | 1.06 | −0.02em | `ink` / `paper` |
| Contact h2 | Young Serif | `clamp(36px, 4.4vw, 62px)` | 1.04 | −0.02em | `paper` |
| Card h3 | Young Serif | 25px | default | −0.015em | `ink` |
| Pull-quote | Young Serif | 19px | 1.42 | −0.01em | `ink` |
| Phase numeral | Young Serif | `clamp(40px, 5vw, 64px)` | 1 | — | `rgba(243,232,208,0.32)` |
| Phase body | Geist | `clamp(17px, 1.8vw, 21px)` | 1.45 | — | `cream` |
| Hero lede | Geist | 16.5px | 1.58 | — | `rgba(243,232,208,0.82)` |
| Section intro | Geist | 17px | 1.6 | — | `inkDim` / `rgba(243,232,208,0.8)` |
| Card body | Geist | 15.5px | 1.6 | — | `inkDim` |
| Nav link | Geist | 14.5px | — | — | `rgba(243,232,208,0.78)` |
| Mono label | Geist Mono | 11px | — | 0.1em, uppercase | contextual |
| Wordmark | Young Serif | 22px (nav) / 20px (footer) | — | −0.01em | `cream` / `paper` |

`text-wrap: balance` on all headings and card headings. `text-wrap: pretty` on all body paragraphs.

### Spacing

Section padding follows one fluid formula:
`clamp(72px, 9vw, 120px)` top · `clamp(24px, 4vw, 60px)` inline · `clamp(90px, 10vw, 140px)` bottom.
Contact band: `clamp(76px, 9vw, 130px)` top, `42px` bottom.
Content max-width: **1240px**, centered. Prose max-width: **720px** (intros), **460–500px** (ledes).
Grid gaps: `clamp(18px, 2.4vw, 30px)` for card grids; `clamp(32px, 5vw, 64px)` for the contact two-column.

### Radii

| Value | Use |
|---|---|
| `20px` | Paper cards |
| `22px` | Phase rows |
| `16px` | Icon chips |
| `999px` | All buttons, eyebrow pills |
| `300px 300px 24px 24px` | Hero arch |
| `320px 320px 30px 30px` | Hero arch's dashed outer ring |

### Shadows

| Name | Value |
|---|---|
| Card rest | `0 1px 0 rgba(51,37,26,.10), 0 20px 38px -28px rgba(51,37,26,.5)` |
| Card hover | `0 1px 0 rgba(51,37,26,.10), 0 30px 50px -28px rgba(51,37,26,.55)` |
| Arch | `inset 0 0 0 2px rgba(243,232,208,0.5), 0 50px 90px -40px rgba(10,32,32,0.75)` |
| Ochre button | `0 8px 18px rgba(14,38,38,.28)` |
| Cream button | `0 12px 26px rgba(14,38,38,.32)` |
| Highlight block | `0 8px 18px rgba(14,38,38,.28)` |
| Leaf | `drop-shadow(0 10px 16px rgba(24,52,52,0.28))` |
| Medallion (hero) | `drop-shadow(0 20px 28px rgba(10,32,32,0.45))` |
| Medallion (footer) | `drop-shadow(0 26px 34px rgba(10,32,32,0.5))` |

---

## Signature Design Devices

These four devices carry the art direction. Getting them right matters more than anything else in the port.

### 1. Scalloped cut-paper edges

Every transition between a teal band and a cream band is a row of half-circle "punched paper" teeth, ~26px, evoking a cut paper edge.

**Critical implementation note.** The teeth are **always painted in flat cream (`paper`), never in teal.** The teal bands are radial gradients, so a flat teal fill can never match them at the seam — an earlier attempt to paint teal teeth over cream produced a visible color mismatch band. Two variants:

```css
/* cream band → teal band below: teeth at the bottom of the cream band */
.scallop {
  position: absolute; left: 0; right: 0; bottom: -1px; height: 26px; z-index: 6;
  background: radial-gradient(circle at 13px 26px, var(--sc) 13px, transparent 13.5px) repeat-x 0 0 / 26px 26px;
}
/* teal band → cream: teeth laid OVER the top of the teal band */
.scallop-top {
  position: absolute; left: 0; right: 0; top: -1px; height: 26px; z-index: 6;
  background: radial-gradient(circle at 13px 0, var(--sc) 13px, transparent 13.5px) repeat-x 0 0 / 26px 26px;
}
```

`--sc` is always `#FBF4E4`. Both variants require the containing section to be `position: relative`.

Placement: `.scallop` at the bottom of the Hero and the Voices section; `.scallop-top` at the top of the Approach and Contact sections.

### 2. Cut-word highlight

The word "precise" (hero) and "digital" (contact) sit on a rotated ochre block, as if a strip of colored paper were slipped behind the letterforms.

```css
.cut-word { position: relative; display: inline-block; padding: 0 .14em; color: #33251A; }
.cut-word::before {
  content: ''; position: absolute; inset: .1em -.02em .14em;
  background: #D9963F; border-radius: 6px; transform: rotate(-1.4deg);
  z-index: -1; box-shadow: 0 8px 18px rgba(14,38,38,.28);
}
```

Note the text color flips to `ink` on the highlight. The `z-index: -1` requires the heading to establish a stacking context or the pseudo-element will fall behind the section background — verify this in the target framework.

### 3. Paper grain overlay

Every teal band carries an SVG fractal-noise overlay for paper tooth:

```css
.grain {
  position: absolute; inset: 0; z-index: 1; pointer-events: none;
  opacity: .16; mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)'/%3E%3C/svg%3E");
}
```

Content inside a grained section must sit at `z-index: 2` or above.

### 4. Cut-paper SVG atoms

Two hand-built SVG shapes, both drawn as flat paper cutouts with white vein/engraving lines at 45–60% opacity:

**`Leaf`** — `viewBox="0 0 60 126"`, aspect 1:2.1. Body path `M30 2 C52 30 58 74 30 124 C2 74 8 30 30 2 Z`, a center vein `M30 8 L30 118` at 1.6px, plus 9 pairs of ribs generated at `y = 20 + i*10.5` with spread `s = 6 + sin(i/2)*9`, each rib `M30 y Q (30∓s) (y+3) (30∓s∓4) (y+11)` at 1.1px. Props: `w`, `fill`, `vein`.

**`Medallion`** — `viewBox="0 0 120 120"`, an engraved disc echoing the medallion on the sculpture's mane. Ochre `r=58` disc, 1.5px white rim at 45%, dashed `r=48` ring (`2 5`) at 55%, **40 radial spokes** from `r=16` to `r=42` at 1px/55% white, then a `tan` `r=15` hub with a 1.2px white ring, and inside it a concentric paper ring at `r=7` (1.6px) plus an `r=2.4` paper dot. **It carries no letterform** — see Open Questions.

---

## Screens / Views

There is one page. Five bands.

### Band 1 — Hero

**Purpose:** State the positioning and present the lion.

**Layout:** `height: 100svh`, `min-height: 480px`, `display: flex; flex-direction: column`, `overflow: hidden`, `position: relative`. Grain overlay, then nav, then a two-column content grid, then the bottom scallop.

- **Nav** — `z-index: 6`, flex, space-between, padding `22px clamp(24px,4vw,60px) 6px`. Left: "NeoLeo" wordmark. Right: a link group (`Solutions`, `Approach`, `Contact`) with gap `clamp(16px,2.4vw,32px)`, hidden below 720px, then the ochre "Start a brief →" CTA. Nav links get a transparent 1px bottom border that becomes ochre on hover, with color lifting to full cream.
- **Content grid** — `flex: 1; min-height: 0`, `grid-template-columns: minmax(0, 1fr) auto`, gap `clamp(24px,4vw,64px)`, `align-items: center`, padding `0 clamp(44px,4vw,60px) 44px`.
  - **Left column** (max-width 620px): eyebrow pill "Intelligent systems" → h1 "Bold vision, / **precise** execution." (line 2 wrapped in `white-space: nowrap` so the highlight block never breaks) → lede "Intelligent systems and digital presence — built layer by layer, like the beast." → button row: cream "See what we build ↓" (anchors `#solutions`) + ghost "Our approach" (anchors `#approach`).
  - **Right column** — the lion stage (below).

**Eyebrow pill:** `padding: 7px 15px 7px 11px`, `border-radius: 999px`, `1px solid rgba(243,232,208,0.32)`, `background: rgba(243,232,208,0.08)`, `backdrop-filter: blur(4px)`, 11px Geist Mono uppercase, cream. Leading 7px ochre dot with `box-shadow: 0 0 0 4px rgba(217,150,63,.22)`.

#### The lion stage — most complex element on the page

A container `height: min(56svh, 500px)`, `justify-self: end`, `position: relative`, holding:

1. **Dashed outer ring** — `inset: -18px`, radius `320px 320px 30px 30px`, `1px dashed rgba(243,232,208,0.30)`, `pointer-events: none`.
2. **The arch** — `height: 100%`, `aspect-ratio: 4/5`, radius `300px 300px 24px 24px`, `overflow: hidden`, background `teal500`, plus the arch shadow. The lion image fills it: `object-fit: cover`, `object-position: 58% 36%`, `transform: scale(1.16)`. Over the image, the interior vignette gradient, then a "House mark" mono label at `left: 22px; bottom: 16px` in `rgba(243,232,208,0.85)`.
3. **Four orbiting decorations** — medallion + three leaves, each straddling the arch's edge.

**The decoration placement algorithm — port this, don't eyeball it.** Each decoration is defined by a fixed angle in degrees and a clearance offset, then projected onto the arch's **bounding rectangle** (not an inscribed ellipse — an ellipse projection pulls the items visibly inside the arch's straight lower flanks). Given arch half-width `hw` and half-height `hh`, for angle `a`:

```
r   = a * π / 180
t   = min( hw / |cos r| , hh / |sin r| ) + clearance
x   = hw + cos(r) * t
y   = hh − sin(r) * t          // y inverted: CSS grows downward
```

positioned with `translate(-50%, -50%)`. The arch's live dimensions must be measured with a `ResizeObserver` (the prototype uses `useLayoutEffect` + `ResizeObserver` on the arch node) because they derive from `svh` units and `aspect-ratio`.

The four slots:

| Angle | Clearance | Shape | Parallax k | Extra rotation | Drift variant |
|---|---|---|---|---|---|
| 196° | −6 | Medallion, 96px | 34 | — | base |
| 138° | +6 | Leaf 42px, `teal200` fill, vein `rgba(47,90,92,0.35)` | 30 | −34° | `d3` |
| 40° | +6 | Leaf 36px, `terra` | 44 | +34° | base |
| 330° | +6 | Leaf 32px, `tan` | 38 | +76° | `d2` |

The medallion's negative clearance tucks it slightly *into* the arch edge; the leaves sit just outside.

### Band 2 — Solutions (`#solutions`)

Cream ground. Header: eyebrow "What we build", h2 "AI solutions cut to the scale of your ambitions.", intro "Fuel your business growth with AI solutions that are not only dynamic and adaptive but also innovative and tailored to match the scale and vision of your ambitions."

Then a `repeat(auto-fit, minmax(260px, 1fr))` grid, top margin `clamp(38px, 5vw, 62px)`, of three paper cards. Each card: white fill, 20px radius, padding `28px 26px 26px`, `display: flex; flex-direction: column`, card shadow. Contents: a 52px icon chip (16px radius, accent fill, 26px cream SVG glyph) → h3 → body → a mono ordinal (`01`/`02`/`03`) pushed down with `margin-top: auto; padding-top: 22px`, colored `inkDim`.

| # | Title | Body | Chip fill | Icon |
|---|---|---|---|---|
| 01 | Visual recognition | Automated image and video analysis for fast, actionable insights. | `terra` | Aperture/viewfinder: `r=15` ring, `r=5.5` solid pupil, four corner brackets |
| 02 | AI-driven personalization | Personalized interactions based on unique customer behaviors. | `ochre` | Person bust + two equalizer bars + a slider dot |
| 03 | Cybersecurity | Proactive threat detection and neutralization to keep your business secure. | `teal700` | Shield outline with a 2.8px check |

Icons are 48×48 viewBox, `stroke: currentColor`, 2.4px strokes, round caps/joins. Card hover: `translateY(-4px) rotate(-.5deg)` + deeper shadow, 220ms `cubic-bezier(.2,.7,.3,1)` — a slight paper-lift tilt.

### Band 3 — Approach (`#approach`)

Teal gradient ground, grain, `scallop-top` at the top. Header (dark variant): eyebrow "How we work", h2 "A three-phase approach.", intro "Explore our three-phase approach to see how we drive growth and efficiency at every step."

Then an `<ol>` with `gap: 18px`, each `<li>` a `grid-template-columns: auto 1fr` row, gap `clamp(18px,3vw,34px)`, `align-items: center`, padding `26px clamp(22px,3vw,34px)`, radius 22px, `background: rgba(243,232,208,.07)`, `border: 1px solid rgba(243,232,208,.16)`, `backdrop-filter: blur(3px)`. Left cell: the large numeral (`01`/`02`/`03`). Right cell: an ochre mono label, then the phase body.

| Numeral | Label | Body |
|---|---|---|
| 01 | Integrate | Identify your unique needs and seamlessly integrate our AI solutions into your existing systems. |
| 02 | Fine-tune | Fine-tune our AI tools to maximize efficiency and effectiveness. |
| 03 | Grow | Drive growth and efficiency at every step. |

Labels are verbs rather than "Phase 01/02/03" to avoid repeating the numeral that sits beside them.

### Band 4 — Client Voices

Cream ground, bottom `scallop`. Header: eyebrow "Client voices", h2 "Hear directly from our clients.", intro "Their experiences, and the impact our technology has had on their operations."

Same `auto-fit` grid, three quote cards (paper card + `padding-top: 22px`). Each: a Young Serif `“` at 56px/`line-height:.7` in the accent color → the quote in 19px Young Serif → a 44×3px accent rule (2px radius) at `margin-top: 22px`.

| Quote | Accent |
|---|---|
| The visual recognition technology has streamlined our processes and provided us with valuable insights. NeoLeo is a key partner in our success. | `terra` |
| Thanks to NeoLeo's AI-driven personalization, we've seen a dramatic increase in customer satisfaction and engagement. It's truly exceptional. | `ochre` |
| The cybersecurity solutions from NeoLeo offer unparalleled protection for our data. We feel confident and secure knowing our systems are in good hands. | `teal700` |

Cards carry **no attribution** — the source page publishes these quotes unattributed. If real names/companies/roles exist, add a `<figcaption>` below the rule.

### Band 5 — Contact / Footer (`#contact`)

Teal gradient ground, grain, `scallop-top`. A `repeat(auto-fit, minmax(280px, 1fr))` grid, `align-items: center`, gap `clamp(32px,5vw,64px)`:

- **Left:** eyebrow "Get started" → h2 "Elevate your **digital** presence." → body "Bold vision, precise execution — tell us what you are building and we will shape the system around it." → cream "Start a brief →" + ghost "See what we build".
- **Right:** a 150px Medallion, `justify-self: center`, drifting, with the deeper drop shadow.

Below, a rule (`1px solid rgba(243,232,208,0.18)`) at `margin-top: clamp(56px,7vw,96px)`, `padding-top: 26px`, then a space-between row: "NeoLeo" wordmark (20px) and a mono "Bold vision · Precise execution".

---

## Interactions & Behavior

### Hero parallax

The hero section tracks `onMouseMove`, normalizing the cursor to `p = {x, y}` in the range −0.5…+0.5 relative to the section's bounding box. `onMouseLeave` resets to `{0, 0}`. Each hero layer translates by `p` times its own coefficient, producing depth:

| Layer | X coefficient | Y coefficient |
|---|---|---|
| Dashed ring & arch | −10 | −7 |
| Lion image (inside arch) | +16 | +12 |
| Medallion | +34 | +23.8 (0.7×) |
| Leaf 138° | +30 | +21 |
| Leaf 40° | +44 | +30.8 |
| Leaf 330° | +38 | +26.6 |

Arch and ring move **opposite** to the foreground items — that inversion is what sells the depth. Decorations use `750ms cubic-bezier(.2,.7,.3,1)`; arch and image use `600ms` with the same easing. Y coefficients for decorations are `0.7 × k`.

All parallax is `translate3d` on wrapper elements, kept separate from the `rotate()` on the leaves and from the drift keyframes — three transforms on three nested nodes, so none clobber the others. Preserve that nesting.

### Idle motion

```css
@keyframes float-b { 0%,100% { transform: translateY(0) rotate(0deg) } 50% { transform: translateY(-20px) rotate(-3deg) } }
@keyframes lion-breathe { 0%,100% { filter: saturate(1) } 50% { filter: saturate(1.07) } }
.lion-float { animation: lion-breathe 9s ease-in-out infinite }
.drift    { animation: float-b 7.5s ease-in-out infinite }
.drift.d2 { animation-duration: 9.5s; animation-delay: -2s }
.drift.d3 { animation-duration: 11s;  animation-delay: -4.5s }
```

Negative delays desynchronize the decorations so they never bob in lockstep. The lion "breathes" via saturation rather than scale — it's clipped by the arch, so a scale would reveal the clip edge.

### Buttons

All share `transition: transform .18s cubic-bezier(.2,.7,.3,1), box-shadow .18s, background .18s` and lift `translateY(-2px)` on hover. Three variants:

- **`.btn-ochre`** — `padding: 11px 17px`, ochre fill, `ink` text, 600 weight, 13.5px, ochre button shadow. Nav CTA.
- **`.btn-cream`** — `padding: 15px 23px`, `paper` fill, `ink` text, 600 weight, 14.5px, cream button shadow, 9px gap for its trailing glyph.
- **`.btn-ghost`** — `padding: 15px 23px`, transparent, `1px solid rgba(243,232,208,.4)`, cream text, 500 weight, 14.5px. Hover fills `rgba(243,232,208,.1)`.

All are `white-space: nowrap`. Because several are rendered as `<a>`, explicitly pin their hover color or the global link color will override it.

### Navigation

In-page anchors only, with `html { scroll-behavior: smooth }`. Nav links → `#solutions`, `#approach`, `#contact`. Hero CTAs → `#solutions`, `#approach`. Footer CTAs → `#contact`, `#solutions`.

### Links

Global default: `a { color: #D9963F; text-decoration: none }`, `a:hover { color: #C0813F }`. Set these even where no links exist yet, so future editor-added links never render browser-default blue.

### Responsive

Fluid throughout — `clamp()` on all section padding and display type; `auto-fit` grids collapse card rows naturally. Two explicit breakpoints/behaviors: nav links `display: none` below 720px; the hero grid's `minmax(0, 1fr) auto` lets the arch keep its intrinsic width while the text column absorbs the remainder. **The hero two-column layout has not been designed for narrow mobile** — below roughly 700px it will crush. Decide the mobile hero treatment during the port; the most likely answer is stacking the arch above or below the copy at reduced height, or dropping the decorations.

Uses `svh` not `vh` for the hero and arch so mobile browser chrome doesn't cause jump.

---

## State Management

Almost none. The design is presentational.

- `Hero` holds `p = {x, y}` — the normalized cursor position for parallax. Set on mouse move, zeroed on mouse leave.
- `LionStage` holds `box = {w, h}` — the arch's measured pixel dimensions, maintained by a `ResizeObserver`, used by the decoration projection math. Decorations render only once `box.w > 0`.

No data fetching, no forms, no loading or error states. "Start a brief" is a placeholder anchor — wire it to a real contact route or form when the backend exists.

---

## Accessibility Notes

- Verified: `inkDim` on white = **7.24:1**; on cream also passes AA.
- The accent-as-text prohibition described under **Color** is a real constraint that was found and fixed during design — please keep it.
- Add `prefers-reduced-motion: reduce` handling in the port, which the prototype does not implement: disable `float-b`, `lion-breathe`, and the parallax transitions.
- The lion image has alt text ("NeoLeo — layered paper lion"). All decorative SVGs (leaves, medallion, icon glyphs) are presentational and should carry `aria-hidden="true"` in production.
- Icon chips convey no information not already in the adjacent heading.

---

## Assets

| Asset | Source | Notes |
|---|---|---|
| `uploads/…lion…0.png` | Client-supplied render of their own Meshy-generated papercraft lion sculpture | The hero visual. Included in this bundle. |
| Leaf, Medallion, 3 card icons | Drawn as inline SVG for this design | No external icon library needed |
| Young Serif, Geist, Geist Mono | Google Fonts | Self-host in production |
| Paper grain | Inline SVG `feTurbulence` data-URI | No image file |

**The GLB.** The client has a GLB of the lion, intended to replace the PNG with a live 3D viewer inside the arch — auto-framed camera, studio lighting, slow autorotate, orbit-on-drag. It never reached the design environment (only the PNG uploaded). The arch clips its contents, so the swap is contained: replace the `<img>` inside the arch with the 3D canvas and nothing else in the layout changes. If you implement this, keep the `lion-breathe` idle treatment or replace it with a slow autorotate, not both.

---

## Files in This Bundle

| File | Contents |
|---|---|
| `NeoLeo Site.html` | **The design of record.** Full page: document head, all global CSS (tokens, scallops, cut-word, grain, buttons, cards, phases, quotes), and the band composition. |
| `neoleo-kit.jsx` | Shared kit — the `C` palette object, `Mono`, `Leaf`, `Medallion`, `Scallop`, `ScallopTop`, and the `Band` section-header component. |
| `hero-band.jsx` | Nav, `LionStage` (arch + decoration projection math + ResizeObserver), and `Hero` (parallax state). |
| `sections.jsx` | `Solutions`, `Approach`, `Voices`, `Contact` — all copy and per-card data live here. |
| `uploads/…lion…0.png` | The hero lion render. |

Open `NeoLeo Site.html` in a browser to see the design live, including all hover and parallax behavior. The three `.jsx` files load into it via Babel-in-browser.

Also present in the project but **not part of this handoff** are earlier explorations (`NeoLeo Hero.html` — three initial hero directions; `NeoLeo Hero v2.html` — an SVG-lion editorial direction; `NeoLeo Hero v3.html` — the first papercraft hero). They are superseded by `NeoLeo Site.html`.

---

## Open Questions

1. **Logo.** The real NeoLeo mark was never obtained — the site's OG image sits behind a CDN that wouldn't serve it. The wordmark is currently set in Young Serif, and the medallion deliberately carries **no letterform** rather than pass off an invented glyph as the client's identity. Get the real logo (SVG preferred) and place it in the nav, the medallion hub, and the footer.
2. **Phase 03 copy.** The source page publishes descriptions for phases 01 and 02 only. Phase 03's body ("Drive growth and efficiency at every step") is borrowed from the section's own intro line. Needs real copy.
3. **Testimonial attribution.** Quotes are unattributed on the source page. Add names/companies if available.
4. **Mobile hero.** Not yet designed — see **Responsive**.
5. **Content beyond these five bands.** The source site may have additional pages or sections not represented here; this design covers the homepage narrative as published.
