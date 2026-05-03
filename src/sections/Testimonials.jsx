import Container from '@components/Container.jsx';
import Reveal from '@components/Reveal.jsx';
import { useLanguage } from '@hooks/useLanguage.js';
import './Testimonials.css';

const QuoteMark = () => (
  <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden>
    <path d="M11.2 6.4C6.8 8.4 4 12.4 4 17.6V25.6h8V17.6H8c0-3.2 1.6-5.6 4.8-6.8L11.2 6.4zm14.4 0c-4.4 2-7.2 6-7.2 11.2V25.6h8V17.6h-4c0-3.2 1.6-5.6 4.8-6.8L25.6 6.4z" />
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
                <span className="tm-card__mark" aria-hidden><QuoteMark /></span>

                <blockquote className="tm-card__quote">"{item.quote}"</blockquote>

                <footer className="tm-card__footer">
                  <span className="tm-card__avatar" aria-hidden>{item.initial}</span>
                  <span className="tm-card__source">{item.source}</span>
                </footer>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
