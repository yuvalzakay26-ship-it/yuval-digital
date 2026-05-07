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
       a11y toggle, which sets data-a11y-pause-animations='on' on <html>).
       The explicit `behavior` argument overrides CSS `scroll-behavior`, so
       this works regardless of the global stylesheet rules. */
    const reduced =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      document.documentElement.dataset.a11yPauseAnimations === 'on';

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: reduced ? 'auto' : 'smooth',
    });
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
