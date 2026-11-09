// Typography tokens from docs/DESIGN_SYSTEM.md §2.
// Display font: Bricolage Grotesque (headings, level numbers, timer).
// Body font: Inter (everything else).
//
// Never put these in fixed-height containers — text must grow with the
// user's system font size.
import type { TextStyle } from 'react-native';

import type { FontName } from './fonts';

export const fontFamily = {
  displayBold: 'BricolageGrotesque_700Bold',
  displayExtraBold: 'BricolageGrotesque_800ExtraBold',
  body: 'Inter_400Regular',
  bodySemiBold: 'Inter_600SemiBold',
} as const satisfies Record<string, FontName>;

export const typography = {
  display: { fontFamily: fontFamily.displayExtraBold, fontSize: 40, lineHeight: 44 },
  h1: { fontFamily: fontFamily.displayBold, fontSize: 28, lineHeight: 34 },
  h2: { fontFamily: fontFamily.displayBold, fontSize: 22, lineHeight: 28 },
  body: { fontFamily: fontFamily.body, fontSize: 17, lineHeight: 24 },
  bodyStrong: { fontFamily: fontFamily.bodySemiBold, fontSize: 17, lineHeight: 24 },
  small: { fontFamily: fontFamily.body, fontSize: 14, lineHeight: 20 },
  timer: {
    fontFamily: fontFamily.displayExtraBold,
    fontSize: 64,
    lineHeight: 68,
    // Every digit gets the same width, so the timer doesn't wobble as it counts down.
    fontVariant: ['tabular-nums'],
  },
} as const satisfies Record<string, TextStyle>;

export type TypographyToken = keyof typeof typography;
