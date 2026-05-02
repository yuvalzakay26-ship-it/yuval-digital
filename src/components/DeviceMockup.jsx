import { cn } from '@utils/cn.js';
import './DeviceMockup.css';

/**
 * Premium device chrome wrappers for project mockups.
 *
 * <DeviceMockup variant="browser" url="...">  …UI…  </DeviceMockup>
 * <DeviceMockup variant="phone">              …UI…  </DeviceMockup>
 */
export default function DeviceMockup({
  variant = 'browser',
  url,
  className,
  children,
  ...rest
}) {
  if (variant === 'phone') {
    return (
      <div className={cn('mock', 'mock--phone', className)} aria-hidden="true" {...rest}>
        <div className="mock__phone-notch" />
        <div className="mock__screen">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('mock', 'mock--browser', className)} aria-hidden="true" {...rest}>
      <div className="mock__chrome">
        <span className="mock__dot mock__dot--r" />
        <span className="mock__dot mock__dot--y" />
        <span className="mock__dot mock__dot--g" />
        {url && (
          <span className="mock__url" dir="ltr">
            <span className="mock__url-lock" aria-hidden>
              <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="11" width="14" height="9" rx="2" />
                <path d="M8 11V8a4 4 0 0 1 8 0v3" />
              </svg>
            </span>
            {url}
          </span>
        )}
      </div>
      <div className="mock__screen">
        {children}
      </div>
    </div>
  );
}
