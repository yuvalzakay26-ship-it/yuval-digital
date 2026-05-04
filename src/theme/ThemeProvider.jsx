import { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { THEME_STORAGE_KEY } from './tokens.js';

export const ThemeContext = createContext(null);

const VALID = new Set(['light', 'dark']);

/* Cinematic content reveal.
   Instead of dropping a black overlay over the page, we briefly soften
   the visible content with a blur + dim, swap the theme behind that veil,
   then sharpen back into the new palette. The new theme materialises
   *through* the same elements, so there is no flash and no occluded UI.

   Phase timeline:
     0      — add `.theme-transitioning` to <html>; .app-shell__content
              eases into blur(5px) + opacity(0.85) + scale(0.98) over
              BLUR_IN_MS. The slight inward scale gives the reveal a
              breath-in / breath-out arc you feel more than see.
     ~190   — swap theme tokens AND remove the class. The new colours
              cross-fade in beneath the blur as it eases back to crisp
              over BLUR_OUT_MS, and the content settles back to scale(1).
     ~430   — release the lock.

   prefers-reduced-motion short-circuits to an instant token swap. */
const BLUR_IN_MS = 190;
const BLUR_OUT_MS = 240;

function readInitialTheme() {
  if (typeof window === 'undefined') return 'light';
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored && VALID.has(stored)) return stored;
  } catch (_) {
    /* localStorage unavailable — fall through to default */
  }
  return 'light'; // brand-mandated default
}

function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readInitialTheme);
  const transitionLock = useRef(false);
  const timersRef = useRef([]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#07090f' : '#ffffff');

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (_) {
      /* ignore */
    }
  }, [theme]);

  // Cleanup any pending timers on unmount so we don't update state on a dead tree.
  useEffect(() => () => timersRef.current.forEach(clearTimeout), []);

  const toggleTheme = useCallback(() => {
    if (transitionLock.current) return;

    if (prefersReducedMotion()) {
      setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
      return;
    }

    const root = document.documentElement;
    transitionLock.current = true;
    root.classList.add('theme-transitioning');

    const swap = window.setTimeout(() => {
      setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
      // Drop the class at the same tick as the swap: the new palette and
      // the blur-out transition start together, so the page sharpens
      // directly into the new theme.
      root.classList.remove('theme-transitioning');
    }, BLUR_IN_MS);

    const release = window.setTimeout(() => {
      transitionLock.current = false;
    }, BLUR_IN_MS + BLUR_OUT_MS);

    timersRef.current.push(swap, release);
  }, []);

  const value = useMemo(
    () => ({ theme, isDark: theme === 'dark', setTheme, toggleTheme }),
    [theme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
