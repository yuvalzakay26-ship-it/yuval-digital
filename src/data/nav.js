/**
 * Top navigation entries. Each `key` maps into the i18n `nav.*` namespace.
 * `anchor` is the section id on the home page; the navbar composes the
 * full URL at render time so links work both on home (`#anchor`) and
 * from sub-pages (`/he#anchor`).
 */
export const navLinks = [
  { key: 'services', anchor: 'services' },
  { key: 'packages', anchor: 'packages' },
  { key: 'process',  anchor: 'process'  },
  { key: 'projects', anchor: 'projects' },
  { key: 'faq',      anchor: 'faq' },
  { key: 'contact',  anchor: 'contact' }
];
