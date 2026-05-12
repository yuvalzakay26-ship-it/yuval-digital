/**
 * Article catalog — single source of truth for the /:lang/blog and
 * /:lang/blog/:slug routes. Each entry binds a URL slug to:
 *   - the per-locale body file under `src/data/articles/<locale>/<i18nKey>.js`
 *   - a publishDate (ISO YYYY-MM-DD, used for sort order + Article JSON-LD)
 *   - a `published` flag — only published slugs are prerendered, sitemap-listed,
 *     and listed on the blog index. Drafts stay in the catalog so the editorial
 *     pipeline is visible without shipping empty pages to Google.
 *   - related service slugs (internal-linking topology — articles point back
 *     to commercial intent pages)
 *   - related article slugs (cross-promotion between editorial surfaces)
 *
 * Add an article by registering it here and authoring
 *   src/data/articles/he/<i18nKey>.js and src/data/articles/en/<i18nKey>.js
 * Each body file exports default `{ title, lede, body: ArticleNode[] }`.
 *
 * Mirrors the structure of serviceCatalog.js so the prerender/sitemap
 * pipeline can treat the two surfaces uniformly.
 */

export const ARTICLE_CATALOG = [
  {
    slug: 'modern-websites-help-small-businesses-look-professional',
    i18nKey: 'modernWebsites',
    published: true,
    publishDate: '2026-05-12',
    topic: 'websites',
    tags: ['websites', 'small-business', 'professionalism', 'trust'],
    relatedServices: ['business-websites', 'landing-pages'],
    relatedArticles: ['more-than-pretty-website']
  },
  {
    slug: 'what-business-automation-actually-means',
    i18nKey: 'automationMeaning',
    published: false,
    publishDate: '2026-05-22',
    topic: 'automation',
    tags: ['automation', 'small-business', 'tools', 'productivity'],
    relatedServices: ['ai-automation', 'business-websites'],
    relatedArticles: ['modern-websites-help-small-businesses-look-professional']
  },
  {
    slug: 'more-than-pretty-website',
    i18nKey: 'moreThanPretty',
    published: false,
    publishDate: '2026-05-29',
    topic: 'strategy',
    tags: ['websites', 'strategy', 'conversion', 'business'],
    relatedServices: ['business-websites', 'landing-pages', 'ai-automation'],
    relatedArticles: [
      'modern-websites-help-small-businesses-look-professional',
      'what-business-automation-actually-means'
    ]
  }
];

export const ARTICLE_BY_SLUG = Object.fromEntries(
  ARTICLE_CATALOG.map(a => [a.slug, a])
);

export const PUBLISHED_ARTICLES = ARTICLE_CATALOG
  .filter(a => a.published)
  /* Newest first — used as the default ordering on the blog index. */
  .sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1));

export function getArticle(slug) {
  return ARTICLE_BY_SLUG[slug] || null;
}

export function isPublishedArticle(slug) {
  const a = ARTICLE_BY_SLUG[slug];
  return Boolean(a && a.published);
}

/* Whether the blog surface itself should be exposed (index page, nav link,
   sitemap entry). False until at least one article is published — so we
   don't surface an empty editorial section to Google or visitors. */
export const BLOG_HAS_PUBLISHED = PUBLISHED_ARTICLES.length > 0;
