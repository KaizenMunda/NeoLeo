import { Link } from 'react-router-dom'
import { C } from './tokens'
import { Mono, Medallion, ScallopTop } from './kit'
import { FOOTER_LINKS } from './content'

export default function Contact() {
  return (
    <footer id="contact" className="pc-section pc-section--contact">
      <ScallopTop color={C.paper} />
      <div className="grain" aria-hidden="true" />
      <div className="pc-contact__wrap">
        <div className="pc-contact__grid">
          <div>
            <Mono style={{ color: 'rgba(243,232,208,0.65)' }}>Get started</Mono>
            <h2 className="pc-contact__title">
              Elevate your <span className="cut-word">digital</span> presence.
            </h2>
            <p className="pc-contact__body">
              Bold vision, precise execution — tell us what you are building and we will shape the
              system around it. Elevate your business with advanced AI solutions and intelligent
              systems built with ease and confidence.
            </p>
            <div className="pc-contact__actions">
              <a className="btn-cream" href="mailto:saksham@neoleo.tech">
                Start a brief <span style={{ opacity: 0.5 }}>→</span>
              </a>
              <Link to="/projects" className="btn-ghost">
                See what we build
              </Link>
            </div>
          </div>
          <div className="pc-contact__medallion">
            <div className="drift">
              <Medallion size={150} />
            </div>
          </div>
        </div>

        <div className="pc-footer-links">
          <div className="pc-footer-brand">
            <span className="pc-contact__footer-wordmark">NeoLeo</span>
            <p>Transforming businesses with bold vision and precise execution.</p>
          </div>
          <div className="pc-footer-columns">
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div key={category} className="pc-footer-column">
                <h4>{category}</h4>
                <ul>
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.to}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pc-contact__footer">
          <div className="pc-contact__legal">
            <p>&copy; {new Date().getFullYear()} NeoLeo. All rights reserved.</p>
            <p>
              Contact:{' '}
              <a href="mailto:saksham@neoleo.tech" className="pc-footer-email">
                saksham@neoleo.tech
              </a>
            </p>
          </div>
          <Mono style={{ color: 'rgba(243,232,208,0.55)' }}>Bold vision · Precise execution</Mono>
        </div>
      </div>
    </footer>
  )
}
