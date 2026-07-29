import { C } from './tokens'
import { ScallopTop } from './kit'
import { SectionLink } from './scrollTo'

export default function MidCta() {
  return (
    <section className="pc-section pc-section--cta-band">
      <ScallopTop color={C.paper} />
      <div className="grain" aria-hidden="true" />
      <div className="pc-cta-band__inner">
        <h2>Ready to build what&apos;s next?</h2>
        <p>Join teams using NeoLeo to ship intelligent systems with confidence.</p>
        <div className="pc-cta-band__actions">
          <SectionLink id="contact" className="btn-cream">
            Get started →
          </SectionLink>
          <a className="btn-ghost" href="mailto:saksham@neoleo.tech">
            Talk to us
          </a>
        </div>
        <span className="pc-cta-band__lion" aria-hidden="true">
          🦁
        </span>
      </div>
    </section>
  )
}
