import { motion } from 'framer-motion'
import './Solutions.css'

const solutions = [
  {
    id: 1,
    title: 'Healthcare Management Systems',
    icon: '🏥',
    description: 'End-to-end hospital operations platforms with integrated patient management, clinical workflows, and financial systems.',
    features: [
      'Patient registration & management',
      'OPD/IPD/Emergency workflows',
      'Doctor & staff management',
      'Appointment scheduling',
      'Medical records digitization',
    ],
  },
  {
    id: 2,
    title: 'Financial & Billing Systems',
    icon: '💰',
    description: 'Complete accounting and reconciliation systems with automated billing, payment tracking, and financial reporting.',
    features: [
      'Automated billing & invoicing',
      'Payment reconciliation',
      'Financial reporting & P&L',
      'Multi-currency support',
      'Audit trail & compliance',
    ],
  },
  {
    id: 3,
    title: 'Healthcare Marketplace',
    icon: '🔗',
    description: 'Specialist-matching platforms connecting patients with verified doctors and healthcare facilities.',
    features: [
      'Doctor verification & profiles',
      'Real-time availability',
      'Consultation booking',
      '24/7 customer support',
      'Transparent pricing',
    ],
  },
  {
    id: 4,
    title: 'Operations & Workflow',
    icon: '⚙️',
    description: 'Streamline complex operational workflows with role-based access, automation, and real-time reporting.',
    features: [
      'Role-based dashboards',
      'Automated workflows',
      'Real-time analytics',
      'Multi-department support',
      'Custom configurations',
    ],
  },
  {
    id: 5,
    title: 'Data & Reporting',
    icon: '📊',
    description: 'Advanced analytics and reporting tools for data-driven decision making and business intelligence.',
    features: [
      'Custom report builder',
      'Real-time dashboards',
      'Performance metrics',
      'Export capabilities',
      'Data visualization',
    ],
  },
  {
    id: 6,
    title: 'Security & Compliance',
    icon: '🔒',
    description: 'Enterprise-grade security with encryption, audit trails, and regulatory compliance for sensitive data.',
    features: [
      'End-to-end encryption',
      'Role-based access control',
      'Audit logging',
      'Data backup & recovery',
      'HIPAA compliance',
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export default function Solutions() {
  return (
    <section className="solutions" id="solutions">
      <div className="solutions-container">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="solutions-header"
        >
          <h2>Our Solutions</h2>
          <p>Comprehensive technology solutions designed to transform healthcare operations and deliver measurable results</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="solutions-grid"
        >
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.id}
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow: '0 20px 50px rgba(255, 215, 0, 0.2)',
              }}
              className="solution-card"
            >
              <motion.div
                className="solution-icon"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: 'easeInOut',
                }}
              >
                {solution.icon}
              </motion.div>

              <h3>{solution.title}</h3>
              <p className="solution-description">{solution.description}</p>

              <div className="features-list">
                {solution.features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    className="feature-item"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <span className="feature-icon">•</span>
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="card-footer"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="learn-more-btn"
                >
                  Learn More →
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Solution Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="solutions-highlights"
        >
          <h3>Why Choose NeoLeo?</h3>
          <div className="highlights-grid">
            {[
              { icon: '⚡', title: 'Fast Implementation', desc: 'Get up and running quickly with proven deployment processes' },
              { icon: '🎯', title: 'Custom Solutions', desc: 'Tailored systems that fit your specific business needs' },
              { icon: '📈', title: 'Scalable', desc: 'Grows with your business from startup to enterprise' },
              { icon: '💼', title: 'Professional Support', desc: '24/7 dedicated support team for your success' },
            ].map((highlight, idx) => (
              <motion.div
                key={idx}
                className="highlight-item"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="highlight-icon">{highlight.icon}</div>
                <h4>{highlight.title}</h4>
                <p>{highlight.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
