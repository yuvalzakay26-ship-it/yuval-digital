import { useEffect, useState } from 'react';

/**
 * Tracks vertical scroll progress (0..1) and exposes a "scrolled" boolean
 * for components that want to react past a threshold (e.g. navbar).
 */
export function useScrollProgress(threshold = 8) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > threshold);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return { scrolled };
}
