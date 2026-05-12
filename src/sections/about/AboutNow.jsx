import Container from '@components/Container.jsx';
import Reveal from '@components/Reveal.jsx';
import { useLanguage } from '@hooks/useLanguage.js';
import './AboutNow.css';

/**
 * Current-stage honesty + near-term direction. Two-column on
 * desktop: narrative narrative narrative + focus-areas sidebar list.
 */
export default function AboutNow() {
  const { dict } = useLanguage();
  const data = dict.aboutPage.now;

  return (
    <section className="about-now section" aria-labelledby="about-now-title">
      <Container className="about-now__inner">
        <Reveal className="about-now__narrative">
          <span className="eyebrow">{data.eyebrow}</span>
          <h2 id="about-now-title" className="about-now__title">{data.title}</h2>
          <div className="about-now__body">
            {data.paragraphs.map((para, i) => (
              <p key={i} className="about-now__para">{para}</p>
            ))}
          </div>
        </Reveal>

        <Reveal variant="up" delay={120} className="about-now__directions">
          <h3 className="about-now__directions-title">{data.directionsLabel}</h3>
          <ul className="about-now__directions-list">
            {data.directions.map(item => (
              <li key={item} className="about-now__direction">
                <span className="about-now__direction-dot" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
