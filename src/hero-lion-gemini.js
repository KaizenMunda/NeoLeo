/**
 * NeoLeo WebGL Lion Hero - Geometric constellation style
 * Crisp structural lines, bright focal points (eyes, nose), faint mane aura
 */
import * as THREE from 'three';

const COLOR_STRUCTURE = new THREE.Color('#1a3a5c');   // Dark blue - structural lines
const COLOR_FACE = new THREE.Color('#0d2847');       // Deeper blue - face outline
const COLOR_CYAN = new THREE.Color('#00f0ff');      // Bright cyan - nose glow
const COLOR_WHITE = new THREE.Color('#ffffff');      // Pure white - eyes

function generateLionGeometry() {
  const particleCount = 3500;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);

  let i = 0;

  const addParticle = (x, y, z, color, size, noise = 0.02) => {
    if (i >= particleCount) return;
    positions[i * 3] = x + (Math.random() - 0.5) * noise;
    positions[i * 3 + 1] = y + (Math.random() - 0.5) * noise;
    positions[i * 3 + 2] = z + (Math.random() - 0.5) * noise;
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
    sizes[i] = size;
    i++;
  };

  const addLine = (x1, y1, x2, y2, density, color, size, z = 0) => {
    for (let j = 0; j < density; j++) {
      const t = j / Math.max(density - 1, 1);
      addParticle(
        THREE.MathUtils.lerp(x1, x2, t),
        THREE.MathUtils.lerp(y1, y2, t),
        z,
        color,
        size,
        0.03
      );
    }
  };

  // Scale factor for our viewport (camera z=8)
  const s = 0.5;

  // === 1. MANE AURA - Very faint, sparse hexagonal/circular halo ===
  for (let j = 0; j < 600; j++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 2.2 + Math.pow(Math.random(), 2) * 2.8;
    const x = Math.cos(angle) * radius * s * 0.9;
    const y = Math.sin(angle) * radius * s * 1.0 + 0.3;
    const z = -0.3 - Math.random() * 0.4;
    addParticle(x, y, z, COLOR_STRUCTURE, 0.25, 0.15);
  }

  // === 2. STRUCTURAL LINES - Diamond chin, V brow, nose bridge ===
  // Diamond chin (sharp downward point)
  addLine(-0.6 * s, -0.5 * s, 0, -1.0 * s, 25, COLOR_STRUCTURE, 0.4);
  addLine(0.6 * s, -0.5 * s, 0, -1.0 * s, 25, COLOR_STRUCTURE, 0.4);
  addLine(-0.6 * s, -0.5 * s, 0.6 * s, -0.5 * s, 20, COLOR_STRUCTURE, 0.4);

  // V-shaped brow (connects above eyes)
  addLine(-0.5 * s, 0.5 * s, 0, 0.75 * s, 30, COLOR_STRUCTURE, 0.45);
  addLine(0.5 * s, 0.5 * s, 0, 0.75 * s, 30, COLOR_STRUCTURE, 0.45);

  // Vertical nose bridge (from nose to brow)
  addLine(0, -0.35 * s, 0, 0.75 * s, 35, COLOR_STRUCTURE, 0.45);

  // Jaw/cheek lines
  addLine(-0.6 * s, -0.5 * s, -0.85 * s, 0.1 * s, 25, COLOR_FACE, 0.35);
  addLine(0.6 * s, -0.5 * s, 0.85 * s, 0.1 * s, 25, COLOR_FACE, 0.35);

  // === 3. WHISKERS - 3-4 lines each side, horizontal-ish ===
  addLine(-0.25 * s, -0.35 * s, -0.95 * s, -0.2 * s, 18, COLOR_STRUCTURE, 0.3);
  addLine(-0.22 * s, -0.42 * s, -0.98 * s, -0.42 * s, 18, COLOR_STRUCTURE, 0.3);
  addLine(-0.2 * s, -0.48 * s, -0.9 * s, -0.55 * s, 18, COLOR_STRUCTURE, 0.3);
  addLine(0.25 * s, -0.35 * s, 0.95 * s, -0.2 * s, 18, COLOR_STRUCTURE, 0.3);
  addLine(0.22 * s, -0.42 * s, 0.98 * s, -0.42 * s, 18, COLOR_STRUCTURE, 0.3);
  addLine(0.2 * s, -0.48 * s, 0.9 * s, -0.55 * s, 18, COLOR_STRUCTURE, 0.3);

  // === 4. EYES - Dense, bright white clusters (primary focal points) ===
  for (let j = 0; j < 280; j++) {
    addParticle(-0.35 * s, 0.35 * s, 0.15, COLOR_WHITE, 2.8, 0.06);
    addParticle(0.35 * s, 0.35 * s, 0.15, COLOR_WHITE, 2.8, 0.06);
  }

  // === 5. NOSE - Bright cyan glowing point (secondary focal point) ===
  for (let j = 0; j < 220; j++) {
    addParticle(0, -0.35 * s, 0.2, COLOR_CYAN, 2.6, 0.05);
  }

  return { positions, colors, sizes, finalCount: i };
}

function createStructuralLines() {
  const s = 0.5;
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x1a3a5c,
    transparent: true,
    opacity: 0.5,
  });

  const lines = new THREE.Group();

  // Diamond chin
  const diamondPoints = [
    new THREE.Vector3(-0.6 * s, -0.5 * s, 0),
    new THREE.Vector3(0, -1.0 * s, 0.02),
    new THREE.Vector3(0.6 * s, -0.5 * s, 0),
    new THREE.Vector3(-0.6 * s, -0.5 * s, 0),
  ];
  const diamondGeo = new THREE.BufferGeometry().setFromPoints(diamondPoints);
  lines.add(new THREE.Line(diamondGeo, lineMaterial));

  // V brow
  const browPoints = [
    new THREE.Vector3(-0.5 * s, 0.5 * s, 0),
    new THREE.Vector3(0, 0.75 * s, 0.02),
    new THREE.Vector3(0.5 * s, 0.5 * s, 0),
  ];
  const browGeo = new THREE.BufferGeometry().setFromPoints(browPoints);
  lines.add(new THREE.Line(browGeo, lineMaterial));

  // Nose bridge
  const noseBridgePoints = [
    new THREE.Vector3(0, -0.35 * s, 0.2),
    new THREE.Vector3(0, 0.75 * s, 0.02),
  ];
  const noseBridgeGeo = new THREE.BufferGeometry().setFromPoints(noseBridgePoints);
  lines.add(new THREE.Line(noseBridgeGeo, lineMaterial));

  return lines;
}

function createSparkles(count = 200, scale = 10) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * scale * 2;
    positions[i * 3 + 1] = (Math.random() - 0.5) * scale * 2;
    positions[i * 3 + 2] = (Math.random() - 0.5) * scale - 2;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({
    color: 0x00f0ff,
    size: 0.08,
    transparent: true,
    opacity: 0.06,
    sizeAttenuation: true,
    depthWrite: false,
  });
  return new THREE.Points(geometry, material);
}

export function initHeroLion(container) {
  if (!container) return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.z = 8;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x02040a, 1);
  container.appendChild(renderer.domElement);

  scene.background = new THREE.Color(0x02040a);

  const { positions, colors, sizes, finalCount } = generateLionGeometry();

  const posArr = new Float32Array(positions.buffer, 0, finalCount * 3);
  const colArr = new Float32Array(colors.buffer, 0, finalCount * 3);
  const sizeArr = new Float32Array(sizes.buffer, 0, finalCount);

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
  geometry.setAttribute('aColor', new THREE.BufferAttribute(colArr, 3));
  geometry.setAttribute('aSize', new THREE.BufferAttribute(sizeArr, 1));

  const pointShaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector3(0, 0, 0) },
    },
    vertexShader: `
      uniform float uTime;
      uniform vec3 uMouse;
      attribute float aSize;
      attribute vec3 aColor;
      varying vec3 vColor;
      varying float vGlow;

      void main() {
        vColor = aColor;
        vec3 pos = position;

        float dist = distance(pos.xy, uMouse.xy * 8.0);
        if (dist < 2.5) {
          float force = (2.5 - dist) / 2.5;
          pos.z += force * 0.3;
          pos.x -= (uMouse.x * 8.0 - pos.x) * force * 0.04;
        }

        pos.y += sin(uTime * 1.2 + pos.x * 0.5) * 0.02;
        pos.z += cos(uTime * 0.8 + pos.y * 0.5) * 0.015;

        float brightness = (aColor.r + aColor.g + aColor.b) / 3.0;
        vGlow = smoothstep(0.3, 0.9, brightness);

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = aSize * (18.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      varying float vGlow;

      void main() {
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;

        float alpha = smoothstep(0.5, 0.0, dist);
        alpha *= mix(0.4, 1.0, vGlow);
        gl_FragColor = vec4(vColor, alpha);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const lionPoints = new THREE.Points(geometry, pointShaderMaterial);

  const mouse = new THREE.Vector2(0, 0);
  const mouseLerp = new THREE.Vector3(0, 0, 0);

  const group = new THREE.Group();
  group.add(lionPoints);

  const structuralLines = createStructuralLines();
  group.add(structuralLines);

  scene.add(group);

  const sparkles = createSparkles(200, 10);
  scene.add(sparkles);

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

    pointShaderMaterial.uniforms.uTime.value = t;
    mouseLerp.lerp(new THREE.Vector3(mouse.x, mouse.y, 0), 0.1);
    pointShaderMaterial.uniforms.uMouse.value.copy(mouseLerp);

    const viewport = { width: 4, height: 3 };
    const targetX = (mouse.x * viewport.width) / 20;
    const targetY = (mouse.y * viewport.height) / 20;

    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, mouse.x * 0.15, 0.05);
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, -mouse.y * 0.08, 0.05);
    group.position.x = THREE.MathUtils.lerp(group.position.x, targetX * 0.08, 0.05);
    group.position.y = THREE.MathUtils.lerp(group.position.y, targetY * 0.08, 0.05);

    group.rotation.y += Math.sin(t * 1.2) * 0.002;
    group.rotation.x += Math.cos(t * 1.2) * 0.001;
    group.position.y += Math.sin(t * 1.2) * 0.02;

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
