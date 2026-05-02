import './mockups.css';

const HERO_IMAGE = '/projects/marzipan/1.png';
const PHONE_IMAGE = '/projects/marzipan/6.png';

/**
 * Marzipan Bakery — real screenshot preview.
 * The desktop variant uses the homepage hero (founders + "מאז 1986").
 * The phone variant uses the mobile product catalog view.
 */
export default function MarzipanMockup({ variant = 'browser' }) {
  const isPhone = variant === 'phone';
  const src = isPhone ? PHONE_IMAGE : HERO_IMAGE;
  return (
    <img
      className={`mu-marzipan-img mu-marzipan-img--${isPhone ? 'phone' : 'browser'}`}
      src={src}
      alt=""
      loading="lazy"
      decoding="async"
      draggable="false"
    />
  );
}
