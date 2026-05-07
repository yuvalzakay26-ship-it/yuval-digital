import { Navigate } from 'react-router-dom';
import { LANG_STORAGE_KEY } from '@theme/tokens.js';
import { DEFAULT_LANG, SUPPORTED_LANGS } from './routes.jsx';

/* Resolves the bare `/` (and any unknown top-level path) to a real
   `/:lang` URL. Brand mandates Hebrew as the default; localStorage is
   only consulted as a last-visited hint so returning visitors land
   on the language they previously used.

   During prerender there is no `window`, so this always emits the
   default-locale redirect — which is what we want for crawlers. */
export default function RootIndexRedirect() {
  let target = DEFAULT_LANG;
  if (typeof window !== 'undefined') {
    try {
      const hint = window.localStorage.getItem(LANG_STORAGE_KEY);
      if (SUPPORTED_LANGS.includes(hint)) target = hint;
    } catch (_) {
      /* localStorage unavailable — fall through to default */
    }
  }
  return <Navigate to={`/${target}`} replace />;
}
