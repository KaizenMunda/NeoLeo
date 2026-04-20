import { motion } from 'framer-motion'
import './Footer.css'

const footerLinks = {
  Solutions: ['Healthcare Systems', 'Financial Platforms', 'Specialist Network', 'Compliance'],
  Company: ['About', 'Careers', 'Contact'],
  Resources: ['Case Studies', 'Documentation', 'Support'],
}

export default function Footer() {
  return (
    <footer className="footer">
      <motion.div
        className="footer-content"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="footer-top">
          <motion.div className="footer-brand">
            <span className="footer-logo">🦁 NeoLeo</span>
            <p>Transforming businesses with bold vision and precise execution.</p>
          </motion.div>

          <div className="footer-links">
            {Object.entries(footerLinks).map(([category, links]) => (
              <motion.div
                key={category}
                className="footer-column"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
              >
                <h4>{category}</h4>
                <ul>
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#">{link}</a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="footer-contact">
            <p>&copy; 2024 NeoLeo. All rights reserved.</p>
            <p>
              Contact us: <a href="mailto:saksham@neoleo.tech">saksham@neoleo.tech</a>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  )
}
