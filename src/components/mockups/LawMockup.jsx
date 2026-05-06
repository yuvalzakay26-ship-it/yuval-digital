import { useLanguage } from '@hooks/useLanguage.js';
import './mockups.css';

const LAW_COPY = {
  he: {
    name: 'משרד עורכת דין אסתר',
    role: 'עורכת דין · מגשרת',
    pill: 'אמין ומקצועי',
    cta: 'קביעת פגישת ייעוץ',
  },
  en: {
    name: 'Ester Law Office',
    role: 'Attorney · Mediator',
    pill: 'Trusted',
    cta: 'Book a consultation',
  },
};

/* Law practice — dignified brand surface (attorney & mediator) */
export default function LawMockup() {
  const { locale, isRtl } = useLanguage();
  const copy = LAW_COPY[locale] || LAW_COPY.en;
  const accent = { '--mock-accent': '#1e3a8a', '--mock-accent-2': '#b45309' };
  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      style={{
        ...accent,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        height: '100%',
      }}
    >
      <div className="mu-row mu-row--between">
        <div className="mu-row">
          <span className="mu-avatar" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--mock-text)' }}>
              {copy.name}
            </span>
            <span style={{ fontSize: 8, color: 'var(--mock-text-soft)', letterSpacing: '0.04em' }}>
              {copy.role}
            </span>
          </div>
        </div>
        <span className="mu-pill mu-pill--brand">{copy.pill}</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span className="mu-line mu-line--lg mu-line--strong" style={{ width: '88%' }} />
        <span className="mu-line" style={{ width: '74%' }} />
        <span className="mu-line" style={{ width: '60%' }} />
      </div>

      <div className="mu-grid-2">
        <div className="mu-card" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span className="mu-line mu-line--brand" style={{ width: '40%' }} />
          <span className="mu-line" style={{ width: '90%' }} />
          <span className="mu-line" style={{ width: '70%' }} />
        </div>
        <div className="mu-card" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span className="mu-line mu-line--brand" style={{ width: '50%' }} />
          <span className="mu-line" style={{ width: '85%' }} />
          <span className="mu-line" style={{ width: '65%' }} />
        </div>
      </div>

      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-start' }}>
        <span className="mu-cta">{copy.cta}</span>
      </div>
    </div>
  );
}
