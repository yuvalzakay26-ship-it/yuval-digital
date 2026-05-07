import { Suspense } from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import AppShell from './AppShell.jsx';
import { LanguageProvider } from '@i18n/LanguageProvider.jsx';
import { SUPPORTED_LANGS, DEFAULT_LANG } from '@router/routes.jsx';

/* Locale-scoped layout. Reads the :lang URL segment, validates it,
   and provides the language context to everything below. Mounts the
   AppShell (Navbar, Footer, fixed UI) so chrome state is shared
   across all in-locale pages — language toggle preserves position
   and chrome doesn't re-mount on internal navigation. */
export default function LangLayout() {
  const { lang } = useParams();

  if (!SUPPORTED_LANGS.includes(lang)) {
    return <Navigate to={`/${DEFAULT_LANG}`} replace />;
  }

  return (
    <LanguageProvider locale={lang}>
      <AppShell>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </AppShell>
    </LanguageProvider>
  );
}
