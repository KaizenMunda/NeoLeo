import './TrustedBy.css'

const logos = ['🚀', '💼', '🌐', '⚙️', '📊', '🏢', '✨']

export default function TrustedBy() {
  return (
    <section className="trusted-by">
      <div className="trusted-container">
        <h2>Trusted by teams at</h2>
        <div className="logos-scroll">
          <div className="logos-track">
            {logos.map((emoji) => (
              <div key={emoji} className="logo-item">
                <span className="logo-emoji" aria-hidden>
                  {emoji}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
