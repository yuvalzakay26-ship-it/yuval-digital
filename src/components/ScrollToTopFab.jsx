import { useEffect, useState } from 'react';
import { useLanguage } from '@hooks/useLanguage.js';
import { cn } from '@utils/cn.js';
import './ScrollToTopFab.css';

const ArrowUpIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 19V6" />
    <path d="M5 12l7-7 7 7" />
  </svg>
);

/**
 * Minimal scroll-to-top FAB. Sits one step above the WhatsApp FAB on desktop
 * and mirrors the a11y FAB on mobile. Visible only after the user has scrolled
 * past ~500px so it never competes with hero content.
 */
export default function ScrollToTopFab() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf = 0;
    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const next = window.scrollY > 500;
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

  function handleClick() {
    const start = window.scrollY || document.documentElement.scrollTop || 0;
    if (start <= 0) return;

    /* Honor reduced-motion (OS preference + the in-app "Pause animations"
       a11y toggle, which sets data-a11y-pause-animations='on' on <html>). */
    const reduced =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      document.documentElement.dataset.a11yPauseAnimations === 'on';
    if (reduced) {
      window.scrollTo(0, 0);
      return;
    }

    /* JS-driven rAF easing. Independent of CSS `scroll-behavior` (which is
       force-overridden to `auto` by reduced-motion + a11y rules in this app)
       and of browser quirks that downgrade `behavior:'smooth'` on
       programmatic scrolls. Duration scales with distance, capped 320–760ms. */
    const duration = Math.min(760, Math.max(320, start * 0.55));
    const t0 = performance.now();
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    function step(now) {
      const t = Math.min(1, (now - t0) / duration);
      window.scrollTo(0, Math.round(start * (1 - easeOutCubic(t))));
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  return (
    <button
      type="button"
      className={cn('stt-fab', { 'stt-fab--visible': visible })}
      onClick={handleClick}
      aria-label={t('fab.scrollTop')}
      title={t('fab.scrollTop')}
      tabIndex={visible ? 0 : -1}
    >
      <span className="stt-fab__icon" aria-hidden>
        <ArrowUpIcon />
      </span>
    </button>
  );
}
