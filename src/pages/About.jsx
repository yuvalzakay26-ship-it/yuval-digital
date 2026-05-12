import Seo from '@components/Seo.jsx';
import AboutHero from '@sections/about/AboutHero.jsx';
import AboutStory from '@sections/about/AboutStory.jsx';
import AboutPhilosophy from '@sections/about/AboutPhilosophy.jsx';
import AboutNow from '@sections/about/AboutNow.jsx';
import AboutCta from '@sections/about/AboutCta.jsx';
import { useLanguage } from '@hooks/useLanguage.js';
import { seoCopy } from '@data/seo.js';
import { aboutJsonLd } from '@data/jsonld.js';

/**
 * Dedicated About page at /:lang/about.
 *
 * Entity-building surface — strengthens the Yuval ↔ Yuval Zakay ↔
 * Yuval Digital link in Google's understanding by publishing an
 * AboutPage whose `mainEntity` references the canonical Person
 * defined on the home page (matched by @id). The page itself stays
 * editorial: founder identity, why the studio exists, approach,
 * current stage, and a closing CTA.
 */
export default function About() {
  const { locale } = useLanguage();
  const copy = seoCopy.about[locale] || seoCopy.about.he;
  const jsonLd = aboutJsonLd({
    locale,
    name: copy.title,
    description: copy.description,
  });

  return (
    <>
      <Seo
        title={copy.title}
        description={copy.description}
        path="/about"
        jsonLd={jsonLd}
      />
      <AboutHero />
      <AboutStory />
      <AboutPhilosophy />
      <AboutNow />
      <AboutCta />
    </>
  );
}
