import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@sections': path.resolve(__dirname, './src/sections'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@layout': path.resolve(__dirname, './src/layout'),
      '@router': path.resolve(__dirname, './src/router'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@data': path.resolve(__dirname, './src/data'),
      '@i18n': path.resolve(__dirname, './src/i18n'),
      '@theme': path.resolve(__dirname, './src/theme'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@a11y': path.resolve(__dirname, './src/a11y')
    }
  },
  server: {
    port: 5173,
    open: true,
    strictPort: false
  },
  ssr: {
    /* Both our SSR bundle and vite-react-ssg's framework code import
       react-helmet-async. Letting Vite externalize it (the default)
       means both modules resolve through Node's loader to a single
       instance — Helmet's React context only matches when the
       provider and consumer share that instance. */
  },
  build: {
    target: 'es2020',
    sourcemap: false,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: isSsrBuild
        ? {}
        : {
            /* React is externalized during the SSR build, so this hint
               only applies on the client bundle where it actually
               isolates react/react-dom into a long-lived chunk. */
            manualChunks: {
              react: ['react', 'react-dom', 'react-dom/client']
            }
          }
    }
  },
  ssgOptions: {
    /* Per-route URL → its own folder + index.html. Keeps the prerendered
       output crawlable as plain paths (`/he/page/privacy/`) and lets
       Vercel's static handler serve them without any rewrite rule. */
    dirStyle: 'nested',
    /* Async script loading shaves render-blocking time on first paint. */
    script: 'async',
    /* `formatting: 'prettify'` causes hydration mismatches per docs. */
    formatting: 'none',
    /* The full set of paths to prerender at build time. Mirrors the
       route tree in `src/router/routes.jsx` but lives here as a flat
       list because vite.config runs in plain Node (it can't load JSX).
       Service slugs are read from src/data/serviceCatalog.js and article
       slugs from src/data/articleCatalog.js via dynamic import — both
       modules are JSX-free so they load cleanly here. Only `published:
       true` entries get prerendered; drafts stay out of both the build
       output and the sitemap. The blog index itself is gated on
       BLOG_HAS_PUBLISHED so we don't surface an empty editorial section. */
    includedRoutes: async () => {
      const { PUBLISHED_SERVICES } = await import('./src/data/serviceCatalog.js');
      const { PUBLISHED_ARTICLES, BLOG_HAS_PUBLISHED } = await import('./src/data/articleCatalog.js');
      const langs = ['he', 'en'];
      const staticPages = ['', '/about', '/page/privacy', '/page/accessibility'];
      const servicePaths = PUBLISHED_SERVICES.map(s => `/services/${s.slug}`);
      const blogPaths = BLOG_HAS_PUBLISHED
        ? ['/blog', ...PUBLISHED_ARTICLES.map(a => `/blog/${a.slug}`)]
        : [];
      return langs.flatMap(l =>
        [...staticPages, ...servicePaths, ...blogPaths].map(p => `/${l}${p}`)
      );
    },
    entry: 'src/main.jsx'
  }
}));
