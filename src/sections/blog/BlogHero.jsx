import { Link } from 'react-router-dom';
import Container from '@components/Container.jsx';
import { useLanguage } from '@hooks/useLanguage.js';
import './BlogHero.css';

const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M9 6l6 6-6 6" />
  </svg>
);

/**
 * Blog index hero. Mirrors the service-hero visual language (radial
 * backdrop + grid) so the editorial surface still reads as the same
 * brand. Carries the page H1 and a breadcrumb back to home; no CTAs
 * because the action on a blog index is "browse below," not "convert."
 */
export default function BlogHero() {
  const { locale, t } = useLanguage();
  const home = `/${locale}`;

  return (
    <section className="blog-hero" aria-labelledby="blog-hero-title">
      <div className="blog-hero__backdrop" aria-hidden="true">
        <div className="blog-hero__grid" />
      </div>

      <Container className="blog-hero__inner">
        <nav className="blog-hero__breadcrumbs" aria-label="Breadcrumb">
          <ol>
            <li>
              <Link to={home}>{t('articlePage.breadcrumbHome')}</Link>
              <span className="blog-hero__crumb-sep" aria-hidden><ChevronIcon /></span>
            </li>
            <li aria-current="page">{t('articlePage.breadcrumbBlog')}</li>
          </ol>
        </nav>

        <span className="eyebrow blog-hero__eyebrow">{t('blog.eyebrow')}</span>

        <h1 id="blog-hero-title" className="blog-hero__title">
          <span className="blog-hero__title-lead">{t('blog.titleLead')}</span>
          <span className="blog-hero__title-highlight text-gradient">{t('blog.titleHighlight')}</span>
        </h1>

        <p className="blog-hero__lede">{t('blog.lede')}</p>
        <p className="blog-hero__subtitle">{t('blog.subtitle')}</p>
      </Container>
    </section>
  );
}
