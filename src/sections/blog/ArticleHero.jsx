import { Link } from 'react-router-dom';
import Container from '@components/Container.jsx';
import { useLanguage } from '@hooks/useLanguage.js';
import './ArticleHero.css';

const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M9 6l6 6-6 6" />
  </svg>
);

function formatDate(iso, locale) {
  if (!iso) return '';
  try {
    return new Intl.DateTimeFormat(locale === 'he' ? 'he-IL' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

/**
 * Article-page hero. Editorial-leaning variant of ServiceHero — same
 * backdrop language, but the H1 owns the visual hierarchy alone (no
 * eyebrow/title split, no CTA cluster). Underneath, a thin metadata
 * strip carries published date and estimated reading time.
 */
export default function ArticleHero({ entry, title, lede, minutes }) {
  const { locale, t } = useLanguage();
  const home = `/${locale}`;
  const blog = `/${locale}/blog`;

  return (
    <section className="article-hero" aria-labelledby="article-hero-title">
      <div className="article-hero__backdrop" aria-hidden="true">
        <div className="article-hero__grid" />
      </div>

      <Container className="article-hero__inner">
        <nav className="article-hero__breadcrumbs" aria-label="Breadcrumb">
          <ol>
            <li>
              <Link to={home}>{t('articlePage.breadcrumbHome')}</Link>
              <span className="article-hero__crumb-sep" aria-hidden><ChevronIcon /></span>
            </li>
            <li>
              <Link to={blog}>{t('articlePage.breadcrumbBlog')}</Link>
              <span className="article-hero__crumb-sep" aria-hidden><ChevronIcon /></span>
            </li>
            <li aria-current="page">{title}</li>
          </ol>
        </nav>

        <h1 id="article-hero-title" className="article-hero__title">
          {title}
        </h1>

        <p className="article-hero__lede">{lede}</p>

        <div className="article-hero__meta">
          <time dateTime={entry.publishDate}>
            {t('blog.publishedOn')} {formatDate(entry.publishDate, locale)}
          </time>
          <span className="article-hero__dot" aria-hidden>·</span>
          <span>{minutes} {t('blog.readingTime')}</span>
        </div>
      </Container>
    </section>
  );
}
