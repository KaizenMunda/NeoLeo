import { useEffect, useRef } from 'react'
import { PerspectiveCamera } from '@react-three/drei'
import IntroController from './IntroController.jsx'
import LionModel from './LionModel.jsx'
import { INTRO_CONFIG } from './config.js'

export default function LionScene({ clockRef, modelHeightRef, skipIntro }) {
  const startedRef = useRef(false)

  useEffect(() => {
    if (!skipIntro && !startedRef.current) {
      clockRef.current.t0 = performance.now()
      startedRef.current = true
    }
  }, [clockRef, skipIntro])

  const cam = INTRO_CONFIG.camera

  return (
    <>
      <PerspectiveCamera
        makeDefault
        fov={cam.fov}
        near={cam.near}
        far={cam.far}
        position={cam.position}
        onUpdate={(self) => self.lookAt(0, cam.position[1] * 0.95, 0)}
      />
      <ambientLight intensity={0.85} />
      <directionalLight position={[2, 4, 3]} intensity={1.35} />
      <directionalLight position={[-3, 2, -2]} intensity={0.45} />
      <IntroController clockRef={clockRef} />
      <LionModel
        clockRef={clockRef}
        modelHeightRef={modelHeightRef}
        skipIntro={skipIntro}
      />
    </>
  )
}
