import Container from '@components/Container.jsx';
import Reveal from '@components/Reveal.jsx';
import { useLanguage } from '@hooks/useLanguage.js';
import './Testimonials.css';

const QuoteIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M9 7H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-3l2-4V8a1 1 0 0 0-1-1zM21 7h-4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-3l2-4V8a1 1 0 0 0-1-1z" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export default function Testimonials() {
  const { dict, t } = useLanguage();
  const items = dict.testimonials.items;

  return (
    <section id="testimonials" className="tm section">
      <Container>
        <Reveal className="section__head">
          <span className="eyebrow">{t('testimonials.eyebrow')}</span>
          <h2 className="section__title">{t('testimonials.title')}</h2>
          <p className="section__lead">{t('testimonials.subtitle')}</p>
        </Reveal>

        <div className="tm__grid">
          {items.map((item, i) => (
            <Reveal key={item.id} variant="up" delay={i * 90} className="tm-card">
              <article className="tm-card__inner surface">
                <header className="tm-card__head">
                  <span className="tm-card__quote-mark" aria-hidden><QuoteIcon /></span>
                  <span className="tm-card__kind">{item.kind}</span>
                </header>

                <blockquote className="tm-card__quote">"{item.quote}"</blockquote>

                <footer className="tm-card__footer">
                  <span className="tm-card__check" aria-hidden><CheckIcon /></span>
                  <span className="tm-card__label">{item.label}</span>
                </footer>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
