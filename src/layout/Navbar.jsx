import { useEffect, useState } from 'react';
import Container from '@components/Container.jsx';
import Logo from '@components/Logo.jsx';
import LanguageSwitcher from '@components/LanguageSwitcher.jsx';
import ThemeToggle from '@components/ThemeToggle.jsx';
import Button from '@components/Button.jsx';
import { useLanguage } from '@hooks/useLanguage.js';
import { useScrollProgress } from '@hooks/useScrollProgress.js';
import { navLinks } from '@data/nav.js';
import { cn } from '@utils/cn.js';
import './Navbar.css';

export default function Navbar() {
  const { t } = useLanguage();
  const { scrolled } = useScrollProgress(8);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', open);
    document.body.classList.toggle('drawer-open', open);
    return () => {
      document.body.classList.remove('no-scroll');
      document.body.classList.remove('drawer-open');
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className={cn('nav', { 'nav--scrolled': scrolled, 'nav--open': open })} aria-label={t('nav.home')}>
        <Container className="nav__inner">
          <div className="nav__brand">
            <Logo />
          </div>

          <nav className="nav__links" aria-label="Primary">
            <ul>
              {navLinks.map(link => (
                <li key={link.key}>
                  <a href={link.href} className="nav__link">
                    {t(`nav.${link.key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop actions — hidden on mobile, where these move into the drawer */}
          <div className="nav__actions nav__actions--desktop">
            <LanguageSwitcher />
            <ThemeToggle />
            <Button as="a" href="#contact" variant="gradient" size="sm" className="nav__cta">
              {t('nav.cta')}
            </Button>
          </div>

          {/* Mobile-only burger — kept in its own slot so it never gets crowded */}
          <button
            type="button"
            className={cn('nav__burger', { 'nav__burger--open': open })}
            aria-label={open ? t('a11y.toolbar.close') : t('nav.cta')}
            aria-expanded={open}
            aria-controls="primary-drawer"
            onClick={() => setOpen(o => !o)}
          >
            <span aria-hidden /><span aria-hidden /><span aria-hidden />
          </button>
        </Container>
      </header>

      {/* Scrim + drawer MUST live outside <header>: .nav has backdrop-filter,
          which establishes a containing block for fixed descendants. Inside
          the header they would be sized to the 72px bar instead of the
          viewport, leaving the drawer invisible and the scrim covering only
          the navbar. */}
      <div
        className={cn('nav__scrim', { 'nav__scrim--open': open })}
        onClick={close}
        aria-hidden
      />

      <aside
        id="primary-drawer"
        className={cn('nav__drawer', { 'nav__drawer--open': open })}
        aria-hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label={t('nav.home')}
      >
        <div className="nav__drawer-head">
          <Logo variant="drawer" onClick={close} />
          <p className="nav__drawer-subtitle">{t('brand.shortTagline')}</p>
        </div>

        <nav className="nav__drawer-nav" aria-label="Mobile primary">
          <ul className="nav__drawer-list">
            {navLinks.map((link, i) => (
              <li key={link.key} className="nav__drawer-item" style={{ '--i': i }}>
                <a href={link.href} className="nav__drawer-link" onClick={close}>
                  <span className="nav__drawer-link-text">{t(`nav.${link.key}`)}</span>
                  <span className="nav__drawer-link-chev" aria-hidden>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__drawer-utils" aria-label="Preferences">
          <div className="nav__drawer-util">
            <span className="nav__drawer-util-label">{t('language.switch')}</span>
            <LanguageSwitcher />
          </div>
          <div className="nav__drawer-util">
            <span className="nav__drawer-util-label">{t('theme.toggle')}</span>
            <ThemeToggle />
          </div>
        </div>

        <div className="nav__drawer-foot">
          <Button as="a" href="#contact" variant="gradient" onClick={close} className="nav__drawer-cta">
            {t('nav.cta')}
          </Button>
        </div>
      </aside>
    </>
  );
}
