import Container from '@components/Container.jsx';
import Reveal from '@components/Reveal.jsx';
import { useLanguage } from '@hooks/useLanguage.js';
import './TrustStrip.css';

const SpeedIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 14l4-4" />
    <path d="M21 12a9 9 0 1 1-9-9" />
    <path d="M21 3v6h-6" />
  </svg>
);

const TrustIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 3l8 4v6c0 4.5-3.4 7.4-8 8-4.6-.6-8-3.5-8-8V7l8-4z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const BusinessIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M3 21V8l9-5 9 5v13" />
    <path d="M9 21v-7h6v7" />
  </svg>
);

const ICONS = [SpeedIcon, TrustIcon, BusinessIcon];

export default function TrustStrip() {
  const { dict } = useLanguage();
  const items = dict.trustStrip?.items || [];

  if (!items.length) return null;

  return (
    <section className="trust-strip" aria-label={dict.trustStrip?.ariaLabel}>
      <Container>
        <Reveal variant="up">
          <ul className="trust-strip__list" role="list">
            {items.map((text, i) => {
              const Icon = ICONS[i] || TrustIcon;
              return (
                <li key={i} className="trust-strip__item">
                  <span className="trust-strip__icon" aria-hidden>
                    <Icon />
                  </span>
                  <span className="trust-strip__text">{text}</span>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
