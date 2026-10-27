import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { CATEGORIES, findCategory, findProject } from './projects'

// The office computer screen: Projects -> category -> project.
// Real web content laid over the 3D monitor; data lives in projects.js.

const ACCENTS = ['#E99600', '#2FA3A0', '#DF8A00']

function Status({ value }) {
  if (!value) return null
  const tone = /live/i.test(value) ? 'live' : /soon/i.test(value) ? 'soon' : 'dev'
  return <span className={`os-status os-status--${tone}`}>{value}</span>
}

function Categories({ go }) {
  return (
    <>
      <header className="os-head">
        <p className="os-eyebrow">Selected work</p>
        <h2>Projects</h2>
      </header>
      <div className="os-grid">
        {CATEGORIES.map((c, i) => (
          <button
            key={c.id}
            type="button"
            className="os-card os-card--tile"
            style={{ '--accent': ACCENTS[i % ACCENTS.length] }}
            onClick={() => go(c.id)}
          >
            <span className="os-tag">
              {c.projects.length ? `${c.projects.length} project${c.projects.length > 1 ? 's' : ''}` : 'Coming soon'}
            </span>
            <h3>{c.name}</h3>
            <p className="os-desc">{c.blurb}</p>
            <span className="os-open">Open →</span>
          </button>
        ))}
      </div>
    </>
  )
}

function Category({ category, go }) {
  return (
    <>
      <header className="os-head">
        <p className="os-eyebrow">Projects</p>
        <h2>{category.name}</h2>
        <p className="os-lede">{category.blurb}</p>
      </header>
      {category.projects.length === 0 ? (
        <div className="os-empty">Coming soon. Projects in this category will appear here.</div>
      ) : (
        <div className="os-grid">
          {category.projects.map((p, i) => (
            <button
              key={p.id}
              type="button"
              className="os-card os-card--tile"
              style={{ '--accent': ACCENTS[i % ACCENTS.length] }}
              onClick={() => go(`${category.id}/${p.id}`)}
            >
              <div className="os-card__top">
                <span className="os-icon" aria-hidden="true">
                  {p.icon}
                </span>
                <Status value={p.status} />
              </div>
              <h3>{p.name}</h3>
              {p.subtitle && <p className="os-sub">{p.subtitle}</p>}
              {p.description && <p className="os-desc os-desc--clamp">{p.description}</p>}
              <span className="os-open">View project →</span>
            </button>
          ))}
        </div>
      )}
    </>
  )
}

function Project({ project }) {
  return (
    <article className="os-project">
      <header className="os-head">
        <div className="os-project__title">
          {project.icon && (
            <span className="os-icon os-icon--lg" aria-hidden="true">
              {project.icon}
            </span>
          )}
          <div>
            <h2>{project.name}</h2>
            {project.subtitle && <p className="os-sub">{project.subtitle}</p>}
          </div>
        </div>
        <div className="os-meta">
          <Status value={project.status} />
          {project.client && <span className="os-client">Client: {project.client}</span>}
        </div>
      </header>

      {project.description ? (
        <p className="os-lede">{project.description}</p>
      ) : (
        <div className="os-empty">Details coming soon.</div>
      )}

      {project.stats?.length > 0 && (
        <div className="os-stats os-stats--wide">
          {project.stats.map((s) => (
            <div key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      )}

      {project.highlights?.length > 0 && (
        <>
          <h3 className="os-h3">Highlights</h3>
          <ul className="os-highlights">
            {project.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </>
      )}

      {(project.caseStudy || project.website) && (
        <div className="os-actions">
          {project.caseStudy && <Link to={project.caseStudy}>Read the full case study →</Link>}
          {project.website && (
            <a href={`https://${project.website}`} target="_blank" rel="noreferrer">
              {project.website} ↗
            </a>
          )}
        </div>
      )}
    </article>
  )
}

/** path: '' | '<category>' | '<category>/<project>' */
export default function ProjectsScreen({ open, path = '', onNavigate, onClose }) {
  const [catId, projId] = path.split('/').filter(Boolean)
  const category = findCategory(catId)
  const project = findProject(category, projId)
  const body = useRef(null)

  useEffect(() => {
    body.current?.scrollTo({ top: 0 })
  }, [path])

  const crumbs = [{ label: 'Projects', to: '' }]
  if (category) crumbs.push({ label: category.name, to: category.id })
  if (project) crumbs.push({ label: project.name, to: `${category.id}/${project.id}` })

  return (
    <section className={`os ${open ? 'os--open' : ''}`} aria-hidden={!open}>
      <div className="os-window" role="dialog" aria-label="Projects">
        <div className="os-bar">
          <span className="os-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <nav className="os-crumbs" aria-label="Breadcrumb">
            {crumbs.map((c, i) => (
              <span key={c.to || 'root'}>
                {i > 0 && <span className="os-crumbs__sep">›</span>}
                {i < crumbs.length - 1 ? (
                  <button type="button" onClick={() => onNavigate(c.to)}>
                    {c.label}
                  </button>
                ) : (
                  <span aria-current="page">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
          <button type="button" className="os-close" onClick={onClose} aria-label="Back to the room">
            ✕
          </button>
        </div>
        <div className="os-body" ref={body}>
          {project ? (
            <Project project={project} />
          ) : category ? (
            <Category category={category} go={onNavigate} />
          ) : (
            <Categories go={onNavigate} />
          )}
        </div>
      </div>
    </section>
  )
}
