/* Single source of truth for contact details. */

export const OWNER_NAME = 'Yuval';
export const EMAIL = 'yuvalzakay25@gmail.com';

/* Local Israeli format (display) and international (links). */
export const PHONE_LOCAL = '053-333-9341';
export const PHONE_LOCAL_RAW = '0533339341';
export const PHONE_INTL = '+972-53-333-9341';
export const PHONE_INTL_RAW = '+972533339341';

export const EMAIL_HREF = `mailto:${EMAIL}`;
export const PHONE_HREF = `tel:${PHONE_INTL_RAW}`;

const WHATSAPP_DEFAULT_TEXT = encodeURIComponent(
  "Hi Yuval, I'd like to discuss a project."
);

export const WHATSAPP_HREF = `https://wa.me/972533339341?text=${WHATSAPP_DEFAULT_TEXT}`;
