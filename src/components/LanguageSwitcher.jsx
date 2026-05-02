import { useLanguage } from '@hooks/useLanguage.js';
import { cn } from '@utils/cn.js';
import './LanguageSwitcher.css';

export default function LanguageSwitcher() {
  const { locale, setLocale, t, available } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t('language.switch')}
      className="lang-switch"
    >
      {available.map(code => (
        <button
          key={code}
          type="button"
          className={cn('lang-switch__btn', { 'lang-switch__btn--active': locale === code })}
          aria-pressed={locale === code}
          onClick={() => setLocale(code)}
        >
          {code === 'he' ? 'עב' : 'EN'}
        </button>
      ))}
      <span
        className="lang-switch__pill"
        aria-hidden
        data-active={locale}
      />
    </div>
  );
}
