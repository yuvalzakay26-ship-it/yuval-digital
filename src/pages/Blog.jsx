import Seo from '@components/Seo.jsx';
import BlogHero from '@sections/blog/BlogHero.jsx';
import ArticleList from '@sections/blog/ArticleList.jsx';
import Contact from '@sections/Contact.jsx';
import CtaBanner from '@components/CtaBanner.jsx';
import { useLanguage } from '@hooks/useLanguage.js';
import { seoCopy } from '@data/seo.js';
import { blogJsonLd } from '@data/jsonld.js';
import { PUBLISHED_ARTICLES } from '@data/articleCatalog.js';

/**
 * Blog index page at /:lang/blog.
 *
 * Published articles are enumerated from ARTICLE_CATALOG (sorted newest-
 * first). When the catalog has nothing published, the page renders an
 * empty-state inside ArticleList rather than 404'ing — so the route is
 * a stable surface the rest of the site can already link to. The
 * `includedRoutes()` prerender list still gates emission on the
 * BLOG_HAS_PUBLISHED flag so an empty index doesn't ship to Google.
 *
 * Article titles/ledes for the listing are pulled from the per-locale
 * body files at module load time. Each body file is a tiny JSON-shaped
 * default export, so this stays prerender-safe.
 */

/* Eagerly import every per-locale article body so the listing can read
   title + lede without lazy-resolving each file. import.meta.glob keeps
   this static and tree-shakeable; absent files (drafts not authored yet)
   simply don't show up in the result. */
const HE_BODIES = import.meta.glob('../data/articles/he/*.js', { eager: true });
const EN_BODIES = import.meta.glob('../data/articles/en/*.js', { eager: true });

function bodyFor(locale, i18nKey) {
  const bag = locale === 'he' ? HE_BODIES : EN_BODIES;
  const key = `../data/articles/${locale}/${i18nKey}.js`;
  const mod = bag[key];
  return mod?.default || null;
}

export default function Blog() {
  const { locale } = useLanguage();
  const copy = seoCopy.blog[locale] || seoCopy.blog.he;

  /* Compose the listing entries — only articles that have both a
     published catalog entry AND a body file for this locale make it in. */
  const entries = PUBLISHED_ARTICLES
    .map(a => {
      const body = bodyFor(locale, a.i18nKey);
      if (!body) return null;
      return {
        slug: a.slug,
        i18nKey: a.i18nKey,
        publishDate: a.publishDate,
        topic: a.topic,
        title: body.title,
        lede: body.lede,
        body: body.body
      };
    })
    .filter(Boolean);

  const jsonLd = blogJsonLd({
    locale,
    name: copy.title,
    description: copy.description,
    articles: entries
  });

  return (
    <>
      <Seo
        title={copy.title}
        description={copy.description}
        path="/blog"
        jsonLd={jsonLd}
      />
      <BlogHero />
      <ArticleList entries={entries} />
      <CtaBanner variant="beforeFooter" tone="strong" />
      <Contact />
    </>
  );
}
