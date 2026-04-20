import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Preload } from '@react-three/drei';
import * as THREE from 'three';

// ============================================================================
// ADVANCED LION PARTICLE GENERATION - Optimized for front-facing lion
// ============================================================================

function generateLionParticles() {
  const positions = [];
  const colors = [];
  const sizes = [];

  const colorPalette = [
    { r: 0.45, g: 0.88, b: 1.0 },
    { r: 0.2, g: 0.7, b: 1.0 },
    { r: 0.88, g: 0.99, b: 1.0 },
    { r: 0.3, g: 0.97, b: 1.0 },
    { r: 0.4, g: 0.8, b: 1.0 },
    { r: 0.65, g: 0.92, b: 1.0 },
  ];

  const addCluster = (cx, cy, cz, r, count, sizeRange = [0.02, 0.08], colorMult = 1.0) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * r;
      const elev = (Math.random() - 0.5) * r * 0.8;

      positions.push(cx + Math.cos(angle) * dist, cy + elev, cz + Math.sin(angle) * dist);

      const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors.push(c.r * colorMult, c.g * colorMult, c.b * colorMult);
      sizes.push(sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]));
    }
  };

  // ========================================================================
  // CORE HEAD - Large, dominant presence
  // ========================================================================
  addCluster(0, 0, 0, 0.65, 1500, [0.02, 0.12]);

  // ========================================================================
  // EYES - Piercing, intelligent focal points
  // ========================================================================
  addCluster(-0.32, 0.2, -0.72, 0.2, 350, [0.04, 0.15]);
  addCluster(0.32, 0.2, -0.72, 0.2, 350, [0.04, 0.15]);

  for (let i = 0; i < 200; i++) {
    positions.push(
      -0.32 + (Math.random() - 0.5) * 0.12,
      0.2 + (Math.random() - 0.5) * 0.12,
      -0.75
    );
    colors.push(0.98, 1.0, 1.0);
    sizes.push(0.06 + Math.random() * 0.09);
  }

  for (let i = 0; i < 200; i++) {
    positions.push(
      0.32 + (Math.random() - 0.5) * 0.12,
      0.2 + (Math.random() - 0.5) * 0.12,
      -0.75
    );
    colors.push(0.98, 1.0, 1.0);
    sizes.push(0.06 + Math.random() * 0.09);
  }

  // ========================================================================
  // EARS - Pointed, triangular
  // ========================================================================
  addCluster(-0.35, 0.6, -0.2, 0.12, 150, [0.015, 0.08]);
  addCluster(0.35, 0.6, -0.2, 0.12, 150, [0.015, 0.08]);

  for (let i = 0; i < 100; i++) {
    const spreadAngle = Math.random() * Math.PI * 2;
    const spreadDist = Math.random() * 0.1;
    positions.push(
      -0.35 + Math.cos(spreadAngle) * spreadDist,
      0.7 + Math.random() * 0.18,
      -0.25 + Math.sin(spreadAngle) * spreadDist
    );
    colors.push(0.25, 0.65, 1.0);
    sizes.push(0.018 + Math.random() * 0.05);
  }

  for (let i = 0; i < 100; i++) {
    const spreadAngle = Math.random() * Math.PI * 2;
    const spreadDist = Math.random() * 0.1;
    positions.push(
      0.35 + Math.cos(spreadAngle) * spreadDist,
      0.7 + Math.random() * 0.18,
      -0.25 + Math.sin(spreadAngle) * spreadDist
    );
    colors.push(0.25, 0.65, 1.0);
    sizes.push(0.018 + Math.random() * 0.05);
  }

  // ========================================================================
  // NOSE - Strong central feature
  // ========================================================================
  addCluster(0, -0.1, -0.75, 0.13, 220, [0.028, 0.11]);

  for (let i = 0; i < 100; i++) {
    positions.push(
      (Math.random() - 0.5) * 0.1,
      -0.15 + Math.random() * 0.08,
      -0.8 + Math.random() * 0.05
    );
    colors.push(0.85, 0.98, 1.0);
    sizes.push(0.03 + Math.random() * 0.06);
  }

  // ========================================================================
  // MOUTH & JAW - Powerful lower face
  // ========================================================================
  addCluster(-0.2, -0.3, -0.7, 0.13, 160, [0.02, 0.09]);
  addCluster(0.2, -0.3, -0.7, 0.13, 160, [0.02, 0.09]);
  addCluster(0, -0.37, -0.65, 0.15, 140, [0.02, 0.08]);

  for (let i = 0; i < 120; i++) {
    const jx = (Math.random() - 0.5) * 0.45;
    const jy = -0.34 + Math.random() * 0.1;
    const jz = -0.62 + Math.random() * 0.1;
    positions.push(jx, jy, jz);
    colors.push(0.3, 0.85, 1.0);
    sizes.push(0.016 + Math.random() * 0.045);
  }

  // ========================================================================
  // MANE - Voluminous and majestic - the signature feature
  // ========================================================================

  for (let i = 0; i < 1200; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 0.38 + Math.random() * 0.62;
    const vertSpread = 0.28 + Math.random() * 0.85;

    positions.push(
      Math.cos(angle) * radius,
      0.4 + vertSpread,
      Math.sin(angle) * radius - 0.2
    );

    const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    const intensity = 0.65 + Math.random() * 0.35;
    colors.push(c.r * intensity, c.g * intensity, c.b * intensity);
    sizes.push(0.01 + Math.random() * 0.07);
  }

  for (let i = 0; i < 1000; i++) {
    const side = Math.random() > 0.5 ? 1 : -1;
    const angVar = Math.random() * 1.0;
    const radius = 0.28 + Math.random() * 0.58;

    positions.push(
      side * (0.5 + Math.random() * 0.4),
      (Math.random() - 0.5) * 0.9,
      Math.sin(angVar) * radius - 0.3
    );

    const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    const intensity = 0.6 + Math.random() * 0.4;
    colors.push(c.r * intensity, c.g * intensity, c.b * intensity);
    sizes.push(0.015 + Math.random() * 0.065);
  }

  for (let i = 0; i < 700; i++) {
    const angle = Math.random() * Math.PI;
    const radius = 0.22 + Math.random() * 0.48;

    positions.push(
      Math.cos(angle + Math.PI) * radius,
      (Math.random() - 0.5) * 0.65,
      Math.sin(angle) * radius - 0.4
    );

    const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    const intensity = 0.63 + Math.random() * 0.37;
    colors.push(c.r * intensity, c.g * intensity, c.b * intensity);
    sizes.push(0.012 + Math.random() * 0.062);
  }

  for (let i = 0; i < 600; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 0.3 + Math.random() * 0.55;

    positions.push(
      Math.cos(angle) * radius,
      (Math.random() - 0.5) * 0.75,
      Math.sin(angle) * radius + 0.4
    );

    const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    const intensity = 0.55 + Math.random() * 0.35;
    colors.push(c.r * intensity, c.g * intensity, c.b * intensity);
    sizes.push(0.01 + Math.random() * 0.056);
  }

  // ========================================================================
  // WHISKERS - Fine, dramatic details
  // ========================================================================
  const whiskerCount = 12;
  for (let p = 0; p < whiskerCount; p++) {
    const angle = (p / whiskerCount) * Math.PI * 2;
    const startY = -0.1 + Math.random() * 0.15;

    for (let j = 0; j < 28; j++) {
      const t = j / 28;
      const curveAmount = Math.sin(t * Math.PI) * 0.12;

      positions.push(
        Math.cos(angle) * (0.22 + t * 0.52) + curveAmount * (Math.random() - 0.5),
        startY + (Math.random() - 0.5) * 0.07 + curveAmount,
        -0.7 + t * 0.22
      );
      colors.push(0.7, 0.97, 1.0);
      sizes.push(0.013 + Math.random() * 0.009);
    }
  }

  // ========================================================================
  // NECK/CHEST - Strong foundation
  // ========================================================================
  addCluster(0, -0.52, 0.25, 0.4, 450, [0.016, 0.085]);

  // ========================================================================
  // ATMOSPHERIC PARTICLES - Subtle surrounding presence
  // ========================================================================
  for (let i = 0; i < 400; i++) {
    const angle = Math.random() * Math.PI * 2;
    const distance = 1.8 + Math.random() * 1.5;
    const elev = (Math.random() - 0.5) * 2.5;

    positions.push(
      Math.cos(angle) * distance,
      elev,
      Math.sin(angle) * distance - 0.4
    );

    const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    colors.push(c.r * 0.22, c.g * 0.22, c.b * 0.32);
    sizes.push(0.004 + Math.random() * 0.018);
  }

  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
    sizes: new Float32Array(sizes),
  };
}

// ============================================================================
// GLOWING LINE CONTOURS - Eye outlines
// ============================================================================

function GlowingLineStructure({ reducedMotion = false }) {
  const lineRef = useRef();
  const timeRef = useRef(0);

  useFrame(() => {
    timeRef.current += reducedMotion ? 0.0001 : 0.0003;
    if (lineRef.current?.material) {
      lineRef.current.material.opacity = 0.2 + (reducedMotion ? 0.05 : Math.sin(timeRef.current * 1.5) * 0.12);
    }
  });

  const lineGeometry = useMemo(() => {
    const points = [];

    for (let i = 0; i < 36; i++) {
      const angle = (i / 36) * Math.PI * 2;
      points.push(new THREE.Vector3(-0.32 + Math.cos(angle) * 0.2, 0.2 + Math.sin(angle) * 0.16, -0.72));
    }
    points.push(points[0]);

    for (let i = 0; i < 36; i++) {
      const angle = (i / 36) * Math.PI * 2;
      points.push(new THREE.Vector3(0.32 + Math.cos(angle) * 0.2, 0.2 + Math.sin(angle) * 0.16, -0.72));
    }
    points.push(points[36]);

    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  return (
    <line ref={lineRef} geometry={lineGeometry}>
      <lineBasicMaterial color={0x55eeff} linewidth={2} transparent opacity={0.3} />
    </line>
  );
}

// ============================================================================
// INTERACTIVE LION - Animation with presence and character
// ============================================================================

function InteractiveLion({ mousePos, reducedMotion = false }) {
  const pointsRef = useRef();
  const timeRef = useRef(0);
  const particleData = useMemo(() => generateLionParticles(), []);
  const positionArray = useMemo(() => new Float32Array(particleData.positions), [particleData]);
  const colorArray = useMemo(() => new Float32Array(particleData.colors), [particleData]);
  const originPositions = useMemo(() => new Float32Array(positionArray), [positionArray]);

  useFrame(() => {
    if (!pointsRef.current) return;

    timeRef.current += 0.004;
    const t = timeRef.current;

    const positions = pointsRef.current.geometry.attributes.position.array;
    const count = positions.length / 3;

    const motionScale = reducedMotion ? 0.2 : 1;
    const headTiltX = Math.sin(t * 0.18) * 0.08 * motionScale;
    const headTiltY = Math.cos(t * 0.14) * 0.1 * motionScale;

    for (let i = 0; i < count; i++) {
      let ox = originPositions[i * 3];
      let oy = originPositions[i * 3 + 1];
      let oz = originPositions[i * 3 + 2];

      let rx = ox;
      let ry = oy * Math.cos(headTiltX) - oz * Math.sin(headTiltX);
      let rz = oy * Math.sin(headTiltX) + oz * Math.cos(headTiltX);

      let rx2 = rx * Math.cos(headTiltY) + rz * Math.sin(headTiltY);
      let ry2 = ry;
      let rz2 = -rx * Math.sin(headTiltY) + rz * Math.cos(headTiltY);

      const breathe = Math.sin(t * 0.6 + i * 0.006) * 0.045 * motionScale;
      const floatX = Math.sin(t * 0.22 + i * 0.0018) * 0.02 * motionScale;
      const floatY = Math.cos(t * 0.18 + i * 0.0015) * 0.032 * motionScale;
      const floatZ = Math.sin(t * 0.28 + i * 0.0022) * 0.018 * motionScale;

      let finalX = rx2 + floatX;
      let finalY = ry2 + floatY + breathe;
      let finalZ = rz2 + floatZ;

      const cursorScale = reducedMotion ? 0 : 1;
      const dist = Math.hypot(ox - mousePos.x * 0.7 * cursorScale, oy - mousePos.y * 0.7 * cursorScale);
      if (dist < 1.1 && cursorScale > 0) {
        const influence = (1.1 - dist) / 1.1;
        const dirX = ox - mousePos.x * 0.7;
        const dirY = oy - mousePos.y * 0.7;
        const len = Math.hypot(dirX, dirY) || 1;

        const pushForce = influence * 0.18 * cursorScale;
        finalX += (dirX / len) * pushForce;
        finalY += (dirY / len) * pushForce;
      }

      positions[i * 3] = finalX;
      positions[i * 3 + 1] = finalY;
      positions[i * 3 + 2] = finalZ;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={pointsRef} positions={positionArray} colors={colorArray} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={0xffffff}
        size={0.18}
        sizeAttenuation
        vertexColors
      />
    </Points>
  );
}

// ============================================================================
// SCENE CONTENT
// ============================================================================

function SceneContent({ mousePos, reducedMotion }) {
  const { camera, size } = useThree();

  useEffect(() => {
    camera.position.z = 3.5;
    camera.fov = 45;
  }, [camera]);

  useEffect(() => {
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();
  }, [camera, size.width, size.height]);

  return (
    <>
      <color attach="background" args={['#080d22']} />
      <directionalLight position={[7, 7, 6]} intensity={1.0} color="#ffffff" />
      <directionalLight position={[-7, -5, -6]} intensity={0.35} color="#0088ff" />
      <ambientLight intensity={0.25} color="#000d22" />

      <InteractiveLion mousePos={mousePos} reducedMotion={reducedMotion} />
      <GlowingLineStructure reducedMotion={reducedMotion} />

      <Preload all />
    </>
  );
}

// ============================================================================
// MAIN HERO COMPONENT - Optimized layout
// ============================================================================

export default function NeoLeoHero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const lastPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const x = (e.clientX - rect.left - centerX) / centerX;
      const y = (e.clientY - rect.top - centerY) / centerY;
      lastPosRef.current = { x, y };

      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        setMousePos(lastPosRef.current);
        rafRef.current = null;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[420px] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden rounded-2xl"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-slate-900/60 opacity-40" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(0, 153, 255, 0.05) 25%, rgba(0, 153, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 153, 255, 0.05) 75%, rgba(0, 153, 255, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 153, 255, 0.05) 25%, rgba(0, 153, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 153, 255, 0.05) 75%, rgba(0, 153, 255, 0.05) 76%, transparent 77%, transparent)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div
        className="absolute inset-0 rounded-2xl overflow-hidden transition-opacity duration-700 ease-out"
        style={{
          width: '100%',
          height: '100%',
          opacity: isReady ? 1 : 0,
        }}
        aria-hidden="true"
      >
        <Canvas
          className="rounded-2xl"
          style={{ width: '100%', height: '100%', display: 'block' }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true,
          }}
          dpr={Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)}
        >
          <SceneContent mousePos={mousePos} reducedMotion={reducedMotion} />
        </Canvas>
      </div>

      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          border: '1px solid rgba(102, 255, 255, 0.2)',
          boxShadow: 'inset 0 0 40px rgba(102, 255, 255, 0.05), 0 0 20px rgba(102, 255, 255, 0.1)',
        }}
      />
    </div>
  );
}
