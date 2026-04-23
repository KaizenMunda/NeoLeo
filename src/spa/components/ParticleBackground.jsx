import { useEffect, useRef } from 'react'

export default function ParticleBackground({ density = 50, color = 'rgba(201, 169, 97, 0.5)' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.radius = Math.random() * 3 + 2
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.opacity = Math.random() * 0.4 + 0.8  // 0.8 - 1.0 opacity
        this.life = Math.random() * 100 + 50
        this.maxLife = this.life
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.life -= 0.3

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width
        if (this.x > canvas.width) this.x = 0
        if (this.y < 0) this.y = canvas.height
        if (this.y > canvas.height) this.y = 0

        // Fade out
        this.opacity = (this.life / this.maxLife) * (Math.random() * 0.5 + 0.3)
      }

      draw(context) {
        // Extract RGB values and apply custom opacity
        const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
        let fillStyle = color
        if (rgbMatch && rgbMatch.length >= 4) {
          const r = rgbMatch[1]
          const g = rgbMatch[2]
          const b = rgbMatch[3]
          fillStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity})`
        }
        context.fillStyle = fillStyle
        context.beginPath()
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        context.fill()
      }
    }

    // Initialize particles
    let particles = []
    for (let i = 0; i < density; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles = particles.filter(p => p.life > 0)

      particles.forEach(particle => {
        particle.update()
        particle.draw(ctx)
      })

      // Add new particles to maintain density
      if (particles.length < density) {
        for (let i = 0; i < density - particles.length; i++) {
          particles.push(new Particle())
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [density, color])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 999,
      }}
    />
  )
}
