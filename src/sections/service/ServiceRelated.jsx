import { Link } from 'react-router-dom';
import Container from '@components/Container.jsx';
import Reveal from '@components/Reveal.jsx';
import { useLanguage } from '@hooks/useLanguage.js';
import { serviceIcons } from '@data/services.jsx';
import { getService } from '@data/serviceCatalog.js';
import './ServiceRelated.css';

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

/**
 * Cross-links to related services. Pulls their summary copy from the
 * home `services.items` array (by id) so there's one source of truth
 * for the short pitch. Each card links to the related service's
 * detail page when published, or to the home Services anchor as a
 * graceful fallback. Internal-linking foundation for topical authority.
 */
export default function ServiceRelated({ relatedSlugs }) {
  const { locale, dict, t } = useLanguage();
  const homeServices = dict.services.items;

  const entries = relatedSlugs
    .map(slug => {
      const svc = getService(slug);
      if (!svc) return null;
      const summary = homeServices.find(s => s.id === svc.id);
      if (!summary) return null;
      return { ...svc, summary };
    })
    .filter(Boolean);

  if (entries.length === 0) return null;

  return (
    <section className="svc-related section">
      <Container>
        <Reveal className="section__head">
          <span className="eyebrow">{t('servicePages.common.relatedTitle')}</span>
          <h2 className="section__title">{t('servicePages.common.relatedTitle')}</h2>
          <p className="section__lead">{t('servicePages.common.relatedSubtitle')}</p>
        </Reveal>

        <div className="svc-related__grid">
          {entries.map((entry, i) => {
            const to = entry.published
              ? `/${locale}/services/${entry.slug}`
              : `/${locale}#services`;
            return (
              <Reveal key={entry.slug} variant="up" delay={i * 70} className="svc-related__card-wrap">
                <Link to={to} className="svc-related__card surface surface--interactive">
                  <div className="svc-related__icon" aria-hidden>{serviceIcons[entry.id]}</div>
                  <h3 className="svc-related__title">{entry.summary.title}</h3>
                  <p className="svc-related__desc">{entry.summary.description}</p>
                  <span className="svc-related__cta">
                    {t('servicePages.common.primaryCta')}
                    <span className="svc-related__cta-arrow" aria-hidden><ArrowIcon /></span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
