import { C } from './tokens'

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
  Solutions: [
    { label: 'Healthcare Systems', to: '/projects' },
    { label: 'Financial Platforms', to: '/projects' },
    { label: 'Specialist Network', to: '/projects' },
    { label: 'Compliance', to: '/vision' },
  ],
  Company: [
    { label: 'About', to: '/vision' },
    { label: 'Careers', to: '/careers' },
    { label: 'Contact', to: '/contact' },
  ],
  Resources: [
    { label: 'Case Studies', to: '/projects' },
    { label: 'Documentation', to: '/contact' },
    { label: 'Support', to: '/contact' },
  ],
}
