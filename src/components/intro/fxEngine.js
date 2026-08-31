import { INTRO_CONFIG, getTiming } from './config.js'

const rnd = (a, b) => a + Math.random() * (b - a)

export function createFxState() {
  return {
    embers: [],
    smoke: [],
    shock: null,
    flash: 0,
    detonated: false,
    swapped: false,
    running: false,
    start: 0,
  }
}

export function resetFxState(state) {
  state.embers = []
  state.smoke = []
  state.shock = null
  state.flash = 0
  state.detonated = false
  state.swapped = false
}

export function hardcodedOrigin(width, height) {
  return {
    x: width * INTRO_CONFIG.originNX,
    y: height * INTRO_CONFIG.originNY,
  }
}

export function logoCentre(logoEl) {
  if (!logoEl) return { x: 0, y: 0 }
  const r = logoEl.getBoundingClientRect()
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 }
}

export function detonate(state, width, height, target) {
  const cfg = INTRO_CONFIG.detonate
  state.flash = 1
  state.shock = { x: target.x, y: target.y, r: 0, a: 1 }

  state.embers = []
  for (let i = 0; i < cfg.emberCount; i++) {
    const a = rnd(0, Math.PI * 2)
    const s = rnd(3, 20)
    state.embers.push({
      x: target.x,
      y: target.y,
      vx: Math.cos(a) * s,
      vy: Math.sin(a) * s,
      life: rnd(0.5, 1),
      decay: rnd(0.006, 0.018),
      size: rnd(1.5, 5.5),
      hue: cfg.emberHues[(Math.random() * cfg.emberHues.length) | 0],
    })
  }

  state.smoke = []
  const n = Math.round(Math.max(width, height) / cfg.smokeRadiusDivisor)
  for (let i = 0; i < n; i++) {
    const a = rnd(0, Math.PI * 2)
    const s = rnd(1.5, 9)
    state.smoke.push({
      x: target.x + rnd(-40, 40),
      y: target.y + rnd(-40, 40),
      vx: Math.cos(a) * s,
      vy: Math.sin(a) * s - rnd(0.2, 1.1),
      r: rnd(50, 190),
      grow: rnd(0.4, 1.6),
      a: rnd(0.5, 0.95),
      fade: rnd(0.0025, 0.006),
      tint: Math.random() < 0.22,
    })
  }
}

function drawBeam(ctx, t, origin, target) {
  const T = getTiming()
  const cfg = INTRO_CONFIG.beam

  if (t < T.fire) return

  const p = Math.min((t - T.fire) / T.travel, 1)
  const sustain = t - T.impact
  let alpha = sustain > cfg.sustainFadeStart
    ? Math.max(0, 1 - (sustain - cfg.sustainFadeStart) / cfg.sustainFadeDuration)
    : 1
  if (alpha <= 0) return

  const hx = origin.x + (target.x - origin.x) * p
  const hy = origin.y + (target.y - origin.y) * p
  const wob = Math.sin(t / cfg.wobblePeriod) * cfg.wobbleAmplitude

  ctx.save()
  ctx.globalCompositeOperation = 'lighter'
  ctx.globalAlpha = alpha
  ctx.lineCap = 'round'

  for (const [w, color] of cfg.layers) {
    ctx.strokeStyle = color
    ctx.lineWidth = w + wob
    ctx.beginPath()
    ctx.moveTo(origin.x, origin.y)
    ctx.lineTo(hx, hy)
    ctx.stroke()
  }

  const rr = cfg.tipRadius + Math.sin(t / cfg.tipPulsePeriod) * cfg.tipPulseAmplitude
  const g = ctx.createRadialGradient(hx, hy, 0, hx, hy, rr)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.35, 'rgba(70,230,255,.85)')
  g.addColorStop(1, 'rgba(37,64,232,0)')
  ctx.fillStyle = g
  ctx.beginPath()
  ctx.arc(hx, hy, rr, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
}

function drawShockwave(ctx, shock, cfg) {
  if (!shock) return
  shock.r += cfg.shockExpand
  shock.a -= cfg.shockFade
  if (shock.a <= 0) {
    return false
  }
  ctx.save()
  ctx.globalCompositeOperation = 'lighter'
  ctx.strokeStyle = `rgba(255,214,0,${shock.a})`
  ctx.lineWidth = 10 * shock.a + 2
  ctx.beginPath()
  ctx.arc(shock.x, shock.y, shock.r, 0, Math.PI * 2)
  ctx.stroke()
  ctx.restore()
  return true
}

function drawSmoke(ctx, smoke) {
  for (const s of smoke) {
    s.x += s.vx
    s.y += s.vy
    s.vx *= 0.96
    s.vy = s.vy * 0.96 - 0.045
    s.r += s.grow
    s.a -= s.fade
    if (s.a <= 0) continue

    const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r)
    const base = s.tint ? '90,102,140' : '150,150,158'
    g.addColorStop(0, `rgba(${base},${s.a * 0.55})`)
    g.addColorStop(0.55, `rgba(${base},${s.a * 0.26})`)
    g.addColorStop(1, `rgba(${base},0)`)
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
    ctx.fill()
  }
}

function drawEmbers(ctx, embers) {
  ctx.save()
  ctx.globalCompositeOperation = 'lighter'
  for (const e of embers) {
    e.x += e.vx
    e.y += e.vy
    e.vx *= 0.965
    e.vy = e.vy * 0.965 + 0.16
    e.life -= e.decay
    if (e.life <= 0) continue
    ctx.globalAlpha = Math.max(0, e.life)
    ctx.fillStyle = e.hue
    ctx.beginPath()
    ctx.arc(e.x, e.y, e.size * e.life, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.restore()
}

function drawFlash(ctx, state, width, height, cfg) {
  if (state.flash <= 0) return
  ctx.save()
  ctx.fillStyle = `rgba(255,255,255,${Math.min(1, state.flash)})`
  ctx.fillRect(0, 0, width, height)
  ctx.restore()
  state.flash -= cfg.flashDecay
}

/**
 * One FX frame. Returns false when sequence should stop.
 * All timing read from elapsed ms — no setTimeout.
 */
export function tickFxFrame(ctx, state, elapsed, width, height, logoEl, callbacks) {
  const T = getTiming()
  const cfg = INTRO_CONFIG.detonate

  ctx.clearRect(0, 0, width, height)

  const origin = hardcodedOrigin(width, height)
  const target = logoCentre(logoEl)

  if (elapsed >= T.impact && !state.detonated) {
    state.detonated = true
    detonate(state, width, height, target)
    callbacks.onDetonate?.()
  }

  if (elapsed >= T.swap && !state.swapped) {
    state.swapped = true
    callbacks.onSwap?.()
  }

  drawBeam(ctx, elapsed, origin, target)

  if (state.shock) {
    const alive = drawShockwave(ctx, state.shock, cfg)
    if (!alive) state.shock = null
  }

  drawSmoke(ctx, state.smoke)
  state.smoke = state.smoke.filter((s) => s.a > 0)

  drawEmbers(ctx, state.embers)
  state.embers = state.embers.filter((e) => e.life > 0)

  drawFlash(ctx, state, width, height, cfg)

  if (elapsed >= T.end) {
    return false
  }
  return true
}
