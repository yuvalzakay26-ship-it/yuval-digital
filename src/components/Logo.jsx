import { useLanguage } from '@hooks/useLanguage.js';
import { cn } from '@utils/cn.js';
import './Logo.css';

export default function Logo({ compact = false, variant = 'nav', onClick }) {
  const { t, isRtl } = useLanguage();

  const name = t('brand.name');
  const suffix = t('brand.suffix');
  const short = t('brand.short');
  const ariaLabel = `${name} ${suffix}`;

  return (
    <a
      href="#home"
      onClick={onClick}
      className={cn('logo', `logo--${variant}`, { 'logo--compact': compact, 'logo--rtl': isRtl })}
      aria-label={ariaLabel}
    >
      <span className="logo__mark" aria-hidden>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="yvg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#2563eb" />
              <stop offset="1" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
          <rect x="1" y="1" width="30" height="30" rx="9" stroke="url(#yvg)" strokeWidth="1.5" />
          <path
            d="M9.5 9.5 L16 18 L22.5 9.5 M16 18 L16 23.5"
            stroke="url(#yvg)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {!compact && (
        <span className="logo__wordmark">
          <span className="logo__name">{name}</span>
          {!isRtl && <span className="logo__dot" aria-hidden>.</span>}
          <span className="logo__suffix">{suffix}</span>
          <span className="logo__short" aria-hidden>{short}</span>
        </span>
      )}
    </a>
  );
}
