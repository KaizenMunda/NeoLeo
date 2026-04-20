import { motion } from 'framer-motion'
import './Hero.css'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

export default function Hero() {
  return (
    <section className="hero" id="about">
      <div className="hero-content">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="hero-text"
        >
          <motion.div variants={itemVariants} className="hero-title">
            <span className="neo">NEO</span>
            <span className="leo">LEO</span>
          </motion.div>

          <motion.p variants={itemVariants} className="hero-subtitle">
            <strong>Bold Vision</strong> <br />
            <strong>Precise Execution</strong>
          </motion.p>

          <motion.p variants={itemVariants} className="hero-description">
            Elevate Your Business with Advanced AI Solutions. Featuring sleek animations and intelligent systems, NeoLeo helps you build your digital presence with ease and confidence.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="hero-buttons"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="primary-btn"
            >
              Get Started
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="secondary-btn"
            >
              Learn More →
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <div className="lion-container">
            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="lion-emoji"
            >
              🦁
            </motion.div>

            <motion.div
              className="lion-glow"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(255, 193, 7, 0.3)',
                  '0 0 40px rgba(255, 193, 7, 0.6)',
                  '0 0 20px rgba(255, 193, 7, 0.3)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
