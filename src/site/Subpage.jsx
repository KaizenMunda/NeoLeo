import { Link } from 'react-router-dom'
import Contact from './Contact'

function SubpageNav() {
  return (
    <nav className="pc-nav">
      <Link to="/" className="pc-nav__wordmark">
        NeoLeo
      </Link>
      <div className="pc-nav__actions">
        <div className="nav-links">
          <Link to="/vision">Vision</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <Link to="/brief" className="btn-ochre">
          Start a brief →
        </Link>
      </div>
    </nav>
  )
}

export default function Subpage({ children }) {
  return (
    <div className="papercraft pc-subpage">
      <div className="pc-subpage-nav">
        <SubpageNav />
      </div>
      <main className="pc-subpage-content">{children}</main>
      <Contact />
    </div>
  )
}

export function BackHomeLink() {
  return (
    <Link to="/" className="btn-ghost" style={{ marginBottom: '2rem', display: 'inline-flex' }}>
      ← Back to home
    </Link>
  )
}
