import { lazy } from 'react';
import RootLayout from '@layout/RootLayout.jsx';
import LangLayout from '@layout/LangLayout.jsx';
import Home from '@pages/Home.jsx';
import RootIndexRedirect from './RootIndexRedirect.jsx';
import LegacyRedirect from './LegacyRedirect.jsx';

/* Legal routes are cold; keep them code-split so they don't ship in the
   main home bundle. vite-react-ssg awaits the lazy import during prerender,
   so static HTML is still emitted for each. */
const PrivacyPolicy = lazy(() => import('@pages/PrivacyPolicy.jsx'));
const AccessibilityStatement = lazy(() => import('@pages/AccessibilityStatement.jsx'));

export const SUPPORTED_LANGS = ['he', 'en'];
export const DEFAULT_LANG = 'he';

/* Single source of truth for the route tree. Consumed by vite-react-ssg
   on the server (to prerender) and react-router on the client (to nav). */
export const routes = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <RootIndexRedirect /> },

      /* Legacy bare paths landing without a /:lang prefix — redirect once
         to the default-language equivalent. Vercel does the same as a 301
         at the edge in production; this is the SPA fallback. */
      { path: 'page/:slug', element: <LegacyRedirect prefix="page" /> },

      {
        path: ':lang',
        element: <LangLayout />,
        children: [
          { index: true, element: <Home />, entry: 'src/pages/Home.jsx' },
          { path: 'page/privacy',       element: <PrivacyPolicy /> },
          { path: 'page/accessibility', element: <AccessibilityStatement /> },
          /* Future surfaces — slot in under :lang as they're authored:
             { path: 'services/:slug',   element: <ServicePage /> },
             { path: 'industries/:slug', element: <IndustryPage /> },
             { path: 'insights/:slug',   element: <InsightPage /> },
          */
        ],
      },

      /* Catch-all: any non-prefixed, non-legacy path falls back to home. */
      { path: '*', element: <RootIndexRedirect /> },
    ],
  },
];

/* The full set of paths that vite-react-ssg should emit at build time.
   Returned as a function so future content-driven slugs can be discovered
   from data files without changing the routes config. */
export async function includedRoutes() {
  const staticPages = ['', '/page/privacy', '/page/accessibility'];
  return SUPPORTED_LANGS.flatMap(lang =>
    staticPages.map(p => `/${lang}${p}`)
  );
}
