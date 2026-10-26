import { Link } from 'react-router-dom'
import { CASE_STUDIES } from '../site/content'

// The computer screen, rendered as real web content on top of the 3D monitor.
// Cards come from site/content.jsx, so new projects only need adding there.

const ACCENTS = ['#E99600', '#2FA3A0', '#DF8A00']

export default function ProjectsScreen({ open, onClose }) {
  return (
    <section className={`os ${open ? 'os--open' : ''}`} aria-hidden={!open}>
      <div className="os-window" role="dialog" aria-label="Projects">
        <div className="os-bar">
          <span className="os-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="os-title">neoleo — projects</span>
          <button type="button" className="os-close" onClick={onClose} aria-label="Back to the room">
            ✕
          </button>
        </div>
        <div className="os-body">
          <header className="os-head">
            <p className="os-eyebrow">Selected work</p>
            <h2>Projects</h2>
          </header>
          <div className="os-grid">
            {CASE_STUDIES.map((cs, i) => (
              <article key={cs.title} className="os-card" style={{ '--accent': ACCENTS[i % ACCENTS.length] }}>
                <div className="os-card__top">
                  <span className="os-icon" aria-hidden="true">
                    {cs.icon}
                  </span>
                  <span className="os-tag">{cs.achievement}</span>
                </div>
                <h3>{cs.title}</h3>
                <p className="os-sub">{cs.subtitle}</p>
                <p className="os-desc">{cs.description}</p>
                {cs.stats?.length > 0 && (
                  <div className="os-stats">
                    {cs.stats.map((s) => (
                      <div key={s.label}>
                        <strong>{s.value}</strong>
                        <span>{s.label}</span>
                      </div>
                    ))}
                  </div>
                )}
                {cs.highlights?.length > 0 && (
                  <ul className="os-highlights">
                    {cs.highlights.slice(0, 3).map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                )}
                <div className="os-actions">
                  {cs.detailPage && <Link to={cs.detailPage}>Read the case study →</Link>}
                  {cs.website && (
                    <a href={`https://${cs.website}`} target="_blank" rel="noreferrer">
                      {cs.website} ↗
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
