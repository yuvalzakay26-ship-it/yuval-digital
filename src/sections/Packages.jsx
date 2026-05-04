import Container from '@components/Container.jsx';
import Reveal from '@components/Reveal.jsx';
import Button from '@components/Button.jsx';
import { useLanguage } from '@hooks/useLanguage.js';
import { cn } from '@utils/cn.js';
import './Packages.css';

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12.5l4.5 4.5L20 6.5" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

export default function Packages() {
  const { dict, t } = useLanguage();
  const plans = dict.packages.plans;

  return (
    <section id="packages" className="packages section">
      <Container>
        <Reveal className="section__head packages__head">
          <span className="eyebrow">{t('packages.eyebrow')}</span>
          <h2 className="section__title">{t('packages.title')}</h2>
          <p className="section__lead">{t('packages.subtitle')}</p>
        </Reveal>

        <div className="packages__grid">
          {plans.map((plan, i) => (
            <Reveal key={plan.id} variant="up" delay={i * 90} className="package-wrap">
              <article
                className={cn('package surface', {
                  'package--highlight': plan.highlight,
                })}
              >
                {plan.highlight && plan.badge && (
                  <span className="package__badge">{plan.badge}</span>
                )}

                <header className="package__header">
                  <h3 className="package__name">{plan.name}</h3>
                  <p className="package__tagline">{plan.tagline}</p>
                </header>

                {plan.price && (
                  <div className="package__price">
                    <span className="package__price-label">{t('packages.priceLabel')}</span>
                    <div className="package__price-row">
                      <span className="package__price-amount" dir="ltr">{plan.price}</span>
                      {plan.priceNote && (
                        <span className="package__price-note">· {plan.priceNote}</span>
                      )}
                    </div>
                  </div>
                )}

                <div className="package__for">
                  <span className="package__for-label">{t('packages.fromLabel')}</span>
                  <span className="package__for-text">{plan.for}</span>
                </div>

                <div className="package__deliverables">
                  <span className="package__deliverables-label">
                    {t('packages.deliverablesLabel')}
                  </span>
                  <ul>
                    {plan.deliverables.map(item => (
                      <li key={item}>
                        <span className="package__check" aria-hidden><CheckIcon /></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  as="a"
                  href="#contact"
                  variant={plan.highlight ? 'gradient' : 'ghost'}
                  size="md"
                  className="package__cta"
                  iconEnd={<ArrowIcon />}
                >
                  {plan.cta || t('packages.cta')}
                </Button>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="packages__diff">{t('packages.differentiator')}</p>
        <p className="packages__note">{t('packages.note')}</p>
      </Container>
    </section>
  );
}
