import { useEffect, useState } from 'react';

/**
 * Lightweight hash router.
 * Section anchors keep working — we only react to hashes that begin with `#/`.
 * Returns the route slug, e.g. `/page/accessibility` for `#/page/accessibility`.
 */
function read() {
  if (typeof window === 'undefined') return '/';
  const h = window.location.hash || '';
  if (!h.startsWith('#/')) return '/';
  return h.slice(1) || '/';
}

export function useHashRoute() {
  const [route, setRoute] = useState(read);

  useEffect(() => {
    function onHash() {
      setRoute(read());
    }
    window.addEventListener('hashchange', onHash);
    window.addEventListener('popstate', onHash);
    return () => {
      window.removeEventListener('hashchange', onHash);
      window.removeEventListener('popstate', onHash);
    };
  }, []);

  return route;
}
