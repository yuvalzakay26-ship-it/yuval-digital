import { useContext } from 'react';
import { A11yContext } from '@a11y/A11yProvider.jsx';

export function useA11y() {
  const ctx = useContext(A11yContext);
  if (!ctx) {
    throw new Error('useA11y must be used inside <A11yProvider>');
  }
  return ctx;
}
