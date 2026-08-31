export function easeOutBack(t, overshoot = 1.70158) {
  const p = t - 1
  return 1 + (overshoot + 1) * p * p * p + overshoot * p * p
}

export function phaseProgress(elapsed, startMs, durationMs) {
  if (elapsed < startMs) return 0
  return Math.min((elapsed - startMs) / durationMs, 1)
}

export function sinEnvelope(progress) {
  return Math.sin(progress * Math.PI)
}

export function lerp(a, b, t) {
  return a + (b - a) * t
}
