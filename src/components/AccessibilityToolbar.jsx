import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@hooks/useLanguage.js';
import { useA11y } from '@hooks/useA11y.js';
import { cn } from '@utils/cn.js';
import './AccessibilityToolbar.css';

const A11yIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden>
    <circle cx="12" cy="4.5" r="2" />
    <path d="M5 8.5h14a1 1 0 0 1 .3 1.95l-5.3 1.55v3l1.9 6.5a1 1 0 0 1-1.92.55L12.5 16h-1l-1.5 6.05a1 1 0 0 1-1.92-.55l1.9-6.5v-3l-5.3-1.55A1 1 0 0 1 5 8.5z" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const MinusIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
    <path d="M5 12h14" />
  </svg>
);

const ResetIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
    <path d="M3 4v4h4" />
  </svg>
);

const tileIcons = {
  contrast: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v18" />
      <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" stroke="none" />
    </svg>
  ),
  grayscale: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
    </svg>
  ),
  underlineLinks: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 5l9 14M19 5l-5 8" />
      <path d="M4 21h16" />
    </svg>
  ),
  readableFont: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 19V5h16v14" />
      <path d="M4 9h16" />
      <path d="M9 13h6" />
    </svg>
  ),
  pauseAnimations: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  ),
};

export default function AccessibilityToolbar() {
  const { t, isRtl, locale } = useLanguage();
  const { settings, adjustTextSize, toggle, reset, isDefault, textSizes } = useA11y();
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const triggerRef = useRef(null);

  /* Close on Escape and outside click. */
  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    function onPointer(e) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open]);

  /* Focus the close button when panel opens, return focus on close. */
  useEffect(() => {
    if (open) {
      const id = window.setTimeout(() => {
        const focusable = panelRef.current?.querySelector('[data-autofocus]');
        focusable?.focus();
      }, 60);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  const sizeIdx = textSizes.indexOf(settings.textSize);
  const canDecrease = sizeIdx > 0;
  const canIncrease = sizeIdx < textSizes.length - 1;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="a11y-fab"
        aria-expanded={open}
        aria-controls="a11y-panel"
        aria-label={t('a11y.toolbar.openLabel')}
        title={t('a11y.toolbar.openLabel')}
        onClick={() => setOpen(o => !o)}
      >
        <span className="a11y-fab__icon" aria-hidden><A11yIcon /></span>
        {!isDefault && <span className="a11y-fab__dot" aria-hidden />}
      </button>

      <aside
        id="a11y-panel"
        ref={panelRef}
        className={cn('a11y-panel', { 'a11y-panel--open': open })}
        aria-hidden={!open}
        aria-labelledby="a11y-panel-title"
        role="dialog"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <header className="a11y-panel__head">
          <div>
            <h2 id="a11y-panel-title" className="a11y-panel__title">
              {t('a11y.toolbar.title')}
            </h2>
            <p className="a11y-panel__subtitle">{t('a11y.toolbar.subtitle')}</p>
          </div>
          <button
            type="button"
            className="a11y-panel__close"
            data-autofocus
            onClick={() => setOpen(false)}
            aria-label={t('a11y.toolbar.close')}
          >
            <CloseIcon />
          </button>
        </header>

        <section className="a11y-panel__group" aria-labelledby="a11y-text-size-label">
          <h3 id="a11y-text-size-label" className="a11y-panel__group-title">
            {t('a11y.toolbar.textSize')}
          </h3>
          <div className="a11y-stepper" role="group" aria-labelledby="a11y-text-size-label">
            <button
              type="button"
              className="a11y-stepper__btn"
              onClick={() => adjustTextSize(-1)}
              disabled={!canDecrease}
              aria-label={t('a11y.toolbar.decrease')}
            >
              <MinusIcon />
            </button>
            <span className="a11y-stepper__value" aria-live="polite">
              {t(`a11y.toolbar.sizes.${settings.textSize}`)}
            </span>
            <button
              type="button"
              className="a11y-stepper__btn"
              onClick={() => adjustTextSize(1)}
              disabled={!canIncrease}
              aria-label={t('a11y.toolbar.increase')}
            >
              <PlusIcon />
            </button>
          </div>
        </section>

        <section className="a11y-panel__group" aria-labelledby="a11y-toggles-label">
          <h3 id="a11y-toggles-label" className="a11y-panel__group-title">
            {t('a11y.toolbar.modes')}
          </h3>
          <div className="a11y-tiles">
            {['contrast', 'grayscale', 'underlineLinks', 'readableFont', 'pauseAnimations'].map(key => {
              const active = !!settings[key];
              return (
                <button
                  key={key}
                  type="button"
                  className={cn('a11y-tile', { 'a11y-tile--active': active })}
                  aria-pressed={active}
                  onClick={() => toggle(key)}
                >
                  <span className="a11y-tile__icon" aria-hidden>{tileIcons[key]}</span>
                  <span className="a11y-tile__label">{t(`a11y.toolbar.toggle.${key}`)}</span>
                  <span className="a11y-tile__state" aria-hidden>
                    {active ? t('a11y.toolbar.on') : t('a11y.toolbar.off')}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <footer className="a11y-panel__foot">
          <button
            type="button"
            className="a11y-panel__reset"
            onClick={reset}
            disabled={isDefault}
          >
            <span className="a11y-panel__reset-icon" aria-hidden><ResetIcon /></span>
            {t('a11y.toolbar.reset')}
          </button>
          <Link
            className="a11y-panel__statement"
            to={`/${locale}/page/accessibility`}
            onClick={() => setOpen(false)}
          >
            {t('a11y.toolbar.statementLink')}
          </Link>
        </footer>
      </aside>

      {open && <div className="a11y-panel__scrim" onClick={() => setOpen(false)} aria-hidden />}
    </>
  );
}
