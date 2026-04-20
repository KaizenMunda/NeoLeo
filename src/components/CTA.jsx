import { motion } from 'framer-motion'
import './CTA.css'

export default function CTA() {
  return (
    <section className="cta">
      <motion.div
        className="cta-content"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Ready to Elevate Your Business?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Join hundreds of teams already transforming their business with NeoLeo's advanced AI solutions.
        </motion.p>

        <motion.div
          className="cta-buttons"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="cta-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Free
          </motion.button>
          <motion.button
            className="cta-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Schedule Demo
          </motion.button>
        </motion.div>

        <motion.div
          className="cta-lion"
          animate={{
            y: [0, -30, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          🦁
        </motion.div>
      </motion.div>
    </section>
  )
}
