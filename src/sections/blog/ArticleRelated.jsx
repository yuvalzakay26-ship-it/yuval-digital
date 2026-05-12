import { Link } from 'react-router-dom';
import Container from '@components/Container.jsx';
import Reveal from '@components/Reveal.jsx';
import { useLanguage } from '@hooks/useLanguage.js';
import { getArticle, isPublishedArticle } from '@data/articleCatalog.js';
import { getService } from '@data/serviceCatalog.js';
import { serviceIcons } from '@data/services.jsx';
import './ArticleRelated.css';

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

const HE_BODIES = import.meta.glob('../../data/articles/he/*.js', { eager: true });
const EN_BODIES = import.meta.glob('../../data/articles/en/*.js', { eager: true });

function bodyFor(locale, i18nKey) {
  const bag = locale === 'he' ? HE_BODIES : EN_BODIES;
  const key = `../../data/articles/${locale}/${i18nKey}.js`;
  const mod = bag[key];
  return mod?.default || null;
}

/**
 * Article-page related rail. Two parallel lists:
 *   - related articles (other published editorial pieces)
 *   - related services (commercial intent pages to convert readers)
 *
 * Drops silently if neither list has resolvable entries — avoids
 * shipping an empty section.
 */
export default function ArticleRelated({ relatedArticles = [], relatedServices = [] }) {
  const { locale, dict, t } = useLanguage();
  const homeServices = dict.services.items;

  const articleEntries = relatedArticles
    .filter(slug => isPublishedArticle(slug))
    .map(slug => {
      const a = getArticle(slug);
      const body = bodyFor(locale, a.i18nKey);
      if (!body) return null;
      return { slug, title: body.title, lede: body.lede };
    })
    .filter(Boolean);

  const serviceEntries = relatedServices
    .map(slug => {
      const svc = getService(slug);
      if (!svc) return null;
      const summary = homeServices.find(s => s.id === svc.id);
      if (!summary) return null;
      return { ...svc, summary };
    })
    .filter(Boolean);

  if (articleEntries.length === 0 && serviceEntries.length === 0) return null;

  return (
    <section className="article-related section">
      <Container className="article-related__inner">
        {articleEntries.length > 0 && (
          <div className="article-related__block">
            <Reveal className="article-related__head">
              <h2 className="article-related__title">{t('articlePage.relatedArticlesTitle')}</h2>
            </Reveal>
            <ul className="article-related__articles">
              {articleEntries.map((e, i) => (
                <Reveal key={e.slug} as="li" variant="up" delay={i * 60}>
                  <Link to={`/${locale}/blog/${e.slug}`} className="article-related__article-card surface surface--interactive">
                    <h3 className="article-related__article-title">{e.title}</h3>
                    <p className="article-related__article-lede">{e.lede}</p>
                    <span className="article-related__cta">
                      {t('blog.readMore')}
                      <span className="article-related__cta-arrow" aria-hidden><ArrowIcon /></span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        )}

        {serviceEntries.length > 0 && (
          <div className="article-related__block">
            <Reveal className="article-related__head">
              <h2 className="article-related__title">{t('articlePage.relatedServicesTitle')}</h2>
            </Reveal>
            <ul className="article-related__services">
              {serviceEntries.map((entry, i) => {
                const to = entry.published
                  ? `/${locale}/services/${entry.slug}`
                  : `/${locale}#services`;
                return (
                  <Reveal key={entry.slug} as="li" variant="up" delay={i * 60}>
                    <Link to={to} className="article-related__service-card surface surface--interactive">
                      <div className="article-related__service-icon" aria-hidden>{serviceIcons[entry.id]}</div>
                      <h3 className="article-related__service-title">{entry.summary.title}</h3>
                      <p className="article-related__service-desc">{entry.summary.description}</p>
                      <span className="article-related__cta">
                        {t('articlePage.primaryCta')}
                        <span className="article-related__cta-arrow" aria-hidden><ArrowIcon /></span>
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        )}
      </Container>
    </section>
  );
}
