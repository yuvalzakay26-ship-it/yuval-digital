import { Navigate, useParams } from 'react-router-dom';
import Seo from '@components/Seo.jsx';
import ArticleHero from '@sections/blog/ArticleHero.jsx';
import ArticleBody from '@sections/blog/ArticleBody.jsx';
import ArticleRelated from '@sections/blog/ArticleRelated.jsx';
import Contact from '@sections/Contact.jsx';
import CtaBanner from '@components/CtaBanner.jsx';
import { useLanguage } from '@hooks/useLanguage.js';
import { getArticle, isPublishedArticle } from '@data/articleCatalog.js';
import { articleJsonLd } from '@data/jsonld.js';
import { wordCount, readingMinutes } from '@utils/readingTime.js';

/**
 * Article detail page at /:lang/blog/:slug.
 *
 * Resolves slug → catalog entry → per-locale body file. Unknown or
 * unpublished slugs redirect to /:lang/blog (defence in depth — the
 * prerender list already excludes them).
 *
 * Body files live at src/data/articles/<locale>/<i18nKey>.js and
 * each one exports default { title, lede, body, updated? }. The body
 * is a structured-JSON node array (see ArticleBody.jsx for the shape).
 */

const HE_BODIES = import.meta.glob('../data/articles/he/*.js', { eager: true });
const EN_BODIES = import.meta.glob('../data/articles/en/*.js', { eager: true });

function bodyFor(locale, i18nKey) {
  const bag = locale === 'he' ? HE_BODIES : EN_BODIES;
  const key = `../data/articles/${locale}/${i18nKey}.js`;
  const mod = bag[key];
  return mod?.default || null;
}

export default function Article() {
  const { slug } = useParams();
  const { locale } = useLanguage();

  if (!isPublishedArticle(slug)) {
    return <Navigate to={`/${locale}/blog`} replace />;
  }

  const entry = getArticle(slug);
  const body = bodyFor(locale, entry.i18nKey);
  if (!body) {
    /* Article exists in catalog but no per-locale body was authored —
       redirect rather than render a broken page. */
    return <Navigate to={`/${locale}/blog`} replace />;
  }

  const minutes = readingMinutes(body.body);
  const words = wordCount(body.body);

  const jsonLd = articleJsonLd({
    locale,
    slug,
    title: body.title,
    description: body.lede,
    publishDate: entry.publishDate,
    updated: body.updated,
    keywords: entry.tags,
    wordCount: words
  });

  return (
    <>
      <Seo
        title={body.title}
        description={body.lede}
        path={`/blog/${slug}`}
        jsonLd={jsonLd}
      />

      <ArticleHero
        entry={entry}
        title={body.title}
        lede={body.lede}
        minutes={minutes}
      />
      <ArticleBody nodes={body.body} />
      <ArticleRelated
        relatedArticles={entry.relatedArticles}
        relatedServices={entry.relatedServices}
      />
      <CtaBanner variant="beforeFooter" tone="strong" />
      <Contact />
    </>
  );
}
