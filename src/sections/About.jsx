import Container from '@components/Container.jsx';
import Reveal from '@components/Reveal.jsx';
import { useLanguage } from '@hooks/useLanguage.js';
import './About.css';

export default function About() {
  const { dict, t } = useLanguage();
  const pillars = dict.about.pillars;
  const bodyParagraphs = t('about.body').split('\n\n');

  return (
    <section id="about" className="about section">
      <Container className="about__inner">
        <Reveal variant="left" className="about__lede">
          <img
            className="about__portrait"
            src="/yuvalImg.jpg"
            alt={t('about.portraitAlt')}
            width={1280}
            height={1280}
            loading="lazy"
            decoding="async"
            draggable="false"
          />
          <div className="about__heading">
            <span className="eyebrow">{t('about.eyebrow')}</span>
            <h2 className="about__title">{t('about.title')}</h2>
          </div>
          <div className="about__body-group">
            {bodyParagraphs.map((para, i) => (
              <p key={i} className="about__body">{para}</p>
            ))}
          </div>
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
