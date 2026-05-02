import LegalPage from './LegalPage.jsx';
import { useLanguage } from '@hooks/useLanguage.js';
import {
  EMAIL,
  EMAIL_HREF,
  PHONE_INTL,
  PHONE_HREF,
} from '@data/contact.js';

const LAST_UPDATED = '2026-05-02';

export default function AccessibilityStatement() {
  const { dict, t, locale } = useLanguage();
  const data = dict.a11y.statement;

  const updatedFormatted = new Intl.DateTimeFormat(locale === 'he' ? 'he-IL' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(LAST_UPDATED));

  const contactBlock = [
    { label: data.contactBlock.nameLabel, value: data.contactBlock.nameValue },
    { label: data.contactBlock.emailLabel, value: EMAIL, href: EMAIL_HREF, dir: 'ltr' },
    { label: data.contactBlock.phoneLabel, value: PHONE_INTL, href: PHONE_HREF, dir: 'ltr' },
  ];

  return (
    <LegalPage
      eyebrow={t('legal.accessibility')}
      title={data.title}
      updated={`${data.updated}: ${updatedFormatted}`}
      intro={data.intro}
      sections={data.sections}
      contactBlock={contactBlock}
      back={data.back}
    />
  );
}
