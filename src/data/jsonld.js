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

/* Stable @id values used to link entities into one graph.
   schema.org consumers stitch the same business entity across the
   WebSite (as `publisher`), Person (as `worksFor`) and the
   ProfessionalService node itself by matching @id. */
const ORG_ID = `${ORIGIN}#yuvaldigital`;
const PERSON_ID = `${ORIGIN}#yuvalzakay`;
const SITE_ID = `${ORIGIN}#website`;

const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': SITE_ID,
  name: 'Yuval Digital',
  alternateName: 'יובל דיגיטל',
  url: ORIGIN,
  inLanguage: ['he', 'en'],
  description:
    'Modern websites, automations and AI-assisted workflows for businesses — designed to work together as one connected system.',
  publisher: { '@id': ORG_ID }
};

const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Yuval Zakay',
  givenName: 'Yuval',
  familyName: 'Zakay',
  alternateName: 'יובל זכאי',
  url: ORIGIN,
  email: 'mailto:yuvalzakay25@gmail.com',
  telephone: '+972-53-333-9341',
  jobTitle: 'Founder & Developer',
  worksFor: { '@id': ORG_ID },
  description:
    'Founder of Yuval Digital, a modern independent digital studio. Builds modern websites, business automations and AI-assisted workflows for small and mid-sized businesses in Israel — designed to fit together as one connected system per project.',
  knowsLanguage: ['he', 'en'],
  knowsAbout: [
    'Business website development',
    'Landing page development',
    'Business workflow automation',
    'AI systems for businesses',
    'AI content workflows',
    'Internal business tools',
    'Search engine optimization',
    'Modern digital solutions for small and mid-sized businesses'
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

/* `Service` entities are referenced from the ProfessionalService's
   offer catalog AND can be referenced from service detail pages by
   matching @id. Each one is named for the catalog keyword it ranks
   for and carries a URL when the detail page exists. */
const SERVICES_FOR_HOME = [
  {
    name: 'Business Website Development',
    serviceType: 'Business website development',
    url: `${ORIGIN}/he/services/business-websites`,
    description:
      'Custom, mobile-first business websites with technical SEO and full HE/EN bilingual support.'
  },
  {
    name: 'Landing Page Development',
    serviceType: 'Landing page development',
    description:
      'Conversion-focused landing pages built around a single business goal.'
  },
  {
    name: 'Business Automation',
    serviceType: 'Business workflow automation',
    description:
      'Make / n8n / Zapier integrations that connect tools, save hours of manual work and remove repetitive errors.'
  },
  {
    name: 'AI Systems for Business',
    serviceType: 'AI systems for businesses',
    description:
      'LLM-powered assistants, content workflows and operational AI tools built into the business — tuned to brand voice and existing tools.'
  },
  {
    name: 'Internal Business Tools',
    serviceType: 'Internal business tools',
    description:
      'Dashboards, internal forms and small custom apps tailored to a specific team workflow.'
  },
  {
    name: 'SEO & Google Visibility',
    serviceType: 'Search engine optimization',
    description:
      'Technical SEO, content structure and performance work that makes a site legible to Google and AI search.'
  }
];

const professionalService = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': ORG_ID,
  /* ProfessionalService is a subtype of LocalBusiness; declaring
     additionalType makes the LocalBusiness signal explicit for
     consumers (Google, AI search) that index those properties first. */
  additionalType: 'https://schema.org/LocalBusiness',
  name: 'Yuval Digital',
  alternateName: 'יובל דיגיטל',
  url: ORIGIN,
  logo: `${ORIGIN}/favicon.svg`,
  image: `${ORIGIN}/favicon.svg`,
  email: 'yuvalzakay25@gmail.com',
  telephone: '+972-53-333-9341',
  founder: { '@id': PERSON_ID },
  areaServed: { '@type': 'Country', name: 'Israel' },
  address: { '@type': 'PostalAddress', addressCountry: 'IL' },
  priceRange: '$$',
  currenciesAccepted: 'ILS',
  slogan: 'Modern websites, automations and AI — built to work together.',
  description:
    'Yuval Digital is a modern independent digital studio building business websites, automations and AI-assisted workflows for small and mid-sized businesses in Israel — designed as systems that fit together, not isolated tools.',
  knowsLanguage: ['he', 'en'],
  knowsAbout: [
    'Business website development',
    'Landing page development',
    'Business workflow automation',
    'AI systems for businesses',
    'AI content workflows',
    'Internal business tools',
    'Search engine optimization',
    'Modern digital solutions for small and mid-sized businesses'
  ],
  serviceType: SERVICES_FOR_HOME.map(s => s.serviceType),
  sameAs: ['https://wa.me/972533339341'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services',
    itemListElement: SERVICES_FOR_HOME.map(s => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: s.name,
        serviceType: s.serviceType,
        description: s.description,
        provider: { '@id': ORG_ID },
        areaServed: 'IL',
        ...(s.url ? { url: s.url } : {})
      }
    }))
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
          "Yes. It's common to start with one focused landing page or a small site, then add pages, systems, automations and bilingual content over time."
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
          'Yes — small and mid-sized businesses, with personal attention and a focused, one-project-at-a-time approach.'
      }
    }
  ]
};

export const homeJsonLd = [website, person, professionalService, faqPage];

/* ============================================================
   Service-detail page schema builders.
   Each builder returns the JSON-LD array for a single service page.
   They reuse the home `professionalService` entity as `provider` so
   Google sees one consistent business identity across the site.
   ============================================================ */

function breadcrumbList(locale, slug, serviceName) {
  const base = `${ORIGIN}/${locale}`;
  const t = locale === 'he'
    ? { home: 'בית', services: 'שירותים' }
    : { home: 'Home', services: 'Services' };
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.home, item: base },
      { '@type': 'ListItem', position: 2, name: t.services, item: `${base}/services` },
      { '@type': 'ListItem', position: 3, name: serviceName, item: `${base}/services/${slug}` }
    ]
  };
}

function serviceSchema({ locale, slug, name, description, keywords }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType: name,
    url: `${ORIGIN}/${locale}/services/${slug}`,
    inLanguage: locale,
    areaServed: 'IL',
    provider: {
      '@type': 'ProfessionalService',
      name: 'Yuval Digital',
      url: ORIGIN
    },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: locale === 'he' ? 'עסקים קטנים ובינוניים' : 'Small and mid-sized businesses'
    },
    ...(keywords && keywords.length ? { keywords: keywords.join(', ') } : {})
  };
}

function faqFromItems(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a }
    }))
  };
}

/**
 * Build the JSON-LD stack for a service page.
 *
 * Inputs come from the dictionary (long-form copy) and from the
 * service catalog (keywords). The page component composes them.
 *
 * @param {object} input
 * @param {'he'|'en'} input.locale
 * @param {string}     input.slug
 * @param {string}     input.name          — H1 / service name (one line)
 * @param {string}     input.description   — meta description
 * @param {string[]}   input.keywords      — locale-specific target queries
 * @param {Array<{q:string,a:string}>} [input.faqItems]
 * @returns {object[]}
 */
export function serviceJsonLd({ locale, slug, name, description, keywords, faqItems }) {
  const blocks = [
    serviceSchema({ locale, slug, name, description, keywords }),
    breadcrumbList(locale, slug, name)
  ];
  if (faqItems && faqItems.length) blocks.push(faqFromItems(faqItems));
  return blocks;
}

/* ============================================================
   Blog index & Article schema.

   The blog index publishes a `Blog` node that itself is part of the
   site graph (isPartOf → WebSite @id) and whose `publisher` points
   at the same ProfessionalService entity. Each article page emits
   a full `Article`/`BlogPosting` node with `author` and `publisher`
   linked by @id to the canonical Person and Organization — so Google
   sees one consistent entity stack across the editorial surface and
   the rest of the site, which is the whole point of running a blog
   under our own domain for entity-building purposes.
   ============================================================ */

function blogBreadcrumb(locale, slug, articleTitle) {
  const base = `${ORIGIN}/${locale}`;
  const t = locale === 'he'
    ? { home: 'בית', blog: 'בלוג' }
    : { home: 'Home', blog: 'Blog' };
  const items = [
    { '@type': 'ListItem', position: 1, name: t.home, item: base },
    { '@type': 'ListItem', position: 2, name: t.blog, item: `${base}/blog` }
  ];
  if (slug && articleTitle) {
    items.push({
      '@type': 'ListItem',
      position: 3,
      name: articleTitle,
      item: `${base}/blog/${slug}`
    });
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items
  };
}

/**
 * JSON-LD stack for the Blog index page.
 *
 * @param {object} input
 * @param {'he'|'en'} input.locale
 * @param {string}    input.name        — index page H1 / title
 * @param {string}    input.description — meta description
 * @param {Array}     [input.articles]  — published article entries to enumerate as `blogPost`
 */
export function blogJsonLd({ locale, name, description, articles = [] }) {
  const url = `${ORIGIN}/${locale}/blog`;
  const blog = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${url}#blog`,
    url,
    name,
    description,
    inLanguage: locale,
    isPartOf: { '@id': SITE_ID },
    publisher: { '@id': ORG_ID },
    author: { '@id': PERSON_ID },
    blogPost: articles.map(a => ({
      '@type': 'BlogPosting',
      headline: a.title,
      url: `${ORIGIN}/${locale}/blog/${a.slug}`,
      datePublished: a.publishDate,
      author: { '@id': PERSON_ID }
    }))
  };
  return [blog, blogBreadcrumb(locale)];
}

/**
 * JSON-LD stack for a single article page.
 *
 * Emits Article (BlogPosting subtype) plus BreadcrumbList. The Article
 * `mainEntityOfPage` points back at the canonical article URL so search
 * engines stitch the schema to the page that owns it.
 *
 * @param {object} input
 * @param {'he'|'en'} input.locale
 * @param {string}    input.slug
 * @param {string}    input.title
 * @param {string}    input.description — article lede / meta description
 * @param {string}    input.publishDate — ISO YYYY-MM-DD
 * @param {string}    [input.updated]   — ISO YYYY-MM-DD if revised
 * @param {string[]}  [input.keywords]
 * @param {number}    [input.wordCount]
 */
export function articleJsonLd({
  locale,
  slug,
  title,
  description,
  publishDate,
  updated,
  keywords,
  wordCount
}) {
  const url = `${ORIGIN}/${locale}/blog/${slug}`;
  const article = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    inLanguage: locale,
    headline: title,
    description,
    datePublished: publishDate,
    ...(updated ? { dateModified: updated } : { dateModified: publishDate }),
    author: { '@id': PERSON_ID },
    publisher: { '@id': ORG_ID },
    isPartOf: { '@id': SITE_ID },
    ...(keywords && keywords.length ? { keywords: keywords.join(', ') } : {}),
    ...(wordCount ? { wordCount } : {}),
    image: `${ORIGIN}/favicon.svg`
  };
  return [article, blogBreadcrumb(locale, slug, title)];
}

/* ============================================================
   About-page schema.
   AboutPage is the page type; its `mainEntity` points by @id at
   the canonical Person defined on the home page. That linkage is
   what tells Google "this page is about that Person" without
   duplicating the Person definition and risking conflicting
   facts across pages. The page also stays inside the same site
   graph via isPartOf → WebSite @id.
   ============================================================ */
export function aboutJsonLd({ locale, name, description }) {
  const url = `${ORIGIN}/${locale}/about`;
  const t = locale === 'he'
    ? { home: 'בית', about: 'אודות' }
    : { home: 'Home', about: 'About' };

  const aboutPage = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    url,
    inLanguage: locale,
    name,
    description,
    mainEntity: { '@id': PERSON_ID },
    about: { '@id': ORG_ID },
    isPartOf: { '@id': SITE_ID }
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.home,  item: `${ORIGIN}/${locale}` },
      { '@type': 'ListItem', position: 2, name: t.about, item: url }
    ]
  };

  return [aboutPage, breadcrumb];
}
