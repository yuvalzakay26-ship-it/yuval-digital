import { useState } from 'react';
import Container from '@components/Container.jsx';
import Button from '@components/Button.jsx';
import Reveal from '@components/Reveal.jsx';
import { useLanguage } from '@hooks/useLanguage.js';
import {
  EMAIL,
  EMAIL_HREF,
  PHONE_INTL,
  PHONE_HREF,
  WHATSAPP_HREF,
} from '@data/contact.js';
import './Contact.css';

const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden>
    <path d="M19.11 4.93A10 10 0 0 0 4.07 18.18L3 22l3.93-1.03A10 10 0 1 0 19.1 4.93zM12 20.06a8.04 8.04 0 0 1-4.1-1.12l-.3-.18-2.32.61.62-2.27-.19-.31A8.05 8.05 0 1 1 12 20.05zm4.5-5.81-1.6-.78a.86.86 0 0 0-.86.05c-.34.23-1.27.96-1.4 1.05a.4.4 0 0 1-.46.04 6.43 6.43 0 0 1-1.95-1.2 7.27 7.27 0 0 1-1.36-1.69.45.45 0 0 1 .12-.55c.13-.13.3-.34.45-.51.12-.16.16-.27.24-.43a.5.5 0 0 0-.02-.5l-.78-1.88c-.21-.51-.43-.43-.6-.45h-.51a1 1 0 0 0-.71.34 3.04 3.04 0 0 0-.94 2.25 5.27 5.27 0 0 0 1.1 2.79 12.12 12.12 0 0 0 4.6 4.07 5.25 5.25 0 0 0 2.05.41 3.06 3.06 0 0 0 2.02-.84 2.5 2.5 0 0 0 .58-1.66c-.04-.1-.18-.16-.37-.25z"/>
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l8 4v6c0 4.5-3.4 7.4-8 8-4.6-.6-8-3.5-8-8V7l8-4z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="10" />
    <path d="M8.5 12.5l2.5 2.5L16 9" />
  </svg>
);

export default function Contact() {
  const { dict, t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  const projectTypeOptions = dict.contactExtra.projectTypeOptions;
  const budgetOptions = dict.contactExtra.budgetOptions;
  const timelineOptions = dict.contactExtra.timelineOptions;

  return (
    <section id="contact" className="contact section">
      <Container className="contact__inner">
        <Reveal className="contact__lede">
          <span className="eyebrow">{t('contact.eyebrow')}</span>
          <h2 className="contact__title">{t('contact.title')}</h2>
          <p className="contact__subtitle">{t('contact.subtitle')}</p>

          <p className="contact__microcopy">{t('contact.microcopy')}</p>

          <div className="contact__reassurance">
            <span className="contact__reassurance-icon" aria-hidden><ClockIcon /></span>
            <span>{t('contact.reassurance')}</span>
          </div>

          <div className="contact__direct">
            <span className="contact__direct-label">{t('contact.or')}</span>
            <div className="contact__direct-row">
              <a
                className="contact__direct-card"
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noreferrer"
                aria-label={`${t('contact.whatsapp')} — ${PHONE_INTL}`}
              >
                <span className="contact__direct-icon contact__direct-icon--green" aria-hidden><WhatsAppIcon /></span>
                <span className="contact__direct-text">
                  <span className="contact__direct-name">{t('contact.whatsapp')}</span>
                  <span className="contact__direct-hint" dir="ltr">{PHONE_INTL}</span>
                </span>
              </a>

              <a
                className="contact__direct-card contact__direct-card--call"
                href={PHONE_HREF}
                aria-label={`${t('contact.phoneLabel')} — ${PHONE_INTL}`}
              >
                <span className="contact__direct-icon" aria-hidden><PhoneIcon /></span>
                <span className="contact__direct-text">
                  <span className="contact__direct-name">{t('contact.phoneLabel')}</span>
                  <span className="contact__direct-hint" dir="ltr">{PHONE_INTL}</span>
                </span>
              </a>

              <a
                className="contact__direct-card contact__direct-card--wide"
                href={EMAIL_HREF}
                aria-label={`${t('contact.emailLabel')} — ${EMAIL}`}
              >
                <span className="contact__direct-icon" aria-hidden><MailIcon /></span>
                <span className="contact__direct-text">
                  <span className="contact__direct-name">{t('contact.emailLabel')}</span>
                  <span className="contact__direct-hint" dir="ltr">{EMAIL}</span>
                </span>
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal variant="up" delay={120} className="contact__form-wrap">
          {submitted ? (
            <div className="contact__success surface" role="status" aria-live="polite">
              <span className="contact__success-icon" aria-hidden><CheckCircleIcon /></span>
              <h3 className="contact__success-title">{t('contactExtra.successTitle')}</h3>
              <p className="contact__success-body">{t('contactExtra.successBody')}</p>
              <div className="contact__success-actions">
                <Button as="a" href={WHATSAPP_HREF} target="_blank" rel="noreferrer" variant="soft">
                  {t('contact.whatsapp')}
                </Button>
                <Button as="a" href={PHONE_HREF} variant="ghost">
                  {t('contact.phoneLabel')}
                </Button>
              </div>
            </div>
          ) : (
            <form className="contact__form surface" onSubmit={handleSubmit} noValidate>
              <div className="contact__field">
                <label htmlFor="cf-name">{t('contact.name')}</label>
                <input id="cf-name" name="name" type="text" required autoComplete="name" />
              </div>
              <div className="contact__field">
                <label htmlFor="cf-email">{t('contact.email')}</label>
                <input id="cf-email" name="email" type="email" required autoComplete="email" />
              </div>
              <div className="contact__field">
                <label htmlFor="cf-phone">{t('contact.phone')}</label>
                <input id="cf-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className="contact__field">
                <label htmlFor="cf-business">{t('contactExtra.businessTypeLabel')}</label>
                <input
                  id="cf-business"
                  name="businessType"
                  type="text"
                  placeholder={t('contactExtra.businessTypePlaceholder')}
                  autoComplete="organization"
                />
              </div>
              <div className="contact__field">
                <label htmlFor="cf-project">{t('contactExtra.projectTypeLabel')}</label>
                <select id="cf-project" name="projectType" defaultValue="">
                  {projectTypeOptions.map(o => (
                    <option key={o.value || 'placeholder'} value={o.value} disabled={o.value === ''}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="contact__field">
                <label htmlFor="cf-budget">{t('contactExtra.budgetLabel')}</label>
                <select id="cf-budget" name="budget" defaultValue="">
                  {budgetOptions.map(o => (
                    <option key={o.value || 'placeholder'} value={o.value} disabled={o.value === ''}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="contact__field contact__field--full">
                <label htmlFor="cf-timeline">{t('contactExtra.timelineLabel')}</label>
                <select id="cf-timeline" name="timeline" defaultValue="">
                  {timelineOptions.map(o => (
                    <option key={o.value || 'placeholder'} value={o.value} disabled={o.value === ''}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="contact__field contact__field--full">
                <label htmlFor="cf-message">{t('contact.message')}</label>
                <textarea id="cf-message" name="message" rows="5" required />
              </div>

              <div className="contact__privacy">
                <span className="contact__privacy-icon" aria-hidden><ShieldIcon /></span>
                <span>{t('contactExtra.privacyNote')}</span>
              </div>

              <div className="contact__submit">
                <span className="contact__response">
                  <ClockIcon />
                  {t('contact.response')}
                </span>
                <Button type="submit" variant="gradient" size="lg" disabled={submitted}>
                  {submitted ? t('contact.submitted') : t('contact.submit')}
                </Button>
              </div>
            </form>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
