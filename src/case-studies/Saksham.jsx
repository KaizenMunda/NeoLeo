import './case-study.css'

export default function CaseStudyDetailSaksham() {
  return (
    <div className="case-study-detail">
      <div className="detail-container">
        <div className="detail-header">
          <div className="detail-icon">🏥</div>
          <h1>Saksham Hospital</h1>
          <p className="detail-subtitle">Hospital Management & Finance Platform</p>
        </div>

        <div className="detail-content">
          <div className="content-section">
            <h2>Overview</h2>
            <p>
              I built an end-to-end hospital operations and finance platform that unifies day-to-day
              clinical workflows with a complete accounting/reconciliation system. The system
              centralizes patient, doctor, billing, and payment data into a single source of truth.
            </p>
          </div>

          <div className="content-section">
            <h2>Key Achievements</h2>
            <ul className="achievements-list">
              <li>
                <span className="check">✓</span> Unified operations dashboard with registration,
                OPD/IPD/emergency workflows
              </li>
              <li>
                <span className="check">✓</span> Finance & reconciliation system with ledger-style
                tracking
              </li>
              <li>
                <span className="check">✓</span> Standardized classification taxonomy (L1/L2/L3)
              </li>
              <li>
                <span className="check">✓</span> Profit & Loss reporting with financial year awareness
              </li>
              <li>
                <span className="check">✓</span> Cash & wallet custody controls with audit trails
              </li>
              <li>
                <span className="check">✓</span> Automated PDF reports and documentation
              </li>
            </ul>
          </div>

          <div className="content-section">
            <h2>Impact & Scale</h2>
            <div className="stats-grid">
              <div className="stat-box">
                <div className="stat-number">100+</div>
                <div className="stat-label">Active Users</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">20+</div>
                <div className="stat-label">Features</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">Multi-Dept</div>
                <div className="stat-label">Support</div>
              </div>
            </div>
          </div>

          <div className="content-section">
            <h2>Technical Implementation</h2>
            <p>
              The platform was built with a modern tech stack featuring a React-based frontend, a
              robust Node.js backend with Express.js for API management, and a comprehensive database
              architecture optimized for healthcare data integrity and HIPAA compliance.
            </p>
            <p>
              Key technical highlights include real-time synchronization of patient and financial data,
              advanced role-based access control for multi-department operations, automated billing
              reconciliation, and comprehensive audit logging for regulatory compliance.
            </p>
          </div>

          <div className="content-section">
            <h2>Image Gallery</h2>
            <div className="gallery-placeholder">
              <div className="gallery-content">
                <span>📸</span>
                <p>Project Screenshots & Media Gallery</p>
                <small>
                  Dashboard views, workflow diagrams, and interface screenshots coming soon
                </small>
              </div>
            </div>
          </div>

          <div className="content-section">
            <h2>Visit the Platform</h2>
            <a
              href="https://sakshamhospital.com"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-link"
            >
              View Saksham Hospital →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
