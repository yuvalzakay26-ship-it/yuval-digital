/**
 * Visual treatments per project. Copy lives in i18n; visual styling here.
 * Keys must match the `id` field of each project entry in src/i18n/{he,en}.js.
 */
export const projectVisuals = {
  marzipan: {
    accent: 'linear-gradient(135deg, #9f1239 0%, #f59e0b 100%)',
    glow: 'rgba(159, 18, 57, 0.42)',
    chip: 'Bakery'
  },
  yuval: {
    accent: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
    glow: 'rgba(37, 99, 235, 0.40)',
    chip: 'Brand'
  },
  clinic: {
    accent: 'linear-gradient(135deg, #06b6d4 0%, #2563eb 100%)',
    glow: 'rgba(6, 182, 212, 0.35)',
    chip: 'Booking'
  },
  restaurant: {
    accent: 'linear-gradient(135deg, #f97316 0%, #ec4899 100%)',
    glow: 'rgba(249, 115, 22, 0.35)',
    chip: 'Orders'
  },
  leadgen: {
    accent: 'linear-gradient(135deg, #059669 0%, #84cc16 100%)',
    glow: 'rgba(5, 150, 105, 0.30)',
    chip: 'Landing'
  },
  default: {
    accent: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
    glow: 'rgba(37, 99, 235, 0.30)',
    chip: '·'
  }
};
