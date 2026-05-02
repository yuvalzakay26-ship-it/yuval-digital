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

const StarIcon = () => (
  <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor" aria-hidden>
    <path d="M12 2l2.9 6.9L22 10l-5.5 4.7L18.2 22 12 18l-6.2 4 1.7-7.3L2 10l7.1-1.1L12 2z" />
  </svg>
);

const PROJECT_URLS = {
  marzipan: 'marzipan-bakery.vercel.app',
  yuval: 'yuval.digital',
  clinic: 'clinic.demo',
  restaurant: 'menu.demo',
  leadgen: 'offer.demo',
};

function isExternalUrl(url) {
  return typeof url === 'string' && /^https?:\/\//i.test(url);
}

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
            const isFeatured = !!item.featured;
            const kindLabel = isReal ? t('projects.realLabel') : t('projects.conceptLabel');
            const Mockup = projectMockups[item.id];
            const url = PROJECT_URLS[item.id] ?? '';

            const hasCaseStudy = !!item.caseStudyUrl && item.caseStudyUrl !== '#';
            const liveHref = item.liveUrl && item.liveUrl !== '#' ? item.liveUrl : '#contact';
            const caseHref = hasCaseStudy ? item.caseStudyUrl : liveHref;
            const liveExternal = isExternalUrl(liveHref);
            const caseExternal = isExternalUrl(caseHref);
            const secondaryLabel = hasCaseStudy ? t('projects.caseStudy') : t('projects.viewProjectAlt');

            return (
              <Reveal
                key={item.id}
                variant="up"
                delay={i * 90}
                className={cn('project-card', { 'project-card--featured': isFeatured })}
              >
                <article
                  className={cn('project-card__inner', {
                    'project-card__inner--real': isReal,
                    'project-card__inner--featured': isFeatured,
                  })}
                  style={{
                    '--card-glow': visual.glow,
                    '--card-accent': visual.accent,
                  }}
                >
                  {isFeatured && (
                    <span className="project-card__featured-flag">
                      <span className="project-card__featured-flag-icon" aria-hidden><StarIcon /></span>
                      <span>{t('projects.featuredLabel')}</span>
                    </span>
                  )}

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
                          {Mockup ? <Mockup variant="browser" /> : null}
                        </DeviceMockup>
                      </div>
                      <div className="project-card__phone">
                        <DeviceMockup variant="phone">
                          {Mockup ? <Mockup variant="phone" /> : null}
                        </DeviceMockup>
                      </div>
                    </div>
                  </div>

                  {/* === BODY === */}
                  <div className="project-card__body">
                    <header className="project-card__header">
                      <span className="project-card__category">{item.category}</span>
                      <h3 className="project-card__title">{item.title}</h3>
                      {item.subtitle ? (
                        <p className="project-card__subtitle">{item.subtitle}</p>
                      ) : (
                        <p className="project-card__desc">{item.solution}</p>
                      )}
                    </header>

                    {isFeatured && item.skills && item.skills.length > 0 && (
                      <ul
                        className="project-card__skills"
                        aria-label={t('projects.skillsLabel')}
                      >
                        {item.skills.map(s => (
                          <li key={s} className="project-card__skill">{s}</li>
                        ))}
                      </ul>
                    )}

                    {!isFeatured && item.features && item.features.length > 0 && (
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

                    {isFeatured ? (
                      <div className="project-card__actions">
                        <a
                          className="project-card__btn project-card__btn--primary"
                          href={liveHref}
                          target={liveExternal ? '_blank' : undefined}
                          rel={liveExternal ? 'noreferrer noopener' : undefined}
                        >
                          <span>{t('projects.liveDemo')}</span>
                          <span className="project-card__btn-arrow" aria-hidden><ArrowIcon /></span>
                        </a>
                        <a
                          className="project-card__btn project-card__btn--ghost"
                          href={caseHref}
                          target={caseExternal ? '_blank' : undefined}
                          rel={caseExternal ? 'noreferrer noopener' : undefined}
                        >
                          <span>{secondaryLabel}</span>
                        </a>
                      </div>
                    ) : (
                      <a className="project-card__cta" href="#contact">
                        <span>{t('projects.viewProject')}</span>
                        <span className="project-card__cta-arrow" aria-hidden><ArrowIcon /></span>
                      </a>
                    )}
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
