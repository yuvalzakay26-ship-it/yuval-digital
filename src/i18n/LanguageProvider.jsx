import { createContext, useCallback, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LANG_STORAGE_KEY } from '@theme/tokens.js';
import { DEFAULT_LOCALE, getLocale, locales, localeOrder, translate } from './index.js';

export const LanguageContext = createContext(null);

/**
 * Locale provider driven by the `:lang` URL segment.
 *
 * The previous implementation used localStorage as the source of truth.
 * That fought the URL: a deep-link to /en/... would render in Hebrew if
 * the user had previously toggled, and crawlers couldn't tell the locales
 * apart. URL-driven locale fixes both: each route renders deterministically
 * for its own language and the prerendered HTML matches.
 *
 * localStorage is now a one-way write — a "last-visited" hint consumed
 * only by the bare `/` redirect (RootIndexRedirect).
 */
export function LanguageProvider({ locale: localeProp, children }) {
  const locale = locales[localeProp] ? localeProp : DEFAULT_LOCALE;

  const dict = useMemo(() => getLocale(locale), [locale]);
  const dir = dict.meta.dir;

  const navigate = useNavigate();
  const { pathname, search, hash } = useLocation();

  /* Sync <html lang> + <dir> on the client. During SSG the prerendered
     HTML already has these set via <Helmet> in <Seo>, so this is just a
     belt-and-braces guarantee for client-side language switches. Also
     persists the last-visited locale for the bare `/` redirect. */
  useEffect(() => {
    if (typeof document === 'undefined') return;
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

  const swapLocale = useCallback((next) => {
    if (!locales[next] || next === locale) return;
    const newPath = pathname.replace(/^\/(he|en)(?=\/|$)/, `/${next}`) || `/${next}`;
    navigate(newPath + search + hash);
  }, [locale, pathname, search, hash, navigate]);

  const toggleLocale = useCallback(() => {
    swapLocale(locale === 'he' ? 'en' : 'he');
  }, [locale, swapLocale]);

  const value = useMemo(
    () => ({
      locale,
      dir,
      isRtl: dir === 'rtl',
      dict,
      t,
      setLocale: swapLocale,
      toggleLocale,
      available: localeOrder
    }),
    [locale, dir, dict, t, swapLocale, toggleLocale]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
