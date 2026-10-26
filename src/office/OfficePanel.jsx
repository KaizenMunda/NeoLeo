import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BENEFITS, CASE_STUDIES, OPEN_POSITIONS, PHASES } from '../site/content'
import { HOTSPOTS } from './officeConfig'

// Panel copy lives in site/content.jsx, shared with the case-study pages.

const EMAIL = 'saksham@neoleo.tech'

function Vision() {
  return (
    <>
      <p className="op-quote">Bold vision, precise execution.</p>
      <p className="op-lede">
        Elevate your business with advanced AI solutions. Intelligent systems and digital presence —
        built layer by layer, like the beast.
      </p>
      <h3 className="op-h3">How we work</h3>
      <ol className="op-steps">
        {PHASES.map(([title, text]) => (
          <li key={title}>
            <strong>{title}.</strong> {text}
          </li>
        ))}
      </ol>
    </>
  )
}

function Achievements() {
  const items = CASE_STUDIES.filter((c) => c.stats?.some((s) => /\d/.test(s.value)))
  return (
    <>
      <p className="op-lede">Numbers from work in production.</p>
      {items.map((c) => (
        <div key={c.title} className="op-stats-block">
          <h3>{c.title}</h3>
          <div className="op-stats">
            {c.stats.map((s) => (
              <div key={s.label} className="op-stat">
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

function Careers() {
  return (
    <>
      <p className="op-lede">Build products that transform healthcare.</p>
      <ul className="op-list">
        {OPEN_POSITIONS.map((p) => (
          <li key={p.id} className="op-card">
            <h3>{p.title}</h3>
            <p className="op-sub">
              {p.department} · {p.level}
            </p>
            <p>{p.description}</p>
          </li>
        ))}
      </ul>
      <div className="op-tags">
        {BENEFITS.map((b) => (
          <span key={b.title}>{b.title}</span>
        ))}
      </div>
      <a className="op-btn" href={`mailto:${EMAIL}?subject=Careers%20at%20NeoLeo`}>
        Apply by email →
      </a>
    </>
  )
}

function Contact() {
  return (
    <>
      <p className="op-lede">
        Bold vision, precise execution — tell us what you are building and we will shape the system
        around it.
      </p>
      <Link className="op-btn" to="/brief">
        Start a brief →
      </Link>
      <p className="op-small">
        Or write to <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </p>
    </>
  )
}

function Brief() {
  const [f, setF] = useState({ name: '', email: '', company: '', idea: '' })
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    const subject = `Project brief${f.company ? ` — ${f.company}` : ''}`
    const body = `Name: ${f.name}\nEmail: ${f.email}\nCompany: ${f.company}\n\nWhat we're building:\n${f.idea}`
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }
  return (
    <form className="op-form" onSubmit={submit}>
      <p className="op-lede">Tell us what you are building and we will shape the system around it.</p>
      <label>
        Your name
        <input required value={f.name} onChange={set('name')} autoComplete="name" />
      </label>
      <label>
        Email
        <input required type="email" value={f.email} onChange={set('email')} autoComplete="email" />
      </label>
      <label>
        Company <span>(optional)</span>
        <input value={f.company} onChange={set('company')} autoComplete="organization" />
      </label>
      <label>
        What are you building?
        <textarea required rows={4} value={f.idea} onChange={set('idea')} />
      </label>
      <button type="submit" className="op-btn">
        Send brief →
      </button>
      <p className="op-small">Opens your email app with the brief filled in.</p>
    </form>
  )
}

const BODIES = {
  vision: Vision,
  achievements: Achievements,
  careers: Careers,
  contact: Contact,
  brief: Brief,
}

export default function OfficePanel({ active, onClose }) {
  const Body = active ? BODIES[active] : null
  return (
    <aside
      className={`op ${Body ? 'op--open' : ''}`}
      aria-hidden={!Body}
      aria-labelledby={Body ? 'op-title' : undefined}
    >
      {Body && (
        <>
          <div className="op-head">
            <h2 id="op-title">{HOTSPOTS[active].label}</h2>
            <button type="button" className="op-close" onClick={onClose} aria-label="Back to the room">
              ✕
            </button>
          </div>
          <div className="op-body">
            <Body />
          </div>
          <button type="button" className="op-back" onClick={onClose}>
            ← Back to the room
          </button>
        </>
      )}
    </aside>
  )
}
