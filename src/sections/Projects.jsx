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

const SparkleIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden>
    <path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6L12 2zM19 14l.8 2.6 2.6.8-2.6.8L19 21l-.8-2.8-2.6-.8 2.6-.8L19 14zM5 14l.8 2.6 2.6.8-2.6.8L5 21l-.8-2.8L1.6 17.4l2.6-.8L5 14z" />
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

function ProjectCard({ item, index, t, compact = false }) {
  const visual = projectVisuals[item.id] || projectVisuals.default;
  const isReal = item.kind === 'real';
  const isFeatured = !!item.featured;
  const kindLabel = isReal ? t('projects.realLabel') : t('projects.conceptLabel');
  const Mockup = projectMockups[item.id];
  const url = PROJECT_URLS[item.id] ?? '';

  const hasLive = !!item.liveUrl && item.liveUrl !== '#';
  const hasCaseStudy = !!item.caseStudyUrl && item.caseStudyUrl !== '#';
  const isConcept = item.kind === 'concept';
  // Real project without an external live URL = the site you're currently on.
  const isCurrentSite = !hasLive && !isConcept;
  const liveHref = hasLive ? item.liveUrl : null;
  const liveExternal = isExternalUrl(liveHref);
  const caseExternal = isExternalUrl(item.caseStudyUrl);
  const statusLabel = isConcept
    ? t('projects.conceptDemoBadge')
    : isCurrentSite
      ? t('projects.currentSiteBadge')
      : null;

  return (
    <Reveal
      variant="up"
      delay={index * 90}
      className={cn('project-card', {
        'project-card--featured': isFeatured,
        'project-card--compact': compact,
      })}
    >
      <article
        className={cn('project-card__inner', {
          'project-card__inner--real': isReal,
          'project-card__inner--featured': isFeatured,
          'project-card__inner--compact': compact,
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
          {isFeatured && <div className="project-card__stage-halo" aria-hidden />}

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
              {hasLive && (
                <a
                  className="project-card__btn project-card__btn--primary"
                  href={liveHref}
                  target={liveExternal ? '_blank' : undefined}
                  rel={liveExternal ? 'noreferrer noopener' : undefined}
                >
                  <span>{t('projects.liveDemo')}</span>
                  <span className="project-card__btn-arrow" aria-hidden><ArrowIcon /></span>
                </a>
              )}
              {hasCaseStudy && (
                <a
                  className="project-card__btn project-card__btn--ghost"
                  href={item.caseStudyUrl}
                  target={caseExternal ? '_blank' : undefined}
                  rel={caseExternal ? 'noreferrer noopener' : undefined}
                >
                  <span>{t('projects.caseStudy')}</span>
                </a>
              )}
              {!hasLive && statusLabel && (
                <span className="project-card__status" role="status">
                  <span className="project-card__status-dot" aria-hidden />
                  <span>{statusLabel}</span>
                </span>
              )}
            </div>
          ) : hasLive ? (
            <a
              className="project-card__cta"
              href={liveHref}
              target={liveExternal ? '_blank' : undefined}
              rel={liveExternal ? 'noreferrer noopener' : undefined}
            >
              <span>{t('projects.liveDemo')}</span>
              <span className="project-card__cta-arrow" aria-hidden><ArrowIcon /></span>
            </a>
          ) : (
            <span className="project-card__status" role="status">
              <span className="project-card__status-dot" aria-hidden />
              <span>{statusLabel}</span>
            </span>
          )}
        </div>
      </article>
    </Reveal>
  );
}

export default function Projects() {
  const { dict, t } = useLanguage();
  const items = dict.projects.items;
  const stats = dict.projects.stats || [];
  const finalCta = dict.projects.finalCta;
  const intro = dict.projects.intro;

  const featured = items.filter(i => i.featured);
  const rest = items.filter(i => !i.featured);

  return (
    <section id="projects" className="projects section">
      <Container>
        <Reveal className="section__head projects__head">
          <span className="eyebrow">{t('projects.eyebrow')}</span>
          <h2 className="section__title">{t('projects.title')}</h2>
          <p className="section__lead">{t('projects.subtitle')}</p>

          {stats.length > 0 && (
            <ul className="projects__stats" aria-label={t('projects.eyebrow')}>
              {stats.map((s, i) => (
                <li key={i} className="projects__stat">
                  <span className="projects__stat-value">{s.value}</span>
                  <span className="projects__stat-label">{s.label}</span>
                </li>
              ))}
            </ul>
          )}
        </Reveal>

        {featured.map((item, i) => (
          <ProjectCard key={item.id} item={item} index={i} t={t} />
        ))}

        {intro && (
          <Reveal className="projects__intro" delay={120}>
            <span className="projects__intro-icon" aria-hidden><SparkleIcon /></span>
            <p>{intro}</p>
          </Reveal>
        )}

        <div className="projects__grid">
          {rest.map((item, i) => (
            <ProjectCard key={item.id} item={item} index={i} t={t} compact />
          ))}
        </div>

        {finalCta && (
          <Reveal className="projects__final" delay={160}>
            <div className="projects__final-inner">
              <div className="projects__final-glow" aria-hidden />
              <h3 className="projects__final-title">{finalCta.title}</h3>
              {finalCta.body && (
                <p className="projects__final-body">{finalCta.body}</p>
              )}
              <a className="projects__final-btn" href="#contact">
                <span>{finalCta.button}</span>
                <span className="projects__final-btn-arrow" aria-hidden><ArrowIcon /></span>
              </a>
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
