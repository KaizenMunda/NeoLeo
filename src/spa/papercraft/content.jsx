import { C } from './tokens'

export const FEATURES = [
  {
    icon: '⚡',
    title: 'AI-Powered Automation',
    text: 'Streamline workflows with intelligent automation tailored to your business.',
    accent: C.ochre,
  },
  {
    icon: '🎯',
    title: 'Precision Analytics',
    text: 'Data-driven insights so you can decide with confidence.',
    accent: C.terra,
  },
  {
    icon: '🔒',
    title: 'Enterprise Security',
    text: 'Built with security-first practices for teams that cannot compromise.',
    accent: C.teal700,
  },
]

export const TRUSTED_LOGOS = ['🚀', '💼', '🌐', '⚙️', '📊', '🏢', '✨']

export const AI_SOLUTIONS = [
  {
    t: 'Visual recognition',
    d: 'Automated image and video analysis for fast, actionable insights.',
    c: C.terra,
    icon: (
      <g>
        <circle cx="24" cy="24" r="15" fill="none" stroke="currentColor" strokeWidth="2.4" />
        <circle cx="24" cy="24" r="5.5" fill="currentColor" />
        <path
          d="M6 14V8h6M42 14V8h-6M6 34v6h6M42 34v6h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </g>
    ),
  },
  {
    t: 'AI-driven personalization',
    d: 'Personalized interactions based on unique customer behaviors.',
    c: C.ochre,
    icon: (
      <g>
        <circle cx="18" cy="17" r="7.5" fill="none" stroke="currentColor" strokeWidth="2.4" />
        <path
          d="M6 40c0-7 5.5-12 12-12s12 5 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M34 12v14M41 15v8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <circle cx="37.5" cy="34" r="2.6" fill="currentColor" />
      </g>
    ),
  },
  {
    t: 'Cybersecurity',
    d: 'Proactive threat detection and neutralization to keep your business secure.',
    c: C.teal700,
    icon: (
      <g>
        <path
          d="M24 5l15 6v12c0 10-6.5 16.5-15 20-8.5-3.5-15-10-15-20V11z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <path
          d="M17 23l5 5 10-10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
]

export const PLATFORM_SOLUTIONS = [
  {
    id: 1,
    title: 'Healthcare Management Systems',
    icon: '🏥',
    description:
      'End-to-end hospital operations platforms with integrated patient management, clinical workflows, and financial systems.',
    features: [
      'Patient registration & management',
      'OPD/IPD/Emergency workflows',
      'Doctor & staff management',
      'Appointment scheduling',
      'Medical records digitization',
    ],
    accent: C.teal700,
  },
  {
    id: 2,
    title: 'Financial & Billing Systems',
    icon: '💰',
    description:
      'Complete accounting and reconciliation systems with automated billing, payment tracking, and financial reporting.',
    features: [
      'Automated billing & invoicing',
      'Payment reconciliation',
      'Financial reporting & P&L',
      'Multi-currency support',
      'Audit trail & compliance',
    ],
    accent: C.ochre,
  },
  {
    id: 3,
    title: 'Healthcare Marketplace',
    icon: '🔗',
    description:
      'Specialist-matching platforms connecting patients with verified doctors and healthcare facilities.',
    features: [
      'Doctor verification & profiles',
      'Real-time availability',
      'Consultation booking',
      '24/7 customer support',
      'Transparent pricing',
    ],
    accent: C.terra,
  },
  {
    id: 4,
    title: 'Operations & Workflow',
    icon: '⚙️',
    description:
      'Streamline complex operational workflows with role-based access, automation, and real-time reporting.',
    features: [
      'Role-based dashboards',
      'Automated workflows',
      'Real-time analytics',
      'Multi-department support',
      'Custom configurations',
    ],
    accent: C.tan,
  },
  {
    id: 5,
    title: 'Data & Reporting',
    icon: '📊',
    description:
      'Advanced analytics and reporting tools for data-driven decision making and business intelligence.',
    features: [
      'Custom report builder',
      'Real-time dashboards',
      'Performance metrics',
      'Export capabilities',
      'Data visualization',
    ],
    accent: C.teal700,
  },
  {
    id: 6,
    title: 'Security & Compliance',
    icon: '🔒',
    description:
      'Enterprise-grade security with encryption, audit trails, and regulatory compliance for sensitive data.',
    features: [
      'End-to-end encryption',
      'Role-based access control',
      'Audit logging',
      'Data backup & recovery',
      'HIPAA compliance',
    ],
    accent: C.terra,
  },
]

export const SOLUTION_HIGHLIGHTS = [
  { icon: '⚡', title: 'Fast Implementation', desc: 'Get up and running quickly with proven deployment processes' },
  { icon: '🎯', title: 'Custom Solutions', desc: 'Tailored systems that fit your specific business needs' },
  { icon: '📈', title: 'Scalable', desc: 'Grows with your business from startup to enterprise' },
  { icon: '💼', title: 'Professional Support', desc: '24/7 dedicated support team for your success' },
]

export const CASE_STUDIES = [
  {
    id: 'ayu',
    icon: '📱',
    title: 'Ayu',
    subtitle: 'Personal health records, organised',
    description:
      'AI-powered prescription capture, medication tracking, and secure doctor sharing — built for India\'s digital health stack.',
    achievement: 'Mobile app — Health / MedTech',
    stats: [
      { label: 'Platform', value: 'iOS & Android' },
      { label: 'Backend', value: 'Supabase' },
      { label: 'Status', value: 'In dev' },
    ],
    highlights: [
      'AI-first capture — photograph a prescription and get structured fields extracted automatically',
      'Private vault model — row-level security; no ads, no selling data',
      'ABDM / ABHA national health ID integration (India V3 HIU standard)',
      'Family access — caregivers granted view or co-manage access',
      'Doctor share — time-limited, revocable links with records the patient chooses',
    ],
    detailPage: '/case-study/ayu',
    accent: '#14B8A6',
    isAyu: true,
  },
  {
    icon: '🏥',
    title: 'Saksham Hospital',
    subtitle: 'Hospital Management & Finance Platform',
    description:
      'I built an end-to-end hospital operations and finance platform that unifies day-to-day clinical workflows with a complete accounting/reconciliation system. The system centralizes patient, doctor, billing, and payment data into a single source of truth.',
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
    accent: C.teal700,
  },
  {
    id: 'swasthya',
    icon: '🔗',
    title: 'Swasthya Guru',
    subtitle: 'Healthcare Specialist Matching Platform',
    description:
      'A comprehensive healthcare consultation and specialist-matching platform connecting patients with verified medical professionals and healthcare facilities. Serving over 168,000 patients with a network of 45,000+ doctors and 49 hospitals.',
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
    accent: C.ochre,
  },
]

export const QUOTES = [
  [
    'The visual recognition technology has streamlined our processes and provided us with valuable insights. NeoLeo is a key partner in our success.',
    C.terra,
  ],
  [
    'Thanks to NeoLeo’s AI-driven personalization, we’ve seen a dramatic increase in customer satisfaction and engagement. It’s truly exceptional.',
    C.ochre,
  ],
  [
    'The cybersecurity solutions from NeoLeo offer unparalleled protection for our data. We feel confident and secure knowing our systems are in good hands.',
    C.teal700,
  ],
]

export const PHASES = [
  [
    'Integrate',
    'Identify your unique needs and seamlessly integrate our AI solutions into your existing systems.',
  ],
  ['Fine-tune', 'Fine-tune our AI tools to maximize efficiency and effectiveness.'],
  ['Grow', 'Drive growth and efficiency at every step.'],
]

export const BENEFITS = [
  { icon: '💼', title: 'Competitive Salary', desc: 'Industry-leading compensation packages' },
  { icon: '🏥', title: 'Health Benefits', desc: 'Comprehensive health and wellness coverage' },
  { icon: '🧑‍💼', title: 'Professional Growth', desc: 'Career development and learning opportunities' },
  { icon: '🌍', title: 'Remote Friendly', desc: 'Work from anywhere, flexible arrangements' },
  { icon: '🎯', title: 'Impact Driven', desc: 'Build products that transform healthcare' },
  { icon: '🤝', title: 'Great Team', desc: 'Collaborative and supportive culture' },
]

export const OPEN_POSITIONS = [
  {
    id: 1,
    title: 'Senior Full Stack Developer',
    department: 'Engineering',
    level: 'Senior',
    description:
      'Build scalable healthcare systems with React, Node.js, and modern architecture patterns.',
    highlights: ['React & Node.js', 'System Design', 'Healthcare Domain', 'Team Lead'],
  },
  {
    id: 2,
    title: 'Product Designer',
    department: 'Design',
    level: 'Mid-Level',
    description:
      'Design intuitive interfaces for healthcare platforms serving millions of users.',
    highlights: ['UI/UX Design', 'Healthcare Focus', 'Design Systems', 'User Research'],
  },
  {
    id: 3,
    title: 'DevOps Engineer',
    department: 'Infrastructure',
    level: 'Mid-Level',
    description:
      'Manage cloud infrastructure, CI/CD pipelines, and ensure high availability systems.',
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

export const FOOTER_LINKS = {
  Solutions: ['Healthcare Systems', 'Financial Platforms', 'Specialist Network', 'Compliance'],
  Company: ['About', 'Careers', 'Contact'],
  Resources: ['Case Studies', 'Documentation', 'Support'],
}
