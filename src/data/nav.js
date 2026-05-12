/**
 * Top navigation entries. Each `key` maps into the i18n `nav.*` namespace.
 *
 * Two kinds:
 *   - `anchor` — section id on the home page. The navbar composes
 *     `#anchor` on home and `/he#anchor` off home, so the same link
 *     works from anywhere.
 *   - `route`  — a sibling page under `/:lang`. Always rendered as
 *     a router link to `/:lang/<route>` regardless of current path.
 *
 * Both kinds can coexist in the same list; consumers branch on the
 * shape of each entry.
 */
export const navLinks = [
  { key: 'services', anchor: 'services' },
  { key: 'about',    route:  'about'    },
  { key: 'packages', anchor: 'packages' },
  { key: 'process',  anchor: 'process'  },
  { key: 'projects', anchor: 'projects' },
  { key: 'faq',      anchor: 'faq' },
  { key: 'contact',  anchor: 'contact' }
];
