import { lazy, Suspense } from 'react'
import { HashRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom'
import Subpage, { BackHomeLink } from './site/Subpage'
import CaseStudyDetailAyu from './case-studies/Ayu'
import CaseStudyDetailSaksham from './case-studies/Saksham'
import CaseStudyDetailSwasthya from './case-studies/Swasthya'
import './site/site.css'

const OfficePage = lazy(() => import('./office/OfficePage'))

function OfficeRoute() {
  return (
    <Suspense fallback={<div style={{ position: 'fixed', inset: 0, background: '#001f20' }} />}>
      <OfficePage />
    </Suspense>
  )
}

function LegacyOfficeRedirect() {
  const { section } = useParams()
  return <Navigate to={`/${section}`} replace />
}

function AyuCaseStudy() {
  return (
    <Subpage>
      <BackHomeLink />
      <CaseStudyDetailAyu />
    </Subpage>
  )
}

function SakshamCaseStudy() {
  return (
    <Subpage>
      <BackHomeLink />
      <CaseStudyDetailSaksham />
    </Subpage>
  )
}

function SwasthyaCaseStudy() {
  return (
    <Subpage>
      <BackHomeLink />
      <CaseStudyDetailSwasthya />
    </Subpage>
  )
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OfficeRoute />} />
        <Route path="/case-study/ayu" element={<AyuCaseStudy />} />
        <Route path="/case-study/saksham" element={<SakshamCaseStudy />} />
        <Route path="/case-study/swasthya" element={<SwasthyaCaseStudy />} />
        <Route path="/office" element={<Navigate to="/" replace />} />
        <Route path="/office/:section" element={<LegacyOfficeRedirect />} />
        <Route path="/:section/*" element={<OfficeRoute />} />
      </Routes>
    </Router>
  )
}
