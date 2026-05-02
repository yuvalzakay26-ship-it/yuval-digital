import { useEffect } from 'react';
import Container from '@components/Container.jsx';
import Reveal from '@components/Reveal.jsx';
import './LegalPage.css';

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
);

/**
 * Premium legal-page shell used by both Accessibility Statement and Privacy Policy.
 * Pages pass title, intro, sections, and an optional contactBlock.
 */
export default function LegalPage({
  eyebrow,
  title,
  intro,
  updated,
  sections = [],
  contactBlock = null,
  back,
  backHref = '#/',
}) {
  useEffect(() => {
    /* Bring focus to the page heading for screen readers when the page loads. */
    const id = window.setTimeout(() => {
      const h1 = document.querySelector('.legal__title');
      h1?.setAttribute('tabindex', '-1');
      h1?.focus();
      window.scrollTo({ top: 0, behavior: 'auto' });
    }, 30);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <article className="legal">
      <Container className="legal__inner">
        <header className="legal__head">
          <a href={backHref} className="legal__back">
            <span className="legal__back-icon" aria-hidden><ArrowIcon /></span>
            {back}
          </a>
          {eyebrow && <span className="eyebrow legal__eyebrow">{eyebrow}</span>}
          <h1 className="legal__title">{title}</h1>
          {updated && <p className="legal__updated">{updated}</p>}
          {intro && <p className="legal__intro">{intro}</p>}
        </header>

        <div className="legal__body">
          {sections.map((s, i) => (
            <Reveal key={i} variant="up" delay={i * 60} className="legal__section">
              <h2 className="legal__section-title">
                <span className="legal__section-num" aria-hidden>{String(i + 1).padStart(2, '0')}</span>
                {s.title}
              </h2>
              <p className="legal__section-body">{s.body}</p>
            </Reveal>
          ))}

          {contactBlock && (
            <Reveal variant="up" delay={sections.length * 60} className="legal__contact">
              {contactBlock.map((b, i) => (
                <div key={i} className="legal__contact-block">
                  <span className="legal__contact-label">{b.label}</span>
                  <span className="legal__contact-value">
                    {b.href ? <a href={b.href} dir={b.dir}>{b.value}</a> : b.value}
                  </span>
                </div>
              ))}
            </Reveal>
          )}
        </div>
      </Container>
    </article>
  );
}
