import './mockups.css';

/* Each entry is the public-folder basename without extension. The component
   builds .avif, .webp and .png siblings — converted at near-lossless quality
   by scripts/convert-mockup-images.mjs. PNG stays as the universal fallback. */
const DESKTOP_BASE = '/projects/yuval-digital/1';
const PHONE_BASE = '/projects/yuval-digital/2';

/**
 * yuval.digital — real screenshot preview.
 * Desktop variant uses the browser hero capture (1.*).
 * Phone variant uses the mobile capture (2.*).
 */
export default function YuvalMockup({ variant = 'browser' }) {
  const isPhone = variant === 'phone';
  const base = isPhone ? PHONE_BASE : DESKTOP_BASE;
  /* Intrinsic dimensions match the source assets. They are stretched to fill
     the device chrome via CSS object-fit, but width/height attributes give
     the browser the aspect ratio it needs to reserve layout space before
     the image arrives — eliminates layout shift while loading lazy. */
  const width = isPhone ? 390 : 1280;
  const height = isPhone ? 844 : 800;
  return (
    <picture>
      <source type="image/avif" srcSet={`${base}.avif`} />
      <source type="image/webp" srcSet={`${base}.webp`} />
      <img
        className={`mu-yuval-img mu-yuval-img--${isPhone ? 'phone' : 'browser'}`}
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
