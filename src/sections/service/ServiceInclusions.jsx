import Container from '@components/Container.jsx';
import Reveal from '@components/Reveal.jsx';
import './ServiceInclusions.css';

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

/**
 * What's-included grid — concrete deliverables that come with the service.
 * Each card carries the same check-bullet language used elsewhere on the site
 * so it reads as one consistent value-promise system.
 */
export default function ServiceInclusions({ data }) {
  return (
    <section className="svc-inclusions section">
      <Container>
        <Reveal className="section__head">
          <span className="eyebrow">{data.eyebrow}</span>
          <h2 className="section__title">{data.title}</h2>
          <p className="section__lead">{data.body}</p>
        </Reveal>

        <div className="svc-inclusions__grid">
          {data.items.map((item, i) => (
            <Reveal key={item.id} variant="up" delay={i * 50} className="svc-inclusions__card-wrap">
              <article className="svc-inclusions__card surface surface--interactive">
                <div className="svc-inclusions__check" aria-hidden><CheckIcon /></div>
                <h3 className="svc-inclusions__title">{item.title}</h3>
                <p className="svc-inclusions__desc">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
