import { useReveal } from '@hooks/useReveal.js';
import { cn } from '@utils/cn.js';
import './Reveal.css';

/**
 * Wrapper that animates its children into view on first scroll.
 * Variants control direction; `delay` can stagger items in a group.
 */
export default function Reveal({
  as: Tag = 'div',
  variant = 'up',
  delay = 0,
  className,
  children,
  ...rest
}) {
  const { ref, revealed } = useReveal();

  return (
    <Tag
      ref={ref}
      className={cn('reveal', `reveal--${variant}`, { 'reveal--in': revealed }, className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
