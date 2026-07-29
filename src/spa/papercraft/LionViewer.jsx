import { Suspense, useCallback, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Bounds, Center, OrbitControls, useGLTF } from '@react-three/drei'
import { LION_GLB, LION_SRC } from './tokens'

// Draco-compressed GLB (~4.6 MB vs ~63 MB original)
useGLTF.preload(LION_GLB, true)

function LionModel() {
  const { scene } = useGLTF(LION_GLB, true)
  return (
    <Center>
      <primitive object={scene} />
    </Center>
  )
}

function LionScene({ autoRotate, onLoaded }) {
  useEffect(() => {
    onLoaded()
  }, [onLoaded])

  return (
    <>
      <color attach="background" args={['#6FA09C']} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 5]} intensity={1.15} castShadow={false} />
      <directionalLight position={[-4, 2, -3]} intensity={0.35} />
      <hemisphereLight args={['#F3E8D0', '#2F5A5C', 0.35]} />
      <Bounds fit clip observe margin={1.12}>
        <LionModel />
      </Bounds>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={autoRotate}
        autoRotateSpeed={0.65}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.65}
        rotateSpeed={0.55}
      />
    </>
  )
}

function useWebGLAvailable() {
  const [available, setAvailable] = useState(null)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const ok = !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
      setAvailable(ok)
    } catch {
      setAvailable(false)
    }
  }, [])

  return available
}

export default function LionViewer({ reduced, parallaxStyle, className = '' }) {
  const webgl = useWebGLAvailable()
  const [modelReady, setModelReady] = useState(false)
  const onModelLoaded = useCallback(() => setModelReady(true), [])

  const use3d = webgl !== false && !reduced
  const useFallback = webgl === false || reduced

  return (
    <div
      className={`pc-lion-viewer ${modelReady && use3d ? 'pc-lion-viewer--ready' : ''} ${className}`.trim()}
      style={parallaxStyle}
      {...(modelReady && use3d
        ? { role: 'img', 'aria-label': 'NeoLeo — interactive 3D papercraft lion' }
        : {})}
    >
      {use3d && (
        <Canvas
          className="pc-lion-canvas"
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
          camera={{ fov: 42, near: 0.01, far: 100, position: [0, 0.05, 3.2] }}
        >
          <Suspense fallback={null}>
            <LionScene autoRotate={!reduced} onLoaded={onModelLoaded} />
          </Suspense>
        </Canvas>
      )}

      {useFallback && (
        <img
          src={LION_SRC}
          alt="NeoLeo — layered paper lion"
          className="pc-lion-img lion-float"
        />
      )}
    </div>
  )
}
