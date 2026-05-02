import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { LANG_STORAGE_KEY } from '@theme/tokens.js';
import { DEFAULT_LOCALE, getLocale, locales, localeOrder, translate } from './index.js';

export const LanguageContext = createContext(null);

function readInitialLocale() {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;
  try {
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (stored && locales[stored]) return stored;
  } catch (_) {
    /* ignore */
  }
  return DEFAULT_LOCALE; // brand-mandated Hebrew default
}

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState(readInitialLocale);

  const dict = useMemo(() => getLocale(locale), [locale]);
  const dir = dict.meta.dir;

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('lang', locale);
    root.setAttribute('dir', dir);
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, locale);
    } catch (_) {
      /* ignore */
    }
  }, [locale, dir]);

  const t = useCallback((path) => translate(dict, path), [dict]);

  const switchLocale = useCallback((next) => {
    if (locales[next]) setLocale(next);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(prev => (prev === 'he' ? 'en' : 'he'));
  }, []);

  const value = useMemo(
    () => ({
      locale,
      dir,
      isRtl: dir === 'rtl',
      dict,
      t,
      setLocale: switchLocale,
      toggleLocale,
      available: localeOrder
    }),
    [locale, dir, dict, t, switchLocale, toggleLocale]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
