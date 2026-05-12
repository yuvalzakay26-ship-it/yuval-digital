/**
 * Reading-time estimator for structured-JSON article bodies.
 *
 * Iterates the node array, collects the visible text, counts whitespace-
 * separated tokens, and divides by a target reading speed. Tuned for
 * bilingual editorial copy — slightly slower than the typical English-only
 * 220wpm because Hebrew copy reads denser per word.
 */

const WORDS_PER_MINUTE = 190;

function nodeText(node) {
  if (!node || typeof node !== 'object') return '';
  switch (node.type) {
    case 'p':
    case 'h2':
    case 'h3':
    case 'callout':
      return node.text || '';
    case 'ul':
    case 'ol':
      return (node.items || []).join(' ');
    case 'quote':
      return [node.text || '', node.cite || ''].join(' ');
    case 'link':
      return node.label || '';
    default:
      return '';
  }
}

export function wordCount(body = []) {
  return body
    .map(nodeText)
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .length;
}

export function readingMinutes(body = []) {
  const words = wordCount(body);
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
