// Hero band — nav + papercraft arch holding the lion.
// Decorations are placed by projecting a fixed angular slot onto the arch's
// RECTANGLE (not an inscribed ellipse), so each straddles the edge it points at.

const Nav = () => (
  <nav style={{ position: 'relative', zIndex: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px clamp(24px, 4vw, 60px) 6px' }}>
    <span style={{ fontFamily: '"Young Serif", serif', fontSize: 22, color: C.cream, letterSpacing: '-0.01em' }}>NeoLeo</span>
    <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(14px, 2.4vw, 30px)' }}>
      <div className="nav-links">
        <a href="#solutions">Solutions</a>
        <a href="#approach">Approach</a>
        <a href="#contact">Contact</a>
      </div>
      <a className="btn-ochre" href="#contact">Start a brief →</a>
    </div>
  </nav>
);

const RING = [
  { a: 196, clear: -6, node: <Medallion size={96} />, k: 34, shadow: '0 20px 28px rgba(10,32,32,0.45)' },
  { a: 138, clear: 6, node: <Leaf w={42} fill={C.teal200} vein="rgba(47,90,92,0.35)" />, k: 30, spin: -34, cls: 'd3' },
  { a: 40,  clear: 6, node: <Leaf w={36} fill={C.terra} />, k: 44, spin: 34, cls: '' },
  { a: 330, clear: 6, node: <Leaf w={32} fill={C.tan} />, k: 38, spin: 76, cls: 'd2' },
];

const LionStage = ({ px, py }) => {
  const archRef = React.useRef(null);
  const [box, setBox] = React.useState({ w: 0, h: 0 });

  React.useLayoutEffect(() => {
    const el = archRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setBox({ w: el.offsetWidth, h: el.offsetHeight }));
    ro.observe(el);
    setBox({ w: el.offsetWidth, h: el.offsetHeight });
    return () => ro.disconnect();
  }, []);

  const halfW = box.w / 2, halfH = box.h / 2;

  return (
    <div style={{ position: 'relative', justifySelf: 'end', height: 'min(56svh, 500px)' }}>
      <div style={{
        position: 'absolute', inset: -18, borderRadius: '320px 320px 30px 30px',
        border: '1px dashed rgba(243,232,208,0.30)', pointerEvents: 'none',
        transform: `translate3d(${px * -10}px, ${py * -7}px, 0)`, transition: 'transform 600ms cubic-bezier(.2,.7,.3,1)',
      }} />

      <div ref={archRef} style={{
        position: 'relative', height: '100%', aspectRatio: '4 / 5', borderRadius: '300px 300px 24px 24px',
        overflow: 'hidden', background: C.teal500,
        boxShadow: 'inset 0 0 0 2px rgba(243,232,208,0.5), 0 50px 90px -40px rgba(10,32,32,0.75)',
        transform: `translate3d(${px * -10}px, ${py * -7}px, 0)`, transition: 'transform 600ms cubic-bezier(.2,.7,.3,1)',
      }}>
        <img src={LION_SRC} alt="NeoLeo — layered paper lion" className="lion-float" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: '58% 36%',
          transform: `scale(1.16) translate3d(${px * 16}px, ${py * 12}px, 0)`,
          transition: 'transform 600ms cubic-bezier(.2,.7,.3,1)',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(190deg, rgba(47,90,92,0) 50%, rgba(28,62,64,0.5) 100%)', pointerEvents: 'none' }} />
        <Mono style={{ position: 'absolute', left: 22, bottom: 16, color: 'rgba(243,232,208,0.85)' }}>House mark</Mono>
      </div>

      {box.w > 0 && RING.map(({ a, clear, node, k, spin, cls, shadow }, i) => {
        const r = (a * Math.PI) / 180;
        const cos = Math.cos(r), sin = Math.sin(r);
        const t = Math.min(
          Math.abs(cos) < 1e-6 ? Infinity : halfW / Math.abs(cos),
          Math.abs(sin) < 1e-6 ? Infinity : halfH / Math.abs(sin)
        ) + clear;
        return (
          <div key={i} style={{
            position: 'absolute', left: halfW + cos * t, top: halfH - sin * t,
            transform: `translate(-50%, -50%) translate3d(${px * k}px, ${py * (k * 0.7)}px, 0)`,
            transition: 'transform 750ms cubic-bezier(.2,.7,.3,1)',
            filter: shadow ? `drop-shadow(${shadow})` : undefined,
          }}>
            <div className={`drift ${cls || ''}`}>
              <div style={spin ? { transform: `rotate(${spin}deg)` } : undefined}>{node}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Hero = () => {
  const [p, setP] = React.useState({ x: 0, y: 0 });
  const onMove = e => {
    const r = e.currentTarget.getBoundingClientRect();
    setP({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
  };

  return (
    <section onMouseMove={onMove} onMouseLeave={() => setP({ x: 0, y: 0 })} style={{
      position: 'relative', height: '100svh', minHeight: 480, display: 'flex', flexDirection: 'column',
      background: `radial-gradient(120% 90% at 68% 40%, ${C.teal500} 0%, ${C.teal700} 46%, ${C.teal900} 100%)`,
      overflow: 'hidden',
    }}>
      <div className="grain" />
      <Nav />

      <div style={{
        position: 'relative', zIndex: 5, flex: 1, minHeight: 0, display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) auto', gap: 'clamp(24px, 4vw, 64px)',
        alignItems: 'center', padding: '0 clamp(44px, 4vw, 60px) 44px',
      }}>
        <div style={{ maxWidth: 620 }}>
          <span className="eyebrow"><span className="eyebrow-dot" />Intelligent systems</span>

          <h1 style={{ fontFamily: '"Young Serif", serif', fontWeight: 400, fontSize: 'clamp(42px, 5vw, 86px)', lineHeight: 1.03, letterSpacing: '-0.022em', color: C.paper, margin: '20px 0 0' }}>
            Bold vision,<br />
            <span style={{ whiteSpace: 'nowrap' }}><span className="cut-word">precise</span> execution.</span>
          </h1>

          <p style={{ maxWidth: 460, marginTop: 22, fontSize: 16.5, lineHeight: 1.58, color: 'rgba(243,232,208,0.82)' }}>
            Intelligent systems and digital presence — built layer by layer, like the beast.
          </p>

          <div style={{ display: 'flex', gap: 12, marginTop: 28, alignItems: 'center' }}>
            <a className="btn-cream" href="#solutions">See what we build <span style={{ opacity: 0.5 }}>↓</span></a>
            <a className="btn-ghost" href="#approach">Our approach</a>
          </div>
        </div>

        <LionStage px={p.x} py={p.y} />
      </div>

      <Scallop color={C.paper} />
    </section>
  );
};

Object.assign(window, { Hero });
