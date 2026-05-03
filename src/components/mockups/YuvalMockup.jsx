import './mockups.css';

const DESKTOP_IMAGE = '/projects/yuval-digital/1.png';
const PHONE_IMAGE = '/projects/yuval-digital/2.png';

/**
 * yuval.digital — real screenshot preview.
 * Desktop variant uses the browser hero capture (1.png).
 * Phone variant uses the mobile capture (2.png).
 */
export default function YuvalMockup({ variant = 'browser' }) {
  const isPhone = variant === 'phone';
  const src = isPhone ? PHONE_IMAGE : DESKTOP_IMAGE;
  return (
    <img
      className={`mu-yuval-img mu-yuval-img--${isPhone ? 'phone' : 'browser'}`}
      src={src}
      alt=""
      loading="lazy"
      decoding="async"
      draggable="false"
    />
  );
}
