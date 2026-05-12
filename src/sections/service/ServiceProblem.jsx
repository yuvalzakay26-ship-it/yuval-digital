import Container from '@components/Container.jsx';
import Reveal from '@components/Reveal.jsx';
import './ServiceProblem.css';

/**
 * Problem framing — names the gap the service fills.
 * Card grid mirrors the home Trust section visually, but each card
 * is a concrete failure mode the service prevents.
 */
export default function ServiceProblem({ data }) {
  return (
    <section className="svc-problem section">
      <Container>
        <Reveal className="section__head">
          <span className="eyebrow">{data.eyebrow}</span>
          <h2 className="section__title">{data.title}</h2>
          <p className="section__lead">{data.body}</p>
        </Reveal>

        <div className="svc-problem__grid">
          {data.items.map((item, i) => (
            <Reveal key={item.id} variant="up" delay={i * 70} className="svc-problem__card-wrap">
              <article className="svc-problem__card surface">
                <h3 className="svc-problem__title">{item.title}</h3>
                <p className="svc-problem__desc">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
