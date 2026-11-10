// Spacing, radius and layout tokens from docs/DESIGN_SYSTEM.md §3.

/** Spacing scale in dp: 4, 8, 12, 16, 24, 32, 48. */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radii = {
  sm: 8,
  md: 14,
  lg: 20,
  pill: 999,
} as const;

export const layout = {
  screenPadding: 16,
  screenPaddingLarge: 20, // for larger screens
  /** Every interactive element must be at least this big (width and height). */
  minTouchTarget: 48,
  /** Minimum button heights. Minimum, not fixed — buttons grow with large system fonts. */
  controlHeight: { md: 48, lg: 56 },
  borderWidth: 1,
} as const;
