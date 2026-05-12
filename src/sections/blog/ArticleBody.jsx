import { Link } from 'react-router-dom';
import Container from '@components/Container.jsx';
import { useLanguage } from '@hooks/useLanguage.js';
import { getService } from '@data/serviceCatalog.js';
import './ArticleBody.css';

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

/**
 * Renders the structured-JSON body of an article.
 *
 * Supported node shapes:
 *   { type: 'p',       text }                       — paragraph
 *   { type: 'h2',      text, id? }                  — section heading
 *   { type: 'h3',      text, id? }                  — sub heading
 *   { type: 'ul',      items }                      — unordered list
 *   { type: 'ol',      items }                      — ordered list
 *   { type: 'quote',   text, cite? }                — blockquote with optional cite
 *   { type: 'callout', tone?, text }                — emphasized aside ('soft' default)
 *   { type: 'link',    label, slug }                — inline CTA card linking to a
 *                                                     service page by slug; used to
 *                                                     wire editorial -> commercial intent
 *
 * Unknown node types render nothing — safe forward-compat for future
 * additions that older deployments encounter.
 */
function slugifyHeading(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9֐-׿\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 64);
}

function ServiceLinkCard({ label, slug }) {
  const { locale } = useLanguage();
  const svc = getService(slug);
  const target = svc && svc.published
    ? `/${locale}/services/${slug}`
    : `/${locale}#services`;
  return (
    <Link to={target} className="article-body__link-card">
      <span className="article-body__link-label">{label}</span>
      <span className="article-body__link-arrow" aria-hidden><ArrowIcon /></span>
    </Link>
  );
}

function renderNode(node, i) {
  switch (node.type) {
    case 'p':
      return <p key={i} className="article-body__p">{node.text}</p>;
    case 'h2':
      return (
        <h2 key={i} id={node.id || slugifyHeading(node.text)} className="article-body__h2">
          {node.text}
        </h2>
      );
    case 'h3':
      return (
        <h3 key={i} id={node.id || slugifyHeading(node.text)} className="article-body__h3">
          {node.text}
        </h3>
      );
    case 'ul':
      return (
        <ul key={i} className="article-body__ul">
          {(node.items || []).map((it, j) => <li key={j}>{it}</li>)}
        </ul>
      );
    case 'ol':
      return (
        <ol key={i} className="article-body__ol">
          {(node.items || []).map((it, j) => <li key={j}>{it}</li>)}
        </ol>
      );
    case 'quote':
      return (
        <blockquote key={i} className="article-body__quote">
          <p>{node.text}</p>
          {node.cite && <cite>— {node.cite}</cite>}
        </blockquote>
      );
    case 'callout':
      return (
        <aside
          key={i}
          className={`article-body__callout article-body__callout--${node.tone || 'soft'}`}
        >
          {node.text}
        </aside>
      );
    case 'link':
      return <ServiceLinkCard key={i} label={node.label} slug={node.slug} />;
    default:
      return null;
  }
}

export default function ArticleBody({ nodes = [] }) {
  return (
    <section className="article-body section">
      <Container className="article-body__inner">
        <div className="article-body__column">
          {nodes.map(renderNode)}
        </div>
      </Container>
    </section>
  );
}
