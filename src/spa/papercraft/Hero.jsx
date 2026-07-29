import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { C, EASE } from './tokens'
import { Leaf, Medallion, Scallop } from './kit'
import { SectionLink } from './scrollTo'
import useReducedMotion from './useReducedMotion'
import LionViewer from './LionViewer'

const RING = [
  {
    a: 196,
    clear: -6,
    node: <Medallion size={96} />,
    k: 34,
    shadow: '0 20px 28px rgba(10,32,32,0.45)',
  },
  {
    a: 138,
    clear: 6,
    node: <Leaf w={42} fill={C.teal200} vein="rgba(47,90,92,0.35)" />,
    k: 30,
    spin: -34,
    cls: 'd3',
  },
  {
    a: 40,
    clear: 6,
    node: <Leaf w={36} fill={C.terra} />,
    k: 44,
    spin: 34,
    cls: '',
  },
  {
    a: 330,
    clear: 6,
    node: <Leaf w={32} fill={C.tan} />,
    k: 38,
    spin: 76,
    cls: 'd2',
  },
]

function Nav({ subpage = false }) {
  return (
    <nav className="pc-nav">
      <Link to="/" className="pc-nav__wordmark">
        NeoLeo
      </Link>
      <div className="pc-nav__actions">
        <div className="nav-links">
          {subpage ? (
            <>
              <Link to="/">Solutions</Link>
              <Link to="/">Case studies</Link>
              <Link to="/">Careers</Link>
              <Link to="/">Contact</Link>
            </>
          ) : (
            <>
              <SectionLink id="solutions">Solutions</SectionLink>
              <SectionLink id="case-studies">Case studies</SectionLink>
              <SectionLink id="approach">Approach</SectionLink>
              <SectionLink id="career">Careers</SectionLink>
              <SectionLink id="contact">Contact</SectionLink>
            </>
          )}
        </div>
        {subpage ? (
          <Link to="/" className="btn-ochre">
            Start a brief →
          </Link>
        ) : (
          <SectionLink id="contact" className="btn-ochre">
            Start a brief →
          </SectionLink>
        )}
      </div>
    </nav>
  )
}

function parallaxStyle(px, py, kx, ky, reduced) {
  if (reduced) return {}
  return {
    transform: `translate3d(${px * kx}px, ${py * ky}px, 0)`,
    transition: `transform ${kx === -10 ? 600 : 750}ms ${EASE}`,
  }
}

function LionStage({ px, py, reduced }) {
  const archRef = useRef(null)
  const [box, setBox] = useState({ w: 0, h: 0 })

  useLayoutEffect(() => {
    const el = archRef.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      setBox({ w: el.offsetWidth, h: el.offsetHeight })
    })
    ro.observe(el)
    setBox({ w: el.offsetWidth, h: el.offsetHeight })
    return () => ro.disconnect()
  }, [])

  const halfW = box.w / 2
  const halfH = box.h / 2
  const archParallax = parallaxStyle(px, py, -10, -7, reduced)

  return (
    <div className="pc-lion-stage">
      <div className="pc-lion-ring pc-parallax-layer" style={archParallax} />

      <div ref={archRef} className="pc-lion-arch pc-parallax-layer" style={archParallax}>
        <LionViewer
          reduced={reduced}
          parallaxStyle={
            reduced
              ? undefined
              : {
                  transform: `scale(1.08) translate3d(${px * 16}px, ${py * 12}px, 0)`,
                  transition: `transform 600ms ${EASE}`,
                }
          }
        />
        <div className="pc-lion-vignette" />
      </div>

      {box.w > 0 &&
        RING.map(({ a, clear, node, k, spin, cls, shadow }, i) => {
          const r = (a * Math.PI) / 180
          const cos = Math.cos(r)
          const sin = Math.sin(r)
          const t =
            Math.min(
              Math.abs(cos) < 1e-6 ? Infinity : halfW / Math.abs(cos),
              Math.abs(sin) < 1e-6 ? Infinity : halfH / Math.abs(sin),
            ) + clear

          return (
            <div
              key={i}
              className="pc-lion-deco pc-parallax-layer"
              style={{
                left: halfW + cos * t,
                top: halfH - sin * t,
                transform: reduced
                  ? 'translate(-50%, -50%)'
                  : `translate(-50%, -50%) translate3d(${px * k}px, ${py * (k * 0.7)}px, 0)`,
                transition: reduced ? undefined : `transform 750ms ${EASE}`,
                filter: shadow ? `drop-shadow(${shadow})` : undefined,
              }}
            >
              <div className={`drift ${cls || ''}`}>
                <div style={spin ? { transform: `rotate(${spin}deg)` } : undefined}>{node}</div>
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default function Hero() {
  const reduced = useReducedMotion()
  const [p, setP] = useState({ x: 0, y: 0 })

  const onMove = (e) => {
    if (reduced) return
    const r = e.currentTarget.getBoundingClientRect()
    setP({
      x: (e.clientX - r.left) / r.width - 0.5,
      y: (e.clientY - r.top) / r.height - 0.5,
    })
  }

  return (
    <section
      className="pc-hero"
      onMouseMove={onMove}
      onMouseLeave={() => setP({ x: 0, y: 0 })}
    >
      <div className="grain" aria-hidden="true" />
      <Nav />

      <div className="pc-hero__grid">
        <div className="pc-hero__copy">
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            Intelligent systems
          </span>

          <h1 className="pc-hero__title">
            Bold vision,
            <br />
            <span style={{ whiteSpace: 'nowrap' }}>
              <span className="cut-word">precise</span> execution.
            </span>
          </h1>

          <p className="pc-hero__lede">
            Elevate your business with advanced AI solutions. Intelligent systems and digital
            presence — built layer by layer, like the beast.
          </p>

          <div className="pc-hero__actions">
            <SectionLink id="solutions" className="btn-cream">
              See what we build <span style={{ opacity: 0.5 }}>↓</span>
            </SectionLink>
            <SectionLink id="case-studies" className="btn-ghost">
              View case studies
            </SectionLink>
          </div>
        </div>

        <LionStage px={p.x} py={p.y} reduced={reduced} />
      </div>

      <Scallop color={C.paper} />
    </section>
  )
}

export function PapercraftNav({ subpage = false }) {
  return <Nav subpage={subpage} />
}
