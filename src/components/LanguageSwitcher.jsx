import { useLanguage } from '@hooks/useLanguage.js';
import './LanguageSwitcher.css';

export default function LanguageSwitcher() {
  const { locale, toggleLocale, t } = useLanguage();
  const target = locale === 'he' ? 'en' : 'he';
  const label = target === 'en' ? 'EN' : 'HE';
  const ariaKey = target === 'en' ? 'language.switchToEn' : 'language.switchToHe';

  return (
    <button
      type="button"
      className="lang-switch"
      aria-label={t(ariaKey)}
      onClick={toggleLocale}
      data-target={target}
    >
      <span className="lang-switch__label" key={target}>{label}</span>
    </button>
  );
}
