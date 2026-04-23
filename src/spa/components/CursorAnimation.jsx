import { useEffect, useRef } from 'react'

export default function CursorAnimation() {
  const cursorOuterRef = useRef(null)
  const cursorInnerRef = useRef(null)
  const trailContainerRef = useRef(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const trails = useRef([])
  const animationIdRef = useRef(null)
  const isVisibleRef = useRef(false)

  useEffect(() => {
    const cursorOuter = cursorOuterRef.current
    const cursorInner = cursorInnerRef.current

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      isVisibleRef.current = true

      // Directly update cursor position without React re-render
      if (cursorOuter) {
        cursorOuter.style.opacity = '1'
      }
      if (cursorInner) {
        cursorInner.style.opacity = '1'
      }

      // Create trail particles
      if (Math.random() > 0.5) {
        trails.current.push({
          x: e.clientX,
          y: e.clientY,
          id: Math.random(),
          opacity: 1,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 1,
          element: null,
        })
      }

      // Limit trails array size
      if (trails.current.length > 30) {
        const removed = trails.current.shift()
        if (removed.element && removed.element.parentNode) {
          removed.element.parentNode.removeChild(removed.element)
        }
      }
    }

    const handleMouseLeave = () => {
      isVisibleRef.current = false
      if (cursorOuter) cursorOuter.style.opacity = '0'
      if (cursorInner) cursorInner.style.opacity = '0'
    }

    const handleMouseEnter = () => {
      isVisibleRef.current = true
      if (cursorOuter) cursorOuter.style.opacity = '1'
      if (cursorInner) cursorInner.style.opacity = '1'
    }

    // High-performance animation loop
    const animateTrails = () => {
      if (cursorOuter && mousePos.current) {
        cursorOuter.style.left = mousePos.current.x + 'px'
        cursorOuter.style.top = mousePos.current.y + 'px'
      }

      if (cursorInner && mousePos.current) {
        cursorInner.style.left = mousePos.current.x + 'px'
        cursorInner.style.top = mousePos.current.y + 'px'
      }

      // Update trails
      for (let i = trails.current.length - 1; i >= 0; i--) {
        const trail = trails.current[i]
        trail.opacity -= 0.05
        trail.x += trail.vx
        trail.y += trail.vy

        if (!trail.element) {
          trail.element = document.createElement('div')
          trail.element.className = 'cursor-trail'
          trailContainerRef.current?.appendChild(trail.element)
        }

        trail.element.style.left = trail.x + 'px'
        trail.element.style.top = trail.y + 'px'
        trail.element.style.opacity = (trail.opacity * 0.6).toString()

        if (trail.opacity <= 0) {
          if (trail.element && trail.element.parentNode) {
            trail.element.parentNode.removeChild(trail.element)
          }
          trails.current.splice(i, 1)
        }
      }

      animationIdRef.current = requestAnimationFrame(animateTrails)
    }

    animateTrails()

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mouseenter', handleMouseEnter)
      cancelAnimationFrame(animationIdRef.current)

      // Cleanup remaining trails
      trails.current.forEach((trail) => {
        if (trail.element && trail.element.parentNode) {
          trail.element.parentNode.removeChild(trail.element)
        }
      })
    }
  }, [])

  return (
    <>
      <div ref={trailContainerRef} className="cursor-trails-container" />
      <div ref={cursorOuterRef} className="custom-cursor-outer" />
      <div ref={cursorInnerRef} className="custom-cursor-inner" />

      {/* Hide default cursor */}
      <style>{`
        body {
          cursor: none !important;
        }

        * {
          cursor: none !important;
        }
      `}</style>
    </>
  )
}
