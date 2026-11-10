// One import for all theme tokens: `import { colors, spacing } from '@/theme';`
export { colors, type ColorToken } from './colors';
// Font *files* (fontAssets) are deliberately not re-exported: only the root
// layout loads them, via '@/theme/fonts'. Keeping them out of this index means
// components and tests never pull in the font loader.
export type { FontName } from './fonts';
export { opacity } from './opacity';
export { layout, radii, spacing } from './spacing';
export { fontFamily, typography, type TypographyToken } from './typography';
