import './mockups.css';

/* Lead capture landing page */
export default function LeadgenMockup() {
  return (
    <div className="mu-leadgen" style={{ '--mock-accent': '#059669', '--mock-accent-2': '#84cc16' }}>
      <div className="mu-leadgen__hero">
        <span className="mu-pill mu-pill--brand">Limited offer</span>
        <h4 className="mu-leadgen__title">
          Cut admin time <span>by 40% — guaranteed.</span>
        </h4>
        <div className="mu-leadgen__sub">
          <span className="mu-line" style={{ width: '92%' }} />
          <span className="mu-line" style={{ width: '76%' }} />
        </div>
      </div>

      <div className="mu-leadgen__form">
        <div className="mu-leadgen__field">
          <span className="mu-leadgen__label">Full name</span>
          <span className="mu-leadgen__input">Sarah K.</span>
        </div>
        <div className="mu-leadgen__field">
          <span className="mu-leadgen__label">Email</span>
          <span className="mu-leadgen__input">sarah@studio.co</span>
        </div>
        <div className="mu-leadgen__field">
          <span className="mu-leadgen__label">Phone</span>
          <span className="mu-leadgen__input" dir="ltr">+972 50 123 4567</span>
        </div>
        <span className="mu-cta mu-leadgen__submit">Get a quote →</span>
        <div className="mu-leadgen__trust">
          <span className="mu-leadgen__check" aria-hidden>✓</span>
          <span>Reply within 24h · No spam</span>
        </div>
      </div>
    </div>
  );
}
