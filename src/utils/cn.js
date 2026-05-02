/**
 * Tiny classnames helper. Accepts strings, arrays, and objects:
 *   cn('a', cond && 'b', { c: isC, d: isD })
 */
export function cn(...args) {
  const out = [];
  for (const a of args) {
    if (!a) continue;
    if (typeof a === 'string' || typeof a === 'number') {
      out.push(a);
    } else if (Array.isArray(a)) {
      const inner = cn(...a);
      if (inner) out.push(inner);
    } else if (typeof a === 'object') {
      for (const k of Object.keys(a)) {
        if (a[k]) out.push(k);
      }
    }
  }
  return out.join(' ');
}
