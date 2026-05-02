import Container from '@components/Container.jsx';
import Reveal from '@components/Reveal.jsx';
import DeviceMockup from '@components/DeviceMockup.jsx';
import { projectMockups } from '@components/mockups/index.js';
import { useLanguage } from '@hooks/useLanguage.js';
import { projectVisuals } from '@data/projects.js';
import { cn } from '@utils/cn.js';
import './Projects.css';

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12.5l4 4L19 6.5" />
  </svg>
);

const PROJECT_URLS = {
  yuval: 'yuval.digital',
  clinic: 'clinic.demo',
  restaurant: 'menu.demo',
  leadgen: 'offer.demo',
};

export default function Projects() {
  const { dict, t } = useLanguage();
  const items = dict.projects.items;

  return (
    <section id="projects" className="projects section">
      <Container>
        <Reveal className="section__head">
          <span className="eyebrow">{t('projects.eyebrow')}</span>
          <h2 className="section__title">{t('projects.title')}</h2>
          <p className="section__lead">{t('projects.subtitle')}</p>
        </Reveal>

        <div className="projects__grid">
          {items.map((item, i) => {
            const visual = projectVisuals[item.id] || projectVisuals.default;
            const isReal = item.kind === 'real';
            const kindLabel = isReal ? t('projects.realLabel') : t('projects.conceptLabel');
            const Mockup = projectMockups[item.id];
            const url = PROJECT_URLS[item.id] ?? '';

            return (
              <Reveal
                key={item.id}
                variant="up"
                delay={i * 90}
                className="project-card"
              >
                <article
                  className={cn('project-card__inner', { 'project-card__inner--real': isReal })}
                  style={{
                    '--card-glow': visual.glow,
                    '--card-accent': visual.accent,
                  }}
                >
                  {/* === VISUAL STAGE (mockup + glow) === */}
                  <div className="project-card__stage">
                    <div className="project-card__stage-bg" aria-hidden />
                    <div className="project-card__stage-grid" aria-hidden />

                    <span
                      className={cn(
                        'project-card__badge',
                        { 'project-card__badge--real': isReal, 'project-card__badge--concept': !isReal }
                      )}
                    >
                      <span className="project-card__badge-dot" aria-hidden />
                      {kindLabel}
                    </span>

                    <div className="project-card__devices">
                      <div className="project-card__desktop">
                        <DeviceMockup variant="browser" url={url}>
                          {Mockup ? <Mockup /> : null}
                        </DeviceMockup>
                      </div>
                      <div className="project-card__phone">
                        <DeviceMockup variant="phone">
                          {Mockup ? <Mockup /> : null}
                        </DeviceMockup>
                      </div>
                    </div>
                  </div>

                  {/* === BODY === */}
                  <div className="project-card__body">
                    <header className="project-card__header">
                      <span className="project-card__category">{item.category}</span>
                      <h3 className="project-card__title">{item.title}</h3>
                      <p className="project-card__desc">{item.solution}</p>
                    </header>

                    {item.features && item.features.length > 0 && (
                      <ul
                        className="project-card__features"
                        aria-label={t('projects.featuresLabel')}
                      >
                        {item.features.map(f => (
                          <li key={f} className="project-card__feature">
                            <span className="project-card__feature-icon" aria-hidden><CheckIcon /></span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <a className="project-card__cta" href="#contact">
                      <span>{t('projects.viewProject')}</span>
                      <span className="project-card__cta-arrow" aria-hidden><ArrowIcon /></span>
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
