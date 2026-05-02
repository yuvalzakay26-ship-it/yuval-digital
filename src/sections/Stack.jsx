import Container from '@components/Container.jsx';
import Reveal from '@components/Reveal.jsx';
import { useLanguage } from '@hooks/useLanguage.js';
import './Stack.css';

const groupIcons = {
  frontend: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M3 9h18M8 14l-2 2 2 2M16 14l2 2-2 2" />
    </svg>
  ),
  workflow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    </svg>
  ),
  quality: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3l8 4v6c0 4.5-3.4 7.4-8 8-4.6-.6-8-3.5-8-8V7l8-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
};

export default function Stack() {
  const { dict, t } = useLanguage();
  const groups = dict.stack.groups;

  return (
    <section id="stack" className="stack section">
      <Container>
        <Reveal className="section__head stack__head">
          <span className="eyebrow">{t('stack.eyebrow')}</span>
          <h2 className="section__title">{t('stack.title')}</h2>
          <p className="section__lead">{t('stack.subtitle')}</p>
        </Reveal>

        <div className="stack__grid">
          {groups.map((group, i) => (
            <Reveal key={group.id} variant="up" delay={i * 90} className="stack-card-wrap">
              <article className="stack-card surface">
                <header className="stack-card__head">
                  <span className="stack-card__icon" aria-hidden>{groupIcons[group.id]}</span>
                  <h3 className="stack-card__title">{group.title}</h3>
                </header>

                <ul className="stack-card__list">
                  {group.items.map(item => (
                    <li key={item.name} className="stack-badge">
                      <span className="stack-badge__name">{item.name}</span>
                      <span className="stack-badge__hint">{item.hint}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="stack__note">{t('stack.note')}</p>
      </Container>
    </section>
  );
}
