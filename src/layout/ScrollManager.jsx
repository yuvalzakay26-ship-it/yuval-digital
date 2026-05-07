import { useEffect, useLayoutEffect } from 'react';
import { useLocation, useNavigate, useNavigationType } from 'react-router-dom';
import { scrollToHash } from '@utils/scrollToHash.js';

/* useLayoutEffect would warn during the SSG prerender pass. The hook
   has no work to do on the server anyway — render output for
   ScrollManager is null — so swap to useEffect there. */
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const SCROLL_KEY_PREFIX = 'yd:scroll:';

/**
 * Single source of truth for scroll behavior across the app. Replaces
 * react-router's <ScrollRestoration> plus the previous HashAnchorScroller —
 * those two ran independently and raced against each other on every
 * route change, which manifested as the "first click does nothing" bug
 * for in-page anchors.
 *
 * Responsibilities:
 *   1. After every Router navigation, scroll to the right place:
 *        • POP (back/forward) — restore the saved Y for that history
 *          entry's key, falling through to the hash/top logic if we
 *          don't have one (private mode, fresh tab, etc.).
 *        • PUSH/REPLACE with hash — call scrollToHash, which handles
 *          content-visibility:auto sections correctly.
 *        • PUSH/REPLACE without hash — top of the page.
 *
 *   2. Persist the current scroll position into sessionStorage keyed by
 *      location.key so step (1) can restore it on POP.
 *
 *   3. Click delegation for in-page hash links (`<a href="#x">`). The
 *      browser's native anchor handling races against content-visibility
 *      activation and frequently lands at a wrong Y on the first click;
 *      routing every same-page hash through React Router's navigate()
 *      forces all hash scrolls through the effect in (1), which is
 *      reliable. <Link to="/he#x"> is unaffected — its href doesn't
 *      start with '#'.
 */
export default function ScrollManager() {
  const location = useLocation();
  const navigate = useNavigate();
  const navType = useNavigationType();
  const { pathname, hash, search, key } = location;

  /* --- (1) Apply scroll on every navigation ---------------------- */
  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined') return undefined;

    if (navType === 'POP') {
      try {
        const saved = sessionStorage.getItem(SCROLL_KEY_PREFIX + key);
        if (saved !== null) {
          const y = Number(saved);
          if (Number.isFinite(y)) {
            window.scrollTo(0, y);
            return undefined;
          }
        }
      } catch {
        /* sessionStorage may be blocked (private mode, third-party iframes).
           Fall through to hash / top-of-page handling. */
      }
    }

    if (hash) {
      return scrollToHash(hash);
    }

    window.scrollTo(0, 0);
    return undefined;
  }, [pathname, hash, key, navType]);

  /* --- (2) Persist scroll position for back/forward restoration --- */
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    let frame = 0;
    const save = () => {
      try {
        sessionStorage.setItem(SCROLL_KEY_PREFIX + key, String(window.scrollY));
      } catch {
        /* ignore — see note above */
      }
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        save();
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
      save();
    };
  }, [key]);

  /* --- (3) Click delegation for same-page hash anchors ------------ */
  useEffect(() => {
    if (typeof document === 'undefined') return undefined;

    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const link = e.target?.closest?.('a[href]');
      if (!link) return;

      const target = link.getAttribute('target');
      if (target && target !== '_self') return;

      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      e.preventDefault();

      /* If we're already at this hash, navigate() would no-op and the
         effect above would not re-run. Scroll directly so the user
         still gets feedback (and the URL stays unchanged). */
      if (hash === href) {
        scrollToHash(href);
        return;
      }

      navigate({ pathname, search, hash: href });
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [pathname, hash, search, navigate]);

  return null;
}
