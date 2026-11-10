import type { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, layout, spacing } from '@/theme';

export interface ScreenProps {
  children: ReactNode;
  testID?: string;
}

/**
 * Base wrapper for every screen: dark background, screen padding, and space
 * for the notch/status bar. Only the top edge is inset — on tab screens the
 * tab bar already handles the bottom.
 */
export function Screen({ children, testID }: ScreenProps) {
  return (
    <SafeAreaView style={styles.screen} edges={['top']} testID={testID}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.lg,
    gap: spacing.lg,
  },
});
