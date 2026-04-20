import { motion } from 'framer-motion'
import './CTA.css'

export default function CTA() {
  return (
    <section className="cta">
      <div className="cta-content">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Ready to build what&apos;s next?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Join teams using NeoLeo to ship intelligent systems with confidence.
        </motion.p>
        <div className="cta-buttons">
          <motion.button type="button" className="cta-primary" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            Get Started
          </motion.button>
          <motion.button type="button" className="cta-secondary" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            Talk to us
          </motion.button>
        </div>
        <div className="cta-lion" aria-hidden>
          🦁
        </div>
      </div>
    </section>
  )
}
