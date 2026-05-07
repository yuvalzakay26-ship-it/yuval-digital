import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from '@router/routes.jsx';

import '@styles/reset.css';
import '@styles/variables.css';
import '@styles/globals.css';
import '@styles/animations.css';
import '@styles/a11y.css';

/* Single entry consumed by both the dev server and vite-react-ssg's
   prerender pass. Providers (Helmet, Theme, A11y, Language) live inside
   the route tree — see RootLayout / LangLayout — so vite-react-ssg's
   internal RouterProvider mount wraps them naturally on every route. */
export const createRoot = ViteReactSSG({ routes });
