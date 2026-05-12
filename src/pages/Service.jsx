import { Navigate, useParams } from 'react-router-dom';
import Seo from '@components/Seo.jsx';
import Contact from '@sections/Contact.jsx';
import CtaBanner from '@components/CtaBanner.jsx';
import ServiceHero from '@sections/service/ServiceHero.jsx';
import ServiceProblem from '@sections/service/ServiceProblem.jsx';
import ServiceInclusions from '@sections/service/ServiceInclusions.jsx';
import ServiceFlow from '@sections/service/ServiceFlow.jsx';
import ServiceFaq from '@sections/service/ServiceFaq.jsx';
import ServiceRelated from '@sections/service/ServiceRelated.jsx';
import { useLanguage } from '@hooks/useLanguage.js';
import { getService, isPublishedSlug } from '@data/serviceCatalog.js';
import { seoCopy } from '@data/seo.js';
import { serviceJsonLd } from '@data/jsonld.js';

/**
 * Service detail page. Data-driven from:
 *   - `servicePages.<i18nKey>` for long-form copy (per locale)
 *   - SERVICE_CATALOG for slug → id, target queries, related links
 *   - seoCopy.services.<slug> for meta title/description
 *
 * Unknown / unpublished slugs redirect to /:lang (the home Services
 * section anchors back into context). Prerender already only emits
 * published slugs, so this redirect is defence in depth for the
 * client-side route + future content surfaces.
 */
export default function Service() {
  const { slug } = useParams();
  const { locale, dict } = useLanguage();

  if (!isPublishedSlug(slug)) {
    return <Navigate to={`/${locale}`} replace />;
  }

  const svc = getService(slug);
  const data = dict.servicePages?.[svc.i18nKey];
  if (!data) {
    return <Navigate to={`/${locale}`} replace />;
  }

  const seoSlot = seoCopy.services?.[slug]?.[locale]
    || seoCopy.services?.[slug]?.he;

  const keywords = svc.keywords?.[locale] || svc.keywords?.he || [];

  const jsonLd = serviceJsonLd({
    locale,
    slug,
    name: data.eyebrow,
    description: seoSlot?.description || data.lede,
    keywords,
    faqItems: data.faq?.items || []
  });

  return (
    <>
      <Seo
        title={seoSlot?.title || data.eyebrow}
        description={seoSlot?.description || data.lede}
        path={`/services/${slug}`}
        jsonLd={jsonLd}
      />

      <ServiceHero data={data} slug={slug} />
      <ServiceProblem data={data.problem} />
      <CtaBanner variant="afterPackages" tone="soft" />
      <ServiceInclusions data={data.inclusions} />
      <ServiceFlow data={data.flow} />
      <ServiceFaq data={data.faq} />
      <ServiceRelated relatedSlugs={svc.related} />
      <CtaBanner variant="beforeFooter" tone="strong" />
      <Contact />
    </>
  );
}
