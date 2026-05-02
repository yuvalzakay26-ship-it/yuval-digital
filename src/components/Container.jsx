import { cn } from '@utils/cn.js';

export default function Container({ as: Tag = 'div', className, children, ...rest }) {
  return (
    <Tag className={cn('container', className)} {...rest}>
      {children}
    </Tag>
  );
}
