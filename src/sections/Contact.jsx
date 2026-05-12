import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
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
import { track } from '@utils/analytics.js';
import './Contact.css';

const ENDPOINT = 'https://n8n-production-5418.up.railway.app/webhook/yd-lead-intake';

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

const SparkleIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.8 4.6L18.5 9.5l-4.7 1.9L12 16l-1.8-4.6L5.5 9.5l4.7-1.9L12 3z" />
    <path d="M19 14.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7L19 14.5z" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

const SpinnerIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden className="contact__spinner">
    <path d="M21 12a9 9 0 1 1-6.22-8.56" />
  </svg>
);

const AlertIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v4" />
    <path d="M12 16h.01" />
  </svg>
);

const TRUST_ICONS = {
  reply: ClockIcon,
  free: SparkleIcon,
  private: ShieldIcon
};

const CheckCircleIcon = () => (
  <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="10" />
    <path d="M8.5 12.5l2.5 2.5L16 9" />
  </svg>
);

function errorKeyFor(code) {
  switch (code) {
    case 'invalid_email':  return 'contactExtra.errorEmail';
    case 'missing_fields': return 'contactExtra.errorValidation';
    case 'rate_limited':   return 'contactExtra.errorRate';
    default:               return 'contactExtra.errorBody';
  }
}

export default function Contact() {
  const { dict, t, locale } = useLanguage();
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [errorText, setErrorText] = useState('');
  const abortRef = useRef(null);
  const errorRef = useRef(null);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  useEffect(() => {
    if (status === 'error' && errorRef.current) {
      errorRef.current.focus();
    }
  }, [status]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === 'sending') return;

    const form = e.currentTarget;
    const fd = new FormData(form);

    // Honeypot — silently accept and reset, do not call API.
    // Do NOT track this as a conversion: it's a bot.
    if ((fd.get('company') || '').toString().trim()) {
      setStatus('success');
      form.reset();
      return;
    }

    const payload = {
      name:         (fd.get('name')         || '').toString().trim(),
      email:        (fd.get('email')        || '').toString().trim(),
      phone:        (fd.get('phone')        || '').toString().trim(),
      service:      (fd.get('projectType')  || '').toString().trim(),
      message:      (fd.get('message')      || '').toString().trim(),
      businessType: (fd.get('businessType') || '').toString().trim(),
      budget:       (fd.get('budget')       || '').toString().trim(),
      timeline:     (fd.get('timeline')     || '').toString().trim(),
      locale,
      timestamp: new Date().toISOString()
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus('error');
      setErrorText(t('contactExtra.errorValidation'));
      const firstInvalid = form.querySelector('input[required]:invalid, textarea[required]:invalid');
      firstInvalid?.focus();
      return;
    }

    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    setStatus('sending');
    setErrorText('');

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: ctrl.signal
      });
      let data = null;
      try { data = await res.json(); } catch { /* tolerate empty body */ }

      if (!res.ok) {
        setStatus('error');
        setErrorText(t(errorKeyFor(data?.error)));
        track('contact_submit_error', {
          source: 'contact_form',
          reason: data?.error || 'network',
        });
        return;
      }

      setStatus('success');
      form.reset();
      track('contact_submit', {
        source: 'contact_form',
        project_type: payload.service || 'unspecified',
        budget: payload.budget || 'unspecified',
        timeline: payload.timeline || 'unspecified',
      });
    } catch (err) {
      if (err.name === 'AbortError') return;
      setStatus('error');
      setErrorText(t('contactExtra.errorBody'));
      track('contact_submit_error', { source: 'contact_form', reason: 'exception' });
    }
  }

  const projectTypeOptions = dict.contactExtra.projectTypeOptions;
  const budgetOptions = dict.contactExtra.budgetOptions;
  const timelineOptions = dict.contactExtra.timelineOptions;
  const trustItems = dict.contactExtra.trust;
  const optionalLabel = t('contactExtra.optional');

  const isSending = status === 'sending';
  const isSuccess = status === 'success';
  const isError   = status === 'error';

  return (
    <section id="contact" className="contact section">
      <Container className="contact__inner">
        <Reveal className="contact__lede">
          <p className="contact__availability">
            <span className="contact__availability-dot" aria-hidden="true" />
            <span>{t('contact.availability')}</span>
          </p>
          <span className="eyebrow">{t('contact.eyebrow')}</span>
          <h2 className="contact__title">{t('contact.title')}</h2>
          <p className="contact__subtitle">{t('contact.subtitle')}</p>

          <p className="contact__personal">{t('contact.personalNote')}</p>

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
                onClick={() => track('whatsapp_click', { source: 'contact_card' })}
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
                onClick={() => track('phone_click', { source: 'contact_card' })}
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
                onClick={() => track('email_click', { source: 'contact_card' })}
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
          {isSuccess ? (
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
              <ul className="contact__trust" aria-label={t('contactExtra.trustAriaLabel')}>
                {trustItems.map(item => {
                  const Icon = TRUST_ICONS[item.id] || ClockIcon;
                  return (
                    <li key={item.id} className="contact__trust-item">
                      <span className="contact__trust-icon" aria-hidden><Icon /></span>
                      <span>{item.text}</span>
                    </li>
                  );
                })}
              </ul>

              <div className="contact__field">
                <label htmlFor="cf-name">
                  <span>{t('contact.name')}</span>
                  <span className="contact__field-required" aria-hidden>*</span>
                </label>
                <input
                  id="cf-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder={t('contactExtra.namePlaceholder')}
                  disabled={isSending}
                />
              </div>
              <div className="contact__field">
                <label htmlFor="cf-email">
                  <span>{t('contact.email')}</span>
                  <span className="contact__field-required" aria-hidden>*</span>
                </label>
                <input
                  id="cf-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder={t('contactExtra.emailPlaceholder')}
                  dir="ltr"
                  disabled={isSending}
                />
              </div>
              <div className="contact__field">
                <label htmlFor="cf-phone">
                  <span>{t('contact.phone')}</span>
                  <span className="contact__field-meta">{optionalLabel}</span>
                </label>
                <input
                  id="cf-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder={t('contactExtra.phonePlaceholder')}
                  dir="ltr"
                  disabled={isSending}
                />
              </div>
              <div className="contact__field">
                <label htmlFor="cf-business">
                  <span>{t('contactExtra.businessTypeLabel')}</span>
                  <span className="contact__field-meta">{optionalLabel}</span>
                </label>
                <input
                  id="cf-business"
                  name="businessType"
                  type="text"
                  placeholder={t('contactExtra.businessTypePlaceholder')}
                  autoComplete="organization"
                  disabled={isSending}
                />
              </div>
              <div className="contact__field">
                <label htmlFor="cf-project">
                  <span>{t('contactExtra.projectTypeLabel')}</span>
                  <span className="contact__field-meta">{optionalLabel}</span>
                </label>
                <select id="cf-project" name="projectType" defaultValue="" disabled={isSending}>
                  {projectTypeOptions.map(o => (
                    <option key={o.value || 'placeholder'} value={o.value} disabled={o.value === ''}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="contact__field">
                <label htmlFor="cf-budget">
                  <span>{t('contactExtra.budgetLabel')}</span>
                  <span className="contact__field-meta">{optionalLabel}</span>
                </label>
                <select id="cf-budget" name="budget" defaultValue="" disabled={isSending}>
                  {budgetOptions.map(o => (
                    <option key={o.value || 'placeholder'} value={o.value} disabled={o.value === ''}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="contact__field contact__field--full">
                <label htmlFor="cf-timeline">
                  <span>{t('contactExtra.timelineLabel')}</span>
                  <span className="contact__field-meta">{optionalLabel}</span>
                </label>
                <select id="cf-timeline" name="timeline" defaultValue="" disabled={isSending}>
                  {timelineOptions.map(o => (
                    <option key={o.value || 'placeholder'} value={o.value} disabled={o.value === ''}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="contact__field contact__field--full">
                <label htmlFor="cf-message">
                  <span>{t('contact.message')}</span>
                  <span className="contact__field-required" aria-hidden>*</span>
                </label>
                <textarea
                  id="cf-message"
                  name="message"
                  rows="5"
                  required
                  placeholder={t('contactExtra.messagePlaceholder')}
                  disabled={isSending}
                />
              </div>

              {/* Honeypot — visually hidden, off-tab, off-autocomplete. Real users never see this. */}
              <div className="contact__honeypot" aria-hidden="true">
                <label htmlFor="cf-company">{t('contactExtra.honeypotLabel')}</label>
                <input
                  id="cf-company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="contact__privacy">
                <span className="contact__privacy-icon" aria-hidden><ShieldIcon /></span>
                <span>
                  {t('contactExtra.privacyConsentLead')}
                  <Link to={`/${locale}/page/privacy`} className="contact__privacy-link">
                    {t('contactExtra.privacyConsentLink')}
                  </Link>
                  {t('contactExtra.privacyConsentTrail')}
                </span>
              </div>

              {isError && (
                <div
                  ref={errorRef}
                  tabIndex={-1}
                  className="contact__error"
                  role="alert"
                  aria-live="assertive"
                >
                  <span className="contact__error-icon" aria-hidden><AlertIcon /></span>
                  <span className="contact__error-body">
                    <strong className="contact__error-title">{t('contactExtra.errorTitle')}</strong>
                    <span>{errorText || t('contactExtra.errorBody')}</span>
                  </span>
                </div>
              )}

              <div className="contact__submit">
                <span className="contact__response">
                  <ClockIcon />
                  {t('contact.response')}
                </span>
                <Button
                  type="submit"
                  variant="gradient"
                  size="lg"
                  disabled={isSending}
                  aria-busy={isSending}
                  iconEnd={isSending ? <SpinnerIcon /> : <ArrowIcon />}
                  className="contact__submit-btn"
                >
                  {isSending
                    ? t('contactExtra.sending')
                    : isError
                      ? t('contactExtra.retry')
                      : t('contact.submit')}
                </Button>
              </div>
            </form>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
