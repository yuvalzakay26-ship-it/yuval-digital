import AppShell from '@layout/AppShell.jsx';
import Home from '@pages/Home.jsx';
import AccessibilityStatement from '@pages/AccessibilityStatement.jsx';
import PrivacyPolicy from '@pages/PrivacyPolicy.jsx';
import { useHashRoute } from '@hooks/useHashRoute.js';

const ROUTES = {
  '/page/accessibility': AccessibilityStatement,
  '/page/privacy': PrivacyPolicy,
};

export default function App() {
  const route = useHashRoute();
  const PageComponent = ROUTES[route] ?? Home;

  return (
    <AppShell>
      <PageComponent />
    </AppShell>
  );
}
