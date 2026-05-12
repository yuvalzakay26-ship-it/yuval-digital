import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Container from '@components/Container.jsx';
import Logo from '@components/Logo.jsx';
import LanguageSwitcher from '@components/LanguageSwitcher.jsx';
import ThemeToggle from '@components/ThemeToggle.jsx';
import Button from '@components/Button.jsx';
import { useLanguage } from '@hooks/useLanguage.js';
import { useScrollProgress } from '@hooks/useScrollProgress.js';
import { navLinks } from '@data/nav.js';
import { track } from '@utils/analytics.js';
import { cn } from '@utils/cn.js';
import './Navbar.css';

export default function Navbar() {
  const { t } = useLanguage();
  const { scrolled } = useScrollProgress(8);
  const [open, setOpen] = useState(false);

  const { lang = 'he' } = useParams();
  const { pathname } = useLocation();
  const homePath = `/${lang}`;
  const onHome = pathname === homePath || pathname === `${homePath}/`;

  /* On the home route, anchors stay as plain `#section` — ScrollManager's
     click delegation routes them through React Router so the scroll fires
     reliably. From another route, the anchor is a full path to /:lang and
     ScrollManager handles the scroll once Home mounts. */
  const linkFor = (anchor) => (onHome ? `#${anchor}` : `${homePath}#${anchor}`);
  const ctaHref = linkFor('contact');

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

  /* Close the drawer whenever the user navigates. */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const close = () => setOpen(false);

  /* Renders either an anchor link (#section, with same-page-vs-route
     handling) or a hard sibling route link, based on the nav entry's
     shape. Anchor links use a plain <a> on home so ScrollManager's
     click delegation can fire the scroll; off home they become Link
     navigations to `/:lang#anchor`. Route entries (e.g. About) are
     always Link to `/:lang/<route>`. */
  const NavEntry = ({ link, className, onClick, children }) => {
    if (link.route) {
      return (
        <Link to={`${homePath}/${link.route}`} className={className} onClick={onClick}>
          {children}
        </Link>
      );
    }
    const to = linkFor(link.anchor);
    return onHome ? (
      <a href={to} className={className} onClick={onClick}>{children}</a>
    ) : (
      <Link to={to} className={className} onClick={onClick}>{children}</Link>
    );
  };

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
                  <NavEntry link={link} className="nav__link">
                    {t(`nav.${link.key}`)}
                  </NavEntry>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop actions — hidden on mobile, where these move into the drawer */}
          <div className="nav__actions nav__actions--desktop">
            <LanguageSwitcher />
            <ThemeToggle />
            <Button
              as={onHome ? 'a' : Link}
              {...(onHome ? { href: ctaHref } : { to: ctaHref })}
              variant="gradient"
              size="sm"
              className="nav__cta"
              onClick={() => track('cta_nav_click', { source: 'navbar_desktop', destination: 'contact' })}
            >
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
          <div className="nav__drawer-head-brand">
            <Logo variant="drawer" onClick={close} />
            <p className="nav__drawer-subtitle">{t('brand.shortTagline')}</p>
          </div>
          <button
            type="button"
            className="nav__drawer-close"
            onClick={close}
            aria-label={t('a11y.toolbar.close')}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <nav className="nav__drawer-nav" aria-label="Mobile primary">
          <ul className="nav__drawer-list">
            {navLinks.map((link, i) => (
              <li key={link.key} className="nav__drawer-item" style={{ '--i': i }}>
                <NavEntry link={link} className="nav__drawer-link" onClick={close}>
                  <span className="nav__drawer-link-text">{t(`nav.${link.key}`)}</span>
                  <span className="nav__drawer-link-chev" aria-hidden>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </span>
                </NavEntry>
              </li>
            ))}
          </ul>
        </nav>

        <section className="nav__drawer-prefs" aria-label={t('preferences.title')}>
          <h3 className="nav__drawer-prefs-title">{t('preferences.title')}</h3>

          <div className="nav__drawer-prefs-row">
            <span className="nav__drawer-prefs-label">{t('preferences.language')}</span>
            <LanguageSwitcher />
          </div>

          <div className="nav__drawer-prefs-row">
            <span className="nav__drawer-prefs-label">{t('preferences.theme')}</span>
            <ThemeToggle />
          </div>
        </section>

        <div className="nav__drawer-foot">
          <Button
            as={onHome ? 'a' : Link}
            {...(onHome ? { href: ctaHref } : { to: ctaHref })}
            variant="gradient"
            onClick={() => {
              track('cta_nav_click', { source: 'navbar_drawer', destination: 'contact' });
              close();
            }}
            className="nav__drawer-cta"
          >
            {t('nav.cta')}
          </Button>
        </div>
      </aside>
    </>
  );
}
