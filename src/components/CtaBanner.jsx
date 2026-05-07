import Container from '@components/Container.jsx';
import Button from '@components/Button.jsx';
import Reveal from '@components/Reveal.jsx';
import { useLanguage } from '@hooks/useLanguage.js';
import { WHATSAPP_HREF } from '@data/contact.js';
import { track } from '@utils/analytics.js';
import { cn } from '@utils/cn.js';
import './CtaBanner.css';

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
    <path d="M19.11 4.93A10 10 0 0 0 4.07 18.18L3 22l3.93-1.03A10 10 0 1 0 19.1 4.93zM12 20.06a8.04 8.04 0 0 1-4.1-1.12l-.3-.18-2.32.61.62-2.27-.19-.31A8.05 8.05 0 1 1 12 20.05z"/>
  </svg>
);

/**
 * Reusable conversion banner.
 * `variant` selects the i18n bucket under `ctaBanner.<variant>`.
 * `tone` controls visual treatment.
 *   - 'soft'   — subtle inline banner (after Hero/Packages)
 *   - 'strong' — full-bleed gradient (before Footer)
 */
export default function CtaBanner({ variant = 'afterHero', tone = 'soft' }) {
  const { t } = useLanguage();
  const base = `ctaBanner.${variant}`;

  return (
    <section className={cn('cta-banner', `cta-banner--${tone}`)} aria-label={t(`${base}.title`)}>
      <Container>
        <Reveal className="cta-banner__inner" variant="up">
          <div className="cta-banner__text">
            <span className="cta-banner__eyebrow">{t(`${base}.eyebrow`)}</span>
            <h2 className="cta-banner__title">{t(`${base}.title`)}</h2>
            <p className="cta-banner__body">{t(`${base}.body`)}</p>
          </div>

          <div className="cta-banner__actions">
            <Button
              as="a"
              href="#contact"
              variant={tone === 'strong' ? 'gradient' : 'gradient'}
              size="lg"
              iconEnd={<ArrowIcon />}
              onClick={() => track('cta_banner_click', { source: `cta_banner_${variant}`, destination: 'contact' })}
            >
              {t(`${base}.cta`)}
            </Button>
            <Button
              as="a"
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noreferrer"
              variant="ghost"
              size="lg"
              iconStart={<WhatsAppIcon />}
              className="cta-banner__wa"
              onClick={() => track('whatsapp_click', { source: `cta_banner_${variant}` })}
            >
              WhatsApp
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
