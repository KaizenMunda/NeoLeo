import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './CaseStudies.css'

const caseStudies = [
  {
    id: 1,
    title: 'Saksham Hospital',
    subtitle: 'Hospital Management & Finance Platform',
    description: 'I built an end-to-end hospital operations and finance platform that unifies day-to-day clinical workflows with a complete accounting/reconciliation system. The system centralizes patient, doctor, billing, and payment data into a single source of truth.',
    achievement: 'End-to-End Hospital Operations Platform',
    stats: [
      { label: 'Departments', value: 'Multi-Dept' },
      { label: 'Features', value: '20+' },
      { label: 'Users', value: '100+' },
    ],
    highlights: [
      'Unified operations dashboard with registration, OPD/IPD/emergency workflows',
      'Finance & reconciliation system with ledger-style tracking',
      'Standardized classification taxonomy (L1/L2/L3)',
      'Profit & Loss reporting with financial year awareness',
      'Cash & wallet custody controls with audit trails',
      'Automated PDF reports and documentation',
    ],
    detailPage: '/case-study/saksham',
    website: 'sakshamhospital.com',
    color: '#FFD700',
  },
  {
    id: 2,
    title: 'Swasthya Guru',
    subtitle: 'Healthcare Specialist Matching Platform',
    description: 'A comprehensive healthcare consultation and specialist-matching platform connecting patients with verified medical professionals and healthcare facilities. Serving over 168,000 patients with a network of 45,000+ doctors and 49 hospitals.',
    achievement: 'Healthcare Specialist Network',
    stats: [
      { label: 'Patients', value: '168K+' },
      { label: 'Doctors', value: '45K+' },
      { label: 'Hospitals', value: '49+' },
    ],
    highlights: [
      '24/7 dedicated customer support',
      '45,000+ verified medical professionals',
      '49+ partner hospitals and healthcare facilities',
      '26,000+ successful consultations',
      'Transparent appointment and refund policies',
      'Advanced data security and encryption',
    ],
    detailPage: '/case-study/swasthya',
    website: 'swasthya.guru',
    color: '#FFD700',
  },
]

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
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

export default function CaseStudies() {
  const [expandedId, setExpandedId] = useState(null)
  const navigate = useNavigate()

  return (
    <section className="case-studies" id="case-studies">
      <div className="case-studies-container">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="case-studies-header"
        >
          <h2>Case Studies</h2>
          <p>Real-world projects that transformed businesses through innovative technology and strategic execution</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="case-studies-grid"
        >
          {caseStudies.map((study) => (
            <motion.div
              key={study.id}
              variants={itemVariants}
              className={`case-study-card ${expandedId === study.id ? 'expanded' : ''}`}
              onClick={() => setExpandedId(expandedId === study.id ? null : study.id)}
            >
              <motion.div
                className="case-study-header"
                whileHover={{ y: -5 }}
              >
                <div className="case-study-title-section">
                  <motion.div
                    className="case-study-icon"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    🏥
                  </motion.div>
                  <div>
                    <h3>{study.title}</h3>
                    <p className="subtitle">{study.subtitle}</p>
                  </div>
                </div>
                <motion.div
                  className="expand-icon"
                  animate={{ rotate: expandedId === study.id ? 180 : 0 }}
                >
                  ▼
                </motion.div>
              </motion.div>

              <p className="case-study-description">{study.description}</p>

              <div className="case-study-stats">
                {study.stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    className="stat"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Image Carousel Placeholder */}
              <motion.div
                className="carousel-placeholder"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="carousel-content">
                  <span>📸</span>
                  <p>Project Screenshots & Media</p>
                  <small>Image carousel will display project visuals</small>
                </div>
              </motion.div>

              {/* Expanded Content */}
              <motion.div
                className="expanded-content"
                animate={{
                  opacity: expandedId === study.id ? 1 : 0,
                  height: expandedId === study.id ? 'auto' : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="highlights">
                  <h4>Key Achievements</h4>
                  <ul>
                    {study.highlights.map((highlight, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{
                          opacity: expandedId === study.id ? 1 : 0,
                          x: expandedId === study.id ? 0 : -20,
                        }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <span className="highlight-icon">✓</span>
                        {highlight}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <motion.button
                  onClick={() => navigate(study.detailPage)}
                  className="case-study-link"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More →
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
