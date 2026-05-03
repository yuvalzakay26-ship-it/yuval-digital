import { useEffect, useState } from 'react';
import { useLanguage } from '@hooks/useLanguage.js';
import { cn } from '@utils/cn.js';
import { WHATSAPP_HREF } from '@data/contact.js';
import './WhatsAppFab.css';

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M19.11 4.93A10 10 0 0 0 4.07 18.18L3 22l3.93-1.03A10 10 0 1 0 19.1 4.93zM12 20.06a8.04 8.04 0 0 1-4.1-1.12l-.3-.18-2.32.61.62-2.27-.19-.31A8.05 8.05 0 1 1 12 20.05zm4.5-5.81-1.6-.78a.86.86 0 0 0-.86.05c-.34.23-1.27.96-1.4 1.05a.4.4 0 0 1-.46.04 6.43 6.43 0 0 1-1.95-1.2 7.27 7.27 0 0 1-1.36-1.69.45.45 0 0 1 .12-.55c.13-.13.3-.34.45-.51.12-.16.16-.27.24-.43a.5.5 0 0 0-.02-.5l-.78-1.88c-.21-.51-.43-.43-.6-.45h-.51a1 1 0 0 0-.71.34 3.04 3.04 0 0 0-.94 2.25 5.27 5.27 0 0 0 1.1 2.79 12.12 12.12 0 0 0 4.6 4.07 5.25 5.25 0 0 0 2.05.41 3.06 3.06 0 0 0 2.02-.84 2.5 2.5 0 0 0 .58-1.66c-.04-.1-.18-.16-.37-.25z"/>
  </svg>
);

/**
 * Elegant floating WhatsApp button. Appears once the user has scrolled past
 * the hero, and steps aside while the contact section is on-screen so it
 * doesn't compete with the inline WhatsApp action there.
 */
export default function WhatsAppFab() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let raf = 0;
    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const next = window.scrollY > 320;
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
     replaces per-scroll getBoundingClientRect() reads. */
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

  return (
    <a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noreferrer"
      className={cn('wa-fab', {
        'wa-fab--visible': visible,
        'wa-fab--hidden': hidden,
      })}
      aria-label={t('fab.whatsapp')}
      title={t('fab.whatsapp')}
    >
      <span className="wa-fab__pulse" aria-hidden />
      <span className="wa-fab__icon">
        <WhatsAppIcon />
      </span>
      <span className="wa-fab__label">{t('fab.whatsapp')}</span>
    </a>
  );
}
