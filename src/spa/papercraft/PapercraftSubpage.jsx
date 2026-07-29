import { Link } from 'react-router-dom'
import { PapercraftNav } from './Hero'
import Contact from './Contact'

export default function PapercraftSubpage({ children }) {
  return (
    <div className="papercraft pc-subpage">
      <div className="pc-subpage-nav">
        <PapercraftNav subpage />
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
