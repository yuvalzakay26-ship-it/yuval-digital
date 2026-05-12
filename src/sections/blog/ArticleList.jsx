import { Link } from 'react-router-dom';
import Container from '@components/Container.jsx';
import Reveal from '@components/Reveal.jsx';
import Button from '@components/Button.jsx';
import { useLanguage } from '@hooks/useLanguage.js';
import { readingMinutes } from '@utils/readingTime.js';
import './ArticleList.css';

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 5l7 7-7 7" />
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
 * Article listing grid. Each card is a self-contained editorial preview:
 * title, lede, publish date and estimated reading time. When the catalog
 * has nothing published, renders an empty-state instead so the route is
 * still a stable landing surface that links elsewhere.
 */
export default function ArticleList({ entries = [] }) {
  const { locale, t } = useLanguage();

  if (entries.length === 0) {
    return (
      <section className="article-list section">
        <Container>
          <Reveal variant="up" className="article-list__empty">
            <h2 className="article-list__empty-title">{t('blog.empty.title')}</h2>
            <p className="article-list__empty-body">{t('blog.empty.body')}</p>
            <Button
              as="a"
              href="#contact"
              variant="gradient"
              size="lg"
              iconEnd={<ArrowIcon />}
            >
              {t('blog.empty.cta')}
            </Button>
          </Reveal>
        </Container>
      </section>
    );
  }

  return (
    <section className="article-list section">
      <Container>
        <Reveal className="section__head">
          <span className="eyebrow">{t('blog.eyebrow')}</span>
          <h2 className="section__title">{t('blog.listTitle')}</h2>
        </Reveal>

        <ul className="article-list__grid">
          {entries.map((e, i) => {
            const minutes = readingMinutes(e.body);
            const to = `/${locale}/blog/${e.slug}`;
            return (
              <Reveal
                key={e.slug}
                as="li"
                variant="up"
                delay={i * 70}
                className="article-list__item"
              >
                <Link to={to} className="article-list__card surface surface--interactive">
                  <div className="article-list__meta">
                    <time dateTime={e.publishDate}>{formatDate(e.publishDate, locale)}</time>
                    <span className="article-list__dot" aria-hidden>·</span>
                    <span>{minutes} {t('blog.readingTime')}</span>
                  </div>
                  <h3 className="article-list__title">{e.title}</h3>
                  <p className="article-list__lede">{e.lede}</p>
                  <span className="article-list__cta">
                    {t('blog.readMore')}
                    <span className="article-list__cta-arrow" aria-hidden><ArrowIcon /></span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
