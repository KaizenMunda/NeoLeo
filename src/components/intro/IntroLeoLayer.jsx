import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import IntroLeoScene from './IntroLeoScene.jsx'

export default function IntroLeoLayer({ leoApiRef, tunerOpen }) {
  return (
    <div className="intro-gl">
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
          gl.toneMapping = THREE.NoToneMapping
        }}
      >
        <Suspense fallback={null}>
          <IntroLeoScene leoApiRef={leoApiRef} tunerOpen={tunerOpen} />
        </Suspense>
      </Canvas>
    </div>
  )
}
