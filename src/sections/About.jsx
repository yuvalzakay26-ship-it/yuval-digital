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
          <picture>
            <source
              type="image/webp"
              srcSet="/yuvalImg-320.webp 320w, /yuvalImg-640.webp 640w"
              sizes="(max-width: 960px) 200px, 260px"
            />
            <img
              className="about__portrait"
              src="/yuvalImg-640.jpg"
              srcSet="/yuvalImg-320.jpg 320w, /yuvalImg-640.jpg 640w"
              sizes="(max-width: 960px) 200px, 260px"
              alt={t('about.portrait.alt')}
              width={640}
              height={640}
              decoding="async"
              fetchpriority="high"
              draggable="false"
            />
          </picture>
          <div className="about__content">
            <span className="eyebrow">{t('about.eyebrow')}</span>
            <h2 className="about__title">{t('about.title')}</h2>
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
