import { motion } from 'framer-motion'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import TrustedBy from './components/TrustedBy'
import Solutions from './components/Solutions'
import CaseStudies from './components/CaseStudies'
import Career from './components/Career'
import CTA from './components/CTA'
import Footer from './components/Footer'
import CaseStudyDetailSaksham from './components/CaseStudyDetail-Saksham'
import CaseStudyDetailSwasthya from './components/CaseStudyDetail-Swasthya'
import ParticleBackground from './components/ParticleBackground'
import CursorAnimation from './components/CursorAnimation'
import './components/animations.css'
import './components/cursor-animation.css'
import './App.css'

function HomePage() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Features />
      <TrustedBy />
      <Solutions />
      <CaseStudies />
      <Career />
      <CTA />
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <>
      <ParticleBackground density={40} color="rgba(201, 169, 97, 0.3)" />
      <CursorAnimation />
      <Router>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/case-study/saksham" element={
          <>
            <Navbar />
            <CaseStudyDetailSaksham />
            <Footer />
          </>
        } />
        <Route path="/case-study/swasthya" element={
          <>
            <Navbar />
            <CaseStudyDetailSwasthya />
            <Footer />
          </>
        } />
      </Routes>
      </Router>
    </>
  )
}
