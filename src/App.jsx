import { lazy, Suspense } from 'react';
import AppShell from '@layout/AppShell.jsx';
import Home from '@pages/Home.jsx';
import { useHashRoute } from '@hooks/useHashRoute.js';

/* Cold legal routes — code-split out of the main bundle. */
const AccessibilityStatement = lazy(() => import('@pages/AccessibilityStatement.jsx'));
const PrivacyPolicy = lazy(() => import('@pages/PrivacyPolicy.jsx'));

const ROUTES = {
  '/page/accessibility': AccessibilityStatement,
  '/page/privacy': PrivacyPolicy,
};

export default function App() {
  const route = useHashRoute();
  const PageComponent = ROUTES[route] ?? Home;
  const isLazyRoute = PageComponent !== Home;

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
