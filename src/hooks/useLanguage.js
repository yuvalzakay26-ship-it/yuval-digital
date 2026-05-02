import { useContext } from 'react';
import { LanguageContext } from '@i18n/LanguageProvider.jsx';

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used inside <LanguageProvider>');
  }
  return ctx;
}
