/**
 * NeoLeo WebGL Lion Hero - Vanilla Three.js port
 * Cursor-reactive particle lion with additive glow
 */
import * as THREE from 'three';

function generateLionPoints() {
  const pts = [];

  const addEllipse = (cx, cy, rx, ry, count, start = 0, end = Math.PI * 2) => {
    for (let i = 0; i < count; i++) {
      const t = start + ((end - start) * i) / Math.max(count - 1, 1);
      pts.push(new THREE.Vector3(cx + Math.cos(t) * rx, cy + Math.sin(t) * ry, 0));
    }
  };

  const addLine = (x1, y1, x2, y2, count) => {
    for (let i = 0; i < count; i++) {
      const t = i / Math.max(count - 1, 1);
      pts.push(new THREE.Vector3(THREE.MathUtils.lerp(x1, x2, t), THREE.MathUtils.lerp(y1, y2, t), 0));
    }
  };

  // === MANE (dominant feature - multiple dense layers) ===
  // Outer mane - full dramatic arc
  addEllipse(0, 0.1, 1.7, 1.5, 48, Math.PI * 0.08, Math.PI * 0.92);
  addEllipse(0, 0.1, 1.55, 1.38, 44, Math.PI * 0.1, Math.PI * 0.9);
  addEllipse(0, 0.08, 1.4, 1.25, 40, Math.PI * 0.12, Math.PI * 0.88);
  addEllipse(0, 0.05, 1.25, 1.12, 36, Math.PI * 0.15, Math.PI * 0.85);
  addEllipse(0, 0.02, 1.12, 1.0, 32, Math.PI * 0.18, Math.PI * 0.82);
  // Mane "tufts" - radiating strands on sides
  addEllipse(0, 0.15, 1.35, 1.2, 24, Math.PI * 0.25, Math.PI * 0.75);
  addEllipse(0, 0.2, 1.2, 1.05, 20, Math.PI * 0.3, Math.PI * 0.7);

  // === FACE (organic oval, tapered muzzle) ===
  addEllipse(0, -0.05, 0.78, 0.88, 36);
  addEllipse(0, -0.02, 0.65, 0.72, 28);

  // === EARS (rounded triangles, prominent) ===
  addEllipse(-0.58, 1.0, 0.26, 0.24, 20);
  addEllipse(0.58, 1.0, 0.26, 0.24, 20);
  addEllipse(-0.58, 1.02, 0.14, 0.12, 12);
  addEllipse(0.58, 1.02, 0.14, 0.12, 12);

  // === EYES (larger, almond-shaped) ===
  addEllipse(-0.3, 0.15, 0.22, 0.1, 16, Math.PI * 0.1, Math.PI * 0.9);
  addEllipse(0.3, 0.15, 0.22, 0.1, 16, Math.PI * 0.1, Math.PI * 0.9);
  addEllipse(-0.3, 0.15, 0.12, 0.05, 8);
  addEllipse(0.3, 0.15, 0.12, 0.05, 8);

  // === NOSE (wider, more defined) ===
  addLine(-0.14, -0.08, 0, -0.22, 10);
  addLine(0, -0.22, 0.14, -0.08, 10);
  addLine(-0.14, -0.08, 0.14, -0.08, 10);
  addEllipse(0, -0.15, 0.08, 0.06, 12);

  // === MOUTH & JAW ===
  addLine(0, -0.22, -0.2, -0.4, 12);
  addLine(0, -0.22, 0.2, -0.4, 12);
  addLine(-0.2, -0.4, 0.2, -0.4, 10);
  addLine(-0.52, -0.38, -0.2, -0.58, 12);
  addLine(0.52, -0.38, 0.2, -0.58, 12);
  addLine(-0.2, -0.58, 0.2, -0.58, 10);

  // === WHISKERS (more visible, curved) ===
  addLine(-0.12, -0.14, -0.78, -0.02, 10);
  addLine(-0.1, -0.2, -0.8, -0.2, 10);
  addLine(-0.08, -0.26, -0.75, -0.38, 10);
  addLine(0.12, -0.14, 0.78, -0.02, 10);
  addLine(0.1, -0.2, 0.8, -0.2, 10);
  addLine(0.08, -0.26, 0.75, -0.38, 10);

  return pts;
}

function createLionParticles(scene, mouse, viewport) {
  const points = generateLionPoints();

  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(points.length * 3);
  const scales = new Float32Array(points.length);

  points.forEach((p, i) => {
    positions[i * 3] = p.x;
    positions[i * 3 + 1] = p.y;
    positions[i * 3 + 2] = p.z + (Math.random() - 0.5) * 0.06;
    scales[i] = 1.0 + Math.random() * 2.0;
  });

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));

  const shaderMaterial = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
    },
    vertexShader: `
      attribute float aScale;
      uniform float uTime;
      uniform vec2 uPointer;
      varying float vPulse;
      void main() {
        vec3 p = position;
        float distToPointer = distance(p.xy, uPointer * 1.2);
        float influence = 0.18 / (0.18 + distToPointer * 2.5);
        p.z += sin(uTime * 1.8 + p.x * 3.0 + p.y * 2.5) * 0.05;
        p.xy += normalize(vec2(p.x + 0.0001, p.y + 0.0001)) * influence * 0.06;
        vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        gl_PointSize = (10.0 + aScale * 4.0 + influence * 22.0) * (1.0 / -mvPosition.z);
        vPulse = 0.55 + 0.45 * sin(uTime * 2.2 + aScale * 3.14);
      }
    `,
    fragmentShader: `
      varying float vPulse;
      void main() {
        vec2 uv = gl_PointCoord - 0.5;
        float d = length(uv);
        float alpha = smoothstep(0.5, 0.0, d);
        vec3 core = vec3(0.9, 0.95, 1.0);
        vec3 glow = vec3(0.4, 0.7, 1.0);
        vec3 color = mix(glow, core, 0.5 + 0.5 * vPulse);
        gl_FragColor = vec4(color, alpha * (0.7 + 0.3 * vPulse));
      }
    `,
  });

  const pointsMesh = new THREE.Points(geometry, shaderMaterial);
  pointsMesh.scale.setScalar(1.6);

  // Outline lines - lion silhouette (mane + face)
  const outerLinePoints = [
    new THREE.Vector3(-1.15, 1.12, -0.03),   // left ear top
    new THREE.Vector3(-1.55, 0.75, -0.02),   // top-left mane
    new THREE.Vector3(-1.6, 0.2, -0.01),     // left mane
    new THREE.Vector3(-1.45, -0.35, 0),      // left cheek
    new THREE.Vector3(-1.1, -0.75, 0.01),    // left jaw
    new THREE.Vector3(-0.5, -0.95, 0.01),    // left chin
    new THREE.Vector3(0, -0.85, 0.02),       // center chin
    new THREE.Vector3(0.5, -0.95, 0.01),    // right chin
    new THREE.Vector3(1.1, -0.75, 0.01),    // right jaw
    new THREE.Vector3(1.45, -0.35, 0),      // right cheek
    new THREE.Vector3(1.6, 0.2, -0.01),      // right mane
    new THREE.Vector3(1.55, 0.75, -0.02),    // top-right mane
    new THREE.Vector3(1.15, 1.12, -0.03),   // right ear top
  ];

  const innerLinePoints = [
    new THREE.Vector3(-0.82, 0.28, 0),      // left brow
    new THREE.Vector3(-0.5, 0.2, 0.02),
    new THREE.Vector3(0, -0.12, 0.03),       // nose bridge
    new THREE.Vector3(0.5, 0.2, 0.02),
    new THREE.Vector3(0.82, 0.28, 0),       // right brow
  ];

  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x99ccff,
    transparent: true,
    opacity: 0.75,
  });

  const innerLineMaterial = new THREE.LineBasicMaterial({
    color: 0xcceeff,
    transparent: true,
    opacity: 0.65,
  });

  const outerLineGeo = new THREE.BufferGeometry().setFromPoints(outerLinePoints);
  const innerLineGeo = new THREE.BufferGeometry().setFromPoints(innerLinePoints);

  // Mane arc - traces the dramatic top of the mane
  const maneArcPoints = [];
  for (let i = 0; i <= 24; i++) {
    const t = Math.PI * 0.15 + (Math.PI * 0.7 * i) / 24;
    maneArcPoints.push(new THREE.Vector3(
      Math.cos(t) * 1.5,
      0.15 + Math.sin(t) * 1.35,
      -0.02
    ));
  }
  const maneArcGeo = new THREE.BufferGeometry().setFromPoints(maneArcPoints);
  const maneLineMaterial = new THREE.LineBasicMaterial({
    color: 0xaaddff,
    transparent: true,
    opacity: 0.6,
  });

  const outerLine = new THREE.Line(outerLineGeo, lineMaterial);
  const innerLine = new THREE.Line(innerLineGeo, innerLineMaterial);
  const maneArc = new THREE.Line(maneArcGeo, maneLineMaterial);

  const group = new THREE.Group();
  group.add(pointsMesh);
  group.add(outerLine);
  group.add(maneArc);
  group.add(innerLine);

  return { group, shaderMaterial, geometry };
}

function createBackgroundField(scene) {
  const count = 180;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 5;
    positions[i * 3 + 2] = -1.4 - Math.random() * 2.6;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    transparent: true,
    opacity: 0.35,
    size: 0.03,
    sizeAttenuation: true,
    color: 0x7cc5ff,
    depthWrite: false,
  });

  return new THREE.Points(geometry, material);
}

export function initHeroLion(container) {
  if (!container) return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
  camera.position.z = 4.4;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x04060d, 1);
  container.appendChild(renderer.domElement);

  scene.background = new THREE.Color(0x04060d);
  scene.fog = new THREE.Fog(0x04060d, 4.8, 8);

  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(0, 1, 2);
  scene.add(dirLight);

  const mouse = new THREE.Vector2(0, 0);
  const viewport = { width: 4, height: 3 };

  const { group: lionGroup, shaderMaterial } = createLionParticles(scene, mouse, viewport);
  scene.add(lionGroup);

  const bgField = createBackgroundField(scene);
  scene.add(bgField);

  function onMouseMove(e) {
    const rect = container.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  }

  container.addEventListener('mousemove', onMouseMove);

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    shaderMaterial.uniforms.uTime.value = t;
    shaderMaterial.uniforms.uPointer.value.set(
      (mouse.x * viewport.width) / 4,
      (mouse.y * viewport.height) / 4
    );

    lionGroup.rotation.y = THREE.MathUtils.lerp(lionGroup.rotation.y, mouse.x * 0.35, 0.06);
    lionGroup.rotation.x = THREE.MathUtils.lerp(lionGroup.rotation.x, -mouse.y * 0.18, 0.06);
    lionGroup.position.x = THREE.MathUtils.lerp(lionGroup.position.x, mouse.x * 0.12, 0.05);
    lionGroup.position.y = THREE.MathUtils.lerp(lionGroup.position.y, mouse.y * 0.08, 0.05);

    lionGroup.rotation.y += Math.sin(t * 1.25) * 0.002;
    lionGroup.rotation.x += Math.cos(t * 1.25) * 0.001;
    lionGroup.position.y += Math.sin(t * 1.25) * 0.018;

    bgField.rotation.z = Math.sin(t * 0.12) * 0.08;

    renderer.render(scene, camera);
  }

  animate();

  function onResize() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  window.addEventListener('resize', onResize);

  return () => {
    container.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('resize', onResize);
    renderer.dispose();
    container.removeChild(renderer.domElement);
  };
}
