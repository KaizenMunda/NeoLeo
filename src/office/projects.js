import { CASE_STUDIES } from '../site/content'

// Projects shown on the office computer, grouped into categories.
// To add a project: add an entry to a category's `projects` list.
// To add a category: add an object to CATEGORIES (an empty `projects` list shows "Coming soon").
//
// Project fields (all optional except id + name):
//   subtitle, client, status, icon, description, stats [{label, value}], highlights [string],
//   website ('example.com'), caseStudy ('/case-study/...')

const fromCaseStudy = (title) => {
  const c = CASE_STUDIES.find((x) => x.title === title)
  if (!c) return {}
  return {
    icon: c.icon,
    subtitle: c.subtitle,
    description: c.description,
    stats: c.stats,
    highlights: c.highlights,
    website: c.website,
    caseStudy: c.detailPage,
  }
}

export const CATEGORIES = [
  {
    id: 'business-software',
    name: 'Business Management Software',
    blurb: 'Systems that run day-to-day operations and finance.',
    projects: [
      {
        id: 'curia',
        name: 'Curia',
        client: 'Saksham Hospital',
        status: 'Live',
        ...fromCaseStudy('Saksham Hospital'),
        subtitle: 'Hospital management & finance system',
      },
      {
        id: 'dispensa',
        name: 'Dispensa',
        subtitle: 'Pharmacy management system',
        icon: '💊',
        status: 'Coming soon',
      },
      {
        id: 'momo',
        name: 'Momo',
        subtitle: 'Restaurant management software',
        icon: '🍽️',
        status: 'Coming soon',
      },
    ],
  },
  {
    id: 'consumer-apps',
    name: 'Consumer Apps',
    blurb: 'Products people use directly.',
    projects: [
      { id: 'ayu', name: 'Ayu', status: 'In development', ...fromCaseStudy('Ayu') },
      { id: 'swasthya-guru', name: 'Swasthya Guru', status: 'Live', ...fromCaseStudy('Swasthya Guru') },
    ],
  },
  {
    id: 'mobile-games',
    name: 'Mobile Games',
    blurb: 'Games for phones.',
    projects: [],
  },
]

export const findCategory = (id) => CATEGORIES.find((c) => c.id === id) || null
export const findProject = (category, id) => category?.projects.find((p) => p.id === id) || null
