import { C } from './tokens'
import { Mono } from './kit'
import { TRUSTED_LOGOS } from './content'

export default function TrustedBy() {
  return (
    <section className="pc-trusted">
      <div className="pc-trusted__inner">
        <Mono style={{ color: C.inkDim, display: 'block', textAlign: 'center', marginBottom: 24 }}>
          Trusted by teams at
        </Mono>
        <div className="pc-trusted__logos">
          {TRUSTED_LOGOS.map((emoji) => (
            <div key={emoji} className="pc-trusted__logo">
              <span aria-hidden="true">{emoji}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
