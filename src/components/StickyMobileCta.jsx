import { useEffect, useState } from 'react';
import { useLanguage } from '@hooks/useLanguage.js';
import { cn } from '@utils/cn.js';
import { PHONE_HREF, WHATSAPP_HREF } from '@data/contact.js';
import './StickyMobileCta.css';

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
    <path d="M19.11 4.93A10 10 0 0 0 4.07 18.18L3 22l3.93-1.03A10 10 0 1 0 19.1 4.93zM12 20.06a8.04 8.04 0 0 1-4.1-1.12l-.3-.18-2.32.61.62-2.27-.19-.31A8.05 8.05 0 1 1 12 20.05z"/>
  </svg>
);

const MessageIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M21 12a8 8 0 0 1-11.5 7.2L3 21l1.8-6.5A8 8 0 1 1 21 12z" />
  </svg>
);

/**
 * Subtle mobile-only sticky bar with click-to-call, WhatsApp, and form CTA.
 * Hidden on desktop and during initial scroll, hidden when contact section is visible.
 */
export default function StickyMobileCta() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const contactSection = document.getElementById('contact');

    function update() {
      const past = window.scrollY > 480;
      let inContact = false;
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        inContact = rect.top < window.innerHeight * 0.6 && rect.bottom > 0;
      }
      setVisible(past && !inContact);
    }

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div
      className={cn('sticky-cta', { 'sticky-cta--visible': visible })}
      aria-hidden={!visible}
    >
      <a href={PHONE_HREF} className="sticky-cta__btn sticky-cta__btn--call" aria-label={t('stickyCta.call')}>
        <span className="sticky-cta__btn-icon" aria-hidden><PhoneIcon /></span>
        <span className="sticky-cta__btn-label">{t('stickyCta.call')}</span>
      </a>
      <a href={WHATSAPP_HREF} target="_blank" rel="noreferrer" className="sticky-cta__btn sticky-cta__btn--wa" aria-label={t('stickyCta.whatsapp')}>
        <span className="sticky-cta__btn-icon" aria-hidden><WhatsAppIcon /></span>
        <span className="sticky-cta__btn-label">{t('stickyCta.whatsapp')}</span>
      </a>
      <a href="#contact" className="sticky-cta__btn sticky-cta__btn--primary" aria-label={t('stickyCta.label')}>
        <span className="sticky-cta__btn-icon" aria-hidden><MessageIcon /></span>
        <span className="sticky-cta__btn-label">{t('stickyCta.label')}</span>
      </a>
    </div>
  );
}
