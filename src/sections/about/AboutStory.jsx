import Container from '@components/Container.jsx';
import Reveal from '@components/Reveal.jsx';
import { useLanguage } from '@hooks/useLanguage.js';
import './AboutStory.css';

/**
 * Why-the-studio-exists narrative. Single column, editorial,
 * comfortable line length — the emotional core of the About page.
 */
export default function AboutStory() {
  const { dict } = useLanguage();
  const data = dict.aboutPage.story;

  return (
    <section className="about-story section" aria-labelledby="about-story-title">
      <Container>
        <Reveal className="about-story__inner">
          <span className="eyebrow about-story__eyebrow">{data.eyebrow}</span>
          <h2 id="about-story-title" className="about-story__title">{data.title}</h2>
          <div className="about-story__body">
            {data.paragraphs.map((para, i) => (
              <p key={i} className="about-story__para">{para}</p>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
