import { Link } from 'react-router-dom';
import Container from '@components/Container.jsx';
import Reveal from '@components/Reveal.jsx';
import { useLanguage } from '@hooks/useLanguage.js';
import { serviceIcons } from '@data/services.jsx';
import { SERVICE_CATALOG } from '@data/serviceCatalog.js';
import './Services.css';

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

/* Look up the catalog entry for a service id (used to find the slug
   for the matching detail page). Built once at module load. */
const CATALOG_BY_ID = Object.fromEntries(SERVICE_CATALOG.map(s => [s.id, s]));

export default function Services() {
  const { locale, dict, t } = useLanguage();
  const items = dict.services.items;

  return (
    <section id="services" className="services section">
      <Container>
        <Reveal className="section__head">
          <span className="eyebrow">{t('services.eyebrow')}</span>
          <h2 className="section__title">{t('services.title')}</h2>
          <p className="section__lead">{t('services.subtitle')}</p>
        </Reveal>

        <div className="services__grid">
          {items.map((item, i) => {
            const entry = CATALOG_BY_ID[item.id];
            const hasPage = entry?.published;
            return (
              <Reveal key={item.id} variant="up" delay={i * 70} className="service-card-wrap">
                <ServiceCard
                  item={item}
                  href={hasPage ? `/${locale}/services/${entry.slug}` : null}
                  learnMoreLabel={t('servicePages.common.primaryCta')}
                />
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* The card renders the same shape regardless of linking — a Link
   wrapper when there's a detail page, an article otherwise. Both
   present the same visual surface so the home section reads as one
   consistent grid even while pages are rolling out incrementally. */
function ServiceCard({ item, href, learnMoreLabel }) {
  const body = (
    <>
      <div className="service-card__icon">{serviceIcons[item.id]}</div>
      <h3 className="service-card__title">{item.title}</h3>
      <p className="service-card__desc">{item.description}</p>
      <ul className="service-card__bullets">
        {item.bullets.map(b => (
          <li key={b}>
            <span className="service-card__dot" aria-hidden />
            {b}
          </li>
        ))}
      </ul>
      {href && (
        <span className="service-card__more">
          {learnMoreLabel}
          <span className="service-card__more-arrow" aria-hidden><ArrowIcon /></span>
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link to={href} className="service-card service-card--linked surface surface--interactive">
        {body}
      </Link>
    );
  }
  return (
    <article className="service-card surface surface--interactive">
      {body}
    </article>
  );
}
