import * as THREE from 'three'

// Small animated shaders for the parts of the room that can't be baked:
// coffee steam, the waterfall sheet and the ripple in its basin.

const NOISE = /* glsl */ `
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
  float vnoise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 4; i++) { v += a * vnoise(p); p *= 2.03; a *= 0.5; }
    return v;
  }
`

const BASIC_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

export function makeSteamMaterial(seed = 0) {
  return new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uSeed: { value: seed } },
    vertexShader: /* glsl */ `
      uniform float uTime;
      uniform float uSeed;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec3 p = position;
        p.x += sin(uTime * 1.3 + uv.y * 6.0 + uSeed) * 0.012 * uv.y;
        p.z += cos(uTime * 1.1 + uv.y * 5.0 + uSeed) * 0.010 * uv.y;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }
    `,
    fragmentShader: NOISE + /* glsl */ `
      uniform float uTime;
      uniform float uSeed;
      varying vec2 vUv;
      void main() {
        float n = fbm(vec2(vUv.x * 2.2 + uSeed, vUv.y * 2.5 - uTime * 0.45));
        float a = smoothstep(0.42, 0.78, n)
                * (1.0 - vUv.y)
                * sin(3.14159 * vUv.x)
                * smoothstep(0.0, 0.08, vUv.y) * 0.7;
        gl_FragColor = vec4(vec3(0.95), a);
      }
    `,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
  })
}

export function makeWaterSheetMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: BASIC_VERT,
    fragmentShader: NOISE + /* glsl */ `
      uniform float uTime;
      varying vec2 vUv;
      void main() {
        vec2 q = vec2(vUv.x * 38.0, vUv.y * 2.2 + uTime * 1.6);   // flows downward
        float n = fbm(q);
        float n2 = fbm(q * vec2(0.5, 1.7) + 7.3);
        float streak = smoothstep(0.45, 0.85, n * 0.65 + n2 * 0.45);
        vec3 deep = vec3(0.0, 0.10, 0.11);
        vec3 mid = vec3(0.02, 0.30, 0.31);
        vec3 foam = vec3(0.75, 0.95, 0.93);
        vec3 col = mix(deep, mid, n2);
        col = mix(col, foam, streak * 0.75);
        col += vec3(0.9, 0.6, 0.2) * smoothstep(0.93, 1.0, vUv.y) * 0.6;   // amber light at the lip
        gl_FragColor = vec4(col, 0.9);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
  })
}

export function makeBasinMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: BASIC_VERT,
    fragmentShader: NOISE + /* glsl */ `
      uniform float uTime;
      varying vec2 vUv;
      void main() {
        vec2 c = vUv - 0.5;
        c.y *= 3.0;
        float d = length(c);
        float r = sin(d * 45.0 - uTime * 3.5) * 0.5 + 0.5;
        float n = fbm(vUv * 12.0 + uTime * 0.3);
        vec3 col = mix(vec3(0.0, 0.07, 0.08), vec3(0.15, 0.45, 0.45), r * 0.35 + n * 0.25);
        gl_FragColor = vec4(col, 0.92);
      }
    `,
    transparent: true,
  })
}
