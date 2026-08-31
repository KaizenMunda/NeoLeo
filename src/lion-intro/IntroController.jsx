import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { INTRO_CONFIG } from './config.js'
import { markIntroPlayed, revealColourStage } from './introGate.js'

export default function IntroController({ clockRef }) {
  const revealedRef = useRef(false)
  const markedRef = useRef(false)

  useFrame(() => {
    if (!clockRef.current.t0) return
    const elapsed = performance.now() - clockRef.current.t0
    const { fireStart, fireDuration } = INTRO_CONFIG.phases

    if (!revealedRef.current && elapsed >= fireStart) {
      revealedRef.current = true
      revealColourStage()
    }

    if (!markedRef.current && elapsed >= fireStart + fireDuration + 400) {
      markedRef.current = true
      markIntroPlayed()
    }
  })

  return null
}
