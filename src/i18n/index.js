import he from './he.js';
import en from './en.js';

export const locales = { he, en };

export const localeOrder = ['he', 'en'];

export const DEFAULT_LOCALE = 'he';

export function getLocale(code) {
  return locales[code] || locales[DEFAULT_LOCALE];
}

/**
 * Resolves a dotted path against the active dictionary.
 * Falls back to the default locale, then to the path itself.
 */
export function translate(dict, path) {
  if (!path) return '';
  const segments = path.split('.');
  let cur = dict;
  for (const seg of segments) {
    if (cur == null) return path;
    cur = cur[seg];
  }
  return cur ?? path;
}
