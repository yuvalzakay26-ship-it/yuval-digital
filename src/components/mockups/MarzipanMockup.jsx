import './mockups.css';

/* Each entry is the public-folder basename without extension. The component
   builds .avif, .webp and .png siblings — converted at near-lossless quality
   by scripts/convert-mockup-images.mjs. PNG stays as the universal fallback. */
const HERO_BASE = '/projects/marzipan/1';
const PHONE_BASE = '/projects/marzipan/6';

/**
 * Marzipan Bakery — real screenshot preview.
 * The desktop variant uses the homepage hero (founders + "מאז 1986").
 * The phone variant uses the mobile product catalog view.
 */
export default function MarzipanMockup({ variant = 'browser' }) {
  const isPhone = variant === 'phone';
  const base = isPhone ? PHONE_BASE : HERO_BASE;
  /* Intrinsic dimensions match the source captures. width/height attributes
     let the browser compute aspect ratio and reserve box space before the
     image arrives — kills CLS even though object-fit:cover stretches to
     fill the device chrome. */
  const width = isPhone ? 390 : 1280;
  const height = isPhone ? 844 : 800;
  return (
    <picture>
      <source type="image/avif" srcSet={`${base}.avif`} />
      <source type="image/webp" srcSet={`${base}.webp`} />
      <img
        className={`mu-marzipan-img mu-marzipan-img--${isPhone ? 'phone' : 'browser'}`}
        src={`${base}.png`}
        alt=""
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        fetchpriority="low"
        draggable="false"
      />
    </picture>
  );
}
