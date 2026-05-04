import { useTheme } from '@hooks/useTheme.js';
import { useLanguage } from '@hooks/useLanguage.js';
import './ThemeToggle.css';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const target = theme === 'light' ? 'dark' : 'light';
  const ariaKey = target === 'dark' ? 'theme.switchToDark' : 'theme.switchToLight';

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={t(ariaKey)}
      onClick={toggleTheme}
      data-target={target}
    >
      <span className="theme-toggle__icon" key={target} aria-hidden>
        {target === 'dark' ? <MoonIcon /> : <SunIcon />}
      </span>
    </button>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
