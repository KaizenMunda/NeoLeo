/** Single source of truth — ported from neoleo-3d.html */
export const INTRO_CONFIG = {
  /** Hardcoded beam origin (fraction of viewport). Replaced by muzzle in step 4. */
  originNX: 0.82,
  originNY: 0.88,

  logoSelector: '#logo',
  stageSelector: '#live-root',

  /** Timeline offsets from mount (ms) */
  timing: {
    fire: 2500,
    travel: 380,
    /** impact = fire + travel */
    impactOffset: 380,
    /** swap = impact + 110 */
    swapOffset: 110,
    /** end = impact + 3600 */
    endOffset: 3600,
  },

  beam: {
    sustainFadeStart: 420,
    sustainFadeDuration: 260,
    wobblePeriod: 22,
    wobbleAmplitude: 2.5,
    tipRadius: 34,
    tipPulsePeriod: 30,
    tipPulseAmplitude: 5,
    layers: [
      [46, 'rgba(37,64,232,.30)'],
      [26, 'rgba(70,230,255,.55)'],
      [12, 'rgba(180,245,255,.9)'],
      [5, '#ffffff'],
    ],
  },

  detonate: {
    emberCount: 150,
    emberHues: ['#FFF6C9', '#FFD400', '#FF6B00', '#46E6FF'],
    smokeRadiusDivisor: 12,
    flashDecay: 0.05,
    shockExpand: 26,
    shockFade: 0.035,
    shakeDurationMs: 440,
  },

  sessionKey: 'neoleo.intro.v1',
}

/** Step 3 — static Leo placement (from neoleo-3d.html defaults) */
export const LEO_CONFIG = {
  modelUrl: '/leo.glb',
  height: 3.6,
  pos: { x: 0, y: 0, z: 0 },
  rot: { x: 0, y: 0, z: 0 },
  muzzle: { x: -0.7, y: 1.5, z: 0.4 },
  key: 1.4,
  amb: 1.1,
  rim: 0.8,
  anchorNX: 0.52,
  anchorNY: -1,
  anchorZ: 0,
  cameraPosition: [0, 0, 8],
  fovLandscape: 35,
  fovPortrait: 46,
  portraitAspectThreshold: 0.9,
  cameraNear: 0.1,
  cameraFar: 100,
}

export function getTiming() {
  const { fire, travel, impactOffset, swapOffset, endOffset } = INTRO_CONFIG.timing
  const impact = fire + travel
  return {
    fire,
    travel,
    impact,
    swap: impact + swapOffset,
    end: impact + endOffset,
  }
}
