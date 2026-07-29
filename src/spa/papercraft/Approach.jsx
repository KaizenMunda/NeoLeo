import { C } from './tokens'
import { Band, Mono, Scallop, ScallopTop } from './kit'
import { PHASES } from './content'

export default function Approach() {
  return (
    <section id="approach" className="pc-section pc-section--teal">
      <ScallopTop color={C.paper} />
      <div className="grain" aria-hidden="true" />
      <Band
        dark
        eyebrow="How we work"
        title="A three-phase approach."
        intro="Explore our three-phase approach to see how we drive growth and efficiency at every step."
        style={{ position: 'relative', zIndex: 2 }}
      >
        <ol className="phases">
          {PHASES.map(([label, body], i) => (
            <li key={label} className="phase">
              <span className="phase-num">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <Mono style={{ color: C.ochre }}>{label}</Mono>
                <p className="phase-p">{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Band>
      <Scallop color={C.paper} />
    </section>
  )
}
