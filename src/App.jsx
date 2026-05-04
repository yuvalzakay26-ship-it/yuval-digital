import { lazy, Suspense, useEffect } from 'react';
import AppShell from '@layout/AppShell.jsx';
import Home from '@pages/Home.jsx';
import { useHashRoute } from '@hooks/useHashRoute.js';
import { useLanguage } from '@hooks/useLanguage.js';

/* Cold legal routes — code-split out of the main bundle. */
const AccessibilityStatement = lazy(() => import('@pages/AccessibilityStatement.jsx'));
const PrivacyPolicy = lazy(() => import('@pages/PrivacyPolicy.jsx'));

const ROUTES = {
  '/page/accessibility': AccessibilityStatement,
  '/page/privacy': PrivacyPolicy,
};

const HOME_TITLE = {
  he: 'יובל דיגיטל — אתרים, אוטומציות ופתרונות דיגיטליים לעסקים',
  en: 'Yuval Digital — Websites, Automation & Smart Digital Solutions',
};

export default function App() {
  const route = useHashRoute();
  const { locale, dict } = useLanguage();
  const PageComponent = ROUTES[route] ?? Home;
  const isLazyRoute = PageComponent !== Home;

  /* Keep <title> in sync with route + locale. SPA hash navigation doesn't
     trigger a document refresh, so without this the browser tab and screen
     readers stay on the index.html title even on the legal pages. */
  useEffect(() => {
    const home = HOME_TITLE[locale] || HOME_TITLE.he;
    let title = home;
    if (route === '/page/privacy') title = `${dict.legal.privacy} — ${home}`;
    else if (route === '/page/accessibility') title = `${dict.legal.accessibility} — ${home}`;
    if (document.title !== title) document.title = title;
  }, [route, locale, dict]);

  return (
    <AppShell>
      {isLazyRoute ? (
        <Suspense fallback={null}>
          <PageComponent />
        </Suspense>
      ) : (
        <PageComponent />
      )}
    </AppShell>
  );
}
