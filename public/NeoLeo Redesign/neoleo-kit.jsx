// Shared papercraft kit — palette + cut-paper atoms.
const C = {
  teal900: '#2F5A5C', teal700: '#4A7E7D', teal500: '#6FA09C', teal200: '#A9CAC4',
  cream: '#F3E8D0', paper: '#FBF4E4', ochre: '#D9963F', tan: '#C0813F', terra: '#A65E38',
  ink: '#33251A', inkDim: 'rgba(51,37,26,0.78)',
};

const LION_SRC = 'uploads/Makaville_lion_expressive_face_look_strong_eyebrow_big_eyes_s_186fb649-3514-4d72-a824-632bd1cddf80_0.png';

const Mono = ({ children, style }) => (
  <span style={{ fontFamily: '"Geist Mono", ui-monospace, monospace', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', ...style }}>{children}</span>
);

const Leaf = ({ w = 90, fill = C.ochre, vein = 'rgba(255,255,255,0.5)' }) => (
  <svg width={w} height={w * 2.1} viewBox="0 0 60 126" style={{ display: 'block', filter: 'drop-shadow(0 10px 16px rgba(24,52,52,0.28))' }}>
    <path d="M30 2 C52 30 58 74 30 124 C2 74 8 30 30 2 Z" fill={fill} />
    <path d="M30 8 L30 118" stroke={vein} strokeWidth="1.6" fill="none" />
    {Array.from({ length: 9 }, (_, i) => {
      const y = 20 + i * 10.5, s = 6 + Math.sin(i / 2) * 9;
      return <g key={i}>
        <path d={`M30 ${y} Q ${30 - s} ${y + 3} ${30 - s - 4} ${y + 11}`} stroke={vein} strokeWidth="1.1" fill="none" />
        <path d={`M30 ${y} Q ${30 + s} ${y + 3} ${30 + s + 4} ${y + 11}`} stroke={vein} strokeWidth="1.1" fill="none" />
      </g>;
    })}
  </svg>
);

// Decorative engraved disc echoing the medallion on the sculpture's mane.
// Deliberately carries NO letterform — the real NeoLeo mark was not obtainable.
const Medallion = ({ size = 104 }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" style={{ display: 'block' }}>
    <circle cx="60" cy="60" r="58" fill={C.ochre} />
    <circle cx="60" cy="60" r="58" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />
    <circle cx="60" cy="60" r="48" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1" strokeDasharray="2 5" />
    {Array.from({ length: 40 }, (_, i) => {
      const a = (i / 40) * Math.PI * 2;
      return <line key={i} x1={60 + Math.cos(a) * 16} y1={60 + Math.sin(a) * 16} x2={60 + Math.cos(a) * 42} y2={60 + Math.sin(a) * 42} stroke="rgba(255,255,255,0.55)" strokeWidth="1" strokeLinecap="round" />;
    })}
    <circle cx="60" cy="60" r="15" fill={C.tan} stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />
    <circle cx="60" cy="60" r="7" fill="none" stroke={C.paper} strokeWidth="1.6" />
    <circle cx="60" cy="60" r="2.4" fill={C.paper} />
  </svg>
);

// Cut-paper edges. Both directions paint the FLAT cream colour, never the teal —
// the teal bands are gradients, so a flat fill can never match them.
const Scallop = ({ color }) => <div className="scallop" style={{ '--sc': color }} />;
const ScallopTop = ({ color }) => <div className="scallop-top" style={{ '--sc': color }} />;

// section header used by every band
const Band = ({ eyebrow, title, intro, dark, children, style }) => (
  <div style={{ maxWidth: 1240, margin: '0 auto', ...style }}>
    <div style={{ maxWidth: 720 }}>
      <Mono style={{ color: dark ? 'rgba(243,232,208,0.65)' : C.inkDim }}>{eyebrow}</Mono>
      <h2 style={{
        fontFamily: '"Young Serif", serif', fontWeight: 400, margin: '14px 0 0',
        fontSize: 'clamp(32px, 3.8vw, 54px)', lineHeight: 1.06, letterSpacing: '-0.02em',
        color: dark ? C.paper : C.ink, textWrap: 'balance',
      }}>{title}</h2>
      {intro && <p style={{
        margin: '18px 0 0', fontSize: 17, lineHeight: 1.6, textWrap: 'pretty',
        color: dark ? 'rgba(243,232,208,0.8)' : C.inkDim,
      }}>{intro}</p>}
    </div>
    {children}
  </div>
);

Object.assign(window, { C, LION_SRC, Mono, Leaf, Medallion, Scallop, ScallopTop, Band });
