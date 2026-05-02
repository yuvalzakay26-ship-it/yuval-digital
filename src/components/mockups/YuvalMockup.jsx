import './mockups.css';

/* yuval.digital — premium portfolio hero */
export default function YuvalMockup() {
  return (
    <div className="mu-yuval" style={{ '--mock-accent': '#2563eb', '--mock-accent-2': '#7c3aed' }}>
      <div className="mu-yuval__nav">
        <span className="mu-yuval__brand">YUVAL</span>
        <span className="mu-yuval__nav-links" aria-hidden>
          <span /><span /><span /><span />
        </span>
        <span className="mu-pill mu-pill--brand">EN · HE</span>
      </div>

      <div className="mu-yuval__hero">
        <span className="mu-pill">Software · AI · Automation</span>
        <h4 className="mu-yuval__title">
          Turning ideas <span>into systems that work.</span>
        </h4>
        <div className="mu-yuval__sub">
          <span className="mu-line" style={{ width: '88%' }} />
          <span className="mu-line" style={{ width: '64%' }} />
        </div>
        <div className="mu-yuval__ctas">
          <span className="mu-cta">Let&apos;s build</span>
          <span className="mu-cta mu-cta--ghost">How I work</span>
        </div>
      </div>

      <div className="mu-yuval__metrics">
        <div className="mu-yuval__metric">
          <span className="mu-yuval__metric-num">24h</span>
          <span className="mu-yuval__metric-lbl">Reply</span>
        </div>
        <div className="mu-yuval__metric">
          <span className="mu-yuval__metric-num">100%</span>
          <span className="mu-yuval__metric-lbl">Custom</span>
        </div>
        <div className="mu-yuval__metric">
          <span className="mu-yuval__metric-num">2</span>
          <span className="mu-yuval__metric-lbl">Languages</span>
        </div>
      </div>
    </div>
  );
}
