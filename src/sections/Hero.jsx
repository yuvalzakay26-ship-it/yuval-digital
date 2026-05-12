import { Link } from 'react-router-dom';
import Container from '@components/Container.jsx';
import Button from '@components/Button.jsx';
import Counter from '@components/Counter.jsx';
import { useLanguage } from '@hooks/useLanguage.js';
import { track } from '@utils/analytics.js';
import { SERVICE_CATALOG } from '@data/serviceCatalog.js';
import './Hero.css';

/* Look up the catalog entry by service id (used to derive the link
   target for each hero topic chip). One-time computation. */
const CATALOG_BY_ID = Object.fromEntries(SERVICE_CATALOG.map(s => [s.id, s]));

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

export default function Hero() {
  const { locale, dict, t } = useLanguage();
  const topics = dict.hero.topics || [];

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      {/* Hero backdrop: a static gradient + grid mask + faint noise. The
          three "orb" glow layers used to live here as 110px-blurred
          floating divs — they were the dominant mobile paint cost on
          the LCP frame (each is a ~500px composited layer with infinite
          translate animation). They've been baked into --gradient-hero
          as cheap, static radial gradients with the same colour story,
          so the visual is preserved at a fraction of the render bill. */}
      <div className="hero__backdrop" aria-hidden="true">
        <div className="hero__grid" />
        <div className="hero__noise" />
      </div>

      <Container className="hero__inner">
        <div className="hero__badge">
          <span className="hero__badge-dot" aria-hidden="true" />
          <span>{t('hero.badge')}</span>
        </div>

        <span className="eyebrow hero__eyebrow">{t('hero.eyebrow')}</span>

        <h1 id="hero-title" className="hero__title">
          <span className="hero__title-lead">{t('hero.titleLead')}</span>
          <span className="hero__title-highlight text-gradient">{t('hero.titleHighlight')}</span>
        </h1>

        <p className="hero__subtitle">{t('hero.subtitle')}</p>

        <div className="hero__cta">
          <Button
            as="a"
            href="#contact"
            variant="gradient"
            size="lg"
            iconEnd={<ArrowIcon />}
            onClick={() => track('cta_hero_click', { source: 'hero_primary', destination: 'contact' })}
          >
            {t('hero.primaryCta')}
          </Button>
          <Button
            as="a"
            href="#projects"
            variant="ghost"
            size="lg"
            iconStart={<PlayIcon />}
            onClick={() => track('cta_hero_click', { source: 'hero_secondary', destination: 'projects' })}
          >
            {t('hero.secondaryCta')}
          </Button>
        </div>

        <p className="hero__microtrust">
          <span className="hero__microtrust-pulse" aria-hidden="true" />
          {t('hero.microtrust')}
        </p>

        {topics.length > 0 && (
          <nav className="hero__topics" aria-label={t('hero.topicsLabel')}>
            <span className="hero__topics-label">{t('hero.topicsLabel')}</span>
            <ul className="hero__topics-list">
              {topics.map(topic => {
                const entry = CATALOG_BY_ID[topic.id];
                const to = entry?.published
                  ? `/${locale}/services/${entry.slug}`
                  : `/${locale}#services`;
                return (
                  <li key={topic.id}>
                    <Link to={to} className="hero__topic">{topic.label}</Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}

        <div className="hero__metrics" role="list">
          <Metric text="<24h"    label={t('hero.metricResponse')} />
          <Metric value={100} suffix="%" label={t('hero.metricCustom')} />
          <Metric text="HE + EN" label={t('hero.metricLanguages')} />
        </div>

        <div className="hero__scroll" aria-hidden="true">
          <span>{t('hero.scrollHint')}</span>
          <span className="hero__scroll-line" />
        </div>
      </Container>
    </section>
  );
}

function Metric({ value, suffix, text, label }) {
  return (
    <div className="hero-metric" role="listitem">
      {text ? (
        <span className="hero-metric__value text-gradient">{text}</span>
      ) : (
        <Counter value={value} suffix={suffix} className="hero-metric__value text-gradient" />
      )}
      <span className="hero-metric__label">{label}</span>
    </div>
  );
}
