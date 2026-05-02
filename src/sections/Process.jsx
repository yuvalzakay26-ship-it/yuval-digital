import Container from '@components/Container.jsx';
import Reveal from '@components/Reveal.jsx';
import { useLanguage } from '@hooks/useLanguage.js';
import './Process.css';

export default function Process() {
  const { dict, t } = useLanguage();
  const steps = dict.process.steps;

  return (
    <section id="process" className="process section">
      <Container>
        <Reveal className="section__head">
          <span className="eyebrow">{t('process.eyebrow')}</span>
          <h2 className="section__title">{t('process.title')}</h2>
          <p className="section__lead">{t('process.subtitle')}</p>
        </Reveal>

        <div className="process__rail" role="list">
          <div className="process__line" aria-hidden />
          {steps.map((step, i) => (
            <Reveal
              key={step.id}
              variant="up"
              delay={i * 90}
              className="process__item"
              role="listitem"
            >
              <div className="process__node">
                <span className="process__index">{step.index}</span>
                <span className="process__pulse" aria-hidden />
              </div>
              <div className="process__body">
                <h3 className="process__title">{step.title}</h3>
                <p className="process__desc">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
