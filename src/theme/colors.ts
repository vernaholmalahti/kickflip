// Colour tokens from docs/DESIGN_SYSTEM.md §1.
// Dark theme is the default and only theme in the MVP.
// Components use these names — never raw hex values.

export const colors = {
  bg: '#121317', // app background (asphalt)
  surface: '#1D1F25', // cards
  surfaceRaised: '#272A32', // modals, pressed cards
  border: '#33363F', // dividers, card outlines
  text: '#F4F4F5', // primary text
  textMuted: '#A1A1AA', // secondary text, hints
  primary: '#C6FF3D', // electric lime — main actions, XP, progress
  onPrimary: '#121317', // text on primary buttons
  secondary: '#FF5FA2', // hot pink — celebrations, level ups
  accent: '#4FC3FF', // sky blue — sessions / timer
  warm: '#FFB547', // highlights, achievements
  rarityCommon: '#9CA3AF',
  rarityRare: '#4FA8FF',
  rarityEpic: '#B57BFF',
  rarityLegendary: '#FFC93D',
  // Only for destructive confirmations (delete). Never for user state — no shame.
  destructive: '#FF6B6B',
} as const;

export type ColorToken = keyof typeof colors;
