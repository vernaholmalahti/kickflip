// Font files to load at startup (see src/app/_layout.tsx).
// Each key becomes the fontFamily name we use in styles.
// Import each weight from its own path: importing from the package root would
// bundle every weight (~6 MB of fonts we don't use).
import { BricolageGrotesque_700Bold } from '@expo-google-fonts/bricolage-grotesque/700Bold';
import { BricolageGrotesque_800ExtraBold } from '@expo-google-fonts/bricolage-grotesque/800ExtraBold';
import { Inter_400Regular } from '@expo-google-fonts/inter/400Regular';
import { Inter_600SemiBold } from '@expo-google-fonts/inter/600SemiBold';

export const fontAssets = {
  BricolageGrotesque_700Bold,
  BricolageGrotesque_800ExtraBold,
  Inter_400Regular,
  Inter_600SemiBold,
};

export type FontName = keyof typeof fontAssets;
