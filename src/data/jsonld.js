/**
 * Structured data (schema.org JSON-LD) blobs for indexable pages.
 *
 * Lifted out of `index.html` so each route can publish only the
 * structured data that's true for it. Home publishes the entity stack
 * (WebSite + Person + ProfessionalService + FAQPage); legal pages
 * intentionally publish nothing — they're not entity surfaces.
 *
 * Strings are language-agnostic where they describe real-world entities
 * (name, contact, etc.) and could be localized later by passing locale
 * into a builder if EN content diverges from HE.
 */

const ORIGIN = 'https://yuvaldigital.co.il';

const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Yuval Digital',
  alternateName: 'יובל דיגיטל',
  url: ORIGIN,
  inLanguage: ['he', 'en'],
  publisher: { '@type': 'Person', name: 'Yuval' }
};

const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Yuval',
  url: ORIGIN,
  email: 'mailto:yuvalzakay25@gmail.com',
  telephone: '+972-53-333-9341',
  jobTitle: 'Practical Software Engineer',
  description:
    'Outstanding practical software graduate building websites, landing pages, automations and AI-assisted solutions for businesses.',
  knowsLanguage: ['he', 'en'],
  knowsAbout: [
    'Web development',
    'Landing pages',
    'Business automation',
    'AI-assisted content systems',
    'Internal business tools'
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'yuvalzakay25@gmail.com',
      telephone: '+972-53-333-9341',
      availableLanguage: ['Hebrew', 'English'],
      areaServed: 'IL'
    }
  ]
};

const professionalService = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Yuval Digital',
  url: ORIGIN,
  image: `${ORIGIN}/favicon.svg`,
  email: 'yuvalzakay25@gmail.com',
  telephone: '+972-53-333-9341',
  founder: 'Yuval',
  areaServed: 'IL',
  priceRange: '$$',
  description:
    'Websites, landing pages, smart automations and AI-assisted solutions for businesses ready to grow.',
  sameAs: ['https://wa.me/972533339341'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Starting points',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Starter',
        description:
          'Focused landing page or simple site for businesses beginning their digital path.'
      },
      {
        '@type': 'Offer',
        name: 'Growth',
        description: 'Full business website with polished UX and a foundation built to grow.'
      },
      {
        '@type': 'Offer',
        name: 'Custom Premium',
        description:
          'Tailored system, automation or advanced site built around a real workflow.'
      }
    ]
  }
};

const faqPage = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long does it take to build a website?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Depends on scope. A landing page can go live in 1–2 weeks. A full business site is usually 3–5 weeks. Every project starts with a clear timeline we agree on upfront.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can I start with a landing page and grow later?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Yes. Many clients start with one focused landing page or a small site, then add pages, systems, automations and bilingual content over time.'
      }
    },
    {
      '@type': 'Question',
      name: 'Is the site mobile-friendly?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Everything is built mobile-first, then expanded to desktop.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can I add a system or automation after the site is live?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Yes. The architecture is built so you can later wire in CMS, advanced forms, CRM integrations, automations and AI.'
      }
    },
    {
      '@type': 'Question',
      name: 'Do you work with small businesses?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Yes — mostly small and mid-sized businesses, with personal attention and a focused, one-project-at-a-time approach.'
      }
    }
  ]
};

export const homeJsonLd = [website, person, professionalService, faqPage];
