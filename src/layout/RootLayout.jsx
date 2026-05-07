import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@theme/ThemeProvider.jsx';
import { A11yProvider } from '@a11y/A11yProvider.jsx';
import { initAnalytics, pageview } from '@utils/analytics.js';
import ScrollManager from './ScrollManager.jsx';

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

export default function RootLayout() {
  return (
    <ThemeProvider>
      <A11yProvider>
        <Outlet />
        {/* ScrollManager owns scroll-to-top, scroll restoration on
            back/forward, and reliable hash-anchor scrolling. It
            intentionally replaces react-router's <ScrollRestoration>:
            running both produced a race against the HashAnchorScroller
            that previously lived here, which manifested as the
            "first click does nothing" bug for in-page anchors. */}
        <ScrollManager />
        <AnalyticsListener />
      </A11yProvider>
    </ThemeProvider>
  );
}
