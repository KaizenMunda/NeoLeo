import { C } from './tokens'

export function Mono({ children, style, className }) {
  return (
    <span className={`pc-mono ${className || ''}`} style={style}>
      {children}
    </span>
  )
}

export function Leaf({ w = 90, fill = C.ochre, vein = 'rgba(255,255,255,0.5)' }) {
  return (
    <svg
      width={w}
      height={w * 2.1}
      viewBox="0 0 60 126"
      className="pc-leaf"
      aria-hidden="true"
    >
      <path d="M30 2 C52 30 58 74 30 124 C2 74 8 30 30 2 Z" fill={fill} />
      <path d="M30 8 L30 118" stroke={vein} strokeWidth="1.6" fill="none" />
      {Array.from({ length: 9 }, (_, i) => {
        const y = 20 + i * 10.5
        const s = 6 + Math.sin(i / 2) * 9
        return (
          <g key={i}>
            <path
              d={`M30 ${y} Q ${30 - s} ${y + 3} ${30 - s - 4} ${y + 11}`}
              stroke={vein}
              strokeWidth="1.1"
              fill="none"
            />
            <path
              d={`M30 ${y} Q ${30 + s} ${y + 3} ${30 + s + 4} ${y + 11}`}
              stroke={vein}
              strokeWidth="1.1"
              fill="none"
            />
          </g>
        )
      })}
    </svg>
  )
}

export function Medallion({ size = 104 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" className="pc-medallion" aria-hidden="true">
      <circle cx="60" cy="60" r="58" fill={C.ochre} />
      <circle cx="60" cy="60" r="58" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />
      <circle
        cx="60"
        cy="60"
        r="48"
        fill="none"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="1"
        strokeDasharray="2 5"
      />
      {Array.from({ length: 40 }, (_, i) => {
        const a = (i / 40) * Math.PI * 2
        return (
          <line
            key={i}
            x1={60 + Math.cos(a) * 16}
            y1={60 + Math.sin(a) * 16}
            x2={60 + Math.cos(a) * 42}
            y2={60 + Math.sin(a) * 42}
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="1"
            strokeLinecap="round"
          />
        )
      })}
      <circle cx="60" cy="60" r="15" fill={C.tan} stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />
      <circle cx="60" cy="60" r="7" fill="none" stroke={C.paper} strokeWidth="1.6" />
      <circle cx="60" cy="60" r="2.4" fill={C.paper} />
    </svg>
  )
}

export function Scallop({ color }) {
  return <div className="scallop" style={{ '--sc': color }} aria-hidden="true" />
}

export function ScallopTop({ color }) {
  return <div className="scallop-top" style={{ '--sc': color }} aria-hidden="true" />
}

export function Band({ eyebrow, title, intro, dark, children, style, className }) {
  return (
    <div className={`pc-band ${className || ''}`} style={style}>
      <div className="pc-band__header">
        <Mono style={{ color: dark ? 'rgba(243,232,208,0.65)' : C.inkDim }}>{eyebrow}</Mono>
        <h2 className={`pc-band__title ${dark ? 'pc-band__title--dark' : ''}`}>{title}</h2>
        {intro && (
          <p className={`pc-band__intro ${dark ? 'pc-band__intro--dark' : ''}`}>{intro}</p>
        )}
      </div>
      {children}
    </div>
  )
}
