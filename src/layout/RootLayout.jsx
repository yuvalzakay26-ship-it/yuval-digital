import { useEffect } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@theme/ThemeProvider.jsx';
import { A11yProvider } from '@a11y/A11yProvider.jsx';
import { initAnalytics, pageview } from '@utils/analytics.js';

/* Top-level shell that lives ABOVE the :lang segment. Holds the
   cross-cutting providers (Theme, A11y) that don't depend on the URL
   locale. HelmetProvider is NOT mounted here — vite-react-ssg supplies
   its own at the framework root and uses the captured context to
   extract helmet output during prerender. Adding a second provider
   would intercept the helmet calls and break SSR head injection.

   React Router keeps RootLayout mounted across child route changes,
   so providers don't re-init on navigation. */

function AnalyticsListener() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    pageview(pathname + search);
  }, [pathname, search]);

  return null;
}

function HashAnchorScroller() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined' || !hash) return;
    const id = hash.slice(1);
    if (!id) return;
    const raf = window.requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return () => window.cancelAnimationFrame(raf);
  }, [pathname, hash]);

  return null;
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <A11yProvider>
        <Outlet />
        <ScrollRestoration getKey={(location) => location.pathname} />
        <AnalyticsListener />
        <HashAnchorScroller />
      </A11yProvider>
    </ThemeProvider>
  );
}
