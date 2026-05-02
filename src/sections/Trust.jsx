import Container from '@components/Container.jsx';
import Reveal from '@components/Reveal.jsx';
import { useLanguage } from '@hooks/useLanguage.js';
import { trustIcons } from '@data/trust.jsx';
import './Trust.css';

export default function Trust() {
  const { dict, t } = useLanguage();
  const items = dict.trust.items;

  return (
    <section id="trust" className="trust section">
      <Container>
        <Reveal className="section__head">
          <span className="eyebrow">{t('trust.eyebrow')}</span>
          <h2 className="section__title">{t('trust.title')}</h2>
          <p className="section__lead">{t('trust.subtitle')}</p>
        </Reveal>

        <div className="trust__grid">
          {items.map((item, i) => (
            <Reveal key={item.id} variant="up" delay={i * 80} className="trust-card">
              <div className="trust-card__inner surface">
                <div className="trust-card__icon">{trustIcons[item.id]}</div>
                <h3 className="trust-card__title">{item.title}</h3>
                <p className="trust-card__body">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
