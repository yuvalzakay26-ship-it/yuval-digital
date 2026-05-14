import { lazy, Suspense } from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import { useLanguage } from '@hooks/useLanguage.js';
import './AppShell.css';

/* Floating UI is non-critical to the LCP frame. Splitting it out keeps
   ~12 KiB of widget JS + ~700 lines of widget CSS off the home bundle
   and parses after first paint. Each widget self-mounts via portal /
   fixed positioning, so deferring hydration here has no visual cost on
   mobile — the buttons appear ~1 frame later on first load. The SSG
   prerender awaits these imports, so the markup is still in the static
   HTML for crawlers and motion-reduced users. */
const WhatsAppFab          = lazy(() => import('@components/WhatsAppFab.jsx'));
const ScrollToTopFab       = lazy(() => import('@components/ScrollToTopFab.jsx'));
const MobileActionBar      = lazy(() => import('@components/MobileActionBar.jsx'));
const AccessibilityToolbar = lazy(() => import('@components/AccessibilityToolbar.jsx'));

export default function AppShell({ children }) {
  const { t } = useLanguage();
  return (
    <div className="app-shell">
      <a href="#main" className="skip-link">{t('a11y.skipLink')}</a>
      {/* Fixed-position UI lives OUTSIDE .app-shell__content. When the
          grayscale a11y filter is active on the wrapper, anything inside
          becomes a positioned descendant of that wrapper (filter creates a
          containing block), which would break viewport-fixed elements. */}
      <Navbar />
      <div className="app-shell__content">
        <main id="main" className="app-shell__main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </div>
      <Suspense fallback={null}>
        <WhatsAppFab />
        <ScrollToTopFab />
        <MobileActionBar />
        <AccessibilityToolbar />
      </Suspense>
    </div>
  );
}
