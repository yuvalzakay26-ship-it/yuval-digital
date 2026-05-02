import { cn } from '@utils/cn.js';
import './Button.css';

export default function Button({
  as: Tag = 'button',
  variant = 'primary',
  size = 'md',
  className,
  children,
  iconStart,
  iconEnd,
  ...rest
}) {
  return (
    <Tag
      className={cn('btn', `btn--${variant}`, `btn--${size}`, className)}
      {...rest}
    >
      {iconStart && <span className="btn__icon btn__icon--start" aria-hidden>{iconStart}</span>}
      <span className="btn__label">{children}</span>
      {iconEnd && <span className="btn__icon btn__icon--end" aria-hidden>{iconEnd}</span>}
    </Tag>
  );
}
