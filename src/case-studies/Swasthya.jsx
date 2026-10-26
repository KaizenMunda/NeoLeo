import './case-study.css'

export default function CaseStudyDetailSwasthya() {
  return (
    <div className="case-study-detail">
      <div className="detail-container">
        <div className="detail-header">
          <div className="detail-icon">🔗</div>
          <h1>Swasthya Guru</h1>
          <p className="detail-subtitle">Healthcare Specialist Matching Platform</p>
        </div>

        <div className="detail-content">
          <div className="content-section">
            <h2>Overview</h2>
            <p>
              A comprehensive healthcare consultation and specialist-matching platform connecting
              patients with verified medical professionals and healthcare facilities. Swasthya Guru
              serves over 168,000 patients with a network of 45,000+ doctors and 49 partner hospitals
              across the region.
            </p>
            <p>
              The platform revolutionizes healthcare access by eliminating geographical barriers and
              providing transparent, quality-assured consultation services. It has processed over 26,000
              successful consultations, establishing itself as a trusted healthcare marketplace.
            </p>
          </div>

          <div className="content-section">
            <h2>Key Achievements</h2>
            <ul className="achievements-list">
              <li><span className="check">✓</span> 24/7 dedicated customer support</li>
              <li><span className="check">✓</span> 45,000+ verified medical professionals</li>
              <li><span className="check">✓</span> 49+ partner hospitals and healthcare facilities</li>
              <li><span className="check">✓</span> 26,000+ successful consultations processed</li>
              <li><span className="check">✓</span> Transparent appointment and refund policies</li>
              <li><span className="check">✓</span> Advanced data security and encryption</li>
            </ul>
          </div>

          <div className="content-section">
            <h2>Impact & Scale</h2>
            <div className="stats-grid">
              <div className="stat-box">
                <div className="stat-number">168K+</div>
                <div className="stat-label">Patients Served</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">45K+</div>
                <div className="stat-label">Verified Doctors</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">49+</div>
                <div className="stat-label">Partner Hospitals</div>
              </div>
            </div>
          </div>

          <div className="content-section">
            <h2>Platform Features</h2>
            <div className="features-grid">
              <div className="feature-box">
                <div className="feature-icon">🔍</div>
                <h3>Smart Matching</h3>
                <p>Intelligent algorithm matches patients with the most suitable specialists</p>
              </div>
              <div className="feature-box">
                <div className="feature-icon">✅</div>
                <h3>Verified Professionals</h3>
                <p>All doctors and facilities undergo rigorous verification processes</p>
              </div>
              <div className="feature-box">
                <div className="feature-icon">⏰</div>
                <h3>Real-time Availability</h3>
                <p>Live booking system with instant confirmation</p>
              </div>
              <div className="feature-box">
                <div className="feature-icon">💬</div>
                <h3>24/7 Support</h3>
                <p>Round-the-clock customer support team</p>
              </div>
              <div className="feature-box">
                <div className="feature-icon">🔒</div>
                <h3>Secure & Private</h3>
                <p>End-to-end encryption for all patient data</p>
              </div>
              <div className="feature-box">
                <div className="feature-icon">💰</div>
                <h3>Transparent Pricing</h3>
                <p>Clear pricing with flexible payment options</p>
              </div>
            </div>
          </div>

          <div className="content-section">
            <h2>Technical Implementation</h2>
            <p>
              Swasthya Guru is built on a scalable microservices architecture using Node.js and
              Express.js for the backend, with React providing a responsive user interface. The
              platform implements advanced matching algorithms, real-time notifications, and secure
              payment processing.
            </p>
            <p>
              Key technical highlights include high-availability infrastructure capable of handling
              thousands of concurrent users, robust verification workflows, automated scheduling
              systems, and comprehensive audit logging for healthcare compliance.
            </p>
          </div>

          <div className="content-section">
            <h2>Image Gallery</h2>
            <div className="gallery-placeholder">
              <div className="gallery-content">
                <span>📸</span>
                <p>Platform Screenshots & Interface Gallery</p>
                <small>Booking flows, doctor profiles, and consultation interfaces coming soon</small>
              </div>
            </div>
          </div>

          <div className="content-section">
            <h2>Visit the Platform</h2>
            <a
              href="https://swasthya.guru"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-link"
            >
              Explore Swasthya Guru →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
