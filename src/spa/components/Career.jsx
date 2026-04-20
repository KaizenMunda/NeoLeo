import { motion } from 'framer-motion'
import './Career.css'

const openPositions = [
  {
    id: 1,
    title: 'Senior Full Stack Developer',
    department: 'Engineering',
    level: 'Senior',
    description: 'Build scalable healthcare systems with React, Node.js, and modern architecture patterns.',
    highlights: ['React & Node.js', 'System Design', 'Healthcare Domain', 'Team Lead'],
  },
  {
    id: 2,
    title: 'Product Designer',
    department: 'Design',
    level: 'Mid-Level',
    description: 'Design intuitive interfaces for healthcare platforms serving millions of users.',
    highlights: ['UI/UX Design', 'Healthcare Focus', 'Design Systems', 'User Research'],
  },
  {
    id: 3,
    title: 'DevOps Engineer',
    department: 'Infrastructure',
    level: 'Mid-Level',
    description: 'Manage cloud infrastructure, CI/CD pipelines, and ensure high availability systems.',
    highlights: ['AWS', 'Kubernetes', 'Infrastructure as Code', 'Security'],
  },
  {
    id: 4,
    title: 'Healthcare Solutions Architect',
    department: 'Solutions',
    level: 'Senior',
    description: 'Design end-to-end healthcare solutions tailored to client needs.',
    highlights: ['Solution Design', 'Client Management', 'HIPAA Compliance', 'Strategic Planning'],
  },
]

const benefits = [
  { icon: '💼', title: 'Competitive Salary', desc: 'Industry-leading compensation packages' },
  { icon: '🏥', title: 'Health Benefits', desc: 'Comprehensive health and wellness coverage' },
  { icon: '🧑‍💼', title: 'Professional Growth', desc: 'Career development and learning opportunities' },
  { icon: '🌍', title: 'Remote Friendly', desc: 'Work from anywhere, flexible arrangements' },
  { icon: '🎯', title: 'Impact Driven', desc: 'Build products that transform healthcare' },
  { icon: '🤝', title: 'Great Team', desc: 'Collaborative and supportive culture' },
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export default function Career() {
  return (
    <section className="career" id="career">
      <div className="career-container">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="career-header"
        >
          <h2>Join Our Team</h2>
          <p>Help us transform healthcare with innovative technology and bold vision</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="benefits-grid"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="benefit-item"
            >
              <div className="benefit-icon">{benefit.icon}</div>
              <h3>{benefit.title}</h3>
              <p>{benefit.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="positions-section"
        >
          <h2>Open Positions</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="positions-grid"
          >
            {openPositions.map((position) => (
              <motion.div
                key={position.id}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  boxShadow: '0 20px 50px rgba(255, 215, 0, 0.2)',
                }}
                className="position-card"
              >
                <div className="position-header">
                  <div>
                    <h3>{position.title}</h3>
                    <p className="position-department">{position.department}</p>
                  </div>
                  <span className="position-level">{position.level}</span>
                </div>

                <p className="position-description">{position.description}</p>

                <div className="position-highlights">
                  {position.highlights.map((highlight, idx) => (
                    <motion.span
                      key={idx}
                      className="highlight-tag"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      {highlight}
                    </motion.span>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="apply-button"
                >
                  Apply Now →
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="career-cta"
        >
          <h2>Don't see a perfect fit?</h2>
          <p>We're always looking for talented individuals. Send us your resume and tell us how you'd like to contribute!</p>
          <motion.a
            href="mailto:saksham@neoleo.tech"
            className="cta-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send Your Resume
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
