import './CaseStudyDetail.css'

export default function CaseStudyDetailAyu() {
  return (
    <div className="case-study-detail">
      <div className="detail-container">
        <div className="detail-header">
          <div className="detail-icon">📱</div>
          <h1>Ayu</h1>
          <p className="detail-subtitle">Personal health records, organised</p>
        </div>

        <div className="pc-ayu-hero-placeholder" aria-hidden="true">
          <span className="pc-ayu-hero-placeholder__mark">Ayu</span>
          <span className="pc-ayu-hero-placeholder__tag">Health vault · Flutter · Supabase</span>
        </div>

        <div className="detail-content">
          <div className="content-section">
            <h2>Overview</h2>
            <p>
              Ayu is a personal health records app for iOS and Android. It lets patients and
              caregivers photograph prescriptions, lab reports, and bills, then automatically
              extracts structured data using AI so records are searchable and organised. Users
              track active medications and supplements, share a time-limited health summary with a
              doctor before a visit, and optionally link their ABHA national health ID
              (India&apos;s government digital health identity).
            </p>
            <p>
              Built in Flutter with a Supabase backend (Postgres + Edge Functions), with Anthropic
              Claude powering document extraction. Privacy-first: no ads, user-owned data,
              one-tap account deletion.
            </p>
          </div>

          <div className="content-section">
            <h2>Key capabilities</h2>
            <ul className="achievements-list">
              <li>
                <span className="check">✓</span> AI-first capture — structured fields (medicine,
                dose, instructions, doctor, date) from prescription photos
              </li>
              <li>
                <span className="check">✓</span> Private vault — health data stays user-owned;
                row-level security on all tables
              </li>
              <li>
                <span className="check">✓</span> India digital health — ABDM ABHA integration;
                building to the V3 HIU standard
              </li>
              <li>
                <span className="check">✓</span> Family access — caregivers with view or
                co-manage permissions
              </li>
              <li>
                <span className="check">✓</span> Doctor share — revocable, time-limited links
                with exactly the records the patient selects
              </li>
            </ul>
          </div>

          <div className="content-section">
            <h2>Technical stack</h2>
            <div className="stats-grid">
              <div className="stat-box">
                <div className="stat-number">Flutter</div>
                <div className="stat-label">iOS &amp; Android</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">Supabase</div>
                <div className="stat-label">Postgres + Edge Functions</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">Claude</div>
                <div className="stat-label">Document extraction</div>
              </div>
            </div>
          </div>

          <div className="content-section">
            <h2>Status</h2>
            <p>
              In development; store submission in progress. Ayu is not a medical device and does
              not provide clinical advice.
            </p>
          </div>

          <div className="content-section">
            <h2>Legal &amp; privacy</h2>
            <p>
              Privacy Policy and Terms of Service for App Store and Play Console compliance:
            </p>
            <div className="pc-case-study-legal-links">
              <a href="/legal/ayu/privacy" className="cta-link">
                Privacy Policy →
              </a>
              <a href="/legal/ayu/terms" className="btn-outline-dark">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
