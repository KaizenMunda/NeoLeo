import { motion } from 'framer-motion'
import { useState } from 'react'
import './Navbar.css'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Solutions', id: 'solutions' },
    { label: 'Case Studies', id: 'case-studies' },
    { label: 'Careers', id: 'career' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="navbar"
    >
      <div className="navbar-container">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="logo"
          onClick={() => scrollToSection('about')}
          style={{ cursor: 'pointer' }}
        >
          <span className="lion-icon">🦁</span>
          <span className="logo-text">NeoLeo</span>
        </motion.div>

        <div className="nav-links">
          {navItems.map((item, i) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (i + 1) }}
              onClick={() => scrollToSection(item.id)}
              className="nav-link"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              {item.label}
            </motion.button>
          ))}
        </div>

        <motion.a
          href="mailto:saksham@neoleo.tech"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="cta-button"
        >
          Contact Us
        </motion.a>
      </div>
    </motion.nav>
  )
}
