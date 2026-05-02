import Container from '@components/Container.jsx';
import Reveal from '@components/Reveal.jsx';
import { useLanguage } from '@hooks/useLanguage.js';
import './About.css';

export default function About() {
  const { dict, t } = useLanguage();
  const pillars = dict.about.pillars;

  return (
    <section id="about" className="about section">
      <Container className="about__inner">
        <Reveal variant="left" className="about__lede">
          <span className="eyebrow">{t('about.eyebrow')}</span>
          <h2 className="about__title">{t('about.title')}</h2>
          <p className="about__body">{t('about.body')}</p>
        </Reveal>

        <div className="about__pillars">
          {pillars.map((p, i) => (
            <Reveal key={p.title} variant="up" delay={i * 90} className="about-pillar">
              <span className="about-pillar__num">0{i + 1}</span>
              <h3 className="about-pillar__title">{p.title}</h3>
              <p className="about-pillar__body">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
