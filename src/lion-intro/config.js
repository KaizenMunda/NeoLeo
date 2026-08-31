/** Lion intro — timings (ms), layout, tunables. */
export const INTRO_CONFIG = {
  modelUrl: '/leo.glb',
  modelHeight: 2.35,
  /** Local muzzle offset on normalized model (tune after load). */
  muzzleOffset: { x: 0, y: 1.55, z: 0.42 },
  /** Y rotation so lion faces the logo (top-left). */
  modelRotationY: Math.PI * 0.72,

  phases: {
    entranceStart: 500,
    entranceDuration: 620,
    chargeStart: 1150,
    chargeDuration: 900,
    fireStart: 2500,
    fireDuration: 320,
  },

  idle: {
    bobAmplitude: 0.04,
    bobFrequency: 0.0022,
    swayAmplitude: 0.02,
    swayFrequency: 0.00145,
    swayPhase: 1.2,
  },

  charge: {
    leanX: 0.18,
    leanZ: 0.12,
    pitchX: 0.14,
    yawY: 0.1,
  },

  fire: {
    recoilX: 0.1,
    recoilZ: 0.16,
    rotZ: 0.07,
    rotX: 0.09,
  },

  camera: {
    fov: 42,
    position: [0, 1.15, 2.85],
    near: 0.05,
    far: 100,
  },

  beam: {
    coreWidth: 3,
    glowWidth: 18,
    maxAlpha: 0.92,
  },

  sessionKey: 'neoleo.intro.v1',
  logoSelector: '#logo',
  stageSelector: '#live-root',
}
