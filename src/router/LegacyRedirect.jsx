import { Navigate, useParams } from 'react-router-dom';
import { LANG_STORAGE_KEY } from '@theme/tokens.js';
import { DEFAULT_LANG, SUPPORTED_LANGS } from './routes.jsx';

/* Catches unprefixed legacy paths like `/page/privacy` and forwards them
   to `/he/page/privacy` (or the visitor's last-known locale). Vercel
   handles this as a 301 at the edge in production for direct hits;
   this component covers the SPA-internal fallback. */
export default function LegacyRedirect({ prefix }) {
  const params = useParams();

  let target = DEFAULT_LANG;
  if (typeof window !== 'undefined') {
    try {
      const hint = window.localStorage.getItem(LANG_STORAGE_KEY);
      if (SUPPORTED_LANGS.includes(hint)) target = hint;
    } catch (_) {
      /* ignore */
    }
  }

  let to = `/${target}`;
  if (prefix === 'page' && params.slug) {
    to = `/${target}/page/${params.slug}`;
  }

  return <Navigate to={to} replace />;
}
