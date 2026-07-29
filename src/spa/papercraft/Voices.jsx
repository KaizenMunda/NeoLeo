import { Band } from './kit'
import { QUOTES } from './content'

export default function Voices() {
  return (
    <section className="pc-section pc-section--paper">
      <Band
        eyebrow="Client voices"
        title="Hear directly from our clients."
        intro="Their experiences, and the impact our technology has had on their operations."
      >
        <div className="pc-quote-grid">
          {QUOTES.map(([quote, accent]) => (
            <figure key={quote.slice(0, 32)} className="paper-card quote-card">
              <span className="quote-mark" style={{ color: accent }} aria-hidden="true">
                “
              </span>
              <blockquote className="quote-t">{quote}</blockquote>
              <span className="quote-rule" style={{ background: accent }} aria-hidden="true" />
            </figure>
          ))}
        </div>
      </Band>
    </section>
  )
}
