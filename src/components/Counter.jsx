import { useEffect, useRef, useState } from 'react';
import { useReveal } from '@hooks/useReveal.js';

/**
 * Animated number counter. Triggers when the element scrolls into view.
 * Pass `value` as the final integer; `suffix` for things like "+", "%".
 */
export default function Counter({
  value,
  suffix = '',
  prefix = '',
  duration = 1400,
  className
}) {
  const { ref, revealed } = useReveal({ threshold: 0.3 });
  const [display, setDisplay] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!revealed || startedRef.current) return undefined;
    startedRef.current = true;

    if (typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value);
      return undefined;
    }

    const start = performance.now();
    let raf = 0;

    function tick(now) {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [revealed, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}
