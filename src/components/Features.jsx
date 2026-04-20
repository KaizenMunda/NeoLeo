import { motion } from 'framer-motion'
import './Features.css'

const features = [
  {
    icon: '⚡',
    title: 'Fast Email Campaigns',
    description: 'Send lightning-quick email campaigns ensuring your messages reach your audience in record time.',
  },
  {
    icon: '🤝',
    title: 'Customer Relationships',
    description: 'Build meaningful connections with a beautiful and intuitive interface that simplifies interactions.',
  },
  {
    icon: '📊',
    title: 'Powerful Insights',
    description: 'Gain data-driven insights to make informed decisions and stay ahead of the competition.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

export default function Features() {
  return (
    <section className="features">
      <div className="features-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="features-header"
        >
          <h2>Transform Your Business</h2>
          <p>With Advanced AI Features crafted to meet your unique challenges and keep you ahead in a rapidly evolving digital landscape.</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="features-grid"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
              }}
              className="feature-card"
            >
              <motion.div
                className="feature-icon"
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              >
                {feature.icon}
              </motion.div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
