import Container from '@components/Container.jsx';
import Button from '@components/Button.jsx';
import Counter from '@components/Counter.jsx';
import { useLanguage } from '@hooks/useLanguage.js';
import './Hero.css';

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
  const { t } = useLanguage();

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero__backdrop" aria-hidden="true">
        <div className="hero__orb hero__orb--a" />
        <div className="hero__orb hero__orb--b" />
        <div className="hero__orb hero__orb--c" />
        <div className="hero__grid" />
        <div className="hero__noise" />
      </div>

      <Container className="hero__inner">
        <div className="hero__badge anim-fade-down">
          <span className="hero__badge-dot" aria-hidden="true" />
          <span>{t('hero.badge')}</span>
        </div>

        <span className="eyebrow anim-fade-down hero__eyebrow">{t('hero.eyebrow')}</span>

        <h1 id="hero-title" className="hero__title anim-fade-up">
          <span className="hero__title-lead">{t('hero.titleLead')}</span>
          <span className="hero__title-highlight text-gradient">{t('hero.titleHighlight')}</span>
        </h1>

        <p className="hero__subtitle anim-fade-up">{t('hero.subtitle')}</p>

        <div className="hero__cta anim-fade-up">
          <Button as="a" href="#contact" variant="gradient" size="lg" iconEnd={<ArrowIcon />}>
            {t('hero.primaryCta')}
          </Button>
          <Button as="a" href="#process" variant="ghost" size="lg" iconStart={<PlayIcon />}>
            {t('hero.secondaryCta')}
          </Button>
        </div>

        <p className="hero__microtrust anim-fade-up">
          <span className="hero__microtrust-pulse" aria-hidden="true" />
          {t('hero.microtrust')}
        </p>

        <div className="hero__metrics" role="list">
          <Metric value={24}  suffix="h" label={t('hero.metricResponse')} />
          <Metric value={100} suffix="%" label={t('hero.metricCustom')} />
          <Metric value={2}   suffix=""  label={t('hero.metricLanguages')} />
        </div>

        <div className="hero__scroll" aria-hidden="true">
          <span>{t('hero.scrollHint')}</span>
          <span className="hero__scroll-line" />
        </div>
      </Container>
    </section>
  );
}

function Metric({ value, suffix, label }) {
  return (
    <div className="hero-metric" role="listitem">
      <Counter value={value} suffix={suffix} className="hero-metric__value text-gradient" />
      <span className="hero-metric__label">{label}</span>
    </div>
  );
}
