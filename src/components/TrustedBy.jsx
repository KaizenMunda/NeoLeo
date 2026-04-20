import { motion } from 'framer-motion'
import './TrustedBy.css'

const logos = [
  '🚀', '💼', '🌟', '📱', '🎯', '⚙️', '🔧'
]

export default function TrustedBy() {
  return (
    <section className="trusted-by">
      <div className="trusted-container">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Trusted by teams at
        </motion.h2>

        <motion.div
          className="logos-scroll"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="logos-track"
            animate={{ x: [0, -2000] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {[...logos, ...logos].map((logo, index) => (
              <motion.div
                key={index}
                className="logo-item"
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                <span className="logo-emoji">{logo}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
