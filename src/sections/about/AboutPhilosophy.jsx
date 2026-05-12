import Container from '@components/Container.jsx';
import Reveal from '@components/Reveal.jsx';
import { useLanguage } from '@hooks/useLanguage.js';
import './AboutPhilosophy.css';

/**
 * Approach pillars — four principles that guide the work.
 * Grounded, opinionated, not marketing fluff.
 */
export default function AboutPhilosophy() {
  const { dict } = useLanguage();
  const data = dict.aboutPage.philosophy;

  return (
    <section className="about-philo section" aria-labelledby="about-philo-title">
      <Container>
        <Reveal className="about-philo__head">
          <span className="eyebrow">{data.eyebrow}</span>
          <h2 id="about-philo-title" className="about-philo__title">{data.title}</h2>
          <p className="about-philo__subtitle">{data.subtitle}</p>
        </Reveal>

        <div className="about-philo__grid">
          {data.pillars.map((p, i) => (
            <Reveal key={p.title} variant="up" delay={i * 90} className="about-philo__card">
              <span className="about-philo__num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="about-philo__card-title">{p.title}</h3>
              <p className="about-philo__card-body">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
