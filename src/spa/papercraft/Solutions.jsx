import { C } from './tokens'
import { Band, Mono } from './kit'
import { AI_SOLUTIONS, PLATFORM_SOLUTIONS, SOLUTION_HIGHLIGHTS } from './content'

export default function Solutions() {
  return (
    <section id="solutions" className="pc-section pc-section--paper">
      <Band
        eyebrow="What we build"
        title="Our solutions — cut to the scale of your ambitions."
        intro="Comprehensive technology solutions designed to transform healthcare operations and deliver measurable results. Fuel your business growth with AI systems that are dynamic, adaptive, and tailored to your vision."
      >
        <div className="pc-subsection">
          <Mono style={{ color: C.inkDim, display: 'block', marginBottom: 18 }}>AI capabilities</Mono>
          <div className="pc-card-grid">
            {AI_SOLUTIONS.map(({ t, d, c, icon }, i) => (
              <article key={t} className="paper-card">
                <span className="chip" style={{ background: c, color: C.paper }}>
                  <svg width="26" height="26" viewBox="0 0 48 48" aria-hidden="true">
                    {icon}
                  </svg>
                </span>
                <h3 className="card-h">{t}</h3>
                <p className="card-p">{d}</p>
                <Mono style={{ color: C.inkDim, marginTop: 'auto', paddingTop: 22, display: 'block' }}>
                  AI 0{i + 1}
                </Mono>
              </article>
            ))}
          </div>
        </div>

        <div className="pc-subsection">
          <Mono style={{ color: C.inkDim, display: 'block', marginBottom: 18 }}>Platform solutions</Mono>
          <div className="pc-solutions-grid">
            {PLATFORM_SOLUTIONS.map((solution) => (
              <article key={solution.id} className="paper-card pc-solution-card">
                <div className="pc-solution-card__head">
                  <span className="chip chip--emoji" style={{ background: solution.accent, color: C.paper }}>
                    <span aria-hidden="true">{solution.icon}</span>
                  </span>
                  <h3 className="card-h">{solution.title}</h3>
                </div>
                <p className="card-p">{solution.description}</p>
                <ul className="pc-feature-list">
                  {solution.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <button type="button" className="btn-ochre pc-solution-card__cta">
                  Learn more →
                </button>
              </article>
            ))}
          </div>
        </div>

        <div className="pc-highlights">
          <h3 className="pc-highlights__title">Why choose NeoLeo?</h3>
          <div className="pc-highlights__grid">
            {SOLUTION_HIGHLIGHTS.map(({ icon, title, desc }) => (
              <article key={title} className="pc-highlight-item">
                <span className="pc-highlight-item__icon" aria-hidden="true">
                  {icon}
                </span>
                <h4>{title}</h4>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </Band>
    </section>
  )
}
