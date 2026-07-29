import { C } from './tokens'
import { Band, Mono, ScallopTop } from './kit'
import { BENEFITS, OPEN_POSITIONS } from './content'

export default function Career() {
  return (
    <section id="career" className="pc-section pc-section--teal pc-section--career">
      <ScallopTop color={C.paper} />
      <div className="grain" aria-hidden="true" />
      <Band
        dark
        eyebrow="Careers"
        title="Join our team"
        intro="Help us transform healthcare with innovative technology and bold vision."
        style={{ position: 'relative', zIndex: 2 }}
      >
        <div className="pc-benefits-grid">
          {BENEFITS.map(({ icon, title, desc }) => (
            <article key={title} className="pc-benefit-card">
              <span className="pc-benefit-card__icon" aria-hidden="true">
                {icon}
              </span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>

        <div className="pc-positions">
          <h3 className="pc-positions__title">Open positions</h3>
          <div className="pc-positions-grid">
            {OPEN_POSITIONS.map((position) => (
              <article key={position.id} className="pc-position-card">
                <div className="pc-position-card__head">
                  <div>
                    <h4>{position.title}</h4>
                    <Mono style={{ color: 'rgba(243,232,208,0.65)' }}>{position.department}</Mono>
                  </div>
                  <span className="pc-position-card__level">{position.level}</span>
                </div>
                <p className="pc-position-card__desc">{position.description}</p>
                <div className="pc-position-card__tags">
                  {position.highlights.map((tag) => (
                    <span key={tag} className="pc-position-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <a href="mailto:saksham@neoleo.tech" className="btn-cream pc-position-card__apply">
                  Apply now →
                </a>
              </article>
            ))}
          </div>
        </div>

        <div className="pc-career-cta">
          <h3>Don&apos;t see a perfect fit?</h3>
          <p>
            We&apos;re always looking for talented individuals. Send us your resume and tell us how
            you&apos;d like to contribute.
          </p>
          <a href="mailto:saksham@neoleo.tech" className="btn-cream">
            Send your resume →
          </a>
        </div>
      </Band>
    </section>
  )
}
