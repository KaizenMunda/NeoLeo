import { useEffect, useRef } from 'react'
import { createFxState, resetFxState, tickFxFrame } from './fxEngine.js'
import { INTRO_CONFIG } from './config.js'
import './intro.css'

export default function IntroFxLayer({ apiRef, onComplete }) {
  const canvasRef = useRef(null)
  const stateRef = useRef(createFxState())
  const rafRef = useRef(0)
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const stage = document.querySelector(INTRO_CONFIG.stageSelector)
    const logoEl = document.querySelector(INTRO_CONFIG.logoSelector)

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = window.innerWidth
      const h = window.innerHeight
      sizeRef.current = { w, h, dpr }
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    function finish() {
      stateRef.current.running = false
      cancelAnimationFrame(rafRef.current)
      ctx.clearRect(0, 0, sizeRef.current.w, sizeRef.current.h)
      onComplete?.()
    }

    function callbacks() {
      return {
        onDetonate() {
          stage?.classList.add('intro-shake')
          window.setTimeout(() => stage?.classList.remove('intro-shake'), INTRO_CONFIG.detonate.shakeDurationMs)
        },
        onSwap() {
          stage?.classList.add('intro-swapping', 'state-b')
        },
      }
    }

    function frame(now) {
      const state = stateRef.current
      if (!state.running) return
      if (!state.start) state.start = now
      const elapsed = now - state.start
      const { w, h } = sizeRef.current

      const cont = tickFxFrame(ctx, state, elapsed, w, h, logoEl, callbacks())
      if (!cont) {
        finish()
        return
      }
      rafRef.current = requestAnimationFrame(frame)
    }

    function play() {
      cancelAnimationFrame(rafRef.current)
      resetFxState(stateRef.current)
      stateRef.current.running = true
      stateRef.current.start = 0
      stage?.classList.remove('intro-shake', 'intro-swapping', 'state-b')
      rafRef.current = requestAnimationFrame(frame)
    }

    function skip() {
      finish()
    }

    if (apiRef) {
      apiRef.current = { play, skip }
    }

    play()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafRef.current)
      stage?.classList.remove('intro-shake')
    }
  }, [apiRef, onComplete])

  return <canvas ref={canvasRef} className="intro-fx" aria-hidden="true" />
}
