import { useEffect, useRef } from 'react'
import { beamApi } from './beamApi.js'
import { INTRO_CONFIG } from './config.js'

export default function BeamCanvas() {
  const canvasRef = useRef(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    function draw() {
      const w = window.innerWidth
      const h = window.innerHeight
      ctx.clearRect(0, 0, w, h)

      const logo = document.querySelector(INTRO_CONFIG.logoSelector)
      if (logo) {
        const rect = logo.getBoundingClientRect()
        beamApi.tx = rect.left + rect.width * 0.5
        beamApi.ty = rect.top + rect.height * 0.5
      }

      const power = beamApi.power
      if (beamApi.active && power > 0.02) {
        const { ox, oy, tx, ty } = beamApi
        const dx = tx - ox
        const dy = ty - oy
        const len = Math.hypot(dx, dy) || 1

        const grad = ctx.createLinearGradient(ox, oy, tx, ty)
        grad.addColorStop(0, `rgba(255, 255, 255, ${0.15 * power})`)
        grad.addColorStop(0.35, `rgba(255, 240, 200, ${0.55 * power})`)
        grad.addColorStop(0.75, `rgba(255, 255, 255, ${0.85 * power})`)
        grad.addColorStop(1, `rgba(255, 255, 255, ${INTRO_CONFIG.beam.maxAlpha * power})`)

        ctx.save()
        ctx.lineCap = 'round'
        ctx.strokeStyle = grad
        ctx.shadowColor = `rgba(255, 255, 255, ${0.75 * power})`
        ctx.shadowBlur = INTRO_CONFIG.beam.glowWidth * power

        ctx.lineWidth = INTRO_CONFIG.beam.glowWidth * power
        ctx.beginPath()
        ctx.moveTo(ox, oy)
        ctx.lineTo(tx, ty)
        ctx.stroke()

        ctx.shadowBlur = 4 * power
        ctx.lineWidth = INTRO_CONFIG.beam.coreWidth * (0.6 + power * 0.8)
        ctx.strokeStyle = `rgba(255, 255, 255, ${INTRO_CONFIG.beam.maxAlpha * power})`
        ctx.beginPath()
        ctx.moveTo(ox, oy)
        ctx.lineTo(tx, ty)
        ctx.stroke()

        ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * power})`
        ctx.beginPath()
        ctx.arc(tx, ty, 4 + 10 * power, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="lion-intro__beam"
      aria-hidden="true"
    />
  )
}
