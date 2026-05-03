import { useEffect, useState } from 'react';
import { useLanguage } from '@hooks/useLanguage.js';
import { cn } from '@utils/cn.js';
import { PHONE_HREF, WHATSAPP_HREF } from '@data/contact.js';
import './MobileActionBar.css';

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden>
    <path d="M19.11 4.93A10 10 0 0 0 4.07 18.18L3 22l3.93-1.03A10 10 0 1 0 19.1 4.93zM12 20.06a8.04 8.04 0 0 1-4.1-1.12l-.3-.18-2.32.61.62-2.27-.19-.31A8.05 8.05 0 1 1 12 20.05zm4.5-5.81-1.6-.78a.86.86 0 0 0-.86.05c-.34.23-1.27.96-1.4 1.05a.4.4 0 0 1-.46.04 6.43 6.43 0 0 1-1.95-1.2 7.27 7.27 0 0 1-1.36-1.69.45.45 0 0 1 .12-.55c.13-.13.3-.34.45-.51.12-.16.16-.27.24-.43a.5.5 0 0 0-.02-.5l-.78-1.88c-.21-.51-.43-.43-.6-.45h-.51a1 1 0 0 0-.71.34 3.04 3.04 0 0 0-.94 2.25 5.27 5.27 0 0 0 1.1 2.79 12.12 12.12 0 0 0 4.6 4.07 5.25 5.25 0 0 0 2.05.41 3.06 3.06 0 0 0 2.02-.84 2.5 2.5 0 0 0 .58-1.66c-.04-.1-.18-.16-.37-.25z" />
  </svg>
);

const QuoteIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 4h13a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-7l-5 4v-4H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3z" />
  </svg>
);

/**
 * Mobile-only floating action bar. Three actions: Call, WhatsApp (primary),
 * Quote. Reveals after the user scrolls past the hero, and steps aside while
 * the contact section is on-screen so it doesn't compete with inline CTAs.
 */
export default function MobileActionBar() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let raf = 0;
    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const next = window.scrollY > 280;
        setVisible(prev => (prev === next ? prev : next));
      });
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /* Hide while the contact section is on screen — IntersectionObserver
     replaces a per-scroll getBoundingClientRect() to avoid layout reads
     in the scroll path. */
  useEffect(() => {
    const target = document.getElementById('contact');
    if (!target || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        const next = entry.isIntersecting;
        setHidden(prev => (prev === next ? prev : next));
      },
      { rootMargin: '-45% 0px -10% 0px', threshold: 0 }
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);

  const inactive = !visible || hidden;

  return (
    <div
      className={cn('mab', { 'mab--visible': visible, 'mab--hidden': hidden })}
      role="group"
      aria-label={t('mab.ariaLabel')}
      aria-hidden={inactive}
    >
      <a
        href={PHONE_HREF}
        className="mab__btn mab__btn--call"
        aria-label={t('mab.call')}
        tabIndex={inactive ? -1 : 0}
      >
        <span className="mab__icon" aria-hidden><PhoneIcon /></span>
        <span className="mab__label mab__label--sr">{t('mab.call')}</span>
      </a>
      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noreferrer"
        className="mab__btn mab__btn--wa"
        aria-label={t('mab.whatsapp')}
        tabIndex={inactive ? -1 : 0}
      >
        <span className="mab__icon" aria-hidden><WhatsAppIcon /></span>
        <span className="mab__label">{t('mab.whatsapp')}</span>
      </a>
      <a
        href="#contact"
        className="mab__btn mab__btn--quote"
        aria-label={t('mab.quote')}
        tabIndex={inactive ? -1 : 0}
      >
        <span className="mab__icon" aria-hidden><QuoteIcon /></span>
        <span className="mab__label">{t('mab.quote')}</span>
      </a>
    </div>
  );
}
