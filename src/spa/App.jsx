import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Hero from './papercraft/Hero'
import Features from './papercraft/Features'
import TrustedBy from './papercraft/TrustedBy'
import Solutions from './papercraft/Solutions'
import Approach from './papercraft/Approach'
import CaseStudies from './papercraft/CaseStudies'
import Voices from './papercraft/Voices'
import Career from './papercraft/Career'
import MidCta from './papercraft/MidCta'
import Contact from './papercraft/Contact'
import PapercraftSubpage, { BackHomeLink } from './papercraft/PapercraftSubpage'
import CaseStudyDetailAyu from './components/CaseStudyDetail-Ayu'
import CaseStudyDetailSaksham from './components/CaseStudyDetail-Saksham'
import CaseStudyDetailSwasthya from './components/CaseStudyDetail-Swasthya'
import './papercraft/papercraft.css'

function HomePage() {
  return (
    <div className="papercraft">
      <Hero />
      <Features />
      <TrustedBy />
      <Solutions />
      <Approach />
      <CaseStudies />
      <Voices />
      <Career />
      <MidCta />
      <Contact />
    </div>
  )
}

function AyuCaseStudy() {
  return (
    <PapercraftSubpage>
      <BackHomeLink />
      <CaseStudyDetailAyu />
    </PapercraftSubpage>
  )
}

function SakshamCaseStudy() {
  return (
    <PapercraftSubpage>
      <BackHomeLink />
      <CaseStudyDetailSaksham />
    </PapercraftSubpage>
  )
}

function SwasthyaCaseStudy() {
  return (
    <PapercraftSubpage>
      <BackHomeLink />
      <CaseStudyDetailSwasthya />
    </PapercraftSubpage>
  )
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/case-study/ayu" element={<AyuCaseStudy />} />
        <Route path="/case-study/saksham" element={<SakshamCaseStudy />} />
        <Route path="/case-study/swasthya" element={<SwasthyaCaseStudy />} />
      </Routes>
    </Router>
  )
}
