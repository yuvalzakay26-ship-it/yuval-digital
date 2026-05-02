import Container from '@components/Container.jsx';
import Logo from '@components/Logo.jsx';
import { useLanguage } from '@hooks/useLanguage.js';
import { navLinks } from '@data/nav.js';
import {
  EMAIL,
  EMAIL_HREF,
  PHONE_INTL,
  PHONE_HREF,
  WHATSAPP_HREF,
} from '@data/contact.js';
import './Footer.css';

const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden>
    <path d="M19.11 4.93A10 10 0 0 0 4.07 18.18L3 22l3.93-1.03A10 10 0 1 0 19.1 4.93zM12 20.06a8.04 8.04 0 0 1-4.1-1.12l-.3-.18-2.32.61.62-2.27-.19-.31A8.05 8.05 0 1 1 12 20.05z"/>
  </svg>
);

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container>
        <div className="footer__grid">
          <div className="footer__brand">
            <Logo />
            <p className="footer__tagline">{t('brand.tagline')}</p>
            <a
              className="footer__quick-wa"
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noreferrer"
              aria-label={t('footer.quickWhatsapp')}
            >
              <span className="footer__quick-wa-icon" aria-hidden><WhatsAppIcon /></span>
              <span className="footer__quick-wa-text">
                <span className="footer__quick-wa-label">{t('footer.quickWhatsapp')}</span>
                <span className="footer__quick-wa-hint" dir="ltr">{PHONE_INTL}</span>
              </span>
            </a>
          </div>

          <nav className="footer__col" aria-label="Footer navigation">
            <h4 className="footer__title">{t('footer.nav')}</h4>
            <ul>
              {navLinks.map(link => (
                <li key={link.key}>
                  <a href={link.href}>{t(`nav.${link.key}`)}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__col">
            <h4 className="footer__title">{t('footer.contact')}</h4>
            <ul className="footer__contact-list">
              <li>
                <a href={EMAIL_HREF} className="footer__contact-link">
                  <span className="footer__contact-icon" aria-hidden><MailIcon /></span>
                  <span dir="ltr">{EMAIL}</span>
                </a>
              </li>
              <li>
                <a href={PHONE_HREF} className="footer__contact-link">
                  <span className="footer__contact-icon" aria-hidden><PhoneIcon /></span>
                  <span dir="ltr">{PHONE_INTL}</span>
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noreferrer"
                  className="footer__contact-link"
                >
                  <span className="footer__contact-icon footer__contact-icon--green" aria-hidden><WhatsAppIcon /></span>
                  <span>WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__transparency">
          <span className="footer__transparency-owner">{t('footer.ownership')}</span>
          <span className="footer__transparency-dot" aria-hidden>·</span>
          <span className="footer__transparency-area">{t('footer.serviceArea')}</span>
        </div>

        <nav className="footer__legal" aria-label={t('legal.privacy')}>
          <ul>
            <li>
              <a href="#/page/privacy">{t('legal.privacy')}</a>
            </li>
            <li>
              <a href="#/page/accessibility">{t('legal.accessibility')}</a>
            </li>
            <li>
              <a href="#contact">{t('legal.contact')}</a>
            </li>
          </ul>
        </nav>

        <div className="footer__base">
          <span className="footer__copy">© {year} Yuval Digital · {t('footer.rights')}</span>
          <span className="footer__built">{t('footer.built')}</span>
        </div>
      </Container>
    </footer>
  );
}
