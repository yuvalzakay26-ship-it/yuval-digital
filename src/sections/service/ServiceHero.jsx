import { Link } from 'react-router-dom';
import Container from '@components/Container.jsx';
import Button from '@components/Button.jsx';
import { useLanguage } from '@hooks/useLanguage.js';
import { track } from '@utils/analytics.js';
import './ServiceHero.css';

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 4l14 8-14 8z" fill="currentColor" />
  </svg>
);

const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M9 6l6 6-6 6" />
  </svg>
);

/**
 * Service-page hero. Carries the page H1, lede paragraph and CTAs.
 * Visually echoes the home hero but with breadcrumbs and without metrics —
 * each service is one offering, not the whole agency.
 */
export default function ServiceHero({ data, slug }) {
  const { locale, t } = useLanguage();
  const home = `/${locale}`;

  return (
    <section className="svc-hero" aria-labelledby="svc-hero-title">
      <div className="svc-hero__backdrop" aria-hidden="true">
        <div className="svc-hero__grid" />
      </div>

      <Container className="svc-hero__inner">
        <nav className="svc-hero__breadcrumbs" aria-label="Breadcrumb">
          <ol>
            <li>
              <Link to={home}>{t('servicePages.common.breadcrumbHome')}</Link>
              <span className="svc-hero__crumb-sep" aria-hidden><ChevronIcon /></span>
            </li>
            <li>
              <Link to={`${home}#services`}>{t('servicePages.common.breadcrumbServices')}</Link>
              <span className="svc-hero__crumb-sep" aria-hidden><ChevronIcon /></span>
            </li>
            <li aria-current="page">{data.eyebrow}</li>
          </ol>
        </nav>

        <span className="eyebrow svc-hero__eyebrow">{data.eyebrow}</span>

        <h1 id="svc-hero-title" className="svc-hero__title">
          <span className="svc-hero__title-lead">{data.titleLead}</span>
          <span className="svc-hero__title-highlight text-gradient">{data.titleHighlight}</span>
        </h1>

        <p className="svc-hero__lede">{data.lede}</p>
        <p className="svc-hero__subtitle">{data.subtitle}</p>

        <div className="svc-hero__cta">
          <Button
            as="a"
            href="#contact"
            variant="gradient"
            size="lg"
            iconEnd={<ArrowIcon />}
            onClick={() => track('cta_service_hero_click', { source: slug, destination: 'contact' })}
          >
            {t('servicePages.common.primaryCta')}
          </Button>
          <Button
            as={Link}
            to={`${home}#projects`}
            variant="ghost"
            size="lg"
            iconStart={<PlayIcon />}
            onClick={() => track('cta_service_hero_click', { source: slug, destination: 'projects' })}
          >
            {t('servicePages.common.secondaryCta')}
          </Button>
        </div>
      </Container>
    </section>
  );
}
