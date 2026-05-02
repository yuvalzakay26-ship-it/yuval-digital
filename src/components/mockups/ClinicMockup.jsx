import './mockups.css';

/* Clinic booking — calendar + slot picker */
export default function ClinicMockup() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const slots = ['09:00', '10:30', '12:00', '14:00', '15:30', '17:00'];
  const taken = new Set([1, 3]);

  return (
    <div className="mu-clinic" style={{ '--mock-accent': '#06b6d4', '--mock-accent-2': '#2563eb' }}>
      <div className="mu-clinic__head">
        <div className="mu-row">
          <span className="mu-avatar" />
          <div className="mu-clinic__head-text">
            <span className="mu-clinic__name">Dr. Levi · Family medicine</span>
            <span className="mu-clinic__meta">Tel Aviv · Open today</span>
          </div>
        </div>
        <span className="mu-pill mu-pill--brand">Available</span>
      </div>

      <div className="mu-clinic__cal">
        <div className="mu-clinic__cal-head">
          <span>This week</span>
          <span className="mu-clinic__chevrons" aria-hidden>‹ ›</span>
        </div>
        <div className="mu-clinic__days">
          {days.map((d, i) => (
            <div key={d} className={`mu-clinic__day${i === 2 ? ' mu-clinic__day--active' : ''}`}>
              <span className="mu-clinic__day-name">{d}</span>
              <span className="mu-clinic__day-num">{14 + i}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mu-clinic__slots">
        {slots.map((s, i) => (
          <span
            key={s}
            className={`mu-clinic__slot${taken.has(i) ? ' mu-clinic__slot--taken' : i === 2 ? ' mu-clinic__slot--picked' : ''}`}
          >
            {s}
          </span>
        ))}
      </div>

      <div className="mu-clinic__cta">
        <span className="mu-cta">Confirm 12:00</span>
      </div>
    </div>
  );
}
