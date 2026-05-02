import Container from '@components/Container.jsx';
import Reveal from '@components/Reveal.jsx';
import { useLanguage } from '@hooks/useLanguage.js';
import { serviceIcons } from '@data/services.jsx';
import './Services.css';

export default function Services() {
  const { dict, t } = useLanguage();
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
          {items.map((item, i) => (
            <Reveal key={item.id} variant="up" delay={i * 70} className="service-card-wrap">
              <article className="service-card surface surface--interactive">
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
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
