import { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import BeamCanvas from './BeamCanvas.jsx'
import LionScene from './LionScene.jsx'
import './lion-intro.css'

export default function LionIntro({ skipIntro = false }) {
  const clockRef = useRef({ t0: skipIntro ? null : null })
  const modelHeightRef = useRef(0)

  if (skipIntro) {
    return null
  }

  return (
    <div className="lion-intro">
      <BeamCanvas />
      <div className="lion-intro__gl">
        <Canvas
          dpr={[1, 2]}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance',
          }}
          camera={false}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0)
          }}
        >
          <Suspense fallback={null}>
            <LionScene
              clockRef={clockRef}
              modelHeightRef={modelHeightRef}
              skipIntro={skipIntro}
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  )
}
