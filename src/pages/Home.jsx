import { lazy, Suspense } from 'react';
import Hero from '@sections/Hero.jsx';
import TrustStrip from '@components/TrustStrip.jsx';
import Seo from '@components/Seo.jsx';
import { useLanguage } from '@hooks/useLanguage.js';
import { seoCopy } from '@data/seo.js';
import { homeJsonLd } from '@data/jsonld.js';

/* Below-the-fold sections are split into their own client chunks. The
   SSG prerender awaits each lazy import, so emitted HTML is still
   complete for crawlers and Lighthouse — but the main bundle (~334KB)
   that blocks the LCP frame no longer has to parse and evaluate
   ten section components, six device mockups, the contact form, the
   FAQ tree and ~80KB of section CSS before paint can finish. */
const CtaBanner = lazy(() => import('@components/CtaBanner.jsx'));
const Trust     = lazy(() => import('@sections/Trust.jsx'));
const Services  = lazy(() => import('@sections/Services.jsx'));
const Packages  = lazy(() => import('@sections/Packages.jsx'));
const Process   = lazy(() => import('@sections/Process.jsx'));
const Projects  = lazy(() => import('@sections/Projects.jsx'));
const Stack     = lazy(() => import('@sections/Stack.jsx'));
const About     = lazy(() => import('@sections/About.jsx'));
const Faq       = lazy(() => import('@sections/Faq.jsx'));
const Contact   = lazy(() => import('@sections/Contact.jsx'));

/**
 * Conversion flow:
 *   Hero          — hook + identity (above the fold; eager)
 *   TrustStrip    — compact proof anchor (eager — tiny, no chunk worth splitting)
 *   CTA banner    — early offramp
 *   Trust         — reduce friction immediately
 *   Services      — what I build
 *   Packages      — starting points (lead magnet)
 *   CTA banner    — capture indecision
 *   Process       — how I work
 *   Projects      — portfolio of work
 *   Stack         — tools and workflow
 *   About         — deeper trust
 *   FAQ           — friction removal
 *   CTA banner    — final push (strong)
 *   Contact       — action
 */
export default function Home() {
  const { locale } = useLanguage();
  const copy = seoCopy.home[locale] || seoCopy.home.he;
  return (
    <>
      <Seo
        title={copy.title}
        description={copy.description}
        path=""
        jsonLd={homeJsonLd}
      />
      <Hero />
      <TrustStrip />
      <Suspense fallback={null}>
        <CtaBanner variant="afterHero" tone="soft" />
        <Trust />
        <Services />
        <Packages />
        <CtaBanner variant="afterPackages" tone="soft" />
        <Process />
        <Projects />
        <Stack />
        <About />
        <Faq />
        <CtaBanner variant="beforeFooter" tone="strong" />
        <Contact />
      </Suspense>
    </>
  );
}
