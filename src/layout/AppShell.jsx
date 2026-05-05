import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import WhatsAppFab from '@components/WhatsAppFab.jsx';
import ScrollToTopFab from '@components/ScrollToTopFab.jsx';
import MobileActionBar from '@components/MobileActionBar.jsx';
import AccessibilityToolbar from '@components/AccessibilityToolbar.jsx';
import { useLanguage } from '@hooks/useLanguage.js';
import './AppShell.css';

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
      <WhatsAppFab />
      <ScrollToTopFab />
      <MobileActionBar />
      <AccessibilityToolbar />
    </div>
  );
}
