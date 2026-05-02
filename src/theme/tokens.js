/**
 * Theme tokens — JS mirror of the CSS custom properties.
 * Useful when components need values for inline styles, charts, or canvas.
 * The CSS variables in styles/variables.css remain the source of truth at runtime.
 */

export const themes = {
  light: {
    name: 'light',
    bg: '#ffffff',
    bgAlt: '#f7f9fc',
    surface: '#ffffff',
    text: '#0a0d14',
    textSoft: '#3a4150',
    accent: '#2563eb',
    accentSoft: 'rgba(37, 99, 235, 0.12)'
  },
  dark: {
    name: 'dark',
    bg: '#07090f',
    bgAlt: '#0b0e16',
    surface: '#11151d',
    text: '#f3f5f9',
    textSoft: '#c5cbd6',
    accent: '#60a5fa',
    accentSoft: 'rgba(96, 165, 250, 0.16)'
  }
};

export const THEME_STORAGE_KEY = 'yuval-digital:theme';
export const LANG_STORAGE_KEY = 'yuval-digital:lang';
