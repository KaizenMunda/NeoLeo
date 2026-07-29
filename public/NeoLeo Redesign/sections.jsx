// Content bands below the hero. Copy is taken from neoleo.tech's own published
// text (service descriptions, three-phase approach, client quotes, value line).

const SOLUTIONS = [
  { t: 'Visual recognition', d: 'Automated image and video analysis for fast, actionable insights.', c: C.terra,
    icon: <g><circle cx="24" cy="24" r="15" fill="none" stroke="currentColor" strokeWidth="2.4" /><circle cx="24" cy="24" r="5.5" fill="currentColor" /><path d="M6 14V8h6M42 14V8h-6M6 34v6h6M42 34v6h-6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></g> },
  { t: 'AI-driven personalization', d: 'Personalized interactions based on unique customer behaviors.', c: C.ochre,
    icon: <g><circle cx="18" cy="17" r="7.5" fill="none" stroke="currentColor" strokeWidth="2.4" /><path d="M6 40c0-7 5.5-12 12-12s12 5 12 12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /><path d="M34 12v14M41 15v8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /><circle cx="37.5" cy="34" r="2.6" fill="currentColor" /></g> },
  { t: 'Cybersecurity', d: 'Proactive threat detection and neutralization to keep your business secure.', c: C.teal700,
    icon: <g><path d="M24 5l15 6v12c0 10-6.5 16.5-15 20-8.5-3.5-15-10-15-20V11z" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" /><path d="M17 23l5 5 10-10" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" /></g> },
];

const Solutions = () => (
  <section id="solutions" style={{ position: 'relative', background: C.paper, color: C.ink, padding: 'clamp(72px, 9vw, 120px) clamp(24px, 4vw, 60px) clamp(90px, 10vw, 140px)' }}>
    <Band
      eyebrow="What we build"
      title="AI solutions cut to the scale of your ambitions."
      intro="Fuel your business growth with AI solutions that are not only dynamic and adaptive but also innovative and tailored to match the scale and vision of your ambitions."
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'clamp(18px, 2.4vw, 30px)', marginTop: 'clamp(38px, 5vw, 62px)' }}>
        {SOLUTIONS.map(({ t, d, c, icon }, i) => (
          <article key={i} className="paper-card">
            <span className="chip" style={{ background: c, color: C.paper }}>
              <svg width="26" height="26" viewBox="0 0 48 48">{icon}</svg>
            </span>
            <h3 className="card-h">{t}</h3>
            <p className="card-p">{d}</p>
            <Mono style={{ color: C.inkDim, marginTop: 'auto', paddingTop: 22, display: 'block' }}>0{i + 1}</Mono>
          </article>
        ))}
      </div>
    </Band>
  </section>
);

const PHASES = [
  ['Integrate', 'Identify your unique needs and seamlessly integrate our AI solutions into your existing systems.'],
  ['Fine-tune', 'Fine-tune our AI tools to maximize efficiency and effectiveness.'],
  ['Grow', 'Drive growth and efficiency at every step.'],
];

const Approach = () => (
  <section id="approach" style={{
    position: 'relative', color: C.paper, overflow: 'hidden',
    background: `radial-gradient(110% 80% at 30% 10%, ${C.teal700} 0%, ${C.teal900} 70%)`,
    padding: 'clamp(72px, 9vw, 120px) clamp(24px, 4vw, 60px) clamp(90px, 10vw, 140px)',
  }}>
    <ScallopTop color={C.paper} />
    <div className="grain" />
    <Band
      dark
      eyebrow="How we work"
      title="A three-phase approach."
      intro="Explore our three-phase approach to see how we drive growth and efficiency at every step."
      style={{ position: 'relative', zIndex: 2 }}
    >
      <ol className="phases">
        {PHASES.map(([n, d], i) => (
          <li key={i} className="phase">
            <span className="phase-num">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <Mono style={{ color: C.ochre }}>{n}</Mono>
              <p className="phase-p">{d}</p>
            </div>
          </li>
        ))}
      </ol>
    </Band>
    <Scallop color={C.paper} />
  </section>
);

const QUOTES = [
  ['The visual recognition technology has streamlined our processes and provided us with valuable insights. NeoLeo is a key partner in our success.', C.terra],
  ['Thanks to NeoLeo’s AI-driven personalization, we’ve seen a dramatic increase in customer satisfaction and engagement. It’s truly exceptional.', C.ochre],
  ['The cybersecurity solutions from NeoLeo offer unparalleled protection for our data. We feel confident and secure knowing our systems are in good hands.', C.teal700],
];

const Voices = () => (
  <section style={{ position: 'relative', background: C.paper, color: C.ink, padding: 'clamp(72px, 9vw, 120px) clamp(24px, 4vw, 60px) clamp(90px, 10vw, 140px)' }}>
    <Band
      eyebrow="Client voices"
      title="Hear directly from our clients."
      intro="Their experiences, and the impact our technology has had on their operations."
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(18px, 2.4vw, 30px)', marginTop: 'clamp(38px, 5vw, 62px)' }}>
        {QUOTES.map(([q, c], i) => (
          <figure key={i} className="paper-card quote-card">
            <span className="quote-mark" style={{ color: c }}>“</span>
            <blockquote className="quote-t">{q}</blockquote>
            <span className="quote-rule" style={{ background: c }} />
          </figure>
        ))}
      </div>
    </Band>
  </section>
);

const Contact = () => (
  <footer id="contact" style={{
    position: 'relative', color: C.paper, overflow: 'hidden',
    background: `radial-gradient(110% 90% at 70% 0%, ${C.teal700} 0%, ${C.teal900} 68%)`,
    padding: 'clamp(76px, 9vw, 130px) clamp(24px, 4vw, 60px) 42px',
  }}>
    <ScallopTop color={C.paper} />
    <div className="grain" />
    <div style={{ position: 'relative', zIndex: 2, maxWidth: 1240, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(32px, 5vw, 64px)', alignItems: 'center' }}>
        <div>
          <Mono style={{ color: 'rgba(243,232,208,0.65)' }}>Get started</Mono>
          <h2 style={{ fontFamily: '"Young Serif", serif', fontWeight: 400, margin: '14px 0 0', fontSize: 'clamp(36px, 4.4vw, 62px)', lineHeight: 1.04, letterSpacing: '-0.02em', textWrap: 'balance' }}>
            Elevate your <span className="cut-word">digital</span> presence.
          </h2>
          <p style={{ margin: '20px 0 0', maxWidth: 440, fontSize: 17, lineHeight: 1.6, color: 'rgba(243,232,208,0.8)' }}>
            Bold vision, precise execution — tell us what you are building and we will shape the system around it.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 30, flexWrap: 'wrap' }}>
            <a className="btn-cream" href="#contact">Start a brief <span style={{ opacity: 0.5 }}>→</span></a>
            <a className="btn-ghost" href="#solutions">See what we build</a>
          </div>
        </div>
        <div style={{ justifySelf: 'center' }}>
          <div className="drift" style={{ filter: 'drop-shadow(0 26px 34px rgba(10,32,32,0.5))' }}><Medallion size={150} /></div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginTop: 'clamp(56px, 7vw, 96px)', paddingTop: 26, borderTop: '1px solid rgba(243,232,208,0.18)' }}>
        <span style={{ fontFamily: '"Young Serif", serif', fontSize: 20 }}>NeoLeo</span>
        <Mono style={{ color: 'rgba(243,232,208,0.55)' }}>Bold vision · Precise execution</Mono>
      </div>
    </div>
  </footer>
);

Object.assign(window, { Solutions, Approach, Voices, Contact });
