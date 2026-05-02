import { useState } from 'react';
import Container from '@components/Container.jsx';
import Reveal from '@components/Reveal.jsx';
import { useLanguage } from '@hooks/useLanguage.js';
import { cn } from '@utils/cn.js';
import './Faq.css';

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

export default function Faq() {
  const { dict, t } = useLanguage();
  const items = dict.faq.items;
  const [openId, setOpenId] = useState(items[0]?.id ?? null);

  return (
    <section id="faq" className="faq section">
      <Container className="faq__inner">
        <Reveal className="faq__head">
          <span className="eyebrow">{t('faq.eyebrow')}</span>
          <h2 className="section__title">{t('faq.title')}</h2>
          <p className="section__lead">{t('faq.subtitle')}</p>
        </Reveal>

        <Reveal variant="up" delay={120} className="faq__list-wrap">
          <ul className="faq__list">
            {items.map((item, i) => {
              const open = openId === item.id;
              return (
                <li key={item.id} className={cn('faq__item', { 'faq__item--open': open })}>
                  <button
                    type="button"
                    className="faq__trigger"
                    aria-expanded={open}
                    aria-controls={`faq-panel-${item.id}`}
                    id={`faq-trigger-${item.id}`}
                    onClick={() => setOpenId(open ? null : item.id)}
                  >
                    <span className="faq__index" aria-hidden>{String(i + 1).padStart(2, '0')}</span>
                    <span className="faq__question">{item.q}</span>
                    <span className="faq__chevron" aria-hidden><PlusIcon /></span>
                  </button>
                  <div
                    id={`faq-panel-${item.id}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${item.id}`}
                    className="faq__panel"
                    hidden={!open}
                  >
                    <p className="faq__answer">{item.a}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <a className="faq__contact" href="#contact">
            {t('faq.contactCta')}
            <span className="faq__contact-arrow" aria-hidden><ArrowIcon /></span>
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
