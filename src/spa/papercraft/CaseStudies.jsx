import { useState } from 'react'
import { Link } from 'react-router-dom'
import { C } from './tokens'
import { Band, Mono } from './kit'
import { CASE_STUDIES } from './content'

export default function CaseStudies() {
  const [expandedId, setExpandedId] = useState(null)

  return (
    <section id="case-studies" className="pc-section pc-section--paper">
      <Band
        eyebrow="Proof in practice"
        title="Case studies"
        intro="Real-world projects that transformed businesses through innovative technology and strategic execution."
      >
        <div className="pc-case-studies">
          {CASE_STUDIES.map((study) => {
            const expanded = expandedId === study.id
            return (
              <article
                key={study.id}
                className={`paper-card pc-case-study ${expanded ? 'pc-case-study--expanded' : ''}`}
              >
                <button
                  type="button"
                  className="pc-case-study__toggle"
                  onClick={() => setExpandedId(expanded ? null : study.id)}
                  aria-expanded={expanded}
                >
                  <div className="pc-case-study__header">
                    <span className="chip chip--emoji" style={{ background: study.accent, color: C.paper }}>
                      <span aria-hidden="true">{study.icon}</span>
                    </span>
                    <div className="pc-case-study__titles">
                      <h3 className="card-h" style={{ margin: 0 }}>
                        {study.title}
                      </h3>
                      <p className="pc-case-study__subtitle">{study.subtitle}</p>
                      <Mono style={{ color: study.accent, marginTop: 8, display: 'block' }}>
                        {study.achievement}
                      </Mono>
                    </div>
                  </div>
                  <span className="pc-case-study__chevron" aria-hidden="true">
                    {expanded ? '▲' : '▼'}
                  </span>
                </button>

                <p className="card-p pc-case-study__desc">{study.description}</p>

                <div className="pc-case-study__stats">
                  {study.stats.map((stat) => (
                    <div key={stat.label} className="pc-case-study__stat">
                      <div className="pc-case-study__stat-value">{stat.value}</div>
                      <Mono style={{ color: C.inkDim }}>{stat.label}</Mono>
                    </div>
                  ))}
                </div>

                <div className={study.isAyu ? 'pc-ayu-placeholder' : 'pc-gallery-placeholder'}>
                  {study.isAyu ? (
                    <>
                      <span className="pc-ayu-placeholder__logo" aria-hidden="true">
                        Ayu
                      </span>
                      <p>Personal health vault</p>
                      <small>App screenshots coming soon</small>
                    </>
                  ) : (
                    <>
                      <span aria-hidden="true">📸</span>
                      <p>Project screenshots &amp; media</p>
                      <small>Image carousel will display project visuals</small>
                    </>
                  )}
                </div>

                {expanded && (
                  <div className="pc-case-study__expanded">
                    <h4 className="pc-case-study__highlights-title">Key achievements</h4>
                    <ul className="pc-case-study__highlights">
                      {study.highlights.map((item) => (
                        <li key={item}>
                          <span className="pc-case-study__check">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="pc-case-study__actions">
                      <Link to={study.detailPage} className="btn-cream">
                        Read full case study →
                      </Link>
                      {study.website && (
                        <a
                          href={`https://${study.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-outline-dark"
                        >
                          Visit {study.website}
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </Band>
    </section>
  )
}
