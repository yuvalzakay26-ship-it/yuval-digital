import { lazy } from 'react';
import RootLayout from '@layout/RootLayout.jsx';
import LangLayout from '@layout/LangLayout.jsx';
import Home from '@pages/Home.jsx';
import RootIndexRedirect from './RootIndexRedirect.jsx';
import LegacyRedirect from './LegacyRedirect.jsx';
import { PUBLISHED_SERVICES } from '@data/serviceCatalog.js';
import { PUBLISHED_ARTICLES, BLOG_HAS_PUBLISHED } from '@data/articleCatalog.js';

/* Legal routes are cold; keep them code-split so they don't ship in the
   main home bundle. vite-react-ssg awaits the lazy import during prerender,
   so static HTML is still emitted for each. */
const PrivacyPolicy = lazy(() => import('@pages/PrivacyPolicy.jsx'));
const AccessibilityStatement = lazy(() => import('@pages/AccessibilityStatement.jsx'));

/* About is a hot entity-building page (founder ↔ brand schema link),
   but visited infrequently relative to home — lazy is the right
   trade-off, and SSG awaits the import during prerender. */
const About = lazy(() => import('@pages/About.jsx'));

/* Service detail pages. Hot path for SEO — keep them in the main bundle
   so the JS is ready the moment a user navigates between siblings. */
const Service = lazy(() => import('@pages/Service.jsx'));

/* Blog index + per-article pages. Editorial surface — entity-building,
   topical breadth. Lazy so the home bundle stays lean; SSG awaits during
   prerender, so emitted HTML is still complete for crawlers. */
const Blog = lazy(() => import('@pages/Blog.jsx'));
const Article = lazy(() => import('@pages/Article.jsx'));

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
          { path: 'about',              element: <About /> },
          { path: 'page/privacy',       element: <PrivacyPolicy /> },
          { path: 'page/accessibility', element: <AccessibilityStatement /> },
          { path: 'services/:slug',     element: <Service /> },
          { path: 'blog',               element: <Blog /> },
          { path: 'blog/:slug',         element: <Article /> },
          /* Future surfaces — slot in under :lang as they're authored:
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
   from data files without changing the routes config. Service pages are
   enumerated from SERVICE_CATALOG; blog index + per-article pages from
   ARTICLE_CATALOG. Only `published: true` entries get an HTML file so
   unfinished pages stay out of Google. The blog index itself is gated on
   BLOG_HAS_PUBLISHED so we don't ship an empty editorial section. */
export async function includedRoutes() {
  const staticPages = ['', '/about', '/page/privacy', '/page/accessibility'];
  const servicePaths = PUBLISHED_SERVICES.map(s => `/services/${s.slug}`);
  const blogPaths = BLOG_HAS_PUBLISHED
    ? ['/blog', ...PUBLISHED_ARTICLES.map(a => `/blog/${a.slug}`)]
    : [];
  return SUPPORTED_LANGS.flatMap(lang =>
    [...staticPages, ...servicePaths, ...blogPaths].map(p => `/${lang}${p}`)
  );
}
