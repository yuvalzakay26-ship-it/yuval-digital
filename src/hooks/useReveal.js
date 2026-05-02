import { useEffect, useRef, useState } from 'react';

/**
 * IntersectionObserver-based reveal hook. Returns a ref + boolean.
 * The element becomes "revealed" the first time it enters the viewport.
 *
 *   const { ref, revealed } = useReveal();
 *   <div ref={ref} className={revealed ? 'is-in' : 'is-out'} />
 */
export function useReveal({
  threshold = 0.18,
  rootMargin = '0px 0px -40px 0px',
  once = true
} = {}) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setRevealed(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setRevealed(false);
          }
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, revealed };
}
