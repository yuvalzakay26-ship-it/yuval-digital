import { Head } from 'vite-react-ssg';
import { useLanguage } from '@hooks/useLanguage.js';
import { SUPPORTED_LANGS, DEFAULT_LANG } from '@router/routes.jsx';

const ORIGIN = 'https://yuvaldigital.co.il';
const DEFAULT_IMAGE = `${ORIGIN}/favicon.svg`;

/* Search Console verification token. Set at build time via the hosting
   provider's env (Vercel/etc.) — never committed. Empty in dev/CI builds
   so the meta tag stays absent. */
const GSC_VERIFICATION = import.meta.env.VITE_GSC_VERIFICATION;

const OG_LOCALES = { he: 'he_IL', en: 'en_US' };

/**
 * Per-route head: title, description, canonical, hreflang alternates,
 * OG/Twitter tags, and any structured-data JSON-LD blocks.
 *
 * `path` is the locale-agnostic suffix after `/:lang` — e.g. `''` for
 * a locale's home page, `/page/privacy` for the privacy page. The
 * canonical and hreflang URLs are built from that.
 */
export default function Seo({
  title,
  description,
  path = '',
  image = DEFAULT_IMAGE,
  jsonLd = [],
  noindex = false
}) {
  const { locale, dir } = useLanguage();
  const canonical = `${ORIGIN}/${locale}${path}`;
  const xDefault = `${ORIGIN}/${DEFAULT_LANG}${path}`;

  return (
    <Head>
      <html lang={locale} dir={dir} />
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, follow" />}
      {GSC_VERIFICATION && (
        <meta name="google-site-verification" content={GSC_VERIFICATION} />
      )}

      <link rel="canonical" href={canonical} />
      {SUPPORTED_LANGS.map(l => (
        <link
          key={l}
          rel="alternate"
          hrefLang={l}
          href={`${ORIGIN}/${l}${path}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={xDefault} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content={OG_LOCALES[locale] || OG_LOCALES.he} />
      {SUPPORTED_LANGS
        .filter(l => l !== locale)
        .map(l => (
          <meta key={l} property="og:locale:alternate" content={OG_LOCALES[l]} />
        ))}
      <meta property="og:site_name" content="yuvaldigital.co.il" />
      <meta property="og:image" content={image} />
      <meta
        property="og:image:alt"
        content="Yuval Digital — websites, automation and smart solutions for businesses"
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {jsonLd.map((blob, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(blob)}
        </script>
      ))}
    </Head>
  );
}
