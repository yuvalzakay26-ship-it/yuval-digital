import { useState } from 'react';
import Container from '@components/Container.jsx';
import Reveal from '@components/Reveal.jsx';
import { useLanguage } from '@hooks/useLanguage.js';
import { cn } from '@utils/cn.js';
import './ServiceFaq.css';

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

/**
 * Service-specific FAQ. Mirrors the home Faq look so the FAQPage
 * schema can be re-used semantically. Includes a tail link back to
 * the full home FAQ for visitors who want more.
 */
export default function ServiceFaq({ data }) {
  const { locale, t } = useLanguage();
  const items = data.items;
  const [openId, setOpenId] = useState(items[0]?.id ?? null);

  return (
    <section id="service-faq" className="svc-faq section">
      <Container className="svc-faq__inner">
        <Reveal className="svc-faq__head">
          <span className="eyebrow">{data.eyebrow}</span>
          <h2 className="section__title">{data.title}</h2>
        </Reveal>

        <Reveal variant="up" delay={100} className="svc-faq__list-wrap">
          <ul className="svc-faq__list">
            {items.map((item, i) => {
              const open = openId === item.id;
              return (
                <li key={item.id} className={cn('svc-faq__item', { 'svc-faq__item--open': open })}>
                  <button
                    type="button"
                    className="svc-faq__trigger"
                    aria-expanded={open}
                    aria-controls={`svc-faq-panel-${item.id}`}
                    id={`svc-faq-trigger-${item.id}`}
                    onClick={() => setOpenId(open ? null : item.id)}
                  >
                    <span className="svc-faq__index" aria-hidden>{String(i + 1).padStart(2, '0')}</span>
                    <span className="svc-faq__question">{item.q}</span>
                    <span className="svc-faq__chevron" aria-hidden><PlusIcon /></span>
                  </button>
                  <div
                    id={`svc-faq-panel-${item.id}`}
                    role="region"
                    aria-labelledby={`svc-faq-trigger-${item.id}`}
                    className="svc-faq__panel"
                    hidden={!open}
                  >
                    <p className="svc-faq__answer">{item.a}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <a className="svc-faq__more" href={`/${locale}#faq`}>
            {t('servicePages.common.faqJumpCta')}
            <span className="svc-faq__more-arrow" aria-hidden><ArrowIcon /></span>
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
