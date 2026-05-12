/**
 * Service catalog — single source of truth for the /:lang/services/:slug
 * page system. Each entry binds a URL slug to:
 *   - the existing service `id` used on the home Services section
 *   - the i18n key under `servicePages.<key>` (long-form copy)
 *   - per-locale target keywords (for metadata + future schema)
 *   - related service slugs (internal-linking topology)
 *   - a `published` flag — only published slugs are prerendered, indexed,
 *     and linked-to from the home Services cards. Others stay as drafts
 *     in the catalog so the structure is visible without shipping empty
 *     pages to Google.
 *
 * Add a service by registering it here and authoring `servicePages.<key>`
 * in src/i18n/{he,en}.js. Routes, sitemap, schema and home-section links
 * pick it up automatically.
 */

export const SERVICE_CATALOG = [
  {
    slug: 'business-websites',
    id: 'web',
    i18nKey: 'businessWebsites',
    published: true,
    keywords: {
      he: [
        'בניית אתרים לעסקים',
        'בניית אתרים',
        'אתר תדמית',
        'אתר לעסק קטן',
        'בניית אתר תדמית לעסק'
      ],
      en: [
        'business website development',
        'small business websites',
        'professional websites',
        'website design Israel'
      ]
    },
    related: ['landing-pages', 'seo', 'ai-automation']
  },
  {
    slug: 'landing-pages',
    id: 'landing',
    i18nKey: 'landingPages',
    published: true,
    keywords: {
      he: [
        'בניית דפי נחיתה',
        'דף נחיתה לעסק',
        'דפי נחיתה ממירים',
        'דף נחיתה לקמפיין',
        'דף נחיתה מהיר'
      ],
      en: [
        'landing pages',
        'high-converting landing pages',
        'campaign landing pages',
        'lead generation landing page'
      ]
    },
    related: ['business-websites', 'ai-automation', 'seo']
  },
  {
    slug: 'ai-automation',
    id: 'automation',
    i18nKey: 'aiAutomation',
    published: true,
    keywords: {
      he: [
        'אוטומציות לעסק',
        'אוטומציות חכמות',
        'Make לעסקים',
        'אוטומציה עסקית',
        'אוטומציות לעסקים קטנים',
        'חיבור בין כלים'
      ],
      en: [
        'business automation',
        'AI automation',
        'workflow automation',
        'small business automation',
        'Make automation',
        'n8n automation'
      ]
    },
    related: ['business-websites', 'landing-pages', 'seo']
  },
  {
    slug: 'ai-business-systems',
    id: 'ai',
    i18nKey: 'aiBusinessSystems',
    published: false,
    keywords: {
      he: ['AI לעסקים', 'בינה מלאכותית לעסקים', 'מערכות AI', 'עוזרי AI לעסק'],
      en: ['AI for businesses', 'AI systems for business', 'LLM business workflows']
    },
    related: ['ai-automation', 'internal-tools', 'business-websites']
  },
  {
    slug: 'internal-tools',
    id: 'systems',
    i18nKey: 'internalTools',
    published: false,
    keywords: {
      he: ['כלים פנימיים לעסק', 'מערכות לעסק', 'דשבורד פנימי'],
      en: ['internal tools', 'business systems', 'admin dashboards']
    },
    related: ['ai-automation', 'ai-business-systems', 'business-websites']
  },
  {
    slug: 'seo',
    id: 'presence',
    i18nKey: 'seo',
    published: false,
    keywords: {
      he: ['קידום אתרים', 'SEO לעסקים', 'חשיפה בגוגל', 'נראות בגוגל'],
      en: ['SEO services', 'small business SEO', 'Google visibility']
    },
    related: ['business-websites', 'landing-pages', 'ai-business-systems']
  }
];

/* Quick-access maps. Kept inline so importers get them for free. */
export const SERVICE_BY_SLUG = Object.fromEntries(
  SERVICE_CATALOG.map(s => [s.slug, s])
);

export const PUBLISHED_SERVICES = SERVICE_CATALOG.filter(s => s.published);

export function getService(slug) {
  return SERVICE_BY_SLUG[slug] || null;
}

export function isPublishedSlug(slug) {
  const s = SERVICE_BY_SLUG[slug];
  return Boolean(s && s.published);
}
