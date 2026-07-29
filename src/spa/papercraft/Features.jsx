import { C } from './tokens'
import { Band, Mono } from './kit'
import { FEATURES } from './content'

export default function Features() {
  return (
    <section id="features" className="pc-section pc-section--paper pc-section--compact-top">
      <Band
        eyebrow="Why NeoLeo"
        title="Everything you need to elevate your digital presence."
        intro="Bold vision, precise execution — intelligent systems built layer by layer, like the beast."
      >
        <div className="pc-card-grid">
          {FEATURES.map(({ icon, title, text, accent }, i) => (
            <article key={title} className="paper-card">
              <span className="chip chip--emoji" style={{ background: accent, color: C.paper }}>
                <span aria-hidden="true">{icon}</span>
              </span>
              <h3 className="card-h">{title}</h3>
              <p className="card-p">{text}</p>
              <Mono style={{ color: C.inkDim, marginTop: 'auto', paddingTop: 22, display: 'block' }}>
                0{i + 1}
              </Mono>
            </article>
          ))}
        </div>
      </Band>
    </section>
  )
}
