import { Link } from 'react-router-dom';
import Container from '@components/Container.jsx';
import Button from '@components/Button.jsx';
import Reveal from '@components/Reveal.jsx';
import { useLanguage } from '@hooks/useLanguage.js';
import { track } from '@utils/analytics.js';
import './AboutCta.css';

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

/**
 * Closing CTA for the About page. Calm, editorial, two-action.
 * Primary jumps to home contact section; secondary returns to home.
 */
export default function AboutCta() {
  const { locale, dict } = useLanguage();
  const data = dict.aboutPage.cta;
  const home = `/${locale}`;

  return (
    <section className="about-cta section" aria-labelledby="about-cta-title">
      <Container>
        <Reveal className="about-cta__inner">
          <span className="eyebrow">{data.eyebrow}</span>
          <h2 id="about-cta-title" className="about-cta__title">{data.title}</h2>
          <p className="about-cta__body">{data.body}</p>

          <div className="about-cta__actions">
            <Button
              as={Link}
              to={`${home}#contact`}
              variant="gradient"
              size="lg"
              iconEnd={<ArrowIcon />}
              onClick={() => track('cta_about_click', { source: 'about_page', destination: 'contact' })}
            >
              {data.primary}
            </Button>
            <Button as={Link} to={home} variant="ghost" size="lg">
              {data.secondary}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
