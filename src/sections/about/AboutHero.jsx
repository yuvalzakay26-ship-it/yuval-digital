import Container from '@components/Container.jsx';
import Reveal from '@components/Reveal.jsx';
import { useLanguage } from '@hooks/useLanguage.js';
import './AboutHero.css';

/**
 * Founder identity header for the dedicated About page.
 * Portrait + name + role + lede + identity-fact list.
 * Editorial layout — restrained backdrop, generous spacing.
 */
export default function AboutHero() {
  const { dict } = useLanguage();
  const data = dict.aboutPage.hero;

  return (
    <section className="about-hero" aria-labelledby="about-hero-title">
      <Container className="about-hero__inner">
        <Reveal variant="left" className="about-hero__media">
          <img
            className="about-hero__portrait"
            src="/yuvalImg.jpg"
            alt={data.portraitAlt}
            width={1280}
            height={1280}
            loading="eager"
            decoding="async"
            fetchpriority="high"
            draggable="false"
          />
        </Reveal>

        <div className="about-hero__content">
          <Reveal>
            <span className="eyebrow about-hero__eyebrow">{data.eyebrow}</span>
          </Reveal>

          <Reveal delay={60}>
            <h1 id="about-hero-title" className="about-hero__name">
              <span className="text-gradient">{data.name}</span>
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="about-hero__role">{data.role}</p>
          </Reveal>

          <Reveal delay={180}>
            <p className="about-hero__lede">{data.lede}</p>
          </Reveal>

          <Reveal delay={240}>
            <dl className="about-hero__facts">
              {data.facts.map(fact => (
                <div key={fact.label} className="about-hero__fact">
                  <dt className="about-hero__fact-label">{fact.label}</dt>
                  <dd className="about-hero__fact-value">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
