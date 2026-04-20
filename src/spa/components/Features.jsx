import { motion } from 'framer-motion'
import './Features.css'

const items = [
  { icon: '⚡', title: 'AI-Powered Automation', text: 'Streamline workflows with intelligent automation tailored to your business.' },
  { icon: '🎯', title: 'Precision Analytics', text: 'Data-driven insights so you can decide with confidence.' },
  { icon: '🔒', title: 'Enterprise Security', text: 'Built with security-first practices for teams that cannot compromise.' },
]

export default function Features() {
  return (
    <section className="features" id="features">
      <div className="features-container">
        <div className="features-header">
          <h2>Why NeoLeo</h2>
          <p>Everything you need to elevate your digital presence—bold vision, precise execution.</p>
        </div>
        <div className="features-grid">
          {items.map((f, i) => (
            <motion.div
              key={f.title}
              className="feature-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <span className="feature-icon" aria-hidden>
                {f.icon}
              </span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
