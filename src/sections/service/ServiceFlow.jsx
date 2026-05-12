import Container from '@components/Container.jsx';
import Reveal from '@components/Reveal.jsx';
import './ServiceFlow.css';

/**
 * Service-specific build flow. Same five-step structure as the home
 * Process section, but the copy is tuned to the service. Vertical
 * timeline read pattern — easier to scan on a detail page.
 */
export default function ServiceFlow({ data }) {
  return (
    <section className="svc-flow section">
      <Container>
        <Reveal className="section__head">
          <span className="eyebrow">{data.eyebrow}</span>
          <h2 className="section__title">{data.title}</h2>
          <p className="section__lead">{data.body}</p>
        </Reveal>

        <ol className="svc-flow__list">
          {data.steps.map((step, i) => (
            <Reveal
              key={step.id}
              variant="up"
              delay={i * 70}
              as="li"
              className="svc-flow__item"
            >
              <div className="svc-flow__index" aria-hidden>{step.index}</div>
              <div className="svc-flow__body">
                <h3 className="svc-flow__title">{step.title}</h3>
                <p className="svc-flow__desc">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
