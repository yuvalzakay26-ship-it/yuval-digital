import { createContext, useCallback, useEffect, useMemo, useState } from 'react';

export const A11yContext = createContext(null);

const STORAGE_KEY = 'yuvaldigital:a11y:v1';

const TEXT_SIZES = ['sm', 'md', 'lg', 'xl', 'xxl'];

export const DEFAULT_A11Y = Object.freeze({
  textSize: 'md',
  contrast: false,
  grayscale: false,
  underlineLinks: false,
  readableFont: false,
  pauseAnimations: false,
});

function readInitial() {
  if (typeof window === 'undefined') return { ...DEFAULT_A11Y };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_A11Y };
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_A11Y, ...parsed };
  } catch (_) {
    return { ...DEFAULT_A11Y };
  }
}

function applyToDom(settings) {
  const root = document.documentElement;
  if (TEXT_SIZES.includes(settings.textSize)) {
    root.setAttribute('data-a11y-text', settings.textSize);
  } else {
    root.removeAttribute('data-a11y-text');
  }

  const flags = ['contrast', 'grayscale', 'underlineLinks', 'readableFont', 'pauseAnimations'];
  flags.forEach(flag => {
    const attr = `data-a11y-${flag.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)}`;
    if (settings[flag]) root.setAttribute(attr, 'on');
    else root.removeAttribute(attr);
  });
}

export function A11yProvider({ children }) {
  const [settings, setSettings] = useState(readInitial);

  useEffect(() => {
    applyToDom(settings);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (_) {
      /* ignore */
    }
  }, [settings]);

  const setTextSize = useCallback((next) => {
    if (TEXT_SIZES.includes(next)) setSettings(s => ({ ...s, textSize: next }));
  }, []);

  const adjustTextSize = useCallback((delta) => {
    setSettings(s => {
      const idx = TEXT_SIZES.indexOf(s.textSize);
      const next = TEXT_SIZES[Math.min(TEXT_SIZES.length - 1, Math.max(0, idx + delta))];
      return { ...s, textSize: next };
    });
  }, []);

  const toggle = useCallback((key) => {
    setSettings(s => ({ ...s, [key]: !s[key] }));
  }, []);

  const reset = useCallback(() => {
    setSettings({ ...DEFAULT_A11Y });
  }, []);

  const value = useMemo(
    () => ({
      settings,
      textSizes: TEXT_SIZES,
      setTextSize,
      adjustTextSize,
      toggle,
      reset,
      isDefault:
        settings.textSize === DEFAULT_A11Y.textSize &&
        !settings.contrast &&
        !settings.grayscale &&
        !settings.underlineLinks &&
        !settings.readableFont &&
        !settings.pauseAnimations,
    }),
    [settings, setTextSize, adjustTextSize, toggle, reset]
  );

  return <A11yContext.Provider value={value}>{children}</A11yContext.Provider>;
}
